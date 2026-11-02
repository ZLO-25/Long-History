// 效能量測：首頁載入、時間軸縮放／拖曳、地圖平移、搜尋打字、開卡時的長任務（>50ms）
// 用法：node scripts/qa/perf.cjs [網址，預設 http://localhost:4173/]
const { chromium } = require('playwright');
const BASE = process.argv[2] || 'http://localhost:4173/';
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  if (process.env.NOBASE) await p.route(/maplibre|tiles|\.pbf|openfreemap|style\.json/, (r) => r.abort());
  await p.addInitScript(() => {
    window.__lt = [];
    new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__lt.push(e.duration); }).observe({ type: 'longtask', buffered: true });
  });
  const cdp = await p.context().newCDPSession(p);
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 }); // 模擬中低階筆電／手機
  const take = () => p.evaluate(() => { const a = window.__lt; window.__lt = []; return a; });
  const report = (name, a) => console.log(`${name.padEnd(14)} 長任務 ${String(a.length).padStart(3)} 次，合計 ${Math.round(a.reduce((x, y) => x + y, 0))}ms，最長 ${Math.round(Math.max(0, ...a))}ms`);
  const t0 = Date.now();
  await p.goto(BASE + '?mode=research', { waitUntil: 'load' });
  await p.waitForSelector('.timeline svg', { timeout: 60000 });
  await p.waitForTimeout(1500);
  console.log(`研究模式可互動 ${Date.now() - t0}ms`);
  report('載入', await take());
  const tl = await p.$('.timeline svg'); const r = await tl.boundingBox();
  for (let i = 0; i < 8; i++) { await p.mouse.move(r.x + r.width / 2, r.y + r.height / 2); await p.mouse.wheel(0, -200); await p.waitForTimeout(60); }
  await p.waitForTimeout(500); report('時間軸縮放', await take());
  await p.mouse.move(r.x + r.width / 2, r.y + r.height / 2); await p.mouse.down();
  for (let i = 0; i < 30; i++) { await p.mouse.move(r.x + r.width / 2 - i * 10, r.y + r.height / 2); }
  await p.mouse.up(); await p.waitForTimeout(500); report('時間軸拖曳', await take());
  const mp = await p.$('.leaflet-container'); const m = await mp.boundingBox();
  await p.mouse.move(m.x + m.width / 2, m.y + m.height / 2); await p.mouse.down();
  for (let i = 0; i < 30; i++) await p.mouse.move(m.x + m.width / 2 + i * 8, m.y + m.height / 2 + i * 3);
  await p.mouse.up(); await p.waitForTimeout(800); report('地圖平移', await take());
  await p.fill('input.search', ''); await p.type('input.search', '羅馬帝國', { delay: 80 });
  await p.waitForTimeout(1500); report('搜尋打字', await take());
  const first = await p.$('.result-list button, .results button, li button');
  if (first) { await first.click(); await p.waitForTimeout(1000); report('開卡', await take()); }
  await p.goto(BASE + '?mode=learn'); await p.waitForTimeout(2500); report('學習首頁', await take());
  await b.close();
})();
