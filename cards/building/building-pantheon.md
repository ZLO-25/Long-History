---
id: building-pantheon
type: building
name: 萬神殿
aliases: [羅馬萬神殿, Pantheon, 潘提翁神殿, 聖母與殉道者教堂, Santa Maria ad Martyres, 万神殿]
civilization: [古羅馬]
track: west
time:
  start: 113
  end: 126
  precision: disputed
  src: [s1, s2]
summary_line: 建築｜思想場域｜羅馬戰神廣場｜萬神殿
place:
  primary_field: 思想場域
  secondary_fields: [城市／都會]
  locations:
    - { name_ancient: 萬神殿, name_modern: 羅馬（義大利）, lat: 41.8986, lng: 12.47682, pleiades_id: "128044615", precision: exact, role: 戰神廣場 }
  scale: point
structure_tags: [技術代差, 政治宣傳工程, 制度包裝延續, 宗教／意識形態動員]
topics: [古代建築, 宗教]
links: [commodity-roman-concrete, event-augustan-principate, building-colosseum]
causes:
  - { id: commodity-roman-concrete, rel: 促成, why: 分級骨材的混凝土越往上越輕，才撐得起內徑約 43 公尺、沒有鋼筋的穹頂。, src: [s1, s3] }
counterparts:
  - { id: building-yungang, note: "相似：由統治者出資、規模宏大的宗教建築，也是展示權力與正統的地方。不同：萬神殿供奉羅馬的眾神；雲岡石窟供奉從南亞、中亞傳來的佛教。", src: [s1, s6] }
sources:
  - { id: s1, title: "Pantheon, Rome — Wikipedia", url: "https://en.wikipedia.org/wiki/Pantheon,_Rome", accessed: 2026-10-24, tier: 百科 }
  - { id: s2, title: "Riddle solved: Why was Roman concrete so durable? — MIT News (2023-01-06)", url: "https://news.mit.edu/2023/roman-concrete-durability-lime-casts-0106", accessed: 2026-10-24, tier: 通論 }
  - { id: s3, title: "Roman concrete — Wikipedia", url: "https://en.wikipedia.org/wiki/Roman_concrete", accessed: 2026-10-24, tier: 百科 }
  - { id: s6, title: "Yungang Grottoes — Wikipedia", url: "https://en.wikipedia.org/wiki/Yungang_Grottoes", accessed: 2026-10-25, tier: 百科 }
  - { id: s7, title: "Hadrian’s Rome — The Open University（OpenLearn 課程頁）", url: "https://www.open.edu/openlearn/history-the-arts/hadrians-rome/content-section-2.1.1", accessed: 2026-11-12, tier: 通論 }
  - { id: s8, title: "《羅馬君王傳·哈德良》（Historia Augusta, Hadrian）與萬神殿正面銘文 — 據 s7 轉引，未見原典全文", url: "https://www.open.edu/openlearn/history-the-arts/hadrians-rome/content-section-2.1.1", accessed: 2026-11-12, tier: 一手 }
learn:
  histories: [希臘羅馬史]
  why_care: 萬神殿門上寫的是阿格里帕的名字，但今天站在裡面的建築是另一位皇帝重建的；它的穹頂至今還是世界最大的無鋼筋混凝土穹頂。[s1][s2][s7]
  story: |
    萬神殿正面的大字寫著：盧基烏斯之子馬庫斯·阿格里帕，第三次任執政官時建造。[s1][s7] 但這不是他蓋的那一座：奧古斯都時期阿格里帕建了最早的神廟，西元 80 年與 110 年兩度遭火災，現存的建築是哈德良時期重建的。[s1] 《羅馬君王傳》說哈德良把修復的建築以原建者的名字獻出。[s8] 最驚人的是穹頂：內徑約 43 公尺，與地面到頂部圓孔的高度一樣，用混凝土一層層做成，沒有鋼筋，越往上用越輕的凝灰岩與浮石。[s1][s3] 這至今仍是世界上最大的無鋼筋混凝土穹頂。[s1][s2][s3] 609 年，拜占庭皇帝福卡斯把它送給教宗，改為教堂，因此逃過許多古羅馬建築荒廢、被拆的命運。[s1]
  key_terms:
    - { term: 無鋼筋混凝土, plain: 沒有在裡面放鋼筋的混凝土，只靠材料本身和圓拱的形狀承受重量。, example: 像用整塊石頭疊成圓頂，不靠鋼骨撐。 }
    - { term: 骨材, plain: 混在混凝土裡的碎石、浮石等顆粒；萬神殿穹頂越往上用越輕的骨材。, example: 像蛋糕越往上層越用蓬鬆的材料，減輕下面的負擔。 }
    - { term: 藻井（凹格）, plain: 穹頂內側一格一格往內凹的方格，能減輕穹頂重量。, example: 像巧克力板上的小方格。 }
    - { term: 圓孔（oculus）, plain: 穹頂正中央的圓形開口，光線從這裡進來；環的直徑約 9.1 公尺。, example: 像屋頂開的天窗，下雨天雨水也會進來。 }
    - { term: 執政官, plain: 羅馬共和與帝國時期最高的官職之一，一年兩人；阿格里帕銘文裡的「第三次任執政官」就是用來標示年代與身分。, example: 像用「第幾屆總統」來標示年代。 }
  primary_source:
    - text: "M·AGRIPPA·L·F·COS·TERTIVM·FECIT（盧基烏斯之子馬庫斯·阿格里帕，第三次任執政官時建造）"
      from: 萬神殿正面銘文，據 Open University 課程頁轉引；該頁說哈德良時期是保留或更可能是重刻這段銘文
      src: s7
    - text: 《羅馬君王傳》說哈德良把修復好的戰神廣場建築以原建者的名字獻出。（轉述大意，據 s7 轉引）
      from: 《羅馬君王傳·哈德良》，據 Open University 課程頁轉引
      src: s8
  historiography: |
    **現存建築是什麼時候蓋的？** 維基百科說約 126 年獻祭，也有學者認為工程始於圖拉真時期；MIT News 則寫作 128 年獻祭。[s1][s2]
    **銘文是原件嗎？** Open University 的課程頁說，哈德良是保留或更可能是重刻了阿格里帕的銘文；《羅馬君王傳》則說他習慣以原建者之名獻出修復的建築。「這是一種政治姿態」是我們的詮釋，不是史料的直接說法。[s7][s8]
  misconceptions:
    - 「萬神殿是阿格里帕蓋的，所以是他那時的建築。」門上有他的名字，但現存建築是哈德良時期重建的。[s1][s7]
    - 「改成教堂前，萬神殿早就被拆光了。」它在 609 年改為教堂，才免於荒廢與拆除；不過 17 世紀門廊的青銅桁架仍被熔掉，主要拿去造大砲。[s1]
  pop_culture:
    - { claim: "常見說法（導覽、網路）：門上刻著阿格里帕，所以萬神殿是阿格里帕蓋的。", fact: "最早的神廟確實是阿格里帕建的，但曾兩度遭火災；現存建築是哈德良時期重建的，銘文是保留或重刻前人的名字。[s1][s7]", src: [s1, s7] }
    - { claim: "常見說法：古羅馬的建築都因為異教衰落而被棄置、拆毀。", fact: "萬神殿因為在 609 年被改為教堂而保存下來；轉為新用途讓它免於許多古羅馬建築遭遇的荒廢與拆除。[s1]", src: [s1] }
verification: 爭議
lens_status: 無直接論述
---

## D1 功能與象徵

原為羅馬神廟。正面至今仍刻著原建者阿格里帕的銘文「M·AGRIPPA·L·F·COS·TERTIVM·FECIT」（盧基烏斯之子馬庫斯．阿格里帕第三次任執政官時建），但現存建築是哈德良時期重建的。[s1] 《羅馬君王傳》說哈德良把修復的建築以原建者之名獻出，Open University 的課程頁認為這段銘文是保留或更可能是重刻的。[s7][s8]

## D2 建造者與資金

奧古斯都時期由阿格里帕興建最早的神廟；西元 80 年與 110 年兩度遭火災。[s1] **年代有爭議**：現存建築一般認為在哈德良時期重建，維基百科說約 126 年獻祭，也有學者認為工程始於圖拉真時期；MIT News 則寫作 128 年獻祭。[s1][s2] 資金來源不足。

## D3 技術與材料

無鋼筋的混凝土穹頂，內部直徑約 43 公尺，與地面到頂部圓孔的高度相同；穹頂內有凹格（藻井），骨材分級，越往上用越輕的凝灰岩與浮石。[s1][s3]

## D4 規模與數據

穹頂內徑約 43 公尺；頂部圓孔環直徑約 9.1 公尺（維基百科）。[s1] 至今仍是世界上最大的無鋼筋混凝土穹頂。[s1][s2][s3]

## D5 維護與後世命運

609 年拜占庭皇帝福卡斯把它贈予教宗博尼法斯四世，改為「聖母與殉道者教堂」；轉為教堂讓它免於許多古羅馬建築遭遇的荒廢與拆除。[s1] 17 世紀教宗烏爾班八世拆下門廊上方的青銅桁架熔鑄，主要用來造大砲。[s1] 拉斐爾、義大利國王維托里奧．埃馬努埃萊二世等人葬於此。[s1]

## D6 雙軌解讀

### 李彔

無直接論述。

### 哈拉瑞

無直接論述。

## D7 今日對照鉤子

「建築因不斷被賦予新用途（神廟→教堂→陵墓）而得以保存」；以及古代材料科學（自癒混凝土）被現代研究重新解讀的例子。[s1][s2]

## D8 不可類比的差異

萬神殿是單一的宗教與紀念建築，不是今日意義上的公共基礎設施；建造年代與資金都缺乏直接紀錄。[s1]
