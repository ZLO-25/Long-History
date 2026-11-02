---
id: event-southern-song
type: event
name: 南宋建立與宋金對峙（1127–1279年）
aliases: [南宋, 南宋建立, 宋金對峙, 南北分治, 宋高宗, 趙構, 臨安, 杭州, 行在, 紹興和議, 秦檜, 岳飛, 淮河為界, 采石之戰, 崖山之戰, 襄陽之戰, Southern Song, Treaty of Shaoxing, Lin'an]
aliases_main: [南宋, 紹興和議, Southern Song]
civilization: [中國（南宋）, 北方草原（金）]
track: china
time:
  start: 1127
  end: 1279
  precision: exact
  src: [s1, s2]
summary_line: 大事｜宮廷／政治中心｜臨安（今杭州）｜南宋建立與宋金對峙（1127–1279年）
summary_card: true
place:
  primary_field: 宮廷／政治中心
  secondary_fields: [戰場, 港口／海峽]
  locations:
    - { name_ancient: 臨安府（行在）, name_modern: 杭州（中國浙江）, lat: 30.2500, lng: 120.1700, precision: schematic, role: 南宋實際首都，1138 年起定都（座標為今杭州市中心）, src: [s2, s3] }
    - { name_ancient: 淮河, name_modern: 淮河（中國安徽一帶）, lat: 32.9400, lng: 117.3800, precision: schematic, role: 紹興和議後宋金的東段邊界（座標取淮河中游示意點）, src: [s1] }
  scale: area
structure_tags: [邊疆防線, 戰爭融資, 海權對陸權, 合法性危機]
topics: [游牧民族與邊疆, 首都與都城, 海上貿易]
links: [war-jingkang, event-chanyuan-treaty, event-economic-center-south, tech-compass]
causes:
  - { id: war-jingkang, rel: 直接引發, why: "開封陷落、徽欽二帝被擄，北宋朝廷瓦解；倖存的皇子趙構在南方即位，宋朝政權南移。", src: [s2, "war-jingkang:s2", "war-jingkang:s3"] }
  - { id: event-chanyuan-treaty, rel: 背景, why: "宋朝早已習慣「以歲幣換和平、雙方對等相稱」的模式，紹興和議沿用這套辦法，只是宋這次地位更低。", src: [s1, "event-chanyuan-treaty:s1"] }
effects:
  - { id: event-economic-center-south, rel: 促成, why: "朝廷與大批人口退到江南，臨安人口從 12 世紀初約 20 萬增加到後來超過百萬，江南成為全國最富庶的地區。", src: [s2, "war-jingkang:s4"] }
counterparts: 無適當對照：西方軌目前沒有「舊都失陷、王室南遷、隔一條河與北方強權分治一百多年」的卡；勉強拿君士坦丁堡陷落比較，會忽略拜占庭在 1453 年就此滅亡、南宋卻延續了 152 年的關鍵差別。
sources:
  - { id: s1, title: "Treaty of Shaoxing — Wikipedia", url: "https://en.wikipedia.org/wiki/Treaty_of_Shaoxing", accessed: 2026-11-02, tier: 百科 }
  - { id: s2, title: "Southern Song（Song dynasty）— Wikipedia", url: "https://en.wikipedia.org/wiki/Southern_Song", accessed: 2026-11-02, tier: 百科 }
  - { id: s3, title: "陶晉生〈進取或退讓：南宋定都臨安〉，《古今論衡》第 42 期（2024 年 6 月），中央研究院歷史語言研究所", url: "https://www1.ihp.sinica.edu.tw//storage/publish3L/42-1.pdf", accessed: 2026-11-02, tier: 學術 }
  - { id: s4, title: "Song Dynasty China: Outside Rivals — Asia for Educators, Columbia University", url: "https://afe.easia.columbia.edu/songdynasty-module/outside-rivals.html", accessed: 2026-11-02, tier: 通論 }
importance: 3
learn:
  histories: [中國史]
  why_care: 宋朝丟了半壁江山卻又撐了一百五十年；首都要設在哪裡，竟然就是「要不要打回北方」的表態。
  story: |
    1127 年，金軍攻破開封、擄走徽宗與欽宗，北宋滅亡。[s2] 徽宗之子趙構在南方即位，就是宋高宗；他一路被金軍追擊，在建康（南京）與杭州之間來回移動。[s2][s3] 主戰派希望把朝廷放在靠近前線的建康，表示要收復中原；高宗與宰相秦檜則傾向議和，1138 年把朝廷定在比較安全、可以從海上撤退的臨安（杭州）。[s3] 1141 年宋金訂立紹興和議：以淮河、秦嶺一線為界，宋每年給金銀 25 萬兩、絹 25 萬匹，地位接近金的藩屬；主戰的名將岳飛也在此時被處死。[s1] 此後宋金時戰時和，1161 年宋朝水軍在長江采石擊退金軍。[s2] 南宋大力發展造船與海外貿易，直到 1279 年在崖山被蒙古建立的元朝滅亡。[s2][s4]
  key_terms:
    - { term: 行在, plain: 皇帝暫時駐留的地方；南宋把臨安稱為「行在」，表示還沒放棄回到開封。, example: 像搬去外婆家「暫住」，嘴上說總有一天要搬回老家。 }
    - { term: 主和與主戰, plain: 南宋朝廷長期爭論要跟金國談和，還是出兵收復北方。, example: 像班上吵要不要跟隔壁班和解，還是繼續比賽到贏回獎盃。 }
  primary_source:
    - { text: "今日之事，有進無退，進為上策，退為無策。", from: 南宋大臣陳康伯語（引自陶晉生〈進取或退讓：南宋定都臨安〉）, src: s3 }
    - { text: "是歲，始定都于杭。", from: 《宋史·高宗紀》紹興八年（1138）條（引自陶晉生文）, src: s3 }
  historiography: |
    **定都臨安＝放棄北方嗎？** 陶晉生指出，主張定都建康的官員多於主張臨安的，建康利於進取卻直接面對長江前線；臨安安全、便於海上撤退，但不利恢復中原。他認為首都選在哪裡，可以看成朝廷「主戰或主和」的指標。[s3] 不過臨安始終被稱為「行在」，南宋名義上從未放棄汴京。[s3]
    **紹興和議：保全，還是屈辱？** 英文維基的整理強調和議讓南宋淪為金的準藩屬，並在簽約後處死岳飛。[s1] 另一面，和議之後南宋長期維持海軍、造船與海外貿易，經濟並未因失去北方而崩潰。[s2]
  misconceptions:
    - "南宋不是一逃到杭州就定都：高宗在建康、杭州等地來回多年，1138 年才定在臨安，而且仍稱它為「行在」。[s3]"
    - "南宋不是只會挨打：1161 年采石、唐島兩場水戰，宋軍都以少勝多。[s2]"
crosscheck:
  date: 2026-11-02
  by: 獨立查核 agent（未參與寫作）
  result: 通過
  notes: "已開 s1–s4 核對：紹興和議 1141 訂、1142 生效、歲幣 25 萬兩與 25 萬匹、準藩屬、付到 1164；1132 定海水軍、臨安人口 20 萬→50 萬→百萬、1161 唐島與采石、襄陽、崖山；陶晉生文的陳康伯語、《宋史》引文、建康派 20 人對臨安派 6 人皆有據。未改內文。s1 只寫 taels 未明言白銀，卡片寫『銀』屬通行說法。"
verification: 交叉確認
lens_status: 無直接論述
---

## C1 背景

1125–1127 年金軍兩度南下，開封陷落，徽宗、欽宗被擄往北方，北宋滅亡。[s2] 劉豫在北方建立受金扶持的偽齊，以「以中原攻中原」，增加了宋朝收復北方的困難。[s3]

## C2 經過

1127 年趙構即位（宋高宗）。[s2] 建炎年間朝廷在南渡與固守之間爭論，高宗在建康與臨安之間搖擺；1138 年（紹興八年）定都臨安。[s3] 1141 年訂紹興和議，1142 年正式生效：宋放棄淮河、秦嶺一線以北的舊土（含開封），每年給金銀 25 萬兩、絹 25 萬匹；岳飛在和議後被處死。[s1] 1161 年宋軍在唐島與采石兩場水戰擊退金軍。[s2] 13 世紀蒙古先滅金，再圍攻襄陽（1268–1273），1279 年崖山之戰後南宋滅亡。[s2][s4]

## C4 制度或機制變化

宋朝在 1132 年建立常設水軍，總部設在定海；政府資助造船、改善港口、興建港口倉庫，推動海外貿易。[s2] 和議讓宋在名義上降為金的準藩屬。[s1]

## C6 直接結果

宋金以淮河為界分治，南宋在長江以南延續政權；歲幣一直付到 1164 年金國再度開戰為止。[s1]

## C7 長期影響

南宋以海軍、港口與海外貿易支撐政權；江南人口眾多、農地肥沃，臨安人口從 12 世紀初約 20 萬，增加到 1170 年左右約 50 萬，一世紀後超過百萬。[s2] 南宋最終在 1279 年被蒙古建立的元朝滅亡，元朝統治了整個中國。[s2][s4]

## C8 雙軌解讀

### 李彔

無直接論述：本卡未查到李彔公開講稿專門談南宋建立。

### 哈拉瑞

無直接論述：本卡未查到哈拉瑞公開摘要談南宋。

## C9 今日對照鉤子

「政府所在地的選擇，本身就是政策訊號」：靠近前線代表要進取，遠離前線代表求安全。[s3]

## C10 不可類比的差異

南宋與金是前現代王朝，邊界與「藩屬」地位用歲幣、稱臣等禮儀安排，不是今天主權國家的國界與條約，也沒有今天的國際承認機制。[s1][s3]
