// 專題的「今日影子」：那時候 → 今天哪裡還看得到。資料寫在專題 yaml 的 legacy（docs/dives.md 第九節），隨專題頁載入。
// 桌機兩欄（左「那時候」右「今天」，中間箭頭），手機上下排；依 tag 分組；點卡片名開卡；出處收在小字。研究模式與學習模式共用。
import type { Card, DiveLegacy } from '../types';

interface Props {
  legacy: DiveLegacy; diveId: string; byId: Map<string, Card>;
  onOpen: (id: string) => void; canOpen?: (c: Card) => boolean; researchHref?: (id: string) => string;
}

export function DiveLegacySec({ legacy, diveId, byId, onOpen, canOpen, researchHref }: Props) {
  const src = new Map(legacy.sources.map((s) => [s.id, s]));
  const tags = [...new Set(legacy.items.map((x) => x.tag))];
  const cardLink = (id: string) => {
    const c = byId.get(id);
    if (!c) return null;
    const name = c.name.replace(/（\d.*）$/, '');
    if (canOpen && !canOpen(c)) return researchHref ? <a className="dv-lg-card off" href={researchHref(id)} title="這張卡還不在學習模式，到研究模式看">看卡片：{name}</a> : <span className="dv-lg-card off">{name}</span>;
    return <button className="dv-lg-card" onClick={() => onOpen(id)}>看卡片：{name}</button>;
  };
  return (
    <section className="dv-sec dv-legacy" id={`dv-legacy-${diveId}`}>
      <h3>{legacy.title}<small className="muted">今天哪裡還看得到</small></h3>
      {tags.map((tag) => (
        <div key={tag} className="dv-lg-group">
          <h4 className="dv-lg-tag">{tag}</h4>
          <ul className="dv-lg-list">
            {legacy.items.filter((x) => x.tag === tag).map((x, i) => (
              <li key={i} className="dv-lg-item">
                <div className="dv-lg-row">
                  <p className="dv-lg-then"><b>那時候</b>{x.then}</p>
                  <span className="dv-lg-arrow" aria-hidden>→</span>
                  <p className="dv-lg-now"><b>今天</b>{x.now}</p>
                </div>
                <div className="dv-lg-foot">
                  {cardLink(x.card)}
                  <span className="dv-lg-src">出處：{x.src.map((k, j) => { const s = src.get(k); return s ? <span key={k}>{j > 0 && '、'}<a href={s.url} target="_blank" rel="noreferrer">{s.title}</a></span> : null; })}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
