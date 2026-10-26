// node layout.cjs baseUrl [截圖資料夾] → 桌機版分隔線：拖曳、重整後記住、收起時間軸、鍵盤、重設；小視窗不擠爆；手機沒有分隔線
const { chromium } = require('playwright');
(async () => {
  const base = process.argv[2];
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1280, height: 800 } });
  const errs = []; p.on('pageerror', (e) => errs.push(String(e)));
  p.on('console', (m) => { if (m.type() === 'error' && !/tile|ERR_TUNNEL|ERR_NAME|ERR_PROXY|favicon/.test(m.text())) errs.push(m.text()); });
  const drag = async (sel, dx, dy) => {
    const h = await p.$(sel); const bb = await h.boundingBox();
    const x = bb.x + bb.width / 2, y = bb.y + bb.height / 2;
    await p.mouse.move(x, y); await p.mouse.down(); await p.mouse.move(x + dx / 2, y + dy / 2, { steps: 5 }); await p.mouse.move(x + dx, y + dy, { steps: 5 }); await p.mouse.up();
    await p.waitForTimeout(200);
  };
  const size = (sel) => p.$eval(sel, (e) => { const r = e.getBoundingClientRect(); return [Math.round(r.width), Math.round(r.height)]; });
  // 研究模式
  await p.goto(base + '?mode=research', { waitUntil: 'networkidle' }); await p.waitForTimeout(800);
  console.log('研究 初始 panel', await size('.d-main > .panel'), 'tl', await size('.timeline-wrap'), 'map', await size('.map-wrap'));
  await drag('.d-main > .splitter.col', -200, 0);
  await drag('.d-main > .splitter.row', 0, -120);
  console.log('研究 拖後 panel', await size('.d-main > .panel'), 'tl', await size('.timeline-wrap'), 'map', await size('.map-wrap'), '重設鈕', !!(await p.$('.layout-reset')));
  await p.screenshot({ path: (process.argv[3] || 'docs/screenshots/layout') + '/research-dragged.png' });
  await p.reload({ waitUntil: 'networkidle' }); await p.waitForTimeout(800);
  console.log('研究 重整後 panel', await size('.d-main > .panel'), 'tl', await size('.timeline-wrap'), 'localStorage', await p.evaluate(() => localStorage.getItem('history-river-layout-v1')));
  await p.click('.timeline-wrap .tl-toggle'); await p.waitForTimeout(200);
  console.log('研究 收起 tl', await size('.timeline-wrap'), 'map', await size('.map-wrap'));
  await p.screenshot({ path: (process.argv[3] || 'docs/screenshots/layout') + '/research-tl-closed.png' });
  await p.click('.timeline-wrap .tl-toggle'); await p.waitForTimeout(200);
  // 鍵盤
  await p.focus('.d-main > .splitter.col'); await p.keyboard.press('ArrowLeft'); await p.keyboard.press('ArrowLeft'); await p.waitForTimeout(100);
  console.log('研究 鍵盤後 panel', await size('.d-main > .panel'));
  await p.click('.layout-reset'); await p.waitForTimeout(200);
  console.log('研究 重設後 panel', await size('.d-main > .panel'), 'tl', await size('.timeline-wrap'), '重設鈕', !!(await p.$('.layout-reset')));
  // 學習模式
  await p.goto(base + '?mode=learn&history=taiwan', { waitUntil: 'networkidle' }); await p.waitForTimeout(800);
  console.log('學習 初始 content', await size('.lcontent'), 'map', await size('.ld-map'), 'tl', await size('.ld-tl'));
  await drag('.ld-main > .splitter.col', 180, 0);
  await drag('.ld-main > .splitter.row', 0, -100);
  console.log('學習 拖後 content', await size('.lcontent'), 'map', await size('.ld-map'), 'tl', await size('.ld-tl'));
  await p.screenshot({ path: (process.argv[3] || 'docs/screenshots/layout') + '/learn-dragged.png' });
  await p.reload({ waitUntil: 'networkidle' }); await p.waitForTimeout(800);
  console.log('學習 重整後 content', await size('.lcontent'), 'tl', await size('.ld-tl'));
  await p.dblclick('.ld-main > .splitter.col'); await p.waitForTimeout(200);
  console.log('學習 連點兩下後 content', await size('.lcontent'));
  // 極小視窗不會擠爆
  await p.setViewportSize({ width: 900, height: 600 }); await p.waitForTimeout(400);
  console.log('學習 900px 視窗 content', await size('.lcontent'), 'map', await size('.ld-map'), 'tl', await size('.ld-tl'));
  // 手機不出現分隔線
  await p.setViewportSize({ width: 390, height: 844 }); await p.reload({ waitUntil: 'networkidle' }); await p.waitForTimeout(600);
  console.log('手機 分隔線數', (await p.$$('.splitter')).length);
  console.log(errs.length ? '錯誤：' + errs.join('\n') : '無 console 錯誤');
  await b.close();
})();
