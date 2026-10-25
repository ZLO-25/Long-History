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
  // 點很多的數列（例如 Maddison 1000–2022 年）只列同一個對象，表格才不會太長
  const many = s.points.length > 40 && p;
  const rows = s.points.map((q, i) => [q, i] as const).filter(([q]) => !many || q.entity === p.entity);
  // Maddison 規定圖上要列出各國原始研究：寫在該國第一個點，選到同國其他點時也一併顯示
  const orig = p && s.points.find((q) => q.entity === p.entity && q.note?.startsWith('原始研究'))?.note;
  return (
    <div className="results econ-panel">
      <h2>{s.name}</h2>
      <p className="muted">經濟曲線・{m.name}（{m.unit}）・性質：{s.kind}・{s.verification}</p>
      {p && <div className="econ-hit">
        <div><b>{p.entity}</b>　{yr(p)} 年　<b>{val(p)}</b>　<span className="tag-muted">{p.verification}</span></div>
        {p.note && <div className="small">{p.note}</div>}
        {orig && orig !== p.note && <div className="small">{orig}</div>}
        <div className="small">來源：{src(p.src)}</div>
      </div>}
      <p className="small">{s.note}</p>
      {many && <p className="small muted">下表只列「{p.entity}」；點圖上其他顏色的點可以看別的對象。</p>}
      <div className="table-scroll">
        <table className="econ-table">
          <thead><tr><th>對象</th><th>年代</th><th>數值</th><th>查證</th><th>來源</th></tr></thead>
          <tbody>{rows.map(([q, i]) => (
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
