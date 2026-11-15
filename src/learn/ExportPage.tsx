// 匯出這一課的作答：一頁可列印、可複製成文字，也能產生「分享碼」貼給老師
// 「回到自己」預設不含；要勾選才放進列印、文字與分享碼
import { useEffect, useState } from 'react';
import type { Index } from '../types';
import type { Progress } from './progress';
import { unitStat } from './level';
import { fmtTime, levelLabel, reportText, rowsOf, yn } from './report';
import { buildPayload, CODE_MAX, encodePayload, teacherLink } from './share';
import { ProfileFields, ProfileLine } from './profile';
import { gotoLearn, LLink } from './nav';
import './extra.css';

async function copyText(t: string, prompt: string): Promise<boolean> {
  try { await navigator.clipboard.writeText(t); return true; } catch { window.prompt(prompt, t); return false; }
}

export default function ExportPage({ index, id, p, update }: { index: Index; id: string; p: Progress; update: (f: (p: Progress) => Progress) => void }) {
  const u = index.units.find((x) => x.id === id);
  const [reflect, setReflect] = useState(false);
  const [code, setCode] = useState<string | null>(null);
  const [want, setWant] = useState(false);
  const [done, setDone] = useState('');
  const prog = u ? p.units[u.id] : undefined;
  const who = p.profile;
  // 產生分享碼（壓縮是非同步的）；姓名、勾選改了就重算
  useEffect(() => {
    if (!want || !u) return;
    let off = false;
    encodePayload(buildPayload(u, prog, who, { reflect })).then((c) => { if (!off) setCode(c); });
    return () => { off = true; };
  }, [want, reflect, u?.id, prog, who?.name, who?.cls, who?.no]); // eslint-disable-line react-hooks/exhaustive-deps
  if (!u) return <p>找不到這一課（{id}）。</p>;
  const st = unitStat(u, prog), rows = rowsOf(u, prog);
  const refl = typeof prog?.answers?.reflect === 'string' ? (prog.answers.reflect as string).trim() : '';
  const flash = (t: string) => { setDone(t); setTimeout(() => setDone(''), 1600); };
  const text = () => reportText(u, prog, who, { reflect });
  const link = code ? teacherLink(code) : '';

  return (
    <div className="exp">
      <div className="no-print">
        <h2>📤 匯出這一課的作答</h2>
        <p className="muted">《{u.title}》。可以列印、複製成文字，或產生分享碼貼給老師。資料只在你按下按鈕時才會離開這個畫面，網站沒有伺服器，不會上傳。</p>
        <ProfileFields p={p} update={update} />
        <label className="exp-check"><input type="checkbox" checked={reflect} onChange={(e) => setReflect(e.target.checked)} /> 包含「回到自己」{refl ? '' : '（你還沒寫）'}<span className="muted small">　預設不含：那是寫給自己看的</span></label>
        <div className="row">
          <button className="btn" onClick={() => window.print()}>🖨 列印</button>
          <button className="btn" onClick={async () => { if (await copyText(text(), '複製下面的文字：')) flash('text'); }}>{done === 'text' ? '✓ 已複製' : '📋 複製文字'}</button>
          <button className="btn primary" onClick={() => setWant(true)}>🔗 產生分享碼</button>
          <button className="btn" onClick={() => gotoLearn({ unit: u.id })}>← 回到這一課</button>
        </div>
        {want && (
          <div className="exp-share" role="region" aria-label="分享碼">
            {!code ? <p className="muted">產生中…</p> : <>
              <p><b>分享碼</b>　共 {code.length} 個字元{code.length > CODE_MAX && <span className="warn">　⚠ 太長了（超過 {CODE_MAX} 字），有些通訊軟體會截斷。請改用「複製文字」。</span>}</p>
              <textarea className="code-box" readOnly rows={4} value={code} onFocus={(e) => e.currentTarget.select()} aria-label="分享碼" />
              <div className="row">
                <button className="btn sm" onClick={async () => { if (await copyText(code, '複製分享碼：')) flash('code'); }}>{done === 'code' ? '✓ 已複製' : '複製分享碼'}</button>
                <button className="btn sm" onClick={async () => { if (await copyText(link, '複製老師連結：')) flash('link'); }}>{done === 'link' ? '✓ 已複製' : '複製老師檢視連結'}</button>
                <LLink className="btn sm" q={{ view: 'teacher' }}>老師檢視頁</LLink>
              </div>
              <p className="muted small">老師檢視連結把碼放在網址「#」後面，這一段不會送到伺服器。</p>
            </>}
            <p className="privacy"><b>隱私說明：</b>分享碼裡有你的姓名、班級、座號和這一課的作答{reflect ? '，也包含你寫的「回到自己」' : '（不含「回到自己」）'}。只有拿到這段碼的人看得到。網站沒有伺服器，不會上傳；你把碼貼到哪裡，內容就到哪裡，請只傳給你的老師。</p>
          </div>
        )}
      </div>

      <article className="exp-sheet" aria-label="作答紀錄（可列印）">
        <h2>《{u.title}》作答紀錄</h2>
        <ProfileLine p={p} />
        <p>等級：<b>{levelLabel(u, prog)}</b>{prog?.doneAt ? `（${prog.doneAt} 完成）` : ''}　作答停留時間：<b>{fmtTime(prog?.time)}</b>　實際作答 <b>{st.answered}／{st.total}</b> 個互動</p>
        {st.recTotal > 0 && <p>選擇與排序題：第一次答對 {st.first}／{st.recTotal}、最後答對 {st.last}／{st.recTotal}</p>}
        <ol className="exp-rows">
          {rows.map((r) => (
            <li key={r.key} className={`exp-row ${r.answered ? '' : 'exp-none'}`}>
              <p className="exp-h"><b>{r.label}</b></p>
              <p className="exp-q">{r.q}</p>
              {!r.answered ? <p className="muted">沒有作答</p>
                : r.kind === 'rec' ? <p>第一次：<b className={r.f ? 'ok' : 'no'}>{yn(r.f)}</b>　最後：<b className={r.l ? 'ok' : 'no'}>{yn(r.l)}</b>　嘗試 {r.n ?? '—'} 次{r.chose && <>　最後選的：{r.chose}</>}</p>
                  : r.kind === 'open' || r.kind === 'think' ? <>
                    <p className="exp-text">{r.text || (r.skip ? '（按了「我真的想不出來」）' : '')}</p>
                    {r.pts && <p className="small">自評：{r.pts.map((x, i) => `${i + 1}. ${x.v === true ? '有寫到' : x.v === false ? '沒寫到' : '未勾'}`).join('　')}</p>}
                    {r.more && <p className="small">補寫：{r.more}</p>}</>
                    : <p>{r.value ?? '—'}</p>}
            </li>
          ))}
        </ol>
        {reflect && refl && <div className="exp-row"><p className="exp-h"><b>🪞 回到自己</b></p><p className="exp-q">{u.reflect}</p><p className="exp-text">{refl}</p></div>}
        <p className="muted small">歷史長河 · 匯出日期 {new Date().toISOString().slice(0, 10)}</p>
      </article>
    </div>
  );
}
