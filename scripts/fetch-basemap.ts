// npm run basemap -- US：下載 Natural Earth 50m admin-1 州界，只留指定國家，存成 data/ne/<out>.geojson
// 給 scripts/build-power.ts 拼勢力／領土示意圖用（yaml 的 basemap 欄位指到檔名）。要別的國家就在 BASEMAPS 加一列。
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const URL = 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_50m_admin_1_states_provinces.geojson';
const URL0 = 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_50m_admin_0_countries.geojson';
// extra0：50m admin-1 沒有分省的鄰國，整國用 admin-0 國界補上（code 用 ISO 3166-1 二碼）
const BASEMAPS: Record<string, { adm0: string; adm0s?: string[]; url1?: string; digits?: number; out: string; label: string; extra0?: { a3: string; code: string; name: string }[]; only0?: string[]; url0?: string }> = {
  // WORLD：全世界各國（Natural Earth 110m，檔案較小），給冷戰等全球專題用；only0 寫 ['*'] 表示全部國家
  WORLD: { adm0: '', out: 'world_countries', label: '全世界各國（今日國界，110m 精度）', only0: ['*'], url0: 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson' },
  // 歐洲國界（法國大革命、拿破崙）：只用 admin-0，code＝ISO 3166-1 二碼；俄羅斯只留東經 60° 以西由 build-power 切
  EU: { adm0: '', out: 'europe_countries', label: '歐洲與地中海周邊各國（今日國界）', only0: ['FRA','BEL','LUX','NLD','DEU','CHE','AUT','CZE','SVK','HUN','POL','LTU','LVA','EST','BLR','UKR','MDA','ROU','BGR','SRB','MNE','BIH','HRV','SVN','ALB','MKD','GRC','ITA','ESP','PRT','GBR','IRL','DNK','NOR','SWE','FIN','RUS','TUR','KOS','AND','MCO','SMR','LIE','MLT','CYP'] },
  US: { adm0: 'USA', out: 'us_states', label: '美國 50 州與哥倫比亞特區' },
  // 三國勢力圖：中國 31 省級區，加越南（交州南端）、北韓（樂浪、帶方）整國
  CN: { adm0: 'CHN', out: 'china_provinces', label: '中國 31 個省級行政區（不含港澳臺），另加越南、北韓、南韓整國', extra0: [
    { a3: 'VNM', code: 'VN', name: 'Vietnam' }, { a3: 'PRK', code: 'KP', name: 'North Korea' }, { a3: 'KOR', code: 'KR', name: 'South Korea' } ] },
  // 中南半島（占婆與南進、吳哥）：50m admin-1 沒有越南、柬埔寨的省，改用 10m（下載約 40 MB）；座標只留 2 位小數讓檔案變小
  // 寮國、泰國整國用 admin-0 補上（吳哥極盛時伸進今天泰國東北、寮國南部，只當背景）
  IC: { adm0: '', adm0s: ['VNM', 'KHM'], url1: 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_admin_1_states_provinces.geojson', digits: 2, out: 'indochina_provinces', label: '越南 63 省、柬埔寨 24 省（Natural Earth 10m 的舊省界），另加寮國、泰國整國', extra0: [
    { a3: 'LAO', code: 'LA', name: 'Laos' }, { a3: 'THA', code: 'TH', name: 'Thailand' } ] },
  // 愛琴海世界（古希臘）：希臘 admin-1（10m：14 區＝13 個大區＋阿索斯山）＋土耳其 81 省（愛奧尼亞海岸、小亞細亞）；
  // 阿爾巴尼亞、北馬其頓、保加利亞、賽普勒斯用 admin-0 整國補上（它們的 admin-1 太碎或不需要）。座標 2 位小數讓檔案變小
  AEGEAN: { adm0: '', adm0s: ['GRC', 'TUR'], url1: 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_admin_1_states_provinces.geojson', digits: 2, out: 'aegean', label: '希臘 14 個行政區、土耳其 81 省，另加阿爾巴尼亞、北馬其頓、保加利亞、賽普勒斯整國（CY＋CY-N 合起來是整座島）', extra0: [
    { a3: 'ALB', code: 'AL', name: 'Albania' }, { a3: 'MKD', code: 'MK', name: 'North Macedonia' }, { a3: 'BGR', code: 'BG', name: 'Bulgaria' }, { a3: 'CYP', code: 'CY', name: 'Cyprus' }, { a3: 'CYN', code: 'CY-N', name: 'Northern Cyprus' } ] },
};

const key = (process.argv[2] ?? '').toUpperCase();
const spec = BASEMAPS[key];
if (!spec) { console.error(`用法：npm run basemap -- <${Object.keys(BASEMAPS).join('|')}>`); process.exit(1); }

const MUL = 10 ** (spec?.digits ?? 3);
// 四捨五入後去掉重複的相鄰點（10m 的海岸線點很密，2 位小數後會重疊很多）
const round = (v: any): any => {
  if (!Array.isArray(v)) return typeof v === 'number' ? Math.round(v * MUL) / MUL : v;
  if (typeof v[0] === 'number') return v.map(round);
  const out = v.map(round);
  if (Array.isArray(out[0]) && typeof out[0][0] === 'number') {
    const ded = out.filter((p: number[], i: number) => i === 0 || p[0] !== out[i - 1][0] || p[1] !== out[i - 1][1]);
    return ded.length >= 4 ? ded : out;
  }
  return out;
};
if (spec.only0) {
  const u0 = spec.url0 ?? URL0;
  const r0 = await fetch(u0);
  if (!r0.ok) throw new Error(`下載失敗：${r0.status} ${u0}`);
  const fs0 = (await r0.json()).features.filter((f: any) => spec.only0!.includes('*') || spec.only0!.includes(f.properties.ADM0_A3));
  const feats = fs0.map((f: any) => ({ type: 'Feature', properties: { code: f.properties.ADM0_A3 === 'KOS' ? 'XK' : (f.properties.ISO_A2_EH ?? f.properties.ISO_A2), name: f.properties.NAME, postal: f.properties.ADM0_A3 }, geometry: { type: f.geometry.type, coordinates: round(f.geometry.coordinates) } }));
  const out = { type: 'FeatureCollection', source: `Natural Earth ${spec.url0 ? '110m' : '50m'} admin-0 countries（公有領域）, https://github.com/nvkelso/natural-earth-vector`, note: `只留${spec.label}，座標四捨五入至小數點後 3 位；給 scripts/build-power.ts 拼勢力示意圖用`, features: feats };
  const file = path.join(ROOT, 'data/ne', `${spec.out}.geojson`);
  fs.writeFileSync(file, JSON.stringify(out));
  console.log(`basemap：${feats.length} 個區域 → ${path.relative(ROOT, file)}（${(fs.statSync(file).size / 1024).toFixed(0)} KB）：${feats.map((f: any) => f.properties.code).join(' ')}`);
  process.exit(0);
}
const res = await fetch(spec.url1 ?? URL);
if (!res.ok) throw new Error(`下載失敗：${res.status} ${spec.url1 ?? URL}`);
const all: any = await res.json();
const features: any[] = all.features
  .filter((f: any) => (spec.adm0s ?? [spec.adm0]).includes(f.properties.adm0_a3))
  .map((f: any) => ({
    type: 'Feature',
    properties: { code: f.properties.iso_3166_2, name: f.properties.name, postal: f.properties.postal },
    geometry: { type: f.geometry.type, coordinates: round(f.geometry.coordinates) },
  }));
for (const x of spec.extra0 ?? []) {
  const r0 = await fetch(URL0);
  if (!r0.ok) throw new Error(`下載失敗：${r0.status} ${URL0}`);
  const c: any = (await r0.json()).features.find((f: any) => f.properties.ADM0_A3 === x.a3);
  if (!c) throw new Error(`admin-0 找不到 ${x.a3}`);
  features.push({ type: 'Feature', properties: { code: x.code, name: x.name, postal: x.code }, geometry: { type: c.geometry.type, coordinates: round(c.geometry.coordinates) } });
}
if (!features.length) throw new Error(`篩不到 adm0_a3 = ${spec.adm0s ?? spec.adm0} 的區域`);
const out = {
  type: 'FeatureCollection',
  source: `Natural Earth ${spec.url1 ? '10m' : '50m'} admin-1 states/provinces（公有領域）, https://github.com/nvkelso/natural-earth-vector`,
  note: `只留${spec.label}，座標四捨五入至小數點後 ${spec.digits ?? 3} 位；給 scripts/build-power.ts 拼領土擴張示意圖用`,
  features,
};
const file = path.join(ROOT, 'data/ne', `${spec.out}.geojson`);
fs.mkdirSync(path.dirname(file), { recursive: true });
fs.writeFileSync(file, JSON.stringify(out));
console.log(`basemap：${features.length} 個區域 → ${path.relative(ROOT, file)}（${(fs.statSync(file).size / 1024).toFixed(0)} KB）`);
