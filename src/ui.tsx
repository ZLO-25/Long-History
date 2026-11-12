// 首屏就會用到的小元件：載入骨架、等卡片核心資料（index.json）的提示
import type { Index } from './types';
import { retryDetail } from './lib/detail';

/** 灰色骨架：載入中的畫面。h 是最小高度，讓版面不跳 */
export function Skel({ h, label }: { h?: number | string; label?: string }) {
  return <div className="view-skel" style={h ? { minHeight: h } : undefined} role="status" aria-label={label ?? '載入中'}><i /><i /><i /></div>;
}

/** 這個畫面需要卡片資料（index.json），它還沒到：顯示輕量骨架與「載入中…」；到了之後呼叫端會自己換成正式畫面。抓不到就說明 */
/** 等卡片／單元內文（小檔）：抓不到顯示失敗與重試 */
export function DetailWait({ index }: { index: Index }) {
  if (index.detailLoaded?.failed) return <p className="muted loading-detail" role="alert">卡片內容下載失敗，請檢查網路後<button className="link" onClick={retryDetail}>重試</button>或重新整理頁面。</p>;
  return <p className="muted loading-detail">載入卡片內容…</p>;
}

export function CoreWait({ index }: { index: Index }) {
  if (index.coreFailed) return <p className="muted loading-detail" role="alert">卡片資料下載失敗，請檢查網路後重新整理頁面。</p>;
  return <div className="core-wait"><p className="muted loading-detail">載入中…</p><Skel label="載入卡片資料" /></div>;
}
