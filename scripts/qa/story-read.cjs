// node story-read.cjs baseUrl [截圖資料夾] → 故事閱讀頁（docs/stories.md）：
// 每條故事線都有故事、入口、閱讀頁（預設下拉＋右邊大標欄、可改翻頁、一頁字數、進度、目錄、字級、出處、打開卡片再回來接著讀、考考自己、讀完打勾、下一個故事），研究／學習、桌機／手機都測
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
  ok(docs.every((d) => d.chars >= 1500 && d.chars <= 7500 && d.minutes >= 5 && d.minutes <= 25), `每篇 1,500–7,500 字、5–25 分鐘（${docs.map((d) => d.minutes).join('、')} 分鐘）`);
  ok(docs.every((d) => d.sections.every((sec) => sec.blocks.every((x) => x.kind === 'key' || /\[\^\d+\]/.test(x.text)))), '每一段都有出處');
  ok(docs.every((d) => d.recall && d.recall.length >= 3 && d.sections.filter((x) => x.cards.length).every((x) => x.blocks.some((k) => k.kind === 'key'))), '每篇都有「考考自己」，每個有站的小節都有一句「記住」');
  const avgPara = docs.map((d) => { const ps = d.sections.flatMap((x) => x.blocks.filter((k) => k.kind === 'p')); return Math.round(ps.reduce((n, x) => n + x.text.replace(/\[\^\d+\]|\*\*/g, '').length, 0) / ps.length); });
  ok(avgPara.every((n) => n >= 100), `段落不零碎：每篇平均一段 ${Math.min(...avgPara)}–${Math.max(...avgPara)} 字`);
  ok(docs.every((d) => { const want = lines.find((s) => s.id === d.id).stops.map((x) => x.id); const got = d.sections.flatMap((x) => x.cards); return want.every((id) => got.includes(id)); }), '每篇故事都講到故事線的每一站');
  ok(docs.every((d) => d.remember.length >= 2 && d.think.length >= 2 && d.hook), '每篇都有引子、「記住這幾件事」、「想一想」');
  ok(docs.every((d) => !/李彔|哈拉瑞/.test(JSON.stringify(d.sections))), '故事裡不寫思想家解讀');

  const pick = lines.find((s) => s.id === 'story-qin-han' && s.read) || lines.find((s) => s.read);
  if (!pick) { console.log('沒有任何故事，無法測畫面'); process.exit(1); }
  const doc = docs.find((d) => d.id === pick.id);

  for (const [mode, vw, vh, tag] of [['research', 1280, 800, 'research-1280'], ['learn', 1280, 800, 'learn-1280'], ['learn', 390, 800, 'learn-390'], ['research', 390, 800, 'research-390']]) {
    const ctx = await b.newContext({ viewport: { width: vw, height: vh }, deviceScaleFactor: 2, hasTouch: vw < 700 });
    const p = await ctx.newPage(); watch(p);
    await p.goto(`${base}?mode=${mode}&story=${pick.id}`);
    await p.waitForSelector('.sv-read-btn');
    ok((await p.textContent('.sv-read-btn')).includes(`約 ${pick.read.minutes} 分鐘`), `[${tag}] 故事線頁有「讀故事（約 ${pick.read.minutes} 分鐘）」`);
    ok((await p.textContent('.sv-hook')).trim() === pick.read.hook, `[${tag}] 入口顯示引子`);
    await p.screenshot({ path: `${out}/entry-${tag}.png` });
    await p.click('.sv-read-btn');
    await p.waitForSelector('.sr-sec');
    ok(new URL(p.url()).searchParams.get('read') === '1', `[${tag}] 網址帶 read=1`);
    await p.goBack(); await p.waitForSelector('.sr-overlay', { state: 'detached' });
    ok(new URL(p.url()).searchParams.get('story') === pick.id && !new URL(p.url()).searchParams.get('read') && await p.locator('.sv-read-btn').count() === 1, `[${tag}] 瀏覽器「上一頁」是關閉閱讀頁，仍留在故事線頁`);
    await p.click('.sv-read-btn'); await p.waitForSelector('.sr-sec');
    ok(await p.locator('.sr-overlay.sr-scroll').count() === 1 && !(await p.locator('.sr-pager').count()), `[${tag}] 預設是下拉模式，沒有翻頁列`);
    await p.keyboard.press(' '); await p.waitForTimeout(500);
    ok(await p.locator('.sr-overlay').count() === 1 && await p.evaluate(() => document.querySelector('.sr-view').scrollTop > 0), `[${tag}] 一打開就按空白鍵是往下捲，不會關掉`);
    await p.evaluate(() => { document.querySelector('.sr-view').scrollTop = 0; }); await p.waitForTimeout(300);
    ok((await p.locator('.sr-sec').count()) === doc.sections.length, `[${tag}] 閱讀頁有 ${doc.sections.length} 節`);
    ok((await p.locator('.sr-stop').count()) === doc.sections.reduce((n, s) => n + s.cards.length, 0), `[${tag}] 每節標出對應的站`);
    ok((await p.locator('.sr-cite a').count()) > 10, `[${tag}] 內文有出處小數字`);
    ok((await p.locator('.sr-route li').count()) === pick.stops.length, `[${tag}] 開頭列出會走過的 ${pick.stops.length} 站`);
    const visibleChars = () => p.evaluate(() => { const v = document.querySelector('.sr-view').getBoundingClientRect(); let c = 0; const w = document.createTreeWalker(document.querySelector('.sr-page'), NodeFilter.SHOW_TEXT); const r = document.createRange(); while (w.nextNode()) { const t = w.currentNode; for (let i = 0; i < t.length; i++) { r.setStart(t, i); r.setEnd(t, i + 1); const q = r.getBoundingClientRect(); if (q.width && q.left >= v.left - 1 && q.right <= v.right + 1 && q.top >= v.top - 1 && q.bottom <= v.bottom + 1) c++; } } return c; });
    const openView = async () => { if (!(await p.locator('.sr-view-menu').count())) await p.click('.sr-tool[aria-controls="sr-view-menu"]'); };
    // ---- 下拉模式（預設） ----
    const wide = vw >= 1000;
    const sideN = await p.locator('.sr-side li').count();
    if (wide) ok(await p.locator('.sr-side').isVisible() && sideN === doc.sections.length + 1, `[${tag}] 右邊有大標欄，${sideN} 項（${doc.sections.length} 節＋考考自己）`);
    else ok(!(await p.locator('.sr-side').first().isVisible().catch(() => false)), `[${tag}] 手機沒有大標欄`);
    if (wide) ok(!(await p.locator('.sr-tool[aria-controls="sr-toc"]').isVisible()), `[${tag}] 有大標欄時隱藏「目錄」按鈕`);
    const sm = await p.evaluate(() => { const pp = document.querySelector('.sr-sec > p:not(.sr-key)'), cs = getComputedStyle(pp), st = getComputedStyle(document.querySelector('.sr-stop')), vv = document.querySelector('.sr-view'); return { fs: parseFloat(cs.fontSize), lh: parseFloat(cs.lineHeight), w: pp.getBoundingClientRect().width, stop: parseFloat(st.fontSize), over: document.documentElement.scrollWidth > window.innerWidth || vv.scrollWidth > vv.clientWidth }; });
    ok(sm.fs >= 16 && sm.lh / sm.fs >= 1.65 && sm.lh / sm.fs <= 1.85 && sm.w / sm.fs <= 42.5 && !sm.over, `[${tag}] 下拉：字 ${sm.fs}px、行距 ${(sm.lh / sm.fs).toFixed(2)}、每行約 ${Math.round(sm.w / sm.fs)} 字、沒有橫向捲動`);
    if (wide) ok(sm.stop >= 14, `[${tag}] 站卡片字 ${sm.stop.toFixed(1)}px（≥14）`);
    await p.waitForTimeout(300);
    await p.screenshot({ path: `${out}/reader-scroll-top-${tag}.png` });
    await p.evaluate(() => { const v = document.querySelector('.sr-view'); v.scrollTop = v.querySelectorAll('.sr-sec')[1].querySelector(':scope > p').getBoundingClientRect().top - v.getBoundingClientRect().top + v.scrollTop - 10; });
    await p.waitForTimeout(400);
    const sChars = await visibleChars();
    ok(sChars >= (wide ? 700 : 330), `[${tag}] 下拉一個畫面看得到 ${sChars} 個字（舊版同尺寸約 ${wide ? 550 : 300} 字）`);
    // 點大標欄（手機用目錄）跳到第 3 節
    if (wide) await p.locator('.sr-side li button').nth(2).click();
    else { await p.click('.sr-tool[aria-controls="sr-toc"]'); await p.locator('.sr-toc li button').nth(2).click(); }
    await p.waitForTimeout(900);
    ok(/第 3／/.test(await p.textContent('.sr-bar-meta')), `[${tag}] 跳到第 3 節，上方顯示「${(await p.textContent('.sr-bar-meta')).trim()}」`);
    ok(await p.evaluate(() => { const v = document.querySelector('.sr-view').getBoundingClientRect(), h = document.querySelectorAll('.sr-sec h2')[2].getBoundingClientRect(); return h.top >= v.top - 1 && h.bottom <= v.bottom + 1; }), `[${tag}] 第 3 節的標題在畫面上`);
    if (wide) ok(await p.locator('.sr-side li button').nth(2).getAttribute('aria-current') === 'true' && await p.locator('.sr-side [aria-current]').count() === 1, `[${tag}] 大標欄第 3 項高亮（aria-current）`);
    await p.screenshot({ path: `${out}/reader-scroll-mid-${tag}.png` });
    await p.evaluate(() => { const el = document.querySelector('.sr-view'); el.scrollTop = el.scrollHeight; });
    await p.waitForTimeout(500);
    ok((await p.textContent('.sr-bar-meta')).includes('讀完了'), `[${tag}] 下拉讀到底顯示「讀完了」`);
    await p.evaluate(() => { document.querySelector('.sr-view').scrollTop = 0; }); await p.waitForTimeout(500);
    // ---- 改成翻頁 ----
    await openView();
    await p.getByRole('button', { name: '翻頁', exact: true }).click();
    await p.keyboard.press('Escape'); await p.waitForTimeout(500);
    ok(await p.locator('.sr-overlay.sr-paged').count() === 1 && await p.locator('.sr-pager').isVisible() && !(await p.locator('.sr-side').count()), `[${tag}] 從「Aa 顯示」切到翻頁：有翻頁列、沒有大標欄`);
    await p.reload(); await p.waitForSelector('.sr-sec');
    ok(await p.locator('.sr-overlay.sr-paged').count() === 1, `[${tag}] 記住選了翻頁（重新整理後仍是翻頁）`);
    await p.waitForTimeout(500);
    await p.keyboard.press(' '); await p.waitForTimeout(450);
    ok(await p.locator('.sr-overlay').count() === 1 && /第 2／/.test(await p.textContent('.sr-pageno')), `[${tag}] 翻頁模式按空白鍵是翻下一頁，不會關掉`);
    await p.keyboard.press('ArrowLeft'); await p.waitForTimeout(450);
    // ---- 翻頁模式：一個畫面要有夠多字，不必一直滑 ----
    const pageInfo = async () => { const t = await p.textContent('.sr-pageno'); const mm = t.match(/第 (\d+)／(\d+) 頁/); return { page: +mm[1], pages: +mm[2] }; };
    const m = await p.evaluate(() => { const pp = document.querySelector('.sr-sec > p:not(.sr-key)'); const cs = getComputedStyle(pp); return { fs: parseFloat(cs.fontSize), lh: parseFloat(cs.lineHeight), w: pp.getBoundingClientRect().width, over: document.documentElement.scrollWidth > window.innerWidth }; });
    ok(m.fs >= 16 && m.lh / m.fs >= 1.6 && m.lh / m.fs <= 1.85 && m.w / m.fs <= 38 && !m.over, `[${tag}] 字 ${m.fs}px、行距 ${(m.lh / m.fs).toFixed(2)}、每行約 ${Math.round(m.w / m.fs)} 字、沒有橫向捲動`);
    await p.waitForTimeout(300);
    await p.screenshot({ path: `${out}/reader-top-${tag}.png` });
    const p1 = await pageInfo();
    ok(p1.page === 1 && p1.pages >= 3, `[${tag}] 分成 ${p1.pages} 頁`);
    await p.keyboard.press('ArrowRight'); await p.waitForTimeout(450);
    ok((await pageInfo()).page === 2, `[${tag}] 按 → 翻到第 2 頁`);
    const chars = await visibleChars();
    ok(chars >= (vw >= 900 ? 800 : 330), `[${tag}] 一頁看得到 ${chars} 個字（舊版同尺寸約 ${vw >= 900 ? 480 : 300} 字）`);
    await p.screenshot({ path: `${out}/reader-page2-${tag}.png` });
    await p.click('.sr-turn.next'); await p.waitForTimeout(450);
    ok((await pageInfo()).page === 3, `[${tag}] 點「下一頁」翻到第 3 頁`);
    await p.keyboard.press('ArrowLeft'); await p.keyboard.press('ArrowLeft'); await p.waitForTimeout(450);
    ok((await pageInfo()).page === 1, `[${tag}] 按 ← 翻回第 1 頁`);
    if (vw < 700) {
      await p.touchscreen.tap(vw * 0.85, vh / 2); await p.waitForTimeout(450);
      ok((await pageInfo()).page === 2, `[${tag}] 手機點畫面右側翻下一頁`);
      await p.touchscreen.tap(vw * 0.1, vh * 0.75); await p.waitForTimeout(450);
      ok((await pageInfo()).page === 1, `[${tag}] 手機點畫面左側翻上一頁`);
    }
    await p.mouse.move(vw / 2, vh / 2); await p.mouse.wheel(0, 120); await p.waitForTimeout(500);
    ok((await pageInfo()).page === 2, `[${tag}] 滾滑鼠翻頁`);
    ok(await p.evaluate(() => { const v = document.querySelector('.sr-view').getBoundingClientRect(); return [...document.querySelectorAll('.sr-page [data-b]')].every((el) => [...el.getClientRects()].every((r) => r.right <= v.left + 1 || r.left >= v.right - 1 || (r.left >= v.left - 1 && r.right <= v.right + 1))); }), `[${tag}] 隔壁頁的字不會從邊緣露出來`);
    // 顯示設定：字級、出處、捲動
    await openView();
    await p.click('button[aria-label="字大一點"]');
    const fs2 = await p.evaluate(() => parseFloat(getComputedStyle(document.querySelector('.sr-sec > p')).fontSize));
    ok(fs2 > m.fs, `[${tag}] 字級可放大（${m.fs} → ${fs2}px），頁數重排成 ${(await pageInfo()).pages} 頁`);
    await p.click('button[aria-label="字小一點"]');
    await p.click('button[aria-label="隱藏出處的小數字"]');
    ok(await p.evaluate(() => getComputedStyle(document.querySelector('.sr-cite')).display === 'none'), `[${tag}] 可以隱藏出處`);
    await p.click('button[aria-label="顯示出處的小數字"]');
    await p.keyboard.press('Escape');
    ok(await p.locator('.sr-overlay').count() === 1 && !(await p.locator('.sr-view-menu').count()), `[${tag}] Esc 先關選單，不會關掉閱讀頁`);
    // 目錄跳節
    await p.click('.sr-tool[aria-controls="sr-toc"]');
    await p.locator('.sr-toc li button').nth(2).click();
    await p.waitForTimeout(600);
    ok(/第 3／/.test(await p.textContent('.sr-bar-meta')), `[${tag}] 目錄跳到第 3 節，上方顯示「${(await p.textContent('.sr-bar-meta')).trim()}」`);
    ok(await p.evaluate(() => { const v = document.querySelector('.sr-view').getBoundingClientRect(), h = document.querySelectorAll('.sr-sec h2')[2].getBoundingClientRect(); return h.left >= v.left - 1 && h.right <= v.right + 1; }), `[${tag}] 第 3 節的標題在畫面上`);
    const prog = Number(await p.getAttribute('.sr-progress', 'aria-valuenow'));
    ok(prog > 5 && prog < 95, `[${tag}] 進度條跟著動（${prog}%）`);
    await p.screenshot({ path: `${out}/reader-mid-${tag}.png` });
    const midPage = (await pageInfo()).page;
    // 打開卡片再回來：接著讀
    const stop = p.locator('.sr-sec').nth(2).locator('button.sr-stop').first();
    if (await stop.count()) {
      await stop.click();
      await p.waitForSelector('.sr-overlay', { state: 'detached' });
      ok(!new URL(p.url()).searchParams.get('read'), `[${tag}] 從故事打開卡片，閱讀頁關閉`);
      await p.goto(`${base}?mode=${mode}&story=${pick.id}`);
      await p.waitForSelector('.sv-read-btn');
      ok((await p.textContent('.sv-read-btn')).includes('接著讀'), `[${tag}] 回到故事線，按鈕變成「接著讀故事」`);
      await p.click('.sv-read-btn');
      await p.waitForSelector('.sr-sec'); await p.waitForTimeout(500);
      ok((await pageInfo()).page === midPage, `[${tag}] 回到上次讀到的那一頁（第 ${midPage} 頁）`);
    }
    // 換回下拉：留在同一節；再換成翻頁
    await openView();
    await p.getByRole('button', { name: '下拉', exact: true }).click();
    await p.waitForTimeout(500);
    ok(await p.locator('.sr-overlay.sr-scroll').count() === 1 && !(await p.locator('.sr-pager').count()) && await p.evaluate(() => document.querySelector('.sr-view').scrollTop > 200), `[${tag}] 可改回下拉，而且留在原本那一段`);
    ok(/第 3／/.test(await p.textContent('.sr-bar-meta')), `[${tag}] 下拉模式仍在第 3 節`);
    await openView();
    await p.getByRole('button', { name: '翻頁', exact: true }).click();
    await p.keyboard.press('Escape');
    // 讀到最後
    await p.keyboard.press('End'); await p.waitForTimeout(500);
    ok((await p.textContent('.sr-bar-meta')).includes('讀完了'), `[${tag}] 翻到最後顯示「讀完了」`);
    await p.click('.sr-tool[aria-controls="sr-toc"]'); await p.click('.sr-toc-end'); await p.waitForTimeout(500);
    ok((await p.locator('.sr-box.remember li').count()) === doc.remember.length && (await p.locator('.sr-box.think li').count()) === doc.think.length, `[${tag}] 結尾有「記住這幾件事」「想一想」`);
    if (doc.recall && doc.recall.length) {
      ok((await p.locator('.sr-box.recall li').count()) === doc.recall.length && !(await p.locator('.sr-recall-a').count()), `[${tag}] 「考考自己」${doc.recall.length} 題，答案先蓋住`);
      await p.locator('.sr-recall-btn').first().click();
      ok((await p.textContent('.sr-recall-a')).trim() === doc.recall[0].a, `[${tag}] 點了才看到答案`);
    }
    await p.screenshot({ path: `${out}/reader-end-${tag}.png` });
    // 別頁的按鈕：焦點移過去時會自動翻到那一頁
    const reach = async (sel) => { await p.locator(sel).first().focus(); await p.waitForTimeout(450); };
    await reach('.sr-sources-btn');
    await p.click('.sr-sources-btn'); await p.waitForTimeout(300);
    const nsrc = await p.locator('.sr-sources li a').count();
    ok(nsrc === doc.sources.length, `[${tag}] 文末列出 ${doc.sources.length} 筆來源（畫面上 ${nsrc} 筆）`);
    await reach('.sr-act:not(.primary)');
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
