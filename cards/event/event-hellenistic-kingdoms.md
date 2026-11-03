---
id: event-hellenistic-kingdoms
type: event
name: 繼業者戰爭與希臘化王國（前323–前30年）
aliases: [希臘化時代, 托勒密王朝, 塞琉古王朝, 繼業者戰爭, 希臘化王國, 安提柯王朝, Hellenistic period, Diadochi, 伊普蘇斯戰役, 繼業者, Wars of the Diadochi, Hellenistic kingdoms, Battle of Ipsus]
civilization: [古希臘（馬其頓）, 托勒密埃及]
track: west
time:
  start: -323
  end: -30
  precision: exact
  src: [s1, s2]
summary_line: 大事｜宮廷／政治中心｜巴比倫、亞歷山卓、安提阿｜繼業者戰爭與希臘化王國（前323–前30年）
summary_card: true
place:
  primary_field: 宮廷／政治中心
  secondary_fields: [戰場, 思想場域]
  locations:
    - { name_ancient: 巴比倫, name_modern: 希拉附近（伊拉克）, lat: 32.5364, lng: 44.4208, precision: schematic, role: 前323年亞歷山大死於此，部將在此第一次瓜分帝國, src: [s4, s1] }
    - { name_ancient: 伊普蘇斯, name_modern: 阿菲永卡拉希薩爾附近（土耳其）, lat: 38.7, lng: 30.75, precision: disputed, role: 前301年決定性戰役，安提柯陣亡（位置為示意）, src: [s1] }
    - { name_ancient: 亞歷山卓, name_modern: 亞歷山卓（埃及）, lat: 31.2001, lng: 29.9187, precision: schematic, role: 托勒密王國首都，圖書館與學術中心, src: [s2] }
  scale: area
structure_tags: [精英內鬥, 聯盟破裂, 技術擴散, 長期衰退]
topics: [內戰, 帝國的衰亡, 首都與都城]
links: [event-alexander-campaign, event-macedon-rise, event-maurya-empire, war-actium, commodity-egypt-grain]
causes:
  - { id: event-alexander-campaign, rel: 直接引發, why: 亞歷山大死時沒有穩定的繼承安排，部將爭奪帝國打了約五十年，最後分成幾個希臘化王國。, src: [s1, s3] }
  - { id: event-maurya-empire, rel: 促成, why: 塞琉古把印度西北的領土讓給孔雀王朝，換來 500 頭戰象，這批戰象幫他在伊普蘇斯打敗安提柯。, src: ["event-maurya-empire:s1"] }
effects:
  - { id: war-actium, rel: 背景, why: 最後一個希臘化王國托勒密埃及的女王克麗奧佩脫拉與安東尼結盟，亞克興戰敗後王國被羅馬併吞，希臘化時代結束。, src: [s2, "war-actium:s1"] }
  - { id: commodity-egypt-grain, rel: 背景, why: 托勒密王朝治理下的埃及是富庶的糧倉，前30年被羅馬接收，這些小麥才轉而大量運往羅馬。, src: [s2, "commodity-egypt-grain:s1"] }
counterparts:
  - { id: war-chu-han, note: "相似：一個靠征戰建立的大帝國在創建者死後很快瓦解，手握兵權的將領互相爭奪。不同：楚漢相爭四年就由劉邦重新統一；亞歷山大的部將打了約五十年，帝國從此分成幾個王國，再也沒有重新統一。", src: [s1] }
sources:
  - { id: s1, title: "Wars of the Diadochi — Wikipedia", url: "https://en.wikipedia.org/wiki/Wars_of_the_Diadochi", accessed: 2026-11-02, tier: 百科 }
  - { id: s2, title: "Hellenistic period — Wikipedia", url: "https://en.wikipedia.org/wiki/Hellenistic_period", accessed: 2026-11-02, tier: 百科 }
  - { id: s3, title: "Diodorus Siculus, Library of History 18.1（Loeb 英譯，LacusCurtius, University of Chicago）", url: "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Diodorus_Siculus/18A*.html", accessed: 2026-11-02, tier: 一手 }
  - { id: s4, title: "Donald L. Wasson, Death of Alexander the Great — World History Encyclopedia (2024)", url: "https://www.worldhistory.org/article/2366/death-of-alexander-the-great/", accessed: 2026-11-02, tier: 通論 }
importance: 2
learn:
  histories: [希臘羅馬史]
  why_care: 亞歷山大一死，大帝國就被部將分掉；但希臘語和希臘文化卻因此在埃及到印度留了三百年。
  story: |
    前 323 年 6 月，亞歷山大在巴比倫病死，年僅 32 歲，沒有明確的繼承人。[s4][s1] 據說臨終時有人問他把王國留給誰，他說：「給最優秀的人；我預見朋友們會打一場大仗，當作我的葬禮競賽。」[s3] 果然，他的部將們（「繼業者」）先瓜分各省，接著互相打了約五十年（前 322–前 272 年）。[s1] 前 301 年的伊普蘇斯戰役，塞琉古和利西馬科斯聯手打敗並殺死安提柯；前 281 年，塞琉古又在庫魯佩狄翁殺了利西馬科斯，不久自己也遇刺。[s1] 塵埃落定後，托勒密家族統治埃及、塞琉古家族統治亞洲、安提柯家族統治馬其頓與希臘。[s1] 這些王國都由說希臘語的王室統治，希臘語成為通用語，亞歷山卓成為學術中心。[s2] 前 30 年，最後一個希臘化王國托勒密埃及被羅馬併吞。[s2]
  key_terms:
    - { term: 繼業者（Diadochi）, plain: 希臘文「繼承者」，指亞歷山大死後瓜分帝國的那群部將。, example: 像老闆突然過世、沒指定接班人，幾位副總各自帶走一部分公司。 }
    - { term: 希臘化, plain: 希臘語言、城市和文化擴散到埃及、西亞到印度西北，與當地文化混合。, example: 像日本動漫流行到各國後，各地又發展出自己的二創。 }
    - { term: 通用語（Koine）, plain: 希臘化時代各地共同使用的希臘語，以雅典的阿提卡方言混合愛奧尼亞方言而成。, example: 像今天不同國家的人開會都用英語溝通。 }
  primary_source:
    - { text: "To the best man; for I foresee that a great combat of my friends will be my funeral games.（給最優秀的人；我預見朋友們的一場大戰，將是我的葬禮競賽。）", from: 狄奧多羅斯《歷史叢書》18.1.4，亞歷山大臨終之言（Loeb 英譯，中文為本站摘譯）, src: s3 }
  historiography: |
    **希臘化時代從哪裡算到哪裡？** 「希臘化」這個詞是 19 世紀德國史家德羅伊森創的。[s2] 一般以前 323 年亞歷山大之死開始、前 31/30 年亞克興之戰與托勒密埃及滅亡結束；但也有學者主張以前 146 年羅馬征服希臘本土為終點，甚至延到西元 330 年。[s2]
    **一個時代還是一堆現象？** 有學者（如 Peter Green）提醒，「希臘化」把許多很不一樣的地區和現象綁在同一個標籤下，不一定是一個整體。[s2] 至於亞歷山大的臨終遺言，那是後世史家的記載，是否真說過無從證實，但它很能說明部將們後來的作為。[s3][s1]
  misconceptions:
    - 「希臘化」不是希臘人把當地文化取代掉：在巴克特里亞與印度西北，希臘與當地傳統混合出新的文化，例如希臘式佛教藝術。[s2]
crosscheck:
  date: 2026-11-02
  by: 獨立查核 agent（未參與寫作）
  result: 通過
  notes: 已打開維基 Wars of the Diadochi、Hellenistic period、狄奧多羅斯 18.1 核對。維基寫戰爭為前322–前272年、約五十年，已把三處「約四十年」改為五十年；通用語定義改依維基（阿提卡＋愛奧尼亞方言）；亞克興效果加引亞克興卡 s1；亞歷山大死於巴比倫、32 歲改引新增的 WHE（s4）。伊普蘇斯座標為示意；戰象一說靠孔雀王朝卡的維基。
verification: 交叉確認
lens_status: 無直接論述
---

## C1 背景

亞歷山大在十多年內征服了從希臘到印度西北的大片土地，前 323 年 6 月卻在巴比倫突然病死，沒有清楚的繼承人。[s4][s1] 帝國靠的是他個人的威望和他手下將領指揮的軍隊。[s1][s3]

## C2 經過

- 前 323 年：部將在巴比倫分配各省，托勒密拿到埃及，安提柯拿到弗里吉亞等地。[s1]
- 約前 321 年：特里帕拉迪蘇斯協議重新分配，安提帕特成為攝政。[s1]
- 前 301 年：伊普蘇斯戰役，塞琉古及時趕到救援利西馬科斯，擊敗並殺死安提柯，兩人瓜分安提柯在亞洲的領土。[s1]
- 前 281 年：塞琉古在庫魯佩狄翁擊敗並殺死利西馬科斯，隨後被托勒密·克勞諾斯刺殺，第一代繼業者全部死去。[s1]
- 約前 272 年：皮洛士死於阿戈斯，安提柯·貢納塔斯控制馬其頓與大部分希臘，三大王國的格局底定。[s1]

## C6 直接結果

帝國分裂成托勒密埃及、塞琉古王國（亞洲）、安提柯馬其頓等王國。[s1] 這些王國由講希臘語的王室統治，希臘語的「通用語」成為東地中海與中東的共同語言；亞歷山卓在托勒密王室支持下成為文學與學術中心。[s2] 後來羅馬在前 168 年打敗馬其頓、前 146 年征服希臘本土，前 30 年併吞托勒密埃及，希臘化王國時代結束。[s2]
