// node topics.cjs baseUrl [截圖資料夾] → 主題標籤：卡片上有 #標籤、點了看到依年代排的路徑、地圖有編號、時間軸只亮路徑；
// 研究／學習模式、桌機／手機都測；每個主題頁都打得開、卡片數和資料一致、依年代排序
const { chromium } = require('playwright');
const fs = require('fs');
(async () => {
  const base = process.argv[2];
  const out = process.argv[3] || 'docs/screenshots/topics';
  fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch();
  const errs = [];
  const watch = (p) => {
    p.on('pageerror', (e) => { if (!/appendChild/.test(String(e))) errs.push(String(e)); }); // appendChild：容器連不到圖磚時 Leaflet 備用圖層的舊錯誤，與本功能無關
    p.on('console', (m) => { if (m.type() === 'error' && !/tile|ERR_TUNNEL|ERR_NAME|ERR_PROXY|favicon|AJAXError|Failed to fetch|openfreemap/.test(m.text())) errs.push(m.text()); });
  };
  let fail = 0;
  const ok = (cond, msg) => { console.log(`${cond ? '✓' : '✗'} ${msg}`); if (!cond) fail++; };
  const ix = await (await fetch(base + 'index.json')).json();
  const topics = ix.topicLayers.flatMap((l) => l.topics);
  const byId = new Map(ix.cards.map((c) => [c.id, c]));

  // 資料：每張卡都有標籤、每個主題 ≥2 張且依年代排
  ok(ix.cards.every((c) => c.topics.length > 0), `每張卡都有主題標籤（${ix.cards.length} 張）`);
  ok(topics.every((t) => t.cards.length >= 2), `每個主題至少 2 張卡（${topics.length} 個主題）`);
  ok(topics.every((t) => t.cards.every((id, i) => i === 0 || byId.get(t.cards[i - 1]).time.start <= byId.get(id).time.start)), '每個主題的卡依開始年份排序');
  ok(topics.every((t) => t.cards.every((id) => byId.get(id).topics.includes(t.name))), '主題的卡片清單和卡片的 topics 欄位一致');

  // 研究模式（桌機）
  const p = await b.newPage({ viewport: { width: 1280, height: 800 } }); watch(p);
  await p.goto(base + '?card=finance-antwerp-bourse', { waitUntil: 'networkidle' }); await p.waitForTimeout(600);
  const chips = await p.$$eval('.card-detail .topic-chips .chip.topic', (es) => es.map((e) => e.textContent));
  ok(chips.some((t) => t.startsWith('#交易所')), `研究模式卡片有 #交易所（${chips.join(' ')}）`);
  await p.click('.card-detail .topic-chips .chip.topic >> text=#交易所'); await p.waitForTimeout(1500);
  const ex = topics.find((t) => t.name === '交易所');
  const items = await p.$$eval('.topic-view .tv-list li', (es) => es.map((e) => e.querySelector('.tv-nm').textContent));
  ok(items.length === ex.cards.length, `#交易所 路徑列出 ${items.length} 張卡（資料 ${ex.cards.length}）`);
  ok(items[0].startsWith('布魯日'), `第一張是布魯日（${items[0]}）`);
  ok(!!(await p.$('.topic-view .tv-list li.cur')), '標出「你剛剛看的」安特衛普');
  const marks = await p.$$eval('.topic-mark', (es) => es.map((e) => e.textContent).join(' | '));
  const nums = marks.replace(/…/g, ' ').split(/[^0-9]+/).filter(Boolean).map(Number);
  ok(nums.includes(1) && Math.max(...nums) === ex.cards.length, `地圖上有路徑編號（${marks}）`);
  const dim = await p.$$eval('.timeline-wrap g.node', (es) => [es.length, es.filter((e) => e.classList.contains('dim')).length]);
  ok(dim[1] > 0 && dim[1] < dim[0], `時間軸只亮路徑上的卡（${dim[0] - dim[1]} 亮／${dim[0]}）`);
  await p.screenshot({ path: `${out}/research-topic-1280.png` });
  await p.click('.topic-view .tv-list li:nth-child(4) .tv-item'); await p.waitForTimeout(500);
  ok((await p.textContent('.card-detail h2')).includes('紐約證券交易所'), '從路徑點第 4 張打開紐約證交所');
  await p.click('.panel-nav .back'); await p.waitForTimeout(400);
  ok(!!(await p.$('.topic-view')), '← 返回 回到路徑頁');
  // 全部標籤頁
  await p.click('header .btn >> text=主題標籤'); await p.waitForTimeout(300);
  const allChips = await p.$$eval('.topic-index .ti-chips .chip.topic', (es) => es.length);
  ok(allChips === topics.length, `全部標籤頁列出 ${allChips} 個（資料 ${topics.length}）`);
  await p.fill('.ti-filter', '銀行'); await p.waitForTimeout(200);
  ok((await p.$$eval('.topic-index .ti-chips .chip.topic', (es) => es.map((e) => e.textContent))).some((t) => t.startsWith('#銀行')), '標籤頁打「銀行」篩得出 #銀行與借貸');
  // 搜尋推薦標籤
  await p.fill('.top .search', '交易所'); await p.waitForTimeout(400);
  ok(!!(await p.$('.topic-suggest .chip.topic >> text=#交易所')), '研究模式搜尋「交易所」會推薦 #交易所');
  // 每個主題都打得開
  let bad = [];
  for (const t of topics) {
    await p.goto(base + '?topic=' + encodeURIComponent(t.name), { waitUntil: 'domcontentloaded' });
    await p.waitForSelector('.topic-view .tv-list li', { timeout: 8000 }).catch(() => {});
    const n = await p.$$eval('.topic-view .tv-list li', (es) => es.length);
    if (n !== t.cards.length) bad.push(`${t.name}:${n}/${t.cards.length}`);
  }
  ok(!bad.length, `每個主題頁全部打得開、張數正確${bad.length ? '：' + bad.join(' ') : ''}`);
  await p.close();

  // 學習模式（桌機）
  const l = await b.newPage({ viewport: { width: 1280, height: 800 } }); watch(l);
  await l.goto(base + '?mode=learn&card=finance-antwerp-bourse', { waitUntil: 'networkidle' }); await l.waitForTimeout(600);
  ok(!!(await l.$('.lcard .topic-chips .chip.topic >> text=#交易所')), '學習卡片有 #交易所');
  await l.click('.lcard .topic-chips .chip.topic >> text=#交易所'); await l.waitForTimeout(1200);
  ok(l.url().includes('topic='), `學習模式網址記住主題（${decodeURIComponent(l.url().split('?')[1])}）`);
  const off = await l.$$eval('.topic-view .tv-list li.off a', (es) => es.map((e) => e.getAttribute('href')));
  const nonLearn = ex.cards.filter((id) => !byId.get(id).learn).length;
  ok(off.length === nonLearn && off.every((h) => h.includes('mode=research')), `沒有學習版的卡改連研究模式（${off.length} 張）`);
  ok(/你讀過/.test(await l.textContent('.tv-meta')), '顯示「你讀過 n／m」');
  await l.screenshot({ path: `${out}/learn-topic-1280.png` });
  await l.goto(base + '?mode=learn', { waitUntil: 'networkidle' }); await l.waitForTimeout(500);
  ok(!!(await l.$('.home-topics .chip.topic')), '學習首頁有「順著一個主題往下走」');
  await l.fill('.lsearch-box input', '白銀'); await l.waitForTimeout(400);
  ok(!!(await l.$('.lsearch .topic-suggest .chip.topic >> text=#白銀')), '學習模式搜尋「白銀」會推薦 #白銀');
  await l.close();

  // 手機
  const m = await b.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true }); watch(m);
  await m.goto(base + '?mode=research', { waitUntil: 'networkidle' }); await m.waitForTimeout(500);
  await m.click('nav.tabs button >> text=主題標籤'); await m.waitForTimeout(300);
  ok(!!(await m.$('.topic-index')), '手機研究模式有「主題標籤」分頁');
  await m.click('.topic-index .chip.topic >> text=#紙幣'); await m.waitForTimeout(500);
  ok(!!(await m.$('.topic-view .tv-map')), '手機路徑頁有「在地圖上看」');
  await m.click('.topic-view .tv-map'); await m.waitForTimeout(1500);
  ok((await m.$$('.topic-mark')).length > 0, '手機按「在地圖上看」看到編號');
  const sw = await m.evaluate(() => document.documentElement.scrollWidth);
  ok(sw <= 390, `手機沒有橫向捲動（${sw}px）`);
  await m.goto(base + '?mode=learn&topic=' + encodeURIComponent('殖民統治'), { waitUntil: 'networkidle' }); await m.waitForTimeout(600);
  await m.screenshot({ path: `${out}/learn-topic-390.png` });
  const sw2 = await m.evaluate(() => document.documentElement.scrollWidth);
  ok(sw2 <= 390, `手機學習模式路徑頁沒有橫向捲動（${sw2}px）`);
  await m.goto(base + '?mode=learn&card=event-wushe-incident', { waitUntil: 'networkidle' }); await m.waitForTimeout(500);
  await m.screenshot({ path: `${out}/learn-card-390.png` });
  await m.close();

  ok(!errs.length, `沒有頁面錯誤${errs.length ? '：' + errs.slice(0, 5).join(' / ') : ''}`);
  await b.close();
  console.log(fail ? `\n${fail} 項失敗` : '\n全部通過');
  process.exit(fail ? 1 : 0);
})();
