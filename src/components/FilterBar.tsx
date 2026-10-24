// 篩選：卡片類型、場域、文明
import type { Index, Filters, CardType } from '../types';
import { TYPE_COLOR } from '../lib/format';

const TYPES: [CardType, string][] = [['war', '戰爭'], ['commodity', '物資'], ['event', '大事'], ['building', '建築']];
const toggle = <T,>(arr: T[], v: T) => (arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

export function FilterBar({ index, filters, setFilters }: { index: Index; filters: Filters; setFilters: (f: Filters) => void }) {
  const civs = [...new Set(index.cards.flatMap((c) => c.civilization))];
  const usedFields = index.fieldOptions.filter((f) => index.cards.some((c) => c.place.primary_field === f || c.place.secondary_fields.includes(f)));
  const any = filters.types.length + filters.fields.length + filters.civs.length > 0;
  return (
    <div className="filters">
      <div className="fgroup">
        <span className="flabel">類型</span>
        {TYPES.map(([t, l]) => (
          <button key={t} className={`chip ${filters.types.includes(t) ? 'on' : ''}`} style={{ borderColor: TYPE_COLOR[t] }}
            onClick={() => setFilters({ ...filters, types: toggle(filters.types, t) })}>{l}</button>
        ))}
      </div>
      <details className="fgroup more">
        <summary>場域{filters.fields.length > 0 && `（${filters.fields.length}）`}</summary>
        {usedFields.map((f) => (
          <button key={f} className={`chip ${filters.fields.includes(f) ? 'on' : ''}`} onClick={() => setFilters({ ...filters, fields: toggle(filters.fields, f) })}>{f}</button>
        ))}
      </details>
      <details className="fgroup more">
        <summary>文明{filters.civs.length > 0 && `（${filters.civs.length}）`}</summary>
        {civs.map((v) => (
          <button key={v} className={`chip ${filters.civs.includes(v) ? 'on' : ''}`} onClick={() => setFilters({ ...filters, civs: toggle(filters.civs, v) })}>{v}</button>
        ))}
      </details>
      {any && <button className="btn sm" onClick={() => setFilters({ types: [], fields: [], civs: [] })}>清除篩選</button>}
    </div>
  );
}
