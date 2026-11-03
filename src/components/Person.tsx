// 人物卡（深入專題）：誰、羅馬字、所屬勢力、人生軌跡（依年份的地點）、和其他人物的關係
// 研究模式與學習模式共用。關係寫在任一邊即可：這裡把「別人寫到我」的也合併進來。
import type { Card, Index, Relation, RelationKind } from '../types';
import { fmtYear, TYPE_COLOR } from '../lib/format';
import { Bi } from './Bi';
import './person.css';

export const KIND_CLASS: Record<RelationKind, string> = { 主從: 'k-lord', 同盟: 'k-ally', 聯姻: 'k-marry', 敵對: 'k-enemy', 背叛: 'k-betray', 師友: 'k-mentor', 親屬: 'k-kin' };
// 從對方看過來，關係怎麼稱呼（主從只有方向性，其餘對稱）
const INVERSE: Partial<Record<RelationKind, string>> = { 主從: '主從（我是他的部下）' };

export interface RelationRow extends Relation { other: Card; mine: boolean }

/** 這張人物卡的所有關係：自己寫的＋別張人物卡寫到我的 */
export function relationsOf(index: Index, card: Card): RelationRow[] {
  const byId = new Map(index.cards.map((c) => [c.id, c]));
  const rows: RelationRow[] = [];
  for (const r of card.relations ?? []) { const o = byId.get(r.id); if (o) rows.push({ ...r, other: o, mine: true }); }
  for (const c of index.cards) if (c.type === 'person' && c.id !== card.id) for (const r of c.relations ?? []) {
    if (r.id !== card.id) continue;
    if (rows.some((x) => x.other.id === c.id && x.kind === r.kind)) continue;
    rows.push({ ...r, other: c, mine: false });
  }
  return rows.sort((a, b) => (a.from ?? a.other.time.start) - (b.from ?? b.other.time.start));
}

export function RelChipKind({ kind, mine }: { kind: RelationKind; mine: boolean }) {
  const label = !mine && INVERSE[kind] ? INVERSE[kind] : kind === '主從' && mine ? '主從（他是我的部下）' : kind;
  return <span className={`kind-chip ${KIND_CLASS[kind] ?? ''}`}>{label}</span>;
}

interface Props { card: Card; index: Index; onOpen: (id: string) => void; onPlace?: (key: string) => void; canOpen?: (c: Card) => boolean; researchHref?: (id: string) => string; compact?: boolean }

export function PersonBlock({ card: c, index, onOpen, onPlace, canOpen, researchHref, compact }: Props) {
  if (c.type !== 'person') return null;
  const P = c.person;
  const path = [...c.place.locations].filter((l) => typeof l.year === 'number').sort((a, b) => a.year! - b.year!);
  const rels = relationsOf(index, c);
  const openBtn = (o: Card) => {
    const label = <>{o.name.replace(/（.*$/, '')}<small>{fmtYear(o.time.start)}–{fmtYear(o.time.end)}</small></>;
    if (canOpen && !canOpen(o)) return researchHref ? <a className="pr-name off" href={researchHref(o.id)}>{label}<small>↗ 研究模式</small></a> : <span className="pr-name off">{label}</span>;
    return <button className="pr-name" style={{ borderColor: TYPE_COLOR.person }} onClick={() => onOpen(o.id)}>{label}</button>;
  };
  return (
    <section className={`person-block ${compact ? 'compact' : ''}`} aria-label="人物資料">
      {P && (
        <dl className="pb-who">
          <dt>是誰</dt><dd>{P.role}{P.faction && <span className="muted">・{P.faction}</span>}</dd>
          <dt>羅馬字</dt><dd><span lang="ja-Latn">{P.name_romaji}</span><small className="muted">（查外文資料用這個拼法）</small></dd>
          <dt>生卒</dt><dd>{fmtYear(c.time.start)}–{fmtYear(c.time.end)}（{c.time.end - c.time.start} 歲上下{c.time.precision !== 'exact' ? '，生年或卒年有爭議' : ''}）</dd>
        </dl>
      )}
      {path.length > 1 && (
        <div className="pb-path">
          <h4>人生軌跡<small className="muted">地圖上依年份連成一條線</small></h4>
          <ol>
            {path.map((l, i) => (
              <li key={l.key + i}>
                <span className="pb-year">{fmtYear(l.year!)}</span>
                {onPlace ? <button className="link" onClick={() => onPlace(l.key)}><Bi name={l.name_ancient} /></button> : <Bi name={l.name_ancient} />}
                {l.role && <span className="pb-role">{l.role}</span>}
              </li>
            ))}
          </ol>
        </div>
      )}
      {rels.length > 0 && (
        <div className="pb-rel">
          <h4>和誰有關係<small className="muted">主從・同盟・聯姻・敵對・背叛・師友・親屬</small></h4>
          <ul>
            {rels.map((r, i) => (
              <li key={i}>
                <div className="pr-line">
                  {openBtn(r.other)}
                  <RelChipKind kind={r.kind} mine={r.mine} />
                  {(r.from || r.to) && <span className="muted small">{r.from ? fmtYear(r.from) : ''}{r.to ? `–${fmtYear(r.to)}` : r.from ? ' 起' : ''}</span>}
                </div>
                <p className="pr-note">{r.note}{r.sources.length > 0 && <span className="ce-src">{r.sources.map((s, k) => <a key={k} href={s.url} target="_blank" rel="noreferrer" title={s.title}>[{k + 1}]</a>)}</span>}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
