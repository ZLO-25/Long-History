// 模擬③：泡沫的形成與破滅。價格由「實際價值」和「追漲的人」一起決定；借錢越多，漲得越兇，崩得也越快
import { useMemo, useState } from 'react';
import { LineChart } from './SimView';

export function Bubble() {
  const [lev, setLev] = useState(3);    // 借錢買的程度 0–5
  const [news, setNews] = useState(6);  // 一開始的好消息有多誘人 0–10
  const T = 60;
  const r = useMemo(() => {
    const value = 100;
    const p = [100, 100 + news * 1.5];
    let crash = -1, peak = 0, peakAt = 0;
    for (let t = 2; t <= T; t++) {
      const trend = p[t - 1] - p[t - 2];
      // 看價值的人：價格高於價值就賣；追漲的人：看到漲就買，借越多錢買越多
      let next = p[t - 1] + 0.05 * (value - p[t - 1]) + (0.85 + lev * 0.05) * trend + (t < 6 ? news * 0.6 : 0);
      // 借錢買的人遇到下跌，被迫賣出（斷頭），跌勢加速
      if (trend < 0 && lev > 0) next += trend * lev * 0.12;
      next = Math.max(20, next);
      if (next > peak) { peak = next; peakAt = t; }
      if (crash < 0 && t > peakAt && next < peak * 0.7) crash = t;
      p.push(next);
    }
    return { p: p.map(Math.round), peak: Math.round(peak), peakAt, crash, value };
  }, [lev, news]);
  return (
    <div className="sim-body">
      <label>大家借錢來買的程度（槓桿）：<b>{lev}／5</b>
        <input type="range" min={0} max={5} value={lev} onChange={(e) => setLev(Number(e.target.value))} /></label>
      <label>一開始的好消息有多誘人：<b>{news}／10</b>（例如「新航線」「新科技」「這次不一樣」）
        <input type="range" min={0} max={10} value={news} onChange={(e) => setNews(Number(e.target.value))} /></label>
      <LineChart xLabel="時間" yLabel="價格" series={[
        { name: '市場價格', color: '#c53030', values: r.p },
        { name: '實際價值（每年能帶來的收入）', color: '#2b6cb0', values: r.p.map(() => r.value), dash: true },
      ]} marks={r.crash > 0 ? [{ x: r.peakAt, label: '最高點' }, { x: r.crash, label: '崩盤' }] : []} />
      <p className="sim-out">最高漲到 <b>{r.peak}</b>（實際價值 100 的 {(r.peak / 100).toFixed(1)} 倍）{r.crash > 0 ? <>，之後很快跌掉三成以上。</> : <>，沒有出現明顯崩盤。</>}</p>
      <details><summary>為什麼會這樣？</summary>
        <p>1. 好消息讓價格先漲。有人看到「漲了」就買，希望之後賣更高，價格就漲更多，這是追漲。</p>
        <p>2. 能借到的錢越多，追漲的人買得越多，價格離實際價值越遠。</p>
        <p>3. 一旦漲不動，看價值的人開始賣，借錢買的人被迫賣出還債，下跌就像雪崩。</p>
        <p className="muted">事後看都很清楚，但身在其中時，沒有人知道最高點在哪裡。本模擬不構成投資建議。</p>
      </details>
    </div>
  );
}
