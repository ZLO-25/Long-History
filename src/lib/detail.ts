// 卡片／單元長內文的載入（效能）。
// 首頁先下載較小的 index.json 就能畫畫面；長內文（各節內文、來源、前因後果、學習卡全文、單元每一步）有兩種來源：
//  1. 小檔（隨點隨抓）：data/cards/<id>.json（一張卡）、data/units/<id>.json（一個單元＋它用到的卡），幾 KB～幾十 KB。
//     打開卡片或單元時只抓需要的，滑鼠移上去／聚焦／觸碰時就先抓（intent），點下去通常已經在了。
//  2. 整包 index-detail.json（1.7 MB）：畫面和底圖出來後才在背景下載，到了之後所有東西都有內文，小檔就不再抓。
// 請求順序：畫面需要的小檔 → 底圖 → index-detail.json → 古道 awmc-roads.geojson（最後，見 whenDetailSettled）。
//
// 分階段載入（首屏效能）：
//  0. home.json（約 20 KB）先到 → initStub：用它組一個「骨架 index」（coreReady:false，cards 是空的）就畫學習首頁與清單頁。
//  1. index.json（卡片核心資料）到了 → adoptCore：換成完整 index（coreReady:true），App 不重新掛載、畫面狀態不丟。
//     骨架階段就點開的卡片／單元，小檔照樣先抓，抓到的暫存在 pendCards／pendUnits，adoptCore 時一次併進完整的卡片。
//  2. 之後和以前一樣：小檔隨點隨抓、整包 index-detail.json 背景下載。
import type { Dispatch, SetStateAction } from 'react';
import type { Card, DetailState, Dive, HomeData, Index, Storyline, TopicLayer, Unit } from '../types';

export type CardPart = Pick<Card, 'sections' | 'sources' | 'causes' | 'effects' | 'aliases_show' | 'images' | 'counterparts_none' | 'lens'> & { learn?: Partial<NonNullable<Card['learn']>> };
export type UnitPart = Partial<Index['units'][number]>;
export type Detail = { v?: string; cards: Record<string, CardPart>; units?: Record<string, UnitPart> };

export const newDetailState = (): DetailState => ({ cards: new Set(), units: new Set(), all: false, failed: false });

// ---- 併入：整包與單項共用同一套邏輯 ----
// 長內文直接寫進原本的卡片物件（同一個 cards 陣列），地圖、時間軸、搜尋索引不必因此全部重算
function applyCard(c: Card, x: CardPart) {
  const { learn, ...rest } = x;
  Object.assign(c, rest);
  c.today_hook = rest.sections?.find((s) => s.role === 'today_hook')?.text ?? '';
  c.non_analogous = rest.sections?.find((s) => s.role === 'non_analogous')?.text ?? '';
  if (c.learn && learn) Object.assign(c.learn, learn);
}
const applyUnit = (u: Index['units'][number], x: UnitPart) => { Object.assign(u, x); };

/** 整包 index-detail.json 併進來 */
export function mergeDetail(ix: Index, d: Detail): Index {
  const st = ix.detailLoaded ?? (ix.detailLoaded = newDetailState());
  for (const c of ix.cards) { const x = d.cards[c.id]; if (x) applyCard(c, x); }
  // 學習單元每一步的內文、查核紀錄也在 detail（index.json 只有骨架）
  for (const u of ix.units ?? []) { const x = d.units?.[u.id]; if (x) applyUnit(u, x); }
  st.all = true;
  return { ...ix, detailReady: true };
}

/** index.json（卡片核心資料）到了沒。false＝目前只是 home.json 的骨架：沒有任何卡片，需要卡片的畫面要等 */
export const coreReady = (ix: Index) => ix.coreReady !== false;

/** 這張卡的長內文到了沒（整包或單張小檔其中之一到了就算） */
export const cardLoaded = (ix: Index, id: string | null | undefined) => ix.detailReady !== false || !!(id && ix.detailLoaded?.cards.has(id));
/** 這個單元的每一步內文到了沒 */
export const unitLoaded = (ix: Index, id: string | null | undefined) => ix.detailReady !== false || !!(id && ix.detailLoaded?.units.has(id));
/** 等待時顯示的字 */
export const waitingText = (ix: Index) => (ix.detailLoaded?.failed ? '卡片內容下載失敗，請檢查網路後重新整理頁面。' : '載入卡片內容…');

// ---- 載入器 ----
interface Ctx { ix: Index; base: string; set: Dispatch<SetStateAction<Index | null>> }
let ctx: Ctx | null = null;
const cardP = new Map<string, Promise<void>>();
const unitP = new Map<string, Promise<void>>();
// 骨架階段（卡片核心資料還沒到）先抓到的小檔：adoptCore 時一次併進去
const pendCards = new Map<string, CardPart>();
const pendUnits = new Map<string, { unit: UnitPart; cards: Record<string, CardPart> }>();

// 同時最多 6 個小檔請求；使用者真的打開的（urgent）排在預取前面
const MAX_PARALLEL = 6;
let active = 0;
const queue: (() => void)[] = [];
function limited<T>(fn: () => Promise<T>, urgent: boolean): Promise<T> {
  return new Promise<T>((res, rej) => {
    const run = () => { active++; fn().then(res, rej).finally(() => { active--; queue.shift()?.(); }); };
    if (active < MAX_PARALLEL) run(); else if (urgent) queue.unshift(run); else queue.push(run);
  });
}

// 同一批到的小檔只換一次 index（多個單元／卡片同時到達不會各重畫一次）
let flushTimer = 0;
function flush() {
  if (flushTimer || !ctx) return;
  flushTimer = window.setTimeout(() => { flushTimer = 0; ctx?.set((cur) => (cur ? { ...cur } : cur)); }, 16);
}

type Early = { id: string; p: Promise<any> };
const takeEarly = (key: '__hrCard' | '__hrUnit', id: string): Promise<any> | null => {
  const w = window as unknown as Record<string, Early | undefined>;
  const e = w[key];
  if (!e || e.id !== id) return null;
  delete w[key];
  return e.p;
};

/** 小檔要和 index.json 同一次建置（generated 相同）。不同就帶 ?v= 再抓一次，避免拿到快取裡的舊檔 */
async function getSmall(path: string, early: Promise<any> | null): Promise<any> {
  const c = ctx!;
  const get = async (u: string) => { const r = await fetch(u); if (!r.ok) throw new Error(String(r.status)); return r.json(); };
  let d = early ? await early : null;
  if (d?.generated !== c.ix.generated) d = await get(c.base + path);
  if (d?.generated !== c.ix.generated) d = await get(`${c.base}${path}?v=${encodeURIComponent(c.ix.generated)}`);
  if (d?.generated !== c.ix.generated) throw new Error('stale');
  return d;
}

function cardPromise(id: string, urgent: boolean): Promise<void> {
  let p = cardP.get(id);
  if (p) return p;
  const early = takeEarly('__hrCard', id);
  p = limited(() => getSmall(`data/cards/${id}.json`, early), urgent).then((d) => {
    const cx = ctx!, st = cx.ix.detailLoaded!;
    if (!coreReady(cx.ix)) { if (d?.card) pendCards.set(id, d.card); return; }
    const card = cx.ix.cards.find((x) => x.id === id);
    if (card && !st.all && d?.card) { applyCard(card, d.card); st.cards.add(id); flush(); }
  }).catch(() => { cardP.delete(id); /* 小檔抓不到：這個畫面繼續等整包，之後再點還會重試 */ });
  cardP.set(id, p);
  return p;
}

function applyUnitFile(ix: Index, id: string, unit: UnitPart | undefined, cards: Record<string, CardPart> = {}) {
  const st = ix.detailLoaded!;
  const u = ix.units.find((x) => x.id === id);
  if (st.all || !u || !unit) return;
  applyUnit(u, unit);
  for (const [cid, part] of Object.entries<CardPart>(cards)) {
    const card = ix.cards.find((x) => x.id === cid);
    if (card && !st.cards.has(cid)) { applyCard(card, part); st.cards.add(cid); }
  }
  st.units.add(id);
}

function unitPromise(id: string, urgent: boolean): Promise<void> {
  let p = unitP.get(id);
  if (p) return p;
  const early = takeEarly('__hrUnit', id);
  p = limited(() => getSmall(`data/units/${id}.json`, early), urgent).then((d) => {
    const cx = ctx!;
    if (!coreReady(cx.ix)) { if (d?.unit) pendUnits.set(id, { unit: d.unit, cards: d.cards ?? {} }); return; }
    applyUnitFile(cx.ix, id, d?.unit, d?.cards);
    flush();
  }).catch(() => { unitP.delete(id); });
  unitP.set(id, p);
  return p;
}

/** 確保這些卡的長內文已經（或正在）載入；整包到了就什麼都不做。回傳的 Promise 在全部處理完（成功或失敗）時完成 */
export function ensureCards(ids: Iterable<string | null | undefined>, prefetch = false): Promise<void> {
  const c = ctx;
  if (!c || c.ix.detailLoaded?.all) return Promise.resolve();
  const ps: Promise<void>[] = [];
  // 骨架階段 cards 是空的，沒辦法確認 id 存在：照抓，抓不到（404）只是失敗一次
  const stub = !coreReady(c.ix);
  for (const id of new Set(ids)) if (id && !c.ix.detailLoaded!.cards.has(id) && (stub || c.ix.cards.some((x) => x.id === id))) ps.push(cardPromise(id, !prefetch));
  return Promise.all(ps).then(() => {});
}
/** 確保這些單元（每一步的內文＋用到的卡）已經（或正在）載入 */
export function ensureUnits(ids: Iterable<string | null | undefined>, prefetch = false): Promise<void> {
  const c = ctx;
  if (!c || c.ix.detailLoaded?.all) return Promise.resolve();
  const ps: Promise<void>[] = [];
  for (const id of new Set(ids)) if (id && !c.ix.detailLoaded!.units.has(id)) ps.push(unitPromise(id, !prefetch));
  return Promise.all(ps).then(() => {});
}

// 意圖預取：滑鼠停在單元／卡片上 120 ms、聚焦、或手指碰到，就先抓小檔，點下去時通常已經到了。
// 用法：<button {...intent('unit', u.id)}>。滑鼠快速掃過一長串清單不會每個都抓
let hoverTimer = 0;
// warm：順便預載這個畫面的程式（chunk），例如 intent('unit', id, preload.unit)
export function intent(kind: 'card' | 'unit', id: string, warm?: () => unknown) {
  const go = () => { warm?.(); if (kind === 'card') ensureCards([id], true); else ensureUnits([id], true); };
  return {
    onPointerEnter: (e: { pointerType?: string }) => { window.clearTimeout(hoverTimer); if (e.pointerType === 'touch') go(); else hoverTimer = window.setTimeout(go, 120); },
    onPointerLeave: () => window.clearTimeout(hoverTimer),
    onFocus: go,
    onTouchStart: go,
  };
}

// ---- 整包 index-detail.json（背景）----
let fullStarted = false;
let settleResolve: () => void = () => {};
const settled = new Promise<void>((res) => { settleResolve = res; });
let basemapResolve: () => void = () => {};
const basemapDone = new Promise<void>((res) => { basemapResolve = res; });

/** 底圖載入完成（或失敗、退回點陣圖）時呼叫：之後才開始背景下載整包內文 */
export const notifyBasemapDone = () => basemapResolve();
/** 整包內文下載完成或放棄（失敗）後才完成；最多等 20 秒（從開始載入算起）。古道檔等它，排在最後 */
export const whenDetailSettled = () => settled;

/** 馬上開始下載整包（需要掃過所有卡片內文的畫面，例如結構對照的關鍵字搜尋） */
export function startFullDetail() {
  const c = ctx;
  if (!c || fullStarted || !coreReady(c.ix)) return;
  fullStarted = true;
  const url = `${c.base}index-detail.json?v=${encodeURIComponent(c.ix.detailV ?? c.ix.generated)}`;
  const get = async (u: string): Promise<Detail> => { const r = await fetch(u); if (!r.ok) throw new Error(String(r.status)); return r.json(); };
  // 版本不符（部署途中／快取）：帶 b= 再抓一次；還是不符就照收（內文是同一批卡片，最多是舊一點）
  const load = async () => { let d = await get(url); if (c.ix.detailV && d.v !== c.ix.detailV) d = await get(`${url}&b=${encodeURIComponent(c.ix.generated)}`); return d; };
  load().catch(() => new Promise<Detail>((res, rej) => setTimeout(() => load().then(res, rej), 4000)))
    .then((d) => { c.set((cur) => (cur ? mergeDetail(c.ix, d) : cur)); })
    .catch(() => { c.ix.detailLoaded!.failed = true; flush(); })
    .finally(() => settleResolve());
}

/** home.json 讀到後呼叫（先於 adoptCore）：組出骨架 index。只有首頁／清單頁要用的欄位，cards 是空的，coreReady:false */
export function stubFromHome(h: HomeData): Index {
  const units: Unit[] = h.units.map((u) => ({ ...u, goals: [], next: [], steps: [] }));
  const storylines: Storyline[] = h.storylines.map((s) => ({ id: s.id, title: s.title, question: s.question, blurb: '', read: s.read, stops: s.stops.map((id) => ({ id, bridge: null })) }));
  const dives: Dive[] = h.dives.map(({ power_title, ...d }) => ({ ...d, blurb: '', lanes: [], cards: [], storylines: [], power_maps: [], book: null, curves: null, power_ui: power_title ? { title: power_title } : null }));
  const topicLayers: TopicLayer[] = h.topicLayers.map((l) => ({ ...l, topics: l.topics.map((t) => ({ ...t, path: '', see: [], cards: [] })) }));
  return {
    generated: h.generated, detailV: h.detailV, coreReady: false, detailReady: false,
    cards: [], tagCategories: [], topicLayers, fieldOptions: [], civTree: [], frameworks: [], routes: [],
    borders: { source: '', license: '', note: '', snapshots: [] }, itinere: false,
    econ: { metrics: [], series: [] }, chains: [], today: { stale_months: 0, chokepoints: [], chains: [] },
    histories: h.histories, units, storylines, dives,
  };
}

/** home.json 讀到之後呼叫一次：開始管理小檔載入。回傳要放進 state 的骨架 index */
export function initStub(h: HomeData, base: string, set: Dispatch<SetStateAction<Index | null>>): Index {
  const ix = stubFromHome(h);
  ix.detailLoaded = newDetailState();
  ctx = { ix, base, set };
  return ix;
}

/** index.json 讀到之後呼叫一次（不論 home.json 有沒有先到）。回傳要放進 state 的完整 index：
 *  - 之前（骨架階段）小檔先到的內文併進去；
 *  - ctx.ix 換成完整 index，之後的小檔、整包內文都併到它身上；
 *  - 整包 index-detail.json 的背景下載從這裡才開始排（骨架階段不搶 index.json 的頻寬）。 */
export function adoptCore(ix: Index, base: string, set: Dispatch<SetStateAction<Index | null>>): Index {
  const st = ctx?.ix.detailLoaded ?? newDetailState();
  const full: Index = { ...ix, coreReady: true, detailLoaded: st };
  ctx = { ix: full, base: ctx?.base ?? base, set: ctx?.set ?? set };
  for (const [id, part] of pendCards) { const card = full.cards.find((x) => x.id === id); if (card && !st.all) { applyCard(card, part); st.cards.add(id); } }
  pendCards.clear();
  for (const [id, f] of pendUnits) applyUnitFile(full, id, f.unit, f.cards);
  pendUnits.clear();
  // 底圖先、整包後：底圖好了（或 8 秒後，例如手機停在清單頁根本沒開地圖）才開始背景下載
  Promise.race([basemapDone, new Promise<void>((r) => setTimeout(r, 8000))]).then(startFullDetail);
  // 安全時限：整包 20 秒內沒結束，古道檔也不再等
  setTimeout(settleResolve, 20000);
  return { ...full, detailReady: false };
}

/** index.json 抓不到：骨架階段的畫面改顯示失敗訊息 */
export function failCore(set: Dispatch<SetStateAction<Index | null>>) {
  set((cur) => (cur && !coreReady(cur) ? { ...cur, coreFailed: true } : cur));
}

/** 不經骨架直接用完整 index（例如 home.json 抓不到、或測試用） */
export function initDetail(ix: Index, base: string, set: Dispatch<SetStateAction<Index | null>>): Index {
  return adoptCore(ix, base, set);
}
