---
id: event-fanzhen
type: event
name: 藩鎮割據（763–907年）
aliases: [藩鎮, 藩镇割据, 藩鎮割據, 節度使, 节度使, 節度使擁兵, 河朔三鎮, 河北三鎮, 魏博, 成德, 盧龍, 元和中興, Jiedushi, Fanzhen, Three Fanzhen of Hebei]
civilization: [中國（唐）]
track: china
time:
  start: 763
  end: 907
  precision: approx
  src: [s1, s3]
summary_line: 大事｜宮廷／政治中心｜河北（魏博、成德、盧龍）｜藩鎮割據（763–907年）
place:
  primary_field: 宮廷／政治中心
  secondary_fields: [戰場]
  locations:
    - { name_ancient: 魏州（魏博鎮）, name_modern: 河北大名一帶（中國）, lat: 36.29, lng: 115.15, precision: schematic, role: 河朔三鎮之一的治所；座標為示意, src: [s1, s3] }
    - { name_ancient: 長安, name_modern: 西安（中國）, lat: 34.26, lng: 108.94, precision: schematic, role: 唐朝中央, src: [s3] }
  scale: area
structure_tags: [強人繞過制度, 合法性危機, 財政枯竭, 長期衰退]
topics: [帝國的衰亡, 內戰, 稅收]
links: [war-an-lushan, finance-two-tax-salt, event-chanyuan-treaty, event-economic-center-south]
causes:
  - { id: war-an-lushan, rel: 促成, why: 為了盡快平亂，朝廷讓許多安史降將直接當節度使，河朔三鎮近乎獨立，中央逐漸受制於強藩。, src: [war-an-lushan:s1, s1, s3] }
effects:
  - { id: finance-two-tax-salt, rel: 背景, why: 河朔等藩鎮的賦稅不上繳中央，朝廷只好依靠東南的鹽利與兩稅維持財政。, src: [s2, s3] }
  - { id: event-chanyuan-treaty, rel: 背景, why: 五代十國被視為唐末藩鎮割據的延續；五代軍事長官石敬瑭為求遼援割讓燕雲十六州，北宋從此缺了北方屏障。, src: [s3, event-chanyuan-treaty:s5], disputed: true }
counterparts:
  - { id: event-holy-roman-empire, note: "相似：中央名義上仍在，但地方軍事貴族掌握兵權、稅收並世襲，皇帝難以號令。不同：唐朝藩鎮多數仍受中央任免，真正割據的主要是河朔三鎮，且最後由朱溫篡唐；神聖羅馬帝國則長期以諸侯分權的形式延續。", src: [s3] }
sources:
  - { id: s1, title: "Jiedushi — Wikipedia", url: "https://en.wikipedia.org/wiki/Jiedushi", accessed: 2026-11-02, tier: 百科 }
  - { id: s2, title: "林楓珏《唐代中後期中央與地方政府之間的財政關係──以兩稅法和稅茶為例》，國立臺灣大學歷史學系博士論文（2023）", url: "https://tdr.lib.ntu.edu.tw/handle/123456789/87588?locale=en", accessed: 2026-11-02, tier: 學術 }
  - { id: s3, title: "藩鎮割據 — 維基百科（引張國剛《唐代藩鎮研究》、趙翼《廿二史劄記》）", url: "https://zh.wikipedia.org/wiki/%E8%97%A9%E9%8E%AE%E5%89%B2%E6%93%9A", accessed: 2026-11-02, tier: 百科 }
importance: 3
learn:
  histories: [中國史]
  why_care: 唐朝後半段，地方軍頭父死子繼、自己收稅，皇帝管不動；宋朝之後「重文輕武」、怕將領坐大，就是被這段歷史嚇到的。
  story: |
    唐玄宗時，邊疆設了十個節度使，他們同時握有軍隊、收稅和任命官員的權力。[s1][s3] 安祿山一人兼三鎮、手握十幾萬大軍，755 年起兵叛亂。[s1] 763 年平亂時，朝廷為了快點結束戰爭，讓許多投降的叛將直接當節度使。[s3] 結果河北的魏博、成德、盧龍三鎮幾乎獨立：57 位節度使中，朝廷任命的只有 4 位，其餘多是父死子繼或部將擁立，賦稅也不上繳。[s3] 唐憲宗曾在元和年間削平淮西、淄青等藩鎮，一度中興，但他死後河朔三鎮又再度叛離。[s3] 晚唐黃巢起事，各地軍閥趁勢坐大，907 年朱溫廢唐建立後梁，進入五代十國。[s3]
  key_terms:
    - { term: 節度使, plain: 唐代管理一大片地區的軍事長官，後來也掌握財政與人事。, example: 一個分校校長同時管校務、經費和人事，還有自己的保全隊。 }
    - { term: 藩鎮, plain: 由節度使統治的地方軍政單位；「割據」指它不受中央控制。, example: 分校自己選校長、自己收學費，不再聽總校的。 }
  primary_source:
    - { text: 秦漢六朝以來，有叛將無叛兵。, from: 清·趙翼《廿二史劄記》論唐中葉以後方鎮兵變（後世史家評論，引自維基百科）, src: s3 }
  historiography: |
    **藩鎮都在割據嗎？** 張國剛把中晚唐藩鎮分成四類：河朔割據型、中原防遏型、邊疆禦邊型、東南財源型；真正割據的主要是河朔三鎮，其他藩鎮的節度使多半三到五年一任，仍聽中央任免。[s3] 也有學者指出，嚴格來說藩鎮不受控制的時間大約只有六十年。[s3]
    **中央和藩鎮只會互鬥嗎？** 林楓珏研究兩稅法的分配，認為中晚唐中央與地方在財政上合作多於衝突。[s2]
  misconceptions:
    - 「安史之亂一平，唐朝就分崩離析」：唐朝靠各類藩鎮之間的平衡又維持了一百多年，直到黃巢之亂才打破。[s3]
crosscheck:
  date: 2026-11-02
  by: 獨立查核 agent（未參與寫作）
  result: 通過
  notes: "核對 s3（中文維基藩鎮割據）：河朔三鎮57位節度使朝廷只任命4位、賦稅自留、張國剛四類、真正失控約六十年、多數節度使三到五年一任、黃巢後朱溫907建後梁、五代為延續、趙翼評論均有據。安祿山兵力改為「十幾萬」，避免與 war-an-lushan 的16.4萬衝突。primary_source 為清代史家評論，已在 from 註明。s1、s2 因 WebFetch 共用額度耗盡未能重開。"
verification: 交叉確認
lens_status: 無直接論述
summary_card: true
---

## C1 背景

711 年起設節度使，天寶年間增至十個，府兵制逐漸被募兵制取代；節度使可以養兵、收稅、任命屬官。[s1][s3] 安祿山兼領平盧、范陽、河東三鎮，755 年起兵。[s1]

## C2 經過

763 年安史之亂平定，朝廷任命安史舊部為節度使，河朔三鎮多自行世襲。[s3] 781 年成德節度使之子李惟岳要求繼位被拒而叛，引發德宗時期的大亂，涇原兵變一度攻占長安。[s1][s3] 憲宗時平定淮西（擒吳元濟）、819 年平定淄青，形成「元和中興」；820 年憲宗遇害後河朔三鎮再叛。[s3] 晚唐黃巢之亂後各地割據勢力興起，朱溫最終廢唐建立後梁。[s3]

## C6 直接結果

中央失去河北的兵權與賦稅，只能依靠東南財源；地方兵變頻繁。[s2][s3] 五代十國被視為唐末藩鎮割據的延續與擴大。[s3]
