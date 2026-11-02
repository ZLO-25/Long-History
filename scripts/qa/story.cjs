// node story.cjs baseUrl [截圖資料夾] → 把卡片串成故事（docs/causes.md）：
// C 卡片顯示所在單元／故事線、第幾站、上一站／下一站；A「從哪裡來／往哪裡去」附關係與來源；B 故事線頁面
// 研究／學習模式、桌機／手機都測
const { chromium } = require('playwright');
const fs = require('fs');
(async () => {
  const base = process.argv[2];
  const out = process.argv[3] || 'docs/screenshots/story';
  fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch();
  const errs = [];
  const watch = (p) => {
    p.on('pageerror', (e) => { if (!/appendChild/.test(String(e))) errs.push(String(e)); }); // appendChild：容器連不到圖磚時的舊錯誤
    p.on('console', (m) => { if (m.type() === 'error' && !/tile|ERR_TUNNEL|ERR_NAME|ERR_PROXY|favicon|AJAXError|Failed to fetch|openfreemap/.test(m.text())) errs.push(m.text()); });
  };
  let fail = 0;
  const ok = (cond, msg) => { console.log(`${cond ? '✓' : '✗'} ${msg}`); if (!cond) fail++; };
  const ix = await (await fetch(base + 'index.json')).json();
  const byId = new Map(ix.cards.map((c) => [c.id, c]));
  const RELS = ['直接引發', '促成', '背景', '回應'];

  // ---- 資料 ----
  const links = ix.cards.flatMap((c) => [...c.causes.map((x) => ({ ...x, side: 'c', at: c })), ...c.effects.map((x) => ({ ...x, side: 'e', at: c }))]);
  ok(links.every((x) => RELS.includes(x.rel) && x.why && x.sources.length), `每條前因／後果都有關係類型、說明、來源（${links.length} 條，含兩端各算一次）`);
  const grey = links.filter((x) => !x.id || !byId.has(x.id));
  ok(!grey.length, `沒有「尚無卡片」的灰字：每條前因／後果都指向一張已有的卡${grey.length ? '（' + grey.slice(0, 5).map((x) => x.at.id + '→' + x.name).join('、') + '）' : ''}`);
  const learn = ix.cards.filter((c) => c.learn);
  const lonely = learn.filter((c) => !c.causes.length && !c.effects.length);
  ok(!lonely.length, `每張學習卡都至少有一條前因或後果（${learn.length} 張）${lonely.length ? '：' + lonely.map((c) => c.id).join(' ') : ''}`);
  const isolated = ix.cards.filter((c) => !c.causes.length && !c.effects.length);
  ok(isolated.length <= ix.cards.length * 0.05, `沒有前因也沒有後果的卡 ≤ 5%（${isolated.length} 張${isolated.length ? '：' + isolated.slice(0, 8).map((c) => c.id).join(' ') : ''}）`);
  // 對稱：A 的後果裡有 B ⇔ B 的前因裡有 A
  const asym = ix.cards.flatMap((c) => c.effects.filter((x) => x.id && !byId.get(x.id).causes.some((y) => y.id === c.id)).map((x) => `${c.id}→${x.id}`));
  ok(!asym.length, `前因與後果兩邊對得起來${asym.length ? '：' + asym.slice(0, 5).join(' ') : ''}`);
  const time = links.filter((x) => x.id).every((x) => { const o = byIdGet(x.id); const [a, e] = x.side === 'c' ? [o, x.at] : [x.at, o]; return a.time.start <= e.time.end; });
  function byIdGet(id) { return byId.get(id); }
  ok(time, '原因沒有晚於結果');
  const sl = ix.storylines ?? [];
  ok(sl.length >= 4, `故事線至少 4 條（${sl.length}）`);
  ok(sl.every((s) => s.stops.length >= 4 && s.stops.every((x, i) => (i === s.stops.length - 1) === !x.bridge)), '每條故事線每兩站之間都有因果「橋」');

  // ---- 研究模式（桌機）----
  const p = await b.newPage({ viewport: { width: 1280, height: 900 } }); watch(p);
  const unitCard = (ix.units.find((u) => u.id === 'unit-taiwan-democracy') ? 'event-228-incident' : null);
  await p.goto(base + '?mode=research&card=event-228-incident', { waitUntil: 'networkidle' }); await p.waitForTimeout(700);
  ok(!!(await p.$('.card-detail .path-nav .pn-row.unit')), '研究模式卡片顯示所在學習單元');
  ok(/第 \d+／\d+ 站/.test(await p.textContent('.card-detail .path-nav')), '顯示「第 n／m 站」');
  const c228 = byId.get('event-228-incident');
  ok((await p.$$('.card-detail .cause-list.causes > ul > li')).length === c228.causes.length, `「從哪裡來」列出 ${c228.causes.length} 條`);
  ok((await p.$$('.card-detail .cause-list.effects > ul > li')).length === c228.effects.length, `「往哪裡去」列出 ${c228.effects.length} 條`);
  ok((await p.$$('.card-detail .cause-list .rel-chip')).length > 0 && (await p.$$('.card-detail .cause-list .ce-src a')).length > 0, '每條有關係標籤與來源連結');
  await p.screenshot({ path: `${out}/research-card-1280.png` });
  // 上一站
  const prevTxt = await p.textContent('.card-detail .path-nav .pn-step.prev');
  await p.click('.card-detail .path-nav .pn-step.prev'); await p.waitForTimeout(500);
  ok(prevTxt.includes((await p.textContent('.card-detail h2')).slice(0, 6)), `按「上一站」打開上一張卡（${(await p.textContent('.card-detail h2'))}）`);
  // 從前因點進去
  await p.goto(base + '?mode=research&card=event-228-incident', { waitUntil: 'networkidle' }); await p.waitForTimeout(500);
  const first = c228.causes.find((x) => x.id);
  if (first) {
    await p.click('.card-detail .cause-list.causes .cr-link'); await p.waitForTimeout(500);
    ok(!!(await p.$('.card-detail h2')) && (await p.textContent('.card-detail h2')) !== c228.name, '點「從哪裡來」的卡片打開那張卡');
  }
  // 故事線
  if (sl.length) {
    await p.goto(base + '?mode=research', { waitUntil: 'networkidle' }); await p.waitForTimeout(500);
    await p.click('header .btn >> text=故事線'); await p.waitForTimeout(300);
    ok((await p.$$('.story-index .si-item')).length === sl.length, `故事線清單列出 ${sl.length} 條`);
    await p.click('.story-index .si-item'); await p.waitForTimeout(1500);
    ok((await p.$$('.story-view .sv-stop')).length === sl[0].stops.length, `故事線頁列出 ${sl[0].stops.length} 站`);
    ok((await p.$$('.story-view .sv-bridge')).length === sl[0].stops.length - 1, '每兩站之間有說明');
    ok(p.url().includes('story=' + sl[0].id), '網址記住故事線');
    ok((await p.$$('.topic-mark')).length > 0, '地圖上有站序編號');
    const dim = await p.$$eval('.timeline-wrap g.node', (es) => [es.length, es.filter((e) => e.classList.contains('dim')).length]);
    ok(dim[1] > 0 && dim[1] < dim[0], `時間軸只亮故事線上的卡（${dim[0] - dim[1]} 亮）`);
    await p.screenshot({ path: `${out}/research-story-1280.png` });
    let bad = [];
    for (const s of sl) {
      await p.goto(base + '?mode=research&story=' + s.id, { waitUntil: 'domcontentloaded' });
      await p.waitForSelector('.story-view .sv-stop', { timeout: 8000 }).catch(() => {});
      const n = (await p.$$('.story-view .sv-stop')).length;
      if (n !== s.stops.length) bad.push(`${s.id}:${n}/${s.stops.length}`);
    }
    ok(!bad.length, `每條故事線都打得開${bad.length ? '：' + bad.join(' ') : ''}`);
    // 卡片上顯示它在哪條故事線
    const mid = sl[0].stops[1].id;
    await p.goto(base + '?mode=research&card=' + mid, { waitUntil: 'networkidle' }); await p.waitForTimeout(500);
    ok(!!(await p.$('.card-detail .path-nav .pn-row.story')), '故事線上的卡顯示「故事線 第 n 站」');
  }
  await p.close();

  // ---- 學習模式（桌機）----
  const l = await b.newPage({ viewport: { width: 1280, height: 900 } }); watch(l);
  await l.goto(base + '?mode=learn&card=event-228-incident', { waitUntil: 'networkidle' }); await l.waitForTimeout(600);
  ok(!!(await l.$('.lcard .path-nav')), '學習卡片顯示所在單元');
  ok(!!(await l.$('.lcard .cause-list.causes')), '學習卡片有「從哪裡來」');
  await l.screenshot({ path: `${out}/learn-card-1280.png` });
  const offs = await l.$$eval('.lcard .cause-list a.cr-link.off', (es) => es.map((e) => e.getAttribute('href')));
  ok(offs.every((h) => h.includes('mode=research')), `沒有學習版的卡改連研究模式（${offs.length} 張）`);
  // 單元裡讀卡時，不重複列本單元
  await l.goto(base + '?mode=learn&unit=unit-taiwan-democracy', { waitUntil: 'networkidle' }); await l.waitForTimeout(500);
  if (await l.$('.unit-start, button >> text=開始')) { const st = await l.$('button >> text=開始'); if (st) { await st.click(); await l.waitForTimeout(300); } }
  for (let i = 0; i < 3 && !(await l.$('.lcard')); i++) { await l.keyboard.press('ArrowRight'); await l.waitForTimeout(300); }
  if (await l.$('.lcard')) {
    const rows = await l.$$eval('.lcard .path-nav .pn-row.unit', (es) => es.map((e) => e.textContent));
    ok(!rows.some((t) => t.includes('從戒嚴到投票')), '在單元裡讀卡時，不重複列出這個單元');
  }
  if (sl.length) {
    await l.goto(base + '?mode=learn', { waitUntil: 'networkidle' }); await l.waitForTimeout(500);
    ok((await l.$$('.home-stories .si-item')).length === sl.length, '學習首頁有故事線');
    await l.click('.home-stories .si-item'); await l.waitForTimeout(1200);
    ok(l.url().includes('story='), '學習模式網址記住故事線');
    await l.screenshot({ path: `${out}/learn-story-1280.png` });
  }
  await l.close();

  // ---- 手機 ----
  const m = await b.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true }); watch(m);
  await m.goto(base + '?mode=learn&card=event-228-incident', { waitUntil: 'networkidle' }); await m.waitForTimeout(600);
  await m.screenshot({ path: `${out}/learn-card-390.png`, fullPage: false });
  ok((await m.evaluate(() => document.documentElement.scrollWidth)) <= 390, '手機學習卡沒有橫向捲動');
  if (sl.length) {
    await m.goto(base + '?mode=learn&story=' + sl[0].id, { waitUntil: 'networkidle' }); await m.waitForTimeout(600);
    await m.screenshot({ path: `${out}/learn-story-390.png` });
    ok((await m.evaluate(() => document.documentElement.scrollWidth)) <= 390, '手機故事線頁沒有橫向捲動');
    await m.goto(base + '?mode=research', { waitUntil: 'networkidle' }); await m.waitForTimeout(400);
    await m.click('nav.tabs button >> text=故事／主題'); await m.waitForTimeout(300);
    ok(!!(await m.$('.story-index')), '手機研究模式「故事／主題」分頁打開故事線');
  }
  await m.close();

  ok(!errs.length, `沒有頁面錯誤${errs.length ? '：' + errs.slice(0, 5).join(' / ') : ''}`);
  await b.close();
  console.log(fail ? `\n${fail} 項失敗` : '\n全部通過');
  process.exit(fail ? 1 : 0);
})();
