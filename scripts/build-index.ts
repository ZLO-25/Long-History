// npm run build:index：把 cards/ 與 data/ 編譯成 public/index.json，並複製地圖資料到 public/data/
import fs from 'node:fs';
import path from 'node:path';
import { loadCards, loadTagVocab, readYaml, readJson, dateStr, ROOT, refsOf } from './lib/cards.ts';
import { checkCards, loadContext, exists } from './lib/check.ts';
import { SECTIONS, CORE_KEYS, TYPE_LABEL, FIELD_OPTIONS, type CardType } from './lib/fields.ts';

const get = (o: any, k: string) => k.split('.').reduce((a, p) => (a == null ? a : a[p]), o);
const present = (v: any) => (Array.isArray(v) ? v.length > 0 : v !== undefined && v !== null && v !== '');

const tagCats = loadTagVocab();
const places: Record<string, { title: string; lat: number; lng: number; precision: string }> =
  exists('data/places.json') ? readJson('data/places.json').places : {};
const routesRaw: any[] = readYaml('data/routes/routes.yaml')?.routes ?? [];
const frameworks: any[] = readYaml('data/frameworks.yaml')?.frameworks ?? [];
const raw = loadCards();
const issues = checkCards(raw, loadContext(tagCats, routesRaw, frameworks));

// ---- 路線：幾何由 npm run routes 預先算好（data/routes/routes.geojson）----
const built: Record<string, any> = Object.fromEntries((exists('data/routes/routes.geojson') ? readJson('data/routes/routes.geojson').routes : []).map((r: any) => [r.id, r]));
const routes = routesRaw.map((r) => {
  const g = built[r.id];
  if (!g) throw new Error(`路線 ${r.id} 還沒有線條，請先執行 npm run routes`);
  const { waypoints, ...meta } = r;
  return { ...meta, coords: g.coords, segments: g.segments, stations: g.stations, stats: g.stats,
    sources: (r.sources ?? []).map((s: any) => ({ ...s, accessed: dateStr(s.accessed) })) };
});
// 若有 Itiner-e 精細道路（npm run roads 產生），一併帶入
const hasItinere = exists('data/routes/itinere-simplified.geojson');

// ---- 卡片 ----
const cards = raw.filter((c) => c.fm?.id).map((c) => {
  const f = c.fm;
  const type = f.type as CardType;
  const defs = SECTIONS[type] ?? [];
  const sections = defs.map((d) => {
    const s = c.sections.find((x) => x.code === d.code);
    return { code: d.code, title: d.title, level: d.level, role: d.role ?? null,
      text: s?.text ?? '', unknown: s?.unknown ?? false, sub: s?.sub ?? null };
  });
  const coreFilled = CORE_KEYS.filter((k) => present(get(f, k))).length;
  const secFilled = sections.filter((s) => s.text).length;
  const completeness = Math.round(((coreFilled + secFilled) / (CORE_KEYS.length + defs.length)) * 100);
  const byRole = (r: string) => sections.find((s) => s.role === r);
  const lens = byRole('lens');
  return {
    id: f.id, type, typeLabel: TYPE_LABEL[type], name: f.name, aliases: f.aliases ?? [],
    civilization: f.civilization ?? [], track: f.track, time: f.time, summary_line: f.summary_line,
    place: {
      ...f.place,
      secondary_fields: f.place?.secondary_fields ?? [],
      locations: (f.place?.locations ?? []).map((l: any) => ({ ...l, key: l.pleiades_id ? `p${l.pleiades_id}` : `${l.lat.toFixed(2)},${l.lng.toFixed(2)}` })),
    },
    routes: f.routes ?? [], structure_tags: f.structure_tags ?? [], links: f.links ?? [],
    frameworks: f.frameworks ?? [], summary_card: !!f.summary_card,
    sources: (f.sources ?? []).map((s: any) => ({ ...s, accessed: dateStr(s.accessed) })),
    verification: f.verification, lens_status: f.lens_status,
    sections, completeness,
    today_hook: byRole('today_hook')?.text ?? '',
    non_analogous: byRole('non_analogous')?.text ?? '',
    lens: { lilu: lens?.sub?.['李彔']?.text ?? '', harari: lens?.sub?.['哈拉瑞']?.text ?? '' },
    unknownFields: sections.filter((s) => s.text && s.unknown).map((s) => `${s.code} ${s.title}`),
    singleSourceSections: sections.filter((s) => s.text && !s.unknown && refsOf(s.text).length === 1).map((s) => s.code),
    file: c.file,
    issues: issues.filter((i) => i.file === c.file).map((i) => ({ level: i.level, msg: i.msg })),
    backlinks: [] as string[],
  };
});
// 反向連結（被誰引用）
for (const c of cards) for (const l of c.links) cards.find((x) => x.id === l)?.backlinks.push(c.id);

// ---- 複製地圖資料 ----
const pubData = path.join(ROOT, 'public', 'data');
fs.rmSync(pubData, { recursive: true, force: true });
fs.mkdirSync(path.join(pubData, 'borders'), { recursive: true });
const borders = readJson('data/borders/index.json');
for (const s of borders.snapshots) fs.copyFileSync(path.join(ROOT, 'data/borders', s.file), path.join(pubData, 'borders', s.file));
// AWMC 古代道路網（地圖底層，依時代顯示）：只留下時代、主次、確定與否三個欄位
{
  const gj = readJson('data/awmc/roads.geojson');
  const r4 = (c: number[]) => [Math.round(c[0] * 1e4) / 1e4, Math.round(c[1] * 1e4) / 1e4];
  const feats = gj.features.map((f: any) => ({ type: 'Feature',
    properties: { t: f.properties.timeperiod ?? '', m: f.properties.Major_or_M === '1' ? 1 : 0, k: f.properties.Known_or_a === '1' ? 1 : 0, n: f.properties.Name ?? '' },
    geometry: { type: 'MultiLineString', coordinates: (f.geometry.type === 'LineString' ? [f.geometry.coordinates] : f.geometry.coordinates).map((l: number[][]) => l.map(r4)) } }));
  fs.writeFileSync(path.join(pubData, 'awmc-roads.geojson'), JSON.stringify({ type: 'FeatureCollection', features: feats }));
}
if (hasItinere) fs.copyFileSync(path.join(ROOT, 'data/routes/itinere-simplified.geojson'), path.join(pubData, 'itinere.geojson'));

const index = {
  generated: new Date().toISOString(),
  cards,
  tagCategories: tagCats,
  fieldOptions: FIELD_OPTIONS,
  frameworks: frameworks.map((f) => ({ ...f, sources: (f.sources ?? []).map((s: any) => ({ ...s, accessed: dateStr(s.accessed) })) })),
  routes,
  borders: { source: borders.source, license: borders.license, note: borders.note, snapshots: borders.snapshots },
  itinere: hasItinere,
};
fs.writeFileSync(path.join(ROOT, 'public', 'index.json'), JSON.stringify(index));
const errs = issues.filter((i) => i.level === 'error').length;
console.log(`build-index：${cards.length} 張卡、${routes.length} 條路線 → public/index.json${errs ? `（注意：有 ${errs} 個 validate 錯誤）` : ''}`);
