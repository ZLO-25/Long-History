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
4. **熱那亞**沒有獨立成卡，只放進文明分類；「更早期」從 12 世紀香檳市集開始，沒有往前寫巴格達、開羅等伊斯蘭金融中心（已有的梅迪奇銀行等卡可銜接）。
5. **2025 年以後的事**：美中貿易戰卡以 2025 年為終點，之後的發展標「未知」。
6. 「哲學」部分放在《獨立宣言》與啟蒙思想、憲法與《聯邦黨人文集》兩張卡，沒有另開哲學專卡。
7. 舊單元的 `next` 沒有改；新單元互相指向，也指向既有的泡沫、白銀單元。

## 七、端到端測試發現並修正的問題

- `scripts/qa/e2e.cjs` 第一次跑時，`unit-financial-centers` 第 12 步與 `unit-america-rise` 第 8 步畫面崩潰（`(e ?? "").replace is not a function`）。原因是 4 張新卡（containment-nato、hamilton-financial-plan、london-rise、plaza-accord）的 `learn.exaggerated` 被生成成清單或物件，不是字串。
- 已把這 4 張卡改成一段文字，並在 `scripts/lib/check.ts` 加上檢查：`why_care`、`story`、`historiography`、`exaggerated`、`hindsight`、`money_scale` 必須是字串，以後 validate 就會擋下來。
- 修正後 e2e（7 條歷史、14 個單元每一步、3 個模擬、研究模式）與 overlap（1280 寬）都全部通過。
