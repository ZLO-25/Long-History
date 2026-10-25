// public/index.json 的型別（由 scripts/build-index.ts 產生）
export type CardType = 'war' | 'commodity' | 'event' | 'building';

export interface Source { id: string; title: string; url: string; accessed: string }
export interface Location {
  name_ancient: string; name_modern: string; lat: number; lng: number;
  pleiades_id?: string; precision: string; role?: string; key: string;
}
export interface Section {
  code: string; title: string; level: 'core' | 'deep' | 'optional';
  role: 'lens' | 'today_hook' | 'non_analogous' | null;
  text: string; unknown: boolean;
  sub: Record<string, { text: string; refs: string[]; unknown: boolean }> | null;
}
export interface Card {
  id: string; type: CardType; typeLabel: string; name: string; aliases: string[];
  civilization: string[]; track: 'china' | 'west' | 'other';
  time: { start: number; end: number; precision: string };
  summary_line: string;
  place: { primary_field: string; secondary_fields: string[]; locations: Location[]; scale: string };
  routes: string[]; structure_tags: string[]; links: string[]; frameworks: string[];
  summary_card: boolean;
  counterparts: { id: string; note: string; src: string[] }[]; counterparts_none: string; counterpart_of: string[];
  sources: Source[]; verification: string; lens_status: string;
  sections: Section[]; completeness: number; today_hook: string; non_analogous: string;
  lens: { lilu: string; harari: string };
  unknownFields: string[]; file: string;
  issues: { level: 'error' | 'warning'; msg: string }[];
  backlinks: string[];
}
export interface Route {
  id: string; name: string; kind: 'road' | 'sea' | 'wall'; start: number; end: number;
  precision: string; note?: string; coords: [number, number][]; sources: Source[];
  method: 'awmc-road' | 'awmc-wall' | 'sea' | 'stations';
  segments: { kind: 'known' | 'approx' | 'gap' | 'unknown'; coords: [number, number][] }[];
  stations: { name: string; lat: number; lng: number }[];
  stats: { km: number; known_pct?: number; approx_pct?: number; gap_km?: number; max_snap_km?: number };
}
export interface Framework {
  id: string; name: string; trigger_tags: string[]; summary: string;
  critiques: { text: string; src: string[] }[]; sources: Source[];
}
export interface TagCategory { name: string; tags: { tag: string; def: string }[] }
export interface Index {
  generated: string; cards: Card[]; tagCategories: TagCategory[]; fieldOptions: string[];
  frameworks: Framework[]; routes: Route[];
  borders: { source: string; license: string; note: string; snapshots: { year: number; file: string }[] };
  itinere: boolean;
  econ: Econ; chains: Chain[]; today: Today;
}

export interface Filters { types: CardType[]; fields: string[]; civs: string[] }

// 第 3 期：經濟曲線與物資鏈
export interface EconPoint {
  entity: string; start: number; end: number; value?: number; low?: number; high?: number;
  src: string[]; note: string; verification: string;
}
export interface EconSeries {
  id: string; metric: string; name: string; kind: string; verification: string; note: string;
  points: EconPoint[]; sources: Source[];
}
export interface Econ { metrics: { id: string; name: string; unit: string; scale: 'log' | 'linear' }[]; series: EconSeries[] }
export interface ChainStep { name: string; lat: number; lng: number; role: string; text: string; via?: string; src: string[]; sources: Source[] }
export interface Chain {
  id: string; card: string; name: string; start: number; end: number; steps: ChainStep[];
  today?: boolean; data_as_of?: string; stale?: boolean; counterparts?: string[]; chokepoints?: string[];
  legs: { via: string | null; km: number; parts: { kind: 'route' | 'schematic'; coords: [number, number][] }[] }[];
}

// 第 4 期：今日對照層
export interface TodayPoint {
  id: string; name: string; lat: number; lng: number; precision: string; data_as_of: string; stale: boolean;
  verification: string; structure_tags: string[];
  facts: { text: string; sources: Source[] }[];
  events: { date: string; text: string; sources: Source[] }[];
  counterparts: { id: string; note: string; sources: Source[] }[];
  non_analogous: string;
}
export interface Today { stale_months: number; chokepoints: TodayPoint[]; chains: Chain[] }
