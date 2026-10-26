// 學習模式的卡片：故事 → 理解 → 深入 三層，學生自己決定讀多深
import { useEffect, useMemo, useState } from 'react';
import type { Card, History, Index } from '../types';
import { fmtRange, TYPE_COLOR, TYPE_ICON } from '../lib/format';
import { LearnText, SourceList, TermPop, type Term } from './LearnText';
import { tierOrder } from './util';

export type Depth = 'story' | 'understand' | 'deep';
// 國中讀到「理解」就夠；「深入」是史家爭論與完整段落，標成高中選讀
const DEPTHS: [Depth, string, string][] = [['story', '故事', '3 分鐘・國中'], ['understand', '理解', '10 分鐘・國中'], ['deep', '深入', '高中選讀']];
const textLen = (t?: string) => (t ?? '').replace(/\[s\d+\]|\*\*/g, '').length;

interface Props {
  card: Card; index: Index; history: History | null; depth?: Depth; onDepth?: (d: Depth) => void;
  onOpen: (id: string) => void; onHistory?: (id: string) => void; compact?: boolean;
}

export function LearnCard({ card: c, index, history, depth: depth0 = 'story', onDepth, onOpen, onHistory, compact }: Props) {
  const [depth, setDepth] = useState<Depth>(depth0);
  useEffect(() => setDepth(depth0), [depth0, c.id]);
  const [term, setTerm] = useState<Term | null>(null);
  const L = c.learn!;
  // 從哪個史看：預設是目前選的史（如果這張卡屬於它）
  const views = L.histories.map((id) => index.histories.find((h) => h.id === id)).filter((h): h is History => !!h && !h.all && !h.theme);
  const [view, setView] = useState<string | null>(null);
  const viewId = view ?? (history && L.histories.includes(history.id) && !history.all ? history.id : null);
  const persp = (L.perspectives ?? []).find((p) => p.history === viewId || index.histories.find((h) => h.id === viewId)?.name === p.history);
  const tagTerms: Term[] = useMemo(() => index.tagCategories.flatMap((cat) => cat.tags).filter((t) => c.structure_tags.includes(t.tag) && t.plain)
    .map((t) => ({ term: t.tag, plain: t.plain!, example: t.example! })), [index, c]);
  const terms = [...L.key_terms, ...tagTerms];
  const set = (d: Depth) => { setDepth(d); onDepth?.(d); };
  const sec = (code: string) => c.sections.find((s) => s.code === code);
  const today = c.sections.find((s) => s.role === 'today_hook');
  const nonAn = c.sections.find((s) => s.role === 'non_analogous');
  const lens = c.sections.find((s) => s.role === 'lens');
  const isFin = c.type === 'finance';
  // 「深入」層多出來的字數（給學生判斷要不要讀）
  const deepChars = useMemo(() => textLen(L.historiography) + textLen(L.exaggerated)
    + c.sections.filter((x) => x.text && !L.understand.includes(x.code) && x.role !== 'lens' && x.role !== 'today_hook' && x.role !== 'non_analogous').reduce((n, x) => n + textLen(x.text), 0), [c, L]);
  const T = (t: string) => <LearnText text={t} sources={c.sources} terms={terms} onTerm={setTerm} />;

  return (
    <article className={`lcard ${compact ? 'compact' : ''}`}>
      <header className="lc-head" style={{ borderColor: TYPE_COLOR[c.type] }}>
        <span className="type-badge" style={{ background: TYPE_COLOR[c.type] }}><span aria-hidden>{TYPE_ICON[c.type]}</span> {c.typeLabel}</span>
        <h2>{c.name}</h2>
        <div className="lc-meta">{fmtRange(c.time.start, c.time.end)}{c.time.precision !== 'exact' && '（約略）'}・{L.track}
          {c.verification === '爭議' && <span className="badge dispute" title="不同來源說法不一，內文並列各方說法">有爭議</span>}
          {L.crosscheck?.result === '通過' ? <span className="badge ok" title={`${L.crosscheck.date} 由${L.crosscheck.by}查核`}>✓ 已交叉查核</span> : <span className="badge dispute">開發中：尚未查核</span>}
        </div>
        <p className="why">💡 {L.why_care}</p>
        {views.length > 1 && (
          <div className="persp-switch">也可以從
            {views.map((h) => <button key={h.id} className={`chip ${viewId === h.id ? 'on' : ''}`} onClick={() => { setView(h.id); onHistory?.(h.id); }}>{h.name}</button>)}
            的角度看</div>
        )}
        {persp && <p className="persp">從<b>{index.histories.find((h) => h.id === viewId)?.name}</b>看：{persp.text}</p>}
      </header>

      <div className="depth-tabs" role="tablist" aria-label="閱讀深度">
        {DEPTHS.map(([d, l, hint]) => (
          <button key={d} role="tab" aria-selected={depth === d} className={depth === d ? 'on' : ''} onClick={() => set(d)}>{l}<small>{hint}</small></button>
        ))}
      </div>

      {depth === 'deep' && (
        <p className="deep-note">🎓 <b>高中選讀</b>：這一層收錄完整段落和史家的爭論，約 {Math.max(1, Math.round(deepChars / 400))} 分鐘（{deepChars.toLocaleString()} 字）。國中生讀完「理解」就夠了；想挑戰再往下讀。</p>
      )}
      <section className="lc-sec story">{T(L.story)}</section>

      {depth !== 'story' && <>
        {L.primary_source.map((p, i) => (
          <figure key={i} className="primary">
            <blockquote>{p.text}</blockquote>
            <figcaption>— {p.from} <SourceList ids={[].concat(p.src as any)} sources={c.sources} /></figcaption>
          </figure>
        ))}
        {(depth === 'understand' ? L.understand : c.sections.filter((s) => s.text && s.role !== 'lens' && s.role !== 'today_hook' && s.role !== 'non_analogous').map((s) => s.code)).map((code) => {
          const s = sec(code);
          return s?.text ? <section key={code} className="lc-sec"><h3>{s.title}</h3>{T(s.text)}</section> : null;
        })}
        {L.money_scale && <section className="lc-sec money"><h3>💰 換算成工作天</h3>{T(L.money_scale)}</section>}
      </>}

      {depth === 'deep' && <>
        <section className="lc-sec debate"><h3>⚖ 史家怎麼吵</h3>{T(L.historiography)}</section>
        {L.exaggerated && <section className="lc-sec warn"><h3>⚠ 這個故事可能被誇大了</h3>{T(L.exaggerated)}</section>}
        {lens?.sub && (
          <details className="lc-sec thinkers">
            <summary>選讀：思想家怎麼看（李彔、哈拉瑞）</summary>
            <p className="muted small">他們不是歷史學家，以下依公開演講與書摘整理，未對照原書。</p>
            {['李彔', '哈拉瑞'].map((k) => <div key={k}><h4>{k}</h4>{T(lens.sub![k]?.text ?? '')}</div>)}
          </details>
        )}
      </>}

      {isFin && L.hindsight && <section className="lc-sec warn"><h3>🔍 事後看很清楚的陷阱</h3>{T(L.hindsight)}<p className="muted small">本站內容是歷史學習，不構成投資建議。</p></section>}

      {(today?.text || nonAn?.text) && (
        <section className="lc-sec today-pair">
          <h3>今天有點像嗎？</h3>
          <div className="pair">
            <div><h4>像的地方</h4>{today?.text ? T(today.text) : <p className="muted">（未填）</p>}</div>
            <div className="not"><h4>不能直接類比的地方</h4>{nonAn?.text ? T(nonAn.text) : <p className="muted">（未填）</p>}</div>
          </div>
          <details><summary>想一想：這個類比哪裡不成立？</summary><p className="muted">先自己想，再對照右邊「不能直接類比的地方」。類比可以幫我們提問，但不能拿來預測。</p></details>
        </section>
      )}

      {(L.misconceptions ?? []).length > 0 && (
        <section className="lc-sec"><h3>常見誤解</h3>{(L.misconceptions ?? []).map((m, i) => <div key={i}>{T(m)}</div>)}</section>
      )}

      <section className="lc-sec">
        <h3>名詞小抄</h3>
        <dl className="glossary">{terms.map((t) => <div key={t.term}><dt>{t.term}</dt><dd>{t.plain}<br /><span className="muted">例：{t.example}</span></dd></div>)}</dl>
      </section>

      <section className="lc-sec">
        <h3>延伸</h3>
        <div className="chips">
          {[...c.links, ...c.backlinks, ...c.counterparts.map((x) => x.id)].filter((id, i, a) => a.indexOf(id) === i)
            .map((id) => index.cards.find((x) => x.id === id)).filter((x): x is Card => !!x?.learn)
            .map((x) => <button key={x.id} className="chip" onClick={() => onOpen(x.id)}>{TYPE_ICON[x.type]} {x.name}</button>)}
        </div>
      </section>

      <details className="lc-sec">
        <summary>全部來源（{c.sources.length}）：先列中文，標示來源分級</summary>
        <SourceList ids={[...c.sources].sort(tierOrder).map((s) => s.id)} sources={c.sources} />
        <p className="muted small">分級：一手＝當時的人留下的；學術＝學者研究；通論＝可靠機構的介紹；百科；摘要＝書摘或講稿整理。</p>
      </details>
      <TermPop term={term} onClose={() => setTerm(null)} />
    </article>
  );
}
