// node peoples.cjs baseUrl → 人群圖層：開關、語系上色、語言點、國家卡、臺灣放大鏡、為什麼不畫人種、八條大遷徙（清單、單條、時間播放）、學習模式、手機
const { chromium } = require('playwright');
(async () => {
  const base = process.argv[2];
  const b = await chromium.launch();
  const fails = [];
  const ok = (cond, msg) => { console.log(`${cond ? '✓' : '✗'} ${msg}`); if (!cond) fails.push(msg); };
  const page = async (w, h) => {
    const p = await b.newPage({ viewport: { width: w, height: h } });
    p.errs = [];
    p.on('pageerror', (e) => p.errs.push(String(e)));
    p.on('console', (m) => { if (m.type() === 'error' && !/openfreemap|ERR_TUNNEL|Failed to fetch|Failed to load resource/.test(m.text())) p.errs.push(m.text()); });
    return p;
  };
  const panelText = (p) => p.$eval('.people-panel', (x) => x.textContent);

  // 1. 研究模式：按「◎ 人群」打開圖層
  const p = await page(1280, 860);
  await p.goto(`${base}?mode=research`, { waitUntil: 'networkidle' });
  await p.waitForTimeout(1000);
  await p.click('.peoples-toggle');
  await p.waitForTimeout(2500);
  ok(await p.$eval('.peoples-toggle', (x) => x.classList.contains('on')), '按「◎ 人群」後按鈕變成打開');
  let t = await panelText(p);
  ok(t.includes('這個地方住的主要是哪些人'), '右欄出現人群圖層說明');
  ok(t.includes('南島語系') && t.includes('印歐語系') && t.includes('多個語系人數相近'), '說明頁列出語系圖例');
  ok(await p.$('.lg-peoples') !== null, '地圖圖例有人群（今天）區塊');
  ok(new URL(p.url()).searchParams.get('peoples') === 'intro', `網址跟著變成 ?peoples=intro（${p.url()}）`);
  const canvases = await p.$$eval('.leaflet-peoples-pane canvas', (xs) => xs.length);
  ok(canvases >= 1, '國家上色畫在 canvas（效能）');
  ok(await p.$$eval('.leaflet-overlay-pane path.leaflet-interactive', (xs) => xs.length) === 0, '案例地點與路線在人群圖層打開時收起');

  // 2. 點一個國家（用網址）→ 國家卡
  await p.goto(`${base}?mode=research&peoples=India`, { waitUntil: 'networkidle' });
  await p.waitForTimeout(2500);
  t = await panelText(p);
  ok(t.includes('印度') && t.includes('印歐語系') && t.includes('印地語') && t.includes('43.6%'), '印度卡：語系、主要語言與比例');
  ok(t.includes('達羅毗荼'), '印度卡：補充說明南部的達羅毗荼語系');
  ok(t.includes('資料截至') && t.includes('世界概況'), '印度卡：標資料截至與來源');
  ok(await p.$$eval('.people-panel .pb-bar b', (xs) => xs.length) >= 5, '比例畫成長條');
  const src = await p.$eval('.people-panel ol.sources a', (a) => a.href);
  ok(/factbook\.json\/blob\/[0-9a-f]{40}\/south-asia\/in\.json/.test(src), `原文連結指向固定版本的世界概況檔案（${src.slice(-40)}）`);
  await p.goto(`${base}?mode=research&peoples=Germany`, { waitUntil: 'networkidle' });
  await p.waitForTimeout(2000);
  ok((await panelText(p)).includes('依國籍'), '德國卡：說明是依國籍統計');

  // 3. 臺灣放大鏡
  await p.goto(`${base}?mode=research&peoples=Taiwan`, { waitUntil: 'networkidle' });
  await p.waitForTimeout(3500);
  t = await panelText(p);
  ok(t.includes('62.9 萬人') && t.includes('2.7%'), '臺灣：原住民 62.9 萬人、2.7%');
  ok(t.includes('466.9 萬人') && t.includes('19.8%') && t.includes('1.5%'), '臺灣：客家 19.8% 與「主要說客語 1.5%」對照');
  ok(t.includes('官方承認的 17 個原住民族') && t.includes('西拉雅族'), '臺灣：17 族（含 2026 年認定的西拉雅族）');
  ok(await p.$$eval('.p-tribes li', (xs) => xs.length) === 17, '臺灣：族名清單 17 項');
  const zoom = Number(await p.$eval('.leaflet-container', (x) => x.dataset.zoom));
  ok(zoom >= 6, `地圖放大到臺灣（zoom ${zoom}）`);
  const tribes = await p.$$eval('.tribe-label', (xs) => xs.filter((x) => x.style.visibility !== 'hidden').map((x) => x.textContent));
  ok(tribes.length >= 4, `地圖上看得到族名標籤 ${tribes.length} 個（重疊的先藏起來）`);
  await p.click('.leaflet-control-zoom-in'); await p.waitForTimeout(800);
  await p.click('.leaflet-control-zoom-in'); await p.waitForTimeout(1000);
  const tribes2 = await p.$$eval('.tribe-label', (xs) => xs.filter((x) => x.style.visibility !== 'hidden').length);
  ok(tribes2 >= tribes.length, `放大後族名不會變少（${tribes2}）`);

  // 4. 為什麼不畫人種
  await p.goto(`${base}?mode=research&peoples=about`, { waitUntil: 'networkidle' });
  await p.waitForTimeout(1500);
  t = await panelText(p);
  ok(t.includes('為什麼地圖上不畫「人種」') && t.includes('社會建構') && t.includes('說什麼話') && t.includes('祖先從哪裡來'), '說明頁：三個理由與三種問法');
  await p.click('.people-panel button.link:has-text("巴西")');
  await p.waitForTimeout(800);
  ok((await panelText(p)).includes('混血'), '說明頁的國家例子可以點進國家卡');
  // 關掉圖層 → 回到上一頁、案例地點回來
  await p.click('.peoples-toggle'); await p.waitForTimeout(800);
  ok(await p.$('.people-panel') === null || !(await p.$eval('.peoples-toggle', (x) => x.classList.contains('on'))), '再按一次「◎ 人群」關閉圖層');
  ok(p.errs.length === 0, `研究模式沒有錯誤${p.errs.length ? '：' + p.errs.slice(0, 3).join(' / ') : ''}`);

  // 4b. 八條大遷徙
  await p.goto(`${base}?mode=research&peoples=migrations`, { waitUntil: 'networkidle' });
  await p.waitForTimeout(2500);
  t = await panelText(p);
  ok(t.includes('八條大遷徙') && (await p.$$eval('.mig-list li', (xs) => xs.length)) === 8, '遷徙清單：8 條');
  ok(await p.$$eval('.leaflet-overlay-pane path', (xs) => xs.filter((x) => x.getAttribute('stroke-dasharray') === '3 7').length) >= 30, '清單頁：地圖畫出全部遷徙線');
  await p.click('.mig-row:has-text("南島語族")'); await p.waitForTimeout(2500);
  ok(new URL(p.url()).searchParams.get('peoples') === 'mig-austronesian', `點清單 → 網址變成 mig-austronesian（${p.url().slice(-30)}）`);
  t = await panelText(p);
  ok(t.includes('巴丹群島') && t.includes('拉皮塔') && t.includes('基因（DNA）的證據') && t.includes('學界還在爭的事'), '南島：站點、三種證據、爭議');
  ok(await p.$$eval('.mig-stations li', (xs) => xs.length && xs.every((li) => li.querySelector('a.ref'))), '南島：每站都有來源連結');
  ok(await p.$('.mig-play') !== null, '單條遷徙：地圖上有時間播放');
  const n0 = await p.$$eval('.mig-stop', (xs) => xs.length);
  await p.$eval('.mig-play input[type=range]', (x) => { Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set.call(x, '0'); x.dispatchEvent(new Event('input', { bubbles: true })); });
  await p.waitForTimeout(800);
  const n1 = await p.$$eval('.mig-stop', (xs) => xs.length);
  ok(n1 < n0 && n1 >= 1, `拖到最早：站點變少（${n0} → ${n1}）`);
  await p.click('.mig-play button'); await p.waitForTimeout(4000);
  ok((await p.$$eval('.mig-stop', (xs) => xs.length)) > n1, '按播放：站點依年代長出來');
  await p.goto(`${base}?mode=research&peoples=mig-han-south`, { waitUntil: 'networkidle' });
  await p.waitForTimeout(2500);
  t = await panelText(p);
  ok(t.includes('永嘉') && t.includes('客家'), '漢人南移：永嘉之亂、客家');
  await p.click('.people-panel button.link:has-text("秦")'); await p.waitForTimeout(1500);
  ok(new URL(p.url()).searchParams.get('card') === 'war-qin-lingnan', `相關卡片可以點進去（${new URL(p.url()).searchParams.get('card')}）`);
  await p.goto(`${base}?mode=research&peoples=Taiwan`, { waitUntil: 'networkidle' });
  await p.waitForTimeout(2500);
  ok(await p.$('.mig-chip:has-text("南島語族")') !== null && await p.$('.mig-chip:has-text("漢人南移")') !== null, '臺灣頁：連到南島、漢人南移兩條遷徙');
  ok(p.errs.length === 0, `遷徙頁沒有錯誤${p.errs.length ? '：' + p.errs.slice(0, 3).join(' / ') : ''}`);

  // 5. 學習模式
  const l = await page(1280, 860);
  await l.goto(`${base}?mode=learn&peoples=Japan`, { waitUntil: 'networkidle' });
  await l.waitForTimeout(3000);
  t = await panelText(l);
  ok(t.includes('日本語系') && t.includes('依國籍'), '學習模式：日本卡（語系、依國籍統計）');
  ok(await l.$('.peoples-toggle.on') !== null, '學習模式：地圖上有「◎ 人群」且已打開');
  ok(l.errs.length === 0, `學習模式沒有錯誤${l.errs.length ? '：' + l.errs.slice(0, 3).join(' / ') : ''}`);

  // 6. 手機
  const m = await page(390, 844);
  await m.goto(`${base}?mode=research&peoples=Taiwan`, { waitUntil: 'networkidle' });
  await m.waitForTimeout(2500);
  ok((await panelText(m)).includes('族群組成'), '手機：清單分頁顯示臺灣放大鏡');
  const over = await m.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  ok(over <= 1, `手機：沒有水平捲動（多出 ${over}px）`);
  await m.click('nav.tabs button:has-text("地圖")'); await m.waitForTimeout(1500);
  ok(await m.$('.peoples-toggle.on') !== null, '手機：地圖分頁的人群圖層是打開的');
  await m.goto(`${base}?mode=research&peoples=mig-bantu`, { waitUntil: 'networkidle' });
  await m.waitForTimeout(2500);
  ok((await panelText(m)).includes('班圖'), '手機：遷徙頁');
  ok(await m.evaluate(() => document.documentElement.scrollWidth - window.innerWidth) <= 1, '手機：遷徙頁沒有水平捲動');
  await m.click('nav.tabs button:has-text("地圖")'); await m.waitForTimeout(1500);
  const pb = await m.$eval('.mig-play', (x) => { const r = x.getBoundingClientRect(); return r.left >= 0 && r.right <= window.innerWidth; }).catch(() => false);
  ok(pb, '手機：時間播放列在畫面內');
  ok(m.errs.length === 0, `手機沒有錯誤${m.errs.length ? '：' + m.errs.slice(0, 3).join(' / ') : ''}`);

  await b.close();
  console.log(fails.length ? `\n${fails.length} 項沒過` : '\n全部通過');
  process.exit(fails.length ? 1 : 0);
})();
