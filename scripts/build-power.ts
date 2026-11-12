// npm run power：把 data/dives/<專題>/power-<年>.yaml（勢力 → 底圖區域）拼成 power-<年>.geojson（勢力／領土示意圖）；西元前的年份檔名寫 power-bc431.yaml（year: -431）
// 底圖多邊形來自 data/ne/<basemap>.geojson（Natural Earth，公有領域）：預設 japan_prefectures（日本都道府縣），美國用 us_states（npm run basemap -- US）。
// 一個區域含兩個勢力時（例：愛知＝尾張＋三河、懷俄明＝購地＋奧勒岡）用 lng_lt／lng_gt／lat_lt／lat_gt 以經線或緯線切開；切法見 docs/dives.md。
import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';

const ROOT = path.resolve(import.meta.dirname, '..');
type Ring = number[][];
interface Base { gj: any; byCode: Map<string, any> }
const baseCache = new Map<string, Base>();
function loadBase(name: string): Base {
  let b = baseCache.get(name);
  if (!b) {
    const file = path.join(ROOT, 'data/ne', `${name}.geojson`);
    if (!fs.existsSync(file)) throw new Error(`找不到底圖 data/ne/${name}.geojson`);
    const gj = JSON.parse(fs.readFileSync(file, 'utf8'));
    b = { gj, byCode: new Map<string, any>(gj.features.map((f: any) => [f.properties.code, f])) };
    baseCache.set(name, b);
  }
  return b;
}

// Sutherland–Hodgman：用一條經線（axis 0）或緯線（axis 1）把多邊形切成較小（keepLow）或較大的一半
function clipRing(ring: Ring, axis: 0 | 1, v: number, keepLow: boolean): Ring {
  const inside = (p: number[]) => (keepLow ? p[axis] <= v : p[axis] >= v);
  const cross = (a: number[], b: number[]) => {
    const t = (v - a[axis]) / (b[axis] - a[axis]);
    const o = [a[0] + t * (b[0] - a[0]), a[1] + t * (b[1] - a[1])];
    o[axis] = v;
    return o;
  };
  const out: Ring = [];
  for (let i = 0; i < ring.length; i++) {
    const a = ring[i], b = ring[(i + 1) % ring.length];
    if (inside(a)) { out.push(a); if (!inside(b)) out.push(cross(a, b)); }
    else if (inside(b)) out.push(cross(a, b));
  }
  return out.length >= 3 ? out : [];
}
function polys(geom: any): Ring[][] { return geom.type === 'Polygon' ? [geom.coordinates] : geom.coordinates; }
function clipPolys(ps: Ring[][], axis: 0 | 1, v: number, keepLow: boolean): Ring[][] {
  return ps.map((poly) => poly.map((r) => clipRing(r, axis, v, keepLow)).filter((r) => r.length)).filter((poly) => poly.length && poly[0].length);
}

const dives = fs.readdirSync(path.join(ROOT, 'data/dives'), { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => e.name);
let n = 0;
for (const d of dives) {
  const dir = path.join(ROOT, 'data/dives', d);
  for (const f of fs.readdirSync(dir).filter((x) => /^power-(bc)?\d+\.yaml$/.test(x))) {
    const spec = YAML.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
    const basemap: string = spec.basemap ?? 'japan_prefectures';
    const base = loadBase(basemap);
    const features: any[] = [];
    for (const p of spec.powers ?? []) {
      let all: Ring[][] = [];
      for (const item of p.regions ?? p.prefs ?? []) {
        const code = typeof item === 'string' ? item : (item.code ?? item.pref);
        const src = base.byCode.get(code);
        if (!src) throw new Error(`${f}：找不到底圖區域 ${code}（底圖 ${basemap}）`);
        let ps = polys(src.geometry);
        if (typeof item !== 'string') {
          if (item.lng_lt !== undefined) ps = clipPolys(ps, 0, item.lng_lt, true);
          if (item.lng_gt !== undefined) ps = clipPolys(ps, 0, item.lng_gt, false);
          if (item.lat_lt !== undefined) ps = clipPolys(ps, 1, item.lat_lt, true);
          if (item.lat_gt !== undefined) ps = clipPolys(ps, 1, item.lat_gt, false);
        }
        all = all.concat(ps);
      }
      if (all.length === 0) throw new Error(`${f}：勢力「${p.name}」切完沒有任何多邊形，檢查切線`);
      features.push({ type: 'Feature', properties: { name: p.name, en: p.en ?? '', color: p.color ?? '#888', provinces: p.area ?? p.provinces ?? '', card: p.card ?? null, minor: !!p.minor }, geometry: { type: 'MultiPolygon', coordinates: all } });
    }
    const out: any = { type: 'FeatureCollection', year: spec.year, title: spec.title, note: spec.note ?? '', sources: spec.sources ?? [],
      basemap: `${base.gj.source}；${base.gj.note}`, ...(spec.view ? { view: spec.view } : {}), features };
    fs.writeFileSync(path.join(dir, f.replace(/\.yaml$/, '.geojson')), JSON.stringify(out));
    n++;
    console.log(`build-power：${d}/${f} → ${features.length} 個勢力`);
  }
}
console.log(`共 ${n} 張勢力圖`);
