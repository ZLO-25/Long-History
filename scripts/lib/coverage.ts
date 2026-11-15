// 首頁「這個網站目前講得深的、還沒有的」（review #26）：名單來自 data/coverage.yaml，課數、卡數、深入專題數在這裡依實際資料算。
import { readYaml } from './cards.ts';
import { historyId } from './learn.ts';

export interface CoverageItem { label: string; units: number; cards: number; dives?: number }
export interface Coverage {
  title: string; note: string;
  totals: { units: number; cards: number; dives: number; storylines: number };
  deep: CoverageItem[]; gaps: CoverageItem[];
}

export function buildCoverage(histories: any[], cards: any[], units: any[], dives: any[], storylines: any[]): Coverage {
  const cfg: any = readYaml('data/coverage.yaml') ?? {};
  const learn = cards.filter((c) => c.learn);
  const unitsOf = (hid: string) => units.filter((u) => (u.histories ?? []).some((k: string) => historyId(histories, k) === hid));
  const stepCards = (u: any) => new Set<string>((u.steps ?? []).map((s: any) => s.card).filter(Boolean));
  const deep: CoverageItem[] = (cfg.deep ?? []).map((d: any) => {
    const h = histories.find((x) => x.id === d.history);
    if (!h) throw new Error(`coverage.yaml：找不到史 ${d.history}`);
    return {
      label: d.label ?? h.name, units: unitsOf(h.id).length,
      cards: learn.filter((c) => c.learn.histories.includes(h.id)).length,
      dives: dives.filter((v) => (v.histories ?? []).some((k: string) => historyId(histories, k) === h.id)).length,
    };
  });
  const gaps: CoverageItem[] = (cfg.gaps ?? []).map((g: any) => {
    if (g.history) {
      const h = histories.find((x) => x.id === g.history);
      if (!h) throw new Error(`coverage.yaml：找不到史 ${g.history}`);
      return { label: g.label ?? h.name, units: unitsOf(h.id).length, cards: learn.filter((c) => c.learn.histories.includes(h.id)).length };
    }
    const ids = new Set<string>(g.card_ids ? learn.filter((c) => g.card_ids.includes(c.id)).map((c) => c.id)
      : learn.filter((c) => (c.civPaths ?? []).some((p: string) => p === g.civ_path || p.startsWith(`${g.civ_path}/`))).map((c) => c.id));
    if (!g.card_ids && !g.civ_path) throw new Error(`coverage.yaml：${g.label} 要寫 history、civ_path 或 card_ids`);
    return { label: g.label, cards: ids.size, units: units.filter((u) => [...stepCards(u)].some((id) => ids.has(id))).length };
  });
  return {
    title: cfg.title ?? '', note: cfg.note ?? '',
    totals: { units: units.length, cards: learn.length, dives: dives.length, storylines: storylines.length },
    deep, gaps,
  };
}
