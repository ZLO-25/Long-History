// npm run basemap -- US：下載 Natural Earth 50m admin-1 州界，只留指定國家，存成 data/ne/<out>.geojson
// 給 scripts/build-power.ts 拼勢力／領土示意圖用（yaml 的 basemap 欄位指到檔名）。要別的國家就在 BASEMAPS 加一列。
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const URL = 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_50m_admin_1_states_provinces.geojson';
const BASEMAPS: Record<string, { adm0: string; out: string; label: string }> = {
  US: { adm0: 'USA', out: 'us_states', label: '美國 50 州與哥倫比亞特區' },
};

const key = (process.argv[2] ?? '').toUpperCase();
const spec = BASEMAPS[key];
if (!spec) { console.error(`用法：npm run basemap -- <${Object.keys(BASEMAPS).join('|')}>`); process.exit(1); }

const round = (v: any): any => (Array.isArray(v) ? v.map(round) : typeof v === 'number' ? Math.round(v * 1000) / 1000 : v);
const res = await fetch(URL);
if (!res.ok) throw new Error(`下載失敗：${res.status} ${URL}`);
const all: any = await res.json();
const features = all.features
  .filter((f: any) => f.properties.adm0_a3 === spec.adm0)
  .map((f: any) => ({
    type: 'Feature',
    properties: { code: f.properties.iso_3166_2, name: f.properties.name, postal: f.properties.postal },
    geometry: { type: f.geometry.type, coordinates: round(f.geometry.coordinates) },
  }));
if (!features.length) throw new Error(`篩不到 adm0_a3 = ${spec.adm0} 的區域`);
const out = {
  type: 'FeatureCollection',
  source: 'Natural Earth 50m admin-1 states/provinces（公有領域）, https://github.com/nvkelso/natural-earth-vector',
  note: `只留${spec.label}，座標四捨五入至小數點後 3 位；給 scripts/build-power.ts 拼領土擴張示意圖用`,
  features,
};
const file = path.join(ROOT, 'data/ne', `${spec.out}.geojson`);
fs.mkdirSync(path.dirname(file), { recursive: true });
fs.writeFileSync(file, JSON.stringify(out));
console.log(`basemap：${features.length} 個區域 → ${path.relative(ROOT, file)}（${(fs.statSync(file).size / 1024).toFixed(0)} KB）`);
