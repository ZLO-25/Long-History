// 站內跳轉：不用把每個按鈕都接到 LearnApp——寫一筆網址，再通知 LearnApp 的 popstate（它會照網址重建畫面堆疊）
import type { ReactNode } from 'react';

export const learnHref = (q: Record<string, string>) => `${location.pathname}?${new URLSearchParams({ mode: 'learn', ...q })}`;
export function gotoLearn(q: Record<string, string>) {
  history.pushState(null, '', learnHref(q));
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo?.(0, 0);
}
/** 站內連結：一般點擊走站內跳轉（不重新載入），按住 Ctrl／⌘／Shift 或中鍵時照瀏覽器預設（新分頁） */
export function LLink({ q, className, children, title, newTab }: { q: Record<string, string>; className?: string; children: ReactNode; title?: string; newTab?: boolean }) {
  return <a className={className} title={title} href={learnHref(q)} {...(newTab ? { target: '_blank', rel: 'noopener' } : {})}
    onClick={(e) => { if (newTab || e.defaultPrevented || e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return; e.preventDefault(); gotoLearn(q); }}>{children}</a>;
}
