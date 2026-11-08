// 人群圖層的面板：說明＋圖例、一個國家的族群與語言、臺灣放大鏡、為什麼不畫「人種」
import { useEffect, useState } from 'react';
import type { Source } from '../types';
import { loadPeoples, PEOPLE_ABOUT, PEOPLE_INTRO, type Peoples, type PItem, type PFamily } from '../lib/peoples';
import { AsOf, Refs } from './TodayPanel';
import './peoples.css';

interface Props { id: string; onPick: (id: string) => void; onCard?: (id: string) => void }

const WIKI_RACE: Source = { id: 'w1', title: 'Race (human categorization) — Wikipedia', url: 'https://en.wikipedia.org/wiki/Race_(human_categorization)', accessed: '2026-11-08' };

export function usePeoples() {
  const [d, setD] = useState<Peoples | null>(null);
  useEffect(() => { let on = true; loadPeoples().then((x) => on && setD(x)).catch(() => {}); return () => { on = false; }; }, []);
  return d;
}

export const FamChip = ({ f, big }: { f?: PFamily; big?: boolean }) => !f ? null : (
  <span className={`fam-chip ${big ? 'big' : ''} ${f.hatch ? 'hatch' : ''}`} style={{ ['--fc' as any]: f.color }}><i />{f.zh}<small className="en">{f.en}</small></span>
);

function Bars({ items }: { items: PItem[] }) {
  return (
    <ul className="pbars">
      {items.map((x, i) => (
        <li key={i}>
          <span className="pb-name">{x.t}</span>
          {x.v && <span className="pb-val">{x.v}</span>}
          {x.p != null && <span className="pb-bar" aria-hidden><b style={{ width: `${Math.min(100, x.p)}%` }} /></span>}
        </li>
      ))}
    </ul>
  );
}

export function PeoplePanel({ id, onPick, onCard }: Props) {
  const d = usePeoples();
  if (!d) return <p className="muted loading-detail">載入人群資料…</p>;
  const fam = (k: string) => d.families.find((f) => f.id === k);
  const back = id !== PEOPLE_INTRO && <button className="link small" onClick={() => onPick(PEOPLE_INTRO)}>◎ 人群圖層說明與圖例</button>;
  if (id === PEOPLE_ABOUT) return <div className="results people-panel">{back}<About d={d} onPick={onPick} onCard={onCard} /></div>;
  if (id === 'Taiwan') return <div className="results people-panel">{back}<TaiwanView d={d} onPick={onPick} /></div>;
  const c = d.countries[id];
  if (!c) return <div className="results people-panel"><Intro d={d} onPick={onPick} /></div>;
  const f = fam(c.fam);
  return (
    <div className="results people-panel">
      {back}
      <p className="today-kicker">人群圖層・今天</p>
      <h2>{c.zh} <span className="en">{id}</span></h2>
      <p><FamChip f={f} big /> <span className="muted small">多數人母語所屬的語系</span></p>
      {f && <p className="small">{f.note}</p>}
      {c.note && <p className="p-note">{c.note}</p>}
      <h3>主要族群{c.gy && <span className="muted small">（{c.gy} 年資料）</span>}</h3>
      {c.method && <p className="p-method">怎麼算的：{c.method}</p>}
      <Bars items={c.groups} />
      <h3>主要語言{c.ly && <span className="muted small">（{c.ly} 年資料）</span>}</h3>
      <Bars items={c.langs} />
      <p className="small"><AsOf date={`${c.gy || c.ly || '年份不詳'}（世界概況最後一版）`} /></p>
      <p className="small muted">世界概況已在 2026-02-04 停刊，這些數字不會再更新；很多國家的資料是十幾年前的普查。各國怎麼分族群都不一樣，所以不能直接拿兩國的比例來比。</p>
      <h3>來源</h3>
      <ol className="sources">
        <li><span className="code">s1</span>{c.src ? <a href={c.src} target="_blank" rel="noreferrer">{d.factbook.title}：{id}（原文）</a> : d.factbook.title}（{d.factbook.license}；鏡像版本 {d.factbook.mirror_date}；中文由本站翻譯）</li>
        <li><span className="code">s2</span>語系：<a href="https://glottolog.org" target="_blank" rel="noreferrer">{d.glottolog}</a></li>
      </ol>
      <p><button className="btn sm" onClick={() => onPick(PEOPLE_ABOUT)}>為什麼地圖上不畫「人種」？</button></p>
    </div>
  );
}

function Intro({ d, onPick }: { d: Peoples; onPick: (id: string) => void }) {
  const n = (k: string) => Object.values(d.countries).filter((c) => c.fam === k).length;
  return <>
    <p className="today-kicker">人群圖層・今天</p>
    <h2>這個地方住的主要是哪些人？</h2>
    <ul className="p-how">
      <li><b>國家的顏色</b>＝這個國家多數人的母語屬於哪個「語系」（語言的大家族）。顏色是「主要」，不是「全部」。</li>
      <li><b>小圓點</b>＝一種語言的代表位置（依 Glottolog，畫出 7,600 多種），不是人數。點很密的地方，表示語言很多樣，例如新幾內亞、奈及利亞。</li>
      <li><b>點一個國家</b>：看這國自己統計的族群與語言比例，和資料是哪一年。</li>
      <li><b>看顏色和圓點不一樣的地方</b>：例如澳洲和美洲國家是藍色（印歐語系），圓點卻是原住民語言的顏色——這就是殖民與移民留下的痕跡。</li>
    </ul>
    <p><button className="btn sm primary" onClick={() => onPick('Taiwan')}>看臺灣放大鏡</button> <button className="btn sm" onClick={() => onPick(PEOPLE_ABOUT)}>為什麼不畫「人種」？</button></p>
    <h3>圖例：語系</h3>
    <ul className="fam-list">
      {d.families.map((f) => <li key={f.id}><FamChip f={f} /><span className="muted small">{n(f.id) ? `${n(f.id)} 國` : '只有圓點'}</span><p className="small">{f.note}</p></li>)}
    </ul>
    <h3>來源</h3>
    <ol className="sources">
      <li><span className="code">s1</span><a href={d.factbook.mirror} target="_blank" rel="noreferrer">{d.factbook.title}</a>（{d.factbook.license}，鏡像版本 {d.factbook.mirror_date}）</li>
      <li><span className="code">s2</span><a href="https://glottolog.org" target="_blank" rel="noreferrer">{d.glottolog}</a></li>
      <li><span className="code">s3</span>國界：Natural Earth 1:110m（公有領域）；今天的國界，不是歷史疆域</li>
    </ol>
  </>;
}

function TaiwanView({ d, onPick }: { d: Peoples; onPick: (id: string) => void }) {
  const t = d.taiwan;
  const src = (ids: string[] = []) => <Refs list={ids.map((i) => t.sources.find((s) => s.id === i)!).filter(Boolean)} />;
  return <>
    <p className="today-kicker">人群圖層・臺灣放大鏡</p>
    <h2>臺灣 <span className="en">Taiwan</span></h2>
    <p><AsOf date={t.data_as_of} /> <span className="muted small">每一項是不同的調查、不同的問法，加起來不是 100%</span></p>
    <h3>族群組成</h3>
    <table className="p-table"><tbody>
      {t.groups.map((g) => <tr key={g.zh}><th>{g.zh}</th><td><b>{g.value}</b><br /><span className="small muted">{g.note} {src(g.src)}</span></td></tr>)}
    </tbody></table>
    <div className="p-contrast"><b>{t.contrast.title}</b><p>{t.contrast.text} {src(t.contrast.src)}</p></div>
    <h3>官方承認的 {t.tribes.length} 個原住民族</h3>
    <p className="small">{t.top3.text} {src(t.top3.src)}</p>
    <p className="small muted">地圖上的族名放在該族語言的代表位置（Glottolog），不是族人住的範圍；其他各族的人數見原住民族委員會的每月統計 {src(['s6'])}。</p>
    <ol className="p-tribes">
      {t.tribes.map((x) => <li key={x.id}><b>{x.zh}</b> <span className="en">{x.en}</span>{x.pop && <span className="pop">{x.pop}</span>}<br /><span className="small muted">{x.since}{x.schematic ? '・地圖位置是示意' : ''}{x.src && <> {src(x.src)}</>}</span></li>)}
    </ol>
    <p className="small">{t.plains_note} {src(t.plains_src)}</p>
    <p className="small muted">臺灣原住民族的語言都屬於南島語系；世界概況寫著，多數遺傳、考古、語言證據支持臺灣是人類往太平洋擴散、一路到玻里尼西亞的源頭（不是定論）{src(['s3'])}。</p>
    <p><button className="btn sm" onClick={() => onPick(PEOPLE_ABOUT)}>為什麼不畫「人種」？</button></p>
    <h3>來源</h3>
    <ol className="sources">{t.sources.map((s) => <li key={s.id}><span className="code">{s.id}</span><a href={s.url} target="_blank" rel="noreferrer">{s.title}</a>（查閱 {s.accessed}）</li>)}</ol>
  </>;
}

function About({ d, onPick, onCard }: { d: Peoples; onPick: (id: string) => void; onCard?: (id: string) => void }) {
  const ex = (n: string) => <button className="link" onClick={() => onPick(n)}>{d.countries[n]?.zh ?? n}</button>;
  return <>
    <p className="today-kicker">人群圖層・想一想</p>
    <h2>為什麼地圖上不畫「人種」？</h2>
    <h3>1. 人的樣子是慢慢變的，切不出幾「種」</h3>
    <p>從非洲走到歐洲、走到東亞，人的膚色、臉型是一點一點漸變的，找不到一條線把人分開。科學上的說法是：人類的遺傳差異，大多是在同一群人裡面，而且是連續的、很複雜的，和「人可以分成幾個種族」的想法不合 <Refs list={[WIKI_RACE]} />。</p>
    <h3>2. 「種族」是社會訂的分類</h3>
    <p>現代科學把種族看成一種社會建構：依照社會訂下的規則，分給一個人的身分 <Refs list={[WIKI_RACE]} />。證據就在這張圖的資料裡，每個國家分法都不一樣：</p>
    <ul className="small">
      <li>{ex('United States of America')}：人口普查問「種族」，還可以勾「兩種以上」。</li>
      <li>{ex('Brazil')}：最大的一群是「混血」。</li>
      <li>{ex('South Africa')}：有一個類別叫「有色人」，指混血後代形成的群體。</li>
      <li>{ex('Dominican Rep.')}：自認「印第歐」的人，不一定有原住民祖先。</li>
      <li>{ex('Japan')}、{ex('Germany')}：只統計國籍，不問民族。</li>
    </ul>
    <p>同一個人搬到另一個國家，可能就被分到另一個類別。</p>
    <h3>3. 所以這張圖看三件事，而且三件事常常不一樣</h3>
    <table className="p-table"><tbody>
      <tr><th>說什麼話？</th><td>語言族群（語系）：地圖的顏色和圓點。語言會傳承、也會改變，最能看出歷史上的遷徙。</td></tr>
      <tr><th>認為自己是誰？</th><td>民族、族群：點國家看各國自己的統計。</td></tr>
      <tr><th>祖先從哪裡來？</th><td>遺傳祖源：要靠古 DNA 研究，下一期的遷徙路線會用到。</td></tr>
    </tbody></table>
    <ul className="small">
      <li>{ex('Taiwan')}：自認客家人約 19.8%，平常主要說客語的只有 1.5%。（認同 ≠ 語言）</li>
      <li>{ex('Algeria')}：幾乎所有人的祖先都是柏柏人，但只有約 15% 自認主要是柏柏人。（祖源 ≠ 認同）</li>
      <li>{ex('Madagascar')}：在非洲旁邊，語言卻和東南亞島嶼是親戚。（語言記得遷徙）</li>
    </ul>
    <h3>想一想</h3>
    <p>為什麼過去有人一定要把人分成幾個「人種」？這樣分對誰有好處？可以從{onCard ? <button className="link" onClick={() => onCard('event-atlantic-slave-trade')}>大西洋奴隸貿易</button> : '大西洋奴隸貿易'}這張卡開始想。</p>
    <h3>來源</h3>
    <ol className="sources"><li><span className="code">w1</span><a href={WIKI_RACE.url} target="_blank" rel="noreferrer">{WIKI_RACE.title}</a>（查閱 {WIKI_RACE.accessed}）</li><li><span className="code">s1</span>各國例子：{d.factbook.title}</li></ol>
  </>;
}
