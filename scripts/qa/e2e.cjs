// node e2e.cjs baseUrl → 7 條歷史端到端：歷史頁有單元、每個單元每一步都能打開、沒有錯誤；3 個模擬能操作；研究模式基本回歸
const { chromium } = require('playwright');
(async () => {
  const base = process.argv[2];
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1280, height: 900 } });
  let errs = [];
  p.on('pageerror', (e) => errs.push(String(e)));
  p.on('console', (m) => { if (m.type() === 'error' && !/tile|favicon|ERR_TUNNEL|ERR_NAME|ERR_PROXY/.test(m.text())) errs.push(m.text()); });
  const fails = [];
  const seen = new Set();
  for (const h of ['taiwan', 'japan', 'china', 'greco-roman', 'money', 'world', 'usa']) {
    errs = [];
    await p.goto(`${base}?mode=learn&history=${h}`, { waitUntil: 'networkidle' });
    await p.waitForTimeout(500);
    const units = await p.$$eval('.hpage button.mystery', (xs) => xs.map((x) => x.textContent));
    const cards = await p.$$eval('svg[aria-label="三軌時間軸"] .lnode', (xs) => xs.length);
    console.log(`[${h}] 單元 ${units.length} 個、主軌卡片節點 ${cards} 個${errs.length ? '；錯誤：' + errs[0] : ''}`);
    if (!units.length || errs.length) fails.push(h);
    for (let i = 0; i < units.length; i++) {
      await p.goto(`${base}?mode=learn&history=${h}`, { waitUntil: 'networkidle' });
      await p.waitForTimeout(300);
      await p.locator('.hpage button.mystery').nth(i).click();
      await p.waitForTimeout(300);
      const uid = new URL(p.url()).searchParams.get('unit');
      if (seen.has(uid)) continue; seen.add(uid);
      errs = [];
      await p.click('.unit-intro button.btn.primary');
      const n = await p.$$eval('.pdot', (xs) => xs.length);
      const bad = [];
      for (let s = 0; s < n; s++) {
        await p.locator('.pdot').nth(s).click();
        await p.waitForTimeout(150);
        const txt = await p.textContent('.unit');
        if (/找不到卡片|undefined|NaN/.test(txt)) bad.push(`第 ${s + 1} 步有「找不到卡片/undefined/NaN」`);
        // 選擇題、排序題：點第一個選項看看會不會出錯
        const opt = await p.$('.unit .opt, .unit .choice button');
        if (opt) await opt.click().catch(() => {});
      }
      const done = await p.$('button:has-text("完成這個單元")');
      if (done) await done.click();
      console.log(`   ${uid}：${n} 步${bad.length ? '；' + bad.join('；') : ''}${errs.length ? '；錯誤：' + errs.slice(0, 2).join(' | ') : ''}`);
      if (bad.length || errs.length) fails.push(uid);
    }
  }
  for (const sim of ['debase', 'bankrun', 'bubble']) {
    errs = [];
    await p.goto(`${base}?mode=learn&sim=${sim}`, { waitUntil: 'networkidle' });
    await p.waitForTimeout(400);
    const before = await p.textContent('.sim-out');
    const btns = await p.$$('.sim-body input[type=range]');
    for (const bt of btns) { await bt.focus(); await p.keyboard.press('End'); }
    await p.waitForTimeout(300);
    const after = await p.textContent('.sim-out');
    console.log('   前：' + before.trim() + '\n   後：' + after.trim());
    const links = await p.$$eval('.sim-cards .chip', (xs) => xs.length);
    console.log(`[模擬 ${sim}] 滑桿 ${btns.length} 個、操作後畫面${before === after ? '沒變' : '有變化'}、連到卡片 ${links} 張${errs.length ? '；錯誤：' + errs[0] : ''}`);
    if (!btns.length || before === after || links < 2 || errs.length) fails.push('sim ' + sim);
  }
  errs = [];
  await p.goto(`${base}?mode=learn&view=mymap`, { waitUntil: 'networkidle' });
  await p.waitForTimeout(500);
  console.log(`[我的歷史地圖] ${errs.length ? '錯誤：' + errs[0] : 'OK'}`);
  console.log(fails.length ? '失敗：' + fails.join('、') : '全部通過');
  await b.close();
})();
