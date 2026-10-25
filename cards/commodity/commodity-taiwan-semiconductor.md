---
id: commodity-taiwan-semiconductor
type: commodity
name: 臺灣的半導體（晶片）
aliases: [半導體, 晶片, 積體電路, IC, 晶圓, 晶圓代工, 護國神山, 矽盾, 先進製程, 封裝測試, IC 設計, semiconductor, chip, silicon shield, foundry]
civilization: [臺灣（中華民國）]
track: east
time:
  start: 1976
  end: 2023
  precision: approx
  src: [s1, s2, s3]
summary_line: 物資｜工業／製造區｜新竹、臺南等科學園區｜臺灣的半導體（晶片）
place:
  primary_field: 工業／製造區
  secondary_fields: [商路]
  locations:
    - { name_ancient: 新竹科學園區, name_modern: 新竹市（臺灣）, lat: 24.7800, lng: 121.0060, precision: schematic, role: 晶圓製造重鎮（示意）, src: [s1, s4] }
    - { name_ancient: 美國（晶片設計）, name_modern: 美國加州矽谷一帶（示意）, lat: 37.3875, lng: -122.0575, precision: schematic, role: 全球約七成 IC 設計營收在美國（2023）, src: [s2] }
  scale: area
structure_tags: [關鍵原料壟斷, 單一港口依賴, 技術代差, 標準化量產]
links: [event-hsinchu-park-tsmc, tech-internet]
counterparts: 無適當對照：西方軌沒有「一個地方掌握全球關鍵工業品」的同時代物資卡；結構上可參考「霍爾木茲海峽」等今日咽喉。
sources:
  - { id: s1, title: "Semiconductor industry in Taiwan — Wikipedia", url: "https://en.wikipedia.org/wiki/Semiconductor_industry_in_Taiwan", accessed: 2026-10-25, tier: 百科 }
  - { id: s2, title: "Taiwan's Semiconductor Manufacturing Industry and Its Role in the International Supply Chain（Backgrounder）— Institute for Security and Development Policy（斯德哥爾摩），2025-02-10", url: "https://isdp.eu/wp-content/uploads/2025/02/Backgrounder-Taiwan-feb-10.pdf", accessed: 2026-10-25, tier: 通論 }
  - { id: s3, title: "Oral History of Morris Chang（訪談者 Alan Patterson，2007-08-24）— Computer History Museum, CHM Ref. X4151.2008", url: "https://archive.computerhistory.org/resources/access/text/2013/05/102658129-05-01-acc.pdf", accessed: 2026-10-25, tier: 一手 }
  - { id: s4, title: "TSMC — Wikipedia", url: "https://en.wikipedia.org/wiki/TSMC", accessed: 2026-10-25, tier: 百科 }
  - { id: s5, title: "Chip War（Chris Miller, Scribner 2022）— Wikipedia（含書評摘要）", url: "https://en.wikipedia.org/wiki/Chip_War", accessed: 2026-10-25, tier: 摘要 }
  - { id: s6, title: "Ling-Ming Huang，A Short History of Semiconductor Technology in Taiwan during the 1970s and the 1980s — Taiwan Insight，2024-05-10", url: "https://taiwaninsight.org/2024/05/10/a-short-history-of-semiconductor-technology-in-taiwan-during-the-1970s-and-the-1980s/", accessed: 2026-10-25, tier: 學術 }
importance: 3
learn:
  histories: [臺灣史, 科技史]
  why_care: 手機、電腦、汽車、AI 都需要晶片，而全世界大部分的晶片「代工」都在臺灣；這讓一座小島變成全世界都在看的地方。
  story: |
    晶片是把大量微小電子開關做在矽片上的零件，幾乎所有電子產品都需要它。[s1] 臺灣從 1976 年向美國 RCA 學技術開始，一路發展出自己的晶片製造業。[s1][s6] 根據瑞典智庫整理，2023 年臺灣的晶圓代工占全球市場約四分之三，封裝測試約占一半；台積電製造全世界一半以上的先進晶片。[s1][s2] 但臺灣並不是什麼都自己來：IC 設計約七成營收在美國，製造設備大多從美國、荷蘭、日本進口，前段材料臺灣自己只生產約 1%。[s2] 晶片高度集中在臺灣海峽旁，被有些人稱為「矽盾」，也有人認為這反而是風險。[s1][s5]
  key_terms:
    - { term: 半導體, plain: 導電能力介於導體（例如銅）和絕緣體（例如塑膠）之間的材料，最常用的是矽。, example: 像可以調整大小的水龍頭，能控制電流開或關。 }
    - { term: 供應鏈, plain: 一個產品從原料、零件、製造到送到你手上，中間所有公司和國家連成的鏈子。, example: 一杯珍奶要有茶葉、牛奶、珍珠、杯子、店員，少一樣都做不出來。 }
    - { term: 封裝測試, plain: 把做好的晶片包上外殼、接上腳位，再測試能不能正常運作。, example: 蛋糕烤好後要裝盒、檢查有沒有壓壞，才能出貨。 }
    - { term: 矽盾, plain: 認為臺灣因為晶片太重要，所以別國不敢輕易攻打它的說法。, example: 班上只有你會修冷氣，大家都不想跟你翻臉。 }
  primary_source:
    - { text: "We had no strength in research and development, or very little anyway.（我們在研發上沒有什麼優勢，就算有也很少。）", from: 張忠謀 2007 年電腦歷史博物館口述歷史，談 1980 年代臺灣半導體的起點（頁 12；中文為本站摘譯）, src: s3 }
  historiography: |
    **矽盾能保護臺灣嗎？** 「矽盾」的說法認為，全世界都依賴臺灣的晶片，所以臺灣比較安全；《紐約時報》也寫臺灣靠晶片產業的主導地位作為防衛的一部分。[s1] 但前美國官員博明（Matthew Pottinger）2022 年質疑這種想法，維基百科也整理了臺灣一份民調（遠見民調），說多數受訪者認為台積電赴美投資會削弱「矽盾」（本站只找到這一個轉述來源）。[s1]
    **晶片是「新石油」嗎？** 經濟史學者克里斯．米勒（Chris Miller）的《晶片戰爭》指出，最先進的邏輯晶片大多在臺灣製造；有書評用「武器化的相互依賴」來形容今天的晶片產業。[s5] 書評者艾肯格林（Barry Eichengreen）則提醒，這本書沒有評估美國出口管制會不會反而逼中國加速發展、甚至對臺灣採取行動。[s5]
  misconceptions:
    - 臺灣不是自己就能做出晶片的全部流程：設計軟體、設備和材料大量依賴美國、荷蘭、日本。[s2]
    - 「台積電」和「臺灣半導體」不是同一件事：臺灣還有大量 IC 設計、封裝測試和材料設備公司。[s2][s6]
  perspectives:
    - { history: 臺灣史, text: 從臺灣看，半導體是戰後經濟從農業、加工出口一路升級的最新一站。 }
    - { history: 科技史, text: 從科技史看，晶片是 20 世紀後半最重要的「通用物資」，地位像工業革命時的煤和鐵。 }
verification: 交叉確認
lens_status: 無直接論述
---

## B1 物資與用途

晶片（積體電路）是電腦、手機、汽車、伺服器與 AI 運算的核心零件。[s1][s5] 臺灣主要做的是「晶圓代工」：替別的公司把設計好的晶片製造出來。[s1][s4]

## B2 產地與控制權

製造集中在臺灣的科學園區，最大的公司是台積電；2023 年台積電半導體營收全球第一。[s2][s4] 但設計（約七成營收在美國）、設備（美國、荷蘭、日本）與材料由其他國家掌握，是一條高度分工的全球供應鏈。[s2]

## B3 生產技術與勞動

晶片製造需要極精密的設備與大量工程師；臺灣從 1976 年派工程師赴美國 RCA 受訓起步，逐步累積製程經驗。[s1][s6]

## B4 運輸路線與咽喉

生產集中在臺灣海峽旁，一旦發生衝突或天災，全球供應都會受影響。[s1][s5]

## B5 規模與數量

根據瑞典智庫 ISDP 整理的 2023 年數字（單一來源）：臺灣晶圓代工約占全球市場 75.2%、封裝測試營收約 50.4%、IC 設計約 19.3%（美國約 71%）；2022 年臺灣自產設備只占自身使用的約 10%。[s2] 台積電約占全球晶圓代工市場七成。[s4]（數字為當年估計，會隨時間改變。）

## B6 經濟與財政角色

半導體是臺灣最重要的產業之一，台積電 2023 年半導體營收全球第一，也是許多國際大廠的主要供應商（例如蘋果、輝達）。[s1][s2]

## B7 權力與政治連結

晶片成為中美競爭的焦點；「矽盾」說法認為晶片讓臺灣更安全，但也有人認為集中反而是風險，台積電赴美投資也引發爭論。[s1][s5]

## B8 雙軌解讀

### 李彔

無直接論述：查不到李彔公開講稿談臺灣半導體。

### 哈拉瑞

無直接論述：本站查到的哈拉瑞公開摘要沒有專門談臺灣半導體。

## B9 今日對照鉤子

「一個地方掌握全球關鍵物資」的結構：和歷史上控制白銀、香料或石油咽喉的地方一樣，既帶來財富，也帶來被爭奪的風險。[s2][s5]

## B10 不可類比的差異

晶片不是挖出來的天然資源，而是靠技術、人才和整條國際分工做出來的；別國可以花錢、花時間追上，所以不能把它直接當成「臺灣的石油」。[s2][s6]
