---
id: event-columbus-aztec
type: event
name: 哥倫布抵達美洲與西班牙征服阿茲特克、印加（1492–1533）
aliases: [哥倫布, 哥倫布發現新大陸, 科爾特斯, 皮薩羅, 阿茲特克帝國滅亡, 印加帝國滅亡, 哥倫布大交換, Christopher Columbus, Hernán Cortés, Francisco Pizarro, Spanish conquest of the Aztec Empire, Spanish conquest of the Inca Empire, Columbian exchange, 特諾奇提特蘭, Tenochtitlan, 蒙特蘇馬, Moctezuma, 阿塔瓦爾帕, Atahualpa, 卡哈馬卡, Cajamarca, 馬林切, La Malinche, 大死亡, Great Dying, 哥伦布, 阿兹特克]
civilization: [西班牙, 拉丁美洲]
track: west
time:
  start: 1492
  end: 1533
  precision: exact
  src: [s1, s2, s7]
summary_line: 大事｜戰場｜加勒比海、特諾奇提特蘭、卡哈馬卡｜哥倫布抵達美洲與西班牙征服阿茲特克、印加（1492–1533）
place:
  primary_field: 戰場
  secondary_fields: [港口／海峽, 宮廷／政治中心, 資源產地]
  locations:
    - { name_ancient: 帕洛斯港, name_modern: 帕洛斯德拉弗龍特拉（西班牙）, lat: 37.2286, lng: -6.8936, precision: exact, role: 1492 年 8 月 3 日哥倫布出發港, src: [s7] }
    - { name_ancient: 瓜納哈尼島, name_modern: 聖薩爾瓦多島（巴哈馬）, lat: 24.0500, lng: -74.5000, precision: disputed, role: 1492 年 10 月 12 日首次登陸地（最可能的地點，學界仍有其他說法）, src: [s7] }
    - { name_ancient: 伊斯帕尼奧拉島（拉伊莎貝拉）, name_modern: 多明尼加共和國北岸, lat: 19.8869, lng: -71.0790, precision: schematic, role: 1494 年西班牙人在美洲最早的殖民聚落之一；泰諾人被迫納貢、勞動, src: [s7] }
    - { name_ancient: 特拉斯卡拉, name_modern: 特拉斯卡拉（墨西哥）, lat: 19.3139, lng: -98.2404, precision: schematic, role: 1519 年與科爾特斯結盟、出兵最多的原住民城邦, src: [s1] }
    - { name_ancient: 特諾奇提特蘭, name_modern: 墨西哥市（墨西哥）, lat: 19.4352, lng: -99.1312, precision: exact, role: 阿茲特克首都；1521 年 8 月 13 日陷落, src: [s1] }
    - { name_ancient: 卡哈馬卡, name_modern: 卡哈馬卡（秘魯）, lat: -7.1638, lng: -78.5003, precision: exact, role: 1532 年 11 月 16 日皮薩羅俘虜印加皇帝阿塔瓦爾帕, src: [s2] }
    - { name_ancient: 庫斯科, name_modern: 庫斯科（秘魯）, lat: -13.5320, lng: -71.9675, precision: exact, role: 印加首都；1533 年 11 月 15 日西班牙人進城, src: [s2] }
  scale: area
structure_tags: [疫病衝擊, 外部勢力介入, 突變事件, 快速擴張]
topics: [航海, 對外擴張, 殖民統治, 疫病, 原住民族, 糧食與農業]
links: [event-peopling-americas, event-portuguese-empire, event-vasco-da-gama, commodity-potosi, commodity-silver-flow, event-atlantic-slave-trade, event-latin-american-independence]
effects:
  - { id: commodity-potosi, rel: 背景, why: 西班牙人征服印加、控制安地斯山區之後，才能在 1545 年開採波托西銀礦，強迫原住民到礦場勞動。, src: [s2, commodity-potosi:s1] }
  - { id: event-atlantic-slave-trade, rel: 背景, why: 西班牙在加勒比海建立殖民地，原住民因疫病與強迫勞動大量死亡；1525 年起就有船直接把非洲俘虜運到伊斯帕尼奧拉島。, src: [s4, event-atlantic-slave-trade:s1] }
counterparts: 無適當對照：中國軌同時期沒有「遠航後征服另一個大陸、帶來疫病使當地人口崩潰」的事件；鄭和下西洋是國家遠航，但沒有征服與殖民，硬配對容易誤導。
sources:
  - { id: s1, title: "Spanish conquest of the Aztec Empire — Wikipedia", url: "https://en.wikipedia.org/wiki/Spanish_conquest_of_the_Aztec_Empire", accessed: 2026-11-07, tier: 百科 }
  - { id: s2, title: "Spanish conquest of the Inca Empire — Wikipedia", url: "https://en.wikipedia.org/wiki/Spanish_conquest_of_the_Inca_Empire", accessed: 2026-11-07, tier: 百科 }
  - { id: s3, title: "Columbian exchange — Wikipedia", url: "https://en.wikipedia.org/wiki/Columbian_exchange", accessed: 2026-11-07, tier: 百科 }
  - { id: s4, title: "Population history of the Indigenous peoples of the Americas — Wikipedia", url: "https://en.wikipedia.org/wiki/Population_history_of_the_Indigenous_peoples_of_the_Americas", accessed: 2026-11-07, tier: 百科 }
  - { id: s5, title: "Alexander Koch, Chris Brierley, Mark M. Maslin, Simon L. Lewis, Earth system impacts of the European arrival and Great Dying in the Americas after 1492 — Quaternary Science Reviews 207（2019）: 13–36（UCL Discovery 摘要頁）", url: "https://discovery.ucl.ac.uk/id/eprint/10068488/", accessed: 2026-11-07, tier: 學術 }
  - { id: s6, title: "Journal of Christopher Columbus, 1492（節錄，Clements R. Markham 1893 英譯）— The American Yawp Reader", url: "https://www.americanyawp.com/reader/the-new-world/journal-of-christopher-columbus/", accessed: 2026-11-07, tier: 一手 }
  - { id: s7, title: "Voyages of Christopher Columbus — Wikipedia", url: "https://en.wikipedia.org/wiki/Voyages_of_Christopher_Columbus", accessed: 2026-11-07, tier: 百科 }
  - { id: s8, title: "Sapiens 第 15 章〈The Marriage of Science and Empire〉摘要（LitCharts）", url: "https://www.litcharts.com/lit/sapiens/chapter-15-the-marriage-of-science-and-empire", accessed: 2026-11-07, tier: 摘要 }
importance: 3
learn:
  histories: [世界通史, 美洲史, 歐洲史]
  why_care: 1492 年之後，美洲和歐亞非兩個隔絕上萬年的世界接在一起；今天全世界吃的玉米、馬鈴薯、番茄，和美洲原住民人口的大崩潰，都是從這裡開始的。
  story: |
    1492 年 8 月，哥倫布帶著三艘船從西班牙出發，10 月 12 日登上巴哈馬的一座小島，島上的居民叫它瓜納哈尼。[s7] 他以為自己到了亞洲的「印度」，所以加勒比海後來被叫作「西印度群島」。[s7] 1519 年，科爾特斯帶著約 630 人登陸墨西哥，聯合痛恨阿茲特克的特拉斯卡拉人，盟軍人數可能有好幾萬。[s1] 1520 年天花爆發，新皇帝可能也死於這場疫病；1521 年 8 月首都特諾奇提特蘭陷落。[s1] 十年後，皮薩羅只帶 168 人在卡哈馬卡俘虜了印加皇帝，收下滿屋的金銀贖金後仍在 1533 年把他處死（確切日期說法不一）。[s2] 接下來一百年，美洲原住民可能死了九成。[s3][s5]
  key_terms:
    - { term: 哥倫布大交換, plain: 1492 年後，美洲和歐亞非之間大量交換作物、動物、人和疾病，歷史學者克羅斯比 1972 年取的名字。, example: 義大利麵的番茄、愛爾蘭的馬鈴薯、四川菜的辣椒，原本都只長在美洲。 }
    - { term: 天花, plain: 一種傳染力很強的病毒疾病，歐亞非的人長期接觸，美洲原住民從沒遇過，因此死亡率極高。, example: 就像一個從沒打過疫苗、也從沒接觸過某種病的班級，一個人帶病進來，全班都倒下。 }
    - { term: 委託監護制（encomienda）, plain: 西班牙國王把一批原住民「託付」給殖民者，原住民要納貢、做工，名義上換取保護與傳教，實際上常跟奴役差不多。, example: 名義上是「照顧」，實際上是強迫你免費打工。 }
    - { term: 盟軍, plain: 和西班牙人一起作戰的原住民城邦與族群，例如特拉斯卡拉人，他們有自己的理由反抗阿茲特克。, example: 不是「幾百人打贏一個帝國」，而是幾百人加上好幾萬當地盟友。 }
  primary_source:
    - { text: "with fifty men they can all be subjugated and made to do what is required of them（只要五十個人，就能把他們全部征服，叫他們做什麼就做什麼）", from: 哥倫布第一次航行日誌，1492 年 10 月 14 日（Markham 1893 英譯；中文為本站摘譯）, src: s6 }
  historiography: |
    **到底是誰打敗了阿茲特克？** 傳統說法強調科爾特斯的勇氣，以及槍、鋼刀和馬匹的優勢。[s1] 另一派學者認為這樣說太誇張：特拉斯卡拉等原住民盟軍估計有 8 萬到 20 萬人，提供地理知識與戰術；Ross Hassig 認為幾百名士兵的武器優勢「並非壓倒性」，Matthew Restall 則說西班牙武器只是讓他們撐到援軍來的「生存公式」；天花也常被低估。[s1]
    **美洲原來有多少人？死了多少？為什麼？** 估計差距非常大：1939 年 Kroeber 估 840 萬人，1966 年 Dobyns 估 9,000 萬到 1.1 億，1976 年 Denevan 的「共識估計」約 5,400 萬；Henige 則批評很多估計建立在「任意的公式」上。[s4] 2019 年 Koch 等人整合 119 個區域估計，得出約 6,050 萬人，並估計一百年內約九成死亡。[s5] 死因上，Noble David Cook 等人強調疾病；Andrés Reséndez 等人認為在加勒比海，強迫勞動、殘酷懲罰和缺乏糧食才是一開始的主因；Ostler 指出殖民造成的營養不良與社會壓力讓疾病更致命。[s4]
  misconceptions:
    - 「阿茲特克人以為西班牙人是神」：歷史學者 Camilla Townsend 質疑這個流行說法。[s1]
    - 哥倫布並不知道自己到了一塊新大陸，他以為那裡是亞洲的「印度」。[s7]
    - 美洲不是「無人的新大陸」：人類早在一萬多年前就已經住在那裡（見「人類抵達美洲」卡）。[s4]
  pop_culture:
    - { claim: "「幾百個西班牙人靠槍炮打垮了阿茲特克帝國。」", fact: "1519 年科爾特斯登陸時約 630 人，加上後來的援軍，西班牙方面前後約兩三千人；原住民盟軍估計有 8 萬到 20 萬人（這是維基百科資訊框的估計，數字本身不精確）；天花疫情也重創阿茲特克。[s1]", src: [s1] }
  perspectives:
    - { history: 美洲史, text: 從美洲原住民看，這是帝國崩潰、人口銳減、土地與勞力被奪走的開始；不少原住民城邦也曾想藉西班牙人擺脫阿茲特克，結果換來更嚴厲的統治。 }
    - { history: 歐洲史, text: 從西班牙看，美洲的金銀與土地讓它在 16 世紀成為歐洲最強的王國之一。 }
crosscheck: { date: 2026-11-07, by: 獨立查核（另一次呼叫，未參與寫作）, result: 通過, notes: "WebFetch 核對 s1 Aztec 征服、s2 印加征服、s3 哥倫布大交換、s8 LitCharts 第 15 章。確認：科爾特斯 1519 年約 630 人、11 月 8 日進城；資訊框西班牙 2,500–3,000、特拉斯卡拉 8–20 萬（僅資訊框）；Hassig「並非壓倒性」、Restall「生存公式」、Townsend 皆在 s1；圍城 5 月 10 日起、8 月 13 日陷落；奎特拉瓦克 12 月 4 日去世；皮薩羅 168 人、約 6,000 隨從、殺約 2,000 人、11 月 15 日進庫斯科、1572 年；墨西哥 2,000 萬→一百多萬出自 s3（引美國國會圖書館國別研究）；12–25% 出自 Nunn & Qian 2011。修正：故事改寫為約 630 人；悲痛之夜改為一般說法 6 月 30 日夜（s1 本身時間軸寫 6 月 30 日、內文寫 7 月 10 日，自相矛盾）；阿塔瓦爾帕處死日期並列 8 月 29 日（s2）與 7 月 26 日（Hemming 等史家考訂，依查核者已知史實，未逐字核對）；人口數字加上「估計、爭議很大」並指向史家怎麼吵；馬鈴薯數字註明 Nunn 與 Qian。哈拉瑞小節與 LitCharts 摘要相符。未逐字核對：s5 Koch 等 2019 摘要頁、s6 哥倫布日誌節錄、s4、s7（皆為常見史實，與已知一致）；首次登陸地已標 disputed。" }
verification: 爭議
lens_status: 依公開資料推論，未對照原書
---

## C1 背景

哥倫布相信往西航行可以抵達亞洲；他 1492 年 8 月 3 日帶著聖瑪利亞號、平塔號、尼尼亞號從帕洛斯出發。[s7] 當時美洲已經有許多社會：加勒比海有泰諾人、盧卡亞人，墨西哥中部有以特諾奇提特蘭為首都的阿茲特克帝國，安地斯山區有人口估計 1,200 萬到 1,600 萬的印加帝國。[s1][s2][s7] 阿茲特克向周圍城邦收貢、俘人，特拉斯卡拉長期和它敵對；印加帝國在西班牙人抵達前，剛因皇帝瓦伊納·卡帕克可能死於天花而陷入兄弟內戰。[s1][s2]

## C2 經過

- **1492 年 10 月 12 日**：船隊登陸瓜納哈尼島，哥倫布改名為聖薩爾瓦多，今巴哈馬的聖薩爾瓦多島最可能是登陸地。[s7] 聖誕節聖瑪利亞號擱淺，留下 39 人建「納維達德」堡，隔年回來時堡已被燒、人都死了。[s7]
- **1493–1504 年**：哥倫布共航行四次；在伊斯帕尼奧拉島強迫泰諾人繳納黃金，1495 年一次擄走 1,500 多人；1500 年他被王室撤職，戴著鐐銬送回西班牙。[s7]
- **1519 年**：科爾特斯在今韋拉克魯斯附近登陸，9 月與特拉斯卡拉結盟，11 月 8 日進入特諾奇提特蘭，之後扣押阿茲特克皇帝蒙特蘇馬二世。[s1] 他依靠被奴役的納瓦族女子馬林切（多尼亞·瑪麗娜）翻譯。[s1]
- **1520 年**：蒙特蘇馬死亡，死因說法不一（西班牙方面說被石頭打中，阿茲特克史料說是西班牙人殺的）；西班牙人在「悲痛之夜」（一般記為 6 月 30 日夜到 7 月 1 日，資料中也有其他日期）逃出城，死傷慘重；9 月起天花爆發，新皇帝奎特拉瓦克 12 月 4 日去世，可能死於天花。[s1]
- **1521 年 5 月 10 日到 8 月 13 日**：西班牙人與原住民盟軍圍城，特諾奇提特蘭陷落，末代皇帝夸烏特莫克被俘。[s1]
- **1532 年 11 月 16 日**：皮薩羅帶 168 人在卡哈馬卡突擊阿塔瓦爾帕約 6,000 名未武裝的隨從，殺死約 2,000 人，俘虜皇帝。[s2] 阿塔瓦爾帕答應用一屋子黃金、兩屋子白銀換自由，贖金交齊後，1533 年仍被西班牙人以絞刑處死（維基百科寫 8 月 29 日，也有史家考訂為 7 月 26 日）；11 月 15 日西班牙人進入庫斯科。[s2] 印加人的抵抗延續到 1572 年。[s2]

## C3 關鍵人物與群體

哥倫布；科爾特斯；皮薩羅；阿茲特克皇帝蒙特蘇馬二世、奎特拉瓦克、夸烏特莫克；印加皇帝阿塔瓦爾帕與他的兄弟瓦斯卡爾；翻譯馬林切；特拉斯卡拉、托托納克等原住民盟友。[s1][s2][s7]

## C4 制度或機制變化

美洲原住民被納入西班牙王室的殖民統治。[s1][s2] 委託監護制把原住民分配給殖民者納貢、做工，實際上常「等同農奴與奴隸制」。[s4] 生物上，兩個世界開始交換作物、牲畜和疾病：玉米、馬鈴薯、番茄、菸草、可可傳到歐亞非；小麥、甘蔗、馬、牛、豬傳到美洲。[s3]

## C5 受益者與受損者

受益者：西班牙王室與征服者，得到美洲的土地、金銀與勞力。[s2][s7] 受損者：美洲原住民。天花 1518 年首次在美洲留下紀錄，是最致命的外來疾病；有估計認為墨西哥人口在 16 世紀從約 2,000 萬人降到一百多萬，印加地區從 1520 年約 1,000 萬到 1,500 萬人降到 1570 年不到 300 萬。[s2][s3] 這些都是估計，原本人口有多少爭議很大，有學者估得高得多，也有學者估得低得多（見「史家怎麼吵」）。[s4]

## C6 直接結果

1521 年後，西班牙在墨西哥建立「新西班牙」；1533 年後控制印加帝國的核心地區。[s1][s2] 加勒比海原住民在強迫勞動與疫病下迅速減少。[s4][s7]

## C7 長期影響

科學家估計，1492 年後一百年內美洲原住民約九成死亡，約 5,580 萬公頃農地荒廢、重新長成森林，吸收的二氧化碳可能讓 16 世紀末到 17 世紀初大氣二氧化碳濃度下降、氣候變冷。[s5] 美洲作物傳到亞洲，經濟學者 Nunn 與 Qian 2011 年的研究估計，馬鈴薯貢獻了 1700–1900 年歐亞非人口成長的 12–25%（估計）。[s3] 安地斯的白銀後來大量流入全球貿易（見「波托西銀礦」卡）。[s2]

## C8 雙軌解讀

### 李彔

無直接論述。

### 哈拉瑞

依 LitCharts 摘要，《人類大歷史》第 15 章〈科學與帝國的聯姻〉說，哥倫布的航行之後，歐洲人開始畫「留白」的地圖，再出發去把空白填滿。[s8] 書中說，科爾特斯征服墨西哥時，西班牙殖民者已經在加勒比海大部分地區犯下種族滅絕，阿茲特克人卻毫不知情；科爾特斯扣押蒙特蘇馬、透過他統治，阿茲特克貴族反抗時，又拉攏其他原住民，這些原住民以為會得到解放，結果落入更嚴厲的西班牙統治。[s8] 大約十年後皮薩羅征服印加，印加人也對阿茲特克的命運一無所知。[s8]

## C9 今日對照鉤子

結構：一個與外界長期隔絕的群體，突然接觸到從沒遇過的病原體，死亡率會遠高於早已接觸過的群體；這也是今天公共衛生重視偏遠族群防疫的原因之一。[s3][s4] 這裡只描述結構，不預測。

## C10 不可類比的差異

16 世紀沒有人知道病毒與細菌，也沒有疫苗或隔離的觀念；今天的防疫知識與國際規範完全不同。[s3] 而且這場人口崩潰同時夾雜著征服、強迫勞動與奴役，不能只當成一場「自然的」疫情來類比。[s4]
