// node story-dive.cjs baseUrl [截圖資料夾] → 故事線帶 dive（選填欄位）時，每站都能連回專題：
// 故事線頁頂端導覽行、最後一站後的終點站按鈕、故事閱讀頁結尾「到專題看全貌」、卡片頁上下站區塊的「進專題」；沒有 dive 的故事線完全不出現。研究／學習、桌機／手機、淺色／深色都測
const { chromium } = require('playwright');
const fs = require('fs');
(async () => {
  const base = process.argv[2];
  const out = process.argv[3] || 'docs/screenshots/story-dive';
  fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch();
  const errs = [];
  const watch = (p) => {
    p.on('pageerror', (e) => { if (!/appendChild/.test(String(e))) errs.push(String(e)); });
    p.on('console', (m) => { if (m.type() === 'error' && !/tile|ERR_TUNNEL|ERR_NAME|ERR_PROXY|favicon|AJAXError|Failed to fetch|openfreemap/.test(m.text())) errs.push(m.text()); });
  };
  let fail = 0;
  const ok = (cond, msg) => { console.log(`${cond ? '✓' : '✗'} ${msg}`); if (!cond) fail++; };
  const ix = await require('./load-index.cjs')(base);
  const withDive = ix.storylines.filter((s) => s.dive);
  const plain = ix.storylines.find((s) => !s.dive);
  ok(withDive.length >= 1, `至少一條故事線帶 dive（${withDive.map((s) => s.id).join('、')}）`);
  ok(withDive.every((s) => (ix.dives ?? []).some((d) => d.id === s.dive)), 'dive 都指到存在的專題');
  const s = withDive[0];
  const dive = ix.dives.find((d) => d.id === s.dive);
  const mid = s.stops[Math.floor(s.stops.length / 2)].id;
  const noOverflow = (p) => p.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1);
  const tall = (loc) => loc.evaluate((e) => e.getBoundingClientRect().height >= 43.5);

  for (const mode of ['research', 'learn']) for (const [vp, w, h] of [['desk', 1400, 900], ['phone', 390, 800]]) for (const theme of ['light', 'dark']) {
    const tag = `${mode}-${vp}-${theme}`;
    const ctx = await b.newContext({ viewport: { width: w, height: h }, colorScheme: theme, hasTouch: vp === 'phone', isMobile: vp === 'phone' });
    await ctx.addInitScript((t) => { try { localStorage.setItem('theme', t); localStorage.setItem('lh-theme', t); } catch {} }, theme);
    const p = await ctx.newPage(); watch(p);
    await p.goto(`${base}?mode=${mode}&story=${s.id}`);
    const top = p.locator('[data-testid=sv-dive-top]');
    await top.waitFor({ timeout: 15000 });
    ok((await top.innerText()).includes(`〈${dive.title}〉的導覽線`), `${tag}：頂端「這是〈${dive.title}〉的導覽線」`);
    ok(await tall(top.locator('button')), `${tag}：頂端「進專題」高度 ≥ 44px`);
    if (vp === 'phone') ok(await top.locator('button').evaluate((e) => e.getBoundingClientRect().width < 200), `${tag}：手機頂端「進專題」不滿版`);
    await p.screenshot({ path: `${out}/${tag}-top.png` });
    const term = p.locator('[data-testid=sv-terminus]');
    await term.scrollIntoViewIfNeeded();
    ok((await term.innerText()).includes(`走完了：到〈${dive.title}〉專題看全貌`), `${tag}：最後一站後的終點站按鈕`);
    ok(await tall(term.locator('button')), `${tag}：終點站按鈕高度 ≥ 44px`);
    ok(await noOverflow(p), `${tag}：沒有橫向捲動`);
    await p.screenshot({ path: `${out}/${tag}-terminus.png` });
    if (theme === 'light') {
      // 按了進專題（頂端與終點站各按一次）
      for (const [name, loc] of [['頂端', top.locator('button')], ['終點站', term.locator('button')]]) {
        await p.goto(`${base}?mode=${mode}&story=${s.id}`);
        await p.locator(name === '頂端' ? '[data-testid=sv-dive-top] button' : '[data-testid=sv-terminus] button').first().click();
        await p.waitForSelector('.dive-view h2', { timeout: 15000 });
        ok((await p.locator('.dive-view h2').first().innerText()).includes(dive.title) && new URL(p.url()).searchParams.get('dive') === s.dive && new URL(p.url()).searchParams.get('mode') === mode, `${tag}：按${name}進到專題 ${s.dive}，模式維持 ${mode}`);
      }
      await p.screenshot({ path: `${out}/${tag}-dive.png` });
    }
    // 卡片頁：同一框已有該專題的深入專題列就不重複「進專題」；否則是純文字連結
    {
      const inDive = new Set(dive.cards);
      const lone = s.stops.map((x) => x.id).find((id) => !inDive.has(id));
      await p.goto(`${base}?mode=${mode}&card=${mid}`);
      await p.waitForSelector('.path-nav');
      if (inDive.has(mid)) {
        ok(!(await p.locator('.path-nav .pn-dive-link').count()) && (await p.locator('.path-nav .pn-row.dive').count()) >= 1, `${tag}：卡片頁已有專題列，不再重複「進專題」`);
        await p.locator('.path-nav').scrollIntoViewIfNeeded();
        await p.screenshot({ path: `${out}/${tag}-card.png` });
      }
      if (lone) {
        await p.goto(`${base}?mode=${mode}&card=${lone}`);
        const link = p.locator('.path-nav .pn-dive-link').first();
        await link.waitFor({ timeout: 15000 });
        ok(await link.evaluate((e) => getComputedStyle(e).borderTopWidth === '0px'), `${tag}：卡片頁「進專題」是純文字連結`);
        ok(await tall(link) || vp === 'desk', `${tag}：卡片頁有「進專題」${vp === 'phone' ? '且 ≥ 44px' : ''}`);
        await link.scrollIntoViewIfNeeded();
        await p.screenshot({ path: `${out}/${tag}-card-lone.png` });
        if (theme === 'light') {
          await link.click();
          await p.waitForSelector('.dive-view h2', { timeout: 15000 });
          ok(new URL(p.url()).searchParams.get('dive') === s.dive, `${tag}：卡片頁「進專題」進到專題`);
        }
      } else console.log(`- ${tag}：本線每一站都在專題裡，略過純文字「進專題」`);
    }
    // 故事閱讀頁結尾
    if (s.read) {
      await p.goto(`${base}?mode=${mode}&story=${s.id}&read=1`);
      const btn = p.locator('.sr-act.dive');
      await btn.waitFor({ state: 'attached', timeout: 20000 });
      await btn.scrollIntoViewIfNeeded();
      ok((await btn.innerText()).includes('到專題看全貌'), `${tag}：閱讀頁結尾「到專題看全貌」`);
      ok(await tall(btn), `${tag}：閱讀頁按鈕高度 ≥ 44px`);
      await p.screenshot({ path: `${out}/${tag}-read-end.png` });
      if (theme === 'light') {
        await btn.click();
        await p.waitForSelector('.dive-view h2', { timeout: 15000 });
        ok(new URL(p.url()).searchParams.get('dive') === s.dive && !(await p.locator('.sr-overlay').count()), `${tag}：閱讀頁按鈕進專題並關掉閱讀頁`);
      }
    } else console.log(`- ${tag}：這條故事線還沒有故事全文，略過閱讀頁結尾`);
    await ctx.close();
  }

  // 沒有 dive 的故事線完全不變
  if (plain) {
    const p = await (await b.newContext({ viewport: { width: 1400, height: 900 } })).newPage(); watch(p);
    await p.goto(`${base}?mode=research&story=${plain.id}`);
    await p.waitForSelector('.story-view h2');
    ok(!(await p.locator('[data-testid=sv-dive-top], [data-testid=sv-terminus]').count()), `沒有 dive 的故事線（${plain.id}）頁面不出現導覽行與終點站`);
    await p.goto(`${base}?mode=research&card=${plain.stops[1].id}`);
    await p.waitForSelector('.path-nav');
    // 反向：不在任何帶 dive 的故事線上的卡，卡片頁不出現「進專題」；沒 dive 的故事閱讀頁結尾沒有 .sr-act.dive
    const onDiveLine = new Set(withDive.flatMap((x) => x.stops.map((st) => st.id)));
    const free = ix.storylines.flatMap((x) => x.dive ? [] : x.stops.map((st) => st.id)).find((id) => !onDiveLine.has(id));
    if (free) { await p.goto(`${base}?mode=research&card=${free}`); await p.waitForSelector('.path-nav'); ok(!(await p.locator('.pn-dive-link').count()), `卡 ${free} 不在帶 dive 的故事線上，卡片頁不出現「進專題」`); }
    const plainRead = ix.storylines.find((x) => !x.dive && x.read);
    if (plainRead) { await p.goto(`${base}?mode=research&story=${plainRead.id}&read=1`); await p.locator('.sr-act.primary').waitFor({ state: 'attached', timeout: 20000 }); ok(!(await p.locator('.sr-act.dive').count()), `沒有 dive 的故事（${plainRead.id}）閱讀頁結尾沒有「到專題看全貌」`); }
    await p.goto(`${base}?mode=research&card=${plain.stops[1].id}`); await p.waitForSelector('.path-nav');
    const bad = await p.locator('.path-nav .pn-row.story').evaluateAll((rows) => rows.length);
    ok(bad >= 1, '卡片頁照常顯示故事線列');
  }
  ok(!errs.length, `沒有 console 錯誤${errs.length ? '：' + errs.slice(0, 3).join(' | ') : ''}`);
  await b.close();
  console.log(fail ? `\n${fail} 項失敗` : '\n全部通過');
  process.exit(fail ? 1 : 0);
})();
