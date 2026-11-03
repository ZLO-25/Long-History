---
id: event-toyotomi-unification
type: event
name: 豐臣秀吉統一日本（1582–1590）
aliases: [豐臣秀吉, 秀吉, 太閤, 刀狩令, 小田原征伐, 戰國統一, Toyotomi Hideyoshi, 刀狩, 伴天連追放令, Sword hunt, Katanagari, Bateren Edict]
civilization: [日本（戰國）]
track: east
time:
  start: 1582
  end: 1590
  precision: exact
  src: [s1]
summary_line: 大事｜宮廷／政治中心｜大坂、京都｜豐臣秀吉統一日本（1582–1590）
place:
  primary_field: 宮廷／政治中心
  secondary_fields: [戰場]
  locations:
    - { name_ancient: 大坂城, name_modern: 大阪（日本）, lat: 34.6873, lng: 135.5262, precision: exact, role: 秀吉的居城，1583 年起建, src: [s1] }
    - { name_ancient: 小田原城, name_modern: 小田原（日本神奈川縣）, lat: 35.2510, lng: 139.1535, precision: exact, role: 1590 年小田原之戰，完成統一, src: [s1] }
  scale: area
structure_tags: [快速擴張, 精英內鬥, 合法性危機, 宗教／意識形態動員]
topics: [統一與中央集權, 對外擴張, 宗教]
links: [event-honnoji-incident, person-toyotomi-hideyoshi, social-taiko-kenchi-katanagari, war-imjin, war-sekigahara, event-sakoku, person-sen-no-rikyu, person-ishida-mitsunari, person-yodo-dono, person-shimazu-yoshihiro, person-date-masamune, person-tokugawa-ieyasu, person-luis-frois, finance-rakuichi-azuchi, event-takasago-koku-arima, war-osaka-sieges, event-sengoku-japan]
causes:
  - { id: event-sengoku-japan, rel: 直接引發, why: "織田信長在本能寺之變中身亡，秀吉11天後打敗明智光秀，接手信長的勢力，展開統一日本的行動。", src: [s1] }
effects:
  - { id: war-imjin, rel: 促成, why: "秀吉統一日本後手握大批身經百戰的武士，以征服明朝為目標，要求借道朝鮮遭拒，1592年出兵。", src: [s1, s4, war-imjin:s5] }
  - { id: event-sakoku, rel: 背景, why: "秀吉1587年下令驅逐傳教士，限制天主教的路線被德川幕府延續並加強，後來發展成鎖國政策。", src: [s1, s3, event-sakoku:s1] }
counterparts: 無適當對照：西方軌在 16 世紀末沒有一張「由下層武士出身統一全國」的卡可以對應。
sources:
  - { id: s1, title: "Toyotomi Hideyoshi — Wikipedia", url: "https://en.wikipedia.org/wiki/Toyotomi_Hideyoshi", accessed: 2026-10-25, tier: 百科 }
  - { id: s2, title: "Sword hunt — Wikipedia", url: "https://en.wikipedia.org/wiki/Sword_hunt", accessed: 2026-10-25, tier: 百科 }
  - { id: s3, title: "Asia for Educators（Columbia University）：Limitation on the Propagation of Christianity / Expulsion of Missionaries（1587，英譯）", url: "https://afe.easia.columbia.edu/main_pop/ps/ps_japan-tokugawa-edicts-christianity.htm", accessed: 2026-10-25, tier: 一手 }
  - { id: s4, title: "Imjin War — Wikipedia", url: "https://en.wikipedia.org/wiki/Imjin_War", accessed: 2026-10-25, tier: 百科 }
  - { id: s5, title: "豊臣秀吉 — Wikipedia（日文）", url: "https://ja.wikipedia.org/wiki/豊臣秀吉", accessed: 2026-11-03, tier: 百科 }
importance: 2
learn:
  histories: [日本史]
  why_care: 一個農家出身的步兵，十幾年內把打了一百多年仗的日本統一起來；他做的「沒收百姓刀劍」，影響了日本好幾百年。
  story: |
    1582 年，日本最強的大名織田信長在本能寺之變中身亡，他的部將羽柴秀吉（後來的豐臣秀吉）很快打敗叛將明智光秀，接手信長的事業。[s1] 秀吉出身低微，父親是農民出身的步兵（足輕），但他在 1585 年當上「關白」，是史上第一個平民出身擔任這個職位的人。[s1] 1587 年他下令驅逐天主教傳教士，1588 年發動「刀狩」，沒收農民的武器。[s1][s2][s3] 1590 年小田原之戰勝利，日本完成統一。[s1] 兩年後，他把軍隊送往朝鮮，想進一步征服明朝。[s1][s4]
  key_terms:
    - { term: 大名, plain: 日本各地擁有土地和軍隊的領主。, example: 像戰國時代一個個獨立的小國國君。 }
    - { term: 關白, plain: 代替天皇處理政務的最高官職，傳統上只給貴族擔任。, example: 秀吉是第一個平民出身當上關白的人。 }
    - { term: 刀狩, plain: 1588 年秀吉下令沒收農民、寺院僧兵手上的刀劍等武器。, example: 名義上說要把刀熔掉，做大佛殿的釘子。 }
  primary_source:
    - { text: "Japan is the country of gods, but has been receiving false teachings from Christian countries.（日本是神國，卻從基督教國家傳來邪法。）", from: 秀吉〈伴天連追放令〉（1587 年，天正 15 年 6 月 19 日；英譯見哥倫比亞大學 Asia for Educators，中文為本站摘譯）, src: s3 }
  historiography: |
    **刀狩真的讓百姓「沒有武器」了嗎？** 維基百科整理的資料顯示，刀狩的目的是固定武士與農民的身分界線、防止農民起事；但後來的德川幕府並沒有全面沒收農民和町人的刀，他們到 1683 年以前都還能佩帶長短雙刀，19 世紀初的調查也發現許多農家仍有武器。[s2] 換句話說，刀狩更像是「劃清身分」，而不是真的把每一把刀收走。[s2]
    **出兵朝鮮的原因？** 秀吉公開說的目標是征服朝鮮、再征服明朝；學者對他的真正動機（擴張野心、安置統一後無仗可打的武士等）仍有不同解釋。[s1][s4]
  misconceptions:
    - 秀吉不是「將軍」：他沒有擔任征夷大將軍，而是以關白、太閤的身分掌權。[s1]
    - 統一不是秀吉一個人從零開始：他接手的是織田信長已經打下的大半基礎。[s1]
  perspectives:
    - { history: 日本史, text: 從日本看，秀吉結束了戰國亂世，並用刀狩、檢地等政策替後來江戶時代的身分秩序打底。 }
    - { history: 朝鮮半島史, text: 從朝鮮看，秀吉是 1592 年起兩次入侵、造成巨大破壞的人。 }
  pop_culture:
    - { claim: "秀吉年輕時把信長的草鞋放在懷裡暖熱，因此被賞識（大河劇、童書的經典橋段）。", fact: "日文維基只稱這是「有名な逸話」，沒有標出任何一手史料；條目能確認的是他約在 1554 年前後以小者身分侍奉信長，之後在清洲城普請等事務上出頭。來源不足：本卡查不到這個故事的同時代出處。[s5]", src: [s5] }
    - { claim: "秀吉一夜之間蓋好墨俣城（墨俣一夜城）。", fact: "日文維基寫 1566 年「功績を上げたとされる逸話がある」，用語保留；這個故事的主要出處《武功夜話》在條目裡只被列為秀吉出身說之一的來源，其可信度本卡未能另行查證。[s5]", src: [s5] }
    - { claim: "秀吉是「農民的兒子」，從貧農一路當到天下人。", fact: "出身說並不統一：《太閤素生記》說父親是足輕木下彌右衛門，《豐鑑》說是中村鄉下層民之子、父母名不詳，另有非農業民、水野氏等說法；連「木下」姓是否來自父系都有疑問（一說來自妻子寧寧的母家）。日文維基的結論是真相不明。[s5]", src: [s5] }
crosscheck: { date: 2026-10-25, by: 獨立查核 agent（未參與寫作）, result: 通過, notes: "初查不通過，依建議修正後複查通過。 2026-11-03 第 2 期新增部分已查核：開 s5，草履取り（條目僅稱「有名な逸話」、無一手出處）、墨俣 1566「とされる逸話」、出身諸說與「真相不明」均相符；links 11 個 id 均存在。通過。" }
verification: 交叉確認
lens_status: 無直接論述
---

## C1 背景

日本經歷了一百多年的戰國時代，各地大名互相攻伐。織田信長在 16 世紀後半已控制京都一帶，秀吉是他的重要部將。[s1]

## C2 經過

1582 年 6 月 21 日本能寺之變，信長身亡；11 天後（7 月 2 日）秀吉在山崎之戰打敗明智光秀。[s1] 1585 年秀吉成為關白並平定四國；1587 年平定九州（維基百科條目內文另有 1586 年的說法）。[s1] 1587 年 7 月 24 日（舊曆天正 15 年 6 月 19 日）頒布伴天連追放令；1588 年發布刀狩令；1590 年小田原之戰獲勝，完成統一。[s1][s2][s3]

## C3 關鍵人物與群體

豐臣秀吉、織田信長、明智光秀；被收走武器的農民與寺院僧兵（如高野山的僧兵）。[s1][s2]

## C4 制度或機制變化

刀狩讓武器只屬於武士階層，固定武士與農民的身分界線；秀吉的政府也進行了「太閤檢地」（土地丈量）。[s1][s2]

## C5 受益者與受損者

**受益**：豐臣政權與服從它的大名、武士階層。[s1][s2]
**受損**：被收走武器的農民與寺院勢力；被下令驅逐的天主教傳教士。[s2][s3]

## C6 直接結果

日本在 1590 年完成統一；1592 年秀吉出兵朝鮮。[s1][s4]

## C7 長期影響

秀吉 1598 年 9 月 18 日去世後，德川家康在 1600 年關原之戰取勝，1603 年建立江戶幕府；限制天主教的路線後來被德川幕府延續並加強。[s1]

## C8 雙軌解讀

### 李彔

無直接論述：查不到李彔公開講稿談豐臣秀吉。

### 哈拉瑞

無直接論述：查不到哈拉瑞公開摘要談豐臣秀吉。

## C9 今日對照鉤子

「長期內戰結束後，新政權如何收回民間武器、建立秩序」的結構。[s2]

## C10 不可類比的差異

刀狩是為了固定封建身分等級，不是現代國家依法律管理槍枝；不能把它直接比作今天的槍枝管制政策。[s2]
