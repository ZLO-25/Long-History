// npm run power：把 data/dives/<專題>/power-<年>.yaml（勢力 → 都道府縣）拼成 power-<年>.geojson（大名勢力示意圖）
// 底圖多邊形來自 data/ne/japan_prefectures.geojson（Natural Earth，公有領域）。
// 一縣含兩國時（例：愛知＝尾張＋三河）用 lng_lt／lng_gt 以一條經線切開；切法見 docs/dives.md。
import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';

const ROOT = path.resolve(import.meta.dirname, '..');
type Ring = number[][];
const pref = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/ne/japan_prefectures.geojson'), 'utf8'));
const byCode = new Map<string, any>(pref.features.map((f: any) => [f.properties.code, f]));

// Sutherland–Hodgman：用一條經線把多邊形切成「西半」或「東半」
function clipRing(ring: Ring, lng: number, keepWest: boolean): Ring {
  const inside = (p: number[]) => (keepWest ? p[0] <= lng : p[0] >= lng);
  const cross = (a: number[], b: number[]) => { const t = (lng - a[0]) / (b[0] - a[0]); return [lng, a[1] + t * (b[1] - a[1])]; };
  const out: Ring = [];
  for (let i = 0; i < ring.length; i++) {
    const a = ring[i], b = ring[(i + 1) % ring.length];
    if (inside(a)) { out.push(a); if (!inside(b)) out.push(cross(a, b)); }
    else if (inside(b)) out.push(cross(a, b));
  }
  return out.length >= 3 ? out : [];
}
function polys(geom: any): Ring[][] { return geom.type === 'Polygon' ? [geom.coordinates] : geom.coordinates; }
function clipPolys(ps: Ring[][], lng: number, keepWest: boolean): Ring[][] {
  return ps.map((poly) => poly.map((r) => clipRing(r, lng, keepWest)).filter((r) => r.length)).filter((poly) => poly.length && poly[0].length);
}

const dives = fs.readdirSync(path.join(ROOT, 'data/dives'), { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => e.name);
let n = 0;
for (const d of dives) {
  const dir = path.join(ROOT, 'data/dives', d);
  for (const f of fs.readdirSync(dir).filter((x) => /^power-\d+\.yaml$/.test(x))) {
    const spec = YAML.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
    const features: any[] = [];
    for (const p of spec.powers ?? []) {
      let all: Ring[][] = [];
      for (const item of p.prefs ?? []) {
        const code = typeof item === 'string' ? item : item.pref;
        const src = byCode.get(code);
        if (!src) throw new Error(`${f}：找不到都道府縣 ${code}`);
        let ps = polys(src.geometry);
        if (typeof item !== 'string' && item.lng_lt !== undefined) ps = clipPolys(ps, item.lng_lt, true);
        if (typeof item !== 'string' && item.lng_gt !== undefined) ps = clipPolys(ps, item.lng_gt, false);
        all = all.concat(ps);
      }
      features.push({ type: 'Feature', properties: { name: p.name, en: p.en ?? '', color: p.color ?? '#888', provinces: p.provinces ?? '', card: p.card ?? null }, geometry: { type: 'MultiPolygon', coordinates: all } });
    }
    const out = { type: 'FeatureCollection', year: spec.year, title: spec.title, note: spec.note ?? '', sources: spec.sources ?? [],
      basemap: 'Natural Earth 10m admin-1（公有領域）；以今日都道府縣近似令制國，邊界為示意', features };
    fs.writeFileSync(path.join(dir, f.replace(/\.yaml$/, '.geojson')), JSON.stringify(out));
    n++;
    console.log(`build-power：${d}/${f} → ${features.length} 個勢力`);
  }
}
console.log(`共 ${n} 張勢力圖`);
