---
id: event-macedon-rise
type: event
name: 馬其頓崛起：腓力二世（前359–前336年）
aliases: [腓力二世, 馬其頓崛起, 馬其頓方陣, 喀羅尼亞戰役, 科林斯同盟, Philip II of Macedon, 菲利普二世, 腓力二世遇刺, 馬其頓的腓力二世, Battle of Chaeronea, League of Corinth, Macedonian phalanx]
civilization: [古希臘（馬其頓）]
track: west
time:
  start: -359
  end: -336
  precision: exact
  src: [s1, s3]
summary_line: 大事｜宮廷／政治中心｜艾加伊與佩拉（希臘）｜馬其頓崛起：腓力二世（前359–前336年）
summary_card: true
place:
  primary_field: 宮廷／政治中心
  secondary_fields: [戰場, 資源產地]
  locations:
    - { name_ancient: 艾加伊（Aigai）, name_modern: 韋爾吉納（希臘中馬其頓）, lat: 40.4794, lng: 22.3197, precision: schematic, role: 馬其頓舊都；前336年腓力二世在此遇刺, src: [s1, s3] }
    - { name_ancient: 潘加翁山與腓立比, name_modern: 腓立比遺址（希臘東馬其頓）, lat: 41.0136, lng: 24.2864, precision: schematic, role: 金銀礦區；腓力取得後支撐軍費（座標為腓立比遺址）, src: [s1, s3] }
    - { name_ancient: 喀羅尼亞, name_modern: 喀羅尼亞（希臘維奧蒂亞）, lat: 38.4950, lng: 22.8456, precision: schematic, role: 前338年擊敗雅典與底比斯聯軍的戰場, src: [s1] }
  scale: area
structure_tags: [霸權挑戰, 技術代差, 意外財源, 突變事件]
topics: [對外擴張, 統一與中央集權, 軍事同盟]
links: [event-alexander-campaign, war-peloponnesian, event-delian-league, event-hellenistic-kingdoms, event-death-of-socrates]
causes:
  - { id: war-peloponnesian, rel: 背景, why: 長年戰爭讓希臘城邦互相消耗，之後斯巴達又敗給底比斯，沒有一個城邦能壓住全局，北方的馬其頓才有機會稱霸。, src: ["war-peloponnesian:s2", s1] }
effects:
  - { id: event-alexander-campaign, rel: 直接引發, why: 腓力二世遇刺後亞歷山大繼位，接下科林斯同盟與已派往小亞細亞的先遣軍，鎮壓希臘反叛後就渡海進攻波斯。, src: [s1, "event-alexander-campaign:s1"] }
counterparts:
  - { id: event-shang-yang-reform, note: "相似：同一個時代（前4世紀中），一個被核心地區視為邊陲、落後的國家，靠軍事改革與新財源迅速強大，最後壓倒舊強權。不同：秦是改寫全國的戶籍與爵位制度；腓力靠的是新式方陣、金礦和外交，希臘城邦本身沒有被併成郡縣。", src: [s1, s3] }
sources:
  - { id: s1, title: "Philip II of Macedon — Wikipedia", url: "https://en.wikipedia.org/wiki/Philip_II_of_Macedon", accessed: 2026-11-02, tier: 百科 }
  - { id: s2, title: "Diodorus Siculus, Library of History 16.66–95（Loeb 英譯，LacusCurtius, University of Chicago）", url: "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Diodorus_Siculus/16D*.html", accessed: 2026-11-02, tier: 一手 }
  - { id: s3, title: "Philip II, king of Macedonia — Encyclopaedia Britannica", url: "https://www.britannica.com/biography/Philip-II-king-of-Macedonia", accessed: 2026-11-02, tier: 百科 }
importance: 2
learn:
  histories: [希臘羅馬史]
  why_care: 亞歷山大大帝能打到印度，靠的是父親腓力二世留下的軍隊、金礦和同盟；沒有爸爸，就沒有「大帝」。
  story: |
    腓力二世少年時在底比斯當過人質，在那裡學到軍事和外交。[s1] 前 359 年，他接手一個剛打敗仗、國王戰死的馬其頓。[s1] 他讓步兵改拿比希臘長矛長得多的長槍（sarissa），組成密集方陣，騎兵也大幅擴充。[s1][s3] 他奪下潘加翁山一帶的金銀礦，建立腓立比城，用礦產支付軍費。[s1][s3] 前 338 年，他在喀羅尼亞打敗雅典和底比斯聯軍，隔年讓希臘各邦組成科林斯同盟，推他當盟主、準備攻打波斯。[s1] 前 336 年，先遣軍已經渡海，他卻在舊都艾加伊參加女兒婚禮時，被自己的侍衛刺死。[s1][s2] 年輕的兒子亞歷山大接下了這一切。[s1]
  key_terms:
    - { term: 馬其頓方陣, plain: 步兵排成很深的密集隊形，前幾排的長槍一起伸向前方，像一面會移動的槍牆。, example: 像大隊接力時全班手牽手排成好幾排往前推。 }
    - { term: 科林斯同盟, plain: 前337年在腓力主導下成立的希臘城邦同盟，推舉他為盟主和對波斯作戰的統帥。, example: 像各班在學生會投票，選某人當運動會總指揮。 }
  primary_source:
    - { text: "Such was the end of Philip, who had made himself the greatest of the kings in Europe in his time.（腓力就這樣結束了一生，他已成為當時歐洲最偉大的國王。）", from: 狄奧多羅斯《歷史叢書》16.95.1（Loeb 英譯，中文為本站摘譯）, src: s2 }
  historiography: |
    **腓力靠什麼贏？** 古代史家狄奧多羅斯認為，腓力的成功多半來自外交而不是戰場上的勇猛，他自己也更得意靠謀略和談判得來的勝利。[s2] 現代百科則強調他的軍事改革（長槍方陣、擴充騎兵）和金礦財源。[s1][s3]
    **誰殺了腓力？** 唯一同時代的說法是亞里斯多德的記載：刺客保薩尼亞斯是因為受了阿塔羅斯的羞辱。[s1] 狄奧多羅斯講了一個更曲折的私人恩怨故事。[s1][s2] 查士丁則暗示亞歷山大或母親奧林匹亞絲知情甚至主使；也有現代史家認為，這些說法沒有一個真正可信。[s1]
  misconceptions:
    - 腓力不只是「亞歷山大的爸爸」：攻打波斯的同盟、軍隊與先遣部隊都是在他生前就準備好的。[s1]
crosscheck:
  date: 2026-11-02
  by: 獨立查核 agent（未參與寫作）
  result: 通過
  notes: 已打開維基、大英百科、狄奧多羅斯 16.91–95 核對。狄奧多羅斯第 16 卷沒寫亞歷山大渡海，後果的來源改為亞歷山大東征卡 s1；刪去來源未寫的「二十歲」；刺殺主使一句改成貼近維基的「有現代史家認為都不可信」。座標為示意。
verification: 交叉確認
lens_status: 無直接論述
---

## C1 背景

伯羅奔尼撒戰爭與之後的城邦混戰讓雅典、斯巴達、底比斯輪流坐大又衰落，希臘沒有一個城邦能長期主導。[s1] 馬其頓位在希臘北邊，前 359 年國王佩爾狄卡斯三世與伊利里亞人作戰陣亡，王位由年輕的腓力二世接手（先當攝政，後成為國王）。[s1] 腓力少年時（約前 368–前 365 年）在底比斯當人質，受過軍事與外交訓練。[s1]

## C2 經過

- 約前 359 年起：建立使用長槍（sarissa）的馬其頓方陣，騎兵從 600 人擴充到後來的 4,000 人。[s1][s3]
- 前 357–前 356 年：奪取控制潘加翁山金礦的安菲波利斯，並把克雷尼德斯改建為腓立比，開採金銀支付軍費。[s1][s3]
- 前 348 年：圍攻並夷平奧林索斯。[s1]
- 前 338 年：在喀羅尼亞擊敗雅典與底比斯聯軍；前 337 年，希臘各邦組成科林斯同盟，承認他為盟主與對波斯戰爭的統帥。[s1]
- 前 336 年：派帕曼紐率約一萬人先渡海到小亞細亞；同年在艾加伊參加女兒婚禮時，被侍衛保薩尼亞斯刺死，刺客逃跑時被追兵殺死。[s1][s2]

## C6 直接結果

腓力在位約 24 年，從一個資源微薄的小王國起家，建立起稱霸希臘的勢力。[s2] 他死後兒子亞歷山大繼位，接手方陣軍隊、科林斯同盟和已經出發的對波斯戰爭。[s1] 腓力的先遣部隊在他死後一度被羅得島的門農擊退。[s1]
