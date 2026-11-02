---
id: event-new-deal
type: event
name: 羅斯福新政（1933–1939年）
aliases: [新政, 羅斯福新政, 罗斯福新政, New Deal, 第一次新政, 第二次新政, 緊急銀行法, 聯邦存款保險公司, FDIC, 證券交易委員會, SEC, 公共事業振興署, WPA, 民間資源保護隊, CCC, 社會安全法, Social Security Act, 田納西河谷管理局, TVA, 美國農村電氣化管理局, REA, Rural Electrification Administration, 爐邊談話]
civilization: [美國（世界強權）]
track: west
time:
  start: 1933
  end: 1939
  precision: approx
  src: [s1, s3]
summary_line: 大事｜宮廷／政治中心｜華盛頓特區｜羅斯福新政（1933–1939年）
place:
  primary_field: 宮廷／政治中心
  secondary_fields: [金融中心, 資源產地]
  locations:
    - { name_ancient: 華盛頓特區（白宮與國會）, name_modern: 華盛頓特區（美國）, lat: 38.8977, lng: -77.0365, precision: exact, role: 羅斯福政府與國會在此推出新政法案, src: [s1, s3] }
    - { name_ancient: 田納西河谷, name_modern: 田納西州諾克斯維爾一帶（美國）, lat: 35.9606, lng: -83.9207, precision: schematic, role: 田納西河谷管理局興建水壩、供電的地區（座標示意）, src: [s1] }
  scale: area
structure_tags: [公共工程支出, 金融制度創新, 銀行擠兌, 能源轉換]
topics: [銀行與借貸, 中央銀行, 能源, 民主與參政]
links: [finance-great-depression, tech-electric-grid, finance-federal-reserve, finance-eurodollar-big-bang, event-american-century]
causes:
  - { id: finance-great-depression, rel: 回應, why: 1933 年羅斯福就任時失業率約 25%、銀行大批倒閉，新政用銀行法、存款保險和公共工程來止血。, src: [s1, s3] }
  - { id: tech-electric-grid, rel: 背景, why: 電網普及到城市後，1934 年美國仍有近九成農場沒電，政府在 1935 年成立農村電氣化管理局，貸款給合作社替鄉村拉電。, src: [s2] }
effects:
  - { id: finance-eurodollar-big-bang, rel: 背景, why: 1933 年銀行法讓聯準會訂存款利率上限（Q 條例）；1960 年代末市場利率超過上限，美國銀行改到歐洲分行吸收美元，助長歐洲美元市場。, src: [s5, s4, finance-eurodollar-big-bang:s2] }
counterparts: "無適當對照：中國與東亞軌現有卡片中，沒有「民主政府在經濟大蕭條中以存款保險、證券監管、社會保險與大型公共工程同時救急」的事件；十大建設雖是政府主導的公共工程，但背景是石油危機與威權體制下的產業升級，不硬湊。"
sources:
  - { id: s1, title: "New Deal — Wikipedia", url: "https://en.wikipedia.org/wiki/New_Deal", accessed: 2026-11-02, tier: 百科 }
  - { id: s2, title: "Rural Utilities Service（前身 Rural Electrification Administration）— Wikipedia", url: "https://en.wikipedia.org/wiki/Rural_Electrification_Administration", accessed: 2026-11-02, tier: 百科 }
  - { id: s4, title: "John R. Karlik, Some Questions and Brief Answers About the Eurodollar Market — U.S. Congress Joint Economic Committee staff study, 1977", url: "https://www.jec.senate.gov/reports/95th%20Congress/Some%20Questions%20and%20Brief%20Answers%20About%20the%20Eurodollar%20Market%20(812).pdf", accessed: 2026-11-02, tier: 通論 }
  - { id: s5, title: "Interest Rate Controls (Regulation Q) — Federal Reserve History", url: "https://www.federalreservehistory.org/essays/regulation-q", accessed: 2026-11-02, tier: 通論 }
  - { id: s3, title: "Franklin D. Roosevelt, First Inaugural Address, March 4, 1933 — The Avalon Project, Yale Law School", url: "https://avalon.law.yale.edu/20th_century/froos1.asp", accessed: 2026-11-02, tier: 一手 }
importance: 3
summary_card: true
learn:
  histories: [美國史, 美洲史, 錢的歷史]
  why_care: 銀行存款有保險、股市有證券主管機關、老了領退休金——這些今天理所當然的制度，很多是 1930 年代美國為了走出大蕭條才發明的。
  story: |
    1933 年 3 月羅斯福就任美國總統時，大約四分之一的勞工失業，銀行一間間倒閉。[s1] 他在就職演說說：「我們唯一需要恐懼的，就是恐懼本身」，又說「最首要的任務是讓人民有工作」。[s3] 上任後他先關閉銀行、通過緊急銀行法，三天內約四分之三的聯準會會員銀行重新開門；接著成立聯邦存款保險公司（FDIC）保障存款，1934 年再設證券交易委員會（SEC）管股市。[s1] 政府也直接僱人：民間資源保護隊招募約三百萬年輕人，公共事業振興署（WPA）先後僱用超過 850 萬人修路、蓋公共建築。[s1] 1935 年的社會安全法建立退休金與失業保險；同年成立的農村電氣化管理局，讓原本只有約一成農場有電的美國鄉村，到 1942 年接近一半通電。[s1][s2] 不過失業率要到美國 1941 年參加二戰後才真正降下來。[s1]
  key_terms:
    - { term: 存款保險, plain: 銀行萬一倒閉，由政府設立的保險機構賠給存款人一定額度內的存款，讓大家不必急著擠兌。, example: 像腳踏車有保險，就算被偷，也能拿回一部分錢，你就不會每天緊張地守著它。 }
    - { term: 以工代賑, plain: 政府不直接發救濟金，而是出錢請失業的人去修路、蓋學校、種樹，讓他們有薪水可領。, example: 像學校請家境困難的同學在圖書館打工，而不是直接發錢。 }
    - { term: 社會安全制度, plain: 由政府辦的退休金、失業保險與救助，讓人老了、失業時還有基本收入。, example: 像臺灣的勞保老年給付和就業保險。 }
  primary_source:
    - { text: "Our greatest primary task is to put people to work.（我們最首要的任務，是讓人民有工作。）", from: 羅斯福第一次就職演說，1933 年 3 月 4 日（中文為本站摘譯）, src: s3 }
  historiography: |
    **新政救了經濟嗎？** 凱因斯學派認為新政方向對、但花得太少：1933–1939 年的財政赤字平均只占約 3.7%，不足以彌補民間支出的萎縮，所以要等二戰的大規模軍費才真正恢復就業；也有經濟學者（如 Christina Romer）認為，放棄金本位帶來的貨幣擴張才是復甦的主力。[s1]
    **新政是太多還是太少？** 保守派批評它讓聯邦債務與官僚大幅膨脹、干涉自由企業，甚至有經濟學者認為它拉長了大蕭條；新左派則批評它在可以把銀行、鐵路收歸國有的時候「救了資本主義」；進步派史家則認為它恢復了希望、壯大了工會，在民主到處崩潰的年代保住了美國的民主。[s1]
  misconceptions:
    - 新政不是一推出就讓經濟全面恢復：1935 年失業率仍超過 20%，1937–38 年還出現新的衰退，失業率從 14.3% 升到 19.0%。[s1]
    - 新政不只有「蓋水壩、修馬路」：存款保險、證券監管、社會安全與勞工集體談判權等制度性改革，影響可能比公共工程更長久。[s1]
crosscheck:
  date: 2026-11-02
  by: 獨立查核 agent（未參與寫作）
  result: 通過
  notes: "開啟 s1、s2 核對各項數字（25% 失業、三天內四分之三銀行重開、CCC 三百萬、WPA 850 萬餘、REA 1935/5/11、1934 年不到 11% 農場有電、1942 年近半、1937–38 衰退、赤字 3.7%、Romer）。修正：工業生產回升 57% 是 1933 年 3–7 月；REA 來源沒說「私人電力公司不願投資／電網只接城市」，相關句改寫；Q 條例→歐洲美元的後果原只引他卡，查 Regulation Q 維基並未談境外，故新增 s4（國會聯合經濟委員會 1977 研究）與 s5（Federal Reserve History）支持。s3 就職演說因抓取額度未重開，引文為通行文本。"
verification: 交叉確認
lens_status: 無直接論述
---

## C1 背景

1929 年股災後美國陷入大蕭條，1933 年羅斯福就任時約四分之一勞工失業，銀行擠兌與倒閉蔓延。[s1] 羅斯福在就職演說中說，必要時他會要求國會給他像面對戰爭入侵一樣廣泛的行政權力，來對付這場緊急狀況。[s3]

## C2 經過

- **1933 年（「百日新政」）**：緊急銀行法、1933 年銀行法（格拉斯－斯蒂格爾法）與聯邦存款保險公司；農業調整法以減產提高農產品價格；民間資源保護隊、田納西河谷管理局成立。[s1]
- **1934 年**：成立證券交易委員會管理股市。[s1]
- **1935 年（第二次新政）**：公共事業振興署、社會安全法、保障工會集體談判的華格納法；5 月成立農村電氣化管理局。同年最高法院判決全國復興法違憲。[s1][s2]
- **1936–1938 年**：最高法院判農業調整法違憲；1937–38 年經濟再度衰退；1938 年公平勞動標準法訂下最低工資與工時上限。[s1]

## C4 制度或機制變化

聯邦政府從「旁觀市場」變成直接管理金融、就業與社會福利：銀行存款由政府保險、股市由證券交易委員會監管、勞工有集體談判權、老年人與失業者有社會保險。[s1] 政府也透過貸款給農村電力合作社，把電力送到原本缺電的鄉村。[s2]

## C6 直接結果

銀行恐慌止住，工業生產在 1933 年 3 月到 7 月間回升約 57%，農民平均收入到 1937 年將近加倍。[s1] 但失業率在 1935 年仍超過 20%，1937–38 年又出現衰退；多數史家同意，美國要到 1941 年參加二戰後才達到充分就業。[s1] 鄉村用電普及大幅提高，1942 年接近一半的農場有電。[s2]

## C7 長期影響

存款保險、證券監管與社會安全制度一直沿用到今天，成為戰後美國「混合經濟」的基礎。[s1] 新政也開啟了「聯邦政府該管多少經濟」的長期爭論，保守派與自由派至今仍各執一詞。[s1]
