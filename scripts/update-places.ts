// npm run places：從 Pleiades 開放資料（GitHub 鏡像）抓出卡片與路線用到的地點，寫入 data/places.json
// 資料授權：CC BY 3.0（https://github.com/isawnyu/pleiades.datasets）
import fs from 'node:fs';
import path from 'node:path';
import { loadCards, readYaml, ROOT } from './lib/cards.ts';

const URL_CSV = 'https://raw.githubusercontent.com/isawnyu/pleiades.datasets/main/data/gis/places.csv';
const cache = path.join(ROOT, 'node_modules', '.cache', 'pleiades-places.csv');

const ids = new Set<string>();
for (const c of loadCards()) for (const l of c.fm?.place?.locations ?? []) if (l.pleiades_id) ids.add(String(l.pleiades_id));
for (const r of readYaml('data/routes/routes.yaml')?.routes ?? []) for (const w of r.waypoints ?? []) if (typeof w === 'string') ids.add(w);

if (!fs.existsSync(cache) || process.argv.includes('--refresh')) {
  console.log('下載 Pleiades places.csv（約 16 MB）…');
  const res = await fetch(URL_CSV);
  if (!res.ok) throw new Error(`下載失敗：HTTP ${res.status}`);
  fs.mkdirSync(path.dirname(cache), { recursive: true });
  fs.writeFileSync(cache, Buffer.from(await res.arrayBuffer()));
}

// 簡易 CSV 解析（支援引號與跨行）
function* rows(text: string) {
  let row: string[] = [], cell = '', q = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (q) { if (ch === '"') { if (text[i + 1] === '"') { cell += '"'; i++; } else q = false; } else cell += ch; }
    else if (ch === '"') q = true;
    else if (ch === ',') { row.push(cell); cell = ''; }
    else if (ch === '\n') { row.push(cell.replace(/\r$/, '')); yield row; row = []; cell = ''; }
    else cell += ch;
  }
  if (cell || row.length) { row.push(cell); yield row; }
}
const text = fs.readFileSync(cache, 'utf8').replace(/^﻿/, '');
const it = rows(text);
const head = it.next().value as string[];
const col = (n: string) => head.indexOf(n);
const out: Record<string, any> = {};
for (const r of it) {
  const id = r[col('id')];
  if (!ids.has(id)) continue;
  out[id] = {
    title: r[col('title')],
    lat: Math.round(Number(r[col('representative_latitude')]) * 1e5) / 1e5,
    lng: Math.round(Number(r[col('representative_longitude')]) * 1e5) / 1e5,
    precision: r[col('location_precision')],
    uri: r[col('uri')],
  };
}
const missing = [...ids].filter((i) => !out[i]);
fs.writeFileSync(path.join(ROOT, 'data', 'places.json'), JSON.stringify({
  source: 'Pleiades gazetteer, https://pleiades.stoa.org（GitHub: isawnyu/pleiades.datasets）',
  license: 'CC BY 3.0',
  fetched: new Date().toISOString().slice(0, 10),
  places: Object.fromEntries(Object.entries(out).sort()),
}, null, 1));
console.log(`寫入 ${Object.keys(out).length} 個地點到 data/places.json${missing.length ? `；找不到：${missing.join(', ')}` : ''}`);
