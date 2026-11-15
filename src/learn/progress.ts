// 學習進度只存在這台瀏覽器（localStorage）。讀寫一律包 try/catch：無痕模式或被封鎖時照樣能用，只是不會記住
import { useCallback, useEffect, useState } from 'react';

export interface UnitProgress { step: number; done: boolean; recap?: string; answers?: Record<string, unknown>; doneAt?: string; lastAt?: string; halfBreak?: boolean; /** 走過的步驟（舊進度沒有，見 level.ts seenSet） */ seen?: number[];
  /** 這一課的作答停留時間（秒）。頁面可見、在單元內、沒閒置超過 2 分鐘才累計；舊進度沒有這個欄位（顯示「—」） */ time?: number;
  /** 1＝這一課的題目已經排進間隔複習（Progress.review）。完成時寫入；舊進度沒有，進複習頁時補建（review.ts） */ rv?: 1 }
/** 間隔複習的一題（鍵是「<課id>:<題鍵>」，題鍵同 level.ts，例如 unit-x:c5_2、unit-x:qk3_0）。
 *  s＝已經答對幾次複習（0–3，4＝畢業不再出）；due＝下次到期日；last＝上次複習日（還沒複習過就沒有）；ok＝上次複習是否答對（還沒複習過是 true；段考答錯會設 false） */
export interface RevRec { s: number; due: string; last?: string; ok: boolean }
/** 學生自己填的姓名／班級／座號（只存這台瀏覽器；列印與匯出會帶） */
export interface Profile { name?: string; cls?: string; no?: string }
/** 深入專題的總結任務（2026-11 第 4f 批）：Progress.capstone[<專題 id>]。text＝寫的內容；pts＝逐條自評；seen＝看過重點；skip＝按了「我真的想不出來」；more＝補寫一句；at＝最後修改日（備份合併取較新的） */
export interface CapstoneRec { text: string; pts?: (boolean | null)[]; seen?: boolean; skip?: boolean; more?: string; at?: string }
export interface Progress { units: Record<string, UnitProgress>; cards: Record<string, true>; history?: string; fontScale?: number; seenIntro?: boolean; timelineOpen?: boolean; profile?: Profile;
  /** 專題總結任務（選填；舊進度沒有） */ capstone?: Record<string, CapstoneRec>;
  /** 間隔複習排程（選填；舊進度沒有）與做過複習的日期（YYYY-MM-DD，由舊到新） */ review?: Record<string, RevRec>; reviewDays?: string[] }

const KEY = 'history-river-learn-v1';
const empty = (): Progress => ({ units: {}, cards: {} });

function read(): Progress {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return empty();
    const p = JSON.parse(raw);
    return { ...empty(), ...p, units: p.units ?? {}, cards: p.cards ?? {} };
  } catch { return empty(); }
}
function write(p: Progress) {
  try { window.localStorage.setItem(KEY, JSON.stringify(p)); } catch { /* 存不了就算了 */ }
}

export function useProgress() {
  const [p, setP] = useState<Progress>(read);
  useEffect(() => { write(p); }, [p]);
  const update = useCallback((f: (p: Progress) => Progress) => setP((old) => f(old)), []);
  const markCard = useCallback((id: string) => setP((o) => (o.cards[id] ? o : { ...o, cards: { ...o.cards, [id]: true } })), []);
  // answers 只傳這次要改的鍵，這裡和原本的合併（連續兩次存檔不會互相蓋掉）
  const setUnit = useCallback((id: string, patch: Partial<UnitProgress>) =>
    setP((o) => ({ ...o, units: { ...o.units, [id]: { ...{ step: 0, done: false }, ...o.units[id], ...patch, ...(patch.answers ? { answers: { ...o.units[id]?.answers, ...patch.answers } } : {}), lastAt: new Date().toISOString().slice(0, 10) } as UnitProgress } })), []);
  const reset = useCallback(() => setP(empty()), []);
  return { p, update, markCard, setUnit, reset };
}

// ---- 備份／還原（#23）----
/** 備份檔的格式：{ app, v, at, data: Progress } */
export const BACKUP_APP = 'history-river-learn';
export const backupOf = (p: Progress) => ({ app: BACKUP_APP, v: 1, at: new Date().toISOString(), data: p });

/** 把任何東西整理成 Progress（備份檔可能是手寫或舊版）；不是進度就回 null */
export function toProgress(x: unknown): Progress | null {
  const d = (x && typeof x === 'object' && (x as any).app === BACKUP_APP ? (x as any).data : x) as any;
  if (!d || typeof d !== 'object' || Array.isArray(d)) return null;
  if (d.units != null && (typeof d.units !== 'object' || Array.isArray(d.units))) return null;
  if (d.units == null && d.cards == null) return null;
  const units: Record<string, UnitProgress> = {};
  for (const [id, u] of Object.entries(d.units ?? {})) if (u && typeof u === 'object') units[id] = u as UnitProgress;
  const cards: Record<string, true> = {};
  for (const id of Object.keys(d.cards ?? {})) cards[id] = true;
  const out: Progress = { ...d, units, cards };
  if (!d.review || typeof d.review !== 'object' || Array.isArray(d.review)) delete out.review;
  if (!Array.isArray(d.reviewDays)) delete out.reviewDays;
  if (d.capstone != null) {
    const cap: Record<string, CapstoneRec> = {};
    if (typeof d.capstone === 'object' && !Array.isArray(d.capstone)) for (const [id, c] of Object.entries(d.capstone)) if (c && typeof c === 'object' && typeof (c as any).text === 'string') cap[id] = c as CapstoneRec;
    if (Object.keys(cap).length) out.capstone = cap; else delete out.capstone;
  }
  return out;
}

export interface MergePlan { added: string[]; newer: string[]; kept: string[]; same: string[]; cardsAdded: number }
/** 同一課取較新的 lastAt（日期字串）；一樣新就保留目前這台的。讀過的卡片取聯集 */
export function planMerge(cur: Progress, inc: Progress): MergePlan {
  const plan: MergePlan = { added: [], newer: [], kept: [], same: [], cardsAdded: 0 };
  for (const [id, u] of Object.entries(inc.units)) {
    const c = cur.units[id];
    if (!c) plan.added.push(id);
    else if ((u.lastAt ?? '') > (c.lastAt ?? '')) plan.newer.push(id);
    else if (JSON.stringify(u) === JSON.stringify(c)) plan.same.push(id);
    else plan.kept.push(id);
  }
  plan.cardsAdded = Object.keys(inc.cards).filter((id) => !cur.cards[id]).length;
  return plan;
}
export function mergeProgress(cur: Progress, inc: Progress): Progress {
  const plan = planMerge(cur, inc);
  const units = { ...cur.units };
  for (const id of [...plan.added, ...plan.newer]) units[id] = inc.units[id];
  const profile = { ...(inc.profile ?? {}), ...Object.fromEntries(Object.entries(cur.profile ?? {}).filter(([, v]) => v)) };
  // 複習排程：同一題取 last 較新的（一樣新就留目前這台的）；做過複習的日期取聯集
  const review: Record<string, RevRec> = { ...(inc.review ?? {}) };
  for (const [k, c] of Object.entries(cur.review ?? {})) { const o = review[k]; review[k] = !o || (c.last ?? '') >= (o.last ?? '') ? c : o; }
  const reviewDays = [...new Set([...(inc.reviewDays ?? []), ...(cur.reviewDays ?? [])])].sort();
  // 專題總結任務：同一個專題取 at 較新的（一樣新就留目前這台的；目前這台是空的就用匯入的）
  const capstone: Record<string, CapstoneRec> = { ...(inc.capstone ?? {}) };
  for (const [k, c] of Object.entries(cur.capstone ?? {})) { const o = capstone[k]; capstone[k] = !o ? c : !c.text.trim() ? o : !o.text.trim() ? c : (c.at ?? '') >= (o.at ?? '') ? c : o; }
  const out: Progress = { ...inc, ...cur, units, cards: { ...inc.cards, ...cur.cards }, history: cur.history ?? inc.history, profile: Object.keys(profile).length ? profile : undefined };
  if (Object.keys(capstone).length) out.capstone = capstone; else delete out.capstone;
  if (Object.keys(review).length) out.review = review; else delete out.review;
  if (reviewDays.length) out.reviewDays = reviewDays; else delete out.reviewDays;
  return out;
}

/** 頁面要關掉了（pagehide）：React 的存檔來不及，直接把這一課的停留時間寫進 localStorage */
export function saveTimeNow(id: string, time: number) {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return;
    const p = JSON.parse(raw);
    if (!p?.units?.[id]) return;
    p.units[id].time = time;
    window.localStorage.setItem(KEY, JSON.stringify(p));
  } catch { /* 存不了就算了 */ }
}
