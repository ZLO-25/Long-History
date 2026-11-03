// public/index.json 的型別（由 scripts/build-index.ts 產生）
export type CardType = 'war' | 'commodity' | 'event' | 'building' | 'tech' | 'finance' | 'social' | 'person';

export interface Source { id: string; title: string; url: string; accessed: string; tier?: string; tier_guess?: boolean }
export interface Location {
  name_ancient: string; name_modern: string; lat: number; lng: number;
  pleiades_id?: string; precision: string; role?: string; key: string;
  /** 人物卡：他哪一年在這裡（地圖依年份連成人生軌跡） */
  year?: number;
}
// 深入專題：人物卡
export type RelationKind = '主從' | '同盟' | '聯姻' | '敵對' | '背叛' | '師友' | '親屬';
export interface Relation { id: string; kind: RelationKind; from?: number; to?: number; note: string; sources: CauseSource[] }
export interface Person { role: string; faction?: string; name_romaji: string }
export interface Section {
  code: string; title: string; level: 'core' | 'deep' | 'optional';
  role: 'lens' | 'today_hook' | 'non_analogous' | null;
  text: string; unknown: boolean;
  sub: Record<string, { text: string; refs: string[]; unknown: boolean }> | null;
}
export interface Card {
  id: string; type: CardType; typeLabel: string; name: string; aliases: string[];
  /** 卡片上顯示的別名順序：最有名的在前、去掉和卡名相同的、簡體寫法放最後；畫面先顯示兩行，其他收在「更多」 */
  aliases_show: string[];
  civilization: string[]; civPaths: string[]; track: 'china' | 'west' | 'east' | 'other';
  time: { start: number; end: number; precision: string };
  summary_line: string;
  place: { primary_field: string; secondary_fields: string[]; locations: Location[]; scale: string };
  routes: string[]; structure_tags: string[]; topics: string[]; links: string[]; frameworks: string[];
  summary_card: boolean;
  counterparts: { id: string; note: string; src: string[] }[]; counterparts_none: string; counterpart_of: string[];
  sources: Source[]; verification: string; lens_status: string;
  sections: Section[]; completeness: number; today_hook: string; non_analogous: string;
  lens: { lilu: string; harari: string };
  unknownFields: string[]; file: string;
  issues: { level: 'error' | 'warning'; msg: string }[];
  backlinks: string[];
  /** 前因（從哪裡來）與後果（往哪裡去）：docs/causes.md */
  causes: CauseLink[]; effects: CauseLink[];
  importance: 1 | 2 | 3;
  learn: Learn | null;
  /** 人物卡才有 */
  person: Person | null; relations: Relation[];
}

// 前因／後果：id＝對方卡片（null＝尚無卡片，只有 name）
export type CauseRel = '直接引發' | '促成' | '背景' | '回應';
export interface CauseSource { card: string; id: string; title: string; url: string }
export interface CauseLink { id: string | null; name: string; rel: CauseRel; why: string; disputed: boolean; sources: CauseSource[] }
// 故事線：每一站的 bridge＝到下一站的因果關係（最後一站為 null）
export interface Storyline { id: string; title: string; question: string; blurb: string; stops: { id: string; bridge: Omit<CauseLink, 'id' | 'name'> | null }[] }

// 第 6 期：學習模式
export type LearnTrack = '臺灣' | '東亞' | '世界';
export interface Learn {
  histories: string[]; track: LearnTrack; understand: string[];
  perspectives?: { history: string; text: string }[];
  why_care: string; story: string;
  key_terms: { term: string; plain: string; example: string }[];
  primary_source: { text: string; from: string; src: string | string[] }[];
  historiography: string; money_scale?: string; misconceptions?: string[]; hindsight?: string; exaggerated?: string;
  crosscheck: { date: string; by: string; result: string; notes?: string };
}
export interface History {
  id: string; name: string; track: '臺灣' | '東亞' | '世界' | '全部' | '專題';
  civs?: string[]; theme?: CardType[]; all?: boolean; blurb?: string;
}
export type Step =
  | { type: 'hook'; text: string }
  | { type: 'card'; id: string; depth: 'story' | 'understand' | 'deep'; prompt?: string }
  | { type: 'source'; card: string; idx?: number; question: string; options: string[]; answer: number; explain: string; hints: string[]; ref?: string }
  | { type: 'chain'; prompt: string; items: string[]; explain: string; hints: string[]; ref?: string }
  | { type: 'compare'; cards: [string, string]; prompt?: string; rows: { aspect: string; a: string; b: string }[]; question: string; model_answer: string; hints: string[] }
  | { type: 'decision'; role: string; situation: string; options: { label: string; result: string }[]; actual: string; ref: string; note?: string }
  | { type: 'today'; card: string; question: string; model_answer: string }
  | { type: 'sim'; sim: 'debase' | 'bankrun' | 'bubble'; prompt?: string }
  | { type: 'check'; items: CheckItem[] }
  | { type: 'recap'; model_answer: string };
export interface CheckItem {
  kind: 'choice' | 'order' | 'short'; q: string; options?: string[]; answer?: number; items?: string[]; model?: string;
  explain: string; hints: string[]; ref?: string;
}
export interface Unit {
  id: string; title: string; histories: string[]; mystery: string; goals: string[]; minutes: number;
  steps: Step[]; next: string[]; teaser?: string;
  /** 回顧後的「回到自己」反思題：把這段歷史的選擇連到學生自己的生活（不放新史實） */
  reflect?: string;
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
export interface TagCategory { name: string; tags: { tag: string; def: string; plain?: string; example?: string }[] }
// 主題標籤（data/topics.yaml）：cards 已依開始年份排好，就是這個主題的歷史路徑
export interface Topic { name: string; plain: string; path: string; see: string[]; cards: string[] }
export interface TopicLayer { name: string; icon: string; topics: Topic[] }
export interface CivNode { name: string; path: string; children: CivNode[] }
// 深入專題（data/dives/*.yaml）：把一段時代的卡片、人物、故事線、勢力圖聚在一起（docs/dives.md）
export interface PowerMap { year: number; file: string; title: string; note: string; sources: Source[]; powers: { name: string; en: string; color: string; provinces: string; card: string | null }[] }
export interface Dive {
  id: string; title: string; question: string; blurb: string; range: { start: number; end: number }; histories: string[];
  lanes: { name: string; types: string[] }[]; cards: string[]; storylines: string[]; units: string[]; power_maps: PowerMap[];
}
export interface Index {
  generated: string; cards: Card[]; tagCategories: TagCategory[]; topicLayers: TopicLayer[]; fieldOptions: string[];
  civTree: CivNode[]; frameworks: Framework[]; routes: Route[];
  borders: { source: string; license: string; note: string; snapshots: { year: number; file: string }[] };
  itinere: boolean;
  econ: Econ; chains: Chain[]; today: Today;
  histories: History[]; units: Unit[]; storylines: Storyline[]; dives?: Dive[];
  // 地圖名稱中英對照（data/labels/names-en.yaml）
  names?: { en: Record<string, string>; zh: Record<string, string> };
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
