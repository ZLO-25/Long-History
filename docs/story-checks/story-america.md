# 查核紀錄：story-america

查核者未參與寫作。逐段對照 8 張站卡（event-magna-carta、event-thirteen-colonies、war-american-revolution、event-us-constitution、war-american-civil-war、event-gilded-age-industrialization、war-spanish-american、event-american-century）的 frontmatter（causes／effects／sources／learn／misconceptions）與內文。改後 `npx tsx scripts/check-stories.ts story-america`：4,297 字、0 錯誤、0 警告。

## 修改（共 8 處，其中 2 處同時改了 remember）

| # | 位置 | 原句摘要 | 改成 | 依據 |
|---|---|---|---|---|
| 1 | 第 2 節小標題 | 「沒人管的一百多年」 | 「管得鬆的一百多年」 | event-thirteen-colonies learn.story「英國離得遠、管得鬆」[s1][s6]；同卡 C2／C4 載 1651 年起有《航海法》、1624 年改王室殖民地，並非「沒人管」。 |
| 2 | 第 1 節第 12 條 | 「兵役免除稅（用錢代替出兵）和協助金」 | 「兵役免除稅（用錢代替出兵）或協助金這類款項」 | event-magna-carta C4 原文是「或」[s2][s4]；卡片沒有解釋協助金，只加「這類款項」讓學生知道它是一種款項，不加新內容。 |
| 3 | 第 3 節 | 「1783 年 9 月 3 日，英美在巴黎簽訂和約」 | 「1783 年，英美在巴黎簽訂和約」 | 同段已有 1777、1781 年 9 月、10 月 19 日三個日期，數字太密；年份仍與 war-american-revolution A8 [s3] 相符。 |
| 4 | 第 5 節引文 | 「我們的立場與奴隸制度緊緊相連。」 | 句尾改「……」 | war-american-civil-war primary_source [s5] 的譯文後面還有「那是世界上最大的物質利益」；截短要標出。 |
| 5 | 第 5 節（寫手自標疑點） | 「打仗要錢，這一次聯邦政府的辦法比大陸會議多。」 | 「打仗要錢。為了籌措軍費，北方從 1862 年起發行……」 | 「比大陸會議多」是寫手自己的比較，兩張卡都沒有這個比較。改用 war-american-civil-war learn.story「為了籌措軍費，北方發行……綠鈔，並設立國家銀行體系」[s7][s8]。 |
| 6 | 第 6 節（寫手自標疑點） | 「規則這次要管的對象，換成了大公司。」 | 「壟斷越來越大，聯邦也開始出手管制。」 | event-gilded-age-industrialization learn.story「壟斷越來越大，國會 1890 年通過《謝爾曼反托拉斯法》」[s4][s6]、C4「聯邦開始管制經濟」[s6]；該段原本的出處 [s6][s4] 即可支持。 |
| 7 | 結尾第 2 段＋remember 第 3 條 | 收不到稅的教訓「讓美國寫出」憲法 | 「促成了」憲法 | war-american-revolution effects → event-us-constitution 的 rel 是「促成」，why 是「讓領袖們想要更強的中央政府」[s6][s1]；「讓…寫出」說得太滿。 |
| 8 | 結尾第 2 段＋remember 第 4 條 | 「內戰擴張了工廠、鐵路和聯邦財政，工業化…」 | 「內戰期間，北方的工廠、鐵路和聯邦財政都擴張了，戰後的工業化…」 | war-american-civil-war effects → gilded-age 的 rel 是「背景」，why 寫「戰時北方的工廠、鐵路和聯邦財政都擴張」[s1][s7]：卡片說的是「戰時擴張」，沒有說是內戰造成的，也限定在北方。 |

## 查過沒問題，但值得主編留意

- **小標題的「未爆彈」**（第 4、5 節）：這是比喻，沒有用「就像」明講。憲法 → 內戰在卡片上的 rel 是「背景」，內文用的是卡片原話「這個矛盾近一個世紀後，以一場戰爭收場」，沒有寫成必然，所以保留；主編若覺得「未爆彈炸開」暗示太強，可改小標題。
- **第 3 節小標題「為了稅開戰」**：符合 war-american-revolution causes 的寫法（「誰有權課稅」越吵越僵），但該卡另有一條 `disputed: true` 的思想背景原因，故事沒有提，也沒有寫反。
- **薩拉托加與法美同盟**：故事只寫「隔年」簽約，沒有寫成因果，符合卡片（卡片也沒說因果）。
- **《大憲章》→ 殖民者**：全篇都寫成「背景」「影響」，與 rel「背景」一致；第 2 節引用 `event-magna-carta:s1` 來支持「殖民者看待自己權利的背景」，這句話在 event-thirteen-colonies 的 causes 上，src 正是 `event-magna-carta:s1`，出處正確。
- **美西戰爭 → 美國世紀**：卡片標 `disputed: true`，故事第 7 節末段有寫出「史家看法不一」。結尾的摘要跳過了這一站（從鋼殼戰艦直接到二戰後），沒有把有爭議的連結寫成定論。
- **緬因號**：保留「原因到今天都沒有定論，不能說是西班牙擊沉的」，與 misconceptions 一致。
- **五分之三**、**《解放奴隸宣言》只適用叛亂地區**、**《獨立宣言》不是戰爭起點**、**鍍金不是黃金**、**布列敦森林是談出來的**：都與各卡 misconceptions 一致。
- **「君權神授」「協助金」** 兩個詞卡片都沒有白話解釋，所以故事也沒辦法解釋；若主編想補，要先補卡片。
- 粗體 7 個（有益的忽視、殖民地議會、大陸幣、聯邦制、綠鈔、托拉斯、孤立主義），未超過 8 個。
- remember 四條都是因果；think 三題都是開放題，第 2 題連回讀者自己。

## 卡片本身的疑點（未改卡片）

- event-magna-carta：C5 寫「19 世紀歷史學家指出」，C10 寫「歷史學家指出」，同一件事兩種寫法；故事用後者。
- event-thirteen-colonies：C10 的「橫渡大西洋的通訊在估計上需要數週以上」沒有獨立出處（只掛 s1）；故事沒有用。
- war-american-civil-war 的 primary_source 密西西比宣言中譯用了破折號；故事截到破折號之前。

結果：通過
