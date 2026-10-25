---
id: tech-railway
type: tech
name: 鐵路
aliases: [铁路, 火車, 火车, 蒸汽火車, Railway, Railroad, Steam railway, 斯托克頓—達靈頓鐵路, Stockton and Darlington Railway, 利物浦—曼徹斯特鐵路, Liverpool and Manchester Railway, 喬治·史蒂文生, George Stephenson, 火箭號, Rocket, 美國橫貫鐵路, Transcontinental Railroad, 吳淞鐵路, Woosung Road, 劉銘傳, 臺灣鐵路]
civilization: [英國, 美國, 中國（清）]
track: west
time:
  start: 1825
  end: 1869
  precision: exact
  src: [s1, s2, s5]
summary_line: 技術｜商路｜英國斯托克頓—達靈頓｜鐵路
place:
  primary_field: 商路
  secondary_fields: [工業／製造區, 資源產地]
  locations:
    - { name_ancient: 斯托克頓, name_modern: 斯托克頓（英國英格蘭）, lat: 54.5705, lng: -1.3187, precision: schematic, role: 1825 年斯托克頓—達靈頓鐵路的終點（座標為今斯托克頓市中心）, src: [s1, s2] }
    - { name_ancient: 達靈頓, name_modern: 達靈頓（英國英格蘭）, lat: 54.5236, lng: -1.5595, precision: schematic, role: 同一條鐵路經過的城鎮（座標為今達靈頓市中心）, src: [s1] }
    - { name_ancient: 利物浦, name_modern: 利物浦（英國英格蘭）, lat: 53.4084, lng: -2.9916, precision: schematic, role: 1830 年第一條城際鐵路的西端（座標為今市中心）, src: [s3] }
    - { name_ancient: 曼徹斯特, name_modern: 曼徹斯特（英國英格蘭）, lat: 53.4808, lng: -2.2426, precision: schematic, role: 1830 年第一條城際鐵路的東端（座標為今市中心）, src: [s3] }
    - { name_ancient: 普瑞蒙特里峰, name_modern: 普瑞蒙特里峰（美國猶他州）, lat: 41.6181, lng: -112.5513, precision: schematic, role: 1869 年美國第一條橫貫鐵路接軌處（座標為示意）, src: [s5] }
    - { name_ancient: 吳淞, name_modern: 上海吳淞（中國）, lat: 31.38, lng: 121.49, precision: schematic, role: 1876 年吳淞鐵路的終點（座標為今吳淞一帶示意）, src: [s6] }
    - { name_ancient: 基隆, name_modern: 基隆（臺灣）, lat: 25.128, lng: 121.739, precision: schematic, role: 清代臺灣鐵路起點（座標為今基隆市中心）, src: [s7] }
  scale: line
structure_tags: [基礎建設網絡, 能源轉換, 標準化量產, 技術擴散, 快速擴張]
links: [tech-steam-engine, tech-telegraph, tech-container-shipping, building-grand-canal]
counterparts:
  - { id: building-grand-canal, note: "相似：都把遠方的產地和大城市連成一條運輸網，讓糧食、煤這類又重又便宜的大宗貨物可以長距離移動。不同：大運河是隋朝政府徵調大量勞力開鑿、主要供應首都與軍隊；早期英國鐵路是民間公司集資興建、靠收運費賺錢並發股利給投資人。", src: [s1, s3, s11] }
sources:
  - { id: s1, title: "Stockton and Darlington Railway — Wikipedia", url: "https://en.wikipedia.org/wiki/Stockton_and_Darlington_Railway", accessed: 2026-10-25 }
  - { id: s2, title: "Steam locomotive No. 1 'Locomotion'，Stockton & Darlington Railway — Science Museum Group Collection", url: "https://collection.sciencemuseumgroup.org.uk/objects/co205767", accessed: 2026-10-25 }
  - { id: s3, title: "Liverpool and Manchester Railway — Wikipedia", url: "https://en.wikipedia.org/wiki/Liverpool_and_Manchester_Railway", accessed: 2026-10-25 }
  - { id: s4, title: "History of rail transport — Wikipedia", url: "https://en.wikipedia.org/wiki/History_of_rail_transport", accessed: 2026-10-25 }
  - { id: s5, title: "First transcontinental railroad — Wikipedia", url: "https://en.wikipedia.org/wiki/First_transcontinental_railroad", accessed: 2026-10-25 }
  - { id: s6, title: "Woosung Road — Wikipedia", url: "https://en.wikipedia.org/wiki/Woosung_Road", accessed: 2026-10-25 }
  - { id: s7, title: "臺灣鐵路 (清朝) — 維基百科", url: "https://zh.wikipedia.org/zh-tw/臺灣鐵路_(清朝)", accessed: 2026-10-25 }
  - { id: s8, title: "Railway time — Wikipedia", url: "https://en.wikipedia.org/wiki/Railway_time", accessed: 2026-10-25 }
  - { id: s9, title: "Sapiens Chapter 18 A Permanent Revolution 摘要（LitCharts）", url: "https://www.litcharts.com/lit/sapiens/chapter-18-a-permanent-revolution", accessed: 2026-10-25 }
  - { id: s10, title: "王雅〈從「李約瑟之問」到「李錄之答」〉— 香港01（2020）", url: "https://www.hk01.com/article/471578", accessed: 2026-10-25 }
  - { id: s11, title: "Grand Canal (China) — Wikipedia", url: "https://en.wikipedia.org/wiki/Grand_Canal_(China)", accessed: 2026-10-25 }
verification: 交叉確認
lens_status: 依公開資料推論，未對照原書
---

## T1 是什麼、解決什麼問題

鐵路就是讓車輪在固定的鐵軌上跑，再用蒸汽火車頭（後來是柴油或電力）拉一長串車廂。[s4] 以前陸上運貨靠馬車，又慢又貴；英國最早的鐵路主要是為了把煤礦的煤便宜地運到港口。[s1] 據估計，用火車頭運煤的成本大約只有用馬拉的一半（公司自己的估計數字不太一致）。[s1]

## T2 發明與起源

- **1825 年 9 月 27 日**：英格蘭東北部的斯托克頓—達靈頓鐵路通車，是世界上第一條使用蒸汽火車頭的公共鐵路，主線約 40 公里，工程師是喬治·史蒂文生。[s1][s2] 通車那天由「火車頭 1 號」（Locomotion No. 1）拉著載煤車和乘客出發。[s1][s2]
- **1829 年**：利物浦—曼徹斯特鐵路舉辦「雨丘試驗」挑選火車頭，史蒂文生父子的「火箭號」是唯一跑完全程的參賽者。[s3]
- **1830 年 9 月 15 日**：利物浦—曼徹斯特鐵路通車，長約 50 公里，被稱為世界第一條城際鐵路；它全部用蒸汽火車頭（不用馬）、有完整時刻表，也是第一條運郵件的鐵路。[s3]
- 「誰是第一條鐵路」要看定義：用馬拉的軌道車在這之前就有了（例如 1764 年美洲已有軌道），所以通常說斯托克頓—達靈頓是「第一條用蒸汽火車頭的公共鐵路」，利物浦—曼徹斯特是「第一條現代城際鐵路」。[s1][s3][s4]

## T3 傳播與普及

- **英國**：鐵路里程從 1830 年約 98 英里，增加到 1850 年約 6,621 英里、1860 年約 10,433 英里。[s4]
- **歐洲大陸**：法國聖艾蒂安線 1827 年營運；比利時 1835 年開通布魯塞爾—梅赫倫線；德國在 1840 年代興起築路熱潮。[s4]
- **美國**：1862 年林肯簽署《太平洋鐵路法》，政府用土地和公債補助；1869 年 5 月 10 日在猶他州普瑞蒙特里峰打下「最後一根道釘」，全長約 3,075 公里的橫貫鐵路接通。[s5] 中央太平洋鐵路的重體力工作大多由華工完成。[s5]
- **中國**：1876 年英商怡和洋行未經清廷同意，在上海修了約 15 公里的吳淞鐵路；清廷買下後於 1877 年把它拆除。[s6]
- **臺灣**：劉銘傳 1887 年在臺北大稻埕開工，基隆—臺北段 1891 年通車，臺北—新竹段 1893 年通車，全長估計約 100 公里（依車站里程換算）；當時採用的 1,067 公釐軌距沿用到今天。[s7]

## T4 規模與數據

- 1825 年通車那天，火車平均時速約 13 公里。[s1]
- 1830 年代利物浦—曼徹斯特線的客車時速約 26 公里（16 英里），兩城之間約 2 小時；大多數驛馬車很快就停駛。[s3]
- 美國橫貫鐵路通車後，橫越大陸從幾個月縮短為幾天，運費約只有驛馬車或篷車的十分之一。[s5]
- 華工起薪每月 31 美元，1867 年罷工後調到 35 美元。[s5]

## T5 改變了什麼

- **經濟**：煤、貨物、旅客的運費大降；利物浦—曼徹斯特鐵路獨立營運 15 年平均股利約 9.5%，吸引大量資金投入鐵路。[s1][s3]
- **戰爭**：1859 年法國用鐵路調兵，比走公路快得多，鐵路從此成為軍事動員工具。[s4]
- **社會與時間**：以前各地用自己的地方時間；為了排火車時刻表，英國鐵路公司從 1840 年起陸續改用倫敦格林威治時間，1880 年成為法定標準時間。[s8]
- **美國西部**：橫貫鐵路改變了西部的移民和經濟，但也伴隨政商貪腐醜聞（動產信貸公司案）。[s5]

## T6 雙軌解讀

### 李彔

無直接論述：查到的公開摘要沒有談鐵路。依香港01的摘要，李彔認為「現代化」是現代科技與市場經濟結合後，產生持續累進的經濟增長。[s10] 早期英國鐵路正是民間公司集資、靠運費和股利運作的例子 [s3]；而吳淞鐵路被清廷買下拆除 [s6]，可以拿來思考「只有技術、沒有接納它的制度」會怎樣（此對照為本卡推論）。

### 哈拉瑞

無直接論述（未查到公開摘要提及鐵路）。依公開摘要，哈拉瑞指出工業時代讓時鐘精確管理每一分鐘，取代農業社會鬆散的季節節奏。[s9] 鐵路時刻表逼出全國統一時間，就是這種「工業時間」的具體例子（此對照為本卡推論）。[s8]

## T7 今日對照鉤子

「網絡型基礎建設」的共同結構：前期要投入巨額資本、需要統一標準（軌距、時間），先建成網絡的地區會吸引更多人和貨物使用它。[s4][s8] 今天的高速鐵路、電動車充電網等，也都有「規格統一」與「誰出錢先建」的問題。[s5]

## T8 不可類比的差異

19 世紀的鐵路是從「幾乎沒有快速陸運」一下跳到蒸汽動力，進步幅度遠大於今天在既有交通網上的改良。[s3][s4] 當時的勞工保障、土地徵收和環境規範也和今天完全不同，例如華工薪資與待遇問題。[s5] 清末中國對鐵路的抗拒與當時的主權、外商問題綁在一起，不能只用「保守」來解釋。[s6]
