// 研究模式外殼（App.tsx ResearchShell）在完整資料還沒到時收集的操作：搜尋字、篩選、點了哪個入口。Main 掛載時接手
import type { Filters } from '../types';

export type PrePanel = { kind: 'stories' } | { kind: 'dives' } | { kind: 'topics' } | { kind: 'match' };
export interface Pre { query: string; filters: Filters; panel: PrePanel | null; /** 搜尋框正有游標：Main 掛載後把游標還給它 */ focus?: boolean }
export const emptyPre = (): Pre => ({ query: '', filters: { types: [], fields: [], civs: [] }, panel: null });
