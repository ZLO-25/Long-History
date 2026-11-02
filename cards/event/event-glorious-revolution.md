---
id: event-glorious-revolution
type: event
name: 光榮革命（1688–1689年）
aliases: [光荣革命, 光榮革命與權利法案, 權利法案, 英國權利法案, 威廉三世, 奧蘭治的威廉, 威廉與瑪麗, 詹姆斯二世, Glorious Revolution, Revolution of 1688, Bill of Rights 1689, William of Orange]
civilization: [英格蘭, 荷蘭]
track: west
time:
  start: 1688
  end: 1689
  precision: exact
  src: [s1, s2]
summary_line: 大事｜宮廷／政治中心｜倫敦、托貝｜光榮革命（1688–1689年）
place:
  primary_field: 宮廷／政治中心
  secondary_fields: [港口／海峽]
  locations:
    - { name_ancient: 托貝, name_modern: 英國德文郡托貝, lat: 50.395, lng: -3.515, precision: schematic, role: 1688 年 11 月 5 日威廉率荷蘭軍隊登陸, src: [s1] }
    - { name_ancient: 西敏（國會）, name_modern: 倫敦西敏（英國）, lat: 51.4995, lng: -0.1248, precision: schematic, role: 1689 年國會宣布詹姆斯二世退位、通過《權利法案》, src: [s1, s2] }
  scale: area
structure_tags: [革命與政權更替, 憲政分權, 外部勢力介入, 合法性危機]
topics: [革命, 民主與參政, 法律與憲法, 稅收]
links: [finance-bank-of-england, event-american-founding-philosophy, event-enlightenment, event-english-parliament]
causes:
  - { id: event-english-parliament, rel: 背景, why: 英格蘭議會早已存在幾百年，1689 年國會才有機構和名義把新國王的條件寫成法律；輝格史家也把這場革命說成保住古老自由。, src: [event-english-parliament:s1, s1, s2] }
effects:
  - { id: finance-bank-of-england, rel: 促成, why: 威廉即位後英格蘭加入對法的九年戰爭，國會又握有財政權；急需軍費的政府因此在 1694 年成立英格蘭銀行來借錢。有學者質疑國會控權讓借錢變便宜的說法。, src: [s1, finance-bank-of-england:s1, finance-bank-of-england:s5], disputed: true }
  - { id: event-american-founding-philosophy, rel: 背景, why: 國會在光榮革命後限制王權，洛克的《政府論》也在這時出版，替「政府權力來自人民同意」提供了現成的例子。, src: [s4, event-american-founding-philosophy:s1] }
counterparts: 無適當對照：中國軌沒有「議會邀請外國君主帶兵入境、再以法律限制新君權力」的事件；王朝更替多半靠戰爭或篡位，不以成文法約束君主。
sources:
  - { id: s1, title: "Glorious Revolution — Wikipedia", url: "https://en.wikipedia.org/wiki/Glorious_Revolution", accessed: 2026-11-02, tier: 百科 }
  - { id: s2, title: "English Bill of Rights 1689（An Act Declaring the Rights and Liberties of the Subject and Settling the Succession of the Crown）— The Avalon Project, Yale Law School", url: "https://avalon.law.yale.edu/17th_century/england.asp", accessed: 2026-11-02, tier: 一手 }
  - { id: s3, title: "Revolution and the Glorious Revolution — UK Parliament, Living Heritage", url: "https://www.parliament.uk/about/living-heritage/evolutionofparliament/parliamentaryauthority/revolution/", accessed: 2026-11-02, tier: 通論 }
  - { id: s4, title: "William Bristow, Enlightenment — Stanford Encyclopedia of Philosophy", url: "https://plato.stanford.edu/entries/enlightenment/", accessed: 2026-11-02, tier: 學術 }
importance: 3
learn:
  histories: [歐洲史, 世界通史]
  why_care: 英國人把國王換掉，接著把「國王不能自己收稅、不能自己養兵」寫成法律，這是今天「憲政」觀念的重要起點。
  story: |
    1688 年 6 月，信天主教的英王詹姆斯二世生了一個兒子，許多新教徒擔心天主教王朝會一直延續下去。[s1] 一批反對他的貴族寫信邀請詹姆斯的女婿、荷蘭的奧蘭治親王威廉帶兵過來。[s1] 11 月 5 日威廉在英格蘭西南部的托貝登陸，詹姆斯的軍隊瓦解，他在 12 月逃往法國。[s1] 1689 年 2 月，國會宣布詹姆斯已經退位，把王位同時交給威廉和妻子瑪麗。[s1][s3] 同年 12 月，國會把條件寫成《權利法案》：國王不經國會同意不能收稅，平時不經國會同意不能養常備軍，國會議員選舉要自由，議員在國會裡的發言不受追究。[s2] 威廉一上台，就帶著英格蘭加入對法國的九年戰爭。[s1]
  key_terms:
    - { term: 權利法案, plain: 1689 年英國國會通過的法律，列出國王不能做的事、國會與人民有哪些權利。, example: 像社團選新社長前，先把「動用社費要全體同意」寫進社規，新社長要簽字才能上任。 }
    - { term: 常備軍, plain: 平時也一直養著的職業軍隊，不是打仗時才臨時召集。, example: 學校有固定的糾察隊，不是校慶才臨時找人。 }
    - { term: 君主立憲, plain: 保留國王，但國王的權力受到法律和議會限制。, example: 班上還是有班長，但重要的事要經過班會表決。 }
  primary_source:
    - { text: "That levying money for or to the use of the Crown by pretence of prerogative, without grant of Parliament... is illegal（未經國會同意，以王室特權為名替王室收錢，是違法的）", from: 英格蘭《權利法案》（1689 年；耶魯大學 Avalon Project 英文原文，中文為本站摘譯）, src: s2 }
  historiography: |
    **真的「光榮」又「不流血」嗎？** 麥考萊（Macaulay）、柏克（Burke）一派的「輝格史觀」把它寫成大家同意、幾乎不流血、保住英格蘭古老自由的革命。[s1] 平克斯（Steve Pincus）則認為它分裂又暴力，牽動各個階層；愛爾蘭與蘇格蘭也真的打了仗。[s1]
    **是革命，還是荷蘭入侵？** 瓊斯（J. R. Jones）說威廉渡海是九年戰爭「第一個、而且可說是唯一決定性的階段」；伊斯雷爾（Jonathan Israel）指出荷蘭軍隊占領倫敦，國會接受威廉時並不算自由。[s1]
  misconceptions:
    - 「不流血」只說對了一半：英格蘭本土幾乎沒有大戰，但愛爾蘭在 1690 年打了博因河之戰，蘇格蘭也有詹姆斯黨起事。[s1]
    - 光榮革命沒有廢除國王，而是換了國王，再用法律限制王權。[s1][s2]
crosscheck:
  date: 2026-11-02
  by: 獨立查核 agent（未參與寫作）
  result: 通過
  notes: "逐句核對英文維基（日期、平克斯、瓊斯、伊斯雷爾）、Avalon《權利法案》四項條文與引文、英國國會頁。改：托貝地點去掉維基未載的布里克瑟姆；瓊斯引文 arguably 改譯「可說是」；英格蘭銀行因果補上對方卡 s1（九年戰爭缺錢），議會背景補對方卡 s1。s1 未寫 1694 與借款成本，該處靠對方卡來源，仍標 disputed。"
verification: 交叉確認
lens_status: 無直接論述
summary_card: true
---

## C1 背景

1660 年王政復辟後不到 30 年，英格蘭又走到內戰邊緣。[s3] 詹姆斯二世信奉天主教，1688 年 6 月 10 日王子出生，讓人擔心天主教王朝延續。[s1]

## C2 經過

1688 年夏天，反對詹姆斯的人寫信邀請荷蘭的威廉出兵；11 月 5 日威廉在托貝登陸，詹姆斯的軍隊瓦解，他在 12 月 23 日離開英格蘭。[s1] 1689 年 2 月 6 日國會宣布詹姆斯已退位，把王位共同交給威廉與瑪麗，4 月 11 日兩人加冕。[s1] 同年 12 月《權利宣言》被寫進《權利法案》。[s1][s2]

## C6 直接結果

《權利法案》規定：未經國會同意替王室收錢違法；平時未經國會同意不得養常備軍；國會議員選舉應自由；國會內的言論不得在國會以外被追究。[s2] 1689 年 9 月英格蘭加入反法同盟，投入九年戰爭（1688–1697）；詹姆斯則帶法軍到愛爾蘭，直到 1691 年才平定。[s1]
