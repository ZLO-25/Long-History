---
id: commodity-roman-concrete
type: commodity
name: 羅馬混凝土（火山灰）
aliases: [羅馬混凝土, Roman concrete, 火山灰水泥, 波佐利火山灰, pozzolana, 自癒混凝土, opus caementicium, 罗马混凝土]
civilization: [古羅馬]
track: west
time:
  start: -150
  end: 400
  precision: approx
  src: [s1]
summary_line: 物資｜工業／製造區｜那不勒斯灣火山灰產地｜羅馬混凝土（火山灰）
place:
  primary_field: 工業／製造區
  secondary_fields: [資源產地]
  locations:
    - { name_ancient: 普泰奧利, name_modern: 波佐利（義大利）, lat: 40.82583, lng: 14.12174, pleiades_id: "432815", precision: schematic, role: 「波佐利火山灰」（pozzolana）名稱來源地區 }
    - { name_ancient: 巴亞, name_modern: 巴亞（義大利）, lat: 40.81736, lng: 14.07027, pleiades_id: "432716", precision: schematic, role: 可能最早的水下港口混凝土結構所在地區（前 2 世紀末） }
    - { name_ancient: 普里韋爾努姆, name_modern: 普里韋爾諾附近（義大利）, lat: 41.49076, lng: 13.18513, pleiades_id: "433052", precision: exact, role: 2023 年自癒研究的樣本出土地 }
    - { name_ancient: 萬神殿, name_modern: 羅馬（義大利）, lat: 41.8986, lng: 12.47682, pleiades_id: "128044615", precision: exact, role: 最大的無鋼筋混凝土穹頂 }
  scale: area
structure_tags: [技術代差, 默會知識外流, 標準化量產, 基礎建設網絡]
topics: [古代建築]
links: [building-pantheon, building-colosseum, building-roman-aqueducts, commodity-amphora-trade]
effects:
  - { id: building-pantheon, rel: 促成, why: 混凝土可以一層層鋪砌，越往上換用越輕的凝灰岩與浮石，才蓋得出萬神殿這種無鋼筋的超大穹頂。, src: [s1, s2] }
  - { id: building-colosseum, rel: 背景, why: 競技場深約 6 公尺的地基與拱頂都用混凝土和輕質浮石，混凝土技術讓這種巨型公共建築可行。, src: ["building-colosseum:s1", "building-colosseum:s2"] }
counterparts: "無適當對照：中國卡沒有專門談建材技術的卡；秦漢長城與秦直道使用的夯土是另一種工法，但沒有獨立成卡，硬配會失準。"
sources:
  - { id: s1, title: "Roman concrete — Wikipedia", url: "https://en.wikipedia.org/wiki/Roman_concrete", accessed: 2026-10-24, tier: 百科 }
  - { id: s2, title: "Riddle solved: Why was Roman concrete so durable? — MIT News (2023-01-06)", url: "https://news.mit.edu/2023/roman-concrete-durability-lime-casts-0106", accessed: 2026-10-24, tier: 通論 }
  - { id: s3, title: "Monte Testaccio — Wikipedia", url: "https://en.wikipedia.org/wiki/Monte_Testaccio", accessed: 2026-10-24, tier: 百科 }
  - { id: s4, title: "維特魯威《建築十書》2.6（Vitruvius, Ten Books on Architecture），Gwilt 英譯 — Lexundria", url: "https://lexundria.com/vitr/2.6/gw", accessed: 2026-11-12, tier: 一手 }
  - { id: s5, title: "Masic, Seymour 等，Hot mixing: Mechanistic insights into the durability of ancient Roman concrete — Science Advances 9(1), 2023（MIT DSpace 記錄）", url: "https://dspace.mit.edu/handle/1721.1/147056", accessed: 2026-11-12, tier: 學術 }
learn:
  histories: [希臘羅馬史, 科技史]
  why_care: 羅馬人用火山灰做出能在水裡變硬的混凝土，蓋出兩千年後還立著的穹頂與港口；2023 年的研究又替這個老問題提出新答案。[s1][s4][s5]
  story: |
    羅馬人蓋大型建築，有個關鍵材料叫火山灰，名字來自那不勒斯灣的波佐利一帶。[s1] 建築師維特魯威說，那一帶的沙子和石灰、碎石混合後，不但在建築裡會硬，連在水裡也會凝固。[s4] 羅馬人把這種混凝土一層層鋪砌，越往上換越輕的骨材，所以萬神殿才蓋得出沒有鋼筋、內徑約 43 公尺的穹頂。[s1][s2] 約從前 150 年起廣泛使用，有學者認為更早已經出現。[s1] 2023 年，MIT 等團隊在《科學進展》發表研究：過去被當成「沒攪拌均勻」的白色石灰碎塊，其實可能是「熱拌法」（加入生石灰）的痕跡；這些碎塊在裂縫出現時，可能提供鈣來把縫補上，實驗裡熱拌樣本兩週內自行癒合。[s2][s5] 不過耐久性的成因仍在研究。[s1][s2]
  key_terms:
    - { term: 火山灰（pozzolana）, plain: 火山地區的細沙狀物質，和石灰一起用，能讓砂漿在水裡也變硬；名稱來自波佐利。, example: 像加了特殊配料就能在水裡定型的黏土。 }
    - { term: 骨材, plain: 混進混凝土的碎石、陶片、磚塊或浮石等顆粒。, example: 像麻糬裡加的花生碎，提供支撐。 }
    - { term: 鋪砌（opus caementicium）, plain: 羅馬混凝土是一層一層鋪進去、壓實的，不像現代是整桶澆灌；外面再貼磚或大理石裝飾。, example: 像做千層糕，一層層疊起來。 }
    - { term: 熱拌法（hot mixing）, plain: 2023 年研究提出的做法：把生石灰直接和火山灰一起拌，過程會發熱，留下白色石灰碎塊。, example: 像把熱水直接倒進麵粉攪拌，和先放涼再拌不一樣。 }
    - { term: 石灰碎塊（lime clast）, plain: 羅馬混凝土裡的白色小塊，過去被當成瑕疵，2023 年研究認為它們可能是自癒的來源。, example: 像牆裡預先埋好的補牆材料。 }
  primary_source:
    - text: 維特魯威說，那裡的沙混合石灰與碎石後，在建築裡和水中都會變硬，海浪與水的力量都拆不開它。（轉述大意，不是逐字翻譯）
      from: 維特魯威《建築十書》2.6（Gwilt 英譯，Lexundria）
      src: s4
  historiography: |
    **石灰碎塊是瑕疵還是設計？** 過去認為白色石灰碎塊來自攪拌不均或原料品質差；Seymour 等人在 2023 年提出，它們很可能是熱拌法的結果，可作為日後補縫的反應鈣來源，並以現代配方做實驗，顯示有自癒潛力。論文的用語是「提出」和「潛力」，不是已證明羅馬人刻意這樣做。[s2][s5]
    **從什麼時候開始用？** 約前 150 年起廣泛使用，有學者認為更早已經發展出來。[s1]
  misconceptions:
    - 「羅馬混凝土比現代混凝土更強。」它強度較低、不含鋼筋，適合承受壓力的穹頂與牆，不適合今日的高樓與橋梁；厲害的是耐久性。[s1][s2]
    - 「羅馬混凝土是像今天一樣澆灌的。」它是一層層鋪砌的，牆面外層再用其他材料包覆或裝飾。[s1]
  pop_culture:
    - { claim: "常見說法：羅馬混凝土的配方失傳了，現代人完全不知道怎麼做。", fact: "維特魯威在《建築十書》2.6 就寫下火山灰的用途與特性，所以「用火山灰」並不是祕密；不清楚的是為何能那麼耐久。2023 年的研究提出熱拌與石灰碎塊自癒的機制，但耐久性的成因仍在研究。[s4][s5][s1][s2]", src: [s4, s5, s1, s2] }
    - { claim: "常見說法：羅馬建築會永遠自我修復，所以不會壞。", fact: "2023 年研究說的是石灰碎塊可能提供自癒「潛力」，且以現代配方做實驗；並不是每座羅馬建築都不會損壞。[s5]", src: [s5] }
verification: 交叉確認
lens_status: 無直接論述
---

## B1 物資與用途

羅馬混凝土（opus caementicium）是以石灰等膠結材料加水，再混入骨材（碎石、陶瓦、磚塊碎片等）而成；有火山灰（pozzolana）的地方優先使用火山灰。[s1] 因骨材常常很大，它是一層層「鋪砌」而不是「澆灌」，牆面外層再用其他材料包覆、或以灰泥、壁畫、大理石裝飾。[s1]

## B2 產地與控制權

火山灰得名於那不勒斯灣的波佐利（古稱普泰奧利）一帶。[s1] 維特魯威在《建築十書》2.6 說，巴伊亞與維蘇威火山附近的沙加入石灰與碎石後，在建築與水中都會變硬。[s4] 產地的所有權與控制方式，來源不足。

## B3 生產技術與勞動

維特魯威（約前 25 年）建議結構砂漿用火山灰，建築物用石灰與火山灰 1:3、水下工程用 1:2。[s1] 2023 年 MIT 等團隊在《科學進展》發表研究：過去被當成「攪拌不均」的白色石灰顆粒，其實很可能來自加入生石灰的「熱拌法」；裂縫出現時，水會溶解石灰顆粒再結晶成碳酸鈣把裂縫填上，實驗中熱拌樣本兩週內自行癒合。[s1][s2] 這類工法知識靠工匠傳承。[s1]

## B4 運輸路線與咽喉

來源不足。本期來源沒有說明火山灰如何運到各地工地；已知羅馬人最早把混凝土用在水下港口結構（可能在巴亞一帶）。[s1]

## B5 規模與數量

估計：約前 150 年起廣泛使用，有學者認為更早已經發展出來。[s1] 萬神殿穹頂是世界上最大、最古老的無鋼筋混凝土穹頂，上層用較輕的凝灰岩與浮石、基礎用石灰華，屬於分級骨材。[s1][s2]

## B6 經濟與財政角色

它讓大型穹頂、港口與公共建築可以用較便宜的材料、較少的熟練石匠建造（此為一般性推論，具體成本數字來源不足）。[s1] 雙耳瓶碎片因油漬與形狀難以回收而被丟棄，堆成羅馬的泰斯塔西奧山（詳見「雙耳瓶貿易」卡）。[s3]

## B7 權力與政治連結

混凝土是羅馬大型公共建築（如萬神殿）與港口（如前 22–15 年的凱撒利亞港）的技術基礎，間接支撐了帝國的形象工程與海上物流。[s1][s2]

## B8 雙軌解讀

### 李彔

無直接論述。

### 哈拉瑞

無直接論述：目前查到的公開摘要與書評，沒有哈拉瑞專門談羅馬混凝土的內容。

## B9 今日對照鉤子

今日水泥生產約占全球溫室氣體排放的 8%；研究團隊正嘗試把古羅馬的熱拌與自癒原理商業化，以延長混凝土壽命。[s2] 這是「失傳工法被現代科學重新理解」的結構。

## B10 不可類比的差異

羅馬混凝土強度較低、不含鋼筋，適合承受壓力的穹頂與牆，不適合今日的高樓與橋梁；耐久性的成因仍在研究中。[s1][s2]
