// 點地圖上的路線：說明與使用此路線的卡片
import type { Card, Route } from '../types';
import { fmtRange, TYPE_COLOR, TYPE_ICON } from '../lib/format';
import { Markdown } from '../lib/markdown';

export function RoutePanel({ route, cards, onOpen }: { route: Route; cards: Card[]; onOpen: (id: string) => void }) {
  if (!route) return <p>找不到這條路線。</p>;
  const used = cards.filter((c) => c.routes.includes(route.id));
  return (
    <div className="results">
      <h2>{route.name}</h2>
      <p className="muted">{route.kind === 'sea' ? '航線' : '道路'}・地圖顯示期間 {fmtRange(route.start, route.end)}・線條為示意（以主要城市連線）</p>
      {route.note && <Markdown text={route.note} sources={route.sources} />}
      <h3>相關卡片</h3>
      {used.map((c) => (
        <button key={c.id} className="result" onClick={() => onOpen(c.id)}>
          <span className="r-type" style={{ color: TYPE_COLOR[c.type] }}>{TYPE_ICON[c.type]} {c.typeLabel}</span>
          <span className="r-name">{c.name}</span>
          <span className="r-time">{fmtRange(c.time.start, c.time.end)}</span>
        </button>
      ))}
      <h3>來源</h3>
      <ol className="sources">{route.sources.map((s) => <li key={s.id}><span className="code">{s.id}</span><a href={s.url} target="_blank" rel="noreferrer">{s.title}</a></li>)}</ol>
    </div>
  );
}
