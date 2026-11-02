---
id: war-adrianople
type: war
name: 哥德人入境與阿德里安堡之戰（376–378年）
aliases: [阿德里安堡之戰, 亞德里安堡戰役, 哈德良堡之戰, 哥德戰爭（376–382）, 哥德人渡過多瑙河, Battle of Adrianople, Battle of Hadrianopolis, Gothic War (376–382), 瓦倫斯, Valens, 弗里提格倫, Fritigern]
aliases_main: [阿德里安堡之戰, 哥德戰爭（376–382）, Battle of Adrianople]
civilization: [古羅馬, 日耳曼與法蘭克（日耳曼部落）]
track: west
time:
  start: 376
  end: 378
  precision: exact
  src: [s1, s2]
summary_line: 戰爭｜戰場｜阿德里安堡（今土耳其埃迪爾內）｜哥德人入境與阿德里安堡之戰（376–378年）
place:
  primary_field: 戰場
  secondary_fields: [商路]
  locations:
    - { name_ancient: 阿德里安堡（哈德良堡）, name_modern: 埃迪爾內（土耳其）, lat: 41.8167, lng: 26.5, precision: disputed, role: "378 年會戰地點（確切戰場有三說，座標取維基百科）", src: [s1] }
    - { name_ancient: 多瑙河下游（色雷斯邊境）, name_modern: 多瑙河下游（保加利亞與羅馬尼亞交界）, lat: 44.1, lng: 27.3, precision: schematic, role: "376 年哥德人渡河入境處（示意）", src: [s2, s3] }
  scale: area
structure_tags: [邊疆防線, 雇傭兵與蠻族化軍隊, 突變事件, 臨界點]
topics: [游牧民族與邊疆, 移民與移墾, 帝國的衰亡]
links: [event-fall-western-rome, event-christian-empire, war-feishui, event-crisis-third-century]
causes:
  - { id: event-crisis-third-century, rel: 背景, why: "三世紀危機時哥德人就曾越過多瑙河侵擾帝國，克勞狄二世在納伊蘇斯擊敗他們；此後羅馬與哥德人在多瑙河邊境時戰時和。", src: ["event-crisis-third-century:s1", s2] }
effects:
  - { id: event-fall-western-rome, rel: 促成, why: "被匈人逼迫的哥德人大批進入帝國，羅馬無法驅逐也無法收服，皇帝戰死、東方野戰軍大半覆滅。", src: [s1, s2, "event-fall-western-rome:s1"] }
  - { id: event-christian-empire, rel: 背景, why: "瓦倫斯戰死後狄奧多西一世繼位，他後來在 380 年頒布敕令，把尼西亞派基督教定為國教。", src: [s2, "event-christian-empire:s2"] }
counterparts:
  - { id: war-feishui, note: "相似：幾乎同時（378 與 383 年），歐亞兩端都有一場決定性會戰，牽涉北方民族大規模南下與帝國的命運。不同：阿德里安堡是羅馬皇帝戰死、外族留在境內；淝水之戰則是南方的東晉擊退北方前秦。", src: [s1] }
sources:
  - { id: s1, title: "Battle of Adrianople — Wikipedia", url: "https://en.wikipedia.org/wiki/Battle_of_Adrianople", accessed: 2026-11-02, tier: 百科 }
  - { id: s2, title: "Gothic War (376–382) — Wikipedia", url: "https://en.wikipedia.org/wiki/Gothic_War_(376%E2%80%93382)", accessed: 2026-11-02, tier: 百科 }
  - { id: s3, title: "Ammianus Marcellinus, Roman History, Book XXXI — Loeb Classical Library 第 3 冊（1939）英譯，LacusCurtius（penelope.uchicago.edu）", url: "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Ammian/31*.html", accessed: 2026-11-02, tier: 一手 }
  - { id: s4, title: "Battle of Adrianople — Encyclopaedia Britannica", url: "https://www.britannica.com/event/Battle-of-Adrianople-378", accessed: 2026-11-02, tier: 百科 }
importance: 2
summary_card: true
learn:
  histories: [希臘羅馬史, 歐洲史]
  why_care: 一群逃難的人被放進國境，兩年後卻殺死了羅馬皇帝——這場戰役常被說成西羅馬走向滅亡的起點。
  story: |
    376 年，被匈人逼得走投無路的哥德人來到多瑙河邊，請求進入羅馬帝國。皇帝瓦倫斯答應了，大批人日夜搭船、木筏和挖空的樹幹渡河，多到羅馬官員算不清。[s2][s3] 但負責接待的官員把該發的糧食拿去賣，飢餓的哥德人甚至要賣掉孩子換狗肉；地方將領又在宴會上設局，哥德人終於起兵。[s2] 378 年 8 月 9 日，瓦倫斯不等姪兒格拉提安的援軍，就在阿德里安堡附近進攻哥德人的車陣。剛好外出覓食的哥德騎兵趕回來包抄，羅馬軍潰敗，瓦倫斯戰死，大約三分之二的東方軍隊覆滅。[s1][s2]
  key_terms:
    - { term: 同盟者（foederati）, plain: 和羅馬訂約、住在帝國境內並替羅馬打仗，但保有自己首領的外族群體。, example: 像學校把隔壁社團整團收進來，讓他們繼續用自己的社長。 }
    - { term: 野戰軍, plain: 隨皇帝或將領機動作戰的主力部隊，和守邊的部隊不同。, example: 像球隊的先發主力，不是只守在門口的板凳球員。 }
  primary_source:
    - { text: "可以確定的是，我軍只有大約三分之一逃了出來。史冊記載，除了坎尼之戰，沒有一場會戰有過這樣的屠殺。", from: "阿米阿努斯·馬凱利努斯《羅馬史》第 31 卷 13.18–19（Loeb 英譯，本站中譯）", src: s3 }
  historiography: |
    **它是西羅馬滅亡的起點嗎？** 這場會戰常被看成西羅馬走向衰亡的開端；但也有人指出，帝國撐過了這次失敗，東羅馬後來還恢復元氣，它到底有多關鍵，史家仍在爭論。[s1][s2][s4]
    **騎兵時代從此開始？** 英國史家 Charles Oman 認為這一仗證明騎兵壓倒步兵、開啟中世紀騎士的時代；T. S. Burns 等學者則認為這主要仍是步兵之戰，騎士要到好幾個世紀後才出現。[s1]
  misconceptions:
    - 哥德人一開始不是「入侵」：他們是在皇帝同意下渡河入境的難民，被官員剝削後才起兵。[s2][s4]
crosscheck:
  date: 2026-11-02
  by: 獨立查核 agent（未參與寫作）
  result: 通過
  notes: "核對 s1、s2（渡河、糧食私賣與賣子換狗肉、盧皮奇努斯、三分之二、382 和約、410、Oman／Burns 爭論均相符）；渡河工具依 s2 改為「挖空的樹幹」，狄奧多西 380 年一條加引國教卡 s2。s3 阿米阿努斯與 s4 大英百科因本輪抓取額度用盡未能開啟，Heather 等具體傷亡數字未逐字核到。"
verification: 交叉確認
lens_status: 無直接論述
---

## A1 交戰方與聯盟結構

羅馬方面是東羅馬皇帝瓦倫斯親率的東方野戰軍；西方皇帝格拉提安（瓦倫斯的姪兒）派出援軍，但會戰時還沒趕到。[s1][s4] 另一方是弗里提格倫領導的特溫吉人（西哥德人），加上後來趕到的格魯森尼人（東哥德人）與其他援軍。[s1][s2][s4]

## A2 起因：結構與導火線

**結構**：匈人西進，把原本住在黑海北岸的哥德人逼向羅馬邊境。[s4] 當時瓦倫斯的主力在東方準備對波斯作戰，巴爾幹只剩少量部隊；他樂見哥德人到來，認為可以低成本補充新兵。[s2] 376 年，他同意已改信基督教、與他結盟的特溫吉人渡過多瑙河，條件讓他們保持團結、選擇定居地點。[s2]

**導火線**：羅馬官員把應發給難民的糧食大量私賣，飢餓的哥德家庭甚至賣孩子為奴換取狗肉。[s2] 將領盧皮奇努斯在馬西亞諾波利斯設宴邀請弗里提格倫等首領，城外爆發衝突，哥德人起兵，並在隨後的戰鬥中消滅盧皮奇努斯的部隊。[s1][s2]

## A8 結果

378 年 8 月 9 日，羅馬軍潰敗，瓦倫斯戰死（死因不明）。[s1] 羅馬損失估計 1–1.5 萬人（Heather）或約 2 萬人（Williams 與 Friell），約占全軍三分之二；也有說法超過 4 萬。[s1][s4] 哥德人沒能攻下阿德里安堡城。[s1] 382 年狄奧多西一世與哥德人議和：哥德人承認羅馬權威、以同盟者身分提供兵員，並在多瑙河南岸的行省取得土地，由自己的首領管理、保持族群完整。[s2]

## A9 長期影響

這一仗摧毀了東方野戰軍的核心。[s1] 羅馬與外族的關係從此改變：大批外族以完整群體的身分住在帝國境內替羅馬作戰，這為後來西哥德人在 410 年洗劫羅馬鋪了路。[s2] 瓦倫斯戰死也讓狄奧多西一世上台，他後來把尼西亞派基督教定為國教。[s2]
