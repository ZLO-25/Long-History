---
id: commodity-potosi
type: commodity
name: 波托西銀礦（1545年起）
aliases: [波托西銀礦, 波托西, Potosí, 富山, Cerro Rico, 米塔制, 西班牙運銀船隊, 寶藏船隊, 塞羅里科, 西印度船隊, mita, Spanish treasure fleet, Flota de Indias, vale un Potosí]
civilization: [拉丁美洲, 西班牙]
track: other
time:
  start: 1545
  end: 1790
  precision: approx
  src: [s1, s2]
summary_line: 物資｜資源產地｜波托西（今玻利維亞）｜波托西銀礦（1545年起）
place:
  primary_field: 資源產地
  secondary_fields: [商路, 港口／海峽]
  locations:
    - { name_ancient: 波托西（富山）, name_modern: 波托西（玻利維亞）, lat: -19.5836, lng: -65.7531, precision: exact, role: 1545 年發現的大銀礦與礦業城市, src: [s1] }
    - { name_ancient: 卡亞俄, name_modern: 卡亞俄（秘魯）, lat: -12.0566, lng: -77.1181, precision: exact, role: 秘魯白銀由此經太平洋運往巴拿馬, src: [s2] }
    - { name_ancient: 塞維亞, name_modern: 塞維亞（西班牙）, lat: 37.3891, lng: -5.9845, precision: exact, role: 運銀船隊的母港，貿易署所在地, src: [s2] }
  scale: line
structure_tags: [意外財源, 關鍵原料壟斷, 快速擴張]
topics: [白銀, 原住民族, 海上貿易]
links: [commodity-silver-flow, finance-age-of-genoese, commodity-manila-galleon, war-eighty-years, event-ming-qing-transition]
effects:
  - { id: commodity-silver-flow, rel: 促成, why: 西班牙在波托西靠米塔制強迫原住民挖礦，16 世紀後半估計產出全世界約六成白銀，供應了流向歐洲與亞洲的銀。, src: [s1, commodity-silver-flow:s4] }
  - { id: finance-age-of-genoese, rel: 背景, why: 美洲白銀用船運回塞維亞，軍隊卻駐在法蘭德斯，需要熱那亞銀行家先墊付軍餉，再用運到的白銀收回。, src: [s2, finance-age-of-genoese:s6] }
counterparts:
  - { id: commodity-iwami-silver, note: "相似：都是 16 世紀新開的大銀礦，白銀大量流入國際貿易，最後很多流到中國。不同：波托西靠殖民政府強徵原住民勞役（米塔制），由西班牙王室抽稅運回歐洲；石見銀山由日本戰國大名與後來的德川幕府控制。", src: [s1] }
sources:
  - { id: s1, title: "Potosí — Wikipedia", url: "https://en.wikipedia.org/wiki/Potos%C3%AD", accessed: 2026-11-02, tier: 百科 }
  - { id: s2, title: "Spanish treasure fleet — Wikipedia", url: "https://en.wikipedia.org/wiki/Spanish_treasure_fleet", accessed: 2026-11-02, tier: 百科 }
  - { id: s3, title: "Melissa Dell, Essays in Economic Development and Political Economy（第一章：秘魯礦業米塔制的長期影響），MIT 經濟學博士論文，2012 — DSpace@MIT", url: "https://dspace.mit.edu/handle/1721.1/72831", accessed: 2026-11-02, tier: 學術 }
importance: 3
learn:
  histories: [美洲史, 錢的歷史]
  why_care: 安地斯山上一座山挖出的銀，養活了西班牙帝國的軍隊，也流進明朝人的口袋。
  story: |
    1545 年，西班牙人在今天玻利維亞海拔很高的山區發現一座銀礦山，叫「富山」，同年建立波托西城。[s1] 地表的富礦到 1565 年就挖完了，西班牙人改用水銀混汞法，從品位較低的礦石中提煉白銀。[s1] 挖礦的勞力主要來自「米塔制」：殖民政府強迫原住民村落輪流派人下礦，每年徵調約一萬三千人，約占成年男子的七分之一。[s1] 許多人在礦坑裡死傷，精煉工人也常因水銀中毒而死。[s1] 波托西人口一度超過二十萬，16 世紀後半估計出產全世界約六成的白銀。[s1] 白銀經太平洋港口運到巴拿馬，再由武裝護航的船隊運回西班牙，王室抽兩成的稅。[s2] 西班牙文至今還有一句「值一個波托西」，意思是非常值錢。[s1]
  key_terms:
    - { term: 米塔制（mita）, plain: 西班牙殖民政府的輪役制度，強迫原住民村落輪流派人到礦山做工。, example: 像規定每個村子每年都要派七分之一的男人去遠方礦場做苦工。 }
    - { term: 混汞法, plain: 用水銀把礦石裡的銀「吸」出來，再加熱把水銀蒸掉，留下白銀。, example: 像用磁鐵把沙子裡的鐵屑吸出來，只是水銀有毒。 }
    - { term: 王室五一稅（quinto real）, plain: 西班牙王室對美洲白銀抽取兩成的稅。, example: 挖到 100 兩銀，就要先交 20 兩給國王。 }
  primary_source:
    - { text: "valer un Potosí（值一個波托西）", from: 西班牙語俗諺，意為「非常值錢」，轉引自 Wikipedia〈Potosí〉, src: s1 }
  historiography: |
    **米塔制的影響有多久？** 經濟學者戴爾（Melissa Dell）用「斷點迴歸」比較米塔制實施區（1573–1812 年）邊界兩側的村落，發現曾被徵調的地區今天家庭消費約低 25%、兒童發育遲緩比例較高，並把原因追到大地主較少、教育程度較低與道路連結較差。[s3]
    **死了多少人？** 維基百科只說「許多」礦工死傷、精煉工人死於水銀中毒，並標註這個說法需要量化；常見的驚人死亡數字缺乏可靠統計，要小心引用。[s1]
  misconceptions:
    - 「波托西曾是世界第二大城」這個常見說法，在維基百科被標為「可疑」。[s1]
    - 白銀沒有全部運回歐洲：估計美洲在這段期間生產約 40 億披索的白銀，其中約 25 億運到歐洲。[s2]
crosscheck:
  date: 2026-11-02
  by: 獨立查核 agent（未參與寫作）
  result: 通過
  notes: "核對英文維基 Potosí／Spanish treasure fleet 與 Dell 論文摘要，數字均相符（礦石重量原文為 100–300 磅，換算一致）。後果→熱那亞時代：運銀船隊維基頁沒有寫熱那亞墊付軍餉，改引對方卡 s6（Drelichman & Voth）；米塔制範圍補「玻利維亞」。無前因（尚無西班牙征服印加卡）。"
verification: 交叉確認
lens_status: 無直接論述
summary_card: true
---

## B1 物資與用途

白銀是鑄幣與國際貿易的主要支付工具；波托西的富山是 16 世紀全球最重要的銀礦之一。[s1][s2]

## B2 產地與控制權

銀礦位於今玻利維亞的波托西，1545 年發現並建城，由西班牙殖民政府控制；18 世紀被墨西哥的瓜納華托超越。[s1]

## B3 生產技術與勞動

1565 年後改用梅迪納（Bartolomé de Medina）1554 年發明的混汞法處理低品位礦石；勞動力靠米塔制徵調原住民，每年約一萬三千人，礦工常背負約 45 到 135 公斤的礦石。[s1] 米塔制在今秘魯與玻利維亞一帶實施於 1573–1812 年。[s3]

## B4 運輸路線與咽喉

秘魯白銀經太平洋港口卡亞俄運到巴拿馬，用騾子越過地峽到波托貝洛；「陸地船隊」與「新西班牙船隊」在哈瓦那會合，武裝護航返回塞維亞或卡地斯；1628 年荷蘭將領海恩在馬坦薩斯灣奪走整支船隊。[s2]

## B6 經濟與財政角色

王室抽取兩成白銀稅；估計整個時期美洲產銀約 40 億披索，約 25 億運到歐洲。[s2] 波托西 16 世紀後半估計產出全世界約六成白銀。[s1]

## B7 權力與政治連結

白銀由王室抽稅、由船隊武裝護航運回；塞維亞的貿易署壟斷殖民地貿易，直到 1790 年才廢除。[s2]
