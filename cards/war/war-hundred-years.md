---
id: war-hundred-years
type: war
name: 英法百年戰爭（1337–1453年）
aliases: [百年戰爭, 聖女貞德, "Hundred Years' War", Joan of Arc, 英法百年戰爭, 阿金庫爾戰役, 克雷西會戰, 奧爾良之圍, 長弓, 普瓦捷會戰, Battle of Agincourt, 愛德華三世, 查理七世, 卡斯蒂永戰役, Battle of Crécy, Siege of Orléans, Battle of Castillon, 百年战争]
civilization: [英國, 法國]
track: west
time:
  start: 1337
  end: 1453
  precision: exact
  src: [s1, s2]
summary_line: 戰爭｜戰場｜法國西部與北部｜英法百年戰爭（1337–1453年）
summary_card: true
place:
  primary_field: 戰場
  secondary_fields: [宮廷／政治中心]
  locations:
    - { name_ancient: 奧爾良, name_modern: 奧爾良（法國）, lat: 47.9030, lng: 1.9093, precision: schematic, role: 1429 年貞德協助解圍的城市（座標為今市中心）, src: [s1, s3] }
    - { name_ancient: 卡斯蒂永, name_modern: 卡斯蒂永拉巴塔耶（法國吉倫特省）, lat: 44.8540, lng: -0.0420, precision: schematic, role: 1453 年 7 月 17 日最後一場會戰（座標為今城鎮一帶）, src: [s2] }
    - { name_ancient: 加萊, name_modern: 加萊（法國）, lat: 50.9513, lng: 1.8587, precision: schematic, role: 戰後英格蘭在歐陸唯一保留的據點，直到 1558 年（座標為今市中心）, src: [s1, s2] }
  scale: area
structure_tags: [戰爭融資, 技術代差, 財政枯竭, 慢變結構]
topics: [火藥與武器, 稅收]
links: [tech-gunpowder, event-black-death, event-english-parliament, event-peasants-revolt-1381, war-fall-constantinople]
causes: []
effects:
  - { id: tech-gunpowder, rel: 促成, why: "戰爭末期法軍在卡斯蒂永用多達 300 門砲擊敗英軍，被視為歐洲第一場主要靠野戰砲贏的大戰，加快火砲在歐洲普及。", src: [s2, "tech-gunpowder:s3"] }
  - { id: event-peasants-revolt-1381, rel: 促成, why: "英格蘭為支付百年戰爭的駐軍與戰費，由議會連開三次人頭稅，1380 年的重稅成為 1381 年農民起義的導火線。", src: ["event-peasants-revolt-1381:s1"] }
  - { id: event-english-parliament, rel: 促成, why: "英王打仗要錢，加稅必須經議會同意，議會因此能藉批准稅收發聲，逐漸確立「不經兩院與君主同意不得課稅」的慣例。", src: ["event-english-parliament:s1"] }
counterparts: 無適當對照：中國軌目前沒有「兩個王室爭奪同一個王位、斷續打上百年」的卡；春秋戰國是多國並立，結構不同。
sources:
  - { id: s1, title: "Hundred Years' War — Wikipedia", url: "https://en.wikipedia.org/wiki/Hundred_Years%27_War", accessed: 2026-11-02, tier: 百科 }
  - { id: s2, title: "Battle of Castillon — Wikipedia", url: "https://en.wikipedia.org/wiki/Battle_of_Castillon", accessed: 2026-11-02, tier: 百科 }
  - { id: s3, title: "Joan of Arc, Letter to the English, March 22, 1429（Belle Tuten 英譯）— Internet Medieval Sourcebook, Fordham University", url: "https://sourcebooks.web.fordham.edu/halsall/source/joanofarc.asp", accessed: 2026-11-02, tier: 一手 }
importance: 3
learn:
  histories: [歐洲史, 世界通史]
  why_care: 一場斷斷續續打了一百一十六年的戰爭，讓英格蘭人和法蘭西人開始覺得「我們是不同的民族」，也讓騎士的時代讓位給長弓與大砲。
  story: |
    1337 年，法王腓力六世宣布沒收英王在法國西南部的領地加斯科涅；英王愛德華三世則以自己是法王外孫為由，主張自己才該當法國國王，戰爭就此開始。[s1] 英軍靠長弓手在克雷西（1346）、普瓦捷（1356）大勝，法王約翰二世甚至被俘。[s1] 1415 年英王亨利五世又在阿金庫爾大勝，1420 年的條約讓他成為法國王位繼承人。[s1] 就在法國快撐不住時，農家少女貞德出現了：1429 年她寫信要英軍「回你們自己的國家去」，並協助解除奧爾良之圍。[s1][s3] 此後法國逐步反攻，1453 年 7 月在卡斯蒂永用大量火砲擊敗英軍，10 月收復波爾多。[s2] 英格蘭在歐陸只剩加萊一地。[s1][s2]
  key_terms:
    - { term: 長弓, plain: 英格蘭步兵使用的高大弓，射程遠、射速快，能大量殺傷衝鋒的騎兵。, example: 像一排排連發的遠程武器，讓穿盔甲的騎士還沒衝到就倒下。 }
    - { term: 常備軍, plain: 平時也維持、由國家付薪水的職業軍隊，不是打仗時才臨時召集。, example: 像全職的消防隊，而不是火災時才臨時找鄰居幫忙。 }
  primary_source:
    - { text: "go home to your own country（回你們自己的國家去）", from: 貞德致英格蘭人書（1429 年 3 月 22 日；Belle Tuten 英譯，中文為本站摘譯）, src: s3 }
    - { text: "Return the keys of all the good cities which you have seized, to the Maid（把你們奪走的所有好城市的鑰匙，交還給少女）", from: 同上, src: s3 }
  historiography: |
    **真的是「百年」嗎？** 「百年戰爭」是後人取的名字：其實是 1337–1360、1369–1389、1415–1453 三個階段，中間夾著長期停戰；正式和約要到 1475 年才簽。[s1]
    **它造就了民族國家嗎？** 維基整理的看法是，這場戰爭激發了英法兩國的民族意識，也讓兩國王權更集中；法王查理五世曾建立羅馬帝國之後西歐第一支常備軍，1445 年查理七世又重建常設的常備軍。[s1] 但兩國籌錢方式不同：英王要靠議會通過的稅，法王則靠銷售稅與降低錢幣成色，對全國議會的依賴較少。[s1]
  misconceptions:
    - "百年戰爭不是連續打一百年：中間有好幾次長期停戰，三個階段加起來才橫跨 116 年。[s1]"
    - "不是貞德一個人打贏戰爭：她 1429 年協助解圍奧爾良，但奧爾良解圍之後，戰爭又打了二十多年，最後靠法軍改革與火砲才結束。[s1][s2]"
crosscheck:
  date: 2026-11-02
  by: 獨立查核 agent（未參與寫作）
  result: 通過
  notes: "已開 s1–s3 核對：1337 收回亞奎丹、愛德華三世經母系主張王位、克雷西、普瓦捷、阿金庫爾、特魯瓦條約、奧爾良、三階段、1475 和約、卡斯蒂永最多 300 門砲與『第一場主要靠野戰砲贏的歐洲大戰』、10 月 19 日收復波爾多、只剩加萊；貞德信件日期、譯者與引文相符。改：『1445 年建立羅馬之後第一支常備軍』改為查理五世首建、1445 年查理七世重建（s1 原意）；effects→議會的來源刪去本卡 s1（s1 未寫課稅原則），只保留議會卡 s1。causes 仍空。"
verification: 交叉確認
lens_status: 無直接論述
---

## A2 起因：結構與導火線

**結構**：英王同時是法王的封臣，在法國西南部擁有加斯科涅（亞奎丹）領地，兩國王室長期為領地與主從關係摩擦。[s1] **導火線**：1337 年 5 月腓力六世的大議會決定收回亞奎丹，愛德華三世隨即重申自己對法國王位的繼承權。[s1]

## A7 關鍵轉折

- 1346 克雷西、1356 普瓦捷：英軍長弓手大勝，法王約翰二世被俘；1360 年《布勒丁尼條約》。[s1]
- 1415 阿金庫爾：英軍大勝；1420 年《特魯瓦條約》讓亨利五世成為法國王位繼承人。[s1]
- 1429 奧爾良：貞德協助解圍，戰局翻轉。[s1][s3]
- 1450 福爾米尼、1453 卡斯蒂永：法軍決定性勝利。[s1][s2]

## A8 結果

法國勝。法國王室保有王位，英格蘭失去幾乎所有歐陸領地，只剩加萊（1558 年失去）與海峽群島。[s1][s2] 1453 年 10 月 19 日法軍收復波爾多。[s2]

## A9 長期影響

重裝騎兵失去優勢，長弓與野戰火砲變得重要。[s1] 法王查理五世建立了羅馬帝國之後西歐第一支常備軍，1445 年查理七世再重建常設的常備軍。[s1] 戰爭與黑死病疊加，法國人口估計減少 30–60%、英格蘭減少 20–33%。[s1] 英格蘭的戰費要靠議會通過的稅，反戰者能藉議會施壓。[s1]

## A10 雙軌解讀

### 李彔

無直接論述：本卡未查到李彔公開講稿談百年戰爭。

### 哈拉瑞

無直接論述：本卡未查到哈拉瑞公開摘要談百年戰爭。

## A11 今日對照鉤子

「長期戰爭逼出新的財政與軍事制度」：為了支付一場打不完的戰爭，國家發明新稅、建立常備軍，也讓批准稅收的議會更有分量。[s1]

## A12 不可類比的差異

百年戰爭是王室之間爭奪王位與封地的戰爭，參戰的是封建貴族與傭兵，當時並沒有今天意義下的「國民」或民族國家；把它直接比成現代的國與國戰爭會誤導。[s1]
