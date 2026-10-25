// npm run routes：把 data/routes/routes.yaml 的「經過地點」轉成真實線條，寫入 data/routes/routes.geojson
//
//   陸路（method: awmc-road）：在 AWMC 古代道路網（巴林頓古典世界地圖集數位版）上，
//                              依序找相鄰兩站之間的最短路徑 → 線條完全沿著地圖集畫出的古道
//   長城（method: awmc-wall）：直接取 AWMC 城牆圖層中位於兩端點範圍內的線
//   海路（method: sea）       ：經停港依史料；港與港之間在 Natural Earth 陸地格網上算出不穿過陸地的最短海路（scripts/lib/sea.ts）
//
// 每條線另外記錄：各站吸附到路網的距離、沿「確定位置」路段的比例，供卡片與報告標示精度。
import fs from 'node:fs';
import path from 'node:path';
import { readYaml, readJson, ROOT } from './lib/cards.ts';
import { seaPath } from './lib/sea.ts';

type P = [number, number]; // [lng, lat]
const routes: any[] = readYaml('data/routes/routes.yaml')?.routes ?? [];
const places = readJson('data/places.json')?.places ?? {};
const ptOf = (w: any): { name: string; p: P } => {
  if (typeof w === 'string') {
    const pl = places[w];
    if (!pl) throw new Error(`Pleiades ${w} 不在 data/places.json，請先執行 npm run places`);
    return { name: pl.title, p: [pl.lng, pl.lat] };
  }
  return { name: w.name, p: [w.lng, w.lat] };
};
const km = (a: P, b: P) => {
  const R = 6371, r = Math.PI / 180;
  const dLat = (b[1] - a[1]) * r, dLng = (b[0] - a[0]) * r;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a[1] * r) * Math.cos(b[1] * r) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
};

// ---------- AWMC 道路網 → 圖 ----------
// 邊的種類：known＝地圖集標「路線確定」；approx＝地圖集標「大致路線」；gap＝地圖集兩段古道之間的缺口（程式補接）
type Kind = 'known' | 'approx' | 'gap';
const SLIVER_KM = 0.3;   // 小於此距離的端點縫隙：視為同一點直接接上
const GAP_KM = 8;        // 缺口補接上限；補接段權重加倍，只有路網真的斷開時才會被走到
const GAP_PENALTY = 3;
const roads = readJson('data/awmc/roads.geojson');
const key = (p: P) => `${p[0].toFixed(4)},${p[1].toFixed(4)}`;
const nodes = new Map<string, P>();
const adj = new Map<string, { to: string; w: number; kind: Kind }[]>();
const addEdge = (a: P, b: P, kind: Kind) => {
  const ka = key(a), kb = key(b);
  if (ka === kb) return;
  nodes.set(ka, a); nodes.set(kb, b);
  const d = km(a, b), w = kind === 'gap' ? d * GAP_PENALTY : d;
  (adj.get(ka) ?? adj.set(ka, []).get(ka)!).push({ to: kb, w, kind });
  (adj.get(kb) ?? adj.set(kb, []).get(kb)!).push({ to: ka, w, kind });
};
for (const f of roads.features) {
  const kind: Kind = f.properties.Known_or_a === '1' ? 'known' : 'approx';
  const lines: P[][] = f.geometry.type === 'LineString' ? [f.geometry.coordinates] : f.geometry.coordinates;
  for (const l of lines) for (let i = 1; i < l.length; i++) addEdge(l[i - 1], l[i], kind);
}
{
  const CELL = 0.1; // 度
  const cell = (p: P) => [Math.floor(p[0] / CELL), Math.floor(p[1] / CELL)];
  const grid = new Map<string, string[]>();
  for (const [k, p] of nodes) { const [cx, cy] = cell(p); const c = `${cx},${cy}`; (grid.get(c) ?? grid.set(c, []).get(c)!).push(k); }
  const ends = [...adj.entries()].filter(([, e]) => e.length === 1).map(([k]) => k);
  let slivers = 0, gaps = 0;
  for (const k of ends) {
    const p = nodes.get(k)!; const [cx, cy] = cell(p);
    const own = new Set<string>([k]); // 排除同一條線上相鄰的點
    let frontier = [k];
    for (let i = 0; i < 40 && frontier.length; i++) { const nx: string[] = []; for (const f of frontier) for (const e of adj.get(f)!) if (!own.has(e.to)) { own.add(e.to); nx.push(e.to); } frontier = nx; }
    const cands: [number, string][] = [];
    for (let dx = -1; dx <= 1; dx++) for (let dy = -1; dy <= 1; dy++)
      for (const k2 of grid.get(`${cx + dx},${cy + dy}`) ?? []) if (!own.has(k2)) { const d = km(p, nodes.get(k2)!); if (d < GAP_KM) cands.push([d, k2]); }
    cands.sort((a, b) => a[0] - b[0]);
    if (cands[0] && cands[0][0] < SLIVER_KM) { addEdge(p, nodes.get(cands[0][1])!, 'approx'); slivers++; continue; }
    // 每個斷頭最多補 3 條候選缺口，且彼此方向不同（避免全部接到同一段）
    const used: string[] = [];
    for (const [d, k2] of cands) { if (used.length >= 3) break; const q = nodes.get(k2)!; if (used.some((u) => km(nodes.get(u)!, q) < d * 0.5)) continue; addEdge(p, q, 'gap'); used.push(k2); gaps++; }
  }
  console.log(`AWMC 道路網：${nodes.size} 個節點；接上 ${slivers} 處小縫、建立 ${gaps} 條候選缺口`);
}
const nearestNode = (p: P) => {
  let best = '', bd = Infinity;
  for (const [k, q] of nodes) { const d = km(p, q); if (d < bd) { bd = d; best = k; } }
  return { k: best, d: bd };
};
function dijkstra(src: string, dst: string) {
  const dist = new Map<string, number>([[src, 0]]), prev = new Map<string, { k: string; kind: Kind }>();
  const heap: [number, string][] = [[0, src]];
  const push = (x: [number, string]) => { heap.push(x); let i = heap.length - 1; while (i && heap[(i - 1) >> 1][0] > heap[i][0]) { [heap[i], heap[(i - 1) >> 1]] = [heap[(i - 1) >> 1], heap[i]]; i = (i - 1) >> 1; } };
  const pop = () => { const top = heap[0], last = heap.pop()!; if (heap.length) { heap[0] = last; let i = 0; for (;;) { const l = 2 * i + 1, r = l + 1; let m = i; if (l < heap.length && heap[l][0] < heap[m][0]) m = l; if (r < heap.length && heap[r][0] < heap[m][0]) m = r; if (m === i) break; [heap[i], heap[m]] = [heap[m], heap[i]]; i = m; } } return top; };
  while (heap.length) {
    const [d, k] = pop();
    if (k === dst) break;
    if (d > (dist.get(k) ?? Infinity)) continue;
    for (const e of adj.get(k) ?? []) {
      const nd = d + e.w;
      if (nd < (dist.get(e.to) ?? Infinity)) { dist.set(e.to, nd); prev.set(e.to, { k, kind: e.kind }); push([nd, e.to]); }
    }
  }
  if (!dist.has(dst)) return null;
  const steps: { a: P; b: P; kind: Kind }[] = [];
  for (let k = dst; k !== src;) { const pv = prev.get(k)!; steps.push({ a: nodes.get(pv.k)!, b: nodes.get(k)!, kind: pv.kind }); k = pv.k; }
  return steps.reverse();
}

// ---------- AWMC 城牆 ----------
const walls = readJson('data/awmc/walls.geojson');

// ---------- 逐條建線 ----------
const out: any[] = [];
const report: string[] = [];
for (const r of routes) {
  const pts = (r.waypoints ?? []).map(ptOf);
  let coords: P[] = [], stats: any = {};
  let segments: { kind: Kind; coords: P[] }[] = [];
  if (r.method === 'awmc-road') {
    const snaps = pts.map((s: any) => ({ ...s, ...nearestNode(s.p) }));
    const byKind: Record<Kind, number> = { known: 0, approx: 0, gap: 0 };
    for (let i = 1; i < snaps.length; i++) {
      const steps = dijkstra(snaps[i - 1].k, snaps[i].k);
      if (!steps) throw new Error(`${r.id}：${snaps[i - 1].name} → ${snaps[i].name} 找不到路徑`);
      let legKm = 0;
      for (const st of steps) {
        const d = km(st.a, st.b); byKind[st.kind] += d; legKm += d;
        const last = segments[segments.length - 1];
        if (last && last.kind === st.kind) last.coords.push(st.b); else segments.push({ kind: st.kind, coords: [st.a, st.b] });
      }
      const straight = km(snaps[i - 1].p, snaps[i].p);
      if (legKm > straight * 1.6 + 5) report.push(`  ⚠ ${r.id}：${snaps[i - 1].name} → ${snaps[i].name} 路網 ${legKm.toFixed(0)} 公里，直線 ${straight.toFixed(0)} 公里（繞路）`);
    }
    for (const s of snaps.filter((s: any) => s.d > 5)) report.push(`  ⚠ ${r.id}：${s.name} 離最近的古道 ${s.d.toFixed(1)} 公里`);
    const total = byKind.known + byKind.approx + byKind.gap;
    stats = { km: Math.round(total), known_pct: Math.round((byKind.known / total) * 100), approx_pct: Math.round((byKind.approx / total) * 100), gap_km: Math.round(byKind.gap), max_snap_km: +Math.max(...snaps.map((s: any) => s.d)).toFixed(1) };
    coords = segments.flatMap((sg, i) => (i ? sg.coords.slice(1) : sg.coords));
  } else if (r.method === 'awmc-wall') {
    const [a, b] = [pts[0].p, pts[pts.length - 1].p];
    const minX = Math.min(a[0], b[0]) - 0.05, maxX = Math.max(a[0], b[0]) + 0.05, minY = Math.min(a[1], b[1]) - 0.1, maxY = Math.max(a[1], b[1]) + 0.1;
    const parts: P[][] = [];
    for (const f of walls.features) for (const l of f.geometry.coordinates as P[][])
      if (l.every((p) => p[0] >= minX && p[0] <= maxX && p[1] >= minY && p[1] <= maxY) && l.length > 5) parts.push(l);
    coords = parts.sort((x, y) => x[0][0] - y[0][0]).flat();
    stats = { km: Math.round(parts.reduce((s, l) => s + l.slice(1).reduce((t, p, i) => t + km(l[i], p), 0), 0)), parts: parts.length };
  } else if (r.method === 'sea') {
    let total = 0;
    for (let i = 1; i < pts.length; i++) {
      const leg = seaPath(pts[i - 1].p, pts[i].p);
      total += leg.km;
      coords.push(...(coords.length ? leg.coords.slice(1) : leg.coords));
    }
    stats = { km: Math.round(total) };
  } else throw new Error(`路線 ${r.id} 的 method 不明：${r.method}`);
  const ll = (cs: P[]) => cs.map((p) => [Math.round(p[1] * 1e4) / 1e4, Math.round(p[0] * 1e4) / 1e4]); // 轉成 [lat, lng]
  if (!segments.length) segments = [{ kind: r.method === 'sea' ? 'approx' : 'known', coords }];
  const rounded = ll(coords);
  out.push({ id: r.id, method: r.method, stats, stations: pts.map((s: any) => ({ name: s.name, lat: s.p[1], lng: s.p[0] })), coords: rounded,
    segments: segments.map((sg) => ({ kind: sg.kind, coords: ll(sg.coords) })) });
  report.push(`${r.id}：${r.method}，${rounded.length} 點，${JSON.stringify(stats)}`);
}
fs.writeFileSync(path.join(ROOT, 'data/routes/routes.geojson'), JSON.stringify({ generated: new Date().toISOString().slice(0, 10), routes: out }));
console.log(report.join('\n'));
