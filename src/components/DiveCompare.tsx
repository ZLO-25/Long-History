// 專題的「對照表」（例如希臘 vs 羅馬）。資料在 data/dives/compare/*.yaml，隨專題資料載入（docs/dives.md 第十節）。
// 桌機三欄（面向｜左｜右），手機每個面向一張卡上下排；格內卡片名可點開卡；出處是小字。研究與學習模式共用。
import type { Card, DiveCompare } from '../types';

interface Props {
  compare: DiveCompare; anchorId: string; byId: Map<string, Card>;
  onOpen: (id: string) => void; canOpen?: (c: Card) => boolean; researchHref?: (id: string) => string;
}

export function DiveCompareSec({ compare, anchorId, byId, onOpen, canOpen, researchHref }: Props) {
  const src = new Map(compare.sources.map((s) => [s.id, s]));
  const cardLink = (id: string | null) => {
    const c = id ? byId.get(id) : null;
    if (!c) return null;
    const name = c.name.replace(/（\d.*）$/, '');
    if (canOpen && !canOpen(c)) return researchHref ? <a className="dv-lg-card off" href={researchHref(c.id)} title="這張卡還不在學習模式，到研究模式看">看卡片：{name}</a> : <span className="dv-lg-card off">{name}</span>;
    return <button className="dv-lg-card" onClick={() => onOpen(c.id)}>看卡片：{name}</button>;
  };
  return (
    <section className="dv-sec dv-compare" id={anchorId}>
      <h3>{compare.title}<small className="muted">兩個文明放在一起比一比</small></h3>
      <div className="dv-cp-table" role="table" aria-label={compare.title}>
        <div className="dv-cp-head" role="row"><span role="columnheader">面向</span><span role="columnheader">{compare.left.label}</span><span role="columnheader">{compare.right.label}</span></div>
        {compare.rows.map((r, i) => (
          <div key={i} className="dv-cp-row" role="row">
            <h4 className="dv-cp-aspect" role="rowheader">{r.aspect}</h4>
            <div className="dv-cp-cell l" role="cell"><b className="dv-cp-who">{compare.left.label}</b><p>{r.left}</p>{cardLink(r.left_card)}</div>
            <div className="dv-cp-cell r" role="cell"><b className="dv-cp-who">{compare.right.label}</b><p>{r.right}</p>{cardLink(r.right_card)}</div>
            <p className="dv-lg-src dv-cp-src">出處：{r.src.map((k, j) => { const s = src.get(k); return s ? <span key={k}>{j > 0 && '、'}<a href={s.url} target="_blank" rel="noreferrer">{s.title}</a></span> : null; })}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
