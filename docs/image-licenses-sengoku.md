# 日本戰國專題：21 張卡的圖片授權查證（2026-11-10）

第 2 期寫卡時連不到 Wikimedia Commons，22 個圖檔（21 張卡；南蠻船那張兩卡共用）的授權只是依年代推定，先抽到 `data/pending-images.yaml` 不上線。
這次雲端環境允許了 commons.wikimedia.org／upload.wikimedia.org，逐檔用 Commons API（extmetadata）和檔案頁原文（action=raw）核對後全部放回卡片，暫存檔已清空刪除。

## 結果總覽

```
22 個檔案
 ├─ 21 個 公有領域（PD-Japan／PD-Art／PD-old-100 等）
 ├─  1 個 CC0（大都會藝術博物館開放取用：大名行列圖）
 ├─  0 個 不能用
 └─  3 個 換成更好的版本（授權一樣是公有領域）
```

## 換掉的 3 張

| 卡 | 原本 | 換成 | 原因 |
|---|---|---|---|
| event-sakoku（出島圖） | View_of_Dejima…c1836.jpg（**CC BY-SA 4.0**，修復後版本由攝影師授權） | View_of_Deshima_in_Nagasaki_Bay_by_Kawahara_Keiga.jpg（PD-old-100） | 同一件作品的公有領域版本，不必背 BY-SA 的署名與相同方式分享義務 |
| person-date-masamune（政宗像） | Date_Masamune_by_Kano_Tanyu….jpg（只有 200px 寬） | Date_Masamune.jpg（仙台市博物館藏，狩野安信，1676 年頃，PD-100，652px） | 原檔太小；新檔的畫師正好就是卡片原本註記「一般稱狩野安信筆」 |
| person-uesugi-kenshin（謙信像） | Uesugi_Kenshin.jpg（400px，來源是不明圖床） | Uesugi_Kenshin_Portrait_from_Uesugi_Shrine.png（上杉神社藏，PD-old-100-expired） | Commons 自己把它列為「高品質版本」，來源是上杉神社官網 |

## 依 Commons 檔案頁修正的說明文字

- 南蠻船局部（commodity-nanban-trade、event-portuguese-empire）：收藏處是**里斯本國立古代美術館**那一對屏風，不是神戶市立博物館（神戶那對是佛洛伊斯卡用的全圖）。
- 德川秀忠像：收藏處補「德川記念財團」，畫師「狩野派畫師（佚名）」。
- 大名行列圖：作者「菱川派畫師」、約 1700 年、授權 CC0。
- 豐臣秀吉像（高台寺）：Commons 標示狩野光信筆、南化玄興題贊、1601 年頃（原寫佚名、1598 年頃）。
- 織田信長像（長興寺）：畫師寫成「狩野宗秀（又名元秀）」。
- 武田信玄像：收藏處補「高野山持明院」。
- 顯如像：江戶時代初期、個人藏（Commons 檔案說明）。
- 川中島合戰圖（歌川國芳）：1854 年（原寫 19 世紀前半）、大英博物館 2008,3037.18413。
- 島原之亂圖屏風：1837 年、北九州市立自然史・歷史博物館。
- 北條早雲像：早雲寺（箱根，重要文化財）；Commons 上只有 165px 小圖，暫用。

## 網址也一併修好

原本有幾張用「800px」縮圖網址，Commons 現在只接受固定寬度（如 960px），800px 會回錯誤、圖片其實顯示不出來。現在的規則：

```
原圖寬 ≤ 960px ──► 直接用原檔
原圖寬 > 960px ──► 用 960px 縮圖（9500px 的南蠻屏風 PNG 不再整張下載）
```

所有圖檔路徑都是 Commons API 或檔案頁回傳的，不再自己用 MD5 推算；44 個網址（22 圖檔＋22 檔案頁）中 41 個實際下載確認 200，另 3 個（早雲、顯如、出島）下載時被 Commons 限速（429），路徑已由 API／檔案頁確認。

## 之後加圖怎麼查

見 `docs/card-fields.md`「圖片」一節：API 要帶 User-Agent，否則會 429。
