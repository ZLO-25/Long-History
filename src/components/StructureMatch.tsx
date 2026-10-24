// 結構對照檢索：勾選結構條件 → 依符合條件數排序 → 產出可匯出 Markdown 的對照工作頁
import { useEffect, useMemo, useState } from 'react';
import type { Card, Index } from '../types';
import { fmtRange, TYPE_COLOR } from '../lib/format';
import { Markdown, linkRefs } from '../lib/markdown';

const TECH_TAGS = ['技術代差', '默會知識外流', '標準化量產', '基礎建設網絡'];
// 優先順序：同場域 > 同咽喉或物資 > 同聯盟模式 > 同技術階段 > 其他
const weightOf = (cat: string, tag: string) =>
  cat === '場域' ? 8 : cat === '地理咽喉' ? 4 : cat === '物資與技術' ? (TECH_TAGS.includes(tag) ? 1.5 : 4) : cat === '聯盟模式' ? 2 : 1;

const CHECKS = ['地理咽喉同類？', '物資瓶頸同類？', '聯盟結構同類？', '金融條件同類？', '敘事戰同類？', '時間節奏同類？'];
const STORE = 'history-river:worksheet';

interface Sheet {
  situation: string; picked: string[]; checks: Record<string, boolean>;
  cols: Record<string, { same: string; diff: string; unknown: string }>; decisive: string;
}
const empty: Sheet = { situation: '', picked: [], checks: {}, cols: {}, decisive: '' };

interface Props { index: Index; initialTags?: string[]; onOpen: (id: string) => void; onPlace: (key: string) => void }

export function StructureMatch({ index, initialTags, onOpen, onPlace }: Props) {
  const [fields, setFields] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>(initialTags ?? []);
  const [keyword, setKeyword] = useState('');
  const [sheet, setSheet] = useState<Sheet>(() => {
    try { return { ...empty, ...JSON.parse(localStorage.getItem(STORE) ?? '{}') }; } catch { return empty; }
  });
  useEffect(() => { if (initialTags) setTags(initialTags); }, [initialTags?.join()]);
  useEffect(() => { try { localStorage.setItem(STORE, JSON.stringify(sheet)); } catch { /* 無痕模式 */ } }, [sheet]);

  const catOf = useMemo(() => {
    const m = new Map<string, string>();
    for (const c of index.tagCategories) for (const t of c.tags) m.set(t.tag, c.name);
    return m;
  }, [index]);
  const anyCond = fields.length + tags.length > 0 || keyword.trim().length > 0;

  const ranked = useMemo(() => {
    if (!anyCond) return [];
    const kw = keyword.trim();
    return index.cards.map((c) => {
      const mf = fields.filter((f) => c.place.primary_field === f || c.place.secondary_fields.includes(f));
      const mt = tags.filter((t) => c.structure_tags.includes(t));
      const mk = kw && JSON.stringify([c.name, c.aliases, c.sections.map((s) => s.text)]).includes(kw) ? 1 : 0;
      const count = mf.length + mt.length + mk;
      const weight = mf.reduce((s, f) => s + (c.place.primary_field === f ? 8 : 6), 0)
        + mt.reduce((s, t) => s + weightOf(catOf.get(t) ?? '', t), 0) + mk;
      return { c, mf, mt, mk, count, weight };
    }).filter((r) => r.count > 0)
      .sort((a, b) => b.count - a.count || b.weight - a.weight || b.c.completeness - a.c.completeness);
  }, [index, fields, tags, keyword, anyCond, catOf]);

  // 預設勾選前 3 張（2–4 張）
  useEffect(() => {
    if (!ranked.length) return;
    setSheet((s) => {
      const still = s.picked.filter((id) => ranked.some((r) => r.c.id === id));
      return still.length >= 2 ? { ...s, picked: still } : { ...s, picked: ranked.slice(0, 3).map((r) => r.c.id) };
    });
  }, [ranked.map((r) => r.c.id).join()]);

  const picked = ranked.filter((r) => sheet.picked.includes(r.c.id)).slice(0, 4);
  const triggered = index.frameworks.filter((f) => f.trigger_tags.some((t) => tags.includes(t)) || picked.some((r) => r.c.frameworks.includes(f.id)));
  const toggle = <T,>(arr: T[], v: T) => (arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);
  const setCol = (id: string, k: 'same' | 'diff' | 'unknown', v: string) =>
    setSheet((s) => ({ ...s, cols: { ...s.cols, [id]: { ...(s.cols[id] ?? { same: '', diff: '', unknown: '' }), [k]: v } } }));

  const exportMd = () => {
    if (!sheet.decisive.trim()) { alert('請先填寫「這次不同的決定性差異是什麼？」（必填）'); return; }
    const md = toMarkdown(sheet, picked.map((r) => r.c), { fields, tags, keyword }, triggered, ranked);
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `對照工作頁-${new Date().toISOString().slice(0, 10)}.md`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <div className="match">
      <h2>結構對照檢索</h2>
      <p className="muted small">不需打字：勾選你在新聞或現象中看到的結構條件，系統依「符合條件數」排序歷史卡片（同分時：同場域 &gt; 同咽喉或物資 &gt; 同聯盟模式 &gt; 同技術階段）。</p>

      <fieldset className="conds">
        <legend>場域</legend>
        {index.fieldOptions.map((f) => <button key={f} className={`chip ${fields.includes(f) ? 'on' : ''}`} onClick={() => setFields(toggle(fields, f))}>{f}</button>)}
      </fieldset>
      {index.tagCategories.map((cat) => (
        <fieldset key={cat.name} className="conds">
          <legend>{cat.name}</legend>
          {cat.tags.map((t) => (
            <button key={t.tag} title={t.def} className={`chip ${tags.includes(t.tag) ? 'on' : ''}`} onClick={() => setTags(toggle(tags, t.tag))}>{t.tag}</button>
          ))}
        </fieldset>
      ))}
      <label className="kw">關鍵字（選填）<input value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="例如：糧食、海峽" /></label>
      {anyCond && <button className="btn sm" onClick={() => { setFields([]); setTags([]); setKeyword(''); }}>清除條件</button>}

      {anyCond && (
        <>
          <h3>符合的歷史卡片（{ranked.length}）</h3>
          {ranked.length === 0 && <p>沒有卡片符合。可以減少條件或換一個標籤。</p>}
          {ranked.map((r) => (
            <div key={r.c.id} className={`mrow ${sheet.picked.includes(r.c.id) ? 'picked' : ''}`}>
              <input type="checkbox" checked={sheet.picked.includes(r.c.id)} aria-label="放入工作頁"
                onChange={() => setSheet((s) => ({ ...s, picked: toggle(s.picked, r.c.id).slice(-4) }))} />
              <button className="link" onClick={() => onOpen(r.c.id)} style={{ color: TYPE_COLOR[r.c.type] }}>{r.c.name}</button>
              <span className="muted small">{fmtRange(r.c.time.start, r.c.time.end)}</span>
              <span className="score">符合 {r.count} 項</span>
              <span className="small">{[...r.mf, ...r.mt, ...(r.mk ? [`關鍵字「${keyword}」`] : [])].join('、')}</span>
            </div>
          ))}
        </>
      )}

      {picked.length > 0 && (
        <div className="worksheet">
          <h2>對照工作頁</h2>
          <label className="ws-block"><b>1. 我的現況一句話</b>
            <input value={sheet.situation} onChange={(e) => setSheet({ ...sheet, situation: e.target.value })} placeholder="例如：某海峽航運受阻，進口糧價上漲" />
          </label>

          <div className="ws-block"><b>2. 系統找到的歷史相似結構（{picked.length} 張）</b>
            <div className="table-scroll">
              <table className="ws-table">
                <thead><tr><th>名稱</th><th>時代</th><th>場域與地點</th><th>符合的標籤</th><th>地圖</th></tr></thead>
                <tbody>{picked.map((r) => (
                  <tr key={r.c.id}>
                    <td><button className="link" onClick={() => onOpen(r.c.id)}>{r.c.name}</button></td>
                    <td>{fmtRange(r.c.time.start, r.c.time.end)}</td>
                    <td>{r.c.place.primary_field}｜{r.c.place.locations.map((l) => l.name_ancient).join('、')}</td>
                    <td>{[...r.mf, ...r.mt].join('、') || '—'}</td>
                    <td><button className="btn sm" onClick={() => onPlace(r.c.place.locations[0].key)}>定位</button></td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </div>

          <div className="ws-block"><b>3. 三欄對照表</b>
            {picked.map((r) => {
              const v = sheet.cols[r.c.id] ?? { same: '', diff: '', unknown: '' };
              return (
                <div key={r.c.id} className="three">
                  <h4>{r.c.name}</h4>
                  <div className="three-cols">
                    <label>相似<textarea value={v.same} onChange={(e) => setCol(r.c.id, 'same', e.target.value)} /></label>
                    <label>相異<textarea value={v.diff} onChange={(e) => setCol(r.c.id, 'diff', e.target.value)} /></label>
                    <label>未知（我還不確定的）<textarea value={v.unknown} onChange={(e) => setCol(r.c.id, 'unknown', e.target.value)} /></label>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="ws-block"><b>4. 檢核表</b>
            <div className="checks">{CHECKS.map((q) => (
              <label key={q}><input type="checkbox" checked={!!sheet.checks[q]} onChange={() => setSheet({ ...sheet, checks: { ...sheet.checks, [q]: !sheet.checks[q] } })} />{q}</label>
            ))}</div>
          </div>

          <div className="ws-block"><b>5. 卡片內的今日對照鉤子與不可類比的差異</b>
            {picked.map((r) => (
              <div key={r.c.id} className="hooks">
                <h4>{r.c.name}</h4>
                <div className="hook"><span className="muted">今日對照鉤子</span><Markdown text={r.c.today_hook || '（未填）'} sources={r.c.sources} /></div>
                <div className="hook"><span className="muted">不可類比的差異</span><Markdown text={r.c.non_analogous || '（未填）'} sources={r.c.sources} /></div>
              </div>
            ))}
          </div>

          <div className="ws-block"><b>6. 固定提醒</b>
            <label className="required">這次不同的決定性差異是什麼？（必填）
              <textarea value={sheet.decisive} onChange={(e) => setSheet({ ...sheet, decisive: e.target.value })} />
            </label>
            {triggered.map((f) => (
              <div key={f.id} className="framework">
                <p><b>你選到的框架：{f.name}</b></p>
                <Markdown text={f.summary} sources={f.sources} />
                <ul>{f.critiques.map((c, i) => <li key={i}><Markdown text={c.text} sources={f.sources} /></li>)}</ul>
              </div>
            ))}
            <p className="disclaimer">本頁只是思考框架，不構成預測或投資建議。</p>
          </div>
          <button className="btn primary" onClick={exportMd}>匯出 Markdown</button>
          <button className="btn sm" onClick={() => setSheet({ ...empty, picked: sheet.picked })}>清空填寫內容</button>
        </div>
      )}
    </div>
  );
}

function toMarkdown(s: Sheet, cards: Card[], cond: { fields: string[]; tags: string[]; keyword: string }, fws: Index['frameworks'], ranked: { c: Card; mf: string[]; mt: string[] }[]) {
  const L: string[] = [];
  const today = new Date().toISOString().slice(0, 10);
  L.push(`# 對照工作頁（${today}）`, '');
  L.push(`> 本頁只是思考框架，不構成預測或投資建議。`, '');
  L.push('## 1. 我的現況一句話', '', s.situation || '（未填）', '');
  L.push(`**勾選條件**：場域［${cond.fields.join('、') || '—'}］；結構標籤［${cond.tags.join('、') || '—'}］${cond.keyword ? `；關鍵字「${cond.keyword}」` : ''}`, '');
  L.push('## 2. 歷史相似結構', '', '| 名稱 | 時代 | 場域與地點 | 符合的標籤 | 卡片 | 地圖位置 |', '|---|---|---|---|---|---|');
  for (const c of cards) {
    const r = ranked.find((x) => x.c.id === c.id)!;
    const loc = c.place.locations[0];
    L.push(`| ${c.name} | ${fmtRange(c.time.start, c.time.end)} | ${c.place.primary_field}｜${c.place.locations.map((l) => l.name_ancient).join('、')} | ${[...r.mf, ...r.mt].join('、')} | [[${c.id}]] | ${loc.lat.toFixed(2)}, ${loc.lng.toFixed(2)} |`);
  }
  L.push('', '## 3. 三欄對照表', '');
  for (const c of cards) {
    const v = s.cols[c.id] ?? { same: '', diff: '', unknown: '' };
    const cell = (t: string) => (t || '').replace(/\n/g, '<br>').replace(/\|/g, '\\|') || ' ';
    L.push(`### ${c.name}`, '', '| 相似 | 相異 | 未知（我還不確定的） |', '|---|---|---|', `| ${cell(v.same)} | ${cell(v.diff)} | ${cell(v.unknown)} |`, '');
  }
  L.push('## 4. 檢核表', '');
  for (const q of CHECKS) L.push(`- [${s.checks[q] ? 'x' : ' '}] ${q}`);
  L.push('', '## 5. 今日對照鉤子與不可類比的差異', '');
  for (const c of cards) {
    L.push(`### ${c.name}`, '', `**今日對照鉤子**：${linkRefs(c.today_hook || '（未填）', c.sources)}`, '', `**不可類比的差異**：${linkRefs(c.non_analogous || '（未填）', c.sources)}`, '');
  }
  L.push('## 6. 固定提醒', '', `**這次不同的決定性差異是什麼？**`, '', s.decisive, '');
  for (const f of fws) {
    L.push(`### 框架提醒：${f.name}`, '', linkRefs(f.summary, f.sources), '', '主要批評：');
    for (const c of f.critiques) L.push(`- ${linkRefs(c.text, f.sources)}`);
    L.push('');
  }
  L.push('---', '本頁只是思考框架，不構成預測或投資建議。');
  return L.join('\n');
}
