// 外觀（深色模式）：預設「自動」跟隨系統的 prefers-color-scheme，使用者可以在「Aa」面板改成淺色或深色（記在 localStorage）。
// 做法：在 <html> 上放 data-theme="light"｜"dark"；深色樣式是建置時由每份 CSS 自動產生的覆寫（scripts/lib/dark-css.ts），只認 data-theme="dark"。
// index.html 的一小段程式在畫面出現前就先設好（不閃白）；這裡負責之後的切換、系統設定改變時跟著變。
import { useEffect, useState } from 'react';

export type ThemePref = 'auto' | 'light' | 'dark';
export const THEME_KEY = 'history-river-theme';
const Q = '(prefers-color-scheme: dark)';

export function getThemePref(): ThemePref {
  try { const v = window.localStorage.getItem(THEME_KEY); return v === 'light' || v === 'dark' ? v : 'auto'; } catch { return 'auto'; }
}
const systemDark = () => { try { return window.matchMedia(Q).matches; } catch { return false; } };
export const effectiveTheme = (pref: ThemePref): 'light' | 'dark' => (pref === 'dark' || (pref === 'auto' && systemDark()) ? 'dark' : 'light');

/** 把目前的偏好套到 <html>（不存檔） */
export function applyTheme(pref: ThemePref = getThemePref()) {
  document.documentElement.dataset.theme = effectiveTheme(pref);
}
export function setThemePref(pref: ThemePref) {
  try { if (pref === 'auto') window.localStorage.removeItem(THEME_KEY); else window.localStorage.setItem(THEME_KEY, pref); } catch { /* 無痕模式：這次有效，重開不記 */ }
  applyTheme(pref);
  window.dispatchEvent(new Event('hr-theme'));
}

/** 啟動時呼叫一次：套上偏好，並在系統深淺色改變（而且偏好是「自動」）時跟著換 */
export function initTheme() {
  applyTheme();
  try { window.matchMedia(Q).addEventListener('change', () => { if (getThemePref() === 'auto') applyTheme('auto'); }); } catch { /* 舊瀏覽器 */ }
}

/** 面板用：目前的偏好與設定函式 */
export function useThemePref(): [ThemePref, (p: ThemePref) => void] {
  const [pref, setPref] = useState<ThemePref>(getThemePref);
  useEffect(() => {
    const on = () => setPref(getThemePref());
    window.addEventListener('hr-theme', on);
    return () => window.removeEventListener('hr-theme', on);
  }, []);
  return [pref, setThemePref];
}

export const THEME_LABEL: Record<ThemePref, string> = { auto: '自動', light: '淺色', dark: '深色' };
