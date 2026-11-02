---
id: event-eunuchs-partisan
type: event
name: 東漢宦官、外戚與黨錮之禍（2世紀）
aliases: [黨錮之禍, 党锢之祸, 黨錮, 宦官專權, 東漢宦官, 外戚專權, 十常侍, 賣官, 梁冀, 李膺, Disasters of the Partisan Prohibitions, Partisan Prohibitions, Ten Attendants]
civilization: [中國（東漢）]
track: china
time:
  start: 159
  end: 189
  precision: exact
  src: [s1, s2]
summary_line: 大事｜宮廷／政治中心｜洛陽（今河南洛陽）｜東漢宦官、外戚與黨錮之禍（2世紀）
place:
  primary_field: 宮廷／政治中心
  secondary_fields: [思想場域]
  locations:
    - { name_ancient: 雒陽, name_modern: 洛陽（中國）, lat: 34.68, lng: 112.45, precision: schematic, role: 東漢首都、宮廷與太學所在, src: [s1] }
  scale: point
structure_tags: [精英內鬥, 合法性危機, 思想異見與審判]
topics: [言論與思想管制, 儒家, 帝國的衰亡]
links: [event-eastern-han-founding, event-yellow-turban, event-three-kingdoms, event-confucian-orthodoxy]
causes:
  - { id: event-eastern-han-founding, rel: 背景, why: 光武帝規定內宮侍從一律用宦官，宦官成了天天圍在皇帝身邊的群體；後來皇帝年幼，就容易靠宦官對抗外戚。, src: [event-eastern-han-founding:s3, s1], disputed: true }
  - { id: event-confucian-orthodoxy, rel: 背景, why: 漢代以儒學取士、設太學，培養出一大批以儒家道德自居的官員與太學生，他們成了反對宦官的主力。, src: [s1, s3] }
effects:
  - { id: event-yellow-turban, rel: 促成, why: 靈帝倚賴宦官、公開賣官，貪官加重剝削，朝廷失去民心，為黃巾起事提供了土壤。, src: [s2] }
  - { id: event-three-kingdoms, rel: 背景, why: 黨錮讓一批士人轉入地下互相聯絡，袁紹等人後來成為割據一方的勢力；朝廷與士人的決裂削弱了東漢的統治。, src: [s1, event-three-kingdoms:s1], disputed: true }
counterparts: 無適當對照：西方軌目前沒有以「宮廷近侍集團與士大夫對抗」為主題的卡。
sources:
  - { id: s1, title: "Disasters of the Partisan Prohibitions — Wikipedia", url: "https://en.wikipedia.org/wiki/Disasters_of_the_Partisan_Prohibitions", accessed: 2026-11-02, tier: 百科 }
  - { id: s2, title: "Emperor Ling of Han — Wikipedia", url: "https://en.wikipedia.org/wiki/Emperor_Ling_of_Han", accessed: 2026-11-02, tier: 百科 }
  - { id: s3, title: "范曄《後漢書·黨錮列傳》（中國哲學書電子化計劃）", url: "https://ctext.org/hou-han-shu/dang-gu-lie-zhuan", accessed: 2026-11-02, tier: 一手 }
importance: 2
learn:
  histories: [中國史]
  why_care: 皇帝身邊的人比宰相還有權，批評的讀書人一個個被抓：這是東漢從內部爛掉的過程，也是三國故事的開場。
  story: |
    東漢中期以後，皇帝常常年紀很小就即位，大權落到太后的家族（外戚）手上。[s1] 159 年，漢桓帝靠五個宦官發動政變，除掉權傾一時的外戚梁冀；宦官因此得到高位，開始貪污弄權。[s1] 儒家官員和洛陽的太學生聯合起來批評宦官。166 年，宦官指控李膺等人結黨，約兩百人被捕，「黨人」這個罪名就是這樣來的。[s1] 168 年，外戚竇武和大臣陳蕃想剷除宦官，計畫失敗，陳蕃被殺、竇武自殺；隔年宦官說服年幼的漢靈帝說黨人要造反，再抓、再殺，約百人死亡，其他人只能四處躲藏。[s1] 靈帝還稱宦官張讓是「我父」，178 年起公開賣官。[s2] 直到 184 年黃巾起事，朝廷怕黨人投向叛軍，才解除禁令。[s1][s2]
  key_terms:
    - { term: 外戚, plain: 皇后或太后的娘家親戚。, example: 老闆不在時，老闆娘的哥哥跑來管公司。 }
    - { term: 宦官, plain: 在宮廷內服侍皇帝和后妃的閹人，因為天天在皇帝身邊，容易掌權。, example: 天天幫校長跑腿的助理，最後比主任還有影響力。 }
    - { term: 黨錮, plain: 把被指為「結黨」的人禁止做官，甚至抓捕殺害。, example: 學校把常常發言批評校方的學生全列入黑名單，不准當幹部。 }
  primary_source:
    - { text: 逮桓靈之閒，主荒政繆，國命委於閹寺，士子羞與為伍，故匹夫抗憤，處士橫議。, from: 范曄《後漢書·黨錮列傳》序, src: s3 }
  historiography: |
    **一場正邪之爭？** 《後漢書》站在士人一方，把黨錮寫成正直的讀書人對抗腐敗宦官。[s3] 現代整理也大多沿用這個框架，強調儒家官員與太學生對宦官專權的抵抗。[s1]
    **還是權力鬥爭？** 但事件裡也看得到外戚（竇武）和宦官爭奪皇帝的控制權，官員一方同樣在結盟、動員輿論；第一次黨錮的導火線，其實是李膺不理會大赦、處死殺人犯一家。[s1] 也有記載顯示宦官並非鐵板一塊，呂強就主張赦免黨人。[s1][s2]
  misconceptions:
    - 「宦官都是壞人」：靈帝時的宦官呂強就勸皇帝赦免黨人，後來被誣告謀反而自殺。[s1][s2]
crosscheck:
  date: 2026-11-02
  by: 獨立查核 agent（未參與寫作）
  result: 通過
  notes: "核對 s1、s2（英文維基黨錮、漢靈帝條）：159誅梁冀、166約二百人被捕、169約百人被殺、178賣官可分期、184呂強建議解禁均有據。改正：竇武是自殺非被殺；呂強是被誣後自殺；第二次黨錮後倖存者改為「四處躲藏」。對光武帝與三國的兩條因果仍屬詮釋，標 disputed。s3《後漢書》序文未重開。"
verification: 交叉確認
lens_status: 無直接論述
summary_card: true
---

## C1 背景

東漢皇帝多幼年即位，外戚與宦官輪流掌權；159 年桓帝借五名宦官之力誅殺外戚梁冀，宦官從此得勢。[s1] 儒家官員與太學生結成聯盟，公開批評宦官。[s1][s3]

## C2 經過

166 年第一次黨錮：李膺不顧大赦處死殺人犯一家，宦官反控他結黨，約二百人被捕，次年釋放但終身禁錮。[s1] 168 年竇武、陳蕃謀誅宦官失敗，陳蕃被殺、竇武自殺；169 年第二次黨錮，李膺、杜密、范滂等約百人被殺。[s1] 178 年起靈帝公開賣官。[s2] 184 年黃巾起事，靈帝接受呂強建議解除黨禁。[s1][s2]

## C4 制度或機制變化

官職可以用錢買、甚至分期付款，選官制度被破壞；被列為黨人的士人失去做官資格。[s1][s2]

## C6 直接結果

朝廷失去士人與百姓的信任；地下聯絡網中出身的袁紹等人，日後成為東漢末年的重要勢力。[s1][s2]
