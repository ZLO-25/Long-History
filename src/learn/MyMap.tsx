// 我的歷史地圖：地區 × 年代，點亮學過的；空白的格子提示「這裡還沒去過」
import type { Card, Index } from '../types';
import type { Progress } from './progress';
import { ERA_BINS, unitCards } from './util';

const REGIONS: [string, (c: Card) => boolean][] = [
  ['臺灣', (c) => c.civPaths.some((p) => p.startsWith('東亞/臺灣'))],
  ['中國與草原', (c) => c.civPaths.some((p) => p.startsWith('東亞/中國') || p.startsWith('東亞/北方草原'))],
  ['日本與朝鮮', (c) => c.civPaths.some((p) => p.startsWith('東亞/日本') || p.startsWith('東亞/朝鮮'))],
  ['東南亞與南亞', (c) => c.civPaths.some((p) => p.startsWith('南亞與東南亞'))],
  ['西亞與伊斯蘭', (c) => c.civPaths.some((p) => p.startsWith('中亞與西亞'))],
  ['地中海古代', (c) => c.civPaths.some((p) => p.startsWith('地中海古代'))],
  ['歐洲', (c) => c.civPaths.some((p) => p.startsWith('歐洲'))],
  ['美洲與非洲', (c) => c.civPaths.some((p) => p.startsWith('美洲') || p.startsWith('非洲'))],
];

export function MyMap({ index, cards, p, onCard, onUnit }: { index: Index; cards: Card[]; p: Progress; onCard: (id: string) => void; onUnit: (id: string) => void }) {
  const doneCards = new Set([...Object.keys(p.cards), ...index.units.filter((u) => p.units[u.id]?.done).flatMap(unitCards)]);
  const doneUnits = index.units.filter((u) => p.units[u.id]?.done);
  return (
    <div className="mymap">
      <h2>🗺 我的歷史地圖</h2>
      <p className="muted">讀過的卡片、完成的單元會點亮對應的地區和年代。顏色越深，去過越多次。只存在這台瀏覽器。</p>
      <p>已完成單元：{doneUnits.length ? doneUnits.map((u) => <span key={u.id} className="badge-mini">🏅 {u.title}</span>) : '還沒有，挑一個謎題開始吧！'}</p>
      <div className="table-scroll">
        <table className="mm">
          <thead><tr><th></th>{ERA_BINS.map(([e]) => <th key={e}>{e}</th>)}</tr></thead>
          <tbody>{REGIONS.map(([r, f]) => (
            <tr key={r}><th>{r}</th>{ERA_BINS.map(([e, a, b]) => {
              const all = cards.filter((c) => f(c) && c.time.start >= a && c.time.start < b);
              const seen = all.filter((c) => doneCards.has(c.id));
              const next = all.find((c) => !doneCards.has(c.id));
              const lvl = !all.length ? 'none' : !seen.length ? 'empty' : seen.length < all.length / 2 ? 'some' : 'lots';
              return <td key={e} className={`mm-${lvl}`}>
                {!all.length ? <span className="muted small">還沒有內容</span>
                  : <>{seen.length}／{all.length}{next && <button className="link small" onClick={() => onCard(next.id)}>{seen.length ? '再去一張' : '這裡還沒去過 →'}</button>}</>}
              </td>;
            })}</tr>
          ))}</tbody>
        </table>
      </div>
      {index.units.length > doneUnits.length && <p><button className="btn" onClick={() => { const u = index.units.find((x) => !p.units[x.id]?.done); if (u) onUnit(u.id); }}>挑一個還沒做的單元</button></p>}
    </div>
  );
}
