# 查核紀錄：story-india-sea（印度往東走）

查核者：獨立查核 agent（未參與寫作）。依據只有 repo 裡的卡片，沒有上網。
對照的卡片：event-maurya-empire、event-indianization-sea、event-srivijaya、war-chola-srivijaya-1025。
`npx tsx scripts/check-stories.ts story-india-sea`：2,505 字、0 錯誤、0 警告。

## 修改（共 5 處）

| # | 位置 | 原句摘要 | 改成 | 依據 |
|---|------|----------|------|------|
| 1 | 第 2 節 | 阿育王「打完血腥的羯陵伽戰爭之後，改信了佛教」 | 「一般的說法是，他打完血腥的羯陵伽戰爭之後改信了佛教；他算不算正式改宗，還不確定。」 | event-maurya-empire story、C2 [s1][s3] 寫「改信佛教」；同卡 crosscheck 註記列為仍有爭議：「阿育王是否正式改宗（WHE 說不確定）」，卡片 verification 是「爭議」。 |
| 2 | 第 4 節結尾 | 「收費站擋到了別人的路」 | 「這個收費站可能擋到了別人的路」 | event-srivijaya effects why [s3]：「可能妨礙了朱羅與中國的貿易」；war-chola-srivijaya-1025 A2：確切原因不明。 |
| 3 | 開場第 2 段 | 「答案都在船上」 | 「線索都在船上」 | 遠征原因沒有定論（war-chola-srivijaya-1025 historiography），開場不該先說「答案」是貿易。 |
| 4 | 第 2 節開頭 | 「約前 321 年前後」 | 「前 321 年前後」 | 「約」和「前後」重複；年代本身照卡片（event-maurya-empire story）。 |
| 5 | remember 第 1 條 | 「傳到斯里蘭卡和中亞」 | 「傳到斯里蘭卡、印度西北和中亞」 | event-maurya-empire C6 [s1][s3]，和故事正文一致。 |

## 查過沒問題，但值得主編留意

- 「吳哥窟供奉印度的神」：出自 event-indianization-sea 的 why_care [s1]，不在卡片的 story 或正文。why_care 有標來源，可以用；但 event-khmer-empire C7 說吳哥窟從 13 世紀末起主要是上座部佛教寺院，嚴格說應該是「原本供奉」。這篇故事沒有引用那張卡，我沒有改，請主編決定要不要加「原本」。
- 孔雀王朝 → 印度化的 rel 是「背景」。故事寫「這不等於他把佛教送到了東南亞。它是背景」，結尾也寫「更早的背景」，沒有誇大。
- 室利佛逝 → 朱羅遠征的 rel 是「促成」，但 why 用的是「可能妨礙」「被認為」。故事第 5 節與結尾都寫了「最常見的說法」「但這只是一種說法」「沒有定論」，語氣和卡片一致。
- hook 與開場用「只有 1025 年那一次」「軍事攻擊的例子只有一個」，依據是 event-indianization-sea misconceptions 與 war-chola 卡 A9 的「唯一」。storylines.yaml 的 `question` 寫的是「少見的一次」，兩者用詞不同（yaml 沒有改）。
- **標題與內容不符**：storylines.yaml 的標題是「印度往東走：季風、佛法與海峽」，但四張卡片幾乎沒有有來源的季風內容（event-indianization-sea 的查核註記明寫「s1 未提季風，刪除季風說法」；只有 event-funan 的 key_terms 有一條沒標來源的「季風」）。故事依鐵則沒有寫季風，所以標題的「季風」在故事裡沒有著落。yaml 不在我的權限內，沒有改。
- 「收費站」「高速公路」的比喻出自 event-srivijaya key_terms，故事有明說「打個比方」。
- 第 5 節「到 13 世紀，它只剩下占碑一帶的小國」引的是 event-srivijaya [s1][s3]，和卡片 story 一致。
- 粗體共 7 個（阿育王詔令、婆羅門、梵文、印度化、壟斷、朱羅王朝、遠征）。

## 卡片本身的疑點（沒有改卡片）

- event-maurya-empire：「阿育王是否正式改宗不確定」只寫在 crosscheck 註記，story 與 C2 仍直接寫「改信佛教」，historiography 沒有這一條。建議補進 historiography 並標 [s3]，故事的保留語氣才有正式的出處可指。
- event-indianization-sea why_care 的「吳哥窟供奉印度的毗濕奴神」用現在式，和其他卡片（13 世紀末起成為上座部寺院）不一致。
- event-srivijaya story 寫「宋朝的史書記載」，引的是 1345 年成書的《宋史》；故事裡的引文出處已寫明《宋史》，但第 4 節引文前的「宋朝的史書還記下」沿用了卡片的說法，沒有改。

結果：需主編決定（標題有「季風」但卡片沒有有來源的季風內容；另請決定「吳哥窟供奉印度的神」要不要加「原本」。故事正文本身查核通過）
