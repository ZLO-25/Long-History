---
id: event-black-death
type: event
name: 黑死病
aliases: [鼠疫, Black Death, 黑死病大流行, 腺鼠疫, Black Plague, 鼠疫桿菌, 薄伽丘, 卡法圍城, the Great Mortality, Yersinia pestis, Caffa]
civilization: [義大利, 英格蘭, 法國, 蒙古帝國]
track: west
time:
  start: 1347
  end: 1351
  precision: approx
  src: [s1, s2]
summary_line: 大事｜城市／都會｜卡法、義大利、英格蘭｜黑死病
place:
  primary_field: 城市／都會
  secondary_fields: [商路, 港口／海峽]
  locations:
    - { name_ancient: 卡法, name_modern: 費奧多西亞（克里米亞）, lat: 45.03, lng: 35.38, precision: schematic, role: 熱那亞人的黑海貿易港，1340 年代中期被金帳汗國軍隊圍攻，疫病由此經船隻西傳（座標為今費奧多西亞市）, src: [s1, s2] }
    - { name_ancient: 墨西拿（西西里）, name_modern: 墨西拿（義大利西西里島）, lat: 38.19, lng: 15.55, precision: schematic, role: 1347 年 10 月熱那亞船隻把疫病帶到西西里，是進入西歐的第一站（座標為今墨西拿市）, src: [s1, s2] }
    - { name_ancient: 佛羅倫斯, name_modern: 佛羅倫斯（義大利）, lat: 43.77, lng: 11.26, precision: schematic, role: 1348 年重災城市，約 8.5 萬人中估計死亡 5 萬（座標為今市中心）, src: [s2] }
    - { name_ancient: 多塞特, name_modern: 多塞特郡（英國英格蘭）, lat: 50.61, lng: -2.46, precision: schematic, role: 1348 年 6 月前後疫病進入英格蘭的早期地點（座標為今韋茅斯，示意）, src: [s1] }
    - { name_ancient: 開羅, name_modern: 開羅（埃及）, lat: 30.04, lng: 31.24, precision: schematic, role: 1348 年夏末受災，約 60 萬居民中估計超過三分之一死亡（座標為今開羅市）, src: [s1] }
  scale: area
structure_tags: [疫病衝擊, 突變事件, 臨界點]
topics: [疫病, 海上貿易]
links: [war-crusades, finance-medici-bank, commodity-silk]
effects:
  - { id: event-peasants-revolt-1381, rel: 促成, why: "人口大減使勞工稀少、工資上漲，英格蘭卻立法把工資壓回疫情前水準並強迫人工作，農民的不滿累積到 1381 年爆發。", src: [s3, s2] }
  - { id: event-reformation, rel: 背景, why: "黑死病時教會無力減輕人們的苦難，威信下降，讓後來批評教會的聲音更容易得到支持。", src: [event-reformation:s2] }
counterparts: "無適當對照：計畫卡中沒有中國的疫病卡；且 14 世紀中國是否也爆發同一波鼠疫，史料證據薄弱（World History Encyclopedia），不宜硬配。"
sources:
  - { id: s1, title: "Black Death — Wikipedia", url: "https://en.wikipedia.org/wiki/Black_Death", accessed: 2026-10-25, tier: 百科 }
  - { id: s2, title: "Black Death — World History Encyclopedia", url: "https://www.worldhistory.org/Black_Death/", accessed: 2026-10-25, tier: 通論 }
  - { id: s3, title: "Statute of Labourers 1351 — Wikipedia", url: "https://en.wikipedia.org/wiki/Statute_of_Labourers_1351", accessed: 2026-10-25, tier: 百科 }
  - { id: s4, title: "Homo Deus 第 1 章摘要（LitCharts）", url: "https://www.litcharts.com/lit/homo-deus/chapter-1", accessed: 2026-10-25, tier: 摘要 }
  - { id: s5, title: "李彔《現代化十六講》之五、六（農業文明的天花板與三次衝頂；思想革命與制度創新），虎嗅 2014", url: "https://www.huxiu.com/article/38101.html", accessed: 2026-10-25, tier: 摘要 }
  - { id: s6, title: "The Statute of Laborers; 1351 — The Avalon Project, Yale Law School", url: "https://avalon.law.yale.edu/medieval/statlab.asp", accessed: 2026-11-15, tier: 一手 }
importance: 3
learn:
  histories: [歐洲史, 世界通史]
  why_care: 一場瘟疫在幾年內奪走歐洲估計三成到六成的人，勞工變少、工資上漲，連政府立法想把工資壓回去都壓不住。
  story: |
    黑死病由鼠疫桿菌引起，主要靠跳蚤叮咬傳播。[s1][s2] 1340 年代中期，金帳汗國軍隊圍攻黑海港口卡法；據說把病死的屍體拋進城內，但也可能是老鼠傳入。[s1][s2] 1347 年 10 月，熱那亞船隻把疫病帶到西西里；1348 年擴散到義大利本土、法國，6 月前後到達英格蘭。[s1][s2] 歐洲死亡人數估計 2,500 萬到 5,000 萬，約占歐洲人口的 30% 到 60%。[s1] 倖存的勞工能要求更高工資，英格蘭卻在 1349 年和 1351 年立法，把工資上限定在疫情前（1346 年）的水準，並強迫 60 歲以下、有工作能力的人工作；但執行不力，擋不住工資上漲。[s3][s6] 歐洲人口要到約 1550 年才回到 14 世紀的水準。[s1][s2]
  key_terms:
    - term: 鼠疫桿菌
      plain: 引起黑死病的細菌（Yersinia pestis），主要靠跳蚤叮咬傳播，肺炎型也能經飛沫在人與人之間傳播。
      example: 像一種很小的病菌搭著跳蚤和人群移動，人越擠越容易傳開。
    - term: 鞭笞者（Flagellants）
      plain: 在街上鞭打自己、呼籲悔罪的宗教團體。
      example: 像有一群人在街頭用自我懲罰的方式提醒大家要懺悔。
    - term: 《勞工法》
      plain: 英格蘭 1349 年頒布《勞工條例》、1351 年頒布《勞工法》，把工資上限定在疫情前的水準，但執行不力。
      example: 像政府規定打工時薪不能高於三年前，可是老闆搶不到人還是願意加錢。
    - term: 隔離檢疫
      plain: 拉古薩（今杜布羅夫尼克）1377 年規定外來者隔離 30 天，後來延長為 40 天，英文的 quarantine 一詞與此有關。
      example: 像外地回來的人先在家待一段時間，確認沒事才能出門。
  primary_source:
    - text: "……were accustomed to be paid in the twentieth year of our reign of England, or the five or six common years next preceding（〔工資只能領〕國王在位第二十年或其前五六個平常年份慣常支付的數額）"
      from: 英格蘭國王愛德華三世的勞工法令，耶魯大學 Avalon Project 以「The Statute of Laborers; 1351」為題收錄的英譯；「統治第二十年」約是 1346 年；中文為本站翻譯
      src: s6
  historiography: |
    **疫病從哪裡來？** 發源地有爭議：有中國、中亞、西亞等說法。吉爾吉斯楚河谷地 1338–1339 年的墓碑提到「瘟疫」，常被當作中亞起源的證據；2011 年的基因研究指向中國，但 14 世紀中國爆發鼠疫的史料證據薄弱。[s1][s2]
    **死了多少人？** 維基百科估計歐洲死亡 2,500 萬到 5,000 萬人；World History Encyclopedia 估計 2,500 萬到 3,000 萬人，平均死亡率約 30%，最嚴重的城市可能接近 50%。[s1][s2] 歐亞合計有估計高達 7,500 萬到 2 億人，但維基百科註明這個數字來源不夠可靠。[s1]
    **它和文藝復興有關嗎？** 也有史家把黑死病和文藝復興連結，但只能解釋一部分。[s1][s2]
    **從哪年到哪年？** 維基百科作 1346–1353 年，World History Encyclopedia 作 1347–1352 年；本卡取歐洲最嚴重的 1347–1351 年。[s1][s2]
  misconceptions:
    - 卡法圍城「拋屍入城」是一個常被講的說法，但來源只說「據說」，也可能是老鼠傳入。[s1][s2]
    - 黑死病不是確定從中國來的：2011 年的基因研究指向中國，但史料證據薄弱，發源地仍有爭議。[s2]
    - 「歐亞死亡 7,500 萬到 2 億人」的說法來源不夠可靠，不宜當成定論。[s1]
  perspectives:
    - { history: 歐洲史, text: 從歐洲看，人口驟減讓勞工變貴、農奴制度被削弱，政府想壓工資也壓不住，之後出現多起農民起義。 }
    - { history: 世界通史, text: 從全世界看，疫病沿著貿易網絡擴散，黑海、地中海的商船航線與熱那亞商人是主要路徑，中東與北非也同樣受創。 }
crosscheck: { date: 2026-11-15, by: Fable 5.2 獨立查核（未參與寫作）, result: 通過, notes: "逐句核對學習區塊與正文 C1–C10、effects：鼠疫桿菌與傳播方式、卡法『據說』拋屍、1347-10 西西里、1348 義法英、歐洲死亡 2,500–5,000 萬（30%–60%）與 WHE 2,500–3,000 萬兩說、歐亞 7,500 萬–2 億『來源不夠可靠』、發源地爭議、起訖年三種寫法、拉古薩 1377 隔離 30／40 天、約 1550 年人口回復，皆與正文一致。改動：(1) 學習區塊與正文 C4 的『強迫 68 歲以下的人工作』改為 60 歲：s6 法令文本作 able bodied and below the age of sixty years；2026-11-15 重開 s3（英文維基）確實寫 under the age of 68 years，兩者不同，本卡依法令文本並在正文註明；(2) 一手引文補回原句結尾『or the five or six common years next preceding』，原先省略會讓人以為只以單一年份為準；(3) 出處說明改寫。一手引文：2026-11-15 重新開啟 s6，讀到『he shall take only the wages liveries, meed or salary which, in the places where he sought to serve, were accustomed to be paid in the twentieth year of our reign of England, or the five or six common years next preceding.』引文因 160 字上限只引 were accustomed 以下，逐字相符，前面省略的『he shall take only the wages…』在中譯用方括號補出，不改變意思。保留意見：Avalon 頁面標題是 1351 年《勞工法》，但內文是國王致坎特伯里大主教的命令形式、註明出自 Statutes of the Realm 卷一頁 307，查核者認為很可能其實是 1349 年《勞工條例》的文本（1349 與 1351 兩道法令都以疫情前工資為準），未能另找資料確認，所以出處只寫『Avalon 以此為題收錄』；s4（LitCharts）、s5（虎嗅）只用於正文雙軌解讀，學習區塊沒有引用；s1、s2 本次沒有重新開啟。" }
verification: 爭議
lens_status: 依公開資料推論，未對照原書
images:
- url: https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Doutielt1.jpg/960px-Doutielt1.jpg
  page: https://commons.wikimedia.org/wiki/File:Doutielt1.jpg
  title: 圖爾奈的黑死病死者下葬
  creator: 皮耶拉特・杜・蒂爾特（Pierart dou Tielt）
  year: 約 1352
  holder: 比利時皇家圖書館
  license: Public domain（PD-art／PD-old-100；2026-11-10 已核對 Commons 檔案頁）
  caption: 1349 年黑死病流行時，圖爾奈（今比利時）居民抬著棺材埋葬死者；這是黑死病同時代最有名的插圖之一。
---

## C1 背景

黑死病由鼠疫桿菌（Yersinia pestis）引起，主要靠跳蚤叮咬傳播，肺炎型也能經飛沫人傳人。[s1][s2] 發源地有爭議：有中國、中亞、西亞等說法；吉爾吉斯楚河谷地 1338–1339 年的墓碑提到「瘟疫」，常被當作中亞起源的證據。[s1][s2] 2011 年的基因研究指向中國，但 14 世紀中國爆發鼠疫的史料證據薄弱。[s2] 歐洲在疫情前已有 1316、1317 年的饑荒、英法百年戰爭與「小冰期」氣候變冷。[s2]

## C2 經過

- 1340 年代中期，金帳汗國軍隊圍攻黑海港口卡法；據說把病死的屍體拋進城內，但也可能是老鼠傳入。[s1][s2]
- 1347 年 10 月，熱那亞船隻把疫病帶到西西里。[s1][s2]
- 1348 年擴散到義大利本土、法國，6 月前後到達英格蘭。[s1][s2]
- 1349 年起傳到挪威、德意志，1350–1352 年到斯堪地那維亞、波羅的海與俄羅斯。[s1][s2]
- 同時期也重創中東與北非：亞歷山大港 1347 年、開羅 1348 年受災。[s1]
- 起訖年份各來源不同：維基百科作 1346–1353 年，World History Encyclopedia 作 1347–1352 年；本卡取歐洲最嚴重的 1347–1351 年。[s1][s2]

## C3 關鍵人物與群體

- 熱那亞商人與船員：無意間沿著貿易航線把疫病帶進地中海。[s1][s2]
- 鞭笞者（Flagellants）：在街上鞭打自己、呼籲悔罪的宗教團體。[s2]
- 猶太社群：被誣指在井裡下毒而遭屠殺，例如 1349 年 2 月斯特拉斯堡估計約 2,000 名猶太人被殺。[s1][s2]

## C4 制度或機制變化

- **工資管制**：英格蘭 1349 年頒布《勞工條例》、1351 年頒布《勞工法》，把工資上限定在疫情前（1346 年）的水準，並強迫 60 歲以下有工作能力的人工作（Avalon 收錄的法令英譯作「below the age of sixty years」；英文維基百科條目寫 68 歲，本卡依法令文本）。[s3][s6] 但執行不力，擋不住工資上漲。[s3]
- **隔離檢疫**：拉古薩（今杜布羅夫尼克）1377 年規定外來者隔離 30 天，後來延長為 40 天，「quarantine」一詞與此有關。[s1]

## C5 受益者與受損者

受益：倖存的勞工能要求更高工資，有些農民趁地多人少擴大田產。[s2] 英格蘭農業工資在 1350–1450 年間大約翻倍。[s3] 受損：死去的大量人口；被屠殺的猶太人；[s1][s2] 依賴廉價勞力的地主。[s2][s3]

## C6 直接結果

死亡人數各方估計不同，一律為估計：

- 歐洲死亡：維基百科估計 2,500 萬–5,000 萬人、約佔歐洲人口 30%–60%；[s1] World History Encyclopedia 估計 2,500 萬–3,000 萬人，平均死亡率約 30%，最嚴重城市可能接近 50%。[s2]
- 歐亞合計：有估計高達 7,500 萬–2 億人，但維基百科註明此數字來源不夠可靠。[s1]
- 佛羅倫斯約 8.5 萬人中估計死亡 5 萬；[s2] 開羅約 60 萬人中估計超過三分之一死亡。[s1]

## C7 長期影響

- 人口：歐洲人口要到 16 世紀（約 1550 年）才回到 14 世紀的水準。[s1][s2]
- 社會：勞動力變得稀少、流動，農奴制度被削弱；之後出現 1358 年巴黎、1378 年佛羅倫斯、1381 年英格蘭農民起義等動亂。[s2] 《勞工法》是 1381 年起義的原因之一。[s3]
- 思想：教會與政府的權威受到質疑；也有史家把它和文藝復興連結，但只能解釋一部分。[s1][s2]
- 鼠疫此後在歐洲反覆出現，直到 17 世紀，例如 1665 年倫敦大瘟疫。[s1]

## C8 雙軌解讀

### 李彔

李彔沒有專論黑死病，但他說蒙古大軍橫掃歐亞，「也把瘟疫帶到了世界的每一個角落」；並認為游牧政權加上瘟疫，讓宋朝的「衝頂」失敗。[s5] 也就是說，他把瘟疫看成打斷農業文明發展的外部衝擊。[s5]

### 哈拉瑞

依 LitCharts 的《人類大命運》開篇摘要，哈拉瑞把黑死病當成過去瘟疫的代表例子：14 世紀從亞洲出現，在歐亞造成數千萬人死亡；擁擠的城市與貿易路線讓病原容易擴散。[s4] 他的論點是：疫苗、抗生素與衛生改善讓大瘟疫不再像從前那樣無法控制。[s4]

## C9 今日對照鉤子

「貿易網越密，疾病傳得越快」：黑死病沿著黑海—地中海的商船航線擴散。[s1][s2] 「人口驟減 → 勞工變貴 → 政府想壓工資卻壓不住」也是可以思考的結構。[s3]

## C10 不可類比的差異

14 世紀的人不知道病原是細菌，也沒有抗生素與疫苗，死亡率遠高於現代傳染病。[s1][s4] 當時的「國家」管理能力很弱，管制工資的法律多半執行不了。[s3] 死亡人數本身就是估計，來源相差可達一倍以上，不宜拿精確數字和現代疫情比較。[s1][s2]
