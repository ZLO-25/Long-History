---
id: war-samnite
type: war
name: 薩莫奈戰爭（前343–前290年）
aliases: [薩莫奈戰爭, 卡夫丁峽谷之戰, 卡夫丁軛門, Samnite Wars, 薩謨奈戰爭, 薩姆尼特戰爭, 森提努姆戰役, Battle of the Caudine Forks, Caudine Forks, Samnites, Battle of Sentinum]
civilization: [古羅馬]
track: west
time:
  start: -343
  end: -290
  precision: exact
  src: [s1]
summary_line: 戰爭｜戰場｜坎帕尼亞與薩莫奈山區（義大利）｜薩莫奈戰爭（前343–前290年）
summary_card: true
place:
  primary_field: 戰場
  secondary_fields: [商路]
  locations:
    - { name_ancient: 卡夫丁峽谷, name_modern: 阿里恩佐與阿爾帕亞之間（義大利坎帕尼亞）, lat: 41.0333, lng: 14.5333, precision: disputed, role: 前321年羅馬軍被困、被迫從「軛門」下走過（座標為示意）, src: [s3] }
    - { name_ancient: 卡普阿, name_modern: 聖瑪利亞卡普阿韋泰雷（義大利）, lat: 41.0833, lng: 14.2500, precision: schematic, role: 坎帕尼亞的大城，第一次戰爭因它向羅馬求援而起, src: [s1] }
    - { name_ancient: 森提努姆, name_modern: 薩索費拉托附近（義大利馬爾凱）, lat: 43.4333, lng: 12.8500, precision: schematic, role: 前295年羅馬擊敗薩莫奈、伊特魯里亞、翁布里亞與高盧聯軍, src: [s1] }
  scale: area
structure_tags: [地形險阻, 快速擴張, 基礎建設網絡, 霸權挑戰]
topics: [對外擴張, 道路與鐵路, 統一與中央集權]
links: [building-via-appia, war-first-punic, event-conflict-of-orders, war-changping]
effects:
  - { id: building-via-appia, rel: 促成, why: 羅馬和薩莫奈人作戰，需要把軍隊和補給快速送到坎帕尼亞，前312年起修了通往卡普阿的亞壁古道。, src: [s2, "building-via-appia:s1"] }
  - { id: war-first-punic, rel: 背景, why: 打敗薩莫奈人後，羅馬控制了義大利中南部，前272年已征服阿諾河以南的半島，勢力直接面對西西里與迦太基。, src: [s1, "war-first-punic:s1"] }
counterparts:
  - { id: war-changping, note: "相似：一個新興強權在山地與另一個強大對手長期反覆作戰，最後取得半島（中原）的主導權；兩場戰爭都有整支軍隊被困在山谷的戲劇性場面。不同：卡夫丁峽谷是後來的勝方（羅馬）被困、投降受辱後被放回，羅馬最後仍贏得戰爭；長平則是被圍的趙軍全軍覆沒，勝負一戰底定。", src: [s1, s3] }
sources:
  - { id: s1, title: "Samnite Wars — Wikipedia", url: "https://en.wikipedia.org/wiki/Samnite_Wars", accessed: 2026-11-02, tier: 百科 }
  - { id: s2, title: "Diodorus Siculus, Library of History 20.19–44（Loeb 英譯，LacusCurtius, University of Chicago）", url: "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Diodorus_Siculus/20B*.html", accessed: 2026-11-02, tier: 一手 }
  - { id: s3, title: "Battle of the Caudine Forks — Wikipedia", url: "https://en.wikipedia.org/wiki/Battle_of_the_Caudine_Forks", accessed: 2026-11-02, tier: 百科 }
importance: 1
learn:
  histories: [希臘羅馬史]
  why_care: 羅馬不是一開始就無敵：它曾整支軍隊被困在山谷、低頭從「軛門」下走過，花了五十年才打下義大利中南部。
  story: |
    前 4 世紀中，羅馬還只是義大利中部的一個強國；南邊的山區住著好戰的薩莫奈人。[s1] 前 343 年，富庶的坎帕尼亞城市卡普阿被薩莫奈人威脅，向羅馬求援，雙方第一次開戰。[s1] 第二次戰爭中，前 321 年，薩莫奈將領蓋烏斯·蓬提烏斯派人假傳消息，把羅馬軍誘進卡夫丁峽谷，堵住兩頭。[s3] 羅馬軍被困、只能接受條件投降，被迫從「軛門」下走過，這是極大的羞辱。[s3] 羅馬沒有放棄，在弗雷格萊、盧切里亞等要地建殖民城鎮；[s1] 監察官阿庇烏斯·克勞狄烏斯還用石塊鋪了通往南方的亞壁古道。[s2] 前 295 年，羅馬在森提努姆打敗薩莫奈與伊特魯里亞、高盧等聯軍；前 290 年，薩莫奈人被迫成為羅馬的「盟友」。[s1]
  key_terms:
    - { term: 軛門, plain: 讓戰敗者彎腰從底下走過的低矮門架，表示像牛一樣被套上軛、完全屈服。, example: 像比賽輸的一方要從贏家搭成的手臂拱門下鑽過去。 }
    - { term: 殖民城鎮（colonia）, plain: 羅馬在新占領的要地派公民移居建立的城鎮，兼當軍事據點。, example: 像連鎖店在新商圈先開一家旗艦店，站穩腳步。 }
  primary_source:
    - { text: "paved with solid stone the greater part of the Appian Way（用堅固的石塊鋪成亞壁古道的大部分路段）", from: 狄奧多羅斯《歷史叢書》20.36，記監察官阿庇烏斯·克勞狄烏斯的工程（Loeb 英譯，中文為本站摘譯）, src: s2 }
  historiography: |
    **李維的故事可信嗎？** 第一次薩莫奈戰爭只有李維留下連續記載，狄奧多羅斯完全沒提；有學者認為卡普阿向羅馬「投降求援」是後人編的，但康乃爾（Cornell）、奧克利（Oakley）等人認為可信，多數現代史家接受這場戰爭確實發生。[s1] 李維寫的戰鬥細節與敵軍死傷數字，多半被認為有重建或誇大。[s1]
    **卡夫丁峽谷有那麼險嗎？** 霍斯福爾（Horsfall）指出實地的峽谷沒有李維寫的那麼窄陡，李維的地理描寫可能借用了亞歷山大東征的故事；李維自己對羅馬是否遵守和約，前後說法也互相矛盾。[s3]
  misconceptions:
    - 薩莫奈戰爭不是三場短期戰役而已：前後跨越約五十年，中間有長期休戰，羅馬也打過敗仗。[s1][s3]
crosscheck:
  date: 2026-11-02
  by: 獨立查核 agent（未參與寫作）
  result: 通過
  notes: 已打開維基 Samnite Wars、Caudine Forks、狄奧多羅斯 20.36 核對。來源沒寫軛門用長矛搭、羅馬軍「餓到」投降、維努西亞「建殖民城鎮」、皮洛士戰爭年代，已改寫或刪除。狄奧多羅斯 20.36 沒把亞壁古道和薩莫奈戰爭連起來，此因果靠亞壁古道卡 s1（維基）。座標為示意；只有兩個網站。
verification: 交叉確認
lens_status: 無直接論述
---

## A2 起因：結構與導火線

**結構**：羅馬與薩莫奈人都想控制富庶的坎帕尼亞平原；羅馬在前 328 年於弗雷格萊建殖民城鎮，加深雙方對坎帕尼亞的爭奪。[s1]

**導火線**：第一次戰爭（前 343–前 341 年）是薩莫奈人攻打西迪奇尼人、再威脅卡普阿，坎帕尼亞人向羅馬求援；第二次（前 326–前 304 年）起於弗雷格萊殖民與那不勒斯的糾紛；第三次（前 298–前 290 年）起於羅馬與受薩莫奈威脅的盧卡尼亞人結盟。[s1]

## A8 結果

前 321 年羅馬軍在卡夫丁峽谷被困投降、從軛門下走過。[s3] 前 304 年第二次戰爭以恢復舊約結束（條件不詳）；前 295 年羅馬在森提努姆擊敗聯軍，前 291 年奪下薩莫奈的大城維努西亞，戰後薩莫奈人被迫成為羅馬的盟友，羅馬控制了義大利中部大部分與南部一部分。[s1]

## A9 長期影響

羅馬在弗雷格萊、盧切里亞等地建殖民城鎮，把征服地區釘牢；[s1] 同一時期，監察官阿庇烏斯·克勞狄烏斯鋪設了通往南方的亞壁古道。[s2] 羅馬控制義大利中南部後，之後又打了皮洛士戰爭。[s1] 但這種「被迫結盟」並不穩固：第二次布匿戰爭時，卡普阿就倒向了迦太基。[s1]
