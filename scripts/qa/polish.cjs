// node polish.cjs baseUrl [截圖資料夾] → 第 5 批「收尾」的自動檢查（docs/review-2026-11-15.md 第 5 級）：
//  1 無障礙：換步後焦點在新步驟標題、答題回饋有 role=status、學習模式每個畫面剛好一個 h1
//  2 最小字級 12px（手機與桌機掃一輪）、出處上標可點範圍 >= 24×24
//  3 平板直向：不用桌機三欄、閱讀欄 >= 600px、地圖區域鈕不被縮放鈕蓋住
//  4 關係網人名不截斷、縮放後字 >= 12px
//  5 壞網址顯示「找不到」、斷網訊息與「重試」恢復連線後真的重抓
//  6 故事「考考自己」：每 2–3 節插 1 題、作答與自評存進進度、重新整理還在、備份帶得走、舊進度（沒有 stories 欄位）照常
//  7 首頁「接著做」依最近作答時間挑（舊進度沒有時間戳退回步數最多）
//  8 深色模式：跟隨系統、「Aa」面板可切換並記住、文字對比 >= 4.5（抽查多個畫面）、列印永遠淺色
//  9 故事地圖的考古文化名不標在圖上
// 10 搜尋：精確的排前面，拼音近似的折在「可能相關」之後
// 11 課裡 card 步驟 focus 寫 C10／E8 這類今日對照代號也會展開
// 12 課綱對照頁排版（手機不橫向溢出、項目符號對齊）
// 13 學習單「先猜猜看」不重複
// 14 上一頁／「← 返回」回到清單頁時恢復捲動位置
const { chromium } = require('playwright');
const fs = require('fs');

// ---- 文字對比掃描（在頁面裡執行）----
const SCAN = () => {
  const parse = (c) => { const m = c.match(/rgba?\(([^)]+)\)/); if (!m) return null; const p = m[1].split(/[ ,/]+/).filter(Boolean).map(Number); return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 }; };
  const lum = ({ r, g, b }) => { const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
  const over = (top, bot) => ({ r: top.r * top.a + bot.r * (1 - top.a), g: top.g * top.a + bot.g * (1 - top.a), b: top.b * top.a + bot.b * (1 - top.a), a: 1 });
  const bgOf = (el) => {
    const chain = [];
    for (let e = el; e; e = e.parentElement) {
      const cs = getComputedStyle(e);
      if (cs.backgroundImage !== 'none') return null; // 漸層或圖片：不確定，略過
      const c = parse(cs.backgroundColor);
      if (c && c.a > 0) { chain.push(c); if (c.a >= 1) break; }
    }
    let base = { r: 255, g: 255, b: 255, a: 1 };
    if (!chain.length || chain[chain.length - 1].a < 1) {
      const rb = parse(getComputedStyle(document.documentElement).backgroundColor), bb = parse(getComputedStyle(document.body).backgroundColor);
      base = bb && bb.a > 0 ? bb : rb && rb.a > 0 ? rb : base;
      if (base.a < 1) base = over(base, { r: 255, g: 255, b: 255, a: 1 });
    }
    let cur = chain.length && chain[chain.length - 1].a >= 1 ? chain.pop() : base;
    while (chain.length) cur = over(chain.pop(), cur);
    return cur;
  };
  const sel = (e) => { const out = []; for (let x = e; x && out.length < 3; x = x.parentElement) out.push(x.tagName.toLowerCase() + (typeof x.className === 'string' && x.className.trim() ? '.' + x.className.trim().split(/\s+/).slice(0, 2).join('.') : '')); return out.join(' < '); };
  const bad = [];
  const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let n; const seen = new Set();
  while ((n = w.nextNode())) {
    const t = n.textContent.trim(); if (!t) continue;
    const el = n.parentElement; if (!el || seen.has(el)) continue;
    if (el.closest('.leaflet-container, .maplibregl-map, svg, script, style, .map-skel, .sr-sheet-map')) continue;
    const cs = getComputedStyle(el); if (cs.display === 'none' || cs.visibility === 'hidden' || cs.opacity === '0') continue;
    const r = el.getBoundingClientRect(); if (!r.width || !r.height) continue;
    const fg = parse(cs.color); if (!fg) continue;
    const bg = bgOf(el); if (!bg) continue;
    const eff = fg.a < 1 ? over(fg, bg) : fg;
    const L1 = lum(eff), L2 = lum(bg), ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
    const fs = parseFloat(cs.fontSize), bold = parseInt(cs.fontWeight) >= 700;
    const need = fs >= 24 || (fs >= 18.66 && bold) ? 3 : 4.5;
    seen.add(el);
    if (ratio < need) bad.push(`${sel(el)} ${ratio.toFixed(2)} "${t.slice(0, 16)}"`);
  }
  return bad;
};

// ---- 最小字級掃描 ----
const FONTS = () => {
  const out = [];
  const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let n;
  while ((n = w.nextNode())) {
    if (!n.textContent.trim()) continue;
    const el = n.parentElement; if (!el) continue;
    const cs = getComputedStyle(el); if (cs.display === 'none' || cs.visibility === 'hidden') continue;
    const r = el.getBoundingClientRect(); if (!r.width || !r.height) continue;
    if (el.closest('.leaflet-container, .maplibregl-map, svg, .map-skel, script, style')) continue;
    const fs = parseFloat(cs.fontSize);
    if (fs < 11.99) out.push(`${fs.toFixed(1)}px ${el.tagName.toLowerCase()}.${String(el.className).split(' ')[0]} "${n.textContent.trim().slice(0, 14)}"`);
  }
  return out;
};

(async () => {
  const base = process.argv[2];
  const out = process.argv[3] || 'docs/screenshots/polish';
  fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch();
  let fail = 0;
  const ok = (cond, msg) => { console.log(`${cond ? '✓' : '✗'} ${msg}`); if (!cond) fail++; };
  const errs = [];
  const watch = (p) => {
    p.on('pageerror', (e) => { if (!/appendChild/.test(String(e))) errs.push(String(e)); });
    p.on('console', (m) => { if (m.type() === 'error' && !/tile|ERR_TUNNEL|ERR_NAME|ERR_PROXY|ERR_INTERNET|ERR_FAILED|favicon|AJAXError|Failed to fetch|Failed to load resource|openfreemap/.test(m.text())) errs.push(m.text()); });
  };
  const open = async (w, h, opts = {}) => {
    const ctx = await b.newContext({ viewport: { width: w, height: h }, hasTouch: w < 700, ...opts });
    const p = await ctx.newPage(); watch(p);
    return { ctx, p };
  };
  const go = async (p, q, wait = 700) => {
    await p.goto(`${base}${q}`, { waitUntil: 'networkidle' });
    await p.waitForTimeout(wait);
    const intro = p.locator('.intro button.btn.primary');
    if (await intro.count()) await intro.click().catch(() => {});
  };
  const section = async (name, fn) => { console.log(`\n— ${name}`); try { await fn(); } catch (e) { ok(false, `${name}：測試本身出錯：${String(e).slice(0, 200)}`); } };
  const ix = await require('./load-index.cjs')(base);
  const KEY = 'history-river-learn-v1';
  const unitJson = async (id) => (await (await fetch(`${base}data/units/${id}.json`)).json()).unit;

  // ================= 1 無障礙 =================
  await section('1 無障礙', async () => {
    const { ctx, p } = await open(1280, 800);
    // 每個畫面剛好一個 h1
    const pages = ['?mode=learn', '?mode=learn&view=lessons', '?mode=learn&view=curriculum', '?mode=learn&history=taiwan', '?mode=learn&view=stories', '?mode=learn&story=story-taiwan-400', '?mode=learn&dive=dive-three-kingdoms', '?mode=learn&view=dives',
      '?mode=learn&topic=鑄幣', '?mode=learn&view=topics', '?mode=learn&card=war-peloponnesian', '?mode=learn&unit=unit-taiwan-colony', '?mode=learn&unit=unit-taiwan-colony&step=3', '?mode=learn&view=record', '?mode=learn&view=mymap', '?mode=learn&view=review',
      '?mode=learn&unit=unit-taiwan-colony&print=sheet', '?mode=learn&unit=nope', '?mode=learn&story=story-taiwan-400&read=1'];
    const bad = [];
    for (const q of pages) { await go(p, q, 500); const n = await p.locator('h1').count(); if (n !== 1) bad.push(`${q} → ${n}`); }
    ok(!bad.length, `學習模式 ${pages.length} 個畫面各有且只有一個 h1${bad.length ? '；不是 1 個：' + bad.join('；') : ''}`);
    // 換步後焦點移到新步驟的標題
    await go(p, '?mode=learn&unit=unit-taiwan-colony&step=2');
    ok(await p.evaluate(() => document.activeElement === document.body || !document.activeElement.classList.contains('step-label')), '一進來（沒換步）不搶焦點');
    await p.locator('.step-nav .btn.primary').click();
    await p.waitForTimeout(400);
    const f1 = await p.evaluate(() => ({ cls: document.activeElement?.className, txt: document.activeElement?.textContent?.slice(0, 20) }));
    ok(/step-label/.test(f1.cls) && /第 3／/.test(f1.txt), `按「下一步」後焦點在新步驟的標題（${f1.txt}）`);
    await p.locator('.pdot').nth(5).click(); await p.waitForTimeout(300);
    ok(await p.evaluate(() => /第 6／/.test(document.activeElement?.textContent ?? '')), '點進度點跳步，焦點也在新步驟的標題');
    // 正在打字時不搶：在文字框裡打字，焦點不被移走（換步前 textarea 還在時）
    const ta = p.locator('textarea').first();
    // 找一個有文字框的步驟
    const u = await unitJson('unit-taiwan-colony');
    const ti = u.steps.findIndex((s) => ['compare', 'today', 'decision', 'recap'].includes(s.type));
    await go(p, `?mode=learn&unit=unit-taiwan-colony&step=${ti + 1}`);
    if (await p.locator('textarea').count()) {
      await p.locator('textarea').first().focus(); await p.keyboard.type('寫一點字');
      await p.waitForTimeout(300);
      ok(await p.evaluate(() => document.activeElement?.tagName === 'TEXTAREA'), '正在文字框打字時，焦點留在文字框');
    }
    // 答題回饋 role=status：答一題選擇題（史料判讀）
    const si = u.steps.findIndex((s) => s.type === 'source');
    await go(p, `?mode=learn&unit=unit-taiwan-colony&step=${si + 1}`);
    await p.locator('.opt, .options button').first().click(); await p.waitForTimeout(300);
    const fb = await p.evaluate(() => [...document.querySelectorAll('.feedback')].map((e) => ({ role: e.getAttribute('role'), live: e.getAttribute('aria-live') })));
    ok(fb.length > 0 && fb.every((x) => x.role === 'status' || x.live), `答題後出現的回饋（${fb.length} 個）都有 role="status" 或 aria-live`);
    // 原始碼層級：所有 .feedback 都有 role
    const srcs = ['src/learn/Steps.tsx', 'src/learn/NewSteps.tsx', 'src/learn/ReviewQ.tsx', 'src/learn/ReviewPage.tsx', 'src/learn/ExamPage.tsx', 'src/learn/Capstone.tsx'];
    const missing = [];
    for (const f of srcs) { try { fs.readFileSync(f, 'utf8').split('\n').forEach((l, i) => { if (/className=(?:"feedback|\{`feedback)/.test(l) && !/role=|aria-live/.test(l)) missing.push(`${f}:${i + 1}`); }); } catch { /* 不在 repo 根目錄執行就略過 */ } }
    ok(!missing.length, `原始碼裡每個 feedback 區塊都有 role${missing.length ? '：' + missing.join(' ') : ''}`);
    await ctx.close();
  });

  // ================= 2 最小字級與點擊範圍 =================
  await section('2 最小字級 12px、出處上標 24×24', async () => {
    const pages = ['?mode=learn', '?mode=learn&view=lessons', '?mode=learn&view=curriculum', '?mode=learn&history=taiwan', '?mode=learn&view=stories', '?mode=learn&story=story-taiwan-400', '?mode=learn&dive=dive-three-kingdoms', '?mode=learn&topic=鑄幣',
      '?mode=learn&card=war-peloponnesian', '?mode=learn&view=record', '?mode=learn&unit=unit-taiwan-colony&step=3', '?mode=learn&unit=unit-taiwan-colony&step=5', '?mode=learn&story=story-taiwan-400&read=1', '?mode=learn&unit=unit-taiwan-colony&print=sheet'];
    for (const [w, h, tag] of [[390, 844, '手機'], [1280, 800, '桌機']]) {
      const { ctx, p } = await open(w, h);
      const bad = new Map();
      for (const q of pages) { await go(p, q, 500); for (const x of await p.evaluate(FONTS)) { const k = x.split(' "')[0]; if (!bad.has(k)) bad.set(k, `${q.slice(0, 40)} ${x}`); } }
      ok(!bad.size, `[${tag}] ${pages.length} 個畫面沒有小於 12px 的文字${bad.size ? '；' + [...bad.values()].slice(0, 6).join(' | ') : ''}`);
      await ctx.close();
    }
    // 可點範圍：在元素中心四周 ±11px 的四個點打下去，點到的仍是這個連結（偽元素也算）
    const hit = (p, sel, nth = 0) => p.evaluate(([s, i]) => {
      const els = [...document.querySelectorAll(s)];
      // 挑一個前後沒有別的出處上標緊貼著的（逗號分開的連續出處會互相蓋）
      const e = els.find((x, k) => k >= i && !x.closest('sup')?.nextElementSibling?.classList.contains('sr-cite') && !x.closest('sup')?.previousElementSibling?.classList.contains('sr-cite') && !x.nextElementSibling?.matches('a, .ref') && !x.previousElementSibling?.matches('a, .ref')) ?? els[i];
      if (!e) return null;
      e.scrollIntoView({ block: 'center', behavior: 'instant' });
      const r = e.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      return [[-11, -11], [11, -11], [-11, 11], [11, 11]].map(([dx, dy]) => { const t = document.elementFromPoint(cx + dx, cy + dy); const ok = !!t && (t === e || e.contains(t)); if (!ok) window.__hitDbg = (t && t.tagName + '.' + t.className + ' <' + (t.parentElement && t.parentElement.className)); return ok; });
    }, [sel, nth]);
    {
      const { ctx, p } = await open(1280, 800);
      await go(p, '?mode=learn&story=story-taiwan-400&read=1', 1500);
      const r1 = await hit(p, '.sr-cite a');
      ok(r1 && r1.every(Boolean), `故事閱讀頁出處上標 [n] 可點範圍 >= 24×24（四角 ${JSON.stringify(r1)}）`);
      await go(p, '?mode=learn&story=story-taiwan-400', 800);
      const r2 = await hit(p, '.ce-src a');
      ok(r2 && r2.every(Boolean), `故事線頁出處 [n] 可點範圍 >= 24×24（四角 ${JSON.stringify(r2)} ${await p.evaluate(() => window.__hitDbg)}）`);
      await go(p, '?mode=learn&card=war-peloponnesian', 800);
      const r3 = await hit(p, '.src-btn');
      ok(r3 && r3.every(Boolean), `學習卡的 ⓘ 出處鈕可點範圍 >= 24×24（四角 ${JSON.stringify(r3)}）`);
      await go(p, '?mode=research&card=war-peloponnesian', 1200);
      const r4 = await hit(p, '.ref');
      ok(r4 === null || r4.every(Boolean), `研究模式卡片的出處上標可點範圍 >= 24×24（四角 ${JSON.stringify(r4)}）`);
      await ctx.close();
    }
  });

  // ================= 3 平板 =================
  await section('3 平板直向', async () => {
    for (const [w, h] of [[768 + 52, 1180], [1024, 1366]]) {
      const { ctx, p } = await open(w, h);
      await go(p, '?mode=learn');
      const r = await p.evaluate(() => ({ tablet: !!document.querySelector('.learn.mobile.tablet'), dock: !!document.querySelector('.ld-main'), cw: Math.round(document.querySelector('.lcontent')?.getBoundingClientRect().width ?? 0), tabs: [...document.querySelectorAll('.ltabs button')].map((x) => x.textContent) }));
      ok(r.tablet && !r.dock && r.cw >= 600 && r.tabs.includes('地圖'), `[${w}×${h}] 學習模式用單欄＋分頁（不是桌機三欄）：閱讀欄 ${r.cw}px，分頁 ${r.tabs.join('、')}`);
      await go(p, '?mode=learn&unit=unit-taiwan-colony&step=3');
      const cw = await p.evaluate(() => Math.round(document.querySelector('.lcontent').getBoundingClientRect().width));
      ok(cw >= 600, `[${w}×${h}] 讀課時閱讀欄 ${cw}px >= 600`);
      await p.locator('.ltabs button', { hasText: '地圖' }).click();
      await p.waitForSelector('.map-views button', { timeout: 15000 });
      await p.waitForTimeout(800);
      const m = await p.evaluate(() => {
        const z = document.querySelector('.leaflet-control-zoom')?.getBoundingClientRect();
        const btns = [...document.querySelectorAll('.map-views button')].map((x) => ({ t: x.textContent, r: x.getBoundingClientRect() }));
        const overlap = btns.filter((x) => z && x.r.width && !(x.r.right <= z.left || x.r.left >= z.right || x.r.bottom <= z.top || x.r.top >= z.bottom)).map((x) => x.t);
        const covered = btns.filter((x) => { const e = document.elementFromPoint(x.r.left + x.r.width / 2, x.r.top + x.r.height / 2); return !(e && (e.textContent === x.t)); }).map((x) => x.t);
        return { n: btns.length, overlap, covered, east: btns.some((x) => x.t === '東亞') };
      });
      ok(m.east && !m.overlap.length && !m.covered.length, `[${w}×${h}] 地圖的「東亞」等區域鈕（${m.n} 顆）不被縮放鈕蓋住${m.overlap.length ? '；重疊：' + m.overlap : ''}${m.covered.length ? '；被蓋：' + m.covered : ''}`);
      await p.screenshot({ path: `${out}/tablet-map-${w}.png` });
      await ctx.close();
    }
    // 桌機寬度（橫向平板、筆電）：區域鈕也不被縮放鈕蓋住；研究模式的窄地圖欄也是
    for (const [w, h, mode] of [[1180, 820, 'learn'], [900, 700, 'research']]) {
      const { ctx, p } = await open(w, h);
      await go(p, `?mode=${mode}&unit=unit-taiwan-colony`, 1500);
      await p.waitForSelector('.map-views button', { timeout: 15000 }).catch(() => {});
      const m = await p.evaluate(() => {
        const z = document.querySelector('.leaflet-control-zoom')?.getBoundingClientRect();
        const btns = [...document.querySelectorAll('.map-views button')].map((x) => ({ t: x.textContent, r: x.getBoundingClientRect() })).filter((x) => x.r.width);
        return { n: btns.length, overlap: btns.filter((x) => z && !(x.r.right <= z.left || x.r.left >= z.right || x.r.bottom <= z.top || x.r.top >= z.bottom)).map((x) => x.t) };
      });
      ok(m.n > 0 && !m.overlap.length, `[${w}×${h} ${mode}] 區域鈕 ${m.n} 顆不被縮放鈕蓋住${m.overlap.length ? '；重疊：' + m.overlap : ''}`);
      await ctx.close();
    }
  });

  // ================= 4 關係網人名 =================
  await section('4 關係網人名', async () => {
    for (const [w, h, tag] of [[390, 844, '手機'], [1280, 800, '桌機']]) {
      const { ctx, p } = await open(w, h);
      let found = 0, cut = [], small = [], out = [];
      for (const dv of ['dive-three-kingdoms', 'dive-sengoku', 'dive-ancient-rome', 'dive-french-revolution']) {
        await go(p, `?mode=research&dive=${dv}`, 1500);
        if (!(await p.locator('.rel-graph').count())) continue;
        await p.locator('.rel-graph').first().scrollIntoViewIfNeeded();
        await p.waitForTimeout(400);
        const r = await p.evaluate(() => {
          const svg = document.querySelector('.rel-graph .rg-node').ownerSVGElement; const vb = svg.viewBox.baseVal; const k = svg.getBoundingClientRect().width / vb.width;
          const res = { cut: [], small: [], out: [], n: 0 };
          for (const t of svg.querySelectorAll('.rg-node text')) {
            res.n++;
            const txt = t.textContent; const bb = t.getBBox();
            if (txt.includes('…')) res.cut.push(txt);
            if (parseFloat(getComputedStyle(t).fontSize) * k < 11.99) res.small.push(`${txt}:${(parseFloat(getComputedStyle(t).fontSize) * k).toFixed(1)}`);
            const m = t.parentElement.transform.baseVal.consolidate()?.matrix; const ox = m ? m.e : 0, oy = m ? m.f : 0;
            if (ox + bb.x < -1 || ox + bb.x + bb.width > vb.width + 1 || oy + bb.y < -1 || oy + bb.y + bb.height > vb.height + 1) res.out.push(txt);
          }
          return res;
        });
        found += r.n; cut.push(...r.cut); small.push(...r.small); out.push(...r.out);
      }
      ok(found > 0 && !cut.length && !small.length && !out.length, `[${tag}] 關係網 ${found} 個人名：不截斷（…）、縮放後 >= 12px、不超出畫布${cut.length ? '；截斷：' + cut : ''}${small.length ? '；太小：' + small.slice(0, 4) : ''}${out.length ? '；超出：' + out : ''}`);
      await ctx.close();
    }
  });

  // ================= 5 壞網址與斷網 =================
  await section('5 壞網址、斷網與重試', async () => {
    const { ctx, p } = await open(1280, 800);
    const bad = [];
    for (const [q, what] of [['?mode=learn&unit=nope', '課'], ['?mode=learn&card=nope', '卡片'], ['?mode=learn&dive=nope', '深入專題'], ['?mode=learn&story=nope', '故事'], ['?mode=learn&topic=nope', '主題'], ['?mode=learn&sim=nope', '模擬'], ['?mode=learn&view=export&unit=nope', '課'], ['?mode=learn&unit=nope&print=sheet', '課']]) {
      await go(p, q, 900);
      const t = await p.evaluate(() => (document.querySelector('.lcontent') || document.body).innerText);
      if (!/找不到/.test(t) || /下載失敗|檢查網路/.test(t)) bad.push(`${q} → ${t.replace(/\s+/g, ' ').slice(0, 40)}`);
    }
    ok(!bad.length, `壞網址（unit／card／dive／story／topic／sim）顯示「找不到…」而不是「下載失敗」${bad.length ? '；' + bad.join(' | ') : ''}`);
    // 研究模式的壞 card
    await go(p, '?mode=research&card=nope', 1000);
    ok(/找不到/.test(await p.evaluate(() => document.body.innerText)), '研究模式的壞 card 網址也顯示「找不到」');
    await ctx.close();

    // 斷網 A：這個畫面的程式（chunk）還沒載入 → 「現在沒有網路」＋重試；恢復連線後按重試要真的載入
    {
      const { ctx, p } = await open(1280, 800);
      await go(p, '?mode=learn');
      await ctx.setOffline(true);
      await p.locator('button.mystery, .unit-tile').first().click();
      await p.waitForTimeout(1500);
      const t = await p.evaluate(() => document.body.innerText);
      const retry = p.locator('.chunk-err button, .loading-detail button.link').first();
      ok(/沒有網路|下載失敗|沒載入成功/.test(t) && (await retry.count()) > 0, `斷網時開一課：顯示網路訊息與「重試」（${t.match(/現在沒有網路[^。]*。|下載失敗[^。]*。|沒載入成功[^。]*。/)?.[0] ?? '?'}）`);
      await ctx.setOffline(false);
      await p.waitForTimeout(300);
      await retry.click();
      const got = await p.waitForSelector('.unit-intro, .unit', { timeout: 20000 }).then(() => true).catch(() => false);
      ok(got, '恢復連線後按「重試」，這一課真的載入了');
      await ctx.close();
    }
    // 斷網 B：程式載入過了，但這一課的資料還沒抓 → 「下載失敗」＋重試
    {
      const { ctx, p } = await open(1280, 800);
      await go(p, '?mode=learn&unit=unit-taiwan-colony');
      await p.waitForSelector('.unit-intro');
      await p.locator('.back').first().click().catch(() => {});
      await p.waitForSelector('.lhome');
      await ctx.setOffline(true);
      // 挑一個還沒開過的課
      await p.locator('button.mystery', { hasText: '四百年前' }).first().click();
      await p.waitForSelector('.loading-detail button.link', { timeout: 15000 });
      ok(/下載失敗/.test(await p.locator('.loading-detail').first().innerText()), '斷網開新課：顯示「下載失敗」與重試');
      await ctx.setOffline(false);
      await p.locator('.loading-detail button.link').first().click();
      ok(await p.waitForSelector('.unit-intro', { timeout: 15000 }).then(() => true).catch(() => false), '恢復連線後按「重試」，這一課的內容真的重新下載並顯示');
      await ctx.close();
    }
  });

  // ================= 6 故事「考考自己」 =================
  await section('6 故事考考自己：插題與紀錄', async () => {
    const sid = 'story-ancient-rome';
    const doc = await (await fetch(`${base}data/stories/${sid}.json`)).json();
    const S = doc.sections.length, Q = doc.recall.length;
    const { ctx, p } = await open(1280, 800);
    // 舊進度（沒有 stories 欄位）照常
    await p.addInitScript((k) => { try { if (!localStorage.getItem(k)) localStorage.setItem(k, JSON.stringify({ units: { 'unit-x': { step: 2, done: false, lastAt: '2026-11-10' } }, cards: {} })); } catch { /* */ } }, KEY);
    await go(p, `?mode=learn&story=${sid}&read=1`, 1500);
    await p.waitForSelector('.sr-sec');
    const q = await p.evaluate(() => [...document.querySelectorAll('.sr-sec')].map((s, i) => ({ i, n: s.querySelectorAll('.sr-quiz').length })));
    const at = q.filter((x) => x.n).map((x) => x.i);
    const gaps = at.slice(1).map((v, k) => v - at[k]);
    const total = q.reduce((n, x) => n + x.n, 0);
    ok(total === Math.min(Q, Math.floor(S / 2)) && gaps.every((g) => g >= 2 && g <= 3) && at[at.length - 1] <= S - 1, `${sid}（${S} 節、${Q} 題）：文中插 ${total} 題，在第 ${at.map((x) => x + 1).join('、')} 節後；間隔 ${gaps.join('、')} 節（2–3）`);
    const order = await p.evaluate(() => [...document.querySelectorAll('.sr-quiz .sr-recall-q')].map((e) => e.textContent));
    ok(order.every((t, k) => t === doc.recall[Math.floor((k * Q) / total)].q), '文中的題目照原順序、平均分散');
    ok((await p.locator('.sr-box.recall li').count()) === Q, `文末「全部題目」仍有 ${Q} 題`);
    // 看答案 → 自評 → 存進進度
    const first = p.locator('.sr-quiz').first();
    await first.locator('.sr-recall-btn').click();
    ok((await first.locator('.sr-recall-a').textContent()).trim() === doc.recall[0].a, '點「想好了，看答案」看到答案');
    await first.locator('.sr-self-btn', { hasText: '我想得出來' }).click();
    await p.waitForTimeout(300);
    let prog = await p.evaluate((k) => JSON.parse(localStorage.getItem(k)), KEY);
    const rec = prog.stories?.[sid]?.recall?.['0'];
    ok(rec && rec.s === 2 && typeof rec.t === 'string', `作答與自評存進進度：stories.${sid}.recall.0 = ${JSON.stringify(rec)}`);
    ok(prog.units['unit-x']?.step === 2, '舊進度的其他欄位沒被動到');
    // 重新整理還在
    await go(p, `?mode=learn&story=${sid}&read=1`, 1500);
    await p.waitForSelector('.sr-sec');
    const again = p.locator('.sr-quiz').first();
    ok((await again.locator('.sr-recall-a').count()) === 1 && (await again.locator('.sr-self-btn[aria-pressed="true"]').textContent()).includes('我想得出來'), '重新整理後，答案與自評還在');
    // 文末總覽：成績
    await p.locator('.sr-box.recall').scrollIntoViewIfNeeded();
    const li0 = p.locator('.sr-box.recall li').first();
    ok((await li0.locator('.sr-recall-a').count()) === 1, '文末的「全部題目」同步顯示已看過的答案');
    ok(/想得出來 2?1|想得出來 <?1/.test(await p.locator('.sr-score').textContent().then((t) => t.replace(/\s+/g, ' ')).catch(() => '')) || /想得出來\s*1/.test(await p.locator('.sr-score').textContent().catch(() => '')), `文末顯示自評成績：${(await p.locator('.sr-score').textContent().catch(() => '')).trim()}`);
    await p.screenshot({ path: `${out}/story-quiz.png` });
    // 備份匯出帶得到
    await go(p, '?mode=learn&view=record', 800);
    const [dl] = await Promise.all([p.waitForEvent('download'), p.locator('button', { hasText: '備份進度' }).click()]);
    const path = await dl.path();
    const bak = JSON.parse(fs.readFileSync(path, 'utf8'));
    ok(bak.data?.stories?.[sid]?.recall?.['0']?.s === 2, '備份檔（匯出）帶有故事的作答與自評');
    // 匯入：清空後還原
    await p.evaluate((k) => { const o = JSON.parse(localStorage.getItem(k)); delete o.stories; localStorage.setItem(k, JSON.stringify(o)); }, KEY);
    await go(p, '?mode=learn&view=record', 800);
    await p.locator('input[type=file]').setInputFiles(path);
    await p.waitForSelector('.restore-plan');
    ok(/考考自己/.test(await p.locator('.restore-plan').textContent()), '還原預覽有列出「故事考考自己」的題數');
    await p.locator('.restore-plan button.primary').click();
    await p.waitForTimeout(500);
    prog = await p.evaluate((k) => JSON.parse(localStorage.getItem(k)), KEY);
    ok(prog.stories?.[sid]?.recall?.['0']?.s === 2, '匯入備份後，故事的作答與自評回來了');
    // 研究模式（沒有學習進度 hook）也存得到同一個鍵
    await p.evaluate((k) => { const o = JSON.parse(localStorage.getItem(k)); delete o.stories; localStorage.setItem(k, JSON.stringify(o)); }, KEY);
    await go(p, `?mode=research&story=${sid}&read=1`, 1500);
    await p.waitForSelector('.sr-sec');
    await p.locator('.sr-quiz').first().locator('.sr-recall-btn').click();
    await p.locator('.sr-quiz').first().locator('.sr-self-btn', { hasText: '沒想起來' }).click();
    await p.waitForTimeout(300);
    prog = await p.evaluate((k) => JSON.parse(localStorage.getItem(k)), KEY);
    ok(prog.stories?.[sid]?.recall?.['0']?.s === 0, '研究模式的閱讀頁也把自評存進同一份進度');
    await ctx.close();
    // 短故事：題數比節數÷2 多時，只插得下的放文中
    const short = await (await fetch(`${base}data/stories/story-greece.json`)).json();
    const { ctx: c2, p: p2 } = await open(1280, 800);
    await go(p2, '?mode=learn&story=story-greece&read=1', 1500);
    await p2.waitForSelector('.sr-sec');
    const n2 = await p2.locator('.sr-sec .sr-quiz').count();
    ok(n2 === Math.min(short.recall.length, Math.floor(short.sections.length / 2)) && (await p2.locator('.sr-box.recall li').count()) === short.recall.length, `短故事（${short.sections.length} 節、${short.recall.length} 題）文中插 ${n2} 題，文末仍列全部 ${short.recall.length} 題`);
    await c2.close();
  });

  // ================= 7 首頁「接著做」 =================
  await section('7 首頁「接著做」依最近作答時間', async () => {
    const ids = ix.units.map((u) => u.id);
    const [A, B] = [ids.find((i) => i === 'unit-taiwan-colony') ?? ids[0], ids.find((i) => i === 'unit-rome-1') ?? ids[1]];
    const titleOf = (id) => ix.units.find((u) => u.id === id).title;
    const run = async (units, want, msg) => {
      const { ctx, p } = await open(1280, 800);
      await p.addInitScript(([k, u]) => { try { localStorage.setItem(k, JSON.stringify({ units: u, cards: {}, seenIntro: true })); } catch { /* */ } }, [KEY, units]);
      await go(p, '?mode=learn');
      await p.waitForSelector('.resume');
      const t = await p.locator('.resume').innerText();
      ok(t.includes(titleOf(want)), `${msg}：接著做的是《${titleOf(want)}》`);
      await ctx.close();
    };
    const now = Date.now();
    await run({ [A]: { step: 9, done: false, lastAt: '2026-11-14', ts: now - 3600e3 }, [B]: { step: 2, done: false, lastAt: '2026-11-14', ts: now - 60e3 } }, B, '有時間戳：步數少但最近做的優先');
    await run({ [A]: { step: 9, done: false, lastAt: '2026-11-14' }, [B]: { step: 2, done: false, lastAt: '2026-11-14' } }, A, '舊進度（沒有時間戳、同一天）：退回步數最多的');
    await run({ [A]: { step: 9, done: false, lastAt: '2026-11-14' }, [B]: { step: 2, done: false, lastAt: '2026-11-13' } }, A, '舊進度：日期較新的優先');
    await run({ [A]: { step: 9, done: false, lastAt: '2026-11-14' }, [B]: { step: 2, done: false, lastAt: '2026-11-14', ts: now } }, B, '一課有時間戳、一課沒有（同一天）：有時間戳的（較新）優先');
  });

  // ================= 8 深色模式 =================
  await section('8 深色模式', async () => {
    // 跟隨系統
    {
      const { ctx, p } = await open(1280, 800, { colorScheme: 'dark' });
      await go(p, '?mode=learn');
      ok((await p.evaluate(() => document.documentElement.dataset.theme)) === 'dark', '系統是深色 → 自動深色');
      const bg = await p.evaluate(() => getComputedStyle(document.body).backgroundColor);
      ok(/rgb\((\d+), (\d+), (\d+)\)/.test(bg) && Math.max(...bg.match(/\d+/g).map(Number)) < 60, `深色底（${bg}）`);
      // 面板：切成淺色，記住，重新整理仍是淺色
      await p.locator('.aa-btn').click();
      ok(await p.locator('#aa-panel').isVisible(), '「Aa」面板打得開');
      ok((await p.locator('#aa-panel [role=radio]').allTextContents()).join() === '自動,淺色,深色', '面板有「外觀：自動／淺色／深色」');
      await p.screenshot({ path: `${out}/dark-aa-panel.png` });
      await p.locator('#aa-panel [role=radio]', { hasText: '淺色' }).click();
      ok((await p.evaluate(() => document.documentElement.dataset.theme)) === 'light' && (await p.evaluate(() => localStorage.getItem('history-river-theme'))) === 'light', '選「淺色」：立刻變淺、存進 localStorage');
      await go(p, '?mode=learn');
      ok((await p.evaluate(() => document.documentElement.dataset.theme)) === 'light', '重新整理後仍是淺色（不被系統深色蓋掉）');
      await p.locator('.aa-btn').click();
      await p.locator('#aa-panel [role=radio]', { hasText: '深色' }).click();
      ok((await p.evaluate(() => document.documentElement.dataset.theme)) === 'dark', '選「深色」');
      await p.locator('#aa-panel [role=radio]', { hasText: '自動' }).click();
      ok((await p.evaluate(() => localStorage.getItem('history-river-theme'))) === null && (await p.evaluate(() => document.documentElement.dataset.theme)) === 'dark', '選「自動」：清掉設定、回到跟隨系統');
      await p.emulateMedia({ colorScheme: 'light' });
      await p.waitForTimeout(300);
      ok((await p.evaluate(() => document.documentElement.dataset.theme)) === 'light', '「自動」時系統切到淺色，頁面即時跟著變');
      await ctx.close();
    }
    {
      const { ctx, p } = await open(1280, 800, { colorScheme: 'light' });
      await go(p, '?mode=learn');
      ok((await p.evaluate(() => document.documentElement.dataset.theme)) === 'light', '系統是淺色 → 淺色');
      // 故事閱讀頁的「Aa 顯示」也有外觀
      await go(p, '?mode=learn&story=story-taiwan-400&read=1', 1200);
      await p.locator('.sr-tool', { hasText: '顯示' }).click();
      ok((await p.locator('#sr-view-menu [role=radio]').allTextContents()).join() === '自動,淺色,深色', '故事閱讀頁的「Aa 顯示」也能選外觀');
      await ctx.close();
    }
    // 對比抽查（深色）：桌機與手機
    const pages = ['?mode=learn', '?mode=learn&view=lessons', '?mode=learn&history=taiwan', '?mode=learn&view=curriculum', '?mode=learn&view=stories', '?mode=learn&story=story-taiwan-400', '?mode=learn&story=story-taiwan-400&read=1',
      '?mode=learn&dive=dive-three-kingdoms', '?mode=learn&topic=鑄幣', '?mode=learn&card=war-peloponnesian', '?mode=learn&view=record', '?mode=learn&view=review', '?mode=learn&view=mymap',
      '?mode=learn&unit=unit-taiwan-colony', '?mode=learn&unit=unit-taiwan-colony&step=3', '?mode=learn&unit=unit-taiwan-colony&step=4', '?mode=learn&unit=unit-taiwan-colony&step=6', '?mode=learn&unit=unit-taiwan-colony&step=8', '?mode=learn&unit=unit-taiwan-colony&step=13',
      '?mode=research', '?mode=research&card=war-peloponnesian'];
    for (const [w, h, tag] of [[1280, 800, '桌機'], [390, 844, '手機']]) {
      const { ctx, p } = await open(w, h, { colorScheme: 'dark' });
      const bad = new Map();
      for (const q of pages) { await go(p, q, 700); for (const x of await p.evaluate(SCAN)) { const k = x.split(' ').slice(0, 3).join(' '); if (!bad.has(k)) bad.set(k, `${q.slice(0, 36)} ${x}`); } }
      ok(!bad.size, `[深色 ${tag}] ${pages.length} 個畫面的文字對比都 >= 4.5:1（大字 3:1）${bad.size ? '；不及格：' + [...bad.values()].slice(0, 8).join(' | ') : ''}`);
      await ctx.close();
    }
    // 淺色也抽查一輪（類型色改用 TYPE_VAR 之後不能退步）
    {
      const { ctx, p } = await open(1280, 800, { colorScheme: 'light' });
      const bad = new Map();
      for (const q of ['?mode=learn&history=taiwan', '?mode=learn&card=war-peloponnesian', '?mode=learn&topic=鑄幣', '?mode=learn&dive=dive-three-kingdoms', '?mode=learn&unit=unit-money-origins&step=5']) { await go(p, q, 700); for (const x of await p.evaluate(SCAN)) { const k = x.split(' ').slice(0, 3).join(' '); if (!bad.has(k)) bad.set(k, `${q.slice(0, 36)} ${x}`); } }
      ok(!bad.size, `[淺色] 類型色等抽查畫面文字對比都 >= 4.5:1${bad.size ? '；不及格：' + [...bad.values()].slice(0, 6).join(' | ') : ''}`);
      await ctx.close();
    }
    // 列印永遠淺色：系統深色 + 列印媒體
    {
      const { ctx, p } = await open(1000, 900, { colorScheme: 'dark' });
      await go(p, '?mode=learn&unit=unit-taiwan-colony&print=sheet', 1200);
      await p.emulateMedia({ media: 'print', colorScheme: 'dark' });
      const c = await p.evaluate(() => { const q = document.querySelector('.ws-q'); return { body: getComputedStyle(document.body).backgroundColor, text: q ? getComputedStyle(q).color : '', ws: q ? getComputedStyle(q.closest('.ws-step') || q).backgroundColor : '' }; });
      const light = (s) => (s.match(/\d+/g) || []).slice(0, 3).map(Number);
      ok(light(c.body).every((v) => v > 230) && light(c.text).every((v) => v < 90), `列印（學習單）用淺色：底 ${c.body}、字 ${c.text}`);
      await ctx.close();
    }
  });

  // ================= 9 故事地圖的考古文化名 =================
  await section('9 故事地圖不標考古文化名', async () => {
    const { ctx, p } = await open(1280, 800);
    let labels = [], paths = 0, note = false;
    for (const sid of ['story-ancient-rome', 'story-ancient-greece', 'story-rome-empire']) {
      await go(p, `?mode=learn&story=${sid}&read=1`, 1500);
      await p.waitForSelector('.sm-box', { timeout: 15000 }).catch(() => {});
      await p.waitForTimeout(1500);
      for (let i = 0; i < 3; i++) {
        const r = await p.evaluate(() => ({ labels: [...document.querySelectorAll('.sm-pollabel')].map((e) => e.textContent), cult: [...document.querySelectorAll('.sm-pol title')].filter((t) => /考古/.test(t.textContent)).length, note: /只上色、不標名稱/.test(document.querySelector('.sm-era')?.textContent ?? '') }));
        labels.push(...r.labels); paths += r.cult; note = note || r.note;
        await p.mouse.wheel(0, 900); await p.waitForTimeout(500);
      }
    }
    ok(!labels.some((t) => /文化|酋邦/.test(t)), `故事地圖的政權標籤沒有「…文化」（共看到 ${labels.length} 個標籤：${[...new Set(labels)].slice(0, 6).join('、')}）`);
    ok(paths === 0 || note, `有考古文化色塊時（${paths} 塊），圖說註明「只上色、不標名稱」`);
    await p.screenshot({ path: `${out}/story-map-culture.png` });
    await ctx.close();
  });

  // ================= 10 搜尋 =================
  await section('10 搜尋：精確在前、近似在後', async () => {
    const { ctx, p } = await open(1280, 800);
    await go(p, '?mode=learn');
    const search = async (q) => { await p.fill('.lsearch-box input', ''); await p.fill('.lsearch-box input', q); await p.waitForTimeout(1800); return p.evaluate(() => ({ names: [...document.querySelectorAll('.lsearch .lresult')].map((e) => e.querySelector('.nm').textContent), maybeAt: (() => { const kids = [...document.querySelectorAll('.lsearch > *')]; const k = kids.findIndex((e) => e.classList.contains('maybe-h')); return k < 0 ? -1 : kids.slice(0, k).filter((e) => e.classList.contains('lresult')).length; })() })); };
    const r = await search('蒙古');
    const exact = (name) => { const c = ix.cards.find((x) => x.name === name); return !!c && ([c.name, ...(c.aliases ?? [])].some((t) => t.includes('蒙古'))); };
    const head = r.maybeAt < 0 ? r.names : r.names.slice(0, r.maybeAt);
    ok(head.length >= 2 && head.slice(0, 2).every(exact), `搜「蒙古」：最前面的結果名稱或別名含「蒙古」（前 2 筆；「可能相關」之前共 ${head.length} 筆，其餘是內文有寫到）`);
    ok(!/奧蘭普/.test(r.names[1] ?? ''), `搜「蒙古」第二筆不是奧蘭普·德古熱（${r.names.slice(0, 4).join('、')}）`);
    const idx = r.names.findIndex((n) => /奧蘭普/.test(n));
    ok(idx < 0 || (r.maybeAt >= 0 && idx >= r.maybeAt), `奧蘭普·德古熱即使還在結果裡，也排在「可能相關」之後（位置 ${idx}，分界 ${r.maybeAt}）`);
    await p.screenshot({ path: `${out}/search-mongol.png` });
    // 研究模式：排序同樣精確在前
    await go(p, '?mode=research');
    await p.fill('.search', '蒙古'); await p.waitForTimeout(1800);
    const rn = await p.evaluate(() => [...document.querySelectorAll('.result .r-name, .result-list .r-name, .r-name')].map((e) => e.textContent).slice(0, 6));
    ok(!/奧蘭普/.test(rn[1] ?? ''), `研究模式搜「蒙古」前幾筆（${rn.join('、')}）第二筆也不是奧蘭普·德古熱`);
    await ctx.close();
  });

  // ================= 11 focus 代號 =================
  await section('11 card 步驟的 focus 代號 C9／C10 等也會展開', async () => {
    let tested = 0;
    const { ctx, p } = await open(1280, 800);
    for (const uid of ['unit-rome-2', 'unit-japan-lost-decades-2']) {
      const u = await unitJson(uid);
      const cards = await Promise.all([...new Set(u.steps.filter((s) => s.type === 'card').map((s) => s.id))].map(async (id) => [id, (await (await fetch(`${base}data/cards/${id}.json`)).json()).card]));
      const byId = new Map(cards);
      for (const [i, s] of u.steps.entries()) {
        if (s.type !== 'card' || !s.focus) continue;
        const c = byId.get(s.id);
        const todaySecs = (c.sections ?? []).filter((x) => x.role === 'today_hook' || x.role === 'non_analogous').map((x) => x.code);
        if (!s.focus.some((f) => todaySecs.includes(f))) continue;
        await go(p, `?mode=learn&unit=${uid}&step=${i + 1}`, 800);
        const has = await p.locator('.unit-card .lc-focus .today-pair').count();
        ok(has === 1, `${uid} 第 ${i + 1} 步 focus=[${s.focus}]（${s.id}）：今日對照那一塊直接展開`);
        tested++;
      }
    }
    ok(tested > 0, `至少測到 ${tested} 個含今日對照代號的 card 步驟`);
    await ctx.close();
    // validate：不認得的 focus 代號會報錯（原始碼層級）
    try {
      const src = fs.readFileSync('scripts/lib/learn.ts', 'utf8');
      ok(/focus 的「\$\{code\}」不是/.test(src) && /FOCUS_EXTRA/.test(src), 'validate 對不認得的 focus 代號報錯（scripts/lib/learn.ts）');
    } catch { /* 不在 repo 根目錄 */ }
  });

  // ================= 12 課綱對照頁 =================
  await section('12 課綱對照頁排版', async () => {
    for (const [w, h, tag] of [[390, 844, '手機'], [1280, 800, '桌機']]) {
      const { ctx, p } = await open(w, h);
      await go(p, '?mode=learn&view=curriculum', 1000);
      const r = await p.evaluate(() => {
        const sc = document.querySelector('.lm-main, .lcontent');
        const items = [...document.querySelectorAll('.cur-item')];
        const over = items.filter((e) => e.getBoundingClientRect().right > innerWidth + 1 || e.scrollWidth > e.clientWidth + 1).length;
        const lis = [...document.querySelectorAll('.cur-item li')];
        const style = lis.length ? getComputedStyle(lis[0], '::before') : null;
        const ul = document.querySelector('.cur-item ul');
        return { n: items.length, over, docOver: document.documentElement.scrollWidth > innerWidth + 1, marker: lis.length ? getComputedStyle(lis[0]).listStyleType : 'none', before: style?.content, pos: style?.position, ulPad: ul ? getComputedStyle(ul).paddingLeft : '', liPad: lis.length ? getComputedStyle(lis[0]).paddingLeft : '' };
      });
      ok(r.n > 0 && r.over === 0 && !r.docOver, `[${tag}] 課綱條目 ${r.n} 個都不溢出畫面`);
      ok(r.marker === 'none' && /•/.test(r.before ?? '') && r.pos === 'absolute', `[${tag}] 項目符號固定在第一行（自訂符號，不靠瀏覽器預設的 list-style）`);
      await p.locator('.cur-item').nth(40).scrollIntoViewIfNeeded().catch(() => {});
      await p.screenshot({ path: `${out}/curriculum-${w}.png` });
      await ctx.close();
    }
  });

  // ================= 13 學習單「先猜猜看」 =================
  await section('13 學習單「先猜猜看」不重複', async () => {
    const { ctx, p } = await open(1000, 900);
    const sus = [];
    for (const u of ix.units) { const full = await unitJson(u.id); const h = full.steps.find((s) => s.type === 'hook' && s.guess && typeof s.guess === 'object'); if (h && /先猜猜看|沒有對錯/.test(h.guess.q)) sus.push(u.id); }
    const ids = [...new Set([...sus, 'unit-taiwan-colony', 'unit-rome-1'])];
    const bad = [];
    for (const id of ids) {
      await go(p, `?mode=learn&unit=${id}&print=sheet`, 600);
      await p.waitForSelector('.ws-step', { timeout: 8000 }).catch(() => {});
      const n = await p.evaluate(() => (document.body.innerText.match(/先猜猜看/g) || []).length);
      const dup = await p.evaluate(() => (document.querySelector('.ws-step .ws-q')?.innerText.match(/沒有對錯/g) || []).length);
      if (n > 1 || dup > 1) bad.push(`${id}（先猜猜看 ${n}、沒有對錯 ${dup}）`);
    }
    ok(!bad.length, `學習單的「先猜猜看」標籤每份最多一次（檢查 ${ids.length} 課，其中 ${sus.length} 課題目文字本身就寫了）${bad.length ? '；重複：' + bad.join('、') : ''}`);
    await ctx.close();
  });

  // ================= 14 捲動位置恢復 =================
  await section('14 上一頁／返回恢復捲動位置', async () => {
    for (const [w, h, tag, scr] of [[390, 844, '手機', '.lm-main'], [1280, 800, '桌機', '.lcontent']]) {
      const { ctx, p } = await open(w, h);
      await go(p, '?mode=learn&view=lessons', 1000);
      const y0 = await p.evaluate((s) => { const e = document.querySelector(s); e.scrollTop = 900; return e.scrollTop; }, scr);
      ok(y0 > 300, `[${tag}] 「全部的課」清單捲到 ${y0}px`);
      await p.waitForTimeout(200);
      await p.evaluate((s) => { const bs = [...document.querySelectorAll(`${s} button.mystery, ${s} .mystery`)]; const e = bs.find((x) => x.getBoundingClientRect().top > 100 && x.getBoundingClientRect().top < innerHeight - 50); e.click(); }, scr);
      await p.waitForSelector('.unit-intro, .unit');
      await p.waitForTimeout(500);
      ok((await p.evaluate((s) => document.querySelector(s).scrollTop, scr)) < 50, `[${tag}] 進到課之後從頂端開始`);
      await p.locator('.back').first().click();
      await p.waitForSelector('.lists-page, .lessons-page, .mystery');
      await p.waitForTimeout(900);
      const y1 = await p.evaluate((s) => document.querySelector(s).scrollTop, scr);
      ok(Math.abs(y1 - y0) <= 4, `[${tag}] 按「← 返回」回到清單，捲動位置恢復（${y0} → ${y1}）`);
      // 瀏覽器上一頁
      await p.evaluate((s) => { const bs = [...document.querySelectorAll(`${s} button.mystery, ${s} .mystery`)]; const e = bs.find((x) => x.getBoundingClientRect().top > 100 && x.getBoundingClientRect().top < innerHeight - 50); e.click(); }, scr);
      await p.waitForSelector('.unit-intro, .unit');
      await p.waitForTimeout(400);
      await p.goBack();
      await p.waitForTimeout(900);
      const y2 = await p.evaluate((s) => document.querySelector(s).scrollTop, scr);
      ok(Math.abs(y2 - y0) <= 4, `[${tag}] 瀏覽器「上一頁」回到清單，捲動位置恢復（${y0} → ${y2}）`);
      await ctx.close();
    }
  });

  ok(!errs.length, `沒有 JS 錯誤${errs.length ? '：' + errs.slice(0, 3).join(' | ') : ''}`);
  await b.close();
  console.log(fail ? `\n${fail} 項未通過` : '\n全部通過');
  process.exit(fail ? 1 : 0);
})();
