// npm run roads：下載 Itiner-e 羅馬道路資料（Zenodo 17122148，CC BY 4.0），簡化後寫入 data/routes/itinere-simplified.geojson
// 原檔約 78 MB；簡化後約數 MB，地圖在前 312 年到 500 年之間以細線顯示。
// 引用：Itiner-e: A High-Resolution Dataset of Roads of the Roman Empire（static version 2024, v1.3），https://doi.org/10.5281/zenodo.17122148
import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from './lib/cards.ts';

const URL_GJ = 'https://zenodo.org/records/17122148/files/itinere_roads.geojson?download=1';
const cache = path.join(ROOT, 'node_modules', '.cache', 'itinere_roads.geojson');
const out = path.join(ROOT, 'data', 'routes', 'itinere-simplified.geojson');
const TOL = 0.01; // 簡化容許誤差（度，約 1 公里）

if (!fs.existsSync(cache) || process.argv.includes('--refresh')) {
  console.log('下載 Itiner-e 道路 GeoJSON（約 78 MB，需要幾分鐘）…');
  const res = await fetch(URL_GJ);
  if (!res.ok) throw new Error(`下載失敗：HTTP ${res.status}`);
  fs.mkdirSync(path.dirname(cache), { recursive: true });
  fs.writeFileSync(cache, Buffer.from(await res.arrayBuffer()));
}

type Pt = [number, number];
// 若座標是 Web Mercator（公尺），轉回經緯度
const toLngLat = ([x, y]: number[]): Pt =>
  Math.abs(x) > 180 || Math.abs(y) > 90
    ? [(x / 6378137) * (180 / Math.PI), (2 * Math.atan(Math.exp(y / 6378137)) - Math.PI / 2) * (180 / Math.PI)]
    : [x, y];

// Douglas–Peucker 線段簡化
function simplify(pts: Pt[]): Pt[] {
  if (pts.length < 3) return pts;
  const keep = new Uint8Array(pts.length); keep[0] = keep[pts.length - 1] = 1;
  const stack: [number, number][] = [[0, pts.length - 1]];
  while (stack.length) {
    const [a, b] = stack.pop()!;
    const [x1, y1] = pts[a], [x2, y2] = pts[b];
    const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy) || 1e-12;
    let max = 0, idx = -1;
    for (let i = a + 1; i < b; i++) {
      const d = Math.abs(dy * pts[i][0] - dx * pts[i][1] + x2 * y1 - y2 * x1) / len;
      if (d > max) { max = d; idx = i; }
    }
    if (max > TOL && idx > 0) { keep[idx] = 1; stack.push([a, idx], [idx, b]); }
  }
  return pts.filter((_, i) => keep[i]);
}
const round = (p: Pt): Pt => [Math.round(p[0] * 1000) / 1000, Math.round(p[1] * 1000) / 1000];

const src = JSON.parse(fs.readFileSync(cache, 'utf8'));
const lines: Pt[][] = [];
for (const f of src.features ?? []) {
  const g = f.geometry;
  if (!g) continue;
  const parts: number[][][] = g.type === 'LineString' ? [g.coordinates] : g.type === 'MultiLineString' ? g.coordinates : [];
  for (const part of parts) {
    const s = simplify(part.map(toLngLat)).map(round);
    if (s.length >= 2) lines.push(s);
  }
}
const gj = {
  type: 'FeatureCollection',
  properties: { source: 'Itiner-e static version 2024 v1.3, https://doi.org/10.5281/zenodo.17122148', license: 'CC BY 4.0', simplified: `Douglas–Peucker ${TOL}°` },
  features: [{ type: 'Feature', properties: {}, geometry: { type: 'MultiLineString', coordinates: lines } }],
};
fs.writeFileSync(out, JSON.stringify(gj));
console.log(`寫入 ${lines.length} 段道路到 ${path.relative(ROOT, out)}（${(fs.statSync(out).size / 1e6).toFixed(1)} MB）。執行 npm run dev 即可在地圖上看到。`);
