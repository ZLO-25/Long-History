---
id: war-seven-years
type: war
name: 七年戰爭（1756–1763年）
aliases: [法印戰爭, French and Indian War, "Seven Years' War", 腓特烈大帝, 英法七年戰爭, 法國—印第安人戰爭, 1763 年巴黎條約, 外交革命, Treaty of Paris 1763, Diplomatic Revolution, 七年战争]
civilization: [英國, 法國, 北美十三殖民地]
track: west
time:
  start: 1756
  end: 1763
  precision: exact
  src: [s1, s2]
summary_line: 戰爭｜戰場｜北美、歐洲、印度｜七年戰爭（1756–1763年）
place:
  primary_field: 戰場
  secondary_fields: [港口／海峽]
  locations:
    - { name_ancient: 俄亥俄河分叉口（杜肯堡）, name_modern: 匹茲堡（美國賓夕法尼亞州）, lat: 40.44, lng: -80.01, precision: schematic, role: 1754 年起英法在俄亥俄河谷爭地、首先開打, src: [s1, s2] }
    - { name_ancient: 魁北克（亞伯拉罕平原）, name_modern: 魁北克市（加拿大）, lat: 46.80, lng: -71.22, precision: schematic, role: 1759 年英軍攻下魁北克, src: [s1] }
    - { name_ancient: 薩克森與西里西亞, name_modern: 德國東部與波蘭西南部, lat: 51.1, lng: 15.0, precision: schematic, role: 普魯士與奧地利在歐洲的主戰場, src: [s1] }
  scale: area
structure_tags: [霸權挑戰, 聯盟破裂, 戰爭融資, 債務擴張, 快速擴張]
topics: [殖民統治, 軍事同盟, 對外擴張, 稅收]
links: [war-american-revolution, event-no-taxation, event-thirteen-colonies, event-french-revolution, finance-bank-of-england]
causes:
  - { id: event-thirteen-colonies, rel: 背景, why: 英屬殖民地人口與土地不斷往西擴張，和法國在俄亥俄河谷的據點正面相撞，1754 年就先打起來。, src: [s1, s2] }
effects:
  - { id: war-american-revolution, rel: 背景, why: 英國打完七年戰爭欠下大筆戰債，又要防衛北美，所以開始對殖民地加稅、加強管制，激起殖民地反抗。, src: [s2, war-american-revolution:s1] }
  - { id: event-no-taxation, rel: 促成, why: 戰爭花費龐大，英國國會要殖民地分擔駐軍費用，1765 年通過印花稅，引爆「無代表不納稅」抗爭。, src: [s2, event-no-taxation:s1] }
counterparts: 無適當對照：同時期的清朝正在平定準噶爾、經營新疆，屬於陸上邊疆戰爭；中國軌沒有跨越幾大洲、由海外殖民地與歐洲同盟一起捲入的戰爭。
sources:
  - { id: s1, title: "Seven Years' War — Wikipedia", url: "https://en.wikipedia.org/wiki/Seven_Years%27_War", accessed: 2026-11-02, tier: 百科 }
  - { id: s2, title: "French and Indian War/Seven Years' War, 1754–63 — Office of the Historian, U.S. Department of State", url: "https://history.state.gov/milestones/1750-1775/french-indian-war", accessed: 2026-11-02, tier: 通論 }
  - { id: s3, title: "The Definitive Treaty of Peace and Friendship（Treaty of Paris, 10 February 1763）— The Avalon Project, Yale Law School", url: "https://avalon.law.yale.edu/18th_century/paris763.asp", accessed: 2026-11-02, tier: 一手 }
importance: 2
learn:
  histories: [歐洲史, 美國史]
  why_care: 這場在歐洲、北美、印度同時開打的戰爭，讓英國拿下北美，卻也欠下大筆債，結果逼出了美國獨立。
  story: |
    1754 年，英國和法國在北美俄亥俄河谷搶地盤，年輕的華盛頓帶殖民地民兵去趕法軍，結果吃了敗仗。[s1][s2] 兩年後，戰火延燒到歐洲：英國和普魯士站在一起，法國竟然和宿敵奧地利結盟，史稱「外交革命」。[s1] 普魯士國王腓特烈二世在歐洲吃過慘敗、苦苦支撐；英國一面出錢資助普魯士，一面靠海軍在海上和殖民地作戰。[s1] 1759 年英軍攻下魁北克，這一年英國還在加勒比海和海上連連得勝。[s1] 1763 年 2 月 10 日簽訂《巴黎條約》，法國把加拿大和密西西比河以東的土地割給英國。[s1][s3] 英國贏得很多土地，但戰爭花費極大；它要殖民地分擔，反而激起殖民地的不滿。[s2]
  key_terms:
    - { term: 外交革命, plain: 1756 年歐洲同盟大洗牌：英國改和普魯士結盟，法國改和奧地利結盟。, example: 原本死對頭的兩個社團突然合作，原本的好朋友反而翻臉。 }
    - { term: 殖民地, plain: 一個國家在海外控制、移民、開發的地方，政治上聽命於母國。, example: 總店在臺北，各地分店的規矩和定價都要聽總店的。 }
    - { term: 戰債, plain: 國家為了打仗借的錢，打完仗還要還本付息。, example: 校慶辦得很盛大，但事後發現班費透支，大家要分攤。 }
  primary_source:
    - { text: "his Most Christian Majesty cedes and guaranties to his said Britannick Majesty, in full right, Canada（法國國王把加拿大的完整權利割讓並保證給英國國王）", from: 1763 年《巴黎條約》第四條（耶魯大學 Avalon Project 英文本，中文為本站摘譯）, src: s3 }
  historiography: |
    **一場還是好幾場戰爭？** 美國史書常把北美戰場叫「法國—印第安人戰爭」，從 1754 年算起；歐洲史則從 1756 年算七年戰爭。美國國務院史官辦公室把北美戰事看成更大的英法七年戰爭的一部分。[s1][s2]
    **英國贏了什麼、輸了什麼？** 一種看法強調英國贏得北美、加勒比海島嶼與在印度的商業優勢，成為海上霸主。[s1] 另一種看法強調代價：戰費龐大，英國向殖民地收稅與限制往西擴張，激起反抗，最後演變成獨立戰爭。[s2]
  misconceptions:
    - 七年戰爭不只在歐洲打：北美、加勒比海、西非、印度和菲律賓都有戰事。[s1]
    - 北美的戰事不是 1756 年才開始：1754 年英法就在俄亥俄河谷交火。[s1][s2]
crosscheck:
  date: 2026-11-02
  by: 獨立查核 agent（未參與寫作）
  result: 通過
  notes: "核對英文維基七年戰爭（外交革命、1756 年 8 月入侵薩克森、1759 魁北克、巴黎與胡貝圖斯堡條約內容、各戰場）、美國國務院史官頁（1754 華盛頓失利、內閣計畫被政敵公開、戰費龐大→課稅→獨立戰爭）、Avalon 條約第四條引文逐字相符。改：「英國把力氣放在海上和殖民地」改為 s1 所寫的資助普魯士加海軍作戰。s1 未談戰債與美國革命，相關因果只靠 s2 與對方卡。"
verification: 交叉確認
lens_status: 無直接論述
summary_card: true
---

## A2 起因：結構與導火線

**結構**：英法兩國在北美爭奪邊疆，邊界不清，俄亥俄河上游成為雙方必爭之地；在歐洲，奧地利想奪回被普魯士占去的西里西亞。[s1][s2]

**導火線**：1754 年華盛頓率殖民地部隊驅逐法軍失敗；英國內閣原想快速反擊，計畫卻被政敵公開，邊境衝突升級為全面戰爭。[s2] 1756 年英普、法奧先後結盟，8 月普魯士入侵薩克森，戰火擴及歐洲。[s1]

## A8 結果

英國與普魯士一方勝。1763 年 2 月 10 日《巴黎條約》：法國把加拿大與密西西比河以東的北美領土割給英國，路易斯安那交給西班牙；西班牙把佛羅里達讓給英國，換回哈瓦那與馬尼拉。[s1][s3] 同年《胡貝圖斯堡條約》讓普魯士保住西里西亞，被承認為歐洲強權。[s1]

## A9 長期影響

英國在北美取得大片土地，但戰費龐大；它向殖民地收稅、限制殖民者往西擴張，引起不滿，最後演變成獨立戰爭。[s2]
