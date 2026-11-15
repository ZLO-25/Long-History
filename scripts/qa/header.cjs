// node header.cjs baseUrl → 學習模式頁首：進過 XX史、單元、故事閱讀頁再回來之後，每顆按鈕都點得到、不被拉長、搜尋框不蓋住內文
// 回歸：src/components/story-map.css 曾有 `.sm {height:100%}`，和全站小按鈕 class「btn sm」撞名，進過會載入那份 CSS 的頁面後頁首按鈕被拉成長條
// 手機 390×844、平板 820×1180 各跑一輪；每一步都檢查：① 頁首每個可見按鈕／輸入框 elementFromPoint 命中自己 ② 按鈕高度 < 60px ③ 頁首的東西都在頁首裡 ④ 搜尋框沒蓋到內文
const { chromium } = require('playwright');
(async () => {
  const base = process.argv[2];
  const b = await chromium.launch();
  let fail = 0;
  const ok = (cond, msg) => { console.log(`${cond ? '✓' : '✗'} ${msg}`); if (!cond) fail++; };
  const errs = [];

  async function check(p, tag) {
    await p.waitForTimeout(250);
    const r = await p.evaluate(() => {
      const out = { n: 0, covered: [], tall: [], outside: [], overlapMain: false };
      const top = document.querySelector('.ltop');
      const tr = top.getBoundingClientRect();
      const name = (e) => (e.getAttribute('aria-label') || e.textContent || e.className || e.tagName).trim().slice(0, 12);
      for (const e of top.querySelectorAll('button:not(.skip-link), a, input')) { // 「跳到主要內容」平常藏在畫面外，不算
        const r = e.getBoundingClientRect();
        if (!r.width || !r.height) continue;
        out.n++;
        const hit = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
        if (!(hit === e || e.contains(hit))) out.covered.push(name(e));
        if (e.tagName === 'BUTTON' && r.height >= 60) out.tall.push(`${name(e)} ${Math.round(r.height)}px`);
        if (r.bottom > tr.bottom + 1 || r.top < tr.top - 1) out.outside.push(name(e));
      }
      const inp = top.querySelector('.lsearch-box input').getBoundingClientRect();
      const mm = document.querySelector('.lm-main, .ld-main');
      if (mm) { const m = mm.getBoundingClientRect(); out.overlapMain = inp.bottom > m.top + 1 && inp.top < m.bottom; }
      return out;
    });
    ok(r.n >= 6, `[${tag}] 頁首有 ${r.n} 個可見控制項`);
    ok(!r.covered.length, `[${tag}] 每顆都點得到${r.covered.length ? '；被蓋住：' + r.covered.join('、') : ''}`);
    ok(!r.tall.length, `[${tag}] 按鈕高度都 < 60px${r.tall.length ? '；' + r.tall.join('、') : ''}`);
    ok(!r.outside.length, `[${tag}] 頁首的東西都在頁首裡${r.outside.length ? '；跑出去：' + r.outside.join('、') : ''}`);
    ok(!r.overlapMain, `[${tag}] 搜尋框沒蓋住內文`);
  }

  for (const [label, viewport] of [['手機 390×844', { width: 390, height: 844 }], ['平板 820×1180', { width: 820, height: 1180 }]]) {
    console.log(`\n== ${label} ==`);
    const ctx = await b.newContext({ viewport });
    const p = await ctx.newPage();
    p.on('pageerror', (e) => errs.push(String(e)));
    p.on('console', (m) => { if (m.type() === 'error' && !/tile|favicon|ERR_TUNNEL|ERR_NAME|ERR_PROXY|openfreemap|Failed to load resource/.test(m.text())) errs.push(m.text()); });
    await p.goto(`${base}?mode=learn`, { waitUntil: 'networkidle' });
    await p.waitForSelector('.ltop');
    await check(p, '首頁（歡迎框還開著）');
    const closeIntro = p.locator('.intro button.btn.primary');
    if (await closeIntro.count()) await closeIntro.click();
    await check(p, '關掉歡迎框');
    await p.locator('.entry', { hasText: '依地區與主題' }).click(); await p.waitForSelector('.htile');
    await p.locator('.htile').filter({ hasText: '臺灣史' }).first().click();
    await p.waitForSelector('.hpage');
    await check(p, '臺灣史頁');
    await p.locator('.hpage button.mystery').first().click();
    await p.waitForSelector('.unit-intro');
    await check(p, '單元封面');
    await p.click('.unit-intro button.btn.primary');
    await p.waitForSelector('.pdot');
    await check(p, '單元進行中');
    // 故事閱讀頁：進去再回來（會載入 story-map.css）
    await p.goto(`${base}?mode=learn&view=stories`, { waitUntil: 'networkidle' });
    await p.waitForSelector('.si-item');
    await check(p, '故事線清單');
    await p.locator('.si-item').first().click();
    await p.waitForSelector('.sv-read-btn');
    await p.click('.sv-read-btn');
    await p.waitForSelector('.sr-overlay');
    await p.waitForSelector('.sr-sheet .sm-land, .sr-side-map .sm-land, .sr-overlay', { timeout: 15000 });
    await p.waitForTimeout(800);
    await p.click('.sr-close');
    await p.waitForSelector('.sr-overlay', { state: 'detached' });
    await check(p, '關掉故事閱讀頁後');
    // 再進 XX史、單元（同一個分頁，story-map.css 已載入）
    await p.click('.brand');
    await p.waitForSelector('.lhome');
    await check(p, '回首頁');
    await p.locator('.entry', { hasText: '依地區與主題' }).click(); await p.waitForSelector('.htile');
    await p.locator('.htile').filter({ hasText: '臺灣史' }).first().click();
    await p.waitForSelector('.hpage');
    await check(p, '再進臺灣史頁');
    await p.locator('.hpage button.mystery').first().click();
    await p.waitForSelector('.unit');
    await check(p, '再進單元');
    if (viewport.width <= 768) {
      await p.click('.ltabs button:has-text("地圖")');
      await check(p, '切到地圖分頁');
    }
    await ctx.close();
  }
  ok(!errs.length, `沒有 console／頁面錯誤${errs.length ? '：' + errs.slice(0, 3).join(' | ') : ''}`);
  await b.close();
  console.log(fail ? `\n${fail} 項失敗` : '\n全部通過');
  process.exit(fail ? 1 : 0);
})();
