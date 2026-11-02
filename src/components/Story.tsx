// 把卡片串成故事：
// 1. PathNav：這張卡在哪些學習單元、故事線裡，第幾站，上一站／下一站（方案 C）
// 2. CauseList：「從哪裡來」（前因）與「往哪裡去」（後果），每條都說明怎麼造成、附來源（方案 A，docs/causes.md）
// 3. StorylineView／StorylineIndex：沿著因果箭頭走的跨時代故事線（方案 B，data/storylines.yaml）
// 研究模式與學習模式共用。
import type { Card, CauseLink, CauseRel, CauseSource, Index, Storyline } from '../types';
import { fmtRange, TYPE_COLOR, TYPE_ICON } from '../lib/format';
import './story.css';

export const REL_HELP: Record<CauseRel, string> = {
  直接引發: '直接點燃了下一件事，時間緊接著',
  促成: '是原因之一，但不是唯一的原因',
  背景: '提供了條件，讓下一件事有可能發生，但不直接推動',
  回應: '下一件事是對前一件事的反應、對策或反彈',
};
const REL_CLASS: Record<CauseRel, string> = { 直接引發: 'r-trigger', 促成: 'r-push', 背景: 'r-bg', 回應: 'r-resp' };

interface OpenProps {
  index: Index;
  onOpen: (id: string) => void;
  /** 學習模式：只有學習卡能在這裡打開，其他卡改成連到研究模式 */
  canOpen?: (c: Card) => boolean;
  researchHref?: (id: string) => string;
}

const byIdOf = (index: Index) => {
  const m = (index as any).__byId as Map<string, Card> | undefined;
  if (m) return m;
  const map = new Map(index.cards.map((c) => [c.id, c]));
  Object.defineProperty(index, '__byId', { value: map, enumerable: false });
  return map;
};

/** 一張卡的名稱按鈕：能打開就打開，學習模式打不開的連到研究模式，沒有卡的灰字 */
function CardRef({ id, name, index, onOpen, canOpen, researchHref, year = true }: OpenProps & { id: string | null; name?: string; year?: boolean }) {
  const c = id ? byIdOf(index).get(id) : undefined;
  if (!c) return <span className="cr-none" title="資料庫還沒有這張卡">{name || id}<small>（尚無卡片）</small></span>;
  const label = <><span aria-hidden>{TYPE_ICON[c.type]}</span> {c.name}{year && <small className="cr-year">{fmtRange(c.time.start, c.time.end)}</small>}</>;
  if (canOpen && !canOpen(c)) {
    return researchHref ? <a className="cr-link off" href={researchHref(c.id)} title="這張卡還不在學習模式，到研究模式看">{label}<small>↗ 研究模式</small></a> : <span className="cr-link off">{label}</span>;
  }
  return <button className="cr-link" style={{ borderColor: TYPE_COLOR[c.type] }} onClick={() => onOpen(c.id)}>{label}</button>;
}

function Sources({ list }: { list: CauseSource[] }) {
  if (!list.length) return null;
  return <span className="ce-src">{list.map((s, i) => <a key={i} href={s.url} target="_blank" rel="noreferrer" title={s.title}>[{i + 1}]</a>)}</span>;
}

export function RelChip({ rel }: { rel: CauseRel }) {
  return <span className={`rel-chip ${REL_CLASS[rel] ?? ''}`} title={REL_HELP[rel]} aria-label={`${rel}：${REL_HELP[rel]}`}>{rel}</span>;
}

/** 從哪裡來／往哪裡去 */
export function CauseList({ card, side, index, onOpen, canOpen, researchHref, compact }: OpenProps & { card: Card; side: 'causes' | 'effects'; compact?: boolean }) {
  const list: CauseLink[] = (side === 'causes' ? card.causes : card.effects) ?? [];
  if (!list.length) return null;
  // 先列有卡片的、再列尚無卡片的；同類依時間
  const time = (x: CauseLink) => (x.id ? byIdOf(index).get(x.id)?.time.start ?? 9999 : 9999);
  const sorted = [...list].sort((a, b) => Number(!a.id) - Number(!b.id) || time(a) - time(b));
  const isCause = side === 'causes';
  return (
    <section className={`cause-list ${side} ${compact ? 'compact' : ''}`} aria-label={isCause ? '從哪裡來' : '往哪裡去'}>
      <h3>{isCause ? '← 從哪裡來' : '往哪裡去 →'}<small>{isCause ? '這些事造成了「' + card.name + '」' : '「' + card.name + '」接著造成了這些事'}</small></h3>
      <ul>
        {sorted.map((x, i) => (
          <li key={i}>
            <div className="ce-line">
              {isCause ? <><CardRef id={x.id} name={x.name} index={index} onOpen={onOpen} canOpen={canOpen} researchHref={researchHref} /><span className="ce-rel"><RelChip rel={x.rel} /><span className="ce-arrow" aria-hidden>→ 本卡</span></span></>
                : <><span className="ce-rel"><span className="ce-arrow" aria-hidden>本卡 →</span><RelChip rel={x.rel} /></span><CardRef id={x.id} name={x.name} index={index} onOpen={onOpen} canOpen={canOpen} researchHref={researchHref} /></>}
              {x.disputed && <span className="badge dispute" title="史家對這個因果看法不一">史家看法不一</span>}
            </div>
            <p className="ce-why">{x.why}<Sources list={x.sources} /></p>
          </li>
        ))}
      </ul>
      <details className="ce-help small"><summary>四種關係是什麼意思？</summary>
        <ul>{(Object.keys(REL_HELP) as CauseRel[]).map((r) => <li key={r}><RelChip rel={r} /> {REL_HELP[r]}</li>)}</ul>
        <p className="muted">由強到弱：直接引發 ＞ 促成 ＞ 背景；「回應」是對前一件事的反應。一件大事通常不只一個原因，這裡只列最重要的幾個。</p>
      </details>
    </section>
  );
}

// ---- 這張卡在哪些故事裡 ----
export interface PathHit { kind: 'unit' | 'story'; id: string; title: string; pos: number; total: number; prev?: string; next?: string }

export function pathsOf(index: Index, cardId: string): PathHit[] {
  const out: PathHit[] = [];
  for (const u of index.units ?? []) {
    const ids = u.steps.filter((s) => s.type === 'card').map((s) => (s as { id: string }).id).filter((id, i, a) => a.indexOf(id) === i);
    const i = ids.indexOf(cardId);
    if (i >= 0) out.push({ kind: 'unit', id: u.id, title: u.title, pos: i + 1, total: ids.length, prev: ids[i - 1], next: ids[i + 1] });
  }
  for (const s of index.storylines ?? []) {
    const ids = s.stops.map((x) => x.id);
    const i = ids.indexOf(cardId);
    if (i >= 0) out.push({ kind: 'story', id: s.id, title: s.title, pos: i + 1, total: ids.length, prev: ids[i - 1], next: ids[i + 1] });
  }
  return out;
}

interface PathNavProps extends OpenProps {
  card: Card;
  onUnit?: (id: string) => void; unitHref?: (id: string) => string;
  onStory: (id: string) => void;
  /** 正在這個單元裡讀，就不再列它 */
  hereUnit?: string;
}

export function PathNav({ card, index, onOpen, canOpen, researchHref, onUnit, unitHref, onStory, hereUnit }: PathNavProps) {
  const hits = pathsOf(index, card.id).filter((h) => !(h.kind === 'unit' && h.id === hereUnit));
  if (!hits.length) return null;
  const step = (id: string | undefined, dir: 'prev' | 'next') => {
    if (!id) return <span className={`pn-step ${dir} none`}>{dir === 'prev' ? '這是第一站' : '這是最後一站'}</span>;
    const c = byIdOf(index).get(id);
    if (!c) return null;
    const label = dir === 'prev' ? <>◀ 上一站：{c.name}</> : <>下一站：{c.name} ▶</>;
    if (canOpen && !canOpen(c)) return researchHref ? <a className={`pn-step ${dir}`} href={researchHref(id)}>{label}</a> : null;
    return <button className={`pn-step ${dir}`} onClick={() => onOpen(id)}>{label}</button>;
  };
  // 學習單元和故事線的上一站／下一站常常一樣：一樣的只畫一組按鈕，手機上才不會又高又重複
  const groups: { key: string; hits: PathHit[] }[] = [];
  for (const h of hits) {
    const key = `${h.prev ?? ''}|${h.next ?? ''}`;
    const g = groups.find((x) => x.key === key);
    if (g) g.hits.push(h); else groups.push({ key, hits: [h] });
  }
  return (
    <nav className="path-nav" aria-label="這張卡在哪些故事裡">
      <div className="pn-label">這張卡在這些故事裡</div>
      {groups.map((g) => (
        <div key={g.key} className="pn-group">
          {g.hits.map((h) => (
            <div key={h.kind + h.id} className={`pn-row ${h.kind}`}>
              <span className="pn-kind">{h.kind === 'unit' ? '學習單元' : '故事線'}</span>
              {h.kind === 'story' ? <button className="link pn-name" onClick={() => onStory(h.id)}>《{h.title}》</button>
                : onUnit ? <button className="link pn-name" onClick={() => onUnit(h.id)}>《{h.title}》</button>
                : unitHref ? <a className="link pn-name" href={unitHref(h.id)}>《{h.title}》</a> : <span className="pn-name">《{h.title}》</span>}
              <span className="pn-where">
                <span className="pn-dots" aria-hidden>
                  {Array.from({ length: h.total }, (_, i) => <i key={i} className={i + 1 === h.pos ? 'on' : i + 1 < h.pos ? 'past' : ''} />)}
                </span>
                <span className="pn-pos">第 {h.pos}／{h.total} 站</span>
              </span>
            </div>
          ))}
          <div className="pn-steps">{step(g.hits[0].prev, 'prev')}{step(g.hits[0].next, 'next')}</div>
        </div>
      ))}
    </nav>
  );
}

// ---- 故事線 ----
export function findStory(index: Index, id: string): Storyline | undefined {
  return (index.storylines ?? []).find((s) => s.id === id);
}

/** 地圖上要標的點：每站取第一個地點，編號＝站序 */
export function storyMarks(index: Index, id: string) {
  const s = findStory(index, id);
  if (!s) return [];
  const m = byIdOf(index);
  return s.stops.map((x, i) => ({ c: m.get(x.id), n: i + 1 })).filter((x): x is { c: Card; n: number } => !!x.c?.place.locations[0])
    .map(({ c, n }) => ({ key: c.place.locations[0].key, n, name: c.name }));
}

interface StoryViewProps extends OpenProps {
  id: string; currentId?: string | null; onAll: () => void; read?: (id: string) => boolean; onMap?: () => void;
}

export function StorylineView({ id, index, currentId, onOpen, onAll, canOpen, researchHref, read, onMap }: StoryViewProps) {
  const s = findStory(index, id);
  if (!s) return <div className="story-view"><p>找不到這條故事線。</p><button className="link" onClick={onAll}>看全部故事線</button></div>;
  const m = byIdOf(index);
  const first = m.get(s.stops[0].id), last = m.get(s.stops[s.stops.length - 1].id);
  return (
    <div className="story-view">
      <button className="link back" onClick={onAll}>← 全部故事線</button>
      <h2>{s.title}</h2>
      <p className="sv-q">❓ {s.question}</p>
      {s.blurb && <p className="sv-blurb">{s.blurb}</p>}
      <p className="muted small">{s.stops.length} 站{first && last && `・${fmtRange(first.time.start, last.time.end)}`}・每兩站之間的說明，就是兩張卡之間的前因／後果關係。{onMap && <button className="link" onClick={onMap}>在地圖上看</button>}</p>
      <ol className="sv-line">
        {s.stops.map((x, i) => {
          const c = m.get(x.id);
          if (!c) return null;
          return (
            <li key={x.id} className={`sv-stop ${currentId === x.id ? 'here' : ''} ${read?.(x.id) ? 'read' : ''}`}>
              <div className="sv-station">
                <span className="sv-dot" style={{ borderColor: TYPE_COLOR[c.type] }}>{i + 1}</span>
                <div className="sv-card">
                  <CardRef id={c.id} index={index} onOpen={onOpen} canOpen={canOpen} researchHref={researchHref} />
                  {c.learn?.why_care && <p className="sv-why muted small">{c.learn.why_care.replace(/\[s\d+\]/g, '')}</p>}
                </div>
              </div>
              {x.bridge && (
                <div className="sv-bridge">
                  <RelChip rel={x.bridge.rel} />
                  {x.bridge.disputed && <span className="badge dispute">史家看法不一</span>}
                  <span className="sv-bridge-text">{x.bridge.why}<Sources list={x.bridge.sources} /></span>
                </div>
              )}
            </li>
          );
        })}
      </ol>
      <p className="sv-note muted small">故事線只是看歷史的其中一條路：每一站通常還有別的原因和別的後果，打開卡片看「從哪裡來／往哪裡去」。</p>
    </div>
  );
}

export function StorylineIndex({ index, onStory, onTopics }: { index: Index; onStory: (id: string) => void; onTopics?: () => void }) {
  const m = byIdOf(index);
  return (
    <div className="story-index">
      <h2>故事線</h2>
      <p className="muted">沿著「前因 → 後果」的箭頭，把不同時代、不同地區的事件接成一條路。每一站之間都說明「怎麼造成的」。</p>
      {onTopics && <p className="small">想看同一種東西（例如 #交易所、#白銀）在各時代的樣子？<button className="link" onClick={onTopics}>看主題標籤</button></p>}
      <ul>
        {(index.storylines ?? []).map((s) => {
          const a = m.get(s.stops[0].id), b = m.get(s.stops[s.stops.length - 1].id);
          return (
            <li key={s.id}>
              <button className="si-item" onClick={() => onStory(s.id)}>
                <span className="si-title">{s.title}</span>
                <span className="si-q">{s.question}</span>
                <span className="si-meta muted small">{s.stops.length} 站{a && b && `・${fmtRange(a.time.start, b.time.end)}`}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
