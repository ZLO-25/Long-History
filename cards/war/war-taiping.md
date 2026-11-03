---
id: war-taiping
type: war
name: 太平天國（1851–1864年）
aliases: [太平天國之亂, 洪秀全, 太平軍, 金田起義, 天京, 曾國藩, 湘軍, 天京事變, Taiping Rebellion, Taiping Heavenly Kingdom, Taiping Civil War, 太平天国]
civilization: [中國（清）]
track: china
time:
  start: 1851
  end: 1864
  precision: approx
  src: [s1, s2]
summary_line: 戰爭｜戰場｜廣西金田、南京（天京）｜太平天國（1851–1864年）
place:
  primary_field: 戰場
  secondary_fields: [宮廷／政治中心]
  locations:
    - { name_ancient: 金田村（廣西桂平）, name_modern: 廣西桂平市金田鎮（中國）, lat: 23.47, lng: 110.08, precision: schematic, role: 1850 年底至 1851 年初起事、擊敗清軍的地方, src: [s1] }
    - { name_ancient: 天京（江寧）, name_modern: 南京（中國江蘇）, lat: 32.06, lng: 118.78, precision: schematic, role: 1853 年攻下後定為首都，1864 年被湘軍攻破, src: [s1] }
  scale: area
structure_tags: [宗教／意識形態動員, 合法性危機, 精英內鬥, 快速擴張]
topics: [內戰, 民變與抗爭, 宗教, 土地制度]
links: [war-opium-war, event-self-strengthening, finance-shanxi-piaohao, war-american-civil-war, event-warlord-era]
causes:
  - { id: war-opium-war, rel: 背景, why: 鴉片戰爭帶來的社會與經濟壓力削弱了清朝的正當性，成為太平天國等民變的背景之一。, src: [war-opium-war:s1, war-opium-war:s2] }
effects:
  - { id: event-self-strengthening, rel: 促成, why: 外有列強、內有太平軍，朝廷急需新式武器保住政權，曾國藩、李鴻章等平亂的大員於是開始買洋槍、辦兵工廠。, src: [s1, event-self-strengthening:s1] }
  - { id: finance-shanxi-piaohao, rel: 促成, why: 戰爭後清廷常靠票號在各省之間匯解稅款和軍費，票號生意因此擴大，也越來越依賴政府。, src: [finance-shanxi-piaohao:s1] }
  - { id: event-warlord-era, rel: 背景, why: 有學者認為平亂靠的是地方自募的湘軍、淮軍，兵權從此落到地方，埋下後來軍閥的種子；也有學者不同意。, src: [s1], disputed: true }
counterparts:
  - { id: war-american-civil-war, note: "相似：同在 1860 年代前半，一個大國內部打了多年內戰，結果都由原政權獲勝、國家沒有分裂。不同：太平天國由宗教運動起家、死亡人數以千萬計，主要死於饑荒與疫病；美國南北戰爭的核心是奴隸制與州權。", src: [s1, s2] }
sources:
  - { id: s1, title: "Taiping Rebellion — Wikipedia", url: "https://en.wikipedia.org/wiki/Taiping_Rebellion", accessed: 2026-11-02, tier: 百科 }
  - { id: s2, title: "The Taiping Rebellion, 1850–1864 — Asia for Educators, Columbia University", url: "https://afe.easia.columbia.edu/special/china_1750_taiping.htm", accessed: 2026-11-02, tier: 學術 }
  - { id: s3, title: "天朝田畝制度 — 維基百科（中文）", url: "https://zh.wikipedia.org/wiki/天朝田亩制度", accessed: 2026-11-02, tier: 百科 }
importance: 3
learn:
  histories: [中國史]
  why_care: 一個考不上科舉的讀書人，自稱是耶穌的弟弟，帶出一場死了兩三千萬人的內戰，還改變了清朝的權力結構。
  story: |
    洪秀全是廣東的客家人，科舉考了好幾次都沒考上（中間還大病一場、看見異象），後來讀了傳教士的基督教小冊子，認定自己是上帝的兒子、耶穌的弟弟。[s1][s2] 1851 年初，他的信徒在廣西金田打敗清軍，宣布建立「太平天國」。[s1] 太平軍一路北上又沿長江東下，1853 年攻下南京，改名「天京」。[s1] 他們禁鴉片、禁纏足、男女分營，還提出「有田同耕、有飯同食」的理想，但這套田畝制度從沒有真正實施。[s1][s3] 1856 年領導層內鬨，東王楊秀清被殺，太平天國由盛轉衰。[s1] 曾國藩不靠朝廷正規軍，從湖南鄉村招募、自己發餉訓練的湘軍步步進逼，1864 年攻破天京。[s1] 這場戰爭常見的估計是死了 2,000 萬到 3,000 萬人[s1][s2]，大多死於饑荒和疫病。[s1]
  key_terms:
    - { term: 天京事變, plain: 1856 年太平天國領導人之間的內鬨與屠殺，東王楊秀清和他的部屬被殺。, example: 就像一個團隊還沒打贏比賽，隊長和副隊長就先翻臉，整隊從此走下坡。 }
    - { term: 湘軍, plain: 曾國藩繞過朝廷原本的正規軍，從湖南鄉村招募、自己發餉訓練的軍隊。, example: 學校的正式校隊打不贏，最後靠學長自己找人、自己出錢組的隊伍上場。 }
    - { term: 天朝田畝制度, plain: 太平天國 1853 年公布的土地與社會藍圖，把田地分等、打算平均分配。, example: 「有田同耕，有飯同食」是很好聽的口號，但寫在紙上不等於真的做得到。 }
  primary_source:
    - { text: 有田同耕，有飯同食，有衣同穿，有錢同使，無處不均勻，無人不飽暖。, from: 《天朝田畝制度》（1853 年；轉引自維基百科「天朝田畝制度」條）, src: s3 }
  historiography: |
    **叫它「叛亂」、「革命」還是「內戰」？** 中國共產黨的史家依照毛澤東的看法，把它視為早期的農民革命；簡又文稱之為「太平天國革命運動」，奧斯特哈默（Osterhammel）也因為它的激進目標稱它為革命。[s1] 梅爾清（Tobie Meyer-Fong）、裴士鋒（Stephen Platt）則認為「太平天國之亂」是站在清朝一方的說法，主張稱為內戰。[s1]
    **平亂之後的清朝是變強還是變弱？** 有學者認為地方自募的軍隊讓兵權下放，後來成為軍閥割據的源頭（Franz Michael）；Diana Lary 等學者則反對這條直線關係。[s1] 哥倫比亞大學的教材強調，即使到 1950 年代，華中部分地區都還沒從這場浩劫中完全恢復。[s2]
  misconceptions:
    - 太平天國的「有田同耕」並沒有真的實行：《天朝田畝制度》從沒有在它統治的地區正式施行。[s3]
    - 死亡人數不是精確統計：2,000 萬到 3,000 萬是最常見的估計，也有學者估得更高，而且大多數人死於饑荒和疫病，不是戰場。[s1]
crosscheck:
  date: 2026-11-02
  by: 獨立查核 agent（未參與寫作）
  result: 通過
  notes: 已開啟英文維基、哥大 AFE、中文維基（天朝田畝制度）及鴉片戰爭、票號、自強運動卡的來源逐句核對；AFE 未提耶穌之弟與饑荒疫病，改為只標 s1，湘軍「同鄉同族、士紳帶領」來源未寫，改為「從湖南鄉村招募、自己發餉」。洪秀全第三次落榜年份兩來源不一（1837／1847），卡片不寫；平亂→軍閥割據維持 disputed。
verification: 交叉確認
lens_status: 無直接論述
summary_card: true
---

## A2 起因：結構與導火線

**結構**：19 世紀中葉的清朝人口壓力大、又剛在鴉片戰爭中戰敗，國力與正當性都受到挑戰。[s1][s2] 太平軍最早吸收的是貧窮與被排擠的人。[s2]

**導火線**：屢試不第的洪秀全讀了基督教小冊子後自認為耶穌之弟，創立拜上帝的宗教團體；1850 年底到 1851 年初在廣西金田擊敗清軍，1851 年 1 月 11 日宣布建立太平天國。[s1]

## A8 結果

清朝獲勝。1856 年天京事變後太平天國由盛轉衰；1864 年 6 月洪秀全在圍城中死去，7 月天京被湘軍攻破，最後一支太平軍到 1871 年才被消滅。[s1] 平亂主要靠曾國藩的湘軍（約 13 萬人）、李鴻章的淮軍，以及由西方軍官指揮、保衛上海的「常勝軍」。[s1] 最常見的死亡估計是 2,000 萬到 3,000 萬人。[s1][s2]

## A9 長期影響

兵權與財權下放到地方大員與士紳團練手中，湖南籍官員地位大增：1865 年全國八位總督中有五位是湖南人。[s1] 戰後自強運動起步。[s1] 有學者認為地方軍隊後來演變成軍閥，但也有學者反對。[s1] 華中部分地區直到 1950 年代都還沒有完全恢復。[s2]
