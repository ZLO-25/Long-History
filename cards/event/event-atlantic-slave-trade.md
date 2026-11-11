---
id: event-atlantic-slave-trade
type: event
name: 大西洋奴隸貿易（約 1501–1867）
aliases: [跨大西洋奴隸貿易, 黑奴貿易, 三角貿易, 中間航程, Atlantic slave trade, Transatlantic slave trade, Middle Passage, Triangular trade, 奴隸船, 廢奴運動, Abolition, 艾奎亞諾, Olaudah Equiano, Trans-Atlantic Slave Trade Database, 跨大西洋奴隶贸易, 黑奴贸易]
civilization: [葡萄牙, 英國, 拉丁美洲, 美國]
track: west
time:
  start: 1501
  end: 1867
  precision: approx
  src: [s1, s2]
summary_line: 大事｜商路｜西非海岸—大西洋—美洲｜大西洋奴隸貿易（約 1501–1867）
place:
  primary_field: 商路
  secondary_fields: [港口／海峽, 資源產地]
  locations:
    - { name_ancient: 姆班薩剛果（剛果王國首都）, name_modern: 姆班扎剛果（安哥拉）, lat: -6.2667, lng: 14.2500, precision: schematic, role: 1526 年剛果國王阿方索一世寫信抗議葡萄牙商人非法擄人, src: [s1] }
    - { name_ancient: 維達（Whydah）, name_modern: 維達（貝南）, lat: 6.3631, lng: 2.0851, precision: schematic, role: 達荷美王國 1727 年征服、控制的奴隸出口港, src: [s1] }
    - { name_ancient: 聖多美, name_modern: 聖多美（聖多美普林西比）, lat: 0.3365, lng: 6.7273, precision: schematic, role: 葡萄牙殖民島；1525 年有船從這裡直接載俘虜到伊斯帕尼奧拉島, src: [s1] }
    - { name_ancient: 伊斯帕尼奧拉島（聖多明哥）, name_modern: 聖多明哥（多明尼加）, lat: 18.4861, lng: -69.9312, precision: schematic, role: 早期直航的目的地, src: [s1] }
    - { name_ancient: 聖多明格（法屬）, name_modern: 海地角（海地）, lat: 19.7600, lng: -72.2000, precision: schematic, role: 法國革命前每年輸入約 3 萬名非洲人的糖業殖民地, src: [s1] }
    - { name_ancient: 牙買加, name_modern: 牙買加, lat: 18.1096, lng: -77.2975, precision: schematic, role: 英屬西印度群島最大的產糖地, src: [s1] }
    - { name_ancient: 巴西, name_modern: 巴西, lat: -12.9714, lng: -38.5014, precision: schematic, role: 接收人數最多的地區之一（座標示意，取薩爾瓦多）；1850 年才全面禁止輸入, src: [s1, s2] }
    - { name_ancient: 古巴, name_modern: 哈瓦那（古巴）, lat: 23.1136, lng: -82.3666, precision: schematic, role: 已知最後一艘奴隸船 1867 年抵達, src: [s1] }
  scale: line
structure_tags: [慢變結構, 外部勢力介入, 快速擴張]
topics: [奴隸制, 海上貿易, 殖民統治, 糧食與農業, 啟蒙與人權, 民變與抗爭]
links: [event-columbus-aztec, event-portuguese-empire, event-haitian-revolution, war-american-civil-war, event-reconstruction, event-enlightenment, finance-voc]
causes:
  - { id: event-columbus-aztec, rel: 背景, why: 西班牙在加勒比海建立殖民地後，原住民因疫病與強迫勞動大量死亡，殖民者轉向從非洲運人來做工。, src: [s1, event-columbus-aztec:s4] }
  - { id: event-portuguese-empire, rel: 背景, why: 葡萄牙人先沿著非洲西岸建立據點與航線，早期的奴隸貿易幾乎由葡萄牙獨占。, src: [s1, event-portuguese-empire:s2] }
effects:
  - { id: event-haitian-revolution, rel: 回應, why: 法屬聖多明格每年輸入約三萬名非洲人在糖園做工，被奴役者最後起義推翻奴隸制。, src: [s1, event-haitian-revolution:s1] }
  - { id: war-american-civil-war, rel: 背景, why: 奴隸貿易把非洲人帶到北美，奴隸制在南方延續下來，成為南北長期衝突、最後開戰的核心問題。, src: [s3, war-american-civil-war:s1] }
counterparts: 無適當對照：中國軌沒有以「跨洋大規模販運人口、以種族區分世襲奴隸」為核心的卡片；把中國史上的奴婢或契約勞工硬配對容易誤導。
sources:
  - { id: s1, title: "Atlantic slave trade — Wikipedia", url: "https://en.wikipedia.org/wiki/Atlantic_slave_trade", accessed: 2026-11-07, tier: 百科 }
  - { id: s2, title: "David Eltis, David Richardson 等編, Trans-Atlantic Slave Trade Database — Estimates（SlaveVoyages，Emory University 等）", url: "https://legacy.slavevoyages.org/assessment/estimates", accessed: 2026-11-07, tier: 學術 }
  - { id: s3, title: "Henry Louis Gates Jr., How Many Slaves Landed in the U.S.? — PBS, The African Americans: Many Rivers to Cross（2013）", url: "https://www.pbs.org/wnet/african-americans-many-rivers-to-cross/history/how-many-slaves-landed-in-", accessed: 2026-11-07, tier: 通論 }
  - { id: s4, title: "Capitalism and Slavery — Wikipedia（含 Drescher、Engerman、Richardson、Eltis 等人的評論）", url: "https://en.wikipedia.org/wiki/Capitalism_and_Slavery", accessed: 2026-11-07, tier: 百科 }
  - { id: s5, title: "Olaudah Equiano Describes the Middle Passage, 1789（節錄自 The Interesting Narrative of the Life of Olaudah Equiano, London 1790, pp. 51–54）— The American Yawp Reader", url: "https://www.americanyawp.com/reader/british-north-america/olaudah-equiano-describes-the-middle-passage-1789/", accessed: 2026-11-07, tier: 一手 }
  - { id: s6, title: "Sapiens 第 8 章〈There is No Justice in History〉摘要（LitCharts）", url: "https://www.litcharts.com/lit/sapiens/chapter-8-there-is-no-justice-in-history", accessed: 2026-11-07, tier: 摘要 }
  - { id: s7, title: "Sapiens 第 16 章〈The Capitalist Creed〉摘要（LitCharts）", url: "https://www.litcharts.com/lit/sapiens/chapter-16-the-capitalist-creed", accessed: 2026-11-07, tier: 摘要 }
  - { id: s8, title: "Learn from the past, ‘stand united against racism’ – UN chief（聯合國新聞，2022 年 3 月 25 日，奴隸制和跨大西洋奴隸貿易受害者國際紀念日）", url: "https://news.un.org/en/story/2022/03/1114682", accessed: 2026-11-07, tier: 通論 }
  - { id: s9, title: "Olaudah Equiano — Wikipedia（含 Carretta、Lovejoy 等人對出生地的爭論）", url: "https://en.wikipedia.org/wiki/Olaudah_Equiano", accessed: 2026-11-07, tier: 百科 }
importance: 3
learn:
  histories: [世界通史, 美洲史, 歐洲史]
  why_care: 三百多年間，一千多萬非洲人被鐵鍊鎖上船送往美洲；今天美洲的人口組成、種族歧視的根源，以及「人權」觀念的爭取，都和這段歷史分不開。
  story: |
    1525 年，一艘船從非洲外海的葡萄牙殖民島聖多美，直接把被擄的非洲人載到加勒比海的伊斯帕尼奧拉島。[s1] 接下來三百多年，研究者依船隻紀錄估計，約有 1,250 萬名非洲人被押上奴隸船，約 1,070 萬人活著抵達美洲。[s2][s3] 他們多半被送到巴西和加勒比海的甘蔗園，種出歐洲人愛吃的糖。[s1] 艾奎亞諾在自傳裡說，自己 11 歲左右（約 1756 年）在西非被擄上船；他回憶船艙又擠又熱，空氣臭得令人窒息，到處是婦女的尖叫和垂死者的呻吟。[s5][s9]（有學者依受洗與海軍紀錄懷疑他其實生在美洲的南卡羅來納，也有學者認為他的說法可信，見下方誤解欄。[s9]） 1807 年英國禁止奴隸貿易，但已知最後一艘奴隸船要到 1867 年才抵達古巴。[s1]
  key_terms:
    - { term: 中間航程, plain: 奴隸船從非洲橫渡大西洋到美洲的那一段航程；被擄者被鎖在船艙裡，很多人死在途中。, example: 「三角貿易」的三條邊裡，最殘酷的就是中間這一條。 }
    - { term: 三角貿易, plain: 歐洲把槍、布、酒運到非洲換人，把人運到美洲，再把糖、棉花、菸草運回歐洲。, example: 像三站接力的生意，但其中一站的「貨物」是活生生的人。 }
    - { term: 種植園, plain: 大規模只種一種經濟作物（例如甘蔗、棉花）的農場，靠大量強迫勞動。, example: 一大片只種甘蔗的田，幾百人每天被逼著砍甘蔗、煮糖。 }
    - { term: 廢奴, plain: 先禁止買賣奴隸（廢除奴隸貿易），再廢除奴隸制本身，兩步常常相隔好幾十年。, example: 英國 1807 年禁止奴隸貿易，巴西 1850 年禁止輸入，但巴西奴隸制要到 1888 年才廢除。 }
  primary_source:
    - { text: "The shrieks of the women, and the groans of the dying, rendered the whole a scene of horror almost inconceivable.（婦女的尖叫、垂死者的呻吟，讓這一切成了幾乎無法想像的恐怖景象。）", from: 艾奎亞諾《艾奎亞諾生平的有趣自述》（1789 年初版；引自 1790 年倫敦版頁 51–54）；中文為本站摘譯, src: s5 }
  historiography: |
    **奴隸貿易養大了英國工業革命嗎？廢奴是為了道德還是利益？** 千里達史家艾立克·威廉斯 1944 年在《資本主義與奴隸制》主張，奴隸貿易與種植園的利潤幫助英國工業革命起步，而廢奴主要是因為西印度群島經濟衰退，不是人道理由。[s4] 批評者 Seymour Drescher 1977 年認為，1807 年英國廢止奴隸貿易時這門生意並沒有衰退，推動力是有投票權的英國民眾的道德憤怒；Stanley Engerman 估計奴隸貿易與西印度種植園的利潤每年都不到英國經濟的 5%，David Richardson 也認為威廉斯誇大了。[s4] 也有學者重新支持威廉斯的部分論點，爭論至今未停。[s4]
    **奴隸貿易對非洲造成多大傷害？** Walter Rodney 1972 年認為，非洲用人和原料換歐洲製品，形成不平等的關係，是非洲「低度發展」的原因之一；John Thornton 則認為奴隸貿易對非洲經濟不是關鍵，非洲的手工業仍有競爭力。[s1] 另外，也有學者認為「三角貿易」被過度強調，很多奴隸船其實只在美洲與非洲之間兩地往返。[s1]
  misconceptions:
    - 被運到北美（今美國一帶）的人只佔一小部分：約 38.8 萬人，大多數被送到巴西和加勒比海。[s3]
    - 「禁止奴隸貿易」不等於「廢除奴隸制」：古巴 1820 年宣布奴隸貿易違法，奴隸制卻到 1886 年才廢除。[s1]
    - 「艾奎亞諾的出生地沒有爭議」：Carretta 找到 1759 年受洗紀錄和 1773 年海軍名冊，寫他生在卡羅來納，因此懷疑他的非洲經歷有部分是建構的；Lovejoy 等學者則指出自傳中很多細節可以查證，認為他多半真的生在非洲。[s9]
    - 非洲人不只是被動的受害者：剛果國王阿方索一世 1526 年就寫信抗議葡萄牙人擄人；被奴役者也多次起義，例如海地革命與 1831 年牙買加起義。[s1][s4]
  perspectives:
    - { history: 美洲史, text: 從被奴役者的後代看，這是家族被拆散、名字與語言被奪走的開始，也是美洲非裔文化在苦難中誕生的起點。 }
    - { history: 歐洲史, text: 從歐洲看，奴隸船與糖園曾是賺錢的生意，後來英國又成為帶頭廢止奴隸貿易的國家，兩件事都是歐洲史的一部分。 }
crosscheck: { date: 2026-11-07, by: 獨立查核（另一次呼叫，未參與寫作）, result: 通過, notes: "WebFetch 核對 s1、s2（SlaveVoyages 估計表）、s3 PBS、Equiano 維基、聯合國新聞。確認：資料庫 1501–1866 總計 12,521,337 人，表格設定為「只計上船」（embarked），各國旗分項與卡片一致；PBS 寫 1,250 萬上船、1,070 萬抵達、北美約 38.8 萬；s1 寫 1,275 萬上船、最多約 200 萬死於航程、Manning 400 萬／800 萬、Nunn 引 10–50%、船員約 20%、達荷美以出售戰俘為主要財源（單一來源）、1525、1526、聖多明格每年 3 萬、1867 古巴、Rodney／Thornton。修正：C5 原寫 1,275 萬與 C6 的 1,252 萬互相矛盾，改為並列兩個來源並以資料庫兩數相減約 180 萬；Equiano 1756 年被擄改為「他在自傳裡說」，並加 Carretta 與 Lovejoy 的出生地爭議（新增 s9）；C7 廢奴後歧視加聯合國新聞 2022 年古特瑞斯談話（新增 s8，通論）；達荷美註明單一來源。哈拉瑞小節未重新開 LitCharts 第 8、16 章（內容與查核者所知《人類大歷史》第 8 章相符）。未逐字核對：s4 Capitalism and Slavery 頁、s5 Equiano 節錄頁。" }
verification: 爭議
lens_status: 依公開資料推論，未對照原書
images:
- url: https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Brookes_slave_ship%2C_British_Library.jpg/960px-Brookes_slave_ship%2C_British_Library.jpg
  page: https://commons.wikimedia.org/wiki/File:Brookes_slave_ship,_British_Library.jpg
  title: 布魯克斯號奴隸船平面圖
  creator: 倫敦印刷商 James Phillips 印行（廢奴協會的宣傳單）
  year: 約 1788–1789（Commons 檔案頁標 1787）
  holder: 大英圖書館
  license: Public domain（PD-old-100-1923；2026-11-10 已核對 Commons 檔案頁）
  caption: 廢奴人士印的奴隸船「布魯克斯號」裝載圖，畫出被奴役的非洲人像貨物一樣排滿船艙；這張圖是廢奴運動最有力的宣傳。
---

## C1 背景

1492 年後，歐洲人在美洲建立殖民地，需要大量勞力開礦、種植。[s1] 葡萄牙人沿著非洲西岸建立據點，早期的奴隸貿易幾乎由葡萄牙獨占。[s1] 甘蔗種植是對奴隸勞力需求的核心。[s1] 西非已有一些國家把戰俘當成重要收入，例如維基百科說，達荷美國王把出售戰俘當成主要財源（單一來源）。[s1]

## C2 經過

- **16 世紀起**：奴隸被運往美洲；1525 年有船從聖多美直接把俘虜運到伊斯帕尼奧拉島。[s1] SlaveVoyages 資料庫的估計表以 1501 年為起點。[s2]
- **1526 年**：剛果國王阿方索一世寫信給葡萄牙國王若昂三世，抗議葡萄牙商人非法擄人。[s1]
- **18 世紀**：葡萄牙、英國、法國三國的船載走了在非洲被擄者的九成；18 世紀大部分時間英國載運人數居歐洲之冠。[s1] 達荷美 1724、1727 年征服阿拉達與維達，控制貿易路線；奧約、阿散蒂等擴張中的國家發動大戰、產生大量俘虜，在 18 世紀末達到高峰。[s1]
- **1807–1808 年**：英國通過《奴隸貿易法》；美國 1808 年 1 月 1 日起禁止輸入奴隸。[s1]
- **1850 年**：巴西全面禁止奴隸貿易（1831 年已開始立法壓制）。[s1]
- **1867 年**：已知最後一艘奴隸船抵達古巴。[s1]

## C3 關鍵人物與群體

被擄的非洲人，例如後來寫下自傳的艾奎亞諾；非洲的國家與商人（剛果、達荷美、奧約、阿散蒂）；葡萄牙、英國、法國、西班牙、荷蘭等國的奴隸商與船員；美洲的種植園主；廢奴運動者與起義的被奴役者。[s1][s4][s5]

## C4 制度或機制變化

歐洲人把槍、火藥、酒、印度棉布和工業製品運到非洲換取俘虜，俘虜經「中間航程」運到美洲，船再把棉花、糖、菸草、咖啡、糖蜜和蘭姆酒運回歐洲。[s1] 美洲的種植園依賴世代相傳、以種族區分的奴隸制。[s1][s6]

## C5 受益者與受損者

受損者：被擄的非洲人與他們的家人和社會。被裝上船的人數，SlaveVoyages 資料庫估計約 1,252 萬人（維基百科另寫約 1,275 萬人）；資料庫估計約 1,070 萬人活著抵達，兩數相減，航程中約有 180 萬人死亡，維基百科則說最多可能有約 200 萬人。[s1][s2][s3] Manning 估計另有約 400 萬人在非洲被俘後死亡，約 800 萬人在非洲境內被奴役；經濟學者 Nathan Nunn 引用的估計說，從內陸押往海岸的強迫行軍死亡率在 10% 到 50% 之間（以上皆為粗估）。[s1] 奴隸船上的船員死亡率也高達約兩成。[s1] 受益者：奴隸商、種植園主與相關的歐美商業，以及從中收稅、出售戰俘的國家；利潤佔英國經濟多大比例，學者看法不一。[s1][s4]

## C6 直接結果

依 SlaveVoyages 資料庫的估計，1501 年起被押上船的約 1,252 萬人中，葡萄牙／巴西船載約 585 萬人，英國約 326 萬，法國約 138 萬，西班牙／烏拉圭約 106 萬，荷蘭約 55 萬，美國約 31 萬，丹麥與波羅的海約 11 萬（估計）。[s2] 約 1,070 萬人活著抵達美洲，其中直接運到北美的約 38.8 萬人。[s3]

## C7 長期影響

美洲（特別是巴西與加勒比海）形成大規模的非裔人口與文化。[s1][s3] 奴隸起義（從海地到 1831 年的牙買加）、宗教團體的反奴運動與經濟利益的變化，共同推動了 19 世紀的廢奴。[s4] 奴隸制廢除後，種族歧視仍長期存在；聯合國秘書長古特瑞斯 2022 年說，種族主義是奴隸貿易「最有害、最持久的遺產」，非洲裔仍面對種族歧視、邊緣化與排斥。[s6][s8]

## C8 雙軌解讀

### 李彔

無直接論述。

### 哈拉瑞

依 LitCharts 摘要，《人類大歷史》第 8 章〈歷史從無公義〉說，歐洲征服者把非洲人運到美洲當奴隸，而不是奴役東亞人，主要是因為從非洲運人比較便宜，在美洲當地奴役人也因瘧疾流行等因素不划算；種族主義是事後才發展出來的說詞，聲稱白人天生比黑人聰明、有道德。[s6] 書中把這看成惡性循環：偏見限制了黑人受教育的機會，又被拿來證明黑人「比較差」。[s6] 第 16 章〈資本主義教條〉則把美洲種植園使用非洲奴隸，當成資本主義追求利潤可能造成巨大傷害的例子。[s7]

## C9 今日對照鉤子

結構：一樣便宜又日常的商品（當時是糖、棉花、菸草），背後可能是遠方看不見的強迫勞動；買的人和被迫生產的人之間隔著好幾段貿易鏈。[s1] 這裡只描述結構，不預測。

## C10 不可類比的差異

當時奴隸制在大西洋各國都是合法制度，被奴役者被當成財產買賣、世襲；英國與美國直到 1807–1808 年才禁止奴隸貿易，巴西的奴隸制更延續到 1888 年。[s1] 這和今天各國法律都禁止奴役的處境完全不同，不能直接類比。[s1]
