// 經濟曲線的資料點說明：數值、性質、查證狀態與來源；同一數列的其他點列成表
import type { EconSeries, Econ } from '../types';
import { fmtEcon, fmtYear } from '../lib/format';

export function EconPanel({ econ, seriesId, point, onPick }: { econ: Econ; seriesId: string; point: number; onPick: (s: string, p: number) => void }) {
  const s = econ.series.find((x) => x.id === seriesId);
  if (!s) return <p>找不到這個數列。</p>;
  const m = econ.metrics.find((x) => x.id === s.metric)!;
  const val = (p: EconSeries['points'][number]) => (p.value != null ? fmtEcon(p.value, m.id) : `${fmtEcon(p.low!, m.id)}–${fmtEcon(p.high!, m.id)}`);
  const yr = (p: EconSeries['points'][number]) => (p.start === p.end ? fmtYear(p.start) : `${fmtYear(p.start)}–${fmtYear(p.end)}`);
  const src = (ids: string[]) => ids.map((id) => s.sources.find((x) => x.id === id)).filter(Boolean).map((x) =>
    <a key={x!.id} className="ref" href={x!.url} target="_blank" rel="noreferrer" title={x!.title}>[{x!.id}]</a>);
  const p = s.points[point];
  return (
    <div className="results econ-panel">
      <h2>{s.name}</h2>
      <p className="muted">經濟曲線・{m.name}（{m.unit}）・性質：{s.kind}・{s.verification}</p>
      {p && <div className="econ-hit">
        <div><b>{p.entity}</b>　{yr(p)} 年　<b>{val(p)}</b>　<span className="tag-muted">{p.verification}</span></div>
        {p.note && <div className="small">{p.note}</div>}
        <div className="small">來源：{src(p.src)}</div>
      </div>}
      <p className="small">{s.note}</p>
      <div className="table-scroll">
        <table className="econ-table">
          <thead><tr><th>對象</th><th>年代</th><th>數值</th><th>查證</th><th>來源</th></tr></thead>
          <tbody>{s.points.map((q, i) => (
            <tr key={i} className={i === point ? 'on' : ''} onClick={() => onPick(s.id, i)}>
              <td>{q.entity}</td><td>{yr(q)}</td><td>{val(q)}</td><td>{q.verification}</td><td>{src(q.src)}</td>
            </tr>))}</tbody>
        </table>
      </div>
      <h3>來源</h3>
      <ol className="sources">{s.sources.map((x) => <li key={x.id}><span className="code">{x.id}</span><a href={x.url} target="_blank" rel="noreferrer">{x.title}</a></li>)}</ol>
      <p className="small muted">圖上只畫有來源的點，點與點之間不連線、不內插；沒有資料的年代就是空白。</p>
    </div>
  );
}
