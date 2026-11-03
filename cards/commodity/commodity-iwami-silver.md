---
id: commodity-iwami-silver
type: commodity
name: 石見銀山：日本白銀流向中國（1527–1923）
aliases: [石見銀山, Iwami Ginzan, 日本銀, 灰吹法, 大森銀山, 神屋壽禎, 石見, 藤田組, Iwami silver mine, Hivami, cupellation, haifuki]
civilization: [日本（戰國、江戶）]
track: east
time:
  start: 1527
  end: 1923
  precision: disputed
  src: [s1, s2, s3]
summary_line: 物資｜資源產地｜石見（今島根縣大田市）｜石見銀山：日本白銀流向中國（1527–1923）
place:
  primary_field: 資源產地
  secondary_fields: [商路]
  locations:
    - { name_ancient: 石見銀山（大森）, name_modern: 島根縣大田市大森町（日本）, lat: 35.1080, lng: 132.4430, precision: schematic, role: 銀礦與冶煉區（示意）, src: [s1, s2] }
    - { name_ancient: 溫泉津港, name_modern: 島根縣大田市溫泉津町（日本）, lat: 35.0930, lng: 132.3480, precision: schematic, role: 運出白銀的港口之一（示意）, src: [s4] }
  scale: area
structure_tags: [意外財源, 技術擴散, 關鍵原料壟斷, 商路改道]
topics: [白銀, 絲綢與絲路]
links: [commodity-silver-flow, commodity-manila-galleon, finance-ming-baochao, commodity-laurion-silver, person-mori-motonari, event-wokou-ningbo, commodity-nanban-trade, event-sengoku-japan, event-portuguese-empire]
causes:
  - { id: finance-ming-baochao, rel: 背景, why: "明朝寶鈔失敗後改以白銀繳稅、發軍餉，中國對銀需求極大，日本白銀才能大量運去換中國絲綢。", src: [s3, s5, s7] }
effects:
  - { id: commodity-silver-flow, rel: 促成, why: "石見等日本銀山大量產銀，先由走私海商、1557年後也由葡萄牙人運進中國，成為流入明朝的白銀主要來源之一。", src: [s3, s8] }
counterparts:
  - { id: commodity-laurion-silver, note: "相似：都是一座銀礦讓一個地區突然有錢，並改變當時的政治與貿易（雅典靠勞里昂銀礦建艦隊；戰國日本靠石見銀買中國絲綢與武器）。不同：勞里昂是古希臘的事、靠奴隸開採；石見是 16 世紀的事，銀子大量流向明朝中國，成為全球白銀流動的一部分。", src: [s3, s4] }
sources:
  - { id: s1, title: "Iwami Ginzan Silver Mine — Wikipedia", url: "https://en.wikipedia.org/wiki/Iwami_Ginzan_Silver_Mine", accessed: 2026-10-25, tier: 百科 }
  - { id: s2, title: "石見銀山遺跡とその文化的景観 概要 — 島根縣", url: "https://www.pref.shimane.lg.jp/life/bunka/bunkazai/ginzan/outline.html", accessed: 2026-10-25, tier: 通論 }
  - { id: s3, title: "Iwami Ginzan and International Contacts — 日本觀光廳多語解說資料庫（2020 年度）", url: "https://www.mlit.go.jp/tagengo-db/en/R2-00247.html", accessed: 2026-10-25, tier: 通論 }
  - { id: s4, title: "UNESCO World Heritage Centre, Iwami Ginzan Silver Mine and its Cultural Landscape", url: "https://whc.unesco.org/en/list/1246/", accessed: 2026-10-25, tier: 通論 }
  - { id: s5, title: "丸橋充拓，〈中華帝国の財政と東アジアの銀流通〉（研究編，頁 7–17）— 島根大學學術機構典藏", url: "https://ir.lib.shimane-u.ac.jp/38021/files/8970", accessed: 2026-10-25, tier: 學術 }
  - { id: s6, title: "Iaponiae Insulae Descriptio（奧特里烏斯地圖集，1595）館藏說明 — 立命館大學 ARC", url: "https://www.arc.ritsumei.ac.jp/lib/vm/SISJAC/2018/09/51-iaponiae-insvlae-descriptio.html", accessed: 2026-10-25, tier: 一手 }
  - { id: s7, title: "Mark Cartwright, Ming Taxation & the Silver Economy — World History Encyclopedia", url: "https://www.worldhistory.org/article/3004/ming-taxation--the-silver-economy/", accessed: 2026-10-25, tier: 通論 }
  - { id: s8, title: "Ota Atsushi, The Dutch East India Company and the Rise of Intra-Asian Commerce — nippon.com，2013-09-18", url: "https://www.nippon.com/en/features/c00105/the-dutch-east-india-company-and-the-rise-of-intra-asian-commerce.html", accessed: 2026-10-25, tier: 學術 }
  - { id: s9, title: "Osher Map Library, An Early European Imagining of Japan（泰謝拉 1595 年日本地圖解說）", url: "https://oshermaps.org/exhibitions/map-commentaries/early-european-imagining-japan", accessed: 2026-10-25, tier: 通論 }
  - { id: s10, title: "內閣府，〈第3章 第5節 ケーススタディ2：石見銀山〉（地域の経済 2007）", url: "https://www5.cao.go.jp/j-j/cr/cr07/chr07_3-5-4.html", accessed: 2026-10-25, tier: 通論 }
  - { id: s11, title: "石見銀山 — Wikipedia（日文）", url: "https://ja.wikipedia.org/wiki/石見銀山", accessed: 2026-11-03, tier: 百科 }
  - { id: s12, title: "石見銀山ねずみ捕り — Wikipedia（日文）", url: "https://ja.wikipedia.org/wiki/石見銀山ねずみ捕り", accessed: 2026-11-03, tier: 百科 }
importance: 2
learn:
  histories: [日本史, 錢的歷史, 中國史]
  why_care: 16 世紀日本一座山裡挖出的白銀，一路流到明朝中國，還讓歐洲人的地圖上第一次標出了「銀礦山」。
  story: |
    1526 或 1527 年（說法不一），博多商人神屋壽禎發現（開發）了石見銀山。[s1][s2][s3][s10] 1533 年，從朝鮮半島傳來的「灰吹法」提煉技術讓產量大增。[s2][s3] 這時明朝正需要大量白銀，石見銀在 16 世紀中葉大量流進中國：明朝禁止和日本貿易，起初多由中國走私海商（倭寇）偷運；1557 年葡萄牙人在澳門落腳後，也用中國絲綢到長崎換取日本白銀。[s3][s5][s8] 日本觀光廳的資料估計，16 世紀後期全世界交易的白銀至少一成來自石見。[s3] 1595 年歐洲出版的日本地圖，在「Hivami」（石見）旁標出了銀礦山。[s6][s9] 江戶時代石見歸幕府直轄，1923 年停止開採，2007 年列入世界遺產。[s2][s4]
  key_terms:
    - { term: 灰吹法, plain: 一種把銀從礦石裡分離出來的冶煉方法，先把銀和鉛熔在一起，再把鉛吸掉、留下純銀。, example: 像用濾紙把咖啡渣和咖啡分開。 }
    - { term: 直轄, plain: 由中央政府直接管理，不交給地方領主。, example: 學校重要的設備由校長室直接管，不交給各班。 }
    - { term: 世界遺產, plain: 聯合國教科文組織認定對全人類有重要價值、需要保護的地方。, example: 中國的長城、日本的富士山都是。 }
  primary_source:
    - { text: "Argenti fodinae（銀礦山，標在 Hivami＝石見 旁）", from: 葡萄牙製圖師泰謝拉（Luís Teixeira）繪製、1595 年收入奧特里烏斯地圖集的日本地圖〈Iaponiae Insulae Descriptio〉上的拉丁文標註（此處依拉丁文正寫；各館轉寫作 fodiane、fordiae）, src: s6 }
  historiography: |
    **石見銀到底占世界多少？** 數字說法不一：日本全國產銀約占世界三分之一（內閣府、維基百科），維基百科估計 17 世紀初日本每年產銀約 200 噸，石見每年約 38 噸；日本觀光廳則較保守，說 16 世紀後期世界交易的白銀「至少一成」來自石見。[s1][s3][s10] 前者講的是全日本、後者講的是石見一地，不能混為一談。
    **是誰把白銀「吸」進中國？** 常見說法是中國對白銀的巨大需求把全世界的銀吸了過去。[s7] 日本學者丸橋充拓則認為關鍵在明朝北方邊防：15 世紀末起邊境軍需改用白銀支付，「從鈔到銀」的轉換，讓北方邊境的動向和國外白銀流動直接連在一起。[s5]
  misconceptions:
    - 石見銀山不是日本人自己發明的冶煉技術：灰吹法是從朝鮮半島傳入的，源頭可追溯到中國。[s3][s4]
    - 石見銀主要不是日本人直接運到中國：16 世紀中葉多由中國走私海商（倭寇）運入，葡萄牙人在澳門落腳後也大量經手，用中國絲綢交換。[s3][s8]
  perspectives:
    - { history: 日本史, text: 從日本看，銀山是戰國大名爭奪的財源，後來成為德川幕府的重要收入。 }
    - { history: 中國史, text: 從中國看，日本白銀是明朝白銀經濟的重要來源之一。 }
    - { history: 錢的歷史, text: 從錢的歷史看，石見是 16 世紀全球白銀流動的東亞起點。 }
  pop_culture:
    - { claim: "歌舞伎、落語和怪談裡的毒藥「石見銀山（鼠捕り）」是石見銀山出產的。", fact: "這種江戶時代的殺鼠劑主成分是亞砒酸，產地其實是石見國的笹ヶ谷鉱山（今津和野町），並不產銀；因為同屬幕府直轄、由大森代官所管轄，才借用石見銀山的名氣取名。[s12]", src: [s12] }
    - { claim: "石見銀山一座礦就占了全世界三分之一的白銀。", fact: "日文維基的說法是：全盛期「日本」可能占世界銀產量約三分之一，石見是其中相當大的部分，但這是推定；較具體的數字是小葉田淳估計當時日本年產銀約 200 噸、石見約 38 噸。所有數字都是估計。[s11]", src: [s11] }
    - { claim: "銀山是毛利元就「發現」或一手打下來的。", fact: "1527 年博多商人神屋壽禎在大內氏支持下開礦，1533 年引進灰吹法；之後小笠原、大內、尼子反覆爭奪，毛利要到 1562 年尼子晴久死後才透過和議取得銀山，同年獻給朝廷作為御料所。[s11]", src: [s11] }
crosscheck: { date: 2026-10-25, by: 獨立查核 agent（未參與寫作）, result: 通過, notes: "初查不通過，依查核建議修正後複查通過；小建議已修正。 2026-11-03 第 2 期新增部分已查核：開 s11 s12，殺鼠劑產自笹ヶ谷鉱山（亞砒酸）、日本約占世界三分之一（推定）與小葉田淳 200／38 噸、1527 神屋壽禎・1533 灰吹法・1562 毛利取得並獻為御料所均相符；links 5 個 id 均存在。通過。" }
verification: 交叉確認
lens_status: 無直接論述
---

## B1 物資與用途

白銀：在明朝中國是繳稅與大額交易的主要貨幣；日本則用它換取中國絲綢等商品。[s3][s5][s7]

## B2 產地與控制權

石見銀山位於今島根縣大田市。早期由大內氏控制，之後毛利氏統治約 40 年直到關原之戰；1600 年後成為德川幕府直轄地。[s1][s2]

## B3 生產技術與勞動

1533 年從朝鮮半島傳入灰吹法，讓高純度白銀能大量生產；開採以許多小規模、靠人力的礦坑為主。[s2][s3][s4]

## B4 運輸路線與咽喉

白銀經港口運出；明朝禁止對日貿易，起初多由中國走私海商（倭寇）運進中國東南沿海，1557 年後葡萄牙人也經澳門—長崎航線用中國絲綢交換。[s3][s8]

## B5 規模與數量

- 17 世紀初石見每年產銀約 38 噸（估計）；日本全國約 200 噸（估計，只見於維基百科）。[s1]
- 16 世紀後期全世界交易的白銀至少約一成來自石見（估計）。[s3]
- 16 世紀後期流入中國的國外白銀估計每年約 30–40 萬兩（估計）。[s5]

## B6 經濟與財政角色

對戰國大名與德川幕府來說，銀山是重要財源；對明朝來說，日本白銀支撐了以白銀繳稅、發軍餉的財政體系。[s1][s5]

## B7 權力與政治連結

戰國時代各大名爭奪銀山；1603 年江戶幕府成立後，日本與世界經濟的連結大幅減少，直到 19 世紀後半。[s1][s3] 明治時期大阪藤田組接手石見，1896 年又取得臺灣瑞芳礦山，兩地之間交流技術與人員。[s3]

## B8 雙軌解讀

### 李彔

無直接論述：查不到李彔公開講稿談石見銀山。

### 哈拉瑞

無直接論述：查不到哈拉瑞公開摘要談石見銀山。

## B9 今日對照鉤子

「一個地方產出全球需要的關鍵物資，因此被捲入國際貿易與政治」的結構（參見臺灣半導體卡）。[s3][s5]

## B10 不可類比的差異

石見的白銀是天然礦產，挖完就沒了，1923 年停採；而且當時的「世界市場」主要靠少數商人與帆船連結，規模和速度都和今天不能相比。[s2][s3]
