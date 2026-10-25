# 經濟曲線與物資鏈：資料格式（第 3 期）

## 經濟曲線 `data/economy/series.yaml`

```
sources:  來源清單（id、title、url、accessed）
metrics:  指標（population 人口｜gdp_pc 人均 GDP｜silver 銀幣含銀率），scale 可為 log 或 linear
series:   數列
  └ points：每一個有來源的點
       entity        對象（例如「義大利」「漢朝戶口」）
       start / end   年份（前為負）；只有一年就只寫 start
       value         單一數值，或 low / high 表示範圍（兩者擇一）
       src           來源 id（必填）
       verification  可覆寫數列的查證狀態（AI草稿｜交叉確認｜爭議）
       note          說明
```

規則：年份必須在前 800 到 500 年之間；不補線、不內插，沒有資料的年代就留白。`kind` 標明性質：估計（學者推算）、登記（官方戶口或普查，不等於實際人口）、實測（錢幣化驗）。

## 物資鏈 `data/chains/chains.yaml`

```
chain: id、card（物資卡 id）、name、start、end、sources（本鏈額外來源，可省略）
  └ steps：依順序的節點
       name、lat、lng、role（產地｜加工｜集散｜運輸｜消費｜決策）、text（一句說明）
       src   先找本鏈 sources，再找物資卡的 sources
       via   從上一個節點走到這裡時，沿用哪一條已畫路線（routes.yaml 的 id）；沒寫就是點線「路線示意」
```

`npm run build:index` 會把每一段（leg）算成線條：有 via 時取路線上離兩端最近的那一段，頭尾若和節點有距離就補點線；只標站點的路線（例如張騫）一律畫成點線。`npm run validate` 會檢查座標、角色、來源與路線 id。

網址小技巧：`?chain=chain-silk` 直接打開並準備播放絲綢鏈。
