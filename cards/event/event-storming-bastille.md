---
id: event-storming-bastille
type: event
name: 攻佔巴士底與八月四日之夜（1789）
aliases: [攻佔巴士底, 攻占巴士底獄, 巴士底, Storming of the Bastille, Bastille, 大恐慌, Great Fear, Grande Peur, 八月四日之夜, 八月法令, August Decrees, 廢除封建制度, 法國國慶日, 7月14日, 攻占巴士底狱]
civilization: [法國]
track: west
time:
  start: 1789
  end: 1789
  precision: exact
  src: [s1, s2]
summary_line: 大事｜城市／都會｜巴黎｜攻佔巴士底與八月四日之夜（1789）
place:
  primary_field: 城市／都會
  secondary_fields: [宮廷／政治中心]
  locations:
    - { name_ancient: 巴士底要塞（監獄）, name_modern: 巴黎巴士底廣場（法國）, lat: 48.8532, lng: 2.3692, precision: exact, role: 1789 年 7 月 14 日被群眾攻下，之後被拆除, src: [s1] }
    - { name_ancient: 傷兵院（Hôtel des Invalides）, name_modern: 巴黎傷兵院（法國）, lat: 48.8550, lng: 2.3125, precision: exact, role: 當天早上群眾先在這裡搶到數萬支步槍, src: [s1] }
    - { name_ancient: 凡爾賽, name_modern: 凡爾賽（法國）, lat: 48.8049, lng: 2.1204, precision: schematic, role: 國民議會開會處，8 月 4 日夜裡宣布廢除封建特權（座標為市區）, src: [s2] }
  scale: area
structure_tags: [革命與政權更替, 突變事件, 合法性危機]
topics: [革命, 民變與抗爭, 土地制度, 身分制度, 稅收]
links: [event-french-revolution, event-estates-general-1789, event-declaration-rights-of-man, social-womens-march-versailles, person-louis-xvi, finance-french-royal-debt]
causes:
  - { id: event-estates-general-1789, rel: 促成, why: 第三等級自稱國民議會後，國王調兵到巴黎附近、7 月 11 日罷免內克，巴黎人擔心議會要被武力解散，於是武裝起來。, src: [s1, s3] }
effects:
  - { id: event-declaration-rights-of-man, rel: 促成, why: 巴黎起事與鄉間的大恐慌逼得國民議會在 8 月 4 日夜裡廢除封建特權，接著在 8 月 26 日通過《人權和公民權宣言》。, src: [s2, s1] }
  - { id: social-womens-march-versailles, rel: 背景, why: 國王遲遲不肯批准八月法令與人權宣言，加上麵包短缺，10 月巴黎婦女進軍凡爾賽，逼國王接受。, src: [s5] }
counterparts: "無適當對照：本站中國軌沒有「首都群眾攻下象徵王權的監獄、隨後議會一夜廢除身分特權」的對應卡；辛亥革命的武昌起義是新軍兵變，性質不同，不硬湊。"
sources:
  - { id: s1, title: "Storming of the Bastille — Wikipedia", url: "https://en.wikipedia.org/wiki/Storming_of_the_Bastille", accessed: 2026-11-07, tier: 百科 }
  - { id: s2, title: "Decree of the National Assembly Abolishing the Feudal System, 11 August 1789 — Liberty, Equality, Fraternity, George Mason University", url: "https://revolution.chnm.org/d/281", accessed: 2026-11-07, tier: 一手 }
  - { id: s3, title: "Jacques Necker — Wikipedia", url: "https://en.wikipedia.org/wiki/Jacques_Necker", accessed: 2026-11-07, tier: 百科 }
  - { id: s4, title: "Estates General of 1789 — Wikipedia", url: "https://en.wikipedia.org/wiki/Estates_General_of_1789", accessed: 2026-11-07, tier: 百科 }
  - { id: s5, title: "Women's March on Versailles — Wikipedia", url: "https://en.wikipedia.org/wiki/Women%27s_March_on_Versailles", accessed: 2026-11-07, tier: 百科 }
  - { id: s6, title: "Harrison W. Mark, Storming of the Bastille — World History Encyclopedia（2022-05-02）", url: "https://www.worldhistory.org/Storming_of_the_Bastille/", accessed: 2026-11-07, tier: 通論 }
importance: 3
learn:
  histories: [歐洲史]
  perspectives:
    - { history: 歐洲史, text: "從歐洲史看，巴黎平民第一次用武力保護議會、對抗國王的軍隊，「人民起來就能改變政局」從此成為歐洲政治的新可能。[s1]" }
  why_care: 7 月 14 日是法國國慶日，但那天攻下的巴士底裡其實只關了 7 個人；它為什麼還會變成自由的象徵，正好說明「象徵」在革命裡有多重要。[s1]
  story: |
    1789 年 7 月 11 日，路易十六罷免了受歡迎的財政總監內克，消息隔天傳到巴黎。[s1][s3] 律師德穆蘭在王宮廣場對上萬人喊話，說國王的外國傭兵要來屠殺大家，快拿起武器。[s1] 7 月 14 日早上，群眾先衝進傷兵院搶到 3 萬多支步槍，卻沒有火藥；火藥早就被搬到巴士底。[s1][s6] 巴士底的守軍只有 114 人，群眾圍攻到下午，攻擊的一方大約死了近百人，司令德洛奈投降後被殺。[s1][s6] 裡面只關了 7 個犯人：4 個偽造犯、1 個精神病人、1 個 30 多年前想刺殺路易十五的人，和 1 個被家人要求關起來的年輕貴族。[s1][s6] 消息傳到鄉下，7 月 20 日到 8 月 5 日爆發「大恐慌」，農民攻擊領主的莊園。[s1] 8 月 4 日夜裡，國民議會宣布「完全廢除封建制度」。[s2]
  key_terms:
    - { term: 巴士底, plain: 巴黎東邊的一座中世紀要塞，後來當國王的監獄，國王可以不經審判就把人關進來。, example: 像學校裡一間「不用理由就能把人關進去」的房間，大家看到它就想到校長的特權。 }
    - { term: 大恐慌（Grande Peur）, plain: 1789 年夏天在鄉間流傳「貴族要派土匪來燒糧食」的謠言，農民恐慌之下反過來攻擊領主莊園、燒掉地租帳冊。, example: 群組裡一則假消息說「明天要停水」，大家搶光超市的水。 }
    - { term: 封建特權, plain: 領主向農民收地租、勞役、什一稅，貴族和教士少繳國家的稅等制度。, example: 學長可以叫學弟跑腿、還不用交班費，只因為他是學長。 }
  primary_source:
    - text: "The National Assembly hereby completely abolishes the feudal system.（國民議會在此完全廢除封建制度。）"
      from: 〈國民議會廢除封建制度法令〉第 1 條，1789 年 8 月 11 日（英譯引自 George Mason 大學 Liberty, Equality, Fraternity 史料網站；中文為本站中譯）
      src: s2
  historiography: |
    **巴士底重要在哪裡？** 一種看法把 7 月 14 日當作革命真正的開始：巴黎人第一次以武力對抗國王的軍隊，國王之後不得不承認新的市政府與國民衛隊。[s1] 但英文維基整理的看法也指出，巴士底到 1789 年已沒什麼軍事價值，原本就計畫拆除；史家 Ian Davidson 認為國王在凡爾賽向第三等級讓步，才更有資格被當作革命的奠基事件。[s1]
    **八月四日是真心還是被逼？** 這道法令是在一份報告各省動盪的報告之後，於夜間會議的熱烈氣氛中通過，之後幾天才寫成正式條文，並修改、擴充了當晚的決定；[s2] 什一稅以外的許多負擔還要農民「贖買」才能免除，說明廢除並不徹底。[s2]
  misconceptions:
    - 「巴士底裡關滿政治犯」：當天裡面只有 7 個犯人：4 個偽造犯、1 個被家人要求關押的愛爾蘭裔精神病人、1 個 30 多年前企圖刺殺路易十五的人，以及 1 個因家人要求被關的年輕貴族（伯爵）。[s1][s6]
    - 「群眾攻巴士底是為了救人」：群眾主要是為了裡面存放的火藥，並要求撤下對著街道的大砲。[s1]
  pop_culture:
    - { claim: "許多畫作與電影把巴士底畫成高聳入雲、壓在城市上方的黑色巨塔。", fact: "英文維基引用 2013 年的分析，巴士底的高度其實和附近建築差不多；畫作誇大了它的高度，是革命宣傳把它塑造成專制象徵。[s1]", src: [s1] }
    - { claim: "常聽說攻下巴士底後，國王才知道「這是一場革命」。", fact: "維基與 WHE 都記載拉羅什富科公爵對路易十六說：「不，陛下，這是革命。」WHE 轉引自史家 Schama 的書；這是事後轉述的名言，公爵是誰（拉羅什富科或拉羅什富科-利昂庫爾）、字句版本都不一。[s1][s6]", src: [s1, s6] }
lens_status: 無直接論述
verification: 交叉確認
crosscheck: { date: 2026-11-07, by: 獨立查核 agent（未參與寫作）, result: 通過, notes: "1) 新增通論來源 s6：WHE（Harrison W. Mark, 2022），已打開核對：傷兵院搶到 3 萬多支步槍、守軍 82 名傷兵＋32 名瑞士兵、7 名犯人（4 偽造犯、1 愛爾蘭精神病人、1 刺殺路易十五未遂者、1 被家人要求關押的年輕貴族）、德穆蘭 7 月 12 日演說、拉羅什富科「不，陛下，這是革命」（WHE 轉引 Schama）。2) 傷亡：維基正文 98／1 且條目前後不一；WHE 寫 82 人當場死、15 人後來傷重不治、未給守軍數。story 改為「攻擊的一方大約死了近百人」，C2 並列兩來源，守軍死亡數改寫為來源不足。3) story 的犯人組成原寫「2 個精神病人」與 misconceptions 不一致，已依 WHE 改正。4) 拉羅什富科名言補註公爵身分與字句版本不一。5) 座標巴士底、傷兵院誤差 <1 km。WebFetch 共用額度在查核中途用盡（實際打開 5 個來源：chnm d/324 羅伯斯比 1792-12-03 演說、chnm d/331 王后 1791-09-08 信、WHE〈Storming of the Bastille〉、Minneapolis Fed 的 Sargent & Velde 文章、chnm d/780 時間軸），其餘未能重開維基逐句核對。八月法令 s2 字句未重開對照。" }
images:
- url: https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Prise_de_la_Bastille.jpg/960px-Prise_de_la_Bastille.jpg
  page: https://commons.wikimedia.org/wiki/File:Prise_de_la_Bastille.jpg
  title: 攻占巴士底監獄
  creator: 尚－皮耶・烏埃爾（Jean-Pierre Houël）
  year: 1789
  holder: 法國國家圖書館
  license: Public domain（PD-Art／PD-old-100-1923；2026-11-10 已核對 Commons 檔案頁）
  caption: 1789 年 7 月 14 日當年畫的水彩：巴黎群眾攻進巴士底監獄，畫面中央是被逮捕的典獄長德洛奈。
---

## C1 背景

國民議會成立後，國王把軍隊調到巴黎與凡爾賽附近；[s4] 1787–88 年冬天糧價飆升，巴黎人生活困苦。[s3] 7 月 11 日國王罷免內克並改組內閣，12 日消息傳到巴黎，被看成要以武力解散議會的訊號。[s1][s3]

## C2 經過

- **7 月 12 日**：德穆蘭在王宮廣場（Palais-Royal）對上萬名群眾喊話，說瑞士與德意志傭兵要來屠殺，呼籲拿起武器。[s1][s6]
- **7 月 14 日早上**：群眾攻入傷兵院，拿到 2.9 萬到 3.2 萬支步槍，但沒有火藥與子彈；傷兵院司令早已把 250 桶火藥移到巴士底。[s1]
- **7 月 14 日下午**：群眾圍攻巴士底，要求交出武器火藥、撤下城牆上的大砲。守軍共 114 人（82 名退伍傷兵與 32 名瑞士兵），城牆上有 18 門 8 磅砲與 12 門小砲。[s1][s6] 司令德洛奈投降後被拖往市政廳途中殺死。[s1]
- **傷亡**：各說不一。英文維基正文寫攻擊者死 98 人、守軍 1 人（同條目其他段落數字不一致）；[s1] WHE 寫 82 名攻擊者當場死亡、之後又有 15 人傷重不治，沒有給守軍死亡數。[s6] 本卡只說「攻擊者近百人死亡」，守軍死亡數來源不足。
- **之後**：拉法葉被選為巴黎民兵（後來的國民衛隊）司令，巴伊（Bailly）成為巴黎市長；7 月 27 日拉法葉在紅藍帽徽上加了白色，成為三色徽。[s1]
- **7 月 20 日–8 月 5 日**：大恐慌在鄉間蔓延，農民攻擊有錢地主與城堡。[s1]
- **8 月 4–5 日夜**：國民議會在夜間會議中投票廢除封建制度，條文在 8 月 11 日定案。[s2]

## C3 關鍵人物與群體

- **巴黎群眾**：工匠、商販、退伍軍人與倒戈的法蘭西衛隊士兵。[s1]
- **德穆蘭**：在王宮廣場鼓動群眾的年輕律師。[s1]
- **德洛奈**：巴士底司令，投降後被殺。[s1]
- **拉法葉、巴伊**：分別接掌國民衛隊與巴黎市政。[s1]
- **農民**：在大恐慌中攻擊莊園，逼議會處理封建負擔。[s1][s2]

## C4 制度或機制變化

八月法令規定：封建制度「完全廢除」；什一稅廢除（其他負擔則可贖買）；司法與市政官職的買賣立即停止、司法免費；繳稅的金錢特權「永遠廢除」；所有公民不分出身都能擔任任何官職。[s2] 巴黎則出現新的市政府與國民衛隊，武力不再只掌握在國王手上。[s1]

## C5 受益者與受損者

受益：擺脫什一稅與部分封建負擔的農民、能憑才能擔任官職的平民。[s2] 受損：收地租與勞役的領主、買了官位的人（官位不能再買賣）、享有免稅特權的貴族與教士。[s2] 守軍與攻擊者都有人喪命。[s1]

## C6 直接結果

國王不得不承認巴黎的新政府，並召回內克（7 月 16 日的信）。[s3] 一年後的 1790 年 7 月 14 日舉行聯盟節，今天的法國國慶同時紀念這兩件事。[s1] 國王對八月法令只批准一部分，直到 10 月 5 日婦女進軍凡爾賽，當天傍晚才宣布無條件接受。[s5]

## C7 長期影響

巴士底成為「推翻專制」的象徵，1789 年起由承包商帕盧瓦雇用約千名工人在五個月內拆除，石塊還被做成紀念品。[s1] 「不分出身、人人可擔任公職」與「稅不因身分而有特權」的原則，成為之後法國法律的基礎。[s2]

## C8 雙軌解讀

### 李彔

無直接論述

### 哈拉瑞

無直接論述

## C9 今日對照鉤子

結構：一個實際用途不大、卻象徵某種權力的建築，被群眾攻下後成為整場運動的代表畫面；象徵的力量比實際的軍事或政治效果更持久。[s1] 今天許多社會運動也會圍繞某個象徵地點；這裡只描述結構，不預測。

## C10 不可類比的差異

1789 年的巴黎沒有警察體系與即時通訊，消息靠口耳與傳單在一兩天內傳開，謠言（例如大恐慌）也因此特別容易擴散；[s1] 當時國王的軍隊是否會開槍、議會是否會被解散，都沒有憲法程序可以處理，這與今天法治國家的抗議活動不能直接類比。[s1][s4]
