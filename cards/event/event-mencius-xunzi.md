---
id: event-mencius-xunzi
type: event
name: 孟子與荀子：戰國儒學（前4–前3世紀）
aliases: [孟子, 荀子, 孟軻, 荀況, 荀卿, 性善論, 性惡論, 民貴君輕, 稷下學宮, 亞聖, Mencius, Mengzi, Xunzi, Xun Kuang, 孟荀]
aliases_main: [孟子, 荀子, Mencius]
civilization: [中國（戰國）]
track: china
time:
  start: -372
  end: -235
  precision: approx
  src: [s1, s2, s4]
summary_line: 大事｜思想場域｜齊國稷下（今山東淄博）｜孟子與荀子：戰國儒學（前4–前3世紀）
place:
  primary_field: 思想場域
  secondary_fields: [宮廷／政治中心]
  locations:
    - { name_ancient: 齊國臨淄（稷下學宮）, name_modern: 淄博市臨淄區（中國山東）, lat: 36.85, lng: 118.35, precision: schematic, role: "孟子曾任稷下上大夫；荀子在此三度擔任祭酒", src: [s3, s4] }
    - { name_ancient: 蘭陵, name_modern: 蘭陵縣（中國山東）, lat: 34.86, lng: 118.07, precision: schematic, role: "荀子任蘭陵令並終老之地", src: [s4] }
  scale: area
structure_tags: [慢變結構, 宗教／意識形態動員]
topics: [儒家, 科舉與教育]
links: [event-confucius, event-confucian-orthodoxy, event-burning-books, event-qin-unification, event-shang-yang-reform]
causes:
  - { id: event-confucius, rel: 背景, why: "孔門弟子成為戰國最有影響力的思想群體之一，孟子、荀子在孔子學說上各自發展出性善與重禮教的主張。", src: ["event-confucius:s1", s1, s2] }
effects:
  - { id: event-qin-unification, rel: 背景, why: "荀子的學生李斯、韓非後來替秦國效力，荀子重法度、重禮制的思想經由他們影響了秦的統治方式。", src: [s2, s4], disputed: true }
  - { id: event-confucian-orthodoxy, rel: 背景, why: "孟、荀把儒學發展成完整的政治與教育主張，荀子在漢代地位崇高、被視為儒者典範，漢武帝獨尊儒術時儒學已是成熟學派。", src: [s4] }
counterparts:
  - { id: event-death-of-socrates, note: "相似：同一個「軸心時代」，思想家在列國之間游說或論辯，追問人該怎麼變好、國家該怎麼治理。不同：孟、荀想說服國君施行仁政或禮治，最後被帝國吸收為官方學問；蘇格拉底則在雅典民主下被公民法庭判處死刑。", src: [s1, s2] }
sources:
  - { id: s1, title: "Mencius — Stanford Encyclopedia of Philosophy", url: "https://plato.stanford.edu/entries/mencius/", accessed: 2026-11-02, tier: 學術 }
  - { id: s2, title: "Xunzi — Stanford Encyclopedia of Philosophy", url: "https://plato.stanford.edu/entries/xunzi/", accessed: 2026-11-02, tier: 學術 }
  - { id: s3, title: "孟子 — 維基百科", url: "https://zh.wikipedia.org/wiki/%E5%AD%9F%E5%AD%90", accessed: 2026-11-02, tier: 百科 }
  - { id: s4, title: "荀子 — 維基百科", url: "https://zh.wikipedia.org/wiki/%E8%8D%80%E5%AD%90", accessed: 2026-11-02, tier: 百科 }
importance: 2
summary_card: true
learn:
  histories: [中國史]
  why_care: 「人性本善」還是「人性本惡」？這個今天還在吵的問題，兩千三百年前就由兩位儒家大師正式開打。
  story: |
    孔子死後一百多年，戰國諸侯忙著打仗、爭霸，各家學說四處游說國君。[s1][s3] 孟子（約前 372–前 289）相傳受業於孔子孫子子思的門人，帶著學生周遊列國，勸國君行「仁政」，主張「民為貴，社稷次之，君為輕」。[s1][s3] 他認為每個人生來就有同情、羞恥、謙讓、是非四種「善端」，只要好好培養就能成為好人。[s1][s3] 幾十年後的荀子（約前 316–約前 236）在齊國稷下學宮三度擔任祭酒，卻說「人之性惡，其善者偽也」：人天生的欲望若不加約束就會互相爭奪，善要靠後天學習與禮義來塑造。[s2][s4] 他的學生裡，有後來幫秦國統一天下的李斯，還有法家的韓非。[s2][s4]
  key_terms:
    - { term: 四端, plain: 孟子說的四種與生俱來的「善的萌芽」：惻隱、羞惡、辭讓、是非之心。, example: 看到小孩快掉進井裡，任何人心裡都會一驚，想去救。 }
    - { term: 偽, plain: 荀子用語，不是「虛假」，而是「人為的努力」：後天學習與修養。, example: 字寫得漂亮不是天生的，是一筆一畫練出來的。 }
    - { term: 稷下學宮, plain: 齊國在首都臨淄設立、招攬各家學者講學辯論的地方。, example: 像國家出錢辦的大學研究院，各派學者都來。 }
  primary_source:
    - { text: "民為貴，社稷次之，君為輕。", from: "《孟子·盡心下》（引自維基百科「孟子」條）", src: s3 }
    - { text: "人之性惡，其善者偽也。", from: "《荀子·性惡》（引自維基百科「荀子」條）", src: s4 }
  historiography: |
    **性善 vs 性惡，真的完全相反嗎？** 一般說法把兩人看成「根本對立」。[s4] 史丹佛哲學百科則指出：孟子說的「性善」是指人有變好的潛力，「本善」是宋代朱熹的說法；荀子說「性惡」是指天生欲望放任會出問題，他也承認人人都能透過學習變好，差別在於「善從哪裡來」。[s1][s2]
    **誰才是正統？** 漢代荀子地位很高；宋代以後程頤說荀子「一句性惡，大本已失」，朱熹把《孟子》列入「四書」、孟子被尊為「亞聖」，荀子則被邊緣化，1530 年甚至被移出孔廟；清代考據學者才重新評價荀子，1949 年後更受重視。[s2][s3][s4]
  misconceptions:
    - 荀子說「性惡」不是說人沒救：他認為人人都能透過學習禮義成為好人，「偽」指的是後天努力，不是虛偽。[s2][s4]
crosscheck:
  date: 2026-11-02
  by: 獨立查核 agent（未參與寫作）
  result: 通過
  notes: "核對 s1–s4（SEP 孟子、荀子條，中文維基孟子、荀子條）；荀子卒年依 s4 改為前 237–前 235 之間（time.end 改 -235），孟子離齊一事依 s1 改寫，「四書直到清末必考」改為 s3 所寫的宋代入科舉與四書，荀子復興改為清代與 1949 年後。孟子師承（子思或其門人）s1、s3 說法不同，已保留「相傳」；兩句原文仍為維基轉引。"
verification: 交叉確認
lens_status: 無直接論述
---

## C1 背景

戰國時代各國競相變法、擴軍，國君急需治國之道，各家學者在列國之間游說。[s1][s3] 孔子的弟子與再傳弟子分散各地；儒家同時要和墨家的「兼愛」、楊朱的「為我」等學說競爭。[s1] 齊國在臨淄設稷下學宮，供養各派學者講學，成為思想交流的中心。[s3][s4]

## C2 經過

- 孟子（約前 372–前 289）：受業於子思一系，率門徒游說各國，曾任齊國稷下上大夫；齊國出兵燕國時，他抱怨齊軍濫殺、超出自己原本的主張，改革建議又不被採納，於是辭官離開；晚年與弟子整理成《孟子》。[s1][s3]
- 荀子（約前 316–前 237 至前 235 之間）：在稷下學宮研習，後來三度擔任祭酒；約前 255 年起任楚國蘭陵令，前 238 年春申君死後解職，終老蘭陵。[s2][s4]
- 前 247 年：荀子的學生李斯離開老師，到秦國求官。[s4]

## C4 制度或機制變化

孟子提出「仁政」「王道」，主張以德治國、讓人民富足，並提出民貴君輕。[s3] 荀子強調「禮」：禮樂是聖王制定的，能塑造人的情感與道德，也是治國與強兵的關鍵；他還主張天有固定規律、不干預人事，國家興衰取決於統治者的作為。[s2]

## C6 直接結果

儒學從孔子的言行教誨，發展成兩套各有系統的人性論與政治學說。[s1][s2] 荀子的學生李斯、韓非走向法家，李斯更成為秦國重臣。[s2][s4] 長遠來看，宋代《孟子》列入科舉，南宋朱熹又把它和《論語》《大學》《中庸》合稱「四書」。[s3]
