# 今日對照層：資料格式與更新方式（第 4 期）

今天的數字會過時，所以這一層和歷史卡片分開放在 `data/today/today.yaml`，而且每一項都必須有 `data_as_of`（資料截至）。

```
sources:      來源清單（id、title、url、accessed）
chokepoints:  今日咽喉要道
  id、name、lat、lng、precision（exact／schematic）
  data_as_of    本項引用的最新資料的日期（YYYY-MM-DD，必填）
  verification  AI草稿／交叉確認／爭議
  structure_tags 只能用 docs/structure-tags.md 的詞
  facts         現況與數字：{ text, src }
  events        近年事件：{ date, text, src }（date 可寫「2023-10 起」「約 2004」）
  counterparts  對應的歷史卡片：{ id, note（要寫「相似」與「不同」）, src }
  non_analogous 不可類比的差異
chains:       今日供應鏈（格式同第 3 期物資鏈）
  data_as_of、counterparts（歷史卡 id 清單）、chokepoints（經過的今日咽喉）
  steps：name、lat、lng、role、text、src
         via   沿用 data/routes/routes.yaml 已算好的海路
         path  為了不穿過陸地而手動設定的海上轉折點（示意，不是實際航跡）
```

## 檢查規則（npm run validate）

- 缺 `data_as_of` 或格式錯 → 錯誤
- `data_as_of` 超過 18 個月 → 警告「可能過時」，畫面上該項變成灰色
- 每一項至少要連到一張歷史卡片；對照說明必須寫出「不同」
- 每一條事實、事件、節點都要有來源

## 怎麼更新

1. 上網查最新數字（優先：EIA、IEA、UNCTAD、各運河管理局、Lloyd's List，再來是主要媒體）。
2. 改 `today.yaml` 的數字與來源，並把 `data_as_of` 改成最新資料的日期。
3. 執行 `npm run validate`，然後 `npm run dev` 看畫面。

只寫已經發生的事實與結構，不寫預測，也不寫投資建議。

網址小技巧：`?today=today-hormuz` 直接打開霍爾木茲海峽；`?chain=today-chain-black-sea-grain` 直接播放黑海穀物鏈。
