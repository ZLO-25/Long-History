// 按「完成這一課」之後的結果畫面：這一課的等級、答對幾題、還沒作答的步驟、自己寫的回答、下一課
import type { Index, Step, Unit } from '../types';
import type { UnitProgress } from './progress';
import { LEVELS, unitLevel, unitStat, writingsOf } from './level';
import { intent } from '../lib/detail';
import { LLink } from './nav';
import { fmtTime } from './report';

export function UnitResult({ u, prog, index, stepName, onGo, onUnit, onBack, nextLesson, diveTitle, lessonNo, lessonCount }: {
  u: Unit; prog: UnitProgress | undefined; index: Index; stepName: (x: Step) => string;
  onGo: (step: number) => void; onUnit: (id: string) => void; onBack: () => void;
  nextLesson?: Unit; diveTitle?: string; lessonNo: number; lessonCount: number;
}) {
  const lv = unitLevel(u, prog) ?? 'walked', L = LEVELS[lv], st = unitStat(u, prog);
  const writes = writingsOf(u, prog);
  const reflect = typeof prog?.answers?.reflect === 'string' ? (prog.answers.reflect as string).trim() : '';
  // 還沒作答的互動，依步驟歸在一起
  const byStep = new Map<number, number>();
  for (const m of st.missing) byStep.set(m.step, (byStep.get(m.step) ?? 0) + 1);
  const nexts = u.next.map((id) => index.units.find((x) => x.id === id)).filter((x): x is Unit => !!x);
  return (
    <div className="unit-result" role="region" aria-label="這一課的結果">
      <p className="big-emoji" aria-hidden>{L.icon}</p>
      <h3>《{u.title}》：{L.icon} {L.name}</h3>
      <p>{L.desc}</p>
      <div className="stat-tiles">
        <div><b>{st.answered}<small>／{st.total}</small></b><span>實際作答的互動</span></div>
        {st.recTotal > 0 && <div><b>{st.first}<small>／{st.recTotal}</small></b><span>選擇與排序題：第一次答對</span></div>}
        {st.recTotal > 0 && <div><b>{st.last}<small>／{st.recTotal}</small></b><span>最後答對</span></div>}
        <div><b className="time-tile">{fmtTime(prog?.time)}</b><span>作答停留時間</span></div>
        {st.gradeTotal > 0 && <div><b>{st.gradeLast}<small>／{st.gradeTotal}</small></b><span>自我檢查（最近一次）</span></div>}
      </div>
      {lv === 'done' && <p className="muted small">再把自我檢查答錯的題目重做一次，最近一次答對到八成，就是「學會」。</p>}
      {byStep.size > 0 && (
        <div className="res-missing">
          <h4>還沒作答的地方（點一下回去做）</h4>
          <ul>{[...byStep].map(([i, k]) => <li key={i}><button className="link" onClick={() => onGo(i)}>第 {i + 1} 步・{stepName(u.steps[i])}（{k} 個）</button></li>)}</ul>
        </div>
      )}
      {(writes.length > 0 || reflect) && (
        <div className="res-writes">
          <h4>你寫的回答</h4>
          {writes.map((w, i) => <div key={i} className="rec-a"><p className="muted small">{w.label}</p><p>{w.text}</p>{w.more && <p className="muted small">補寫：{w.more}</p>}</div>)}
          {reflect && <div className="rec-a"><p className="muted small">回到自己</p><p>{reflect}</p></div>}
        </div>
      )}
      <p className="no-print"><LLink className="btn" q={{ view: 'export', unit: u.id }} title="可以列印、複製文字，或產生分享碼給老師">📤 匯出這一課的作答</LLink></p>
      {nextLesson && diveTitle && <p className="ud-recap-next">深入專題<b>「{diveTitle}」</b>的下一課：<button className="btn primary" onClick={() => onUnit(nextLesson.id)} {...intent('unit', nextLesson.id)}>第 {lessonNo + 2}／{lessonCount} 課《{nextLesson.title}》 →</button></p>}
      {nexts.length > 0 && <>
        <h4>下一課，接著挖</h4>
        <div className="next-units">{nexts.map((n) => <button key={n.id} className="unit-tile" onClick={() => onUnit(n.id)} {...intent('unit', n.id)}><b>{n.title}</b><span>❓ {n.mystery}</span></button>)}</div>
      </>}
      <p><button className="btn" onClick={onBack}>← 回到回顧</button></p>
    </div>
  );
}
