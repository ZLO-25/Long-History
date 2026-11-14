---
id: commodity-amphora-trade
type: commodity
name: 葡萄酒與橄欖油雙耳瓶貿易
aliases: [雙耳瓶, 雙耳瓶貿易, amphora, 橄欖油貿易, 葡萄酒貿易, 泰斯塔西奧山, Monte Testaccio, amphorae, Dressel 20, 双耳瓶贸易]
civilization: [古羅馬, 古希臘]
track: west
time:
  start: -150
  end: 260
  precision: approx
  src: [s1, s2, s3]
summary_line: 物資｜商路｜地中海與西部行省｜葡萄酒與橄欖油雙耳瓶貿易
place:
  primary_field: 商路
  secondary_fields: [港口／海峽, 工業／製造區]
  locations:
    - { name_ancient: 泰斯塔西奧山, name_modern: 羅馬（義大利）, lat: 41.87595, lng: 12.47551, pleiades_id: "375710890", precision: exact, role: 碎雙耳瓶堆成的人工山 }
    - { name_ancient: 羅馬河港（Emporium）, name_modern: 羅馬（義大利）, lat: 41.88234, lng: 12.47467, pleiades_id: "937921711", precision: exact, role: 台伯河畔的卸貨港區 }
    - { name_ancient: 希斯帕利斯, name_modern: 塞維亞（西班牙）, lat: 37.38266, lng: -5.99629, pleiades_id: "256210", precision: schematic, role: 貝提卡橄欖油產區（瓜達幾維河谷）代表點 }
    - { name_ancient: 科爾杜巴, name_modern: 哥多華（西班牙）, lat: 37.88468, lng: -4.77917, pleiades_id: "256128", precision: schematic, role: 貝提卡產區上游代表點 }
  scale: line
routes: [sea-baetica-rome]
structure_tags: [標準化量產, 商路改道, 單一港口依賴, 基礎建設網絡, 慢變結構]
topics: [海上貿易]
links: [commodity-egypt-grain, commodity-roman-concrete, building-via-appia]
causes:
  - { id: event-roman-grain-dole, rel: 促成, why: 國家要供應首都居民和軍隊的橄欖油，透過配給體系大量採購，貝提卡的油才一船船裝在雙耳瓶裡運到羅馬。, src: [s2] }
  - { id: war-second-punic, rel: 背景, why: 羅馬在第二次布匿戰爭奪下伊比利南部，那裡的貝提卡後來成為裝在雙耳瓶裡運往羅馬的橄欖油主要產地。, src: [war-second-punic:s2, s3] }
counterparts:
  - { id: building-terracotta-army, note: "相似：大量、規格化的陶製品，作坊在產品上留下戳記或名號，可以追查來源與品質。不同：雙耳瓶是市場與運輸用的容器；兵馬俑是國家為皇帝陵墓製作、埋入地下的陪葬品。", src: [s1, s7] }
sources:
  - { id: s1, title: "Amphora — Wikipedia", url: "https://en.wikipedia.org/wiki/Amphora", accessed: 2026-10-24, tier: 百科 }
  - { id: s2, title: "Monte Testaccio — Wikipedia", url: "https://en.wikipedia.org/wiki/Monte_Testaccio", accessed: 2026-10-24, tier: 百科 }
  - { id: s3, title: "Dressel 20 — Internet Archaeology（Tyers, Roman amphoras in Britain）", url: "https://intarch.ac.uk/journal/issue1/tyers/DR20.html", accessed: 2026-10-24, tier: 學術 }
  - { id: s7, title: "Terracotta Army — Wikipedia", url: "https://en.wikipedia.org/wiki/Terracotta_Army", accessed: 2026-10-25, tier: 百科 }
  - { id: s8, title: "Trash Talk（Monte Testaccio 發掘報導）— Archaeology（美國考古學會雜誌）", url: "https://www.archaeology.org/exclusives/articles/2892-rome-monte-testaccio-amphoras", accessed: 2026-11-12, tier: 通論 }
importance: 2
learn:
  histories: [希臘羅馬史]
  why_care: 羅馬城南邊有一座全由破陶罐堆成的小山；罐子上的字，讓考古學家像看貨運單一樣追蹤兩千年前的橄欖油貿易。[s2][s8]
  story: |
    在羅馬城南邊的台伯河畔，有一座叫泰斯塔西奧山的人工小山，幾乎全由丟掉的雙耳瓶堆成。[s2][s8] 維基百科估計高約 35 公尺、約含 5,300 萬個瓶子；發掘者雷梅薩爾則估約 2,500 萬件完整的瓶子。[s2][s8] 其中超過 85% 是 Dressel 20，裝的是西班牙南部貝提卡出產的橄欖油。[s8] 油倒出後，厚重彎曲的碎片和油漬很難回收，所以就地丟棄、一層層堆成山。[s1][s2][s8] 這些罐子燒製前在把手蓋上戳記，裝油後再用墨寫上字，記下空罐重量、油的重量、商人名、出口地和檢驗日期。[s1][s8] 學者靠這些字，看出一到三世紀國家怎麼組織、監督食物進口。[s8] 當時的人還在碎片上蓋了石灰，蓋住腐壞橄欖油的臭味。[s8]
  key_terms:
    - { term: 雙耳瓶（amphora）, plain: 兩側有把手的陶罐，古代用來運送和儲存酒、油、魚醬等；它是包裝，真正交易的是裡面的東西。, example: 像現在的貨櫃或寶特瓶。 }
    - { term: 泰斯塔西奧山, plain: 羅馬城裡由破碎雙耳瓶堆成的人工山，也叫陶罐山。, example: 像一座由回收不了的紙箱堆成的山。 }
    - { term: Dressel 20, plain: 貝提卡（今西班牙南部）典型的橄欖油雙耳瓶，圓肚，容量約 60–65 公升。, example: 像一種固定規格的油桶。 }
    - { term: 戳記與墨書（tituli picti）, plain: 戳記在燒製前蓋，標示作坊或主人；墨書在裝好後寫，記重量與內容。, example: 像商品包裝上的商標加上貼的貨運標籤。 }
    - { term: 魚醬（garum）, plain: 羅馬人用魚內臟發酵做的調味醬，也用雙耳瓶運送。, example: 像今天的魚露。 }
  primary_source:
    - text: 罐身墨書（titulus pictus）記下空罐重量、油的重量、商人名、出口地點和檢驗日期。（物證描述，不是逐字引文；本站未取得逐字轉錄）
      from: 泰斯塔西奧山出土 Dressel 20 雙耳瓶上的墨書，據 Archaeology 報導與 Tyers（Internet Archaeology）整理
      src: s8
  historiography: |
    **山有多大、多少瓶？** 維基百科說體積約 58 萬立方公尺、高約 35 公尺、約 5,300 萬個瓶子；Archaeology 報導寫的是約 150 英尺（約 46 公尺）高，發掘者雷梅薩爾估約 2,500 萬件完整瓶。數字不同，並列。[s2][s8]
    **誰控制油的貿易？** 雷梅薩爾認為戳記標示油的所有人，也有人認為只標製造者；皇帝對油的供應控制多強也有爭論，有學者稱之為「指令經濟」。[s8]
  misconceptions:
    - 「雙耳瓶裡裝的主要是葡萄酒。」泰斯塔西奧山超過 85% 是裝橄欖油的 Dressel 20，另約 15% 來自北非。[s8]
    - 「陶罐山就是隨手亂倒的垃圾堆。」堆法有計畫：用裝滿碎片的瓶子砌成牆形成梯田，後面再倒碎片，一層層退縮往上堆。[s8]
  pop_culture:
    - { claim: "常見印象：雙耳瓶是博物館裡漂亮的彩繪花瓶。", fact: "運輸用的雙耳瓶是粗陶包裝，真正交易的是裡面的酒、油和魚醬；泰斯塔西奧山上多數是橄欖油瓶。[s1][s8]", src: [s1, s8] }
    - { claim: "常見想像：一座垃圾山一定臭氣熏天。", fact: "Archaeology 報導說羅馬人在丟棄的碎片上蓋了厚厚的石灰，以掩蓋腐壞橄欖油的氣味。[s8]", src: [s8] }
verification: 交叉確認
lens_status: 無直接論述
---

## B1 物資與用途

雙耳瓶主要用來運送與儲存葡萄酒、橄欖油與魚醬（garum），也裝穀物、魚等農產；多數約 45 公分高，葡萄酒瓶約裝 39 公升。[s1] 它本身是「包裝」，真正交易的是瓶中的酒與油。[s1]

## B2 產地與控制權

不同產地有不同瓶型：Dressel 1 在前 2 世紀末出現在義大利中部；Dressel 20 是貝提卡（今西班牙南部，哥多華與塞維亞之間的瓜達幾維河谷）的典型橄欖油瓶。[s1][s3] 泰斯塔西奧山的瓶上銘文顯示，運往羅馬的油與國家的糧食供應（城市配給或軍隊配給）有關，可能由糧食長官管理。[s2]

## B3 生產技術與勞動

**標準化**：學者已辨識出約 66 種瓶型，海因里希．德雷塞爾最早做出系統分類，至今仍沿用。[s1] 燒製前蓋上的戳記標示作坊或主人，裝填後再以墨書（tituli picti）記下重量與內容；Dressel 20 常在把手頂端蓋戳。[s1][s3]

## B4 運輸路線與咽喉

Dressel 20 大量經海路運到羅馬；在北方行省則沿隆河—萊茵河水系分布到不列顛。[s3] 船難遺址的雙耳瓶是判斷沉船年代與貨物來源的關鍵證據；已知最大的雙耳瓶貨船在希臘凱法利尼亞外海，約 6,000 個。[s1] Dressel 2–4 比 Dressel 1 輕，一艘船可載約 6,000 個，而 Dressel 1 約 4,500 個。[s1]

## B5 規模與數量

估計：泰斯塔西奧山體積約 58 萬立方公尺、高約 35 公尺，估計含約 5,300 萬個雙耳瓶，主要堆積年代約西元 140–250 年，約 260 年代停止。[s2] 另一種說法：Archaeology 報導寫高約 150 英尺（約 46 公尺），發掘者雷梅薩爾估約 2,500 萬件完整瓶，其中超過 85% 是貝提卡的 Dressel 20，約 15% 來自北非。[s8] Dressel 20 平均容量約 60–65 公升（40–80 公升不等）。[s3]

## B6 經濟與財政角色

Dressel 20 約在西元 260 年停產，由較小的 Dressel 23 接續到 4 世紀中；雙耳瓶的工業化生產持續到約 7 世紀，之後多被木桶與皮囊取代。[s1][s3] 碎瓶因形狀與油漬難以回收，就地丟棄比運回產地划算。[s1][s2]

## B7 權力與政治連結

國家透過配給體系採購並管理運往羅馬的橄欖油，讓遠方行省的農業與首都的民生和軍需綁在一起。[s2] 罐上的墨書記錄重量、商人、出口地與檢驗日期，雷梅薩爾等人用它研究國家如何監督供應；皇帝控制的程度仍有爭論。[s8]

## B8 雙軌解讀

### 李彔

無直接論述。

### 哈拉瑞

無直接論述。

## B9 今日對照鉤子

雙耳瓶像古代的「標準貨櫃」：統一規格、標記來源與重量，讓遠距貿易可以被追蹤與管理。[s1][s3]

## B10 不可類比的差異

古代的「標準化」是各地作坊的慣例，不是由國際組織制定的規格；國家採購與私人貿易的比重仍有爭議，不能直接等同今日的市場經濟。[s1][s2]
