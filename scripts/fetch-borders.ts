// npm run borders：從 historical-basemaps 下載中世紀到現代的疆域快照，精簡後存到 data/borders/ 並更新 index.json
// 精簡方式與既有快照相同：去除無名稱區塊、只留 name／subject_to／border_precision、座標四捨五入到小數點後 2 位
import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from './lib/cards.ts';

const YEARS = [600, 800, 1000, 1200, 1279, 1400, 1500, 1600, 1700, 1800, 1880, 1914, 1938, 1945, 1960, 1994, 2010];
const BASE = 'https://raw.githubusercontent.com/aourednik/historical-basemaps/master/geojson/';
const dir = path.join(ROOT, 'data', 'borders');
const r2 = (x: any): any => (typeof x === 'number' ? Math.round(x * 100) / 100 : x.map(r2));

const idxPath = path.join(dir, 'index.json');
const idx = JSON.parse(fs.readFileSync(idxPath, 'utf8'));
for (const y of YEARS) {
  const file = `world_${y}.geojson`;
  const res = await fetch(BASE + file);
  if (!res.ok) { console.warn(`略過 ${file}：HTTP ${res.status}`); continue; }
  const gj: any = await res.json();
  const features = gj.features
    .filter((f: any) => f.properties?.NAME && f.geometry)
    .map((f: any) => ({ type: 'Feature',
      properties: { name: f.properties.NAME, subject_to: f.properties.SUBJECTO ?? f.properties.NAME, border_precision: f.properties.BORDERPRECISION ?? 1 },
      geometry: { type: f.geometry.type, coordinates: r2(f.geometry.coordinates) } }));
  fs.writeFileSync(path.join(dir, file), JSON.stringify({ type: 'FeatureCollection', year: y, features }));
  if (!idx.snapshots.some((s: any) => s.year === y)) idx.snapshots.push({ year: y, file });
  console.log(`${file}：${features.length} 個區塊`);
}
idx.snapshots.sort((a: any, b: any) => a.year - b.year);
fs.writeFileSync(idxPath, JSON.stringify(idx, null, 1));
