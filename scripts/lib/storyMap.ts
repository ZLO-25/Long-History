// 故事地圖（docs/stories.md 第七節）：讀故事時，旁邊的小地圖標出這一節的地點，讓讀者把事件和地理連起來。
// 不寫新資料：地點、今天的地名、角色說明都來自各站卡片的 place.locations；路線來自卡片的 routes（data/routes/）。
// 輸出兩份：
//   1. 故事 json 多一個 places（地點清單，幾 KB）：內文裡提到的地名會變成可以點的字，點了地圖就跳過去。
//   2. public/data/stories/<id>.map.json（陸地輪廓、海洋與地區名、路線）：地圖要顯示時才下載。
import { createRequire } from 'node:module';
import fs from 'node:fs';
import YAML from 'yaml';
import path from 'node:path';
import { ROOT, type RawCard } from './cards.ts';
import type { RawStory } from './stories.ts';

const require = createRequire(import.meta.url);

/** 故事裡的一個地點（同名、位置相近的合併成一個） */
export interface StoryPlace {
  n: string;            // 古地名（卡片 name_ancient）
  m: string;            // 今天的地名（卡片 name_modern）
  lat: number; lng: number;
  ap: boolean;          // 位置是示意（schematic／disputed），不是精確點
  roles: { card: string; role: string }[];
  secs: number[];       // 出現在第幾節（依該節的站卡）
  k: string[];          // 內文比對用的名字（長的在前）
}

type Box = [number, number, number, number]; // w s e n

const r3 = (x: number) => Math.round(x * 1000) / 1000;
const strip = (s: string) => s.replace(/[（(][^）)]*[）)]/g, '').trim();

let countryNames: Set<string> | null = null;
/** 國家、洲名不拿來比對內文（「美國」「中國」到處都是，點會跳到某個示意點，反而誤導） */
function blocked() {
  if (!countryNames) {
    const labels = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/labels/basemap-labels.json'), 'utf8')).labels as any[];
    countryNames = new Set(labels.filter((l) => l[0] === 'c' || l[0] === 'r').map((l) => l[1] as string));
    for (const x of ['臺灣', '台灣', '中國', '日本', '美國', '英國', '法國', '德國', '歐洲', '亞洲', '越南', '朝鮮', '韓國', '印度', '波斯', '希臘', '羅馬', '蘇聯', '俄國', '西班牙', '葡萄牙', '荷蘭']) countryNames.add(x);
  }
  return countryNames;
}

function matchNames(n: string): string[] {
  const out = new Set<string>();
  const add = (s: string) => { s = s.trim(); if (s.length >= 2 && !blocked().has(s) && !/^[\x00-\x7f]+$/.test(s)) out.add(s); };
  add(n);
  for (const part of n.split(/[／/、]/)) {
    add(part); add(strip(part));
    // 括號裡的別名：「江都（揚州）」的揚州、「馬關（下關）」的下關
    for (const m of part.matchAll(/[（(]([^）)]*)[）)]/g)) for (const x of m[1].split(/[／/、，,]/)) if (!/一帶|附近|今|示意|首都|中段|之一/.test(x)) add(x);
  }
  for (const x of [...out]) { const y = x.replace(/(海峽|遺址|古城|一帶|附近)$/, ''); if (y !== x) add(y); }
  return [...out].sort((a, b) => b.length - a.length);
}

let same: { groups: string[][]; different: string[][] } | null = null;
/** 同一座城不同時代的名字（data/labels/same-place.yaml，人工判斷過） */
export const samePlaces = () => (same ??= (() => { const y = YAML.parse(fs.readFileSync(path.join(ROOT, 'data/labels/same-place.yaml'), 'utf8')) ?? {}; return { groups: y.groups ?? [], different: y.different ?? [] }; })());
const sameCity = (a: string, b: string) => samePlaces().groups.some((g) => g.includes(a) && g.includes(b));

/** 這篇故事各節的地點；故事 json 用 */
export function storyPlaces(s: RawStory, cards: RawCard[]): { places: StoryPlace[]; secPt: number[] } {
  const byId = new Map(cards.filter((c) => c.fm?.id).map((c) => [c.fm.id as string, c.fm]));
  const places: StoryPlace[] = [];
  /** 每一節的代表點（這節第一站的第一個地點）；畫「故事順序」的虛線用，沒有站的節是 -1 */
  const secPt: number[] = s.sections.map(() => -1);
  const names = new Map<StoryPlace, string[]>();
  s.sections.forEach((sec, si) => {
    for (const cid of sec.cards) {
      const fm = byId.get(cid);
      for (const l of fm?.place?.locations ?? []) {
        if (typeof l.lat !== 'number' || typeof l.lng !== 'number' || l.precision === 'unknown') continue;
        const name = String(l.name_ancient ?? '').trim();
        // 同名、相距 30 公里內就當同一個地點（雅典、長安在很多張卡都出現）
        // 同一座城不同時代的名字（雒陽／洛陽）也合成一個點，名字依出現先後並列
        let p = places.find((x) => names.get(x)!.some((n) => n === name || strip(n) === strip(name) || sameCity(n, name)) && Math.abs(x.lat - l.lat) < 0.3 && Math.abs(x.lng - l.lng) < 0.3);
        if (!p) { p = { n: name, m: String(l.name_modern ?? ''), lat: r3(l.lat), lng: r3(l.lng), ap: l.precision !== 'exact', roles: [], secs: [], k: matchNames(name) }; places.push(p); names.set(p, [name]); }
        else if (!names.get(p)!.some((n) => n === name || strip(n) === strip(name))) {
          names.get(p)!.push(name);
          p.n = names.get(p)!.join('／');
          p.k = [...new Set([...p.k, ...matchNames(name)])].sort((a, b) => b.length - a.length);
        }
        if (l.role && !p.roles.some((r) => r.card === cid && r.role === l.role)) p.roles.push({ card: cid, role: String(l.role) });
        if (!p.secs.includes(si)) p.secs.push(si);
        if (secPt[si] < 0) secPt[si] = places.indexOf(p);
      }
    }
  });
  // 兩個地點不能共用同一個比對名（例如兩個「長安」在不同位置）：留給第一次出現的
  const owner = new Map<string, number>();
  places.forEach((p, i) => { p.k = p.k.filter((k) => { if (owner.has(k)) return false; owner.set(k, i); return true; }); });
  return { places, secPt };
}

// ---------- 陸地輪廓：Natural Earth 1:50m（world-atlas，公有領域），裁到這篇故事的範圍 ----------
let land50: number[][][] | null = null;
function landRings(): number[][][] {
  if (!land50) {
    const topo = require('topojson-client');
    const w = require('world-atlas/land-50m.json');
    const g = topo.feature(w, w.objects.land);
    land50 = [];
    for (const f of g.features) {
      const polys = f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.coordinates;
      for (const poly of polys) for (let ring of poly) {
        // 跨過國際換日線的（歐亞大陸東端的楚科奇）：把西經改成 180 度以東，免得裁切時拉出一條橫跨全球的邊
        if (ring.some((p: number[], i: number) => i > 0 && Math.abs(p[0] - ring[i - 1][0]) > 180)) ring = ring.map(([x, y]: number[]) => [x < -90 ? x + 360 : x, y]);
        land50.push(ring);
      }
    }
  }
  return land50;
}

/** Sutherland–Hodgman：把一圈多邊形裁到矩形裡 */
function clipRing(ring: number[][], [w, s, e, n]: Box): number[][] {
  const edges: [(p: number[]) => boolean, (a: number[], b: number[]) => number[]][] = [
    [(p) => p[0] >= w, (a, b) => [w, a[1] + (b[1] - a[1]) * (w - a[0]) / (b[0] - a[0])]],
    [(p) => p[0] <= e, (a, b) => [e, a[1] + (b[1] - a[1]) * (e - a[0]) / (b[0] - a[0])]],
    [(p) => p[1] >= s, (a, b) => [a[0] + (b[0] - a[0]) * (s - a[1]) / (b[1] - a[1]), s]],
    [(p) => p[1] <= n, (a, b) => [a[0] + (b[0] - a[0]) * (n - a[1]) / (b[1] - a[1]), n]],
  ];
  let out = ring;
  for (const [inside, cut] of edges) {
    if (!out.length) break;
    const src = out; out = [];
    for (let i = 0; i < src.length; i++) {
      const a = src[(i + src.length - 1) % src.length], b = src[i];
      const ia = inside(a), ib = inside(b);
      if (ib) { if (!ia) out.push(cut(a, b)); out.push(b); } else if (ia) out.push(cut(a, b));
    }
  }
  return out;
}

let water: { rivers: number[][]; lakes: number[][] } | null = null;
const waterData = () => (water ??= JSON.parse(fs.readFileSync(path.join(ROOT, 'data/ne/rivers-lakes-50m.json'), 'utf8')));
/** 把折線在框外的部分切掉（框外的點斷開成好幾段） */
function clipLine(pts: number[][], [w, s, e, n]: Box): number[][][] {
  const out: number[][][] = []; let cur: number[][] = [];
  for (const p of pts) {
    if (p[0] >= w && p[0] <= e && p[1] >= s && p[1] <= n) cur.push(p);
    else { if (cur.length > 1) out.push(cur); cur = []; }
  }
  if (cur.length > 1) out.push(cur);
  return out;
}
const pairs = (a: number[], from = 1) => { const o: number[][] = []; for (let i = from; i + 1 < a.length; i += 2) o.push([a[i], a[i + 1]]); return o; };
const flat2 = (r: number[][]) => r.flatMap(([x, y]) => [Math.round(x * 100) / 100, Math.round(y * 100) / 100]);

/** 去掉太密的點（距離小於 tol 度就跳過） */
function thin(ring: number[][], tol: number): number[][] {
  if (ring.length < 4) return ring;
  const out = [ring[0]];
  for (let i = 1; i < ring.length; i++) {
    const p = ring[i], q = out[out.length - 1];
    if (Math.abs(p[0] - q[0]) >= tol || Math.abs(p[1] - q[1]) >= tol || i === ring.length - 1) out.push(p);
  }
  return out;
}

/** 這篇故事的範圍（含留白），經緯度 */
function storyBox(places: StoryPlace[]): Box {
  const lat = places.map((p) => p.lat), lng = places.map((p) => p.lng);
  let w = Math.min(...lng), e = Math.max(...lng), s = Math.min(...lat), n = Math.max(...lat);
  // 留白要夠：地圖框比例和故事範圍不同（手機下方的地圖很扁），框外沒有陸地資料會被誤看成海
  const mx = Math.max(16, (e - w) * 0.5), my = Math.max(9, (n - s) * 0.5);
  w = Math.max(-180, w - mx); e = Math.min(180, e + mx); s = Math.max(-72, s - my); n = Math.min(80, n + my);
  return [w, s, e, n];
}

export function buildStoryMap(s: RawStory, places: StoryPlace[], cards: RawCard[], routes: any[]) {
  if (!places.length) return null;
  const box = storyBox(places);
  const span = Math.max(box[2] - box[0], box[3] - box[1]);
  const tol = Math.min(0.1, Math.max(0.012, span / 1400));
  const land: number[][] = [];
  for (const ring of landRings()) {
    // 先用外框快速排除
    let a = 180, b = 90, c = -180, d = -90;
    for (const [x, y] of ring) { if (x < a) a = x; if (x > c) c = x; if (y < b) b = y; if (y > d) d = y; }
    if (c < box[0] || a > box[2] || d < box[1] || b > box[3]) continue;
    // 太小的島在大範圍地圖上看不到
    if (Math.max(c - a, d - b) < tol * 1.5) continue;
    const clipped = thin(clipRing(ring, box), tol);
    if (clipped.length < 3) continue;
    land.push(clipped.flatMap(([x, y]) => [Math.round(x * 100) / 100, Math.round(y * 100) / 100]));
  }
  // 河流與湖泊：黃河、長江、尼羅河這些，很多事件就發生在河邊；大範圍的地圖只畫主要河流
  const maxRank = span > 90 ? 3 : span > 40 ? 5 : 6;
  const rivers: number[][] = [], lakes: number[][] = [];
  for (const r of waterData().rivers) if (r[0] <= maxRank) for (const seg of clipLine(pairs(r), box)) { const t = thin(seg, tol); if (t.length > 1) rivers.push(flat2(t)); }
  for (const r of waterData().lakes) {
    if (r[0] > maxRank) continue;
    const ring = pairs(r);
    let a = 180, b = 90, c = -180, d = -90;
    for (const [x, y] of ring) { if (x < a) a = x; if (x > c) c = x; if (y < b) b = y; if (y > d) d = y; }
    if (c < box[0] || a > box[2] || d < box[1] || b > box[3] || Math.max(c - a, d - b) < tol * 3) continue;
    const t = thin(clipRing(ring, box), tol);
    if (t.length >= 3) lakes.push(flat2(t));
  }
  // 海洋、地區（山脈、平原、半島）、河名、今天的國名：幫讀者對方位
  const labels = (JSON.parse(fs.readFileSync(path.join(ROOT, 'data/labels/basemap-labels.json'), 'utf8')).labels as any[])
    .filter((l) => (l[0] === 'o' || l[0] === 'r' || l[0] === 'c' || l[0] === 'v') && l[4] >= box[0] && l[4] <= box[2] && l[3] >= box[1] && l[3] <= box[3])
    .map((l) => [l[0], l[1], r3(l[3]), r3(l[4]), l[5]]);
  // 路線：卡片上有 routes 的，畫出實際的路（不是故事順序）
  const byId = new Map(cards.filter((c) => c.fm?.id).map((c) => [c.fm.id as string, c.fm]));
  const rById = new Map(routes.map((r: any) => [r.id, r]));
  const rs: { id: string; name: string; secs: number[]; c: number[] }[] = [];
  s.sections.forEach((sec, si) => {
    for (const cid of sec.cards) for (const rid of byId.get(cid)?.routes ?? []) {
      const r = rById.get(rid);
      if (!r?.coords?.length) continue;
      let x = rs.find((q) => q.id === rid);
      if (!x) { x = { id: rid, name: r.name, secs: [], c: thin(r.coords.map(([la, ln]: number[]) => [ln, la]), tol / 2).flatMap(([ln, la]) => [Math.round(ln * 100) / 100, Math.round(la * 100) / 100]) }; rs.push(x); }
      if (!x.secs.includes(si)) x.secs.push(si);
    }
  });
  // 當時的政權（historical-basemaps 示意疆界，研究模式地圖用的同一份 public/data/borders/）：每一節取最接近那節年代的快照
  const snaps: { year: number; file: string }[] = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/borders/index.json'), 'utf8')).snapshots;
  const secYear = s.sections.map((sec) => { const ys = sec.cards.map((c) => byId.get(c)?.time?.start).filter((y: any) => typeof y === 'number'); return ys.length ? Math.min(...ys) : null; });
  const firstY = secYear.find((y) => y != null) ?? null;
  const eras = secYear.map((y0) => {
    const y = y0 ?? firstY;
    if (y == null) return null;
    const best = snaps.reduce((a, b) => (Math.abs(b.year - y) < Math.abs(a.year - y) ? b : a));
    return { y: best.year, file: best.file };
  });
  return { box: box.map((v) => Math.round(v * 100) / 100), land, rivers, lakes, labels, routes: rs, eras };
}

/** 全世界粗略陸地（1:110m），故事範圍外的背景；所有故事共用 public/data/stories/world-110m.json */
export function worldLand110(): number[][] {
  const topo = require('topojson-client');
  const w = require('world-atlas/land-110m.json');
  const out: number[][] = [];
  for (const f of topo.feature(w, w.objects.land).features) {
    const polys = f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.coordinates;
    for (const poly of polys) for (let ring of poly) {
      if (ring.some((p: number[], i: number) => i > 0 && Math.abs(p[0] - ring[i - 1][0]) > 180)) ring = ring.map(([x, y]: number[]) => [x < -90 ? x + 360 : x, y]);
      ring = ring.filter((p: number[]) => p[1] > -75);
      if (ring.length >= 3) out.push(ring.flatMap(([x, y]: number[]) => [Math.round(x * 10) / 10, Math.round(y * 10) / 10]));
    }
  }
  return out;
}
