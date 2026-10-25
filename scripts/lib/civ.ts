// 文明分類樹：把卡片 civilization 的各種寫法對應到「地區/文明/時期」路徑（規則見 data/civilizations.yaml）
import { readYaml } from './cards.ts';

export interface CivNode { name: string; path: string; children: CivNode[] }
interface Tax {
  regions: { name: string; civs: { name: string; aliases?: string[]; periods?: string[] }[] }[];
  map?: Record<string, string[]>;
}

export function loadCivTaxonomy() {
  const tax: Tax = readYaml('data/civilizations.yaml');
  const civPath = new Map<string, string>(); // 文明名或別名 → 地區/文明
  const periodPath = new Map<string, string>(); // 「文明/時期」或單獨時期名 → 地區/文明/時期
  const tree: CivNode[] = tax.regions.map((r) => ({
    name: r.name, path: r.name,
    children: r.civs.map((c) => {
      const cp = `${r.name}/${c.name}`;
      for (const n of [c.name, ...(c.aliases ?? [])]) civPath.set(n, cp);
      return {
        name: c.name, path: cp,
        children: (c.periods ?? []).map((p) => {
          const pp = `${cp}/${p}`;
          periodPath.set(`${c.name}/${p}`, pp);
          if (!periodPath.has(p)) periodPath.set(p, pp);
          return { name: p, path: pp, children: [] };
        }),
      };
    }),
  }));
  const resolveOne = (s: string) => civPath.get(s) ?? periodPath.get(s);
  // 回傳此寫法對應的路徑；對不上回傳空陣列
  const resolve = (raw: string): string[] => {
    const mapped = tax.map?.[raw];
    if (mapped) return mapped.map((m) => resolveOne(m)).filter((x): x is string => !!x);
    const direct = resolveOne(raw);
    if (direct) return [direct];
    const m = raw.match(/^(.+?)（(.+)）$/);
    if (m) {
      const p = periodPath.get(`${m[1]}/${m[2]}`) ?? (civPath.has(m[1]) ? periodPath.get(m[2]) : undefined);
      if (p && p.startsWith(civPath.get(m[1]) ?? '\u0000')) return [p];
      if (civPath.has(m[1])) return [civPath.get(m[1])!];
    }
    return [];
  };
  // map 內寫錯的路徑也要能被抓出來
  const badMap = Object.entries(tax.map ?? {}).flatMap(([k, v]) => v.filter((m) => !resolveOne(m)).map((m) => `${k} → ${m}`));
  return { tree, resolve, badMap };
}
