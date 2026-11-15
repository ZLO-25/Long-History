# 學習單元的寫法

學習單元放在 `data/units/<id>.yaml`，一個檔案一個單元。單元本身**不放新的史實**：每一句話都要能在它用到的卡片裡找到（卡片才有來源），單元只負責「怎麼帶學生讀」。

```
謎題（mystery）
  │  例：「明朝的錢為什麼要從地球另一邊運來？」
  ▼
步驟（steps）：一步一個畫面
  hook ─► card ─► source ─► chain ─► compare ─► decision ─► today ─► check ─► recap
  （順序可以調，sim 可以插在任何地方）
  │
  ▼
接下來可以挖（next）：2–3 個相關單元
```

## 一、單元的欄位

| 欄位 | 必填 | 說明 |
|---|---|---|
| `id` | 必填 | `unit-英文短名`，和檔名一樣 |
| `title` | 必填 | 單元名稱，例「白銀帝國：明朝的錢為什麼要從地球另一邊運來？」 |
| `histories` | 必填 | 屬於哪些史，寫 `data/histories.yaml` 的史名（例 `中國史`、`錢的歷史`） |
| `mystery` | 必填 | 一個學生會好奇的問題；回顧時會再問一次 |
| `teaser` | 選填 | 一句吸引人的預告 |
| `goals` | 必填 | 做完能做到什麼，用「能說出／能判讀／能比較／能指出」開頭 |
| `minutes` | 必填 | 預估自學分鐘數（數字） |
| `steps` | 必填 | 步驟，見下一節 |
| `next` | 建議 | 2–3 個單元 id |
| `crosscheck` | 自動 | 獨立查核結果，由查核流程寫入；沒有「通過」就不會出現在學習模式 |

## 二、步驟類型

| type | 做什麼 | 主要欄位 |
|---|---|---|
| `hook` | 開場，用學生熟悉的事比喻 | `text` |
| `card` | 讀一張卡 | `id`、`depth`（舊欄位，2026-11-07 起卡片只有一個詳細版，寫了也不影響顯示）、`prompt`（讀的時候注意什麼） |
| `source` | 讀一段一手史料 | `card`、`idx`（第幾筆 primary_source，從 0 起）、`question`、`options`、`answer`（從 0 起）、`explain`、`hints`、`ref` |
| `chain` | 把事件排成因果鏈 | `prompt`、`items`（**寫正確順序**，畫面會打亂）、`explain`、`hints`、`ref` |
| `compare` | 兩張卡並排比較 | `cards`（剛好 2 張）、`rows`（`aspect`、`a`、`b`）、`question`、`model_answer`、`hints` |
| `decision` | 「如果你是……你會怎麼選」 | `role`、`situation`、`options`（`label`、`result`）、`actual`、`ref`、`note` |
| `today` | 今天能不能這樣類比 | `card`（要有「不可類比的差異」段落）、`question`、`model_answer` |
| `peoples` | 在單元裡打開人群圖層的一頁（地圖同步打開「◎ 人群」） | `id`（`about`、`intro`、`migrations`、`mig-<遷徙id>` 或 countries.yaml 的國名，例如 `Taiwan`）、`prompt` |
| `sim` | 金融模擬 | `sim`（`debase` 降低銀幣成色／`bankrun` 銀行擠兌／`bubble` 泡沫）、`prompt` |
| `check` | 小測驗 | `items`：`choice`（`options`、`answer`）、`order`（`items` 寫正確順序）、`short`（`model` 參考說法）；每題都要 `explain`、`hints`，建議 `ref` |
| `recap` | 回顧，回答一開始的謎題 | `model_answer` |

`ref` 寫法：`卡片id`（整張卡）、`卡片id#story`（故事版）、`卡片id#C2`（某個段落，代號見 `docs/card-fields.md`）、`peoples:<頁>`（人群圖層的一頁，寫法同 `peoples` 步驟的 `id`）。人群圖層的資料自帶來源，所以 `peoples` 步驟和 `peoples:` ref 也算「卡片裡有的事」。答錯或看提示時，畫面會給一個按鈕跳回那裡。

## 三、寫作規則（查核會逐條看）

1. **只用卡片裡有的事**。數字、年份、人名都要和卡片一致；卡片沒寫的，單元也不能寫。
2. **看得到才問得到**。`card` 步驟設成 `story` 深度時，學生看不到「史家怎麼吵」「常見誤解」以外的段落；如果 prompt 或 hints 要學生讀「史家怎麼吵」，那張卡要設 `deep`。
3. **提示 2–3 段，一段比一段直接**。第一段指方向，最後一段幾乎說出答案。
4. **沒發生的選項只能推測**。`decision` 裡歷史沒走的路，`result` 要寫「推測：……歷史沒有走這條路，所以後果只能推測」。
5. **爭議要並列**。不要把其中一位學者的看法寫成定論，要寫「某某認為」。
6. **今日類比要說哪裡不成立**。`today` 的 `model_answer` 先說不能類比的地方，最後才說可以借來思考什麼。
7. **談錢的單元**要提醒後見之明與倖存者偏差，並寫「本單元不構成投資建議」。
8. **模擬題的說法要和模擬本身對得上**。例如 `debase` 模擬的是減少銀幣含銀量，拿它來談紙鈔時，要說「道理相通，但哪裡不一樣」。
9. 單元文字不要用 `[s1]` 這種來源代號，要用 `ref` 連回卡片。

## 四、流程

```
寫單元 ──► npm run validate（0 錯誤）
   │
   ▼
另開一個沒參與寫作的查核 agent：逐句對照卡片、檢查 ref、答案、排序、深度
   │
   ├─ 不通過 ──► 照查核者給的修正文字改 ──► 再查一次
   │
   └─ 通過 ──► 寫入 crosscheck（result: 通過）──► 出現在學習模式
```

開發時想先看到還沒查核的單元：`LEARN_DEV=1 npm run dev`。正式 build 不會顯示。

## 五、目前的 18 個單元

| 軌 | 單元 | 謎題 |
|---|---|---|
| 臺灣 | unit-taiwan-prehistory | 沒有文字的臺灣史：我們怎麼知道幾千年前的事？（2026-11-15） |
| 臺灣 | unit-formosa-wanted | 大航海時代：為什麼大家都搶著要臺灣？ |
| 臺灣 | unit-taiwan-qing | 清領兩百年：清朝為什麼要兩百年才認真看臺灣？ |
| 臺灣 | unit-taiwan-colony | 日本時代：殖民地的人怎麼爭取權利？ |
| 臺灣 | unit-taiwan-colony-economy | 日本時代的建設，是為了誰？（2026-11-15） |
| 臺灣 | unit-taiwan-democracy | 從戒嚴到投票：臺灣的民主是怎麼來的？ |
| 臺灣 | unit-taiwan-currency-1949 | 四萬換一塊：錢為什麼會變成廢紙？（談錢） |
| 臺灣 | unit-chip-island | 晶片島：臺灣怎麼從加工廠變成晶片重鎮？ |
| 東亞 | unit-imjin-war | 壬辰戰爭：同一場戰爭，為什麼有三個名字？ |
| 東亞 | unit-japan-meiji | 黑船來了：日本和清朝為什麼走出不同的路？ |
| 東亞 | unit-vietnam-china | 越南與中國：為什麼打贏了，還要去朝貢？（2026-11-07） |
| 東亞 | unit-hoi-an | 會安古鎮：越南的老街，為什麼滿是中國建築和漢字？（2026-11-07） |
| 東亞 | unit-ming-silver | 白銀帝國：明朝的錢為什麼要從地球另一邊運來？（談錢） |
| 世界 | unit-athens-sparta | 雅典與斯巴達：強權為什麼會開戰？ |
| 世界 | unit-rome-fall | 西羅馬為什麼會亡？一個問題，兩百多種答案 |
| 東亞 | unit-qin-rise-fall | 秦的興亡：十年統一天下，為什麼十五年就亡了？ |
| 世界 | unit-bubbles | 泡沫：大家都在賺錢的時候，為什麼會突然崩盤？（談錢） |
| 世界 | unit-money-origins | 錢是怎麼發明的？從神廟借據、第一枚硬幣到巴格達的支票（談錢，第 8 期，金融中心的前傳） |
| 世界 | unit-financial-centers／unit-financial-centers-2 | 金融中心為什麼會搬家？上：香檳、布魯日、安特衛普到熱那亞；下：阿姆斯特丹、倫敦到紐約（談錢，第 7 期；第 8 期加入熱那亞；2026-10-31 拆成上下兩個單元，各約 30 分鐘） |
| 世界 | unit-where-from | 你家從哪裡來？說的話、認同和祖先，為什麼不一定一樣（2026-11-09，人群圖層第 3 期，第一個用 `peoples` 步驟的單元） |
| 世界 | unit-america-rise／unit-america-rise-2 | 美國崛起：上：制度與立國思想；下：財政、土地、工業與美元（第 7 期；2026-10-31 拆成上下兩個單元，約 30、35 分鐘） |

> 上下兩半的單元用 `companion` 欄位互相指向；「史料、因果鏈、比較、決策、今日對照」等必備步驟只要兩半合起來齊全就通過 validate。

臺灣史的 8 個單元依年代接成一條路徑（每個單元的「接下來可以挖」會指向下一站）：

```
史前 ──► 荷西明鄭 ──► 清領兩百年 ──► 日本時代：爭取權利 ──► 日本時代：建設為了誰 ──► 戰後到投票 ──┬──► 四萬換一塊
         (1624)        (1684)        (1895)                (1920–30 年代)          (1947)       └──► 晶片島
```

（史前課 unit-taiwan-prehistory 與「日本時代的建設，是為了誰？」unit-taiwan-colony-economy 於 2026-11-15 加入。）

教學上的檢視紀錄見 `docs/pedagogy-review.md`。

每個單元可加 `reflect`：回顧後「回到自己」的反思題；決策步驟會先請學生寫下自己的想法再看選項。設計來源與呂世浩引用邊界見 `docs/lu-method.md`。

## 2026-11 新欄位（依試用報告第 2 批，全部選填、舊單元照常運作）

目的：單元 85% 的文字在讀卡片、每課只有約 4 題會對答案。新欄位讓「讀一段 → 馬上想一下」變成常態。

```
 hook ──► card（只展開 故事＋focus）──► quick 小題 ──► card ──► quick ──► source ＋ critique ──► chain ＋ followup ──► …
  └ guess 先猜猜看                                                                                 開放題：先寫 → 看參考 → 勾 points
```

| 步驟 | 新欄位 | 寫法 | 說明 |
|---|---|---|---|
| hook | `guess` | `{ q, options: [3–4 個], reveal }` | 「先猜猜看」：沒有對錯，選完記下來；回顧（recap）時顯示「你一開始猜的是…」與 `reveal`（一兩句說明歷史上的答案，事實要在本單元卡片裡找得到） |
| card | `focus` | `[C2, C5]` | 這一步要讀的段落代號（卡片類型的段落代號，另可寫 `story`、`sources`（史料）、`debate`（史家怎麼吵）、`terms`（名詞小抄）、`misc`（常見誤解）、`exaggerated`（可能被誇大）、`hindsight`（事後看很清楚的陷阱）、`misc`（常見誤解）、`exaggerated`（可能被誇大）、`hindsight`（事後看很清楚的陷阱））。畫面只展開「故事」＋這些段落，其他收成「想看更多」。沒寫＝只展開故事與 prompt 提到的部分 |
| card | `quick` | `[{ q, a }, …]` 1–2 題 | 讀完這張卡「先不要往回翻」的小題：學生心裡回答 → 按「想好了，看答案」→ 自評 答對／一半／沒答對。`a` 兩三句，事實必須在這張卡的必讀段落裡 |
| source、check 的 choice | `why_wrong` | 與 `options` 等長的陣列，正解那格寫 `null` | 每個錯選項一句話說錯在哪（選到那個選項時顯示）。可只先寫部分單元 |
| source | `critique` | `{ question, options, answer, explain, why_wrong? }` | 史料第二問：問「誰寫的、有什麼立場、這段話能證明什麼／不能證明什麼」，第一問答完才出現 |
| chain | `followup` | `{ question, options, answer, explain, why_wrong? }` | 排完後追問，例如「哪兩項之間只是先後、不是因果？」「哪一項是其他幾項的背景？」 |
| compare、today、recap、check 的 short | `points` | `[重點一, 重點二, …]` 2–4 個 | 參考說法的重點。學生要先寫（或按「我真的想不出來」）才能看參考說法，看完逐條勾「我有寫到／沒寫到」 |

寫題規則：

- `chain` 的 `items` 不要帶年份（帶年份就變成排年代）；`check` 裡的 `order` 題至少一半問因果或「先有什麼才有什麼」，不是純年代。
- 選擇題的誘答選項要是「常見誤解」或「看起來合理但證據不支持」的說法（卡片的「常見誤解」段落是好來源），長度和正解差不多；不要一眼可刪的選項。
- 新題目不放新史實：所有事實都要能在本單元用到的卡片裡找到。
- 單元的 `minutes` 仍可手填，但畫面顯示的時間由建置程式依字數自動算（必讀字數 ÷ 每分鐘 300 字 ＋ 每個互動 1.5 分鐘）。

## 年級與課綱（2026-11-15 第 3 批）

- `level`：`國中`｜`高中`｜`皆可`。單元與 `data/storylines.yaml` 的故事線都可以寫；首頁與「全部的課」可依年級篩選。
- `curriculum`：108 課綱歷史學習內容的條目代碼清單，例如 `["歷 Ea-IV-1"]`；代碼必須存在於 `data/curriculum.yaml`（國中 A–Q、高中必修 A–O，原文出自國教院公布的社會領域課綱 PDF），否則 validate 報錯。沒有對應就寫 `[]`。
- 對照頁：`?mode=learn&view=curriculum`。

## 2026-11 第 4f 批：四種新步驟＋專題總結任務（試用報告 #34，全部選填、舊課照常）

目的：43 課沒有一步是「看地圖回答」，也沒有「兩份史料並排讀」「看圖」「遷移到新案例」；專題頁只是資源目錄。新步驟的事實一律要能在用到的卡片裡找到（不新增史實）。

| type | 做什麼 | 欄位 | 進度鍵 |
|---|---|---|---|
| `mapq` 看地圖回答 | 內嵌小地圖（Leaflet，只有這一步才載入；手機高約 260px），點地圖上的 A、B、C… 或按下面的按鈕作答；兩次機會（第一次錯只提示）；答完顯示地名與解析。地圖載不到或離線時退回純按鈕選擇題 | `question`（必填）、`card`（用哪張卡的地點）、`places`（2–6 個，見下）、`answer`（places 的第幾個，從 0 起）、`explain`、`why_wrong`（與 places 等長，正解那格 `null`）、`hints`（2–3 段，選填）、`mode`（選填，`where`＝描述一個地點問在哪；`label`＝給一個地名問是哪一點，資料形狀相同，只是題幹不同）、`ref` | `r:m{步}` |
| `sources2` 兩份史料對讀 | 兩份史料並排（手機上下排）各標出處；先一題選擇，再一題開放題（先寫 15 字或按「我真的想不出來」才能看參考說法，逐條勾 points） | `a`、`b`（各 `{ card, idx }` 指到卡片 `primary_source` 第幾筆（從 0 起），或直接 `{ text, from }`）、`question`、`options`、`answer`、`explain`、`why_wrong`、`hints`、`ref`、`open`（選填：`{ question, points（2–4 個）, model_answer }`） | `r:x{步}`、`xo{步}`（開放題文字）、`w:xo{步}` |
| `image` 圖像史料 | 顯示卡片的圖片（沿用卡片圖片元件：授權標示、點圖放大、預留寬高），下面一題選擇題。題目只問圖上看得到的與卡片寫的 | `card`（必填，要有 `images`）、`idx`（第幾張，預設 0）、`question`、`options`、`answer`、`explain`、`why_wrong`、`look`（「先看哪裡」的提示清單）、`hints`、`ref` | `r:im{步}` |
| `transfer` 換個案例試試 | 標題「換個案例試試」，明示「這題在看你能不能把剛學的想法用到新的地方」；流程同開放題（先寫再看、勾 points、自評） | `case`（必填：一段卡片上有、但這一課前面沒教過的新情境）、`card`（案例出自哪張卡）、`question`、`points`（2–4 個）、`model_answer`、`hint`、`ref` | `t{步}`、`w:t{步}` |

`mapq.places[]`：`{ key 或 lat+lng, label, hint?, card? }`

- `key`：卡片 `place.locations` 的地點，可寫 `name_ancient`、`name_modern` 或座標 key（有 `pleiades_id` 寫 `p<id>`，否則 `緯度,經度` 兩位小數）。地點屬於哪張卡看這個點的 `card`，沒寫就用步驟的 `card`。建置時會把 `lat`、`lng` 補進單元資料（`label` 沒寫就用 `name_ancient`），所以畫面、學習單、報表都不必再查卡片。
- 沒有 `key` 時 `lat`、`lng`、`label` 都要寫。
- `label`：作答後才顯示的地名（作答前地圖上只有 A、B、C…）。
- `hint`：方位描述（例如「臺灣島西邊外海的小島」）。**建議每個點都寫**：地圖載不到時按鈕只剩 hint；複習（review）只有每個點都有 hint 才會收這題；學習單的示意圖下面的選項也用 hint。hint 只能描述座標上看得到的相對位置，不放新史實。

`sources2.a／b` 在建置時會補上 `text`、`from`（寫 `card`＋`idx` 的從卡片取）。`a` 和 `b` 不可以是同一份史料。

### 完成等級、報表、複習

- 新步驟都算「互動有作答」（`mapq`、`sources2` 的選擇題、`image` 是 rec；`sources2.open`、`transfer` 是 open，要寫滿 15 字或按「我真的想不出來」）。**不算自我檢查**：只有 `check` 步驟的選擇／排序題會影響「學會」（八成以上）。
- 報表（匯出頁、老師檢視、分享碼）一題一列：mapq 的選項寫地名；sources2 開放題與 transfer 列出學生寫的字與自評。
- 學習單：mapq 印沒有底圖的示意圖（上北下南）加方位 hint；sources2 印兩份史料；image 印圖與授權；transfer 印新案例與作答線；解答版有正解、解析、參考說法與 points。
- 複習抽題：mapq（每個點都有 hint）、sources2 選擇題（顯示兩份史料）、image 選擇題（顯示圖片）可以進複習與段考；開放題不自動對答案，不進複習。
- 預估時間：每個新步驟算 1 個互動（sources2 有 open 算 2 個），再加上史料或案例字數。

### 專題總結任務（`data/dives/*.yaml` 的 `capstone`）

```yaml
capstone:
  question: 一個較長的寫作題（連結專題各課）
  min: 80            # 選填：至少幾個字才能對照重點，預設 60，範圍 20–400
  points:            # 2–6 個重點（來自專題各課的 goals）
    - ……
  model_answer: ……   # 選填：參考說法
```

- 專題頁最下面（學習模式）：專題的 `units` 全部「走完」（按過「完成這一課」）之前顯示鎖住的說明與還差哪幾課（可點進去）；全部走完後出現寫作框。寫到字數才能對照重點，逐條勾「有寫到／沒寫到」，可複製文字、列印（列印版含姓名班級座號與自評）。
- 進度在 `Progress.capstone[<專題 id>]`（`{ text, pts?, seen?, skip?, more?, at? }`，見 `src/learn/level.ts` 檔頭）；備份匯入合併時同一個專題取 `at` 較新的、目前這台沒寫就用匯入的。
- 專題頁不顯示「見 docs/…」這類製作備註（`cleanNote`，`src/lib/dive.ts`）：只藏畫面，資料原封不動。

### 示範資料與依據

| 步驟 | 放在哪 | 依據 |
|---|---|---|
| mapq | `unit-formosa-wanted` 第 4 步 | `event-dutch-formosa` 的地點（大員、澎湖）與 C1／quick「1622 先占澎湖、1624 被趕出」；`event-spanish-north-taiwan` 的地點（雞籠社寮島、滬尾）與「西班牙主要據點」 |
| sources2 | `unit-taiwan-colony` 第 5 步 | `event-1895-cession` primary_source[1]（臺灣民主國宣言）、`event-taiwan-cultural-association` primary_source[0]（〈臨床講義〉）；「真正的盤算是希望列強干涉」見單元 quick |
| image | `unit-japan-meiji` 第 3 步 | `event-sakoku` 的圖片 0（出島圖）圖說，以及 C2／story「長崎可與中國、荷蘭貿易，荷蘭人被限制在出島」、C6「歐洲人中只剩荷蘭人」 |
| transfer | `unit-qin-rise-fall` recap 之前 | `war-seven-states-rebellion`（`event-han-inherits-qin` 的 effects）的 story、A2、A8 |
| capstone | `data/dives/sengoku.yaml` | 五課的 goals 與 mystery |
