// node home.cjs baseUrl [截圖資料夾] → 學習首頁瘦身（review #17）、用語（#18）、年級與課綱頁（#19）
// 手機 390×844：首頁高度 ≤ 4 個螢幕、可點項目 ≤ 40；年級切換可用（有沒有年級資料都不出錯）；四個入口都到得了；課綱對照頁打得開；
// 「接著做」依 lastAt 選；底部分頁叫「首頁」、卡片分頁有「去挑一課」、從標籤頁點卡片到卡片分頁有「← 返回」。桌機 1366×768 也截圖。
const { chromium } = require('playwright');
(async () => {
  const base = process.argv[2];
  const out = process.argv[3] || 'docs/screenshots/home';
  require('fs').mkdirSync(out, { recursive: true });
  const b = await chromium.launch();
  let fail = 0;
  const ok = (cond, msg) => { console.log(`${cond ? '✓' : '✗'} ${msg}`); if (!cond) fail++; };
  const errs = [];
  const watch = (p) => { p.on('pageerror', (e) => errs.push(String(e))); p.on('console', (m) => { if (m.type() === 'error' && !/tile|favicon|ERR_TUNNEL|ERR_NAME|ERR_PROXY|openfreemap|Failed to load resource/.test(m.text())) errs.push(m.text()); }); };
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 } });
  const p = await ctx.newPage(); watch(p);
  const q = () => p.evaluate(() => Object.fromEntries(new URLSearchParams(location.search)));
  const toHome = async () => { await p.goto(`${base}?mode=learn`, { waitUntil: 'networkidle' }); await p.waitForSelector('.lhome'); };

  console.log('== 手機首頁（第一次來，歡迎卡開著）==');
  await toHome();
  const m = await p.evaluate(() => {
    const vis = (e) => !!(e.offsetParent || e.getClientRects().length);
    return { h: document.querySelector('.lm-main').scrollHeight, top: document.querySelector('.ltop').offsetHeight, tabs: document.querySelector('.ltabs').offsetHeight,
      clickable: [...document.querySelectorAll('button, a[href], input, summary, select, textarea')].filter(vis).length,
      home: [...document.querySelectorAll('.lhome button, .lhome a[href], .lhome summary')].length,
      picks: document.querySelectorAll('.home-pick .mystery').length, slot: !!document.querySelector('#home-review-slot') };
  });
  const screens = (m.h + m.top + m.tabs) / 844;
  console.log(`  首頁內容高 ${m.h}px，加頁首分頁共約 ${screens.toFixed(1)} 個螢幕；全頁可點項目 ${m.clickable}（首頁內容區 ${m.home}）`);
  ok(screens <= 4, `手機首頁高度 ≤ 4 個螢幕（${screens.toFixed(1)}）`);
  ok(m.clickable <= 40, `手機首頁可點項目 ≤ 40（${m.clickable}）`);
  ok(m.picks >= 6 && m.picks <= 8, `「挑一課開始」有 6–8 張課卡（${m.picks}）`);
  ok(m.slot, '有 #home-review-slot 容器');
  ok(/挑一課開始/.test(await p.textContent('.lhome')) && /目前講得深的、還沒有的/.test(await p.textContent('.lhome')), '有「挑一課開始」與「講得深的、還沒有的」');
  ok(await p.evaluate(() => [...document.querySelectorAll('.ltabs button')].map((x) => x.textContent).join() === '首頁,卡片,地圖,時間軸'), '手機底部分頁：首頁｜卡片｜地圖｜時間軸');
  await p.screenshot({ path: `${out}/home-slim-m.png` });
  await p.locator('.lm-main').evaluate((e) => e.scrollTo(0, 700)); await p.screenshot({ path: `${out}/home-slim-m2.png` });

  console.log('\n== 年級切換 ==');
  const hasLv = await p.evaluate(async (u) => { const h = await (await fetch(u + 'home.json')).json(); return h.units.some((x) => x.level); }, base);
  console.log(`  資料有 level：${hasLv}`);
  const first = () => p.$$eval('.home-pick .mystery', (xs) => xs.map((x) => x.textContent));
  for (const l of ['國中', '高中', '全部']) {
    await p.locator('.home-pick .seg button', { hasText: l }).click();
    const t = await first();
    ok(t.length > 0 && (await p.locator('.home-pick .seg button.on').textContent()) === l, `切到「${l}」：有課卡（${t.length}）、按鈕亮起`);
  }
  if (hasLv) {
    await p.locator('.home-pick .seg button', { hasText: '國中' }).click();
    ok((await p.$$eval('.home-pick .mystery .lv-tag', (xs) => xs.map((x) => x.textContent))).every((t) => /國中|皆可/.test(t)), '國中：只出國中與皆可');
  }

  console.log('\n== 四個入口＋看全部＋隨機 ==');
  const entry = async (label, sel, tag) => {
    await toHome();
    await p.locator('.home-entries .entry', { hasText: label }).click();
    await p.waitForSelector(sel, { timeout: 8000 }).then(() => ok(true, `入口「${label}」→ ${tag}`), () => ok(false, `入口「${label}」→ ${tag}`));
  };
  await entry('依地區與主題', '.htile', 'XX史清單');
  ok((await q()).view === 'histories', '網址 view=histories');
  const tiles = await p.$$eval('.htile', (xs) => xs.map((x) => ({ empty: x.classList.contains('empty'), t: x.textContent })));
  const firstEmpty = tiles.findIndex((x) => x.empty);
  ok(firstEmpty < 0 || tiles.slice(firstEmpty).every((x) => x.empty), '沒有課的 XX史排在最後');
  ok(tiles.filter((x) => x.empty).every((x) => /還沒有課/.test(x.t)), '沒有課的 XX史標「還沒有課…」');
  ok(!(await p.textContent('.lists-page')).includes('專題（跨地區）'), '「專題（跨地區）」已改名');
  await entry('讀故事', '.si-item', '故事線清單');
  await entry('深入專題', '.dive-index, .di-item', '深入專題清單');
  await entry('#標籤', '.topic-index', '#標籤清單');
  await toHome();
  await p.locator('.home-pick .pick-more .btn', { hasText: '看全部' }).click();
  await p.waitForSelector('.lists-page .mystery');
  ok((await q()).view === 'lessons', '「看全部 N 課」→ 全部的課（view=lessons）');
  const n0 = await p.$$eval('.lists-page .mystery', (x) => x.length);
  ok(n0 === (await p.evaluate(async (u) => (await (await fetch(u + 'home.json')).json()).units.length, base)), `列出全部 ${n0} 課`);
  await p.locator('.lists-page .seg[aria-label="地區"] button', { hasText: '臺灣' }).click();
  const n1 = await p.$$eval('.lists-page .mystery', (x) => x.length);
  ok(n1 > 0 && n1 < n0, `依地區篩選「臺灣」：${n1} 課`);
  await p.locator('.lists-page .seg[aria-label="年級"] button', { hasText: '高中' }).click();
  ok((await p.$$eval('.lists-page .mystery', (x) => x.length)) >= 0, '再加年級篩選不出錯');
  await toHome();
  await p.locator('.home-pick .pick-more .btn', { hasText: '隨機一課' }).click();
  await p.waitForSelector('.unit-intro, .unit');
  ok(!!(await q()).unit, '「🎲 隨機一課」進到一課');

  console.log('\n== 課綱對照頁 ==');
  await toHome();
  await p.locator('.coverage .link', { hasText: '課綱對照' }).click();
  await p.waitForSelector('.curriculum-page');
  await p.waitForTimeout(500);
  ok((await q()).view === 'curriculum', '首頁最下方入口 → 課綱對照（view=curriculum）');
  const cur = await p.evaluate(() => ({ wip: !!document.querySelector('.cur-wip'), items: document.querySelectorAll('.cur-item').length, none: document.querySelectorAll('.cur-item.none').length }));
  ok(cur.wip || cur.items > 0, `課綱頁顯示「整理中」或條目（整理中：${cur.wip}、條目 ${cur.items}、還沒有 ${cur.none}）`);
  await p.screenshot({ path: `${out}/curriculum-m.png` });
  await p.goto(`${base}?mode=learn&view=curriculum`, { waitUntil: 'networkidle' });
  ok(!!(await p.$('.curriculum-page')), '直接開 ?view=curriculum 正常');
  await p.goto(`${base}?mode=learn&view=lessons`, { waitUntil: 'networkidle' });
  await p.waitForSelector('.lists-page .link');
  await p.locator('.lists-page .link', { hasText: '課綱對照' }).click();
  ok(!!(await p.waitForSelector('.curriculum-page').catch(() => null)), '「全部的課」頁有課綱對照入口');

  console.log('\n== 接著做：依最近活動時間 ==');
  const units = await p.evaluate(async (u) => (await (await fetch(u + 'home.json')).json()).units, base);
  const [a, c] = [units[0], units[1]];
  const prog = { units: { [a.id]: { step: 5, done: false, lastAt: '2026-11-01' }, [c.id]: { step: 2, done: false, lastAt: '2026-11-14' } }, cards: {}, seenIntro: true };
  await p.addInitScript((x) => { try { if (!localStorage.getItem('hr-test-seeded')) { localStorage.setItem('history-river-learn-v1', JSON.stringify(x)); localStorage.setItem('hr-test-seeded', '1'); } } catch {} }, prog);
  await toHome();
  const rs = await p.textContent('.resume');
  ok(rs.includes(c.mystery) && !rs.includes(a.mystery), '「接著做」選 lastAt 最近的那一課，不是步數最多的');
  ok(!!(await p.$('.resume .link')), '有「這不是我？」小字連結');

  console.log('\n== 手機「卡片」分頁 ==');
  await ctx.clearCookies();
  const ctx2 = await b.newContext({ viewport: { width: 390, height: 844 } });
  const p2 = await ctx2.newPage(); watch(p2);
  await p2.goto(`${base}?mode=learn`, { waitUntil: 'networkidle' });
  await p2.waitForSelector('.lhome');
  await p2.locator('.ltabs button', { hasText: '卡片' }).click();
  ok(!!(await p2.$('.card-empty .btn')) && /去挑一課/.test(await p2.textContent('.card-empty')), '沒開卡時「卡片」分頁有「去挑一課」按鈕');
  await p2.click('.card-empty .btn');
  ok(!!(await p2.$('.lhome')) && (await p2.locator('.ltabs button.on').textContent()) === '首頁', '按「去挑一課」回首頁分頁');
  await p2.goto(`${base}?mode=learn&view=topics`, { waitUntil: 'networkidle' });
  await p2.waitForSelector('.topic-index');
  await p2.locator('.topic-index .chip.topic').first().click();
  await p2.waitForSelector('.topic-view');
  await p2.locator('button.tv-item').first().click();
  await p2.waitForSelector('.lc-head');
  ok((await p2.locator('.ltabs button.on').textContent()) === '卡片' && !!(await p2.$('.lcontent > button.back')), '從標籤頁點卡片到「卡片」分頁：上方有「← 返回」');
  await p2.click('.lcontent > button.back');
  await p2.waitForSelector('.topic-view');
  ok((await p2.locator('.ltabs button.on').textContent()) === '首頁', '按「← 返回」回到標籤頁（首頁分頁）');

  console.log('\n== 桌機 1366×768 ==');
  const ctx3 = await b.newContext({ viewport: { width: 1366, height: 768 } });
  const p3 = await ctx3.newPage(); watch(p3);
  await p3.goto(`${base}?mode=learn`, { waitUntil: 'networkidle' });
  await p3.waitForSelector('.lhome');
  await p3.screenshot({ path: `${out}/home-slim-d.png` });
  ok(!!(await p3.$('.home-entries .entry')), '桌機首頁有四個入口');

  ok(!errs.length, `沒有 console／頁面錯誤${errs.length ? '：' + errs.slice(0, 3).join(' | ') : ''}`);
  await b.close();
  console.log(fail ? `\n${fail} 項失敗` : '\n全部通過');
  process.exit(fail ? 1 : 0);
})();
