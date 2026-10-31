# 第 7 期驗收回報：美國史與金融中心的轉移

日期：2026-10-31（臺北時間）

## 一、需求

1. 補足美國歷史：殖民與建國、建國理念與哲學、憲政、美元地位、美國為什麼強大、與其他國家的糾葛。
2. 補足金融史裡「經濟中心的轉移」：安特衛普的興衰到阿姆斯特丹的興衰，以及更早（香檳市集、威尼斯、布魯日）與之後（倫敦、紐約、東京、歐元）的歷史。
3. 保留原版以便回滾。

## 二、回滾

- tag `v1-before-us-finance`、分支 `backup/original`：都指向改版前的 `main`（0671880）。
- 回滾：`git checkout main && git reset --hard v1-before-us-finance`（或直接 revert 這次的合併）。

## 三、新增卡片（37 張）

| id | 名稱 | 年代 | 軌 | 來源數 | 連到的卡 |
|---|---|---|---|---|---|
| `event-thirteen-colonies` | 北美十三殖民地與殖民地自治（1607–1763） | 1607–1763 | west | 11 | 5 |
| `event-declaration-of-independence` | 《獨立宣言》與啟蒙思想 | 1776–1776 | west | 9 | 6 |
| `war-american-revolution` | 美國獨立戰爭 | 1775–1783 | west | 12 | 7 |
| `event-us-constitution` | 美國憲法、聯邦制與權利法案 | 1787–1791 | west | 14 | 2 |
| `finance-hamilton-financial-plan` | 漢彌爾頓財政計畫與美國第一銀行 | 1790–1811 | west | 9 | 7 |
| `event-westward-expansion` | 路易斯安那購地與西進擴張 | 1803–1890 | west | 14 | 8 |
| `event-monroe-doctrine` | 門羅主義 | 1823–1823 | west | 6 | 5 |
| `war-american-civil-war` | 南北戰爭 | 1861–1865 | west | 12 | 9 |
| `event-gilded-age-industrialization` | 鍍金時代：美國工業化與移民潮 | 1870–1913 | west | 13 | 8 |
| `war-spanish-american` | 美西戰爭與美國海外擴張 | 1898–1898 | west | 14 | 9 |
| `finance-federal-reserve` | 1907 年大恐慌與聯準會成立 | 1907–1913 | west | 10 | 9 |
| `event-american-century` | 「美國世紀」：美國為什麼成為超級強權 | 1941–1991 | west | 24 | 12 |
| `event-marshall-plan` | 馬歇爾計畫 | 1948–1952 | west | 5 | 5 |
| `event-containment-nato` | 杜魯門主義、圍堵政策與北約 | 1947–1949 | west | 11 | 8 |
| `war-korean-war` | 韓戰 | 1950–1953 | east | 8 | 7 |
| `war-vietnam-war` | 越戰（越南戰爭，1955–1975） | 1955–1975 | east | 12 | 8 |
| `event-nixon-china` | 尼克森訪華與美中建交 | 1971–1979 | china | 8 | 6 |
| `finance-petrodollar` | 石油美元體系 | 1973–1980 | west | 10 | 4 |
| `finance-plaza-accord` | 廣場協議 | 1985–1985 | west | 7 | 8 |
| `finance-dollar-reserve-currency` | 美元的國際儲備貨幣地位 | 1945–2025 | west | 16 | 10 |
| `war-war-on-terror` | 九一一事件與反恐戰爭 | 2001–2021 | west | 11 | 7 |
| `event-us-china-trade-war` | 美中貿易戰與科技戰 | 2018–2025 | china | 8 | 7 |
| `finance-champagne-fairs` | 香檳市集與中世紀匯票 | 1180–1320 | west | 7 | 5 |
| `finance-venice-rialto` | 威尼斯：里亞托與強制公債 | 1171–1500 | west | 8 | 7 |
| `finance-bruges-bourse` | 布魯日與「交易所（Bourse）」的誕生 | 1300–1500 | west | 7 | 6 |
| `finance-antwerp-bourse` | 安特衛普的黃金時代與新交易所 | 1501–1585 | west | 10 | 3 |
| `war-fall-of-antwerp` | 安特衛普的陷落與斯海爾德河封鎖 | 1576–1585 | west | 13 | 8 |
| `finance-amsterdam-wisselbank` | 阿姆斯特丹匯兌銀行（Wisselbank） | 1609–1820 | west | 5 | 8 |
| `finance-mississippi-bubble` | 約翰·羅與密西西比泡沫 | 1716–1720 | west | 7 | 5 |
| `finance-amsterdam-decline` | 阿姆斯特丹金融中心的衰落 | 1763–1795 | west | 7 | 9 |
| `finance-london-rise` | 倫敦取代阿姆斯特丹：拿破崙戰爭與羅斯柴爾德 | 1793–1815 | west | 10 | 7 |
| `finance-gold-standard` | 古典金本位與英鎊時代 | 1821–1914 | west | 10 | 11 |
| `finance-new-york-overtakes-london` | 紐約取代倫敦：一戰後英鎊退位 | 1914–1931 | west | 9 | 9 |
| `finance-eurodollar-big-bang` | 歐洲美元市場與倫敦金融城「大爆炸」 | 1957–1986 | west | 8 | 7 |
| `finance-japan-bubble` | 日本泡沫經濟與東京的興衰 | 1986–1991 | east | 10 | 8 |
| `finance-asian-financial-crisis` | 1997 亞洲金融風暴 | 1997–1998 | east | 4 | 6 |
| `finance-euro` | 歐元誕生與歐債危機 | 1999–2012 | west | 12 | 7 |

所有新卡都有 learn 區塊（美國相關卡都歸入「美國史」）、至少 1 筆「一手」或「學術」來源、verification「交叉確認」，以及 `crosscheck: 通過`。「被誰引用」由 `build-index` 自動產生，所以舊卡不必改，就能連回新卡。

## 四、其他變動

| 檔案 | 變動 |
|---|---|
| `data/histories.yaml` | 新增「美國史」（id `usa`，世界軌）；「歐洲史」加入「法蘭德斯與比利時」 |
| `data/civilizations.yaml` | 新文明「法蘭德斯與比利時」（布魯日、安特衛普兩個時期）；義大利加威尼斯、熱那亞、佛羅倫斯三個共和國時期；美國分 5 個時期（殖民地時期、建國初期、內戰與工業化、世界強權、冷戰後）；荷蘭、美國、拉丁美洲補別名；地名對照補上西班牙、葡萄牙、德國、蘇聯、俄羅斯、沙烏地阿拉伯、伊拉克、阿富汗、越南、南北韓、香港、歐盟等 |
| `docs/structure-tags.md` | 新標籤：金融中心轉移、儲備貨幣地位（金融條件）；憲政分權（敘事與制度）；經濟施壓與制裁（聯盟模式） |
| `data/units/unit-financial-centers.yaml` | 新單元：金融中心為什麼會搬家？（8 張卡） |
| `data/units/unit-america-rise.yaml` | 新單元：美國為什麼這麼強？（8 張卡；制度、地理資源、時機、美元多種解釋並列，也寫原住民遷徙與奴隸制的代價） |
| `docs/learn-units.md` | 單元表 12 → 14 |
| `scripts/qa/e2e.cjs`、`overlap.cjs` | 加入 `usa` |
| `scripts/lib/check.ts` | 新檢查：learn 的 why_care、story、historiography、exaggerated、hindsight、money_scale 必須是字串（模型曾把 exaggerated 寫成清單，畫面上會當掉） |
| `src/learn/LearnTimeline.tsx` | 背景軌標籤寬度估算由每字 11px 改用 `CH_W`（13px），與實際字寬一致；新卡改變時間軸比例後，臺灣軌兩個舊標籤會互相重疊 |
| `tools/cardgen/` | 生成器 `gen.ts` 與任務書 `specs.yaml`、`unit-specs.yaml` |
| `.gitignore` | 排除 `tools/cardgen/.out/`（模型原始回應與查核 JSON） |
| `README.md` | 第 7 期說明、網址小技巧、指令表、文件清單 |

## 五、生成流程（`tools/cardgen/gen.ts`）

模型：`claude-sonnet-5-5`（可用環境變數 `CARDGEN_MODEL` 改）。API key 只從環境變數 `ANTHROPIC_API_KEY` 讀，不寫進任何檔案。

```
draft  ──► 系統提示含 card-fields.md、標籤詞表、文明表、既有卡清單、3 張範例卡
  │
fix    ──► 跑 validate，把錯誤／警告交回模型修（最多 2 輪；YAML 解析錯誤先處理）
  │
urls   ──► 逐一抓來源網址，非 200 的交回模型換成可抓的網址（CARDGEN_FIXURLS=1）
  │
check  ──► 另一次呼叫（不帶寫作脈絡）比對「卡片」與「抓下來的來源原文」：
           不通過 → 依問題修正 → 再查；通過但有小建議 → 依建議修正
           結果寫入 crosscheck
  │
unit / unitcheck ──► 單元同樣流程：起草 → validate → 獨立查核
```

結果：37 張卡全部通過（war-fall-of-antwerp 第一次查核抓到「弗利辛恩在河口南岸」的方位錯誤，改成北岸後通過）；2 個單元通過。`npm run validate`：0 錯誤、0 警告。

本機測試：`npm run build`、`npm run typecheck` 通過；Playwright `e2e.cjs`（7 條歷史、每個單元每一步、3 個模擬、我的歷史地圖）全部通過；`research.cjs` 全部通過；`overlap.cjs` 在 1280 與 390 寬度都沒有重疊。e2e 第一次跑時抓到 4 張卡的 `exaggerated` 是清單／物件，導致兩個新單元某一步當掉；已改成字串，並在 validate 加上檢查。

## 六、判斷與限制（請過目）

1. **交叉查核是 AI 做的**：由另一次獨立的 Sonnet 呼叫比對抓到的來源原文，不是人工。卡片的 `crosscheck.by` 寫明了這一點。第 6 期的查核是「獨立查核 agent」，性質相同，但仍建議人工抽查（特別是數字）。
2. **李彔／哈拉瑞雙軌段**：一律寫「無直接論述」，沒有替他們編造觀點。
3. **不用 Britannica**：本機自動抓取一律 403，無法驗證，所以排除。少數 congress.gov、doi.org 網址對自動抓取回 403，但網址本身正確，保留。
4. ~~**熱那亞**沒有獨立成卡~~（第 8 期已補，見第八節）。
5. ~~美中貿易戰卡以 2025 年為終點~~（第 8 期已更新到 2026 年 10 月，見第八節）。
6. ~~沒有另開哲學專卡~~（第 8 期已補 `event-american-founding-philosophy`）。
7. 舊單元的 `next` 沒有改；新單元互相指向，也指向既有的泡沫、白銀單元。

## 七、端到端測試發現並修正的問題

- `scripts/qa/e2e.cjs` 第一次跑時，`unit-financial-centers` 第 12 步與 `unit-america-rise` 第 8 步畫面崩潰（`(e ?? "").replace is not a function`）。原因是 4 張新卡（containment-nato、hamilton-financial-plan、london-rise、plaza-accord）的 `learn.exaggerated` 被生成成清單或物件，不是字串。
- 已把這 4 張卡改成一段文字，並在 `scripts/lib/check.ts` 加上檢查：`why_care`、`story`、`historiography`、`exaggerated`、`hindsight`、`money_scale` 必須是字串，以後 validate 就會擋下來。
- 修正後 e2e（7 條歷史、14 個單元每一步、3 個模擬、研究模式）與 overlap（1280 寬）都全部通過。

## 八、第 8 期補充（2026-10-31，臺北時間）

需求：(1) 美中貿易戰卡更新到 2026 年 10 月，只用查得到的來源；(2) 美國立國哲學與啟蒙思想獨立成卡；(3) 熱那亞獨立成卡並接進金融中心鏈；(4) 補 12 世紀以前的金融史，接到勞里昂銀礦、五銖錢，並新增前傳單元。

### 新卡（9 張）

| id | 名稱 | 年代 | 來源數 | 連到的卡 |
|---|---|---|---|---|
| `event-american-founding-philosophy` | 美國立國哲學：啟蒙思想、自然權利與共和主義 | 1689–1788 | 19 | 8 |
| `finance-mesopotamia-credit` | 美索不達米亞的神廟借貸與《漢摩拉比法典》 | 前 3000–前 1595 | 8 | 4 |
| `finance-lydian-coinage` | 呂底亞：最早的鑄幣 | 前 650–前 546 | 8 | 4 |
| `finance-athens-trapezitai` | 雅典的銀行家（trapezitai）與海上借貸 | 前 450–前 322 | 6 | 4 |
| `finance-roman-argentarii` | 羅馬的銀行家（argentarii）與第納里烏斯 | 前 211–260 | 9 | 8 |
| `finance-byzantine-solidus` | 拜占庭金幣索利都斯：七百年的「中世紀美元」 | 309–1092 | 8 | 6 |
| `finance-abbasid-sakk-hawala` | 阿拔斯巴格達：支票（sakk）、匯兌（hawala）與拉唐商人 | 762–1050 | 14 | 6 |
| `finance-casa-di-san-giorgio` | 熱那亞聖喬治銀行（Casa di San Giorgio） | 1407–1805 | 3 | 5 |
| `finance-age-of-genoese` | 「熱那亞人的世紀」：熱那亞銀行家與西班牙帝國 | 1557–1627 | 12 | 7 |

北宋交子已有 `finance-jiaozi`，沿用不重做，只加上往阿拔斯 sakk 的連結。

### 改寫的卡

- `event-us-china-trade-war`：年代改為 2018–2026，來源 8 → 17（新增白宮日內瓦聯合聲明、中國政府網、白宮 2025-11 與 2026-05 情況說明、最高法院 24-1287 判決 PDF、USTR 葛里爾聲明、Honigman、商務部第八輪經貿磋商新聞稿〔2026-09-28〕、WSGR 分析）。補上 2025 年芬太尼關稅、4 月關稅升到 125%／145% 與稀土管制、日內瓦／倫敦／斯德哥爾摩會談、9/29 關聯企業規則、10 月稀土新管制與 100% 威脅、10/30 釜山會晤；2026 年 2/20 最高法院判 IEEPA 關稅違法、改用 122 條 10%（2/24–7/24）、5 月北京峰會、7/24 依 301 條強迫勞動調查課稅（中國 12.5%）、9 月第八輪磋商與習近平訪美（經貿委員會、各 300 億美元「30 換 30」降稅、AI 對話、休戰延到 2027-01-10）。**最新事件：2026 年 9 月下旬；狀態寫到 2026 年 10 月**（關聯企業規則暫停是否正式延長，截至 10 月尚無白宮或 BIS 正式文件，卡上註明待確認）。
- 手動加上前向連結（`links:`）：《獨立宣言》、憲法、十三殖民地 → 立國哲學；勞里昂銀礦 → 呂底亞、雅典銀行家；五銖錢 → 呂底亞、羅馬銀行家；交子 → 阿拔斯；香檳市集 → 阿拔斯、熱那亞人的世紀；威尼斯 → 聖喬治銀行、索利都斯、阿拔斯；安特衛普交易所、安特衛普陷落、白銀流動 → 熱那亞人的世紀；梅迪奇銀行、英格蘭銀行 → 聖喬治銀行。（只動 `links`，正文不變，原有查核仍有效。）

### 單元

- 新單元 `unit-money-origins`（錢是怎麼發明的？從神廟借據、第一枚硬幣到巴格達的支票），9 張卡，金融中心鏈的前傳；next：金融中心、白銀帝國、雅典與斯巴達。
- `unit-financial-centers`：加入熱那亞人的世紀與聖喬治銀行兩個卡片步驟，因果鏈與測驗加入熱那亞；鏈條改為香檳 → 布魯日 → 安特衛普 → 熱那亞 → 阿姆斯特丹 → 倫敦 → 紐約；next 改為前傳、美國崛起、泡沫。
- `unit-america-rise`：加入立國哲學卡片步驟與相關題目，保留「洛克影響有多大、自由主義與共和主義之爭」的提醒。
- 三個單元都重新跑過獨立查核。單元總數 14 → 15。

### 生成流程的新增

- `gen.ts revise <id>`：拿既有卡片加上任務書的 `revise` 欄位（已查證的事實與網址）交給模型改寫，清掉舊的 crosscheck，再走 fix → urls → check。
- `gen.ts unitrevise <id>`：單元同樣做法，改完自動跑 validate 修正。
- 選擇「改寫」而不是「重新起草」，是為了保留已查核過的內容。

### 其他變動

- `data/civilizations.yaml`：中亞與西亞新增「美索不達米亞」（蘇美、古巴比倫、新亞述與新巴比倫）、「安納托利亞」（呂底亞）；伊斯蘭世界加「阿拔斯王朝」；地名對照補熱那亞、呂底亞、阿拔斯王朝、雅典、古巴比倫、蘇美。

### 判斷（請過目）

1. 貿易戰卡只寫查得到官方或可信來源的事；查不到的（例如關聯企業規則延長是否生效）標「待確認」，沒有推測。
2. 美索不達米亞、呂底亞等卡放在世界軌（west），與既有勞里昂銀礦卡一致。
3. 拉唐商人（Radhanites）沒有獨立成卡，寫在阿拔斯卡裡；學界對他們的規模與路線仍有爭議，卡上有註明。
4. 少數網址（Perseus、congress.gov、mofcom、wsgr、Princeton 出版社）對自動抓取回 403／500，但人工確認網址真實，保留；兩個 404 的 Wikipedia 網址與一個 Princeton ISBN 頁已換掉。
5. `finance-mesopotamia-credit` 的 learn.story 約 348 字，超過建議的 150–250 字（只是警告，不擋 build）。
