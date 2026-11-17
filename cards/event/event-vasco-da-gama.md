---
id: event-vasco-da-gama
type: event
name: 達伽馬開闢印度航路
aliases: [達伽馬, Vasco da Gama, 大航海時代, 新航路, 好望角航線, sea route to India, 卡利卡特, 古里, 瓦斯科·達伽馬, Vasco da Gama first voyage, Calicut, 曼努埃爾一世, 达伽马开辟印度航路, 达伽马]
civilization: [葡萄牙, 印度]
track: west
time:
  start: 1497
  end: 1499
  precision: exact
  src: [s1, s2]
summary_line: 大事｜港口／海峽｜里斯本至古里｜達伽馬開闢印度航路
place:
  primary_field: 港口／海峽
  secondary_fields: [商路]
  locations:
    - { name_ancient: 里斯本, name_modern: 里斯本（葡萄牙）, lat: 38.72, lng: -9.14, precision: schematic, role: 1497 年 7 月 8 日出發港，1499 年返航（座標為今里斯本市）, src: [s1, s2] }
    - { name_ancient: 好望角, name_modern: 好望角（南非）, lat: -34.36, lng: 18.47, precision: schematic, role: 1497 年 11 月繞過非洲南端（座標為好望角示意點）, src: [s1, s2] }
    - { name_ancient: 馬林迪, name_modern: 馬林迪（肯亞）, lat: -3.22, lng: 40.12, precision: schematic, role: 1498 年 4 月停靠，當地統治者提供橫越印度洋的領航員（座標為今馬林迪市）, src: [s1, s2] }
    - { name_ancient: 古里（卡利卡特）, name_modern: 科澤科德（印度喀拉拉邦）, lat: 11.26, lng: 75.78, precision: schematic, role: 1498 年 5 月抵達的目的地，印度西南岸香料港（座標為今科澤科德市）, src: [s1, s2] }
  scale: line
structure_tags: [商路改道, 技術代差, 快速擴張]
topics: [香料貿易, 航海]
links: [event-zheng-he-voyages, commodity-manila-galleon, event-dutch-formosa, finance-amsterdam-exchange]
effects:
  - { id: finance-antwerp-bourse, rel: 促成, why: "新航路讓葡萄牙能從亞洲直接運回香料，並以安特衛普為主要航運基地，用香料換紡織品與金屬，帶動安特衛普興起。", src: [finance-antwerp-bourse:s1, finance-antwerp-bourse:s2] }
  - { id: event-portuguese-empire, rel: 促成, why: "首航顯示香料貿易獲利巨大，葡萄牙隨即派艦隊以武力開路，1505年設印度總督，在東非與亞洲沿岸建堡壘。", src: [s1, s2] }
counterparts:
  - { id: event-zheng-he-voyages, note: "相似：都是國家出資、橫越印度洋到達印度西南岸古里（卡利卡特）的遠航。不同：達伽馬只有 4 艘船、約 170 人，目標是香料貿易，之後葡萄牙一再派船、用武力建堡壘；鄭和船隊規模大得多，目的是朝貢與國威，結束後明朝停止遠航。", src: [s1, s2, s5] }
sources:
  - { id: s1, title: "Vasco da Gama — Wikipedia", url: "https://en.wikipedia.org/wiki/Vasco_da_Gama", accessed: 2026-10-25, tier: 百科 }
  - { id: s2, title: "Vasco da Gama — World History Encyclopedia", url: "https://www.worldhistory.org/Vasco_da_Gama/", accessed: 2026-10-25, tier: 百科 }
  - { id: s3, title: "A Journal of the First Voyage of Vasco da Gama, 1497–1499（船員日記，Ravenstein 英譯，Hakluyt Society 版）節錄，收於 Panorama: A World History 第 2 冊史料 1.2 — Bloomsbury", url: "https://res.cloudinary.com/bloomsbury-online-resources/image/upload/v1771522283/Panorama%20-%20A%20World%20History/Volume%202/Primary%20Source%20Documents/Source_1.2_Volume_2.pdf", accessed: 2026-11-17, tier: 一手 }
  - { id: s4, title: "Zamorin of Calicut — Wikipedia（英文）", url: "https://en.wikipedia.org/wiki/Zamorin_of_Calicut", accessed: 2026-11-17, tier: 百科 }
  - { id: s5, title: "Zheng He — Wikipedia", url: "https://en.wikipedia.org/wiki/Zheng_He", accessed: 2026-10-25, tier: 百科 }
importance: 3
learn:
  histories: [歐洲史, 印度史, 世界通史]
  why_care: 這條航路讓歐洲船第一次直接開到印度；但那片海本來就很熱鬧，古里（卡利卡特）與東非港口的人怎麼看這些陌生訪客，才是理解後來衝突的關鍵。
  story: |
    1497 年 7 月，葡萄牙國王曼努埃爾一世派 4 艘船、約 170 人從里斯本出發，想找直達印度的海路。[s1][s2] 船隊在莫三比克、蒙巴薩遇到敵意；馬林迪與蒙巴薩有衝突，對他們比較友善，他們在那裡請到一名古吉拉特領航員，橫越印度洋到古里（卡利卡特）。[s1] 古里本來就是穆斯林等各地商人聚集的香料港。[s4] 葡萄牙人的禮物太簡單，當地中間人說連麥加來的最窮商人給的都比這多；札莫林也沒有和他們簽成貿易條約。[s1][s3] 約 170 人出發，只有約 55 人回來。[s1][s2]
  key_terms:
    - { term: "札莫林", plain: "古里（卡利卡特）統治者的稱號，主要靠港口對商人收的稅維生。", example: "像一個港口城市的市長兼收費站老闆，商人愈多，他收入愈多。[s4]" }
    - { term: "季風", plain: "印度洋上隨季節改變方向的風，航行要等對的季節才順風。", example: "像一條季節性的單向順風道，走反了就特別慢；達伽馬去程 23 天、回程 90 多天。[s1]" }
    - { term: "領航員", plain: "熟悉海域與風向、替船隊帶路的人。", example: "像陌生城市裡請的當地嚮導；達伽馬靠在馬林迪請到的領航員才橫越印度洋。[s1]" }
  primary_source:
    - { text: "the poorest merchant from Mecca, or any other part of India, gave more（連麥加或印度其他地方來的最窮商人，給的都比這多）", from: 《達伽馬首航日記》（船員所寫，Ravenstein 英譯，Hakluyt Society 版）古里一段，節錄見 Panorama 第 2 冊；中文為本站摘譯, src: s3 }
  historiography: |
    **領航員是誰？** 舊說是阿拉伯航海家伊本·馬吉德，但學者已認為此說不太可能；英文維基說是一名古吉拉特人（World History Encyclopedia 只說舊說已被推翻，沒有提古吉拉特）。[s1][s2]
    **為什麼談判失敗？** 英文維基說，禮物簡陋、官員奇怪怎麼沒有金銀，又有穆斯林商人把達伽馬說成海盜。[s1] 船員日記則記下中間人的說法：禮物應該用黃金，而且連最窮的商人都送得更多。[s3] 這些說法互相並列，來源沒有告訴我們哪一個才是主因。
  misconceptions:
    - 「達伽馬發現了印度」：古里（卡利卡特）在 1498 年之前就是亞洲香料轉運的大港，中東、中國的商人都來這裡交易；達伽馬只是第一個從海路抵達的歐洲人。[s4]
    - 「葡萄牙人一到就受歡迎」：他們在莫三比克、蒙巴薩受到敵意，在古里（卡利卡特）也沒簽成條約。[s1]
    - 船員日記寫「古里城住的是基督徒」，這是船員的看法，並不是當地人的自稱。[s3]
  perspectives:
    - { history: "歐洲史", text: "葡萄牙王室想繞過中間商、直接買香料，所以出資冒險遠航，回來時卻只剩約三分之一的人。[s1][s2]" }
    - { history: "印度史", text: "對古里（卡利卡特）的札莫林來說，收入主要來自對香料貿易課稅，達伽馬帶的禮物簡陋，也沒談成條約；1502 年葡萄牙人再來，砲轟古里並攻擊一艘載有 300 多名朝聖者的船。[s1][s2][s4]" }
    - { history: "世界通史", text: "（東非視角）東非港口並非沒有自己的盤算：馬林迪因與蒙巴薩有衝突而對葡萄牙人友善，達伽馬在那裡請到領航員；航行的成功有一部分來自當地人的幫助。[s1]" }
verification: 交叉確認
crosscheck: { date: 2026-11-17, by: 獨立查核 agent（歷史學者＋教育者，未參與寫作）, result: 通過, notes: "（修正後通過）已重開 s1–s4。s3：『the poorest merchant from Mecca, or any other part of India, gave more』逐字相符，中譯準確；『city of Calicut is inhabited by Christians』、官員說禮物應用黃金、達伽馬答無金且自稱使節相符。s1：4 艘船、170 人、約 55 人回、損失 2 艘、莫三比克與蒙巴薩敵意、馬林迪友善且與蒙巴薩有衝突、古吉拉特領航員、否定伊本·馬吉德（年 77 太老）、禮物被輕視、穆斯林商人稱他海盜、條約失敗、23 天／90 多天相符。更正：s2 沒有寫莫三比克（說首航未停莫三比克）、沒有寫古吉拉特領航員、沒有 23／90 天，只說伊本·馬吉德說法已被推翻，故相關句的引註收窄為 [s1] 並加註；原 C3『札莫林要求照規矩繳關稅』與 s1 不符（s1 是達伽馬堅持繳關稅、札莫林拒絕留商館），已改；perspectives 的『第一次面對想用武力改規矩的對手』無依據，已刪；s4 沒有寫朝聖船，該句改引 s2。s4：古里為香料城、穆斯林與中東商人、札莫林靠對香料貿易課稅相符。story 已縮到約 190 字。未核：保羅·達伽馬病死、1505 總督等 C4–C7 舊句（沿用先前版本，未重開對照）。" }
lens_status: 無直接論述
images:
- url: https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Greg%C3%B3rio_Lopes_-_Vasco_da_Gama_%28ca_1524%29.jpg/960px-Greg%C3%B3rio_Lopes_-_Vasco_da_Gama_%28ca_1524%29.jpg
  page: https://commons.wikimedia.org/wiki/File:Greg%C3%B3rio_Lopes_-_Vasco_da_Gama_(ca_1524).jpg
  title: 達伽馬像
  creator: 格雷戈里奧・洛佩斯（Gregório Lopes）
  year: 約 1524
  license: Public domain（PD-old-100；2026-11-10 已核對 Commons 檔案頁）
  caption: 葡萄牙畫家畫的達伽馬；1498 年他繞過非洲南端抵達印度古里（卡利卡特），打通歐洲直航亞洲的海路。
---

## C1 背景

歐洲想要的胡椒、肉桂等香料產自亞洲，原本要經過阿拉伯商人與威尼斯等中間商轉手。[s1] 葡萄牙國王曼努埃爾一世想找到一條繞過中間商、直接從海路到印度的航線。[s1][s2] 船隊裡的領航員之一佩羅·德·阿倫克爾，曾是 1488 年繞過好望角的迪亞士的首席領航員。[s2]

## C2 經過

- 1497 年 7 月 8 日：4 艘船、約 170 人從里斯本出發。[s1][s2]
- 為了借助西風，船隊遠遠繞進大西洋，約三個月看不到陸地；1497 年 11 月繞過好望角。[s1][s2]
- 1498 年 3–4 月：在莫三比克、蒙巴薩與當地發生衝突（World History Encyclopedia 沒有寫莫三比克，只說蒙巴薩阿拉伯水手曾送橘子給病員；衝突以英文維基為準）；到馬林迪後獲得一名領航員帶路橫越印度洋。[s1][s2]
- 1498 年 5 月抵達古里（卡利卡特）（維基百科作 5 月 20 日，World History Encyclopedia 作 5 月 18 日抵達附近）。[s1][s2]
- 1498 年 8 月 29 日離開；逆著季風，回程橫越印度洋花了 90 多天，去程只要 23 天，許多船員死於壞血病。[s1]
- 1499 年 7–9 月陸續回到葡萄牙，各來源日期不一。[s1][s2]

## C3 關鍵人物與群體

- 達伽馬：船隊指揮官；其兄保羅·達伽馬在回程中病死。[s1][s2]
- 曼努埃爾一世：出資的葡萄牙國王。[s1][s2]
- 古里（卡利卡特）的統治者「札莫林」（Zamorin）：會見沒有具體成果，葡萄牙的禮物被認為簡陋，他拒絕了達伽馬留下商務代表的要求。[s1][s2]
- 馬林迪的領航員：舊說是阿拉伯航海家伊本·馬吉德，但學者已認為此說不太可能或已被推翻；英文維基說是一名古吉拉特人。[s1]（World History Encyclopedia 只說舊說已被推翻。[s2]）

## C4 制度或機制變化

- **新的貿易路線**：證明可以完全走海路、繞過非洲到達印度，不必經過中東的中間商。[s1][s2]
- **補給站**：讓葡萄牙看見東非港口作為補水、補給與修船站的價值，後來殖民莫三比克。[s1]
- **武力開路**：第二次航行（1502 年，15 艘船）要求古里（卡利卡特）驅逐穆斯林商人，被拒後砲轟古里（卡利卡特），並攻擊一艘載有 300 多名朝聖者的船。[s2] 1503 年在柯枝建立第一座堡壘。[s2]

## C5 受益者與受損者

受益：葡萄牙王室與參與香料貿易的商人；達伽馬獲得錫尼什鎮及其稅收、「印度洋上將」頭銜。[s1][s2] 受損：原本壟斷印度洋—地中海香料轉運的阿拉伯商人與威尼斯；[s1] 被葡萄牙船隊攻擊的沿岸城市與船隻。[s2]

## C6 直接結果

第一次航行沒有和古里（卡利卡特）簽成貿易條約，只帶回少量香料樣品，但已顯示獲利潛力巨大。[s1][s2] 約 170 人出發，只有約 55 人回來（估計），4 艘船損失 2 艘。[s1][s2] 國王還鑄造新金幣慶祝。[s2] 1500 年卡布拉爾率 13 艘船、約 1,500 人再赴印度，途中到達巴西。[s2]

## C7 長期影響

葡萄牙 1505 年設立印度總督，陸續在索法拉（1505）、莫三比克島（1507）等地建堡壘，之後又在中國、日本設立據點。[s2] 歐洲與亞洲之間出現一條由歐洲國家控制的海上貿易路線，揭開歐洲海上擴張的序幕。[s1][s2]

## C8 雙軌解讀

### 李彔

無直接論述。

### 哈拉瑞

無直接論述。

## C9 今日對照鉤子

「繞過中間商」：找到一條新路線，就能打破原本控制轉運的一方（威尼斯、阿拉伯商人）的利潤。[s1] 也可思考：新路線一開通，往往伴隨武力與據點爭奪，而不只是和平貿易。[s2]

## C10 不可類比的差異

15 世紀的遠航死亡率極高，約三分之二船員沒有回來，今天的航運無法相比。[s1][s2] 當時葡萄牙靠火砲與武力強行建立貿易據點，這種做法今天違反國際法，不能直接類比為現代企業競爭。[s2]
