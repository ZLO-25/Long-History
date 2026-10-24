// 搜尋結果（高亮命中欄位）或依年代排列的全部卡片（手機版的「垂直時間軸」）
import type { Card } from '../types';
import type { Hit } from '../lib/search';
import { activeAt, fmtRange, fmtYear, TYPE_COLOR, TYPE_ICON } from '../lib/format';

interface Props {
  query: string; result: { converted: string; year: number | null }; hits: Hit[];
  cards: Card[]; year: number; onOpen: (id: string) => void;
}

function Mark({ value, ranges }: { value: string; ranges?: readonly [number, number][] }) {
  if (!ranges?.length) return <mark>{value}</mark>;
  const out: (string | JSX.Element)[] = []; let last = 0;
  [...ranges].sort((a, b) => a[0] - b[0]).forEach(([a, b], i) => {
    if (a < last) return;
    out.push(value.slice(last, a)); out.push(<mark key={i}>{value.slice(a, b + 1)}</mark>); last = b + 1;
  });
  out.push(value.slice(last));
  return <>{out}</>;
}

export function ResultList({ query, result, hits, cards, year, onOpen }: Props) {
  if (query.trim()) {
    return (
      <div className="results">
        <p className="muted small">
          {result.converted !== query.trim() && <>已轉為繁體「{result.converted}」・</>}
          {result.year !== null && <>年份搜尋：{fmtYear(result.year)} 年・</>}
          找到 {hits.length} 張卡
        </p>
        {hits.length === 0 && <p>沒有結果。可以試試別名、今日地名、場域（如「港口」）、或年份（如「前431」「212」）。</p>}
        {hits.map((h) => (
          <button key={h.card.id} className="result" onClick={() => onOpen(h.card.id)}>
            <span className="r-type" style={{ color: TYPE_COLOR[h.card.type] }}>{TYPE_ICON[h.card.type]} {h.card.typeLabel}</span>
            <span className="r-name">{h.card.name}</span>
            <span className="r-time">{fmtRange(h.card.time.start, h.card.time.end)}</span>
            <span className="r-hl">
              {h.highlights.map((x, i) => (
                <span key={i} className="hl">{x.field}{x.via && `（${x.via}）`}：<Mark value={x.value} ranges={x.via ? undefined : x.ranges} /></span>
              ))}
            </span>
          </button>
        ))}
      </div>
    );
  }
  // 依世紀分組
  const sorted = [...cards].sort((a, b) => a.time.start - b.time.start);
  const groups = new Map<string, Card[]>();
  for (const c of sorted) {
    const cent = c.time.start < 0 ? `西元前 ${Math.ceil(-c.time.start / 100)} 世紀` : `西元 ${Math.ceil(c.time.start / 100)} 世紀`;
    groups.set(cent, [...(groups.get(cent) ?? []), c]);
  }
  return (
    <div className="results vlist">
      <p className="muted small">共 {cards.length} 張卡，依年代排列。亮色表示在目前年代（{fmtYear(year)} 年）正在發生或已存在。</p>
      {[...groups].map(([g, list]) => (
        <div key={g} className="vgroup">
          <h4>{g}</h4>
          {list.map((c) => (
            <button key={c.id} className={`result compact ${activeAt(c, year) ? 'active' : ''}`} onClick={() => onOpen(c.id)}>
              <span className="dot" style={{ background: TYPE_COLOR[c.type] }} />
              <span className="r-time">{fmtYear(c.time.start)}</span>
              <span className="r-name">{c.summary_line}</span>
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
