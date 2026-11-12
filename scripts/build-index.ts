// npm run build:index：把 cards/ 與 data/ 編譯成 public/index.json，並複製地圖資料到 public/data/
import fs from 'node:fs';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { loadCards, loadTagVocab, loadTopicVocab, readYaml, readJson, dateStr, ROOT, refsOf } from './lib/cards.ts';
import { checkCards, loadContext, exists } from './lib/check.ts';
import { loadEcon, loadChains, checkEcon, checkChains, buildEcon, buildChains } from './lib/econ.ts';
import { loadToday, checkToday, buildToday } from './lib/today.ts';
import { buildPeoples } from './lib/peoples.ts';
import { loadCivTaxonomy } from './lib/civ.ts';
import { SECTIONS, CORE_KEYS, TYPE_LABEL, FIELD_OPTIONS, UNDERSTAND, type CardType } from './lib/fields.ts';
import { loadNameTable, polityZh } from './lib/labels.ts';
// 圖片原始寬高（data/image-sizes.json，鍵＝Commons 檔名）：讓網頁在圖還沒載入前就先留好位置，版面不會跳
const IMG_SIZES: Record<string, [number, number]> = (() => { try { return JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'image-sizes.json'), 'utf8')); } catch { return {}; } })();
const imgSize = (page: string) => { let k = ''; try { k = decodeURIComponent(String(page).split('/wiki/')[1] ?? ''); } catch { /* 網址不合法就不帶寬高 */ } const z = IMG_SIZES[k] ?? IMG_SIZES[k.replace(/_/g, ' ')]; return z ? { w: z[0], h: z[1] } : {}; };
import { orderAliases } from './lib/aliases.ts';
import { buildEdges, type Edge } from './lib/causes.ts';
import { loadStorylines, buildStorylines } from './lib/storylines.ts';
import { loadStories, checkStories, buildStory } from './lib/stories.ts';
import { loadHistories, historyKeys, historyId, inferHistories, learnTrack, loadUnits, checkUnits } from './lib/learn.ts';
import { loadDives, buildDives, copyPowerMaps } from './lib/dives.ts';

const get = (o: any, k: string) => k.split('.').reduce((a, p) => (a == null ? a : a[p]), o);
const present = (v: any) => (Array.isArray(v) ? v.length > 0 : v !== undefined && v !== null && v !== '');

const tagCats = loadTagVocab();
const places: Record<string, { title: string; lat: number; lng: number; precision: string }> =
  exists('data/places.json') ? readJson('data/places.json').places : {};
const routesRaw: any[] = readYaml('data/routes/routes.yaml')?.routes ?? [];
const frameworks: any[] = readYaml('data/frameworks.yaml')?.frameworks ?? [];
const raw = loadCards();
const histories = loadHistories();
const issues = checkCards(raw, loadContext(tagCats, routesRaw, frameworks, historyKeys(histories)));
// 學習模式可用：有 learn、交叉查核通過、沒有錯誤
// LEARN_DEV=1：開發時讓還沒查核的學習卡與單元也顯示（正式 build 不會用）
const DEV = !!process.env.LEARN_DEV;
const eligible = new Set(raw.filter((c) => c.fm?.learn && (DEV || c.fm?.crosscheck?.result === '通過') && !issues.some((i) => i.file === c.file && i.level === 'error')).map((c) => c.fm.id));
// 沒標 tier 的舊來源依網域推測（只供顯示；學習卡一律要明標）
const guessTier = (url: string) => {
  const h = (() => { try { return new URL(url).hostname; } catch { return ''; } })();
  if (/wikipedia|britannica|newworldencyclopedia|ebsco|baike|5000yan/.test(h)) return '百科';
  if (/huxiu|litcharts|sameerbajaj|goodreads|quotepark|hk01|medium|substack|reason\.com/.test(h)) return '摘要';
  if (/ctext|gutenberg|perseus|livius|avalon\.law|sacred-texts/.test(h)) return '一手';
  if (/jstor|doi\.org|cambridge\.org|academic\.oup|sciencedirect|ihp\.sinica|nber|rug\.nl/.test(h)) return '學術';
  return '通論';
};
const civ = loadCivTaxonomy();
const civPathsOf = (list: string[]) => { const ps = [...new Set(list.flatMap((v) => civ.resolve(v)))]; return ps.length ? ps : ['其他']; };

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
    id: f.id, type, typeLabel: TYPE_LABEL[type], name: f.name, aliases: (f.aliases ?? []).map(String),
    aliases_show: orderAliases(String(f.name), (f.aliases ?? []).map(String), f.aliases_main),
    civilization: f.civilization ?? [], civPaths: civPathsOf(f.civilization ?? []), track: f.track, time: f.time, summary_line: f.summary_line,
    place: {
      ...f.place,
      secondary_fields: f.place?.secondary_fields ?? [],
      locations: (f.place?.locations ?? []).map((l: any) => ({ ...l, key: l.pleiades_id ? `p${l.pleiades_id}` : `${l.lat.toFixed(2)},${l.lng.toFixed(2)}` })),
    },
    routes: f.routes ?? [], structure_tags: f.structure_tags ?? [], topics: (f.topics ?? []).map(String), links: f.links ?? [],
    frameworks: f.frameworks ?? [], summary_card: !!f.summary_card,
    counterparts: Array.isArray(f.counterparts) ? f.counterparts.map((x: any) => ({ id: x.id, note: x.note, src: x.src ?? [] })) : [],
    counterparts_none: typeof f.counterparts === 'string' ? f.counterparts : '',
    counterpart_of: [] as string[],
    sources: (f.sources ?? []).map((s: any) => ({ ...s, accessed: dateStr(s.accessed), tier: s.tier ?? guessTier(s.url), tier_guess: !s.tier })),
    verification: f.verification, lens_status: f.lens_status,
    importance: f.importance ?? 2,
    learn: eligible.has(f.id) ? {
      ...f.learn,
      histories: [...new Set([...(f.learn.histories ?? []).map((h: string) => historyId(histories, h)), ...inferHistories(histories, civPathsOf(f.civilization ?? []), type)])].filter(Boolean),
      track: learnTrack(civPathsOf(f.civilization ?? [])),
      understand: UNDERSTAND[type] ?? [],
      crosscheck: f.crosscheck,
    } : null,
    sections, completeness,
    today_hook: byRole('today_hook')?.text ?? '',
    non_analogous: byRole('non_analogous')?.text ?? '',
    lens: { lilu: lens?.sub?.['李彔']?.text ?? '', harari: lens?.sub?.['哈拉瑞']?.text ?? '' },
    unknownFields: sections.filter((s) => s.text && s.unknown).map((s) => `${s.code} ${s.title}`),
    singleSourceSections: sections.filter((s) => s.text && !s.unknown && refsOf(s.text).length === 1).map((s) => s.code),
    // 人物卡（深入專題）：person 區塊與人際關係；關係的來源解析成可點的連結
    person: type === 'person' && f.person ? { role: String(f.person.role ?? ''), faction: f.person.faction ? String(f.person.faction) : undefined, name_romaji: String(f.person.name_romaji ?? '') } : null,
    relations: (Array.isArray(f.relations) ? f.relations : []).map((r: any) => ({ id: r.id, kind: r.kind, from: r.from, to: r.to, note: r.note, sources: (r.src ?? []).map((sid: string) => { const s = (f.sources ?? []).find((y: any) => y.id === sid); return s ? { card: f.id, id: sid, title: s.title, url: s.url } : null; }).filter(Boolean) })),
    images: (Array.isArray(f.images) ? f.images : []).map((im: any) => ({ ...imgSize(im.page), url: im.url, page: im.page, title: String(im.title), creator: String(im.creator), year: String(im.year), holder: im.holder ? String(im.holder) : undefined, license: String(im.license), caption: String(im.caption) })),
    file: c.file,
    issues: issues.filter((i) => i.file === c.file).map((i) => ({ level: i.level, msg: i.msg })),
    backlinks: [] as string[],
  };
});
// 反向連結（被誰引用）
for (const c of cards) for (const l of c.links) cards.find((x) => x.id === l)?.backlinks.push(c.id);
// ---- 前因／後果（docs/causes.md）：兩邊寫的關係合併成一張圖，每張卡拿到自己的「從哪裡來／往哪裡去」----
const edges = buildEdges(raw);
const edgeOut = (e: Edge, side: 'causes' | 'effects') => ({ id: side === 'causes' ? e.from ?? null : e.to ?? null, name: side === 'causes' ? e.fromName ?? '' : e.toName ?? '', rel: e.rel, why: e.why, disputed: e.disputed, sources: e.sources });
for (const c of cards as any[]) {
  c.causes = edges.filter((e) => e.to === c.id).map((e) => edgeOut(e, 'causes'));
  c.effects = edges.filter((e) => e.from === c.id).map((e) => edgeOut(e, 'effects'));
}
// 反向對照（別人把我列為對照、我自己沒列回去的）
for (const c of cards) for (const x of c.counterparts) {
  const t = cards.find((y) => y.id === x.id);
  if (t && !t.counterparts.some((y) => y.id === c.id)) t.counterpart_of.push(c.id);
}

// ---- 複製地圖資料 ----
const pubData = path.join(ROOT, 'public', 'data');
fs.rmSync(pubData, { recursive: true, force: true });
fs.mkdirSync(path.join(pubData, 'borders'), { recursive: true });
const borders = readJson('data/borders/index.json');
// 疆域：每個政權補上中文名（zh），地圖上滑過時顯示「中文 English」
for (const s of borders.snapshots) {
  const gj = readJson(`data/borders/${s.file}`);
  for (const f of gj.features) f.properties.zh = polityZh(f.properties.name, f.geometry);
  fs.writeFileSync(path.join(pubData, 'borders', s.file), JSON.stringify(gj));
}
// 底圖地名（繁中＋英文，由 npm run labels 產生）
fs.copyFileSync(path.join(ROOT, 'data/labels/basemap-labels.json'), path.join(pubData, 'labels.json'));
// AWMC 古代道路網（地圖底層，依時代顯示）：只留下時代、主次、確定與否三個欄位
{
  const gj = readJson('data/awmc/roads.geojson');
  const r4 = (c: number[]) => [Math.round(c[0] * 1e4) / 1e4, Math.round(c[1] * 1e4) / 1e4];
  const feats = gj.features.map((f: any) => ({ type: 'Feature',
    properties: { t: f.properties.timeperiod ?? '', m: f.properties.Major_or_M === '1' ? 1 : 0, k: f.properties.Known_or_a === '1' ? 1 : 0, n: f.properties.Name === 'delete_name' ? '' : f.properties.Name ?? '' },
    geometry: { type: 'MultiLineString', coordinates: (f.geometry.type === 'LineString' ? [f.geometry.coordinates] : f.geometry.coordinates).map((l: number[][]) => l.map(r4)) } }));
  fs.writeFileSync(path.join(pubData, 'awmc-roads.geojson'), JSON.stringify({ type: 'FeatureCollection', features: feats }));
}
if (hasItinere) fs.copyFileSync(path.join(ROOT, 'data/routes/itinere-simplified.geojson'), path.join(pubData, 'itinere.geojson'));
// 深入專題的勢力圖（docs/dives.md）
const dives = loadDives();
copyPowerMaps(dives, pubData);
// 人群圖層（data/peoples/，打開圖層時才下載）
const peoplesInfo = buildPeoples(pubData);

// 故事：每條故事線一篇可以一口氣讀完的文章（docs/stories.md）。每篇另存 public/data/stories/<id>.json，打開才下載；
// index.json 的故事線只多 read: { minutes, chars, hook }。有 validate 錯誤的故事不輸出。
const storyMeta = new Map<string, { minutes: number; chars: number; hook: string }>();
{
  const stories = loadStories();
  const bad = new Set(checkStories(stories, loadStorylines(), raw).filter((i) => i.level === 'error').map((i) => i.file));
  fs.mkdirSync(path.join(pubData, 'stories'), { recursive: true });
  for (const s of stories) {
    if (bad.has(s.file)) { console.warn(`注意：${s.file} 有錯誤，沒有輸出，請執行 npm run validate`); continue; }
    const out = buildStory(s, raw);
    fs.writeFileSync(path.join(pubData, 'stories', `${out.id}.json`), JSON.stringify(out));
    storyMeta.set(out.id, { minutes: out.minutes, chars: out.chars, hook: out.hook });
  }
}

const index = {
  generated: new Date().toISOString(),
  cards,
  tagCategories: tagCats,
  // 主題標籤：層面 → 主題；每個主題的卡片依開始年份排好，就是一條歷史路徑
  topicLayers: loadTopicVocab().map((l) => ({ name: l.name, icon: l.icon, topics: l.topics.map((t) => ({
    name: t.name, plain: t.plain ?? '', path: t.path ?? '', see: t.see ?? [],
    cards: cards.filter((c) => c.topics.includes(t.name)).sort((a, b) => a.time.start - b.time.start || a.time.end - b.time.end).map((c) => c.id),
  })) })),
  fieldOptions: FIELD_OPTIONS,
  civTree: [...civ.tree, { name: '其他', path: '其他', children: [] }],
  frameworks: frameworks.map((f) => ({ ...f, sources: (f.sources ?? []).map((s: any) => ({ ...s, accessed: dateStr(s.accessed) })) })),
  routes,
  borders: { source: borders.source, license: borders.license, note: borders.note, snapshots: borders.snapshots },
  itinere: hasItinere,
  econ: buildEcon(loadEcon()),
  chains: buildChains(loadChains(), raw, routes),
  today: buildToday(loadToday(), routes),
  histories,
  storylines: buildStorylines(loadStorylines(), edges, cards).map((l) => ({ ...l, read: storyMeta.get(l.id) ?? null })),
  units: loadUnits().map((u) => u.unit).filter((u) => DEV || u.crosscheck?.result === '通過'),
  // 深入專題：把一段時代的卡片、人物、故事線、勢力圖聚在一起（docs/dives.md）
  dives: buildDives(dives, cards),
  names: loadNameTable(),
};
// 地圖上的名稱要中英並列：列出還沒有英文（或中文）對照的地名
{
  const CJK = /[\u3400-\u9fff]/, LATIN = /[A-Za-z]/;
  const norm = (x: string) => x.replace(/_/g, ' ').replace(/\?/g, '').replace(/\s+/g, ' ').trim().toLowerCase();
  const zhKeys = new Set(Object.keys(index.names.zh).map(norm));
  const missing = new Set<string>();
  const need = (x?: string) => {
    if (!x) return;
    if (CJK.test(x) && LATIN.test(x)) return;
    if (CJK.test(x) ? !index.names.en[x] : !zhKeys.has(norm(x))) missing.add(x);
  };
  for (const c of cards) for (const l of c.place.locations) { need(l.name_ancient); need(l.name_modern); }
  for (const r of routes) { need(r.name); r.stations.forEach((x: any) => need(x.name)); }
  for (const ch of index.chains) { need(ch.name); ch.steps.forEach((x: any) => need(x.name)); }
  for (const p of index.today.chokepoints) need(p.name);
  for (const ch of index.today.chains) { need(ch.name); ch.steps.forEach((x: any) => need(x.name)); }
  if (process.env.LIST_MISSING) console.log([...missing].join("\n"));
  if (missing.size) console.warn(`注意：${missing.size} 個地名還沒有中英對照（地圖上先只顯示一種語言），請補到 data/labels/names-en.yaml：${[...missing].slice(0, 12).join('、')}${missing.size > 12 ? '…' : ''}`);
}
const unitIssues = checkUnits(loadUnits(), raw, histories, eligible).filter((i) => i.level === 'error');
if (unitIssues.length) console.warn(`注意：學習單元有 ${unitIssues.length} 個問題，請執行 npm run validate`);
const econIssues = [...checkEcon(loadEcon()), ...checkChains(loadChains(), raw, new Set(routes.map((r: any) => r.id))),
  ...checkToday(loadToday(), raw, new Set(tagCats.flatMap((c: any) => c.tags.map((t: any) => t.tag))), new Set(routes.map((r: any) => r.id)))].filter((i) => i.level === 'error');
if (econIssues.length) console.warn(`注意：經濟數列／物資鏈／今日對照層有 ${econIssues.length} 個問題，請執行 npm run validate`);
// 效能：卡片的長內文（各節內文、來源、前因後果、學習卡全文）另存 index-detail.json。
// 首頁先下載較小的 index.json 就能畫出時間軸、地圖、清單；長內文在背景下載，打開卡片時才用到（src/App.tsx mergeDetail）。
// 留在 index.json 的 learn 欄位：清單、時間軸、篩選要用的（histories、track、understand、why_care）。
// 2026-11-11 再瘦身：查核紀錄 crosscheck（很長的筆記）、今日對照鉤子／不可類比（只在開卡或搜尋結果展開時看）、
// 學習單元每一步的內文，也都移到 index-detail.json；index.json 只留單元每一步的「骨架」（類型＋指到哪張卡），
// 首頁、故事線、進度點都還能算。
const LEARN_CORE = ['histories', 'track', 'understand', 'why_care'];
const detail: Record<string, any> = {};
const coreCards = cards.map((c: any) => {
  // 2026-11-12 再瘦身：只有開卡才看的欄位也移到 detail。aliases_show（別名顯示順序，只有 CardDetail 用）、
  // images（圖片，只有 CardDetail／LearnCard 用）、counterparts_none（沒有對照的理由，只有 Counterparts 用）、
  // lens（李彔／哈拉瑞兩欄，目前沒有任何畫面讀它）。已逐一 grep src/、scripts/qa/、src/lib/search.ts 確認沒有首頁階段的讀取者。
  // counterparts 留在 index.json：Timeline 選中一張卡時要用它標出相關的卡。
  const { sections, sources, causes, effects, learn, today_hook, non_analogous, aliases_show, images, counterparts_none, lens, ...rest } = c;
  const d: any = { sections, sources, causes, effects, aliases_show, images, counterparts_none, lens }; // today_hook／non_analogous 就是 sections 裡那兩節的文字，網頁併入時再取
  let learnCore = null;
  if (learn) {
    learnCore = { story: '', key_terms: [], primary_source: [], historiography: '' } as any;
    const lr: any = {};
    for (const [k, v] of Object.entries(learn)) (LEARN_CORE.includes(k) ? learnCore : lr)[k] = v;
    d.learn = lr;
  }
  detail[c.id] = d;
  return { ...rest, sections: [], sources: [], causes: [], effects: [], today_hook: '', non_analogous: '', aliases_show: [], images: [], counterparts_none: '', lens: { lilu: '', harari: '' }, learn: learnCore };
});
const STEP_CORE = ['type', 'id', 'depth', 'card', 'cards', 'ref', 'sim'];
const unitDetail: Record<string, any> = {};
const coreUnits = (index.units as any[]).map((u) => {
  const { steps, crosscheck, ...rest } = u;
  unitDetail[u.id] = { steps, crosscheck };
  return { ...rest, steps: steps.map((s: any) => {
    const o: any = {};
    for (const k of STEP_CORE) if (s[k] !== undefined) o[k] = s[k];
    if (s.type === 'check') o.items = (s.items ?? []).map((q: any) => ({ kind: q.kind }));
    return o;
  }) };
});
// 效能：index-detail.json 的網址帶「內容雜湊」當版本號（detailV），不是建置時間。
// 一天部署好幾次、但卡片長內文沒變時，使用者的瀏覽器快取仍然有效，不必重抓 1.7 MB。
// 雜湊不含 generated（每次建置都會變）；檔案本身也不放 generated，內容相同就是同一個位元組。
const detailBody = JSON.stringify({ cards: detail, units: unitDetail });
const detailV = createHash('sha256').update(detailBody).digest('hex').slice(0, 10);
fs.writeFileSync(path.join(ROOT, 'public', 'index.json'), JSON.stringify({ ...index, detailV, cards: coreCards, units: coreUnits }));
// 效能：每張卡的長內文另外各存一個小檔（public/data/cards/<id>.json，幾 KB）。
// 打開一張卡（或別人分享的 ?card= 連結）只抓這個小檔，不必等 1.7 MB 的 index-detail.json（src/lib/detail.ts）。
fs.mkdirSync(path.join(pubData, 'cards'), { recursive: true });
for (const [id, d] of Object.entries(detail)) fs.writeFileSync(path.join(pubData, 'cards', `${id}.json`), JSON.stringify({ generated: index.generated, id, card: d }));
// 效能：每個學習單元也各存一個小檔（public/data/units/<id>.json）：單元自己的每一步內文與查核紀錄，
// 加上單元用到的每張卡的長內文（步驟裡的 card／cards／ref／id 指到的卡），打開單元只要一次小請求。
// 保守作法：把步驟裡所有「剛好等於某張卡 id」的字串（ref 取 # 前面）都算進去，寧可多帶不要漏。
fs.mkdirSync(path.join(pubData, 'units'), { recursive: true });
const cardIdsIn = (node: any, out: Set<string>) => {
  if (typeof node === 'string') { const id = node.split('#')[0]; if (detail[id]) out.add(id); }
  else if (Array.isArray(node)) node.forEach((x) => cardIdsIn(x, out));
  else if (node && typeof node === 'object') Object.values(node).forEach((x) => cardIdsIn(x, out));
};
for (const [id, d] of Object.entries(unitDetail)) {
  const ids = new Set<string>();
  cardIdsIn(d.steps, ids);
  const cs: Record<string, any> = {};
  for (const cid of [...ids].sort()) cs[cid] = detail[cid];
  fs.writeFileSync(path.join(pubData, 'units', `${id}.json`), JSON.stringify({ generated: index.generated, id, unit: d, cards: cs }));
}
fs.writeFileSync(path.join(ROOT, 'public', 'index-detail.json'), `{"v":"${detailV}",${detailBody.slice(1)}`);
const errs = issues.filter((i) => i.level === 'error').length;
console.log(`build-index：${cards.length} 張卡、${routes.length} 條路線、${index.chains.length} 條物資鏈、人群圖層 ${peoplesInfo.countries} 國／${peoplesInfo.langs} 種語言／${peoplesInfo.migrations} 條遷徙 → public/index.json${errs ? `（注意：有 ${errs} 個 validate 錯誤）` : ''}`);
