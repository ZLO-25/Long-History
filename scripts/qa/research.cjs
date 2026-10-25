// 研究模式回歸：舊網址參數都還能用、沒有錯誤、學習模式切換鈕來回不會壞
const { chromium } = require('playwright');
(async () => {
  const base = process.argv[2]; const chain = process.argv[3];
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1280, height: 900 } });
  let errs = []; p.on('pageerror', (e) => errs.push(String(e)));
  p.on('console', (m) => { if (m.type() === 'error' && !/ERR_TUNNEL|ERR_NAME|ERR_PROXY|tile/.test(m.text())) errs.push(m.text()); });
  const cases = [
    ['首頁', '', async () => (await p.$$('svg .lane-label')).length > 0 && (await p.$('.map-canvas')) != null],
    ['?year=100', '?year=100', async () => (await p.textContent('body')).includes('100')],
    ['?card=war-peloponnesian', '?card=war-peloponnesian', async () => (await p.textContent('body')).includes('伯羅奔尼撒')],
    [`?chain=${chain}`, `?chain=${chain}`, async () => true],
    ['?q=羅馬', '?q=' + encodeURIComponent('羅馬'), async () => (await p.inputValue('input.search')) === '羅馬'],
    ['?today=1', '?today=1', async () => (await p.$('.today-toggle.on')) != null],
  ];
  let bad = 0;
  for (const [name, q, ok] of cases) {
    errs = [];
    await p.goto(base + q, { waitUntil: 'networkidle' }); await p.waitForTimeout(700);
    const good = await ok().catch(() => false);
    console.log(`${good && !errs.length ? '✓' : '✗'} ${name}${errs.length ? '；錯誤：' + errs[0] : ''}`); if (!good || errs.length) bad++;
  }
  errs = [];
  await p.goto(base, { waitUntil: 'networkidle' }); await p.fill('input.search', 'rome'); await p.waitForTimeout(500);
  const hits = await p.textContent('body'); console.log(`${/羅馬/.test(hits) ? '✓' : '✗'} 模糊搜尋 rome → 有羅馬結果`);
  await p.click('button.learn-btn'); await p.waitForTimeout(500);
  const inLearn = p.url().includes('mode=learn');
  await p.click('text=研究模式').catch(() => {}); await p.waitForTimeout(500);
  const back = !p.url().includes('mode=learn') && (await p.$('input.search')) != null;
  console.log(`${inLearn && back ? '✓' : '✗'} 研究→學習→研究 切換${errs.length ? '；錯誤：' + errs[0] : ''}`);
  if (!inLearn || !back || errs.length) bad++;
  console.log(bad ? `有 ${bad} 項失敗` : '研究模式回歸全部通過');
  await b.close();
})();
