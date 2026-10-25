---
id: tech-steam-engine
type: tech
name: 蒸汽機
aliases: [蒸汽机, Steam engine, 紐科門, 纽科门, Thomas Newcomen, 大氣式蒸汽機, Newcomen atmospheric engine, 瓦特, James Watt, 瓦特蒸汽機, Watt steam engine, 分離式冷凝器, 博爾頓, Matthew Boulton, 工業革命]
civilization: [英國]
track: west
time:
  start: 1712
  end: 1830
  precision: approx
  src: [s1, s2, s3]
summary_line: 技術｜工業／製造區｜英格蘭中部｜蒸汽機
place:
  primary_field: 工業／製造區
  secondary_fields: [資源產地]
  locations:
    - { name_ancient: 康尼格里煤礦（蒂普頓）, name_modern: 蒂普頓（英國英格蘭）, lat: 52.529, lng: -2.066, precision: schematic, role: 1712 年第一台成功運轉的紐科門蒸汽機，用來替煤礦抽水（座標為今蒂普頓鎮）, src: [s1] }
    - { name_ancient: 卡倫鐵工廠, name_modern: 福爾柯克附近（英國蘇格蘭）, lat: 56.024, lng: -3.778, precision: schematic, role: 1776 年第一批商用瓦特蒸汽機的買家之一（座標為今卡倫村示意）, src: [s2] }
  scale: area
structure_tags: [能源轉換, 技術擴散, 臨界點]
links: [tech-railway, tech-electric-grid, tech-internal-combustion, war-opium-war]
counterparts: "無適當對照：中國軌道沒有同時期、同性質的動力機械卡；李彔提到「為什麼中國沒有出現蒸汽機」正是一個「沒有發生」的問題，不是可對照的事件，寫在 T6。"
sources:
  - { id: s1, title: "Newcomen atmospheric engine — Wikipedia", url: "https://en.wikipedia.org/wiki/Newcomen_atmospheric_engine", accessed: 2026-10-25 }
  - { id: s2, title: "Watt steam engine — Wikipedia", url: "https://en.wikipedia.org/wiki/Watt_steam_engine", accessed: 2026-10-25 }
  - { id: s3, title: "Steam engine — Wikipedia", url: "https://en.wikipedia.org/wiki/Steam_engine", accessed: 2026-10-25 }
  - { id: s4, title: "Steam Condensing Engine – 1769 — National MagLab（美國國家強磁場實驗室）", url: "https://nationalmaglab.org/magnet-academy/history-of-electricity-magnetism/museum/steam-condensing-engine-1769/", accessed: 2026-10-25 }
  - { id: s5, title: "李彔《現代化十六講》之十（現代化的傳播與現代化的道路之爭），虎嗅 2014", url: "https://www.huxiu.com/article/38460.html", accessed: 2026-10-25 }
  - { id: s6, title: "李彔《現代化十六講》之九（現代化有沒有可能在中國誕生），虎嗅 2014", url: "https://www.huxiu.com/article/38364.html", accessed: 2026-10-25 }
  - { id: s7, title: "Sapiens 工業之輪篇章摘要（LitCharts）", url: "https://www.litcharts.com/lit/sapiens/chapter-17-the-wheels-of-industry", accessed: 2026-10-25 }
verification: 交叉確認
lens_status: 依公開資料推論，未對照原書
---

## T1 是什麼、解決什麼問題

蒸汽機是燒煤把水煮成蒸汽，再用蒸汽推動活塞、把熱變成機械動力的機器 [s3][s7]。18 世紀英國的煤礦越挖越深，礦坑常常淹水，人力、馬力抽水不夠用；最早的蒸汽機就是為了替礦坑抽水 [s1][s4]。後來它也被用來帶動工廠機器、火車與輪船 [s3]。

## T2 發明與起源

- **前身**：1698 年英國人薩弗里取得蒸汽抽水機（「礦工之友」）專利 [s1]。
- **紐科門（1712）**：紐科門的「大氣式」蒸汽機在蒂普頓的煤礦第一次成功運轉。原理是先讓蒸汽進入汽缸，再噴冷水讓蒸汽凝結、形成部分真空，靠大氣壓力把活塞往下壓，每分鐘約 12 次 [s1]。缺點是每次噴冷水都讓汽缸變冷，浪費大量燃料 [s1][s4]。
- **瓦特（1765／1769／1776）**：瓦特在修理一台紐科門機時，想到把冷凝放到另一個「分離式冷凝器」，讓汽缸一直保持熱 [s2][s4]。他 1765 年想到點子、1769 年取得專利；與博爾頓合作後，1775–1776 年開始出售商用機器 [s2][s4]。1781 年再用「太陽與行星齒輪」把往復運動變成旋轉運動，讓蒸汽機能帶動工廠機器 [s2]。

## T3 傳播與普及

紐科門去世前，英國等地已裝了一百多台紐科門機 [s1]。博爾頓的商業模式是向原有紐科門機的業主授權冷凝器技術，抽取省下燃料費的一部分，分離式冷凝器很快成為業界標準 [s4]。瓦特的專利被國會延長到 1800 年；專利到期前後，特里維西克發展出高壓蒸汽機 [s2]。旋轉動力讓工廠不必再蓋在河邊靠水車 [s3]。1830 年利物浦—曼徹斯特鐵路通車，客貨運全部用蒸汽機車，本卡 `time.end` 取這一年，代表蒸汽動力從「礦場與工廠」走進「大眾交通」[s3]。

## T4 規模與數據

- 完全成熟的瓦特蒸汽機，用煤量比同級紐科門機少約 75%（維基百科）；美國國家強磁場實驗室則說只需紐科門機約 25–30% 的燃料，兩者大致一致 [s2][s4]。另一比較是：博爾頓與瓦特的早期機器用煤約為斯米頓改良版紐科門機的一半 [s3]。
- 李彔在講稿中說，瓦特發明蒸汽機後不到一百年，一台蒸汽機的力量已能超過四千萬人肌肉力量的總和（他的說法，非精確統計）[s5]。

## T5 改變了什麼

蒸汽機把人類的主要動力從人力、獸力、水力，轉換成燒煤的機器動力 [s3][s5]。煤與蒸汽機結合後，革命從紡織業擴散到鋼鐵、輪船、鐵路 [s5]。工廠不必依河而建，城市與工業區可以集中發展 [s3]。哈拉瑞也把工業革命看成一場「能源轉換」的革命，帶來便宜而大量的能源與原料 [s7]。

## T6 雙軌解讀

### 李彔

李彔在公開講稿中說，蒸汽機與煤炭結合的力量讓革命在紡織、鋼鐵、輪船、鐵路接連發生，之後石化資源成為主要動力 [s5]。他也提到宋代中國已懂得機械活塞運動，李約瑟一直奇怪為何中國沒有在此基礎上出現蒸汽機；他的解釋是現代科技文明依託於大西洋經濟與自由市場 [s6]。

### 哈拉瑞

哈拉瑞在《人類大歷史》中用「熱能變成動能」解釋蒸汽機：燒燃料煮水，蒸汽推動活塞；後來再用蒸汽轉動線圈發電 [s7]。他認為工業革命的核心是一場能源轉換革命，讓人類相信世界有近乎無限的能源可用 [s7]。

## T7 今日對照鉤子

「效率改良比原始發明更關鍵」：紐科門機已經能用，但瓦特把燃料省下大半，蒸汽機才走出煤礦 [s1][s2]。博爾頓「按省下的燃料費抽成」的授權方式，也像今天的節能服務或按效益收費的商業模式 [s4]。今天的能源轉型（從化石燃料轉向電力、再生能源）同樣是「主要動力來源換軌」的結構。

## T8 不可類比的差異

早期蒸汽機能在煤礦先普及，是因為礦場旁的煤幾乎不花錢，浪費燃料也沒關係 [s1]；今天的能源轉型反而受到碳排放與氣候的限制，目標方向相反。另外，蒸汽機的普及花了超過一百年（1712 到 1830 年代），而且受專利、資本與工匠技術的影響很大 [s1][s2][s3]。
