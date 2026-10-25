// 卡片檢查規則（validate 與 build-index 共用）
import fs from 'node:fs';
import path from 'node:path';
import {
  SECTIONS, TYPE_LABEL, TYPE_PREFIX, FIELD_OPTIONS, VERIFICATION, LENS_STATUS, TIME_PRECISION,
  LOC_PRECISION, SCALES, TRACKS, SOURCE_TIERS, type CardType,
} from './fields.ts';
import { ROOT, refsOf, type RawCard } from './cards.ts';

export interface Issue { level: 'error' | 'warning'; file: string; msg: string }

const LENS_KEYS = ['李彔', '哈拉瑞'];
const PAGE_RE = /第\s*[一二三四五六七八九十百\d]+\s*章|第\s*\d+\s*頁|p{1,2}\.\s*\d+/;

export function checkCards(
  cards: RawCard[],
  ctx: { tags: Set<string>; routes: Set<string>; frameworks: Set<string>; histories?: Set<string> },
): Issue[] {
  const issues: Issue[] = [];
  const ids = new Map<string, string>();
  for (const c of cards) if (c.fm?.id) ids.set(c.fm.id, c.file);

  for (const c of cards) {
    const err = (msg: string) => issues.push({ level: 'error', file: c.file, msg });
    const warn = (msg: string) => issues.push({ level: 'warning', file: c.file, msg });
    const f = c.fm;
    if (!f) { err('找不到 YAML frontmatter（檔案開頭需要 --- 區塊）'); continue; }

    // ---- 核心欄位 ----
    const type = f.type as CardType;
    if (!(type in TYPE_LABEL)) err(`type 必須是 ${Object.keys(TYPE_LABEL).join('|')}，目前是「${f.type}」`);
    if (!/^(war|commodity|event|building|tech|finance|social)-[a-z0-9]+(-[a-z0-9]+)*$/.test(f.id ?? '')) err(`id 格式錯誤：「${f.id}」`);
    else if (!f.id.startsWith(type + '-')) err(`id 前綴應為「${type}-」`);
    if (f.id && path.basename(c.file, '.md') !== f.id) err(`檔名應為 ${f.id}.md`);
    if ([...cards].filter((x) => x.fm?.id === f.id).length > 1) err(`id 重複：${f.id}`);
    if (!f.name) err('缺少 name');
    if (!Array.isArray(f.aliases) || !f.aliases.length) err('aliases 至少要有 1 個');
    else for (const a of f.aliases) if (typeof a !== 'string') warn(`別名 ${a} 會被 YAML 讀成數字，請加引號寫成字串`);
    if (!Array.isArray(f.civilization) || !f.civilization.length) err('缺少 civilization');
    if (!TRACKS.includes(f.track)) err(`track 必須是 ${TRACKS.join('|')}`);

    const srcIds = new Set<string>();
    if (!Array.isArray(f.sources) || !f.sources.length) err('sources 至少要有 1 筆');
    else for (const s of f.sources) {
      if (!s.id || !/^s\d+$/.test(s.id)) err(`來源 id 必須是 s1、s2… 格式：${JSON.stringify(s.id)}`);
      if (srcIds.has(s.id)) err(`來源 id 重複：${s.id}`);
      srcIds.add(s.id);
      if (!s.title) err(`來源 ${s.id} 缺少 title`);
      if (!/^https?:\/\//.test(s.url ?? '')) err(`來源 ${s.id} 的 url 不是有效網址`);
      if (!s.accessed) err(`來源 ${s.id} 缺少 accessed（查閱日期）`);
      if (s.tier !== undefined && !SOURCE_TIERS.includes(s.tier)) err(`來源 ${s.id} 的 tier 必須是 ${SOURCE_TIERS.join('|')}`);
    }
    const usedRefs = new Set<string>();
    const needRefs = (refs: string[] | undefined, where: string) => {
      if (!Array.isArray(refs) || !refs.length) { err(`${where} 沒有來源代號`); return; }
      for (const r of refs) { usedRefs.add(r); if (!srcIds.has(r)) err(`${where} 引用了不存在的來源 ${r}`); }
    };

    const t = f.time;
    if (!t || typeof t.start !== 'number' || typeof t.end !== 'number') err('time.start / time.end 必須是數字（西元前用負數）');
    else {
      if (t.start > t.end) err('time.start 不可晚於 time.end');
      if (t.start === 0 || t.end === 0) err('沒有西元 0 年：西元前 1 年寫 -1，西元 1 年寫 1');
    }
    if (!TIME_PRECISION.includes(t?.precision)) err(`time.precision 必須是 ${TIME_PRECISION.join('|')}`);
    needRefs(t?.src, 'time');

    const p = f.place ?? {};
    if (!FIELD_OPTIONS.includes(p.primary_field)) err(`place.primary_field 必須是場域選項之一，目前是「${p.primary_field}」`);
    if (Array.isArray(p.primary_field)) err('主場域只能選 1 個');
    for (const s of p.secondary_fields ?? []) if (!FIELD_OPTIONS.includes(s)) err(`次場域「${s}」不在選項內`);
    if (!SCALES.includes(p.scale)) err(`place.scale 必須是 ${SCALES.join('|')}`);
    if (!Array.isArray(p.locations) || !p.locations.length) err('place.locations 至少要有 1 個地點');
    else p.locations.forEach((l: any, i: number) => {
      const w = `locations[${i}]（${l.name_ancient ?? '?'}）`;
      if (!l.name_ancient || !l.name_modern) err(`${w} 需要 name_ancient 與 name_modern`);
      if (typeof l.lat !== 'number' || typeof l.lng !== 'number') err(`${w} 缺少座標`);
      if (!LOC_PRECISION.includes(l.precision)) err(`${w} precision 必須是 ${LOC_PRECISION.join('|')}`);
      if (l.pleiades_id !== undefined && typeof l.pleiades_id !== 'string') err(`${w} pleiades_id 要加引號寫成字串`);
      if (!l.pleiades_id) needRefs(l.src, `${w}（無 Pleiades ID 時需 src）`);
      else if (l.src) needRefs(l.src, w);
    });

    const label = TYPE_LABEL[type];
    const parts = String(f.summary_line ?? '').split('｜');
    if (parts.length !== 4) err('summary_line 格式必須是「類型｜場域｜地點｜名稱」（全形｜）');
    else {
      if (parts[0] !== label) err(`summary_line 第 1 段應為「${label}」`);
      if (parts[1] !== p.primary_field) err('summary_line 第 2 段應與主場域相同');
      if (parts[3] !== f.name) warn('summary_line 第 4 段通常與 name 相同');
    }

    if (!Array.isArray(f.structure_tags) || !f.structure_tags.length) err('structure_tags 至少要有 1 個');
    for (const tag of f.structure_tags ?? []) if (!ctx.tags.has(tag)) err(`結構標籤「${tag}」不在 docs/structure-tags.md 詞表內`);
    for (const l of f.links ?? []) if (!ids.has(l)) err(`links 指向不存在的卡片：${l}`); else if (l === f.id) err('不可連結自己');
    for (const r of f.routes ?? []) if (!ctx.routes.has(r)) err(`routes 指向不存在的路線：${r}`);
    for (const fw of f.frameworks ?? []) if (!ctx.frameworks.has(fw)) err(`frameworks 指向不存在的框架：${fw}`);

    // ---- 中西對照：指向另一條軌道的卡；找不到就寫「無適當對照：原因」----
    const cp = f.counterparts;
    if (cp === undefined) { if (!f.summary_card) warn('缺少 counterparts（中西對照）；沒有合適對照請寫「無適當對照：原因」'); }
    else if (typeof cp === 'string') { if (!cp.startsWith('無適當對照')) err('counterparts 若不是清單，必須以「無適當對照」開頭'); }
    else if (!Array.isArray(cp)) err('counterparts 必須是清單或「無適當對照」字串');
    else cp.forEach((x: any, i: number) => {
      const w = `counterparts[${i}]`;
      const other = cards.find((y) => y.fm?.id === x?.id)?.fm;
      if (!other) { err(`${w} 指向不存在的卡片：${x?.id}`); return; }
      if (other.track === f.track) err(`${w}（${other.name}）與本卡在同一條軌道，對照要指向另一邊`);
      if (!x.note || String(x.note).length < 10) err(`${w} 需要一句說明「哪裡相似、哪裡不同」`);
      needRefs(x.src, w);
    });

    if (!VERIFICATION.includes(f.verification)) err(`verification 必須是 ${VERIFICATION.join('|')}`);
    if (f.verification === '交叉確認') {
      const hosts = new Set((f.sources ?? []).map((s: any) => { try { return new URL(s.url).hostname.replace(/^www\./, ''); } catch { return ''; } }));
      if (hosts.size < 2) err('標為「交叉確認」但來源少於 2 個不同網站');
    }
    if (!LENS_STATUS.includes(f.lens_status)) err(`lens_status 必須是「${LENS_STATUS.join('」或「')}」`);

    // ---- 段落 ----
    if (!(type in SECTIONS)) continue;
    const deepRequired = !f.summary_card;
    for (const def of SECTIONS[type]) {
      const sec = c.sections.find((s) => s.code === def.code);
      const filled = sec && sec.text.length > 0;
      if (!filled) {
        if (def.level === 'deep' && deepRequired) warn(`缺少深入欄位 ${def.code} ${def.title}`);
        continue;
      }
      const w = `${def.code} ${def.title}`;
      if (def.role === 'lens') {
        for (const k of LENS_KEYS) {
          const sub = sec!.sub?.[k];
          if (!sub || !sub.text) { err(`${w} 需要「### ${k}」小節（找不到就寫「無直接論述」）`); continue; }
          if (!sub.unknown) needRefs(sub.refs, `${w}／${k}`);
          else sub.refs.forEach((r) => usedRefs.add(r));
          if (PAGE_RE.test(sub.text)) warn(`${w}／${k} 出現章節或頁碼，請確認網路來源有明確寫出`);
        }
        const allNone = LENS_KEYS.every((k) => { const t = sec!.sub?.[k]?.text ?? ''; return t.startsWith('無直接論述') && refsOf(t).length === 0; });
        if (allNone && f.lens_status !== '無直接論述') warn('兩位作者都無直接論述，lens_status 應為「無直接論述」');
        if (!allNone && f.lens_status === '無直接論述') err('雙軌解讀有內容，lens_status 應為「依公開資料推論，未對照原書」');
        continue;
      }
      if (sec!.unknown) sec!.refs.forEach((r) => usedRefs.add(r));
      else needRefs(sec!.refs, w);
    }
    // ---- 第 6 期：學習模式欄位 ----
    if (f.importance !== undefined && ![1, 2, 3].includes(f.importance)) err('importance 必須是 1、2、3');
    if (f.learn !== undefined) {
      const L = f.learn ?? {};
      const w = (m: string) => err(`learn：${m}`);
      if (!Array.isArray(L.histories) || !L.histories.length) w('histories 至少 1 個（見 data/histories.yaml）');
      else for (const h of L.histories) if (!ctx.histories?.has(h)) w(`「${h}」不在 data/histories.yaml 的史名或 id 裡`);
      if (!L.why_care) w('缺 why_care（一句話告訴學生為什麼值得知道）');
      if (!L.story) w('缺 story（150–250 字故事版）');
      else {
        const n = String(L.story).replace(/\[s\d+\]/g, '').replace(/\s/g, '').length;
        if (n < 120 || n > 320) warn(`learn.story 約 ${n} 字，建議 150–250 字`);
        needRefs(refsOf(L.story), 'learn.story');
      }
      if (!Array.isArray(L.key_terms) || !L.key_terms.length) w('key_terms 至少 1 個');
      else L.key_terms.forEach((k: any, i: number) => { if (!k?.term || !k?.plain || !k?.example) w(`key_terms[${i}] 需要 term、plain、example`); });
      if (!Array.isArray(L.primary_source) || !L.primary_source.length) w('primary_source 至少 1 筆（短引原文或譯文）');
      else L.primary_source.forEach((p: any, i: number) => {
        if (!p?.text || !p?.from) w(`primary_source[${i}] 需要 text 與 from（書名＋篇章）`);
        if (String(p?.text ?? '').length > 160) warn(`learn.primary_source[${i}] 超過 160 字，只能引短句`);
        needRefs(p?.src ? [].concat(p.src) : [], `learn.primary_source[${i}]`);
      });
      if (!L.historiography) w('缺 historiography（史家怎麼吵，並列 2 種以上詮釋）');
      else needRefs(refsOf(L.historiography), 'learn.historiography');
      if (L.money_scale) needRefs(refsOf(L.money_scale), 'learn.money_scale');
      if (type === 'finance' && !L.hindsight) w('金融卡要有 hindsight（事後看很清楚的陷阱：後見之明、倖存者偏差）');
      (L.misconceptions ?? []).forEach((m: any, i: number) => { if (!refsOf(String(m)).length) warn(`learn.misconceptions[${i}] 沒有來源代號`); else needRefs(refsOf(String(m)), `learn.misconceptions[${i}]`); });
      for (const p of L.perspectives ?? []) {
        if (!p?.history || !p?.text) w('perspectives 每筆需要 history 與 text');
        else if (!ctx.histories?.has(p.history)) w(`perspectives 的「${p.history}」不在 data/histories.yaml`);
      }
      if (![1, 2, 3].includes(f.importance)) err('有 learn 區塊的卡要填 importance（1–3，背景軌只顯示 3）');
      const tiers = (f.sources ?? []).map((s: any) => s.tier);
      if (tiers.some((t: any) => t === undefined)) err('有 learn 區塊的卡，每筆來源都要標 tier（一手｜學術｜通論｜百科｜摘要）');
      if (!tiers.some((t: any) => t === '一手' || t === '學術')) err('進入學習模式的卡至少要有 1 筆 tier 為「一手」或「學術」的來源');
      const cc = f.crosscheck;
      if (!cc) warn('還沒有交叉查核紀錄（crosscheck），不會出現在學習模式');
      else {
        if (!['通過', '不通過'].includes(cc.result)) err('crosscheck.result 必須是「通過」或「不通過」');
        if (!cc.date || !cc.by) err('crosscheck 需要 date 與 by');
        if (cc.result === '不通過') warn('交叉查核不通過，不會出現在學習模式');
      }
      if (f.verification === 'AI草稿') err('AI草稿（單一來源）的卡不能進入學習模式');
    }
    for (const h of c.extraHeadings) warn(`段落「## ${h}」不在 ${TYPE_PREFIX[type]} 卡欄位規格內，不會顯示`);
    for (const s of srcIds) if (!usedRefs.has(s)) warn(`來源 ${s} 沒有被任何欄位引用`);
  }
  return issues;
}

export function loadContext(tagCats: { tags: { tag: string }[] }[], routes: any[], frameworks: any[], histories: Set<string> = new Set()) {
  return {
    histories,
    tags: new Set(tagCats.flatMap((c) => c.tags.map((t) => t.tag))),
    routes: new Set(routes.map((r) => r.id)),
    frameworks: new Set(frameworks.map((f) => f.id)),
  };
}

export const exists = (rel: string) => fs.existsSync(path.join(ROOT, rel));
