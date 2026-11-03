// 深入專題（data/dives/*.yaml）：把一段時代放大來看。
// 專題頁＝放大的時間範圍＋這段時代的卡片（分軌）＋人物＋故事線＋大名勢力示意圖。
// 不另開網站、不改卡片格式：所有卡仍是普通卡片，專題只是把它們聚在一起（docs/dives.md）。
import type { Card, Dive, Index, PowerMap } from '../types';
import { fmtRange, fmtYear, TYPE_COLOR, TYPE_ICON } from '../lib/format';
import './dive.css';

export function findDive(index: Index, id: string): Dive | undefined {
  return (index.dives ?? []).find((d) => d.id === id);
}
const byIdOf = (index: Index) => new Map(index.cards.map((c) => [c.id, c]));

/** 地圖上要標的點：專題的每張卡（人物除外）取第一個地點，編號＝依年代的順序 */
export function diveMarks(index: Index, id: string) {
  const d = findDive(index, id);
  if (!d) return [];
  const m = byIdOf(index);
  return d.cards.map((cid) => m.get(cid)).filter((c): c is Card => !!c && c.type !== 'person' && !!c.place.locations[0])
    .map((c, i) => ({ key: c.place.locations[0].key, n: i + 1, name: c.name }));
}

/** 目前年代該顯示哪一張勢力圖：不晚於該年的最近一張；都比該年晚就用第一張 */
export function powerFor(d: Dive, year: number): PowerMap | null {
  const s = [...d.power_maps].sort((a, b) => a.year - b.year);
  return s.filter((p) => p.year <= year).pop() ?? s[0] ?? null;
}

interface ViewProps {
  index: Index; id: string; year: number; setYear: (y: number) => void; currentId?: string | null;
  /** 勢力圖：目前打開哪一年（null＝關） */
  powerYear: number | null; setPowerYear: (y: number | null) => void;
  onOpen: (id: string) => void; onStory: (id: string) => void; onAll: () => void;
  unitHref?: (id: string) => string; onMap?: () => void;
  canOpen?: (c: Card) => boolean; researchHref?: (id: string) => string;
}

export function DiveView({ index, id, year, setYear, currentId, powerYear, setPowerYear, onOpen, onStory, onAll, unitHref, onMap, canOpen, researchHref }: ViewProps) {
  const d = findDive(index, id);
  if (!d) return <div className="dive-view"><p>找不到這個專題。</p><button className="link" onClick={onAll}>看全部專題</button></div>;
  const m = byIdOf(index);
  const cards = d.cards.map((x) => m.get(x)).filter((c): c is Card => !!c);
  const persons = cards.filter((c) => c.type === 'person');
  const events = cards.filter((c) => c.type !== 'person');
  const marks = new Map(diveMarks(index, id).map((x) => [x.name, x.n]));
  const laneOf = (c: Card) => d.lanes.find((l) => l.types.includes(c.type))?.name ?? '其他';
  const lanes = [...d.lanes.map((l) => l.name), '其他'].map((name) => ({ name, cards: events.filter((c) => laneOf(c) === name) })).filter((l) => l.cards.length);
  const power = powerYear != null ? d.power_maps.find((p) => p.year === powerYear) ?? null : null;
  const cardBtn = (c: Card, n?: number) => {
    const inYear = c.time.start <= year && year <= c.time.end;
    const label = <>{n != null && <span className="dv-n">{n}</span>}<span aria-hidden className="dv-icon" style={{ color: TYPE_COLOR[c.type] }}>{TYPE_ICON[c.type]}</span><span className="dv-name">{c.name.replace(/（\d.*）$/, '')}</span><small className="dv-year">{c.type === 'person' ? `${fmtYear(c.time.start)}–${fmtYear(c.time.end)}` : fmtRange(c.time.start, c.time.end)}</small></>;
    const cls = `dv-card ${currentId === c.id ? 'here' : ''} ${inYear ? 'in-year' : ''}`;
    if (canOpen && !canOpen(c)) return researchHref ? <a key={c.id} className={`${cls} off`} href={researchHref(c.id)} title="這張卡還不在學習模式，到研究模式看">{label}</a> : <span key={c.id} className={`${cls} off`}>{label}</span>;
    return <button key={c.id} className={cls} style={{ borderLeftColor: TYPE_COLOR[c.type] }} onClick={() => onOpen(c.id)}>{label}</button>;
  };
  return (
    <div className="dive-view">
      <button className="link back" onClick={onAll}>← 全部專題</button>
      <h2>{d.title}</h2>
      <p className="dv-q">❓ {d.question}</p>
      {d.blurb && <p className="dv-blurb">{d.blurb}</p>}
      <p className="muted small">{fmtRange(d.range.start, d.range.end)}・{events.length} 張卡、{persons.length} 位人物・時間軸已放大到這段年代{onMap && <>・<button className="link" onClick={onMap}>在地圖上看</button></>}</p>

      {d.power_maps.length > 0 && (
        <section className="dv-sec dv-power">
          <h3>勢力圖<small className="muted">誰在什麼時候最強</small></h3>
          <div className="dv-chips">
            <button className={`chip ${powerYear == null ? 'on' : ''}`} onClick={() => setPowerYear(null)}>關</button>
            {d.power_maps.map((p) => <button key={p.year} className={`chip ${powerYear === p.year ? 'on' : ''}`} onClick={() => { setPowerYear(p.year); if (year < p.year - 3 || year > p.year + 3) setYear(p.year); }} title={p.title}>{fmtYear(p.year)} 年</button>)}
          </div>
          {power && (
            <div className="dv-power-info">
              <b>{power.title}</b>
              <p className="small">{power.note}</p>
              <ul className="dv-legend">
                {power.powers.map((p) => (
                  <li key={p.name}><i style={{ background: p.color }} />
                    {p.card && m.get(p.card) ? <button className="link" onClick={() => onOpen(p.card!)}>{p.name}</button> : <span>{p.name}</span>}
                    <small className="muted">{p.provinces}</small>
                  </li>
                ))}
              </ul>
              <details className="small"><summary>這張圖怎麼畫的、根據什麼</summary>
                <p className="muted">以「令制國」為單位、用今日都道府縣的範圍近似，所以邊界只是示意，不是當時確切的領地線。北海道（蝦夷地）與沖繩（琉球王國）不在圖內。</p>
                <ol className="sources">{power.sources.map((s, i) => <li key={i}><a href={s.url} target="_blank" rel="noreferrer">{s.title}</a><span className="muted small">（查閱 {s.accessed}）</span></li>)}</ol>
              </details>
            </div>
          )}
        </section>
      )}

      {persons.length > 0 && (
        <section className="dv-sec">
          <h3>人物<small className="muted">點開看他的一生、他當時的選擇、別人怎麼看他</small></h3>
          <div className="dv-list">{persons.map((c) => cardBtn(c))}</div>
        </section>
      )}

      <section className="dv-sec">
        <h3>這段時代的卡片<small className="muted">依年代排；編號和地圖上的一樣</small></h3>
        {lanes.map((l) => (
          <div key={l.name} className="dv-lane">
            <h4>{l.name}</h4>
            <div className="dv-list">{l.cards.map((c) => cardBtn(c, marks.get(c.name)))}</div>
          </div>
        ))}
      </section>

      {(d.storylines.length > 0 || d.units.length > 0) && (
        <section className="dv-sec">
          <h3>照順序讀<small className="muted">故事線＝沿著前因後果走；學習單元＝有問題、有決策題的導讀</small></h3>
          <div className="dv-chips">
            {d.storylines.map((sid) => { const s = (index.storylines ?? []).find((x) => x.id === sid); return s ? <button key={sid} className="dv-story" onClick={() => onStory(sid)}>故事線《{s.title}》<small>{s.stops.length} 站</small></button> : null; })}
            {d.units.map((uid) => { const u = (index.units ?? []).find((x) => x.id === uid); return u && unitHref ? <a key={uid} className="dv-story unit" href={unitHref(uid)}>學習單元《{u.title}》<small>{u.minutes} 分鐘</small></a> : null; })}
          </div>
        </section>
      )}
      <p className="dv-note muted small">專題只是把這段時代的卡片聚在一起放大看；每張卡仍然在整條長河、地圖和主題標籤裡，可以隨時跳出去比較別的時代。</p>
    </div>
  );
}

export function DiveIndex({ index, onDive }: { index: Index; onDive: (id: string) => void }) {
  const m = byIdOf(index);
  return (
    <div className="dive-index">
      <h2>深入專題</h2>
      <p className="muted">把一段時代放大來看：誰在什麼時候最強、關鍵的人做了什麼決定、這段歷史和世界有什麼關係。</p>
      <ul>
        {(index.dives ?? []).map((d) => {
          const persons = d.cards.filter((id) => m.get(id)?.type === 'person').length;
          return (
            <li key={d.id}>
              <button className="di-item" onClick={() => onDive(d.id)}>
                <span className="di-title">{d.title}</span>
                <span className="di-q">{d.question}</span>
                <span className="di-meta muted small">{fmtRange(d.range.start, d.range.end)}・{d.cards.length - persons} 張卡、{persons} 位人物{d.power_maps.length ? `・${d.power_maps.length} 張勢力圖` : ''}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
