// node labels.cjs baseUrl → 地圖名稱都是「繁體中文＋英文」：
// 底圖地名層有畫出來、每個地名都有中文和英文；案例地點、路線、疆域、今日咽喉的提示框也都中英並列
const { chromium } = require('playwright');
const CJK = /[㐀-鿿]/, LATIN = /[A-Za-z]/;
(async () => {
  const base = process.argv[2];
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1280, height: 860 } });
  const errs = [];
  p.on('pageerror', (e) => errs.push(String(e)));
  const fails = [];
  const ok = (cond, msg) => { console.log(`${cond ? '✓' : '✗'} ${msg}`); if (!cond) fails.push(msg); };

  await p.goto(`${base}?mode=research`, { waitUntil: 'networkidle' });
  await p.waitForTimeout(1200);
  const basemap = await p.evaluate(() => ['basemap-vector', 'basemap-raster'].find((c) => document.querySelector('.leaflet-container')?.classList.contains(c)));
  ok(!!basemap, `底圖已載入（${basemap}）`);
  const labels = await p.$$eval('.bm-l', (xs) => xs.map((x) => [x.querySelector('b')?.textContent ?? '', x.querySelector('small')?.textContent ?? '']));
  ok(labels.length >= 20, `底圖地名 ${labels.length} 個`);
  const bad = labels.filter(([zh, en]) => !CJK.test(zh) || !LATIN.test(en));
  ok(bad.length === 0, `每個地名都有中文＋英文${bad.length ? '；有問題：' + bad.slice(0, 5).join('／') : ''}`);
  ok(labels.some(([zh]) => zh === '地中海'), '看得到「地中海 Mediterranean Sea」');

  // 放大兩級，城市名要變多
  await p.click('.leaflet-control-zoom-in'); await p.waitForTimeout(800);
  await p.click('.leaflet-control-zoom-in'); await p.waitForTimeout(1000);
  const cities = await p.$$eval('.bm-t, .bm-T', (xs) => xs.length);
  ok(cities >= 5, `放大後城市名 ${cities} 個`);

  // 提示框：把地圖上每個看得到的小標記（地點圓點、編號、站點、路線）逐一用滑鼠移過去，提示框都要中英並列。
  // 舊寫法只移到「第一個」可互動圖形，那常是被 canvas 圖層蓋住的大色塊，提示框有沒有出現全看運氣（2026-11-03 起時好時壞）。
  const sweep = async (url, limit = 40) => {
    await p.goto(url, { waitUntil: 'networkidle' });
    await p.waitForTimeout(1800);
    const [x0, y0, x1, y1] = await p.$eval('.leaflet-container', (x) => { const r = x.getBoundingClientRect(); return [r.x, r.y, r.right, r.bottom]; });
    const pts = await p.$$eval('.leaflet-overlay-pane svg .leaflet-interactive, .leaflet-marker-pane .leaflet-interactive', (xs) => xs.map((x) => {
      const r = x.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2, w: r.width, h: r.height };
    }));
    const tips = new Set();
    let n = 0;
    for (const q of pts) {
      if (!q.w || q.w > 60 || q.h > 60 || q.x < x0 + 5 || q.y < y0 + 5 || q.x > x1 - 5 || q.y > y1 - 5) continue;
      if (n++ >= limit) break;
      await p.mouse.move(q.x, q.y); await p.waitForTimeout(100);
      for (const t of await p.$$eval('.leaflet-tooltip', (xs) => xs.map((x) => x.textContent.trim()))) if (t) tips.add(t);
    }
    await p.mouse.move(x0 + 2, y0 + 2);
    return [...tips];
  };
  const tipCheck = (what, tips, must) => {
    const bad = tips.filter((t) => !CJK.test(t) || !LATIN.test(t));
    ok(tips.length >= 3 && bad.length === 0 && (!must || tips.some((t) => must.test(t))),
      `地圖提示框中英並列（${what}，${tips.length} 個）${bad.length ? '；缺中文或英文：' + bad.slice(0, 3).map((t) => t.slice(0, 40)).join('／') : '：' + (tips.find((t) => !must || must.test(t)) ?? '').slice(0, 50)}`);
  };
  tipCheck('案例地點', await sweep(`${base}?mode=research&card=building-acropolis`), /Athens/);
  tipCheck('物資鏈站點', await sweep(`${base}?mode=research&chain=chain-silk`), /^\d+\. .*[A-Za-z]/);
  tipCheck('主題編號', await sweep(`${base}?mode=research&topic=${encodeURIComponent('殖民統治')}`));
  tipCheck('專題編號與人生軌跡', await sweep(`${base}?mode=research&card=person-oda-nobunaga`));
  tipCheck('深入專題', await sweep(`${base}?mode=research&dive=dive-sengoku`));
  tipCheck('遷徙路線', await sweep(`${base}?mode=research&peoples=migrations`), /Austronesian|Han Chinese|Bantu/);
  tipCheck('學習模式主題', await sweep(`${base}?mode=learn&topic=${encodeURIComponent('殖民統治')}`));
  await p.goto(`${base}?mode=research&card=building-acropolis`, { waitUntil: 'networkidle' });
  await p.waitForTimeout(1500);
  const head = await p.$$eval('.card-detail .locs .en', (xs) => xs.map((x) => x.textContent).join(' '));
  ok(/Athens/.test(head), `卡片地點有英文：${head.slice(0, 50)}`);

  // 今日對照層：咽喉標記上的字
  await p.goto(`${base}?mode=research&today=today-hormuz`, { waitUntil: 'networkidle' });
  await p.waitForTimeout(1500);
  const today = await p.$$eval('.today-mk span', (xs) => xs.map((x) => x.textContent));
  ok(today.length > 0 && today.every((t) => CJK.test(t) && LATIN.test(t)), `今日咽喉標記中英並列：${today.slice(0, 2).join('／')}`);

  // 學習模式也一樣
  await p.goto(`${base}?mode=learn&history=china`, { waitUntil: 'networkidle' });
  await p.waitForTimeout(1500);
  const learnLabels = await p.$$eval('.bm-l', (xs) => xs.length);
  ok(learnLabels >= 10, `學習模式地圖地名 ${learnLabels} 個`);

  ok(errs.length === 0, errs.length ? `頁面錯誤：${errs[0]}` : '沒有頁面錯誤');
  console.log(fails.length ? `有 ${fails.length} 項沒通過` : '地圖名稱檢查全部通過');
  await b.close();
  process.exit(fails.length ? 1 : 0);
})();
