// 模擬①：降低銀幣成色 → 物價怎麼變？好錢為什麼會被藏起來（劣幣驅逐良幣）
import { useMemo, useState } from 'react';
import { LineChart } from './SimView';

export function Debase() {
  const [silver, setSilver] = useState(50); // 新幣含銀率 %
  const [mint, setMint] = useState(2);       // 每年用新幣付出去的錢，是原本貨幣量的幾成（×10%）
  const years = 10;
  const r = useMemo(() => {
    let oldC = 1000, newC = 0;               // 市面上的舊幣（足銀）與新幣（減銀）枚數
    const price: number[] = [], oldShare: number[] = [], gain: number[] = [];
    let profit = 0;
    for (let t = 0; t <= years; t++) {
      if (t > 0) {
        const add = 1000 * mint * 0.1;       // 皇帝每年用新幣付軍餉
        newC += add; profit += add * (1 - silver / 100);
        // 劣幣驅逐良幣：法律規定新舊幣面額一樣，聰明人把足銀的舊幣藏起來或熔掉，只拿新幣去花
        const hoard = oldC * Math.min(0.5, (1 - silver / 100) * 0.6);
        oldC -= hoard;
      }
      const coins = oldC + newC;
      const avgSilver = (oldC * 1 + newC * silver / 100) / coins;
      // 物價：錢變多 → 漲；商人發現每枚錢裡的銀變少 → 也漲
      price.push(Math.round(100 * (coins / 1000) ** 0.5 / avgSilver ** 0.8));
      oldShare.push(Math.round((oldC / coins) * 100));
      gain.push(Math.round(profit));
    }
    return { price, oldShare, gain };
  }, [silver, mint]);
  return (
    <div className="sim-body">
      <label>新鑄銀幣的含銀率：<b>{silver}%</b>
        <input type="range" min={5} max={100} step={5} value={silver} onChange={(e) => setSilver(Number(e.target.value))} /></label>
      <label>每年用新幣付軍餉、薪水：<b>原本貨幣量的 {mint * 10}%</b>
        <input type="range" min={0} max={6} value={mint} onChange={(e) => setMint(Number(e.target.value))} /></label>
      <LineChart xLabel="年" yLabel="指數" series={[
        { name: '物價（一開始＝100）', color: '#c53030', values: r.price },
        { name: '市面上還看得到的足銀舊幣（%）', color: '#2b6cb0', values: r.oldShare, dash: true },
      ]} />
      <p className="sim-out">10 年後：物價約是原本的 <b>{(r.price[years] / 100).toFixed(1)} 倍</b>；市面上的足銀舊幣只剩 <b>{r.oldShare[years]}%</b>；皇帝「省下」的銀約等於 <b>{r.gain[years]}</b> 枚舊幣。</p>
      <details><summary>為什麼會這樣？</summary>
        <p>1. 皇帝用含銀少的新幣付軍餉，等於偷偷少付了銀，短期內很划算。</p>
        <p>2. 法律說新舊幣一樣值錢，但大家知道舊幣含銀多，就把舊幣藏起來、熔掉或拿去外地用，只把新幣花出去，所以市面上的好錢越來越少，這就是「劣幣驅逐良幣」（格雷欣法則）。</p>
        <p>3. 商人發現收到的錢含銀越來越少，就提高價格，物價上漲，最後連領軍餉的士兵也買不起東西。</p>
      </details>
    </div>
  );
}
