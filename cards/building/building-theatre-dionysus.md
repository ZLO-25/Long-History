---
id: building-theatre-dionysus
type: building
name: 酒神劇場
aliases: [戴奧尼索斯劇場, Theatre of Dionysus, 狄俄尼索斯劇場, Theater of Dionysus Eleuthereus, 酒神剧场]
civilization: [古希臘, 古羅馬]
track: west
time:
  start: -550
  end: -500
  precision: approx
  src: [s1, s2]
summary_line: 建築｜思想場域｜雅典衛城南坡｜酒神劇場
place:
  primary_field: 思想場域
  secondary_fields: [城市／都會]
  locations:
    - { name_ancient: 酒神劇場, name_modern: 雅典（希臘）, lat: 37.97043, lng: 23.72774, pleiades_id: "649966335", precision: exact, role: 衛城南坡 }
  scale: point
structure_tags: [宗教／意識形態動員, 公共工程支出, 慢變結構]
topics: [古代建築, 宗教]
links: [building-acropolis, event-cleisthenes-reform, event-death-of-socrates, social-athenian-democracy]
causes:
  - { id: event-cleisthenes-reform, rel: 促成, why: 有說法認為克里斯提尼改革時重新組織了城市酒神節，在這裡演出的戲劇因此成為雅典公民共同參與的節慶。, src: [s1], disputed: true }
effects:
  - { id: event-death-of-socrates, rel: 背景, why: 有學者認為，在劇場上演的喜劇《雲》把蘇格拉底演成詭辯家，讓雅典人把他和「帶壞年輕人」連在一起。, src: [event-death-of-socrates:s1, event-death-of-socrates:s2, s3], disputed: true }
counterparts: "無適當對照：中國卡沒有公民集體觀賞戲劇、同時是城邦公共生活的場所；春秋戰國到漢代的史料與卡片都沒有可比的建築。"
sources:
  - { id: s1, title: "Theatre of Dionysus — Wikipedia", url: "https://en.wikipedia.org/wiki/Theatre_of_Dionysus", accessed: 2026-10-24, tier: 百科 }
  - { id: s2, title: "Theatre of Dionysus — History Hit", url: "https://www.historyhit.com/locations/theatre-of-dionysus/", accessed: 2026-10-24, tier: 通論 }
  - { id: s3, title: "柏拉圖《申辯篇》（Plato, Apology），Jowett 英譯（公有領域）— MIT Internet Classics Archive", url: "https://classics.mit.edu/Plato/apology.html", accessed: 2026-11-12, tier: 一手 }
  - { id: s4, title: "亞里斯多德《詩學》第 4 章（Aristotle, Poetics），Butcher 英譯（公有領域）— MIT Internet Classics Archive", url: "https://classics.mit.edu/Aristotle/poetics.1.1.html", accessed: 2026-11-12, tier: 一手 }
importance: 2
learn:
  histories: [希臘羅馬史]
  perspectives:
    - { history: 希臘羅馬史, text: "從希臘羅馬史看，劇場是雅典公民一起看戲、也一起被戲裡的話刺痛的地方，宗教、藝術與政治在這裡重疊。[s1][s3]" }
  why_care: 今天的 theatre（劇場）、tragedy（悲劇）、comedy（喜劇）都從這裡來；而雅典人把最尖銳的政治諷刺放在神的節慶上演，連蘇格拉底都被喜劇點名。[s1][s3][s4]
  story: |
    酒神劇場在雅典衛城南坡，原本是祭祀酒神的地方，也是每年城市酒神節（大酒神節）比戲劇的場地。[s1] 最早的表演場地大約在前 6 世紀中後期出現，一開始只是一塊圓形平台，還沒有正式的石頭座位。[s1] 亞里斯多德說，悲劇和喜劇都從即興的酒神頌歌和生殖祭歌發展出來，後來才有演員、對白。[s4] 埃斯庫羅斯、索福克勒斯、歐里庇得斯與阿里斯托芬的作品都在這裡上演。[s1][s2] 前 4 世紀中後期，政治家萊克格斯主持把劇場改成石造。[s1][s2] 蘇格拉底受審時，也提到法庭上的人早就看過阿里斯托芬喜劇裡那個「在空中行走」的蘇格拉底。[s3]
  key_terms:
    - { term: 城市酒神節（大酒神節）, plain: 雅典每年為酒神舉行的節慶，最重要的活動是戲劇競賽。, example: 像學校的校慶，最大的活動是全校的戲劇比賽。 }
    - { term: 悲劇與喜劇, plain: 古希臘的兩大戲劇類型，都從宗教歌舞發展而來；喜劇常諷刺當時的人物與政治。, example: 像一個正經嚴肅，一個愛開玩笑、連校長都敢挖苦。 }
    - { term: 表演區（orchestra）, plain: 劇場中央的圓形空地，合唱隊和演員在此表演；觀眾坐在周圍的階梯座位。, example: 像體育館的比賽場地，觀眾席圍在四周。 }
    - { term: 榮譽席（proedria）, plain: 劇場前排為重要官員與祭司保留的座位。, example: 像演唱會的貴賓席。 }
  primary_source:
    - text: "Tragedy—as also Comedy—was at first mere improvisation.（悲劇和喜劇起初都只是即興表演。）"
      from: 亞里斯多德《詩學》第 4 章（Butcher 英譯；中文為本站摘譯）
      src: s4
  historiography: |
    **酒神節什麼時候開始、誰辦的？** 維基百科說城市酒神節「始於庇西特拉圖家族統治時期」，並在克里斯提尼改革時重新組織；但也有學者（W. R. Connor）認為是克里斯提尼改革時才創設，因此這個因果仍有爭議。[s1]
    **劇場能坐多少人？** 維基百科正文說最大可容納 2.5 萬人，注釋引皮卡德—劍橋的研究，認為萊克格斯改建後約 1.4 萬到 1.7 萬人，也有人根據柏拉圖《饗宴》的一段話推想 3 萬人；History Hit 採約 1.7 萬。[s1][s2]
    **《雲》害死了蘇格拉底嗎？** 柏拉圖《申辯篇》裡的蘇格拉底說，法庭上的人已在阿里斯托芬的喜劇裡看過他「在空中行走」；但這是否真的影響審判，學者看法不同。[s3] 本站在蘇格拉底之死一卡也標示為有爭議。
  misconceptions:
    - 「希臘劇場只是娛樂。」它位在酒神的聖域，戲劇競賽是宗教節慶的一部分。[s1]
    - 「劇場一開始就是石頭的。」早期沒有石座，演出用的是木造看台；石造劇場是前 4 世紀中後期萊克格斯時才完成。[s1][s2]
  pop_culture:
    - { claim: "常見說法：希臘劇場一建好就是大理石的壯觀劇院。", fact: "最早的表演場地只有圓形平台，沒有石座；今天看到的大理石護欄與地磚，是羅馬尼祿時期以後的改動。[s1][s2]", src: [s1, s2] }
verification: 交叉確認
lens_status: 無直接論述
---

## D1 功能與象徵

劇場位於雅典衛城南坡，原屬於酒神戴奧尼索斯的聖域，是城市酒神節（大酒神節）的演出場地；埃斯庫羅斯、索福克勒斯、歐里庇得斯與阿里斯托芬的作品都在這裡演出。[s1][s2] 戲劇在這裡同時是宗教節慶、公民教育與公共討論的場域。[s1] 亞里斯多德說悲劇和喜劇都起於即興表演，埃斯庫羅斯加入第二位演員，索福克勒斯加到三位。[s4] 在柏拉圖《申辯篇》裡，蘇格拉底提到法庭上的人在阿里斯托芬的喜劇中看過一個「在空中行走」的蘇格拉底。[s3]

## D2 建造者與資金

最早的表演場地可追溯到西元前 6 世紀中後期，酒神節在庇西特拉圖家族時期開始，並在克里斯提尼改革時重新組織（W. R. Connor 則主張酒神節是在克里斯提尼改革時才創設）。[s1] 最早的演出可能在市集（Agora）的木造看台，看台倒塌後，演出約在西元前 499–496 年之間移到衛城聖域。[s1] 西元前 4 世紀中後期，政治家萊克格斯主持把劇場改建為石造結構。[s1][s2] 早期資金與工程細節來源不足。

## D3 技術與材料

由木造看台演變為依山坡而建的石造看台；劇場前排有約 67 個石椅作榮譽席，上面刻著祭司或官員的名字，刻字年代晚於西元前 4 世紀。[s1] 羅馬尼祿時期整修，縮小圓形表演區並鋪上大理石，西元 61 年前後加裝大理石護欄。[s1][s2]

## D4 規模與數據

估計：萊克格斯擴建後容量說法不一，有「最多 2.5 萬人」，也有學者估計 1.4 萬–1.7 萬人；History Hit 採約 1.7 萬人。[s1][s2]

## D5 維護與後世命運

一直使用到羅馬時期；西元 5 世紀後期以後荒廢，部分被改作教堂與採石場。[s1] 1776 年 R. Chandler 正確辨認位置，1861 年起正式發掘；今日下層座位保存完整，可供參觀但未完全修復。[s1][s2]

## D6 雙軌解讀

### 李彔

無直接論述：目前查到的公開演講與文章，沒有李彔專門談酒神劇場或希臘戲劇的內容。

### 哈拉瑞

無直接論述：目前查到的公開摘要與書評，沒有哈拉瑞專門談酒神劇場的內容。

## D7 今日對照鉤子

「公共節慶＋大型公共空間」成為城邦凝聚認同、也讓批評性作品（如喜劇諷刺時政）公開上演的結構。[s1]

## D8 不可類比的差異

古代劇場演出與宗教祭典綁在一起，觀眾資格與今日商業娛樂不同；容量數字只是估計。[s1][s2]
