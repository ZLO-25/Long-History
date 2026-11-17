---
id: event-treaty-tordesillas
type: event
name: 托德西利亞斯條約與薩拉戈薩條約
aliases: [托德西利亞斯條約, 薩拉戈薩條約, 教宗子午線, 1494 條約, Inter caetera, 世界瓜分條約, Treaty of Tordesillas, Treaty of Zaragoza, Treaty of Saragossa, Line of Demarcation]
civilization: [葡萄牙, 西班牙]
track: west
time:
  start: 1493
  end: 1529
  precision: exact
  src: [s1, s2, s3, s4]
summary_line: 大事｜宮廷／政治中心｜托德西利亞斯、薩拉戈薩｜托德西利亞斯條約與薩拉戈薩條約
place:
  primary_field: 宮廷／政治中心
  secondary_fields: [商路, 港口／海峽]
  locations:
    - { name_ancient: 托德西利亞斯, name_modern: 托德西利亞斯（西班牙卡斯提爾－萊昂）, lat: 41.5036, lng: -5.0733, precision: exact, role: 1494 年 6 月 7 日簽訂條約之地, src: [s1, s3] }
    - { name_ancient: 佛得角群島, name_modern: 佛得角（非洲外海）, lat: 14.9331, lng: -23.5133, precision: schematic, role: 條約分界線的起算點：群島以西 370 里格（座標取群島中心，示意）, src: [s1] }
    - { name_ancient: 巴西東岸（卡布拉爾 1500 年登陸處）, name_modern: 巴西巴伊亞州東岸（示意於賽古魯港一帶）, lat: -16.4435, lng: -39.0649, precision: schematic, role: 1500 年卡布拉爾在前往印度途中登陸，位置在分界線葡萄牙一側, src: [s3] }
    - { name_ancient: 摩鹿加群島（香料群島）, name_modern: 摩鹿加群島（印尼北馬魯古省，示意於特爾納特島）, lat: 0.7833, lng: 127.3833, precision: schematic, role: 1529 年薩拉戈薩條約中分界爭議的焦點，盛產丁香, src: [s3, s4] }
    - { name_ancient: 薩拉戈薩, name_modern: 薩拉戈薩（西班牙亞拉岡）, lat: 41.6488, lng: -0.8891, precision: exact, role: 1529 年 4 月 22 日簽訂條約之地, src: [s4] }
  scale: area
structure_tags: [霸權挑戰, 法律成文化]
topics: [對外擴張, 殖民統治, 香料貿易, 宗教]
links: [event-columbus-aztec, event-portuguese-empire, event-vasco-da-gama, event-portugal-africa-coast, event-magellan-circumnavigation, tech-sail-navigation]
causes:
  - { id: event-columbus-aztec, rel: 促成, why: 1493 年詔書點名哥倫布，把向西與向南的新發現土地授予西班牙；葡萄牙反對，才在 1494 年直接談判。, src: [s2, s3, event-columbus-aztec:s7] }
effects:
  - { id: event-magellan-circumnavigation, rel: 背景, why: 經度難定，摩鹿加算哪一邊有爭議；西班牙王室因此願意資助麥哲倫向西航行去那裡（見 C1）。, src: [s3, s4, event-magellan-circumnavigation:s2] }
counterparts: "無適當對照：同時代東亞沒有由兩個國家劃線瓜分海洋的條約；明朝的朝貢與海禁（event-zheng-he-voyages 等）是另一種秩序，來源沒有直接比較兩者，不硬湊。"
sources:
  - { id: s1, title: "Treaty of Tordesillas; June 7, 1494（英譯）— The Avalon Project, Yale Law School", url: "https://avalon.law.yale.edu/15th_century/mod001.asp", accessed: 2026-11-17, tier: 一手 }
  - { id: s2, title: "The Bull Inter Caetera (Alexander VI), May 4, 1493（英譯）— NativeWeb", url: "https://www.nativeweb.org/pages/legal/indig-inter-caetera.html", accessed: 2026-11-17, tier: 一手 }
  - { id: s3, title: "Treaty of Tordesillas — Wikipedia（英文）", url: "https://en.wikipedia.org/wiki/Treaty_of_Tordesillas", accessed: 2026-11-17, tier: 百科 }
  - { id: s4, title: "Treaty of Zaragoza — Wikipedia（英文）", url: "https://en.wikipedia.org/wiki/Treaty_of_Zaragoza", accessed: 2026-11-17, tier: 百科 }
images:
- url: https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Cantino_planisphere_%281502%29.jpg/960px-Cantino_planisphere_%281502%29.jpg
  page: https://commons.wikimedia.org/wiki/File:Cantino_planisphere_(1502).jpg
  title: "坎提諾平面球形圖"
  creator: "佚名葡萄牙製圖師"
  year: "1502 年"
  holder: "埃斯滕塞大學圖書館（義大利摩德納）"
  license: "Public domain"
  caption: "1502 年的葡萄牙世界地圖，圖上畫著《托德西利亞斯條約》的分界線（把大西洋以西劃給西班牙、以東劃給葡萄牙）。"
importance: 3
learn:
  histories: [歐洲史, 美洲史]
  why_care: 兩個歐洲小國靠一張條約，把大西洋以外的世界畫成「你的一半、我的一半」，所以今天巴西說葡萄牙語、其他拉丁美洲多半說西班牙語。
  story: |
    1492 年哥倫布向西航行回來後，教宗亞歷山大六世在 1493 年發出詔書《Inter caetera》，把「向西與向南」新發現的土地給了西班牙，界線畫在亞速爾與佛得角群島以西 100 里格。[s2][s3] 葡萄牙不同意，因為這條線擋到它繞過非洲去印度的航路，於是兩國直接談判。[s3] 1494 年 6 月 7 日在托德西利亞斯簽下條約，把界線改到佛得角群島以西 370 里格，從北極畫到南極。[s1][s3] 線以東發現的土地歸葡萄牙，另一邊歸西班牙。[s1][s3] 1500 年卡布拉爾在前往印度途中到了今天的巴西東部，那裡在線的葡萄牙一側。[s3] 但是地球另一面的線在哪裡？1529 年的薩拉戈薩條約，葡萄牙付 35 萬杜卡特金幣，換西班牙放棄對摩鹿加群島（香料群島）的主張。[s3][s4] 法國國王法蘭索瓦一世據說抱怨：「太陽照耀我，如同照耀別人。」[s3]
  key_terms:
    - { term: 教宗詔書（Inter caetera）, plain: 教宗亞歷山大六世在 1493 年發出的文件，把向西與向南發現的土地給了西班牙君主。, example: 像最高長官發的一紙證明，說某塊地以後算誰家的。 }
    - { term: 里格（league）, plain: 當時航海用的距離單位，約等於一個人步行一小時的路程；條約中的 370 里格是從佛得角群島起算。, example: 像「從學校往西走 370 步」，起點、步幅都要先說清楚，不然會吵架。 }
    - { term: 反子午線, plain: 地球另一面與條約界線相對的那條線；條約只畫了大西洋這一條，所以另一邊在哪裡一直吵。, example: 像分一個橘子，只在一面劃了刀痕，另一面要怎麼切沒人說。 }
  primary_source:
    - { text: "at a distance of three hundred and seventy leagues west of the Cape Verde Islands（在佛得角群島以西三百七十里格處）", from: 《托德西利亞斯條約》（1494 年 6 月 7 日）英譯，耶魯大學 Avalon Project；中文為本站摘譯, src: s1 }
  historiography: |
    **是教宗瓜分世界嗎？** 通俗說法常說「教宗把世界分給西班牙與葡萄牙」。但 1493 年教宗詔書畫的線是亞速爾與佛得角以西 100 里格，是葡萄牙不接受、兩國再自己談判，把線移到 370 里格；教宗尤利烏斯二世在 1506 年才追認。[s2][s3] 所以更準確的說法是：教宗的詔書是起點，兩國條約才是實際分界。[s2][s3]
    **這條線管得了誰？** 英格蘭、荷蘭與天主教的法國都不承認由教宗在兩個天主教國家之間分世界。[s3] 1750 年的《馬德里條約》宣告條約已被取代。[s3]
    **分界線在地球另一面在哪裡？** 英文維基說，當時對經度的知識太有限，沒有一個公認的子午線，所以雙方各自按有利於自己的方式解讀；1524 年雙方各派九位專家開會（巴達霍斯—埃爾瓦斯會議）也沒談攏，各自選擇把摩鹿加畫在自己那一半的地圖。[s4]
  misconceptions:
    - 「教宗直接把世界分成兩半」：1493 年詔書畫的是 100 里格，後來兩國談判改成 370 里格，教宗在 1506 年才確認。[s2][s3]
    - 「條約畫的線很清楚」：英文維基說確切的線從來沒有被定出來，雙方各自解釋。[s4]
    - 「條約管到全世界」：法國、英國與荷蘭都不承認。[s3]
  pop_culture:
    - { claim: 西班牙與葡萄牙用一條線把全世界一人一半分掉，所以巴西說葡萄牙語。, fact: "條約確實把巴西東部劃在葡萄牙一側，卡布拉爾 1500 年登陸並被視為屬於葡萄牙；巴西語言是這段歷史的後果（這一句是推論，本卡來源沒有直接寫「所以說葡萄牙語」）。[s3]", src: [s3] }
    - { claim: 條約是教宗決定的。, fact: "教宗只在 1493 年先畫過一條 100 里格的線，1494 年的 370 里格是兩國自己談的，1506 年才由教宗確認。[s2][s3]", src: [s2, s3] }
  perspectives:
    - { history: 歐洲史, text: 從歐洲看，這是兩個天主教王國用教宗的權威與外交談判處理海外擴張衝突的辦法，其他國家後來不接受。 }
    - { history: 美洲史, text: 從美洲看，這條線劃分的是歐洲兩國的勢力範圍，沒有人問過線兩邊原本就住在那裡的人。 }
verification: 交叉確認
crosscheck: { date: 2026-11-17, by: 獨立查核 agent（歷史學者＋教育者，未參與寫作）, result: 通過, notes: "已重開：Avalon Project 條約英譯（逐字核對 three hundred and seventy leagues west of the Cape Verde Islands、6/7、批准日 7/2 與 9/5）、NativeWeb 的 Inter caetera 英譯（5/4、100 里格 towards the west and south、點名 Christopher Columbus）、英文維基〈Treaty of Tordesillas〉與〈Treaty of Zaragoza〉（1506、1529、35 萬杜卡特、297.5 里格、巴達霍斯—埃爾瓦斯會議、經度知識不足、各自挑地圖）。【修正後通過】修正：「西班牙請教宗發詔書」來源沒有寫誰請求，改為教宗發出；1750 年馬德里條約「葡萄牙取得亞馬遜河流域」未核到，已刪，只留維基有寫的「承認西班牙對菲律賓主權」；Columbus 因果邊 why 改為詔書原文點名哥倫布（可直接驗證）；Magellan 邊 why 去掉「因此」過度推論。注意：英文維基〈Treaty of Tordesillas〉摘要曾顯示 270 里格，但 Avalon 條約原文為 370 里格，以原文為準。未能重開：1481《Aeterni regis》原文、法蘭索瓦一世引文全文（維基開頭一句相符）。思想家欄：WebSearch 未見李彔、哈拉瑞直接談此條約，維持無直接論述。" }
lens_status: 無直接論述
---

## C1 背景

葡萄牙從 15 世紀沿非洲西岸探航，教宗的詔書早就承認它的權利。1481 年的詔書《Aeterni regis》把加那利群島以南的土地授予葡萄牙。[s3] 1492 年哥倫布向西航行後，1493 年教宗亞歷山大六世的《Inter caetera》（5 月 4 日）把「向西與向南」發現與將要發現、而且還不在任何基督教君主實際掌握之下的島嶼與大陸授予西班牙君主，分界線在亞速爾與佛得角群島以西 100 里格；詔書也要求任命的人把當地居民教成天主教徒。[s2][s3] 葡萄牙反對，因為這條詔書沒有顧到它的利益，特別是前往印度的航路。[s3]

## C2 經過

- **1493 年 5 月 4 日**：教宗亞歷山大六世發出《Inter caetera》，畫出 100 里格的線。[s2]
- **1494 年 6 月 7 日**：西班牙（斐迪南與伊莎貝拉）與葡萄牙（若昂二世）在托德西利亞斯簽約，界線在佛得角群島以西 370 里格，南北向，從北極畫到南極；線以東發現的土地歸葡萄牙。[s1] 西班牙在 1494 年 7 月 2 日批准，葡萄牙在 9 月 5 日批准。[s1][s3]
- **1500 年**：卡布拉爾在前往印度途中登陸巴西東岸，該地在葡萄牙一側。[s3]
- **1506 年 1 月 24 日**：教宗尤利烏斯二世確認條約。[s3]
- **1524 年**：巴達霍斯—埃爾瓦斯會議，兩國各派九名專家，討論摩鹿加群島究竟在線的哪一側，沒有共識。[s4]
- **1529 年 4 月 22 日**：查理五世與若昂三世在薩拉戈薩簽約，在摩鹿加群島以東 297.5 里格（約 17 度）畫了一條反子午線，葡萄牙付 35 萬杜卡特金幣，群島留在葡萄牙一側。[s3][s4]

## C3 關鍵人物與群體

亞歷山大六世（教宗）、斐迪南與伊莎貝拉（卡斯提爾與亞拉岡的君主）、若昂二世（葡萄牙國王）、查理五世（西班牙國王，同時是神聖羅馬皇帝）、若昂三世（葡萄牙國王）。[s1][s3][s4] 兩邊的領航員、天文學家與地圖師也被請來討論界線位置。[s4]

## C4 制度或機制變化

兩個國家直接用條約畫出勢力範圍，把「發現與占有」變成可以談判、簽字、批准的事情。[s1][s3] 條約規定線以東歸葡萄牙、另一側歸西班牙。[s1] 這是歐洲國家之間的約定，對線兩邊原本就住在那裡的人沒有任何意義；也不是國際公認的法：法國、英格蘭與荷蘭都不接受。[s3]

## C5 受益者與受損者

**受益**：西班牙與葡萄牙兩個王室，各自取得海外擴張的法律說法與排他權利。[s1][s3] 1529 年葡萄牙得到摩鹿加群島，查理五世則取得 35 萬杜卡特，用來支付與法國的戰爭費用。[s4]
**受損**：被排除的歐洲國家（法國、英國、荷蘭）；以及住在被「分配」土地上的人，詔書與條約都沒有徵求他們的意見。[s2][s3]

## C6 直接結果

兩國得到分別向西與向東擴張的依據。[s1][s3] 巴西東部在 1500 年之後成為葡萄牙一側的土地。[s3] 摩鹿加群島的歸屬在經度難以測量的情況下一直有爭議，直到 1529 年以金錢解決。[s3][s4]

## C7 長期影響

線以東的巴西後來成為葡萄牙的殖民地，現在是拉丁美洲唯一以葡萄牙語為主要語言的大國（這是由條約與殖民歷史推出的結論，本卡來源沒有直接寫語言）。[s3] 1529 年條約沒有提到菲律賓，英文維基說西班牙默認放棄了對位於分界線以西遠處群島的主張，但仍然在 1565 年建立據點，葡萄牙反應不大。[s4] 1750 年的馬德里條約宣告托德西利亞斯分界已被取代，並承認西班牙對菲律賓的主權。[s3]

## C8 雙軌解讀

### 李彔

無直接論述：沒有查到李彔直接談托德西利亞斯條約。

### 哈拉瑞

無直接論述：沒有查到哈拉瑞直接談托德西利亞斯條約或教宗分界詔書。

## C9 今日對照鉤子

「兩個強國用條約畫勢力範圍，沒有第三方與當地居民參加」：條約只畫線，線兩邊的人沒有被詢問。[s1][s3] 另一個結構是：規則寫出來後，發現沒有辦法測量（經度）來執行，只好靠談判和付錢解決。[s4]

## C10 不可類比的差異

教宗在當時的天主教歐洲有政治與法律上的權威，詔書與條約是當時承認的文件；今天的國際法承認每個國家的主權與原住民的權利，不接受任何國家或宗教領袖把別人的土地「分配」給誰。[s2][s3] 當時線的兩邊也沒有精確的測量方法，今天有衛星定位。[s4]
