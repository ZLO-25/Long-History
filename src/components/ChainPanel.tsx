// 物資鏈：節點清單＋播放控制；地圖上的紅點跟著 t 移動
import { useEffect, useRef, useState } from 'react';
import type { Card, Chain } from '../types';
import { fmtRange } from '../lib/format';

const SEC_PER_LEG = 2.5;

export function ChainPanel({ chain, card, t, setT, onOpen }: { chain: Chain; card?: Card; t: number; setT: (t: number) => void; onOpen: (id: string) => void }) {
  const [playing, setPlaying] = useState(false);
  const tRef = useRef(t); tRef.current = t;
  const n = chain.legs.length;
  useEffect(() => {
    if (!playing) return;
    let raf = 0, last = performance.now();
    const tick = (now: number) => {
      const next = Math.min(n, tRef.current + (now - last) / 1000 / SEC_PER_LEG);
      last = now; setT(next);
      if (next >= n) { setPlaying(false); return; }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, n]);
  const at = Math.min(n, Math.round(t * 100) / 100);
  const cur = Math.min(n, Math.floor(at + 0.0001));
  const play = () => { if (t >= n) setT(0); setPlaying(true); };
  return (
    <div className="results chain-panel">
      <h2>{chain.name}</h2>
      <p className="muted">物資鏈・{fmtRange(chain.start, chain.end)}{card && <> ・<button className="link" onClick={() => onOpen(card.id)}>{card.name}</button></>}</p>
      <div className="chain-ctrl">
        {playing ? <button className="btn sm on" onClick={() => setPlaying(false)}>暫停</button> : <button className="btn sm primary" onClick={play}>▶ 播放</button>}
        <button className="btn sm" onClick={() => { setPlaying(false); setT(0); }}>回到起點</button>
        <input type="range" min={0} max={n} step={0.01} value={at} onChange={(e) => { setPlaying(false); setT(Number(e.target.value)); }} aria-label="物資鏈進度" />
      </div>
      <p className="small muted">橘色實線＝沿本庫已畫好的航線或古道；點線＝路線示意（史料沒有留下實際走法，或本庫還沒有那段路線）。</p>
      <ol className="chain-steps">
        {chain.steps.map((s, i) => {
          const leg = i > 0 ? chain.legs[i - 1] : null;
          return (
            <li key={i} className={i === cur ? 'on' : i < cur ? 'done' : ''} onClick={() => { setPlaying(false); setT(i); }}>
              {leg && <div className="leg small muted">↓ {leg.parts.every((p) => p.kind === 'schematic') ? '路線示意' : leg.parts.some((p) => p.kind === 'schematic') ? '部分沿路線、部分示意' : '沿已畫路線'}・約 {leg.km.toLocaleString()} 公里</div>}
              <div><span className="role">{s.role}</span><b>{s.name}</b></div>
              <div className="small">{s.text} {s.sources.map((src) => <a key={src.id} href={src.url} target="_blank" rel="noreferrer" title={src.title} className="ref">[{src.id}]</a>)}</div>
            </li>
          );
        })}
      </ol>
      <h3>來源</h3>
      <ol className="sources">{[...new Map(chain.steps.flatMap((s) => s.sources).map((s) => [s.id + s.url, s])).values()].map((s) =>
        <li key={s.id + s.url}><span className="code">{s.id}</span><a href={s.url} target="_blank" rel="noreferrer">{s.title}</a></li>)}</ol>
    </div>
  );
}
