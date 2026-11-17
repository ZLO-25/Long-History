---
id: event-portugal-africa-coast
type: event
name: 亨利王子與葡萄牙沿非洲西岸探航
aliases: [航海家亨利, 亨利王子, 葡萄牙西非探航, 博哈多爾角, 休達之戰, Prince Henry the Navigator, Infante Henrique, Henry the Navigator, Cape Bojador, Conquest of Ceuta, Romanus Pontifex]
civilization: [葡萄牙]
track: west
time:
  start: 1415
  end: 1460
  precision: exact
  src: [s1, s2]
summary_line: 大事｜港口／海峽｜非洲西岸｜亨利王子與葡萄牙沿非洲西岸探航
place:
  primary_field: 港口／海峽
  secondary_fields: [商路, 資源產地]
  locations:
    - { name_ancient: 休達, name_modern: 休達（摩洛哥北端，西班牙屬地）, lat: 35.8894, lng: -5.3213, precision: exact, role: 1415 年葡萄牙攻占的摩洛哥港口，亨利在此受封騎士, src: [s1, s2] }
    - { name_ancient: 拉古什, name_modern: 拉古什（葡萄牙阿爾加維）, lat: 37.1028, lng: -8.6730, precision: exact, role: 1444 到 1446 年間多達四十艘船為亨利從此出海的港口, src: [s1] }
    - { name_ancient: 博哈多爾角, name_modern: 博傑杜爾角（西撒哈拉）, lat: 26.1272, lng: -14.4856, precision: exact, role: 1434 年埃阿尼什繞過的海角，當時被視為難以通過的障礙, src: [s1, s2] }
    - { name_ancient: 阿爾金灣（阿爾金堡）, name_modern: 阿爾金島（茅利塔尼亞）, lat: 20.6000, lng: -16.5000, precision: schematic, role: 1443 年葡萄牙人發現的海灣，亨利後來在此建小堡壘，用穀物、布料換黃金與奴隸, src: [s1, s2] }
    - { name_ancient: 佛得角（綠角）, name_modern: 佛得角半島（塞內加爾達卡一帶）, lat: 14.7200, lng: -17.4700, precision: schematic, role: 1444 年迪尼什·迪亞什繞過的海角（座標為示意）, src: [s1, s2] }
  scale: line
structure_tags: [商路改道, 快速擴張, 慢變結構]
topics: [航海, 海上貿易, 奴隸制, 對外擴張, 宗教]
links: [event-portuguese-empire, event-atlantic-slave-trade, event-vasco-da-gama, tech-sail-navigation, tech-compass]
effects:
  - { id: event-portuguese-empire, rel: 背景, why: 亨利時期摸熟的西非海岸與據點，讓葡萄牙後來能接著建堡壘、再由迪亞士在 1488 年繞過好望角。, src: [s2, event-portuguese-empire:s4] }
  - { id: event-atlantic-slave-trade, rel: 背景, why: 1444 年起非洲人被帶到葡萄牙，1455 年教宗詔書又准許把非基督徒貶為奴隸，成為後來大西洋奴隸貿易的早期背景。, src: [s1, s3, s4] }
counterparts: "無適當對照：鄭和下西洋（event-zheng-he-voyages）時間重疊，但本卡來源沒有直接比較兩者，不硬湊。"
sources:
  - { id: s1, title: "Prince Henry the Navigator — Wikipedia（英文）", url: "https://en.wikipedia.org/wiki/Prince_Henry_the_Navigator", accessed: 2026-11-17, tier: 百科 }
  - { id: s2, title: "Portuguese discoveries — Wikipedia（英文）", url: "https://en.wikipedia.org/wiki/Portuguese_discoveries", accessed: 2026-11-17, tier: 百科 }
  - { id: s3, title: "Romanus Pontifex（教宗尼古拉五世詔書，1455 年 1 月 8 日）英譯 — Papal Encyclicals Online", url: "https://www.papalencyclicals.net/nichol05/romanus-pontifex.htm", accessed: 2026-11-17, tier: 一手 }
  - { id: s4, title: "Romanus Pontifex — Wikipedia（英文）", url: "https://en.wikipedia.org/wiki/Romanus_Pontifex", accessed: 2026-11-17, tier: 百科 }
  - { id: s5, title: "Gomes Eanes de Zurara, The Chronicle of the Discovery and Conquest of Guinea（Beazley & Prestage 英譯）第七章章名與摘要 — Cambridge University Press（Hakluyt Society 版；全文需付費，僅開到摘要頁）", url: "https://www.cambridge.org/core/books/abs/chronicle-of-the-discovery-and-conquest-of-guinea/in-which-five-reasons-appear-why-the-lord-infant-was-moved-to-command-the-search-for-the-lands-of-guinea/8B43EA1B9BCCE4BC4E9FECC52AD00948", accessed: 2026-11-17, tier: 一手 }
images:
- url: https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Henricus_Martellus_-_Map_of_the_world_-_1489_-_Yale_archive.jpg/960px-Henricus_Martellus_-_Map_of_the_world_-_1489_-_Yale_archive.jpg
  page: https://commons.wikimedia.org/wiki/File:Henricus_Martellus_-_Map_of_the_world_-_1489_-_Yale_archive.jpg
  title: "馬泰魯斯世界地圖（約 1489 年）"
  creator: "亨利庫斯・馬泰魯斯（Henricus Martellus）"
  year: "約 1489 年"
  holder: "耶魯大學圖書館（美國）"
  license: "Public domain"
  caption: "葡萄牙人沿非洲海岸一路南探，這張約 1489 年的地圖畫出了非洲南端，反映迪亞士繞過好望角前後歐洲人對非洲的新認識。"
importance: 3
learn:
  histories: [歐洲史, 世界通史]
  why_care: 後來繞過非洲、到達印度的航線，是從一小段一小段的非洲海岸探航累積出來的；同一批航行也開啟了歐洲人從西非買奴隸與黃金的生意。
  story: |
    1415 年，21 歲的葡萄牙王子亨利跟著父王攻下摩洛哥的港口休達，在那裡受封騎士。[s1][s2] 1420 年他成為基督騎士團的管理人，這個團體的收入是他資助航海計畫的重要財源之一。[s1] 當時歐洲水手把非洲西岸的博哈多爾角看成難以通過的障礙；亨利派出的十五次探險都失敗，1434 年吉爾·埃阿尼什才成為第一個確定繞過的歐洲人。[s1][s2] 1440 年代，船隊開始從西非帶回黃金和被抓的人；1444 到 1446 年間，多達四十艘船從拉古什出海。[s1] 1455 年，教宗尼古拉五世的詔書承認葡萄牙在博哈多爾角以南的獨占航行與貿易權，也准許把非基督徒「貶為永久奴隸」。[s3][s4] 1460 年亨利去世。[s1] 後人叫他「航海家亨利」，但在他生前和之後約三百年都沒有人這樣稱呼他，這個稱號是 19 世紀才流行的。[s1]
  key_terms:
    - { term: 博哈多爾角, plain: 非洲西北岸外突的海角，船要繞過它才能繼續往南。, example: 像一條路上最難通過的路口，過了這裡後面的路才打得開。 }
    - { term: 基督騎士團, plain: 葡萄牙王國的宗教與軍事組織，有自己的收入與領地，亨利是它的管理人。, example: 像一個有自己財產的大型社團，社長可以拿社團的錢辦活動。 }
    - { term: 教宗詔書, plain: 教宗發出的正式文件，在當時的歐洲有很大的宗教與政治分量。, example: 像最高機關發的公文，天主教國家通常會承認，但別的國家不一定照辦。 }
  primary_source:
    - { text: "to reduce their persons to perpetual slavery（把他們的人身貶為永久奴隸；指撒拉森人與異教徒）", from: 教宗尼古拉五世《Romanus Pontifex》（1455 年 1 月 8 日），英譯見 Papal Encyclicals Online；中文為本站摘譯, src: s3 }
  historiography: |
    **亨利是「航海家」嗎？** 傳統說法把亨利寫成在薩格里什建立「航海學校」、親自指揮探航的人。英文維基整理的現代看法是：那裡沒有一個有組織的航海中心或天文臺，這個傳說起於 18 世紀；「航海家亨利」這個稱呼也是 19 世紀的德國學者先用、再由英國作者推廣，亨利生前並沒有人這樣叫他。[s1] 他比較像是出資、取得壟斷權、派船出海的王子與贊助者。[s1][s2]
    **他為什麼要出海？** 同時代的編年史家祖拉拉（Zurara）專門用一章說明亨利下令探索幾內亞的「五個理由」，本卡只開到該章摘要頁，沒有讀到全文。[s5] 英文維基整理的動機包括：了解穆斯林勢力在非洲延伸多遠、接上跨撒哈拉的黃金貿易、尋找傳說中的基督教國王「祭司王約翰」；教宗詔書則寫成「為了拯救靈魂的熱忱」。[s2][s3] 這些說法是並列的動機，史料沒有告訴我們哪一個最重要。
  misconceptions:
    - 「亨利在薩格里什開辦航海學校」是後世的說法：現代史家認為並沒有一個有組織的航海中心或天文臺，這個傳說起於 18 世紀。[s1]
    - 「航海家亨利」不是他生前的稱號，是 19 世紀的作者才叫開的。[s1]
    - 亨利本人不是環遊世界的探險家；他是出資與組織者，真正繞過博哈多爾角的是船長埃阿尼什。[s1]
  pop_culture:
    - { claim: 亨利在薩格里什辦了航海學校，培養水手與地圖師，因此葡萄牙領先歐洲。, fact: "英文維基引現代史家的看法：沒有有組織的航海中心或天文臺，這個傳說在 18 世紀才出現。[s1]", src: [s1] }
    - { claim: 教宗的詔書把非洲「分給」葡萄牙，所以葡萄牙能合法獨占西非貿易。, fact: "1455 年詔書確實承認葡萄牙在博哈多爾角以南的獨占權，但法國、英國等後來並不接受；詔書只是葡萄牙主張權利的一種依據。[s3][s4]", src: [s3, s4] }
  perspectives:
    - { history: 歐洲史, text: 從歐洲看，這是一個小王國靠國王、貴族與教會組織的資金，一小段一小段地把大西洋南岸摸熟的過程。 }
    - { history: 世界通史, text: 從西非看，這些航行最直接的代價，是被抓走、被買賣的人；沿岸也不是空白，葡萄牙人 1471 年到埃爾米納時，當地已有阿拉伯與柏柏爾商人經營的陸路黃金貿易。本卡的來源多是歐洲一側的敘述，非洲人自己留下的紀錄，這裡沒有讀到。 }
verification: 交叉確認
crosscheck: { date: 2026-11-17, by: 獨立查核 agent（歷史學者＋教育者，未參與寫作）, result: 通過, notes: "已重開：英文維基〈Prince Henry the Navigator〉×2、〈Portuguese discoveries〉、Romanus Pontifex 英譯（papalencyclicals.net，逐字核對 reduce their persons to perpetual slavery 等語）。【修正後通過】修正：1437 年丹吉爾「使亨利更專注海上」來源不支持，已刪；馬德拉／亞速爾年份依兩頁維基並列註明出入；金克魯扎多「1452 年前」改為維基原文「到 1452 年」；「阿爾加維賺錢壟斷」具體為鮪魚捕撈壟斷；「香料 1498 年後才是目標」是推論，改為照實說明；詔書「豁免通商限制」改為英譯原文的買賣許可與禁運品項；阿爾金貿易站 1445 與 1443 壟斷權採〈Portuguese discoveries〉說法（亨利頁未給）。未能重開：祖拉拉《幾內亞編年史》（只有付費摘要頁，卡內已註明）、英文維基〈Romanus Pontifex〉（s4）、Dum Diversas 內文；亨利卒日 11/13 與 12/13 維基自相矛盾，卡內只寫 1460。思想家欄：已用 WebSearch 搜尋，未見李彔、哈拉瑞直接談亨利王子，維持無直接論述。" }
lens_status: 無直接論述
---

## C1 背景

葡萄牙在伊比利半島西南端，面向大西洋（地理位置，本卡未另附來源）。早在 14 世紀，國王迪尼什（Dinis）就在 1317 年組織一支有熱那亞背景的海軍來對付穆斯林海盜，阿方索四世在 1325 到 1357 年間資助商船隊與最早的探索。[s2] 1415 年葡萄牙攻占摩洛哥的休達，動機包括在摩洛哥取得據點、控制直布羅陀海峽的航運、傳播基督教，也讓貴族有機會取得財富與榮譽。[s2] 亨利在 1420 年成為基督騎士團的管理人，又握有阿爾加維地區的鮪魚捕撈壟斷權，這些收入支持他的航海計畫。[s1][s2] 亨利想做的事包括：弄清穆斯林勢力在非洲延伸多遠、接上跨撒哈拉的黃金貿易、尋找傳說中的基督教國王「祭司王約翰」；英文維基把香料壟斷放在 1498 年達伽馬到印度之後才談；亨利時代來源列的目標就是上述幾項。[s2]

## C2 經過

- **1415 年**：葡萄牙攻占休達，亨利在此受封騎士，並成為維塞烏公爵。[s1]
- **1418–1432 年**：1418 年波爾圖桑圖被發現，1419 到 1420 年馬德拉有人登陸、移居（兩頁維基的年份略有出入）；亞速爾群島約在 1427 年前後被發現（英文維基說這是對一幅海圖的解讀），之後有人定居。[s1][s2]
- **1434 年**：吉爾·埃阿尼什在亨利十年間派出十五次失敗的探險之後，成為第一個確定繞過博哈多爾角的歐洲人。[s1]
- **1437 年**：亨利是進攻丹吉爾的主要策劃者，這次遠征慘敗。[s1]
- **1443–1445 年**：亨利取得博哈多爾角以南的壟斷權；葡萄牙人發現阿爾金灣，並在 1445 年建立阿爾金貿易站，用穀物、布料、亞麻與白銀換黃金粉與奴隸。[s1][s2]
- **1444 年**：迪尼什·迪亞什到達佛得角海角；1444 到 1446 年間，多達四十艘船從拉古什為亨利出海，黃金與奴隸開始運到葡萄牙。[s1][s2]
- **1452、1455 年**：教宗發出《Dum Diversas》與《Romanus Pontifex》，支持葡萄牙的貿易壟斷。[s2][s4]
- **1453–1456 年**：威尼斯人卡達莫斯托探索非洲大西洋岸，並在 1456 年到達佛得角群島的部分島嶼。[s1]
- **1460 年**：亨利去世。[s1]（維基百科正文寫 11 月 13 日、資訊框寫 12 月 13 日，各處不一。）

## C3 關鍵人物與群體

亨利王子（約翰一世之子，1394–1460）；船長吉爾·埃阿尼什與迪尼什·迪亞什；威尼斯探險家卡達莫斯托；國王阿方索五世；教宗尼古拉五世；以及在西非沿岸被抓、被買賣的非洲人，和已經在跨撒哈拉黃金貿易中活動的阿拉伯與柏柏爾商人。[s1][s2][s3]

## C4 制度或機制變化

1. **王室與騎士團出資**：基督騎士團與亨利的壟斷權提供資金。[s1][s2]
2. **獨占權**：1443 年起亨利取得博哈多爾角以南的壟斷；1455 年詔書描述的規則是，沒有國王或亨利的許可，任何人不得航行到那些地區、在港口交易或在海裡捕魚。[s2][s3]
3. **宗教與法律的依據**：詔書授權葡萄牙「入侵、搜索、捕捉、征服所有撒拉森人與異教徒」並「貶為永久奴隸」，也允許葡萄牙人與撒拉森人、異教徒買賣貨物，但鐵器、造船木材、繩索、船與各種盔甲不得賣給他們。[s3][s4]
4. **貨幣**：流入的黃金使葡萄牙到 1452 年時已鑄出第一批金「克魯扎多」幣，1 克魯扎多等於 400 里斯（reis）。[s1]

## C5 受益者與受損者

**受益**：葡萄牙王室、亨利與參與出資、出海的貴族與商人（取得黃金、貿易壟斷與榮譽）。[s1][s2]
**受損**：在西非沿岸被抓、被運往葡萄牙的非洲人；以及原本在跨撒哈拉黃金貿易中居中轉運的穆斯林商人，因為葡萄牙人從海上直接到黃金產地買黃金。[s1][s2]（最後一點是對來源的合理解讀，來源只說 1471 年到埃爾米納時當地已有由阿拉伯與柏柏爾商人經營的陸路黃金貿易。）

## C6 直接結果

1440 年代起，黃金與奴隸開始運回葡萄牙，到 1452 年時已鑄成第一批金克魯扎多幣。[s1] 葡萄牙在阿爾金灣設立堡壘與貿易站，並取得教宗對獨占權的承認。[s1][s3] 1471 年葡萄牙人到達埃爾米納，發現當地已有陸路黃金貿易；1481 年國王若昂二世決定在那裡建聖若熱達米納堡，作為王室壟斷的據點。[s2]

## C7 長期影響

1482 年迪奧戈·康到達剛果河口，1488 年迪亞士繞過好望角，證明印度洋與大西洋相通。[s2] 之後達伽馬在 1498 年到達印度，見〈達伽馬航行〉卡（event-vasco-da-gama）。西非沿岸的黃金與人口買賣則成為後來大西洋奴隸貿易的早期環節，見〈大西洋奴隸貿易〉卡（event-atlantic-slave-trade）。[s1][s2]

## C8 雙軌解讀

### 李彔

無直接論述：沒有查到李彔直接談亨利王子與西非探航。

### 哈拉瑞

無直接論述：沒有查到哈拉瑞直接談亨利王子與西非探航。

## C9 今日對照鉤子

「國家用特許權與壟斷換取民間或自己的資金，去探索不確定的新領域」：亨利的收入來自騎士團和壟斷權，風險很高，失敗十五次才有第一次突破。[s1][s2] 另一個結構是：後人常把成果集中到一個「英雄」身上，寫成學校、天才與創舉，而實際上是一群船長、資助者與制度共同造成的。[s1]

## C10 不可類比的差異

這不是今天的科研投資或企業創新。當時的出海同時是軍事、傳教與貿易行動，並且伴隨抓捕與買賣人口；教宗詔書把這些行為說成合法並授予壟斷權，今天的國際法與人權觀念完全不接受這種做法。[s3][s4] 此外，本卡講的「動機」多半來自同時代宮廷編年史與後人整理，不能當成亨利本人說過的話。[s1][s5]
