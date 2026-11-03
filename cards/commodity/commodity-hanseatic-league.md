---
id: commodity-hanseatic-league
type: commodity
name: 漢薩同盟（13–17世紀）
aliases: [漢薩同盟, Hanseatic League, 呂貝克, Hansa, 波羅的海貿易, 漢薩, Lübeck, 商館, 漢撒同盟, 漢薩議會, 鋼院, 布呂根, 柯克船, 鱈魚乾, Hanse, Hansetag, Kontor, Steelyard, Bryggen, Peterhof, cog, 汉萨同盟]
civilization: [日耳曼與法蘭克（神聖羅馬帝國）]
track: west
time:
  start: 1250
  end: 1669
  precision: approx
  src: [s1, s3]
summary_line: 物資｜商路｜呂貝克與北海、波羅的海｜漢薩同盟（13–17世紀）
summary_card: true
place:
  primary_field: 商路
  secondary_fields: [港口／海峽, 城市／都會]
  locations:
    - { name_ancient: 呂貝克, name_modern: 呂貝克（德國）, lat: 53.8655, lng: 10.6866, precision: schematic, role: 同盟的主要城市，漢薩議會通常在此召開（座標為今舊城）, src: [s1, s3] }
    - { name_ancient: 卑爾根（德意志碼頭）, name_modern: 卑爾根布呂根（挪威）, lat: 60.3975, lng: 5.3240, precision: schematic, role: 四大商館之一，以鱈魚乾換穀物, src: [s2, s3] }
    - { name_ancient: 諾夫哥羅德（聖彼得商館）, name_modern: 大諾夫哥羅德（俄羅斯）, lat: 58.5213, lng: 31.2755, precision: schematic, role: 四大商館之一，輸出毛皮、蜂蠟、蜂蜜與木材, src: [s2] }
    - { name_ancient: 布魯日, name_modern: 布魯日（比利時）, lat: 51.2093, lng: 3.2247, precision: schematic, role: 四大商館之一，各地商人匯集的轉運市場, src: [s2] }
    - { name_ancient: 倫敦鋼院（Stalhof）, name_modern: 倫敦（英國）, lat: 51.5095, lng: -0.0920, precision: schematic, role: 四大商館之一，1597 年被英格蘭關閉（座標為泰晤士河北岸舊址一帶）, src: [s1, s2] }
  scale: line
structure_tags: [基礎建設網絡, 經濟施壓與制裁, 單一港口依賴, 金融中心轉移]
topics: [海上貿易, 糧食與農業, 關稅與貿易戰]
links: [finance-bruges-bourse, finance-amsterdam-exchange, war-thirty-years, event-black-death]
causes:
  - { id: event-holy-roman-empire, rel: 背景, why: 神聖羅馬帝國後期皇權衰弱，皇帝保護不了各地商路，北德城市只好自己結成互助網絡，一起對付盜匪與海盜。, src: [s1] }
  - { id: war-thirty-years, rel: 促成, why: 三十年戰爭重創漢薩城市，瑞典奪走部分成員的領土，同盟越來越無足輕重，1669 年開完最後一次議會就瓦解了。, src: [s1] }
effects:
  - { id: finance-bruges-bourse, rel: 背景, why: "布魯日是漢薩同盟四大海外商館之一，北方商人在此與義大利商人、銀行家匯集，才需要固定的聚會換錢場所。", src: [s2, "finance-bruges-bourse:s1"] }
counterparts: 無適當對照：中國軌沒有「沒有國王、由一群商業城市自組、能對外國實施禁運甚至打仗」的商業聯盟卡；中國的商幫與會館沒有自己的外交與武力。
sources:
  - { id: s1, title: "Hanseatic League — Wikipedia", url: "https://en.wikipedia.org/wiki/Hanseatic_League", accessed: 2026-11-02, tier: 百科 }
  - { id: s2, title: "The Kontore（漢薩商館）— Die Hanse（漢薩城市聯盟，呂貝克市政廳漢薩辦公室）", url: "https://hanse.org/en/the-medieval-hanseatic-league/die-kontore", accessed: 2026-11-02, tier: 通論 }
  - { id: s3, title: "Katharine Dicks, Celebrating International Hanseatic Day — Cambridge University Library, Language Collections Blog（2021-08-18）", url: "https://languagecollections-blog.lib.cam.ac.uk/2021/08/18/celebrating-international-hanseatic-day/", accessed: 2026-11-02, tier: 通論 }
  - { id: s4, title: "The Hanseatic League（年表與史料英譯節錄）— Kimball Files, University of Oregon", url: "https://pages.uoregon.edu/kimball/grd.Hanse.htm", accessed: 2026-11-02, tier: 一手 }
importance: 2
learn:
  histories: [歐洲史, 錢的歷史]
  why_care: 沒有國王、沒有首都、也沒有常備軍，一群德意志商業城市卻能壟斷北歐海上貿易好幾百年，甚至打贏一個王國。
  story: |
    中世紀北歐的商人出海做生意很危險，於是德意志各城的商人結伴、互相保護，慢慢形成「漢薩」（意思是商人團體）。[s1] 它從來沒有正式成立的日子，前後涵蓋近兩百個城鎮，傳統上以呂貝克為首。[s1][s3] 它們在倫敦、布魯日、卑爾根、諾夫哥羅德設有大型「商館」，商人在裡面依自己的規矩生活。[s2][s3] 柯克船把東方的穀物、毛皮、蜂蠟、木材運到法蘭德斯與英格蘭，再把呢絨等製品運回來。[s1] 城市之間約好：海上出現海盜，大家都要出一份力去剿滅；在一個城市犯罪被趕走的人，別的城市也不收。[s4] 1370 年，漢薩城市打贏丹麥，簽下《施特拉爾松德條約》，到達勢力頂點。[s1] 後來領土國家崛起、荷蘭人競爭、大西洋貿易興起，漢薩逐漸衰落，1669 年召開最後一次議會後就悄悄瓦解。[s1][s3]
  key_terms:
    - { term: 漢薩（Hanse）, plain: 古德語「團體、結伴」的意思，指結伴出外經商的商人團體，後來指這些城市的聯盟。, example: 像幾家小店一起出錢包一輛貨車進貨，路上互相照應。 }
    - { term: 商館（Kontor）, plain: 漢薩在外國城市設立的大型貿易據點，商人在裡面住、存貨並有自己的規章與法律自主權。, example: 像在國外設一個「同鄉會館」，大家住一起、照自己的規矩辦事。 }
    - { term: 柯克船（cog）, plain: 漢薩時代代表性的單桅大貨船，船身寬、載貨量大。, example: 像中世紀北海上的大貨櫃車。 }
  primary_source:
    - { text: "If pirates appear on the sea, all the cities must contribute their share to the work of destroying them.（海上若出現海盜，各城都必須出一份力去剿滅。）", from: 北德城市聯盟決議（1265；原文見 Keutgen《Urkunden zur städtischen Verfassungsgeschichte》1901 第 430b 號，Thatcher 英譯，轉引自 University of Oregon Kimball Files，中文為本站摘譯）, src: s4 }
  historiography: |
    **它算是一個「國家」嗎？** 英文維基整理的看法強調，漢薩是一個鬆散的城市聯盟，沒有常設行政機構、國庫或常備軍，議會決議靠共識，也從未成為法人；它絕不是「國中之國」。[s1]
    **呂貝克是唯一的中心嗎？** 傳統說法把漢薩起源綁在呂貝克；較新的研究則把呂貝克看成好幾個區域貿易中心之一。[s1] 劍橋大學圖書館的介紹仍稱呂貝克是同盟的行政中心、漢薩議會通常在此召開，兩種說法側重不同。[s3]
  misconceptions:
    - "漢薩同盟沒有「成立日」：它是商人團體慢慢結合而成，第一次漢薩議會的年份也有 1300 年左右或 1356 年等不同說法。[s1][s3]"
    - "漢薩不只賣奢侈品：大宗貨物是穀物、木材、鹹魚、鱈魚乾、鹽和啤酒這類日常必需品。[s1][s2]"
crosscheck:
  date: 2026-11-02
  by: 獨立查核 agent（未參與寫作）
  result: 通過
  notes: "已開 s1、s2、s4 核對：無成立日、近兩百城鎮、四大商館、1370 施特拉爾松德、1669 最後議會、非國中之國皆有據。改：『最盛時約兩百城』改為『前後涵蓋近兩百』；刪去 effects→阿姆斯特丹交易所（方向相反：是荷蘭崛起使漢薩衰落）；1265 引文補原始出處 Keutgen 430b／Thatcher 英譯。"
verification: 交叉確認
lens_status: 無直接論述
---

## B1 物資與用途

漢薩經營的是北歐的大宗貿易：從東方運出蜂蠟、毛皮、木材、樹脂、亞麻、蜂蜜和黑麥等穀物，送到法蘭德斯與英格蘭；回程運呢絨和手工製品；另外還有鯡魚、鹽、鱈魚乾、礦石與啤酒。[s1] 這些多半是糧食、建材與日用品，北歐各地生活都依賴它們流通。[s1][s2]

## B4 運輸路線與咽喉

航線連接波羅的海與北海，四大商館分別位於倫敦、布魯日、卑爾根與諾夫哥羅德。[s2][s3] 卑爾根以鱈魚乾換進穀物；諾夫哥羅德輸出毛皮、蜂蠟、蜂蜜。[s2][s3]

## B6 經濟與財政角色

商館在當地享有相當的法律自主權，漢薩商人可以用集體抵制施壓：例如在布魯日發生糾紛時，商人把生意搬到別的城市，直到布魯日讓步。[s1][s2] 15 世紀以後，荷蘭人在穀物貿易上的競爭、大西洋貿易興起、領土國家崛起以及三十年戰爭，讓漢薩逐漸失去優勢；1597 年英格蘭把漢薩商人逐出倫敦。[s1]

## B7 權力與政治連結

漢薩沒有國王或常備軍，但城市可以聯合作戰：1361–1370 年與丹麥交戰，以《施特拉爾松德條約》收場，達到勢力頂峰。[s1] 城市之間也互相約定剿滅海盜、不收容他城驅逐的罪犯，用集體規則維護商路安全。[s4]

## B8 雙軌解讀

### 李彔

無直接論述：本卡未查到李彔公開講稿談漢薩同盟。

### 哈拉瑞

無直接論述：本卡未查到哈拉瑞公開摘要談漢薩同盟。

## B9 今日對照鉤子

「商業網絡靠共同規則與集體抵制來保護自己」的結構：沒有中央政府，成員城市仍能用禁運、聯合行動讓大國讓步。[s1][s2]

## B10 不可類比的差異

漢薩成員是中世紀享有特權的自治城市，同時受各自領主或皇帝管轄，決議靠共識、沒有正式條約組織；它和今天由主權國家簽約組成、有常設機構的經濟組織不同。[s1]
