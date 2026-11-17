---
id: event-magellan-circumnavigation
type: event
name: 麥哲倫—埃爾卡諾環球航行
aliases: [麥哲倫環球航行, 麥哲倫航行, 首次環球航行, 麥哲倫海峽, 麥克坦島之戰, 麥克坦之戰, Magellan-Elcano circumnavigation, Magellan expedition, Battle of Mactan, Strait of Magellan, 維多利亞號, Victoria, 皮加費塔]
civilization: [西班牙, 菲律賓]
track: west
time:
  start: 1519
  end: 1522
  precision: exact
  src: [s1, s2, s4]
summary_line: 大事｜港口／海峽｜麥哲倫海峽、宿霧、麥克坦島｜麥哲倫—埃爾卡諾環球航行
place:
  primary_field: 港口／海峽
  secondary_fields: [商路, 資源產地]
  locations:
    - { name_ancient: 聖盧卡爾德巴拉梅達, name_modern: 聖盧卡爾德巴拉梅達（西班牙安達魯西亞）, lat: 36.7783, lng: -6.3510, precision: exact, role: 1519 年 9 月 20 日船隊離開西班牙的港口；1522 年 9 月 6 日維多利亞號回到此地, src: [s1, s2, s4] }
    - { name_ancient: 聖胡利安港, name_modern: 聖胡利安港（阿根廷聖克魯斯省）, lat: -49.3068, lng: -67.7227, precision: schematic, role: 1520 年冬天過冬地，船長們叛變（座標為現今聖胡利安港，示意）, src: [s2] }
    - { name_ancient: 麥哲倫海峽, name_modern: 麥哲倫海峽（智利）, lat: -52.5000, lng: -69.5000, precision: schematic, role: 1520 年 10–11 月船隊穿越的海峽（座標示意於海峽東段）, src: [s2] }
    - { name_ancient: 關島, name_modern: 關島（美國屬地）, lat: 13.4443, lng: 144.7937, precision: schematic, role: 1521 年 3 月 6 日橫渡太平洋後首次登陸, src: [s2] }
    - { name_ancient: 宿霧, name_modern: 宿霧市（菲律賓）, lat: 10.3157, lng: 123.8854, precision: exact, role: 1521 年 4 月抵達，與拉者胡馬邦結盟並受洗, src: [s1, s2] }
    - { name_ancient: 麥克坦島, name_modern: 麥克坦島（菲律賓宿霧省，今拉普拉普市）, lat: 10.3103, lng: 123.9494, precision: exact, role: 1521 年 4 月 27 日麥克坦島之戰，麥哲倫戰死, src: [s1, s3] }
    - { name_ancient: 蒂多雷, name_modern: 蒂多雷島（印尼北馬魯古省）, lat: 0.6833, lng: 127.4000, precision: schematic, role: 1521 年 12 月 21 日維多利亞號載丁香從此啟程返航, src: [s4] }
  scale: line
routes: [sea-magellan]
structure_tags: [補給線過長, 快速擴張, 突變事件]
topics: [航海, 香料貿易, 對外擴張, 原住民族]
links: [event-treaty-tordesillas, person-magellan, tech-sail-navigation, event-portuguese-empire, event-manila-1571, commodity-manila-galleon]
causes:
  - { id: event-treaty-tordesillas, rel: 背景, why: 摩鹿加群島（香料群島）的歸屬在條約分界線上有爭議；麥哲倫與葡萄牙國王吵翻後，向西班牙提出向西航行去那裡的計畫。, src: [event-treaty-tordesillas:s3, event-treaty-tordesillas:s4, s2] }
effects:
  - { id: event-manila-1571, rel: 背景, why: 1521 年是歐洲人首次有記錄抵菲律賓；1565 年黎牙實比要找他到過的香料群島，是前後相接，非明說延續。, src: [s2, s3, s5, s7, s8, s9] }
counterparts: "無適當對照：本卡是歐洲人第一次環球航行；與鄭和下西洋（event-zheng-he-voyages）都是跨洋艦隊，但來源沒有直接比較，不硬湊。"
sources:
  - { id: s1, title: "Antonio Pigafetta, Magellan's Voyage Around the World（James A. Robertson 1906 英譯本，Arthur H. Clark；網頁節錄版：Around the World with Pigafetta）", url: "https://mariuscomper.uk/in-jurul-lumii-pigafetta/en/", accessed: 2026-11-17, tier: 一手 }
  - { id: s2, title: "Ferdinand Magellan — Wikipedia（英文）", url: "https://en.wikipedia.org/wiki/Ferdinand_Magellan", accessed: 2026-11-17, tier: 百科 }
  - { id: s3, title: "Battle of Mactan — Wikipedia（英文）", url: "https://en.wikipedia.org/wiki/Battle_of_Mactan", accessed: 2026-11-17, tier: 百科 }
  - { id: s4, title: "Juan Sebastián Elcano — Wikipedia（英文）", url: "https://en.wikipedia.org/wiki/Juan_Sebasti%C3%A1n_Elcano", accessed: 2026-11-17, tier: 百科 }
  - { id: s5, title: "Treaty of Zaragoza — Wikipedia（英文）", url: "https://en.wikipedia.org/wiki/Treaty_of_Zaragoza", accessed: 2026-11-17, tier: 百科 }
  - { id: s6, title: "Lapulapu — Wikipedia（英文）", url: "https://en.wikipedia.org/wiki/Lapulapu", accessed: 2026-11-17, tier: 百科 }
  - { id: s7, title: "Miguel López de Legazpi — Wikipedia（英文）", url: "https://en.wikipedia.org/wiki/Miguel_L%C3%B3pez_de_Legazpi", accessed: 2026-11-17, tier: 百科 }
  - { id: s8, title: "Ruy López de Villalobos — Wikipedia（英文）", url: "https://en.wikipedia.org/wiki/Ruy_L%C3%B3pez_de_Villalobos", accessed: 2026-11-17, tier: 百科 }
  - { id: s9, title: "History of the Philippines (1565–1898) — Wikipedia（英文）", url: "https://en.wikipedia.org/wiki/History_of_the_Philippines_(1565%E2%80%931898)", accessed: 2026-11-17, tier: 百科 }
images:
- url: https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Ortelius_-_Maris_Pacifici_1589.jpg/960px-Ortelius_-_Maris_Pacifici_1589.jpg
  page: https://commons.wikimedia.org/wiki/File:Ortelius_-_Maris_Pacifici_1589.jpg
  title: "奧特里烏斯《太平洋圖》（1589）"
  creator: "亞伯拉罕・奧特里烏斯（Abraham Ortelius）"
  year: "1589 年"
  holder: "Helmink 古地圖商（Commons 標示的來源）"
  license: "Public domain"
  caption: "1589 年的太平洋地圖，圖中畫了麥哲倫海峽，海上還有一艘「維多利亞號」——就是麥哲倫船隊中唯一完成環球的那艘船。"
importance: 3
learn:
  histories: [歐洲史, 東南亞史]
  why_care: 這是第一次有人類的船繞地球一圈，但出發的人幾乎都沒回來，帶頭的人也死在今天的菲律賓，那裡把打敗他的人當成英雄。
  story: |
    1519 年 9 月，麥哲倫率領五艘船、兩百多人從西班牙出發，目標是向西找到屬於西班牙那一半的香料群島。[s1][s2] 英文維基整理的出發人數約 270 人，學者的計算可能較少；皮加費塔的日記寫 237 人。[s1][s2] 1520 年冬天，船長們在聖胡利安港叛變，被鎮壓，一人被殺、一人被處斬、一人被丟在岸上。[s2] 10 月到 11 月，船隊穿過後來以他命名的海峽，進入太平洋；接下來三個月又二十天沒有新鮮食物，皮加費塔記下船員吃長蟲的餅乾粉、牛皮和鋸屑，一隻老鼠賣半個杜卡特。[s1][s2] 1521 年 4 月 27 日，麥哲倫為了支持宿霧的拉者胡馬邦，帶著 49 人涉水登上麥克坦島攻打拉普拉普，被島上戰士打死。[s2][s3] 後來埃爾卡諾接手，1522 年 9 月 6 日維多利亞號回到西班牙，船上只剩 18 人。[s1][s4]
  key_terms:
    - { term: 環球航行, plain: 往同一個方向一直航行，最後回到出發點；這次完成的人是埃爾卡諾與他的船員，不是麥哲倫本人。, example: 像繞操場跑一圈，起跑的人沒有跑完，是接力的人跑完。 }
    - { term: 皮加費塔, plain: 隨船出海的義大利人，寫下這次航行的日記；麥哲倫之死與菲律賓人的細節多數靠他。, example: 像唯一帶著筆記本去的目擊者，其他人沒寫或沒留下。 }
    - { term: 拉者, plain: 當時東南亞一些地方首領的稱號；胡馬邦是宿霧的拉者。, example: 像地方上的大家長，但不是現代意義的國王。 }
    - { term: 香料群島（摩鹿加群島）, plain: 盛產丁香等香料的印尼東部島嶼，當時是歐洲人急著要找的地方。, example: 像只有一個地方才買得到的熱門商品，大家都想直接去產地買。 }
  primary_source:
    - { text: "Eight of our men were killed with him in that battle（我們有八個人和他一起在那場戰鬥裡死去）", from: 皮加費塔《麥哲倫環球航行》（Robertson 1906 英譯，經網頁節錄）；中文為本站摘譯；「敵人只死十五個」一句網頁節錄的上下文有摘述成分，未確認逐字，故引文只取第一句, src: s1 }
  historiography: |
    **出發多少人、回來多少人？** 英文維基整理約 270 人，但說學者計算可能更少；皮加費塔寫 237 人；埃爾卡諾條目寫約 234–247 人。[s1][s2][s4] 回到西班牙的維多利亞號上是 18 位歐洲人，英文維基的埃爾卡諾條目另有 3 位摩鹿加人，也有人說 18 或 19。[s2][s4] 所以「270 人出發、18 人回來」要加註「約」。
    **誰是環球第一人？** 麥哲倫在 1521 年已死，卻常被稱為環球航行者。英文維基的看法是：他個人「幾乎完成」，因為他早年曾向東到過馬來群島，但完成這趟航行的是埃爾卡諾。[s2] 此外，回程時埃爾卡諾經帝汶改走南邊繞好望角，目的是避開葡萄牙人。[s4]
    **誰在寫史？** 麥哲倫之死與菲律賓人的許多細節，主要靠皮加費塔一人，英文維基說他的記述是今天所知麥克坦島之戰許多資訊的唯一來源。[s3] 這代表我們看到的是一位歐洲隨船者的角度，島上人的說法要靠後來的口傳與研究。[s3][s6]
  misconceptions:
    - 「麥哲倫環球航行了一圈」：他在 1521 年死於麥克坦島，完成航行的是埃爾卡諾等 18 人。[s2][s4]
    - 「五艘船都回來了」：只有維多利亞號回到西班牙；聖地牙哥號在南美沉沒、聖安東尼奧號中途逃回西班牙，三一號因故障留在摩鹿加。[s2][s4]
    - 「麥哲倫發現了菲律賓並建立殖民地」：他只是 1521 年短暫到訪，英文維基說西班牙在 1565 年才由黎牙實比建立據點。[s2][s3][s5]
  pop_culture:
    - { claim: 麥哲倫用大炮和火槍輕鬆征服原住民。, fact: "皮加費塔記載，因為礁石，船上的砲與火槍打不到岸上；西班牙人的盔甲大致保護了身體，但腿部沒有護甲，火槍手與弓弩手的彈藥也很快用完。[s3]", src: [s3] }
    - { claim: 拉普拉普當時就是菲律賓的民族英雄，代表整個菲律賓。, fact: "皮加費塔只寫到 Çilapulapu 是麥克坦島兩位首領之一；他被當成菲律賓民族英雄是後來的追認，當時並沒有一個叫菲律賓的國家；同時代只有皮加費塔提到他的名字。[s6]", src: [s6] }
  perspectives:
    - { history: 歐洲史, text: 從歐洲看，這是一場為了香料群島的賭博：五艘船只回來一艘，卻載回足以讓王室滿意的丁香。 }
    - { history: 東南亞史, text: 從東南亞看，這是一支外來船隊捲入宿霧與麥克坦島首領之間的競爭，而且被打敗。 }
verification: 爭議
crosscheck: { date: 2026-11-17, by: 獨立查核 agent（歷史學者＋教育者，未參與寫作）, result: 通過, notes: "已重開：皮加費塔英譯節錄頁 mariuscomper.uk（237 人、Eight of our men were killed with him in that battle、Rats…half a ducado、粉狀長蟲餅乾、鋸屑、1522-9-6 only eighteen men、五艘船名）、英文維基〈Ferdinand Magellan〉×2、〈Battle of Mactan〉×2、〈Juan Sebastián Elcano〉、〈Treaty of Zaragoza〉、〈Lapulapu〉、〈Miguel López de Legazpi〉、〈Ruy López de Villalobos〉、〈History of the Philippines (1565–1898)〉、EBSCO Research Starter。【修正後通過】修正：primary_source 原把「敵人只死十五個」併入引文，節錄頁該句上下文含摘述，改為只引第一句（逐字相符）；9/20 離港日為後人推算已註明；恩里克出身（蘇門答臘 vs 麻六甲）並列；刪去未核到的船員國籍清單；「多數細節唯一來源」改為維基原意「許多資訊的唯一來源」；拉普拉普「拒絕贖屍」維基是「戰士拒絕胡馬邦以商品換回遺體」，已改；「1565 後統治三百多年」來源未核到，已刪；Scott 的「鬆散聯合」維基是指米沙鄢社會整體，已改；射手彈藥改為火槍手與弓弩手。效果邊 effects → event-manila-1571（背景）：查得到的來源只支持「前後相接」——維基〈History of the Philippines (1565–1898)〉寫 1521 年麥哲倫是第一次有記錄的歐洲接觸、黎牙實比 44 年後到；〈Villalobos〉寫 1543 年（有說法認為）命名 Las Islas Filipinas 並曾到過麥哲倫停泊的 Mazaua；〈Legazpi〉寫遠征目的是找「麥哲倫與維拉洛沃斯分別於 1521 與 1543 年到過的」香料群島；〈Treaty of Zaragoza〉寫 1542 年查理五世殖民菲律賓失敗。沒有來源明說「黎牙實比是延續麥哲倫」或「西班牙據麥哲倫到訪主張主權」，所以保留邊但 why 只寫前後相接，並明講來源不支持的部分。未能重開：Pigafetta 原書全文與 Robertson 英譯原頁（只開網頁節錄）、拉者胡馬邦受洗人數 2,200 的原始史料。思想家欄：WebSearch 未見李彔、哈拉瑞直接談麥哲倫環球航行，維持無直接論述。" }
lens_status: 無直接論述
---

## C1 背景

西班牙想從西邊走，找到按條約分界屬於自己那一邊的摩鹿加群島（香料群島，見 event-treaty-tordesillas）。[s2][s5] 麥哲倫本人出生於葡萄牙北部，1505 到 1513 年在葡萄牙屬印度服務，參加過 1511 年攻占麻六甲；1517 年他因為要求率領向西到香料群島的探險而與國王曼努埃爾一世爭吵，轉往西班牙。[s2] 1518 年西班牙王查理一世（後來的查理五世）批准他的計畫，任命他為船隊指揮官。[s2]（舊作者說他是為了報復才轉投西班牙，這是葡萄牙作者達米昂·德·戈伊斯的說法，現代史家不見得採信。[s2]）

## C2 經過

- **1519 年 8–9 月**：皮加費塔記他們在 8 月 10 日從塞維亞啟程，之後離開聖盧卡爾德巴拉梅達（皮加費塔節錄頁註明 9 月 20 日是後來學者的推算）；五艘船是特立尼達號、聖安東尼奧號、康塞普西翁號、維多利亞號與聖地牙哥號。[s1][s2]
- **1519 年 11 月至 1520 年**：經巴西海岸南下，1520 年冬天在聖胡利安港過冬；叛變由卡塔赫納、克薩達與門多薩三位船長領導，門多薩被殺、克薩達被斬首、卡塔赫納被丟在岸上，聖地牙哥號在暴風雨中沉沒但沒人死。[s2]
- **1520 年 10 至 11 月**：發現並穿過海峽，聖安東尼奧號逃回西班牙；11 月下旬進入太平洋。[s2]
- **1520 年 11 月 28 日至 1521 年 3 月 6 日**：橫渡太平洋，三個月又二十天，約有三十人死亡，多半是壞血病。[s1][s2]
- **1521 年 3 月**：3 月 6 日到關島，3 月 16 日看到薩馬島，3 月 28 日到利馬薩瓦，31 日舉行菲律賓的第一次彌撒。[s2]
- **1521 年 4 月**：4 月 7 日到宿霧，拉者胡馬邦與大約 2,200 名當地人受洗（英文維基的估計）。[s2]
- **1521 年 4 月 27 日**：麥克坦島之戰，麥哲倫戰死。[s1][s3]
- **1521 年 11 月至 12 月**：到達摩鹿加；埃爾卡諾被選為船長，12 月 21 日維多利亞號載約 27 公噸丁香從蒂多雷啟程；三一號故障留下。[s4][s5]
- **1522 年**：經帝汶，改走南邊繞好望角以避開葡萄牙人；在佛得角補給時有 13 名水手被扣。[s4]
- **1522 年 9 月 6 日**：回到聖盧卡爾德巴拉梅達，9 月 8 日進入塞維亞。[s1][s4]

## C3 關鍵人物與群體

麥哲倫（見 person-magellan）、埃爾卡諾、皮加費塔（義大利隨行記錄者）、麥哲倫的奴隸兼翻譯恩里克（英文維基說他來自蘇門答臘，也稱他為麻六甲的恩里克，出身說法不一）；宿霧拉者胡馬邦與麥克坦島首領拉普拉普（Çilapulapu）和 Zula。[s2][s3][s6] 船員約六成是西班牙人，其次是葡萄牙人（28 人）與義大利人（27 人），另外還有其他國家的人。[s2]

## C4 制度或機制變化

這趟航行把西班牙王室的香料群島主張，從條約上的爭議變成實際行動。[s2][s5] 維多利亞號從蒂多雷載回的丁香約 27 公噸。[s4] 另一方面，後來的 1529 年薩拉戈薩條約，葡萄牙付給西班牙 35 萬杜卡特，摩鹿加群島留在葡萄牙一側。[s5]

## C5 受益者與受損者

**受益**：西班牙王室（取得丁香與一條新航路的知識）、活下來的 18 位船員（埃爾卡諾得到盾徽與「Primus circumdedisti me」座右銘，但年金一直沒付）。[s4]
**受損**：約 270 人的船隊絕大多數人死亡或失蹤；宿霧與麥克坦島的人被迫捲入歐洲人的衝突，有 2,200 人受洗，也有人在戰鬥中死亡。[s2][s3]

## C6 直接結果

只有維多利亞號回到西班牙，船上是 18 位歐洲人。[s1][s4] 麥哲倫的屍體沒有被找回；胡馬邦想用商品換回遺體，拉普拉普的戰士拒絕。[s2][s3] 西班牙在 1542 年嘗試殖民菲律賓失敗，1565 年才由黎牙實比建立據點。[s3][s5]

## C7 長期影響

這趟航行證明了從大西洋向西走可以到達亞洲，也證明了地球可以被繞一圈。[s2][s4] 對菲律賓而言，它是西班牙人第一次登陸與接觸；Mactan 的戰鬥被後世視為菲律賓人第一次擊敗西班牙人，英文維基說它使西班牙殖民延後約 44 年。[s3] 西班牙要到 1565 年才在菲律賓建立據點，後續見 event-manila-1571。[s3][s5]（前後脈絡：1521 年是歐洲人第一次有記錄的接觸 [s9]；1542–43 年維拉洛沃斯遠征失敗，有說法認為他把萊特與薩馬島命名為「菲律賓」 [s8]；1565 年黎牙實比遠征的目標是找麥哲倫與維拉洛沃斯曾到過的香料群島 [s7]。來源只支持這樣前後相接，沒有說黎牙實比有意延續麥哲倫，也沒有說西班牙「依據」麥哲倫到訪來主張主權。）

## C8 雙軌解讀

### 李彔

無直接論述：沒有查到李彔直接談麥哲倫環球航行。

### 哈拉瑞

無直接論述：沒有查到哈拉瑞直接談麥哲倫環球航行。

## C9 今日對照鉤子

「一個高風險的遠征由王室出資，成功的標準是帶回貨物與知識，而不是人員平安」：五艘船只回一艘，回來的丁香就足以交代。[s2][s4] 另一個結構是：同一場戰鬥，在歐洲被記成探險家之死，在菲律賓被記成民族英雄的勝利。[s3][s6]

## C10 不可類比的差異

16 世紀的航行約 270 人出發、只有 18 人回到出發港（數字見上），死亡率極高；今天的環球航行有衛星導航與補給。[s1][s2] 當時米沙鄢（Visayan）一帶是由各地首領組成的鬆散聯合（英文維基轉述歷史學者 William Henry Scott 的看法），不是今天意義上的國家；拉普拉普被當成民族英雄，是後世的詮釋。[s6]
