// node story-read.cjs baseUrl [截圖資料夾] → 故事閱讀頁（docs/stories.md）：
// 每條故事線都有故事、入口、閱讀頁（進度、目錄、字級、出處、打開卡片再回來接著讀、讀完打勾、下一個故事），研究／學習、桌機／手機都測
const { chromium } = require('playwright');
const fs = require('fs');
(async () => {
  const base = process.argv[2];
  const out = process.argv[3] || 'docs/screenshots/story-read';
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
  const lines = ix.storylines;

  // ---- 資料 ----
  const none = lines.filter((s) => !s.read);
  ok(!none.length, `每條故事線都有故事（${lines.length} 條）${none.length ? '；缺：' + none.map((s) => s.id).join(' ') : ''}`);
  const docs = [];
  for (const s of lines.filter((x) => x.read)) docs.push(await (await fetch(`${base}data/stories/${s.id}.json`)).json());
  ok(docs.every((d) => d.chars >= 1500 && d.chars <= 4500 && d.minutes >= 5 && d.minutes <= 15), `每篇 1,500–4,500 字、5–15 分鐘（${docs.map((d) => d.minutes).join('、')} 分鐘）`);
  ok(docs.every((d) => d.sections.every((sec) => sec.blocks.every((x) => /\[\^\d+\]/.test(x.text)))), '每一段都有出處');
  ok(docs.every((d) => { const want = lines.find((s) => s.id === d.id).stops.map((x) => x.id); const got = d.sections.flatMap((x) => x.cards); return want.every((id) => got.includes(id)); }), '每篇故事都講到故事線的每一站');
  ok(docs.every((d) => d.remember.length >= 2 && d.think.length >= 2 && d.hook), '每篇都有引子、「記住這幾件事」、「想一想」');
  ok(docs.every((d) => !/李彔|哈拉瑞/.test(JSON.stringify(d.sections))), '故事裡不寫思想家解讀');

  const pick = lines.find((s) => s.id === 'story-qin-han' && s.read) || lines.find((s) => s.read);
  if (!pick) { console.log('沒有任何故事，無法測畫面'); process.exit(1); }
  const doc = docs.find((d) => d.id === pick.id);

  for (const [mode, vw, vh, tag] of [['research', 1280, 800, 'research-1280'], ['learn', 1280, 800, 'learn-1280'], ['learn', 390, 800, 'learn-390'], ['research', 390, 800, 'research-390']]) {
    const ctx = await b.newContext({ viewport: { width: vw, height: vh }, deviceScaleFactor: 2 });
    const p = await ctx.newPage(); watch(p);
    await p.goto(`${base}?mode=${mode}&story=${pick.id}`);
    await p.waitForSelector('.sv-read-btn');
    ok((await p.textContent('.sv-read-btn')).includes(`約 ${pick.read.minutes} 分鐘`), `[${tag}] 故事線頁有「讀故事（約 ${pick.read.minutes} 分鐘）」`);
    ok((await p.textContent('.sv-hook')).trim() === pick.read.hook, `[${tag}] 入口顯示引子`);
    await p.screenshot({ path: `${out}/entry-${tag}.png` });
    await p.click('.sv-read-btn');
    await p.waitForSelector('.sr-sec');
    ok(new URL(p.url()).searchParams.get('read') === '1', `[${tag}] 網址帶 read=1`);
    ok((await p.locator('.sr-sec').count()) === doc.sections.length, `[${tag}] 閱讀頁有 ${doc.sections.length} 節`);
    ok((await p.locator('.sr-stop').count()) === doc.sections.reduce((n, s) => n + s.cards.length, 0), `[${tag}] 每節標出對應的站`);
    ok((await p.locator('.sr-cite a').count()) > 10, `[${tag}] 內文有出處小數字`);
    const m = await p.evaluate(() => { const el = document.querySelector('.sr-page'); const pp = el.querySelector('.sr-sec p'); const cs = getComputedStyle(pp); return { fs: parseFloat(cs.fontSize), lh: parseFloat(cs.lineHeight), w: pp.getBoundingClientRect().width, over: document.querySelector('.sr-overlay').scrollWidth > window.innerWidth }; });
    ok(m.fs >= 17 && m.lh / m.fs >= 1.8 && m.w / m.fs <= 38 && !m.over, `[${tag}] 字 ${m.fs}px、行距 ${(m.lh / m.fs).toFixed(2)}、每行約 ${Math.round(m.w / m.fs)} 字、沒有橫向捲動`);
    await p.waitForTimeout(300);
    await p.screenshot({ path: `${out}/reader-top-${tag}.png` });
    // 字級
    await p.click('button[aria-label="字大一點"]');
    const fs2 = await p.evaluate(() => parseFloat(getComputedStyle(document.querySelector('.sr-sec p')).fontSize));
    ok(fs2 > m.fs, `[${tag}] 字級可放大（${m.fs} → ${fs2}px）`);
    await p.click('button[aria-label="字小一點"]');
    // 出處開關
    await p.click('.sr-tool[aria-pressed]');
    ok(!(await p.locator('.sr-cite').first().isVisible()), `[${tag}] 可以隱藏出處`);
    await p.click('.sr-tool[aria-pressed]');
    // 目錄跳節
    await p.click('.sr-tool[aria-expanded]');
    await p.locator('.sr-toc button').nth(2).click();
    await p.waitForTimeout(900);
    ok(/第 3／/.test(await p.textContent('.sr-bar-meta')), `[${tag}] 目錄跳到第 3 節，上方顯示「${(await p.textContent('.sr-bar-meta')).trim()}」`);
    const prog = Number(await p.getAttribute('.sr-progress', 'aria-valuenow'));
    ok(prog > 5 && prog < 95, `[${tag}] 進度條跟著動（${prog}%）`);
    await p.screenshot({ path: `${out}/reader-mid-${tag}.png` });
    // 打開卡片再回來：接著讀
    const stop = p.locator('.sr-sec').nth(2).locator('button.sr-stop').first();
    if (await stop.count()) {
      await stop.click();
      await p.waitForSelector('.sr-overlay', { state: 'detached' });
      ok(!new URL(p.url()).searchParams.get('read'), `[${tag}] 從故事打開卡片，閱讀頁關閉`);
      await p.goBack().catch(() => {});
      await p.goto(`${base}?mode=${mode}&story=${pick.id}`);
      await p.waitForSelector('.sv-read-btn');
      ok((await p.textContent('.sv-read-btn')).includes('接著讀'), `[${tag}] 回到故事線，按鈕變成「接著讀故事」`);
      await p.click('.sv-read-btn');
      await p.waitForSelector('.sr-resumed');
      ok(await p.evaluate(() => document.querySelector('.sr-overlay').scrollTop > 300), `[${tag}] 回到上次讀到的地方`);
    }
    // 讀到最後
    await p.evaluate(() => { const el = document.querySelector('.sr-overlay'); el.scrollTop = el.scrollHeight; });
    await p.waitForTimeout(400);
    ok((await p.textContent('.sr-bar-meta')).includes('讀完了'), `[${tag}] 讀到底顯示「讀完了」`);
    ok((await p.locator('.sr-box.remember li').count()) === doc.remember.length && (await p.locator('.sr-box.think li').count()) === doc.think.length, `[${tag}] 結尾有「記住這幾件事」「想一想」`);
    await p.locator('.sr-box.remember').scrollIntoViewIfNeeded();
    await p.screenshot({ path: `${out}/reader-end-${tag}.png` });
    await p.click('.sr-sources summary');
    ok((await p.locator('.sr-sources li a').count()) === doc.sources.length, `[${tag}] 文末列出 ${doc.sources.length} 筆來源`);
    // 下一個故事
    const nextBtn = p.locator('.sr-act:not(.primary)');
    if (await nextBtn.count()) {
      await nextBtn.click();
      await p.waitForFunction((id) => new URL(location.href).searchParams.get('story') !== id && document.querySelector('.sr-sec'), pick.id);
      ok(new URL(p.url()).searchParams.get('read') === '1', `[${tag}] 「下一個故事」直接進到下一篇的閱讀頁`);
    }
    // Esc 關閉
    await p.keyboard.press('Escape');
    await p.waitForSelector('.sr-overlay', { state: 'detached' });
    ok(!new URL(p.url()).searchParams.get('read'), `[${tag}] Esc 關閉閱讀頁，網址拿掉 read`);
    // 清單打勾
    await p.goto(`${base}?mode=${mode}${mode === 'learn' ? '&view=stories' : ''}`);
    if (mode === 'research') { if (vw < 700) await p.getByRole('button', { name: /故事／主題|故事/ }).first().click().catch(() => {}); else await p.getByRole('button', { name: '故事線' }).first().click(); }
    await p.waitForSelector('.story-index .si-item');
    ok((await p.locator('.story-index .sr-badge').count()) === lines.filter((s) => s.read).length, `[${tag}] 故事線清單每條都標閱讀時間`);
    ok((await p.locator('.story-index .sr-badge.done').count()) >= 1, `[${tag}] 讀完的故事在清單上打勾`);
    await p.screenshot({ path: `${out}/index-${tag}.png` });
    // 直接用網址開
    await p.goto(`${base}?mode=${mode}&story=${pick.id}&read=1`);
    await p.waitForSelector('.sr-sec');
    ok(new URL(p.url()).searchParams.get('read') === '1', `[${tag}] 網址 ?story=…&read=1 直接打開閱讀頁`);
    await ctx.close();
  }
  ok(!errs.length, `沒有 console 錯誤${errs.length ? '：' + errs.slice(0, 3).join(' | ') : ''}`);
  await b.close();
  console.log(fail ? `\n${fail} 項失敗` : '\n全部通過');
  process.exit(fail ? 1 : 0);
})();
