// 卡片／單元長內文的載入。模型很簡單：要顯示一個畫面，只抓這個畫面需要的東西。
//  - home.json（約 20 KB）先到 → initStub：組一個「骨架 index」（coreReady:false，cards 是空的）就畫學習首頁與清單頁。
//  - index.json（卡片核心資料）到了 → adoptCore：換成完整 index（coreReady:true），App 不重新掛載、畫面狀態不丟。
//    骨架階段就點開的卡片／單元，小檔照樣先抓，暫存在 pendCards／pendUnits，adoptCore 時一次併進去。
//  - 長內文只有小檔：data/cards/<id>.json（一張卡）、data/units/<id>.json（一個單元＋它用到的卡）。
//    打開時才抓；滑鼠移上去／聚焦／觸碰時先抓（intent）。同一個檔只抓一次（Map 存 Promise）。
//  - 小檔有什麼收什麼：不比對版本。新部署的小檔配舊的 index.json 沒問題（id 相同、不認得的 id 略過）。
//  - 失敗：1 秒後重試一次，還是失敗就顯示「下載失敗」與重試連結（DetailWait）。
//  - 唯一要掃過所有卡片內文的畫面是「結構對照」：打開它才抓 data/match.json（loadMatch）。
import type { Dispatch, SetStateAction } from 'react';
import type { Card, DetailState, Dive, HomeData, Index, Storyline, TopicLayer, Unit } from '../types';

export type CardPart = Pick<Card, 'sections' | 'sources' | 'causes' | 'effects' | 'aliases_show' | 'images' | 'counterparts_none' | 'lens'> & { learn?: Partial<NonNullable<Card['learn']>> };
export type UnitPart = Partial<Index['units'][number]>;

export const newDetailState = (): DetailState => ({ cards: new Set(), units: new Set(), match: false, failed: false });

// 長內文直接寫進原本的卡片物件（同一個 cards 陣列），地圖、時間軸、搜尋索引不必因此全部重算
function applyCard(c: Card, x: CardPart) {
  const { learn, ...rest } = x;
  Object.assign(c, rest);
  c.today_hook = rest.sections?.find((s) => s.role === 'today_hook')?.text ?? '';
  c.non_analogous = rest.sections?.find((s) => s.role === 'non_analogous')?.text ?? '';
  if (c.learn && learn) Object.assign(c.learn, learn);
}
const applyUnit = (u: Index['units'][number], x: UnitPart) => { Object.assign(u, x); };

/** index.json（卡片核心資料）到了沒。false＝目前只是 home.json 的骨架：沒有任何卡片，需要卡片的畫面要等 */
export const coreReady = (ix: Index) => ix.coreReady !== false;

/** 這張卡的長內文到了沒 */
export const cardLoaded = (ix: Index, id: string | null | undefined) => !!(id && ix.detailLoaded?.cards.has(id));
/** 這個單元的每一步內文到了沒 */
export const unitLoaded = (ix: Index, id: string | null | undefined) => !!(id && ix.detailLoaded?.units.has(id));
/** 結構對照要掃的內文（data/match.json）到了沒 */
export const matchLoaded = (ix: Index) => !!ix.detailLoaded?.match;

// ---- 載入器 ----
interface Ctx { ix: Index; base: string; set: Dispatch<SetStateAction<Index | null>> }
let ctx: Ctx | null = null;
const cardP = new Map<string, Promise<boolean>>();
const unitP = new Map<string, Promise<boolean>>();
let matchP: Promise<boolean> | null = null, matchFailed = false;
// 失敗的（顯示「下載失敗」後按重試要再抓的）
const failedC = new Set<string>(), failedU = new Set<string>();
// 骨架階段（卡片核心資料還沒到）先抓到的小檔：adoptCore 時一次併進去
const pendCards = new Map<string, CardPart>();
const pendUnits = new Map<string, { unit: UnitPart; cards: Record<string, CardPart> }>();

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

/** 抓一個小檔：index.html 提前抓的先用；失敗 1 秒後重試一次 */
async function getSmall(path: string, early: Promise<any> | null = null): Promise<any> {
  const get = async () => { const r = await fetch(ctx!.base + path); if (!r.ok) throw new Error(String(r.status)); return r.json(); };
  const wait = () => new Promise((r) => setTimeout(r, 1000));
  if (early) { const e = await early; if (e) return e; await wait(); return get(); } // 提前抓的失敗了＝第一次，1 秒後再來一次
  try { return await get(); } catch { await wait(); return get(); }
}

/** 抓一個檔並處理；回傳是否成功（失敗不丟錯，並把這個 id 從 Map 拿掉，之後再要還會重抓） */
function track(map: Map<string, Promise<boolean>>, id: string, run: () => Promise<void>): Promise<boolean> {
  let p = map.get(id);
  if (p) return p;
  p = run().then(() => true, () => { map.delete(id); return false; });
  map.set(id, p);
  return p;
}

const cardPromise = (id: string) => track(cardP, id, async () => {
  const d = await getSmall(`data/cards/${id}.json`, takeEarly('__hrCard', id));
  const cx = ctx!;
  if (!coreReady(cx.ix)) { if (d?.card) pendCards.set(id, d.card); return; }
  const card = cx.ix.cards.find((x) => x.id === id);
  if (card && d?.card) { applyCard(card, d.card); cx.ix.detailLoaded!.cards.add(id); flush(); }
});

function applyUnitFile(ix: Index, id: string, unit: UnitPart | undefined, cards: Record<string, CardPart> = {}) {
  const st = ix.detailLoaded!;
  const u = ix.units.find((x) => x.id === id);
  if (!u || !unit) return;
  applyUnit(u, unit);
  for (const [cid, part] of Object.entries<CardPart>(cards)) {
    const card = ix.cards.find((x) => x.id === cid);
    if (card && !st.cards.has(cid)) { applyCard(card, part); st.cards.add(cid); }
  }
  st.units.add(id);
}

const unitPromise = (id: string) => track(unitP, id, async () => {
  const d = await getSmall(`data/units/${id}.json`, takeEarly('__hrUnit', id));
  const cx = ctx!;
  if (!coreReady(cx.ix)) { if (d?.unit) pendUnits.set(id, { unit: d.unit, cards: d.cards ?? {} }); return; }
  applyUnitFile(cx.ix, id, d?.unit, d?.cards);
  flush();
});

/** 等這批都處理完；不是預取的失敗了就記下來，畫面改顯示「下載失敗」＋重試 */
async function settle(ps: Promise<boolean>[], ids: string[], failed: Set<string>, prefetch: boolean) {
  const oks = await Promise.all(ps);
  if (prefetch || !ctx) return;
  oks.forEach((ok, i) => { if (!ok) failed.add(ids[i]); });
  if (oks.includes(false)) { ctx.ix.detailLoaded!.failed = true; flush(); }
}

/** 確保這些卡的長內文已經（或正在）載入。回傳的 Promise 在全部處理完（成功或失敗）時完成 */
export function ensureCards(ids: Iterable<string | null | undefined>, prefetch = false): Promise<void> {
  const c = ctx;
  if (!c) return Promise.resolve();
  // 骨架階段 cards 是空的，沒辦法確認 id 存在：照抓，抓不到（404）只是失敗一次
  const stub = !coreReady(c.ix);
  const want = [...new Set(ids)].filter((id): id is string => !!id && !c.ix.detailLoaded!.cards.has(id) && (stub || c.ix.cards.some((x) => x.id === id)));
  return settle(want.map(cardPromise), want, failedC, prefetch);
}
/** 確保這些單元（每一步的內文＋用到的卡）已經（或正在）載入 */
export function ensureUnits(ids: Iterable<string | null | undefined>, prefetch = false): Promise<void> {
  const c = ctx;
  if (!c) return Promise.resolve();
  const want = [...new Set(ids)].filter((id): id is string => !!id && !c.ix.detailLoaded!.units.has(id));
  return settle(want.map(unitPromise), want, failedU, prefetch);
}

/** 結構對照要掃過所有卡的內文：打開它才抓 data/match.json（每張卡只有各節文字與來源）。已經有完整內文的卡不覆蓋 */
export function loadMatch(): Promise<void> {
  const c = ctx;
  if (!c || !coreReady(c.ix) || c.ix.detailLoaded!.match) return Promise.resolve();
  matchP ??= getSmall('data/match.json').then((d) => {
    const st = ctx!.ix.detailLoaded!;
    for (const card of ctx!.ix.cards) { const x = d.cards[card.id]; if (x && !st.cards.has(card.id)) applyCard(card, x); }
    st.match = true; flush();
    return true;
  }).catch(() => { matchP = null; matchFailed = true; ctx!.ix.detailLoaded!.failed = true; flush(); return false; });
  return matchP.then(() => {});
}

/** 「下載失敗」後按重試：把失敗的再抓一次 */
export function retryDetail() {
  const c = ctx;
  if (!c) return;
  c.ix.detailLoaded!.failed = false;
  flush();
  const cs = [...failedC], us = [...failedU];
  failedC.clear(); failedU.clear();
  ensureCards(cs); ensureUnits(us);
  if (matchFailed) { matchFailed = false; loadMatch(); }
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

/** home.json 讀到後呼叫（先於 adoptCore）：組出骨架 index。只有首頁／清單頁要用的欄位，cards 是空的，coreReady:false */
export function stubFromHome(h: HomeData): Index {
  const units: Unit[] = h.units.map((u) => ({ ...u, goals: [], next: [], steps: [] }));
  const storylines: Storyline[] = h.storylines.map((s) => ({ id: s.id, title: s.title, question: s.question, blurb: '', read: s.read, stops: s.stops.map((id) => ({ id, bridge: null })) }));
  const dives: Dive[] = h.dives.map(({ power_title, ...d }) => ({ ...d, blurb: '', lanes: [], cards: [], storylines: [], power_maps: [], book: null, curves: null, power_ui: power_title ? { title: power_title } : null }));
  const topicLayers: TopicLayer[] = h.topicLayers.map((l) => ({ ...l, topics: l.topics.map((t) => ({ ...t, path: '', see: [], cards: [] })) }));
  return {
    generated: h.generated, coreReady: false,
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
 *  骨架階段先到的小檔內文併進去；ctx.ix 換成完整 index，之後的小檔都併到它身上。 */
export function adoptCore(ix: Index, base: string, set: Dispatch<SetStateAction<Index | null>>): Index {
  const st = ctx?.ix.detailLoaded ?? newDetailState();
  const full: Index = { ...ix, coreReady: true, detailLoaded: st };
  ctx = { ix: full, base: ctx?.base ?? base, set: ctx?.set ?? set };
  for (const [id, part] of pendCards) { const card = full.cards.find((x) => x.id === id); if (card) { applyCard(card, part); st.cards.add(id); } }
  pendCards.clear();
  for (const [id, f] of pendUnits) applyUnitFile(full, id, f.unit, f.cards);
  pendUnits.clear();
  return full;
}

/** index.json 抓不到：骨架階段的畫面改顯示失敗訊息 */
export function failCore(set: Dispatch<SetStateAction<Index | null>>) {
  set((cur) => (cur && !coreReady(cur) ? { ...cur, coreFailed: true } : cur));
}
