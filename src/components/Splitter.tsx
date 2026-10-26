// 可拖曳的分隔線：滑鼠／觸控拖、鍵盤方向鍵微調（每次 24px）、連點兩下恢復預設
import { useRef } from 'react';

interface Props {
  dir: 'col' | 'row';               // col＝左右分隔（調寬度）、row＝上下分隔（調高度）
  // 拖的時候，分隔線往「正方向」移動代表目標區塊變大還是變小。
  // 例：研究模式右欄在分隔線右邊，往左拖（x 變小）右欄變大 → grow='neg'
  grow: 'pos' | 'neg';
  measure: () => number;            // 目前目標區塊的實際大小（px），拖曳一開始時量
  min: number; max: () => number;   // 可調範圍（px）
  onChange: (px: number) => void;
  onReset: () => void;
  label: string;
}
export function Splitter({ dir, grow, measure, min, max, onChange, onReset, label }: Props) {
  const start = useRef<{ pos: number; size: number } | null>(null);
  const clamp = (v: number) => Math.round(Math.min(max(), Math.max(min, v)));
  const sign = grow === 'pos' ? 1 : -1;
  const onDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    start.current = { pos: dir === 'col' ? e.clientX : e.clientY, size: measure() };
    document.body.classList.add(dir === 'col' ? 'dragging-col' : 'dragging-row');
  };
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!start.current) return;
    const pos = dir === 'col' ? e.clientX : e.clientY;
    onChange(clamp(start.current.size + sign * (pos - start.current.pos)));
  };
  const onUp = () => { start.current = null; document.body.classList.remove('dragging-col', 'dragging-row'); };
  const onKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const k = e.key;
    const more = dir === 'col' ? (k === 'ArrowRight' ? sign : k === 'ArrowLeft' ? -sign : 0) : (k === 'ArrowDown' ? sign : k === 'ArrowUp' ? -sign : 0);
    if (more) { e.preventDefault(); onChange(clamp(measure() + more * 24)); }
    else if (k === 'Home' || k === 'End' || k === 'Backspace' || k === 'Delete') { e.preventDefault(); onReset(); }
  };
  return (
    <div className={`splitter ${dir}`} role="separator" tabIndex={0} aria-orientation={dir === 'col' ? 'vertical' : 'horizontal'} aria-label={label}
      title={`${label}：拖曳調整，連點兩下恢復預設`}
      onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp} onDoubleClick={onReset} onKeyDown={onKey}>
      <span className="grip" aria-hidden />
    </div>
  );
}
