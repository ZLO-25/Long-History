// 人群圖層（data/peoples/）：各國族群與語言（世界概況）＋語系色＋語言點（Glottolog）＋臺灣放大鏡 → public/data/peoples*.json
import fs from 'node:fs';
import path from 'node:path';
import { ROOT, readYaml, readJson, dateStr } from './cards.ts';

// 世界概況鏡像（factbook/factbook.json，公有領域）的檔案路徑：國名 → 區域/代碼
const FB_COMMIT = '144d6977b2b01ac1cbd220de754c0a005616760b';
const FB_DATE = '2026-09-11';
// Natural Earth 國名和世界概況國名不同的，對照到世界概況的代碼
export const FB_FIX: Record<string, string> = {
  'W. Sahara': 'wi', 'United States of America': 'us', 'Dem. Rep. Congo': 'cg', 'Dominican Rep.': 'dr', Bahamas: 'bf', 'Falkland Is.': 'fk',
  "Côte d'Ivoire": 'iv', 'Central African Rep.': 'ct', Congo: 'cf', 'Eq. Guinea': 'ek', eSwatini: 'wz', Palestine: 'we', Gambia: 'ga',
  'United Arab Emirates': 'ae', Myanmar: 'bm', 'Solomon Is.': 'bp', 'N. Cyprus': 'cy', Somaliland: 'so', 'Bosnia and Herz.': 'bk', 'S. Sudan': 'od',
};
// 底圖地名沒有中文的國家
const ZH_FIX: Record<string, string> = {
  'W. Sahara': '西撒哈拉', 'United States of America': '美國', 'Dem. Rep. Congo': '剛果民主共和國', 'Dominican Rep.': '多明尼加', Bahamas: '巴哈馬',
  'Falkland Is.': '福克蘭群島', 'Timor-Leste': '東帝汶', "Côte d'Ivoire": '象牙海岸', 'Central African Rep.': '中非', Congo: '剛果共和國',
  'Eq. Guinea': '赤道幾內亞', eSwatini: '史瓦帝尼', Gambia: '甘比亞', 'Solomon Is.': '索羅門群島', Czechia: '捷克', 'N. Cyprus': '北賽普勒斯',
  'Bosnia and Herz.': '波士尼亞與赫塞哥維納', 'S. Sudan': '南蘇丹',
};
const METHOD: Record<string, string> = {
  '': '依民族（各國的分法不一樣）', 國籍: '依國籍：只看護照，不是民族', 祖源: '依自報的祖先來源，可以選不只一個，所以加起來超過 100%',
  種族: '依這個國家人口普查的「種族」類別：類別是各國自己訂的', 出生地: '依出生的國家：移民的孩子在本國出生就算本國',
};

export interface PItem { t: string; p?: number; v?: string }
// 「德意志人 85.4；土耳其人 1.8」→ [{t, p, v}]；括號裡的分號不切
export function parseItems(s: string): PItem[] {
  const parts: string[] = []; let depth = 0, cur = '';
  for (const ch of String(s ?? '')) {
    if (ch === '（' || ch === '(') depth++;
    if (ch === '）' || ch === ')') depth--;
    if (ch === '；' && depth === 0) { parts.push(cur.trim()); cur = ''; } else cur += ch;
  }
  if (cur.trim()) parts.push(cur.trim());
  return parts.map((x) => {
    const m = x.match(/^(.*?)\s*((?:約|至少|不到)\s*)?(\d+(?:\.\d+)?)(?:–(\d+(?:\.\d+)?))?(（[^（）]*）)?$/);
    if (!m || !m[1]) return { t: x };
    const a = Number(m[3]), b = m[4] ? Number(m[4]) : null;
    return { t: (m[1] + (m[5] ?? '')).trim(), p: b != null ? (a + b) / 2 : a, v: `${m[2] ? m[2].trim() + ' ' : ''}${m[3]}${b != null ? '–' + m[4] : ''}%` };
  });
}

export function checkPeoples(): { level: 'error' | 'warning'; msg: string }[] {
  const out: { level: 'error' | 'warning'; msg: string }[] = [];
  const fams = readYaml('data/peoples/families.yaml');
  const famIds = new Set(fams.families.map((f: any) => f.id));
  const cs = readYaml('data/peoples/countries.yaml');
  const ne = readJson('data/ne/world_countries.geojson');
  for (const f of ne.features) {
    const n = f.properties.name;
    if (['Antarctica', 'Fr. S. Antarctic Lands'].includes(n)) continue;
    if (!cs[n]) out.push({ level: 'error', msg: `人群：countries.yaml 缺 ${n}` });
  }
  for (const [n, v] of Object.entries<any>(cs)) {
    if (!Array.isArray(v) || v.length < 6) { out.push({ level: 'error', msg: `人群：${n} 欄位數不對` }); continue; }
    if (!famIds.has(v[0])) out.push({ level: 'error', msg: `人群：${n} 的語系 ${v[0]} 不在 families.yaml` });
    if (!(String(v[3]) in METHOD)) out.push({ level: 'error', msg: `人群：${n} 的統計方式「${v[3]}」不認得` });
  }
  const tw = readYaml('data/peoples/taiwan.yaml');
  const src = new Set(tw.sources.map((s: any) => s.id));
  const refs = (at: string, l?: string[]) => (l ?? []).forEach((r) => { if (!src.has(r)) out.push({ level: 'error', msg: `人群臺灣：${at} 的來源 ${r} 不存在` }); });
  tw.groups.forEach((g: any) => refs(g.zh, g.src));
  refs('contrast', tw.contrast?.src); refs('top3', tw.top3?.src); refs('plains', tw.plains_src);
  tw.tribes.forEach((t: any) => refs(t.zh, t.src));
  return out;
}

export function buildPeoples(pubData: string) {
  const fams = readYaml('data/peoples/families.yaml');
  const cs = readYaml('data/peoples/countries.yaml');
  const tw = readYaml('data/peoples/taiwan.yaml');
  const langs = readJson('data/peoples/languages.json');
  const labels = readJson('data/labels/basemap-labels.json');
  const zh = new Map<string, string>(labels.labels.filter((l: any) => l[0] === 'c').map((l: any) => [l[2], l[1]]));
  // 世界概況的檔案：國名 → 「區域/代碼」，用來附原文連結
  const fbIndex: Record<string, string> = fs.existsSync(path.join(ROOT, 'data/peoples/factbook-files.json')) ? readJson('data/peoples/factbook-files.json') : {};
  const countries: Record<string, any> = {};
  for (const [n, v] of Object.entries<any>(cs)) {
    const [fam, g, gy, gm, l, ly, note] = v;
    const fb = fbIndex[n];
    countries[n] = {
      zh: zh.get(n) ?? ZH_FIX[n] ?? n, fam, groups: parseItems(g), gy: gy ? String(gy) : '', method: METHOD[String(gm)] ?? '', methodKey: String(gm),
      langs: parseItems(l), ly: ly ? String(ly) : '', note: note ?? '',
      src: fb ? `https://github.com/factbook/factbook.json/blob/${FB_COMMIT}/${fb}.json` : '',
    };
  }
  // 國界幾何：Natural Earth 50m（公有領域，npm run peoples 產生），加上語系代碼
  const ne50 = readJson('data/peoples/countries-50m.geojson');
  const geo = { type: 'FeatureCollection', features: ne50.features.filter((f: any) => countries[f.properties.name]).map((f: any) => ({
    type: 'Feature', properties: { n: f.properties.name, f: countries[f.properties.name].fam }, geometry: f.geometry })) };
  fs.writeFileSync(path.join(pubData, 'peoples-countries.geojson'), JSON.stringify(geo));
  fs.writeFileSync(path.join(pubData, 'peoples-langs.json'), JSON.stringify(langs));
  const g = new Map<string, [number, number]>(langs.languages.map((x: any) => [x[4], [x[1], x[2]]]));
  const tribe = (t: any) => ({ ...t, ...(t.glotto && g.get(t.glotto) ? { lat: g.get(t.glotto)![0], lng: g.get(t.glotto)![1] } : {}) });
  const taiwan = { ...tw, data_as_of: dateStr(tw.data_as_of), sources: tw.sources.map((s: any) => ({ ...s, accessed: dateStr(s.accessed) })), tribes: tw.tribes.map(tribe), plains: tw.plains.map(tribe) };
  const peoples = {
    factbook: { title: 'CIA, The World Factbook（最後一版；2026-02-04 停刊）', mirror: `https://github.com/factbook/factbook.json/tree/${FB_COMMIT}`, mirror_date: FB_DATE, license: '公有領域' },
    glottolog: langs.source,
    families: fams.families.map(({ glottolog, macro, ...f }: any) => f),
    countries, taiwan,
  };
  fs.writeFileSync(path.join(pubData, 'peoples.json'), JSON.stringify(peoples));
  return { countries: Object.keys(countries).length, langs: langs.languages.length };
}
