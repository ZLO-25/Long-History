// 學習單、匯出作答、老師檢視、今天的複習、段考複習：幾個少用的畫面，各自延後載入（React.lazy），不拖慢首頁。LearnApp 只要放這一個元件
import { lazy, Suspense } from 'react';
import type { Index } from '../types';
import type { Progress } from './progress';
import { Skel } from '../ui';

const Worksheet = lazy(() => import('./Worksheet'));
const ExportPage = lazy(() => import('./ExportPage'));
const Teacher = lazy(() => import('./Teacher'));
const ReviewPage = lazy(() => import('./ReviewPage'));
const ExamPage = lazy(() => import('./ExamPage'));

export type ExtraView = { kind: 'sheet'; id: string; key: boolean } | { kind: 'export'; id: string } | { kind: 'teacher' } | { kind: 'review' } | { kind: 'exam'; units: string[] };

export function LearnExtra({ view, index, p, update, onHome }: { view: ExtraView; index: Index; p: Progress; update: (f: (p: Progress) => Progress) => void; onHome: () => void }) {
  return (
    <Suspense fallback={<Skel />}>
      {view.kind === 'sheet' ? <Worksheet index={index} id={view.id} answerKey={view.key} />
        : view.kind === 'export' ? <ExportPage index={index} id={view.id} p={p} update={update} />
          : view.kind === 'review' ? <ReviewPage index={index} p={p} update={update} onHome={onHome} />
            : view.kind === 'exam' ? <ExamPage index={index} p={p} update={update} initial={view.units} />
              : <Teacher index={index} />}
    </Suspense>
  );
}
