// 某個「XX史」：謎題列表（依年代排）＋這個史的卡片
import type { Card, History, Index } from '../types';
import type { Progress } from './progress';
import { MysteryList } from './LearnHome';
import { ERA_BINS, unitsOf, unitYear } from './util';
import { fmtYear, TYPE_COLOR, TYPE_ICON } from '../lib/format';

export function HistoryPage({ index, h, cards, p, onUnit, onCard, onHistory, onSim }: {
  index: Index; h: History; cards: Card[]; p: Progress; onUnit: (id: string) => void; onCard: (id: string) => void; onHistory: (id: string) => void; onSim: (id: string) => void;
}) {
  const units = unitsOf(index, h).sort((a, b) => unitYear(index, a) - unitYear(index, b));
  const sorted = [...cards].sort((a, b) => a.time.start - b.time.start);
  return (
    <div className="hpage">
      <h2>{h.name}</h2>
      <p className="muted">{h.blurb}</p>
      <h3>謎題（依年代排）</h3>
      {units.length ? <MysteryList units={units} p={p} onUnit={onUnit} /> : <p className="muted">這個史的單元還在製作中。你可以先讀下面的卡片，或換一個史。</p>}
      {h.id === 'money' && (
        <>
          <h3>🧪 金融小模擬</h3>
          <div className="chips">
            <button className="chip" onClick={() => onSim('debase')}>降低銀幣成色</button>
            <button className="chip" onClick={() => onSim('bankrun')}>銀行擠兌</button>
            <button className="chip" onClick={() => onSim('bubble')}>泡沫</button>
          </div>
        </>
      )}
      <h3>這個史的卡片（{cards.length}）</h3>
      {ERA_BINS.map(([era, a, b]) => {
        const list = sorted.filter((c) => c.time.start >= a && c.time.start < b);
        if (!list.length) return null;
        return <div key={era} className="era-group"><h4>{era}</h4>
          {list.map((c) => (
            <button key={c.id} className={`lresult ${p.cards[c.id] ? 'read' : ''}`} onClick={() => onCard(c.id)}>
              <span className="ic" style={{ color: TYPE_COLOR[c.type] }} aria-label={c.typeLabel}>{TYPE_ICON[c.type]}</span>
              <span className="nm">{c.name}{p.cards[c.id] && <small> ✓讀過</small>}</span>
              <span className="yr">{fmtYear(c.time.start)}</span>
              <span className="why">{c.learn!.why_care}</span>
            </button>
          ))}
        </div>;
      })}
      <h3>換個角度</h3>
      <div className="chips">{index.histories.filter((x) => x.id !== h.id).map((x) => <button key={x.id} className="chip" onClick={() => onHistory(x.id)}>{x.name}</button>)}</div>
    </div>
  );
}
