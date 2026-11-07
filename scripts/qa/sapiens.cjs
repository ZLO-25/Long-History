// node scripts/qa/sapiens.cjs baseUrl [截圖資料夾] → 讀書專題《人類大歷史》（docs/dives.md 第七節）
// 資料：book 的部／章／來源、史前新卡；畫面：深時間軸、每章四格、先想一想、史前按鈕、地圖不畫疆域、學習模式、手機
const { chromium } = require('playwright');
const fs = require('fs');
(async () => {
  const base = process.argv[2] || 'http://localhost:5173/';
  const out = process.argv[3] || 'docs/screenshots/sapiens';
  fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch();
  const errs = [];
  const watch = (p) => {
    p.on('pageerror', (e) => { if (!/appendChild/.test(String(e))) errs.push(String(e)); });
    p.on('console', (m) => { if (m.type() === 'error' && !/tile|ERR_TUNNEL|ERR_NAME|ERR_PROXY|favicon|AJAXError|Failed to fetch|openfreemap/.test(m.text())) errs.push(m.text()); });
  };
  let fail = 0;
  const ok = (cond, msg) => { console.log(`${cond ? '✓' : '✗'} ${msg}`); if (!cond) fail++; };
  const ix = await (await fetch(base + 'index.json')).json();
  const byId = new Map(ix.cards.map((c) => [c.id, c]));

  // ---- 資料 ----
  const d = (ix.dives ?? []).find((x) => x.id === 'dive-sapiens');
  ok(!!d && !!d.book, '有讀書專題 dive-sapiens（含 book）');
  if (!d?.book) { await b.close(); process.exit(1); }
  ok(d.book.parts.length === 4, `書分 4 部（${d.book.parts.length}）`);
  ok(d.book.chapters.length === 20, `20 章（${d.book.chapters.length}）`);
  const src = new Set(d.book.sources.map((s) => s.id));
  ok(d.book.chapters.every((c) => /\[b\d+\]/.test(c.claim) && [...c.claim.matchAll(/\[(b\d+)\]/g)].every((m) => src.has(m[1]))), '每章「書裡怎麼說」都有來源，且來源存在');
  ok(d.book.chapters.filter((c) => c.part === 1).every((c) => c.debate.length >= 2), '第一部每章至少 2 條另一種看法');
  ok(d.book.chapters.every((c) => c.cards.every((id) => byId.has(id))), '證據卡都存在');
  const NEW = ['event-homo-species', 'event-cognitive-revolution', 'event-out-of-africa', 'event-megafauna-extinction', 'event-peopling-americas', 'event-fertile-crescent-agriculture', 'building-gobekli-tepe', 'event-east-asia-agriculture'];
  ok(NEW.every((id) => byId.has(id)), '8 張史前新卡都在');
  ok(NEW.every((id) => (byId.get(id)?.crosscheck ?? byId.get(id)?.learn?.crosscheck)?.result === '通過'), '8 張新卡都通過獨立查核');
  ok(NEW.every((id) => d.cards.includes(id)), '新卡都在專題裡');
  const NEW2 = ['event-columbus-aztec', 'event-atlantic-slave-trade', 'finance-voc', 'event-cook-voyages', 'event-nuclear-long-peace'];
  ok(NEW2.every((id) => (byId.get(id)?.crosscheck ?? byId.get(id)?.learn?.crosscheck)?.result === '通過'), '第 2 期 5 張科學革命新卡都通過獨立查核');
  ok(NEW2.every((id) => d.book.chapters.some((c) => c.cards.includes(id))), '5 張新卡都放進章節證據');
  ok(d.book.chapters.every((c) => c.debate.length >= 1 || c.no === 20), '第 1–19 章都有另一種看法');
  ok(d.book.chapters.every((c) => c.debate.every((x) => ['支持', '補充', '反對'].includes(x.stance))), '每條另一種看法都標支持／補充／反對');
  ok(d.book.chapters.every((c) => c.cards.every((id) => c.card_notes?.[id])), '每張證據卡都有一句「為什麼是這章的證據」');
  ok(d.book.chapters.filter((c) => c.core).length >= 4, `課堂核心站 ≥ 4（${d.book.chapters.filter((c) => c.core).length}）`);
  const UNITS = ['unit-sapiens-cognitive', 'unit-sapiens-agriculture', 'unit-sapiens-unification', 'unit-sapiens-science'];
  ok(UNITS.every((u) => d.units.includes(u) && (ix.units ?? []).some((x) => x.id === u && x.crosscheck?.result === '通過')), '4 個學習單元都接上專題且通過查核');
  ok(d.book.parts.every((p) => UNITS.includes(p.unit)), '每一部都連到一個學習單元');
  const MIG = (ix.routes ?? []).filter((r) => r.kind === 'migration');
  ok(MIG.length === 3, `3 條史前遷徙路線（${MIG.length}）`);
  ok(MIG.every((r) => (byId.get('event-out-of-africa')?.routes ?? []).concat(byId.get('event-peopling-americas')?.routes ?? []).includes(r.id)), '遷徙路線都掛在卡片上');
  ok(d.cards.length >= 40, `專題卡片（含各章證據卡）≥ 40（${d.cards.length}）`);

  // ---- 研究模式 ----
  const p = await b.newPage({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 2 }); watch(p);
  await p.goto(base + '?mode=research', { waitUntil: 'networkidle' });
  await p.waitForSelector('.timeline svg');
  const chip = p.locator('.timeline .tl-prehist');
  ok(await chip.count() === 1, '大時間軸有「史前」按鈕');
  ok(/史前 \d+/.test(await chip.innerText()), `按鈕寫出張數（${await chip.innerText()}）`);
  const onAxis = await p.locator('.timeline .node').evaluateAll((ns) => ns.length);
  ok(onAxis > 50, `其他卡仍畫在軸上（${onAxis}）`);
  await chip.click();
  await p.waitForSelector('.dive-view .deep-tl');
  ok(/人類大歷史/.test(await p.locator('.dive-view h2').innerText()), '點「史前」打開《人類大歷史》專題');
  ok(p.url().includes('dive=dive-sapiens'), '網址記住 ?dive=dive-sapiens');
  const bars = await p.locator('.deep-tl .dt-card').count();
  ok(bars === d.cards.length, `深時間軸畫出每張卡（${bars}／${d.cards.length}）`);
  ok(await p.locator('.deep-tl .dt-part').count() === 4, '深時間軸有 4 部色塊');
  ok(/萬年前/.test(await p.locator('.deep-tl').innerText()), '刻度用「萬年前」');
  ok(await p.locator('.bk-ch').count() === 20, '20 站');
  ok(await p.locator('.bk-ch[open]').count() === 1, '預設只打開第 1 站');
  const first = p.locator('.bk-ch[open]');
  ok(await first.locator('.bk-think').count() === 1 && await first.locator('.bk-claim').count() === 0, '先只顯示「先想一想」，書的說法藏起來');
  ok(await first.locator('.bk-think').count() === 1 && await first.locator('.dv-card').count() >= 1, '想一想階段就看得到證據卡');
  await first.locator('.bk-reveal').click();
  ok(await first.locator('.bk-claim').count() === 1 && await first.locator('.bk-debate li').count() >= 2, '按「想好了」後出現書裡怎麼說、證據、另一種看法');
  await p.waitForTimeout(500);
  ok(/還沒有國家/.test(await p.locator('body').innerText()), '史前年代地圖不畫疆域，並說明「還沒有國家」');
  ok(await p.locator('.bk-jump .chip').count() === 20, '有 1–20 站跳轉列');
  ok(await p.locator('.dv-anchors').innerText().then((t) => /深時間軸/.test(t) && /照書讀/.test(t) && /照順序讀/.test(t)), '頁內導覽有深時間軸、照書讀、照順序讀');
  ok(await p.locator('.bk-stance').count() >= 2, '另一種看法顯示立場標籤');
  ok(await p.locator('.bk-unit').count() === 4, '每一部標出學習單元');
  ok(/史前遷徙/.test(await p.locator('.map-legend').innerText()), '地圖圖例有「史前遷徙」');
  ok(/紅線：7 萬年前/.test(await p.locator('.deep-tl').innerText()), '深時間軸紅線旁寫出年代');
  ok(/史前/.test(await p.locator('.timeline .tl-year').innerText()), '大時間軸紅線年代分類寫「史前」');
  await p.locator('.dive-view').screenshot({ path: `${out}/dive-research-1280.png` }).catch(() => {});
  await p.screenshot({ path: `${out}/research-1280.png` });
  // 來源上標：點了打開來源清單
  await first.locator('.bk-ref').first().click();
  await p.waitForTimeout(400);
  ok(await p.locator('.bk-sources[open]').count() === 1, '點來源上標會打開來源清單');
  ok(!p.url().includes('#'), '點上標不改網址');
  // 證據卡可打開
  await first.locator('.dv-card').first().click();
  await p.waitForTimeout(600);
  ok(p.url().includes('card='), '點證據卡打開卡片');
  ok(/萬年前/.test(await p.locator('body').innerText()), '卡片年代寫成「萬年前」');
  await p.screenshot({ path: `${out}/card-research-1280.png` });

  // ---- 學習模式 ----
  const l = await b.newPage({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 2 }); watch(l);
  await l.goto(base + '?mode=learn&dive=dive-sapiens', { waitUntil: 'networkidle' });
  await l.waitForSelector('.dive-view .deep-tl');
  ok(await l.locator('.bk-ch').count() === 20, '學習模式也有 20 站');
  ok(await l.locator('.ltimeline .tl-prehist').count() === 1, '學習模式時間軸也有「史前」按鈕');
  await l.locator('.bk-ch[open] .bk-reveal').click().catch(() => {});
  const lc = l.locator('.bk-ch[open] .dv-card:not(.off)');
  ok(await lc.count() >= 1, '學習模式第 1 站的證據卡可以開（已通過查核）');
  await l.screenshot({ path: `${out}/dive-learn-1280.png` });

  // ---- 手機 ----
  const m = await b.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true }); watch(m);
  await m.goto(base + '?mode=research&dive=dive-sapiens', { waitUntil: 'networkidle' });
  await m.waitForTimeout(800);
  const deep = m.locator('.deep-tl svg');
  ok(await deep.count() === 1, '手機也有深時間軸');
  const bw = await m.evaluate(() => document.documentElement.scrollWidth);
  ok(bw <= 392, `手機沒有橫向捲動（${bw}px）`);
  await m.screenshot({ path: `${out}/dive-mobile-390.png` });

  ok(errs.length === 0, `沒有程式錯誤${errs.length ? '：' + errs.slice(0, 3).join(' | ') : ''}`);
  await b.close();
  console.log(fail ? `\n${fail} 項失敗` : '\n全部通過');
  process.exit(fail ? 1 : 0);
})();
