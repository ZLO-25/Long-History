// 學習進度只存在這台瀏覽器（localStorage）。讀寫一律包 try/catch：無痕模式或被封鎖時照樣能用，只是不會記住
import { useCallback, useEffect, useState } from 'react';

export interface UnitProgress { step: number; done: boolean; recap?: string; answers?: Record<string, unknown>; doneAt?: string; lastAt?: string; halfBreak?: boolean; /** 走過的步驟（舊進度沒有，見 level.ts seenSet） */ seen?: number[] }
export interface Progress { units: Record<string, UnitProgress>; cards: Record<string, true>; history?: string; fontScale?: number; seenIntro?: boolean; timelineOpen?: boolean }

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
