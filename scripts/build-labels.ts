// npm run labels：從 Natural Earth（公有領域）產生「繁體中文＋英文」底圖地名 → data/labels/basemap-labels.json
// 底圖本身不帶文字（各國當地文字學生看不懂），地名全部由這份資料畫上去。
// 來源檔可先下載到資料夾再用 NE_DIR=資料夾 指定；沒指定就直接從 GitHub 下載。
// 譯名：Natural Earth 的 name_zht 先經 OpenCC 轉成臺灣用字，再套 data/labels/basemap-overrides.yaml 的臺灣慣用譯名。
import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';
import polylabel from 'polylabel';
import { Converter } from 'opencc-js/cn2t';
import { ROOT } from './lib/cards.ts';

const BASE = 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/';
const load = async (name: string): Promise<any[]> => {
  const local = process.env.NE_DIR && path.join(process.env.NE_DIR, `${name}.geojson`);
  if (local && fs.existsSync(local)) return JSON.parse(fs.readFileSync(local, 'utf8')).features;
  const res = await fetch(BASE + name + '.geojson');
  if (!res.ok) throw new Error(`下載 ${name} 失敗：HTTP ${res.status}`);
  return ((await res.json()) as any).features;
};
const cn2tw = Converter({ from: 'cn', to: 'tw' });
// Natural Earth 的繁中名多半已是繁體、只夾雜少數簡體字；逐字轉換，但「簡繁同形」容易轉錯的字保留原字（例如 馬里亞納 不該變 馬裡亞納、烏干達 不該變 烏幹達）
const KEEP = new Set([...'里裏干台后谷松范余系只斗面冲制准卷胡于志郁布云咸占']);
const toTw = (s: string) => [...s].map((c) => (KEEP.has(c) ? c : cn2tw(c))).join('');
const ov = YAML.parse(fs.readFileSync(path.join(ROOT, 'data/labels/basemap-overrides.yaml'), 'utf8'));
const NAME: Record<string, string> = ov.names ?? {};
const EN: Record<string, string> = ov.english ?? {};
const SKIP = new Set<string>(ov.skip ?? []);
const MINZ: Record<string, number> = ov.min_zoom ?? {};

// 一筆地名：[類型, 中文, 英文, 緯度, 經度, 從第幾級縮放開始顯示, 優先序（越小越重要）]
// 類型：c 國家、o 海洋／海灣／海峽、r 地形區（山脈、沙漠、高原、半島…）、t 城市（★ 首都）、v 河流
type Label = [string, string, string, number, number, number, number];
const out: Label[] = [];
const r3 = (x: number) => Math.round(x * 1000) / 1000;
const zhOf = (en: string, zht: string | undefined) => NAME[en] ?? (zht ? toTw(zht).trim() : '');
const push = (t: string, en: string, zht: string | undefined, lat: number, lng: number, z: number, rank: number) => {
  if (SKIP.has(en)) return;
  const zh = zhOf(en, zht);
  if (!zh) return;
  out.push([t, zh, EN[en] ?? en, r3(lat), r3(lng), MINZ[en] ?? z, rank]);
};
// 多邊形取「離邊界最遠的點」當標籤位置（海灣、半島形狀彎曲時也不會落到外面）
const inside = (geom: any): [number, number] => {
  const polys = geom.type === 'Polygon' ? [geom.coordinates] : geom.coordinates;
  const ringArea = (r: number[][]) => Math.abs(r.reduce((s, p, i) => { const q = r[(i + 1) % r.length]; return s + p[0] * q[1] - q[0] * p[1]; }, 0) / 2);
  const big = polys.reduce((a: any, b: any) => (ringArea(b[0]) > ringArea(a[0]) ? b : a));
  const p = polylabel(big, 0.05);
  return [p[1], p[0]];
};

// 國家（今天的國界；只在對照位置用，歷史疆域另有圖層）
for (const f of await load('ne_50m_admin_0_countries')) {
  const p = f.properties;
  if (p.LABEL_Y < -60) continue;
  push('c', p.NAME_EN, p.NAME_ZHT, p.LABEL_Y, p.LABEL_X, Math.max(2, Math.floor(p.MIN_LABEL)), p.LABELRANK);
}
// 海洋、海、灣、海峽
for (const f of await load('ne_50m_geography_marine_polys')) {
  const p = f.properties;
  if (p.featurecla === 'river' || p.featurecla === 'reef') continue;
  const [lat, lng] = inside(f.geometry);
  if (lat < -62) continue;
  push('o', p.name_en, p.name_zht, lat, lng, Math.max(1, Math.floor(p.min_label)), p.scalerank);
}
// 地形區：洲、山脈、沙漠、高原、盆地、平原、半島、群島、地理區
const REGION = new Set(['Continent', 'Range/mtn', 'Desert', 'Plateau', 'Basin', 'Plain', 'Lowland', 'Valley', 'Delta', 'Peninsula', 'Pen/cape', 'Isthmus', 'Island group', 'Island', 'Geoarea', 'Tundra', 'Wetlands', 'Gorge']);
const countryNames = new Set(out.filter((l) => l[0] === 'c').map((l) => l[2]));
for (const f of await load('ne_50m_geography_regions_polys')) {
  const p = f.properties;
  if (!REGION.has(p.FEATURECLA) || p.MIN_LABEL > 5.3) continue;
  const en = p.NAME_EN;
  if (['Island', 'Island group', 'Continent'].includes(p.FEATURECLA) && countryNames.has(en)) continue;
  const [lat, lng] = inside(f.geometry);
  if (lat < -60) continue;
  if (out.some((l) => l[0] === 'r' && l[2] === (EN[en] ?? en))) continue; // 同名多塊（例如分成兩半的山脈）只標一次
  push('r', en, p.NAME_ZHT, lat, lng, p.FEATURECLA === 'Continent' ? 1 : Math.max(3, Math.floor(p.MIN_LABEL)), p.SCALERANK + 2);
}
// 城市：Natural Earth 建議縮放 ≤ 6 的城市（約三千個，放大時才逐步出現）
// 「北京市」「釜山廣域市」這類行政後綴拿掉；英文名本身帶 City 的（胡志明市、瓜地馬拉市）保留
const cityZh = (en: string, zht: string) => {
  let zh = toTw(zht).replace(/(廣域市|特別市|特別自治市|地區)$/, '');
  if (!/City/.test(en)) zh = zh.replace(/(.{2,})[市區]$/, '$1');
  return zh;
};
for (const f of await load('ne_10m_populated_places')) {
  const p = f.properties;
  if (p.MIN_ZOOM > 6 || !p.NAME_ZHT || p.LATITUDE < -60) continue;
  const en = p.NAME_EN || p.NAME;
  push(p.ADM0CAP ? 'T' : 't', en, NAME[en] ?? cityZh(en, p.NAME_ZHT), p.LATITUDE, p.LONGITUDE, Math.max(3, Math.floor(p.MIN_ZOOM)), p.SCALERANK);
}
// 河流：Natural Earth 河流沒有中文名，只標 overrides 裡列出的主要河流，位置取該河最長一段的中點
const rivers: Record<string, { zh: string; en: string; z: number; ne: string[] }> = ov.rivers ?? {};
const segs = await load('ne_10m_rivers_lake_centerlines');
for (const [key, r] of Object.entries(rivers)) {
  const lines = segs.filter((f: any) => r.ne.includes(f.properties.name_en ?? f.properties.name)).flatMap((f: any) => (f.geometry.type === 'LineString' ? [f.geometry.coordinates] : f.geometry.coordinates));
  if (!lines.length) { console.warn(`找不到河流 ${key}`); continue; }
  const longest = lines.reduce((a: any, b: any) => (b.length > a.length ? b : a));
  const mid = longest[Math.floor(longest.length / 2)];
  out.push(['v', r.zh, r.en, r3(mid[1]), r3(mid[0]), r.z, 3]);
}
// 自訂地名（Natural Earth 沒有、但歷史課常用的地區與海峽）
for (const x of ov.extra ?? []) out.push([x.t, x.zh, x.en, x.lat, x.lng, x.z, x.rank ?? 3]);

// 重要的排前面：畫的時候先放的先佔位置
const ORDER: Record<string, number> = { o: 0, c: 1, T: 2, r: 3, v: 4, t: 5 };
out.sort((a, b) => a[5] - b[5] || ORDER[a[0]] - ORDER[b[0]] || a[6] - b[6]);
const dst = path.join(ROOT, 'data/labels/basemap-labels.json');
fs.writeFileSync(dst, JSON.stringify({
  source: 'Natural Earth（公有領域），https://www.naturalearthdata.com；中文經 OpenCC 轉臺灣用字並人工校訂',
  fields: ['類型', '中文', '英文', '緯度', '經度', '最小縮放', '優先序'],
  labels: out,
}));
const n = (t: string) => out.filter((l) => l[0] === t).length;
console.log(`build-labels：國家 ${n('c')}、海洋 ${n('o')}、地形區 ${n('r')}、城市 ${n('t') + n('T')}、河流 ${n('v')}、自訂 ${(ov.extra ?? []).length} → data/labels/basemap-labels.json`);
