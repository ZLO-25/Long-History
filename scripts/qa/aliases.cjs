// node aliases.cjs baseUrl [截圖資料夾] → 別名：依知名度排序（最有名的在最前面）、先填滿兩行、放不下的收在「更多」可展開／收起；
// 桌機／手機都測；換卡片時自動收回；別名少的卡不出現按鈕；抽樣多張卡確認收合時都不超過兩行
const { chromium } = require('playwright');
const fs = require('fs');
(async () => {
  const base = process.argv[2];
  const out = process.argv[3] || 'docs/screenshots/aliases';
  fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch();
  let fail = 0;
  const ok = (cond, msg) => { console.log(`${cond ? '✓' : '✗'} ${msg}`); if (!cond) fail++; };
  const ix = await require('./load-index.cjs')(base);
  const SIMP = /[铁战国东华区争历这为门罗马汉亚兰尔变运动开义]/;

  ok(ix.cards.every((c) => c.aliases_show.every((a) => c.aliases.includes(a))), `顯示的別名都來自原本的別名清單（${ix.cards.length} 張）`);
  ok(ix.cards.every((c) => !c.aliases_show.includes(c.name)), '和卡名一模一樣的別名不重複顯示');
  ok(ix.cards.every((c) => c.aliases_show.slice(0, 3).every((a) => !SIMP.test(a))), '每張卡前 3 個別名都不是簡體寫法（簡體排在最後）');
  const first = { 'war-american-civil-war': '美國內戰', 'war-crusades': '十字軍', 'event-228-incident': '二二八', 'event-hsinchu-park-tsmc': '台積電', 'event-us-china-trade-war': '中美貿易戰', 'tech-steam-engine': '瓦特', 'war-world-war-two': '二戰' };
  for (const [id, a] of Object.entries(first)) { const c = ix.cards.find((x) => x.id === id); ok(c && c.aliases_show[0] === a, `知名度排序：${c?.name} 第一個別名是「${a}」（實際：${c?.aliases_show[0]}）`); }

  // 量一行字多高、別名列多高
  const row = (p) => p.$eval('.card-detail .kv dd', (e) => {
    const s = e.querySelector('.aliases > span:not(.aliases-measure-box)');
    const probe = document.createElement('span'); probe.textContent = '字'; probe.style.cssText = 'display:block;position:absolute;visibility:hidden'; e.appendChild(probe);
    const line = probe.getBoundingClientRect().height; probe.remove();
    return { text: e.textContent, shown: s ? s.textContent : e.textContent, h: e.getBoundingClientRect().height, line };
  });
  const T = 'event-us-china-trade-war';
  const c = ix.cards.find((x) => x.id === T);
  for (const [vw, label] of [[1280, '桌機'], [390, '手機']]) {
    const p = await b.newPage(vw === 390 ? { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } : { viewport: { width: 1280, height: 800 } });
    await p.goto(base + `?mode=research&card=${T}`, { waitUntil: 'networkidle' }); await p.waitForTimeout(600);
    const r1 = await row(p);
    const n1 = r1.shown.split('、').length;
    ok(r1.h <= r1.line * 2 + 3, `${label}：收合時別名列不超過兩行（${Math.round(r1.h)}px，一行 ${Math.round(r1.line)}px）`);
    ok(r1.shown.startsWith(c.aliases_show.slice(0, 3).join('、')), `${label}：照知名度順序顯示（${c.aliases_show.slice(0, 3).join('、')}…）`);
    ok(n1 >= (vw === 390 ? 3 : 5), `${label}：兩行內盡量多顯示（顯示 ${n1} 個，原本只顯示 3 個）`);
    ok(r1.text.includes(`更多（${c.aliases_show.length - n1}）`), `${label}：有「更多」並寫出還有幾個（${c.aliases_show.length - n1}）`);
    await p.screenshot({ path: `${out}/research-collapsed-${vw}.png` });
    await p.click('.aliases-more'); await p.waitForTimeout(200);
    const r2 = await row(p);
    ok(c.aliases_show.every((a) => r2.text.includes(a)) && r2.text.includes('收起'), `${label}：展開後全部 ${c.aliases_show.length} 個別名都看得到`);
    ok(r2.h > r1.h * 1.5, `${label}：展開後高度變大（${Math.round(r1.h)}px → ${Math.round(r2.h)}px）`);
    await p.screenshot({ path: `${out}/research-expanded-${vw}.png` });
    await p.click('.aliases-more'); await p.waitForTimeout(200);
    ok((await row(p)).h <= r1.h + 1, `${label}：按「收起」可以收回兩行`);
    await p.click('.aliases-more');
    await p.goto(base + '?mode=research&card=war-american-civil-war', { waitUntil: 'networkidle' }); await p.waitForTimeout(500);
    const r3 = await row(p);
    ok(r3.shown.startsWith('美國內戰、American Civil War、林肯') && r3.h <= r3.line * 2 + 3, `${label}：換卡後回到收合，南北戰爭顯示「美國內戰、American Civil War、林肯…」`);
    const sw = await p.evaluate(() => document.documentElement.scrollWidth);
    ok(sw <= vw, `${label}：沒有橫向捲動（${sw}px）`);
    // 抽樣：別名最多的 15 張＋平均挑 15 張，收合時都不超過兩行、且從最有名的那個開始
    const many = [...ix.cards].sort((a, z) => z.aliases_show.length - a.aliases_show.length).slice(0, 15);
    const rnd = ix.cards.filter((_, i) => i % 18 === 3);
    const bad = [];
    for (const x of [...many, ...rnd]) {
      await p.goto(base + `?mode=research&card=${x.id}`, { waitUntil: 'networkidle' }); await p.waitForTimeout(250);
      const r = await row(p);
      if (!(r.h <= r.line * 2 + 3) || (x.aliases_show.length && !r.shown.startsWith(x.aliases_show[0]))) bad.push(`${x.name}(${Math.round(r.h)}px)`);
    }
    ok(!bad.length, `${label}：抽樣 ${many.length + rnd.length} 張卡收合時都 ≤ 兩行、從最有名的開始${bad.length ? '：' + bad.join('、') : ''}`);
    await p.close();
  }
  // 別名少的卡：全部直接顯示、沒有按鈕
  const few = ix.cards.find((x) => x.aliases_show.length >= 2 && x.aliases_show.length <= 3);
  if (few) {
    const p = await b.newPage({ viewport: { width: 1280, height: 800 } });
    await p.goto(base + `?mode=research&card=${few.id}`, { waitUntil: 'networkidle' }); await p.waitForTimeout(500);
    const r = await row(p);
    ok((await p.$$('.card-detail .aliases-more')).length === 0 && few.aliases_show.every((a) => r.text.includes(a)), `別名少的卡（${few.name}，${few.aliases_show.length} 個）全部顯示、不出現按鈕`);
    await p.close();
  }
  await b.close();
  console.log(fail ? `✗ ${fail} 項失敗` : '✓ 全部通過');
  process.exit(fail ? 1 : 0);
})();
