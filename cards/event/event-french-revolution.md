---
id: event-french-revolution
type: event
name: 法國大革命（1789–1799）全景
aliases: [法國大革命, 法國革命, French Revolution, Révolution française, 攻占巴士底獄, 人權宣言, 路易十六, 恐怖統治, 羅伯斯比, 羅伯斯比爾, 拿破崙, 霧月政變, 旺代戰爭, 斷頭台, 自由平等博愛, Bastille, 巴士底, Louis XVI, Robespierre, Napoleon, 法国大革命]
civilization: [法國]
track: west
time:
  start: 1789
  end: 1799
  precision: exact
  src: [s1, s2]
summary_line: 大事｜城市／都會｜巴黎｜法國大革命（1789–1799）全景
place:
  primary_field: 城市／都會
  secondary_fields: [宮廷／政治中心, 思想場域]
  locations:
    - { name_ancient: 巴黎, name_modern: 巴黎（法國）, lat: 48.8566, lng: 2.3522, precision: schematic, role: 巴士底獄、國民議會與斷頭台所在的革命中心（座標為今市中心）, src: [s1, s2] }
    - { name_ancient: 凡爾賽, name_modern: 凡爾賽（法國）, lat: 48.8049, lng: 2.1204, precision: schematic, role: 1789 年三級會議召開地、王室宮廷（座標為今市中心）, src: [s2] }
    - { name_ancient: 瓦倫, name_modern: 瓦倫昂阿爾貢（法國默茲省）, lat: 49.2253, lng: 5.0322, precision: schematic, role: 1791 年 6 月王室出逃被攔下之處（座標為鎮中心）, src: [s2] }
    - { name_ancient: 旺代, name_modern: 旺代省一帶（法國西部）, lat: 46.67, lng: -1.43, precision: schematic, role: 1793 年起反抗革命政府的西部內戰地區（座標示意）, src: [s2, s8] }
  scale: area
structure_tags: [革命與政權更替, 財政枯竭, 合法性危機, 公民身分擴張, 強人繞過制度]
topics: [民主與參政, 法律與憲法, 稅收, 革命, 啟蒙與人權]
links: [event-reformation, event-xinhai-revolution, war-world-war-one, event-estates-general-1789, event-storming-bastille, event-declaration-rights-of-man, social-womens-march-versailles, finance-assignats, finance-french-royal-debt, event-execution-louis-xvi, event-reign-of-terror, war-vendee, event-brumaire-coup, event-napoleonic-code, tech-metric-system, event-haitian-revolution, person-louis-xvi, person-marie-antoinette, person-robespierre, person-napoleon, person-olympe-de-gouges]
causes:
  - { id: event-enlightenment, rel: 背景, why: 啟蒙思想讓許多人認為舊政權腐敗、專制，給了要求改變的人一套說法。, src: [s2] }
  - { id: finance-french-royal-debt, rel: 直接引發, why: 王室債台高築、稅又收不上來，國王只好召開三級會議，革命就從這場為了加稅而開的會議開始。, src: [s1, s2] }
  - { id: war-american-revolution, rel: 背景, why: 法國出錢出兵支援美國獨立，大舉借債，到 1788 年國家收入約一半要拿去付債。, src: [s1, s2] }
effects:
  - { id: event-execution-louis-xvi, rel: 促成, why: 革命讓主權從國王轉到國民，國王出逃失敗後信用破產，1792 年王權被推翻、隔年國王被處死。, src: [s2, s4] }
  - { id: event-reign-of-terror, rel: 促成, why: 革命政府同時面對外國戰爭、內戰與物價飛漲，1793 年起用公安委員會、嫌疑犯法與革命法庭「以恐怖治國」。, src: [s2, s5, s6] }
  - { id: war-vendee, rel: 促成, why: 革命的教會政策與 1793 年的徵兵令，讓法國西部的農民起來反抗革命政府。, src: [s2, s8] }
  - { id: event-brumaire-coup, rel: 直接引發, why: 熱月政變後的督政府在激進派與王黨之間搖擺，1799 年拿破崙發動霧月政變奪權，革命就此結束。, src: [s2] }
  - { id: war-napoleonic, rel: 直接引發, why: 革命後政局在激進與反動之間擺盪、對外戰爭不斷，最後軍人拿破崙發動霧月政變掌權，1804 年稱帝。, src: [s1, s2] }
  - { id: finance-london-rise, rel: 促成, why: 英國與革命後的法國從 1793 年起打了二十多年仗，英國被迫擴大借款與稅收，荷蘭則被法軍占領，倫敦逐漸取代阿姆斯特丹。, src: [finance-london-rise:s2, finance-london-rise:s5, finance-london-rise:s8] }
counterparts:
  - { id: event-xinhai-revolution, note: "相似：都推翻延續很久的君主制、建立共和，之後又出現強人掌權（拿破崙、袁世凱稱帝）。不同：法國革命從財政危機與首都群眾起事開始，並經歷處死國王與恐怖統治；辛亥革命由地方新軍起義引發，以清帝和平退位收場。", src: [s1, s2] }
sources:
  - { id: s1, title: "French Revolution — Wikipedia", url: "https://en.wikipedia.org/wiki/French_Revolution", accessed: 2026-11-07, tier: 百科 }
  - { id: s2, title: "Harrison W. Mark, French Revolution — World History Encyclopedia（2023）", url: "https://www.worldhistory.org/French_Revolution/", accessed: 2026-11-07, tier: 通論 }
  - { id: s3, title: "Roy Tang, Sapiens 讀書摘錄（摘錄《人類大歷史》Chapter 9 The Arrow of History 原文）", url: "https://roytang.net/2021/12/sapiens/", accessed: 2026-11-07, tier: 摘要 }
  - { id: s4, title: "Execution of Louis XVI — Wikipedia", url: "https://en.wikipedia.org/wiki/Execution_of_Louis_XVI", accessed: 2026-11-07, tier: 百科 }
  - { id: s5, title: "Reign of Terror — Wikipedia", url: "https://en.wikipedia.org/wiki/Reign_of_Terror", accessed: 2026-11-07, tier: 百科 }
  - { id: s6, title: "The Law of Suspects（1793-09-17 嫌疑犯法英譯）— Liberty, Equality, Fraternity, George Mason University", url: "https://www.revolution.chnm.org/d/417", accessed: 2026-11-07, tier: 一手 }
  - { id: s7, title: "Robespierre (3 December 1792)：國民公會演說〈路易必須死〉— Liberty, Equality, Fraternity, George Mason University", url: "https://www.revolution.chnm.org/d/324", accessed: 2026-11-07, tier: 一手 }
  - { id: s8, title: "Peter McPhee, 'A Vicious Civil War in the French Revolution: The Vendée, 1793–1795', in The Cambridge World History of Genocide, vol. 2（Cambridge University Press, 2023）（章節摘要）", url: "https://cambridge.org/core/books/cambridge-world-history-of-genocide/vicious-civil-war-in-the-french-revolution/576E50A9A665BB2501A8BFE71302302C", accessed: 2026-11-07, tier: 學術 }
  - { id: s9, title: "Guillotine — Wikipedia", url: "https://en.wikipedia.org/wiki/Guillotine", accessed: 2026-11-07, tier: 百科 }
  - { id: s10, title: "Let them eat cake — Wikipedia", url: "https://en.wikipedia.org/wiki/Let_them_eat_cake", accessed: 2026-11-07, tier: 百科 }
importance: 3
learn:
  histories: [歐洲史]
  perspectives:
    - { history: 歐洲史, text: "從歐洲史看，這十年把「主權屬於國民」「人生而自由平等」寫進法律，也把國王送上斷頭台；之後一百多年的歐洲政治，幾乎都在支持或反對這場革命。[s2]" }
  why_care: 今天很多國家的憲法都寫著「主權在民」「人生而平等」，這些想法的起點之一就是 1789 年的巴黎；但同一場革命也處死國王、關押幾十萬人，最後又讓一位將軍奪權。理想和暴力怎麼會出現在同一場革命裡，是理解現代政治的一把鑰匙。[s2][s5]
  story: |
    1789 年，欠了大筆債的路易十六召開三級會議想加稅。[s1][s2] 平民代表卻自稱國民議會，7 月巴黎群眾攻下巴士底獄，8 月議會通過《人權宣言》。[s2] 1791 年 6 月國王一家喬裝出逃、在瓦倫被抓回，從此失去信任。[s2] 1792 年對奧地利開戰，8 月群眾攻入王宮，9 月宣布共和；1793 年 1 月國王被送上斷頭台。[s2][s4] 外國軍隊、旺代叛亂、飛漲的物價一起壓上來，國民公會以《嫌疑犯法》關押至少 30 萬人，約 1.7 萬人被正式處決。[s5][s6] 1794 年 7 月，帶頭的羅伯斯比也被處死。[s5] 1799 年 11 月，將軍拿破崙發動霧月政變奪權，革命畫下句點。[s2]
  key_terms:
    - { term: 舊制度（Ancien Régime）, plain: 革命前的法國：國王掌權，社會分成教士、貴族、平民三個等級，前兩個等級有很多免稅特權。, example: 一個班上，幹部不用打掃、不用繳班費，其他同學卻要負擔全部。 }
    - { term: 第三等級, plain: 教士與貴族以外的所有人，占人口九成以上，包括商人、律師、工匠和農民。, example: 班上所有「不是幹部」的同學。 }
    - { term: 共和, plain: 國家的最高領導人不是世襲的國王，而是由選舉或議會產生。, example: 臺灣的總統每四年選一次，不是父傳子。 }
    - { term: 雅各賓派, plain: 革命中最激進的政治俱樂部，主張共和、處死國王，1793–1794 年主導恐怖統治，羅伯斯比是代表人物。, example: 社團裡最堅持「規矩一定要改到底」的那一群人。 }
  primary_source:
    - text: "Louis must die because the nation must live.（路易必須死，因為國家必須活。）"
      from: 羅伯斯比在國民公會的演說，1792 年 12 月 3 日（英譯收於 George Mason 大學 Liberty, Equality, Fraternity 史料網站，原文出自《議會檔案》；中文為本站中譯）
      src: s7
  historiography: |
    **革命留下了什麼？** 《世界歷史百科》認為，革命沒能阻止法國重新落入專制，但廢除封建特權與《人權宣言》是最持久的成果，也塑造了民族國家、西方民主與人權的現代觀念。[s2] 英文維基則指出，革命的許多理念至今仍是法國政治辯論的核心。[s1]
    **恐怖是被環境逼出來的，還是革命理念本身的產物？** 馬克思主義史家 Mathiez 認為恐怖是面對內外戰爭時必要的反應，Soboul 說它是「對失敗的臨時應變」；另一派如 Furet、Tackett 則強調意識形態與對陰謀的恐懼。[s5]
    **怎麼看革命政府對自己國民的暴力？** 以旺代為例：共和派史家長期把鎮壓看成「可惜但必要」，西部的右派政治人物與史家則稱之為種族滅絕；McPhee 認為那是一場充滿暴行的殘酷內戰，不是種族滅絕。[s8]
    **財政上，革命者是亂來嗎？** 經濟史學者 Sargent 與 Velde 認為，許多革命者尊重私有財產、想履行國家債務，指券在戰爭壓力下才逐步失控（見「指券」卡）。[finance-assignats:s3]
  misconceptions:
    - 「革命一開始就要推翻國王」：1789–1791 年的主流目標是君主立憲；是國王 1791 年出逃失敗、1792 年對外開戰之後，共和才成為現實。[s2][s4]
    - 「恐怖統治只發生在巴黎的斷頭台下」：正式死刑判決 16,594 件中只有 2,639 件在巴黎，各地都有鎮壓；連同死在獄中的人，總數估計 3.5 萬到 4.5 萬人。[s5]
  pop_culture:
    - { claim: "「斷頭台是吉約丹醫生發明的，他自己最後也死在斷頭台上。」", fact: "吉約丹是反對死刑的醫生，1789 年 10 月 10 日向國民議會提議用「簡單的機械」斬首，讓死刑更人道；原型是外科醫師 Antoine Louis 設計、德國工匠 Tobias Schmidt 製作，英國、蘇格蘭更早就有類似刑具。吉約丹本人是自然死亡。[s9]", src: [s9] }
    - { claim: "「瑪麗·安東妮聽說百姓沒麵包吃，就說何不食蛋糕。」", fact: "沒有證據顯示她說過。這句話出自盧梭《懺悔錄》第六卷（1765 年寫成），書中只說是「一位大公主」、沒有指名，當時她才 9 歲、還沒到過法國；第一個把它安到她頭上的是 1843 年的 Alphonse Karr。傳記作家 Antonia Fraser 指出，這故事早一百年就被安在路易十四的王后身上。[s10]", src: [s10] }
    - { claim: "「路易十六在斷頭台上發表完整遺言，全場安靜聽完。」", fact: "指揮官下令擊鼓，鼓聲蓋過國王最後的話；他的遺言有神父與劊子手兩種不同版本。[s4]", src: [s4] }
verification: 交叉確認
lens_status: 依公開資料推論，未對照原書
crosscheck: { date: 2026-11-07, by: 獨立查核 agent（未參與寫作）, result: 通過, notes: "1) 重開 s1 英文維基（accessed 改 2026-11-07）：第三等級 610 人（教士 303、貴族 322）、5/5、6/17、網球場宣誓在隔天、7/14、8/26、10/5、1791/6/20 夜出逃、1792/4/20、8/10、1793/1/21、公安委員會 4/6、1795/11 督政府、1799/11/9、1788 年一半收入付債、人口 2,100 萬到 2,800 萬、11/2 沒收教會財產擔保指券、代表中沒有農民或工匠，皆相符。2) s2 WHE：第三等級 578 人（貴族 282、教士 303）、800–1,200 萬人貧困、九月屠殺 1,100–1,400、斷頭台 16,594、總死亡約 4.5 萬、英西荷加入同盟、廢封建與人權宣言是最持久成果、未能阻止專制，皆相符；610／578 兩說並列維持。3) 九月屠殺英文維基寫 1,100–1,600，已並列；共和成立英文維基寫 9/22，改為 9 月 21–22 日並加 s1。4) 哈拉瑞：開 s3 Roy Tang 摘錄，確為《人類大歷史》Chapter 9〈The Arrow of History〉原文，直接寫『Ever since the French Revolution…』與『The entire political history of the world since 1789…』，屬直接談法國大革命的話，保留並改寫成直接引述、來源標題補上章名；依 validate 規則 lens_status 維持『依公開資料推論，未對照原書』。5) s7 d/324 引文逐字相符。6) s5、s6 見恐怖統治卡；s8 McPhee、s9、s10 本次未重開。7) 座標巴黎、凡爾賽、瓦倫、旺代示意點合理。" }
---

## C1 背景

- **財政**：法國為支援美國獨立（1778–1783 年對英作戰）大舉借債；到 1788 年，國家收入約一半用來付債。[s1][s2] 真正的問題是稅收不公、收不上來：教士與貴族享有免稅特權，占人口九成以上的平民負擔大部分稅與勞役。[s1][s2]（詳見「法國王室債務」卡）
- **民生**：人口從 1715 年約 2,100 萬增到 1789 年約 2,800 萬；1785 年起經濟衰退，1787、1788 年歉收，糧價高漲、失業嚴重。[s1] 據估計有 800 萬到 1,200 萬人陷入貧困。[s2]
- **思想**：啟蒙思想讓許多人認為舊政權腐敗、專制。[s2] 地方高等法院又一再擋下稅制改革，國王只好召開三級會議。[s1]

## C2 經過

本卡是 1789–1799 年的全景，各階段另有專卡：

- **1789 年：從三級會議到人權宣言**（見「三級會議」「攻占巴士底」「人權宣言」「婦女進軍凡爾賽」卡）
  - 5 月 5 日：三級會議在凡爾賽召開，這是 1614 年以來第一次。[s1][s2]
  - 6 月 17 日：第三等級自稱國民議會；20 日網球場宣誓。[s2]
  - 7 月 14 日：巴黎群眾攻占巴士底獄。[s1][s2]
  - 8 月 4 日夜裡宣布廢除封建特權；8 月 26 日通過《人權和公民權宣言》。[s2]
  - 10 月 5–6 日：婦女進軍凡爾賽，王室被迫遷往巴黎。[s2][social-womens-march-versailles:s1]
- **1791–1793 年：王權倒台**（見「從逃亡到斷頭台」卡）
  - 1791 年 6 月 20–21 日：王室出逃，在瓦倫被抓回。[s2]
  - 1792 年 4 月 20 日對奧地利宣戰；8 月 10 日王政被推翻；9 月初九月屠殺；9 月 21–22 日國民公會廢除君主制、建立共和（英文維基寫 22 日）。[s1][s2]
  - 1793 年 1 月 21 日：路易十六被送上斷頭台。[s2][s4]
- **1793–1794 年：恐怖統治與內戰**（見「恐怖統治」「旺代戰爭」卡）
  - 1793 年 3 月：旺代因徵兵起事；革命法庭成立；4 月成立公安委員會。[s5][s8]
  - 1793 年 9 月 17 日：《嫌疑犯法》。[s6]
  - 1794 年 7 月 27–28 日：熱月政變，羅伯斯比被處死。[s2][s5]
- **1795–1799 年：督政府到霧月政變**（見「霧月政變」卡）
  - 1795 年：「共和三年憲法」成立督政府。[s2]
  - 1799 年 11 月 9 日：拿破崙發動霧月政變，革命結束。[s1][s2]

## C3 關鍵人物與群體

國王路易十六與王后瑪麗·安東妮；第三等級代表（沒有一個是農民或工匠）；巴黎群眾與婦女；雅各賓派與羅伯斯比；吉倫特派；旺代的農民；最後奪權的拿破崙。[s1][s2][s8] 三級會議第三等級代表數各來源說法不同：英文維基寫 610 人，《世界歷史百科》寫 578 人。[s1][s2]

## C4 制度或機制變化

- **廢除封建特權**：貴族與教士的特權被宣布「完全摧毀」。[s2]
- **人權宣言**：確立人生而自由、權利平等等原則，口號是「自由、平等、博愛」。[s2]
- **沒收教會財產**：1789 年 11 月沒收教會財產，用來擔保新發行的紙幣「指券」。[s1]
- **君主制 → 共和**：1792 年 9 月 21 日建立第一共和。[s1][s2][s4]
- **戰時的非常體制**：1793 年公安委員會掌握幾乎全部行政權，《嫌疑犯法》讓司法成為清除「內部敵人」的工具。[s2][s6]

## C5 受益者與受損者

受益：擺脫封建負擔的農民、取得政治權力的中產階級。[s1][s2] 受損：國王與王室、失去特權與土地的貴族和教會。[s1][s2] 恐怖統治的受害者：正式死刑判決 16,594 件（Greer 估約 1.7 萬人被正式處決），另約 1 萬人死在獄中或未經審判，總數估計 3.5 萬到 4.5 萬人。[s5]《世界歷史百科》同樣寫斷頭台處決 16,594 人、總死亡約 4.5 萬。[s2] 1792 年九月屠殺估計殺死 1,100 到 1,400 名囚犯（英文維基寫 1,100 到 1,600 名）。[s2][s1] 旺代戰爭的死亡估計，近年較被接受的是起事方最多約 17 萬、共和軍約 3 萬。[s8]

## C6 直接結果

法國從 1792 年起捲入長達十年的革命戰爭；處決國王後，英國、西班牙、荷蘭也加入反法同盟。[s2] 政局在激進與反動之間擺盪，最後由軍人拿破崙掌權，1804 年稱帝。[s1][s2]

## C7 長期影響

革命的許多理念被視為自由民主的基本原則，至今仍是法國政治辯論的核心。[s1] 它激勵了世界各地的革命，影響了民族國家、西方民主與人權觀念的形成；最持久的成果是廢除封建特權與《人權宣言》。[s2] 但它也沒能阻止法國重新落入專制。[s2]

## C8 雙軌解讀

### 李彔

無直接論述：查到的李彔公開講稿與書評沒有專談法國大革命。

### 哈拉瑞

哈拉瑞在《人類大歷史》直接提到法國大革命：他說從法國大革命以來，世界各地的人漸漸把「平等」和「個人自由」都當成基本價值，但這兩個價值互相矛盾——要保障平等，就得限制比較富裕的人的自由；要讓每個人想做什麼就做什麼，又一定會犧牲平等。[s3] 他說：「1789 年以來的整部世界政治史，可以看成一連串想要調和這個矛盾的嘗試。」[s3]（字句轉引自讀書摘錄的英文原文，未對照紙本書。）

## C9 今日對照鉤子

「財政危機 → 召開代表會議 → 失控」：政府為了加稅而召集民意代表，代表卻反過來要求改變權力規則。[s1][s2] 也可思考「理想口號與實際暴力」並存：同一場革命寫下《人權宣言》，也發生恐怖統治。[s2][s5]

## C10 不可類比的差異

18 世紀法國是農業社會、多數人不識字，政治參與靠群眾上街與俱樂部，而不是今天的選舉、政黨與媒體制度。[s1][s2] 連第三等級代表裡都沒有農民或工匠，當時所謂「人民代表」和今天普選產生的代表並不相同。[s1] 哈拉瑞所說的「自由與平等的矛盾」是事後的詮釋框架，不代表當時的人就是這樣理解自己的處境。[s3]
