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
  - { id: event-roman-grain-dole, rel: 背景, why: 國家要供應首都居民和軍隊的橄欖油，透過配給體系大量採購，貝提卡的油才一船船裝在雙耳瓶裡運到羅馬。, src: [s2] }
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
    在羅馬城南邊的台伯河畔，有一座叫泰斯塔西奧山的人工小山，幾乎全由丟掉的雙耳瓶堆成。[s2][s8] 它有多大？英文維基百科寫高約 35 公尺、估計約含 5,300 萬個瓶子；發掘主持人之一雷梅薩爾（José Remesal）則說「大概 2,500 萬個完整的瓶子」，也承認很難算準。[s2][s8] 其中超過 85% 是一種叫 Dressel 20 的圓肚瓶，裝的是西班牙南部貝提卡出產的橄欖油。[s8] 油倒出後，又大又彎的碎片和殘留的油很難再利用，所以就地丟棄、一層層堆成山。[s2][s8] 這些罐子燒製前在把手蓋上戳記，裝油後再用墨寫上字，記下油的重量、在哪個地區裝瓶、由誰秤重和登記等等。[s1][s2] 學者靠這些字，研究一到三世紀國家怎麼監督橄欖油的生產和運輸。[s8] 當時的人還在碎片上蓋了石灰，蓋住腐壞橄欖油的臭味。[s8]
  key_terms:
    - { term: 雙耳瓶（amphora）, plain: 兩側有把手的陶罐，古代用來運送和儲存酒、油、魚醬等；它是包裝，真正交易的是裡面的東西。, example: 像現在的貨櫃或寶特瓶。 }
    - { term: 泰斯塔西奧山, plain: 羅馬城裡由破碎雙耳瓶堆成的人工山，也叫陶罐山。, example: 像一座由回收不了的紙箱堆成的山。 }
    - { term: Dressel 20, plain: 貝提卡（今西班牙南部）典型的橄欖油雙耳瓶，圓肚，容量約 60–65 公升。名字來自 19 世紀替雙耳瓶分類編號的德國學者德雷塞爾（Dressel），20 是他編的型號。, example: 像一種固定規格的油桶。 }
    - { term: 戳記與墨書（tituli picti）, plain: 戳記在燒製前蓋，標示作坊或主人；墨書在裝好後寫，記重量與內容。, example: 像商品包裝上的商標加上貼的貨運標籤。 }
    - { term: 魚醬（garum）, plain: 羅馬人用魚內臟發酵做的調味醬，也用雙耳瓶運送。, example: 像今天的魚露。 }
  primary_source:
    - text: 罐身墨書（titulus pictus）記下油的重量、秤重與登記者的名字、裝瓶的地區。（物證描述，不是逐字引文；本站未取得逐字轉錄）
      from: 泰斯塔西奧山出土 Dressel 20 雙耳瓶上的墨書，據英文維基百科 Monte Testaccio 條整理；研究者通常還列出空罐重量、商人名與年份，本站這次沒有逐項核對到
      src: s2
  historiography: |
    **山有多大、多少瓶？** 英文維基百科說體積約 58 萬立方公尺、高約 35 公尺、約 5,300 萬個瓶子（照這個數字算，約等於 60 億公升的油）；Archaeology 報導寫的是約 150 英尺（約 46 公尺）高，雷梅薩爾估約 2,500 萬個完整的瓶子。兩個數字差了一倍多，因為都是用體積和碎片推算的，沒有人真的數過；這裡並列，不選邊。[s2][s8]
    **誰控制油的貿易？** 雷梅薩爾認為把手上的戳記標的是油的主人（他也可能自己做瓶子）；法國學者多梅格（Claude Domergue）則認為只標做瓶子的人，和油無關。國家管得多緊也有爭論：有人用「指令經濟」（國家下指令安排生產和運送）來形容，考古學家基伊（Simon Keay）則說國家盯得很緊，但官僚管控並不重。[s8]
  misconceptions:
    - 「雙耳瓶裡裝的主要是葡萄酒。」雙耳瓶也裝酒和魚醬，但泰斯塔西奧山這一座超過 85% 是貝提卡裝橄欖油的 Dressel 20，另約 15% 來自北非（今利比亞、突尼西亞一帶）。[s1][s8]
    - 「陶罐山就是隨手亂倒的垃圾堆。」堆法有計畫：用裝滿碎片的瓶子砌成擋土牆、圍出一層層平台，後面再倒碎片，像階梯一樣往上堆。[s2][s8]
  pop_culture:
    - { claim: "常見印象：雙耳瓶是博物館裡漂亮的彩繪花瓶。", fact: "運輸用的雙耳瓶是粗陶包裝，真正交易的是裡面的酒、油和魚醬；泰斯塔西奧山上多數是橄欖油瓶。[s1][s8]", src: [s1, s8] }
    - { claim: "常見想像：一座垃圾山一定臭氣熏天。", fact: "Archaeology 報導說羅馬人在丟棄的碎片上蓋了厚厚的石灰，以掩蓋腐壞橄欖油的氣味。[s8]", src: [s8] }
crosscheck:
  date: 2026-11-14
  by: 獨立查核 agent（歷史學者＋教育者，未參與寫作）
  result: 通過
  notes: "1) 重開 s2：高 35 公尺、底面積約 2 公頃、約 58 萬立方公尺、估計 5,300 萬個瓶子（約 60 億公升油）、已定年堆積約 140–250 年但可能前 1 世紀就開始、2 世紀晚期每年約 13 萬個、約 260 年代後停止、撒石灰中和臭味、Dressel 20 碎成大而彎的碎片且殘油會和石灰反應所以不好回收、墨書記油重／秤重與登記者／裝瓶地區、annona urbis 或 annona militaris、部分銘文提到糧食長官、用近乎完整的瓶子裝碎片砌擋土牆成階梯狀平台，相符。2) 重開 s8（Archaeology〈Trash Talk〉）：150 英尺高、Remesal「Something like 25 million complete ones」並承認難以精算、超過 85% 是貝提卡 Dressel 20 而另 15% 來自北非（利比亞、突尼西亞）、厚石灰蓋住臭味、戳記之爭（Remesal：油的主人；Claude Domergue：只是製瓶者）、「so-called command economy」與 Simon Keay 說國家盯得緊但官僚管控不重、Dressel 判斷使用期從奧古斯都到 3 世紀中晚期，相符；已補上 Domergue 與 Keay 的名字和說法。3) 陶罐山數字的疑點：5,300 萬（維基）與 2,500 萬（Remesal）都是推估，並列、不選邊的寫法正確；補一句說明為什麼差這麼多（用體積與碎片推算）。兩個高度（35 公尺與 150 英尺）也照樣並列。4) 改保守：原卡說墨書記「空罐重量、油的重量、商人名、出口地、檢驗日期」並標 s8；本輪摘要只看到 s8 說墨書「與油的生產和運輸管理有關」，逐項內容是 s2 的說法（油重、經手人、裝瓶地區），所以改依 s2。原來那串項目與查核者所知的研究（墨書分 α 空重、β 商人、γ 淨重、δ 檢驗紀錄含地區與年份）一致，並沒有錯，只是這次沒核到出處；primary_source 的 from 已寫明。5) 「就地丟棄比運回產地划算」沒有在來源看到，改成來源實際寫的兩個理由。6) 因果：event-roman-grain-dole →（促成）沒有改，因為對面那張卡有同一條邊（本輪不能動別的卡）。提醒：橄欖油要到塞維魯才列入首都配給，而陶罐山的堆積早得多；s2 說的是這些油供給 annona urbis 或 annona militaris，「促成」勉強站得住，日後若覺得太強可兩邊一起降為「背景」。war-second-punic →（背景）恰當。7) 補 Dressel 這個名字的由來。8) 未重開：s1（Amphora：約 66 型、多數約 45 公分、酒瓶約 39 公升、凱法利尼亞沉船約 6,000 個、Dressel 2–4 與 Dressel 1 的裝載量）、s3（Tyers：容量 60–65 公升、約 260 年停產、Dressel 23 接續）、s7。限制：WebFetch 全輪 15 次（1 次失敗），摘要工具只回短引文。"
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

估計：泰斯塔西奧山體積約 58 萬立方公尺、高約 35 公尺，估計含約 5,300 萬個雙耳瓶，已定年的堆積層約在西元 140–250 年，但可能前 1 世紀就開始傾倒；2 世紀晚期最多時一年約丟 13 萬個，約 260 年代之後停止。[s2] 另一種說法：Archaeology 報導寫高約 150 英尺（約 46 公尺），雷梅薩爾估約 2,500 萬個完整的瓶子，其中超過 85% 是貝提卡的 Dressel 20，約 15% 來自北非。[s8] Dressel 20 平均容量約 60–65 公升（40–80 公升不等）。[s3]

## B6 經濟與財政角色

Dressel 20 約在西元 260 年停產，由較小的 Dressel 23 接續到 4 世紀中；雙耳瓶的工業化生產持續到約 7 世紀，之後多被木桶與皮囊取代。[s1][s3] Dressel 20 會碎成又大又彎的碎片，不容易再打碎利用；殘留的油可能會和石灰起反應，也不適合拿去拌混凝土，所以就地丟棄。[s2]

## B7 權力與政治連結

國家透過配給體系採購並管理運往羅馬的橄欖油，讓遠方行省的農業與首都的民生和軍需綁在一起。[s2] 罐上的墨書記錄油的重量、裝瓶地區與經手人，顯示這些油經過國家核可；雷梅薩爾等人用它研究國家如何監督供應，國家管控的程度仍有爭論。[s2][s8]

## B8 雙軌解讀

### 李彔

無直接論述。

### 哈拉瑞

無直接論述。

## B9 今日對照鉤子

雙耳瓶像古代的「標準貨櫃」：統一規格、標記來源與重量，讓遠距貿易可以被追蹤與管理。[s1][s3]

## B10 不可類比的差異

古代的「標準化」是各地作坊的慣例，不是由國際組織制定的規格；國家採購與私人貿易的比重仍有爭議，不能直接等同今日的市場經濟。[s1][s2]
