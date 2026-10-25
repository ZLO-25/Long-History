---
id: commodity-egypt-grain
type: commodity
name: 埃及穀物輸羅馬
aliases: [埃及小麥, 羅馬糧食供應, 糧食配給, 埃及谷物输罗马, Egyptian grain, Cura Annonae, annona, 亞歷山卓運糧船隊]
civilization: [古羅馬, 羅馬埃及]
track: west
time:
  start: -30
  end: 400
  precision: approx
  src: [s1, s3]
summary_line: 物資｜商路｜亞歷山卓到羅馬｜埃及穀物輸羅馬
place:
  primary_field: 商路
  secondary_fields: [港口／海峽, 資源產地]
  locations:
    - { name_ancient: 亞歷山卓, name_modern: 亞歷山大港（埃及）, lat: 31.20143, lng: 29.90977, pleiades_id: "727070", precision: exact, role: 埃及穀物出口港 }
    - { name_ancient: 普泰奧利, name_modern: 波佐利（義大利）, lat: 40.82583, lng: 14.12174, pleiades_id: "432815", precision: exact, role: 亞歷山卓運糧船隊抵達港 }
    - { name_ancient: 波爾圖斯, name_modern: 菲烏米奇諾附近（義大利）, lat: 41.77704, lng: 12.25632, pleiades_id: "423012", precision: exact, role: 克勞狄建、圖拉真擴建的羅馬大港 }
    - { name_ancient: 奧斯提亞, name_modern: 奧斯蒂亞安蒂卡（義大利）, lat: 41.75357, lng: 12.28935, pleiades_id: "422995", precision: exact, role: 台伯河口港，有糧食管理機構與糧倉 }
    - { name_ancient: 羅馬, name_modern: 羅馬（義大利）, lat: 41.88997, lng: 12.49125, pleiades_id: "423025", precision: exact, role: 糧食配給對象城市 }
  scale: line
routes: [sea-alexandria-rome]
structure_tags: [糧食進口依賴, 單一港口依賴, 合法性危機, 公共工程支出, 基礎建設網絡]
links: [war-actium, event-augustan-principate, event-fall-western-rome, commodity-amphora-trade]
counterparts:
  - { id: commodity-salt-iron, note: "相似：國家掌握一種戰略物資的供應，並因此產生依賴與政治爭議。不同：埃及穀物主要是實物稅、運去餵養首都；漢朝鹽鐵官營是國家自己生產並賣給百姓以增加財政收入。", src: [s1, s6] }
sources:
  - { id: s1, title: "Cura Annonae — Wikipedia", url: "https://en.wikipedia.org/wiki/Cura_Annonae", accessed: 2026-10-24, tier: 百科 }
  - { id: s2, title: "Puteoli: Alexandrian ships — Ostia Antica（ostia-antica.org）", url: "https://ostia-antica.org/dict/topics/puteoli/presentation/puteoli-ships.htm", accessed: 2026-10-24, tier: 通論 }
  - { id: s3, title: "Battle of Actium — Wikipedia", url: "https://en.wikipedia.org/wiki/Battle_of_Actium", accessed: 2026-10-24, tier: 百科 }
  - { id: s4, title: "10 Facts About the Fall of the Roman Empire — History Hit", url: "https://historyhit.com/facts-about-the-fall-of-the-roman-empire", accessed: 2026-10-24, tier: 通論 }
  - { id: s5, title: "李彔：現代化十六講（之五、六）— 虎嗅網", url: "https://www.huxiu.com/article/38101.html", accessed: 2026-10-24, tier: 摘要 }
  - { id: s6, title: "Donald B. Wagner, Technology as seen through the case of ferrous metallurgy in Han China", url: "https://donwagner.dk/EncIt/EncIt.html", accessed: 2026-10-25, tier: 學術 }
  - { id: s7, title: "Suetonius, The Life of Augustus — Loeb Classical Library（1913）英譯，LacusCurtius（penelope.uchicago.edu）", url: "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Suetonius/12Caesars/Augustus*.html", accessed: 2026-10-25, tier: 一手 }
  - { id: s8, title: "Peter Garnsey & Dominic Rathbone, The Background to the Grain Law of Gaius Gracchus, The Journal of Roman Studies 75 (1985), pp. 20–25", url: "https://faculty.uml.edu/ethan_Spanier/Teaching/documents/rathboneGGracchus.pdf", accessed: 2026-10-25, tier: 學術 }
  - { id: s9, title: "Paul Erdkamp, The Grain Market in the Roman Empire: A Social, Political and Economic Study — Cambridge University Press, 2005（書籍介紹頁）", url: "https://www.cambridge.org/core/books/grain-market-in-the-roman-empire/FE14AFD3544C58A1B35DB6AFE913CA2B", accessed: 2026-10-25, tier: 學術 }
importance: 2
learn:
  histories: [希臘羅馬史, 錢的歷史]
  why_care: 羅馬城幾十萬人吃的麵包，很多要從海的另一邊運來；糧食一斷，皇帝的位子和城市的人口都跟著搖晃。
  story: |
    羅馬城人口很多，本地種的小麥不夠吃，共和時期靠西西里，帝國時期越來越靠北非和埃及。[s1] 前 30 年，屋大維打敗安東尼與克麗奧佩脫拉，把埃及變成羅馬行省。[s3] 之後亞歷山卓的運糧船隊載著小麥航向義大利；船隊抵達前，會先有快速郵船報信，港口的人一看到它特有的頂帆，就知道糧船要來了。[s2] 國家把糧食便宜賣、甚至免費發給登記的公民，奧古斯都時定為約 20 萬人。[s1] 奧古斯都曾寫道，他很想永遠廢除配給，但怕以後有政客為了討好人民又恢復，所以沒有這麼做。[s7] 約 439 年，汪達爾人奪下北非，西羅馬失去大部分糧源；羅馬城人口從 400 年的 70–80 萬人，降到 452 年的 40–50 萬人（估計）。[s1][s4]
  key_terms:
    - term: 糧食配給
      plain: 羅馬政府把便宜或免費的糧食發給首都有登記的公民，是國家長期的大筆支出。
      example: 像學校營養午餐，只要供應的廠商一出問題，全校都吃不到飯。
    - term: 行省
      plain: 羅馬在義大利以外征服的地區，由羅馬派官員治理、要向羅馬繳稅或繳糧。
      example: 像總公司在外地的分店，賺的錢要交回總部。
    - term: 單一來源依賴
      plain: 重要的東西大部分只從一兩個地方來，那裡一出事，整個系統就跟著出事。
      example: 全班的飲料都跟同一家店訂，那家店一休息，大家就都沒得喝。
    - term: 糧食長官
      plain: 奧古斯都時正式設立、專門負責羅馬城糧食供應的官員。
      example: 像學校負責訂營養午餐、管倉庫的總務主任。
  primary_source:
    - text: "I was strongly inclined to do away forever with distributions of grain（我非常想永遠廢除糧食配給）"
      from: 蘇埃托尼烏斯《羅馬十二帝王傳．奧古斯都傳》42.3（引奧古斯都自述），Loeb 古典叢書 1913 年英譯，LacusCurtius 網站；中文為本站摘譯
      src: s7
  historiography: |
    **羅馬城的糧食靠國家，還是靠市場？** 一種看法強調國家：配給從臨時救急變成常設制度，奧古斯都設糧食長官，糧食成了維持首都秩序、爭取民心的政治工具。[s1][s7] 研究共和晚期的 Garnsey 與 Rathbone 則認為，私人商人在供應羅馬消費者時「扮演關鍵角色」；格拉古的糧食法主要是讓供應更穩定規律，領糧的人仍要付錢，離免費發糧還很遠。[s8] Erdkamp 則強調，在羅馬社會裡能不能拿到糧食，要看和皇帝及其代表的關係。[s9]
    **埃及到底供應多少？** 古代作家約瑟夫斯說北非供應羅馬八個月、埃及四個月的糧食，但史家認為可能誇大；埃及確切占多少，來源不足。[s1]
    **糧食和西羅馬衰亡有關嗎？** 維基百科整理的研究認為，5 世紀這項國家職能停止，是西部經濟分裂成一塊塊地方經濟的主要因素之一；同一時期羅馬城人口也大幅減少。但西部的配給何時正式結束，並沒有證據。[s1]
  misconceptions:
    - 羅馬不是發免費糧食給全城每個人：配給只發給有資格登記的公民，奧古斯都時約 20 萬人。[s1]
    - 羅馬的糧食不是全靠埃及：共和時期主要靠西西里與薩丁尼亞，帝國時期北非同樣重要。[s1]
  perspectives:
    - { history: 希臘羅馬史, text: 從羅馬看，掌握埃及和北非的糧食，就等於掌握首都的穩定。 }
    - { history: 錢的歷史, text: 從錢的歷史看，糧食配給是羅馬國家長期的大筆支出，也是用物資換取政治支持的例子。 }
crosscheck: { date: 2026-10-25, by: 獨立查核 agent（未參與寫作）, result: 通過, notes: "首查：頂帆屬郵船非糧船、配給停止連到經濟分裂而非人口；已修正並複查通過" }
verification: 交叉確認
lens_status: 依公開資料推論，未對照原書
---

## B1 物資與用途

小麥是羅馬城的主食。羅馬的穀物配給從臨時救急演變成常設制度，在共和晚期已占國家預算的相當比例。[s1] 前 123 年蓋烏斯．格拉古讓合格公民每月以低於市價購糧；前 58 年克洛狄烏斯改為免費發放給約 32 萬人。[s1]

## B2 產地與控制權

共和時期主要來自西西里與薩丁尼亞；帝國時期北非與埃及成為最重要的來源。[s1] 埃及在前 30 年安東尼與克麗奧佩脫拉死後成為羅馬行省。[s3] 約瑟夫斯說北非供應羅馬八個月、埃及四個月的糧食，但史家認為可能誇大。[s1]

## B3 生產技術與勞動

來源不足。本期使用的來源沒有詳述埃及穀物的耕作與勞動方式（尼羅河氾濫農業的細節待第 3 期補充）。

## B4 運輸路線與咽喉

政府雇用私人船隻運糧，克勞狄給承包運糧的船主特權。[s1] 塞內卡描述亞歷山卓運糧船隊抵達普泰奧利的情景：先行的快速郵船帶來船隊將至的消息，人們從郵船特有的頂帆就能認出它們。[s2] 克勞狄興建、圖拉真擴建波爾圖斯港，奧斯提亞與波爾圖斯設有糧食管理處與糧倉。[s1]

## B5 規模與數量

估計：配給人數凱撒時減為 15 萬，奧古斯都定為 20 萬，之後大致穩定到西羅馬晚期。[s1] Rickman 估計羅馬每年總需求約 4,000 萬莫迪烏斯（modii）；埃及確切占多少，來源不足。[s1]

## B6 經濟與財政角色

奧古斯都時期正式設立「糧食長官」（praefectus annonae）負責供應。[s1] 這是一項長期的國家支出，也是維持首都秩序的政治工具；蘇埃托尼烏斯記載亞歷山卓船上的乘客把奧古斯都稱頌為「讓他們能活、能航行、能自由的人」。[s1][s2]

## B7 權力與政治連結

控制埃及就等於掌握羅馬城的部分糧食命脈，這是亞克興戰後屋大維取得的關鍵資產之一。[s1][s3] 約 439 年汪達爾人奪取北非後，西羅馬失去大部分糧食來源與稅收，加速崩潰。[s1][s4]

## B8 雙軌解讀

### 李彔

李彔在公開講稿中認為，貿易分工能讓不同地區優化資源配置，羅馬憑藉地中海這片內海形成貿易帝國 [s5]。埃及穀物經海路供應羅馬，正是這種內海分工的例子（此連結為本卡推論）。

### 哈拉瑞

無直接論述：目前查到的公開摘要與書評，沒有哈拉瑞專門談羅馬糧食供應的內容。

## B9 今日對照鉤子

「大都市的主食依賴海外特定產地與少數港口」，以及「糧食補貼成為政權合法性的一部分」的結構。[s1][s4]

## B10 不可類比的差異

古代航運受季節與風向限制，沒有今日的冷鏈、期貨市場與多元供應；配給只發給有資格的公民，不是全民福利。[s1][s2]
