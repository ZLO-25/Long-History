// 海路計算：把 Natural Earth 1:10m 陸地（world-atlas，公有領域）轉成約 2.5 公里的格網，
// 在「水」格子上用 A* 找兩港之間最短、不穿過陸地的海上路徑，最後拉直成少數轉折點。
// 這是「兩個有史料的經停港之間，船實際可以走的最短海路」，不是古代某艘船的航跡。
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const topo = require('world-atlas/land-10m.json');
const { feature } = require('topojson-client');

type P = [number, number]; // [lng, lat]
const W0 = -11, E0 = 43, S0 = 29, N0 = 48, RES = 0.025;
const NX = Math.round((E0 - W0) / RES), NY = Math.round((N0 - S0) / RES);
const land = new Uint8Array(NX * NY);
const idx = (x: number, y: number) => y * NX + x;
const cx = (lng: number) => Math.floor((lng - W0) / RES), cy = (lat: number) => Math.floor((lat - S0) / RES);
const lngOf = (x: number) => W0 + (x + 0.5) * RES, latOf = (y: number) => S0 + (y + 0.5) * RES;

// 1) 掃描線填滿陸地（奇偶規則，湖泊等內環自然成為水）
{
  const geo = feature(topo, topo.objects.land);
  const rings: P[][] = [];
  for (const f of geo.features ?? [geo]) {
    const g = f.geometry;
    const polys = g.type === 'Polygon' ? [g.coordinates] : g.coordinates;
    for (const poly of polys) for (const ring of poly) rings.push(ring);
  }
  const edges: [number, number, number, number][] = [];
  for (const r of rings) for (let i = 1; i < r.length; i++) {
    const [x1, y1] = r[i - 1], [x2, y2] = r[i];
    if (Math.max(y1, y2) < S0 - 1 || Math.min(y1, y2) > N0 + 1 || Math.max(x1, x2) < W0 - 5 || Math.min(x1, x2) > E0 + 5) continue;
    if (y1 !== y2) edges.push([x1, y1, x2, y2]);
  }
  for (let y = 0; y < NY; y++) {
    const lat = latOf(y), xs: number[] = [];
    for (const [x1, y1, x2, y2] of edges) if ((y1 <= lat) !== (y2 <= lat)) xs.push(x1 + ((lat - y1) * (x2 - x1)) / (y2 - y1));
    xs.sort((a, b) => a - b);
    for (let i = 0; i + 1 < xs.length; i += 2) {
      const a = Math.max(0, Math.ceil((xs[i] - W0) / RES - 0.5)), b = Math.min(NX - 1, Math.floor((xs[i + 1] - W0) / RES - 0.5));
      for (let x = a; x <= b; x++) land[idx(x, y)] = 1;
    }
  }
}

// 2) 太窄、格網解析度畫不出來的海峽：沿中線開出水道（座標取自海峽中線，約略）
const STRAITS: Record<string, P[]> = {
  博斯普魯斯: [[29.13, 41.23], [29.07, 41.15], [29.05, 41.09], [29.0, 41.02], [28.99, 40.99]],
  達達尼爾: [[26.18, 40.02], [26.27, 40.08], [26.4, 40.2], [26.45, 40.25], [26.68, 40.39], [26.72, 40.45]],
  墨西拿: [[15.58, 37.95], [15.62, 38.12], [15.64, 38.22], [15.65, 38.27]],
  博尼法喬: [[9.05, 41.35], [9.3, 41.32], [9.45, 41.3]],
  優里普斯: [[23.55, 38.53], [23.59, 38.46], [23.62, 38.42]],
};
for (const line of Object.values(STRAITS)) for (let i = 1; i < line.length; i++) {
  const [a, b] = [line[i - 1], line[i]], n = Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) / (RES / 3));
  for (let t = 0; t <= n; t++) {
    const x = cx(a[0] + ((b[0] - a[0]) * t) / n), y = cy(a[1] + ((b[1] - a[1]) * t) / n);
    for (let dx = -1; dx <= 1; dx++) for (let dy = -1; dy <= 1; dy++) land[idx(x + dx, y + dy)] = 0;
  }
}

const water = (x: number, y: number) => x >= 0 && y >= 0 && x < NX && y < NY && !land[idx(x, y)];
function snap(p: P): [number, number] {
  const x0 = cx(p[0]), y0 = cy(p[1]);
  for (let r = 0; r < 200; r++) {
    let best: [number, number] | null = null, bd = Infinity;
    for (let dx = -r; dx <= r; dx++) for (let dy = -r; dy <= r; dy++) {
      if (Math.max(Math.abs(dx), Math.abs(dy)) !== r || !water(x0 + dx, y0 + dy)) continue;
      const d = dx * dx + dy * dy; if (d < bd) { bd = d; best = [x0 + dx, y0 + dy]; }
    }
    if (best) return best;
  }
  throw new Error(`找不到 ${p} 附近的海`);
}
const visible = (a: [number, number], b: [number, number]) => {
  const n = Math.max(Math.abs(b[0] - a[0]), Math.abs(b[1] - a[1])) * 2;
  for (let t = 0; t <= n; t++) { const x = Math.round(a[0] + ((b[0] - a[0]) * t) / n), y = Math.round(a[1] + ((b[1] - a[1]) * t) / n); if (!water(x, y)) return false; }
  return true;
};

export function seaPath(from: P, to: P): { coords: P[]; km: number } {
  const s = snap(from), g = snap(to);
  const N = NX * NY, gScore = new Float64Array(N).fill(Infinity), came = new Int32Array(N).fill(-1), closed = new Uint8Array(N);
  const kx = (y: number) => Math.cos((latOf(y) * Math.PI) / 180);
  const h = (x: number, y: number) => Math.hypot((x - g[0]) * kx(y), y - g[1]);
  const heap: number[] = [], f = new Float64Array(N);
  const push = (i: number) => { heap.push(i); let k = heap.length - 1; while (k && f[heap[(k - 1) >> 1]] > f[heap[k]]) { [heap[k], heap[(k - 1) >> 1]] = [heap[(k - 1) >> 1], heap[k]]; k = (k - 1) >> 1; } };
  const pop = () => { const top = heap[0], last = heap.pop()!; if (heap.length) { heap[0] = last; let k = 0; for (;;) { const l = 2 * k + 1, r = l + 1; let m = k; if (l < heap.length && f[heap[l]] < f[heap[m]]) m = l; if (r < heap.length && f[heap[r]] < f[heap[m]]) m = r; if (m === k) break; [heap[k], heap[m]] = [heap[m], heap[k]]; k = m; } } return top; };
  const si = idx(s[0], s[1]), gi = idx(g[0], g[1]);
  gScore[si] = 0; f[si] = h(s[0], s[1]); push(si);
  while (heap.length) {
    const i = pop(); if (i === gi) break; if (closed[i]) continue; closed[i] = 1;
    const x = i % NX, y = (i / NX) | 0, k = kx(y);
    for (let dx = -1; dx <= 1; dx++) for (let dy = -1; dy <= 1; dy++) {
      if (!dx && !dy) continue;
      const nx = x + dx, ny = y + dy; if (!water(nx, ny)) continue;
      if (dx && dy && (!water(x + dx, y) || !water(x, y + dy))) continue; // 不從陸地斜角切過
      const ni = idx(nx, ny), ng = gScore[i] + Math.hypot(dx * k, dy);
      if (ng < gScore[ni]) { gScore[ni] = ng; came[ni] = i; f[ni] = ng + h(nx, ny); push(ni); }
    }
  }
  if (came[gi] === -1 && gi !== si) throw new Error(`海路不通：${from} → ${to}`);
  const cells: [number, number][] = [];
  for (let i = gi; i !== -1; i = came[i]) cells.push([i % NX, (i / NX) | 0]);
  cells.reverse();
  // 拉直：從目前點往後找最遠、中間全是水的點
  const kept: [number, number][] = [cells[0]];
  for (let i = 0; i < cells.length - 1;) {
    let j = cells.length - 1; while (j > i + 1 && !visible(cells[i], cells[j])) j--;
    kept.push(cells[j]); i = j;
  }
  const coords: P[] = [from, ...kept.map(([x, y]) => [lngOf(x), latOf(y)] as P), to];
  let km = 0; for (let i = 1; i < coords.length; i++) { const [a, b] = [coords[i - 1], coords[i]]; km += 111.2 * Math.hypot((b[0] - a[0]) * Math.cos(((a[1] + b[1]) / 2) * Math.PI / 180), b[1] - a[1]); }
  return { coords, km };
}
