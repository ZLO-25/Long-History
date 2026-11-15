// 同時代對照（原「中西對照」）：本卡指向另一個地區的卡（含一句「哪裡相似、哪裡不同」），以及別人把本卡列為對照的卡
import type { Card } from '../types';
import { Markdown } from '../lib/markdown';
import { regionOf, REGION_LABEL } from '../lib/lane';
import { fmtRange, TYPE_COLOR, TYPE_ICON } from '../lib/format';

export function Counterparts({ card: c, byId, onOpen }: { card: Card; byId: Map<string, Card>; onOpen: (id: string) => void }) {
  return (
    <section className="cd-sec counterparts">
      <h3>同時代對照<span className="muted small">（另一個地區、結構相似的卡）</span></h3>
      {c.counterparts.length === 0 && !c.counterparts_none && c.counterpart_of.length === 0 && <p className="muted">（未填）</p>}
      {c.counterparts_none && <p className="muted">{c.counterparts_none}</p>}
      {c.counterparts.map((x) => {
        const t = byId.get(x.id);
        if (!t) return null;
        return (
          <div key={x.id} className="cp-item">
            <button className="result" onClick={() => onOpen(t.id)}>
              <span className="r-type" style={{ color: TYPE_COLOR[t.type] }}>{TYPE_ICON[t.type]} {REGION_LABEL[regionOf(t)]}・{t.typeLabel}</span>
              <span className="r-name">{t.name}</span>
              <span className="r-time">{fmtRange(t.time.start, t.time.end)}</span>
            </button>
            <Markdown text={`${x.note} ${x.src.map((s) => `[${s}]`).join('')}`} sources={c.sources} />
          </div>
        );
      })}
      {c.counterpart_of.length > 0 && (
        <div className="linklist">
          <span className="muted">也被這些卡列為對照：</span>
          {c.counterpart_of.map((id) => { const t = byId.get(id); return t && <button key={id} className="chip" style={{ borderColor: TYPE_COLOR[t.type] }} onClick={() => onOpen(id)}>{t.name}</button>; })}
        </div>
      )}
    </section>
  );
}
