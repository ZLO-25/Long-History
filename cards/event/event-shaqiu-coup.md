---
id: event-shaqiu-coup
type: event
name: 沙丘之變：秦始皇去世與胡亥即位（前210年）
aliases: [沙丘之變, 沙丘之謀, 沙丘政變, 秦始皇之死, 胡亥即位, 秦二世即位, 扶蘇之死, 趙高, 李斯, 胡亥, 扶蘇, Qin Er Shi, Huhai, Fusu, Zhao Gao, Shaqiu]
aliases_main: [沙丘之謀, 胡亥即位, Qin Er Shi]
civilization: [中國（秦）]
track: china
time:
  start: -210
  end: -210
  precision: exact
  src: [s1, s2]
summary_line: 大事｜宮廷／政治中心｜沙丘平臺（今河北廣宗）｜沙丘之變：秦始皇去世與胡亥即位（前210年）
place:
  primary_field: 宮廷／政治中心
  locations:
    - { name_ancient: 沙丘平臺, name_modern: 廣宗縣（中國河北）, lat: 37.07, lng: 115.15, precision: schematic, role: "秦始皇出巡途中病逝之地（示意）", src: [s2] }
    - { name_ancient: 北方邊境蒙恬軍中（新秦中）, name_modern: 河套南部、鄂爾多斯一帶（中國內蒙古）, lat: 39.6, lng: 109.8, precision: schematic, role: "扶蘇與蒙恬駐守、接到賜死詔書之地（示意）", src: [s3] }
  scale: area
structure_tags: [合法性危機, 精英內鬥, 突變事件]
topics: [帝國的衰亡, 統一與中央集權]
links: [event-qin-unification, event-chen-sheng-wu-guang, event-burning-books, building-qin-straight-road, building-terracotta-army, war-chu-han]
causes:
  - { id: event-qin-unification, rel: 背景, why: "秦始皇統一後多次出巡，前 210 年死在出巡途中，遠離首都，給了隨行的趙高、李斯隱瞞死訊、改立繼承人的機會。", src: ["event-qin-unification:s1", s2] }
  - { id: event-burning-books, rel: 背景, why: "長子扶蘇曾為被處置的讀書人向父親進諫，被派到北方蒙恬軍中，始皇去世時他遠在邊境，無法掌握朝局。", src: [s3, "event-burning-books:s1"] }
effects:
  - { id: event-chen-sheng-wu-guang, rel: 促成, why: "依漢代史家的說法，胡亥用偽詔逼死扶蘇即位，起義者便假借扶蘇的名義號召人心。", src: [s3, "event-chen-sheng-wu-guang:s2"] }
counterparts: "無適當對照：西方軌目前沒有「開國皇帝死後，近臣隱瞞死訊、偽造遺詔改立繼承人」的對應卡片，不硬湊。"
sources:
  - { id: s1, title: "Qin Er Shi — Wikipedia", url: "https://en.wikipedia.org/wiki/Qin_Er_Shi", accessed: 2026-11-02, tier: 百科 }
  - { id: s2, title: "秦二世 — 維基百科", url: "https://zh.wikipedia.org/wiki/%E7%A7%A6%E4%BA%8C%E4%B8%96", accessed: 2026-11-02, tier: 百科 }
  - { id: s3, title: "Fusu — Wikipedia", url: "https://en.wikipedia.org/wiki/Fusu", accessed: 2026-11-02, tier: 百科 }
  - { id: s4, title: "邢義田〈趙高與秦朝的終結——談傳統帝制的一個結構性悲劇〉（增修稿），《古今論衡》第 45 期（中央研究院歷史語言研究所，2025）", url: "https://www1.ihp.sinica.edu.tw//storage/publish3L/45-1.pdf", accessed: 2026-11-02, tier: 學術 }
  - { id: s5, title: "朱金中〈農民起義領袖陳勝的扶蘇情結〉— 大河網，中國新聞網轉載，2011-06-29（引呂思勉論始皇未立太子）", url: "https://www.chinanews.com.cn/cul/2011/06-29/3143869.shtml", accessed: 2026-11-02, tier: 通論 }
importance: 2
summary_card: true
learn:
  histories: [中國史]
  why_care: 秦朝「十年統一、十五年滅亡」，轉折點就在秦始皇死後的這幾天：誰當皇帝，竟然由兩個隨行大臣在馬車裡決定。
  story: |
    前 210 年，秦始皇在出巡途中死於沙丘平臺。[s2] 丞相李斯怕天下生變，決定祕不發喪，把棺材放在車裡隨行。[s2] 宦官趙高先說服始皇的小兒子胡亥，再說服李斯，三人偽稱始皇遺詔，立胡亥為太子。[s1][s2] 另一份假詔書送到北方邊境，命令長子扶蘇和大將蒙恬自殺；扶蘇接旨後自盡。[s2][s3] 胡亥回到咸陽才發喪，以太子身分即位，就是秦二世。[s2] 之後趙高大權在握，皇子、大臣接連被殺，連李斯也沒能倖免；不到三年，秦朝就滅亡了。[s1]
  key_terms:
    - { term: 遺詔, plain: 皇帝死前留下的命令，常用來指定繼承人。, example: 像社長卸任前寫好的交接信，指定誰接下一任。 }
    - { term: 祕不發喪, plain: 君主死了卻先不公開，避免消息一傳出來就出亂子。, example: 像比賽中隊長受傷下場，教練先不說，怕隊員軍心大亂。 }
  primary_source:
    - { text: "始皇崩於沙丘平臺。", from: "《史記·秦始皇本紀》（引自維基百科「秦二世」條）", src: s2 }
  historiography: |
    **真的是偽詔篡位嗎？** 《史記》說趙高主導、與李斯聯手竄改給扶蘇的詔書，再假造詔書立胡亥。[s4] 但北京大學收藏的西漢竹簡《趙正書》卻說，始皇臨死前已同意立胡亥，李斯和趙高沒有竄改詔書。[s4] 邢義田認為《趙正書》屬於重視說辭、不重史實的「說類」作品，司馬遷可能看過卻沒有採信；但他也提醒，《史記》同樣有立場與偏見，需要不斷檢討；只是目前還沒有出土文獻足以推翻《史記》的主要敘事。[s4]
    **扶蘇本來就是太子嗎？** 史學家呂思勉指出，始皇在位很久卻始終沒有立太子，可能正因為他想立小兒子，所以李斯、趙高廢立一事未必屬實；報導也概括史學界的看法，認為胡亥頂多是爭奪繼承權，不能說是篡位。[s5]
  misconceptions:
    - 秦始皇生前沒有正式立扶蘇為太子：「扶蘇是合法太子、被胡亥搶走皇位」是後人的簡化說法，史家對始皇本意仍有爭論。[s4][s5]
crosscheck:
  date: 2026-11-02
  by: 獨立查核 agent（未參與寫作）
  result: 通過
  notes: "核對 s2、s3、s4、s5：s2 採夏六月（註《史記》作七月丙寅），卡片不寫月份；扶蘇駐地依 s3 改為新秦中並移動示意座標；邢義田一段補上「尚無出土文獻足以推翻《史記》主體敘事」；s5 標題更正，呂思勉觀點依原報導改寫。s1（英文維基秦二世）因抓取額度用盡未開啟；沙丘平臺今地廣宗為示意，s2 未寫。"
verification: 爭議
lens_status: 無直接論述
---

## C1 背景

秦統一後，始皇多次出巡各地；前 210 年他死在出巡途中。[s2] 長子扶蘇曾反對父親嚴厲處置讀書人，認為天下剛統一、敵人尚未平定，不應如此，因而被派到北方邊境，在將軍蒙恬手下。[s3] 始皇生前始終沒有公開立太子。[s5]

## C2 經過

- 前 210 年：始皇在沙丘平臺病逝；李斯怕天下生變，祕不發喪，棺材放在轀輬車中隨行。[s2]
- 趙高說服胡亥越過兄長即位，再說服李斯；三人偽稱受始皇遺詔，立胡亥為太子。[s1][s2]
- 另以假詔書賜死扶蘇、蒙恬；扶蘇自殺。[s2][s3]
- 同年：胡亥經直道回到咸陽才發喪，以太子身分即位為二世皇帝。[s2]

## C4 制度或機制變化

秦以皇帝一人集權，繼承人卻沒有事先公開確立；皇帝死在外地時，掌握詔書與消息的近臣就能左右繼承。[s1][s4][s5] 邢義田把趙高的崛起看成傳統帝制的一種「結構性悲劇」。[s4]

## C6 直接結果

趙高實際掌控朝政，大批皇子、官員與丞相李斯相繼被殺；「指鹿為馬」的成語也出自這段時期。[s1] 起義四起，前 207 年胡亥被趙高逼迫自殺，秦朝不久滅亡。[s1] 前 209 年起兵的陳勝、吳廣就曾假借扶蘇的名義號召群眾。[s3]
