// 學習模式的卡片：只有一個詳細版（故事、史料、完整段落、史家爭論一次讀完；2026-11-07 起不再分國中／高中）
import { useMemo, useState } from 'react';
import type { Card, History, Index } from '../types';
import { fmtRange, TYPE_COLOR, TYPE_ICON } from '../lib/format';
import { LearnText, SourceList, TermPop, type Term } from './LearnText';
import { tierOrder } from './util';
import { TopicChips } from '../components/Topics';
import { CauseList, PathNav } from '../components/Story';
import { PersonBlock } from '../components/Person';
import { CardImages } from '../components/Images';
import { PopCulture } from '../components/PopCulture';
import { directLens } from '../lib/lens';

const learnOk = (x: Card) => !!x.learn;
const researchHref = (id: string) => `${location.pathname}?mode=research&card=${encodeURIComponent(id)}`;

interface Props {
  card: Card; index: Index; history: History | null;
  onOpen: (id: string) => void; onHistory?: (id: string) => void; compact?: boolean;
  onTopic?: (name: string) => void; topicCount?: (t: { cards: string[] }) => number;
  /** 這張卡在哪些單元／故事線（上一站、下一站）；hereUnit＝正在讀的單元，不重複列 */
  onStory?: (id: string) => void; onUnit?: (id: string) => void; hereUnit?: string; onDive?: (id: string) => void;
}

export function LearnCard({ card: c, index, history, onOpen, onHistory, compact, onTopic, topicCount, onStory, onUnit, hereUnit, onDive }: Props) {
  const [term, setTerm] = useState<Term | null>(null);
  const L = c.learn!;
  // 從哪個史看：預設是目前選的史（如果這張卡屬於它）
  const views = L.histories.map((id) => index.histories.find((h) => h.id === id)).filter((h): h is History => !!h && !h.all && !h.theme);
  const [view, setView] = useState<string | null>(null);
  const viewId = view ?? (history && L.histories.includes(history.id) && !history.all ? history.id : null);
  const persp = (L.perspectives ?? []).find((p) => p.history === viewId || index.histories.find((h) => h.id === viewId)?.name === p.history);
  const tagTerms: Term[] = useMemo(() => index.tagCategories.flatMap((cat) => cat.tags).filter((t) => c.structure_tags.includes(t.tag) && t.plain)
    .map((t) => ({ term: t.tag, plain: t.plain!, example: t.example! })), [index, c]);
  // 名詞小抄：結構標籤的白話解釋和卡片自己的名詞重複時（例如「主權違約」），只留卡片的
  const terms = [...L.key_terms, ...tagTerms.filter((t) => !L.key_terms.some((k) => k.term === t.term))];
  const sec = (code: string) => c.sections.find((s) => s.code === code);
  const today = c.sections.find((s) => s.role === 'today_hook');
  const nonAn = c.sections.find((s) => s.role === 'non_analogous');
  const lens = c.sections.find((s) => s.role === 'lens');
  const isFin = c.type === 'finance';
  // 李彔、哈拉瑞：只留他們直接談到的；兩人都沒談就整塊不出現
  const thinkers = directLens(lens);
  const causal = new Set([...(c.causes ?? []), ...(c.effects ?? [])].map((x) => x.id).filter(Boolean) as string[]);
  const ext = [...c.links, ...c.backlinks, ...c.counterparts.map((x) => x.id)].filter((id, i, a) => a.indexOf(id) === i && !causal.has(id))
    .map((id) => index.cards.find((x) => x.id === id)).filter((x): x is Card => !!x?.learn);
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
        <p className="why">💡 {L.why_care.replace(/\[s\d+\]/g, '')}</p>
        {onTopic && <TopicChips card={c} index={index} onTopic={onTopic} count={topicCount} />}
        {views.length > 1 && (
          <div className="persp-switch">也可以從
            {views.map((h) => <button key={h.id} className={`chip ${viewId === h.id ? 'on' : ''}`} onClick={() => { setView(h.id); onHistory?.(h.id); }}>{h.name}</button>)}
            的角度看</div>
        )}
        {persp && <p className="persp">從<b>{index.histories.find((h) => h.id === viewId)?.name}</b>看：{persp.text}</p>}
      </header>
      <CardImages images={c.images} compact={compact} />

      {onStory && <PathNav card={c} index={index} onOpen={onOpen} canOpen={learnOk} researchHref={researchHref} onUnit={onUnit} onStory={onStory} hereUnit={hereUnit} onDive={onDive} />}

      <CauseList card={c} side="causes" index={index} onOpen={onOpen} canOpen={learnOk} researchHref={researchHref} compact={compact} />
      <section className="lc-sec story">{T(L.story)}</section>
      {c.type === 'person' && <PersonBlock card={c} index={index} onOpen={onOpen} canOpen={learnOk} researchHref={researchHref} compact={compact} />}

      <>
        {L.primary_source.map((p, i) => (
          <figure key={i} className="primary">
            <blockquote>{p.text}</blockquote>
            <figcaption>— {p.from} <SourceList ids={[].concat(p.src as any)} sources={c.sources} /></figcaption>
          </figure>
        ))}
        {(c.sections.filter((s) => s.text && s.role !== 'lens' && s.role !== 'today_hook' && s.role !== 'non_analogous').map((s) => s.code)).map((code) => {
          const s = sec(code);
          return s?.text ? <section key={code} className="lc-sec"><h3>{s.title}</h3>{T(s.text)}</section> : null;
        })}
        {L.money_scale && <section className="lc-sec money"><h3>💰 換算成工作天</h3>{T(L.money_scale)}</section>}
        <section className="lc-sec debate"><h3>⚖ 史家怎麼吵</h3>{T(L.historiography)}</section>
        {L.exaggerated && <section className="lc-sec warn"><h3>⚠ 這個故事可能被誇大了</h3>{T(L.exaggerated)}</section>}
        {thinkers.length > 0 && (
          <details className="lc-sec thinkers">
            <summary>選讀：思想家怎麼看（{thinkers.map(([k]) => k).join('、')}）</summary>
            <p className="muted small">他們不是歷史學家，以下只收他們直接談到的話，依公開演講與書摘整理，未對照原書。</p>
            {thinkers.map(([k, t]) => <div key={k}><h4>{k}</h4>{T(t)}</div>)}
          </details>
        )}
      </>

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

      <PopCulture card={c} render={T} />
      {(L.misconceptions ?? []).length > 0 && (
        <section className="lc-sec"><h3>常見誤解</h3>{(L.misconceptions ?? []).map((m, i) => <div key={i}>{T(m)}</div>)}</section>
      )}

      <section className="lc-sec">
        <h3>名詞小抄</h3>
        <dl className="glossary">{terms.map((t) => <div key={t.term}><dt>{t.term}</dt><dd>{t.plain}<br /><span className="muted">例：{t.example}</span></dd></div>)}</dl>
      </section>

      <CauseList card={c} side="effects" index={index} onOpen={onOpen} canOpen={learnOk} researchHref={researchHref} compact={compact} />

      {ext.length > 0 && (
        <section className="lc-sec">
          <h3>延伸<small className="muted">（相關，但不一定是因果）</small></h3>
          <div className="chips">
            {ext.map((x) => <button key={x.id} className="chip" onClick={() => onOpen(x.id)}>{TYPE_ICON[x.type]} {x.name}</button>)}
          </div>
        </section>
      )}

      <details className="lc-sec">
        <summary>全部來源（{c.sources.length}）：先列中文，標示來源分級</summary>
        <SourceList ids={[...c.sources].sort(tierOrder).map((s) => s.id)} sources={c.sources} />
        <p className="muted small">分級：一手＝當時的人留下的；學術＝學者研究；通論＝可靠機構的介紹；百科；摘要＝書摘或講稿整理。</p>
      </details>
      <TermPop term={term} onClose={() => setTerm(null)} />
    </article>
  );
}
