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
| `card` | 讀一張卡 | `id`、`depth`（`story` 故事／`understand` 理解／`deep` 深入）、`prompt`（讀的時候注意什麼） |
| `source` | 讀一段一手史料 | `card`、`idx`（第幾筆 primary_source，從 0 起）、`question`、`options`、`answer`（從 0 起）、`explain`、`hints`、`ref` |
| `chain` | 把事件排成因果鏈 | `prompt`、`items`（**寫正確順序**，畫面會打亂）、`explain`、`hints`、`ref` |
| `compare` | 兩張卡並排比較 | `cards`（剛好 2 張）、`rows`（`aspect`、`a`、`b`）、`question`、`model_answer`、`hints` |
| `decision` | 「如果你是……你會怎麼選」 | `role`、`situation`、`options`（`label`、`result`）、`actual`、`ref`、`note` |
| `today` | 今天能不能這樣類比 | `card`（要有「不可類比的差異」段落）、`question`、`model_answer` |
| `sim` | 金融模擬 | `sim`（`debase` 降低銀幣成色／`bankrun` 銀行擠兌／`bubble` 泡沫）、`prompt` |
| `check` | 小測驗 | `items`：`choice`（`options`、`answer`）、`order`（`items` 寫正確順序）、`short`（`model` 參考說法）；每題都要 `explain`、`hints`，建議 `ref` |
| `recap` | 回顧，回答一開始的謎題 | `model_answer` |

`ref` 寫法：`卡片id`（整張卡）、`卡片id#story`（故事版）、`卡片id#C2`（某個段落，代號見 `docs/card-fields.md`）。答錯或看提示時，畫面會給一個按鈕跳回那裡。

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

## 五、目前的 12 個單元

| 軌 | 單元 | 謎題 |
|---|---|---|
| 臺灣 | unit-formosa-wanted | 大航海時代：為什麼大家都搶著要臺灣？ |
| 臺灣 | unit-taiwan-qing | 清領兩百年：清朝為什麼要兩百年才認真看臺灣？ |
| 臺灣 | unit-taiwan-colony | 日本時代：殖民地的人怎麼爭取權利？ |
| 臺灣 | unit-taiwan-democracy | 從戒嚴到投票：臺灣的民主是怎麼來的？ |
| 臺灣 | unit-taiwan-currency-1949 | 四萬換一塊：錢為什麼會變成廢紙？（談錢） |
| 臺灣 | unit-chip-island | 晶片島：臺灣怎麼從加工廠變成晶片重鎮？ |
| 東亞 | unit-imjin-war | 壬辰戰爭：同一場戰爭，為什麼有三個名字？ |
| 東亞 | unit-japan-meiji | 黑船來了：日本和清朝為什麼走出不同的路？ |
| 東亞 | unit-ming-silver | 白銀帝國：明朝的錢為什麼要從地球另一邊運來？（談錢） |
| 世界 | unit-athens-sparta | 雅典與斯巴達：強權為什麼會開戰？ |
| 世界 | unit-rome-fall | 西羅馬為什麼會亡？一個問題，兩百多種答案 |
| 世界 | unit-bubbles | 泡沫：大家都在賺錢的時候，為什麼會突然崩盤？（談錢） |

臺灣史的 6 個單元依年代接成一條路徑（每個單元的「接下來可以挖」會指向下一站）：

```
荷西明鄭 ──► 清領兩百年 ──► 日本時代 ──► 戰後到投票 ──┬──► 四萬換一塊
(1624)        (1684)        (1895)        (1947)       └──► 晶片島
```

教學上的檢視紀錄見 `docs/pedagogy-review.md`。
