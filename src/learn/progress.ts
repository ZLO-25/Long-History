// 學習進度只存在這台瀏覽器（localStorage）。讀寫一律包 try/catch：無痕模式或被封鎖時照樣能用，只是不會記住
import { useCallback, useEffect, useState } from 'react';

export interface UnitProgress { step: number; done: boolean; recap?: string; answers?: Record<string, unknown>; doneAt?: string; lastAt?: string; halfBreak?: boolean; /** 走過的步驟（舊進度沒有，見 level.ts seenSet） */ seen?: number[];
  /** 這一課的作答停留時間（秒）。頁面可見、在單元內、沒閒置超過 2 分鐘才累計；舊進度沒有這個欄位（顯示「—」） */ time?: number }
/** 學生自己填的姓名／班級／座號（只存這台瀏覽器；列印與匯出會帶） */
export interface Profile { name?: string; cls?: string; no?: string }
export interface Progress { units: Record<string, UnitProgress>; cards: Record<string, true>; history?: string; fontScale?: number; seenIntro?: boolean; timelineOpen?: boolean; profile?: Profile }

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
  return { ...d, units, cards };
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
  return { ...inc, ...cur, units, cards: { ...inc.cards, ...cur.cards }, history: cur.history ?? inc.history, profile: Object.keys(profile).length ? profile : undefined };
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
