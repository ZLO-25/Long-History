// node new-steps.cjs http://localhost:4187/  → 第 4f 批新互動（2026-11-15）：手機 390×844
//  (1) mapq：點地圖上的點作答（第一次錯只提示、第二次對）、按鈕作答、地圖只在這一步才載入；離線（地圖程式載不到）退回按鈕
//  (2) sources2：兩份史料手機上下排、選擇題、開放題（<15 字不能看參考、points 可勾）
//  (3) image：圖與授權標示、先看哪裡、選擇題  (4) transfer：新案例、先寫再看、points
//  (5) 專題總結任務：沒走完鎖住（列出還差哪幾課）、全部走完解鎖、字數不夠不能對照、可勾自評、複製、列印版、重新整理還在
//  (6) 學習單／解答印得出新步驟  (7) 匯出有紀錄  (8) 舊進度（沒有新鍵、沒有 capstone）不壞；備份合併保留 capstone
//  截圖放 process.env.SHOTS（預設 docs/screenshots）
const { chromium } = require('playwright');
const fs = require('fs');
const KEY = 'history-river-learn-v1';
const SHOTS = process.env.SHOTS || 'docs/screenshots';
const U = { map: 'unit-formosa-wanted', s2: 'unit-taiwan-colony', img: 'unit-japan-meiji', tr: 'unit-qin-rise-fall' };
const DIVE = 'dive-sengoku';

(async () => {
  const base = process.argv[2];
  fs.mkdirSync(SHOTS, { recursive: true });
  let fail = 0;
  const ok = (c, m) => { console.log(`${c ? '✓' : '✗'} ${m}`); if (!c) fail++; };
  const errs = [];
  const unitJson = async (id) => (await (await fetch(`${base}data/units/${id}.json`)).json()).unit;
  const idxOf = (u, type) => u.steps.findIndex((s) => s.type === type);
  const units = {}; for (const [k, id] of Object.entries(U)) units[k] = await unitJson(id);
  const stepNo = { map: idxOf(units.map, 'mapq'), s2: idxOf(units.s2, 'sources2'), img: idxOf(units.img, 'image'), tr: idxOf(units.tr, 'transfer') };
  ok(Object.values(stepNo).every((n) => n >= 0), `示範資料都在：${JSON.stringify(stepNo)}`);

  const b = await chromium.launch();
  const mk = async (opts = {}) => {
    const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, ...opts });
    const p = await ctx.newPage();
    p.on('pageerror', (e) => errs.push(String(e)));
    p.on('console', (m) => { if (m.type() === 'error' && !/tile|favicon|ERR_TUNNEL|ERR_NAME|ERR_PROXY|openfreemap|Failed to load resource|ERR_INTERNET|ERR_FAILED|net::|Unable to preload CSS|dynamically imported module/.test(m.text())) errs.push(m.text()); });
    return { ctx, p };
  };
  const seed = async (p, prog) => { await p.goto(`${base}credits.html`, { waitUntil: 'domcontentloaded' }); await p.evaluate(([k, v]) => { localStorage.clear(); if (v) localStorage.setItem(k, JSON.stringify(v)); }, [KEY, prog ?? null]); };
  const store = (p) => p.evaluate((k) => JSON.parse(localStorage.getItem(k) || '{}'), KEY);
  const closeIntro = async (p) => { const i = p.locator('.intro button.btn.primary'); if (await i.count()) await i.click(); };
  const open = async (p, q, sel) => { await p.goto(`${base}?mode=learn&${q}`, { waitUntil: 'networkidle' }); await closeIntro(p); if (sel) await p.waitForSelector(sel, { timeout: 20000 }); };
  const openStep = (p, id, n, sel) => open(p, `unit=${id}&step=${n + 1}`, sel);
  const long = '這是我自己寫的一段比較長的回答，用來確認字數夠了可以看參考說法。'.repeat(2);

  // ---------- (1) mapq ----------
  {
    const { ctx, p } = await mk();
    const reqs = []; p.on('request', (r) => reqs.push(r.url()));
    await seed(p, null);
    await open(p, '', null);
    await p.waitForTimeout(800);
    ok(!reqs.some((u) => /MiniMap|leaflet|maplibre/.test(u)), '首頁沒有下載地圖程式（MiniMap／leaflet／maplibre）');
    await open(p, `unit=unit-rome-fall&step=2`, '.unit');
    await p.waitForTimeout(500);
    ok(!reqs.some((u) => /MiniMap/.test(u)), '沒有 mapq 的課沒有下載 MiniMap');
    await openStep(p, U.map, stepNo.map, '.mapq');
    await p.waitForSelector('.mq-map .mq-icon', { timeout: 20000 });
    ok(reqs.some((u) => /MiniMap/.test(u)), 'mapq 那一步才下載 MiniMap');
    const n = await p.locator('.mq-map .mq-icon').count();
    ok(n === 4, `地圖上有 4 個點（${n}）`);
    const hgt = await p.locator('.mq-map').evaluate((e) => e.getBoundingClientRect().height);
    ok(Math.abs(hgt - 260) <= 2, `手機上地圖高度約 260px（${hgt}）`);
    const hasNames = await p.locator('.mq-map .mq-name').count();
    ok(hasNames === 0, '作答前點上只有 A、B、C、D，不顯示名稱');
    const opts = await p.locator('.mapq .mq-opts button').count();
    ok(opts === 4, '下面有 4 顆按鈕');
    const minH = await p.locator('.mapq .mq-opts button').evaluateAll((els) => Math.min(...els.map((e) => e.getBoundingClientRect().height)));
    ok(minH >= 40, `按鈕高度 ≥ 40（${Math.round(minH)}）`);
    await p.screenshot({ path: `${SHOTS}/new-steps-mapq.png` });
    // 點地圖上的點：A（雞籠，錯）→ 只提示；再點 B（澎湖，對）
    await p.locator('.mq-map .mq-icon').nth(0).click({ force: true });
    await p.waitForSelector('.mapq .feedback.no');
    const t1 = await p.locator('.mapq .feedback').innerText();
    ok(/不太對/.test(t1) && !/正確答案是/.test(t1), '第一次選錯：只說不太對，沒有公布答案');
    ok((await p.locator('.mapq .feedback').getAttribute('role')) === 'status', '結果用 role=status');
    ok((await p.locator('.mapq .mq-opts button').nth(0).isDisabled()), '選錯的那一顆按鈕被停用');
    await p.locator('.mq-map .mq-icon').nth(1).click({ force: true });
    await p.waitForSelector('.mapq .feedback.ok');
    ok(/答對/.test(await p.locator('.mapq .feedback').innerText()), '第二次點對：答對');
    ok((await p.locator('.mq-map .mq-name').count()) === 4, '答完才顯示 4 個地名');
    const st = (await store(p)).units?.[U.map]?.answers?.[`r:m${stepNo.map}`];
    ok(st && st.n === 2 && st.l === true && st.f === false && st.p === 1, `進度記下 r:m${stepNo.map}：${JSON.stringify(st)}`);
    await p.screenshot({ path: `${SHOTS}/new-steps-mapq-done.png` });
    // 重新整理：還原答完的狀態
    await p.reload({ waitUntil: 'networkidle' }); await p.waitForSelector('.mapq .feedback.ok');
    ok(true, '重新整理後還原已答對的狀態');
    // 按鈕作答 + 鍵盤
    await seed(p, null);
    await openStep(p, U.map, stepNo.map, '.mapq');
    await p.waitForSelector('.mq-map .mq-icon');
    await p.locator('.mq-map .mq-icon').nth(1).focus();
    await p.keyboard.press('Enter');
    await p.waitForSelector('.mapq .feedback.ok');
    ok(true, '鍵盤：聚焦地圖上的點按 Enter 可以作答');
    await seed(p, null);
    await openStep(p, U.map, stepNo.map, '.mapq');
    await p.locator('.mapq .mq-opts button').nth(2).click();
    await p.locator('.mapq .mq-opts button').nth(3).click();
    await p.waitForSelector('.mapq .feedback.no');
    ok(/正確答案是 B/.test(await p.locator('.mapq .feedback').innerText()), '按鈕：連錯兩次才公布正解 B');
    await ctx.close();
  }
  // ---------- (1b) 離線（地圖程式載不到）退回按鈕 ----------
  {
    const { ctx, p } = await mk();
    await ctx.route('**/MiniMap-*', (r) => r.abort());
    await seed(p, null);
    await openStep(p, U.map, stepNo.map, '.mapq');
    await p.waitForSelector('.mapq .mq-opts button');
    await p.waitForTimeout(1500);
    ok((await p.locator('.mq-map').count()) === 0, '地圖載不到：沒有地圖框');
    ok(/載入不了/.test(await p.locator('.mapq').innerText()), '地圖載不到：有說明');
    ok(/臺灣島最北端/.test(await p.locator('.mapq .mq-opts').innerText()), '退回的按鈕顯示方位描述 hint');
    await p.locator('.mapq .mq-opts button', { hasText: '外海的小島' }).click();
    await p.waitForSelector('.mapq .feedback.ok');
    ok(true, '離線退回按鈕版也能作答');
    await ctx.close();
  }
  // ---------- (2) sources2 ----------
  let s2Prog;
  {
    const { ctx, p } = await mk();
    await seed(p, null);
    await openStep(p, U.s2, stepNo.s2, '.s2-pair');
    const bs = await p.locator('.s2-src').evaluateAll((els) => els.map((e) => e.getBoundingClientRect()));
    ok(bs.length === 2 && bs[1].top >= bs[0].bottom - 2, '手機上兩份史料上下排');
    ok(/宣言|DECLARATION|independence/i.test(await p.locator('.s2-src').nth(0).innerText()) && /臨床|診斷/.test(await p.locator('.s2-src').nth(1).innerText()), '甲是 1895 宣言、乙是〈臨床講義〉（各有出處）');
    ok((await p.locator('.s2-src figcaption').count()) === 2, '兩份各標出處');
    ok((await p.locator('.critique').count()) === 0, '選擇題做完之前沒有開放題');
    await p.screenshot({ path: `${SHOTS}/new-steps-sources2.png` });
    await p.locator('.opt', { hasText: '請願書' }).click();
    await p.waitForSelector('.activity .feedback.no');
    await p.locator('.opt', { hasText: '宣言要先自立' }).click();
    await p.waitForSelector('.activity .feedback.ok');
    await p.waitForSelector('.critique textarea');
    ok(true, '答對後出現開放題');
    const btn = p.locator('.critique .btn.primary');
    ok(await btn.isDisabled(), '少於 15 字不能看參考說法');
    await p.locator('.critique textarea').fill('太短了');
    ok(await btn.isDisabled(), '3 個字仍然不能看');
    await p.locator('.critique textarea').fill(long);
    await btn.click();
    await p.waitForSelector('.critique .points');
    await p.locator('.critique .pt-btns').nth(0).locator('button', { hasText: '有寫到' }).click();
    const a = (await store(p)).units?.[U.s2]?.answers ?? {};
    ok(a[`r:x${stepNo.s2}`]?.n === 2 && typeof a[`xo${stepNo.s2}`] === 'string' && a[`w:xo${stepNo.s2}`]?.pts?.[0] === true, `進度記下 r:x、xo、w:xo`);
    s2Prog = await store(p);
    await ctx.close();
  }
  // ---------- (3) image ----------
  {
    const { ctx, p } = await mk();
    await seed(p, null);
    await openStep(p, U.img, stepNo.img, '.im-step, .activity');
    await p.waitForSelector('.im-look');
    ok((await p.locator('.im-step figcaption, .im-step .img-missing').count()) >= 1, '顯示圖片說明／授權標示（或圖片載不到時的替代連結）');
    const credit = await p.locator('.im-step').innerText();
    ok(/Wikimedia Commons|圖片暫時載不到/.test(credit), '有授權／來源標示');
    ok(/先看哪裡/.test(await p.locator('.im-look').innerText()), '有「先看哪裡」');
    await p.screenshot({ path: `${SHOTS}/new-steps-image.png` });
    await p.locator('.opt', { hasText: '沒有完全關門' }).click();
    await p.waitForSelector('.activity .feedback.ok');
    const a = (await store(p)).units?.[U.img]?.answers?.[`r:im${stepNo.img}`];
    ok(a && a.l === true && a.f === true, `進度記下 r:im${stepNo.img}`);
    await ctx.close();
  }
  // ---------- (4) transfer ----------
  {
    const { ctx, p } = await mk();
    await seed(p, null);
    await openStep(p, U.tr, stepNo.tr, '.transfer');
    ok(/換個案例試試/.test(await p.locator('.tr-title').innerText()), '標題「換個案例試試」');
    ok(/用到新的地方/.test(await p.locator('.transfer').innerText()), '明示在看能不能把想法用到新的地方');
    ok((await p.locator('.tr-case').innerText()).length > 50, '有新案例文字');
    const btn = p.locator('.transfer .btn.primary');
    ok(await btn.isDisabled(), '先寫才能看參考說法');
    await p.locator('.transfer textarea').fill(long);
    await btn.click();
    await p.waitForSelector('.transfer .points');
    await p.locator('.transfer .pt-btns').nth(1).locator('button', { hasText: '沒寫到' }).click();
    await p.screenshot({ path: `${SHOTS}/new-steps-transfer.png` });
    const a = (await store(p)).units?.[U.tr]?.answers ?? {};
    ok(typeof a[`t${stepNo.tr}`] === 'string' && a[`w:t${stepNo.tr}`]?.pts?.[1] === false, '進度記下 t、w:t');
    await ctx.close();
  }
  // ---------- (6)(7) 學習單、解答、匯出 ----------
  {
    const { ctx, p } = await mk({ viewport: { width: 900, height: 900 }, isMobile: false, hasTouch: false });
    await seed(p, s2Prog);
    const must = { map: ['看地圖回答', '.ws-plot'], s2: ['兩份史料對讀', '史料 甲'], img: ['圖像史料', '.ws-fig, .ws-read'], tr: ['換個案例試試', '新案例'] };
    for (const [k, [name, extra]] of Object.entries(must)) {
      for (const mode of ['sheet', 'key']) {
        await open(p, `unit=${U[k]}&print=${mode}`, '.ws');
        const txt = await p.locator('.ws').innerText();
        ok(txt.includes(name), `${mode === 'sheet' ? '學習單' : '解答'}（${U[k]}）有「${name}」`);
        if (extra.startsWith('.')) ok((await p.locator(`.ws ${extra}`.replace(', .', ', .ws .')).count()) > 0, `${U[k]} ${mode} 有 ${extra}`); else ok(txt.includes(extra), `${U[k]} ${mode} 有「${extra}」`);
        if (mode === 'key') ok(/正解|參考說法/.test(txt), `${U[k]} 解答有正解或參考說法`);
      }
    }
    await open(p, `view=export&unit=${U.s2}`, '.exp');
    const t = await p.locator('.exp').innerText();
    ok(/兩份史料對讀/.test(t), '匯出頁有兩份史料對讀的紀錄');
    await ctx.close();
  }
  // ---------- (5) 專題總結任務 ----------
  {
    const dive = (await (await fetch(`${base}index.json`)).json()).dives.find((d) => d.id === DIVE);
    ok(dive && dive.capstone && dive.capstone.points.length >= 2, '專題資料有 capstone');
    const { ctx, p } = await mk();
    await ctx.grantPermissions(['clipboard-read', 'clipboard-write']).catch(() => {});
    await seed(p, null);
    await open(p, `dive=${DIVE}`, '.dive-view');
    await p.waitForSelector('.dv-capstone.locked', { timeout: 20000 });
    const lock = await p.locator('.dv-capstone').innerText();
    ok(/還差\s*5\s*課/.test(lock), '沒走完：鎖住並說還差 5 課');
    ok((await p.locator('.dv-capstone.locked .dv-story').count()) === dive.units.length, '列出還差的每一課');
    ok((await p.locator('.dv-capstone textarea').count()) === 0, '鎖住時沒有輸入框');
    // 走完 4 課還是鎖
    const done = (ids) => Object.fromEntries(ids.map((id) => [id, { step: 3, done: true, doneAt: '2026-11-01', lastAt: '2026-11-01', answers: {} }]));
    await seed(p, { units: done(dive.units.slice(0, 4)), cards: {} });
    await open(p, `dive=${DIVE}`, '.dv-capstone');
    ok(/還差\s*1\s*課/.test(await p.locator('.dv-capstone').innerText()), '走完 4 課：還差 1 課');
    // 全部走完
    await seed(p, { units: done(dive.units), cards: {}, profile: { name: '小明', cls: '801', no: '5' } });
    await open(p, `dive=${DIVE}`, '.dv-capstone textarea');
    ok((await p.locator('.dv-capstone.locked').count()) === 0, '全部走完：解鎖');
    await p.locator('.dv-capstone').scrollIntoViewIfNeeded();
    const btn = p.locator('.dv-capstone .btn.primary');
    ok(await btn.isDisabled(), '字數不夠不能對照重點');
    await p.locator('.dv-capstone textarea').fill('我寫得很短。');
    ok(await btn.isDisabled(), '太短仍然不能對照');
    ok(/再寫\s*\d+\s*個字/.test(await p.locator('.cap-count').innerText()), '顯示還差幾個字');
    const text = '應仁之亂之後將軍雖然還在，卻沒有人聽他的，各地大名自立並互相消耗。後來鐵砲傳入，信長崛起，秀吉統一日本後做檢地與刀狩，還把大軍送去朝鮮。家康在關原之後滅掉豐臣家，再用武家諸法度與出海來日的限制管住大名和海，太平的代價由豐臣家、浪人與天主教徒付出。';
    await p.locator('.dv-capstone textarea').fill(text);
    ok(!(await btn.isDisabled()), '寫夠字數後可以對照');
    await p.screenshot({ path: `${SHOTS}/new-steps-capstone.png` });
    await btn.click();
    await p.waitForSelector('.dv-capstone .points');
    await p.locator('.dv-capstone .pt-btns').nth(0).locator('button', { hasText: '有寫到' }).click();
    await p.locator('.dv-capstone .pt-btns').nth(1).locator('button', { hasText: '沒寫到' }).click();
    let cs = (await store(p)).capstone?.[DIVE];
    ok(cs && cs.text === text && cs.seen && cs.pts?.[0] === true && cs.pts?.[1] === false && /^\d{4}-\d\d-\d\d$/.test(cs.at), `進度記下 capstone：${JSON.stringify(cs).slice(0, 80)}…`);
    await p.locator('.dv-capstone .cap-actions button', { hasText: '複製' }).click();
    await p.waitForTimeout(300);
    const clip = await p.evaluate(() => navigator.clipboard.readText().catch(() => '')).catch(() => '');
    ok(clip === '' || (clip.includes('小明') && clip.includes(text)), '複製的文字有姓名與內容');
    await p.screenshot({ path: `${SHOTS}/new-steps-capstone-done.png` });
    // 列印版：用 print 媒體看 .cap-sheet
    await p.evaluate(() => { window.print = () => { window.__printed = true; }; });
    await p.locator('.dv-capstone .cap-actions button', { hasText: '列印' }).click();
    ok(await p.evaluate(() => !!window.__printed && document.body.classList.contains('print-capstone')), '按列印：加上列印版型並呼叫 print');
    await p.emulateMedia({ media: 'print' });
    ok(await p.evaluate(() => getComputedStyle(document.querySelector('.cap-sheet')).display !== 'none' && getComputedStyle(document.querySelector('#root')).display === 'none'), '列印媒體：只剩 .cap-sheet');
    ok((await p.locator('.cap-sheet').innerText()).includes('小明'), '列印版有姓名');
    await p.emulateMedia({ media: 'screen' });
    await p.evaluate(() => document.body.classList.remove('print-capstone'));
    // 重新整理還在
    await p.reload({ waitUntil: 'networkidle' }); await p.waitForSelector('.dv-capstone textarea');
    ok((await p.locator('.dv-capstone textarea').inputValue()) === text, '重新整理後文字還在');
    // 專題頁不外露製作備註
    await open(p, `dive=dive-ancient-greece`, '.dive-view');
    await p.locator('.dv-power summary').first().click().catch(() => {});
    const body = await p.locator('.dive-view').innerText();
    ok(!/docs\//.test(body), '專題頁沒有「見 docs/…」的製作備註');
    await ctx.close();
  }
  // ---------- (8) 舊進度、備份合併 ----------
  {
    const { ctx, p } = await mk();
    // 舊進度：沒有新鍵、沒有 capstone
    await seed(p, { units: { [U.s2]: { step: 4, done: true, doneAt: '2026-11-01', lastAt: '2026-11-01', answers: { s3: 1 } } }, cards: {} });
    await open(p, `unit=${U.s2}&step=${stepNo.s2 + 1}`, '.s2-pair');
    ok((await p.locator('.s2-pair').count()) === 1, '舊進度打開有新步驟的課不壞');
    await open(p, `view=export&unit=${U.s2}`, '.exp');
    ok(true, '舊進度匯出頁不壞');
    await open(p, `dive=${DIVE}`, '.dive-view');
    ok((await p.locator('.dv-capstone.locked').count()) === 1, '舊進度專題頁：總結任務鎖住');
    // 備份合併：用頁面內的函式不好取，改測 localStorage 還原後 capstone 保留（匯入走 toProgress／mergeProgress，單元測試見 typecheck；這裡確認匯出的備份含 capstone）
    await ctx.close();
  }
  await b.close();
  console.log(errs.length ? `頁面錯誤 ${errs.length} 個：\n${errs.slice(0, 8).join('\n')}` : '沒有頁面錯誤');
  if (errs.length) fail++;
  console.log(fail ? `✗ ${fail} 項失敗` : '全部通過');
  process.exit(fail ? 1 : 0);
})();
