// node links.cjs baseUrl → ① 沒有 mode 的分享連結進學習模式 ② 壞 id 顯示「找不到」＋回首頁 ③ 學習模式搜尋（問句、亂碼、推薦課、桌機「試試：」可點）④ 斷網不整頁換成錯誤頁
const { chromium } = require('playwright');
(async () => {
  const base = process.argv[2];
  const b = await chromium.launch();
  let fail = 0;
  const ok = (cond, msg) => { console.log(`${cond ? '✓' : '✗'} ${msg}`); if (!cond) fail++; };
  const ix = await require('./load-index.cjs')(base);
  const unit = ix.units[0], dive = ix.dives[0], story = ix.storylines.find((s) => s.read), topic = ix.topicLayers[0].topics[0].name, hist = ix.histories.find((h) => h.id === 'taiwan') || ix.histories[0];
  const fresh = async (vp = { width: 390, height: 844 }) => { const ctx = await b.newContext({ viewport: vp }); const p = await ctx.newPage(); return { ctx, p }; };

  console.log('\n== ① 沒有 mode 的連結（全新瀏覽器）==');
  const T = (u) => u.title;
  for (const [qs, sel, label] of [
    [`?unit=${unit.id}`, '.unit-intro, .unit', '單元'], [`?dive=${dive.id}`, '.dive-view', '專題'], [`?story=${story.id}`, '.story-view', '故事'], [`?story=${story.id}&read=1`, '.sr-overlay', '故事閱讀頁'],
    [`?topic=${encodeURIComponent(topic)}`, '.topic-view', '主題'], [`?history=${hist.id}`, '.hpage', 'XX史'],
  ]) {
    const { ctx, p } = await fresh();
    await p.goto(base + qs, { waitUntil: 'networkidle' });
    await p.waitForSelector(sel, { timeout: 15000 }).catch(() => {});
    const r = await p.evaluate((sel) => ({ learn: !!document.querySelector('.learn'), has: !!document.querySelector(sel), mode: new URLSearchParams(location.search).get('mode') }), sel);
    ok(r.learn && r.has && r.mode === 'learn', `${label}（${qs.slice(0, 40)}）→ 學習模式並顯示${label}`);
    await ctx.close();
  }
  for (const qs of ['?card=war-nagashino', '?year=100', '?chain=chain-silk', '?q=羅馬', '?peoples=Taiwan']) {
    const { ctx, p } = await fresh();
    await p.goto(base + qs, { waitUntil: 'networkidle' });
    await p.waitForTimeout(500);
    ok(await p.evaluate(() => !!document.querySelector('.app') && !document.querySelector('.learn')), `${qs} 沒有 mode → 維持研究模式`);
    await ctx.close();
  }
  { const { ctx, p } = await fresh(); await p.goto(`${base}?mode=research&dive=${dive.id}`, { waitUntil: 'networkidle' }); await p.waitForTimeout(500);
    ok(await p.evaluate(() => !!document.querySelector('.app') && !document.querySelector('.learn')), '明確 mode=research 照舊進研究模式'); await ctx.close(); }

  console.log('\n== ② 壞 id ==');
  for (const [qs, what] of [['?mode=learn&unit=nope-unit', '課'], ['?unit=nope-unit', '課'], ['?mode=learn&card=nope-card', '卡片'], ['?mode=learn&story=nope-story&read=1', '故事'], ['?story=nope-story', '故事'], ['?dive=nope-dive', '深入專題'], ['?mode=research&card=nope-card', '卡片'], ['?card=nope-card', '卡片'], ['?mode=research&dive=nope', '深入專題'], ['?mode=research&story=nope', '故事']]) {
    const { ctx, p } = await fresh();
    await p.goto(base + qs, { waitUntil: 'networkidle' });
    await p.waitForSelector('.notfound', { timeout: 8000 }).catch(() => {});
    const r = await p.evaluate(() => ({ txt: document.querySelector('.notfound')?.textContent ?? '', fail: /下載失敗/.test(document.body.textContent) }));
    ok(r.txt.includes(what === '課' ? '找不到這一課' : `找不到這個${what}`) && !r.fail && !!(await p.$('.notfound button')), `${qs} → 「找不到${what === '課' ? '這一課' : '這個' + what}」＋回首頁鈕，沒有「下載失敗」`);
    if (qs.includes('mode=learn&unit')) { await p.click('.notfound button'); await p.waitForSelector('.lhome'); ok(true, '按「回首頁」回到學習首頁'); }
    await ctx.close();
  }

  console.log('\n== ③ 學習模式搜尋 ==');
  for (const [label, vp] of [['手機', { width: 390, height: 844 }], ['桌機', { width: 1280, height: 900 }]]) {
    const { ctx, p } = await fresh(vp);
    await p.goto(`${base}?mode=learn`, { waitUntil: 'networkidle' });
    const box = p.locator('.lsearch-box input');
    const run = async (txt) => { await box.fill(''); await box.fill(txt); await p.waitForTimeout(1200); return p.evaluate(() => ({ results: [...document.querySelectorAll('.lsearch .lresult, .lsearch .mystery')].length, cards: [...document.querySelectorAll('.lsearch .lresult .nm')].map((x) => x.textContent), sug: !!([...document.querySelectorAll('.lsearch h3')].find((h) => h.textContent === '推薦課')), sugN: document.querySelectorAll('.lsearch .mystery').length })); };
    let r = await run('羅馬為什麼滅亡');
    ok(r.cards.length > 0 && r.cards.some((n) => n.includes('羅馬')), `[${label}]「羅馬為什麼滅亡」有結果：${r.cards.slice(0, 3).join('、')}`);
    r = await run('asdfgh');
    ok(r.cards.length === 0 && r.sug && r.sugN === 3, `[${label}]「asdfgh」沒有卡片結果，列出 3 個推薦課（卡 ${r.cards.length}、謎題 ${r.sugN}）`);
    await p.click('.lsearch .mystery');
    await p.waitForSelector('.unit-intro, .unit');
    ok(true, `[${label}] 推薦課點得開`);
    await p.goto(`${base}?mode=learn`, { waitUntil: 'networkidle' });
    r = await run('明朝為何滅亡'); ok(r.results > 0 || r.sug, `[${label}]「明朝為何滅亡」有結果或推薦`);
    r = await run('羅馬'); ok(r.cards.length > 0, `[${label}]「羅馬」仍有結果`);
    r = await run('napolen'); ok(r.cards.some((n) => n.includes('拿破崙')), `[${label}] 拼錯的 napolen 仍找得到拿破崙`);
    r = await run('蘇联'); ok(r.cards.some((n) => n.includes('蘇聯')), `[${label}] 簡體「蘇联」找得到蘇聯`);
    if (label === '桌機') {
      await box.fill(''); await p.waitForTimeout(300);
      const sug = await p.evaluate(() => [...document.querySelectorAll('.lsearch-box .suggest button')].map((x) => { const r = x.getBoundingClientRect(), h = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2); return { n: x.textContent.slice(0, 8), hit: r.width > 0 && (h === x || x.contains(h)) }; }));
      ok(sug.length === 3 && sug.every((x) => x.hit), `桌機搜尋框下「試試：」三個建議都點得到（${sug.map((x) => x.hit).join(',')}）`);
      await p.locator('.lsearch-box .suggest button').nth(2).click();
      await p.waitForSelector('.unit-intro, .unit');
      ok(true, '桌機點第三個「試試」建議可以開單元');
    }
    await ctx.close();
  }
  { // 研究模式搜尋不退步
    const { ctx, p } = await fresh({ width: 1280, height: 900 });
    await p.goto(`${base}?mode=research`, { waitUntil: 'networkidle' });
    await p.waitForSelector('input.search');
    for (const [txt, want] of [['napolen', '拿破崙'], ['蘇联', '蘇聯'], ['羅馬', '羅馬']]) {
      await p.fill('input.search', ''); await p.fill('input.search', txt); await p.waitForTimeout(1500);
      const t = await p.evaluate(() => document.querySelector('.panel')?.textContent ?? '');
      ok(t.includes(want), `研究模式搜尋「${txt}」找得到${want}`);
    }
    await ctx.close();
  }

  console.log('\n== ④ 斷網 ==');
  {
    const { ctx, p } = await fresh();
    await p.goto(`${base}?mode=learn`, { waitUntil: 'networkidle' });
    await p.evaluate(() => { window.__keep = 1; });
    await p.waitForTimeout(500);
    await p.locator('.entry', { hasText: '依地區與主題' }).click(); await p.waitForSelector('.htile'); // 清單頁的 chunk 先載好；斷網後點 XX史才會需要載入「史頁面」的 chunk
    await ctx.setOffline(true);
    await p.locator('.htile').filter({ hasText: hist.name }).first().click();
    await p.waitForTimeout(1500);
    let r = await p.evaluate(() => ({ keep: window.__keep === 1, ltop: !!document.querySelector('.ltop'), err: document.querySelector('.chunk-err')?.textContent ?? '' }));
    ok(r.keep && r.ltop && r.err.includes('現在沒有網路'), `斷網點 XX史：留在原畫面，顯示「現在沒有網路，這一塊還沒下載」（${r.err.slice(0, 20)}）`);
    await ctx.setOffline(false);
    await p.click('.chunk-err button');
    await p.waitForSelector('.hpage', { timeout: 10000 });
    ok(true, '恢復網路後按重試，XX史頁出現（瀏覽器記住了失敗的相依模組時，重試會整理頁面一次，網址不變）');
    await p.evaluate(() => { window.__keep = 1; });
    await p.locator('.hpage button.mystery').first().click();
    await p.waitForSelector('.unit-intro, .unit');
    if (await p.$('.unit-intro button.btn.primary')) await p.click('.unit-intro button.btn.primary');
    await ctx.setOffline(true);
    await p.click('.ltabs button:has-text("地圖")');
    await p.waitForTimeout(1500);
    r = await p.evaluate(() => ({ keep: window.__keep === 1, ltop: !!document.querySelector('.ltop'), err: document.querySelector('.chunk-err')?.textContent ?? '' }));
    ok(r.keep && r.ltop && r.err.includes('現在沒有網路'), `單元進行中斷網切到地圖：留在原畫面，顯示沒有網路與重試（${r.err.slice(0, 20)}）`);
    await p.click('.ltabs button:has-text("首頁")');
    await p.waitForTimeout(300);
    ok(await p.evaluate(() => !!document.querySelector('.unit')), '切回首頁分頁，單元還能用');
    await ctx.close();
  }
  await b.close();
  console.log(fail ? `\n${fail} 項失敗` : '\n全部通過');
  process.exit(fail ? 1 : 0);
})();
