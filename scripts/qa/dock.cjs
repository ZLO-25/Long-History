// node dock.cjs baseUrl [截圖資料夾] → 三個區塊：拖曳換位置、浮動小窗、新視窗連動、效能、⟲ 版面復原、手機不受影響
const { chromium } = require('playwright');
const out = process.argv[3] || 'docs/screenshots/dock';
let fail = 0;
const ok = (name, cond, extra = '') => { console.log(`${cond ? '✓' : '✗'} ${name}${extra ? '　' + extra : ''}`); if (!cond) fail++; };
(async () => {
  const base = process.argv[2];
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 1280, height: 800 } });
  const p = await ctx.newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(String(e) + (process.env.STACK ? e.stack : '')));
  p.on('console', (m) => { if (m.type() === 'error' && !/tile|ERR_TUNNEL|ERR_NAME|ERR_PROXY|favicon|Failed to load resource/.test(m.text())) errs.push(m.text()); });
  const cell = (id) => `.dock-cell[data-panel="${id}"]`;
  const slotOf = (page, id) => page.$eval(cell(id), (e) => e.dataset.slot ?? (e.classList.contains('floating') ? 'float' : '?')).catch(() => 'none');
  const center = async (page, sel) => { const bb = await (await page.$(sel)).boundingBox(); return [bb.x + bb.width / 2, bb.y + bb.height / 2, bb]; };
  const drag = async (page, sel, tx, ty) => {
    const [x, y] = await center(page, sel);
    await page.mouse.move(x, y); await page.mouse.down();
    await page.mouse.move((x + tx) / 2, (y + ty) / 2, { steps: 8 }); await page.mouse.move(tx, ty, { steps: 8 }); await page.mouse.up();
    await page.waitForTimeout(250);
  };

  // ── 研究模式 ──
  await p.goto(base + '?mode=research&card=war-peloponnesian', { waitUntil: 'networkidle' }); await p.waitForTimeout(1000);
  ok('研究：初始 地圖=a 卡片欄=b 時間軸=c', (await slotOf(p, 'map')) === 'a' && (await slotOf(p, 'side')) === 'b' && (await slotOf(p, 'tl')) === 'c');
  ok('研究：預設沒有 ⟲ 版面', !(await p.$('.layout-reset')));

  // 1. 拖地圖標題到卡片欄上 → 交換
  const [sx, sy] = await center(p, cell('side'));
  await drag(p, `${cell('map')} .dock-handle`, sx, sy);
  ok('研究：拖地圖到卡片欄 → 交換位置', (await slotOf(p, 'map')) === 'b' && (await slotOf(p, 'side')) === 'a');
  const mapW = (await (await p.$(`${cell('map')} .leaflet-container`)).boundingBox()).width;
  ok('研究：換位後地圖重新量尺寸（沒有留白）', Math.abs(mapW - (await (await p.$(cell('map'))).boundingBox()).width) < 3, `地圖寬 ${Math.round(mapW)}`);
  await p.screenshot({ path: `${out}/research-swapped.png` });
  await p.reload({ waitUntil: 'networkidle' }); await p.waitForTimeout(800);
  ok('研究：重新整理後記住新位置', (await slotOf(p, 'map')) === 'b');
  // 鍵盤換位：焦點在時間軸標題，按 ← 與 b 交換
  await p.focus(`${cell('tl')} .dock-handle`); await p.keyboard.press('ArrowLeft'); await p.waitForTimeout(200);
  ok('研究：鍵盤 ← 也能換位置', (await slotOf(p, 'tl')) === 'b' && (await slotOf(p, 'map')) === 'c');
  await p.click('.layout-reset'); await p.waitForTimeout(300);
  ok('研究：⟲ 版面 → 位置恢復預設', (await slotOf(p, 'map')) === 'a' && (await slotOf(p, 'tl')) === 'c');

  // 2. 浮動小窗：時間軸變浮動、拖動、拉大小
  await p.click(`${cell('tl')} .dock-btn:has-text("浮動")`); await p.waitForTimeout(300);
  ok('研究：時間軸變成浮動小窗', (await slotOf(p, 'tl')) === 'float');
  const mapH0 = (await (await p.$(cell('map'))).boundingBox()).height;
  ok('研究：時間軸浮出後，地圖補滿高度', mapH0 > 700, `地圖高 ${Math.round(mapH0)}`);
  const fb0 = (await (await p.$(cell('tl'))).boundingBox());
  // 效能：拖動浮動小窗時量長任務（>50ms 會卡）與 React 是否重畫
  await p.evaluate(() => { window.__long = []; new PerformanceObserver((l) => window.__long.push(...l.getEntries().map((e) => e.duration))).observe({ type: 'longtask', buffered: false }); });
  const t0 = Date.now();
  const [hx, hy] = await center(p, `${cell('tl')} .dock-handle`);
  await p.mouse.move(hx, hy); await p.mouse.down();
  for (let i = 1; i <= 40; i++) await p.mouse.move(hx + i * 5, hy - i * 6);
  await p.mouse.up(); await p.waitForTimeout(250);
  const dragMs = Date.now() - t0;
  const longs = await p.evaluate(() => window.__long);
  const fb1 = (await (await p.$(cell('tl'))).boundingBox());
  ok('研究：浮動小窗可以拖動', Math.abs(fb1.x - fb0.x) > 150 && Math.abs(fb1.y - fb0.y) > 150, `移動 (${Math.round(fb1.x - fb0.x)}, ${Math.round(fb1.y - fb0.y)})`);
  ok('效能：拖動 40 步沒有超過 50ms 的卡頓', longs.length === 0, `長任務 ${longs.length} 個、總耗時 ${dragMs}ms`);
  const [rx, ry] = await center(p, `${cell('tl')} .dock-resize`);
  await p.mouse.move(rx, ry); await p.mouse.down(); await p.mouse.move(rx + 120, ry + 60, { steps: 10 }); await p.mouse.up(); await p.waitForTimeout(200);
  const fb2 = (await (await p.$(cell('tl'))).boundingBox());
  ok('研究：浮動小窗可以拉大小', fb2.width - fb1.width > 100 && fb2.height - fb1.height > 40, `${Math.round(fb1.width)}×${Math.round(fb1.height)} → ${Math.round(fb2.width)}×${Math.round(fb2.height)}`);
  // 連動：浮動時間軸上點一張卡 → 卡片欄跟著換；卡片欄開別張 → 時間軸的選取跟著換
  const node = await p.$(`${cell('tl')} g.node:not(.sel)`);
  const nodeCount = (await p.$$(`${cell('tl')} g.node`)).length;
  await node.click({ force: true }); await p.waitForTimeout(300);
  const selId1 = await p.evaluate(() => new URLSearchParams(location.search).get('card'));
  ok('連動：點浮動時間軸上的卡 → 卡片欄打開那張卡', !!selId1 && selId1 !== 'war-peloponnesian' && !!(await p.$(`${cell('side')} h1, ${cell('side')} h2`)), `card=${selId1}、時間軸 ${nodeCount} 個點`);
  ok('連動：浮動時間軸標出選中的卡', (await p.$$(`${cell('tl')} g.node.sel`)).length >= 1);
  await p.screenshot({ path: `${out}/research-floating.png` });
  await p.reload({ waitUntil: 'networkidle' }); await p.waitForTimeout(800);
  ok('研究：重新整理後浮動小窗還在原位置', (await slotOf(p, 'tl')) === 'float' && Math.abs((await (await p.$(cell('tl'))).boundingBox()).x - fb2.x) < 3);
  await p.click(`${cell('tl')} .dock-btn:has-text("放回")`); await p.waitForTimeout(200);
  ok('研究：⊟ 放回 → 時間軸回到下方', (await slotOf(p, 'tl')) === 'c');

  // 3. 新視窗：地圖拉出去
  const [pop] = await Promise.all([ctx.waitForEvent('page'), p.click(`${cell('map')} .dock-btn:has-text("新視窗")`)]);
  await pop.waitForTimeout(1500);
  ok('新視窗：地圖拉出成新視窗', !!(await pop.$('.popout .dock-cell[data-panel="map"] .leaflet-container')), `視窗標題「${await pop.title()}」`);
  ok('新視窗：主視窗剩下兩塊，卡片欄補滿寬度', !(await p.$(cell('map'))) && (await (await p.$(cell('side'))).boundingBox()).width > 1200);
  ok('新視窗：主視窗表頭出現「↩ 收回地圖」', !!(await p.$('.dock-back')));
  const sz = await pop.evaluate(() => { const r = document.querySelector('.leaflet-container').getBoundingClientRect(); return [r.width, r.height]; });
  ok('新視窗：地圖填滿新視窗', sz[0] > 400 && sz[1] > 300, `${Math.round(sz[0])}×${Math.round(sz[1])}`);
  // 新視窗裡拖地圖（要靠事件轉送才拖得動）
  const tf0 = await pop.$eval('.leaflet-map-pane', (e) => e.style.transform);
  const box = await (await pop.$('.leaflet-container')).boundingBox();
  await pop.mouse.move(box.x + box.width / 2, box.y + box.height / 2); await pop.mouse.down();
  await pop.mouse.move(box.x + box.width / 2 - 150, box.y + box.height / 2 - 80, { steps: 10 }); await pop.mouse.up(); await pop.waitForTimeout(300);
  const tf1 = await pop.$eval('.leaflet-map-pane', (e) => e.style.transform);
  ok('新視窗：地圖可以拖曳平移', tf0 !== tf1, `${tf0} → ${tf1}`);
  // 連動：主視窗換一張卡 → 新視窗的地圖紅圈跟著換
  const pulse0 = await pop.$$eval('path.pulse', (x) => x.length);
  await p.click(`${cell('tl')} g.node:not(.sel)`, { force: true }); await p.waitForTimeout(500);
  const card2 = await p.evaluate(() => new URLSearchParams(location.search).get('card'));
  const pulse1 = await pop.$$eval('path.pulse', (x) => x.map((e) => e.getAttribute('d')).join('|'));
  ok('連動：主視窗開卡 → 新視窗地圖標出該卡地點', pulse1.length > 0 && card2 !== selId1, `card=${card2}、紅圈 ${pulse0}→${pulse1.split('|').length}`);
  // 連動：新視窗的地圖上點一個地點 → 主視窗卡片欄打開地點頁
  // 找一個在新視窗畫面內的地點點擊
  const hit = await pop.evaluate(() => { const r0 = document.querySelector('.leaflet-container').getBoundingClientRect();
    for (const e of document.querySelectorAll('path.leaflet-interactive:not(.pulse)')) { const r = e.getBoundingClientRect(); const x = r.x + r.width / 2, y = r.y + r.height / 2;
      if (r.width > 0 && x > r0.x + 40 && x < r0.right - 40 && y > r0.y + 80 && y < r0.bottom - 80 && document.elementFromPoint(x, y) === e) return [x, y]; } return null; });
  if (hit) { await pop.mouse.click(hit[0], hit[1]); await p.waitForTimeout(400); }
  ok('連動：新視窗地圖點地點 → 主視窗打開地點清單', !!(await p.$(`${cell('side')} .result`)) && (await p.$eval(`${cell('side')} .dock-handle`, (e) => e.textContent)).includes('地點'));
  // 效能：主視窗拉時間軸（年份一直變），新視窗地圖也在重畫時的長任務
  await p.evaluate(() => { window.__long = []; new PerformanceObserver((l) => window.__long.push(...l.getEntries().map((e) => e.duration))).observe({ type: 'longtask', buffered: false }); });
  const cur = await center(p, `${cell('tl')} .cursor-hit`);
  await p.mouse.move(cur[0], cur[1]); await p.mouse.down();
  for (let i = 1; i <= 30; i++) await p.mouse.move(cur[0] + i * 8, cur[1]);
  await p.mouse.up(); await p.waitForTimeout(300);
  const longs2 = await p.evaluate(() => window.__long);
  const yrMain = await p.$eval('.tl-year', (e) => e.textContent);
  ok('效能：新視窗開著時拖年份，沒有明顯卡頓', longs2.filter((d) => d > 200).length === 0, `長任務 ${longs2.length} 個（最長 ${Math.round(Math.max(0, ...longs2))}ms）、${yrMain}`);
  await p.screenshot({ path: `${out}/research-popout-main.png` });
  await pop.screenshot({ path: `${out}/research-popout-map.png` });
  // 關掉新視窗 → 自動收回
  await pop.close(); await p.waitForTimeout(400);
  ok('新視窗：直接關掉視窗 → 地圖自動回到主視窗', (await slotOf(p, 'map')) === 'a' && !(await p.$('.dock-back')));
  // 拉出卡片欄＋時間軸浮動，再按 ⟲ 版面 → 全部歸位、新視窗關掉
  const [pop2] = await Promise.all([ctx.waitForEvent('page'), p.click(`${cell('side')} .dock-btn:has-text("新視窗")`)]);
  await pop2.waitForTimeout(500);
  ok('新視窗：卡片欄也能拉出去', !!(await pop2.$('.popout .panel')));
  await p.click(`${cell('tl')} .dock-btn:has-text("浮動")`); await p.waitForTimeout(200);
  await p.click('.layout-reset'); await p.waitForTimeout(400);
  ok('⟲ 版面：新視窗被關掉、浮動放回、全部回預設', pop2.isClosed() && (await slotOf(p, 'side')) === 'b' && (await slotOf(p, 'tl')) === 'c' && !(await p.$('.layout-reset')));

  // ── 學習模式 ──
  await p.goto(base + '?mode=learn&history=taiwan', { waitUntil: 'networkidle' }); await p.waitForTimeout(1000);
  ok('學習：初始 文字欄=a 地圖=b 時間軸=c', (await slotOf(p, 'content')) === 'a' && (await slotOf(p, 'map')) === 'b' && (await slotOf(p, 'tl')) === 'c');
  const [mx, my] = await center(p, cell('map'));
  await drag(p, `${cell('tl')} .dock-handle`, mx, my);
  ok('學習：拖時間軸到地圖 → 交換（時間軸到右邊、地圖到下方）', (await slotOf(p, 'tl')) === 'b' && (await slotOf(p, 'map')) === 'c');
  const mh = (await (await p.$(cell('map'))).boundingBox()).height;
  ok('學習：地圖放到下方時有足夠高度', mh > 200, `高 ${Math.round(mh)}`);
  await p.screenshot({ path: `${out}/learn-swapped.png` });
  await p.click(`${cell('map')} .dock-btn:has-text("浮動")`); await p.waitForTimeout(300);
  ok('學習：地圖變成浮動小窗', (await slotOf(p, 'map')) === 'float');
  const [lpop] = await Promise.all([ctx.waitForEvent('page'), p.click(`${cell('tl')} .dock-btn:has-text("新視窗")`)]);
  await lpop.waitForTimeout(800);
  ok('學習：時間軸拉出成新視窗', !!(await lpop.$('.popout.learn .dock-cell[data-panel="tl"] svg')));
  await p.screenshot({ path: `${out}/learn-float-pop.png` });
  await lpop.screenshot({ path: `${out}/learn-popout-tl.png` });
  // 連動：新視窗時間軸點卡 → 主視窗文字欄打開那張卡
  const ln = await lpop.$('.popout svg g[class*="node"], .popout svg circle');
  if (ln) { await ln.click({ force: true }); await p.waitForTimeout(500); }
  ok('連動：學習模式新視窗時間軸點卡 → 主視窗打開卡片', (await p.evaluate(() => new URLSearchParams(location.search).get('card'))) != null);
  await p.click('.layout-reset'); await p.waitForTimeout(400);
  ok('學習：⟲ 版面 → 全部歸位', lpop.isClosed() && (await slotOf(p, 'content')) === 'a' && (await slotOf(p, 'map')) === 'b' && (await slotOf(p, 'tl')) === 'c');

  // ── 手機 ──
  const m = await b.newPage({ viewport: { width: 390, height: 800 }, isMobile: true, hasTouch: true });
  await m.goto(base + '?mode=research', { waitUntil: 'networkidle' }); await m.waitForTimeout(500);
  const m1 = await m.$$('.dock-bar');
  await m.goto(base + '?mode=learn', { waitUntil: 'networkidle' }); await m.waitForTimeout(500);
  ok('手機：沒有區塊標題列，維持原本分頁', !m1.length && !(await m.$$('.dock-bar')).length && !!(await m.$('.ltabs')));

  ok('console 沒有錯誤', errs.length === 0, errs.slice(0, 3).join(' / '));
  console.log(fail ? `${fail} 項失敗` : '全部通過');
  await b.close(); process.exit(fail ? 1 : 0);
})();
