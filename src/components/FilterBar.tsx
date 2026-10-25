// 篩選：卡片類型、場域、文明（文明為三層樹：地區 > 文明／國家 > 朝代時期，分類見 data/civilizations.yaml）
import { useState } from 'react';
import type { Index, Filters, CardType, CivNode } from '../types';
import { TYPE_COLOR } from '../lib/format';

const TYPES: [CardType, string][] = [['war', '戰爭'], ['commodity', '物資'], ['event', '大事'], ['building', '建築'], ['tech', '技術'], ['finance', '金融']];
const toggle = <T,>(arr: T[], v: T) => (arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);
const under = (p: string, node: string) => p === node || p.startsWith(node + '/');

export function FilterBar({ index, filters, setFilters }: { index: Index; filters: Filters; setFilters: (f: Filters) => void }) {
  const usedFields = index.fieldOptions.filter((f) => index.cards.some((c) => c.place.primary_field === f || c.place.secondary_fields.includes(f)));
  const any = filters.types.length + filters.fields.length + filters.civs.length > 0;
  // 每個節點底下有幾張卡（一張卡算一次）；沒有卡的節點不顯示
  const count = (node: string) => index.cards.filter((c) => c.civPaths.some((p) => under(p, node))).length;
  const [open, setOpen] = useState<string[]>([]);
  const civChip = (n: CivNode, cls = '') => {
    const k = count(n.path);
    return (
      <button key={n.path} className={`chip ${cls} ${filters.civs.includes(n.path) ? 'on' : ''}`}
        onClick={() => setFilters({ ...filters, civs: toggle(filters.civs, n.path) })}>{n.name}<small>{k}</small></button>
    );
  };
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
      <details className="fgroup more civ-tree">
        <summary>文明{filters.civs.length > 0 && `（${filters.civs.length}）`}</summary>
        <div className="civ-body">
          <p className="muted civ-hint">點地區或文明可整組篩選；有 ▸ 的可展開看朝代時期。可複選。</p>
          {index.civTree.filter((r) => count(r.path) > 0).map((r) => (
            <div key={r.path} className="civ-region">
              {civChip(r, 'region')}
              <div className="civ-civs">
                {r.children.filter((c) => count(c.path) > 0).map((c) => {
                  const periods = c.children.filter((p) => count(p.path) > 0);
                  const isOpen = open.includes(c.path) || filters.civs.some((f) => f.startsWith(c.path + '/'));
                  return (
                    <div key={c.path} className={`civ-civ ${isOpen && periods.length ? 'open' : ''}`}>
                      <span className="civ-row">
                        {civChip(c)}
                        {periods.length > 0 && <button className="civ-exp" aria-expanded={isOpen} title={isOpen ? '收合時期' : '展開時期'}
                          onClick={() => setOpen(toggle(open, c.path))}>{isOpen ? '▾' : '▸'}</button>}
                      </span>
                      {isOpen && periods.length > 0 && <span className="civ-periods">{periods.map((p) => civChip(p, 'period'))}</span>}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </details>
      {any && <button className="btn sm" onClick={() => setFilters({ types: [], fields: [], civs: [] })}>清除篩選</button>}
    </div>
  );
}
