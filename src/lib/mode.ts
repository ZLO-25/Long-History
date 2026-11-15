// 網址決定進哪個模式（App.tsx 與 chunks.tsx 的預載共用，兩邊判斷必須一致）
// 明確的 ?mode= 優先。沒有 mode 時：帶學習模式的內容參數（?unit= ?dive= ?story= ?topic= ?history= ?view= ?sim=）一律進學習模式，
// 老師貼給學生的連結才不會落到研究模式的外殼；純研究模式的參數（?card= ?year= ?chain= ?today= ?q= ?peoples=）維持研究模式；
// 什麼參數都沒有（只有 ?perf）回傳 null，由呼叫端看上次記住的模式。
const LEARN_KEYS = ['unit', 'dive', 'story', 'topic', 'history', 'view', 'sim'];
const RESEARCH_KEYS = ['card', 'year', 'chain', 'today', 'q', 'peoples'];
export function urlMode(search: string): 'learn' | 'research' | null {
  const q = new URLSearchParams(search);
  const m = q.get('mode');
  if (m === 'learn' || m === 'research') return m;
  const keys = [...q.keys()].filter((k) => k !== 'perf');
  if (!keys.length) return null;
  if (keys.some((k) => RESEARCH_KEYS.includes(k))) return 'research';
  if (keys.some((k) => LEARN_KEYS.includes(k))) return 'learn';
  return 'research'; // 不認得的參數：維持原本的行為
}
