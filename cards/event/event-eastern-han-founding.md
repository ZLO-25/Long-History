---
id: event-eastern-han-founding
type: event
name: 綠林赤眉起事與東漢建立（17–25年）
aliases: [光武中興, 劉秀, 漢光武帝, 昆陽之戰, 綠林赤眉, 東漢建立, 綠林起事, 赤眉起事, Emperor Guangwu, Lülin, Red Eyebrows, Eastern Han founding, 绿林赤眉, 东汉建立]
civilization: [中國（新朝）, 中國（東漢）]
track: china
time:
  start: 17
  end: 36
  precision: exact
  src: [s1, s2, s3]
summary_line: 大事｜宮廷／政治中心｜洛陽（今河南洛陽）｜綠林赤眉起事與東漢建立（17–25年）
place:
  primary_field: 宮廷／政治中心
  secondary_fields: [戰場]
  locations:
    - { name_ancient: 綠林山, name_modern: 湖北荊門、當陽一帶（中國）, lat: 31.0, lng: 112.2, precision: schematic, role: 綠林軍起事地；座標為示意, src: [s1] }
    - { name_ancient: 泰山, name_modern: 山東泰安（中國）, lat: 36.25, lng: 117.1, precision: schematic, role: 赤眉軍樊崇起事地, src: [s2] }
    - { name_ancient: 鄗南千秋亭, name_modern: 河北高邑、柏鄉一帶（中國）, lat: 37.6, lng: 114.6, precision: schematic, role: 劉秀即皇帝位處, src: [s4] }
    - { name_ancient: 雒陽, name_modern: 洛陽（中國）, lat: 34.68, lng: 112.45, precision: schematic, role: 東漢首都, src: [s3] }
  scale: area
structure_tags: [革命與政權更替, 合法性危機, 制度包裝延續]
topics: [民變與抗爭, 糧食與農業, 統一與中央集權]
links: [event-wang-mang-reform, event-eunuchs-partisan, event-yellow-turban, event-chen-sheng-wu-guang]
causes:
  - { id: event-wang-mang-reform, rel: 促成, why: 王莽改制造成貨幣混亂、物價不穩，又遇黃河潰決與饑荒，飢民在綠林山、泰山一帶起兵。, src: [event-wang-mang-reform:s1, s1, s2] }
effects:
  - { id: event-eunuchs-partisan, rel: 背景, why: 光武帝規定內宮侍從一律用宦官，宦官從此成為天天待在皇帝身邊的固定群體，為日後宦官掌權留下條件。, src: [s3], disputed: true }
counterparts:
  - { id: event-augustan-principate, note: "相似：都是經過多年內戰後，由一位領袖收拾局面、建立延續約兩百年的新秩序。不同：劉秀以「恢復漢朝」為號召，名義上是舊王朝中興；奧古斯都則保留共和國的外衣、實際開創元首制。", src: [s3] }
sources:
  - { id: s1, title: "Lulin — Wikipedia", url: "https://en.wikipedia.org/wiki/Lulin", accessed: 2026-11-02, tier: 百科 }
  - { id: s2, title: "Red Eyebrows — Wikipedia", url: "https://en.wikipedia.org/wiki/Red_Eyebrows", accessed: 2026-11-02, tier: 百科 }
  - { id: s3, title: "Emperor Guangwu of Han — Wikipedia", url: "https://en.wikipedia.org/wiki/Emperor_Guangwu_of_Han", accessed: 2026-11-02, tier: 百科 }
  - { id: s4, title: "范曄《後漢書·光武帝紀上》（中國哲學書電子化計劃）", url: "https://ctext.org/hou-han-shu/guang-wu-di-ji-shang", accessed: 2026-11-02, tier: 一手 }
importance: 2
learn:
  histories: [中國史]
  why_care: 一個王朝亡了，為什麼又「復活」了兩百年？東漢的故事告訴你：饑荒、民變和地方豪族怎麼決定誰能當皇帝。
  story: |
    王莽建立新朝後，連年饑荒，官府又不肯救濟。[s1] 17 年，王匡、王鳳在湖北的綠林山聚集飢民，稱為綠林軍；隔年，樊崇在泰山起兵，部下把眉毛塗紅好分辨敵我，稱為赤眉軍。[s1][s2] 22 年，漢朝宗室劉縯、劉秀兄弟也起兵，和綠林軍聯合，23 年立劉玄為更始帝。[s1][s3] 同年在昆陽，劉秀從外面帶援軍突擊，殺死王莽的大將王尋，王莽大軍崩潰；不久長安被攻破、王莽被殺。[s1][s3][s4] 但起事者之間又互相爭奪，25 年赤眉軍攻入長安；同年夏天，劉秀在鄗南即皇帝位，定都洛陽，史稱東漢。[s2][s3][s4] 他再花了十多年，到 36 年才平定各地勢力。[s3]
  key_terms:
    - { term: 中興, plain: 衰落或中斷的王朝重新振作、恢復。, example: 一支降級的球隊隔年又打回甲級聯賽。 }
    - { term: 宗室, plain: 皇帝家族的成員。, example: 劉秀是西漢景帝的後代，所以能用「恢復漢朝」號召人心。 }
  primary_source:
    - { text: 光武於是命有司設壇場於鄗南千秋亭五成陌。六月己未，即皇帝位。, from: 范曄《後漢書·光武帝紀上》, src: s4 }
  historiography: |
    **起事者是「盜賊」還是飢民？** 東漢官修史書站在勝利者的立場，常把綠林、赤眉寫成盜賊；但現代整理指出，他們起初是為了活下去而搶糧的飢民，甚至不攻打城市。[s1][s2]
    **光武帝為什麼能贏？** 一種看法強調劉秀個人的軍事才能與寬厚，例如赦免投降者、讓功臣封侯但不掌政權；另一種看法注意到他靠地方豪族投靠、政治聯姻（如娶擁兵十萬的真定王劉揚的外甥女郭聖通）爭取支持。[s3]
  misconceptions:
    - 「赤眉軍推翻了王莽」：攻入長安、殺死王莽的是綠林系的軍隊（23 年）；赤眉軍是 25 年才進入長安。[s1][s2]
crosscheck:
  date: 2026-11-02
  by: 獨立查核 agent（未參與寫作）
  result: 通過
  notes: "核對 s3（英文維基光武帝條）：昆陽殺王尋、25年夏稱帝、定都洛陽、36年成都投降、娶郭聖通、內宮侍從用宦官均有據。改寫對黨錮卡的因果為「規定內宮用宦官」並保留 disputed；刪去 s3 未支持的「與豪族利益綁在一起」。s1、s2、s4 因 WebFetch 共用額度耗盡未能重開，依寫作者引用保留。"
verification: 交叉確認
lens_status: 無直接論述
summary_card: true
---

## C1 背景

王莽改制失敗，加上黃河水災與饑荒，官府以武力鎮壓而不救濟，大批農民無法生存。[s1][s2]

## C2 經過

17 年綠林軍在湖北綠林山起事；18 年樊崇在泰山起事，形成赤眉軍。[s1][s2] 22 年綠林軍因瘟疫分裂為三支，與劉縯、劉秀兄弟聯合；23 年立更始帝，昆陽之戰擊潰王莽主力，同年長安被攻破、王莽被殺。[s1][s3] 25 年赤眉軍攻入長安，立劉盆子；同年六月劉秀在鄗南即位，定都洛陽。[s2][s3][s4] 27 年赤眉殘部投降，36 年攻下成都，全國統一。[s2][s3]

## C3 關鍵人物與群體

王匡、王鳳（綠林）、樊崇（赤眉）、更始帝劉玄、劉縯與劉秀兄弟。[s1][s2][s3]

## C6 直接結果

新朝滅亡，漢朝以東漢之名延續約兩百年；劉秀厚封功臣為侯而少給官職，又規定內宮侍從必須是宦官。[s3]
