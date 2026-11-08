// npm run peoples：從 Glottolog（CC BY 4.0）產生人群圖層的語言點 → data/peoples/languages.json
// 每種語言一個「代表位置」（Glottolog 的座標），依 data/peoples/families.yaml 分到語系色。
// 來源檔可先下載再用 GLOTTOLOG_CSV=檔案 指定；沒指定就從 GitHub 下載固定版本（v5.2.1）。
// 注意：Glottolog 的 Countries 欄位把臺灣的語言標成 CN，本站不用這個欄位。
import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';
import { ROOT } from './lib/cards.ts';

const VERSION = 'v5.2.1';
const URL = `https://raw.githubusercontent.com/glottolog/glottolog-cldf/${VERSION}/cldf/languages.csv`;

// 簡單的 CSV 解析（支援雙引號欄位）
function parseCsv(text: string): Record<string, string>[] {
  const rows: string[][] = [];
  let row: string[] = [], cell = '', q = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (q) {
      if (ch === '"') { if (text[i + 1] === '"') { cell += '"'; i++; } else q = false; } else cell += ch;
    } else if (ch === '"') q = true;
    else if (ch === ',') { row.push(cell); cell = ''; }
    else if (ch === '\n') { row.push(cell.replace(/\r$/, '')); rows.push(row); row = []; cell = ''; }
    else cell += ch;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  const [head, ...body] = rows;
  return body.filter((r) => r.length === head.length).map((r) => Object.fromEntries(head.map((h, i) => [h, r[i]])));
}

const csv = process.env.GLOTTOLOG_CSV && fs.existsSync(process.env.GLOTTOLOG_CSV)
  ? fs.readFileSync(process.env.GLOTTOLOG_CSV, 'utf8')
  : await fetch(URL).then((r) => { if (!r.ok) throw new Error(`下載 Glottolog 失敗：HTTP ${r.status}`); return r.text(); });
const rows = parseCsv(csv);
const fams = YAML.parse(fs.readFileSync(path.join(ROOT, 'data/peoples/families.yaml'), 'utf8'));
const byGlotto = new Map<string, string>();
for (const f of fams.families) for (const g of f.glottolog ?? []) byGlotto.set(g, f.id);
const byMacro = new Map<string, string>();
for (const f of fams.families) for (const m of f.macro ?? []) byMacro.set(m, f.id);
const skip = new Set<string>(fams.skip ?? []);

const out: [string, number, number, string, string][] = [];
const count: Record<string, number> = {};
for (const r of rows) {
  if (r.Level !== 'language' || !r.Latitude || !r.Longitude) continue;
  if (skip.has(r.Family_ID)) continue;
  const macro = r.Macroarea.split(';')[0];
  const fam = byGlotto.get(r.Family_ID) ?? byMacro.get(macro) ?? 'other';
  const r3 = (x: string) => Math.round(Number(x) * 1000) / 1000;
  out.push([r.Name, r3(r.Latitude), r3(r.Longitude), fam, r.ID]);
  count[fam] = (count[fam] ?? 0) + 1;
}
const file = path.join(ROOT, 'data/peoples/languages.json');
fs.writeFileSync(file, JSON.stringify({
  source: `Glottolog ${VERSION.slice(1)}（Hammarström, Forkel, Haspelmath & Bank 2025, Max Planck Institute for Evolutionary Anthropology），CC BY 4.0，https://glottolog.org`,
  fields: ['名稱', '緯度', '經度', '語系', 'Glottocode'],
  note: '每種語言一個代表座標，不是使用人數或分布範圍；手語、皮欽語、人造語言等不畫',
  languages: out,
}));
console.log(`build-peoples：${out.length} 種語言 → data/peoples/languages.json`, count);

// 國界：Natural Earth 1:50m（公有領域）。110m 版的臺灣只有 8 個點，放大看很失真，所以人群圖層改用 50m；
// 座標四捨五入到小數點後 2 位（約 1 公里），去掉重複點，只留 countries.yaml 有的國家
const NE50 = 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_50m_admin_0_countries.geojson';
const ne50: any = process.env.NE50 && fs.existsSync(process.env.NE50) ? JSON.parse(fs.readFileSync(process.env.NE50, 'utf8'))
  : await fetch(NE50).then((r) => { if (!r.ok) throw new Error(`下載 Natural Earth 50m 失敗：HTTP ${r.status}`); return r.json(); });
const names = new Set(Object.keys(YAML.parse(fs.readFileSync(path.join(ROOT, 'data/peoples/countries.yaml'), 'utf8'))));
const r2 = (x: number) => Math.round(x * 100) / 100;
const ring = (r: number[][]) => { const o: number[][] = []; for (const [x, y] of r) { const q = [r2(x), r2(y)]; const l = o[o.length - 1]; if (!l || l[0] !== q[0] || l[1] !== q[1]) o.push(q); } return o.length >= 4 ? o : null; };
const poly = (p: number[][][]) => { const rs = p.map(ring); return rs[0] ? rs.filter(Boolean) as number[][][] : null; };
const feats = ne50.features.filter((f: any) => names.has(f.properties.NAME)).map((f: any) => {
  const g = f.geometry;
  const polys = (g.type === 'Polygon' ? [g.coordinates] : g.coordinates).map(poly).filter(Boolean);
  return { type: 'Feature', properties: { name: f.properties.NAME }, geometry: { type: 'MultiPolygon', coordinates: polys } };
});
fs.writeFileSync(path.join(ROOT, 'data/peoples/countries-50m.geojson'), JSON.stringify({ type: 'FeatureCollection', source: 'Natural Earth 1:50m admin-0 countries（公有領域），座標取到小數點後 2 位', features: feats }));
console.log(`build-peoples：${feats.length} 國國界（50m）→ data/peoples/countries-50m.geojson`);
