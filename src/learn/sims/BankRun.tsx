// 模擬②：銀行擠兌。銀行只留一部分現金，其他借出去；如果大家同時來領，再健全的銀行也付不出來
import { useMemo, useState } from 'react';
import { LineChart } from './SimView';

export function BankRun() {
  const [reserve, setReserve] = useState(15);   // 現金準備率 %
  const [rumor, setRumor] = useState(5);         // 謠言強度 0–10
  const [insured, setInsured] = useState(false); // 存款保險
  const days = 15;
  const r = useMemo(() => {
    const deposits = 10000;
    let cash = deposits * reserve / 100, left = deposits, loansSold = 0;
    const cashS: number[] = [], wantS: number[] = [];
    let failDay = -1;
    let panic = rumor / 10;
    for (let d = 0; d <= days; d++) {
      // 想領錢的人：平常 1%，謠言越大、看到排隊的人越多就越想領；有存款保險時大家比較安心
      const share = 0.01 + (insured ? 0.1 : 1) * panic * 0.18;
      const want = d === 0 ? 0 : left * share;
      if (d > 0) {
        let need = want;
        if (need > cash) {
          // 現金不夠：銀行急著賣掉放款（只拿回 6 成），還是不夠就倒閉
          const loans = deposits * (1 - reserve / 100) - loansSold;
          const sell = Math.min(loans, (need - cash) / 0.6);
          loansSold += sell; cash += sell * 0.6;
        }
        if (need > cash && failDay < 0) failDay = d;
        need = Math.min(need, cash); cash -= need; left -= need;
        panic = Math.min(1, panic + (want / deposits) * (insured ? 0.5 : 4)); // 排隊的人越多，謠言越像真的
      }
      cashS.push(Math.round(cash)); wantS.push(Math.round(want));
    }
    return { cashS, wantS, failDay };
  }, [reserve, rumor, insured]);
  return (
    <div className="sim-body">
      <label>銀行留在金庫的現金：<b>存款的 {reserve}%</b>（其他借給別人做生意、買房）
        <input type="range" min={5} max={60} step={5} value={reserve} onChange={(e) => setReserve(Number(e.target.value))} /></label>
      <label>「這家銀行要倒了」的謠言有多強：<b>{rumor}／10</b>
        <input type="range" min={0} max={10} value={rumor} onChange={(e) => setRumor(Number(e.target.value))} /></label>
      <label className="check"><input type="checkbox" checked={insured} onChange={(e) => setInsured(e.target.checked)} /> 政府提供存款保險（銀行倒了，政府保證賠存款）</label>
      <LineChart xLabel="天" yLabel="元" series={[
        { name: '金庫裡的現金', color: '#2f855a', values: r.cashS },
        { name: '當天想領錢的金額', color: '#c53030', values: r.wantS, dash: true },
      ]} marks={r.failDay > 0 ? [{ x: r.failDay, label: '付不出錢了' }] : []} />
      <p className="sim-out">{r.failDay > 0 ? <>第 <b>{r.failDay}</b> 天，銀行付不出錢，只好關門。</> : <>15 天內銀行撐住了。</>}</p>
      <details><summary>為什麼會這樣？</summary>
        <p>1. 銀行不會把所有存款放在金庫，大部分都借出去了，這是銀行賺錢的方式，平常沒問題，因為不會所有人同時來領。</p>
        <p>2. 謠言一出，有人先去領；別人看到排隊，就更相信謠言，也趕快去領。「怕銀行倒」本身就會讓銀行倒，這叫「自我實現的預言」。</p>
        <p>3. 現金不夠時，銀行只好賤價賣掉放款，虧得更多。存款保險讓存款人不必搶第一個領，所以能讓擠兌冷下來。</p>
      </details>
    </div>
  );
}
