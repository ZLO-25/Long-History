---
id: event-rubicon
type: event
name: 凱撒渡盧比孔河
aliases: [骰子已經擲下, 渡過盧比孔河, Crossing the Rubicon, 盧比孔河, alea iacta est, 凱撒內戰, Rubicon, 凯撒渡卢比孔河]
civilization: [古羅馬]
track: west
time:
  start: -49
  end: -49
  precision: approx
  src: [s1, s2]
summary_line: 大事｜戰場｜義大利北部邊界｜凱撒渡盧比孔河
place:
  primary_field: 戰場
  secondary_fields: [宮廷／政治中心]
  locations:
    - { name_ancient: 盧比孔河, name_modern: 盧比孔河（義大利，確切河道有爭議）, lat: 44.07217, lng: 12.36072, pleiades_id: "393484", precision: disputed, role: 山南高盧與義大利本土的界河 }
    - { name_ancient: 阿里米努姆, name_modern: 里米尼（義大利）, lat: 44.05895, lng: 12.56319, pleiades_id: "393379", precision: exact, role: 渡河後首先占領的城市 }
    - { name_ancient: 羅馬, name_modern: 羅馬（義大利）, lat: 41.88997, lng: 12.49125, pleiades_id: "423025", precision: exact, role: 元老院與龐培撤離的首都 }
  scale: line
structure_tags: [強人繞過制度, 精英內鬥, 臨界點, 合法性危機, 突變事件]
topics: [內戰]
links: [event-augustan-principate, war-actium, building-forum-romanum, building-via-appia]
effects:
  - { id: event-augustan-principate, rel: 背景, why: 內戰後凱撒成為終身獨裁官，共和實質結束；他遇刺後的內戰最後由屋大維收尾，建立元首制。, src: [s1, s2, "event-augustan-principate:s2"] }
counterparts:
  - { id: event-partition-of-jin, note: "相似：國家的實權落到幾個掌握私人力量的權貴手中，他們先聯手、再互鬥。不同：羅馬的權貴之爭最後由一人勝出，國家沒有分裂；晉國被三家永久分成三國，周王還出面承認。", src: [s1, s6] }
sources:
  - { id: s1, title: "Crossing of the Rubicon — Wikipedia", url: "https://en.wikipedia.org/wiki/Crossing_of_the_Rubicon", accessed: 2026-11-12, tier: 百科 }
  - { id: s3, title: "Suetonius, Life of Julius Caesar 30–32（Loeb 英譯，LacusCurtius, University of Chicago；頁面未標譯者）", url: "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Suetonius/12Caesars/Julius*.html", accessed: 2026-11-12, tier: 一手 }
  - { id: s2, title: "Jona Lendering, Rubico (49 BCE) — Livius.org", url: "https://www.livius.org/articles/battle/rubico-49-bce/", accessed: 2026-10-24, tier: 通論 }
  - { id: s4, title: "Sameer Bajaj，Nexus（哈拉瑞《連結》）讀書筆記", url: "https://sameerbajaj.com/nexus/", accessed: 2026-10-25, tier: 摘要 }
  - { id: s5, title: "Reason 書評〈The Fantastical Scenarios of Yuval Noah Harari: From the Roman Past to the AI Future〉（AOL 轉載）", url: "https://aol.com/news/fantastical-scenarios-yuval-noah-harari-110048001.html", accessed: 2026-10-25, tier: 摘要 }
  - { id: s6, title: "Partition of Jin — Wikipedia", url: "https://en.wikipedia.org/wiki/Partition_of_Jin", accessed: 2026-10-25, tier: 百科 }
importance: 3
learn:
  histories: [希臘羅馬史]
  perspectives:
    - { history: 希臘羅馬史, text: "從希臘羅馬史看，渡盧比孔河是共和規則被軍隊忠於將領個人所壓過的象徵時刻。[s1][s2]" }
  why_care: 「渡過盧比孔河」今天還是「不能回頭」的意思；但那句有名的「骰子已經擲下」到底是誰、用哪種語言說的，史料其實不一致。[s1][s3]
  story: |
    前 49 年，凱撒的總督任期快結束，元老院命令他解散軍隊回羅馬。[s1][s2] 按羅馬法律，總督帶兵進入義大利本土就喪失指揮權，本人與士兵可被判死罪。[s1] 約 1 月 10 日到 11 日的夜間，他率領第十三軍團南渡盧比孔河，這條小河是山南高盧與義大利本土的界線。[s1][s2] 蘇埃托尼烏斯記載他說「骰子已經擲下」，普魯塔克則說他引用了一句希臘文。[s1][s3] 龐培、執政官與許多元老逃出羅馬，凱撒占領阿里米努姆，前 48 年在法薩盧斯擊敗龐培。[s1][s2]
  key_terms:
    - { term: 盧比孔河（Rubicon）, plain: 義大利北部的小河，流入亞得里亞海，當時是山南高盧行省和義大利本土的分界。, example: 像兩個縣市之間的小溪，一過橋就換了規定。 }
    - { term: 指揮權（imperium）, plain: 羅馬官員指揮軍隊與執法的權力；只在被授權的範圍與任期內有效。, example: 像校外教學的帶隊老師，只在活動範圍與時間內有權管學生。 }
    - { term: 山南高盧（Cisalpine Gaul）, plain: 阿爾卑斯山南側、義大利北部的行省，凱撒任總督的轄區之一。, example: 像一位縣長管的邊界地區，離中央只隔一條河。 }
    - { term: 行省總督, plain: 羅馬派去管理行省、指揮駐軍的官員，任期結束後要回羅馬交出權力。, example: 像分公司經理，任期滿要回總部報到。 }
    - { term: 獨裁官（dictator）, plain: 羅馬共和在危機時期暫時授予一人的最高權力；凱撒後來成為終身獨裁官，與傳統的短期任命不同。, example: 像緊急狀況下的臨時總指揮，任務結束就該交權。 }
  primary_source:
    - { text: "Take we the course which the signs of the gods and the false dealing of our foes point out. The die is cast, said he.（讓我們走諸神的徵兆與敵人的背信所指的路。他說：骰子已經擲下。）", from: 蘇埃托尼烏斯《凱撒傳》32（Loeb 英譯，LacusCurtius；括號中文為本站中譯）, src: s3 }
  historiography: |
    **他到底說了什麼、用什麼語言？** 蘇埃托尼烏斯寫的拉丁文是 iacta alea est（常被引成 alea iacta est）；普魯塔克則說凱撒引用了劇作家米南德的一句希臘文 anerriphtho kybos，意思是「讓骰子擲下吧」。[s1] 兩種版本一個是過去式的陳述、一個是命令句；英文維基百科還提到另一種讀法：alea 指的是「骰子遊戲」，所以也可譯成「遊戲開始了」。[s1] 這個條目沒有說凱撒實際用哪種語言說，所以不能確定。[s1]
    **河在哪、哪一天？** 確切日期不明，學者通常放在前 49 年 1 月 10–11 日夜間；前一天他的軍隊已進入義大利，副手昆圖斯·霍騰修斯已占領阿里米努姆。[s1] 河道也有爭議，所以本卡的地點標為「爭議」。[s1]
    **共和為什麼守不住？** 哈拉瑞依讀書筆記的說法：公民權擴大後，共和的制衡在當時的資訊條件下無法運作；有書評反駁說，凱撒把《高盧戰記》迅速送回羅馬傳播，顯示共和的資訊網絡其實很強，反而幫他走上獨裁。[s4][s5]
  misconceptions:
    - 「凱撒帶著整支大軍渡河。」維基百科與 Livius 寫的是他率第十三軍團渡河，不是整個軍隊同時過河。[s1]
    - 「渡河那天就是共和結束的日子。」渡河之後還有內戰：他前 48 年才擊敗龐培，Livius 的評語則把共和的結束放在內戰之後。[s1][s2]
  pop_culture:
    - { claim: "常見說法：凱撒在河邊說了一句拉丁文『alea iacta est』，這是千真萬確的名言。", fact: "蘇埃托尼烏斯的拉丁文是 iacta alea est，翻成英文是 The die is cast；普魯塔克則說是希臘文的『讓骰子擲下吧』，並說出自米南德；兩個版本在時態與語氣上都不同，凱撒實際說什麼無法確定。[s1][s3]", src: [s1, s3] }
    - { claim: "常見說法：渡河是凱撒冷靜算計後的單純政治決定。", fact: "蘇埃托尼烏斯寫的渡河場景還帶有神蹟色彩：一個身形與容貌都非凡的人坐在附近吹蘆管，接著才是凱撒那句話；古代作者怎麼寫，反映的是他們的敘事方式，不能當作可驗證的現場紀錄。[s3]", src: [s3] }
verification: 交叉確認
lens_status: 依公開資料推論，未對照原書
---

## C1 背景

凱撒在高盧與伊利里庫姆的總督任期即將結束，元老院命令他解散軍隊、返回羅馬；元老院同時倚重龐培的軍事力量。[s1][s2] 羅馬法律規定只有當選的執政官與裁判官能在義大利境內擁有軍事指揮權（imperium），行省總督帶兵進入義大利就喪失指揮權，本人與士兵都可被判死罪。[s1]

## C2 經過

約西元前 49 年 1 月 10–11 日夜間（確切日期不明，由信使行程推算），凱撒率第十三軍團南渡盧比孔河；這條小河是山南高盧行省與義大利本土的界線。[s1][s2] 據蘇埃托尼烏斯記載，他說了「骰子已經擲下」；普魯塔克的版本則是一句希臘語「讓骰子擲下吧」。[s1] 蘇埃托尼烏斯在這段敘述裡還記了一個異象：一個身形與容貌都非凡的人坐在附近吹蘆管；這是古人帶有神蹟色彩的說法。[s3]

## C3 關鍵人物與群體

凱撒、龐培、執政官與元老院多數成員。[s1][s2]

## C4 制度或機制變化

渡河本身就是叛國行為，代表「軍隊忠於將領個人」壓過了「法律限制軍隊進入首都」的共和規則。[s1][s2]

## C6 直接結果

龐培、執政官與大批元老逃離羅馬；凱撒占領阿里米努姆，先轉往西班牙對付龐培的軍隊，前 48 年 8 月在法薩盧斯擊敗龐培。[s1][s2]

## C7 長期影響

內戰後凱撒成為終身獨裁官；Livius 的評語是「羅馬共和國已經結束」。[s1][s2] 「渡過盧比孔河」後來成為「做出不可回頭的決定」的成語。[s1]

## C8 雙軌解讀

### 李彔

無直接論述。

### 哈拉瑞

依讀書筆記，哈拉瑞在《連結》中認為，羅馬共和以兩位任期一年的執政官、元老院、公民大會與保民官互相制衡；公民權擴大到整個義大利乃至行省後，這套制衡在當時的資訊條件下無法運作 [s4]。有書評反駁說，凱撒在高盧期間把《高盧戰記》迅速送回羅馬傳播，顯示共和的資訊網絡其實很強，反而幫他走上獨裁 [s5]。

## C9 今日對照鉤子

「掌握武力的個人面對制度要求交出權力時，選擇越過紅線」的結構；以及一條原本象徵性的法律界線，如何成為政權更替的臨界點。[s1][s2]

## C10 不可類比的差異

羅馬共和的軍隊是由將領招募、依附將領個人的體系，與今日國家化、受文官控制的軍隊不同；渡河的確切日期與地點也不確定。[s1]
