// node images.cjs baseUrl [截圖資料夾] → 卡片圖片點一下在網站內放大（燈箱，src/components/Images.tsx）：
// 桌機 1280×800、手機 iPhone 13；開啟／關閉（按鈕、背景、Esc）、焦點、網址不變、不開新分頁、圖放大且不超出畫面、Commons 連結、圖載不到時不能開
const { chromium, devices } = require('playwright');
const fs = require('fs');
(async () => {
  const base = process.argv[2];
  const out = process.argv[3] || 'docs/screenshots/images';
  fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch();
  let fail = 0;
  const ok = (cond, msg) => { console.log(`${cond ? '✓' : '✗'} ${msg}`); if (!cond) fail++; };
  // 測試用假圖（不依賴外網）：任何 upload.wikimedia 的圖都回一張 SVG；1600px 的大圖請求可另外擋掉測試退回原網址
  const svg = (w, h) => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><rect width="100%" height="100%" fill="#c9b79c"/><circle cx="${w / 2}" cy="${h / 2}" r="${h / 3}" fill="#6b4f2a"/></svg>`;
  const fake = (p, opts = {}) => p.route(/upload\.wikimedia/, (r) => {
    if (opts.abortBig && /\/1600px-/.test(r.request().url())) return r.abort();
    r.fulfill({ status: 200, contentType: 'image/svg+xml', body: svg(1600, 1060) });
  });
  const sizes = [['desktop-1280', { viewport: { width: 1280, height: 800 }, deviceScaleFactor: 1 }], ['iphone13', { ...devices['iPhone 13'], deviceScaleFactor: 1 }]];
  const url = `${base}?mode=learn&card=building-angkor-wat`;

  for (const [tag, cfg] of sizes) {
    const ctx = await b.newContext(cfg);
    const errs = [];
    const p = await ctx.newPage();
    ctx.on('page', () => errs.push('NEWTAB'));
    p.on('pageerror', (e) => errs.push(String(e)));
    await p.route(/openfreemap/, (r) => r.abort());
    await fake(p);
    await p.goto(url);
    const trig = p.locator('.card-img .img-trigger').first();
    await trig.waitFor();
    const vp = p.viewportSize();
    const inline = await trig.locator('img').boundingBox();
    ok(inline && inline.width > 50, `[${tag}] 卡片圖有 button 觸發器，title＝${await trig.getAttribute('title')}`);
    ok(await p.locator('.img-lb').count() === 0, `[${tag}] 一開始沒有燈箱`);
    const href0 = p.url();
    const pagesBefore = ctx.pages().length;
    await trig.click();
    const dlg = p.locator('.img-lb[role=dialog][aria-modal=true]');
    await dlg.waitFor();
    ok(await dlg.isVisible() && /放大圖片/.test(await dlg.getAttribute('aria-label')) && (await dlg.getAttribute('aria-label')).includes(await trig.locator('img').getAttribute('alt')), `[${tag}] 點圖開出 dialog（aria-modal、aria-label 有圖名）`);
    ok(p.url() === href0 && ctx.pages().length === pagesBefore, `[${tag}] 網址不變、沒有開新分頁`);
    ok(await p.evaluate(() => document.activeElement?.classList.contains('img-lb-close')), `[${tag}] 焦點移到「✕ 關閉」`);
    ok(await p.evaluate(() => document.body.parentElement.contains(document.querySelector('.img-lb')) && document.querySelector('.img-lb').parentElement === document.body), `[${tag}] 燈箱掛在 document.body（portal）`);
    ok(await p.evaluate(() => getComputedStyle(document.body).overflow === 'hidden'), `[${tag}] 背景捲動鎖住`);
    const big = await dlg.locator('.img-lb-body > img').boundingBox();
    ok(big.width > inline.width + 20 || (tag !== 'desktop-1280' && big.width >= inline.width), `[${tag}] 放大後的圖（${Math.round(big.width)}px）比卡片裡的（${Math.round(inline.width)}px）大`);
    ok(big.x >= 0 && big.y >= 0 && big.x + big.width <= vp.width + 0.5 && big.y + big.height <= vp.height + 0.5 && big.height <= vp.height * 0.8 + 1, `[${tag}] 圖在畫面內（${Math.round(big.width)}×${Math.round(big.height)}，最高 80vh）`);
    const cb = await dlg.locator('.img-lb-close').boundingBox();
    ok(cb.width >= 40 && cb.height >= 40 && /✕ 關閉/.test(await dlg.locator('.img-lb-close').textContent()), `[${tag}] 關閉鈕 ${Math.round(cb.width)}×${Math.round(cb.height)}px`);
    const link = dlg.locator('.img-lb-cap a');
    ok(await link.getAttribute('target') === '_blank' && /commons\.wikimedia\.org\/wiki\/File:/.test(await link.getAttribute('href')) && /Wikimedia Commons/.test(await link.textContent()), `[${tag}] 燈箱裡的 Commons 連結 target=_blank`);
    ok((await dlg.locator('.img-caption').textContent()).length > 10 && (await dlg.locator('.img-credit').textContent()).includes('Jakub'), `[${tag}] 燈箱下方有說明與出處`);
    ok(await p.evaluate(() => { const e = document.elementFromPoint(innerWidth / 2, 4); return e && e.closest('.img-lb'); }), `[${tag}] 燈箱蓋在最上層`);
    await p.screenshot({ path: `${out}/lightbox-${tag}.png` });
    // 關閉：Esc
    await p.keyboard.press('Escape');
    await p.waitForSelector('.img-lb', { state: 'detached' });
    await p.waitForTimeout(100);
    ok(await p.evaluate(() => document.activeElement?.classList.contains('img-trigger')), `[${tag}] Esc 關閉，焦點回到圖`);
    ok(await p.evaluate(() => getComputedStyle(document.body).overflow !== 'hidden'), `[${tag}] 關閉後恢復捲動`);
    // 關閉：背景
    await trig.click(); await dlg.waitFor();
    await p.mouse.click(vp.width - 6, vp.height - 6);
    await p.waitForSelector('.img-lb', { state: 'detached' });
    await p.waitForTimeout(100);
    ok(await p.evaluate(() => document.activeElement?.classList.contains('img-trigger')), `[${tag}] 點背景關閉，焦點回到圖`);
    // 點圖本身不該關
    await trig.click(); await dlg.waitFor();
    await dlg.locator('.img-lb-body > img').click();
    ok(await dlg.count() === 1, `[${tag}] 點放大的圖不會關掉`);
    // 關閉：按鈕、鍵盤 Enter
    await dlg.locator('.img-lb-close').focus();
    await p.keyboard.press('Enter');
    await p.waitForSelector('.img-lb', { state: 'detached' });
    ok(true, `[${tag}] 焦點在關閉鈕時按 Enter 關閉`);
    // 鍵盤開啟：焦點在 button 按 Enter
    await trig.focus(); await p.keyboard.press('Enter'); await dlg.waitFor();
    ok(true, `[${tag}] 鍵盤 Enter 也能開啟`);
    // Tab 不跑出燈箱
    for (let i = 0; i < 4; i++) await p.keyboard.press('Tab');
    ok(await p.evaluate(() => !!document.activeElement?.closest('.img-lb')), `[${tag}] Tab 焦點留在燈箱內`);
    await p.keyboard.press('Escape'); await p.waitForSelector('.img-lb', { state: 'detached' });
    ok(errs.length === 0, `[${tag}] 沒有 JS 錯誤、沒有新分頁${errs.length ? '：' + errs.join(' | ') : ''}`);
    await ctx.close();
  }

  // 大圖（1600px）載不到：退回卡片原本的網址
  {
    const ctx = await b.newContext(sizes[0][1]);
    const p = await ctx.newPage();
    await p.route(/openfreemap/, (r) => r.abort());
    const asked = [];
    p.on('request', (r) => { if (/upload\.wikimedia/.test(r.url())) asked.push(r.url()); });
    await fake(p, { abortBig: true });
    await p.goto(url);
    await p.locator('.card-img .img-trigger').first().click();
    await p.waitForSelector('.img-lb');
    await p.waitForTimeout(500);
    const cur = await p.locator('.img-lb-body > img').evaluate((i) => ({ src: i.currentSrc, w: i.naturalWidth }));
    ok(asked.some((u) => /\/1600px-/.test(u)) && /\/960px-/.test(cur.src) && cur.w > 0, '大圖 1600px 載入失敗時退回卡片網址（960px）並顯示');
    await ctx.close();
  }

  // 圖載不到：顯示說明、不能開燈箱
  for (const [tag, cfg] of sizes) {
    const ctx = await b.newContext(cfg);
    const p = await ctx.newPage();
    await p.route(/openfreemap/, (r) => r.abort());
    await p.route(/upload\.wikimedia/, (r) => r.abort());
    await p.goto(url);
    await p.waitForSelector('.card-img .img-missing');
    ok(/圖片暫時載不到/.test(await p.textContent('.card-img .img-missing')) && await p.locator('.card-img .img-trigger').count() === 0, `[${tag}] 圖載不到：出現 .img-missing 說明，沒有放大觸發器`);
    await p.locator('.card-img .img-missing').first().focus();
    await p.keyboard.press('Enter').catch(() => {});
    ok(await p.locator('.img-lb').count() === 0, `[${tag}] 圖載不到時沒有燈箱`);
    await ctx.close();
  }

  // 研究模式的卡片詳情也要能用
  {
    const ctx = await b.newContext(sizes[0][1]);
    const p = await ctx.newPage();
    await p.route(/openfreemap/, (r) => r.abort());
    await fake(p);
    await p.goto(`${base}?mode=research&card=building-angkor-wat`);
    await p.locator('.card-img .img-trigger').first().click();
    await p.waitForSelector('.img-lb');
    await p.keyboard.press('Escape');
    await p.waitForSelector('.img-lb', { state: 'detached' });
    ok(true, '[research] 卡片詳情的圖也能放大、Esc 關閉');
    await ctx.close();
  }

  await b.close();
  console.log(fail ? `\n${fail} 項失敗` : '\n全部通過');
  process.exit(fail ? 1 : 0);
})();
