# 歷史長河｜第 1 期計畫（待 ZL 確認）

> 依 `history-river-prompt.md` 第 1 節規則：先列計畫，等你確認才動手。
> 撰寫日期：2026-10-24

---

## 0. 我理解的目標（用我的話說）

你想要一個**只給自己用的「歷史思考工具」**，不是一個展示用網站。

要解決的問題是：
當你看到一則新聞或現象時，想快速找到「歷史上結構很像的案例」，
但現在這些知識散在書、網頁、腦袋裡，**查不到、對不起來、也分不清哪些是可靠事實**。

所以這個工具要做到三件事：

```
   ① 找得到              ② 看得懂                 ③ 用得上
 ┌──────────┐      ┌──────────────┐      ┌───────────────────┐
 │ 模糊搜尋  │ ──▶ │ 時間軸＋地圖   │ ──▶ │ 結構對照檢索        │
 │ 錯字/簡繁 │      │ 何時、何地、   │      │ 勾條件→找相似卡     │
 │ 古今地名  │      │ 跟誰有關       │      │ →三欄對照＋檢核表   │
 └──────────┘      └──────────────┘      └───────────────────┘
        ▲                  ▲                       ▲
        └──────────── 每張卡的事實都有可點的來源 ──────┘
                     （這是整個專案的地基）
```

第 1 期只做「希臘羅馬」這一段，先驗證整套流程跑得通。

---

## 1. 我會怎麼做（工作流程）

```
 雲端工作環境（我這邊）                         你的電腦
 ┌───────────────────────────┐            ┌──────────────────────────────┐
 │ 1. 上網查證 → 寫卡片 .md    │            │ C:\Users\ZL\Claude project\  │
 │ 2. 寫程式（Vite+React）     │  複製檔案   │   Long histroy\              │
 │ 3. npm run validate        │ ─────────▶ │   （完整專案＋git 紀錄）       │
 │ 4. 用瀏覽器自動跑驗收清單    │            │                              │
 │ 5. 每步 git commit（中文）  │            │ 你執行：npm install           │
 └───────────────────────────┘            │        npm run dev            │
                                          └──────────────────────────────┘
```

- 你的電腦需要先裝 **Node.js 20 以上**（若尚未安裝我會給步驟）。
- 卡片資料夾 `cards/` 可直接用 Obsidian 開啟。

---

## 2. 要建立的檔案

```
Long histroy/
├─ history-river-prompt.md      （你的原始指令，不動）
├─ package.json / vite.config.ts / tsconfig.json
├─ docs/
│   ├─ phase1-plan.md           本檔
│   ├─ card-fields.md           A/B/C/D 卡完整欄位＋核心/深入/選填標記
│   ├─ structure-tags.md        30–50 個結構標籤＋一句定義
│   ├─ framework-critiques.md   熱門框架（如修昔底德陷阱）的主要批評＋來源
│   └─ phase1-report.md         驗收回報（單一來源卡、查不到的欄位）
├─ cards/
│   ├─ war/  commodity/  event/  building/      每張卡一個 .md
├─ data/
│   ├─ borders/   歷代疆域 GeoJSON（historical-basemaps，挑第1期年代）
│   ├─ routes/    羅馬道路、主要航線（線條）
│   └─ places.json 地名座標（取自 Pleiades，含古名/今名）
├─ scripts/
│   ├─ build-index.ts   cards/ → public/index.json（含反向連結「被誰引用」、完整度%）
│   └─ validate.ts      必填欄位、斷連結、缺來源、標籤不在詞表內
└─ src/
    ├─ components/  Timeline / MapView / Search / Filters / CardDetail / StructureMatch
    ├─ lib/         search（Fuse＋拼音＋簡繁）、timeScale（非線性刻度）
    └─ App.tsx
```

---

## 3. 使用的套件（以及為什麼）

| 用途 | 選擇 | 理由 |
|---|---|---|
| 框架 | Vite + TypeScript + **React** | 生態最大、之後重做介面最容易找資源 |
| 地圖 | **Leaflet** + OpenStreetMap 免費圖磚 | 比 MapLibre 輕，手機上也順；GeoJSON 支援好 |
| 時間軸 | **自己用 D3 畫** | vis-timeline 不支援「早期稀疏、近代密集」的非線性刻度，D3 可自訂 |
| 模糊搜尋 | Fuse.js + pinyin-pro + opencc-js | 照你的指定：錯字靠拼音、簡繁靠 opencc |
| 卡片解析 | gray-matter（讀 YAML frontmatter） | Obsidian 相容 |
| 驗證 | zod（定義欄位規則） | validate 的錯誤訊息清楚 |
| 匯出 | 純前端產生 Markdown 下載 | 對照工作頁「匯出 Markdown」 |

**不串接任何 AI／LLM API。**

### 搜尋怎麼抓到錯字（教學用）

```
你輸入：「伯羅奔尼薩」
   │
   ├─ opencc：簡體→繁體（「罗马」→「羅馬」）
   ├─ pinyin-pro：轉拼音 → "bo luo ben ni sa"
   │
   ▼
跟每張卡的「名稱＋別名＋地名」的拼音比對
   "bo luo ben ni sa"  vs  "bo luo ben ni sa"（伯羅奔尼撒）→ 同音，命中！
   │
   ▼
Fuse.js 再做「容錯比對」（少一字、多一字也能中），依相似度排序
```

### 非線性時間軸（教學用）

```
線性刻度：  |-800 ......... -400 ......... 0 ......... 400|  每 100 年一樣寬
非線性刻度：|-800 .. -400 ..... 0 ........... 200 ....... 500|
            早期事件少 → 壓縮        事件密集區 → 拉開
（實作：依卡片密度做分段刻度，並可滑鼠滾輪縮放）
```

---

## 4. 第 1 期卡片清單（28 張，請確認）

以你的建議清單為準，我沒有增刪：

| 類型 | # | id | 名稱 |
|---|---|---|---|
| A 戰爭 | 1 | war-greco-persian | 波希戰爭（含薩拉米斯海戰） |
| | 2 | war-peloponnesian | 伯羅奔尼撒戰爭 |
| | 3 | war-second-punic | 第二次布匿戰爭 |
| | 4 | war-actium | 亞克興海戰 |
| | 5 | war-teutoburg | 條頓堡森林戰役 |
| B 物資 | 6 | commodity-laurion-silver | 勞里昂銀礦 |
| | 7 | commodity-egypt-grain | 埃及穀物輸羅馬 |
| | 8 | commodity-roman-concrete | 羅馬混凝土（火山灰） |
| | 9 | commodity-amphora-trade | 葡萄酒與橄欖油雙耳瓶貿易 |
| C 大事 | 10 | event-cleisthenes-reform | 克里斯提尼改革 |
| | 11 | event-death-of-socrates | 蘇格拉底之死 |
| | 12 | event-alexander-campaign | 亞歷山大東征 |
| | 13 | event-twelve-tables | 《十二銅表法》 |
| | 14 | event-rubicon | 凱撒渡盧比孔河 |
| | 15 | event-augustan-principate | 奧古斯都元首制 |
| | 16 | event-constitutio-antoniniana | 卡拉卡拉敕令（212） |
| | 17 | event-fall-western-rome | 西羅馬滅亡（476） |
| D 建築 | 18 | building-acropolis | 雅典衛城（含帕德嫩） |
| | 19 | building-theatre-dionysus | 酒神劇場 |
| | 20 | building-via-appia | 亞壁古道與羅馬道路網 |
| | 21 | building-roman-aqueducts | 羅馬水道（含加爾橋） |
| | 22 | building-forum-romanum | 羅馬廣場 |
| | 23 | building-colosseum | 競技場 |
| | 24 | building-pantheon | 萬神殿 |
| | 25 | building-hadrians-wall | 哈德良長城 |
| 中國錨點 | 26 | event-shang-yang-reform | 商鞅變法（摘要卡） |
| | 27 | event-qin-unification | 秦統一（摘要卡） |
| | 28 | event-zhang-qian-west | 張騫通西域（摘要卡） |

**驗收清單相關提醒**：「搜尋伊斯坦堡/拜占庭」這一項，目前清單裡沒有以拜占庭為地點的卡。
我打算在**波希戰爭**（拜占庭為海峽要地）與**埃及穀物/雙耳瓶貿易**（航線經過）的 `locations` 中
加入「拜占庭（今伊斯坦堡）」，前提是查得到來源；查不到就在回報中說明。

---

## 5. 資料來源與授權

| 資料 | 來源 | 授權 | 備註 |
|---|---|---|---|
| 歷代疆域 | historical-basemaps（aourednik） | **GPL-3.0**（已查證） | 個人使用沒問題；若日後公開散佈需保留授權聲明。地圖一律標「示意」 |
| 古地名座標 | Pleiades | CC BY | 每個點附 pleiades_id |
| 羅馬道路 | 優先 Itiner-e 或 DARMC | 動工時查證 | 授權不明就停下來問你 |
| 底圖 | OpenStreetMap 圖磚 | ODbL | 註明 © OSM |

---

## 6. 第 1 期執行順序（每步一個 commit）

```
步驟1 專案骨架＋docs（欄位定義、結構標籤詞表）
  │
步驟2 validate / build-index 腳本 ＋ 3 張樣板卡（先驗證格式）
  │      ← 這裡我會先給你看 1 張完整樣板卡，確認寫法
步驟3 時間軸 ＋ 地圖 ＋ 卡片詳情（雙向連結、高亮）
  │
步驟4 模糊搜尋 ＋ 篩選
  │
步驟5 結構對照檢索 ＋ 對照工作頁匯出
  │
步驟6 其餘 25 張卡（上網查證、附來源、標 verification）
  │
步驟7 手機版 ＋ 跑完驗收清單 ＋ phase1-report.md
```

---

## 7. 需要你決定的事

1. **卡片清單**：上面 28 張可以嗎？（含「拜占庭」地點的處理方式）
2. **原版欄位定義 A0–A12、B0–B10、C0–C10、D0–D8**：附錄說「沿用原版」，但我手上沒有原版。
   - 選項 a：你把原版檔案放進專案資料夾，我照抄並標等級
   - 選項 b：我依 prompt 第 3 節的核心欄位＋各類型常見需求**自己起草**，你再修
3. **程式存放與 git**：
   - 選項 a（推薦）：你在 GitHub 開一個空的私人 repo，我推上去，你的電腦也同步一份 → 不怕遺失
   - 選項 b：只放在你電腦的資料夾（含 .git 紀錄）
4. **技術選擇**：React + Leaflet + D3 自繪時間軸，同意嗎？
