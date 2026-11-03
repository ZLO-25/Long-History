---
id: event-three-kingdoms
type: event
name: 東漢滅亡與三國鼎立（220–280年）
aliases: [三國, 三國鼎立, 魏蜀吳, 曹魏, 蜀漢, 孫吳, 隆中對, 東漢滅亡, Three Kingdoms, Cao Wei, Shu Han, Eastern Wu, Fall of the Han dynasty, 三国, 三国鼎立]
civilization: [中國（東漢末）, 中國（三國）]
track: china
time:
  start: 220
  end: 280
  precision: exact
  src: [s1, s2]
summary_line: 大事｜宮廷／政治中心｜洛陽、成都、建業｜東漢滅亡與三國鼎立（220–280年）
place:
  primary_field: 宮廷／政治中心
  secondary_fields: [戰場]
  locations:
    - { name_ancient: 洛陽, name_modern: 洛陽（中國）, lat: 34.68, lng: 112.45, precision: schematic, role: 曹魏首都, src: [s1] }
    - { name_ancient: 成都, name_modern: 成都（中國）, lat: 30.66, lng: 104.06, precision: schematic, role: 蜀漢首都, src: [s1] }
    - { name_ancient: 建業, name_modern: 南京（中國）, lat: 32.06, lng: 118.78, precision: schematic, role: 孫吳首都, src: [s1] }
  scale: area
structure_tags: [革命與政權更替, 長期衰退, 制度包裝延續]
topics: [內戰, 帝國的衰亡]
links: [event-yellow-turban, war-red-cliffs, event-eunuchs-partisan, event-northern-southern, war-feishui]
causes:
  - { id: event-yellow-turban, rel: 促成, why: 黃巾之亂讓朝廷把兵權交給地方，各地軍閥坐大，史家視為東漢衰亡的關鍵一步，但不是唯一原因。, src: [event-yellow-turban:s1, s2] }
  - { id: war-red-cliffs, rel: 促成, why: 曹操赤壁戰敗退回北方，劉備取得荊州，孫權保住江東，三方勢力的根據地因此確立。, src: [war-red-cliffs:s1, s2] }
  - { id: event-eunuchs-partisan, rel: 背景, why: 宦官專權、黨錮與賣官讓朝廷失去士人與百姓的支持，189 年後中央權威瓦解、軍閥割據。, src: [event-eunuchs-partisan:s1, s2] }
effects:
  - { id: event-northern-southern, rel: 背景, why: 三國由西晉統一，但西晉很快陷入內亂，北方落入各族政權之手，南方另立東晉，長期南北分立由此開始。, src: [event-northern-southern:s1] }
counterparts:
  - { id: event-crisis-third-century, note: "相似：同樣在 3 世紀，統一大帝國陷入軍閥割據、人口與財政崩壞，各地將領自立。不同：羅馬在 274 年重新統一並延續；東漢在 220 年滅亡，分裂成三個各自稱帝的國家，六十年後才由晉統一。", src: [s1, s2] }
sources:
  - { id: s1, title: "Three Kingdoms — Wikipedia", url: "https://en.wikipedia.org/wiki/Three_Kingdoms", accessed: 2026-11-02, tier: 百科 }
  - { id: s2, title: "Rafe de Crespigny, The Three Kingdoms and Western Jin: A History of China in the Third Century AD - I — East Asian History 1（1991），ANU Open Research", url: "https://openresearch-repository.anu.edu.au/items/d3215751-4afb-433d-a4c3-f47885ec894c", accessed: 2026-11-02, tier: 學術 }
  - { id: s3, title: "満田剛〈蜀漢・諸葛亮の北伐戦略と隴西・河西回廊の非漢族について〉（東洋哲学研究所，引《三國志·諸葛亮傳》隆中對）", url: "https://www.totetu.org/assets/media/paper/k033_151.pdf", accessed: 2026-11-02, tier: 學術 }
importance: 3
learn:
  histories: [中國史]
  why_care: 《三國演義》、電玩、漫畫裡的曹操、劉備、孫權都來自這段歷史；但真正的三國，比小說殘酷得多，人口少了一大半。
  story: |
    東漢末年，黃巾之亂後各地將領擁兵自重，189 年董卓進京廢立皇帝，中央從此失控。[s1][s2] 曹操把漢獻帝接到許昌，「挾天子而令諸侯」，統一了北方。[s1][s3] 208 年赤壁之戰，曹操南下失敗，劉備和孫權各自站穩腳步。[s1][s2] 諸葛亮早在隆中就替劉備規劃：北方的曹操不能硬碰，江東的孫權可以當盟友。[s3] 220 年，漢獻帝讓位給曹操的兒子曹丕，東漢正式滅亡；劉備在 221 年、孫權在 229 年也先後稱帝，形成魏、蜀、吳三國。[s1] 263 年魏滅蜀，266 年司馬炎篡魏建立晉，280 年晉滅吳，再度統一。[s1] 戰亂、饑荒與疫病讓登記人口從東漢的五千六百多萬掉到一千六百多萬。[s1]
  key_terms:
    - { term: 挾天子以令諸侯, plain: 把皇帝控制在自己手上，用皇帝的名義命令各地勢力。, example: 拿到班導的印章，就能以班導名義發通知。 }
    - { term: 禪讓, plain: 皇帝「自願」把皇位讓給別人；漢獻帝讓位給曹丕，實際上是被迫的。, example: 社長說是「主動讓賢」，其實是被幹部逼下台。 }
    - { term: 正統, plain: 誰才算是合法繼承上一個王朝的政權。, example: 兩個社團都說自己才是「元老社團」的正宗傳人。 }
  primary_source:
    - { text: 今操已擁百萬之衆，挾天子而令諸侯，此誠不可與爭鋒。孫權據有江東，已歷三世，國險而民附，賢能爲之用，此可以爲援而不可圖也。, from: 陳壽《三國志·蜀書·諸葛亮傳》隆中對（引自満田剛文）, src: s3 }
  historiography: |
    **誰才是「正統」？** 陳壽是由蜀入晉的官員，他的《三國志》用魏的年號與帝紀，等於承認魏繼承漢；北宋司馬光為了編年方便也用魏的年號。南宋朱熹則主張劉備是漢朝宗室、蜀漢才是正統，這個看法最早由東晉習鑿齒提出。[s1]
    **三國從哪一年算？** 多數人用 220–280 年；也有人從 184 年黃巾之亂、189 年董卓入京或 190 年算起；嚴格來說三個帝國並存只有 229–263 年。[s1][s2]
  misconceptions:
    - 「《三國演義》就是三國的歷史」：《三國演義》是明代小說，吸收了偏向蜀漢的說書與戲曲；正史是陳壽的《三國志》。[s1]
    - 「人口減少全是戰爭殺的」：登記人口大減也和饑荒、疫病、遷徙，以及逃稅不登記有關。[s1]
crosscheck:
  date: 2026-11-02
  by: 獨立查核 agent（未參與寫作）
  result: 通過
  notes: "核對 s1（英文維基）：189董卓廢少帝、196曹操迎獻帝至許、208赤壁、220/221/229/263/266/280各年、人口5,649萬→約1,616萬且可能低估、陳壽司馬光朱熹習鑿齒的正統論、起點184/189/190與嚴格229–263、《三國演義》明代成書偏蜀，均有據，未改內容。s2（de Crespigny）只讀到摘要頁、s3 日文論文轉引隆中對因 WebFetch 共用額度耗盡未能重開。"
verification: 交叉確認
lens_status: 無直接論述
summary_card: true
---

## C1 背景

黃巾之亂後朝廷把軍權交給地方，189 年靈帝死後董卓入京、廢少帝，中央權威崩潰，各地軍閥割據。[s1][s2] 曹操控制漢獻帝並統一北方；208 年赤壁之戰後，劉備與孫權各自鞏固根據地。[s1][s2]

## C2 經過

220 年漢獻帝禪位給曹丕，東漢滅亡、曹魏建立；221 年劉備稱帝（蜀漢），229 年孫權稱帝（吳）。[s1] 263 年魏滅蜀；266 年司馬炎迫魏帝禪位，建立晉；280 年晉軍攻下建業，吳主孫皓投降，三國結束。[s1]

## C6 直接結果

中國分裂六十年，最後由西晉統一。[s1] 登記人口從東漢 156 年約 5,649 萬降到 280 年約 1,616 萬，但數字可能因逃稅漏報而低估。[s1]
