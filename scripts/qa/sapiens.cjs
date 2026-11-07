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
  await first.locator('.bk-think .btn').click();
  ok(await first.locator('.bk-claim').count() === 1 && await first.locator('.bk-debate li').count() >= 2, '按「想好了」後出現書裡怎麼說、證據、另一種看法');
  await p.waitForTimeout(500);
  ok(/還沒有國家/.test(await p.locator('body').innerText()), '史前年代地圖不畫疆域，並說明「還沒有國家」');
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
  await l.locator('.bk-ch[open] .bk-think .btn').click();
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
