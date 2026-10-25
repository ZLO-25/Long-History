---
id: tech-internet
type: tech
name: 網際網路
aliases: [互联网, 互聯網, 因特网, 網路, 网络, Internet, ARPANET, 阿帕網, TCP/IP, 封包交換, Packet switching, 全球資訊網, World Wide Web, WWW, 柏納茲—李, Tim Berners-Lee, 瑟夫, Vint Cerf, 卡恩, Bob Kahn, CERN, NSFNET]
civilization: [美國]
track: west
time:
  start: 1969
  end: 2000
  precision: approx
  src: [s1, s2, s4]
summary_line: 技術｜思想場域｜洛杉磯（UCLA）—日內瓦（CERN）｜網際網路
place:
  primary_field: 思想場域
  secondary_fields: [城市／都會, 金融中心]
  locations:
    - { name_ancient: 加州大學洛杉磯分校, name_modern: 洛杉磯（美國加州）, lat: 34.0689, lng: -118.4452, precision: schematic, role: 1969 年阿帕網第一個節點，發出第一則訊息（座標為今校園）, src: [s1, s2] }
    - { name_ancient: 史丹佛研究院, name_modern: 門洛帕克（美國加州）, lat: 37.453, lng: -122.1817, precision: schematic, role: 1969 年阿帕網第二個節點，接收第一則訊息（座標為示意）, src: [s1, s2] }
    - { name_ancient: 歐洲核子研究組織, name_modern: 日內瓦近郊（瑞士）, lat: 46.233, lng: 6.0557, precision: schematic, role: 1989–1991 年全球資訊網在此誕生（座標為示意）, src: [s3] }
  scale: area
structure_tags: [資訊傳播革命, 基礎建設網絡, 快速擴張, 技術擴散]
links: [tech-telegraph, tech-printing-press, tech-movable-type, tech-container-shipping, event-end-of-cold-war]
counterparts:
  - { id: tech-movable-type, note: "相似：兩者都大幅降低複製與傳遞文字的成本，改變了誰能取得知識。不同：北宋畢昇約 1040 年發明的陶活字要大量印刷才划算，資訊仍是由少數印書者發出；網際網路讓每個連上網的人都能同時發送和接收，而且幾乎不必付複製成本。", src: [s4, s7] }
sources:
  - { id: s1, title: "ARPANET — Wikipedia", url: "https://en.wikipedia.org/wiki/ARPANET", accessed: 2026-10-25 }
  - { id: s2, title: "Leiner，Cerf，Kahn 等，Brief History of the Internet — Internet Society", url: "https://www.internetsociety.org/internet/history-internet/brief-history-internet/", accessed: 2026-10-25 }
  - { id: s3, title: "World Wide Web — Wikipedia", url: "https://en.wikipedia.org/wiki/World_Wide_Web", accessed: 2026-10-25 }
  - { id: s4, title: "Internet — Wikipedia", url: "https://en.wikipedia.org/wiki/Internet", accessed: 2026-10-25 }
  - { id: s5, title: "Nexus: A Brief History of Information Networks from the Stone Age to AI — Wikipedia", url: "https://en.wikipedia.org/wiki/Nexus:_A_Brief_History_of_Information_Networks_from_the_Stone_Age_to_AI", accessed: 2026-10-25 }
  - { id: s6, title: "王雅〈從「李約瑟之問」到「李錄之答」〉— 香港01（2020）", url: "https://www.hk01.com/article/471578", accessed: 2026-10-25 }
  - { id: s7, title: "Movable type — Wikipedia", url: "https://en.wikipedia.org/wiki/Movable_type", accessed: 2026-10-25 }
verification: 交叉確認
lens_status: 依公開資料推論，未對照原書
---

## T1 是什麼、解決什麼問題

網際網路是「網路的網路」：把世界各地各自獨立的電腦網路，用同一套通訊規則（TCP/IP）連在一起。[s2][s4] 資料會被切成一個個小「封包」，各自找路送到目的地再組合起來，這叫封包交換。[s1][s2] 它最早要解決的問題，是讓研究人員共用當時稀少又昂貴的大型電腦。[s1]

## T2 發明與起源

- **封包交換的構想**：美國的克萊因羅克 1961 年發表理論、蘭德公司的巴蘭 1964 年提出封包網路，英國的戴維斯也獨立想出同樣概念，「封包」一詞就來自他的團隊。[s1][s2] 這是「同時多人各自想到」的例子。
- **1969 年**：美國國防部高等研究計畫署出資的阿帕網上線；10 月 29 日加州大學洛杉磯分校向史丹佛研究院送出第一則訊息，只傳出「lo」兩個字母（原本要打 login）。到 1969 年底已有 4 個節點。[s1][s2]
- 常聽說阿帕網是為了「核戰後還能通訊」而建，這是誤傳；當時的主管說目的是連接研究用電腦。[s1]
- **1983 年 1 月 1 日**：阿帕網全面改用 TCP/IP，這是今天網際網路的基本規則；它源自卡恩 1972 年提出的「開放架構」構想。[s1][s2]
- **1989–1991 年**：英國人柏納茲—李在歐洲核子研究組織（CERN）提出「全球資訊網」（WWW），1991 年 8 月 23 日對整個網際網路開放。[s3] 全球資訊網是架在網際網路上面的一層「用超連結串起來的網頁」，兩者不是同一件事。[s3]

## T3 傳播與普及

- 1985 年美國國家科學基金會建立 NSFNET，服務大學與研究機構。[s2]
- 1993 年 4 月 30 日 CERN 宣布全球資訊網的技術免費給所有人用；同年 Mosaic 瀏覽器推出，網頁迅速流行。[s3]
- 1995 年 NSFNET 骨幹退場，最後的商業使用限制取消，美國網際網路完全商業化。[s2][s4]
- 2000 年全球約 3.9 億人上網；2005 年約佔世界人口 16%，2010 年約 30%。[s4]

## T4 規模與數據

- 1969 年底：4 個節點。[s1][s2]
- 2000 年：約 3.9 億使用者（估計）。[s4]
- 2025 年：國際電信聯盟估計約 60 億人上網，約佔世界人口 74%，仍有約 22 億人沒有上網。[s4]

## T5 改變了什麼

- **經濟**：1995 年商業化後，網路從學術工具變成商業平台。[s2][s4]
- **知識取得**：全球資訊網免費開放後，任何人都能架網頁、讀網頁，發布資訊的門檻大降。[s3]
- **治理模式**：網際網路的規則由政府、企業和學界長期合作制定，不是由單一公司擁有。[s2]
- **資訊品質**：資訊變多變快，但假訊息也跟著擴散，這成為今天的社會問題（見下方哈拉瑞）。[s5]

## T6 雙軌解讀

### 李彔

無直接論述：查到的公開摘要沒有談網際網路。依香港01的摘要，李彔認為有解釋力的知識要和社會組織形式結合，才會轉化成技術，而現代科技與市場經濟結合會帶來持續累進的增長。[s6] 網際網路先由政府出資、大學研究，1995 年後交給市場經營，可視為這種結合的例子（此對照為本卡推論）。[s2][s4]

### 哈拉瑞

依公開摘要，哈拉瑞在《連結》中說，以為「資訊越多，社會就自然更有力量、更接近真相」是天真的想法；吸引人的故事常比真相更有影響力，他也強調科學與民主這類能「自我修正」的機制。[s5] 摘要沒有直接談網際網路的歷史，但這個觀點常被用來討論網路上的假訊息（此對照為本卡推論）。

## T7 今日對照鉤子

「開放標準造成爆發」的結構：TCP/IP 和全球資訊網都是公開、免費的規則，誰都能接上，網路因此快速擴張。[s2][s3] 同樣的結構也出現在其他靠統一規格連成網絡的技術（例如貨櫃，見貨櫃運輸卡）。 另一個結構是：傳播成本一降到接近零，資訊的「量」暴增，但「品質」要靠新的篩選機制。[s5]

## T8 不可類比的差異

網際網路是在冷戰時期由美國政府出資的研究網路長出來的，這種「政府研究、後來開放給市場」的過程不一定能複製。[s1][s2] 早期網路（如 NSFNET）的任務是服務大學與研究機構，今天它已是全民使用的商業與公共基礎設施，使用者與用途的規模完全不同。[s2][s4] 而且到今天仍有約 22 億人沒有上網，「全球都已連網」並不正確。[s4]
