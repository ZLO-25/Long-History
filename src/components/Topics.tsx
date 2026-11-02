// 主題標籤：卡片上的「#交易所」，點下去看同一個主題的所有卡片，依年代排成一條歷史路徑。
// 研究模式與學習模式共用。資料來自 data/topics.yaml（詞表）＋卡片的 topics 欄位。
import { useMemo, useState } from 'react';
import type { Card, Index, Topic, TopicLayer } from '../types';
import { fmtRange, TYPE_COLOR, TYPE_ICON } from '../lib/format';
import './topics.css';

/** 依名稱找主題與它所屬的層面 */
export function findTopic(index: Index, name: string): { topic: Topic; layer: TopicLayer } | null {
  for (const layer of index.topicLayers ?? []) {
    const topic = layer.topics.find((t) => t.name === name);
    if (topic) return { topic, layer };
  }
  return null;
}

/** 主題的卡片依年代排好後，在地圖上要標的點：每張卡取第一個地點，編號和清單一樣 */
export function topicMarks(index: Index, name: string, allowed?: (c: Card) => boolean) {
  const t = findTopic(index, name)?.topic;
  if (!t) return [];
  const byId = new Map(index.cards.map((c) => [c.id, c]));
  return t.cards.map((id, i) => ({ c: byId.get(id), n: i + 1 }))
    .filter((x): x is { c: Card; n: number } => !!x.c && !!x.c.place.locations[0] && (!allowed || allowed(x.c)))
    .map(({ c, n }) => ({ key: c.place.locations[0].key, n, name: c.name }));
}

/** 卡片上的主題標籤列 */
export function TopicChips({ card, index, onTopic, label = true, count }: { card: Card; index: Index; onTopic: (name: string) => void; label?: boolean; count?: (t: Topic) => number }) {
  if (!card.topics?.length) return null;
  return (
    <div className="topic-chips">
      {label && <span className="tc-label">主題標籤<small>（點了看歷史路徑）</small></span>}
      {card.topics.map((t) => {
        const ft = findTopic(index, t)?.topic;
        const n = ft ? (count ? count(ft) : ft.cards.length) : 0;
        return (
          <button key={t} className="chip topic" onClick={() => onTopic(t)} title={`看「${t}」的歷史路徑：共 ${n} 張卡，依年代排列`}>
            #{t}<small>{n}</small>
          </button>
        );
      })}
    </div>
  );
}

interface ViewProps {
  index: Index; name: string; currentId?: string | null;
  onOpen: (id: string) => void; onTopic: (name: string) => void; onAll: () => void;
  /** 學習模式：只有通過查核的學習卡能在這裡打開，其他卡改成「到研究模式看」 */
  canOpen?: (c: Card) => boolean; researchHref?: (id: string) => string;
  read?: (id: string) => boolean;
  /** 手機：地圖在另一個分頁，給一顆「在地圖上看」 */
  onMap?: () => void;
}

/** 某個主題的歷史路徑：白話定義、怎麼讀、依年代排的卡片 */
export function TopicView({ index, name, currentId, onOpen, onTopic, onAll, canOpen, researchHref, read, onMap }: ViewProps) {
  const found = findTopic(index, name);
  const byId = useMemo(() => new Map(index.cards.map((c) => [c.id, c])), [index]);
  if (!found) return <div className="topic-view"><p>找不到主題「{name}」。</p><button className="link" onClick={onAll}>看全部主題標籤</button></div>;
  const { topic: t, layer } = found;
  const list = t.cards.map((id) => byId.get(id)).filter((c): c is Card => !!c);
  const first = list[0], last = list[list.length - 1];
  const span = first && last ? fmtRange(first.time.start, Math.max(...list.map((c) => c.time.end))) : '';
  const readN = read ? list.filter((c) => read(c.id)).length : 0;
  const openable = canOpen ? list.filter(canOpen).length : list.length;
  return (
    <article className="topic-view">
      <div className="tv-crumb"><button className="link" onClick={onAll}>主題標籤</button> › {layer.icon} {layer.name}</div>
      <h2 className="tv-title">#{t.name}</h2>
      <p className="tv-plain">{t.plain}</p>
      <p className="tv-meta">{list.length} 張卡・{span}{read && <> ・你讀過 <b>{readN}</b>／{openable}</>}
        {onMap && <button className="btn sm tv-map" onClick={onMap}>🗺 在地圖上看</button>}</p>
      {t.path && (
        <section className="tv-path">
          <h3>這條路徑怎麼讀</h3>
          <p>{t.path}</p>
        </section>
      )}
      <h3 className="tv-h">依年代排列{canOpen && openable < list.length && <span className="muted small">（灰色的卡目前只在研究模式）</span>}</h3>
      <ol className="tv-list">
        {list.map((c, i) => {
          const ok = !canOpen || canOpen(c);
          const cur = c.id === currentId;
          const body = (
            <>
              <span className="tv-n" style={{ background: TYPE_COLOR[c.type] }}>{i + 1}</span>
              <span className="tv-yr">{fmtRange(c.time.start, c.time.end)}</span>
              <span className="tv-nm">{c.name}{cur && <em className="tv-cur">你剛剛看的</em>}{read?.(c.id) && <em className="tv-read">✓讀過</em>}</span>
              <span className="tv-sub"><span aria-hidden style={{ color: TYPE_COLOR[c.type] }}>{TYPE_ICON[c.type]}</span> {c.typeLabel}・{c.civilization.slice(0, 2).join('、')}</span>
            </>
          );
          return (
            <li key={c.id} className={`${cur ? 'cur' : ''} ${ok ? '' : 'off'}`}>
              {ok ? <button className="tv-item" onClick={() => onOpen(c.id)}>{body}</button>
                : <a className="tv-item" href={researchHref?.(c.id)} target="_blank" rel="noopener" title="這張卡還沒做成學習版，會在新分頁用研究模式打開">{body}<span className="tv-ext">研究模式 ↗</span></a>}
            </li>
          );
        })}
      </ol>
      {t.see.length > 0 && (
        <div className="tv-see"><span className="muted">也看看：</span>
          {t.see.map((s) => <button key={s} className="chip topic" onClick={() => onTopic(s)}>#{s}<small>{findTopic(index, s)?.topic.cards.length ?? 0}</small></button>)}
        </div>
      )}
      <p className="muted small tv-note">地圖上的編號就是清單的順序（每張卡標第一個地點）。主題標籤說的是「跟什麼東西有關」；卡片裡的「結構標籤」說的是「發生了什麼樣的模式」。</p>
    </article>
  );
}

/** 全部主題標籤：依層面分組，可以打字篩選 */
export function TopicIndex({ index, onTopic, count }: { index: Index; onTopic: (name: string) => void; count?: (t: Topic) => number }) {
  const [q, setQ] = useState('');
  const qq = q.trim();
  const layers = (index.topicLayers ?? []).map((l) => ({ ...l, topics: l.topics.filter((t) => !qq || t.name.includes(qq) || t.plain.includes(qq)) })).filter((l) => l.topics.length);
  return (
    <div className="topic-index">
      <h2>主題標籤</h2>
      <p className="muted">每個標籤把「跟同一件事物有關」的卡片，依年代串成一條歷史路徑。例如點 <button className="chip topic" onClick={() => onTopic('交易所')}>#交易所</button>，就能從中世紀的布魯日一路看到臺灣證券交易所。</p>
      <input className="ti-filter" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="找標籤，例：銀行、鐵路、殖民" aria-label="篩選主題標籤" />
      {layers.map((l) => (
        <section key={l.name} className="ti-layer">
          <h3>{l.icon} {l.name}</h3>
          <div className="ti-chips">
            {l.topics.map((t) => (
              <button key={t.name} className="chip topic big" onClick={() => onTopic(t.name)} title={t.plain}>
                #{t.name}<small>{count ? count(t) : t.cards.length}</small>
              </button>
            ))}
          </div>
        </section>
      ))}
      {!layers.length && <p className="muted">沒有符合「{qq}」的標籤。</p>}
    </div>
  );
}
