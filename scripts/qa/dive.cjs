// node dive.cjs baseUrl [截圖資料夾] [只測某個專題 id] → 深入專題（docs/dives.md）：
// 每個專題都跑一輪「通用檢查」，門檻由專題資料推出（有沒有人物卡、有幾張圖、哪些卡還沒進學習模式）；
// 日本戰國另有第 2 期的加碼門檻（人物、關係網、≥10 勢力、≥5 張圖、圖片、戲劇 vs 史實）。
// 截圖檔名：戰國維持原名（文件有引用），其他專題加專題名前綴（例：usa-dive-research-1280.png）
const { chromium } = require('playwright');
const fs = require('fs');
(async () => {
  const base = process.argv[2];
  const out = process.argv[3] || 'docs/screenshots/dive';
  const only = process.argv[4];
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
  const pre = (d) => (d.id === 'dive-sengoku' ? '' : d.id.replace(/^dive-/, '') + '-');

  // ---- 專題總數 ----
  const dives = ix.dives ?? [];
  ok(dives.length >= 2, `至少 2 個專題（${dives.length}）`);
  ok(dives.some((x) => x.id === 'dive-sengoku') && dives.some((x) => x.id === 'dive-usa'), '有日本戰國與美國崛起兩個專題');
  if (!dives.length) { await b.close(); process.exit(1); }

  for (const d of dives.filter((x) => !only || x.id === only)) {
    console.log(`\n== ${d.id} ==`);
    const sg = d.id === 'dive-sengoku';
    const cards = d.cards.map((id) => byId.get(id));
    const persons = cards.filter((c) => c && c.type === 'person');
    const hasP = persons.length > 0;
    const hasMap = d.visual === 'power' && d.power_maps.length > 0;
    const ui = d.power_ui ?? { title: '勢力圖' };
    const yearsAsc = d.power_maps.map((x) => x.year).sort((a, b2) => a - b2);
    const noLearn = cards.filter((c) => c && c.type !== 'person' && !c.learn);

    // ---- 資料（通用）----
    ok(cards.every(Boolean), '專題的卡片都存在');
    ok(cards.every((c, i) => i === 0 || c.time.start >= cards[i - 1].time.start), '專題卡片依年份排好');
    ok(d.storylines.every((s) => ix.storylines.some((x) => x.id === s)) && d.units.every((u) => ix.units.some((x) => x.id === u)), '專題的故事線、單元都存在');
    for (const sid of d.storylines) {
      const s = ix.storylines.find((x) => x.id === sid);
      ok(s && s.stops.length >= 2 && s.stops.every((x, i) => (i === s.stops.length - 1) === !x.bridge), `故事線 ${sid} 每兩站之間都有因果橋（${s?.stops.length} 站）`);
    }
    ok(['power', 'curve', 'none'].includes(d.visual), `visual 欄位合法（${d.visual}）`);
    if (d.visual === 'power') ok(d.power_maps.length >= 3 && d.power_maps.every((pm) => pm.powers.length >= 3 && pm.sources.length >= 2), `主視覺至少 3 張圖、每張 ≥3 個區塊、≥2 個來源（${d.power_maps.length} 張）`);
    for (const pm of d.power_maps) {
      const gj = await (await fetch(base + 'data/dives/' + pm.file)).json();
      ok(gj.features.length === pm.powers.length && gj.features.every((f) => f.geometry.coordinates.length), `${pm.year} geojson 可讀、每個區塊有多邊形（${gj.features.length}）`);
      ok(!pm.view || (pm.view.length === 2 && gj.view && JSON.stringify(gj.view) === JSON.stringify(pm.view)), `${pm.year} 的 view 與 geojson 一致`);
    }
    console.log(`· ${noLearn.length} 張卡還沒進學習模式${noLearn.length ? '：' + noLearn.map((c) => c.id).join('、') : ''}`);
    if (hasP) {
      ok(persons.every((c) => c.person && c.person.role && c.person.name_romaji), '每張人物卡都有 role 與羅馬字');
      ok(persons.every((c) => c.place.locations.filter((l) => typeof l.year === 'number').length >= 3), '每張人物卡至少 3 個有年份的地點（人生軌跡）');
      const relCount = persons.reduce((n, c) => n + c.relations.length, 0);
      ok(relCount >= 1, `人物之間至少 1 條關係（${relCount}）`);
      ok(persons.every((c) => c.relations.every((r) => byId.get(r.id)?.type === 'person' && r.note && r.sources.length)), '每條關係指向人物卡、有說明與來源');
      ok(persons.every((c) => c.sections.some((s) => s.code === 'P5' && s.text) && c.sections.some((s) => s.code === 'P6' && s.text)), '每張人物卡都有「從另一邊看他」「評價怎麼變」');
      ok(persons.every((c) => c.learn && c.learn.crosscheck?.result === '通過'), '人物卡都進入學習模式（已查核）');
    } else {
      ok(!d.cards.some((id) => byId.get(id)?.type === 'person'), '這個專題沒有人物卡');
    }
    // 戰國加碼（第 2 期門檻）
    let withImg = [], withPop = [];
    if (sg) {
      ok(persons.length >= 4, `專題至少 4 位人物（${persons.length}）`);
      ok(persons.reduce((n, c) => n + c.relations.length, 0) >= 4, '人物之間至少 4 條關係');
      ok(d.power_maps.every((pm) => pm.powers.length >= 10), `戰國每張勢力圖 ≥10 個勢力`);
      const story = ix.storylines.find((s) => s.id === 'story-sengoku');
      ok(story && story.stops.length >= 6, `故事線 story-sengoku 至少 6 站（${story?.stops.length} 站）`);
      ok(noLearn.length === 0, '戰國專題的事件卡都進入學習模式');
      ok(d.power_maps.length >= 5, `勢力圖至少 5 個年份（${yearsAsc.join('、')}）`);
      withImg = cards.filter((c) => c.images && c.images.length);
      const pendingImgs = fs.existsSync('data/pending-images.yaml');
      if (pendingImgs && !withImg.length) console.log('· 圖片暫存在 data/pending-images.yaml（授權待查證），略過「至少一半有圖片」檢查');
      else ok(withImg.length >= Math.floor(cards.length / 2), `至少一半的專題卡有圖片（${withImg.length}／${cards.length}）`);
      ok(withImg.every((c) => c.images.every((im) => /^https:\/\/upload\.wikimedia\.org\//.test(im.url) && /public domain|公有領域|CC/i.test(im.license))), '圖片都來自 Commons、都是公有領域或 CC');
      withPop = cards.filter((c) => c.learn && (c.learn.pop_culture ?? []).length);
      ok(withPop.length >= Math.floor(cards.length / 2), `至少一半的專題卡有「戲劇 vs 史實」（${withPop.length}／${cards.length}）`);
    }

    // ---- 研究模式（桌機）----
    const p = await b.newPage({ viewport: { width: 1280, height: 900 } }); watch(p);
    await p.goto(base + `?mode=research&dive=${d.id}`, { waitUntil: 'networkidle' }); await p.waitForTimeout(1500);
    ok((await p.textContent('.dive-view h2')).trim() === d.title, '網址 ?dive= 直接打開專題頁');
    // 早於前 800 年的專題（讀書專題）大時間軸不放大，改看深時間軸，由 sapiens.cjs 測
    if (d.range.start >= -800) ok((await p.textContent('.tl-head')).includes(String(d.range.start)), `時間軸放大到專題年代（${d.range.start}）`);
    const laneLabels = await p.$$eval('.timeline .lane-label', (els) => els.map((e) => e.textContent));
    ok(d.lanes.filter((l) => cards.some((c) => l.types.includes(c.type))).every((l) => laneLabels.includes(l.name)), `時間軸改用專題軌道（${laneLabels.join('、')}）`);
    if (sg) ok(laneLabels.includes('戰役') && laneLabels.includes('人物（在世期間）'), '戰國時間軸有「戰役」「人物（在世期間）」軌道');
    if (!hasP) ok(!laneLabels.some((n) => /人物/.test(n)), '沒有人物卡：時間軸沒有空的人物軌');
    // UIUX P0：專題軌道底色不能是黑色（SVG rect 沒有 CSS 就會預設 fill 黑色）
    const laneFills = await p.$$eval('.timeline .lane', (els) => els.map((e) => getComputedStyle(e).fill));
    ok(laneFills.length >= 2 && laneFills.every((f) => f !== 'rgb(0, 0, 0)'), `專題時間軸軌道背景不是黑色（${[...new Set(laneFills)].join(' / ')}）`);
    ok((await p.$$('.dv-card')).length >= d.cards.length, '專題頁列出全部卡片');
    ok((await p.$$('.topic-mark')).length >= 3, '地圖上標了卡片編號');
    // 不出現上一個專題寫死的字樣
    const pageText = (await p.textContent('.dive-view')) || '';
    if (!sg) ok(!/令制國|大名|戰國/.test(pageText.replace(d.title, '').replace(d.question, '').replace(d.blurb, '')), '專題頁沒有戰國專用字樣（令制國、大名）');
    if (hasMap) {
      ok((await p.textContent('.dv-power h3')).includes(ui.title), `主視覺標題來自 power_ui（${ui.title}）`);
      const onChip = ((await p.textContent('.dv-power .chip.on')) || '').trim();
      const pm0 = d.power_maps.find((x) => onChip.startsWith(String(x.year))) ?? d.power_maps[0];
      ok(pm0.year === yearsAsc[0], `進專題預設打開第一張圖（${pm0.year} 年），不是結局`);
      ok((await p.$$('.dv-legend li')).length === pm0.powers.length, `圖例列出全部區塊（${pm0.year} 年，${pm0.powers.length} 個）`);
      if (ui.legend) ok(await p.$$eval('.dv-legend li small', (els) => els.length > 0 && els.every((e) => /：/.test(e.textContent))), `圖例小字有前綴「${ui.legend}：」`);
      const nMajor = pm0.powers.filter((x) => !x.minor).length;
      const nLabel = (await p.$$('.power-label')).length;
      ok(nLabel >= Math.min(sg ? 5 : 3, nMajor), `地圖上標了主要區塊名稱（縮小時只標最大的幾個）（${nLabel}／主要 ${nMajor}）`);
      ok((await p.$$('.power-label.minor')).length < nLabel || nMajor === 0, `縮小時 minor 區塊不搶標籤（minor 標了 ${(await p.$$('.power-label.minor')).length} 個）`);
      const legendTxt = (await p.textContent('.map-legend')) || '';
      if (!sg) ok(!/令制國|縣界/.test(legendTxt), '地圖圖例沒有寫死的戰國字樣');
      await p.screenshot({ path: `${out}/${pre(d)}dive-research-1280.png` });
      // 逐年切換：圖例跟著換、時間軸紅線跟到、疆域標籤用目前年份
      for (const pm of [...d.power_maps].sort((a, b2) => a.year - b2.year)) {
        if (pm.year === pm0.year && d.power_maps.length > 1) continue;
        await p.click(`.dv-power .chip:has-text("${pm.year}")`); await p.waitForTimeout(900);
        ok((await p.$$('.dv-legend li')).length === pm.powers.length, `切到 ${pm.year} 年：圖例變成 ${pm.powers.length} 個區塊`);
        ok((await p.textContent('.tl-head')).includes(String(pm.year)), `切年份時，時間軸紅線跟到 ${pm.year}`);
        const snapTxt = await p.evaluate(() => { const l = document.querySelector('.map-legend'); return l ? l.textContent : ''; });
        const m2 = /疆域示意：(\d+) 年/.exec(snapTxt);
        if (m2) ok(Number(m2[1]) === pm.year || Math.abs(Number(m2[1]) - pm.year) <= 3, `地圖圖例的疆域年份跟著目前年份（圖例寫 ${m2[1]}，選 ${pm.year}）`);
        await p.screenshot({ path: `${out}/${pre(d)}power-${pm.year}-1280.png` });
      }
      await p.click(`.dv-power .chip:has-text("${yearsAsc[0]}")`); await p.waitForTimeout(600);
    } else {
      ok(!(await p.$('.dv-power')), '沒有主視覺的專題：不顯示主視覺區');
      await p.screenshot({ path: `${out}/${pre(d)}dive-research-1280.png` });
    }
    // 人物區與關係網：有人物卡才出現
    if (hasP) {
      ok((await p.$$('.rel-graph .rg-node')).length === persons.length, `人物關係網有 ${persons.length} 個人物節點`);
      // UIUX P0：關係網不能有自己連自己的線（relationsOf 併入「別人寫到我」的列時，r.id 是我自己）
      const selfEdges = await p.$$eval('.rel-graph .rg-edge', (els) => els.filter((e) => e.getAttribute('data-a') === e.getAttribute('data-b')).length);
      ok(selfEdges === 0, `人物關係網沒有自己連自己的線（${selfEdges} 條）`);
      if (sg) ok((await p.$$('.rel-graph .rg-edge')).length >= 4, `人物關係網至少 4 條關係線（${(await p.$$('.rel-graph .rg-edge')).length}）`);
      const rg = await p.$('.rel-graph'); if (rg) { await rg.scrollIntoViewIfNeeded(); await rg.screenshot({ path: `${out}/${pre(d)}relation-graph.png` }); }
    } else {
      ok(!(await p.$('.rel-graph')) && !(await p.$('#dv-persons-' + d.id)) && !((await p.textContent('.dive-view')) || '').includes('位人物'), '沒有人物卡：不顯示人物區、關係網與「0 位人物」');
    }
    // 戰國：有圖片與「戲劇 vs 史實」的卡
    const imgCard = withImg[0] ?? withPop[0];
    if (sg && imgCard) {
      await p.goto(base + `?mode=research&card=${imgCard.id}`, { waitUntil: 'networkidle' }); await p.waitForTimeout(1200);
      if (imgCard.images?.length) {
        ok((await p.$$('.card-detail .card-img img')).length >= 1, `研究模式卡片頁顯示圖片（${imgCard.id}）`);
        ok(!!(await p.$('.card-detail .img-credit a[href*="commons.wikimedia.org"]')), '圖片下方有作者、授權與 Commons 連結');
      }
      if ((imgCard.learn?.pop_culture ?? []).length) ok((await p.$$('.card-detail .pop-culture dt')).length >= 1, '研究模式卡片頁有「戲劇 vs 史實」');
      await p.screenshot({ path: `${out}/card-images-1280.png` });
      await p.goto(base + `?mode=research&dive=${d.id}`, { waitUntil: 'networkidle' }); await p.waitForTimeout(1200);
    }
    // 關掉主視覺
    if (hasMap) {
      await p.click('.dv-power .chip:has-text("關")'); await p.waitForTimeout(400);
      ok((await p.$$('.power-label')).length === 0, '按「關」後主視覺消失');
      await p.click(`.dv-power .chip:has-text("${yearsAsc[0]}")`); await p.waitForTimeout(800);
    }
    // 點人物
    // 優先挑「有關係、人生軌跡跨得最廣」的人物（一生都在巴黎一帶的人，地圖上年份會合併成一兩個標籤）
    const span = (c) => { const ls = c.place.locations; const la = ls.map((l) => l.lat), lo = ls.map((l) => l.lng); return Math.max(Math.max(...la) - Math.min(...la), Math.max(...lo) - Math.min(...lo)); };
    const withRel = persons.filter((c) => (c.relations ?? []).length).sort((a, b) => span(b) - span(a));
    const first = withRel[0] ?? persons[0];
    if (hasP) {
      await p.click('.dv-plist > summary'); // 人物清單預設收合
      await p.click(`.dv-card:has-text("${first.name.replace(/（.*$/, '').slice(0, 4)}")`); await p.waitForTimeout(1200);
      ok(!!(await p.$('.card-detail .person-block')), '人物卡顯示「人物資料」區塊');
      ok(!!(await p.$('.card-detail .romaji')), '人物卡標題下有羅馬字');
      ok((await p.$$('.trail-year')).length >= 3, `地圖上畫出人生軌跡年份（${(await p.$$('.trail-year')).length} 點）`);
      ok((await p.$$('.card-detail .pb-rel li')).length >= 1, '人物卡列出和其他人物的關係');
      ok(new URL(p.url()).searchParams.get('card') === first.id, '網址同步 ?card=');
      await p.screenshot({ path: `${out}/${pre(d)}person-research-1280.png` });
      await p.click('.panel-nav .back'); await p.waitForTimeout(600);
      ok(!!(await p.$('.dive-view')), '返回回到專題頁');
    } else {
      // 點一張專題卡再返回
      await p.click('.dv-card:not(.off)'); await p.waitForTimeout(1000);
      ok(!!(await p.$('.card-detail')), '點專題卡打開卡片頁');
      await p.click('.panel-nav .back'); await p.waitForTimeout(600);
      ok(!!(await p.$('.dive-view')) && (!hasMap || (await p.$$('.power-label')).length > 0), '返回回到專題頁，主視覺還在');
    }
    await p.close();

    // ---- 研究模式（手機）----
    const m = await b.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true }); watch(m);
    await m.goto(base + `?mode=research&dive=${d.id}`, { waitUntil: 'networkidle' }); await m.waitForTimeout(1200);
    ok(!!(await m.$('.dive-view')), '手機：?dive= 打開專題頁');
    ok(!!(await m.$('.dive-view button:has-text("在地圖上看")')), '手機：有「在地圖上看」');
    ok(await m.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), '手機：頁面沒有橫向捲動');
    await m.screenshot({ path: `${out}/${pre(d)}dive-mobile-390.png` });
    await m.click('.dive-view button:has-text("在地圖上看")'); await m.waitForTimeout(1200);
    if (hasMap) ok((await m.$$('.power-label')).length >= Math.min(3, d.power_maps[0].powers.filter((x) => !x.minor).length), `手機：地圖分頁顯示${ui.title}（${(await m.$$('.power-label')).length} 個標籤）`);
    await m.screenshot({ path: `${out}/${pre(d)}dive-mobile-map-390.png` });
    if (hasMap && !sg) {
      // 其他年份的手機地圖截圖（切年份在專題頁，再回地圖）
      for (const y of yearsAsc.filter((_, i) => i > 0 && i < yearsAsc.length)) {
        await m.goto(base + `?mode=research&dive=${d.id}`, { waitUntil: 'networkidle' }); await m.waitForTimeout(900);
        await m.click(`.dv-power .chip:has-text("${y}")`); await m.waitForTimeout(500);
        await m.click('.dive-view button:has-text("在地圖上看")'); await m.waitForTimeout(1200);
        ok((await m.$$('.power-label')).length >= 1, `手機：${y} 年地圖有標籤（${(await m.$$('.power-label')).length}）`);
        await m.screenshot({ path: `${out}/${pre(d)}power-${y}-mobile-390.png` });
      }
    }
    await m.close();

    // ---- 學習模式：人物卡（戰國）----
    if (hasP) {
      const l = await b.newPage({ viewport: { width: 1280, height: 900 } }); watch(l);
      await l.goto(base + `?mode=learn&card=${first.id}`, { waitUntil: 'networkidle' }); await l.waitForTimeout(1200);
      const lc = await l.$('.lcard');
      ok(!!lc, '學習模式可以打開人物卡');
      if (lc) { ok(!!(await l.$('.lcard .person-block')), '學習模式人物卡也有「人物資料」區塊'); await l.screenshot({ path: `${out}/${pre(d)}person-learn-1280.png` }); }
      await l.close();
    }

    // ---- 學習模式：專題頁 ----
    const ld = await b.newPage({ viewport: { width: 1280, height: 900 } }); watch(ld);
    await ld.goto(base + `?mode=learn&dive=${d.id}`, { waitUntil: 'networkidle' }); await ld.waitForTimeout(1500);
    ok(!!(await ld.$('.dive-view')), '學習模式網址 ?dive= 打開專題頁');
    if (hasMap) ok((await ld.$$('.power-label')).length >= Math.min(3, d.power_maps[0].powers.filter((x) => !x.minor).length), `學習模式地圖也疊上${ui.title}（${(await ld.$$('.power-label')).length}）`);
    if (hasP) ok(!!(await ld.$('.rel-graph')), '學習模式專題頁有人物關係網');
    else ok(!(await ld.$('.rel-graph')) && !((await ld.textContent('.dive-view')) || '').includes('位人物'), '學習模式：沒有人物卡就不顯示人物區');
    if (d.units.length) {
      ok((await ld.$$('.dive-view .dv-read .dv-story.unit')).length === d.units.length, `學習模式專題頁列出全部學習單元（${(await ld.$$('.dive-view .dv-read .dv-story.unit')).length}）`);
      const order = await ld.$$eval('.dive-view > .dv-sec', (els) => els.map((e) => e.id.replace(/-dive-.*$/, '')));
      // 讀書專題：深時間軸、照書讀在前，之後才是單元
      const o2 = d.book ? order.filter((x) => x !== 'dv-deep' && x !== 'dv-book') : order;
      ok(o2[0] === 'dv-read', `學習模式專題頁：單元排第一（${order.join('、')}）`);
      ok(!!(await ld.$('.dive-view .dv-start')), '學習模式第 1 課標「從這裡開始」');
    }
    if (hasMap) ok(!(await ld.$eval('.dv-power', (e) => e.open)), `學習模式${ui.title}預設收合`);
    ok((await ld.$$('.dive-view > .dv-sec:not(.bk) .dv-card.off')).length === noLearn.length, `學習模式灰字卡數 = 還沒進學習模式的卡數（${noLearn.length}）`);
    ok((await ld.$$('.dive-view > .dv-sec:not(.bk) .dv-card:not(.off)')).length === d.cards.length - noLearn.length, `學習模式可點的卡 ${d.cards.length - noLearn.length} 張`);
    await ld.screenshot({ path: `${out}/${pre(d)}dive-learn-1280.png` });
    if (d.units.length > 1) {
      const u0 = ix.units.find((x) => x.id === d.units[1]);
      await ld.goto(base + `?mode=learn&unit=${u0.id}`, { waitUntil: 'networkidle' }); await ld.waitForTimeout(800);
      ok(((await ld.textContent('.unit-dive')) || '').includes(`第 2／${d.units.length} 課`), '單元頁顯示「專題 第 N／M 課」');
    }
    const popCard = withPop.find((c) => c.learn);
    if (sg && popCard) {
      await ld.goto(base + `?mode=learn&card=${popCard.id}`, { waitUntil: 'networkidle' }); await ld.waitForTimeout(1200);
      ok((await ld.$$('.lcard .pop-culture dt')).length >= 1, `學習模式卡片有「戲劇 vs 史實」（${popCard.id}）`);
      await ld.screenshot({ path: `${out}/pop-culture-learn-1280.png` });
    }
    await ld.close();

    // ---- 學習模式（手機）----
    const lm = await b.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true }); watch(lm);
    await lm.goto(base + `?mode=learn&dive=${d.id}`, { waitUntil: 'networkidle' }); await lm.waitForTimeout(1200);
    ok(!!(await lm.$('.dive-view')), '手機學習模式：打開專題頁');
    ok(await lm.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), '手機學習模式：頁面沒有橫向捲動');
    await lm.screenshot({ path: `${out}/${pre(d)}dive-learn-mobile-390.png` });
    await lm.close();
  }

  // ---- 專題清單與入口 ----
  const lp = await b.newPage({ viewport: { width: 1280, height: 900 } }); watch(lp);
  await lp.goto(base + '?mode=research', { waitUntil: 'networkidle' }); await lp.waitForTimeout(800);
  await lp.click('header .btn:has-text("專題")'); await lp.waitForTimeout(500);
  ok((await lp.$$('.di-item')).length === dives.length, `頂端「專題」按鈕打開專題清單（${dives.length} 筆）`);
  const metas = await lp.$$eval('.di-item .di-meta', (els) => els.map((e) => e.textContent));
  ok(metas.every((t) => !/\b0 位人物/.test(t)), `專題清單的卡數說明沒有「0 位人物」（${metas.join(' ／ ')}）`);
  await lp.screenshot({ path: `${out}/dive-index-1280.png` });
  await lp.goto(base + '?mode=learn', { waitUntil: 'networkidle' }); await lp.waitForTimeout(800);
  ok((await lp.$$('.home-dives .di-item')).length === dives.length, '學習首頁有專題入口（自動從 index.dives 產生）');
  const lmetas = await lp.$$eval('.home-dives .di-meta', (els) => els.map((e) => e.textContent));
  ok(lmetas.every((t) => !/\b0 位人物/.test(t)), '學習首頁的專題入口沒有「0 位人物」');
  await lp.close();

  ok(errs.length === 0, `沒有 JS 錯誤${errs.length ? '：' + errs.slice(0, 3).join(' | ') : ''}`);
  await b.close();
  console.log(fail ? `\n${fail} 項未通過` : '\n全部通過');
  process.exit(fail ? 1 : 0);
})();
