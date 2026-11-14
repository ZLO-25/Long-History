// npx tsx scripts/fetch-rivers.ts：下載 Natural Earth 1:50m 河流與湖泊（公有領域），存成 data/ne/rivers-lakes-50m.json（故事地圖用）
// 只留幾何、座標到小數兩位；河名用 data/labels/basemap-labels.json 的 v（已校訂的繁中）。
import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from './lib/cards.ts';

const BASE = 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/';
const get = async (f: string) => { const r = await fetch(BASE + f); if (!r.ok) throw new Error(`${f}: ${r.status}`); return r.json(); };
const flat = (line: number[][]) => line.flatMap(([x, y]) => [Math.round(x * 100) / 100, Math.round(y * 100) / 100]);
const lines = (g: any) => g.type === 'LineString' ? [g.coordinates] : g.type === 'MultiLineString' ? g.coordinates : [];
const rings = (g: any) => g.type === 'Polygon' ? [g.coordinates[0]] : g.type === 'MultiPolygon' ? g.coordinates.map((p: any) => p[0]) : [];

const rivers = (await get('ne_50m_rivers_lake_centerlines.geojson')).features.flatMap((f: any) => lines(f.geometry).map((l: number[][]) => [f.properties.scalerank, ...flat(l)]));
const lakes = (await get('ne_50m_lakes.geojson')).features.flatMap((f: any) => rings(f.geometry).map((l: number[][]) => [f.properties.scalerank, ...flat(l)]));
const out = path.join(ROOT, 'data/ne/rivers-lakes-50m.json');
fs.writeFileSync(out, JSON.stringify({ source: 'Natural Earth 1:50m rivers_lake_centerlines、lakes（公有領域），https://www.naturalearthdata.com；每筆第一個數字是 scalerank，後面是經度、緯度交錯', rivers, lakes }));
console.log(`河流 ${rivers.length} 段、湖泊 ${lakes.length} 個 → ${path.relative(ROOT, out)}（${Math.round(fs.statSync(out).size / 1024)} KB）`);
