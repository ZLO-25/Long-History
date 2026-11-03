---
id: event-ming-qing-transition
type: event
name: 明清易代（1644年）
aliases: [明朝滅亡, 清軍入關, 李自成入北京, 崇禎自縊, 甲申之變, 山海關之戰, 南明, 明清易代, Fall of the Ming, Li Zicheng, Wu Sangui, 明亡, 明朝晚期財政困難, Transition from Ming to Qing, Chongzhen Emperor]
civilization: [中國（明）, 中國（清）]
track: china
time:
  start: 1644
  end: 1644
  precision: exact
  src: [s1, s2]
summary_line: 大事｜宮廷／政治中心｜北京、山海關｜明清易代（1644年）
place:
  primary_field: 宮廷／政治中心
  secondary_fields: [戰場]
  locations:
    - { name_ancient: 北京（煤山）, name_modern: 北京景山公園（中國）, lat: 39.9254, lng: 116.3966, precision: exact, role: 1644 年 4 月 24 日李自成攻入北京，隔日崇禎帝在煤山自縊, src: [s1, s2] }
    - { name_ancient: 山海關, name_modern: 秦皇島山海關（中國河北）, lat: 40.0096, lng: 119.7539, precision: exact, role: 1644 年 5 月吳三桂與多爾袞擊敗李自成, src: [s1] }
  scale: area
structure_tags: [財政枯竭, 合法性危機, 革命與政權更替, 外部勢力介入]
topics: [帝國的衰亡, 白銀, 民變與抗爭, 游牧民族與邊疆]
links: [event-single-whip-reform, war-imjin, commodity-silver-flow, event-koxinga-taiwan, finance-tanding-rumu, event-dutch-formosa]
causes:
  - { id: event-single-whip-reform, rel: 促成, why: 有學者認為稅改用銀繳後，財政綁上外國白銀，1630 年代白銀進口減少、銀價上漲，加重民困；也有學者反對這個說法。, src: [event-single-whip-reform:s1, s3], disputed: true }
  - { id: war-imjin, rel: 促成, why: 明朝援朝出兵並送出大量白銀與物資（估計約一千七百萬兩），有人認為這加重了明朝晚期的財政負擔。, src: [war-imjin:s1, war-imjin:s2], disputed: true }
effects:
  - { id: event-koxinga-taiwan, rel: 背景, why: 清軍入關後，鄭成功擁明抗清，以廈門、金門為基地、靠海上貿易養軍，才有後來能渡海攻臺的大軍。, src: [event-koxinga-taiwan:s2] }
counterparts: 無適當對照：西方軌目前沒有「內部民變與外部邊疆政權同時推翻舊王朝」的同類卡片。
sources:
  - { id: s1, title: "Transition from Ming to Qing — Wikipedia", url: "https://en.wikipedia.org/wiki/Transition_from_Ming_to_Qing", accessed: 2026-11-02, tier: 百科 }
  - { id: s2, title: "Chongzhen Emperor — Wikipedia", url: "https://en.wikipedia.org/wiki/Chongzhen_Emperor", accessed: 2026-11-02, tier: 百科 }
  - { id: s3, title: "Richard von Glahn, Myth and Reality of China's Seventeenth-Century Monetary Crisis（The Journal of Economic History, 1996）— Cambridge Core 摘要頁", url: "https://core-cms.cambridgecore.org/core/journals/journal-of-economic-history/article/myth-and-reality-of-chinas-seventeenthcentury-monetary-crisis/051515B7767AB41D91ED213342A6E348", accessed: 2026-11-02, tier: 學術 }
importance: 3
learn:
  histories: [中國史]
  why_care: 統治中國將近三百年的明朝，在同一年先被農民軍攻破首都，又被關外的清軍取代，原因卻從天災、財政到人心都有。
  story: |
    17 世紀初，明朝同時面對好幾個麻煩：財政吃緊、各地民變、旱災饑荒，東北的努爾哈赤又在 1616 年建立後金，兩年後公開與明朝為敵。[s1] 崇禎帝在位 17 年，猜疑臣下，換了 50 位內閣大學士、14 次兵部尚書，還處死多名將領。[s2] 1644 年 4 月 24 日，李自成的農民軍攻進北京；隔天，崇禎帝在皇宮後面的煤山上吊自盡。[s1][s2] 駐守山海關的明將吳三桂與清朝攝政王多爾袞聯手，5 月下旬打敗李自成；6 月 6 日清軍進入北京。[s1] 之後南方的明朝宗室繼續抵抗，清朝要到 1683 年攻下臺灣的明鄭政權，才算平定各地的反抗。[s1]
  key_terms:
    - { term: 甲申之變, plain: 1644 年（甲申年）李自成攻破北京、崇禎帝自殺的事件。, example: 中國用天干地支紀年，1644 年剛好是甲申年。 }
    - { term: 南明, plain: 北京陷落後，明朝宗室在南方陸續建立的抗清政權。, example: 像總部被占領後，分公司各自宣布自己才是正統。 }
  primary_source:
    - { text: "I die unable to face my ancestors in the underworld, dejected and ashamed.（我死了也無顏面對地下的祖先，沮喪又羞愧。）", from: 崇禎帝遺言（據《明季北略》；英譯見 Wakeman 1986，轉引自 Wikipedia〈Chongzhen Emperor〉，中文為本站回譯，非原文）, src: s2 }
  historiography: |
    **白銀斷流害死了明朝嗎？** 傳統說法認為，明朝太依賴外國白銀，1640 年代白銀進口驟減，造成財政與經濟危機，是明亡的原因之一。[s3] 歷史學者萬志英（Richard von Glahn）反對這個看法，認為它在理論與證據上都站不住腳：中國對白銀的需求取決於國內長期的貨幣需求，而不是短期進口量的起伏。[s3]
    **還有哪些原因？** 維基百科整理的研究提到財政困難、農民起事、與小冰期有關的旱災饑荒，以及學者 Kenneth Swope 強調的明朝皇室與軍方關係惡化；遼東將領等人的倒戈，也在清朝征服中扮演重要角色。[s1]
  misconceptions:
    - 推翻明朝首都的不是清軍，而是李自成的農民軍；清軍是在山海關之戰後才進入北京。[s1]
    - 崇禎帝是否留下遺書並不確定：有記載說他留了遺言，但發現遺體的僕人說只寫了「天子」二字。[s2]
crosscheck:
  date: 2026-11-02
  by: 獨立查核 agent（未參與寫作）
  result: 通過
  notes: "核對英文維基 Transition from Ming to Qing／Chongzhen Emperor：日期、崇禎任免數字、遺言與「天子」二字之說均相符。遺言改註明出自《明季北略》、Wakeman 英譯再轉引（中文為回譯）；刪去來源未載的遷界令年份；後果→鄭成功的 src 移除未提廈門的 s1。萬志英論文為 JEH 56(2), 1996；白銀危機論仍有爭議（已 disputed）。"
verification: 交叉確認
lens_status: 無直接論述
summary_card: true
---

## C1 背景

明朝晚期財政吃緊、農民起事頻繁，又有與小冰期相關的旱災與饑荒；1616 年努爾哈赤建立後金，1618 年發布「七大恨」與明朝為敵。[s1] 崇禎帝猜疑臣下，頻繁撤換內閣與兵部尚書、處死將領。[s2]

## C2 經過

1644 年 4 月 24 日李自成攻入北京，4 月 25 日崇禎帝在煤山自縊；5 月下旬吳三桂與多爾袞在山海關擊敗李自成；6 月 6 日清軍與吳三桂軍進入北京。[s1][s2]

## C6 直接結果

清朝取代明朝成為統治北京的王朝；南明政權與各地抗清勢力繼續抵抗，清朝經過遷界令（強迫沿海居民內遷，斷絕鄭成功的資源）、三藩之亂（1673 起），到 1683 年在澎湖擊敗明鄭，才結束有組織的反抗。[s1] 整個改朝換代過程估計造成約 2,500 萬人死亡。[s1]
