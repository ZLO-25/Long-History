---
id: event-ming-founding
type: event
name: 明朝建立（1368年）
aliases: [朱元璋, 明太祖, 洪武帝, 明朝建立, 朱元璋稱帝, 明朝開國, Hongwu Emperor, Founding of the Ming dynasty, 洪武建國, 大明建國, Zhu Yuanzhang]
civilization: [中國（明）]
track: china
time:
  start: 1368
  end: 1368
  precision: exact
  src: [s1, s2]
summary_line: 大事｜宮廷／政治中心｜應天（南京）｜明朝建立（1368年）
place:
  primary_field: 宮廷／政治中心
  secondary_fields: [戰場]
  locations:
    - { name_ancient: 應天府, name_modern: 南京（中國江蘇）, lat: 32.0603, lng: 118.7969, precision: exact, role: 1368 年 1 月 23 日朱元璋在此稱帝，定為首都, src: [s1, s2] }
    - { name_ancient: 大都（改名北平）, name_modern: 北京（中國）, lat: 39.9042, lng: 116.4074, precision: exact, role: 1368 年 9 月明軍攻占元朝首都，元順帝北逃, src: [s1, s2] }
  scale: area
structure_tags: [革命與政權更替, 強人繞過制度, 重新設計基本單位]
topics: [統一與中央集權, 紙幣, 土地制度]
links: [finance-ming-baochao, war-jingnan, event-zheng-he-voyages, event-joseon-dynasty, event-single-whip-reform]
effects:
  - { id: finance-ming-baochao, rel: 背景, why: 朱元璋建國後想由政府牢牢掌控貨幣，1375 年起發行大明寶鈔並禁止民間用金銀交易。, src: [s3] }
  - { id: war-jingnan, rel: 背景, why: 朱元璋把兒子們分封為藩王、讓他們擁有護衛軍隊；他死後孫子建文帝削藩，叔叔燕王起兵爭位。, src: [s1, s5] }
counterparts: 無適當對照：明朝建立是農民起事推翻外族王朝後的改朝換代，西方軌同時期沒有規模與性質相近、已建卡的建國事件。
sources:
  - { id: s1, title: "Hongwu Emperor — Wikipedia", url: "https://en.wikipedia.org/wiki/Hongwu_Emperor", accessed: 2026-11-02, tier: 百科 }
  - { id: s2, title: "Ming dynasty — Wikipedia", url: "https://en.wikipedia.org/wiki/Ming_dynasty", accessed: 2026-11-02, tier: 百科 }
  - { id: s3, title: "邱永志，〈祖宗成例：「洪武貨幣秩序」的形成〉，《史林》2020 年第 2 期（愛思想轉載）", url: "https://www.aisixiang.com/data/122114.html", accessed: 2026-11-02, tier: 學術 }
  - { id: s4, title: "《皇明祖訓》（洪武六年初成，洪武二十八年定本）— 中文維基文庫", url: "https://zh.wikisource.org/wiki/皇明祖訓", accessed: 2026-11-02, tier: 一手 }
  - { id: s5, title: "靖難之役 — 維基百科（中文）", url: "https://zh.wikipedia.org/wiki/靖難之役", accessed: 2026-11-02, tier: 百科 }
importance: 3
learn:
  histories: [中國史]
  why_care: 一個當過和尚、要過飯的農家子弟當上皇帝，他親手設計的制度，影響了中國接下來將近三百年。
  story: |
    朱元璋生於 1328 年的貧苦農家，1352 年加入反抗元朝的紅巾軍。[s1][s2] 1356 年他攻下集慶，改名應天（今南京）；1363 年在鄱陽湖打敗最大的對手陳友諒。[s2] 1368 年 1 月 23 日，他在南京稱帝，國號「大明」，年號「洪武」。[s1][s2] 同年 9 月，明軍打進元朝首都大都，元順帝往北逃，大都改名北平。[s1] 當上皇帝後，朱元璋想打造自給自足的農村社會：用里甲制度把農戶編組起來，用魚鱗圖冊登記土地，軍人則世代當兵。[s1][s2] 1380 年他藉胡惟庸案廢除丞相，從此皇帝直接管六部。[s1] 他在位三十年，政治整肅估計殺了約十萬人。[s1]
  key_terms:
    - { term: 里甲, plain: 明初把農戶編成「里」和「甲」的基層組織，負責收稅與派勞役。, example: 像把整個社區分成好幾組，每組輪流當值收班費、打掃。 }
    - { term: 魚鱗圖冊, plain: 明初的土地登記簿，記錄每塊地的位置、等級、稅額與主人；地塊畫起來像魚鱗。, example: 像今天的地籍圖，政府靠它知道每塊地該收多少稅。 }
    - { term: 廢丞相, plain: 1380 年朱元璋取消丞相這個官職，皇帝直接指揮各部。, example: 像公司取消總經理，董事長自己直接管每個部門。 }
  primary_source:
    - { text: "以後子孫做皇帝時，並不許立丞相。臣下敢有奏請設立者，文武群臣即時劾奏，將犯人淩遲，全家處死。", from: 朱元璋《皇明祖訓》（洪武六年初成，二十八年定本）, src: s4 }
  historiography: |
    **反商業，還是務實？** 學者邱永志指出，明初江南「幾乎變成了一個單純的自給自足的農業社會」，商業受重創；但他認為洪武的貨幣與財政制度是元明制度轉換、以實物和勞役為主的財政體制下的產物，不只是皇帝一個人的錯誤決定。[s3]
    **強化皇權的代價**：維基百科整理的看法強調，朱元璋廢丞相、大規模整肅功臣，讓皇帝權力空前集中；他希望建立一個固定不動、世代相承的社會，以保證有固定的軍人與農民階層。[s1][s2]
  misconceptions:
    - 明朝不是先打下北京才建國：朱元璋 1368 年 1 月在南京稱帝，9 月明軍才攻入元朝首都大都。[s1][s2]
    - 明初不是一開始就只用紙鈔：1368 年先鑄洪武通寶銅錢，1375 年起才發行寶鈔。[s3]
crosscheck:
  date: 2026-11-02
  by: 獨立查核 agent（未參與寫作）
  result: 通過
  notes: "核對英文維基 Hongwu Emperor／Ming dynasty、邱永志《史林》2020 文、維基文庫《皇明祖訓》引文，史實均有出處。無前因（尚無元末紅巾軍卡）。十萬人整肅為估計數。"
verification: 交叉確認
lens_status: 無直接論述
summary_card: true
---

## C1 背景

元朝末年，民族差別待遇、重稅、通貨膨脹與黃河水患讓民怨高漲；1351 年紅巾軍起事，貧農出身的朱元璋 1352 年加入。[s2] 他 1356 年攻下南京，1363 年在鄱陽湖之戰打敗陳友諒，逐步成為群雄中最強的一方。[s1][s2]

## C2 經過

1368 年 1 月 23 日，朱元璋在應天（南京）稱帝，國號大明，年號洪武。[s1][s2] 同年派軍北伐，9 月初在大都城外擊敗元軍、占領大都，元順帝逃往上都，大都改名北平。[s1][s2]

## C4 制度或機制變化

朱元璋建立衛所制，軍人世襲；1371 年起在長江流域推行里甲制，1381 年推行全國；以魚鱗圖冊登記土地。[s1] 1380 年胡惟庸案後廢除丞相與中書省，並寫入《皇明祖訓》禁止後代恢復。[s1][s4] 他實施嚴格海禁，禁造兩桅以上的船。[s1]

## C6 直接結果

明朝成為統治中國的新王朝，首都設在南京。[s2] 為了掌控貨幣，1375 年起發行大明寶鈔，又禁止民間以金銀交易。[s3] 朱元璋把兒子分封到各地當藩王並擁有護衛軍隊，為他死後的叔姪之爭埋下伏筆。[s5]

## C7 長期影響

廢丞相後皇帝直接管理政府，皇權高度集中的格局延續整個明代；洪武時代以實物與勞役為主的財政體制，後來逐步被白銀取代。[s1][s3]
