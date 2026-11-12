---
id: person-caesar
type: person
name: 凱撒
aliases: [凱撒, 尤利烏斯·凱撒, 朱利葉斯·凱撒, 儒略·凱撒, 愷撒, 蓋烏斯·尤利烏斯·凱撒, Julius Caesar, Gaius Julius Caesar, Caesar, 凯撒]
civilization: [古羅馬]
track: west
time:
  start: -100
  end: -44
  precision: approx
  src: [s1, s3]
summary_line: 人物｜宮廷／政治中心｜羅馬、阿萊西亞、法薩盧斯｜凱撒
place:
  primary_field: 宮廷／政治中心
  secondary_fields: [戰場, 城市／都會]
  locations:
    - { name_ancient: 羅馬, name_modern: "羅馬（義大利）", lat: 41.8900, lng: 12.4912, pleiades_id: "423025", precision: exact, year: -100, role: "出生地與年份依通說（約前 100 年）；所查的普魯塔克與蘇埃托尼烏斯頁面沒有寫出生年", src: [s1, s2] }
    - { name_ancient: 阿萊西亞, name_modern: "阿利茲－聖雷納（法國，一般認為的位置）", lat: 47.5367, lng: 4.5000, precision: schematic, year: -52, role: "高盧戰爭最後的大圍城；高盧領袖韋爾欽托利投降（年份與地點依英文維基〈Gallic Wars〉）", src: [s4] }
    - { name_ancient: 盧比孔河, name_modern: "盧比孔河（義大利，確切河道有爭議）", lat: 44.0722, lng: 12.3607, pleiades_id: "393484", precision: disputed, year: -49, role: "前 49 年帶兵渡過山南高盧與義大利本土的界河；見渡盧比孔河卡", src: [s2] }
    - { name_ancient: 法薩盧斯, name_modern: "法薩拉（希臘色薩利，確切戰場為示意）", lat: 39.2833, lng: 22.3833, precision: schematic, year: -48, role: "前 48 年擊敗龐培；普魯塔克記雙方兵力", src: [s1] }
    - { name_ancient: 亞歷山卓, name_modern: "亞歷山卓（埃及）", lat: 31.2001, lng: 29.9187, precision: schematic, year: -48, role: "追龐培到埃及後留下；與克麗奧佩脫拉結盟（年份依一般說法，WHE 寫在亞歷山卓戰爭期間）", src: [s5, s6] }
    - { name_ancient: 龐培劇場附近的元老集會處, name_modern: "羅馬（義大利，確切地點為示意）", lat: 41.8956, lng: 12.4755, precision: schematic, year: -44, role: "前 44 年 3 月被元老們刺殺，據蘇埃托尼烏斯身中二十三刀（遇刺地點與年份依通說，所查頁面未標地點）", src: [s3] }
  scale: area
person: { role: "羅馬將軍、政治家，征服高盧，在內戰中打敗龐培，成為獨裁官，前 44 年被元老們刺殺", faction: "羅馬（共和末期）", name_romaji: "Gaius Julius Caesar", born: -100, died: -44 }
relations:
  - { id: person-cleopatra, kind: 同盟, from: -48, to: -44, note: "前 48 年起在亞歷山卓結盟；普魯塔克記她躲進鋪蓋袋見他，他讓她與弟弟共同復位；兩人有一個兒子凱撒里翁。這是政治同盟，也是私人關係。", src: [s5, s6] }
  - { id: person-augustus, kind: 親屬, from: -44, to: -44, note: "前 44 年收屋大維為養子；屋大維是他的外甥孫（甥孫輩的親屬關係依通說，所查頁面摘要只寫收養）。", src: [s7] }
structure_tags: [強人繞過制度, 政治宣傳工程, 精英內鬥, 附庸反叛, 臨界點, 突變事件]
topics: [內戰, 對外擴張, 法律與憲法]
links: [event-rubicon, event-second-triumvirate, event-augustan-principate, event-marian-reforms-sulla, event-gracchi-reforms, commodity-egypt-grain]
counterparts: 無適當對照：中國軌沒有「在外征戰多年、自己寫戰記宣傳、回國後用軍隊壓過朝廷」的人物卡可直接對照。
sources:
  - { id: s1, title: "Plutarch, Life of Caesar（Perrin 英譯）— LacusCurtius", url: "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Plutarch/Lives/Caesar*.html", accessed: 2026-11-12, tier: 一手 }
  - { id: s2, title: "Suetonius, Life of Julius Caesar 第 1–72 章（Rolfe 英譯）— LacusCurtius", url: "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Suetonius/12Caesars/Julius*.html", accessed: 2026-11-12, tier: 一手 }
  - { id: s3, title: "Suetonius, Life of Julius Caesar 第 82 章（Rolfe 英譯）— Lexundria", url: "https://lexundria.com/suet_jul/82/r", accessed: 2026-11-12, tier: 一手 }
  - { id: s4, title: "Gallic Wars — Wikipedia（英文；兵力與死亡數字轉引 Henige、Lot、Gilliver、Raaflaub 等學者）", url: "https://en.wikipedia.org/wiki/Gallic_Wars", accessed: 2026-11-12, tier: 百科 }
  - { id: s5, title: "Cleopatra VII — World History Encyclopedia", url: "https://www.worldhistory.org/Cleopatra_VII/", accessed: 2026-11-12, tier: 通論 }
  - { id: s6, title: "Plutarch, Life of Caesar 第 49 章（Perrin 英譯）— Lexundria", url: "https://lexundria.com/plut_caes/49/prr", accessed: 2026-11-12, tier: 一手 }
  - { id: s7, title: "Augustus — World History Encyclopedia", url: "https://www.worldhistory.org/Augustus/", accessed: 2026-11-12, tier: 通論 }
importance: 3
learn:
  histories: [希臘羅馬史]
  why_care: 他讓一個靠選舉和元老院運作的共和國，變成一個人說了算；他自己寫的高盧戰記，到今天還是我們了解那場戰爭的主要史料，也是最成功的自我宣傳之一。
  story: |
    凱撒約前 100 年生於羅馬。[s2] 他在高盧打了多年的仗，自己寫下《高盧戰記》；現代學者多把它看成宣傳，因為作者誇大勝利、壓低羅馬的損失。[s4] 普魯塔克更說，他在這場戰爭中攻下八百多座城、征服三百個部族，殺了一百萬人、俘虜同樣多的人，這個數字學者並不採信。[s1][s4] 前 49 年，他帶軍隊渡過盧比孔河進入義大利，蘇埃托尼烏斯記載他在河邊說，只要過了這座小橋，一切就得靠刀劍。[s2] 前 48 年他在法薩盧斯打敗龐培，之後在埃及與克麗奧佩脫拉結盟。[s1][s5] 前 44 年 3 月，他在元老們圍攻下受了二十三處傷死亡。[s3]
  key_terms:
    - { term: 獨裁官, plain: 羅馬共和國在危機時才任命的官員，擁有最高權力，原本任期很短。, example: 像學校出大事時臨時指定一位總指揮，事情結束就該交還權力。 }
    - { term: 元老院, plain: 由前任官員組成的議事機構，實際掌握羅馬大政。, example: 像由資深幹部組成的長老會。 }
    - { term: 執政官, plain: 每年選出的兩位最高官員，任期一年，彼此可以互相牽制。, example: 像同一屆有兩位會長，誰都不能單獨拍板。 }
    - { term: 戰記（Commentarii）, plain: 凱撒寫給羅馬人看的戰爭報告，用第三人稱講自己。, example: 像校隊隊長自己寫的比賽報導，當然會寫得對自己有利。 }
  primary_source:
    - { text: "Even yet we may draw back; but once cross yon little bridge, and the whole issue is with the sword.（現在還可以回頭；但只要過了那座小橋，一切就要靠刀劍來決定。）", from: "蘇埃托尼烏斯《十二帝王傳．神君尤利烏斯》31（Rolfe 英譯，LacusCurtius；中文為本站中譯）。這是蘇埃托尼烏斯在事發約一百五十年後的記載，不是現場記錄", src: s2 }
    - { text: "he slew one million in hand to hand fighting and took as many more prisoners.", from: "普魯塔克《凱撒傳》15（Perrin 英譯，LacusCurtius）。這是普魯塔克的總結數字，現代學者並不採信", src: s1 }
  historiography: |
    **高盧人死了多少？數字並列。** 普魯塔克與阿庇安的說法：一百萬塞爾特人戰死、一百萬以上被俘或淪為奴隸、八百座村鎮被毀。[s1][s4] 英文維基的整理則列「可信估計」為三萬人以上被殺、一萬人以上受傷，並說研究者 Henige 認為所有當時的數字都不可信。[s4] 凱撒自己的說法也不能全信：他寫日耳曼的烏西佩特人與滕克特里人有四十三萬人被殺，Henige、Lot、Gilliver 都認為這個數字不可能，Gilliver 認為可能是數萬人；Kiernan 則認為除了數字，整件事接近種族滅絕。[s4] 阿圖亞圖契人，凱撒說他賣了五萬三千人為奴，利潤全歸他自己。[s4] 赫爾維提人，凱撒的人口清冊說有三十六萬八千人，其中九萬二千是戰士，歷史學者估計二萬到五萬，李維則給十五萬七千。[s4]
    **戰記是宣傳嗎？** 英文維基整理：大多數學者把它看成宣傳，Henige 稱凱撒是史上最成功的「公關高手」之一；Raaflaub 較為溫和，認為它比一般人以為的更真實，也能讓我們看到凱撒想怎樣被看待，但仍充滿宣傳。[s4]
    **「獨裁官」的性質。** 本卡沒有另外查凱撒的獨裁官任期與「終身」的法律性質，細節見渡盧比孔河卡與奧古斯都卡。
  misconceptions:
    - 凱撒一個人解決了整個高盧 → 英文維基整理的高盧戰記是凱撒自己的報告，數字有被誇大，高盧領袖韋爾欽托利投降後被關六年，前 46 年在凱撒的凱旋式後被勒死。[s4]
  pop_culture:
    - { claim: "凱撒被刺時喊「Et tu, Brute?」（還有你嗎，布魯圖斯？）", fact: "拉丁文這句名言最廣為人知的版本是莎士比亞劇本《凱撒大帝》裡的台詞（本卡未開原劇本）。蘇埃托尼烏斯只說，「有人寫道」布魯圖斯衝上去時，他用希臘語說了「你也是嗎，孩子？」，他並不替這個說法擔保，而且還記載他身中二十三刀。[s3]", src: [s3] }
    - { claim: "「我來，我見，我征服」是凱撒在戰場上說的話", fact: "蘇埃托尼烏斯記載的是：在他的本都凱旋式上，展示的牌子寫著三個字，「我來了，我看見，我征服」，指的是戰事結束得有多快，而不是戰爭的過程。[s2]", src: [s2] }
    - { claim: "「剖腹產」（caesarean）得名於凱撒，他是被剖開母親肚子生出來的", fact: "所查的蘇埃托尼烏斯頁面（第 1–72 章）沒有提這件事，也沒有談到他的出生方式或出生年；本卡沒有查到足以證實這個說法的來源，因此不當成史實。", src: [s2] }
    - { claim: "他說「骰子已經擲下」(alea iacta est) 後渡河", fact: "蘇埃托尼烏斯與普魯塔克的英譯記的是「骰子已擲出」（the die is cast），所查英譯頁面沒有給拉丁文；兩人的版本也略有不同，蘇埃托尼烏斯另記他在河邊說「只要過這座小橋就要靠刀劍」。[s1][s2]", src: [s1, s2] }
verification: 交叉確認
lens_status: 無直接論述
---

## P1 出身與時代

凱撒約前 100 年生於羅馬。[s2] 蘇埃托尼烏斯寫到他十六歲時父親去世，不久後他結婚（細節本卡不展開）。[s2] 他成長的時代，格拉古兄弟之後的羅馬政治已經動盪不安，軍隊開始更聽命於將領而不是國家（背景見格拉古改革卡、馬略與蘇拉卡）。

## P2 一生的轉折

1. **前 58–52 年：高盧戰爭。** 他在高盧打了多年的仗，最後在阿萊西亞圍住並逼降高盧領袖韋爾欽托利。[s4] 他自己寫下《高盧戰記》。[s4]
2. **前 49 年：渡盧比孔河。** 他帶兵進入義大利（見渡盧比孔河卡）。[s2]
3. **前 48 年：法薩盧斯與埃及。** 普魯塔克寫雙方兵力：龐培方四萬五千步兵、七千騎兵，凱撒方二萬二千步兵、一千騎兵；他在這一戰獲勝。[s1] 之後他在埃及與克麗奧佩脫拉結盟。[s5][s6]
4. **內戰後：獨裁官與羅馬的改造。** 本卡沒有另外查他的獨裁官任期與各項改革，細節見渡盧比孔河卡與奧古斯都卡。
5. **前 44 年：遇刺。** 蘇埃托尼烏斯記載他身中二十三刀，並說有人說他在布魯圖斯衝上來時用希臘語說了話。[s3] 同年他收屋大維為養子。[s7]

## P3 關鍵決定：當時有哪些選擇

**前 49 年：到了盧比孔河邊，要不要渡河？** 蘇埃托尼烏斯寫他在河邊停了下來，說「現在還可以回頭；但只要過了那座小橋，一切就要靠刀劍」。[s2] 他看得到的選項（示意）有：解散軍隊、回羅馬面對政敵，或帶軍隊越界。他選了後者。[s2] 代價是他從這一刻起，成了用武力對抗羅馬自己政府的人，內戰隨之爆發（見渡盧比孔河卡）。

**前 52 年：對高盧人怎麼處理？** 凱撒的做法在不同來源中並不一致：他說自己把阿圖亞圖契人賣為奴，利潤歸他；高盧領袖韋爾欽托利被關了六年，之後在羅馬被處死。[s4] 他當時有其他選項（示意），例如談判、征服後留下當地貴族統治，但凱撒自己的戰記沒有把這些選項寫給後人看。他選擇了武力征服加大量買賣奴隸。[s4]

**前 48 年：在埃及要不要介入宮廷內鬥？** 普魯塔克寫克麗奧佩脫拉躲進鋪蓋袋、由阿波羅多洛斯送進宮見他；他很喜歡她的膽識與魅力，讓她與弟弟共同復位。[s6] 他的選項是：保持中立、支持她弟弟，或支持她；他選了她與她弟弟共同統治，並與她結盟。[s5][s6]

## P4 他改變了什麼

**共和國的性質。** 他證明了：一個將領帶著效忠自己的軍隊，可以壓過元老院和法律。這個先例見渡盧比孔河卡；他的繼承人屋大維後來建立元首制（見奧古斯都卡）。[s7]

**高盧。** 高盧戰爭是羅馬擴張的一部分；在他的戰記裡，高盧被寫成一個可征服的對象。本卡沒有另外查他對高盧後來的行政安排，細節不寫。[s4]

**書寫。** 他的《高盧戰記》成為研究這場戰爭的主要史料。[s4]

## P5 從另一邊看他

**高盧人。** 阿圖亞圖契人被賣為奴，凱撒說利潤全歸他；韋爾欽托利投降後被關六年、遊街後處死。[s4] 他們自己的聲音，所查來源沒有記載（來源不足）；我們讀到的高盧戰爭幾乎都是凱撒自己的版本。[s4]

**日耳曼人。** 凱撒說烏西佩特人與滕克特里人有四十三萬人被殺，學者認為數字不可能，但 Kiernan 認為整件事近似種族滅絕。[s4]

**元老院與反對者。** 他在遇刺時身中二十三刀。[s3] 刺殺者的動機，所查的蘇埃托尼烏斯第 82 章頁面沒有細寫。

**克麗奧佩脫拉。** 對她來說，與凱撒結盟是保住王位的政治選擇；WHE 說兩人的結合建立在互相尊重與共同的智慧上，他們有一個兒子凱撒里翁，凱撒承認這是自己的兒子，但沒有承認為繼承人。[s5]

## P6 評價怎麼變

**古代。** 蘇埃托尼烏斯對他的死記下了「有人說」的版本，並不替它擔保。[s3] 普魯塔克把高盧戰爭總結成殺一百萬人、八百座城。[s1]

**近代以來。** 英文維基整理：直到 20 世紀以前，《高盧戰記》大多被當成可靠的記錄；現在多數學者把它看成宣傳，不過也有學者認為其中有很多真實成分。[s4] 本卡不把他寫成單純的天才，也不把他寫成單純的暴君。

## P7 雙軌解讀

### 李彔

無直接論述：沒有查到李彔直接談凱撒。

### 哈拉瑞

無直接論述：沒有查到哈拉瑞直接談凱撒。

## P8 今日對照鉤子

「掌兵的人自己寫報告，決定大眾怎麼認識這場戰爭」的結構；以及「用軍事勝利換政治資本，再回頭改寫政治規則」的結構。[s2][s4]

## P9 不可類比的差異

古代的戰爭數字（死亡、俘虜、奴隸）大多來自當事人自己的報告或事後作者，誇大是常態，不能和今天有統計、有第三方記錄的數字相提並論。[s1][s4] 羅馬的獨裁官、元老院與公民大會是共和時期的制度，不是今天的議會或總統制。[s2]
