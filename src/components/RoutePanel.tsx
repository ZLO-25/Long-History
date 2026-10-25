// 點地圖上的路線：說明與使用此路線的卡片
import type { Card, Route } from '../types';
import { fmtRange, KIND_LABEL, METHOD_LABEL, TYPE_COLOR, TYPE_ICON } from '../lib/format';
import { Markdown } from '../lib/markdown';

export function RoutePanel({ route, cards, onOpen }: { route: Route; cards: Card[]; onOpen: (id: string) => void }) {
  if (!route) return <p>找不到這條路線。</p>;
  const used = cards.filter((c) => c.routes.includes(route.id));
  return (
    <div className="results">
      <h2>{route.name}</h2>
      <p className="muted">{KIND_LABEL[route.kind]}・地圖顯示期間 {fmtRange(route.start, route.end)}・{route.method === 'stations' ? '站點間直線合計' : '約'} {route.stats.km.toLocaleString()} 公里</p>
      <p className="small"><b>線條怎麼來的：</b>{METHOD_LABEL[route.method]}。
        {route.method === 'awmc-road' && <>其中 {route.stats.known_pct}% 是地圖集標「路線確定」的路段（實線）、{route.stats.approx_pct}% 標「大致路線」（虛線），另有約 {route.stats.gap_km} 公里是兩段古道之間的缺口，由程式接上（點線）。</>}
        {route.method === 'stations' && <>這條路線沒有可用的古道圖資，地圖上只把史料記載的站點用點線依序連起來；點線不是實際走法。</>}
        {route.method === 'sea' && <>海上沒有「路面」：線條只表示船在兩個有史料記載的港口之間可以走的最短海路，實際航跡會隨風向與季節改變。</>}
      </p>
      <p className="small"><b>經過：</b>{route.stations.map((s) => s.name).join(' → ')}</p>
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
