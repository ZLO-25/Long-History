import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import App, { startFetch } from './App';
import { preloadForUrl } from './chunks';

// 程式一執行就開始抓資料（home.json、index.json），不等 React 掛載
startFetch();
// 網址是深連結時，這個畫面需要的程式碼（chunk）現在就開始載，和資料同時，不等首頁畫完
preloadForUrl();
// ?perf=1：真人實測面板（自己一個 chunk，平常不載）
if (location.search.includes('perf=1')) import('./lib/perfPanel').then((m) => m.startPerfPanel());
const root = document.getElementById('root')!;
// index.html 裡的靜態骨架：App 在資料還沒到時畫一模一樣的內容，換成真畫面時不閃
(window as unknown as { __hrShell?: string }).__hrShell = root.innerHTML;
createRoot(root).render(<StrictMode><App /></StrictMode>);
