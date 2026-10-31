# 歷史長河（第 8 期：美國史、金融中心的轉移與錢的起源）

個人用的「歷史思考工具」：用模糊搜尋或勾選結構條件，找到結構相似的歷史案例；每張卡片都有時間軸、地圖位置與可點的來源。

```
  搜尋／勾條件 ──► 找到相似卡片 ──► 看時間軸＋地圖 ──► 讀卡片與來源 ──► 匯出對照工作頁（Markdown）
```

第 2 期加入中國軌道：時間軸上下兩條（希臘羅馬／中國），卡片頁有「中西對照」，地圖可切「地中海／中國／歐亞」，結構對照可只看一邊或「中西各挑兩張」。

第 3 期加入經濟曲線與物資鏈：時間軸右上角「經濟曲線」可切換人口、人均 GDP、銀幣含銀率（只畫有來源的點，點一下看來源）；物資卡上按「播放物資鏈」，地圖上會有紅點沿著產地、運輸、消費地移動。

第 4 期加入今日對照層：地圖右上角「◆ 今日對照層」會疊上 6 個當代咽喉要道（霍爾木茲、麻六甲、蘇伊士、曼德、土耳其海峽、巴拿馬）與 3 條今日供應鏈，每一項都標「資料截至」；歷史卡片頁會列出結構相似的今日咽喉。今天的數字會過時，更新方式見 `docs/today-layer.md`。

第 5 期把時間軸從前 800 年延伸到今天：補上中世紀、近代、現代的中西對照卡；新增「技術」卡（造紙、火藥、印刷、蒸汽機、鐵路、電報、電網、內燃機、貨櫃、網路等），在時間軸下方另成一條技術軌，橫條從「發明」畫到「大規模普及」；新增「金融」卡（交子、梅迪奇銀行、阿姆斯特丹交易所、英格蘭銀行、紐約證交所、山西票號、大蕭條、布列敦森林、臺灣證交所、2008 金融危機），另成金融軌；時間軸上方可一鍵跳到「上古／中古／近代／現代」；篩選面板的「文明」改成「地區 > 文明／國家 > 朝代時期」三層樹（分類表在 `data/civilizations.yaml`）；地圖補上 600–2010 年的疆域快照（`npm run borders` 可重新下載）。細節見 `docs/phase5-report.md`。

第 6 期加入給國高中生的**學習模式**（右上角「學習模式」，或網址 `?mode=learn`）。研究模式的畫面與網址參數不變。學習模式裡：

```
選一條「XX史」（臺灣、日本、中國、希臘羅馬、錢的歷史、世界通史…）
   └─► 看「謎題」挑一個單元 ──► 一步一步做：讀卡片 → 讀史料 → 排因果鏈 → 比一比 → 你會怎麼選 → 今天能不能類比 → 小測驗 → 回顧
   └─► 也可以直接讀卡片（故事／理解／深入三層）、玩 3 個金融模擬、看「我的歷史地圖」
```

只有「有學習區塊、而且通過獨立交叉查核」的卡片和單元才會出現在學習模式。2026-10-26 以教學角度檢視後，補上清領、日治、戰後政治史共 10 張臺灣史卡與 3 個單元，臺灣史從 1624 到 1996 接成一條學習路徑（見 `docs/pedagogy-review.md`）。單元怎麼寫見 `docs/learn-units.md`，細節見 `docs/phase6-report.md`。

第 7 期補上**美國史**與**金融中心的轉移**，共 37 張新卡、2 個新單元：

- 美國史（22 張）：十三殖民地、《獨立宣言》與啟蒙思想、獨立戰爭、憲法與聯邦制、漢彌爾頓財政計畫、西進擴張、門羅主義、南北戰爭、鍍金時代、美西戰爭、聯準會、「美國世紀」、馬歇爾計畫、圍堵與北約、韓戰、越戰、尼克森訪華、石油美元、廣場協議、美元儲備貨幣地位、反恐戰爭、美中貿易戰。學習模式多了一條「美國史」（`?mode=learn&history=usa`）。
- 金融中心的轉移（15 張）：香檳市集 → 威尼斯 → 布魯日 → 安特衛普的興衰（含 1585 年陷落與斯海爾德河封鎖）→ 阿姆斯特丹匯兌銀行與它的衰落 → 倫敦崛起、金本位 → 紐約取代倫敦 → 歐洲美元與倫敦「大爆炸」、東京泡沫、亞洲金融風暴、歐元；另有密西西比泡沫。
- 新單元：`unit-america-rise`（美國為什麼這麼強？）、`unit-financial-centers`（金融中心為什麼會搬家？）。

第 8 期（2026-10-31）再補 9 張新卡、1 個新單元：

- 美國立國哲學獨立成卡（洛克、孟德斯鳩、自然權利、社會契約、分權、《聯邦黨人文集》、共和主義），《獨立宣言》、憲法卡與「美國崛起」單元都連過去。
- 熱那亞獨立成卡：聖喬治銀行、「熱那亞人的世紀」（1557–1627，熱那亞銀行家融資哈布斯堡西班牙），接進金融中心鏈（安特衛普 → 熱那亞 → 阿姆斯特丹）。
- 12 世紀以前的金融史：美索不達米亞神廟借貸與《漢摩拉比法典》、呂底亞鑄幣、雅典 trapezitai、羅馬 argentarii、拜占庭索利都斯、阿拔斯 sakk／hawala 與拉唐商人，加上既有的北宋交子；新前傳單元 `unit-money-origins`（錢是怎麼發明的？）。
- 美中貿易戰卡更新到 2026 年 10 月（日內瓦休戰、釜山會晤、最高法院判 IEEPA 關稅違法、北京峰會、第八輪磋商與休戰延到 2027-01-10）。
- 文明分類新增「法蘭德斯與比利時」，美國分成 5 個時期；結構標籤新增「金融中心轉移」「儲備貨幣地位」「憲政分權」「經濟施壓與制裁」。
- 卡片由 `tools/cardgen/gen.ts` 呼叫 Claude Sonnet（`claude-sonnet-5-5`）起草，再經 `npm run validate`、網址檢查、另一次獨立呼叫比對來源原文的交叉查核。細節與還沒做的事見 `docs/phase7-report.md`。改版前的版本保留在 tag `v1-before-us-finance` 與分支 `backup/original`。

---

## 一、第一次使用（Windows）

### 1. 安裝 Node.js（只要做一次）

1. 打開 <https://nodejs.org/>，下載 **LTS**（長期支援版，20 版以上都可以）。
2. 執行安裝檔，全部按「下一步」即可（保持勾選「Add to PATH」）。
3. 安裝完，開「命令提示字元」或「PowerShell」，輸入下面兩行確認：

   ```
   node -v
   npm -v
   ```

   看到版本號（例如 `v22.x.x`）就成功了。

### 2. 安裝本專案需要的套件（只要做一次）

在檔案總管進到這個資料夾（`Long histroy\history-river`），在網址列輸入 `cmd` 按 Enter，會開一個指向此資料夾的視窗，然後輸入：

```
npm install
```

大約 1–2 分鐘，完成後會多一個 `node_modules` 資料夾（不用管它）。

### 3. 啟動

```
npm run dev
```

瀏覽器會自動打開 <http://localhost:5173/>。要關掉時，在視窗按 `Ctrl + C`。

> 以後每次使用只要做第 3 步。

---

## 二、常用指令

| 指令 | 做什麼 |
|---|---|
| `npm run dev` | 啟動網頁（會先重建索引；改卡片會自動更新畫面） |
| `npm run validate` | 檢查所有卡片格式、來源、標籤是否正確 |
| `npm run places` | 新增了 Pleiades 地點後，重新抓座標 |
| `npm run routes` | 改了 `data/routes/routes.yaml` 之後，重新計算道路、航線、長城的線條 |
| `npm run roads` | （選用）下載 Itiner-e 羅馬道路細線（約 78 MB，只要做一次） |
| `npm run labels` | 重新產生地圖上的繁中＋英文地名（`data/labels/basemap-labels.json`）；改譯名請改 `data/labels/basemap-overrides.yaml` |
| `npm run build` | 檢查＋打包成靜態網頁到 `dist/` |
| `LEARN_DEV=1 npm run dev` | 開發時讓還沒通過查核的學習卡與單元也顯示（正式 build 不會用） |
| `node scripts/qa/e2e.cjs http://localhost:4173/` | 先 `npm run build` 再 `npx vite preview`，然後自動走過 7 條歷史的每個單元每一步、3 個模擬；同資料夾還有 `research.cjs`（研究模式回歸）、`overlap.cjs`（時間軸標籤重疊）、`shot.cjs`（截圖）。需要 Playwright |
| `node scripts/qa/labels.cjs http://localhost:4173/` | 地圖名稱都是繁中＋英文：底圖地名、案例地點、疆域、今日咽喉（說明見 docs/map-names.md） |
| `npx tsx tools/cardgen/gen.ts draft\|revise\|fix\|urls\|check\|unit\|unitrevise\|unitcheck [id ...]` | 第 7、8 期的卡片生成器（`revise`／`unitrevise` 依任務書的 `revise` 欄位改寫既有卡片或單元）：用 Claude Sonnet 起草、依 validate 修正、檢查網址、獨立查核（需要環境變數 `ANTHROPIC_API_KEY`；任務書在 `tools/cardgen/specs.yaml`、`unit-specs.yaml`；中間檔在 `tools/cardgen/.out/`，不進 git） |
| `node scripts/qa/layout.cjs http://localhost:4173/` | 桌機版可拖曳分隔線：拖曳、重整後記住、收起時間軸、鍵盤、「⟲ 版面」重設、小視窗、手機無分隔線（說明見 docs/layout-report.md） |

## 三、用 Obsidian 編輯卡片

1. Obsidian →「開啟資料夾作為儲存庫」→ 選 `history-river` 資料夾。
2. 卡片在 `cards/` 底下，一張卡一個 `.md` 檔。欄位規則見 `docs/card-fields.md`，結構標籤只能用 `docs/structure-tags.md` 裡的詞。
3. 改完存檔；如果 `npm run dev` 正在跑，網頁會自動重新整理。
4. 改完建議跑一次 `npm run validate`，它會用中文告訴你哪張卡哪裡有問題。

```
一張卡長這樣：
---                         ← 上面是「核心資料」（YAML）：名稱、年份、地點、標籤、來源
id: war-peloponnesian
sources:
  - { id: s1, title: ..., url: ..., accessed: 2026-10-24 }
---
## A1 交戰方與聯盟結構        ← 下面是內文段落
雅典與提洛同盟……[s1]          ← [s1] 對應上面的來源，網頁上可以點
```

## 四、網址小技巧

- `http://localhost:5173/?year=100`：直接跳到西元 100 年
- `http://localhost:5173/?card=building-pantheon`：直接打開某張卡
- `http://localhost:5173/?q=羅馬`：直接搜尋
- `http://localhost:5173/?chain=chain-silk`：直接打開絲綢物資鏈
- `http://localhost:5173/?today=today-hormuz`：直接打開今日對照層的霍爾木茲海峽
- `http://localhost:5173/?mode=learn&history=taiwan`：學習模式的臺灣史
- `http://localhost:5173/?mode=learn&history=usa`：學習模式的美國史
- `http://localhost:5173/?mode=learn&unit=unit-financial-centers`：金融中心為什麼會搬家？
- `http://localhost:5173/?mode=learn&unit=unit-money-origins`：錢是怎麼發明的？
- `http://localhost:5173/?mode=learn&unit=unit-ming-silver`：直接打開一個單元
- `http://localhost:5173/?mode=learn&sim=bubble`：直接打開泡沫模擬（另有 `debase`、`bankrun`）
- `http://localhost:5173/?mode=learn&view=mymap`：我的歷史地圖

## 五、資料來源與授權

| 資料 | 來源 | 授權 |
|---|---|---|
| 疆域（示意） | historical-basemaps（aourednik） | GPL-3.0 |
| 古地名座標 | Pleiades | CC BY 3.0 |
| 古代道路網與城牆 | AWMC geodata（依《巴林頓古典世界地圖集》） | ODbL 1.0 |
| 海岸線（算海路用） | Natural Earth 1:10m（world-atlas 套件） | 公有領域 |
| 羅馬道路細線（選用） | Itiner-e，Zenodo 10.5281/zenodo.17122148 | CC BY 4.0 |
| 人口、人均 GDP（西元 1–2022 年） | Maddison Project Database 2023（Bolt & van Zanden 2024）；各國原始研究列在資料點說明 | CC BY 4.0 |
| 實質工資（一天工資買幾籃生活必需品，1820–2008） | Clio Infra，de Zwart, van Leeuwen & van Leeuwen-Li（2015）Labourers Real Wage | CC0 |
| 臺灣名目月薪（1980–2025）、物價指數（1981–2025）；實質月薪為本站計算 | 行政院主計總處，經政府資料開放平臺取得 | 政府資料開放授權條款第 1 版 |
| 英格蘭名目日薪、英國物價、英國實質工資（1209–2016） | 英格蘭銀行 A millennium of macroeconomic data 3.1 版（工資為 Clark 2009） | Open Government Licence（第三方資料版權屬原作者） |
| 底圖（不含文字） | OpenFreeMap 向量圖磚 © OpenMapTiles，資料 © OpenStreetMap；樣式改自 OpenFreeMap Liberty（`docs/licenses/`） | 資料 ODbL；樣式 MIT／BSD-3 |
| 地圖地名（繁中＋英文） | Natural Earth 國家、城市、海洋、地形區、河流；中文經 OpenCC 轉臺灣用字並人工校訂 | 公有領域 |

卡片內文每段都附來源連結；本工具只是思考框架，不構成預測或投資建議。

**本專案授權**：因為使用了 GPL-3.0 的疆域資料，程式碼與整體作品以 GPL-3.0 釋出（見 `LICENSE`）；AWMC 道路資料維持 ODbL 1.0（見 `data/awmc/LICENSE.txt`）。網站上的「出處」頁（`public/credits.html`）列出完整來源。

**線上版**：推到 GitHub 的 `main` 分支後，`.github/workflows/pages.yml` 會自動建置並發布到 GitHub Pages（網址 `https://zlo-25.github.io/Long-History/`）。

## 六、文件

- `docs/phase1-plan.md`：第 1 期計畫
- `docs/phase1-report.md`：第 1 期驗收回報（做了什麼、沒做什麼、已知問題）
- `docs/phase2-plan.md`：第 2 期計畫（中國卡與中西對照）
- `docs/phase2-report.md`：第 2 期驗收回報
- `docs/phase3-plan.md`、`docs/phase3-report.md`：第 3 期計畫與驗收回報
- `docs/economy-and-chains.md`：經濟曲線與物資鏈的資料格式
- `docs/phase4-plan.md`、`docs/phase4-report.md`：第 4 期計畫與驗收回報
- `docs/today-layer.md`：今日對照層的資料格式與更新方式
- `docs/card-fields.md`：卡片欄位規格
- `docs/structure-tags.md`：結構標籤詞表
- `docs/phase6-plan.md`、`docs/phase6-report.md`：第 6 期（學習模式）計畫與驗收回報
- `docs/learn-units.md`：學習單元的寫法與檢查規則
- `docs/screenshots/phase6/`：375 與 1280 寬的截圖
- `docs/phase7-report.md`：第 7 期（美國史與金融中心的轉移）與第 8 期補充的驗收回報、生成流程與判斷
- `docs/map-names.md`：地圖名稱改成繁中＋英文的做法、資料檔與怎麼改譯名（截圖在 `docs/screenshots/map-names/`）
