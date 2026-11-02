---
id: war-first-punic
type: war
name: 第一次布匿戰爭（前264–前241年）
aliases: [第一次布匿戰爭, 第一次迦太基戰爭, 布匿戰爭, 埃加迪群島海戰, 米列海戰, 烏鴉吊橋, 盧塔提烏斯條約, First Punic War, Punic Wars, Battle of the Aegates, Battle of Mylae, corvus, Treaty of Lutatius]
civilization: [古羅馬, 迦太基]
track: west
time:
  start: -264
  end: -241
  precision: exact
  src: [s1, s3]
summary_line: 戰爭｜戰場｜西西里島與周邊海域｜第一次布匿戰爭（前264–前241年）
summary_card: true
place:
  primary_field: 戰場
  secondary_fields: [港口／海峽]
  locations:
    - { name_ancient: 墨西拿（Messana）, name_modern: 墨西拿（義大利西西里）, lat: 38.1938, lng: 15.5540, precision: schematic, role: 開戰起點：馬梅爾提尼傭兵向羅馬求援, src: [s1, s3] }
    - { name_ancient: 埃加迪群島, name_modern: 埃加迪群島（義大利西西里西岸外）, lat: 37.9667, lng: 12.2667, precision: schematic, role: 前241年決定性海戰, src: [s1, s3] }
  scale: area
structure_tags: [海權對陸權, 技術擴散, 戰爭融資, 財政枯竭]
topics: [海戰與水戰, 對外擴張]
links: [war-samnite, war-second-punic, war-third-punic, war-greco-persian]
causes:
  - { id: war-samnite, rel: 背景, why: 羅馬打完薩莫奈戰爭、控制義大利中南部，前272年已征服阿諾河以南的半島，勢力直接面對西西里與迦太基。, src: [s1, "war-samnite:s1"] }
effects:
  - { id: war-second-punic, rel: 背景, why: 迦太基戰敗失去西西里，又被羅馬奪走薩丁尼亞、加重賠款，只好轉往伊比利發展，用當地銀礦和兵源重建實力。, src: [s1, s3, "war-second-punic:s1"] }
counterparts: 無適當對照：中國軌同時期（戰國後期）沒有以大型艦隊爭奪海島的戰爭卡；長平之戰是陸上會戰，結構不同。
sources:
  - { id: s1, title: "First Punic War — Wikipedia", url: "https://en.wikipedia.org/wiki/First_Punic_War", accessed: 2026-11-02, tier: 百科 }
  - { id: s2, title: "Polybius, The Histories, Book I（Loeb 英譯，LacusCurtius, University of Chicago）", url: "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Polybius/1*.html", accessed: 2026-11-02, tier: 一手 }
  - { id: s3, title: "Mark Cartwright, First Punic War — World History Encyclopedia (2016)", url: "https://www.worldhistory.org/First_Punic_War/", accessed: 2026-11-02, tier: 通論 }
importance: 2
learn:
  histories: [希臘羅馬史]
  why_care: 一個幾乎沒有海軍的陸權國家，照著撿到的敵船造艦隊，最後打贏了海上強權：羅馬稱霸地中海就是從這場戰爭開始的。
  story: |
    前 264 年，一群佔據西西里墨西拿城的傭兵向羅馬求援，羅馬出兵，捲入和迦太基爭奪西西里的戰爭。[s1][s3] 迦太基是海上強國，羅馬卻幾乎沒有像樣的艦隊。[s3] 羅馬人照著一艘擱淺的迦太基五列槳戰船仿造，第一次就造了一百艘五列槳船和二十艘三列槳船。[s2] 他們還在船頭裝上「烏鴉」吊橋，搭到敵船上讓步兵衝過去，把海戰變成陸戰，前 260 年在米列打了勝仗。[s1][s3] 但羅馬也吃了大虧：前 255 年一場暴風雨就毀了約 384 艘船、約十萬人。[s1] 打到國庫見底，羅馬向富有公民借錢造了最後一支約 200 艘的艦隊，前 241 年在埃加迪群島擊敗迦太基。[s1][s3] 迦太基被迫退出西西里、十年內賠 3,200 塔蘭特。[s1][s3]
  key_terms:
    - { term: 五列槳戰船（quinquereme）, plain: 古代地中海的主力大型戰船，每組划槳由五人負責。, example: 像當時的「主力艦」，誰有比較多誰就控制海面。 }
    - { term: 烏鴉吊橋（corvus）, plain: 裝在羅馬船上、前端有鐵釘的活動吊橋，放下去釘住敵船讓士兵登船。, example: 像把兩艘船用一座橋「釘」在一起，海上打成陸上肉搏。 }
    - { term: 行省, plain: 羅馬在義大利以外直接派總督統治、收稅的地區；西西里是第一個。, example: 像總公司在海外設的直營分公司。 }
  primary_source:
    - { text: "undertook for the first time to build ships, a hundred quinqueremes and twenty triremes（第一次著手造船：一百艘五列槳船和二十艘三列槳船）", from: 波利比烏斯《歷史》1.20（Loeb 英譯，中文為本站摘譯）, src: s2 }
  historiography: |
    **波利比烏斯可信嗎？** 這場戰爭幾乎只能靠希臘史家波利比烏斯的記載，迦太基的紀錄在前 146 年城毀時都沒了。[s1] 現代史家大多認為他相當可靠；2010 年以來在西西里西岸外找到的 19 支青銅撞角，也證實了他對埃加迪海戰的描述，不過考古學家認為這些撞角都來自三列槳船，而不是他說的五列槳船。[s1]
    **烏鴉吊橋是勝利關鍵還是負擔？** 吊橋讓羅馬步兵發揮優勢、抵銷迦太基人的航海技術；[s3] 但前 255／254 年那場暴風雨之後，記載就不再提到它，世界歷史百科推測它的重量可能讓船更容易在暴風雨中翻覆，羅馬最後的艦隊也改靠航海技術。[s3][s1]
  misconceptions:
    - 羅馬打贏不是因為一直打勝仗：它在暴風雨和德雷帕納等戰役中損失了大量船隻和人員，是靠一再重建艦隊撐到最後。[s1]
crosscheck:
  date: 2026-11-02
  by: 獨立查核 agent（未參與寫作）
  result: 通過
  notes: 已打開維基、WHE、波利比烏斯 1.20 核對。維基只寫造 120 艘戰船，「100 艘五列槳＋20 艘三列槳」改為只引 s2；撞角一句依維基改為「都來自三列槳船」；烏鴉吊橋消失年依兩來源寫成前255／254年暴風雨後。條約條款依維基與 WHE（未讀波利比烏斯 1.62–63）；薩丁尼亞年份前237／238年仍並列。
verification: 交叉確認
lens_status: 無直接論述
---

## A2 起因：結構與導火線

**結構**：羅馬在開戰前一百年積極向南義大利擴張，前 272 年已征服阿諾河以南的義大利半島；迦太基則是控制西西里西部與西地中海航運的海上強國，兩強隔著墨西拿海峽相鄰。[s1][s3]

**導火線**：前 289 年起佔據墨西拿的馬梅爾提尼傭兵向羅馬求援，前 264 年羅馬公民大會投票出兵，部分是看上戰略與財物上的好處；迦太基隨即和敘拉古、阿格里真托結盟對抗羅馬。[s1][s3]

## A8 結果

前 241 年 3 月 10 日，羅馬艦隊在埃加迪群島擊敗迦太基的援軍艦隊。[s3] 《盧塔提烏斯條約》規定迦太基撤出西西里、交還戰俘，並在十年內賠 3,200 塔蘭特白銀。[s1][s3] 西西里成為羅馬第一個海外行省，敘拉古名義上保持獨立、成為盟友。[s1]

## A9 長期影響

迦太基付不出傭兵的薪水，爆發傭兵戰爭；羅馬趁機在前 237 年（一說前 238 年）奪走薩丁尼亞和科西嘉，再加索 1,200 塔蘭特。[s1] 這些積怨成為第二次布匿戰爭的背景。[s1][s3] 羅馬在這場戰爭中累積的造船經驗，也為之後約 600 年的海上霸權打下基礎。[s1]
