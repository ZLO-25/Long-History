// 三個區塊的「停靠／浮動／新視窗」外框
//
//   每個區塊有三種狀態：
//   ┌─────────┐   ▣ 浮動    ┌─────────┐   ⧉ 新視窗   ┌──────────────┐
//   │ 停在格線 │ ────────▶ │ 頁面裡的 │ ──────────▶ │ 另一個瀏覽器  │
//   │（可換位置）│ ◀──────── │ 浮動小窗 │ ◀────────── │ 視窗          │
//   └─────────┘   ⊟ 放回    └─────────┘  ↩ 放回／關窗 └──────────────┘
//
// 效能：拖曳、縮放浮動小窗時直接改 DOM 的 style（不經過 React 重畫），放開滑鼠才存一次。
// 三種狀態都是同一棵 React 樹、同一份狀態，資料自然連動；浮動小窗連 DOM 都沒搬家，地圖不會重建。
import { useCallback, useMemo, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { Splitter } from './Splitter';
import { dockGrid, SLOTS, usePopouts, validOrder, type Slot } from '../lib/dock';
import { rowSize, type useLayout, type Geo, type Layout } from '../lib/layout';

type Mode = 'r' | 'l';
const KEYS = {
  r: { order: 'rOrder', float: 'rFloat', col: 'rPanel', row: 'rTl' },
  l: { order: 'lOrder', float: 'lFloat', col: 'lContent', row: 'lTl' },
} as const;

// L：呼叫端唯一的一份 useLayout()（同一頁只能有一份，不然兩份會互相覆蓋 localStorage）
export function useDock<T extends string>(mode: Mode, def: readonly T[], L: ReturnType<typeof useLayout>) {
  const { layout, set, reset } = L;
  const k = KEYS[mode];
  const order = useMemo(() => validOrder<T>(layout[k.order], def), [layout, k, def]);
  const float = (layout[k.float] ?? {}) as Partial<Record<T, Geo>>;
  const { wins, popOut, dock: unpop, dockAll } = usePopouts<T>();
  const setFloat = useCallback((id: T, g: Geo | null) => {
    const cur = { ...((layout[k.float] ?? {}) as Record<string, Geo>) };
    if (g) cur[id] = g; else delete cur[id];
    set({ [k.float]: cur } as Partial<Layout>);
  }, [layout, k, set]);
  const swap = useCallback((a: T, slot: Slot) => {
    const o = [...order]; const i = o.indexOf(a), j = SLOTS.indexOf(slot);
    if (i < 0 || i === j) return;
    [o[i], o[j]] = [o[j], o[i]];
    set({ [k.order]: o } as Partial<Layout>);
  }, [order, k, set]);
  const customized = layout[k.col] != null || layout[k.row] != null || layout[k.order] != null
    || Object.keys(float).length > 0 || Object.keys(wins).length > 0;
  // ⟲ 版面：大小、位置、浮動小窗、彈出視窗全部恢復預設
  const resetAll = useCallback(() => { dockAll(); reset([k.col, k.row, k.order, k.float] as (keyof Layout)[]); }, [dockAll, reset, k]);
  return { mode, layout, set, reset, order, float, wins, popOut, unpop, setFloat, swap, customized, resetAll, def };
}
export type DockState<T extends string> = ReturnType<typeof useDock<T>>;

export interface PanelDef { title: string; cls: string; node: ReactNode; extra?: ReactNode }

interface LayoutProps<T extends string> {
  dock: DockState<T>;
  panels: Record<T, PanelDef>;
  mainClass: string;
  colA: (px?: number) => string;          // a 欄寬
  colB: (px?: number) => string;          // b 欄寬
  colSized: 'a' | 'b';                     // 左右分隔線調的是哪一欄
  colMin: number; colMaxPct: number;
  rowCDefault: (id: T) => string;          // c 列預設高度（依放在 c 的是哪個區塊）
  cCollapsed?: (id: T) => boolean;         // c 的區塊是否收起（時間軸收合）
  popRoot: { className: string; style?: React.CSSProperties };
  emptyNote?: ReactNode;
}

export function DockLayout<T extends string>(props: LayoutProps<T>) {
  const { dock, panels, colSized, colMin, colMaxPct } = props;
  const k = KEYS[dock.mode];
  const mainRef = useRef<HTMLElement>(null);
  const where = (id: T): 'dock' | 'float' | 'pop' => (dock.wins[id] ? 'pop' : dock.float[id] ? 'float' : 'dock');
  const present = { a: where(dock.order[0]) === 'dock', b: where(dock.order[1]) === 'dock', c: where(dock.order[2]) === 'dock' };
  const cId = dock.order[2];
  const collapsed = present.c && !!props.cCollapsed?.(cId);
  const rowPx = dock.layout[k.row] as number | undefined;
  const colPx = dock.layout[k.col] as number | undefined;
  const cDef = props.rowCDefault(cId);
  const rowC = collapsed ? 'auto' : rowSize(rowPx, cDef);
  const g = dockGrid({ present, colA: props.colA(colPx), colB: props.colB(colPx), rowC, cIsAuto: rowC === 'auto' });
  const slotEl = (s: Slot) => mainRef.current?.querySelector<HTMLElement>(`:scope > .dock-cell[data-slot="${s}"]`);
  const zs = useRef<T[]>([]);
  const front = (id: T, el: HTMLElement) => {
    zs.current = [...zs.current.filter((x) => x !== id), id];
    mainRef.current?.querySelectorAll<HTMLElement>(':scope > .dock-cell.floating').forEach((c) => { c.style.zIndex = String(30 + zs.current.indexOf(c.dataset.panel as T)); });
    el.style.zIndex = String(30 + zs.current.length);
  };

  const toFloat = (id: T, el: HTMLElement | null) => {
    const m = mainRef.current!.getBoundingClientRect(), r = el?.getBoundingClientRect() ?? m;
    const w = Math.round(Math.max(320, Math.min(r.width, m.width * 0.6))), h = Math.round(Math.max(200, Math.min(Math.max(r.height, 220), m.height * 0.6)));
    const x = Math.round(Math.min(Math.max(0, r.left - m.left + 30), m.width - w)), y = Math.round(Math.min(Math.max(0, r.top - m.top + 30), m.height - h));
    dock.setFloat(id, { x, y, w, h });
  };

  return (
    <main ref={mainRef} className={`${props.mainClass} dock-main ${g.cFull ? 'c-full' : ''}`} style={g.style}>
      {g.showCol && <Splitter dir="col" grow={colSized === 'b' ? 'neg' : 'pos'} label={`調整${panels[dock.order[colSized === 'a' ? 0 : 1]].title}寬度`} min={colMin}
        max={() => (mainRef.current?.clientWidth ?? 1200) * colMaxPct / 100}
        measure={() => slotEl(colSized)?.getBoundingClientRect().width ?? 400}
        onChange={(px) => dock.set({ [k.col]: px } as Partial<Layout>)} onReset={() => dock.reset([k.col] as (keyof Layout)[])} />}
      {g.showRow && !collapsed && <Splitter dir="row" grow="neg" label={`調整${panels[cId].title}高度`} min={60} max={() => (mainRef.current?.clientHeight ?? 800) * 0.55}
        measure={() => slotEl('c')?.getBoundingClientRect().height ?? 200}
        onChange={(px) => dock.set({ [k.row]: px } as Partial<Layout>)} onReset={() => dock.reset([k.row] as (keyof Layout)[])} />}
      {g.empty && <div className="dock-empty" style={{ gridArea: 'x' }}>{props.emptyNote ?? '三個區塊都移到其他視窗了。'}<button className="btn" onClick={dock.resetAll}>⟲ 全部放回</button></div>}
      {dock.order.map((id, i) => {
        const slot = SLOTS[i], p = panels[id], st = where(id);
        const bar = (inPopup: boolean) => (
          <DockBar title={p.title} state={inPopup ? 'pop' : st} extra={p.extra}
            onSwap={(s) => dock.swap(id, s)} onKeyMove={(d) => dock.swap(id, SLOTS[(i + d + 3) % 3])}
            onFloat={(el) => toFloat(id, el)} onGeo={(geo) => dock.setFloat(id, geo)} onDock={() => { if (inPopup) dock.unpop(id); else dock.setFloat(id, null); }}
            onPop={(el) => dock.popOut(id, p.title, el)} onFront={(el) => front(id, el)} bounds={() => mainRef.current!.getBoundingClientRect()} />
        );
        const body = <div className={p.cls}>{p.node}</div>;
        if (st === 'pop') {
          const win = dock.wins[id]!;
          return createPortal(
            <div className={props.popRoot.className} style={props.popRoot.style}>
              <div className="dock-cell popped" data-panel={id}>{bar(true)}{body}</div>
            </div>, win.document.body, id);
        }
        const geo = dock.float[id];
        const auto = st === 'dock' && slot === 'c' && rowC === 'auto';
        const style: React.CSSProperties = st === 'float' && geo
          ? { left: `min(${geo.x}px, calc(100% - 160px))`, top: `min(${geo.y}px, calc(100% - 40px))`, width: `min(${geo.w}px, 100%)`, height: `min(${geo.h}px, 100%)` }
          : { gridArea: slot };
        return (
          <div key={id} className={`dock-cell ${st === 'float' ? 'floating' : `slot-${slot}`} ${auto ? 'auto-h' : ''} ${slot === 'c' && collapsed ? 'collapsed' : ''}`}
            data-panel={id} data-slot={st === 'dock' ? slot : undefined} style={style}>
            {bar(false)}{body}
            {st === 'float' && <ResizeGrip onGeo={(geo2) => dock.setFloat(id, geo2)} bounds={() => mainRef.current!.getBoundingClientRect()} />}
          </div>
        );
      })}
    </main>
  );
}

interface BarProps {
  title: string; state: 'dock' | 'float' | 'pop'; extra?: ReactNode;
  onSwap: (s: Slot) => void; onKeyMove: (d: 1 | -1) => void;
  onFloat: (el: HTMLElement | null) => void; onGeo: (g: Geo) => void; onDock: () => void;
  onPop: (el: HTMLElement | null) => void; onFront: (el: HTMLElement) => void;
  bounds: () => DOMRect;
}
function DockBar({ title, state, extra, onSwap, onKeyMove, onFloat, onGeo, onDock, onPop, onFront, bounds }: BarProps) {
  const drag = useRef<{ x: number; y: number; cell: HTMLElement; ox: number; oy: number; moved: boolean; target: HTMLElement | null } | null>(null);
  const cellOf = (e: { currentTarget: Element }) => e.currentTarget.closest('.dock-cell') as HTMLElement;
  const onDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (e.button !== 0 || state === 'pop') return;
    const cell = cellOf(e);
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { x: e.clientX, y: e.clientY, cell, ox: cell.offsetLeft, oy: cell.offsetTop, moved: false, target: null };
    if (state === 'float') onFront(cell);
  };
  const onMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    const d = drag.current; if (!d) return;
    const dx = e.clientX - d.x, dy = e.clientY - d.y;
    if (!d.moved && Math.abs(dx) + Math.abs(dy) < 5) return;
    if (!d.moved) { d.moved = true; document.body.classList.add('dock-dragging'); d.cell.classList.add('dock-src'); }
    if (state === 'float') {
      // 直接改位置，不重畫 React
      const b = bounds();
      d.cell.style.left = `${Math.round(Math.min(Math.max(0, d.ox + dx), b.width - 80))}px`;
      d.cell.style.top = `${Math.round(Math.min(Math.max(0, d.oy + dy), b.height - 30))}px`;
    } else {
      const t = (document.elementFromPoint(e.clientX, e.clientY)?.closest('.dock-cell[data-slot]') as HTMLElement | null) ?? null;
      const target = t && t !== d.cell ? t : null;
      if (target !== d.target) { d.target?.classList.remove('drop-target'); target?.classList.add('drop-target'); d.target = target; }
    }
  };
  const onUp = () => {
    const d = drag.current; drag.current = null; if (!d) return;
    document.body.classList.remove('dock-dragging'); d.cell.classList.remove('dock-src'); d.target?.classList.remove('drop-target');
    if (!d.moved) return;
    if (state === 'float') onGeo({ x: d.cell.offsetLeft, y: d.cell.offsetTop, w: d.cell.offsetWidth, h: d.cell.offsetHeight });
    else if (d.target?.dataset.slot) onSwap(d.target.dataset.slot as Slot);
  };
  const onKey = (e: React.KeyboardEvent) => {
    if (state !== 'dock') return;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); onKeyMove(1); }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); onKeyMove(-1); }
  };
  const tip = state === 'dock' ? `拖到另一個區塊上，兩個交換位置（鍵盤：← →）` : state === 'float' ? '拖曳移動這個小窗' : title;
  return (
    <div className="dock-bar">
      <button className="dock-handle" title={tip} aria-label={`${title}：${tip}`} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp} onKeyDown={onKey}>
        {state !== 'pop' && <span className="grip" aria-hidden>⠿</span>}{title}
      </button>
      <span className="dock-extra">{extra}</span>
      {state === 'dock' && <button className="dock-btn" onClick={(e) => onFloat(cellOf(e))} title="變成頁面裡的浮動小窗，可以自由拖動、拉大小">▣ 浮動</button>}
      {state === 'float' && <button className="dock-btn" onClick={onDock} title="放回原本的位置">⊟ 放回</button>}
      {state !== 'pop' && <button className="dock-btn" onClick={(e) => onPop(cellOf(e))} title="拉出成新的瀏覽器視窗（例如放到第二個螢幕），內容會和這裡同步">⧉ 新視窗</button>}
      {state === 'pop' && <button className="dock-btn" onClick={onDock} title="把這個區塊放回主視窗">↩ 放回主視窗</button>}
    </div>
  );
}

function ResizeGrip({ onGeo, bounds }: { onGeo: (g: Geo) => void; bounds: () => DOMRect }) {
  const s = useRef<{ x: number; y: number; w: number; h: number; cell: HTMLElement } | null>(null);
  return (
    <div className="dock-resize" aria-hidden title="拖曳調整大小"
      onPointerDown={(e) => {
        if (e.button !== 0) return;
        const cell = e.currentTarget.parentElement as HTMLElement;
        e.currentTarget.setPointerCapture(e.pointerId);
        s.current = { x: e.clientX, y: e.clientY, w: cell.offsetWidth, h: cell.offsetHeight, cell };
        document.body.classList.add('dock-dragging');
      }}
      onPointerMove={(e) => {
        const d = s.current; if (!d) return;
        const b = bounds();
        d.cell.style.width = `${Math.round(Math.min(Math.max(240, d.w + e.clientX - d.x), b.width - d.cell.offsetLeft))}px`;
        d.cell.style.height = `${Math.round(Math.min(Math.max(120, d.h + e.clientY - d.y), b.height - d.cell.offsetTop))}px`;
      }}
      onPointerUp={() => {
        const d = s.current; s.current = null; if (!d) return;
        document.body.classList.remove('dock-dragging');
        onGeo({ x: d.cell.offsetLeft, y: d.cell.offsetTop, w: d.cell.offsetWidth, h: d.cell.offsetHeight });
      }} />
  );
}
