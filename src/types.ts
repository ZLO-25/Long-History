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
  summary_card: boolean; sources: Source[]; verification: string; lens_status: string;
  sections: Section[]; completeness: number; today_hook: string; non_analogous: string;
  lens: { lilu: string; harari: string };
  unknownFields: string[]; file: string;
  issues: { level: 'error' | 'warning'; msg: string }[];
  backlinks: string[];
}
export interface Route {
  id: string; name: string; kind: 'road' | 'sea' | 'wall'; start: number; end: number;
  precision: string; note?: string; coords: [number, number][]; sources: Source[];
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
}

export interface Filters { types: CardType[]; fields: string[]; civs: string[] }
