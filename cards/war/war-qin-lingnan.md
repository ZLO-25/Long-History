---
id: war-qin-lingnan
type: war
name: 秦征服嶺南（前221–前214年）
aliases: [秦平百越, 秦征嶺南, 趙佗, 南海郡, 桂林郡, 象郡, 秦攻百越, 秦征南越, 任囂, 屠睢, Lingnan, Qin conquest of Baiyue, 陸梁地, "Qin's campaign against the Yue tribes"]
civilization: [中國（秦）]
track: china
time:
  start: -221
  end: -214
  precision: approx
  src: [s1, s2]
summary_line: 戰爭｜戰場｜嶺南（今廣東、廣西一帶）｜秦征服嶺南（前221–前214年）
place:
  primary_field: 戰場
  secondary_fields: [商路]
  locations:
    - { name_ancient: 番禺, name_modern: 廣州（中國廣東）, lat: 23.13, lng: 113.26, precision: schematic, role: "秦軍攻取之地，後為南海郡治與南越國都", src: [s2] }
    - { name_ancient: 靈渠（零陵道）, name_modern: 興安縣（中國廣西）, lat: 25.61, lng: 110.67, precision: schematic, role: "連通湘江與漓江的運糧水道，秦軍南下要道", src: [s1, s3] }
  scale: area
structure_tags: [快速擴張, 補給線過長, 地形險阻, 基礎建設網絡]
topics: [對外擴張, 運河與水利, 移民與移墾, 統一與中央集權]
links: [building-lingqu, event-qin-unification, event-chen-sheng-wu-guang, building-qin-han-great-wall, event-shaqiu-coup]
causes:
  - { id: event-qin-unification, rel: 促成, why: "統一六國後秦始皇繼續南征嶺南百越，需要把糧食運到前線，於是命史祿開鑿靈渠連通湘江和漓江。", src: ["building-lingqu:s1", "building-lingqu:s2", s1] }
  - { id: building-lingqu, rel: 促成, why: "靈渠讓船隻能從長江水系開進珠江水系，糧食和補給得以送到南方前線，支援秦軍征服嶺南。", src: ["building-lingqu:s1", "building-lingqu:s2", s3] }
effects:
  - { id: event-economic-center-south, rel: 背景, why: "秦在嶺南設南海、桂林、象三郡，並把大批北方移民遷到南方，珠江流域從此納入中原王朝，是南方長期開發的早期起點之一。", src: [s1, s2], disputed: true }
counterparts: "無適當對照：西方軌目前沒有「靠開鑿運河運糧、越過山嶺征服南方部族並大規模移民」的對應卡片，不硬湊。"
sources:
  - { id: s1, title: "Qin's campaign against the Yue tribes — Wikipedia", url: "https://en.wikipedia.org/wiki/Qin%27s_campaign_against_the_Yue_tribes", accessed: 2026-11-02, tier: 百科 }
  - { id: s2, title: "Nanyue — Wikipedia", url: "https://en.wikipedia.org/wiki/Nanyue", accessed: 2026-11-02, tier: 百科 }
  - { id: s3, title: "林崗〈論秦征南越的進軍線路與方略〉，《湖南科技大學學報（社會科學版）》第 18 卷第 2 期（2015）", url: "https://skxb.hnust.edu.cn/hnkjdxxbsk/article/pdf/150222", accessed: 2026-11-02, tier: 學術 }
  - { id: s4, title: "付祥喜、陳淑婷〈《淮南子·人間訓》所述秦征嶺南史實考辨〉，《廣州大學學報（社會科學版）》第 16 卷第 4 期（2017），頁 84–91", url: "https://xb.gzhu.edu.cn/skb/CN/Y2017/V16/I4/84", accessed: 2026-11-02, tier: 學術 }
  - { id: s5, title: "陸梁 — 漢典（zdic.net），引《史記》書證", url: "https://www.zdic.net/hant/陆梁", accessed: 2026-11-02, tier: 百科 }
importance: 2
summary_card: true
learn:
  histories: [中國史]
  why_care: 今天的廣東、廣西會成為中國的一部分，起點就是秦始皇統一六國後的這場南征；它也讓「南越國」和後來的越南歷史連在一起。
  story: |
    秦統一六國後，秦始皇把目光轉向五嶺以南、住著許多「百越」部族的嶺南。[s1][s2] 約前 218 年，他派將軍屠睢分兵南下，攻取番禺等地。[s2] 但西甌越人退入山林打游擊，夜裡反攻，殺了屠睢。[s1][s2] 秦軍補給困難，於是開鑿靈渠，把北流的湘江和南流的漓江接起來，讓運糧船可以越過山嶺。[s1][s3] 前 214 年，任囂、趙佗率援軍擊敗西甌，秦設南海、桂林、象三郡，又把大批北方人遷到南方。[s1][s2] 秦朝滅亡後，趙佗割據嶺南，建立南越國，直到前 111 年才被漢武帝滅掉。[s2]
  key_terms:
    - { term: 嶺南, plain: 「五嶺」山脈以南的地區，大致是今天的廣東、廣西和越南北部。, example: 像一道山牆隔開的南方，要翻山或走水路才過得去。 }
    - { term: 百越, plain: 古代對中國南方許多不同部族的總稱，不是單一民族。, example: 像用「原住民」一詞統稱許多不同的族群。 }
    - { term: 郡, plain: 秦朝由中央直接派官治理的地方行政單位。, example: 像總公司直接派店長管理的直營店。 }
  primary_source:
    - { text: "發諸嘗逋亡人、贅婿、賈人略取陸梁地。", from: "《史記·秦始皇本紀》三十三年（前 214 年）條（引自漢典書證）", src: s5 }
    - { text: "使尉屠睢發卒五十萬", from: "《淮南子·人間訓》（引自付祥喜、陳淑婷文摘要）", src: s4 }
  historiography: |
    **真的派了五十萬大軍嗎？** 《淮南子》說秦派屠睢率五十萬人、分五軍南下。[s1][s4] 付祥喜、陳淑婷認為這個數字不可信，實際兵力約十萬人。[s4] 林崗也認為五十萬是誇大，所謂「五軍」是各地的駐防而不是五路同時進攻，正史比《淮南子》可靠。[s3]
    **走哪條路？** 林崗用史料較多的漢代南征路線反推，認為經零陵、接通湘江與漓江的路線最可能，這也說明了秦為何要開鑿靈渠。[s3]
  misconceptions:
    - 秦征服嶺南不是一次打完：中間打了好幾年，主將屠睢還戰死，前 214 年才設郡。[s1][s2]
crosscheck:
  date: 2026-11-02
  by: 獨立查核 agent（未參與寫作）
  result: 通過
  notes: "核對 s1、s2（約前 218 年出兵、夜襲殺屠睢、前 214 年任囂趙佗增援、三郡、五十萬移民、南越前 111 年亡）與 s4 摘要（五十萬不足信、約十萬）均相符，未改內文。s3 林崗 PDF 與 s5 漢典因抓取額度用盡未開啟；對經濟重心南移的後果屬推論，s1 確有「漢人移民與漢化由此開始」的說法，維持 disputed。"
verification: 交叉確認
lens_status: 無直接論述
---

## A1 交戰方與聯盟結構

一方是剛統一六國的秦朝，先後由屠睢、任囂、趙佗領軍。[s1][s2] 另一方是嶺南的百越各部族，抵抗最頑強的是西甌（西甌越人）。[s1][s2]

## A2 起因：結構與導火線

**結構**：秦統一六國後繼續向外擴張，把五嶺以南的百越之地視為下一個目標。[s1][s3] 林崗指出，秦並不是一統一就立刻吞併嶺南，而是之後才分階段推進。[s3]

**導火線**：約前 218 年秦始皇派屠睢率軍南下；前 214 年再發曾經逃亡的人、贅婿與商人去攻取「陸梁地」。[s2][s5]

## A8 結果

前 214 年秦軍擊敗西甌，設南海、桂林、象三郡；任囂任南海郡尉，趙佗任龍川縣令。[s2] 據說約有五十萬北方人被遷到南方，包括罪犯與流放者。[s1]

## A9 長期影響

秦亡後，任囂臨終把南海郡交給趙佗；趙佗封鎖北方關口，建立南越國，都番禺，前 111 年被漢武帝派兵滅亡，嶺南重新納入中原王朝。[s2] 靈渠從此成為長江與珠江兩大水系之間的水道。[s1][s3]
