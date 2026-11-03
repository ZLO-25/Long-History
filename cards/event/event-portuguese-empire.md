---
id: event-portuguese-empire
type: event
name: 葡萄牙海上帝國與迪亞士繞過好望角（1488年起）
aliases: [好望角, 迪亞士, 葡萄牙海上帝國, 迪亞士繞過好望角, Cape of Good Hope, Bartolomeu Dias, 澳門, 麻六甲, 果阿, 風暴角, Portuguese Empire, 葡屬印度, 印度總督, 通行證制度, Estado da India, cartaz]
civilization: [葡萄牙]
track: west
time:
  start: 1488
  end: 1580
  precision: approx
  src: [s1, s2]
summary_line: 大事｜港口／海峽｜好望角、果阿、麻六甲｜葡萄牙海上帝國與迪亞士繞過好望角（1488年起）
place:
  primary_field: 港口／海峽
  secondary_fields: [商路]
  locations:
    - { name_ancient: 里斯本, name_modern: 里斯本（葡萄牙）, lat: 38.7223, lng: -9.1393, precision: exact, role: 船隊出發港與王室所在地, src: [s1] }
    - { name_ancient: 好望角（風暴角）, name_modern: 好望角（南非）, lat: -34.3568, lng: 18.4740, precision: exact, role: 1488 年迪亞士繞過非洲南端, src: [s1, s3] }
    - { name_ancient: 果阿, name_modern: 果阿（印度）, lat: 15.4989, lng: 73.8278, precision: schematic, role: 1510 年阿爾布克爾克攻占，成為葡屬印度中心, src: [s2] }
    - { name_ancient: 麻六甲, name_modern: 馬六甲（馬來西亞）, lat: 2.1896, lng: 102.2501, precision: exact, role: 1511 年攻占，通往中國與東南亞的據點, src: [s2] }
  scale: area
structure_tags: [海權對陸權, 商路改道, 快速擴張, 技術代差]
topics: [航海, 香料貿易, 海上貿易, 對外擴張]
links: [event-vasco-da-gama, event-zheng-he-voyages, event-sengoku-japan, commodity-silver-flow, finance-antwerp-bourse, tech-tanegashima-arquebus, commodity-nanban-trade, person-luis-frois, commodity-iwami-silver, commodity-manila-galleon]
effects:
  - { id: event-sengoku-japan, rel: 促成, why: 葡萄牙商人 1540 年代抵達種子島，帶來火繩槍；日本很快大量仿製，改變了戰國大名的打法。, src: [s2, event-sengoku-japan:s1] }
counterparts:
  - { id: event-zheng-he-voyages, note: "相似：都是 15 世紀國家派出的遠洋船隊，航向印度洋。不同：鄭和船隊以朝貢外交為主、後來停止；葡萄牙則沿岸建堡壘、用武力與通行證壟斷香料貿易，持續擴張了一百多年。", src: [s2] }
sources:
  - { id: s1, title: "Bartolomeu Dias — Wikipedia", url: "https://en.wikipedia.org/wiki/Bartolomeu_Dias", accessed: 2026-11-02, tier: 百科 }
  - { id: s2, title: "Portuguese Empire — Wikipedia", url: "https://en.wikipedia.org/wiki/Portuguese_Empire", accessed: 2026-11-02, tier: 百科 }
  - { id: s3, title: "Eric Axelson, Popular Fallacies about the Dias Voyage 1487–1488 — Historia（University of Pretoria）", url: "https://upjournals.up.ac.za/index.php/historia/article/download/2611/2459/10214", accessed: 2026-11-02, tier: 學術 }
  - { id: s4, title: "Prince Henry the Navigator — Wikipedia（英文）", url: "https://en.wikipedia.org/wiki/Prince_Henry_the_Navigator", accessed: 2026-11-03, tier: 百科 }
  - { id: s5, title: "鉄砲伝来 — Wikipedia（日文）", url: "https://ja.wikipedia.org/wiki/鉄砲伝来", accessed: 2026-11-03, tier: 百科 }
importance: 3
learn:
  histories: [歐洲史, 世界通史]
  why_care: 一個人口不多的小國，靠船、大砲和沿岸堡壘，在一百年內把貿易網從里斯本拉到日本。
  story: |
    1487 年，葡萄牙航海家迪亞士帶三艘船出發，沿非洲西岸往南找通往亞洲的海路。[s1] 1488 年 2 月，他繞過非洲南端，進入今天南非的莫塞爾灣；3 月在更東邊立下石柱後折返，12 月回到里斯本，前後約 16 個月。[s1] 十年後，達伽馬沿著這條路線抵達印度。[s2] 之後葡萄牙一面派艦隊、一面在東非、印度與東南亞沿岸蓋堡壘：1505 年設印度總督，1509 年在第烏打敗埃及與古吉拉特聯合艦隊，1510 年占果阿，1511 年取麻六甲。[s2] 他們發「通行證」給商船，沒買的就可能被攻擊。[s2] 葡萄牙人 1540 年代到了日本，1557 年獲准在澳門居住。[s2]
  key_terms:
    - { term: 通行證制度（cartaz）, plain: 葡萄牙要求印度洋上的商船購買許可證，否則可能被攻擊或沒收，用來壟斷貿易。, example: 像有人霸占一條公共道路，只讓買了他通行證的人過。 }
    - { term: 據點帝國, plain: 不占領大片土地，只在海岸重要港口建堡壘和商館，控制航線。, example: 像連鎖店只開在每個捷運轉乘站，就能掌握大部分人流。 }
  primary_source:
    - { text: "it was with good reason that this promontory was called Cabo de Boa Esperança（這個海角被稱為「好望角」是有道理的）", from: 杜阿爾特·帕謝科·佩雷拉（Duarte Pacheco Pereira）《Esmeraldo de situ orbis》，轉引自 Axelson 文, src: s3 }
  historiography: |
    **好望角是誰命名的？** 傳統說法來自 16 世紀史家巴羅斯（João de Barros）：迪亞士因為風暴叫它「風暴角」，後來國王若昂二世改名「好望角」。[s1][s3] 歷史學者 Axelson 指出，巴羅斯的記載寫於事件約六十年後，日期與地點有多處錯誤；他根據哥倫布兄弟的筆記與佩雷拉的記載，認為很可能是迪亞士自己就取名「好望角」。[s3]
    **靠什麼擴張？** 維基百科整理的看法強調，葡萄牙靠沿岸堡壘、海戰勝利與通行證制度控制貿易，而不是占領內陸；1415 年占領的休達代價高昂，也沒有成為向內陸擴張的基地。[s2]
  misconceptions:
    - 迪亞士沒有到印度：他繞過好望角後就折返，第一個從海路到印度的是 1498 年的達伽馬。[s1][s2]
    - 「先叫風暴角、國王再改名好望角」只是傳統說法，史家對此有不同意見。[s1][s3]
  pop_culture:
    - { claim: "亨利王子在薩格里什（Sagres）辦了一所「航海學校」，集合航海家與製圖師。", fact: "英文維基指出現代史家視此為誤解：沒有任何現代意義的航海科學中心或天文台存在；這個傳說是 18 世紀由 Samuel Purchas 與 Abbé Prévost 等人塑造的，Randles（1993）、Albuquerque（1990）等學者都否定「學校」的存在。[s4]", src: [s4] }
    - { claim: "「航海家亨利」自己也常出海探險。", fact: "條目沒有他親自參加探險航行的記載，他的角色是資助、授權船長並抽取兩成（quinto）；「航海家」這個稱號在他生前與之後三百年都沒人用過，是 19 世紀德國史家 Schaefer、de Veer 創造、英國作家 Major 與 Beazley 推廣的。[s4]", src: [s4] }
    - { claim: "1543 年一艘葡萄牙船「發現」了日本，把火槍帶到種子島。", fact: "《鉄炮記》記載的那艘船上有明人「五峯」用筆談溝通，依 Galvão 的記載葡萄牙人是搭中國戎克船抵達的；葡萄牙文獻（Galvão）記為 1542 年，其他史料介於 1541–1544 年之間。宇田川武久等人更主張火繩槍可能透過倭寇走私從東南亞傳入，不只種子島一條路。[s5]", src: [s5] }
crosscheck:
  date: 2026-11-02
  by: 獨立查核 agent（未參與寫作）
  result: 通過
  notes: "核對英文維基 Bartolomeu Dias／Portuguese Empire 與 Axelson 文（佩雷拉引文相符）。刪除後果→event-vasco-da-gama（與該卡後果互指形成循環，達伽馬卡已寫本卡為後果）；通行證制度刪去未能核實的 1502 年。抵日年份 1542／1543 仍有分歧，卡片寫 1540 年代。 2026-11-03 第 2 期新增部分已查核：開 s4 s5：薩格里什航海學校為 18 世紀 Purchas／Prévost 塑造、Randles 1993／Albuquerque 1990 否定、「航海家」稱號 19 世紀 Schaefer／de Veer 創、Major／Beazley 推廣、quinto 兩成、鐵砲 1542／1543 與宇田川說均相符；「搭中國船」改註依 Galvão。links 5 個 id 均存在。通過。"
verification: 交叉確認
lens_status: 無直接論述
summary_card: true
---

## C1 背景

葡萄牙 1415 年攻占北非的休達；亨利王子到 1460 年去世前持續資助航海探險，想找到通往亞洲香料的海路；1481 年在西非建聖若熱達米納堡保護黃金貿易。[s2]

## C2 經過

1487 年迪亞士出航，1488 年 2 月 4 日繞過非洲南端抵達莫塞爾灣，3 月 12 日在 Kwaaihoek 立石柱，12 月回到里斯本。[s1] 1494 年《托德西利亞斯條約》與西班牙劃分勢力範圍；1498 年達伽馬抵達印度卡利卡特；1505 年任命第一任印度總督；1509 年第烏海戰；1510 年取果阿、1511 年取麻六甲、1515 年取荷姆茲；1557 年獲准居住澳門。[s2]

## C4 制度或機制變化

葡萄牙在亞洲建立以果阿為中心的「葡屬印度」，以沿岸堡壘、商館與艦隊控制航線；並推行通行證制度，強制商船購買許可，用來壟斷印度洋貿易。[s2]

## C6 直接結果

歐洲與亞洲之間出現一條繞過中東陸路的海上香料航線，葡萄牙成為印度洋上的海上強權。[s2]

## C7 長期影響

1580 年西班牙國王腓力二世兼任葡萄牙國王，兩國聯合 60 年，葡萄牙的海外據點開始遭荷蘭等對手攻擊。[s2]
