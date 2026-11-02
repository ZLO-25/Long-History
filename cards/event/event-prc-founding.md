---
id: event-prc-founding
type: event
name: 中華人民共和國成立（1949年）
aliases: [中華人民共和國成立, 中共建國, 開國大典, 新中國成立, 中國人民站起來了, 中國人民政治協商會議, 共同綱領, 中共建國與蘇聯試爆原子彈, 蘇聯第一次核試, RDS-1, 中蘇友好同盟互助條約, 一邊倒, Founding of the People's Republic of China, Proclamation of the People's Republic of China]
civilization: [中華人民共和國, 蘇聯]
track: china
time:
  start: 1949
  end: 1949
  precision: exact
  src: [s1, s2, s3]
summary_line: 大事｜宮廷／政治中心｜北京天安門｜中華人民共和國成立（1949年）
place:
  primary_field: 宮廷／政治中心
  secondary_fields: [城市／都會]
  locations:
    - { name_ancient: 北平（天安門）, name_modern: 北京市天安門（中國）, lat: 39.9087, lng: 116.3975, precision: exact, role: 1949 年 10 月 1 日毛澤東在天安門城樓宣布中央人民政府成立, src: [s1] }
    - { name_ancient: 塞米巴拉金斯克試驗場, name_modern: 哈薩克東北部塞米伊附近（哈薩克）, lat: 50.4378, lng: 77.8106, precision: schematic, role: 1949 年 8 月 29 日蘇聯第一次原子彈試爆（座標示意）, src: [s4] }
  scale: point
structure_tags: [革命與政權更替, 霸權挑戰, 突變事件]
topics: [革命, 冷戰, 軍事同盟]
links: [war-chinese-civil-war, war-korean-war, event-sino-soviet-split, event-us-taiwan-defense, event-great-leap-cultural-revolution]
causes:
  - { id: war-chinese-civil-war, rel: 直接引發, why: 共軍打贏三大戰役、渡過長江，國民政府失去大陸主要地區，中共隨即召開政協、宣布建國。, src: [s1, s3] }
effects:
  - { id: war-korean-war, rel: 背景, why: 1949 年中共勝利、蘇聯也有了原子彈，冷戰在東亞變得尖銳，北韓也在蘇聯支持下取得武器優勢。, src: [s4, war-korean-war:s1] }
  - { id: event-sino-soviet-split, rel: 背景, why: 新政權向蘇聯「一邊倒」，1950 年簽同盟條約取得貸款與援助，兩國正式結盟；後來的中蘇交惡，就是這段同盟關係的破裂。, src: [s5] }
counterparts: "無適當對照：西方軌現有卡片中，沒有「內戰勝利的革命政黨建立新國家、同時加入冷戰一方陣營」的事件卡；法國大革命與美國獨立的時代與意識形態差異太大，不硬湊。"
sources:
  - { id: s1, title: "Proclamation of the People's Republic of China — Wikipedia", url: "https://en.wikipedia.org/wiki/Proclamation_of_the_People%27s_Republic_of_China", accessed: 2026-11-02, tier: 百科 }
  - { id: s2, title: "Mao Tse-tung, \"The Chinese People Have Stood Up!\"（1949 年 9 月 21 日政協第一屆全體會議開幕詞）— Selected Works Vol. V, Marxists Internet Archive", url: "https://www.marxists.org/reference/archive/mao/selected-works/volume-5/mswv5_01.htm", accessed: 2026-11-02, tier: 一手 }
  - { id: s3, title: "The Chinese Revolution of 1949 — Office of the Historian, U.S. Department of State", url: "https://history.state.gov/milestones/1945-1952/chinese-rev", accessed: 2026-11-02, tier: 通論 }
  - { id: s4, title: "RDS-1 — Wikipedia", url: "https://en.wikipedia.org/wiki/RDS-1", accessed: 2026-11-02, tier: 百科 }
  - { id: s6, title: "第二次國共內戰 — 維基百科（中文）", url: "https://zh.wikipedia.org/wiki/%E7%AC%AC%E4%BA%8C%E6%AC%A1%E5%9B%BD%E5%85%B1%E5%86%85%E6%88%98", accessed: 2026-11-02, tier: 百科 }
  - { id: s5, title: "Sino-Soviet Treaty of Friendship, Alliance and Mutual Assistance — Wikipedia", url: "https://en.wikipedia.org/wiki/Sino-Soviet_Treaty_of_Friendship,_Alliance_and_Mutual_Assistance", accessed: 2026-11-02, tier: 百科 }
importance: 3
summary_card: true
learn:
  histories: [中國史, 世界通史]
  why_care: 每年 10 月 1 日的中國「國慶日」，紀念的就是這一天；1949 年這一年，中國換了政權、蘇聯有了原子彈，冷戰在東亞從此變得劍拔弩張。
  story: |
    1949 年 9 月 21 日，中國人民政治協商會議在北平開幕，毛澤東在開幕詞中說，占人類四分之一的中國人「從此站起來了」。[s2][s1] 這次會議通過《共同綱領》、選出中央人民政府領導人，並決定以北平（改名北京）為首都。[s1] 10 月 1 日，毛澤東在天安門城樓宣布「中華人民共和國中央人民政府今天成立了」，第一次升起五星紅旗；隔天蘇聯第一個承認新政權。[s1] 幾個星期前的 8 月 29 日，蘇聯在哈薩克試爆了第一顆原子彈，美國原本獨占核武的局面結束。[s4] 12 月毛澤東坐火車到莫斯科見史達林，1950 年 2 月簽下《中蘇友好同盟互助條約》，蘇聯提供 3 億美元貸款。[s5] 同一時間，國民政府撤到臺灣；美國國內則爭吵「誰丟了中國」，兩國之後二十多年沒有外交關係。[s3]
  key_terms:
    - { term: 政治協商會議, plain: 1949 年中共邀集各黨派與團體召開的會議，在正式憲法出現前代行建國的立法工作。, example: 像新社團成立前，先找各方代表開籌備會，訂社規、選幹部。 }
    - { term: 一邊倒, plain: 新中國外交上明確站在蘇聯陣營一邊，與美國等西方國家對立。, example: 像班上分成兩派時，一個新轉來的同學一開始就宣布加入其中一派。 }
  primary_source:
    - { text: "the Chinese people, comprising one quarter of humanity, have now stood up（占人類總數四分之一的中國人從此站立起來了）", from: 毛澤東〈中國人民站起來了〉，1949 年 9 月 21 日中國人民政治協商會議第一屆全體會議開幕詞（英譯；中文為本站回譯）, src: s2 }
  historiography: |
    **「站起來了」是在哪天說的？** 很多人以為毛澤東是在 10 月 1 日的天安門開國大典上說「中國人民站起來了」，但這句話出自 9 月 21 日政協開幕詞；10 月 1 日他宣讀的是中央人民政府成立的公告。[s2][s1]
    **新政權的意義怎麼看？** 中共的官方敘事把 1949 年視為結束「百年屈辱」、民族重新獨立的起點；美國政府的史家則把它放在冷戰框架中，指出中共勝利使美國陷入「誰丟了中國」的爭論，並在韓戰後轉為協防臺灣、與北京長期對立。[s2][s3]
  misconceptions:
    - 1949 年 10 月 1 日並不代表內戰完全結束：國民政府到 12 月 7 日才決定遷設臺北，國軍到 1950 年 5 月才從海南島撤往臺灣。[s6]
    - 「中國人民站起來了」不是開國大典上的話，而是 9 月 21 日政協開幕詞。[s2]
crosscheck:
  date: 2026-11-02
  by: 獨立查核 agent（未參與寫作）
  result: 通過
  notes: "開啟 s1、s4、s5 核對：9/21 政協、組織法與定都北京、10/1 天安門宣布與首次升旗、10/2 蘇聯承認、8/29 塞米巴拉金斯克 22 千噸、9/23 杜魯門宣布、美國隨即趕造氫彈、12/6 毛赴莫斯科、1950/2/14 簽約、3 億美元 1% 低利貸款、30 年效期、1979/2 期滿。修正：中長鐵路（1952 年前無償交還）與旅順港（日後交還）分開寫；條約到期改寫為 s5 所述 1979 年 2 月期滿。s2 開幕詞引文與日期（1949/9/21）已核；s3、s6 於國共內戰卡核對過。韓戰後果與韓戰卡前因同文，依韓戰卡 s1。"
verification: 交叉確認
lens_status: 無直接論述
---

## C1 背景

1946 年起的國共內戰到 1949 年局勢已定：共軍在遼瀋、淮海、平津三大戰役擊潰國軍主力，4 月渡江攻下南京。[s3][s1] 國際上，美蘇冷戰已經開始；1949 年 8 月 29 日蘇聯試爆第一顆原子彈，9 月 23 日杜魯門公開證實，美國的核武獨占結束。[s4]

## C2 經過

- **1949 年 9 月 21 日**：中國人民政治協商會議第一屆全體會議開幕，毛澤東致詞宣布中國人民「站起來了」；會議通過《共同綱領》與政府組織法，選出中央人民政府領導人，定都北京。[s1][s2]
- **10 月 1 日**：毛澤東在天安門城樓宣布中央人民政府成立，升起五星紅旗，這天成為國慶日。[s1]
- **10 月 2 日**：蘇聯第一個承認中華人民共和國，其他共產國家隨後跟進。[s1]
- **1949 年 12 月–1950 年 2 月**：毛澤東赴莫斯科與史達林會談，1950 年 2 月 14 日簽訂《中蘇友好同盟互助條約》。[s5]

## C4 制度或機制變化

在正式憲法制定以前，《共同綱領》作為施政依據，由政協代行立法職能、選出中央人民政府。[s1] 外交上，新政權與蘇聯結盟：條約約定 30 年效期，蘇聯提供 3 億美元低利貸款，並承諾在 1952 年前把中長鐵路無償交還中國、日後再交還旅順港。[s5]

## C6 直接結果

中國大陸換了政權，中華民國政府撤到臺灣，兩岸形成對峙。[s3] 中蘇結盟加上蘇聯擁有核武，讓美國感到共產陣營在亞洲迅速壯大；美國隨即加速發展氫彈。[s4][s5] 美國國內「誰丟了中國」的指責，也讓杜魯門政府承受很大的政治壓力。[s3]

## C7 長期影響

韓戰爆發後，中美兩國直接在朝鮮半島交戰，美國轉而協防臺灣，雙方二十多年沒有外交關係。[s3] 中蘇同盟條約約定 30 年效期，在兩國早已交惡的 1979 年 2 月期滿失效。[s5]
