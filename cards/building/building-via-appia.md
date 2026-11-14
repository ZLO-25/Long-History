---
id: building-via-appia
type: building
name: 亞壁古道與羅馬道路網
aliases: [亞壁古道, 條條大路通羅馬, Appian Way, Via Appia, 羅馬大道, Roman roads, 阿庇亞大道, 羅馬道路網, Regina Viarum, 亚壁古道]
civilization: [古羅馬]
track: west
time:
  start: -312
  end: -264
  precision: approx
  src: [s1, s3]
summary_line: 建築｜商路｜羅馬至布林迪西｜亞壁古道與羅馬道路網
place:
  primary_field: 商路
  secondary_fields: [戰場]
  locations:
    - { name_ancient: 羅馬, name_modern: 羅馬（義大利）, lat: 41.88997, lng: 12.49125, pleiades_id: "423025", precision: exact, role: 起點 }
    - { name_ancient: 卡普阿, name_modern: 聖瑪麗亞卡普阿韋泰雷（義大利）, lat: 41.08609, lng: 14.2502, pleiades_id: "432754", precision: exact, role: 前 312 年第一段終點 }
    - { name_ancient: 貝內文圖姆, name_modern: 貝內文托（義大利）, lat: 41.13043, lng: 14.78116, pleiades_id: "432721", precision: exact, role: 延伸段，圖拉真大道由此分出 }
    - { name_ancient: 布林迪西姆, name_modern: 布林迪西（義大利）, lat: 40.63866, lng: 17.94291, pleiades_id: "442509", precision: exact, role: 終點港口 }
  scale: line
routes: [road-via-appia, road-via-egnatia, road-via-flaminia, road-via-aurelia, road-via-domitia, road-via-augusta]
structure_tags: [基礎建設網絡, 公共工程支出, 補給線過長, 快速擴張]
topics: [道路與鐵路]
links: [event-twelve-tables, building-roman-aqueducts, commodity-roman-concrete, event-rubicon, social-roman-slavery-spartacus]
causes:
  - { id: war-samnite, rel: 促成, why: 羅馬和薩莫奈人作戰，需要把軍隊和補給快速送到卡普阿，於是修了一條跨越彭甸沼澤的軍用大道。, src: [s1] }
counterparts:
  - { id: building-qin-straight-road, note: "相似：國家為讓軍隊快速移動而修的大道，同時成為長期交通幹線。不同：阿庇亞大道向南連接新征服的義大利城市；秦直道向北直通對付匈奴的邊疆。", src: [s1, s6] }
  - { id: building-lingqu, note: "相似：為了把兵員與糧食送到新征服地區而修的交通工程。不同：阿庇亞大道是陸路；靈渠是只有 36.4 公里、連通長江與珠江兩大水系的運河。", src: [s1, s7] }
sources:
  - { id: s1, title: "Appian Way — Wikipedia", url: "https://en.wikipedia.org/wiki/Appian_Way", accessed: 2026-10-24, tier: 百科 }
  - { id: s2, title: "Roman roads — Wikipedia", url: "https://en.wikipedia.org/wiki/Roman_roads", accessed: 2026-10-24, tier: 百科 }
  - { id: s3, title: "Via Appia. Regina Viarum — worldheritagesite.org（UNESCO 2024）", url: "https://www.worldheritagesite.org/list/id/1708", accessed: 2026-10-24, tier: 通論 }
  - { id: s4, title: "de Soto et al., Itiner-e: A high-resolution dataset of roads of the Roman Empire — Scientific Data (2025)", url: "https://www.nature.com/articles/s41597-025-06140-z", accessed: 2026-10-24, tier: 學術 }
  - { id: s6, title: "Chi Dao and Zhi Dao — the Oldest Express Way（陝西省人民政府英文網，2017-04-27）", url: "https://en.shaanxi.gov.cn/as/hac/ch/201704/t20170427_1595074.html", accessed: 2026-10-25, tier: 通論 }
  - { id: s7, title: "Lingqu — Wikipedia", url: "https://en.wikipedia.org/wiki/Lingqu", accessed: 2026-10-25, tier: 百科 }
  - { id: s8, title: "李維《羅馬史》9.29（Livy, Ab urbe condita），Perseus 英譯", url: "https://fgh.perseids.org/read/latinLit/phi0914/phi001/perseus-eng3/9.29.1-9.29.6", accessed: 2026-11-12, tier: 一手 }
  - { id: s9, title: "阿庇安《羅馬內戰》1.120（Appian, Civil Wars），John Carter 英譯 — Livius.org", url: "https://livius.org/sources/content/appian/appian-spartacus", accessed: 2026-11-12, tier: 一手 }
  - { id: s10, title: "All roads lead to Rome — Wikipedia", url: "https://en.wikipedia.org/wiki/All_roads_lead_to_Rome", accessed: 2026-11-12, tier: 百科 }
learn:
  histories: [希臘羅馬史]
  why_care: 「條條大路通羅馬」不是羅馬人的話，但羅馬人真的把路修成一張網；這條路最早是為打仗而修，後來變成整個義大利的動脈。[s1][s2][s10]
  story: |
    前 312 年，羅馬正和薩莫奈人打仗。監察官阿庇烏斯·克勞狄烏斯下令修一條路，讓軍隊和補給能跨過彭甸沼澤，一路送到南邊的卡普阿。[s1] 李維把這條路和他同年修的水道並列為他的代表工程。[s8] 路面用密接的玄武岩石板，中間高、兩側低，水才好排。[s2][s3] 後來路往南延伸到布林迪西港，詩人斯塔提烏斯稱它「長路之后」。[s1][s3] 前 71 年，斯巴達克斯起義失敗，阿庇安說約 6,000 名俘虜沿著羅馬到卡普阿的路被釘上十字架，維基百科把這條路認為是亞壁古道。[s1][s9] 今天人們愛說「條條大路通羅馬」，但這句話最早的紀錄是 1175 年的中世紀拉丁文。[s10]
  key_terms:
    - { term: 監察官（censor）, plain: 羅馬負責調查公民戶口與財產、也主持公共工程發包的高級官員；亞壁古道由監察官阿庇烏斯下令興建。, example: 像同時管戶政和公共工程發包的官員。 }
    - { term: 十字儀（groma）, plain: 羅馬測量員用來定出直線和直角的工具。, example: 像施工時拉直線用的雷射水平儀的古代版。 }
    - { term: 堤道, plain: 在沼澤或低地上墊高築成的路，讓人車不用涉水。, example: 像在水田中間築的田埂路。 }
    - { term: 金色里程碑（Milliarium Aureum）, plain: 立在羅馬廣場、作為全國道路量距離起點的紀念碑；有人把「條條大路通羅馬」和它連在一起。, example: 像臺北車站前的里程原點，所有距離都從這裡算。 }
  primary_source:
    - text: "crucified all the way along the road from Rome to Capua（沿著從羅馬到卡普阿的路被一路釘上十字架）"
      from: 阿庇安《羅馬內戰》1.120（John Carter 英譯，Livius.org；中文為本站摘譯）
      src: s9
    - text: 李維把前 312 年監察官阿庇烏斯的公共工程記為以他命名的一條路和一條水道，並說他獨自完成這些工程。（轉述大意，不是逐字翻譯）
      from: 李維《羅馬史》9.29（Perseus 英譯）
      src: s8
  historiography: |
    **這條路是為了什麼？** 最初是軍用，讓軍隊和補給快速南下。[s1] 但後來硬幣窖藏的研究顯示，道路也讓遠方地區連成更緊密的經濟空間。[s2]
    **羅馬道路網到底有多大？** 傳統說法是從羅馬放射出 29 條軍用大道，總長超過 40 萬公里；2025 年的 Itiner-e 資料集重建出約 29.9 萬公里，其中只有約 2.7% 屬「確定」，近 90% 屬「推測」。[s2][s4]
  misconceptions:
    - 「羅馬道路全都是石頭鋪的。」40 萬公里的道路網中，石鋪路面只占逾 8 萬公里。[s2]
    - 「有了大路，貨物都走陸路。」馬車一天只走約 40–50 公里，大宗貨物仍以水運為主。[s2]
  pop_culture:
    - { claim: "常見說法：「條條大路通羅馬」是古羅馬人的諺語。", fact: "目前已知最早的紀錄是 1175 年阿蘭·德·利爾（Alain de Lille）的中世紀拉丁文句子，意思是「千條路永遠把人帶向羅馬」；英文版最早見於 1391 年喬叟。它背後的意象與羅馬廣場的金色里程碑有關，但這句話不是古羅馬人說的。[s10]", src: [s10] }
    - { claim: "常見印象：羅馬大路是為了做生意、運貨而修的。", fact: "亞壁古道最初是軍用道路，為了在薩莫奈戰爭中把軍隊和補給送往卡普阿；商業與經濟整合是後來的結果，而且大宗貨物仍以水運為主。[s1][s2]", src: [s1, s2] }
verification: 交叉確認
lens_status: 無直接論述
---

## D1 功能與象徵

亞壁古道最初是軍用道路，讓羅馬能在薩莫奈戰爭期間跨越彭甸沼澤，把軍隊與補給送往卡普阿。[s1] 詩人斯塔提烏斯稱它為「長路之后」（regina viarum）。[s1][s3] 前 71 年，斯巴達克斯起義失敗後約 6,000 名奴隸被釘死在羅馬到卡普阿沿線，道路也成了展示懲罰的舞台。[s1] 阿庇安只寫「從羅馬到卡普阿的路旁」，沒有點名這條路；把它指為亞壁古道是維基百科的整理。[s9][s1]（詳見「羅馬奴隸制與斯巴達克斯」卡）

## D2 建造者與資金

前 312 年由監察官阿庇烏斯．克勞狄烏斯．凱庫斯開始興建；公共道路由國家維護，常以興建的監察官命名。[s1][s2] 後來奧古斯都把道路管理集中化，設立常設的道路管理官。[s2] 具體造價與資金來源，來源不足。

## D3 技術與材料

測量員以測桿和十字儀（groma）定出直線；先挖溝，再填入碎石、礫石與石灰混凝土等層次，最上層鋪石並做成中間高、兩側低以利排水。[s1][s2] UNESCO 資料描述亞壁古道以密接的玄武岩石板鋪面。[s3] 遇到山丘傾向開鑿通過，並建造隧道、橋梁與跨越沼澤的堤道。[s2]

## D4 規模與數據

- 羅馬到卡普阿約 132 羅馬里（約 195 公里）；全長約 540 公里，據維基百科在前 264 年前已延伸到布林迪西。[s1]
- 整個帝國的道路網：從羅馬放射出 29 條軍用大道，總長超過 40 萬公里，其中逾 8 萬公里是石鋪路面。[s2]
- 2025 年的 Itiner-e 資料集重建出約 29.9 萬公里道路（約 150 年帝國最大範圍），幾乎是過去資料集的兩倍；但其中只有約 2.7% 屬「確定」，近 90% 屬「推測」。[s4]

## D5 維護與後世命運

圖拉真修築由貝內文圖姆通往布林迪西、繞開塔倫圖姆的分支「圖拉真大道」。[s1] 許多羅馬道路的路線至今仍是現代道路。[s2] 2024 年以「Via Appia. Regina Viarum」列入世界遺產。[s1][s3]

## D6 雙軌解讀

### 李彔

無直接論述。

### 哈拉瑞

無直接論述：目前查到的公開摘要與書評，沒有哈拉瑞專門談羅馬道路的內容。

## D7 今日對照鉤子

「先為軍事需要修建、後來變成經濟整合骨幹的基礎建設」；硬幣窖藏研究顯示道路讓遠方地區更緊密地連成一個經濟空間。[s2]

## D8 不可類比的差異

羅馬時代的陸路速度很慢：馬車每天約 40–50 公里、步行約 20–25 公里，大宗貨物仍以水運為主；今日的道路網與物流速度不能直接比較。[s2] 道路網的重建也多屬推測。[s4]
