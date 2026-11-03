---
id: war-franco-prussian
type: war
name: 普法戰爭與德意志統一（1870–1871年）
aliases: [俾斯麥, 德國統一, 德意志帝國成立, 色當戰役, Franco-Prussian War, 埃姆斯電報, 法蘭克福條約, 普法戰爭賠款, 德法戰爭, Unification of Germany, Battle of Sedan, Ems Dispatch, 普法戰爭, Franco-German War, Treaty of Frankfurt, 普法战争]
civilization: [法國, 德國]
track: west
time:
  start: 1870
  end: 1871
  precision: exact
  src: [s1, s2]
summary_line: 戰爭｜戰場｜色當、凡爾賽、法蘭克福｜普法戰爭與德意志統一（1870–1871年）
place:
  primary_field: 戰場
  secondary_fields: [宮廷／政治中心]
  locations:
    - { name_ancient: 色當, name_modern: 色當（法國）, lat: 49.70, lng: 4.94, precision: schematic, role: 1870 年 9 月 1–2 日拿破崙三世與約 10 萬法軍投降, src: [s1] }
    - { name_ancient: 凡爾賽, name_modern: 凡爾賽（法國）, lat: 48.8049, lng: 2.1204, precision: schematic, role: 1871 年 1 月 18 日在凡爾賽宮鏡廳宣告成立德意志帝國, src: [s4] }
    - { name_ancient: 法蘭克福, name_modern: 法蘭克福（德國）, lat: 50.11, lng: 8.68, precision: schematic, role: 1871 年 5 月 10 日簽訂和約, src: [s2] }
  scale: area
structure_tags: [霸權挑戰, 技術代差, 基礎建設網絡, 政治宣傳工程, 戰爭融資]
topics: [統一與中央集權, 道路與鐵路, 印刷與通訊]
links: [finance-gold-standard, war-world-war-one, war-napoleonic, tech-railway, war-first-sino-japanese]
causes:
  - { id: tech-railway, rel: 背景, why: 德意志一方靠鐵路動員得比法國快、兵力也更多，開戰後很快占上風。, src: [s1] }
effects:
  - { id: finance-gold-standard, rel: 促成, why: 德國用戰勝法國得到的 50 億法郎賠款當資金改採金本位，美國等國家也陸續跟進。, src: [s2, finance-gold-standard:s10] }
  - { id: war-world-war-one, rel: 背景, why: 法國割讓亞爾薩斯—洛林後一心想報仇、收回失土，1894 年又和俄國結盟；收回失土成為法國投入一戰的重要動機之一。, src: [s1, s2, war-world-war-one:s1] }
counterparts:
  - { id: war-first-sino-japanese, note: "相似：都是一個新近完成改革的國家用短期戰爭打敗老牌大國，換來割地與鉅額賠款。不同：普法戰爭讓德意志各邦在戰爭中統一成帝國；甲午戰爭的戰場在朝鮮與中國沿海，戰後還有三國干涉。", src: [s1, s2] }
sources:
  - { id: s1, title: "Franco-Prussian War — Wikipedia", url: "https://en.wikipedia.org/wiki/Franco-Prussian_War", accessed: 2026-11-02, tier: 百科 }
  - { id: s2, title: "Treaty of Frankfurt (1871) — Wikipedia", url: "https://en.wikipedia.org/wiki/Treaty_of_Frankfurt_(1871)", accessed: 2026-11-02, tier: 百科 }
  - { id: s4, title: "Proclamation of the German Empire — Wikipedia", url: "https://en.wikipedia.org/wiki/Proclamation_of_the_German_Empire", accessed: 2026-11-02, tier: 百科 }
  - { id: s3, title: "Original and Edited Versions of the Ems Dispatch (July 13, 1870) — German History in Documents and Images（GHDI，德國歷史研究所）", url: "https://germanhistorydocs.org/en/forging-an-empire-bismarckian-germany-1866-1890/ghdi%3Adocument-1819", accessed: 2026-11-02, tier: 一手 }
importance: 2
learn:
  histories: [歐洲史]
  why_care: 一封被刪改過的電報，點燃一場戰爭，結果誕生了德意志帝國，也埋下法德兩國幾十年的仇恨。
  story: |
    1870 年，西班牙王位空出來，普魯士王室的親戚被提名，法國強烈反對。[s1] 法國大使在溫泉小鎮埃姆斯要普魯士國王保證以後也不再支持，國王拒絕了。[s1] 首相俾斯麥把國王拍來的電報刪改後公開，讀起來像國王當面羞辱法國大使。[s1][s3] 法國輿論大怒，7 月 19 日對普魯士宣戰。[s1] 但德意志各邦用鐵路動員得更快、兵力更多，9 月初就在色當俘虜了法國皇帝拿破崙三世。[s1] 1871 年 1 月 18 日，德意志各邦在凡爾賽宮宣布成立德意志帝國；[s4] 5 月的《法蘭克福條約》讓法國割讓亞爾薩斯和洛林大部分，還要在五年內賠 50 億法郎。[s1][s2]
  key_terms:
    - { term: 埃姆斯電報, plain: 1870 年普魯士國王從埃姆斯發給俾斯麥的電報；俾斯麥刪改後公開，激怒了法國。, example: 把對話截圖剪掉一半再貼到群組，看起來就像對方在嗆人。 }
    - { term: 賠款, plain: 戰敗國依和約付給戰勝國的錢。, example: 打輸賭的人要請全隊喝飲料，只是規模大到整個國家。 }
    - { term: 亞爾薩斯—洛林, plain: 法德邊界的一塊地區，1871 年割給德國，一戰後又回到法國。, example: 兩個班一直在搶的那塊走廊，每換一次「主人」就吵一次。 }
  primary_source:
    - { text: "His Majesty the King thereupon refused to receive the French envoy again（國王陛下隨即拒絕再接見法國特使）", from: 俾斯麥刪改後對外公布的埃姆斯電報（1870 年 7 月 13 日；GHDI 轉載 Louis L. Snyder 英譯，中文為本站摘譯）, src: s3 }
  historiography: |
    **是俾斯麥設計好的嗎？** 一派史家認為俾斯麥刻意挑釁，要法國先宣戰，好把南德各邦拉進來；另一派認為他只是順勢利用事態；雙方都同意他看到了組成新同盟的機會。[s1]
    **法國為什麼要打？** 法國史家羅斯（Roth）與米爾札（Milza）認為，拿破崙三世受到好戰的報紙與輿論壓迫，也想用戰爭轉移 1866 年以後的內政與外交挫折。[s1]
  misconceptions:
    - 「普法戰爭」不只是普魯士對法國：跟法國作戰的是普魯士帶頭的北德意志邦聯，加上南德各邦。[s1]
    - 拿破崙三世被俘不等於戰爭結束：法國隨後成立第三共和繼續作戰，巴黎被圍到 1871 年 1 月底才投降。[s1]
crosscheck:
  date: 2026-11-02
  by: 獨立查核 agent（未參與寫作）
  result: 通過
  notes: "核對英文維基普法戰爭（色當 10.4 萬人、史學爭論、Roth/Milza）、法蘭克福條約條目（50 億法郎、1873 年 9 月撤軍、收復失土是法國投入一戰的主要動機）、GHDI 電報引文。改：s1 全文未提凡爾賽，新增 s4 支持凡爾賽宣告；「拿破崙三世什麼也沒得到」改為來源說的「很小的讓步」；電報是刪改後公開（s1 未說 13 日公開）；一戰因果有 s2 與一戰卡 s1 直接支持，改寫機制並取消 disputed。"
verification: 交叉確認
lens_status: 無直接論述
summary_card: true
---

## A2 起因：結構與導火線

**結構**：1866 年普魯士打敗奧地利、成立北德意志邦聯，法國擔心普魯士的實力超過自己，外交上卻只換到很小的讓步。[s1]

**導火線**：1870 年西班牙王位提名霍亨索倫家族的利奧波德親王，法國施壓後他退出；法國再要求普王保證永不支持，遭拒。俾斯麥把 7 月 13 日的埃姆斯電報刪改後公開，法國在 7 月 19 日宣戰。[s1][s3]

## A8 結果

德意志一方勝。9 月 1–2 日色當一役俘虜拿破崙三世與約 10.4 萬法軍，9 月 4 日法國成立第三共和；巴黎被圍到 1871 年 1 月 28 日投降。[s1] 1871 年 1 月 18 日德意志帝國在凡爾賽宮宣告成立。[s4] 5 月 10 日《法蘭克福條約》：法國割讓亞爾薩斯大部分與洛林一部分，賠款 50 億法郎，付清前德軍占領部分法國領土（1873 年 9 月撤離）。[s2] 戰後巴黎爆發為期兩個月的巴黎公社，遭到鎮壓。[s1]

## A9 長期影響

德國取代法國成為歐陸最強的陸上強權，俾斯麥主導歐洲外交約二十年；法國想報仇，後來改善與俄國的關係，1894 年結盟。[s1] 收回亞爾薩斯—洛林成為法國投入第一次世界大戰的重要動機之一。[s2] 50 億法郎賠款後來成為德國改採金本位的資金來源之一（見「古典金本位」卡）。
