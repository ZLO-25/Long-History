// 真人實測面板：網址帶 ?perf=1 才載入這個檔（main.tsx 動態 import，自己一個 chunk；平常完全不載）。
// 左下角一個小面板，前 30 秒每半秒更新：載入時間點、慢／大的請求、卡頓（long task）、FPS、裝置資訊。按「複製」把文字貼給開發者。
// App 用 performance.mark 標了三個時間點：hr:home（首頁畫出來）、hr:core（卡片資料到）、hr:map（地圖出現）。
const ms = (n?: number) => (n == null ? '（還沒有）' : `${Math.round(n)} ms`);
const kb = (n: number) => `${Math.round(n / 1024)} KB`;
const short = (u: string) => { try { const x = new URL(u); return x.origin === location.origin ? x.pathname.replace(/^.*\//, '') + x.search : x.host; } catch { return u; } };

export function startPerfPanel() {
  performance.setResourceTimingBufferSize?.(1500);
  let fcp: number | undefined;
  const longs: number[] = [];
  const obs = (type: string, cb: (e: PerformanceEntry) => void) => { try { new PerformanceObserver((l) => l.getEntries().forEach(cb)).observe({ type, buffered: true }); } catch { /* 瀏覽器不支援就略過 */ } };
  obs('paint', (e) => { if (e.name === 'first-contentful-paint') fcp = e.startTime; });
  obs('longtask', (e) => longs.push(e.duration));

  // FPS：每秒數 rAF 次數，留最近 5 秒
  const fps: number[] = [];
  let frames = 0, last = performance.now();
  const tick = () => { frames++; const t = performance.now(); if (t - last >= 1000) { fps.push(Math.round(frames * 1000 / (t - last))); if (fps.length > 5) fps.shift(); frames = 0; last = t; } if (alive) requestAnimationFrame(tick); };
  let alive = true;
  requestAnimationFrame(tick);

  const box = document.createElement('div');
  box.style.cssText = 'position:fixed;left:8px;bottom:8px;z-index:99999;max-width:min(420px,calc(100vw - 16px));max-height:60vh;overflow:auto;background:rgba(255,255,255,.96);color:#222;border:1px solid #888;border-radius:6px;padding:8px;font:11px/1.45 ui-monospace,monospace;user-select:text';
  const pre = document.createElement('pre');
  pre.style.cssText = 'margin:0;white-space:pre-wrap;word-break:break-all';
  const btn = document.createElement('button');
  btn.textContent = '複製';
  btn.style.cssText = 'margin-bottom:4px;font:12px sans-serif';
  btn.onclick = () => { const t = pre.textContent ?? ''; (navigator.clipboard?.writeText(t) ?? Promise.reject()).then(() => { btn.textContent = '已複製'; }, () => { const r = document.createRange(); r.selectNodeContents(pre); const s = getSelection(); s?.removeAllRanges(); s?.addRange(r); btn.textContent = '已選取，請手動複製'; }); };
  box.append(btn, pre);
  document.body.append(box);

  const mark = (n: string) => performance.getEntriesByName(n)[0] as PerformanceMark | undefined;
  const render = () => {
    const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
    const res = (performance.getEntriesByType('resource') as PerformanceResourceTiming[]);
    const own: string[] = [], hosts = new Map<string, { n: number; size: number; dur: number }>();
    for (const r of res) {
      let host = ''; try { host = new URL(r.name).host; } catch { /* 略過 */ }
      if (host && host !== location.host) { const h = hosts.get(host) ?? { n: 0, size: 0, dur: 0 }; h.n++; h.size += r.transferSize; h.dur += r.duration; hosts.set(host, h); }
      else if (r.duration > 300 || r.transferSize > 100 * 1024) own.push(`  ${short(r.name)}  ${kb(r.transferSize)}  ${Math.round(r.duration)} ms`);
    }
    const total = longs.reduce((a, b) => a + b, 0), c = navigator as any;
    const lines = [
      `【版本】${mark('hr:core')?.detail ?? '（資料還沒到）'}`,
      `【時間點】首次繪製 FCP ${ms(fcp)}｜首頁可用 ${ms(mark('hr:home')?.startTime)}｜卡片資料到 ${ms(mark('hr:core')?.startTime)}｜地圖出現 ${ms(mark('hr:map')?.startTime)}｜頁面載入完成 ${ms(nav?.loadEventEnd || undefined)}`,
      `【請求】共 ${res.length} 個；慢（>300 ms）或大（>100 KB）的：`, ...(own.length ? own : ['  （無）']),
      '【外部主機】', ...(hosts.size ? [...hosts].map(([h, v]) => `  ${h}  ${v.n} 個  ${kb(v.size)}  合計 ${Math.round(v.dur)} ms`) : ['  （無）']),
      `【卡頓 long task >50 ms】${longs.length} 次，合計 ${Math.round(total)} ms，最長 ${Math.round(Math.max(0, ...longs))} ms`,
      `【FPS】目前 ${fps.at(-1) ?? '—'}，最近 5 秒最低 ${fps.length ? Math.min(...fps) : '—'}`,
      `【裝置】CPU 核心 ${c.hardwareConcurrency ?? '?'}｜記憶體 ${c.deviceMemory ?? '?'} GB｜網路 ${c.connection?.effectiveType ?? '?'} ${c.connection?.downlink ?? '?'} Mbps｜視窗 ${innerWidth}×${innerHeight}｜${(c.userAgentData?.brands ?? []).map((b: any) => b.brand + ' ' + b.version).join(', ') || navigator.userAgent}`,
    ];
    pre.textContent = lines.join('\n');
  };
  render();
  const timer = setInterval(render, 500);
  setTimeout(() => { clearInterval(timer); alive = false; render(); }, 30000);
}
