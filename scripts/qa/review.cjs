// node review.cjs http://localhost:4183/  → #22 今天的 3 分鐘複習＋段考複習（2026-11-15 第 3 批）
//  (1) 全新使用者首頁沒有複習卡  (2) 昨天完成的課 → 卡片 → 做完 → 「今天複習完了」，答錯優先出  (3) 答錯的題隔天再出現
//  (4) 1→3→7→21 天排程、畢業  (5) 段考複習：勾兩課、結果與錯題清單、再做一次、&units= 預先勾選、不動 r 紀錄、答錯進複習
//  (6) 舊進度（沒有 review 欄位）不壞  (7) 瀏覽器上一頁回首頁  (8) 按「完成這一課」時排進複習  (9) 一天最多 6 題、同一課最多 3 題
// 「過了一天」用把進度裡所有日期往前挪來模擬（不改 Date）。截圖放 process.env.SHOTS（預設 docs/screenshots）
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const KEY = 'history-river-learn-v1';
const UA = 'unit-rome-fall', UB = 'unit-athens-sparta';
const SHOTS = process.env.SHOTS || 'docs/screenshots';
const pad = (n) => String(n).padStart(2, '0');
const ymd = (off = 0) => { const d = new Date(); d.setDate(d.getDate() + off); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; };

(async () => {
  const base = process.argv[2];
  fs.mkdirSync(SHOTS, { recursive: true });
  let fail = 0;
  const ok = (cond, msg) => { console.log(`${cond ? '✓' : '✗'} ${msg}`); if (!cond) fail++; };
  const errs = [];
  const idxJson = await (await fetch(`${base}index.json`)).json();
  const load = async (id) => { const j = await (await fetch(`${base}data/units/${id}.json`)).json(); return { ...idxJson.units.find((x) => x.id === id), ...j.unit }; };
  const A = await load(UA), B = await load(UB);
  // 和 src/learn/review.ts questionsOf 一樣的規則（測試自己再寫一次，不 import 程式）
  const qsOf = (U) => {
    const out = [];
    U.steps.forEach((s, i) => {
      if (s.type === 'card') (s.quick ?? []).forEach((x, j) => out.push({ key: `qk${i}_${j}`, step: i, kind: 'quick', q: x.q, a: x.a }));
      if (s.type === 'source') { if (s.options) out.push({ key: `s${i}`, step: i, kind: 'choice', q: s.question, options: s.options, answer: s.answer }); if (s.critique && typeof s.critique === 'object') out.push({ key: `s${i}k`, step: i, kind: 'choice', q: s.critique.question, options: s.critique.options, answer: s.critique.answer }); }
      if (s.type === 'chain') { out.push({ key: `o${i}`, step: i, kind: 'order', q: s.prompt, items: s.items }); if (s.followup && typeof s.followup === 'object') out.push({ key: `o${i}f`, step: i, kind: 'choice', q: s.followup.question, options: s.followup.options, answer: s.followup.answer }); }
      if (s.type === 'check') s.items.forEach((x, j) => { if (x.kind === 'choice') out.push({ key: `c${i}_${j}`, step: i, kind: 'choice', q: x.q, options: x.options, answer: x.answer }); if (x.kind === 'order') out.push({ key: `c${i}_${j}`, step: i, kind: 'order', q: x.q, items: x.items }); });
    });
    return out;
  };
  const byText = new Map();
  for (const U of [A, B]) for (const q of qsOf(U)) byText.set(q.q.trim(), { ...q, unit: U.id });
  const qA = qsOf(A);
  const firstChoice = qA.find((q) => q.key.startsWith('c') && q.kind === 'choice');
  console.log(`${UA}：${qA.length} 題（選擇 ${qA.filter((q) => q.kind === 'choice').length}、排序 ${qA.filter((q) => q.kind === 'order').length}、小題 ${qA.filter((q) => q.kind === 'quick').length}）`);

  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 } });
  const p = await ctx.newPage();
  p.on('pageerror', (e) => errs.push(String(e)));
  p.on('console', (m) => { if (m.type() === 'error' && !/tile|favicon|ERR_TUNNEL|ERR_NAME|ERR_PROXY|openfreemap|Failed to load resource/.test(m.text())) errs.push(m.text()); });
  const seed = async (prog) => { // 用沒有 React 的靜態頁改 localStorage
    await p.goto(`${base}credits.html`, { waitUntil: 'domcontentloaded' });
    await p.evaluate(([k, v]) => { localStorage.clear(); if (v) localStorage.setItem(k, JSON.stringify(v)); }, [KEY, prog ?? null]);
  };
  const store = () => p.evaluate((k) => JSON.parse(localStorage.getItem(k) || '{}'), KEY);
  const go = async (q, sel) => { await p.goto(`${base}?mode=learn${q ? '&' + q : ''}`, { waitUntil: 'networkidle' }); if (sel) await p.waitForSelector(sel, { timeout: 15000 }); await closeIntro(); };
  const closeIntro = async () => { const i = p.locator('.intro button.btn.primary'); if (await i.count()) await i.click(); };
  const doneUnit = (U, doneAt, answers = {}) => ({ step: U.steps.length - 1, done: true, doneAt, lastAt: doneAt, answers, seen: U.steps.map((_, i) => i) });
  // 過了 n 天：進度裡的日期全部往前挪
  const shiftDay = async (n) => {
    const st = await store();
    const sh = (d) => { if (typeof d !== 'string' || !/^\d{4}-\d\d-\d\d$/.test(d)) return d; const x = new Date(`${d}T00:00:00Z`); x.setUTCDate(x.getUTCDate() - n); return x.toISOString().slice(0, 10); };
    for (const u of Object.values(st.units ?? {})) { u.doneAt = sh(u.doneAt); u.lastAt = sh(u.lastAt); }
    for (const r of Object.values(st.review ?? {})) { r.due = sh(r.due); r.last = sh(r.last); }
    if (st.reviewDays) st.reviewDays = st.reviewDays.map(sh);
    await seed(st);
  };
  // 答目前這一題（ok＝要答對還是答錯），回傳那一題的資料。不點「下一題」
  const answer = async (ok) => {
    await p.waitForSelector('.rq .q');
    const t = (await p.locator('.rq .q').first().innerText()).trim();
    const q = byText.get(t);
    if (!q) throw new Error(`認不得這一題：${t.slice(0, 40)}`);
    if (q.kind === 'choice') {
      const texts = await p.locator('.rq .opt').evaluateAll((els) => els.map((e) => e.innerText.replace(/^[A-F]\s*/, '').trim()));
      const want = ok ? q.options[q.answer] : q.options.find((_, i) => i !== q.answer);
      await p.locator('.rq .opt').nth(texts.indexOf(want.trim())).click();
    } else if (q.kind === 'order') {
      const items = ok ? q.items : [...q.items].reverse();
      for (const it of items) await p.locator('.pool .pitem .opt', { hasText: it }).filter({ hasText: new RegExp(`^${it.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`) }).first().click();
      await p.getByRole('button', { name: '對答案' }).click();
    } else {
      await p.getByRole('button', { name: '想好了，看答案' }).click();
      await p.getByRole('button', { name: ok ? '答對' : '沒答對', exact: true }).click();
    }
    await p.waitForSelector('.rq-next');
    return q;
  };
  const next = async () => { await p.locator('.rq-next button').click(); await p.waitForTimeout(150); };
  const head = () => p.locator('.rq-head').innerText().then((t) => t.replace(/\s+/g, ' '));
  const home = () => p.locator('.lhome').innerText().then((t) => t.replace(/\s+/g, ' '));

  // ================= (1) 全新使用者 =================
  await seed(null); await go('', '.lhome');
  ok(await p.locator('.home-review, .home-review-done').count() === 0, '(1) 全新使用者：首頁沒有複習卡、也沒有「今天沒有要複習的」');
  ok(!/3 分鐘複習/.test(await home()), '(1) 首頁文字沒有「3 分鐘複習」');

  // ================= (6) 舊進度 =================
  await seed({ units: { [UA]: { step: 3, done: false, lastAt: ymd(-3) }, [UB]: { step: 12, done: true, answers: { 'c5_0': true } } }, cards: {}, history: 'taiwan', fontScale: 1.2 });
  await go('', '.lhome');
  ok(await p.locator('.home-review').count() === 0, '(6) 舊進度（沒有 review 欄位、沒有 doneAt）：首頁正常，沒有複習卡');
  await go('view=review', '.review-page');
  await p.waitForTimeout(500);
  ok(/今天沒有要複習的/.test(await p.locator('.review-page').innerText()), '(6) 舊進度打開複習頁：不壞，顯示今天沒有要複習的');
  await go('view=exam', '.exam-page');
  ok(await p.locator('.exam-list li').count() === idxJson.units.length, `(6) 舊進度打開段考頁：列出全部 ${idxJson.units.length} 課`);
  const st6 = await store();
  ok(!st6.review && st6.fontScale === 1.2 && st6.history === 'taiwan', '(6) 舊進度的其他欄位原封不動');

  // ================= (2) 昨天完成的課 → 複習卡 → 做完 =================
  // 第一題（自我檢查選擇）第一次就答錯 → 應該排在最前面
  const bad = firstChoice;
  await seed({ units: { [UA]: doneUnit(A, ymd(-1), { [`r:${bad.key}`]: { f: false, l: true, n: 2, p: bad.answer } }) }, cards: {} });
  await go('', '.lhome');
  ok(await p.locator('.home-review').count() === 1 && /有 1 課該複習了/.test(await p.locator('.home-review').innerText()), '(2) 昨天完成、還沒排程的課：首頁顯示「有 1 課該複習了」');
  await p.getByRole('button', { name: /開始複習/ }).click();
  await p.waitForSelector('.rq-head');
  const st2 = await store();
  const n2 = Object.keys(st2.review ?? {}).filter((k) => k.startsWith(`${UA}:`)).length;
  ok(n2 === Math.min(6, qA.length) && st2.units[UA].rv === 1 && !!st2.review[`${UA}:${bad.key}`], `(2) 進複習頁補建排程：一課最多 6 題（${n2}／${qA.length}）、含第一次答錯的題、rv=1`);
  ok(Object.values(st2.review).every((r) => r.s === 0 && r.due === ymd(0) && r.ok === true), '(2) 補建的每題 s=0、第一次到期＝完成日＋1＝今天');
  ok(/^第 1／3 題・來自《.+》/.test(await head()), `(2) 一課最多 3 題：${await head()}`);
  ok(/view=review/.test(p.url()), '(2) 網址 view=review');
  const first = await (async () => { const t = (await p.locator('.rq .q').first().innerText()).trim(); return byText.get(t); })();
  ok(first.key === bad.key, `(2) 課內第一次答錯的題排第一：${first.key}`);
  await p.screenshot({ path: path.join(SHOTS, 'review-question-mobile.png') });
  const seen = [];
  seen.push(await answer(true));
  ok(await p.locator('.rq .feedback.ok').count() === 1 && await p.locator('.rq-link').count() === 1, '(2) 答對：顯示解析與「回這一課看」');
  await p.screenshot({ path: path.join(SHOTS, 'review-answered-mobile.png') });
  await next();
  ok(/^第 2／3 題/.test(await head()), '(2) 下一題：第 2／3 題');
  const second = await answer(false);
  seen.push(second);
  ok(await p.locator('.rq .feedback.no').count() >= 1 && /正確答案|正確順序|解析|./.test(await p.locator('.rq .feedback').first().innerText()), '(2) 答錯：顯示正解與解析');
  await next();
  seen.push(await answer(true)); await next();
  await p.waitForSelector('.rv-done');
  const done2 = (await p.locator('.rv-done').innerText()).replace(/\s+/g, ' ');
  ok(/答對 2／3 題/.test(done2) && /明天會再出現/.test(done2) && /下次複習：明天/.test(done2), `(2) 結果：${done2.slice(0, 80)}`);
  await p.screenshot({ path: path.join(SHOTS, 'review-done-mobile.png'), fullPage: true });
  const s2 = await store();
  const rv = (q) => s2.review[`${UA}:${q.key}`];
  ok(rv(seen[1]).s === 0 && rv(seen[1]).due === ymd(1) && rv(seen[1]).ok === false && rv(seen[1]).last === ymd(0), '(2)(3) 答錯的題：s 不變、明天再出、ok=false');
  ok(rv(seen[0]).s === 1 && rv(seen[0]).due === ymd(2) && rv(seen[0]).ok === true, `(2)(4) 答對的題：s=1，下次＝完成日＋3 天（${rv(seen[0]).due}）`);
  ok(s2.reviewDays.includes(ymd(0)), '(2) reviewDays 記下今天');
  ok(JSON.stringify(s2.units[UA].answers) === JSON.stringify({ [`r:${bad.key}`]: { f: false, l: true, n: 2, p: bad.answer } }), '(2) 複習不動課內的 r 紀錄');
  await p.getByRole('button', { name: '回首頁' }).click();
  await p.waitForSelector('.lhome');
  ok(/今天複習完了 ✓（答對 2／3）/.test(await home()), '(2) 回首頁：「今天複習完了 ✓（答對 2／3）」');
  ok(await p.locator('.home-review').count() === 0, '(2) 做完當天首頁沒有複習卡了');
  await go('view=review', '.rv-done');
  ok(/答對 2／3 題/.test(await p.locator('.rv-done').innerText()), '(2) 當天再開複習頁：直接顯示結果，不重做');

  // ================= (3) 隔天：答錯的再出現 =================
  await shiftDay(1);
  await go('', '.home-review');
  ok(/今天的 3 分鐘複習：3 題/.test(await p.locator('.home-review').innerText()), '(3) 隔天：「今天的 3 分鐘複習：3 題」（昨天答錯的＋昨天沒輪到的，一課最多 3 題）');
  await p.getByRole('button', { name: /開始複習/ }).click(); await p.waitForSelector('.rq-head');
  ok((await answer(false)).key === second.key, '(3) 出現的就是昨天答錯的那題');
  await next();
  while (!(await p.locator('.rv-done').count())) { await answer(true); await next(); }
  let s3 = await store();
  ok(s3.review[`${UA}:${second.key}`].s === 0 && s3.review[`${UA}:${second.key}`].due === ymd(1), '(3) 又答錯：s 還是 0，再隔天出');
  await shiftDay(1);
  await go('view=review', '.rq-head');
  // 昨天（第 1 天）答對的兩題，原本排在完成日＋3 天；加上一直答錯的那題
  ok(/^第 1／\d 題/.test(await head()), `(3) 再隔天：${await head()}`);
  const firstAgain = await answer(true);
  ok(firstAgain.key === second.key, '(3) 答錯過的題排最前面');
  await next();
  s3 = await store();
  ok(s3.review[`${UA}:${second.key}`].s === 1, '(3) 這次答對：進到下一階 s=1');

  // ================= (4) 7 天、21 天排程與畢業 =================
  const mk = (s, doneOff, dueOff, ok2 = true) => ({ units: { [UA]: { ...doneUnit(A, ymd(doneOff)), rv: 1 } }, cards: {}, review: { [`${UA}:${qA[0].key}`]: { s, due: ymd(dueOff), ok: ok2 } } });
  const runOne = async (okAns) => { await go('view=review', '.rq-head'); const q = await answer(okAns); await p.waitForSelector('.rq-next'); return q; };
  await seed(mk(1, -3, 0)); await runOne(true);
  let r = (await store()).review[`${UA}:${qA[0].key}`];
  ok(r.s === 2 && r.due === ymd(4), `(4) 第 3 天答對 → s=2，下次＝完成日＋7 天（${r.due}，應為 ${ymd(4)}）`);
  await seed(mk(2, -7, 0)); await runOne(true);
  r = (await store()).review[`${UA}:${qA[0].key}`];
  ok(r.s === 3 && r.due === ymd(14), `(4) 第 7 天答對 → s=3，下次＝完成日＋21 天（${r.due}，應為 ${ymd(14)}）`);
  await seed(mk(3, -21, 0)); await runOne(true);
  r = (await store()).review[`${UA}:${qA[0].key}`];
  ok(r.s === 4, '(4) 第 21 天答對 → 畢業（s=4）');
  await go('', '.lhome');
  ok(/今天複習完了/.test(await home()), '(4) 畢業那題做完當天：首頁顯示今天複習完了');
  await shiftDay(1); await go('', '.lhome');
  ok(await p.locator('.home-review').count() === 0 && /今天沒有要複習的/.test(await home()), '(4) 隔天：畢業的題不再出，顯示「今天沒有要複習的，明天再來」');
  await seed(mk(3, -21, 0)); await runOne(false);
  r = (await store()).review[`${UA}:${qA[0].key}`];
  ok(r.s === 3 && r.due === ymd(1) && r.ok === false, '(4) 第 21 天答錯 → s 不變、明天再出');
  await seed(mk(0, -10, -9)); await runOne(true);
  r = (await store()).review[`${UA}:${qA[0].key}`];
  ok(r.s === 1 && r.due === ymd(2), `(4) 晚了很久才做：不連續幾天都出（due ${r.due}，應為 ${ymd(2)}）`);

  // ================= (9) 一天最多 6 題、同一課最多 3 題 =================
  const bigRev = {};
  for (const U of [A, B]) qsOf(U).forEach((q) => { bigRev[`${U.id}:${q.key}`] = { s: 0, due: ymd(0), ok: true }; });
  await seed({ units: { [UA]: { ...doneUnit(A, ymd(-1)), rv: 1 }, [UB]: { ...doneUnit(B, ymd(-1)), rv: 1 } }, cards: {}, review: bigRev });
  await go('', '.home-review');
  ok(/今天的 3 分鐘複習：6 題/.test(await p.locator('.home-review').innerText()), '(9) 很多題到期：首頁顯示 6 題（上限）');
  await p.getByRole('button', { name: /開始複習/ }).click(); await p.waitForSelector('.rq-head');
  const titles = [];
  for (let i = 0; i < 6; i++) { titles.push((await head()).match(/來自《(.+?)》/)[1]); await answer(true); await next(); }
  await p.waitForSelector('.rv-done');
  ok(new Set(titles).size === 2 && titles.filter((t) => t === titles[0]).length === 3, `(9) 兩課各 3 題（同一課最多 3 題）：${titles.map((t) => t.slice(0, 4)).join('／')}`);
  const o9 = await p.locator('.rv-done').innerText();
  ok(/答對 6／6 題/.test(o9), '(9) 做了 6 題，答對 6／6');
  await go('view=review', '.rv-done');
  ok(/6／6/.test(await p.locator('.rv-done').innerText()), '(9) 同一天重開：不會再多出題');
  // 同一天重開題目相同：先看一次、不作答，離開、再看
  await seed({ units: { [UA]: { ...doneUnit(A, ymd(-1)), rv: 1 }, [UB]: { ...doneUnit(B, ymd(-1)), rv: 1 } }, cards: {}, review: bigRev });
  await go('view=review', '.rq .q'); const t1 = (await p.locator('.rq .q').first().innerText()).trim();
  await go('view=review', '.rq .q'); const t2 = (await p.locator('.rq .q').first().innerText()).trim();
  ok(t1 === t2, '(9) 同一天重開：第一題相同（用日期當亂數種子）');

  // ================= (8) 按「完成這一課」時排進複習 =================
  await seed({ units: { [UA]: { step: A.steps.length - 1, done: false, answers: {}, seen: A.steps.map((_, i) => i) } }, cards: {} });
  await go(`unit=${UA}&step=${A.steps.length}`, 'button:has-text("完成這一課")');
  await p.getByRole('button', { name: /完成這一課/ }).click(); await p.waitForTimeout(500);
  const s8 = await store();
  const k8 = Object.entries(s8.review ?? {}).filter(([k]) => k.startsWith(`${UA}:`));
  ok(k8.length === Math.min(6, qA.length) && k8.every(([, r]) => r.s === 0 && r.due === ymd(1)) && s8.units[UA].rv === 1, `(8) 完成這一課：${k8.length} 題排進複習，第一次到期＝明天`);
  await go('', '.lhome');
  ok(await p.locator('.home-review').count() === 0 && /今天沒有要複習的/.test(await home()), '(8) 完成當天：首頁只說今天沒有要複習的');
  await shiftDay(1); await go('', '.home-review');
  ok(/今天的 3 分鐘複習：3 題/.test(await p.locator('.home-review').innerText()), '(8) 隔天：首頁顯示 3 題（不用載任何題目內容就知道）');

  // 首頁不為複習卡多抓檔：只看 data/units 請求
  await seed({ units: { [UA]: { ...doneUnit(A, ymd(-1)), rv: 1 } }, cards: {}, review: { [`${UA}:${qA[0].key}`]: { s: 0, due: ymd(0), ok: true } } });
  const reqs = [];
  const onReq = (rq) => { if (/data\/units\/|data\/cards\//.test(rq.url())) reqs.push(rq.url()); };
  p.on('request', onReq);
  await go('', '.home-review');
  p.off('request', onReq);
  ok(reqs.length === 0, `(8) 首頁出現複習卡時沒有抓任何單元／卡片檔（${reqs.length}）`);

  // ================= (7) 瀏覽器上一頁 =================
  await p.getByRole('button', { name: /開始複習/ }).click(); await p.waitForSelector('.rq-head');
  ok(/view=review/.test(p.url()), '(7) 首頁 → 複習：網址 view=review');
  await p.goBack(); await p.waitForSelector('.lhome');
  ok(!/view=/.test(p.url()) && await p.locator('.home-review').count() === 1, '(7) 瀏覽器上一頁 → 回到首頁（卡片還在）');
  await p.goForward(); await p.waitForSelector('.rq-head');
  ok(/view=review/.test(p.url()), '(7) 下一頁 → 又回到複習');
  await p.goBack(); await p.waitForSelector('.lhome');
  await p.locator('.home-review .link').click(); await p.waitForSelector('.exam-page');
  ok(/view=exam/.test(p.url()), '(7) 首頁卡片的「段考複習」→ view=exam');
  await p.goBack(); await p.waitForSelector('.lhome');
  ok(!/view=/.test(p.url()), '(7) 段考頁上一頁 → 回首頁');

  // ================= (5) 段考複習 =================
  const doneBoth = { units: { [UA]: { ...doneUnit(A, ymd(-5), { [`r:${qA[0].key}`]: { f: true, l: true, n: 1 } }), rv: 1 }, [UB]: { ...doneUnit(B, ymd(-5)), rv: 1 } }, cards: {} };
  await seed(doneBoth); await go('', '.lhome');
  await p.getByRole('button', { name: /看全部/ }).click(); await p.waitForSelector('.lists-page');
  await p.getByRole('button', { name: /段考複習/ }).click(); await p.waitForSelector('.exam-page');
  ok(/view=exam/.test(p.url()), '(5) 「全部的課」頁有「📝 段考複習」鈕');
  const checked = await p.locator('.exam-list input:checked').count();
  ok(checked === 2, `(5) 做過的 2 課預設勾選（勾了 ${checked}）`);
  const firstRows = await p.locator('.exam-list li b').evaluateAll((els) => els.slice(0, 2).map((e) => e.innerText));
  ok(firstRows.includes(A.title) && firstRows.includes(B.title), '(5) 做過的課排在最前面');
  const tapH = await p.locator('.exam-list label').first().evaluate((e) => e.getBoundingClientRect().height);
  ok(tapH >= 40, `(5) 每一列可點範圍高 ${Math.round(tapH)}px ≥ 40`);
  await p.getByRole('button', { name: '10 題' }).click();
  await p.screenshot({ path: path.join(SHOTS, 'exam-pick-mobile.png') });
  const before5 = await store();
  await p.getByRole('button', { name: /^開始/ }).click(); await p.waitForSelector('.rq-head');
  ok(/^第 1／10 題/.test(await head()), `(5) 抽 10 題（兩課共有 ${qsOf(A).concat(qsOf(B)).filter((q) => q.kind !== 'quick').length} 題可抽）：${await head()}`);
  const seenU = new Set(); let wrong5 = 0; const wrongKeys = [];
  for (let i = 0; i < 10; i++) {
    seenU.add((await head()).match(/來自《(.+?)》/)[1]);
    const okAns = ![2, 5, 8].includes(i); // 第 3、6、9 題故意答錯
    const q = await answer(okAns);
    if (!okAns) { wrong5++; wrongKeys.push(`${q.unit}:${q.key}`); }
    if (i === 2) await p.screenshot({ path: path.join(SHOTS, 'exam-wrong-mobile.png') });
    await next();
  }
  await p.waitForSelector('.exam-wrong, .feedback.ok');
  const res = (await p.locator('.exam-page').innerText()).replace(/\s+/g, ' ');
  ok(seenU.size === 2, '(5) 兩課都有出到');
  ok(new RegExp(`答對 ${10 - wrong5}／10 題（${Math.round(((10 - wrong5) / 10) * 100)}%）`).test(res), `(5) 答對率：${res.match(/答對 \d+／10 題（\d+%）/)?.[0]}`);
  ok(await p.locator('.exam-per li').count() === 2, '(5) 每一課答對幾題：兩列');
  ok(await p.locator('.exam-wrong > li').count() === wrong5 && await p.locator('.exam-wrong .rq-link').count() === wrong5, `(5) 錯題清單 ${wrong5} 題，每題有「回這一課看」`);
  ok(/正解：/.test(res), '(5) 錯題有正解與解析');
  await p.screenshot({ path: path.join(SHOTS, 'exam-result-mobile.png'), fullPage: true });
  await p.waitForTimeout(300);
  const after5 = await store();
  ok(JSON.stringify(after5.units[UA].answers) === JSON.stringify(before5.units[UA].answers) && JSON.stringify(after5.units[UB].answers) === JSON.stringify(before5.units[UB].answers), '(5) 段考不覆蓋課內的 r 紀錄');
  ok(wrongKeys.every((k) => after5.review?.[k]?.due === ymd(1) && after5.review[k].ok === false), '(5) 答錯的題加進明天的複習');
  await p.getByRole('button', { name: '把錯的再做一次' }).click(); await p.waitForSelector('.rq-head');
  ok(new RegExp(`^第 1／${wrong5} 題`).test(await head()), `(5) 把錯的再做一次：只出那 ${wrong5} 題`);
  for (let i = 0; i < wrong5; i++) { await answer(true); await next(); }
  await p.waitForSelector('.feedback.ok');
  ok(/答對 3／3 題（100%）/.test((await p.locator('.exam-page').innerText()).replace(/\s+/g, ' ')), '(5) 再做一次全對：100%，沒有錯題清單');
  // 網址帶 units
  await seed({ units: {}, cards: {} });
  await go(`view=exam&units=${UA},${UB}`, '.exam-page');
  const on = await p.locator('.exam-list input:checked').count();
  const names = await p.locator('.exam-list label.on b').allInnerTexts();
  ok(on === 2 && names.includes(A.title) && names.includes(B.title), '(5) &units= 預先勾好兩課（沒做過也可以勾）');
  await go(`view=exam&units=${UA},not-a-unit`, '.exam-page');
  ok(await p.locator('.exam-list input:checked').count() === 1, '(5) &units= 有不存在的課 id：略過');
  await p.getByRole('button', { name: /複製分享連結/ }).first().click().catch(() => {});
  await p.getByRole('button', { name: '10 題' }).click();
  await p.getByRole('button', { name: /^開始/ }).click(); await p.waitForSelector('.rq-head');
  const nA = qA.filter((q) => q.kind !== 'quick').length;
  ok(new RegExp(`^第 1／${nA} 題`).test(await head()), `(5) 沒做過的課也能出題（那一課有 ${nA} 題，不到 10 題就全出）`);
  // 只勾一課、全部題
  await seed({ units: {}, cards: {} });
  await go(`view=exam&units=${UB}`, '.exam-page');
  await p.getByRole('button', { name: '全部' }).last().click();
  await p.getByRole('button', { name: /^開始/ }).click(); await p.waitForSelector('.rq-head');
  const nB = qsOf(B).filter((q) => q.kind !== 'quick').length;
  ok(new RegExp(`^第 1／${nB} 題`).test(await head()), `(5) 選「全部」＝這一課全部 ${nB} 題（不含讀完小題）`);
  // 沒勾任何課不能開始
  await go('view=exam', '.exam-page');
  ok(await p.getByRole('button', { name: /^開始/ }).isDisabled(), '(5) 沒勾任何課：開始鈕不能按');

  // 備份還原把 review 一起帶上（走 UI 外的合併函式不好呼叫：直接看 localStorage 結構已含 review，合併規則另有單元測試）
  ok(errs.length === 0, `沒有 JS 錯誤${errs.length ? '：' + errs.slice(0, 3).join(' | ') : ''}`);
  await b.close();
  console.log(fail ? `\n${fail} 項失敗` : '\n全部通過');
  process.exit(fail ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
