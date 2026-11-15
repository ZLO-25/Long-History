// node unit-flow.cjs baseUrl → 學習單元第 2 批新功能（2026-11-15）：手機 390×844
// 用頁面攔截把 unit-rome-fall 的 JSON 改寫成含所有新欄位（focus、quick、guess、why_wrong、critique、followup、points）的版本再測：
//  卡片步驟變短＋「想看更多」、quick 自評存進度、guess 在回顧出現、選擇題第一次錯不露正解／第二次才露、排序題同理、
//  開放題 <15 字不能看參考／我真的想不出來、points 可勾、不作答連按下一步＝走完、認真作答＝學會、
//  舊格式 localStorage 進度不出錯、下一步固定在底部不蓋住內容、桌機時間軸讀單元時預設收起。
const { chromium } = require('playwright');
const UNIT = 'unit-rome-fall', KEY = 'history-river-learn-v1';
(async () => {
  const base = process.argv[2];
  const b = await chromium.launch();
  let fail = 0;
  const ok = (cond, msg) => { console.log(`${cond ? '✓' : '✗'} ${msg}`); if (!cond) fail++; };
  const errs = [];
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
  let fixture = null;
  // 改寫單元 JSON：加上所有新欄位（值是為了測試寫的，不是教材）
  await ctx.route(`**/data/units/${UNIT}.json`, async (route) => {
    const res = await route.fetch();
    const j = await res.json();
    const st = j.unit.steps;
    st.forEach((s, i) => {
      if (s.type === 'hook') s.guess = { q: '你猜羅馬是怎麼亡的？', options: ['猜一：被蠻族打垮', '猜二：自己內部衰弱', '猜三：慢慢轉型'], reveal: '歷史學家至今還在吵，有人說是衰亡，也有人說是轉型。' };
      if (s.type === 'card') { s.focus = []; s.quick = [{ q: `第 ${i} 步小題一：這張卡的重點是什麼？`, a: `第 ${i} 步小題一的答案。` }]; }
      if (s.type === 'source') {
        s.why_wrong = s.options.map((_, k) => (k === s.answer ? null : `（為什麼錯 ${k}）這個選項把立場當成事實。`));
        const o = ['選項甲', '選項乙', '選項丙']; s.critique = { question: '第二問：這份史料有什麼限制？', options: o, answer: 1, explain: '第二問的解析。', why_wrong: [`錯甲`, null, `錯丙`] };
      }
      if (s.type === 'chain') s.followup = { question: '追問：哪一項只是背景？', options: ['A 項', 'B 項', 'C 項'], answer: 0, explain: '追問的解析。' };
      if (s.type === 'compare' || s.type === 'today' || s.type === 'recap') s.points = ['重點一：看立場', '重點二：看證據'];
      if (s.type === 'check') s.items.forEach((q) => { if (q.kind === 'choice') q.why_wrong = q.options.map((_, k) => (k === q.answer ? null : `（check 為什麼錯 ${k}）`)); });
    });
    fixture = j.unit;
    await route.fulfill({ response: res, json: j });
  });
  const p = await ctx.newPage();
  p.on('pageerror', (e) => errs.push(String(e)));
  p.on('console', (m) => { if (m.type() === 'error' && !/tile|favicon|ERR_TUNNEL|ERR_NAME|ERR_PROXY|Failed to load resource/.test(m.text())) errs.push(m.text()); });
  const store = () => p.evaluate((k) => JSON.parse(localStorage.getItem(k) || '{}').units?.[`${'unit-rome-fall'}`] ?? {}, KEY);
  const open = async (seed) => {
    await p.goto(`${base}?mode=learn`, { waitUntil: 'networkidle' });
    await p.evaluate(([k, v]) => { localStorage.clear(); if (v) localStorage.setItem(k, JSON.stringify(v)); }, [KEY, seed ?? null]);
    await p.goto(`${base}?mode=learn&unit=${UNIT}`, { waitUntil: 'networkidle' });
    await p.waitForSelector('.unit');
  };
  const toStep = async (i) => { await p.locator('.pdot').nth(i).click(); await p.waitForTimeout(150); };
  const start = async () => { if (!(await p.getByRole('button', { name: /^開始|開始上半段/ }).count())) console.log('DBG', (await p.locator('body').innerText()).slice(0, 1500)); await p.getByRole('button', { name: /^開始|開始上半段/ }).first().click(); await p.waitForTimeout(150); };

  // ---------- 1. 卡片步驟：只展開故事，其餘收成「想看更多」 ----------
  await open(); await start(); await p.waitForSelector('.pdot');
  await toStep(1);
  await p.waitForSelector('.unit-card');
  const unitH = await p.$eval('.unit-card', (e) => e.getBoundingClientRect().height);
  ok(await p.locator('.lc-more').count() === 1 && /想看更多/.test(await p.locator('.lc-more').innerText()), '卡片步驟有「想看更多」一排');
  ok(await p.locator('.lc-toc, .path-nav, .topic-chips').count() === 0, '單元內的卡片沒有卡內目錄／故事線跳站鈕／主題標籤');
  const full = await ctx.newPage();
  await full.goto(`${base}?mode=learn&card=${fixture.steps[1].id}`, { waitUntil: 'networkidle' });
  await full.waitForSelector('.lcard');
  const fullH = await full.$eval('.lcard', (e) => e.getBoundingClientRect().height);
  ok(unitH < fullH * 0.6, `單元裡的卡片（${Math.round(unitH)}px）比完整卡片（${Math.round(fullH)}px）明顯短`);
  ok(await full.locator('.lc-more').count() === 0 && await full.locator('.lc-toc').count() === 1, '單元外直接開卡片仍完整顯示（有卡內目錄、沒有想看更多）');
  await full.close();
  const chips0 = await p.locator('.lc-more .chip').count();
  await p.locator('.lc-more .chip').first().click();
  ok(await p.locator('.lc-opened').count() === 1 && (await p.locator('.lc-more .chip').count()) === chips0, '點「想看更多」的項目會就地展開');
  // focus：指定一段會直接展開
  // ---------- 2. quick ----------
  ok(await p.getByText('先不要往回翻').count() === 1, '卡片後面有 quick 小題');
  ok(await p.getByText('小題一的答案').count() === 0, '按「看答案」之前不顯示答案');
  await p.getByRole('button', { name: '想好了，看答案' }).click();
  ok(await p.getByText('小題一的答案').count() === 1, '按了才顯示答案');
  await p.getByRole('button', { name: '一半' }).click();
  ok((await store()).answers?.['qk1_0'] === 'half', 'quick 自評存進進度（qk1_0=half）');
  // ---------- 3. guess ----------
  await toStep(0);
  await p.locator('.guess .opt', { hasText: '猜二' }).click();
  ok(await p.getByText('記下來了，讀完再回來對照').count() === 1, 'guess 選完顯示「記下來了」');
  ok((await store()).answers?.['g0'] === 1, 'guess 存進進度（g0=1）');
  await toStep(fixture.steps.length - 1);
  ok(await p.getByText('你一開始猜的是：').count() === 1 && await p.getByText('猜二：自己內部衰弱').count() >= 1 && await p.getByText('歷史學家至今還在吵').count() === 1, '回顧開頭顯示「你一開始猜的是…」與 reveal');

  // ---------- 4. 選擇題：第一次錯不露正解 ----------
  const si = fixture.steps.findIndex((s) => s.type === 'source'), S = fixture.steps[si];
  await toStep(si);
  const wrongs = S.options.map((o, k) => k).filter((k) => k !== S.answer);
  await p.locator('.opt', { hasText: S.options[wrongs[0]] }).first().click();
  const t1 = await p.locator('.activity').first().innerText();
  ok(/不太對/.test(t1) && !/正確答案是/.test(t1) && !t1.includes(S.explain.slice(0, 12)), '選擇題第一次選錯：只說不太對，不公布正解與解析');
  ok(t1.includes(`為什麼錯 ${wrongs[0]}`), '顯示 why_wrong[選的那格]');
  ok(/提示 1：/.test(t1), '自動展開第一段提示');
  ok(await p.locator('.activity').first().getByText(/回到卡片看/).count() >= 1, '有「回到卡片看」連結');
  ok(await p.locator('.opt.right').count() === 0, '沒有標出正解');
  await p.locator('.opt', { hasText: S.options[wrongs[1]] }).first().click();
  const t2 = await p.locator('.activity').first().innerText();
  ok(/正確答案是/.test(t2) && t2.includes(S.explain.slice(0, 12)) && await p.locator('.activity').first().locator('.opt.right').count() === 1, '第二次選錯才公布正解與完整解析');
  const r = (await store()).answers?.[`r:s${si}`];
  ok(r && r.f === false && r.l === false && r.n === 2, `進度存第一次／最近一次／嘗試次數：${JSON.stringify(r)}`);
  ok(await p.getByText('第二問：這份史料有什麼限制？').count() === 1, 'critique 在第一問答完後出現');
  await p.locator('.critique .opt', { hasText: '選項乙' }).click();
  ok(/答對了/.test(await p.locator('.critique').innerText()), 'critique 是一般選擇題（第一次答對）');
  ok((await store()).answers?.[`r:s${si}k`]?.f === true, 'critique 紀錄 f=true');

  // ---------- 5. 排序題 ----------
  const ci = fixture.steps.findIndex((s) => s.type === 'chain'), C = fixture.steps[ci];
  await toStep(ci);
  ok(await p.getByText('追問：哪一項只是背景？').count() === 0, '排序完成前不出現追問');
  const fill = async () => { for (let k = 0; k < C.items.length; k++) await p.locator('.pool .pitem .opt').first().click(); };
  await fill(); await p.getByRole('button', { name: '對答案' }).click();
  const o1 = await p.locator('.order').innerText();
  ok(/排對 \d+／\d+ 個/.test(o1) && !/正確順序：/.test(o1), '排序題第一次只標哪幾格對，不印正確順序');
  ok(await p.locator('.order .slot.right, .order .slot.wrong').count() === C.items.length, '每一格都標了對／錯');
  await p.getByRole('button', { name: '全部重排' }).click();
  await fill(); await p.getByRole('button', { name: '對答案' }).click();
  ok(/正確順序：/.test(await p.locator('.order').innerText()), '排序題第二次才印出正確順序');
  ok(await p.getByText('追問：哪一項只是背景？').count() === 1, '排序完成（已公布）後出現追問');
  ok((await store()).answers?.[`r:o${ci}`]?.n === 2, '排序題紀錄嘗試次數 n=2');

  // ---------- 6. 開放題 ----------
  const pi = fixture.steps.findIndex((s) => s.type === 'compare');
  await toStep(pi);
  const btn = p.getByRole('button', { name: '看參考說法' });
  ok(await btn.isDisabled(), '開放題空白：「看參考說法」不能按');
  await p.locator('.activity textarea').fill('太短了');
  ok(await btn.isDisabled(), '少於 15 字仍不能按');
  await p.locator('.activity textarea').fill('我覺得兩個故事都顯示羅馬的邊疆不是一條線而是一個地帶。');
  ok(await btn.isEnabled(), '寫滿 15 字後可以按');
  await btn.click();
  ok(await p.locator('.points li').count() === 2, '看完參考說法後逐條列出 points');
  await p.locator('.points li').first().getByRole('button', { name: '有寫到' }).click();
  await p.locator('.points li').nth(1).getByRole('button', { name: '沒寫到' }).click();
  await p.locator('.more-line input').fill('補一句：邊疆也是交流的地方');
  const w = (await store()).answers?.[`w:s${pi}`];
  ok(w && w.pts?.[0] === true && w.pts?.[1] === false && w.more?.includes('補一句'), `points 勾選與補寫存進進度：${JSON.stringify(w)}`);
  ok(((await store()).answers?.[`s${pi}`] ?? '').includes('邊疆不是一條線'), '補寫不覆蓋原本的答案');
  const ti = fixture.steps.findIndex((s) => s.type === 'today');
  await toStep(ti);
  await p.getByRole('button', { name: '我真的想不出來' }).click();
  ok(await p.locator('.feedback.model').count() === 1 && (await store()).answers?.[`w:s${ti}`]?.skip === true, '「我真的想不出來」也能看參考說法，並記錄');

  // ---------- 7. 不作答連按下一步 → 走完 ----------
  await open(); await start();
  const n = fixture.steps.length;
  for (let k = 0; k < n; k++) {
    const nx = p.locator('.step-nav .btn.primary');
    if (await p.locator('.half-break').count()) await p.getByRole('button', { name: /繼續下半段/ }).click();
    if (k < n - 1) { await nx.click(); await p.waitForTimeout(60); }
  }
  // 中場休息可能擋住；確認到了回顧
  for (let g = 0; g < 4 && !(await p.locator('.recap').count()); g++) { if (await p.getByRole('button', { name: /繼續下半段/ }).count()) await p.getByRole('button', { name: /繼續下半段/ }).click(); else await p.locator('.step-nav .btn.primary').click(); await p.waitForTimeout(80); }
  await p.getByRole('button', { name: /完成這個單元/ }).click();
  await p.waitForSelector('.unit-result');
  const res1 = await p.locator('.unit-result').innerText();
  ok(/走完/.test(res1) && !/學會/.test(res1.split('\n')[1] ?? ''), '不作答連按下一步：結果是「走完」，不是「學會」');
  ok(/還沒作答的地方/.test(res1) && await p.locator('.res-missing li').count() > 3, '結果畫面列出還沒作答的步驟（可點回去）');
  await p.locator('.res-missing .link').first().click();
  ok(await p.locator('.unit-result').count() === 0, '點「還沒作答」的項目會回到那一步');

  // ---------- 8. 認真作答 → 學會 ----------
  await open(); await start();
  const stepsT = fixture.steps;
  const lorem = '這是我認真寫的一段回答，超過十五個字沒問題。';
  const next = async () => { if (await p.locator('.half-break').count()) await p.getByRole('button', { name: /繼續下半段/ }).click(); else await p.locator('.step-nav .btn.primary').click(); await p.waitForTimeout(80); };
  const optBtn = (txt) => p.locator('.opt', { hasText: txt }).first();
  const doOrder = async (scope, items) => { for (const it of items) await scope.locator('.pool .pitem .opt', { hasText: new RegExp('^' + it.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '$') }).first().click(); await scope.getByRole('button', { name: '對答案' }).click(); };
  for (let i = 0; i < stepsT.length; i++) {
    const s = stepsT[i];
    if (await p.locator('.half-break').count()) await p.getByRole('button', { name: /繼續下半段/ }).click();
    if (s.type === 'hook') await p.locator('.guess .opt', { hasText: '猜一' }).click();
    if (s.type === 'card') { await p.getByRole('button', { name: '想好了，看答案' }).click(); await p.getByRole('button', { name: '答對', exact: true }).click(); }
    if (s.type === 'source') { await optBtn(s.options[s.answer]).click(); await p.locator('.critique .opt', { hasText: '選項乙' }).click(); }
    if (s.type === 'chain') { await doOrder(p.locator('.order').first(), s.items); await p.locator('.critique .opt', { hasText: 'A 項' }).click(); }
    if (s.type === 'compare' || s.type === 'today') { await p.locator('.activity textarea').fill(lorem); await p.getByRole('button', { name: '看參考說法' }).click(); }
    if (s.type === 'decision') { await p.getByRole('button', { name: '先跳過' }).click(); await p.locator('.decision .options .opt').first().click(); }
    if (s.type === 'check') {
      for (let j = 0; j < s.items.length; j++) {
        const q = s.items[j], box = p.locator('.checks-list > .activity').nth(j);
        if (q.kind === 'choice') await box.locator('.opt', { hasText: q.options[q.answer] }).first().click();
        else if (q.kind === 'order') await doOrder(box, q.items);
        else { await box.locator('textarea').fill(lorem); await box.getByRole('button', { name: '看參考說法' }).click(); }
      }
    }
    if (s.type === 'recap') { await p.locator('.recap textarea').first().fill(lorem); await p.getByRole('button', { name: '寫好了，看參考說法' }).click(); }
    if (i < stepsT.length - 1) await next();
  }
  await p.getByRole('button', { name: /完成這個單元/ }).click();
  await p.waitForSelector('.unit-result');
  const res2 = await p.locator('.unit-result').innerText();
  ok(/學會/.test(res2.split('\n').slice(0, 3).join('')), '全部認真作答：結果是「學會」');
  ok(/第一次答對/.test(res2) && /最後答對/.test(res2) && /你寫的回答/.test(res2), '結果畫面有第一次／最後答對、你寫的回答');
  ok(!/還沒作答的地方/.test(res2), '全部作答後沒有「還沒作答」');
  // 首頁與紀錄顯示三級
  await p.locator('.brand').click(); // 站內回首頁：單元的完整資料已載入（直接開首頁時用的是 index.json 裡的骨架，那是真實單元而非測試用的改寫版）
  await p.waitForSelector('.lhome'); await p.click('.home-pick .pick-more .btn >> text=看全部'); // 做完的課在首頁精選裡排後面，去「全部的課」看
  await p.waitForSelector('.lists-page .mystery.done');
  const hm = await p.locator('.mystery.done .meta').first().innerText();
  ok(/學會/.test(hm), '「全部的課」列表顯示「學會」' + (/學會/.test(hm) ? '' : '：' + hm));
  await p.goto(`${base}?mode=learn&view=record`, { waitUntil: 'networkidle' });
  ok(/學會/.test(await p.locator('table.rec tr.st-done').first().innerText()) && /\d+／\d+/.test(await p.locator('table.rec tr.st-done td').nth(2).innerText()), '學習紀錄顯示等級與「實際作答 幾／共幾」');

  // ---------- 9. 舊格式進度 ----------
  const old = { units: { [UNIT]: { step: 5, done: true, doneAt: '2026-11-01', recap: '舊的回顧文字寫了很多很多很多', answers: { s9: 2, s3: '舊的比較回答寫了很多很多字', c11_0: true, c11_1: false, d6: '舊的想法' } } }, cards: { 'war-teutoburg': true } };
  const e0 = errs.length;
  await open(old);
  await p.waitForSelector('.unit');
  ok(errs.length === e0, '舊格式進度載入單元不出錯');
  await p.goto(`${base}?mode=learn&view=lessons`, { waitUntil: 'networkidle' });
  ok(/走完/.test(await p.locator('.mystery.done .meta').first().innerText()), '舊進度裡已完成的單元推算為「走完」');
  await p.goto(`${base}?mode=learn&view=record`, { waitUntil: 'networkidle' });
  ok(await p.locator('table.rec').count() === 1 && errs.length === e0, '舊格式進度的學習紀錄頁正常');
  await p.goto(`${base}?mode=learn&unit=${UNIT}`, { waitUntil: 'networkidle' });
  await p.waitForSelector('.unit');
  await toStep(9).catch(() => {});
  await p.getByRole('button', { name: /^開始|從第/ }).first().click().catch(() => {});
  await p.locator('.pdot').nth(si).click();
  ok(await p.locator('.activity .feedback').count() >= 1 && !/提示 1：/.test(await p.locator('.activity').first().innerText()), '舊進度的史料題顯示為已作答（不重問）');

  // ---------- 10. 下一步固定在底部，不蓋住內容 ----------
  await open(); await start(); await toStep(4);
  await p.waitForSelector('.unit-card');
  const geo = async () => p.evaluate(() => {
    const nav = document.querySelector('.step-nav').getBoundingClientRect(), tabs = document.querySelector('.ltabs').getBoundingClientRect();
    const main = document.querySelector('.lm-main');
    return { navTop: nav.top, navBottom: nav.bottom, tabsTop: tabs.top, vh: innerHeight, mainScrollable: main.scrollHeight > main.clientHeight };
  });
  let g = await geo();
  ok(g.mainScrollable && g.navBottom <= g.tabsTop + 1 && g.navTop > 300, `頁面頂端時下一步已固定在底部分頁上方（nav ${Math.round(g.navTop)}–${Math.round(g.navBottom)}，分頁 ${Math.round(g.tabsTop)}）`);
  await p.evaluate(() => { const m = document.querySelector('.lm-main'); m.scrollTop = m.scrollHeight; });
  await p.waitForTimeout(100);
  g = await geo();
  const last = await p.evaluate(() => { const nav = document.querySelector('.step-nav').getBoundingClientRect(); const q = document.querySelector('.quick').getBoundingClientRect(); return { qBottom: q.bottom, navTop: nav.top }; });
  ok(g.navBottom <= g.tabsTop + 1 && last.qBottom <= last.navTop + 1, '捲到底：小題內容沒被「下一步」蓋住，也沒和底部分頁打架');

  // ---------- 11. 桌機：時間軸讀單元預設收起 ----------
  const dctx = await b.newContext({ viewport: { width: 1280, height: 800 } });
  const d = await dctx.newPage();
  await d.goto(`${base}?mode=learn`, { waitUntil: 'domcontentloaded' });
  await d.evaluate((k) => localStorage.removeItem(k), KEY);
  await d.goto(`${base}?mode=learn&unit=${UNIT}`, { waitUntil: 'networkidle' });
  await d.waitForSelector('.unit');
  ok(await d.locator('.learn.desktop.tl-closed').count() === 1, '桌機讀單元：時間軸預設收起');
  await d.getByRole('button', { name: /展開/ }).first().click();
  await d.goto(`${base}?mode=learn&unit=${UNIT}`, { waitUntil: 'networkidle' });
  await d.waitForSelector('.unit');
  ok(await d.locator('.learn.desktop.tl-closed').count() === 0, '使用者手動展開過就尊重（重新整理後仍展開）');
  await dctx.close();

  ok(errs.length === 0, `沒有頁面錯誤${errs.length ? '：' + errs[0] : ''}`);
  await b.close();
  console.log(fail ? `\n${fail} 項失敗` : '\n全部通過');
  process.exit(fail ? 1 : 0);
})();
