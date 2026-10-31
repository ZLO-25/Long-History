---
id: commodity-laurion-silver
type: commodity
name: 勞里昂銀礦
aliases: [勞里溫銀礦, 劳里昂银矿, 拉夫里翁, Laurion, Laurium, Lavrio, 雅典銀礦, 貓頭鷹銀幣]
civilization: [古希臘]
track: west
time:
  start: -550
  end: -100
  precision: approx
  src: [s1, s2]
summary_line: 物資｜資源產地｜阿提卡東南部｜勞里昂銀礦
place:
  primary_field: 資源產地
  secondary_fields: [金融中心]
  locations:
    - { name_ancient: 勞里昂, name_modern: 拉夫里奧（希臘）, lat: 37.72429, lng: 23.98711, pleiades_id: "580010", precision: exact, role: 銀礦區 }
    - { name_ancient: 托里科斯, name_modern: 托里科斯（希臘）, lat: 37.73787, lng: 24.05363, pleiades_id: "580119", precision: exact, role: 礦區附近的港口聚落 }
    - { name_ancient: 雅典, name_modern: 雅典（希臘）, lat: 37.97164, lng: 23.72395, pleiades_id: "579885", precision: exact, role: 鑄幣與財政中心 }
  scale: area
structure_tags: [意外財源, 關鍵原料壟斷, 戰爭融資, 慢變結構]
links: [war-greco-persian, war-peloponnesian, building-acropolis, finance-lydian-coinage, finance-athens-trapezitai]
counterparts:
  - { id: commodity-salt-iron, note: "相似：國家把關鍵礦產收歸公有，收入直接支撐戰爭（雅典艦隊；漢對匈奴）。不同：雅典把開採權租給私人收租；漢朝由官府設鐵官直接生產販賣、禁止民營。", src: [s1, s8] }
  - { id: commodity-wuzhu-coin, note: "相似：一種由單一權力發行、規格穩定的錢幣，因大家信任而長期大範圍流通。不同：雅典銀幣靠白銀本身的價值；五銖是銅錢，價值靠國家壟斷鑄造與官定比價維持。", src: [s1, s9] }
sources:
  - { id: s1, title: "Laurium — Wikipedia", url: "https://en.wikipedia.org/wiki/Laurium", accessed: 2026-10-24, tier: 百科 }
  - { id: s2, title: "Jona Lendering, Laurion — Livius.org", url: "https://livius.org/articles/place/laurion", accessed: 2026-10-24, tier: 通論 }
  - { id: s3, title: "Exploiting the mines by renting slaves — MoneyMuseum", url: "https://www.moneymuseum.com/en/archive/exploiting-the-mines-by-renting-slaves-88?slbox=true", accessed: 2026-10-24, tier: 通論 }
  - { id: s4, title: "Athens' rise to superpower — MoneyMuseum", url: "https://www.moneymuseum.com/en/archive/athens-rise-to-superpower--382?slbox=true", accessed: 2026-10-24, tier: 通論 }
  - { id: s5, title: "Mark Cartwright, Themistocles — World History Encyclopedia (2016)", url: "https://worldhistory.org/Themistocles", accessed: 2026-10-24, tier: 通論 }
  - { id: s6, title: "Sapiens 金錢篇章摘要（LitCharts）", url: "https://www.litcharts.com/lit/sapiens/chapter-10-the-scent-of-money", accessed: 2026-10-24, tier: 摘要 }
  - { id: s7, title: "李彔《現代化十六講》之十一（現代化的本質和鐵律），虎嗅 2014", url: "https://www.huxiu.com/article/38559.html", accessed: 2026-10-25, tier: 摘要 }
  - { id: s8, title: "Donald B. Wagner, Technology as seen through the case of ferrous metallurgy in Han China", url: "https://donwagner.dk/EncIt/EncIt.html", accessed: 2026-10-25, tier: 學術 }
  - { id: s9, title: "Wu Zhu — Wikipedia", url: "https://en.wikipedia.org/wiki/Wu_Zhu", accessed: 2026-10-25, tier: 百科 }
  - { id: s10, title: "希羅多德《歷史》7.144，G. C. Macaulay 英譯（1890，公有領域）— Lexundria", url: "https://lexundria.com/hdt/7.144/mcly", accessed: 2026-10-25, tier: 一手 }
crosscheck: { date: 2026-10-25, by: 獨立查核 agent（未參與寫作）, result: 通過, notes: "可加強：money_scale 目前只引 s3，建議加色諾芬《雅典的收入》4.14 作為第二來源（一手）。Livius 寫礦區距雅典約 35 公里，story『幾十公里』可接受。WHE 提到礦場約前 503 年已發現、前 483 年是『豐富礦脈』，story 寫『約前 483 年挖到一條特別豐富的礦脈』正確。" }
importance: 2
learn:
  histories:
  - 希臘羅馬史
  - 錢的歷史
  why_care: 雅典的民主、海軍和帕德嫩神廟，背後都有一座靠奴隸挖的銀礦。
  story: |
    雅典城外幾十公里的勞里昂，地底下有銀。[s1][s2] 雅典把礦區租給私人老闆，老闆再向奴隸主「租」奴隸下坑，奴隸死了或逃了就要賠人。[s3] 約前 483 年挖到一條特別豐富的礦脈，雅典沒有把錢平分給公民，而是造了約 200 艘戰船。[s5][s10] 這支艦隊打贏了波斯，雅典從此成為海上霸主。[s2][s4] 雅典的「貓頭鷹」銀幣也在整個希臘世界流通，就像今天的美元。[s2][s4]
  key_terms:
  - term: 德拉克馬
    plain: 古希臘的銀幣單位。
    example: 像今天的「元」，一個四德拉克馬銀幣大約等於幾天的工資。
  - term: 意外財源
    plain: 突然多出來的一大筆收入，讓原本做不到的事變得可能。
    example: 家裡突然中了發票，就有錢買原本買不起的東西。
  primary_source:
  - text: … which had come in to them from the mines which are at Laureion …（……這筆錢來自勞里昂的礦場……）
    from: 希羅多德《歷史》卷 7 第 144 章（Macaulay 英譯；中文為本站摘譯）
    src: s10
  historiography: |
    **礦坑裡到底有多少奴隸？** 古代沒有留下精確數字，本站採用的研究只能說「數千名」。[s3] 修昔底德記載戰爭後期有 2 萬多名奴隸逃到斯巴達，但那是整個阿提卡的數字，不能全算在礦區。[s2]
    **銀礦有多重要？** Livius 網站的作者甚至說薩拉米斯海戰「基本上是勞里昂的奴隸打贏的」，強調經濟基礎；[s2] 但也有人提醒，艦隊能贏還要靠地米斯托克利的戰術和海峽地形，不能只用銀礦解釋。[s5]
  money_scale: |
    估計：租一名礦工奴隸一天約 1 歐布爾（六分之一德拉克馬）。[s3] 也就是說，一個四德拉克馬的「貓頭鷹」銀幣，大約等於租用一名奴隸 24 天的費用（本站換算）。[s3]
  misconceptions:
  - 雅典民主常被說成「全民參政」，但支撐它的財富有一部分來自沒有任何權利的奴隸勞動。[s1][s3]
verification: 交叉確認
lens_status: 依公開資料推論，未對照原書
---

## B1 物資與用途

勞里昂的礦石以銀為主，通常與鉛、銅共生；銀主要用來鑄造雅典的錢幣。[s1][s2] 雅典的四德拉克馬銀幣正面是雅典娜頭像、背面是貓頭鷹，俗稱「貓頭鷹」，在希臘世界廣泛流通。[s2][s4]

## B2 產地與控制權

礦區位於阿提卡東南部、蘇尼翁角以北。[s2] 礦山屬於雅典國家所有，通常以「固定金額＋產量分成」租給私人承包商經營。[s1][s3] 有文獻提到某承包商付了 9,000 德拉克馬取得三年開採權。[s3]

## B3 生產技術與勞動

開採危險，勞力幾乎全由奴隸承擔。[s1][s2] 承租礦場的人多半「租用」奴隸而非購買；租出奴隸的主人約每天每人收 1 歐布爾，若奴隸死亡或逃跑，承租者須補人。[s3] 考古已確認超過 2,000 個古代豎井與坑道，礦區也有用來洗選礦石的洗礦台。[s1][s3]

## B4 運輸路線與咽喉

礦區位在雅典城外約數十公里的鄉間，沒有城牆保護。[s1][s2] 伯羅奔尼撒戰爭後期（前 413 起）斯巴達在阿提卡的狄凱里亞築堡，修昔底德記載有不少於 2 萬名奴隸逃去投奔斯巴達，其中很多可能來自勞里昂。[s2] 也就是說，礦區本身就是一個暴露在敵軍面前的經濟咽喉。

## B5 規模與數量

估計：礦工人數只能說「數千名奴隸」，精確數字來源不足。[s3] 修昔底德記載的「2 萬名逃亡奴隸」是整個阿提卡的數字，並非全部來自礦區。[s2]

## B6 經濟與財政角色

約前 483/482 年發現的豐富礦脈，讓雅典有了一筆意外財源；地米斯托克利說服公民不把收入分給每個人，而是建造約 200 艘三列槳戰船。[s2][s5] 這是雅典海上霸權的財政起點。[s1][s4] 產量在西元前 5 世紀末下降，部分原因是狄凱里亞的占領；後來仍有人重新淘洗尾礦，但到地理學者保薩尼亞斯的時代（西元 2 世紀）礦山已被說成「過去的事」。[s1]

## B7 權力與政治連結

銀礦收入→艦隊→薩拉米斯勝利→提洛同盟盟主，是一條清楚的「資源轉成權力」鏈條；Livius 甚至說薩拉米斯海戰「基本上是勞里昂的奴隸打贏的」。[s2] 貓頭鷹銀幣廣泛流通，也讓雅典的貨幣成為希臘世界的通用貨幣之一。[s4]

## B8 雙軌解讀

### 李彔

無直接論述：李彔沒有談勞里昂銀礦。間接相關：他指出在農業時代，政府常以國家專營控制民間商業、充實國庫 [s7]。雅典把銀礦開採權租給私人、收入歸城邦，屬於這類「國家掌握關鍵財源」的做法（此為本卡推論）。

### 哈拉瑞

哈拉瑞未直接談勞里昂。依公開摘要，他主張貨幣是一種人人相信才有效的「共同虛構」，讓不同文化併入同一個經濟體 [s6]。以此推論，雅典銀幣的價值除了白銀本身，也依賴各地商人對它的信任。

## B9 今日對照鉤子

「國家擁有的關鍵礦產收入，該分給人民還是投入長期戰略」的政策選擇；以及「重要產地位在防線之外、勞動力可能流失」的脆弱性。[s2][s5]

## B10 不可類比的差異

勞里昂的產出建立在奴隸勞動上，成本結構與今日礦業完全不同。[s3] 古代貨幣直接以金屬重量為基礎，和今日的法定貨幣不同。[s4]
