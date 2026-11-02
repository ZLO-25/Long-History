// 前因／後果：把卡片上 causes／effects 合併成一張因果圖（docs/causes.md）
import type { RawCard } from './cards.ts';

export type Edge = { from?: string; to?: string; fromName?: string; toName?: string; rel: string; why: string; disputed: boolean; sources: any[]; by: string };
export function buildEdges(raw: RawCard[]): Edge[] {
  const edges: Edge[] = [];
  const srcOf = (holder: any, r: string) => {
    const m = /^([a-z0-9-]+):(s\d+)$/.exec(r);
    const card = m ? m[1] : holder.id, sid = m ? m[2] : r;
    const s = raw.find((x) => x.fm?.id === card)?.fm?.sources?.find((y: any) => y.id === sid);
    return s ? { card, id: sid, title: s.title, url: s.url } : null;
  };
  for (const c of raw) {
    const f = c.fm; if (!f?.id) continue;
    for (const x of f.causes ?? []) edges.push({ from: x.id, fromName: x.id ? undefined : x.name, to: f.id, rel: x.rel, why: x.why, disputed: !!x.disputed, sources: (x.src ?? []).map((r: string) => srcOf(f, r)).filter(Boolean), by: f.id });
    for (const x of f.effects ?? []) edges.push({ from: f.id, to: x.id, toName: x.id ? undefined : x.name, rel: x.rel, why: x.why, disputed: !!x.disputed, sources: (x.src ?? []).map((r: string) => srcOf(f, r)).filter(Boolean), by: f.id });
  }
  // 同一對卡兩邊都寫了：留寫在「結果」那張卡上的（前因通常寫得最仔細），來源合併
  const key = (e: Edge) => `${e.from ?? e.fromName}→${e.to ?? e.toName}`;
  const seen = new Map<string, Edge>();
  for (const e of edges) {
    const k = key(e), old = seen.get(k);
    if (!old) { seen.set(k, e); continue; }
    const keep = old.by === e.to ? old : e.by === e.to ? e : old, other = keep === old ? e : old;
    for (const s of other.sources) if (!keep.sources.some((y: any) => y.card === s.card && y.id === s.id)) keep.sources.push(s);
    keep.disputed = keep.disputed || other.disputed;
    seen.set(k, keep);
  }
  return [...seen.values()];
}
