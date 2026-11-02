---
id: war-jerusalem-70
type: war
name: 第一次猶太戰爭與耶路撒冷陷落（66–70年）
aliases: [第一次猶太戰爭, 第一次猶太－羅馬戰爭, 猶太大起義, 耶路撒冷圍城戰, 攻陷耶路撒冷, 第二聖殿被毀, First Jewish–Roman War, Great Jewish Revolt, Siege of Jerusalem (70 CE), 提圖斯, Titus]
aliases_main: [第一次猶太－羅馬戰爭, 耶路撒冷圍城戰, First Jewish–Roman War]
civilization: [古羅馬]
track: west
time:
  start: 66
  end: 70
  precision: exact
  src: [s1, s2]
summary_line: 戰爭｜戰場｜耶路撒冷（猶太行省）｜第一次猶太戰爭與耶路撒冷陷落（66–70年）
place:
  primary_field: 戰場
  secondary_fields: [宮廷／政治中心, 思想場域]
  locations:
    - { name_ancient: 耶路撒冷（聖殿山）, name_modern: 耶路撒冷舊城, lat: 31.7781, lng: 35.2358, precision: exact, role: "70 年圍城與第二聖殿被毀之地", src: [s2] }
    - { name_ancient: 加利利, name_modern: 加利利地區（以色列北部）, lat: 32.8, lng: 35.4, precision: schematic, role: "67 年維斯帕先先攻下加利利各城", src: [s1] }
  scale: area
structure_tags: [附庸反叛, 宗教／意識形態動員, 戰爭融資, 突變事件]
topics: [民變與抗爭, 宗教]
links: [building-colosseum, event-augustan-principate, event-pax-romana, event-christian-empire]
causes:
  - { id: event-augustan-principate, rel: 背景, why: "奧古斯都在西元 6 年把猶太地區改為羅馬行省直接統治並進行稅務普查，之後六十年摩擦不斷，為大起義埋下伏筆。", src: [s4] }
effects:
  - { id: building-colosseum, rel: 促成, why: "根據一段重建的銘文，維斯帕先用攻陷耶路撒冷得來的戰利品出資興建競技場。", src: ["building-colosseum:s1"] }
counterparts: "無適當對照：中國軌目前沒有「帝國鎮壓一個以宗教聖地為中心的行省起義、並摧毀其聖殿」的對應卡片，不硬湊。"
sources:
  - { id: s1, title: "First Jewish–Roman War — Wikipedia", url: "https://en.wikipedia.org/wiki/First_Jewish%E2%80%93Roman_War", accessed: 2026-11-02, tier: 百科 }
  - { id: s2, title: "Siege of Jerusalem (70 CE) — Wikipedia", url: "https://en.wikipedia.org/wiki/Siege_of_Jerusalem_(70_CE)", accessed: 2026-11-02, tier: 百科 }
  - { id: s3, title: "Tacitus, Histories, Book V（1–13 章）— Loeb Classical Library 英譯，LacusCurtius（penelope.uchicago.edu）", url: "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Tacitus/Histories/5A*.html", accessed: 2026-11-02, tier: 一手 }
  - { id: s4, title: "Judaea (Roman province) — Wikipedia", url: "https://en.wikipedia.org/wiki/Judaea_(Roman_province)", accessed: 2026-11-02, tier: 百科 }
  - { id: s5, title: "Siege of Jerusalem (70 CE) — Encyclopaedia Britannica", url: "https://www.britannica.com/event/Siege-of-Jerusalem-70", accessed: 2026-11-02, tier: 百科 }
importance: 2
summary_card: true
learn:
  histories: [希臘羅馬史]
  why_care: 今天耶路撒冷的「哭牆」、羅馬的提圖斯凱旋門，甚至羅馬競技場的建造經費，都和這場戰爭有關。
  story: |
    西元 6 年起，羅馬把猶太地區改成行省直接統治，稅務普查與總督的貪暴讓摩擦越來越多。[s4] 66 年，總督弗洛魯斯從聖殿金庫拿走 17 塔蘭特，又縱兵在耶路撒冷殺人，猶太人終於起兵，還一度把羅馬人趕出城。[s1][s5] 皇帝尼祿派老將維斯帕先鎮壓，先拿下加利利；69 年維斯帕先被擁立為皇帝，圍城的任務交給兒子提圖斯。[s1][s5] 70 年 4 月到 9 月，羅馬大軍圍困擠滿逾越節朝聖者的耶路撒冷，8 月攻破聖殿山，第二聖殿被焚毀，城市也被拆毀。[s2][s5] 隔年提圖斯在羅馬舉行凱旋式，遊行展示聖殿的七枝燈臺。[s2]
  key_terms:
    - { term: 第二聖殿, plain: 猶太教在耶路撒冷最神聖的聖殿，70 年被羅馬軍隊焚毀，今天只剩西牆（哭牆）遺跡。, example: 像一個民族最重要的宗教中心兼國家象徵，一夕之間被拆掉。 }
    - { term: 行省總督, plain: 羅馬派到被征服地區的長官，負責收稅、治安和審判。, example: 像學校派到別班的代理導師，管得好不好全看這個人。 }
    - { term: 凱旋式, plain: 羅馬將領打勝仗後在首都遊行，展示俘虜和戰利品的典禮。, example: 像冠軍隊伍拿著獎盃在市區遊行。 }
  primary_source:
    - { text: "聖殿蓋得像一座城堡，有自己的城牆，建造時比其他任何部分都更費心力。", from: "塔西佗《歷史》第五卷第 12 章（Loeb 英譯，本站中譯）", src: s3 }
  historiography: |
    **聖殿是誰下令燒的？** 曾在羅馬軍中的猶太史家約瑟夫斯說，提圖斯本來想保住聖殿，是士兵違令放火；現代學者 Grabbe 認為這說法難以相信。[s2] 4 世紀的基督徒史家蘇爾皮基烏斯·塞維魯斯則寫提圖斯是故意下令摧毀，以根除猶太教與基督教，他可能抄自塔西佗已失傳的段落。[s2]
    **死了多少人？** 約瑟夫斯說圍城中死了 110 萬人，塔西佗說被圍的人有 60 萬；現代史家多認為這些數字嚴重誇大，Guy Rogers 估計約 2–3 萬人死亡。[s2][s3]
  misconceptions:
    - 70 年耶路撒冷陷落不是戰爭的最後一仗：最後的據點馬薩達要到 73 或 74 年才被攻下。[s1]
crosscheck:
  date: 2026-11-02
  by: 獨立查核 agent（未參與寫作）
  result: 通過
  notes: "逐條核對 s1–s5（維基三條目、Britannica、塔西佗 Loeb 英譯 V.12–13）與競技場卡 s1；僅把圍城兵力改為 s2 的 48,200 人。弗洛魯斯殺 3,600 人一數在 s1 標『需引證』，卡片已用「據載」；聖殿由誰下令焚毀仍有爭議。"
verification: 交叉確認
lens_status: 無直接論述
---

## A1 交戰方與聯盟結構

一方是羅馬帝國：先由敘利亞總督加盧斯出兵失敗，再由維斯帕先、後由其子提圖斯率軍，提圖斯圍城時有四個軍團與輔助部隊，至少 48,200 人。[s1][s2] 另一方是猶太起義者，內部分成好幾派，圍城時由西門·巴·吉奧拉、吉斯卡拉的約翰等人分別領導，彼此還曾內鬥。[s2][s5]

## A2 起因：結構與導火線

**結構**：西元 6 年奧古斯都把猶太地區改為羅馬行省直接統治，稅務普查引發加利利人猶大的反抗；之後六十年羅馬總督的貪腐與暴行不斷激化緊張。[s4] 重稅、羅馬統治的壓迫感，以及一神教與多神教群體之間的衝突，是長期原因。[s1][s5]

**導火線**：66 年凱撒利亞的猶太人與希臘人為會堂土地起衝突；總督弗洛魯斯從聖殿金庫取走 17 塔蘭特，又縱兵洗劫耶路撒冷上城，據載殺了 3,600 多人。起義者隨即停止在聖殿為羅馬與皇帝獻祭，約瑟夫斯把這視為開戰的標誌。[s1]

## A7 關鍵轉折

- 66 年：起義爆發，加盧斯率軍失利，羅馬損失步兵 5,300、騎兵 480 人。[s1]
- 67 年：維斯帕先攻下加利利的約塔帕塔、塔里凱亞、迦瑪拉等城。[s1]
- 69 年：維斯帕先被部隊擁立為皇帝，戰事交給提圖斯。[s1][s5]
- 70 年 4 月 13 日–9 月 8 日：耶路撒冷圍城；8 月（猶太曆埃波月）聖殿被毀。[s2]

## A8 結果

羅馬勝利。第二聖殿被焚毀，耶路撒冷大部分被拆毀；71 年提圖斯與維斯帕先在羅馬舉行凱旋式，展示聖殿的七枝燈臺等戰利品，之後又以提圖斯凱旋門和「猶太被征服」錢幣紀念。[s2] 第十軍團留駐猶太地區，最後的據點馬薩達在 73/74 年陷落。[s1] 弗拉維王朝向全帝國的猶太人徵收懲罰性的「猶太稅」。[s1]

## A9 長期影響

猶太人至今在埃波月九日（Tisha B'Av）紀念聖殿被毀。[s2][s5] 對羅馬來說，這場勝利成為新的弗拉維王朝誇耀的功績，皇帝用紀念建築與錢幣宣傳。[s1][s2] 依競技場卡所引資料，一段重建的銘文說競技場是用這場戰爭的戰利品出資興建（見 building-colosseum 卡）。
