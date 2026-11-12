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
export interface CardImage { url: string; page: string; title: string; creator: string; year: string; holder?: string; license: string; caption: string; /** 原圖寬高（建置時從 data/image-sizes.json 帶入），用來預留位置 */ w?: number; h?: number }
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
  images: CardImage[];
}

// 前因／後果：id＝對方卡片（null＝尚無卡片，只有 name）
export type CauseRel = '直接引發' | '促成' | '背景' | '回應';
export interface CauseSource { card: string; id: string; title: string; url: string }
export interface CauseLink { id: string | null; name: string; rel: CauseRel; why: string; disputed: boolean; sources: CauseSource[] }
// 故事線：每一站的 bridge＝到下一站的因果關係（最後一站為 null）
/** 故事線的故事（data/stories/）：閱讀時間、字數、入口引子；全文另外下載 */
export interface StoryRead { minutes: number; chars: number; hook: string }
export interface Storyline { id: string; title: string; question: string; blurb: string; stops: { id: string; bridge: Omit<CauseLink, 'id' | 'name'> | null }[]; read?: StoryRead | null }
/** public/data/stories/<id>.json：內文裡的出處寫成 [^n]，n 是 sources 的第 n 筆；**粗體** 是關鍵詞 */
export interface StoryDoc extends StoryRead {
  id: string; remember: string[]; think: string[]; recall?: { q: string; a: string }[];
  sections: { title: string; cards: string[]; blocks: { kind: 'p' | 'quote' | 'key'; text: string }[] }[];
  sources: { card: string; cardName: string; title: string; url: string }[];
}

// 第 6 期：學習模式
export type LearnTrack = '臺灣' | '東亞' | '世界';
export interface Learn {
  histories: string[]; track: LearnTrack; understand: string[];
  perspectives?: { history: string; text: string }[];
  why_care: string; story: string;
  key_terms: { term: string; plain: string; example: string }[];
  primary_source: { text: string; from: string; src: string | string[] }[];
  historiography: string; money_scale?: string; misconceptions?: string[]; hindsight?: string; exaggerated?: string;
  pop_culture?: { claim: string; fact: string; src?: string[] | string }[];
  crosscheck: { date: string; by: string; result: string; notes?: string };
}
export interface History {
  id: string; name: string; track: '臺灣' | '東亞' | '世界' | '全部' | '專題';
  civs?: string[]; theme?: CardType[]; all?: boolean; blurb?: string;
  /** 只有 home.json 有：這個史的學習卡張數（首頁在 index.json 還沒到時顯示用，之後改由卡片算） */
  n?: number;
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
  /** 看人群圖層的一頁（'Taiwan'、'about'、'migrations'、'mig-<id>'、國名）：資料有自己的來源（data/peoples/） */
  | { type: 'peoples'; id: string; prompt: string }
  | { type: 'check'; items: CheckItem[] }
  | { type: 'recap'; model_answer: string };
export interface CheckItem {
  kind: 'choice' | 'order' | 'short'; q: string; options?: string[]; answer?: number; items?: string[]; model?: string;
  explain: string; hints: string[]; ref?: string;
}
export interface Unit {
  id: string; title: string; histories: string[]; mystery: string; goals: string[]; minutes: number;
  steps: Step[]; next: string[]; teaser?: string;
  /** 只有 home.json 有：步驟數（骨架單元的 steps 是空的；首頁「第 n／N 步」用） */
  nsteps?: number;
  /** 回顧後的「回到自己」反思題：把這段歷史的選擇連到學生自己的生活（不放新史實） */
  reflect?: string;
}
export interface Route {
  id: string; name: string; kind: 'road' | 'sea' | 'wall' | 'migration'; start: number; end: number;
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
export interface Topic {
  name: string; plain: string; path: string; see: string[]; cards: string[];
  /** 只有 home.json 有（cards 是空的）：全部張數、學習卡張數 */
  n?: number; nl?: number;
}
export interface TopicLayer { name: string; icon: string; topics: Topic[] }
export interface CivNode { name: string; path: string; children: CivNode[] }
// 深入專題（data/dives/*.yaml）：把一段時代的卡片、人物、故事線、勢力圖聚在一起（docs/dives.md）
export interface PowerMap { year: number; file: string; view: [[number, number], [number, number]] | null; title: string; note: string; sources: Source[]; powers: { name: string; en: string; color: string; provinces: string; card: string | null; minor?: boolean }[] }
/** 專題主視覺（勢力圖／領土圖）的畫面文字，由 data/dives/<專題>.yaml 的 power_ui 決定 */
export interface PowerUi { title: string; subtitle?: string; caveat?: string; legend?: string }
export interface Dive {
  id: string; title: string; question: string; blurb: string; range: { start: number; end: number }; histories: string[];
  lanes: { name: string; types: string[] }[]; cards: string[]; storylines: string[]; units: string[]; power_maps: PowerMap[];
  /** 打開專題時跳到的年份（沒有勢力圖的專題用） */
  focus_year?: number;
  /** 讀書專題（例如《人類大歷史》）：書分幾部、每章一站 */
  book?: DiveBook | null;
  visual: 'power' | 'curve' | 'none'; power_ui: PowerUi | null;
  /** visual: curve 的曲線資料 */
  curves?: DiveCurves | null;
  /** 只有 home.json 有（cards、power_maps 等是空的）：專題入口卡要顯示的數字 */
  stat?: { cards: number; persons: number; power: number; curves: number; chapters: number };
}
export interface DiveCurveSeries { id: string; name: string; unit: string; color: string; note: string; zero: boolean | null; points: [number, number][]; src: string[] }
export interface DiveCurves { title: string; subtitle: string; caveat: string; series: DiveCurveSeries[]; events: { year: number; label: string; card?: string }[]; sources: DiveSource[] }
export interface DiveSource { id: string; title: string; url: string; accessed: string; tier?: string }
export interface DivePart { no: number; name: string; span: string; blurb: string; from: number; to: number; unit?: string }
export interface DiveChapter { no: number; part: number; title: string; en: string; /** 中文版（天下文化，林俊宏 譯）章名 */ zh: string; claim: string; cards: string[]; card_notes: Record<string, string>; debate: { who: string; text: string; src: string[]; stance: '' | '支持' | '補充' | '反對' }[]; think: string; core: boolean; minutes: number | null }
export interface DiveBook { title: string; author: string; note: string; parts: DivePart[]; chapters: DiveChapter[]; sources: DiveSource[] }
export interface Index {
  generated: string; cards: Card[]; tagCategories: TagCategory[]; topicLayers: TopicLayer[]; fieldOptions: string[];
  civTree: CivNode[]; frameworks: Framework[]; routes: Route[];
  borders: { source: string; license: string; note: string; snapshots: { year: number; file: string }[] };
  itinere: boolean;
  econ: Econ; chains: Chain[]; today: Today;
  histories: History[]; units: Unit[]; storylines: Storyline[]; dives?: Dive[];
  // 地圖名稱中英對照（data/labels/names-en.yaml）
  names?: { en: Record<string, string>; zh: Record<string, string> };
  /** 卡片長內文（index-detail.json）是否已併入；false 時 sections／sources／causes／effects／aliases_show／images／counterparts_none 與學習卡全文暫時是空的 */
  detailReady?: boolean;
  /** index-detail.json 的內容雜湊（網址 ?v= 用；內文沒變就不必重抓）。scripts/build-index.ts 產生 */
  detailV?: string;
  /** 長內文載入進度（src/lib/detail.ts）：單張卡／單元的小檔先到時記在這裡；all＝整包都到了。各次 setIndex 之間共用同一個物件 */
  detailLoaded?: DetailState;
  /** false＝只有 home.json 的骨架（首頁、清單頁要用的小欄位；cards 是空的），完整的 index.json 還沒到。沒有這個欄位（或 true）＝完整。見 src/lib/detail.ts */
  coreReady?: boolean;
  /** index.json 抓不到（重試後仍失敗） */
  coreFailed?: boolean;
}

/** public/home.json：學習首頁與清單頁（故事線、深入專題、主題標籤）畫得出來、點得動所需的最小資料，不含任何一張卡片。scripts/build-index.ts 產生 */
export interface HomeData {
  generated: string; detailV?: string;
  histories: History[];
  units: (Pick<Unit, 'id' | 'title' | 'histories' | 'mystery' | 'minutes'> & { nsteps: number })[];
  storylines: { id: string; title: string; question: string; read: StoryRead | null; stops: string[] }[];
  dives: (Pick<Dive, 'id' | 'title' | 'question' | 'range' | 'histories' | 'units' | 'visual' | 'focus_year'> & { power_title?: string; stat: NonNullable<Dive['stat']> })[];
  topicLayers: { name: string; icon: string; topics: { name: string; plain: string; n: number; nl: number }[] }[];
}
export interface DetailState { cards: Set<string>; units: Set<string>; all: boolean; failed: boolean }

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
