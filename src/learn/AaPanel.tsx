// 頁首的「Aa」面板：字級（A−／A＋）與外觀（自動／淺色／深色）。外觀記在 localStorage（src/lib/theme.ts），字級記在學習進度
import { useEffect, useRef, useState } from 'react';
import { THEME_LABEL, useThemePref, type ThemePref } from '../lib/theme';

const fsName = (fs: number) => (fs >= 1.35 ? '特大' : fs >= 1.15 ? '大' : fs >= 0.95 ? '標準' : '小');

export function AaPanel({ fs, setFs }: { fs: number; setFs: (v: number) => void }) {
  const [open, setOpen] = useState(false);
  const [pref, setPref] = useThemePref();
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => { if (!box.current?.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); box.current?.querySelector<HTMLButtonElement>('.aa-btn')?.focus(); } };
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('pointerdown', onDown); document.removeEventListener('keydown', onKey); };
  }, [open]);
  const step = (d: number) => setFs(Math.round(Math.min(1.5, Math.max(0.85, fs + d)) * 100) / 100);
  return (
    <div className="aa-wrap" ref={box}>
      <button className={`btn sm aa-btn ${open ? 'on' : ''}`} onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-controls="aa-panel" aria-haspopup="true"
        title="字級與外觀（淺色、深色）" aria-label={`字級與外觀：字級${fsName(fs)}，外觀${THEME_LABEL[pref]}`}>Aa{fs >= 1.15 ? '+' : ''}</button>
      {open && (
        <div className="aa-panel" id="aa-panel" role="group" aria-label="字級與外觀">
          <div className="aa-row"><span className="aa-h">字級<small>{fsName(fs)}</small></span>
            <span className="aa-seg"><button className="btn sm" onClick={() => step(-0.1)} disabled={fs <= 0.85} aria-label="字變小">A−</button>
              <button className="btn sm" onClick={() => step(0.1)} disabled={fs >= 1.5} aria-label="字變大">A＋</button></span></div>
          <div className="aa-row"><span className="aa-h" id="aa-theme-h">外觀</span>
            <span className="aa-seg" role="radiogroup" aria-labelledby="aa-theme-h">
              {(['auto', 'light', 'dark'] as ThemePref[]).map((v) => <button key={v} role="radio" aria-checked={pref === v} className={`btn sm ${pref === v ? 'on' : ''}`} onClick={() => setPref(v)}>{THEME_LABEL[v]}</button>)}
            </span></div>
          <p className="aa-tip">「自動」會跟著手機或電腦的深色／淺色設定。</p>
        </div>
      )}
    </div>
  );
}
