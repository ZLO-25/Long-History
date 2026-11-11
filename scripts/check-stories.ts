// npx tsx scripts/check-stories.ts [story-id …]：只檢查故事（data/stories/），寫作時用；完整檢查用 npm run validate
import { loadCards } from './lib/cards.ts';
import { loadStorylines } from './lib/storylines.ts';
import { loadStories, checkStories, storyChars, storyMinutes } from './lib/stories.ts';

const only = process.argv.slice(2);
const stories = loadStories().filter((s) => !only.length || only.includes(s.fm?.story));
const issues = checkStories(stories, loadStorylines(), loadCards(), { requireAll: !only.length });
for (const s of stories) {
  const chars = storyChars(s);
  console.log(`${s.fm?.story}：${chars} 字，約 ${storyMinutes(chars)} 分鐘，${s.sections.length} 節`);
}
for (const i of issues) console.log(`${i.level === 'error' ? '✗ 錯誤' : '! 警告'}  ${i.file}：${i.msg}`);
const errors = issues.filter((i) => i.level === 'error').length;
console.log(`\n${stories.length} 篇故事：${errors} 個錯誤、${issues.length - errors} 個警告`);
process.exit(errors ? 1 : 0);
