// 今日對照層：一個當代咽喉要道的事實、事件、對應的歷史卡與不可類比的差異；每一項都標「資料截至」
import type { Card, Index, Source, TodayPoint } from '../types';
import { fmtRange, TYPE_COLOR, TYPE_ICON } from '../lib/format';

export const Refs = ({ list }: { list: Source[] }) => <>{list.map((s) => <a key={s.id} className="ref" href={s.url} target="_blank" rel="noreferrer" title={s.title}>[{s.id}]</a>)}</>;

export const AsOf = ({ date, stale, months }: { date: string; stale?: boolean; months?: number }) => (
  <span className={`asof ${stale ? 'stale' : ''}`} title={stale ? `超過 ${months ?? 18} 個月，可能過時` : '今天的數字會變動，請注意日期'}>
    資料截至 {date}{stale ? '（可能過時）' : ''}
  </span>
);

interface Props { point: TodayPoint; index: Index; byId: Map<string, Card>; onOpen: (id: string) => void; onTag: (t: string) => void; onChain: (id: string) => void }

export function TodayPanel({ point: p, index, byId, onOpen, onTag, onChain }: Props) {
  const chains = index.today.chains.filter((c) => c.chokepoints?.includes(p.id));
  const all = [...new Map([...p.facts, ...p.events, ...p.counterparts].flatMap((x) => x.sources).map((s) => [s.id, s])).values()]
    .sort((a, b) => Number(a.id.slice(1)) - Number(b.id.slice(1)));
  return (
    <div className="results today-panel">
      <p className="today-kicker">今日對照層・當代咽喉要道</p>
      <h2>{p.name}</h2>
      <p><AsOf date={p.data_as_of} stale={p.stale} months={index.today.stale_months} /> <span className="tag-muted">{p.verification}</span>{p.precision === 'schematic' && <span className="muted small">　地圖位置為代表點</span>}</p>
      <div>{p.structure_tags.map((t) => <button key={t} className="chip tag" onClick={() => onTag(t)} title="用這個標籤做結構對照">{t}</button>)}</div>
      <h3>現況與數字</h3>
      <ul className="today-facts">{p.facts.map((f, i) => <li key={i}>{f.text} <Refs list={f.sources} /></li>)}</ul>
      {p.events.length > 0 && <><h3>近年事件</h3>
        <ol className="today-events">{p.events.map((e, i) => <li key={i}><b>{e.date}</b>　{e.text} <Refs list={e.sources} /></li>)}</ol></>}
      {chains.length > 0 && <><h3>經過這裡的今日供應鏈</h3>{chains.map((c) =>
        <button key={c.id} className="btn sm primary chain-btn" onClick={() => onChain(c.id)}>▶ 播放：{c.name}</button>)}</>}
      <h3>結構相似的歷史卡片</h3>
      {p.counterparts.map((x) => {
        const t = byId.get(x.id);
        if (!t) return null;
        return (
          <div key={x.id} className="cp-item">
            <button className="result" onClick={() => onOpen(t.id)}>
              <span className="r-type" style={{ color: TYPE_COLOR[t.type] }}>{TYPE_ICON[t.type]} {t.typeLabel}</span>
              <span className="r-name">{t.name}</span>
              <span className="r-time">{fmtRange(t.time.start, t.time.end)}</span>
            </button>
            <p className="small">{x.note} <Refs list={x.sources} /></p>
          </div>
        );
      })}
      <h3>不可類比的差異</h3>
      <p className="small">{p.non_analogous}</p>
      <p className="small muted">這一層只寫已經發生的事實與結構，不做預測，也不是投資建議。</p>
      <h3>來源</h3>
      <ol className="sources">{all.map((s) => <li key={s.id}><span className="code">{s.id}</span><a href={s.url} target="_blank" rel="noreferrer">{s.title}</a>（查閱 {s.accessed}）</li>)}</ol>
    </div>
  );
}

// 歷史卡片頁的「今日對照」區塊
export function TodayRefs({ card, index, onToday, onChain }: { card: Card; index: Index; onToday: (id: string) => void; onChain: (id: string) => void }) {
  const pts = index.today.chokepoints.filter((p) => p.counterparts.some((x) => x.id === card.id));
  const chains = index.today.chains.filter((c) => c.counterparts?.includes(card.id));
  if (!pts.length && !chains.length) return null;
  return (
    <section className="cd-sec today-refs">
      <h3>今日對照<span className="muted small">（今天結構相似的咽喉或供應鏈；數字會過時，請看日期）</span></h3>
      {pts.map((p) => {
        const x = p.counterparts.find((c) => c.id === card.id)!;
        return (
          <div key={p.id} className="cp-item">
            <button className="result today" onClick={() => onToday(p.id)}>
              <span className="r-type">◆ 今日咽喉</span><span className="r-name">{p.name}</span><span className="r-time"><AsOf date={p.data_as_of} stale={p.stale} /></span>
            </button>
            <p className="small">{x.note} <Refs list={x.sources} /></p>
          </div>
        );
      })}
      {chains.map((c) => (
        <button key={c.id} className="btn sm primary chain-btn" onClick={() => onChain(c.id)}>▶ 今日供應鏈：{c.name}（資料截至 {c.data_as_of}）</button>
      ))}
    </section>
  );
}
