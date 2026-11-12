---
id: event-death-of-socrates
type: event
name: 蘇格拉底之死
aliases: [蘇格拉底, 蘇格拉底審判, Socrates, Trial of Socrates, 毒堇, 苏格拉底之死]
civilization: [古希臘]
track: west
time:
  start: -399
  end: -399
  precision: exact
  src: [s1, s2]
summary_line: 大事｜思想場域｜雅典｜蘇格拉底之死
place:
  primary_field: 思想場域
  secondary_fields: [宮廷／政治中心]
  locations:
    - { name_ancient: 雅典, name_modern: 雅典（希臘）, lat: 37.97164, lng: 23.72395, pleiades_id: "579885", precision: exact, role: 審判與處決地 }
    - { name_ancient: 雅典廣場, name_modern: 雅典（希臘）, lat: 37.9755, lng: 23.72264, pleiades_id: "807514119", precision: schematic, role: 雅典公共生活中心（審判確切地點未定） }
  scale: point
structure_tags: [思想異見與審判, 合法性危機, 精英內鬥]
topics: [民主與參政, 言論與思想管制, 法律與憲法]
links: [war-peloponnesian, event-cleisthenes-reform, building-theatre-dionysus, social-athenian-democracy, event-greek-philosophy-schools, person-socrates, person-alcibiades, person-aristotle]
causes:
  - { id: war-peloponnesian, rel: 背景, why: 雅典戰敗後由三十僭主統治，領袖克里提亞斯年輕時跟過蘇格拉底；有學者認為這場審判是繞過大赦、清算舊帳的方式。, src: [s1], disputed: true }
  - { id: building-theatre-dionysus, rel: 背景, why: 柏拉圖《申辯篇》裡，蘇格拉底自己說阿里斯托芬的喜劇讓大家早就對他有成見；這齣戲對判決影響多大，學者看法不一。, src: [s7, s2], disputed: true }
effects:
  - { id: event-greek-philosophy-schools, rel: 促成, why: 老師被處死讓柏拉圖受到很大衝擊，他離開雅典旅行後回來創辦學園。, src: ["event-greek-philosophy-schools:s3"] }
counterparts:
  - { id: event-confucius, note: "相似：一位沒有留下著作的老師，學說靠弟子記錄流傳，日後成為整個文明的思想基礎。不同：蘇格拉底被雅典民主處死；孔子周遊列國求官未果，晚年回鄉教書而終。", src: [s1, s5] }
  - { id: event-burning-books, note: "相似：國家以法律手段處理被認為動搖人心的知識人。不同：蘇格拉底是由公民陪審團依法審判一個人；秦朝是皇帝下令大規模禁書，而「坑儒」的規模與對象在學界有很大爭議。", src: [s1, s6] }
sources:
  - { id: s1, title: "Trial of Socrates — Wikipedia（含 Diogenes Laertius 2.41–42、Plato《申辯》36a–b 的票數）", url: "https://en.wikipedia.org/wiki/Trial_of_Socrates", accessed: 2026-10-24, tier: 百科 }
  - { id: s2, title: "Socrates — Encyclopaedia Britannica", url: "https://www.britannica.com/print/article/551948", accessed: 2026-10-24, tier: 百科 }
  - { id: s3, title: "李彔：現代化十六講（之五、六）— 虎嗅網", url: "https://www.huxiu.com/article/38101.html", accessed: 2026-10-24, tier: 摘要 }
  - { id: s4, title: "Sameer Bajaj，Nexus（哈拉瑞《連結》）讀書筆記", url: "https://sameerbajaj.com/nexus/", accessed: 2026-10-25, tier: 摘要 }
  - { id: s5, title: "Confucius — Wikipedia", url: "https://en.wikipedia.org/wiki/Confucius", accessed: 2026-10-25, tier: 百科 }
  - { id: s6, title: "Burning of books and burying of scholars — Wikipedia", url: "https://en.wikipedia.org/wiki/Burning_of_books_and_burying_of_scholars", accessed: 2026-10-25, tier: 百科 }
  - { id: s7, title: "柏拉圖《申辯篇》（Apology），Benjamin Jowett 英譯 — MIT Classics", url: "https://classics.mit.edu/Plato/apology.html", accessed: 2026-11-12, tier: 一手 }
  - { id: s9, title: "Socrates — World History Encyclopedia", url: "https://www.worldhistory.org/socrates/", accessed: 2026-11-12, tier: 通論 }
  - { id: s8, title: "Athenian democracy — Wikipedia（陪審團規模、抽籤）", url: "https://en.wikipedia.org/wiki/Athenian_democracy", accessed: 2026-11-12, tier: 百科 }
importance: 3
learn:
  histories: [希臘羅馬史]
  why_care: 一個以「人民自己管自己」自豪的城邦，用多數決處死了一位只會問問題的老人；這個案子到今天還在被拿來討論：多數決一定對嗎？言論自由的界線在哪？[s1][s7]
  story: |
    前 399 年，美勒托斯控告蘇格拉底不承認城邦的神、引進新神，並敗壞青年。[s1][s7] 當時雅典剛戰敗，又經歷三十僭主的統治，前 403 年民主恢復時大家約定不再追究舊帳。[s1] 審判由抽籤選出的陪審團進行，標準人數是 501 人。[s1][s8] 蘇格拉底說自己是神送給城邦的「牛虻」。[s7] 柏拉圖寫道，只要 30 人改投就會無罪；學者據此推算，大約 280 票有罪、220 或 221 票無罪。[s1][s7] 有罪之後，陪審團要在兩邊提的刑罰裡選一個；據後來的記載，選死刑的票比判有罪的還多。[s1] 朋友勸他逃走，他拒絕，喝下毒藥去世。[s1]
  key_terms:
    - { term: 不敬神（asebeia）, plain: 不尊重城邦的神或祭典。在雅典，神與城邦的安全被視為連在一起，所以這是公共的罪。, example: 像在學校升旗典禮時公開說「這些儀式沒意義」，會讓很多人覺得是在挑戰全校共同遵守的規矩。 }
    - { term: 蘇格拉底式問答, plain: 蘇格拉底不直接給答案，而是一直問問題，讓對方發現自己其實說不清楚。, example: 你說「努力就會成功」，老師問：「那有人很努力還是失敗，你怎麼解釋？」 }
    - { term: 三十僭主, plain: 前 404 年雅典戰敗後，在斯巴達支持下上台的三十人政府，殺了許多人，隔年被推翻。, example: 戰敗國的政府被打倒後，別人安排上台的班級幹部亂抓同學，後來被趕下台。 }
    - { term: 大赦, plain: 前 403 年民主恢復時規定：不追究三十僭主時期的事，目的是讓城邦不再互相報仇。, example: 吵完架的兩班約定「過去的事一筆勾銷，不准再提」。 }
    - { term: 毒堇（hemlock）, plain: 一種植物毒。柏拉圖《斐多篇》只寫「那劑藥」，所以究竟是什麼，學者有討論。, example: 古代處決的方式之一，不是亂喝毒藥自殺。 }
  primary_source:
    - { text: "the life which is unexamined is not worth living（沒有經過檢視的人生，是不值得活的。）", from: 柏拉圖《申辯篇》（蘇格拉底在判刑後提出刑罰時），Jowett 英譯；中文為本站中譯, src: s7 }
    - { text: "I am that gadfly which God has given the state（我就是神送給城邦的那隻牛虻。）", from: 柏拉圖《申辯篇》，Jowett 英譯；中文為本站中譯, src: s7 }
  historiography: |
    **這是政治審判，還是宗教審判？** 有人看到審判的時間點（民主剛恢復、有大赦），認為控方是用「不敬神」的罪名繞過大赦，清算和三十僭主有關的人；[s1] 也有人認為，他只是長期被許多雅典人當成怪人，阿里斯托芬的《雲》早在前 423 年就在舞台上嘲笑他。[s2]
    **他是不是想死？** I. F. Stone（1988）認為蘇格拉底是故意激怒陪審團、希望被判死；Robin Waterfield（2009）認為他的死是自願的，目的是治癒城邦。[s1] 這些都是現代學者的解釋，古代史料沒有直接說。
    **蘇格拉底自己提議了什麼刑罰？** 雅典的規矩是有罪之後，控方和被告各提一個刑罰讓陪審團選。依柏拉圖《申辯篇》，蘇格拉底先說自己對城邦有功，應該得到的是在公共會堂（Prytaneum）免費吃飯；接著說他付得起一米那（100 德拉克馬）；最後說柏拉圖等朋友願意擔保 30 米那（3,000 德拉克馬）。[s7][s9] 幾百年後的狄奧根尼·拉爾修記下的金額不太一樣。[s1] 這是柏拉圖筆下的版本，蘇格拉底當天實際怎麼說，沒有逐字紀錄。
    **這能證明民主不好嗎？** 有人把判決當成「多數暴政」的證據，也有人認為這是剛從內亂恢復的民主在保護自己；兩種說法都在史家之間流傳。[s1]
  misconceptions:
    - 「蘇格拉底被判死刑，是因為他批評民主」：控告的是不敬神與敗壞青年，不是批評政體；至於背後的政治動機，史家還在爭論。[s1][s7]
    - 「蘇格拉底寫了很多書」：他本人沒有留下著作，我們主要靠柏拉圖和色諾芬的記錄認識他，這些記錄是否忠實，學者也有討論。[s1][s2]
  pop_culture:
    - { claim: "常見說法：蘇格拉底說過「我只知道我一無所知」。", fact: "柏拉圖《申辯篇》裡寫的是：他並不知道、也不認為自己知道（I neither know nor think that I know），意思是承認自己沒有智慧，而不是一句口號。[s7]", src: [s7] }
    - { claim: "常見說法：蘇格拉底是自殺的，喝毒藥是他自己選的。", fact: "他是被約 501 人的陪審團判處死刑後，依法處決；他拒絕了朋友的逃亡安排，所以有人說他「接受」死刑，但不是自殺。[s1]", src: [s1] }
verification: 交叉確認
crosscheck: { date: 2026-11-12, by: 獨立查核 agent（歷史學者＋教育者，未參與寫作）, result: 通過, notes: "1) 票數：story 與 C2 統一為「約 280 票有罪、220 或 221 票無罪」，並說明是由《申辯篇》36a「30 票改投」推算、看陪審團算 500 或 501 人。2) 「蘇格拉底自己提議的刑罰」原寫成兩種互相矛盾的說法；其實公共會堂吃飯、1 米那、30 米那三步都在《申辯篇》36d–38b，已改寫。3) 劇場→審判的 cause 改為引《申辯篇》（蘇格拉底自己提到阿里斯托芬的喜劇），維持 disputed。4) 「將軍阿爾西比亞德斯」在波提狄亞時還不是將軍，已改；刪去 Gatton（2024）一說（非主流）。5) 「克里提亞斯是學生」改為「年輕時跟過」。未能重開 MIT《申辯篇》與維基；Jowett 譯文三句（unexamined life、gadfly、I neither know nor think that I know）與查核者記憶一致。李彔、哈拉瑞兩欄為既有內容，未重核。WebFetch 全團隊共用額度在查核中途用盡，本輪實際打開 7 個來源，其餘依查核者專業知識判斷並改成較保守的說法。" }
lens_status: 依公開資料推論，未對照原書
---

## C1 背景

雅典剛輸掉伯羅奔尼撒戰爭，前 404–403 年由親斯巴達的「三十僭主」統治；與蘇格拉底有往來的人裡，有三十僭主中最被痛恨的克里提亞斯（世界歷史百科稱他被認為受蘇格拉底影響而敗壞）；蘇格拉底在波提狄亞之戰救過年輕的阿爾西比亞德斯（他後來成了雅典的將軍，又叛逃到斯巴達）。[s1][s9] 前 403 年民主恢復時頒布大赦，禁止追究三十僭主時期的事；有人認為這場審判是繞過大赦的方式。[s1] 蘇格拉底長期具爭議，前 423 年阿里斯托芬的喜劇《雲》就嘲諷過他。[s2]

## C2 經過

前 399 年，美勒托斯正式提告，安尼托斯與呂孔也是控方；罪名是不敬神（不承認城邦的神、引入新神）與敗壞青年。[s1] 陪審團的標準人數是 501 人（柏拉圖與色諾芬沒有寫人數，501 是學者的推定），由抽籤選出；[s1][s8] 投票約 280 票有罪、220 或 221 票無罪（由《申辯篇》36a–b「只要 30 票改投」推算，看陪審團算 500 還是 501 人）；依狄奧根尼·拉爾修，判死刑的票數比判有罪更多。[s1][s7] 蘇格拉底約 70 歲，以毒堇汁處死；《斐多篇》只說「那劑藥」，所以是不是毒堇有討論。[s1][s2]

## C3 關鍵人物與群體

蘇格拉底（約前 470–前 399）本人沒有留下著作，主要資料來自柏拉圖《申辯篇》《克力同篇》《斐多篇》與色諾芬的《申辯》。[s1][s2]

## C4 制度或機制變化

沒有改變成文制度，但呈現了雅典民主的一個機制：由大型公民陪審團以公開審判處理「危害城邦價值」的指控。[s1]

## C5 受益者與受損者

受害者是蘇格拉底與他的家人、朋友；從控方角度，審判讓剛恢復的民主向城邦表明：不敬神與「敗壞青年」是要受罰的。[s1]

## C6 直接結果

蘇格拉底拒絕逃亡、接受處決；他的學生柏拉圖等人透過著作讓這場審判成為西方思想史的核心事件。[s1][s2]

## C7 長期影響

後世詮釋分歧：有人把判決視為「群眾統治」缺陷的證據，也有人視為剛恢復的民主自我防衛的行動。[s1]

## C8 雙軌解讀

### 李彔

李彔在公開講稿中提到，蘇格拉底在「民主的雅典」被判死刑，用來說明軸心時代的思想家大多不被自己的時代接受；他也把希臘哲學「為知識而知識」的理性傳統，視為近代科學的源頭之一 [s3]。

### 哈拉瑞

依讀書筆記，哈拉瑞在《連結》中借用蘇格拉底「承認自己不知道」是智慧起點的想法，主張資訊系統（包括 AI）要能承認並修正自己的錯誤 [s4]。他談的是蘇格拉底的思想，不是這場審判本身。

## C9 今日對照鉤子

「戰敗與政權更替之後，社會用法律程序清算與舊政權有關聯的思想人物」的結構。[s1]

## C10 不可類比的差異

古代雅典沒有今日的言論自由憲法保障與上訴制度；判決受戰後政治氛圍影響，不能簡單等同於今日的司法案件。[s1]
