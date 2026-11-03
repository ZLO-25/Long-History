// node dive.cjs baseUrl [截圖資料夾] → 深入專題（docs/dives.md）：
// 資料：專題定義、人物卡、勢力圖；畫面：專題頁、勢力圖層、專題時間軸、人物卡的人生軌跡與關係；桌機／手機
const { chromium } = require('playwright');
const fs = require('fs');
(async () => {
  const base = process.argv[2];
  const out = process.argv[3] || 'docs/screenshots/dive';
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

  // ---- 資料 ----
  const dives = ix.dives ?? [];
  ok(dives.length >= 1, `至少 1 個專題（${dives.length}）`);
  const d = dives.find((x) => x.id === 'dive-sengoku');
  ok(!!d, '有日本戰國專題 dive-sengoku');
  if (!d) { await b.close(); process.exit(1); }
  ok(d.cards.every((id) => byId.has(id)), '專題的卡片都存在');
  const persons = d.cards.map((id) => byId.get(id)).filter((c) => c.type === 'person');
  ok(persons.length >= 4, `專題至少 4 位人物（${persons.length}）`);
  ok(persons.every((c) => c.person && c.person.role && c.person.name_romaji), '每張人物卡都有 role 與羅馬字');
  ok(persons.every((c) => c.place.locations.filter((l) => typeof l.year === 'number').length >= 3), '每張人物卡至少 3 個有年份的地點（人生軌跡）');
  const relCount = persons.reduce((n, c) => n + c.relations.length, 0);
  ok(relCount >= 4, `人物之間至少 4 條關係（${relCount}）`);
  ok(persons.every((c) => c.relations.every((r) => byId.get(r.id)?.type === 'person' && r.note && r.sources.length)), '每條關係指向人物卡、有說明與來源');
  ok(persons.every((c) => c.sections.some((s) => s.code === 'P5' && s.text) && c.sections.some((s) => s.code === 'P6' && s.text)), '每張人物卡都有「從另一邊看他」「評價怎麼變」');
  ok(persons.every((c) => c.learn && c.learn.crosscheck?.result === '通過'), '人物卡都進入學習模式（已查核）');
  const sorted = d.cards.map((id) => byId.get(id));
  ok(sorted.every((c, i) => i === 0 || c.time.start >= sorted[i - 1].time.start), '專題卡片依年份排好');
  ok(d.power_maps.length >= 1 && d.power_maps.every((p) => p.powers.length >= 10 && p.sources.length >= 2), `勢力圖至少 1 張、每張 ≥10 個勢力、≥2 個來源（${d.power_maps.length} 張）`);
  const gj = await (await fetch(base + 'data/dives/' + d.power_maps[0].file)).json();
  ok(gj.features.length === d.power_maps[0].powers.length && gj.features.every((f) => f.geometry.coordinates.length), '勢力圖 geojson 可讀、每個勢力有多邊形');
  ok(d.storylines.every((s) => ix.storylines.some((x) => x.id === s)), '專題的故事線都存在');
  const story = ix.storylines.find((s) => s.id === 'story-sengoku');
  ok(story && story.stops.length >= 6 && story.stops.every((x, i) => (i === story.stops.length - 1) === !x.bridge), `故事線 story-sengoku 每兩站之間都有因果橋（${story?.stops.length} 站）`);
  const newCards = d.cards.filter((id) => byId.get(id).type !== 'person').map((id) => byId.get(id));
  ok(newCards.every((c) => c.learn), '專題的事件卡都進入學習模式');

  // ---- 研究模式（桌機）----
  const p = await b.newPage({ viewport: { width: 1280, height: 900 } }); watch(p);
  await p.goto(base + '?mode=research&dive=dive-sengoku', { waitUntil: 'networkidle' }); await p.waitForTimeout(1500);
  ok((await p.textContent('.dive-view h2')).includes('日本戰國'), '網址 ?dive= 直接打開專題頁');
  ok((await p.$$('.dv-legend li')).length === d.power_maps[0].powers.length, '勢力圖圖例列出全部勢力');
  ok((await p.$$('.power-label')).length >= 5, `地圖上標了主要勢力名稱（縮小時只標最大的幾個）（${(await p.$$('.power-label')).length}）`);
  ok((await p.textContent('.tl-head')).includes('1467'), '時間軸放大到專題年代');
  const laneLabels = await p.$$eval('.timeline .lane-label', (els) => els.map((e) => e.textContent));
  ok(laneLabels.includes('戰役') && laneLabels.includes('人物（在世期間）'), `時間軸改用專題軌道（${laneLabels.join('、')}）`);
  ok((await p.$$('.dv-card')).length >= d.cards.length, '專題頁列出全部卡片與人物');
  ok((await p.$$('.topic-mark')).length >= 3, '地圖上標了卡片編號');
  await p.screenshot({ path: `${out}/dive-research-1280.png` });
  // 關掉勢力圖
  await p.click('.dv-power .chip:has-text("關")'); await p.waitForTimeout(400);
  ok((await p.$$('.power-label')).length === 0, '按「關」後勢力圖消失');
  await p.click(`.dv-power .chip:has-text("${d.power_maps[0].year}")`); await p.waitForTimeout(800);
  // 點人物
  const first = persons[0];
  await p.click(`.dv-card:has-text("${first.name.replace(/（.*$/, '').slice(0, 4)}")`); await p.waitForTimeout(1200);
  ok(!!(await p.$('.card-detail .person-block')), '人物卡顯示「人物資料」區塊');
  ok(!!(await p.$('.card-detail .romaji')), '人物卡標題下有羅馬字');
  ok((await p.$$('.trail-year')).length >= 3, `地圖上畫出人生軌跡年份（${(await p.$$('.trail-year')).length} 點）`);
  ok((await p.$$('.card-detail .pb-rel li')).length >= 1, '人物卡列出和其他人物的關係');
  ok(new URL(p.url()).searchParams.get('card') === first.id, '網址同步 ?card=');
  await p.screenshot({ path: `${out}/person-research-1280.png` });
  // 返回專題
  await p.click('.panel-nav .back'); await p.waitForTimeout(600);
  ok(!!(await p.$('.dive-view')), '返回回到專題頁');
  // 專題清單
  await p.click('header .btn:has-text("專題")'); await p.waitForTimeout(400);
  ok((await p.$$('.di-item')).length === dives.length, '頂端「專題」按鈕打開專題清單');
  await p.close();

  // ---- 研究模式（手機）----
  const m = await b.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true }); watch(m);
  await m.goto(base + '?mode=research&dive=dive-sengoku', { waitUntil: 'networkidle' }); await m.waitForTimeout(1200);
  ok(!!(await m.$('.dive-view')), '手機：?dive= 打開專題頁');
  ok(!!(await m.$('.dive-view button:has-text("在地圖上看")')), '手機：有「在地圖上看」');
  await m.screenshot({ path: `${out}/dive-mobile-390.png` });
  await m.click('.dive-view button:has-text("在地圖上看")'); await m.waitForTimeout(1200);
  ok((await m.$$('.power-label')).length >= 3, '手機：地圖分頁顯示勢力圖');
  await m.screenshot({ path: `${out}/dive-mobile-map-390.png` });
  await m.close();

  // ---- 學習模式：人物卡 ----
  const l = await b.newPage({ viewport: { width: 1280, height: 900 } }); watch(l);
  await l.goto(base + `?mode=learn&card=${first.id}`, { waitUntil: 'networkidle' }); await l.waitForTimeout(1200);
  const lc = await l.$('.lcard');
  ok(!!lc, '學習模式可以打開人物卡');
  if (lc) { ok(!!(await l.$('.lcard .person-block')), '學習模式人物卡也有「人物資料」區塊'); await l.screenshot({ path: `${out}/person-learn-1280.png` }); }
  await l.close();

  ok(errs.length === 0, `沒有 JS 錯誤${errs.length ? '：' + errs.slice(0, 3).join(' | ') : ''}`);
  await b.close();
  console.log(fail ? `\n${fail} 項未通過` : '\n全部通過');
  process.exit(fail ? 1 : 0);
})();
