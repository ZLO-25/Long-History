---
id: event-alexander-campaign
type: event
name: 亞歷山大東征
aliases: [亞歷山大大帝, Alexander the Great, 亞歷山大遠征, 馬其頓東征, 高加米拉戰役, 伊蘇斯戰役, Wars of Alexander the Great, 亚历山大东征]
civilization: [馬其頓, 古希臘, 波斯]
track: west
time:
  start: -334
  end: -323
  precision: exact
  src: [s1, s2]
summary_line: 大事｜戰場｜從馬其頓到印度河｜亞歷山大東征
place:
  primary_field: 戰場
  secondary_fields: [宮廷／政治中心, 商路]
  locations:
    - { name_ancient: 佩拉, name_modern: 佩拉（希臘）, lat: 40.75435, lng: 22.51822, pleiades_id: "491687", precision: exact, role: 馬其頓王國首都 }
    - { name_ancient: 伊蘇斯, name_modern: 伊斯肯德倫灣附近（土耳其）, lat: 36.85366, lng: 36.15703, pleiades_id: "658490", precision: exact, role: 前 333 年擊敗大流士三世 }
    - { name_ancient: 推羅, name_modern: 蘇爾（黎巴嫩）, lat: 33.26933, lng: 35.20182, pleiades_id: "678437", precision: exact, role: 前 332 年圍城約七個月（推羅又譯推羅、泰爾） }
    - { name_ancient: 亞歷山卓, name_modern: 亞歷山大港（埃及）, lat: 31.20143, lng: 29.90977, pleiades_id: "727070", precision: exact, role: 前 331 年開始建城 }
    - { name_ancient: 高加米拉, name_modern: 摩蘇爾附近（伊拉克）, lat: 36.57331, lng: 43.49432, pleiades_id: "874478", precision: exact, role: 前 331 年決戰 }
    - { name_ancient: 波斯波利斯, name_modern: 設拉子附近（伊朗）, lat: 29.93519, lng: 52.89042, pleiades_id: "922695", precision: exact, role: 前 330 年被劫掠焚毀 }
    - { name_ancient: 希達斯皮斯河, name_modern: 傑赫勒姆河（巴基斯坦）, lat: 33.25659, lng: 73.63348, pleiades_id: "59837", precision: exact, role: 前 326 年擊敗波魯斯 }
    - { name_ancient: 巴比倫, name_modern: 希拉附近（伊拉克）, lat: 32.53729, lng: 44.42497, pleiades_id: "893951", precision: exact, role: 前 323 年亞歷山大去世 }
    - { name_ancient: 加薩, name_modern: 加薩（巴勒斯坦）, lat: 31.5, lng: 34.466, precision: schematic, role: 前 332 年 10 月圍城，男性被殺、婦孺被賣為奴（座標為市區示意）, src: [s1] }
  scale: line
structure_tags: [快速擴張, 補給線過長, 戰爭融資, 突變事件, 地形險阻]
topics: [對外擴張, 奴隸制]
links: [war-greco-persian, building-acropolis, person-alexander, person-aristotle, tech-alexandria-library, event-greek-philosophy-schools, war-roman-conquest-greece]
causes:
  - { id: event-macedon-rise, rel: 直接引發, why: 腓力二世遇刺後亞歷山大繼位，接下率領希臘各邦的科林斯同盟，鎮壓希臘的反叛後，就帶兵渡海進攻波斯。, src: [s1] }
  - { id: war-greco-persian, rel: 背景, why: 據狄奧多羅斯等古代作者說，亞歷山大焚燒波斯波利斯是報復前 480 年波斯人燒雅典衛城；但維基指出究竟是酒後意外還是故意報復並不清楚。, src: [s2, s1], disputed: true }
effects:
  - { id: event-hellenistic-kingdoms, rel: 直接引發, why: 亞歷山大死時沒有穩定的繼承安排，部將爭奪帝國打了幾十年，最後分成幾個希臘化王國。, src: [s1, s2] }
  - { id: event-maurya-empire, rel: 促成, why: 東征在印度西北設下希臘人的總督；亞歷山大死後，建立孔雀王朝的旃陀羅笈多趕走這些總督，把西北併入新王朝。, src: [s1] }
counterparts:
  - { id: event-qin-unification, note: "相似：十年左右的連續征戰，把多個國家併成一個大帝國。不同：亞歷山大死後帝國被部將瓜分；秦朝本身只存在 15 年，但制度被漢朝接收延續。", src: [s1, s6] }
  - { id: event-zhang-qian-west, note: "相似：一趟深入未知地區的遠行，兩人都到過大夏（巴克特里亞），把東西兩端的地理知識連起來。不同：亞歷山大帶大軍征服；張騫只帶百餘人去結盟與蒐集情報。", src: [s1, s7] }
sources:
  - { id: s1, title: "Wars of Alexander the Great — Wikipedia", url: "https://en.wikipedia.org/wiki/Wars_of_Alexander_the_Great", accessed: 2026-10-24, tier: 百科 }
  - { id: s2, title: "Donald L. Wasson, Death of Alexander the Great — World History Encyclopedia (2024)", url: "https://www.worldhistory.org/article/2366/death-of-alexander-the-great/", accessed: 2026-10-24, tier: 通論 }
  - { id: s3, title: "Arrian, The Anabasis of Alexander, Book I ch. 11（英譯本，Wikisource；註腳列 Diodorus 17.17 與 Plutarch 的兵力數字）", url: "https://en.wikisource.org/wiki/The_Anabasis_of_Alexander/Book_I/Chapter_XI", accessed: 2026-11-12, tier: 一手 }
  - { id: s4, title: "Alexander the Great — World History Encyclopedia", url: "https://www.worldhistory.org/Alexander_the_Great/", accessed: 2026-11-12, tier: 通論 }
  - { id: s8, title: "Plutarch, Life of Alexander 第 11、15 章（Perrin 英譯）— LacusCurtius", url: "https://penelope.uchicago.edu/Thayer/e/roman/texts/plutarch/lives/alexander*/3.html", accessed: 2026-11-12, tier: 一手 }
  - { id: s9, title: "Arrian, Anabasis of Alexander, Book II（Rooke 1812 英譯）— Elfinspell", url: "https://elfinspell.com/ClassicalTexts/Rooke/Arrian-Alexander/Book2.html", accessed: 2026-11-12, tier: 一手 }
  - { id: s6, title: "Qin's wars of unification — Wikipedia", url: "https://en.wikipedia.org/wiki/Qin%27s_wars_of_unification", accessed: 2026-10-24, tier: 百科 }
  - { id: s7, title: "Zhang Qian — Wikipedia", url: "https://en.wikipedia.org/wiki/Zhang_Qian", accessed: 2026-10-24, tier: 百科 }
importance: 3
learn:
  histories: [希臘羅馬史]
  why_care: 約十年打下橫跨埃及到印度河的帝國，留下了希臘語和希臘式城市；但同一場戰爭，對底比斯、推羅、加薩和波斯來說是毀滅。[s1][s4]
  story: |
    前 336 年腓力二世遇刺，二十歲的亞歷山大繼位，接下率領希臘城邦的科林斯同盟，鎮壓反叛、把底比斯夷平。[s1] 前 334 年他帶著約三萬步兵和五千騎兵渡海進攻波斯，古代作者說法略有不同。[s1][s3] 前 333 年伊蘇斯、前 332 年圍攻推羅（又譯推羅）約七個月，前 331 年進入埃及建亞歷山卓，同年高加米拉決戰獲勝。[s1][s4] 前 330 年波斯波利斯被攻下並焚燒，大流士被部下殺害，波斯帝國實質結束。[s1] 他繼續東進，前 326 年在印度擊敗波魯斯，但士兵在希發西斯河拒絕再往前。[s1][s4] 前 323 年他在巴比倫去世，約 32 歲，沒有安排繼承人，帝國由部將瓜分。[s2]
  key_terms:
    - { term: 科林斯同盟, plain: 腓力二世組成的希臘城邦同盟，由馬其頓國王擔任領導人，亞歷山大繼位後接下這個領導權。, example: 像學校聯盟推舉最強的學校當盟主，大家出人出力但要聽盟主的。 }
    - { term: 總督（satrap）, plain: 波斯帝國派到各省治理的官員；亞歷山大打下來之後，常常保留當地總督制度。, example: 像總公司接管分店後，仍讓原本的分店經理繼續當經理。 }
    - { term: 塔蘭特（talent）, plain: 古代重量與金錢單位，一塔蘭特是很大一筆銀子，常用來計算戰利品。, example: 像用「卡車」來算貨物，不是一枚一枚數。 }
    - { term: 希臘化, plain: 亞歷山大死後，希臘語和希臘城市文化散到埃及、西亞和印度西北，並與當地文化混合。, example: 像連鎖咖啡店開到各國後，會多出各國口味的新菜單。 }
  primary_source:
    - { text: "He led not much above 30,000 infantry together with light-armed troops and archers, and more than 5,000 cavalry.（他帶領的步兵不比三萬多多少，加上輕裝兵和弓箭手，騎兵超過五千。）", from: 阿里安《亞歷山大遠征記》1.11（英譯本，Wikisource；中文為本站中譯）, src: s3 }
  historiography: |
    **亞歷山大帶了多少兵？** 阿里安說步兵「不比三萬多多少」、騎兵超過 5,000；[s3] 譯本註腳說狄奧多羅斯（17.17）寫 30,000 步兵、4,500 騎兵。[s3] 普魯塔克（《亞歷山大傳》15）說，最低的記載是 30,000 步兵、4,000 騎兵，最高的是 43,000 步兵、5,000 騎兵。[s8] 世界歷史百科寫 32,000 步兵、5,100 騎兵。[s4] 這些都是古代作者的說法，沒有一個是帳冊上的數字。波斯方面的兵力這次沒有找到可靠的數字，所以本卡不寫。
    **波斯波利斯為什麼著火？** 狄奧多羅斯等說是報復前 480 年波斯燒雅典衛城；世界歷史百科說是在酒宴上，由妓女泰伊絲帶頭點火；維基則說，究竟是酒後意外還是故意報復並不清楚。[s1][s4]
    **他是英雄還是破壞者？** 世界歷史百科指出，現代史家比早期敘述更批判，批評他毀波斯波利斯、對待推羅居民的方式，但整體西方學界看法「仍大致正面」。[s4] 看法的差別在於：看的是征服的成果，還是被征服者付出的代價。
  misconceptions:
    - 「亞歷山大讓希臘人和波斯人融合在一起」：他確實試過，前 324 年在蘇薩讓部將娶波斯貴族女子、自己也娶大流士的女兒；但許多馬其頓士兵反對，這個嘗試在他死後也沒有延續下去。[s4]
  pop_culture:
    - { claim: "常見印象：電影和遊戲常把東征演成「解放」東方、傳播文明的偉大事業。", fact: "推羅被攻下後，阿里安記載約 8,000 人被殺、約 3 萬人被賣為奴；加薩的男性戰死、婦孺被賣；底比斯被夷平，普魯塔克說死者超過 6,000、被賣的超過 3 萬；波斯波利斯被焚毀。這些都是古代作者的數字。[s1][s4][s8][s9]", src: [s1, s4, s8, s9] }
verification: 交叉確認
crosscheck: { date: 2026-11-12, by: 獨立查核 agent（歷史學者＋教育者，未參與寫作）, result: 通過, notes: "1) 已開 LacusCurtius 普魯塔克《亞歷山大傳》：第 15 章最低兵力是 30,000 步兵、4,000 騎兵（卡片原依譯本註腳寫成 5,000，已改；最高 43,000 步兵、5,000 騎兵為查核者所知的 Perrin 譯文，頁面摘要未回傳這半句）；第 11 章底比斯死者逾 6,000、被賣逾 3 萬。2) 推羅（推羅）傷亡與人物卡統一：阿里安 2.24 約 8,000 人被殺、約 3 萬人被賣；加薩男性戰死、婦孺被賣；新增來源 s8、s9（s9 Elfinspell 為人物卡作者所開，查核者未重開）。3) 死亡日期補上並列說法，與人物卡一致。4) 譯名：推羅加註又譯推羅；人物卡的波魯斯、希達斯皮斯河、希發西斯河改成與本卡相同。5) 孔雀王朝 effect 維持「促成」（對方卡也這樣寫），建國年加「約」。阿里安 1.11 引文與年表與查核者所知一致，未重開 Wikisource。WebFetch 全團隊共用額度在查核中途用盡，本輪實際打開 7 個來源，其餘依查核者專業知識判斷並改成較保守的說法。 【補查 2026-11-12】已重開 LacusCurtius 普魯塔克《亞歷山大傳》第 15 章：最低 30,000 步兵、4,000 騎兵，最高 43,000 步兵、5,000 騎兵，兩組數字這次都逐字看到。已重開 Elfinspell 阿里安第二卷：第 24 章「About eight thousand Tyrians were slain」、其餘約三萬人（含外邦人）被賣為奴、馬其頓方面整個圍城約四百人陣亡；第 27 章加薩守軍戰死、婦孺被賣、前三次強攻被擋、第四次攻下，均與卡片相符。已重開英文維基 Alexander the Great：死亡日寫前 323 年 6 月 10 或 11 日，相符。仍未重開：Wikisource 阿里安 1.11、WHE（32,000／5,100 的兵力、波斯波利斯、戰利品數字）、Britannica「6 月 13 日」。" }
lens_status: 無直接論述
images:
- url: https://upload.wikimedia.org/wikipedia/commons/1/14/Map-alexander-empire.png
  page: https://commons.wikimedia.org/wiki/File:Map-alexander-empire.png
  title: 亞歷山大帝國地圖
  creator: George Willis Botsford
  year: 1913
  holder: 《A History of the Ancient World》（Macmillan）
  license: Public domain
  caption: 1913 年出版的教科書地圖，標出亞歷山大征服波斯帝國後的疆域與行軍範圍；是近代人整理的簡化地圖。
---

## C1 背景

前 336 年腓力二世遇刺，亞歷山大繼位為馬其頓國王，也接下「科林斯同盟」的領導權；前 335 年他鎮壓希臘與色雷斯的反叛，並把底比斯夷為平地。[s1]

## C2 經過

- 前 334：率軍渡過赫勒斯滂進入亞洲，於格拉尼庫斯河擊敗波斯總督。[s1]
- 前 333：伊蘇斯戰役擊敗大流士三世。[s1]
- 前 332：圍攻推羅約七個月，以築堤與海軍攻下。[s1]
- 前 331：進入埃及並開始建亞歷山卓；10 月高加米拉決戰獲勝。[s1]
- 前 330：攻下波斯波利斯並焚城；大流士被部下貝蘇斯殺害，阿契美尼德帝國實質結束。[s1]
- 前 329–326：轉戰中亞與印度，前 326 年在希達斯皮斯河擊敗波魯斯；軍隊在希發西斯河拒絕再往東，東征止步。[s1]
- 回程穿越格德羅西亞沙漠損失慘重（普魯塔克說折損四分之三，屬古代記載）。[s1]
- 前 323 年 6 月在巴比倫去世，約 32 歲；日期常寫 6 月 10 日或 11 日，也有工具書寫 6 月 13 日（見亞歷山大人物卡）。[s2]

## C3 關鍵人物與群體

亞歷山大三世、波斯國王大流士三世、印度王波魯斯；留守馬其頓與希臘的是安提帕特。[s1][s3]

## C4 制度或機制變化

一個橫跨希臘、埃及、波斯到印度河的政權在約十年內出現；亞歷山大在埃及被當作法老接受。[s1] 他死後沒有穩定的繼承安排，帝國很快被部將瓜分。[s1][s2]

## C5 受益者與受損者

受損者包括被毀的底比斯、推羅（阿里安記載約 8,000 人被殺、約 3 萬人被賣為奴）、加薩（男性戰死、婦孺被賣為奴）與波斯王室；[s1][s9]馬其頓軍隊與將領取得巨額戰利品。[s1]

另一邊的視角：世界歷史百科指出，現代史家批評他毀波斯波利斯、對待推羅居民的方式；波斯方面留下的當時史料很少，我們看到的故事多半出自希臘與羅馬作者。[s4]

## C6 直接結果

高加米拉戰後約擄獲 4,000 塔蘭特，蘇薩約得 5 萬塔蘭特（古代記載數字）。[s1] 亞歷山大死後爆發「繼業者戰爭」，持續約 40 年，希臘化時代開始。[s1][s2]

## C7 長期影響

希臘化王國在東地中海與西亞存續數百年；在印度方面，旃陀羅笈多約於前 321 年建立孔雀王朝，推翻希臘人設立的總督。[s1]

## C8 雙軌解讀

### 李彔

無直接論述。

### 哈拉瑞

無直接論述。

## C9 今日對照鉤子

「以極快速度擴張的組織，核心領導人一旦消失就迅速分裂」的結構；以及以戰利品維持擴張動能的模式。[s1][s2]

## C10 不可類比的差異

古代帝國的統治靠軍隊與地方總督，沒有今日國家的官僚、通訊與財政系統；戰利品與兵力數字多來自古代作者，可信度有限。[s1]
