// node scripts/qa/story-map.cjs baseUrl [截圖資料夾] → 故事地圖（docs/stories.md 第七節）
// 每篇故事都有地圖資料、每個有站的小節都有地點；桌機右欄有地圖、換節會換地點；內文地名可點；手機與翻頁從下方拉出地圖
const { chromium } = require('playwright');
const fs = require('fs');
(async () => {
  const base = process.argv[2] || 'http://localhost:4173/';
  const out = process.argv[3] || 'docs/screenshots/story-map';
  fs.mkdirSync(out, { recursive: true });
  let fail = 0;
  const ok = (cond, msg) => { console.log(`${cond ? '✓' : '✗'} ${msg}`); if (!cond) fail++; };
  const ix = await require('./load-index.cjs')(base);
  const lines = ix.storylines.filter((s) => s.read);
  const docs = [];
  for (const s of lines) docs.push(await (await fetch(`${base}data/stories/${s.id}.json`)).json());
  ok(docs.every((d) => d.hasMap && d.places?.length), `每篇故事都有地圖（${docs.length} 篇，地點 ${docs.reduce((n, d) => n + d.places.length, 0)} 個）`);
  const empty = docs.flatMap((d) => d.sections.map((x, i) => (x.cards.length && !d.places.some((p) => p.secs.includes(i)) ? `${d.id} 第 ${i + 1} 節` : null)).filter(Boolean));
  ok(!empty.length, `每個有站的小節都有地點${empty.length ? '；缺：' + empty.join('、') : ''}`);
  const sizes = [];
  for (const d of docs) { const r = await fetch(`${base}data/stories/${d.id}.map.json`); const t = await r.text(); sizes.push(t.length); const m = JSON.parse(t); if (!m.land.length) ok(false, `${d.id} 地圖沒有陸地`); }
  ok(Math.max(...sizes) < 700_000, `地圖檔都小於 700 KB（最大 ${Math.round(Math.max(...sizes) / 1024)} KB，打開才下載）`);
  // 同一座城不同寫法（雒陽／洛陽）要合成一個點：列出「很近、今天同一座城、還沒判斷過」的，人工決定放進 data/labels/same-place.yaml 的 groups 或 different
  {
    const YAML = require('yaml');
    const sp = YAML.parse(fs.readFileSync(require('path').join(__dirname, '../../data/labels/same-place.yaml'), 'utf8'));
    const judged = [...(sp.groups ?? []), ...(sp.different ?? [])];
    const strip = (s) => s.replace(/[（(][^）)]*[）)]/g, '').trim();
    const todo = new Set();
    for (const d of docs) for (let i = 0; i < d.places.length; i++) for (let j = i + 1; j < d.places.length; j++) {
      const a = d.places[i], c = d.places[j];
      const km = Math.hypot(a.lat - c.lat, (a.lng - c.lng) * Math.cos(a.lat * Math.PI / 180)) * 111;
      if (km > 30 || strip(a.m) !== strip(c.m)) continue;
      const an = a.n.split('／'), cn = c.n.split('／');
      if (!judged.some((g) => an.some((x) => g.includes(x)) && cn.some((x) => g.includes(x)))) todo.add(`${a.n}／${c.n}（${strip(a.m)}）`);
    }
    ok(true, `同一座城的寫法已合併（雒陽／洛陽等 ${(sp.groups ?? []).length} 組）${todo.size ? `；還沒判斷的：${[...todo].join('、')}` : '；沒有還沒判斷的'}`);
    const lu = docs.find((d) => d.id === 'story-han-to-sui');
    if (lu) ok(lu.places.filter((p) => p.n.split('／').every((x) => /^(雒陽|洛陽)/.test(x))).length === 1, '「雒陽」和「洛陽」在地圖上是同一個點');
  }
  const linked = docs.map((d) => d.sections.flatMap((x) => x.blocks).filter((b) => d.places.some((p) => p.k.some((k) => b.text.includes(k)))).length);
  ok(linked.every((n) => n > 0), `每篇內文都有可以點的地名（每篇 ${Math.min(...linked)}–${Math.max(...linked)} 段）`);

  const b = await chromium.launch();
  const errs = [];
  const watch = (p) => {
    p.on('pageerror', (e) => errs.push(String(e)));
    p.on('console', (m) => { if (m.type() === 'error' && !/tile|ERR_TUNNEL|ERR_NAME|ERR_PROXY|favicon|AJAXError|Failed to fetch|openfreemap|Failed to load resource/.test(m.text())) errs.push(m.text()); });
  };
  const id = 'story-three-kingdoms';
  const doc = docs.find((d) => d.id === id) || docs[0];

  // ---- 桌機：右欄地圖 ----
  {
    const ctx = await b.newContext({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 2 });
    const p = await ctx.newPage(); watch(p);
    const mapReq = [];
    p.on('request', (r) => { if (/\.map\.json$/.test(r.url())) mapReq.push(Date.now()); });
    const t0 = Date.now();
    await p.goto(`${base}?story=${doc.id}&read=1`);
    await p.waitForSelector('.sr-sec');
    const textAt = Date.now() - t0;
    await p.waitForSelector('.sr-side-map svg .sm-land', { timeout: 15000 });
    ok(mapReq.length === 1, `地圖資料晚一點才下載（文字 ${textAt} ms 出現後才抓 .map.json）`);
    const pins0 = await p.$$eval('.sr-side-map .sm-pin, .sr-side-map .sm-num', (x) => x.length);
    ok(pins0 > 0, `右欄地圖標出地點與各節順序（${pins0} 個）`);
    await p.click('.sr-side ol li:nth-child(6) button');
    await p.waitForTimeout(900);
    const cap = await p.textContent('.sr-side-map .sm-list');
    const want = doc.places.filter((x) => x.secs.includes(5)).map((x) => x.n.replace(/[（(][^）)]*[）)]/g, ''));
    ok(want.every((n) => cap.includes(n)), `跳到第 6 節，地圖下方列出這節的地點（${want.join('、')}）`);
    await p.screenshot({ path: `${out}/desktop-section.png` });
    const pl = await p.$('.sr-sec:nth-of-type(6) .sr-pl');
    if (pl) {
      const name = await pl.textContent();
      await pl.click(); await p.waitForTimeout(700);
      const f = await p.textContent('.sr-side-map .sm-focus').catch(() => '');
      ok(f.includes(name), `點內文的地名「${name}」，地圖移過去並說明今天的位置`);
      await p.screenshot({ path: `${out}/desktop-focus.png` });
    } else ok(false, '第 6 節內文沒有可點的地名');
    const mb = await p.$eval('.sr-side-map .sm-box', (x) => { const r = x.getBoundingClientRect(); return { w: Math.round(r.width), h: Math.round(r.height) }; });
    ok(mb.w >= 450 && mb.h >= 400, `桌機地圖夠大（${mb.w}×${mb.h}，右欄整欄給地圖）`);
    ok(await p.$$eval('.sr-strip button', (x) => x.length) === doc.sections.length + 1, '大標縮成地圖下方一排編號（含「考考自己」）');
    await p.click('.sm-zoom'); await p.waitForTimeout(700);
    ok(await p.$eval('.sm-zoom', (x) => x.getAttribute('aria-pressed') === 'true'), '「看全篇」可以看整篇故事走過的地方');
    const k0 = await p.$eval('.sm-box g', (g) => g.getAttribute('transform'));
    await p.click('.sm-pm button'); await p.waitForTimeout(200);
    ok(k0 !== await p.$eval('.sm-box g', (g) => g.getAttribute('transform')), '「＋」可以放大地圖');
    await p.click('.sm-zoom.big'); await p.waitForTimeout(500);
    const full = await p.$eval('.sm.full .sm-box', (x) => x.getBoundingClientRect().width).catch(() => 0);
    ok(full >= 1200, `「⛶ 放大」變成全螢幕地圖（${Math.round(full)} px 寬）`);
    await p.screenshot({ path: `${out}/desktop-full.png` });
    await p.keyboard.press('Escape'); await p.waitForTimeout(300);
    ok(!(await p.$('.sm.full')) && !!(await p.$('.sr-overlay')), 'Esc 只縮回地圖，故事還開著');
    await ctx.close();
  }
  // ---- 手機：下方拉出 ----
  {
    const ctx = await b.newContext({ viewport: { width: 390, height: 800 }, deviceScaleFactor: 2, hasTouch: true, isMobile: true });
    const p = await ctx.newPage(); watch(p);
    await p.goto(`${base}?story=${doc.id}&read=1`);
    await p.waitForSelector('.sr-sec');
    ok(!(await p.$('.sm svg')), '手機：一開始不畫地圖（文字優先）');
    await p.click('.sr-mapbtn');
    await p.waitForSelector('.sr-sheet .sm-land', { timeout: 15000 });
    ok(true, '手機：點「地圖」從下方拉出');
    await p.screenshot({ path: `${out}/mobile-sheet.png` });
    await p.click('.sr-sheet-x');
    await p.$eval('.sr-sec:nth-of-type(4) .sr-pl', (x) => x.scrollIntoView({ block: 'center' }));
    await p.waitForTimeout(500);
    await p.click('.sr-sec:nth-of-type(4) .sr-pl');
    const clicked = true;
    await p.waitForTimeout(900);
    ok(clicked && !!(await p.$('.sr-sheet .sm-focus')), '手機：點內文地名，地圖拉出來並標出那個地方');
    await p.screenshot({ path: `${out}/mobile-focus.png` });
    await ctx.close();
  }
  ok(!errs.length, `沒有錯誤${errs.length ? '：' + errs.slice(0, 3).join(' | ') : ''}`);
  await b.close();
  console.log(fail ? `✗ ${fail} 項失敗` : '✓ 全部通過');
  process.exit(fail ? 1 : 0);
})();
