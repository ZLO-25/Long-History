---
id: event-delian-league
type: event
name: 提洛同盟（前478–前404年）
aliases: [提洛同盟, 雅典帝國, Delian League, 第洛斯同盟, 迪洛斯同盟, Athenian Empire, 同盟金庫遷往雅典, 提洛同盟金庫遷往雅典, Athenian tribute lists]
civilization: [古希臘]
track: west
time:
  start: -478
  end: -404
  precision: exact
  src: [s1, s3]
summary_line: 大事｜宮廷／政治中心｜提洛島與雅典（希臘）｜提洛同盟（前478–前404年）
summary_card: true
place:
  primary_field: 宮廷／政治中心
  secondary_fields: [港口／海峽, 金融中心]
  locations:
    - { name_ancient: 提洛島, name_modern: 提洛島（希臘基克拉澤斯群島）, lat: 37.3967, lng: 25.2683, precision: schematic, role: 同盟最初的金庫與會議所在地（前478–前454年）, src: [s1, s3] }
    - { name_ancient: 雅典衛城, name_modern: 雅典（希臘）, lat: 37.9715, lng: 23.7257, precision: exact, role: 前454年起同盟金庫所在地，貢金清單刻石立於衛城, src: [s3] }
  scale: area
structure_tags: [盟主剝削盟友, 霸權挑戰, 戰爭融資, 快速擴張]
topics: [軍事同盟, 稅收, 海戰與水戰]
links: [war-greco-persian, building-acropolis, war-peloponnesian, commodity-laurion-silver, finance-athens-trapezitai]
causes:
  - { id: war-greco-persian, rel: 直接引發, why: 波斯被趕出希臘本土後，愛琴海東岸的希臘城邦仍需要艦隊防範波斯，便在前478年推雅典當盟主組成同盟。, src: [s1, s4] }
  - { id: commodity-laurion-silver, rel: 背景, why: 雅典用勞里昂銀礦收入造出的艦隊打贏薩拉米斯，戰後成為希臘最強的海軍，才有條件領導海上同盟。, src: ["commodity-laurion-silver:s2", "commodity-laurion-silver:s5"] }
effects:
  - { id: building-acropolis, rel: 促成, why: 雅典把盟邦繳的同盟金庫從提洛島搬到雅典，伯里克里斯才有大筆經費蓋帕德嫩神廟等衛城建築。, src: [s1, s2, s3] }
  - { id: war-peloponnesian, rel: 促成, why: 同盟變成雅典控制、盟邦不准退出的「帝國」，雅典勢力越來越大，斯巴達因此害怕；修昔底德認為這才是開戰的真正原因。, src: [s1, "war-peloponnesian:s8"] }
counterparts:
  - { id: war-chengpu, note: "相似：一個強國以「對抗外敵」的名義當上諸國的盟主，主持會盟。不同：春秋霸主名義上仍尊周王，盟國不必每年繳固定貢金；提洛同盟的盟邦要繳錢，金庫後來被雅典拿去用在自己城裡。", src: [s1, s4] }
sources:
  - { id: s1, title: "Delian League — Wikipedia", url: "https://en.wikipedia.org/wiki/Delian_League", accessed: 2026-11-02, tier: 百科 }
  - { id: s2, title: "Plutarch, Life of Pericles 12（Loeb 英譯，Bill Thayer 的 LacusCurtius 網站，University of Chicago）", url: "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Plutarch/Lives/Pericles*.html", accessed: 2026-11-02, tier: 一手 }
  - { id: s3, title: "IG I³ 259：Athenian tribute quota list, 454/3 BC（英譯與註解）— Attic Inscriptions Online", url: "https://www.atticinscriptions.com/inscription/IGI3/259", accessed: 2026-11-02, tier: 學術 }
  - { id: s4, title: "Mark Cartwright, Delian League — World History Encyclopedia (2016)", url: "https://www.worldhistory.org/Delian_League/", accessed: 2026-11-02, tier: 通論 }
importance: 2
learn:
  histories: [希臘羅馬史]
  why_care: 一個為了「共同防衛」成立的同盟，怎麼一步步變成盟主的錢包？這個問題到今天的國際同盟都還在問。
  story: |
    前 478 年，希臘人剛把波斯大軍趕出本土，但愛琴海東岸的希臘城邦還怕波斯捲土重來，便推海軍最強的雅典當盟主，組成同盟，金庫和會議設在提洛島。[s1][s4] 大部分盟邦選擇繳錢、不出船，第一次的貢金由雅典人阿里斯提德訂為 460 塔蘭特。[s4] 後來納克索斯、塔索斯想退出，都被雅典出兵打到投降，城牆拆掉、船被沒收。[s1] 前 454 年，雅典以「保護金庫」為理由，把金庫搬到雅典衛城，每年把貢金的六十分之一獻給雅典娜。[s1][s3] 伯里克里斯用這些錢蓋帕德嫩神廟等建築，政敵罵他把盟邦的錢拿去裝飾自己的城市。[s1][s2] 到前 5 世紀中葉，同盟已被稱為「雅典帝國」；前 404 年雅典輸掉伯羅奔尼撒戰爭，同盟就解散了。[s1]
  key_terms:
    - { term: 貢金（phoros）, plain: 盟邦每年繳給同盟金庫、用來養艦隊的錢，代替自己出船出兵。, example: 像社團成員不想輪值打掃，改繳清潔費請別人做。 }
    - { term: 希臘財務官（hellenotamiai）, plain: 由雅典人擔任、負責收同盟貢金的官員。, example: 像全班班費都交給隔壁班的總務保管。 }
    - { term: 盟主（霸權）, plain: 同盟裡帶頭、指揮大家的那個成員，希臘文叫 hegemon。, example: 像分組報告的組長，負責分工也決定錢怎麼花。 }
  primary_source:
    - { text: "it has removed the public moneys of the Hellenes from Delos into its own keeping.（雅典把希臘人的公款從提洛島搬來自己保管。）", from: 普魯塔克《伯里克里斯傳》第 12 章，伯里克里斯政敵的指控（Loeb 英譯，中文為本站摘譯）, src: s2 }
  historiography: |
    **搬金庫是為了安全，還是為了花錢？** 雅典公開的說法是，同盟的埃及遠征失敗後，金庫放在提洛島不安全，搬到雅典是為了防波斯。[s1][s4] 但普魯塔克記下當時政敵的批評：雅典把盟邦的錢拿去美化自己的城市；伯里克里斯則回答，只要雅典替盟邦擋住波斯，就不必向盟邦交代錢怎麼用。[s2]
    **同盟何時變成「帝國」？** 一般把前 5 世紀中葉視為轉折：盟邦不准退出、自主權喪失。[s1] 銘文研究則提供具體證據：從前 454/3 年起，貢金的六十分之一刻在雅典衛城的石碑上獻給雅典娜，顯示金庫已經成為雅典的一部分。[s3]
  misconceptions:
    - 同盟不是一開始就是雅典的帝國：前 478 年成立時是為了對抗波斯、解放東方的希臘城邦，是後來才一步步變成雅典控制的體系。[s1][s4]
crosscheck:
  date: 2026-11-02
  by: 獨立查核 agent（未參與寫作）
  result: 通過
  notes: 已打開維基、WHE、AIO 的 IG I³ 259、普魯塔克《伯里克里斯傳》12 核對；460 與 1,500 塔蘭特只見於 WHE，已把引用改為只標 s4；埃及遠征句刪去無據的「前460年代」。納克索斯退出年（約前471／前467年）各來源不同，仍有爭議。
verification: 交叉確認
lens_status: 無直接論述
---

## C1 背景

前 479 年普拉提亞戰役後，波斯被趕出希臘本土，但小亞細亞和愛琴海的希臘城邦仍受波斯威脅。[s1] 雅典是當時海軍最強的城邦，於是在前 478 年以雅典為盟主組成同盟，目標是繼續對抗波斯、解放東方的希臘城邦。[s1][s4]

## C2 經過

- 前 478 年：同盟成立，成員前後約 150 到 330 個城邦；大部分盟邦選擇繳貢金代替出兵，由雅典人擔任的「希臘財務官」收款。[s1] 第一次的貢金由阿里斯提德訂為 460 塔蘭特。[s4]
- 約前 471 年：納克索斯第一個想退出，被雅典擊敗；前 465 年塔索斯因礦產利益反叛，被圍兩年多後投降，城牆與船隻被沒收、改繳貢金。[s1]
- 前 454 年：雅典以埃及遠征失敗、金庫不安全為由，把金庫從提洛島搬到雅典；從這年起，貢金的六十分之一獻給雅典娜，清單刻在衛城的石碑上。[s1][s3]
- 前 404 年：雅典輸掉伯羅奔尼撒戰爭，同盟解散。[s1]

## C6 直接結果

同盟的錢被雅典用在非軍事用途，包括建造帕德嫩神廟；伯里克里斯主張只要替盟邦擋住波斯，就不必交代錢怎麼用。[s1][s2] 到前 5 世紀中葉，盟邦失去自主，同盟一般被稱為「雅典帝國」；貢金到前 425 年提高到 1,500 塔蘭特。[s4] 前 404 年同盟隨雅典戰敗而解散，可見它的存續完全綁在雅典的國力上。[s1]
