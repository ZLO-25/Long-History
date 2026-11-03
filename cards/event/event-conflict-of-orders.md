---
id: event-conflict-of-orders
type: event
name: 羅馬平民與貴族的階級鬥爭（前494–前287年）
aliases: [平民與貴族的鬥爭, 保民官, 等級鬥爭, 平民撤離運動, Conflict of the Orders, 霍騰西烏斯法, 聖山撤離, Struggle of the Orders, 階級鬥爭, 羅馬平民與貴族的階級衝突, secessio plebis, tribune of the plebs, Lex Hortensia]
civilization: [古羅馬]
track: west
time:
  start: -494
  end: -287
  precision: approx
  src: [s1, s3]
summary_line: 大事｜城市／都會｜羅馬（義大利）｜羅馬平民與貴族的階級鬥爭（前494–前287年）
summary_card: true
place:
  primary_field: 城市／都會
  secondary_fields: [宮廷／政治中心]
  locations:
    - { name_ancient: 聖山（Mons Sacer）, name_modern: 羅馬東北郊、阿涅內河畔（義大利）, lat: 41.9369, lng: 12.5300, precision: disputed, role: 傳統說法中前494年平民撤離之地（另一說是阿文提諾山；座標為示意）, src: [s1, s3] }
    - { name_ancient: 羅馬, name_modern: 羅馬（義大利）, lat: 41.8925, lng: 12.4853, precision: schematic, role: 鬥爭發生的城市（座標為羅馬廣場）, src: [s1] }
  scale: point
structure_tags: [公民身分擴張, 法律成文化, 精英內鬥, 慢變結構]
topics: [民主與參政, 公民身分, 民變與抗爭, 法律與憲法]
links: [event-twelve-tables, building-forum-romanum, war-samnite, event-cleisthenes-reform]
effects:
  - { id: event-twelve-tables, rel: 促成, why: 法律只由貴族祭司解釋，平民常遭任意判決，於是以集體撤離城市為威脅爭取讓步，法律才被寫下來公開。, src: [s3, "event-twelve-tables:s1"] }
counterparts: 無適當對照：中國軌沒有「平民以集體罷工、撤離爭取參政權」的對應事件卡；商鞅變法是由上而下的改革，硬比會誤導。
sources:
  - { id: s1, title: "Conflict of the Orders — Wikipedia", url: "https://en.wikipedia.org/wiki/Conflict_of_the_Orders", accessed: 2026-11-02, tier: 百科 }
  - { id: s2, title: "Dionysius of Halicarnassus, Roman Antiquities 6.72–96（Loeb 英譯，LacusCurtius, University of Chicago）", url: "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Dionysius_of_Halicarnassus/6D*.html", accessed: 2026-11-02, tier: 一手 }
  - { id: s3, title: "Donald L. Wasson, Plebeians — World History Encyclopedia (2022)", url: "https://www.worldhistory.org/Plebeians/", accessed: 2026-11-02, tier: 通論 }
importance: 2
learn:
  histories: [希臘羅馬史]
  why_care: 不用流血革命，而是「大家一起罷工離開城市」，羅馬平民花了兩百年爭到和貴族一樣的政治權利。
  story: |
    羅馬共和初期，政權握在少數貴族家族手裡；平民要當兵打仗，很多人卻欠債、甚至因債淪為奴隸。[s1][s3] 前 494 年，平民士兵拒絕出征，集體離開羅馬城到城外的山上，等於全體罷工。[s1][s3] 貴族派梅涅尼烏斯·阿格里帕去談判；據說他講了一個比喻：國家就像人體，四肢不餵胃，自己也會餓死。[s2][s3] 最後雙方妥協：平民可以選出自己的「保民官」，保護平民不受官員欺壓。[s1][s2] 此後平民又爭到成文法、擔任執政官的資格；前 287 年最後一次撤離後，《霍騰西烏斯法》規定平民會議通過的決議對全體公民都有效，鬥爭告一段落。[s1]
  key_terms:
    - { term: 撤離（secessio）, plain: 平民集體離開城市、拒絕服兵役，用「不合作」逼貴族讓步。, example: 像全班一起拒絕參加大隊接力，直到班規改掉為止。 }
    - { term: 保民官, plain: 由平民選出、保護平民的官員，可以否決其他官員的行動，人身不可侵犯。, example: 像學生會裡專門替同學向學校申訴、還能喊停的代表。 }
  primary_source:
    - { text: "A commonwealth resembles in some measure a human body.（國家在某種程度上就像一個人的身體。）", from: 戴奧尼修斯《羅馬古事記》6.86，梅涅尼烏斯·阿格里帕的比喻（Loeb 英譯，中文為本站摘譯）, src: s2 }
    - { text: "These five persons were the first who received the tribunician power.（這五人是最早獲得保民官權力的人。）", from: 戴奧尼修斯《羅馬古事記》6.89（Loeb 英譯，中文為本站摘譯）, src: s2 }
  historiography: |
    **真的有一場「兩百年鬥爭」嗎？** 傳統說法來自李維、西塞羅等幾百年後的作家，可能把史實和傳說混在一起。[s1] 有學者指出，前 5 世紀的執政官名單裡已經出現平民的名字，而且始終沒有武裝叛亂，令人懷疑；理查·米契爾（Richard E. Mitchell）甚至認為根本沒有這場衝突，是共和晚期的人用自己時代的階級鬥爭去想像遠古。[s1]
    **連細節都不一致：** 前 494 年平民撤離到哪裡，維基百科寫聖山，世界歷史百科寫阿文提諾山；最初的保民官人數，世界歷史百科說兩名後增為十名，戴奧尼修斯則記五人。[s1][s2][s3]
  misconceptions:
    - 鬥爭的結果不是「窮人掌權」：擔任高官通常要先有錢，最後形成的是貴族與富裕平民合組的新統治階層（nobilitas）。[s1]
crosscheck:
  date: 2026-11-02
  by: 獨立查核 agent（未參與寫作）
  result: 通過
  notes: 已打開維基、WHE Plebeians、戴奧尼修斯 6.86–89 核對。WHE 沒寫霍騰西烏斯法，已移除該句的 s3；監察官一項改依維基（前339年法律）；米契爾觀點改為「根本沒有衝突」；刪去來源沒寫的「前執政官」。撤離地點（聖山／阿文提諾山）與首批保民官人數（2／5）仍有分歧，已並列；聖山座標為示意。
verification: 交叉確認
lens_status: 無直接論述
---

## C1 背景

共和初期，自稱是第一批元老後代的貴族壟斷官職與政治權力，平民被排除在外。[s3] 許多平民又窮又欠債，欠債還不出來甚至會被賣為奴隸，同時他們卻是羅馬軍隊的主力。[s3][s1]

## C2 經過

- 前 494 年：平民士兵拒絕作戰，集體撤離城外；談判後設立平民保民官與平民會議。[s1][s3] 戴奧尼修斯記載梅涅尼烏斯·阿格里帕以人體為喻勸平民回城。[s2]
- 前 471 年：《普布利留斯法》把保民官選舉移到部落會議，擺脫貴族門客的影響。[s1]
- 前 451–前 450 年：十人委員會編成《十二銅表法》並公開展示，平民得到免於因債被監禁、以及上訴的權利。[s3]
- 前 367 年：《李錫尼—塞克斯提烏斯法》處理債務問題，並規定每年至少一名執政官由平民擔任。[s1]
- 前 356–前 337 年：前 356 年出現第一位平民獨裁官；前 339 年規定監察官至少一人須為平民；前 337 年出現第一位平民法務官。[s1]
- 前 287 年：平民最後一次撤離到賈尼科洛山，《霍騰西烏斯法》讓平民會議的決議約束全體公民。[s1]

## C6 直接結果

平民取得保民官、成文法與擔任各級官職的權利，到前 287 年在法律上與貴族取得政治平等。[s1] 不過擔任高官通常要先有錢，最後出現的是由貴族與平民合組的新統治階層（nobilitas），取代了舊貴族。[s1]
