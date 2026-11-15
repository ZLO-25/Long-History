// node back.cjs baseUrl → 學習模式的瀏覽器「上一頁」（手機的返回手勢）：每一步都還在站內、畫面正確，最後回到首頁，不會跳出網站
// 流程：首頁 → 臺灣史 → 單元 → 開始 → 第 2 步 → 點卡片裡的主題標籤 → 點一張卡；再用瀏覽器上一頁一步步退回。
// 另測：畫面上的「← 返回」和瀏覽器上一頁結果一致；直接用 ?mode=learn&unit=… 進來按「← 返回」回首頁（不離站）；故事閱讀頁的那一筆紀錄沒壞。
const { chromium } = require('playwright');
(async () => {
  const base = process.argv[2];
  const b = await chromium.launch();
  let fail = 0;
  const ok = (cond, msg) => { console.log(`${cond ? '✓' : '✗'} ${msg}`); if (!cond) fail++; };
  const errs = [];
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 } });
  const p = await ctx.newPage();
  p.on('pageerror', (e) => errs.push(String(e)));
  p.on('console', (m) => { if (m.type() === 'error' && !/tile|favicon|ERR_TUNNEL|ERR_NAME|ERR_PROXY|openfreemap|Failed to load resource/.test(m.text())) errs.push(m.text()); });
  const q = () => p.evaluate(() => Object.fromEntries(new URLSearchParams(location.search)));
  // 還在站內（沒整頁換掉：標記還在）且網址是這個網站的
  const inSite = (tag) => p.evaluate(() => window.__keep === 1 && location.protocol.startsWith('http')).then((v) => ok(v, `${tag}：還在站內（沒有離站或整頁重新載入）`));
  const back = async () => { await p.goBack(); await p.waitForTimeout(500); };

  await p.goto(`${base}?mode=learn`, { waitUntil: 'networkidle' });
  await p.evaluate(() => { window.__keep = 1; });
  await p.waitForSelector('.lhome');
  const intro = p.locator('.intro button.btn.primary');
  if (await intro.count()) await intro.click();
  const len0 = await p.evaluate(() => history.length);

  // ---- 往前走 ----
  await p.locator('.htile').filter({ hasText: '臺灣史' }).first().click();
  await p.waitForSelector('.hpage');
  const hid = (await q()).history;
  ok(hid === 'taiwan', `XX史頁：網址 history=${hid}`);
  await p.locator('.hpage button.mystery').first().click();
  await p.waitForSelector('.unit-intro');
  const uid = (await q()).unit;
  ok(!!uid, `單元封面：網址 unit=${uid}`);
  await p.click('.unit-intro button.btn.primary');
  await p.waitForSelector('.pdot');
  const lenUnit = await p.evaluate(() => history.length);
  ok(lenUnit === len0 + 2, `進 XX史、單元各多一筆紀錄（${len0} → ${lenUnit}）`);
  // 單元內換步：不新增紀錄（replaceState）
  const nDots = await p.$$eval('.pdot', (x) => x.length);
  await p.locator('.pdot').nth(1).click(); await p.waitForTimeout(200);
  let topicStep = -1;
  for (let i = 1; i < nDots; i++) {
    await p.locator('.pdot').nth(i).click(); await p.waitForTimeout(150);
    // 2026-11：單元內的卡片把主題標籤收在「想看更多：相關主題」裡，要先展開
    const more = p.locator('.unit .lc-more .chip', { hasText: '相關主題' });
    if (await more.count()) { await more.first().click(); await p.waitForTimeout(100); }
    if (await p.locator('.unit .chip.topic').count()) { topicStep = i; break; }
  }
  ok(topicStep > 0, `單元第 ${topicStep + 1} 步有主題標籤`);
  ok((await p.evaluate(() => history.length)) === lenUnit, '單元內換步不新增瀏覽紀錄');
  const tname = (await p.locator('.unit .chip.topic').first().textContent()).replace(/^#/, '').replace(/\d+$/, '').trim();
  await p.locator('.unit .chip.topic').first().click();
  await p.waitForSelector('.topic-view');
  const topicQ = (await q()).topic;
  ok(!!topicQ, `主題頁：網址 topic=${topicQ}（點的是「${tname}」）`);
  await p.locator('button.tv-item').first().click();
  await p.waitForSelector('.lc-head');
  const cid = (await q()).card;
  ok(!!cid, `卡片頁：網址 card=${cid}`);
  ok((await p.evaluate(() => history.length)) === len0 + 4, '主題頁、卡片頁各多一筆（共 4 筆：史、單元、主題、卡片）');
  await inSite('走到卡片');

  // ---- 瀏覽器上一頁，逐步退回 ----
  await back();
  await inSite('上一頁 → 主題頁');
  ok(!!(await p.$('.topic-view')) && (await q()).topic === topicQ && !(await q()).card, '回到主題頁，網址是主題');
  await back();
  await inSite('上一頁 → 單元');
  ok(!!(await p.$('.unit-intro, .unit')) && (await q()).unit === uid && !(await q()).topic, '回到單元，網址是單元');
  await back();
  await inSite('上一頁 → 臺灣史頁');
  ok(!!(await p.$('.hpage')) && (await q()).history === 'taiwan' && !(await q()).unit, '回到臺灣史頁');
  await back();
  await inSite('上一頁 → 首頁');
  const qh = await q();
  ok(!!(await p.$('.lhome')) && !qh.unit && !qh.history, `回到首頁，網址沒有殘留 history=（${JSON.stringify(qh)}）`);
  ok(!!(await p.$('.ltop')), '首頁頁首還在');
  // 往前：下一頁走回臺灣史頁
  await p.goForward(); await p.waitForTimeout(500);
  ok(!!(await p.$('.hpage')) && (await q()).history === 'taiwan', '下一頁：回到臺灣史頁');
  await inSite('下一頁');

  // ---- 畫面上的「← 返回」和上一頁一致 ----
  await p.locator('.hpage button.mystery').first().click();
  await p.waitForSelector('.unit-intro, .unit');
  const len1 = await p.evaluate(() => history.length);
  await p.click('.lcontent > button.back');
  await p.waitForTimeout(500);
  ok(!!(await p.$('.hpage')) && !(await q()).unit, '「← 返回」：單元 → 臺灣史頁');
  await p.click('.lcontent > button.back');
  await p.waitForTimeout(500);
  ok(!!(await p.$('.lhome')), '「← 返回」：臺灣史頁 → 首頁');
  ok((await q()).history === undefined, '回首頁後網址沒有 history=');
  await inSite('按畫面返回');
  // 返回走的是 history.back()：上一頁之後可以「下一頁」回到單元
  await p.goForward(); await p.waitForTimeout(400); await p.goForward(); await p.waitForTimeout(500);
  ok(!!(await p.$('.unit-intro, .unit')) && (await q()).unit === uid, '返回是真的「上一頁」：下一頁可以回到單元');
  void len1;

  // ---- 故事閱讀頁自己那一筆紀錄沒壞 ----
  await p.goto(`${base}?mode=learn&view=stories`, { waitUntil: 'networkidle' });
  await p.evaluate(() => { window.__keep = 1; });
  await p.waitForSelector('.si-item');
  await p.locator('.si-item').first().click();
  await p.waitForSelector('.sv-read-btn');
  const sid = (await q()).story;
  await p.click('.sv-read-btn');
  await p.waitForSelector('.sr-overlay');
  ok((await q()).read === '1', '故事閱讀頁：網址 read=1');
  await back();
  ok(!(await p.$('.sr-overlay')) && !!(await p.$('.story-view')) && (await q()).story === sid && !(await q()).read, '上一頁：關掉閱讀頁，留在這條故事線');
  await inSite('關閱讀頁');
  await back();
  ok(!!(await p.$('.si-item')) && !(await q()).story, '再上一頁：故事線清單');
  await inSite('故事線清單');

  // ---- 直接用連結進來：沒有上一筆站內紀錄，「← 返回」回首頁，不離站 ----
  const p2 = await ctx.newPage();
  await p2.goto(`${base}?mode=learn&unit=${uid}`, { waitUntil: 'networkidle' });
  await p2.evaluate(() => { window.__keep = 1; });
  await p2.waitForSelector('.unit-intro, .unit');
  const len2 = await p2.evaluate(() => history.length);
  await p2.click('.lcontent > button.back');
  await p2.waitForSelector('.lhome');
  ok(await p2.evaluate(() => window.__keep === 1 && new URLSearchParams(location.search).get('unit') === null), '直接開 ?unit=…：按「← 返回」回到首頁，沒有離站');
  ok((await p2.evaluate(() => history.length)) === len2, '回首頁用改寫的，不多放一筆紀錄');
  // 同一個畫面按瀏覽器上一頁才會離站（在這之前不應該有站內紀錄可退）
  const p3 = await ctx.newPage();
  await p3.goto(`${base}?mode=learn&card=${cid}`, { waitUntil: 'networkidle' });
  await p3.evaluate(() => { window.__keep = 1; });
  await p3.waitForSelector('.lc-head');
  await p3.click('.lcontent > button.back');
  await p3.waitForSelector('.lhome');
  ok(await p3.evaluate(() => window.__keep === 1), '直接開 ?card=…：按「← 返回」回首頁');

  ok(!errs.length, `沒有 console／頁面錯誤${errs.length ? '：' + errs.slice(0, 3).join(' | ') : ''}`);
  await b.close();
  console.log(fail ? `\n${fail} 項失敗` : '\n全部通過');
  process.exit(fail ? 1 : 0);
})();
