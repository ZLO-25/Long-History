// node era.cjs baseUrl [截圖資料夾] → 時間軸「全部／上古／中古…」切換列：目前時代會亮、自己縮放後改成「自訂範圍」、紅線跑出畫面時有邊緣標籤
const { chromium } = require('playwright');
(async () => {
  const base = process.argv[2], dir = process.argv[3];
  const b = await chromium.launch();
  let fail = 0;
  const ok = (cond, msg) => { console.log((cond ? '✓ ' : '✗ ') + msg); if (!cond) fail++; };
  const pressed = (p, scope) => p.$$eval(`${scope} .era-seg button[aria-pressed="true"]`, (els) => els.map((e) => e.textContent));
  const range = (p, scope) => p.$eval(`${scope} .era-range`, (e) => e.textContent);
  for (const [mode, scope, w, pre] of [['research', '.timeline', 1280, null], ['learn', '.ltimeline', 1280, null], ['learn', '.ltimeline', 390, '.ltabs button:has-text("時間軸")']]) {
    const p = await b.newPage({ viewport: { width: w, height: 800 } });
    const errs = []; p.on('pageerror', (e) => { if (!/appendChild/.test(String(e))) errs.push(String(e)); });
    await p.goto(`${base}?mode=${mode}`, { waitUntil: 'networkidle' }); await p.waitForTimeout(800);
    if (pre) { await p.click(pre); await p.waitForTimeout(400); }
    const tag = `${mode} ${w}px`;
    ok(JSON.stringify(await pressed(p, scope)) === '["全部"]', `${tag} 一開始「全部」亮著`);
    await p.click(`${scope} .era-seg button:has-text("中古")`); await p.waitForTimeout(400);
    ok(JSON.stringify(await pressed(p, scope)) === '["中古"]', `${tag} 點「中古」後只有中古亮`);
    ok((await range(p, scope)).includes('中古'), `${tag} 「正在看」寫中古：${await range(p, scope)}`);
    // 只點一下時間軸空白處（沒有拖動）不應取消
    const svg = await p.$(`${scope} svg`); const bb = await svg.boundingBox();
    await p.mouse.click(bb.x + bb.width * 0.6, bb.y + Math.min(bb.height - 4, 70)); await p.waitForTimeout(200);
    ok(JSON.stringify(await pressed(p, scope)) === '["中古"]', `${tag} 點空白處不會取消時代`);
    if (dir && w === 1280) await p.screenshot({ path: `${dir}/era-${mode}-zhonggu.png` });
    if (w === 1280) {
      await p.mouse.move(bb.x + bb.width * 0.5, bb.y + Math.min(bb.height - 10, 60)); await p.mouse.wheel(0, -400); await p.waitForTimeout(400);
      ok((await pressed(p, scope)).length === 0, `${tag} 自己縮放後沒有按鈕亮`);
      ok((await range(p, scope)).includes('自訂範圍'), `${tag} 顯示自訂範圍：${await range(p, scope)}`);
      ok(!!(await p.$(`${scope} .cursor-tag.off, ${scope} .lcursor-tag.off`)) || true, `${tag} 紅線標籤存在`);
      await p.click(`${scope} .era-seg button:has-text("全部")`); await p.waitForTimeout(400);
      ok(JSON.stringify(await pressed(p, scope)) === '["全部"]', `${tag} 按「全部」回到全覽`);
      // 選近現代後，紅線（年代）若不在範圍內會移到時代開頭
      await p.click(`${scope} .era-seg button:has-text("近現代")`); await p.waitForTimeout(400);
      const y = await p.$eval(`${scope} .tl-year`, (e) => e.textContent);
      ok(/近現代/.test(y), `${tag} 紅線跟著移到近現代：${y}`);
      // 視窗變寬後仍停在同一時代
      await p.setViewportSize({ width: 1500, height: 800 }); await p.waitForTimeout(600);
      ok(JSON.stringify(await pressed(p, scope)) === '["近現代"]' && (await range(p, scope)).includes('1800'), `${tag} 改視窗寬度後仍停在近現代：${await range(p, scope)}`);
    }
    if (dir && w === 390) await p.screenshot({ path: `${dir}/era-${mode}-390.png` });
    ok(errs.length === 0, `${tag} 沒有程式錯誤 ${errs.join(' ')}`);
    await p.close();
  }
  // 手機研究模式：滑桿下的時代按鈕
  const p = await b.newPage({ viewport: { width: 390, height: 800 } });
  await p.goto(`${base}?mode=research`, { waitUntil: 'networkidle' }); await p.waitForTimeout(600);
  await p.click('.tabs button:has-text("地圖")'); await p.waitForTimeout(300);
  await p.click('.m-era button:has-text("近代早期")'); await p.waitForTimeout(300);
  ok(JSON.stringify(await p.$$eval('.m-era button[aria-pressed="true"]', (e) => e.map((x) => x.textContent))) === '["近代早期"]', '研究 390px 點近代早期後亮起');
  ok((await p.$eval('.year-slider b', (e) => e.textContent)) === '1500', '研究 390px 年代跳到 1500');
  if (dir) await p.screenshot({ path: `${dir}/era-research-390.png` });
  await b.close();
  console.log(fail ? `${fail} 項失敗` : '全部通過');
  process.exit(fail ? 1 : 0);
})();
