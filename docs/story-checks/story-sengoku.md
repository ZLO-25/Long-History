# 查核紀錄：story-sengoku（日本戰國：從應仁之亂到禁教與管制的太平）

查核者：獨立查核 agent（未參與寫作）。日期：2026-11-11。
依據：故事線 10 站的卡片（war-onin、war-okehazama、war-nagashino、event-honnoji-incident、event-toyotomi-unification、war-sekigahara、war-osaka-sieges、event-buke-shohatto-sankin、war-shimabara、event-sakoku），加上故事另外引用的 person-toyotomi-hideyoshi、person-tokugawa-ieyasu，全文含 frontmatter 逐句對照。未上網。
改後 `npx tsx scripts/check-stories.ts story-sengoku`：4,388 字、0 錯誤、0 警告。

## 修改（共 12 處）

| # | 位置 | 原句摘要 | 改成 | 依據 |
|---|---|---|---|---|
| 1 | remember 第 1 條 | 「各地領主各自擴張，才有後來一百多年的混戰」 | 「…這是後來一百多年混戰的背景」 | war-okehazama causes → war-onin 的 rel 是「背景」 |
| 2 | remember 第 3 條 | 「太平靠的是…成文規則…加上…禁教與對外管制」 | 「太平不只靠打仗：幕府在打完仗之後把管大名的規矩寫成成文規則…，島原之亂後又收緊禁教與對外管制」 | war-osaka-sieges A9：笠谷和比古只說成文法是幕府維持兩百餘年的「原因之一」[s7]；不寫成唯一原因 |
| 3 | remember 第 4 條 | 「多半出自後來的通俗書」 | 「出自後來的通俗書和戰史」 | war-okehazama、war-nagashino pop_culture：《甫庵信長記》與明治／舊陸軍戰史 |
| 4 | 第 2 節結尾 | 「沒有人管得動，各地大名就各自擴張」 | 「在幕府管不動的背景下，像今川、織田這樣的地方勢力各自擴張」 | war-okehazama causes why（rel：背景）[s1] |
| 5 | 第 4 節小標 | 「一千挺，不是三千挺」 | 「三千挺是誰寫的」 | war-nagashino historiography：《信長公記》是千挺加別動隊 500 挺，日文維基另說「籌到數千挺並非不可能」；原標題把有爭議的數字說死 |
| 6 | 第 4 節 | 三段擊只寫「來自《甫庵信長記》和舊陸軍戰史」 | 補一句「也有學者比較謹慎，認為現有證據無法證明、也無法否定三段擊」，出處補 s6 | war-nagashino historiography（Andrade 引 Lamers）[s6] |
| 7 | 第 5 節 | 「羽柴秀吉」第一次出現沒有交代就是豐臣秀吉 | 加「（後來的豐臣秀吉）」 | event-toyotomi-unification learn.story [s1] |
| 8 | 第 5 節 | 「接下來的局面，就看誰動作最快」 | 刪去，只留「信長和嫡子同一天身亡」，出處標 event-honnoji-incident [s2][s3] | 這句來自卡片 C9「今日對照鉤子」的結構類比，不是史實敘述；C6 只寫「信長、信忠同日身亡」[s2][s3] |
| 9 | 第 6 節 | 「秀吉並不是順理成章地繼承。他接著打敗了織田家的其他重臣」 | 「秀吉接手的過程還有幾步。他擁立信長的幼孫，又打敗了織田家的其他重臣，成為織田家實際的繼承者」 | person-toyotomi-hideyoshi P2 第 3 點「擁立信長的幼孫、擊敗柴田勝家，成為織田家實際的繼承者」[s1]；與故事線 blurb 一致 |
| 10 | 第 7 節 | 「沒收了約九十家大名的領地」 | 加「（各家算法不同，是估計）」 | war-sekigahara historiography：87、88、93 家等不同算法 [s1][s3][s4][s5] |
| 11 | 第 8 節 | 浪人＝「關原之後失去主君和俸祿的武士」 | 「失去主君和俸祿的武士，其中許多人是在關原之後失去領地的」 | war-osaka-sieges key_terms（定義不限關原）與 A1 [s2][s8] |
| 12 | 結尾第 1 段 | 「日本打了一百多年，是因為應仁之亂後沒有人管得動各地大名」 | 「…背景是應仁之亂後幕府管不動各地大名，地方勢力各自擴張」 | 同第 1、4 處（rel：背景） |

## 寫手標出的疑點：查核結果

- **故事線以外的兩張人物卡**：已打開核對。
  - `[person-toyotomi-hideyoshi:s1]`（打敗織田家其他重臣）：learn.story「他接著打敗織田家的其他重臣」標 [s1]，P2 第 3 點同標 [s1]。正確。
  - `[person-tokugawa-ieyasu:s2]`（與秀吉交戰後臣服）：learn.story 該句標 [s2][s3][s10][s19]，P2「1586 臣服秀吉」標 [s2]。正確。結尾再引一次，同樣成立。
- **「誰動作最快」**：確認出自 event-honnoji-incident C9 今日對照鉤子，不是史實敘述，已刪（第 8 處）。
- **「家康不是接下豐臣家的棒子，而是消滅了它」**：綜述句。後半有據（person-tokugawa-ieyasu learn.story「1614–1615 年他消滅豐臣家」；war-osaka-sieges A7「豐臣家滅亡」），前半與故事線 blurb「三位天下人並不是同一條路上的接棒者…家康則消滅了豐臣家」同義。保留。
- **戲劇印象 vs 史實，逐處對照**（全部找得到）：
  - 京都燒成荒野／下京倖存：war-onin pop_culture 第 2 條 [s1][s2]
  - 日野富子元凶說：war-onin historiography、pop_culture 第 1 條 [s1][s8]
  - 桶狹間迂迴奇襲：war-okehazama pop_culture 第 1 條、historiography [s1][s2]；《信長公記》可信度 [s6]
  - 長篠三千挺三段擊：war-nagashino pop_culture 第 1 條 [s1][s2][s7]
  - 武田一戰就亡：war-nagashino pop_culture 第 3 條 [s1]
  - 「敵在本能寺」：event-honnoji-incident pop_culture 第 1 條 [s1][s2]
  - 小早川被開槍威嚇：war-sekigahara pop_culture 第 1 條、historiography [s1][s2]
  - 強填內壕：war-osaka-sieges pop_culture 第 3 條、historiography [s9]
  - 鐘銘是否找碴：war-osaka-sieges historiography [s3]（故事保留「史家看法不一」）
  - 參勤交代讓大名變窮：event-buke-shohatto-sankin pop_culture 第 1 條、historiography [s2]
  - 島原是天主教徒叛亂：war-shimabara pop_culture 第 2 條、historiography [s1][s2][s7]
  - 荷蘭砲擊效果有限：war-shimabara pop_culture 第 4 條 [s1][s2]
  - 「鎖國」留四口、1801 年才有此詞：event-sakoku misconceptions [s1]
- **storylines.yaml blurb「秀吉擁立信長幼孫」**：寫手說所有卡片都找不到依據，**這個判斷不對**。依據在 `person-toyotomi-hideyoshi` 的 P2 第 3 點：「1582–1583 年清洲會議與賤岳之戰：擁立信長的幼孫、擊敗柴田勝家，成為織田家實際的繼承者，並開始蓋大坂城。[s1]」。故事線 10 站的卡片裡確實沒有這件事（event-toyotomi-unification 與 event-honnoji-incident 都沒寫），所以只查站卡會找不到。yaml 未改；故事已依這張卡補上一句（第 9 處），與 blurb 對齊。幼孫的名字（三法師）卡片沒寫，故事也不寫。

## 查過沒問題、但請主編留意

1. 字數 4,388，接近 4,500 上限；之後若再加內容需同時刪減。
2. 第 3 節「能確定的是結果…義元在撤退途中被殺」：義元被殺沒有爭議，但是誰取首，卡片 A7 記日文維基與英文維基說法不同（存疑）。故事沒有寫人名，沒有問題。
3. 第 7 節小標「幾個小時決定的事」與結尾引用的 Hall（體制「並非一戰造成」）、谷徹也（不該把豐臣政權崩潰看成必然）之間有張力。小標對應卡片 why_care「一場打了幾個小時的會戰，決定了…」，故事在同一節與結尾都放了這兩位史家的提醒，判斷可保留。
4. 結尾小標「太平的價錢」帶一點評價意味（暗示禁教與管制是代價）。正文是用「主流的解釋是…」來寫，沒有下道德結論，保留；主編若覺得太重，可改成「太平是怎麼來的」。
5. 第 9 節結尾「規矩有它的副作用」：對應 event-buke-shohatto-sankin C9 與 war-shimabara causes（rel：背景）。句中「築城和參勤的開銷轉成了重稅」是卡片 why 原句 [s1][s4]。
6. 島原→鎖國（rel：促成）寫成「拿『天主教徒叛亂』當理由，把對外的門收得更緊」，並保留 misconceptions「不是立刻導致鎖國、花了約一年半」。大坂之陣→鎖國在卡片上是 disputed 的「背景」，故事只用到「幕府再沒有武裝的對手，可以把規矩寫成白紙黑字」（同時是 event-buke-shohatto-sankin causes「直接引發」的內容），沒有把它直接連到鎖國。
7. 所有兵力數字都保留了「（估計）」。開場和歌、「是非に及ばず」、鐘銘、法度第一條四段引文都來自各卡 primary_source，出處交代與卡片一致。
8. 粗體正好 8 個（守護大名、下剋上、鐵砲、關白、改易、浪人、參勤交代、一揆）。史家名 Berry、Hall 用原文，與卡片一致。

## 卡片本身的疑點（未改卡片）

- 「擁立信長幼孫／清洲會議」只出現在 person-toyotomi-hideyoshi，event-toyotomi-unification（這條線的站卡）C2 沒有；若主編希望站卡能自足支持 blurb，可考慮日後在站卡補一句。
- 清洲同盟年份：war-okehazama 寫 1562 年；person-tokugawa-ieyasu P2 寫「1561 或 1562 年，日文維基兩種說法並存」。故事依站卡寫 1562 年。
- 秀賴石高：war-sekigahara A8 寫約 65 萬石，war-osaka-sieges 寫 60–65 萬石（估計）。故事沒有用這個數字。
- war-nagashino key_terms 寫「至少 1,500 挺」，primary_source 是「千挺計」；兩者靠 historiography 的「千挺加別動隊 500 挺」才接得上，單看會覺得不一致。

結果：通過

## 2026-11-11 第二輪（增修後）查核

查核者未參與寫作。逐段對照 10 張站卡與 person-toyotomi-hideyoshi、person-tokugawa-ieyasu（只用到 P2、learn.story），並逐條對各卡 misconceptions／pop_culture。增修後 7,116 字（上限 7,500），check-stories 0 錯誤、0 警告。

### 改了 7 處

1. 第 2 節「當時最有實力的兩位守護大名」→「這兩位實力派守護大名」。卡片寫「兩大實力派」，沒有說是最強的兩位。
2. 第 2 節「兩軍的陣地最近只隔約 500 公尺」→「山名宗全的宅邸和東軍的陣地只相距約 500 公尺」。war-onin A3 講的是宗全邸到東軍陣地的距離，「最近」是寫手加的。
3. 第 6 節「打敗了織田家的其他重臣」→「打敗了織田家的重臣柴田勝家」。person-toyotomi-hideyoshi P2 只寫擊敗柴田勝家一人，複數的「其他重臣」沒有依據。recall 第 3 題答案同步改。
4. 第 6 節秀吉逸話段：原寫草鞋、一夜城「都沒有可靠的同時代出處可以確認」。卡片的說法比較窄：草鞋是「本卡查不到同時代出處」，一夜城是日文維基用「とされる逸話」的保留語氣、可信度未另行查證。改成兩件事分開寫，不替卡片下「沒有出處」的總結論；「史料說法不一致」改成「各書說法不一致」。
5. 第 7 節關原：「毛利軍被陣中一位前一天已和東軍密約的將領擋住」→「西軍將領吉川廣家前一天就和東軍密約，讓毛利的部隊無法前進」。卡片 A1 只說吉川廣家密約「讓毛利秀元的部隊無法前進」，沒有說他在毛利陣中、也沒有說「擋住」；直接照卡片寫並點名，比「一位將領」清楚。原句太長，拆成兩句。
6. 第 9 節參勤交代：「大名一年住江戶、一年回領地」→「大名多半一年住江戶、一年回領地（關東的大名多半半年一換）」。event-buke-shohatto-sankin misconceptions 第 2 條明寫「不是每個大名都一年一次」，原句寫成全體一律，等於把誤解寫了進去。
7. （同第 3 處）recall 第 3 題答案。

### 逐站「當時的記錄 vs 後來的書」對卡結果：全部有依據

- 開場和歌是文學性哀嘆、下京大致倖存：war-onin pop_culture 2。
- 日野富子元凶說：war-onin pop_culture 1、historiography。不只兩人恩怨：misconceptions。
- 桶狹間上洛說、迂迴奇襲：war-okehazama pop_culture 1、2；兵力「各書不同、都是估計」：misconceptions。兩本書的可信度：historiography [s6]。
- 三千挺三段擊、武田有鐵砲且多死於撤退、長篠後七年才滅亡：war-nagashino pop_culture 1–3。Lamers 的保留意見有寫（「無法證明也無法否定」）。
- 「敵在本能寺」、秀吉事前知情說：event-honnoji-incident pop_culture 1、misconceptions。信長身邊「少數隨從」的寫法沒有落入 pop_culture 3 的「只有幾個小姓」。
- 秀吉不是將軍、不是從零開始：event-toyotomi-unification misconceptions；草鞋、一夜城、出身：pop_culture 1–3（見上第 4 處）。
- 問鐵砲、小早川開戰時已屬東軍說：war-sekigahara pop_culture 1；「幾個小時」：pop_culture 2。
- 強填內壕、幸村之名：war-osaka-sieges pop_culture 3、1。鐘銘三說並列。
- 法度非家康親筆、參勤非為了讓大名變窮、一國一城有例外：event-buke-shohatto-sankin pop_culture 1–3。
- 四郎非指揮官、神蹟、荷蘭砲擊效果有限、非純宗教戰爭、非立刻鎖國：war-shimabara misconceptions 1、3 與 pop_culture 1、2、4。
- 四口、「鎖國」1801 年才出現：event-sakoku misconceptions。

### 長度與好讀（以國高中生的耐心看）

- 沒有超過 260 字的段落，也沒有連續的一句段。粗體 8 個，沒有破折號。
- 寫手提的兩段「最容易刪」的段落，判斷**保留**：
  - 天草四郎神蹟段（3 句）：這是讀者最可能從遊戲帶進來的印象，而且直接接到「他是象徵、指揮的是浪人和村長」這條 misconception，刪掉反而少了一個對照。
  - 秀吉逸話段（改後 3 句）：篇幅短，但它是這一節裡唯一離開「誰接手」主線的段落。若主編要壓字數，這段可以整段刪，不影響前後銜接。
- 第 3 節末「兩本書的分量也不一樣」一句是全篇「當時 vs 後來」判斷的依據，保留。
- 全篇 24 分鐘，已在 25 分鐘上限邊緣；之後再加內容要同時刪。

### 出處

- 引用故事線以外的兩張人物卡，出處都對：擁立幼孫、擊敗柴田、小牧長久手平手、外交與聯姻 → person-toyotomi-hideyoshi P2 第 3、4 點 [s1]；1586 年臣服、1590 年移封關東以江戶為居城 → person-tokugawa-ieyasu P2 [s2]。
- 桶狹間當天經過（5 騎出城、熱田望見黑煙、中島砦部下勸阻、豪雨、義元棄轎與 300 親衛）卡片 A3、A7 只標 [s1]（日文維基），故事也只標 s1，標法與卡片一致。這是單一百科來源，見下方卡片疑點。

### 請主編決定

1. 第 7 節「世代追隨德川的大名」是寫手對「譜代」的白話解釋，卡片只出現「譜代」一詞、沒有解釋（「關原以後才臣服的大名」則有 event-buke-shohatto-sankin C3 支持）。這是詞義而非史實，我保留了；若要嚴守「卡片沒寫的不寫」，可改成「德川一門與譜代大名」並接受多一個沒解釋的名詞。
2. 第 7 節 ★「家康靠對手陣營倒戈取勝」：正文已並列「小早川開戰時就已站在東軍」的新說，★ 用的是通說。卡片 learn.story 也用「倒戈」，所以保留。
3. 秀吉逸話段要不要刪（見上）。

### 卡片本身的疑點（未改卡片）

- war-okehazama：當天經過（A3、A7）只有日文維基一個來源；取首者是誰，日文與英文維基相反（卡片已註存疑）。故事沒有寫取首者。
- event-toyotomi-unification pop_culture 第 1、2 條的 fact 寫的是「本卡查不到」「未能另行查證」，是查核範圍的說明，不是史學結論；故事引用時容易被讀成「沒有出處」。
- event-buke-shohatto-sankin learn.story 與 key_terms 寫「大名一年在江戶、一年在領地」，同卡 misconceptions 又說不是每個大名都如此，卡內前後口徑不一。
- 「譜代」「親藩」「外樣」三個詞在 war-sekigahara、event-buke-shohatto-sankin 都用到，但沒有任何一張卡的 key_terms 解釋。

結果：通過（已修 7 處）
