---
id: tech-sail-navigation
type: tech
name: 遠洋航行技術（卡拉維爾帆船、緯度測量與回航法）
aliases: [卡拉維爾帆船, 卡拉克船, 大西洋風帶回航法, volta do mar, 星盤, 象限儀, 緯度航行, caravel, carrack, nau, mariner's astrolabe, 葡萄牙航海技術, 遠洋帆船]
civilization: [葡萄牙, 西班牙]
track: west
time:
  start: 1450
  end: 1500
  precision: approx
  src: [s1, s3, s5]
summary_line: 技術｜港口／海峽｜里斯本與拉古什｜遠洋航行技術（卡拉維爾帆船、緯度測量與回航法）
place:
  primary_field: 港口／海峽
  secondary_fields: [商路]
  locations:
    - { name_ancient: 拉古什, name_modern: 拉古什（葡萄牙阿爾加維）, lat: 37.1028, lng: -8.6730, precision: exact, role: 15 世紀中葉亨利王子的探航船隊出海的港口（1444–1446 年多達四十艘船從此出海）, src: [s8] }
    - { name_ancient: 里斯本, name_modern: 里斯本（葡萄牙）, lat: 38.7223, lng: -9.1393, precision: exact, role: 1498 年起葡萄牙經好望角與印度直接往來，英文維基說平均有四艘卡拉克船連接里斯本與果阿, src: [s2] }
  scale: line
structure_tags: [技術擴散, 慢變結構]
topics: [航海, 海上貿易]
links: [tech-compass, event-portugal-africa-coast, event-vasco-da-gama, event-columbus-aztec, event-zheng-he-voyages]
effects:
  - { id: event-vasco-da-gama, rel: 促成, why: 達伽馬 1497 年先往西南繞進大西洋借風，與回航法同屬風帶知識（兩者連結為本站歸納）。, src: [s3, s9] }
  - { id: event-columbus-aztec, rel: 背景, why: 1492 年哥倫布橫渡大西洋，三艘船裡有兩艘是卡拉維爾帆船；回程從加勒比海往北繞進西風帶，用的正是葡萄牙人摸索出來的回航法。, src: [s1, s3] }
counterparts: "無適當對照：本卡是歐洲遠洋航行技術的組合，中國軌道的航海技術（指南針、針經）已另有卡 tech-compass，兩者互為來源而不是平行的對照。"
sources:
  - { id: s1, title: "Caravel — Wikipedia（英文）", url: "https://en.wikipedia.org/wiki/Caravel", accessed: 2026-11-17, tier: 百科 }
  - { id: s2, title: "Carrack — Wikipedia（英文）", url: "https://en.wikipedia.org/wiki/Carrack", accessed: 2026-11-17, tier: 百科 }
  - { id: s3, title: "Volta do mar — Wikipedia（英文）", url: "https://en.wikipedia.org/wiki/Volta_do_mar", accessed: 2026-11-17, tier: 百科 }
  - { id: s4, title: "Mariner's astrolabe — Wikipedia（英文）", url: "https://en.wikipedia.org/wiki/Mariner%27s_astrolabe", accessed: 2026-11-17, tier: 百科 }
  - { id: s5, title: "Joaquim Alves Gaspar, From the Portolan Chart to the Latitude Chart: The Silent Cartographic Revolution — e-Perimetron 2(2), 2007", url: "http://www.e-perimetron.org/Vol_2_2/Gaspar.pdf", accessed: 2026-11-17, tier: 學術 }
  - { id: s6, title: "History of the compass — Wikipedia（英文；引朱彧《萍洲可談》、沈括《夢溪筆談》、奈坎《De naturis rerum》）", url: "https://en.wikipedia.org/wiki/History_of_the_compass", accessed: 2026-11-17, tier: 百科 }
  - { id: s7, title: "Indian Ocean trade — Wikipedia（英文）", url: "https://en.wikipedia.org/wiki/Indian_Ocean_trade", accessed: 2026-11-17, tier: 百科 }
  - { id: s8, title: "Prince Henry the Navigator — Wikipedia（英文）", url: "https://en.wikipedia.org/wiki/Prince_Henry_the_Navigator", accessed: 2026-11-17, tier: 百科 }
  - { id: s9, title: "Portuguese discoveries — Wikipedia（英文）", url: "https://en.wikipedia.org/wiki/Portuguese_discoveries", accessed: 2026-11-17, tier: 百科 }
  - { id: s10, title: "Treaty of Zaragoza — Wikipedia（英文）", url: "https://en.wikipedia.org/wiki/Treaty_of_Zaragoza", accessed: 2026-11-17, tier: 百科 }
images:
- url: https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Astrolabe_de_marin%2C_France%2C_1603.jpg/960px-Astrolabe_de_marin%2C_France%2C_1603.jpg
  page: https://commons.wikimedia.org/wiki/File:Astrolabe_de_marin,_France,_1603.jpg
  title: "1603 年法國製航海星盤"
  creator: "佚名（1603 年法國製造）；Pierre5018（攝影）"
  year: "1603 年"
  holder: "加拿大歷史博物館（藏品編號 CMC 989.56.1）"
  license: "CC BY-SA 4.0（照片）；器物為公有領域"
  caption: "水手用星盤量太陽或星星的高度，來估算船在哪個緯度。這具是 1603 年法國造的真品，1867 年在加拿大被人從地裡挖出。"
importance: 2
learn:
  histories: [歐洲史, 科技史]
  why_care: 15 世紀的歐洲船能開到看不見陸地的遠洋，靠的不是某一項天才發明，而是把船、羅盤、量緯度和風向知識湊在一起，而且其中好幾樣是從別的文明學來的。
  story: |
    15 世紀的葡萄牙人要沿非洲西岸一路往南，遇到的第一個難題不是找路，而是怎麼回家：往南容易，往北卻頂著風。[s3] 他們發現，回程時先往西繞進大西洋外海，等進入西風帶再轉向東，這種「大西洋風帶回航法」（volta do mar）後來成為遠洋航行的基礎。[s3] 船方面，卡拉維爾帆船小而靈活，可以逆風行駛；大一點的卡拉克船載貨多，適合長程運送。[s1][s2] 方向靠羅盤，而羅盤最早的航海記錄在中國，約 1111–1117 年的朱彧《萍洲可談》就寫到陰天看指南針。[s6] 緯度則靠象限儀和星盤量太陽與北極星的高度；15 世紀下半葉，簡單的天文表讓葡萄牙領航員能在海上算出緯度。[s4][s5] 這一整套方法讓船能離開海岸，但當時的地理知識還不足以準確定出經度。[s10]
  key_terms:
    - { term: 卡拉維爾帆船, plain: 小型、船身輕、靠三角帆也能逆風走的船，平均約 12–18 公尺長，載貨不多。, example: 像一輛機動又省油的小客車，適合探路，不適合搬家。 }
    - { term: 緯度, plain: 在地球上往北或往南離赤道多遠；量太陽正午或北極星的高度可以算出來。, example: 像在樓梯上知道自己在第幾階，但不知道在哪一條走廊。 }
    - { term: 大西洋風帶回航法, plain: 回程不走直線，先繞進大洋深處去借風，再轉回港口。, example: 像划船過河，不是對準對岸直划，而是先往上游多划一些，讓水流把你帶到對岸。 }
    - { term: 季風, plain: 隨季節換方向的風，夏天與冬天大致相反。, example: 像公車固定半年往東開、半年往西開，你只要看懂時刻表就能搭到。 }
  primary_source:
    - { text: "In dark weather they look at the south-pointing needle.（天色陰暗時，他們看指南針。）", from: 朱彧《萍洲可談》（約 1111–1117 年），轉引自英文維基〈History of the compass〉的英譯；本站未讀到原書, src: s6 }
  historiography: |
    **羅盤是怎麼到歐洲的？** 英文維基整理：有人認為羅盤從中國經阿拉伯商人、印度洋航線或十字軍傳到歐洲，也有人主張歐洲獨立發明；但中國的航海使用記錄（約 1117 年）比歐洲最早的文字記錄（約 1190 年奈坎）早約 150 年。[s6] 學界沒有共識，所以本卡只寫「歐洲人在這套技術裡用了羅盤」，不寫成歐洲獨創。[s6]
    **葡萄牙領先在哪裡？** 葡萄牙學者加斯帕（Gaspar）認為，葡萄牙領航員在 15 世紀中葉開始用北極星高度估計南北位移，到下半葉才有簡單的天文表，能用象限儀和星盤在海上量出緯度；這改變了航海圖的畫法。[s5] 也就是說，領先的是把觀測、表格和航海圖組成一套實用方法，而不是某一件儀器。[s4][s5]
  misconceptions:
    - 「歐洲人天生就比別人更會造船、航海」：卡拉維爾用的三角帆（拉丁帆）是地中海從羅馬時代就有的帆，後來阿拉伯人也採用；它是把地中海的帆和大西洋沿岸的造船傳統結合的結果。[s1]
    - 「羅盤是歐洲人發明的」：最早清楚記載航海用羅盤的是中國的朱彧（約 1111–1117 年），歐洲最早的文字記錄約在 1190 年；怎麼傳過去仍有爭論。[s6]
    - 「有了星盤就能知道船在哪裡」：星盤量的是天體高度，用來求緯度；英文維基說它不容易量兩個天體之間的角度（後來求經度的方法需要這個），但這不等於「完全做不到」。[s4]
  pop_culture:
    - { claim: 亨利王子的航海學校發明了卡拉維爾帆船和航海儀器，所以葡萄牙領先世界。, fact: "卡拉維爾源自加利西亞、葡萄牙與安達魯西亞的小漁船，帆是地中海傳統；英文維基說亨利召集專家要造能走外海的船，但沒有哪個「學校」發明了它。[s1][s8]", src: [s1, s8] }
    - { claim: 哥倫布證明了地球是圓的，所以才敢橫渡大西洋。, fact: "這張卡的來源談的是技術問題：哥倫布能回到歐洲，是因為他從加勒比海往北繞進西風帶，這正是葡萄牙人摸出的回航法。[s3]", src: [s3] }
  perspectives:
    - { history: 歐洲史, text: 從歐洲看，這套技術讓小國葡萄牙能用少數船連起大西洋與印度洋。 }
    - { history: 科技史, text: 從科技史看，這是航海、天文與製圖三種技術被組合成一套方法的例子，其中羅盤的最早航海記錄在中國。 }
verification: 交叉確認
crosscheck: { date: 2026-11-17, by: 獨立查核 agent（歷史學者＋教育者，未參與寫作）, result: 通過, notes: "已重開：英文維基〈Volta do mar〉、〈Caravel〉、〈Carrack〉、〈Mariner's astrolabe〉、〈History of the compass〉（朱彧 In dark weather they look at the south-pointing needle 逐字相符、1111–1117、奈坎 1190、約 150 年）、Gaspar 論文 PDF（e-perimetron）、〈Indian Ocean trade〉、〈Portuguese discoveries〉、〈Treaty of Zaragoza〉。【修正後通過】修正：〈Volta do mar〉未提達伽馬，達伽馬 effects 邊改引〈Portuguese discoveries〉的「為取得最有利的風先往西南」並註明回航法連結是本站歸納；「往西北」維基只寫往西、往北（哥倫布），改為「往西／外海」；維瓦爾第「熱那亞、1291」維基頁沒有，已刪；星盤「簡化」改為維基原話「直接由平面星盤發展而來」，108 件是 2017 年數字；「經度做不到」維基沒這麼說，改引〈Treaty of Zaragoza〉的「地理知識不足以準確定出經度」；最早緯度圖 Gaspar 一處 1502（Cantino）、註腳 1504，並列；緯度圖是混合型而非取代波特蘭海圖；三角帆「穆斯林沿用」維基是阿拉伯人經科普特人採用；卡拉克「每年四艘」維基無「每年」，「單程」亦無；亨利「推動遠洋卡拉維爾設計」維基只寫召集專家造能走外海的船。未能重開：〈Mariner's astrolabe〉提到的北極星測緯（星盤頁只寫太陽與已知赤緯的星，北極星依 Gaspar）、朱彧原書、s8 亨利頁中 1443 壟斷細節。思想家欄：WebSearch 未見李彔、哈拉瑞直接談此技術，維持無直接論述。" }
lens_status: 無直接論述
---

## T1 是什麼、解決什麼問題

在大海上要做到三件事：**船要能走遠、人要知道方向與位置、還要能回得來**。[s1][s3] 卡拉維爾帆船小而快，能逆風行駛；卡拉克船大而穩，能載貨與補給走長程；羅盤告訴船長方向；星盤與象限儀用太陽或北極星的高度算出緯度；回航法則是利用大洋風帶，讓船能「繞遠路」回家。[s1][s2][s3][s4]

## T2 發明與起源

- **卡拉維爾帆船**：英文名來自葡萄牙文 caravela，字源有拜占庭希臘文和阿拉伯文兩種說法；它由加利西亞、葡萄牙與大西洋沿岸安達魯西亞的小漁船發展而來，是地中海的三角帆（拉丁帆）與大西洋造船傳統結合。[s1] 13 世紀已出現小型卡拉維爾，15 世紀初已有加甲板的版本，到 15 世紀中後期有遠洋型。[s1] 三角帆本身在羅馬時代已出現在地中海，後來阿拉伯人經由科普特人也採用了它。[s1]
- **卡拉克船**：14 到 15 世紀在歐洲（尤其葡萄牙與西班牙）發展，由單桅的柯克船演變，有三到四根桅、高高的船尾與船首樓，載貨量大。[s2]
- **羅盤**：最早清楚的航海使用記錄在中國，約 1111–1117 年；歐洲最早文字記錄約 1190 年。[s6] 詳細見 tech-compass 卡。
- **緯度測量**：15 世紀中葉葡萄牙領航員開始用北極星高度估計南北位移；15 世紀下半葉有了簡單的天文表，才能用象限儀與星盤在海上量出緯度。[s5] 英文維基說有強力證據顯示航海星盤直接由平面星盤發展而來；現存最古老的一件是約 1496–1501 年的「索德雷星盤」，2014 年在 1503 年沉沒於阿曼外海的沉船上發現。[s4]
- **回航法**：英文維基說這個方法由葡萄牙領航員在大發現時代（15 世紀後期）臻於完善，並與從大西洋島嶼（如馬德拉）返航有關；13 世紀維瓦爾第（Vivaldi）兄弟的遠征失蹤，英文維基說缺少這種知識「可能」是原因。[s3]

## T3 傳播與普及

葡萄牙人先把這些方法用在亨利時期的西非海岸探航，之後才接上迪亞士與達伽馬的航行（見 event-portugal-africa-coast、event-vasco-da-gama 兩卡）。[s8] 1498 年起葡萄牙開始經由好望角航線與印度直接貿易，航程約六個月，英文維基說平均有四艘卡拉克船連接里斯本與果阿。[s2] 回航法也被其他國家學去：哥倫布若不會繞進西風帶，就無法從美洲回到歐洲；1565 年烏爾達內塔隨黎牙實比航行時，推論太平洋的風圈和大西洋相似，往北走到約北緯 38 度、抵達加州海岸後沿岸南下到阿卡普爾科。[s3]

印度洋則是另一套已經成熟的風系：古羅馬時代的作者（斯特拉波）已記載水手知道並利用季風做生意。[s7] 葡萄牙人在 1497–98 年到達印度洋時，這裡早已有古吉拉特、阿拉伯等商人在做香料與絲綢生意；英文維基說葡萄牙人起初盯著古里（卡利卡特），但古吉拉特在貿易上更重要。[s7]（達伽馬去程 23 天、逆著季風回程 90 多天的數字，見 event-vasco-da-gama 卡。）

## T4 規模與數據

- 15 世紀的卡拉維爾平均長約 12–18 公尺、載重約 50–60 噸；哥倫布的尼尼亞號與平塔號長約 15–20 公尺，聖瑪利亞號是約 150 噸的卡拉克船。[s1]
- 葡萄牙卡拉克船「通常是當時很大的船，常超過 1,000 噸（排水量）」。[s2]
- 航海星盤的精確度取決於刻度圈的半徑與瞄準桿的長度，而且必須垂直吊著，在有風的甲板上很難使用。[s4] 2017 年時已知現存約 108 件，最大的收藏在葡萄牙的博物館。[s4]
- 最早有緯度刻度的航海圖，Gaspar 論文一處寫 1502 年的坎蒂諾海圖、註腳寫 1504 年（前後不一）；1514 年領航員若昂·德·里斯本還在抱怨海圖與航海實務對不上。[s5]

## T5 改變了什麼

1. **航線**：船可以離開海岸，連續好幾週在看不到陸地的海上航行，把歐洲、非洲沿岸、印度洋與後來的美洲連成一條海路。[s2][s3]
2. **製圖**：有了緯度觀測，航海圖開始加上緯度刻度，成為一種和傳統波特蘭海圖明顯不同的混合型海圖（Gaspar 說它不是完全取代舊圖）。[s5]
3. **限制**：當時的地理知識不足以準確定出經度，也沒有公認的遠東子午線，所以才會有薩拉戈薩條約前後的分界線爭議（見 event-treaty-tordesillas）。[s10]
4. **誰受益**：這套技術本身沒有「領先」或「落後」的血統：羅盤、三角帆、星盤都有地中海、伊斯蘭世界或中國的來源，歐洲人的貢獻是把它們與大西洋條件結合。[s1][s4][s6]

## T6 雙軌解讀

### 李彔

無直接論述：沒有查到李彔直接談卡拉維爾帆船或葡萄牙遠洋航行技術。（tech-compass 卡有他談中國與現代化的另外論述，與本卡無關。）

### 哈拉瑞

無直接論述：沒有查到哈拉瑞直接談卡拉維爾帆船、星盤或回航法。

## T7 今日對照鉤子

「把已有的零件組成一套新系統」：船、羅盤、星盤、天文表、風向知識各有來源，把它們組合起來才讓遠洋航行變得可行。[s1][s4][s5][s6] 另一個結構是「知識累積靠一次次出航修正」：航海圖在實際使用中被一再調整。[s5]

## T8 不可類比的差異

15 世紀的遠洋航行沒有可靠的經度知識，船員多靠緯度與經驗；現代的衛星導航與氣象預報不是同一種技術。[s10] 而印度洋是早就有人往來的海域，不是歐洲人「發現」的空白地帶。[s7]
