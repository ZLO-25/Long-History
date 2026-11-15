// 複習與段考共用：一次一題，只給一次機會，答完顯示正解與解析＋「回這一課看」
// 選擇題自己畫（規則和課內不同：只有一次機會）；排序題用課內的 Order，小題用課內的 Quick，不另寫一套
import { useMemo, useState } from 'react';
import type { Index } from '../types';
import { CardImages } from '../components/Images';
import { Order, Quick, shuffleOptions } from './Steps';
import { LLink } from './nav';
import type { RQ } from './review';

export const letterOf = 'ABCDEF';
/** 這題選項在畫面上的順序（和課內 Choice 一樣的洗法，每次一樣） */
export const optionOrder = (options: string[]) => {
  const idx = options.map((_, i) => i);
  return options.some((o) => /以上|上述/.test(o)) ? idx : shuffleOptions(idx, options.join('|'));
};
/** 正解的文字（結果頁、錯題清單用） */
export const answerText = (q: RQ) => (q.kind === 'choice' ? q.options![q.answer!] : q.kind === 'order' ? q.items!.map((x, i) => `${i + 1}. ${x}`).join('　') : q.explain);

export function ReviewQ({ q, uid, index, onResult, onNext, nextLabel }: {
  q: RQ; uid: string; index: Index; onResult: (ok: boolean) => void; onNext: () => void; nextLabel: string;
}) {
  const [res, setRes] = useState<boolean | null>(null);
  const [pick, setPick] = useState<number | null>(null);
  const [rate, setRate] = useState<string | undefined>();
  const order = useMemo(() => (q.kind === 'choice' ? optionOrder(q.options!) : []), [q]);
  const finish = (ok: boolean) => { if (res !== null) return; setRes(ok); onResult(ok); };
  const src = q.card ? index.cards.find((c) => c.id === q.card)?.learn?.primary_source?.[q.idx ?? 0] : undefined;
  const link = <LLink className="link small rq-link" q={{ unit: uid, step: String(q.step) }}>📖 回這一課看（第 {q.step + 1} 步）</LLink>;
  const im = q.image ? index.cards.find((c) => c.id === q.image!.card)?.images?.[q.image.idx] : undefined;
  return (
    <div className="rq">
      {src && <figure className="primary"><blockquote>{src.text}</blockquote><figcaption>— {src.from}</figcaption></figure>}
      {q.quotes?.map((x, k) => <figure key={k} className="primary"><blockquote><b>史料 {k === 0 ? '甲' : '乙'}：</b>{x.text}</blockquote><figcaption>— {x.from}</figcaption></figure>)}
      {im && <CardImages images={[im]} compact />}
      {q.kind === 'choice' && (
        <div className="activity">
          <div className="q">{q.q}</div>
          <div className="options" role="radiogroup">
            {order.map((i, pos) => (
              <button key={i} role="radio" aria-checked={pick === i} disabled={res !== null}
                className={`opt ${res !== null && i === q.answer ? 'right' : ''} ${res !== null && pick === i && i !== q.answer ? 'wrong' : ''}`}
                onClick={() => { setPick(i); finish(i === q.answer); }}>
                <span className="opt-key">{letterOf[pos]}</span>{q.options![i]}
              </button>
            ))}
          </div>
        </div>
      )}
      {q.kind === 'order' && (
        <Order key={q.key} prompt={q.q} items={q.items!} explain="" hints={[]} seed={`${uid}-${q.key}`}
          onRec={(r) => { if (res === null) finish(r.f); }} />
      )}
      {q.kind === 'quick' && <>
        <Quick items={[{ q: q.q, a: q.explain }]} saved={[rate]} onRate={(_, v) => { if (res === null) { setRate(v); finish(v === 'right'); } }} />
        <p className="muted small">只有選「答對」才算過關；「一半」和「沒答對」明天會再出現。</p>
      </>}
      {res !== null && q.kind !== 'quick' && (
        <div className={`feedback ${res ? 'ok' : 'no'}`} aria-live="polite">
          <b>{res ? '✔ 答對了！' : '✘ 這題要再看看。'}</b>
          {q.kind === 'choice' && !res && <p><b>正確答案：</b>{letterOf[order.indexOf(q.answer!)]}．{answerText(q)}</p>}
          {q.kind === 'choice' && !res && pick != null && q.whyWrong?.[pick] && <p>你選的：{q.whyWrong[pick]}</p>}
          {q.kind === 'order' && !res && <p><b>正確順序：</b>{answerText(q)}</p>}
          <p>{q.explain}</p>
          {link}
        </div>
      )}
      {res !== null && q.kind === 'quick' && <p>{link}</p>}
      {res !== null && <div className="row rq-next"><button className="btn primary big" onClick={onNext}>{nextLabel}</button></div>}
    </div>
  );
}
