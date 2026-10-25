// node shot.cjs url out.png width [height] [actions-json]
const { chromium } = require('playwright');
(async () => {
  const [url, out, w = '1280', h = '800', acts = '[]'] = process.argv.slice(2);
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: +w, height: +h } });
  const errs = [];
  p.on('pageerror', (e) => errs.push(String(e)));
  p.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()); });
  await p.goto(url, { waitUntil: 'networkidle' });
  await p.waitForTimeout(800);
  for (const a of JSON.parse(acts)) {
    if (a.click) await p.click(a.click, { timeout: 5000 }).catch((e) => errs.push('click fail ' + a.click));
    if (a.wait) await p.waitForTimeout(a.wait);
    if (a.eval) console.log(await p.evaluate(a.eval));
  }
  await p.waitForTimeout(500);
  await p.screenshot({ path: out });
  if (errs.length) console.log('ERRORS:', errs.slice(0, 8).join('\n'));
  await b.close();
})();
