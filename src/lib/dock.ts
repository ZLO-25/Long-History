// 三個區塊（例：地圖、卡片欄、時間軸）可以拖曳交換位置、彈出到新視窗，「⟲ 版面」全部復原
//
//   畫面分成三個「位置」：         三個「區塊」放進三個位置（順序記在 localStorage）
//   ┌──────────┬──┬──────┐        研究模式預設 [地圖, 卡片欄, 時間軸]
//   │    a     │sc│  b   │        學習模式預設 [文字欄, 地圖, 時間軸]
//   ├──────────┴──┴──────┤ sr     拖 a 的標題到 b 上 → 兩個區塊互換位置
//   │         c          │        彈出的區塊離開格線，剩下的區塊自動補滿
//   └────────────────────┘
//
// 彈出視窗用 React portal 畫進 window.open 開出的空白視窗：兩邊是同一棵 React 樹、同一份狀態，
// 所以主視窗點了哪張卡、拉到哪一年，彈出的視窗立刻跟著變，不需要另外傳訊息。
import { useCallback, useEffect, useRef, useState } from 'react';

export type Slot = 'a' | 'b' | 'c';
export const SLOTS: Slot[] = ['a', 'b', 'c'];

// 有效的排列：剛好是預設那三個 id 的某種順序；否則（例如舊版或被改壞）用預設
export function validOrder<T extends string>(saved: unknown, def: readonly T[]): T[] {
  if (Array.isArray(saved) && saved.length === def.length && def.every((d) => saved.includes(d))) return saved as T[];
  return [...def];
}

export interface GridSpec {
  style: React.CSSProperties;
  showCol: boolean;     // 左右分隔線（a、b 都在格線裡才有）
  showRow: boolean;     // 上下分隔線（上排、c 都在才有）
  cFull: boolean;       // 只剩 c：c 佔滿整個畫面
  cAuto: boolean;       // c 的高度是 auto（時間軸預設），內容自己決定高度
  empty: boolean;       // 三塊都彈出去了
}

// 依「哪些位置還在格線裡」算出 grid 的欄、列、區域
export function dockGrid(opts: { present: Record<Slot, boolean>; colA: string; colB: string; rowC: string; cIsAuto: boolean }): GridSpec {
  const { present: p, colA, colB, rowC, cIsAuto } = opts;
  const top = p.a || p.b, both = p.a && p.b;
  const topRow = both ? '"a sc b"' : p.a ? '"a"' : p.b ? '"b"' : '';
  const width = both ? 3 : 1;
  const line = (n: string) => `"${Array(width).fill(n).join(' ')}"`;
  let rows: string, areas: string;
  if (top && p.c) { rows = `minmax(0, 1fr) 6px ${rowC}`; areas = `${topRow} ${line('sr')} ${line('c')}`; }
  else if (top) { rows = 'minmax(0, 1fr)'; areas = topRow; }
  else if (p.c) { rows = 'minmax(0, 1fr)'; areas = '"c"'; }
  else { rows = 'minmax(0, 1fr)'; areas = '"x"'; }
  const cols = both ? `${colA} 6px ${colB}` : 'minmax(0, 1fr)';
  return {
    style: { gridTemplateColumns: cols, gridTemplateRows: rows, gridTemplateAreas: areas },
    showCol: both, showRow: top && p.c, cFull: !top && p.c, cAuto: top && p.c && cIsAuto, empty: !top && !p.c,
  };
}

// 彈出視窗清單：每個區塊 id → 它所在的視窗。關掉視窗（按 X 或主視窗重新整理）自動收回
export function usePopouts<T extends string>() {
  const [wins, setWins] = useState<Partial<Record<T, Window>>>({});
  const ref = useRef(wins); ref.current = wins;
  const dock = useCallback((id: T) => setWins((o) => { const w = o[id]; if (!w) return o; const n = { ...o }; delete n[id]; try { w.close(); } catch { /* 已關 */ } return n; }), []);
  const dockAll = useCallback(() => setWins((o) => { for (const w of Object.values(o) as Window[]) { try { w.close(); } catch { /* 已關 */ } } return {}; }), []);
  // 必須在按鈕的 click 裡直接呼叫（瀏覽器只允許使用者動作開視窗）
  const popOut = useCallback((id: T, title: string, from?: Element | null) => {
    const r = from?.getBoundingClientRect();
    const w = Math.round(Math.max(480, Math.min(1400, r?.width ?? 800)));
    const h = Math.round(Math.max(360, Math.min(1000, (r?.height ?? 600) + 40)));
    const win = window.open('', `history-river-${id}`, `popup=yes,width=${w},height=${h}`);
    if (!win) { window.alert('瀏覽器擋下了新視窗。請允許這個網站開啟彈出式視窗，再按一次。'); return; }
    // 等樣式表載完才把區塊畫進去：Leaflet 初始化時會量容器，樣式還沒到就會量成 0 高
    setupWindow(win, title).then(() => {
      if (win.closed) return;
      win.addEventListener('pagehide', () => setWins((o) => (o[id] === win ? (() => { const n = { ...o }; delete n[id]; return n; })() : o)));
      setWins((o) => ({ ...o, [id]: win }));
    });
  }, []);
  // 主視窗關掉或重新整理時，把彈出的視窗一起關掉（不然會留下沒人更新的空殼）
  useEffect(() => {
    const close = () => { for (const w of Object.values(ref.current) as Window[]) { try { w.close(); } catch { /* 已關 */ } } };
    window.addEventListener('pagehide', close);
    return () => { window.removeEventListener('pagehide', close); close(); };
  }, []);
  return { wins, popOut, dock, dockAll };
}

// 新視窗：複製主視窗的樣式表，並把滑鼠事件轉給主視窗的 document
// （Leaflet 拖曳地圖時是在「主視窗的 document」上聽滑鼠移動，不轉的話地圖在新視窗裡拖不動）
function setupWindow(win: Window, title: string): Promise<void> {
  const d = win.document;
  d.documentElement.lang = document.documentElement.lang || 'zh-Hant';
  d.head.innerHTML = '<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">';
  d.title = `${title}｜歷史長河`;
  const loads: Promise<void>[] = [];
  document.querySelectorAll('style, link[rel="stylesheet"]').forEach((n) => {
    const c = n.cloneNode(true) as HTMLElement;
    if (n instanceof HTMLLinkElement) {
      // 最多等 3 秒，載不到也照樣打開
      loads.push(new Promise((ok) => { c.addEventListener('load', () => ok()); c.addEventListener('error', () => ok()); setTimeout(ok, 3000); }));
      (c as HTMLLinkElement).href = n.href; // 換成絕對網址
    }
    d.head.appendChild(c);
  });
  const st = d.createElement('style');
  st.textContent = 'html, body { height: 100%; margin: 0; overflow: hidden; }';
  d.head.appendChild(st);
  d.body.innerHTML = '';
  const fwd = (e: Event) => {
    if (!e.isTrusted) return;
    const E = e instanceof PointerEvent ? window.PointerEvent : window.MouseEvent;
    // 送到主視窗的 body（會冒泡到 document）；Leaflet 會在事件目標上加 class，目標不能是 document 本身
    document.body.dispatchEvent(new E(e.type, e as MouseEventInit));
  };
  for (const t of ['pointerdown', 'pointermove', 'pointerup', 'pointercancel', 'mousemove', 'mouseup']) d.addEventListener(t, fwd, true);
  return Promise.all(loads).then(() => undefined);
}
