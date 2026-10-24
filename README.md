# 歷史長河（第 1 期）

個人用的「歷史思考工具」：用模糊搜尋或勾選結構條件，找到結構相似的歷史案例；每張卡片都有時間軸、地圖位置與可點的來源。

```
  搜尋／勾條件 ──► 找到相似卡片 ──► 看時間軸＋地圖 ──► 讀卡片與來源 ──► 匯出對照工作頁（Markdown）
```

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
| `npm run roads` | 下載 Itiner-e 羅馬道路細線（約 78 MB，只要做一次） |
| `npm run build` | 檢查＋打包成靜態網頁到 `dist/` |

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

## 五、資料來源與授權

| 資料 | 來源 | 授權 |
|---|---|---|
| 疆域（示意） | historical-basemaps（aourednik） | GPL-3.0 |
| 古地名座標 | Pleiades | CC BY 3.0 |
| 羅馬道路細線（選用） | Itiner-e，Zenodo 10.5281/zenodo.17122148 | CC BY 4.0 |
| 底圖 | OpenStreetMap | ODbL |

卡片內文每段都附來源連結；本工具只是思考框架，不構成預測或投資建議。

## 六、文件

- `docs/phase1-plan.md`：第 1 期計畫
- `docs/phase1-report.md`：第 1 期驗收回報（做了什麼、沒做什麼、已知問題）
- `docs/card-fields.md`：卡片欄位規格
- `docs/structure-tags.md`：結構標籤詞表
