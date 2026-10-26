// 點地圖上的地點：列出地點在此的卡片，以及同一座城市內（約 5 公里內）的其他卡片
import type { Card, Location } from '../types';
import { Bi } from './Bi';
import { fmtRange, PRECISION_LABEL, TYPE_COLOR, TYPE_ICON } from '../lib/format';

const NEAR_DEG = 0.06; // 約 5–7 公里：雅典衛城／劇場、羅馬廣場／競技場算同一區

function near(a: Location, b: Location) {
  return Math.abs(a.lat - b.lat) < NEAR_DEG && Math.abs(a.lng - b.lng) < NEAR_DEG;
}

export function PlacePanel({ placeKey, cards, onOpen }: { placeKey: string; cards: Card[]; onOpen: (id: string) => void }) {
  let loc: Location | undefined;
  for (const c of cards) { loc = c.place.locations.find((l) => l.key === placeKey); if (loc) break; }
  if (!loc) return <p>找不到這個地點。</p>;
  const center = loc;
  const rows = cards
    .map((c) => {
      const exact = c.place.locations.find((l) => l.key === placeKey);
      const nearby = exact ? undefined : c.place.locations.find((l) => near(l, center));
      return { c, l: exact ?? nearby, exact: !!exact };
    })
    .filter((r) => r.l)
    .sort((a, b) => Number(b.exact) - Number(a.exact) || a.c.time.start - b.c.time.start);
  const here = rows.filter((r) => r.exact);
  const around = rows.filter((r) => !r.exact);
  const item = ({ c, l }: (typeof rows)[number]) => (
    <button key={c.id} className="result" onClick={() => onOpen(c.id)}>
      <span className="r-type" style={{ color: TYPE_COLOR[c.type] }}>{TYPE_ICON[c.type]} {c.typeLabel}</span>
      <span className="r-name">{c.name}</span>
      <span className="r-time">{fmtRange(c.time.start, c.time.end)}</span>
      <span className="r-hl">{l!.name_ancient}{l!.role ? `・${l!.role}` : ''}</span>
    </button>
  );
  return (
    <div className="results">
      <h2><Bi name={center.name_ancient} /></h2>
      <p className="muted">今 <Bi name={center.name_modern} />・座標 {center.lat.toFixed(3)}, {center.lng.toFixed(3)}（{PRECISION_LABEL[center.precision]}）
        {center.pleiades_id && <> ・<a href={`https://pleiades.stoa.org/places/${center.pleiades_id}`} target="_blank" rel="noreferrer">Pleiades {center.pleiades_id}</a></>}
      </p>
      <h3>地點在這裡的卡片（{here.length}）</h3>
      {here.map(item)}
      {around.length > 0 && <>
        <h3>同一城市／附近的卡片（{around.length}）</h3>
        {around.map(item)}
      </>}
    </div>
  );
}
