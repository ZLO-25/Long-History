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

  // 提示框：案例地點
  const tipOf = async (sel) => {
    const el = p.locator(sel).first();
    await el.hover({ force: true }); await p.waitForTimeout(300);
    return (await p.$$eval('.leaflet-tooltip', (xs) => xs.map((x) => x.textContent).join(' ')));
  };
  await p.goto(`${base}?mode=research&card=building-acropolis`, { waitUntil: 'networkidle' });
  await p.waitForTimeout(1500);
  const placeTip = await tipOf('path.leaflet-interactive[fill-opacity="0.95"], path.leaflet-interactive');
  ok(CJK.test(placeTip) && LATIN.test(placeTip), `地圖提示框中英並列：${placeTip.slice(0, 60)}`);
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
