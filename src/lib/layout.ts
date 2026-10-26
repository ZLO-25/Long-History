// 各區塊大小（使用者拖曳分隔線調整）只記在這台瀏覽器的 localStorage；讀寫都包 try/catch，無痕模式照樣能用
import { useCallback, useEffect, useState } from 'react';

export interface Layout {
  rPanel?: number;   // 研究模式：右側卡片欄寬（px）
  rTl?: number;      // 研究模式：時間軸高（px）
  rTlOpen?: boolean; // 研究模式：時間軸是否展開（預設展開）
  lContent?: number; // 學習模式：左側文字欄寬（px）
  lTl?: number;      // 學習模式：時間軸高（px）
}
const KEY = 'history-river-layout-v1';
function read(): Layout {
  try { const raw = window.localStorage.getItem(KEY); return raw ? JSON.parse(raw) : {}; } catch { return {}; }
}
export function useLayout() {
  const [layout, setLayout] = useState<Layout>(read);
  useEffect(() => { try { window.localStorage.setItem(KEY, JSON.stringify(layout)); } catch { /* 存不了就算了 */ } }, [layout]);
  const set = useCallback((patch: Partial<Layout>) => setLayout((o) => ({ ...o, ...patch })), []);
  // 重設：只清掉指定的幾個欄位（研究模式與學習模式各自重設，不互相影響）
  const reset = useCallback((keys: (keyof Layout)[]) => setLayout((o) => { const n = { ...o }; for (const k of keys) delete n[k]; return n; }), []);
  return { layout, set, reset };
}
// CSS 用：有存值就用存值，但永遠夾在合理範圍內（視窗變小也不會把另一邊擠到看不見）
export const colSize = (px: number | undefined, fallback: string, min = 280, maxPct = 65) => (px ? `clamp(${min}px, ${px}px, ${maxPct}%)` : fallback);
export const rowSize = (px: number | undefined, fallback: string, min = 60, maxPct = 55) => (px ? `clamp(${min}px, ${px}px, ${maxPct}%)` : fallback);
