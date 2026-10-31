// node overlap.cjs baseUrl width → 每條歷史、每個軌道為主時，檢查時間軸上文字標籤的外框有沒有互相重疊
const { chromium } = require('playwright');
(async () => {
  const [base, w = '1280'] = process.argv.slice(2);
  const ids = ['taiwan', 'japan', 'korea', 'china', 'sea', 'greco-roman', 'europe', 'islam', 'india', 'americas', 'usa', 'world', 'money', 'tech'];
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: +w, height: 900 } });
  const errs = [];
  p.on('pageerror', (e) => errs.push(String(e)));
  let bad = 0;
  for (const id of ids) {
    await p.goto(`${base}?mode=learn&history=${id}`, { waitUntil: 'networkidle' });
    await p.waitForTimeout(600);
    if (+w < 700) { await p.click('.ltabs button:text-is("時間軸")'); await p.waitForTimeout(400); }
    const chips = await p.$$eval('.ltl-head button.chip, button.chip', (bs) => bs.map((x) => x.textContent));
    const lanes = await p.$$eval('.ltimeline .tl-head button.chip', (bs) => bs.map((x) => x.textContent)).catch(() => []);
    const eras = await p.$$eval('.ltimeline .btn.sm', (bs) => bs.map((x) => x.textContent).filter((s) => s !== '全部'));
    const views = [null, ...lanes.map((l) => ['lane', l]), ...eras.map((e) => ['era', e])];
    for (const v of views) {
      const lane = v && v[1];
      if (v && v[0] === 'lane') await p.click(`.ltimeline .tl-head button.chip:text-is("${lane}")`).catch(() => {});
      if (v && v[0] === 'era') { await p.click(`.ltimeline .btn.sm:text-is("${lane}")`).catch(() => {}); await p.waitForTimeout(700); }
      await p.waitForTimeout(250);
      const res = await p.evaluate(() => {
        const svg = document.querySelector('svg[aria-label="三軌時間軸"]');
        if (!svg) return { n: 0, hits: ['no svg'] };
        const ts = [...svg.querySelectorAll('text')].filter((t) => t.textContent.trim() && getComputedStyle(t).display !== 'none' && t.getAttribute('opacity') !== '0');
        const rs = ts.map((t) => ({ s: t.textContent, r: t.getBoundingClientRect() })).filter((o) => o.r.width > 0);
        const hits = [];
        for (let i = 0; i < rs.length; i++) for (let j = i + 1; j < rs.length; j++) {
          const a = rs[i].r, c = rs[j].r;
          const ox = Math.min(a.right, c.right) - Math.max(a.left, c.left), oy = Math.min(a.bottom, c.bottom) - Math.max(a.top, c.top);
          if (ox > 1 && oy > 1) hits.push(`${rs[i].s} × ${rs[j].s}`);
        }
        const svgR = svg.getBoundingClientRect();
        const out = rs.filter((o) => o.r.right > svgR.right + 1).map((o) => '超出右邊：' + o.s);
        return { n: rs.length, hits: hits.concat(out) };
      });
      if (res.hits.length) bad++;
      console.log(`${id} ${lane ?? '(預設)'} 標籤 ${res.n} 個，重疊 ${res.hits.length}${res.hits.length ? '：' + res.hits.slice(0, 4).join('；') : ''}`);
    }
  }
  console.log(bad ? `有 ${bad} 個畫面有重疊` : '全部沒有重疊');
  if (errs.length) console.log('ERRORS:', errs.slice(0, 5).join('\n'));
  await b.close();
})();
