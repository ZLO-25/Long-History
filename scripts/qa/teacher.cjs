// node teacher.cjs http://localhost:4187/  → 老師用功能（2026-11-15 第 3 批）：
//  #24 &step= 直達與換步不新增瀏覽紀錄、複製「從這一步開始的連結」、作答停留時間、紀錄頁（姓名班級座號、只列做過的課、展開看作答、回到自己預設摺起）
//  #20 學習單／解答頁（學習單不含答案、解答才有、順序固定）、匯出這一課的作答（文字、回到自己預設不含）
//  #21 三個學生各自產生分享碼 → 老師頁貼上：三列、答對率、最低題標出、開放題展開、逐題看全班、CSV、壞碼訊息
//  #23 備份 → 清除（要打字確認）→ 還原後進度一致
// 截圖放 process.env.SHOTS（預設 docs/screenshots）
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const UNIT = 'unit-rome-fall', KEY = 'history-river-learn-v1';
const SHOTS = process.env.SHOTS || 'docs/screenshots';
(async () => {
  const base = process.argv[2];
  fs.mkdirSync(SHOTS, { recursive: true });
  let fail = 0;
  const ok = (cond, msg) => { console.log(`${cond ? '✓' : '✗'} ${msg}`); if (!cond) fail++; };
  const errs = [];
  const unitJson = await (await fetch(`${base}data/units/${UNIT}.json`)).json();
  const idxJson = await (await fetch(`${base}index.json`)).json();
  const U = { ...idxJson.units.find((x) => x.id === UNIT), ...unitJson.unit }, steps = U.steps;
  const idx = (t, n = 0) => steps.map((s, i) => [s, i]).filter(([s]) => s.type === t)[n][1];
  const srcI = idx('source'), chainI = idx('chain'), checkI = idx('check'), decI = idx('decision'), cmpI = idx('compare'), recapI = idx('recap'), todayI = idx('today'), hookI = idx('hook');
  const choiceJ = steps[checkI].items.findIndex((q) => q.kind === 'choice');

  // ---- 造學生進度：bad＝這個學生第一次答錯的互動 ----
  const stuProgress = (name, no, bad, tag) => {
    const A = {};
    const rec = (k, wrong, p) => { A[`r:${k}`] = { f: !wrong, l: true, n: wrong ? 2 : 1, ...(p != null ? { p } : {}) }; };
    steps.forEach((s, i) => {
      if (s.type === 'hook' && s.guess) A[`g${i}`] = 1;
      if (s.type === 'card') (s.quick ?? []).forEach((_, j) => { A[`qk${i}_${j}`] = 'right'; });
      if (s.type === 'source') { rec(`s${i}`, bad.includes(`s${i}`), s.answer); A[`s${i}`] = s.answer; if (s.critique) rec(`s${i}k`, false, s.critique.answer); }
      if (s.type === 'chain') { rec(`o${i}`, bad.includes(`o${i}`)); if (s.followup) rec(`o${i}f`, false, s.followup.answer); }
      if (s.type === 'compare' || s.type === 'today') { A[`s${i}`] = `${tag}：這是${name}寫的第 ${i + 1} 步答案，至少超過十五個字。`; A[`w:s${i}`] = { seen: true, pts: [true, false], more: `${name}補寫` }; }
      if (s.type === 'decision') { A[`dp${i}`] = 0; A[`d${i}`] = `${tag}：${name}的掩卷自思，如果是我我會先觀望。`; }
      if (s.type === 'check') s.items.forEach((q, j) => {
        if (q.kind === 'short') A[`cs${i}_${j}`] = `${tag}：${name}的簡答，這題的重點在於壓力累積。`;
        else { rec(`c${i}_${j}`, bad.includes(`c${i}_${j}`), q.kind === 'choice' ? q.answer : undefined); A[`c${i}_${j}`] = !bad.includes(`c${i}_${j}`); }
      });
    });
    A.reflect = `${name}的秘密想法ZZZ`;
    A['w:recap'] = { seen: true, pts: [true, true, false, null] };
    return { units: { [UNIT]: { step: steps.length - 1, done: true, doneAt: '2026-11-14', lastAt: '2026-11-14', recap: `${tag}：${name}的回顧，沒有單一答案。`, answers: A, seen: steps.map((_, i) => i), time: 600 + no * 60 } }, cards: { 'war-teutoburg': true }, profile: { name, cls: '801', no: String(no) } };
  };
  const S = [
    ['王小明', 3, [], 'A'],
    ['李小華', 1, [`s${srcI}`, `o${chainI}`], 'B'],
    ['陳小美', 12, [`s${srcI}`, `c${checkI}_${choiceJ}`], 'C'],
  ].map(([n, no, bad, tag]) => ({ name: n, no, bad, prog: stuProgress(n, no, bad, tag) }));

  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 1280, height: 900 }, acceptDownloads: true });
  await ctx.grantPermissions(['clipboard-read', 'clipboard-write'], { origin: new URL(base).origin });
  const p = await ctx.newPage();
  p.on('pageerror', (e) => errs.push(String(e)));
  p.on('console', (m) => { if (m.type() === 'error' && !/tile|favicon|ERR_TUNNEL|ERR_NAME|ERR_PROXY|Failed to load resource/.test(m.text())) errs.push(m.text()); });
  const seed = async (prog) => {
    // 用沒有 React 的靜態頁改 localStorage（學習頁還在跑時改，它會把舊進度寫回去）
    await p.goto(`${base}credits.html`, { waitUntil: 'domcontentloaded' });
    await p.evaluate(([k, v]) => { localStorage.clear(); if (v) localStorage.setItem(k, JSON.stringify(v)); }, [KEY, prog ?? null]);
  };
  const store = () => p.evaluate((k) => JSON.parse(localStorage.getItem(k) || '{}'), KEY);
  const go = async (q, sel) => { await p.goto(`${base}?mode=learn&${q}`, { waitUntil: 'networkidle' }); if (sel) await p.waitForSelector(sel, { timeout: 15000 }); };

  // ================= #24 網址帶步驟 =================
  await seed(null);
  await go(`unit=${UNIT}&step=8`, '.step-label');
  ok(/第 8／13 步/.test(await p.locator('.step-label').innerText()), '?unit=…&step=8 直接到第 8 步');
  const h0 = await p.evaluate(() => history.length);
  await p.getByRole('button', { name: /^下一步/ }).click(); await p.waitForTimeout(300);
  ok(/step=9\b/.test(p.url()) && /第 9／13 步/.test(await p.locator('.step-label').innerText()), '換步後網址變成 &step=9');
  ok(await p.evaluate(() => history.length) === h0, '換步用 replaceState，不新增瀏覽紀錄');
  await p.locator('.pdot').nth(2).click(); await p.waitForTimeout(200);
  ok(/step=3\b/.test(p.url()), '點進度點也跟著改網址（step=3）');
  await p.getByRole('button', { name: /複製連結/ }).click();
  ok(await p.getByRole('menuitem', { name: /從第 3 步開始/ }).count() === 1 && await p.getByRole('menuitem', { name: /這一課的連結/ }).count() === 1, '複製連結有「這一課的連結」與「從第 3 步開始的連結」');
  await p.getByRole('menuitem', { name: /從第 3 步開始/ }).click();
  const clip = await p.evaluate(() => navigator.clipboard.readText());
  ok(new RegExp(`\\?mode=learn&unit=${UNIT}&step=3$`).test(clip), `複製出來的是從這一步開始的連結：${clip}`);
  await go(`unit=${UNIT}&step=99`, '.unit-intro');
  ok(await p.locator('.unit-intro').count() === 1 && !/step=/.test(p.url()), 'step 超出範圍 → 封面，網址不留 step');
  await go(`unit=${UNIT}&step=abc`, '.unit-intro');
  ok(await p.locator('.unit-intro').count() === 1, 'step 不是數字 → 封面');
  await go(`unit=${UNIT}&step=1`, '.step-label');
  ok(/第 1／13 步/.test(await p.locator('.step-label').innerText()), 'step=1 → 第 1 步');
  // 封面的列印按鈕
  await seed(null); await go(`unit=${UNIT}`, '.unit-intro');
  ok(await p.getByRole('link', { name: /印學習單/ }).count() === 1 && await p.getByRole('link', { name: /印解答/ }).count() === 1, '封面有「印學習單」「印解答（教師用）」');

  // ================= 作答停留時間 =================
  await seed({ units: { [UNIT]: { step: 1, done: false } }, cards: {} });
  await go(`unit=${UNIT}&step=2`, '.step-label');
  for (let i = 0; i < 6; i++) { await p.mouse.move(200 + i * 5, 300); await p.waitForTimeout(2200); }
  await p.goto(`${base}?mode=learn`, { waitUntil: 'networkidle' }); // 離開頁面也會存
  const tm = (await store()).units?.[UNIT]?.time;
  ok(typeof tm === 'number' && tm >= 11 && tm <= 20, `停留 13 秒左右：time=${tm}`);
  await seed({ units: { [UNIT]: { step: 1, done: false } }, cards: {} });
  await go(`unit=${UNIT}&step=99`, '.unit-intro'); await p.mouse.move(300, 300); await p.waitForTimeout(3500);
  ok((await store()).units?.[UNIT]?.time === undefined, '在封面不計時');

  // ================= #20 學習單／解答 =================
  await seed(null);
  const sheetText = async (mode) => { await go(`unit=${UNIT}&print=${mode}`, '.ws'); await p.waitForSelector('.ws-step'); return p.evaluate(() => ({ all: document.querySelector('.ws').innerText, nokey: (() => { const c = document.querySelector('.ws').cloneNode(true); c.querySelectorAll('.ws-opt').forEach((e) => e.remove()); return c.innerText; })(), keys: document.querySelectorAll('.ws-key').length, lines: document.querySelectorAll('.ws-lines').length })); };
  const sh = await sheetText('sheet'), ky = await sheetText('key');
  ok(sh.all.includes(U.title) && sh.all.includes('姓名') && sh.all.includes(U.mystery), '學習單有課名、姓名欄、謎題');
  ok(sh.keys === 0 && sh.lines > 5, `學習單沒有解答區塊、有作答線（${sh.lines} 條）`);
  ok(ky.keys > 10 && ky.all.includes('教師用'), `解答頁有教師用區塊（${ky.keys} 個）`);
  const chk = steps[checkI].items[choiceJ];
  ok(!sh.nokey.includes(chk.options[chk.answer]), '學習單的非選項區不含自我檢查的正解文字');
  ok(!sh.all.includes(chk.explain.slice(0, 20)) && !sh.all.includes(steps[recapI].model_answer.slice(0, 20)) && !sh.all.includes(steps[srcI].explain.slice(0, 20)), '學習單不含解析、參考說法');
  ok(ky.all.includes(chk.explain.slice(0, 20)) && ky.all.includes(steps[recapI].model_answer.slice(0, 20)) && ky.all.includes(steps[srcI].explain.slice(0, 20)), '解答頁含解析、參考說法');
  ok(ky.all.includes(`正解：`) && ky.all.includes(steps[decI].actual.slice(0, 15)), '解答頁有「正解：」與決策的歷史實況');
  ok(sh.all.includes('我會選') && sh.all.includes('我的排序'), '學習單有決策填空與因果鏈排序欄');
  const sh2 = await sheetText('sheet');
  ok(sh2.all === sh.all, '重新載入後學習單文字完全相同（打散用固定種子）');
  // 卡片全文不印：卡片步驟只有標題
  const cardStepI = idx('card');
  ok(!sh.all.includes((unitJson.cards[steps[cardStepI].id]?.sections?.[0]?.text ?? '@@@').slice(0, 30)), '卡片全文不印');
  await p.screenshot({ path: path.join(SHOTS, 'teacher-sheet-screen.png'), fullPage: false });
  await go(`unit=${UNIT}&print=sheet`, '.ws-step');
  await p.emulateMedia({ media: 'print' });
  const hidden = await p.evaluate(() => ['.ltop', '.ld-map', '.ld-tl', '.ws-bar'].map((s) => { const e = document.querySelector(s); return !e || getComputedStyle(e).display === 'none'; }));
  ok(hidden.every(Boolean), '列印時隱藏頁首、地圖、時間軸、工具列');
  await p.pdf({ path: path.join(SHOTS, 'teacher-sheet.pdf'), format: 'A4', printBackground: true });
  await p.screenshot({ path: path.join(SHOTS, 'teacher-sheet-print.png'), fullPage: false });
  await go(`unit=${UNIT}&print=key`, '.ws-key');
  await p.pdf({ path: path.join(SHOTS, 'teacher-key.pdf'), format: 'A4', printBackground: true });
  await p.emulateMedia({ media: 'screen' });
  await go(`unit=nope&print=sheet`, '.notfound');
  ok(true, '不存在的課顯示「找不到」');

  // ================= 紀錄頁 =================
  await seed({ ...S[0].prog, units: { ...S[0].prog.units, 'unit-hoi-an': { step: 3, done: false, lastAt: '2026-11-13' } }, profile: undefined });
  await go('view=record', '.record');
  ok(await p.locator('.record table.rec tbody tr').count() === 2, '紀錄頁預設只列做過的課（2 課）');
  await p.locator('.profile-fields input').nth(0).fill('測試生'); await p.locator('.profile-fields input').nth(1).fill('802'); await p.locator('.profile-fields input').nth(2).fill('07');
  ok(JSON.stringify((await store()).profile) === JSON.stringify({ name: '測試生', cls: '802', no: '07' }), '姓名班級座號存進本機進度');
  await p.getByLabel(/顯示全部/).check();
  ok(await p.locator('.record table.rec tbody tr').count() > 30, '勾「顯示全部」列出所有課');
  await p.getByLabel(/顯示全部/).uncheck();
  const lesson = p.locator('details.rec-lesson', { hasText: U.title });
  await lesson.locator('summary').first().click();
  await p.waitForSelector('details.rec-lesson[open] .rec-a');
  const recTxt = await lesson.innerText();
  ok(recTxt.includes('掩卷自思') && recTxt.includes('王小明的掩卷自思') && recTxt.includes('有寫到') && recTxt.includes('補寫'), '展開一課：看得到掩卷自思、開放題、自評、補寫');
  const refl = lesson.locator('details.reflect-sec').first();
  ok(!(await refl.evaluate((e) => e.open)) && /只有你看得到，匯出時預設不包含/.test(await refl.innerText()), '「回到自己」預設摺起並標明只有你看得到');
  await p.screenshot({ path: path.join(SHOTS, 'teacher-record.png') });
  await p.emulateMedia({ media: 'print' }); await p.screenshot({ path: path.join(SHOTS, 'teacher-record-print.png'), fullPage: true });
  ok(await p.evaluate(() => getComputedStyle(document.querySelector('details.reflect-sec')).display) === 'none', '列印時不印「回到自己」');
  await p.emulateMedia({ media: 'screen' });

  // ================= #20 匯出頁＋#21 分享碼 =================
  const codes = [];
  for (const s of S) {
    await seed(s.prog);
    await go(`view=export&unit=${UNIT}`, '.exp-sheet');
    const t = await p.locator('.exp-sheet').innerText();
    ok(t.includes(s.name) && t.includes('801') && t.includes(String(s.no)) && t.includes('約') && t.includes(U.title), `${s.name}：匯出頁有姓名班級座號、課名、花費時間`);
    ok(!t.includes('秘密想法ZZZ'), `${s.name}：匯出頁預設不含「回到自己」`);
    if (s === S[0]) {
      await p.getByRole('button', { name: /複製文字/ }).click();
      const txt = await p.evaluate(() => navigator.clipboard.readText());
      ok(txt.includes('姓名：王小明') && txt.includes('第一次：') && !txt.includes('秘密想法ZZZ'), '複製文字：有姓名與第一次對錯，不含回到自己');
      await p.getByLabel(/包含「回到自己」/).check();
      ok((await p.locator('.exp-sheet').innerText()).includes('秘密想法ZZZ'), '勾選後才包含「回到自己」');
      await p.getByLabel(/包含「回到自己」/).uncheck();
      await p.emulateMedia({ media: 'print' }); await p.screenshot({ path: path.join(SHOTS, 'teacher-export-print.png'), fullPage: true }); await p.emulateMedia({ media: 'screen' });
      await p.screenshot({ path: path.join(SHOTS, 'teacher-export.png') });
    }
    await p.getByRole('button', { name: /產生分享碼/ }).click();
    await p.waitForSelector('textarea[aria-label="分享碼"]');
    const code = await p.locator('textarea[aria-label="分享碼"]').inputValue();
    codes.push(code);
    const raw = Buffer.from(code.replace(/^HR1\./, '').replace(/-/g, '+').replace(/_/g, '/'), 'base64');
    const json = zlib.inflateRawSync(raw).toString('utf8');
    ok(code.startsWith('HR1.') && !json.includes('秘密想法ZZZ') && json.includes(s.name), `${s.name}：分享碼 ${code.length} 字元，內容有姓名、不含回到自己`);
    await p.getByLabel(/包含「回到自己」/).check(); await p.waitForTimeout(400);
    const code2 = await p.locator('textarea[aria-label="分享碼"]').inputValue();
    ok(zlib.inflateRawSync(Buffer.from(code2.replace(/^HR1\./, '').replace(/-/g, '+').replace(/_/g, '/'), 'base64')).toString('utf8').includes('秘密想法ZZZ'), `${s.name}：勾選後分享碼才含回到自己（${code2.length} 字元）`);
    ok(code.length < 6000 && /不會上傳/.test(await p.locator('.exp-share').innerText()), '碼不超過 6000，頁面有隱私說明');
  }
  console.log(`分享碼長度：${codes.map((c) => c.length).join(', ')}`);

  // ================= #21 老師檢視 =================
  await seed(null);
  await go('view=teacher', '.teacher');
  ok(/不會上傳/.test(await p.locator('.teacher').innerText()) && /不會存檔|不存檔/.test(await p.locator('.teacher').innerText()), '老師頁寫明資料只在記憶體、不存檔');
  const link = `${base}?mode=learn&view=teacher#code=${codes[2]}`;
  await p.locator('#t-codes').fill(`${codes[0]}\n${codes[1]}  ${link}\n`);
  await p.waitForSelector('.t-table tbody tr');
  await p.waitForTimeout(500);
  ok(await p.locator('.t-table tbody tr').count() === 3, '三個碼 → 三列（含帶 #code= 的連結）');
  const rowsTxt = await p.locator('.t-table tbody tr').evaluateAll((trs) => trs.map((tr) => tr.innerText.replace(/\s+/g, ' ')));
  ok(rowsTxt[0].includes('李小華') && rowsTxt[1].includes('王小明') && rowsTxt[2].includes('陳小美'), `依座號排序：${rowsTxt.map((r) => r.slice(0, 6)).join(' | ')}`);
  const heads = await p.locator('.t-table thead th').allInnerTexts();
  const colOf = (re) => heads.findIndex((h) => re.test(h));
  const srcCol = colOf(new RegExp(`第 ${srcI + 1} 步・史料判讀`)), chainCol = colOf(new RegExp(`第 ${chainI + 1} 步・因果鏈$`));
  const cellOf = async (r, c) => (await p.locator('.t-table tbody tr').nth(r).locator('td, th').nth(c).innerText()).replace(/\s+/g, '');
  ok(srcCol > 3 && await cellOf(1, srcCol) === '✔1' && await cellOf(0, srcCol) === '✘2' && await cellOf(2, srcCol) === '✘2', `史料欄：王✔1、李✘2、陳✘2（${await cellOf(1, srcCol)},${await cellOf(0, srcCol)},${await cellOf(2, srcCol)}）`);
  ok(await cellOf(0, chainCol) === '✘2' && await cellOf(1, chainCol) === '✔1', '因果鏈欄：李✘2、王✔1');
  const foot = (await p.locator('.t-table tfoot tr').innerText()).replace(/\s+/g, ' ');
  const lowCells = await p.locator('.t-table tfoot td.t-low').count();
  const lowIdx = await p.locator('.t-table tfoot td').evaluateAll((tds) => tds.findIndex((t) => t.classList.contains('t-low')));
  ok(/1／3/.test(await p.locator('.t-table tfoot td').nth(srcCol - 4).innerText()) && /33%/.test(await p.locator('.t-table tfoot td').nth(srcCol - 4).innerText()), '史料題第一次答對率 1／3（33%）');
  ok(lowCells === 1 && lowIdx === srcCol - 4, `答對率最低的只標出史料題（標出 ${lowCells} 欄）`);
  ok(/答對率最低的題目/.test(await p.locator('.t-lowline').innerText()) && (await p.locator('.t-lowline').innerText()).includes(`第 ${srcI + 1} 步`), '表下方列出最低題目');
  const chkCol = colOf(new RegExp(`第 ${checkI + 1} 步・自我檢查 ${choiceJ + 1}$`));
  ok(/2／3/.test(await p.locator('.t-table tfoot td').nth(chkCol - 4).innerText()), '自我檢查那題 2／3');
  // 開放題展開
  const cmpCol = colOf(new RegExp(`第 ${cmpI + 1} 步・觀點比較`));
  const open0 = p.locator('.t-table tbody tr').nth(1).locator('td').nth(cmpCol).locator('details');
  ok(/字$/.test((await open0.locator('summary').innerText()).trim()), '開放題格子顯示字數');
  await open0.locator('summary').click();
  ok((await open0.innerText()).includes('王小明寫的第'), '開放題可展開全文');
  // 逐題看全班
  const tq = p.locator('.t-class details', { hasText: '掩卷自思' }).first();
  await tq.locator('summary').click();
  const tqt = await tq.innerText();
  ok(['王小明', '李小華', '陳小美'].every((n) => tqt.includes(n)) && tqt.includes('3／3'), '逐題看全班：掩卷自思三人的回答排在一起');
  ok(!(await p.locator('.teacher').innerText()).includes('秘密想法ZZZ'), '老師頁沒有「回到自己」');
  await p.screenshot({ path: path.join(SHOTS, 'teacher-view.png'), fullPage: true });
  // CSV
  const [dl] = await Promise.all([p.waitForEvent('download'), p.getByRole('button', { name: /下載 CSV/ }).click()]);
  const csv = fs.readFileSync(await dl.path(), 'utf8');
  ok(csv.charCodeAt(0) === 0xfeff && csv.slice(1).split('\r\n')[0].startsWith('"課名","班級","座號","姓名"'), 'CSV 有 BOM 與標題列');
  const lines = csv.split('\r\n').slice(1).filter(Boolean);
  const parse = (l) => [...l.matchAll(/"((?:[^"]|"")*)"/g)].map((m) => m[1].replace(/""/g, '"'));
  const recs = lines.map(parse);
  const li = recs.find((r) => r[3] === '李小華' && r[6].startsWith(`第 ${srcI + 1} 步・史料判讀`));
  ok(li && li[9] === '錯' && li[10] === '對' && li[11] === '2' && li[0] === U.title && li[2] === '1', `CSV：李小華的史料題 第一次錯、最後對、2 次（${li?.slice(9, 12)}）`);
  ok(recs.filter((r) => r[3] === '王小明').every((r) => r[9] !== '錯'), 'CSV：王小明沒有答錯的列');
  ok(recs.some((r) => r[3] === '陳小美' && r[8] === '開放題' && r[12].includes('陳小美寫的第')), 'CSV：開放題帶全文');
  ok(recs.length === 3 * (await p.locator('.t-table thead th').count() - 4 + 1 + (steps.filter((s) => s.type === 'decision').length) - 0) || recs.length > 60, `CSV 共 ${recs.length} 列`);
  await p.emulateMedia({ media: 'print' }); await p.screenshot({ path: path.join(SHOTS, 'teacher-view-print.png'), fullPage: true }); await p.emulateMedia({ media: 'screen' });
  // 壞碼
  await p.locator('#t-codes').fill(`${codes[0]}\nHR1.@@@@\nabcdef\n${codes[1].slice(0, 40)}\nHR1u.eyJ2IjoyfQ`);
  await p.waitForSelector('.t-errors');
  await p.waitForTimeout(400);
  const errTxt = await p.locator('.t-errors').first().innerText();
  ok(/第 2 個碼/.test(errTxt) && /第 3 個碼/.test(errTxt) && /第 4 個碼/.test(errTxt) && /第 5 個碼/.test(errTxt) && !/第 1 個碼/.test(errTxt), `壞碼：指出第 2、3、4、5 個，第 1 個沒事\n${errTxt}`);
  ok(await p.locator('.t-table tbody tr').count() === 1, '好的碼仍然顯示（1 列）');
  // 手機不壞版
  const m = await b.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
  const mp = await m.newPage();
  await mp.goto(`${base}?mode=learn`, { waitUntil: 'domcontentloaded' });
  await mp.goto(`${base}?mode=learn&view=teacher#code=${codes[0]}`, { waitUntil: 'networkidle' });
  await mp.waitForSelector('.t-table tbody tr');
  ok(await mp.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), '老師頁手機寬度沒有橫向捲動');
  ok(!(await mp.evaluate(() => location.hash)), '讀完後網址的 #code= 被拿掉');
  await mp.screenshot({ path: path.join(SHOTS, 'teacher-mobile.png') });
  await mp.goto(`${base}?mode=learn&view=record`, { waitUntil: 'networkidle' });
  ok(await mp.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), '紀錄頁手機寬度沒有橫向捲動');
  await m.close();

  // ================= #23 備份／清除／還原 =================
  await seed({ ...S[1].prog, history: 'world' });
  await go('view=record', '#backup');
  const before = await store();
  const [dl2] = await Promise.all([p.waitForEvent('download'), p.getByRole('button', { name: /備份進度（下載/ }).click()]);
  const bkPath = await dl2.path();
  const bk = JSON.parse(fs.readFileSync(bkPath, 'utf8'));
  ok(bk.app === 'history-river-learn' && bk.data.units[UNIT], `備份檔 ${dl2.suggestedFilename()} 含進度`);
  await p.getByRole('button', { name: /產生備份碼/ }).click();
  const bcode = await p.locator('textarea[aria-label="備份碼"]').inputValue();
  ok(bcode.startsWith('HRB1.'), `備份碼 ${bcode.length} 字元`);
  // 清除：要打字
  await p.locator('#notme summary').click();
  const clear = p.getByRole('button', { name: /清除這台的全部紀錄/ });
  ok(await clear.isDisabled(), '沒打字之前「清除」按鈕不能按');
  await p.locator('.notme-in input').fill('清'); ok(await clear.isDisabled(), '只打一個字還是不能按');
  await p.locator('.notme-in input').fill('清除'); await clear.click(); await p.waitForTimeout(500);
  const cleared = await store();
  ok(Object.keys(cleared.units ?? {}).length === 0 && !cleared.profile?.name, '清除後進度與姓名都空了');
  // 用檔案還原
  await go('view=record', '#backup');
  await p.locator('input[type=file]').setInputFiles(bkPath);
  await p.waitForSelector('.restore-plan');
  const plan = await p.locator('.restore-plan').innerText();
  ok(/新增 1 課/.test(plan) && plan.includes(U.title), `還原前預覽：${plan.replace(/\s+/g, ' ').slice(0, 80)}`);
  ok(Object.keys((await store()).units ?? {}).length === 0, '按確認之前沒有動到進度');
  await p.getByRole('button', { name: '確認還原' }).click(); await p.waitForTimeout(400);
  const after = await store();
  ok(JSON.stringify(after.units) === JSON.stringify(before.units) && after.profile.name === '李小華' && Object.keys(after.cards).length === Object.keys(before.cards).length, '用檔案還原後進度與備份前完全一致');
  // 合併規則：現有較新的不被蓋掉；備份較新的取代
  const newer = JSON.parse(JSON.stringify(before)); newer.units[UNIT].lastAt = '2030-01-01'; newer.units[UNIT].time = 1;
  await p.evaluate(([k, v]) => localStorage.setItem(k, JSON.stringify(v)), [KEY, newer]);
  await go('view=record', '#backup');
  await p.locator('textarea[aria-label="貼上備份碼"]').fill(bcode);
  await p.waitForSelector('.restore-plan');
  ok(/這台比較新、保留不動 1 課/.test((await p.locator('.restore-plan').innerText()).replace(/\s+/g, ' ')), '現有進度比較新 → 保留不動');
  await p.getByRole('button', { name: '確認還原' }).click(); await p.waitForTimeout(300);
  ok((await store()).units[UNIT].time === 1, '合併後較新的那份沒被備份蓋掉');
  const older = JSON.parse(JSON.stringify(before)); older.units[UNIT].lastAt = '2020-01-01'; older.units[UNIT].time = 2;
  await p.evaluate(([k, v]) => localStorage.setItem(k, JSON.stringify(v)), [KEY, older]);
  await go('view=record', '#backup');
  await p.locator('textarea[aria-label="貼上備份碼"]').fill(bcode);
  await p.waitForSelector('.restore-plan');
  await p.getByRole('button', { name: '確認還原' }).click(); await p.waitForTimeout(300);
  ok((await store()).units[UNIT].time === before.units[UNIT].time, '備份比較新 → 取代這台較舊的那份（用備份碼）');
  await p.locator('textarea[aria-label="貼上備份碼"]').fill('HRB1.亂寫');
  await p.waitForSelector('.t-errors');
  ok(/讀不懂這份備份/.test(await p.locator('.backup .t-errors').innerText()), '壞備份碼有明確訊息');
  await p.locator('textarea[aria-label="貼上備份碼"]').fill('{"hello":1}');
  await p.waitForTimeout(300);
  ok(/沒有學習進度/.test(await p.locator('.backup .t-errors').innerText()), '不是進度的 JSON 有明確訊息');
  await p.screenshot({ path: path.join(SHOTS, 'teacher-backup.png'), fullPage: true });

  ok(errs.length === 0, `沒有 JS 錯誤${errs.length ? '：' + errs.slice(0, 3).join(' | ') : ''}`);
  await b.close();
  console.log(fail ? `\n${fail} 項失敗` : '\n全部通過');
  process.exit(fail ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
