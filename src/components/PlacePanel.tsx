// 點地圖上的地點：列出所有地點在此的卡片
import type { Card } from '../types';
import { fmtRange, PRECISION_LABEL, TYPE_COLOR, TYPE_ICON } from '../lib/format';

export function PlacePanel({ placeKey, cards, onOpen }: { placeKey: string; cards: Card[]; onOpen: (id: string) => void }) {
  const here = cards.filter((c) => c.place.locations.some((l) => l.key === placeKey)).sort((a, b) => a.time.start - b.time.start);
  const loc = here[0]?.place.locations.find((l) => l.key === placeKey);
  if (!loc) return <p>找不到這個地點。</p>;
  return (
    <div className="results">
      <h2>{loc.name_ancient}</h2>
      <p className="muted">今 {loc.name_modern}・座標 {loc.lat.toFixed(3)}, {loc.lng.toFixed(3)}（{PRECISION_LABEL[loc.precision]}）
        {loc.pleiades_id && <> ・<a href={`https://pleiades.stoa.org/places/${loc.pleiades_id}`} target="_blank" rel="noreferrer">Pleiades {loc.pleiades_id}</a></>}
      </p>
      <h3>地點在這裡的卡片（{here.length}）</h3>
      {here.map((c) => {
        const l = c.place.locations.find((x) => x.key === placeKey)!;
        return (
          <button key={c.id} className="result" onClick={() => onOpen(c.id)}>
            <span className="r-type" style={{ color: TYPE_COLOR[c.type] }}>{TYPE_ICON[c.type]} {c.typeLabel}</span>
            <span className="r-name">{c.name}</span>
            <span className="r-time">{fmtRange(c.time.start, c.time.end)}</span>
            {l.role && <span className="r-hl">角色：{l.role}</span>}
          </button>
        );
      })}
    </div>
  );
}
