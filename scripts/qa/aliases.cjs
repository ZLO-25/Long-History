// node aliases.cjs baseUrl [截圖資料夾] → 別名收合：卡片只先顯示主要 2～3 個別名，「顯示更多」可展開、「收起」可收回；
// 桌機／手機都測；換卡片時自動收回；別名少的卡不出現按鈕
const { chromium } = require('playwright');
const fs = require('fs');
(async () => {
  const base = process.argv[2];
  const out = process.argv[3] || 'docs/screenshots/aliases';
  fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch();
  let fail = 0;
  const ok = (cond, msg) => { console.log(`${cond ? '✓' : '✗'} ${msg}`); if (!cond) fail++; };
  const ix = await (await fetch(base + 'index.json')).json();

  ok(ix.cards.every((c) => c.aliases_main.length >= 1 && c.aliases_main.length <= Math.max(3, c.aliases.length <= 4 ? 4 : 3)), `每張卡都有 1～3 個主要別名（${ix.cards.length} 張）`);
  ok(ix.cards.every((c) => c.aliases_main.every((a) => c.aliases.includes(a))), '主要別名都來自原本的別名清單');
  ok(ix.cards.filter((c) => c.aliases.length > 4).every((c) => c.aliases_main.every((a) => !/[铁战国东华区争历这为门]/.test(a))), '要收合的卡，主要別名不放簡體字寫法');

  const row = (p) => p.$eval('.card-detail .kv dd', (e) => ({ text: e.textContent, h: e.getBoundingClientRect().height }));
  for (const [vw, label] of [[1280, '桌機'], [390, '手機']]) {
    const p = await b.newPage(vw === 390 ? { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } : { viewport: { width: 1280, height: 800 } });
    await p.goto(base + '?mode=research&card=event-us-china-trade-war', { waitUntil: 'networkidle' }); await p.waitForTimeout(600);
    const c = ix.cards.find((x) => x.id === 'event-us-china-trade-war');
    const r1 = await row(p);
    ok(c.aliases_main.every((a) => r1.text.includes(a)) && !r1.text.includes('Learning Resources'), `${label}：收合時只顯示主要別名（${c.aliases_main.join('、')}）`);
    ok(r1.text.includes(`顯示更多（${c.aliases.length - c.aliases_main.length}）`), `${label}：有「顯示更多」並寫出還有幾個`);
    await p.screenshot({ path: `${out}/research-collapsed-${vw}.png` });
    await p.click('.aliases-more'); await p.waitForTimeout(200);
    const r2 = await row(p);
    ok(c.aliases.every((a) => r2.text.includes(a)) && r2.text.includes('收起'), `${label}：展開後全部 ${c.aliases.length} 個別名都看得到`);
    ok(r2.h > r1.h * 2, `${label}：收合時別名列高度明顯變小（${Math.round(r1.h)}px vs 展開 ${Math.round(r2.h)}px）`);
    await p.screenshot({ path: `${out}/research-expanded-${vw}.png` });
    await p.click('.aliases-more'); await p.waitForTimeout(200);
    ok(!(await row(p)).text.includes('Learning Resources'), `${label}：按「收起」可以收回`);
    // 展開後換卡，新卡要回到收合
    await p.click('.aliases-more');
    await p.goto(base + '?mode=research&card=war-american-civil-war', { waitUntil: 'networkidle' }); await p.waitForTimeout(500);
    const r3 = await row(p);
    ok(r3.text.startsWith('美國內戰、American Civil War') && !r3.text.includes('Jay Cooke'), `${label}：手動指定的主要別名有效（南北戰爭 → 美國內戰、American Civil War）`);
    const sw = await p.evaluate(() => document.documentElement.scrollWidth);
    ok(sw <= vw, `${label}：沒有橫向捲動（${sw}px）`);
    await p.close();
  }
  // 別名 ≤4 個的卡：全部直接顯示、沒有按鈕
  const few = ix.cards.find((c) => c.aliases.length <= 4);
  if (few) {
    const p = await b.newPage({ viewport: { width: 1280, height: 800 } });
    await p.goto(base + `?mode=research&card=${few.id}`, { waitUntil: 'networkidle' }); await p.waitForTimeout(500);
    ok((await p.$$('.card-detail .aliases-more')).length === 0, `別名少的卡（${few.name}，${few.aliases.length} 個）不出現按鈕`);
    await p.close();
  }
  await b.close();
  console.log(fail ? `✗ ${fail} 項失敗` : '✓ 全部通過');
  process.exit(fail ? 1 : 0);
})();
