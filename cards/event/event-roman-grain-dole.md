---
id: event-roman-grain-dole
type: event
name: 羅馬的糧食配給（前123年起）
aliases: [麵包與馬戲, 羅馬糧食配給, bread and circuses, 格拉古糧食法, 糧食法, Cura Annonae, annona, grain dole, 糧食長官, 羅馬城糧食配給制度, 羅馬國家的糧油配給, Lex Sempronia frumentaria, frumentatio, praefectus annonae]
civilization: [古羅馬]
track: west
time:
  start: -123
  end: 275
  precision: approx
  src: [s1, s3]
summary_line: 大事｜城市／都會｜羅馬（義大利）｜羅馬的糧食配給（前123年起）
summary_card: true
place:
  primary_field: 城市／都會
  secondary_fields: [港口／海峽, 宮廷／政治中心]
  locations:
    - { name_ancient: 羅馬, name_modern: 羅馬（義大利）, lat: 41.8925, lng: 12.4853, precision: schematic, role: 領取配給的首都公民所在地（座標為羅馬廣場）, src: [s1] }
  scale: point
structure_tags: [糧食進口依賴, 慢變結構, 單一港口依賴]
topics: [糧食與農業, 首都與都城]
links: [commodity-egypt-grain, commodity-amphora-trade, event-augustan-principate, war-third-punic, event-conflict-of-orders]
causes:
  - { id: war-third-punic, rel: 背景, why: 羅馬征服西西里、北非等地後，海外行省的糧食能大量運到首都，國家才有條件長期低價或免費供糧。, src: [s1, "war-third-punic:s1"] }
effects:
  - { id: commodity-egypt-grain, rel: 背景, why: 格拉古讓公民低價買糧、後來改為免費發放，國家必須長期取得大量小麥，海外糧倉越來越重要。, src: [s1, s3] }
  - { id: commodity-amphora-trade, rel: 促成, why: 國家要供應首都居民和軍隊的橄欖油，透過配給體系大量採購，貝提卡的油一船船裝在雙耳瓶裡運到羅馬；塞維魯更把油列入首都配給。, src: [s1, "commodity-amphora-trade:s2"] }
counterparts: 無適當對照：中國軌目前沒有「國家定期向首都居民低價或免費發糧」的對應卡；漢代鹽鐵官營是國家專賣，不是發放，結構不同。
sources:
  - { id: s1, title: "Cura Annonae — Wikipedia", url: "https://en.wikipedia.org/wiki/Cura_Annonae", accessed: 2026-11-02, tier: 百科 }
  - { id: s2, title: "Suetonius, Life of Augustus 40, 42（Loeb 英譯，LacusCurtius, University of Chicago）", url: "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Suetonius/12Caesars/Augustus*.html", accessed: 2026-11-02, tier: 一手 }
  - { id: s3, title: "Gaius Gracchus — Wikipedia", url: "https://en.wikipedia.org/wiki/Gaius_Gracchus", accessed: 2026-11-02, tier: 百科 }
  - { id: s4, title: "Plutarch, Life of Caius Gracchus 5（Loeb 英譯，LacusCurtius, University of Chicago）", url: "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Plutarch/Lives/Caius_Gracchus*.html", accessed: 2026-11-02, tier: 一手 }
importance: 2
learn:
  histories: [希臘羅馬史]
  why_care: 「麵包與馬戲」這句話從哪來？一座百萬人口的城市，政府每個月發糧給幾十萬人，這是福利、是收買，還是維持治安的必要？
  story: |
    前 123 年，保民官蓋烏斯·格拉古推動一條糧食法：國家在穀價低時買進糧食存進公共糧倉，再以固定低價每個月賣給羅馬公民。[s3][s1] 普魯塔克說，這條法律「為窮人壓低了糧價」。[s4] 後來政客競相加碼：前 58 年，克洛狄烏斯讓約 32 萬名公民免費領糧；凱撒把人數砍到 15 萬，奧古斯都又定在約 20 萬人。[s1] 奧古斯都曾想把發糧改成每年三次、每次發四個月份的糧票，後來應民眾要求又恢復每月發放；糧食長官也在他任內正式成為常設職位。[s2][s1] 羅馬城在 2 世紀人口接近百萬，糧食主要來自埃及、北非和西西里。[s1] 3 世紀時，發糧改成發麵包，塞普蒂米烏斯·塞維魯加發橄欖油，奧勒良再加上酒、豬肉和鹽。[s1] 詩人尤維納利斯嘲笑羅馬人只要「麵包與馬戲」。[s1]
  key_terms:
    - { term: 配給（annona）, plain: 國家定期以低價或免費發給登記公民的糧食，後來擴大到麵包、油和肉。, example: 像學校營養午餐由政府補助，登記的學生才能領。 }
    - { term: 糧食長官（praefectus annonae）, plain: 奧古斯都時正式設立、專門負責首都糧食採購與運送的官員。, example: 像全校午餐的總負責人，要確保每天的便當都送得到。 }
  primary_source:
    - { text: "another related to the supplies of grain, and lowered the market price to the poor（另一條法律關於糧食供應，為窮人壓低了市價）", from: 普魯塔克《蓋烏斯·格拉古傳》5.2（Loeb 英譯，中文為本站摘譯）, src: s4 }
    - { text: "he determined to give out tickets for four months' supply three times a year（他決定每年發三次、每次四個月份的糧票）", from: 蘇埃托尼烏斯《奧古斯都傳》40.2（Loeb 英譯，中文為本站摘譯）, src: s2 }
  historiography: |
    **福利、收買還是治安？** 古代諷刺詩人尤維納利斯把它說成「麵包與馬戲」，意思是統治者用吃的和娛樂收買人民；許多現代著作也把配給看成收買人心、掩飾統治失敗的手段。[s1] 奧古斯都本人並不喜歡永久的發糧制度，卻親自負起供糧責任，後來的皇帝也照做，顯示它已經變成皇帝不能放手的責任。[s1][s2]
    **規模有多大？** 羅馬城人口與糧食供應量都是估計，史家對數字有不少爭論。[s1]
  misconceptions:
    - 不是每個住在羅馬的人都有：領糧的是登記在冊的成年男性公民，人數有上限（奧古斯都時約 20 萬人），不是全體居民。[s1]
crosscheck:
  date: 2026-11-02
  by: 獨立查核 agent（未參與寫作）
  result: 通過
  notes: 已打開維基 Cura Annonae、Gaius Gracchus、蘇埃托尼烏斯《奧古斯都傳》40–42、普魯塔克《蓋烏斯·格拉古傳》5 核對。補上蘇埃托尼烏斯寫的「應民眾要求恢復每月發放」；百萬人口改為「接近」；現代評價改貼近維基；資格限制一句只引 s1。time.end 275 年是本站取奧勒良擴大配給的判斷，不是制度終點；改麵包是否始於塞維魯維基寫「可能」。
verification: 交叉確認
lens_status: 無直接論述
---

## C1 背景

羅馬城人口快速增加，2 世紀時估計約有百萬人，本地生產的糧食遠遠不夠。[s1] 共和晚期，窮困公民的生計成為政治議題，格拉古兄弟以保民官身分推動土地與糧食改革。[s3]

## C2 經過

- 前 123 年：蓋烏斯·格拉古的糧食法規定每摩底（約 8.7 公升）穀物最高賣 6⅓ 阿斯，糧食在低價時收購、存入公共糧倉。[s3] 這條法律後來一度被廢，又很快被薩圖爾尼努斯恢復。[s3]
- 前 58 年：克洛狄烏斯改為免費發糧，估計約 32 萬名公民受惠；凱撒把領糧人數減到 15 萬。[s1]
- 奧古斯都時期：人數定在約 20 萬；一度把糧票改為一年發三次、每次四個月份，後應民眾要求恢復按月發放；糧食長官正式成為常設職位。[s1][s2]
- 3 世紀：改發麵包，塞普蒂米烏斯·塞維魯加發橄欖油，奧勒良再加發酒、豬肉和鹽。[s1]

## C6 直接結果

配給讓糧食供應變成國家（後來是皇帝）的責任，皇帝必須確保海外糧源不斷，埃及、北非和西西里成為最重要的糧倉；埃及在被羅馬直接統治後成為主要來源。[s1] 奧古斯都自己寫道很想永遠廢掉發糧（因為大家依賴配給、荒廢了農耕），卻擔心將來有人為了討好人民又恢復，所以沒有廢。[s2]
