---
id: event-han-inherits-qin
type: event
name: 漢承秦制（劉邦建漢）
aliases: [汉承秦制, 劉邦建漢, 刘邦建汉, 漢高祖, 汉高祖, Emperor Gaozu of Han, Han dynasty founding, 郡國並行, 七國之亂, 蕭何律]
civilization: [中國（西漢）]
track: china
time:
  start: -202
  end: -145
  precision: approx
  src: [s1, s2]
summary_line: 大事｜宮廷／政治中心｜長安｜漢承秦制（劉邦建漢）
place:
  primary_field: 宮廷／政治中心
  locations:
    - { name_ancient: 長安, name_modern: 西安（中國陝西）, lat: 34.30833, lng: 108.85833, precision: schematic, role: 西漢首都（座標為今西安）, src: [s1, s3] }
  scale: area
structure_tags: [制度包裝延續, 合法性危機, 慢變結構, 精英內鬥]
topics: [統一與中央集權, 儒家]
links: [war-chu-han, event-qin-unification, event-confucian-orthodoxy, building-han-changan]
causes:
  - { id: war-chu-han, rel: 直接引發, why: 劉邦在楚漢戰爭中打敗項羽，前 202 年稱帝，國號「漢」就來自項羽封給他的漢中。, src: [s1] }
  - { id: event-qin-unification, rel: 促成, why: 秦建立了皇帝、郡縣和官僚制度，漢初政府沒有現成的辦法，只好採用前朝的政府機構。, src: [s2, s12] }
  - { name: 蕭何收取秦朝律令圖書（前 206 年）, rel: 促成, why: 劉邦進咸陽時，蕭何搶先收藏秦朝的法令和檔案，後來由他編定的漢律，許多條文都來自秦律。, src: [s6, s13, s1] }
effects:
  - { id: building-han-changan, rel: 促成, why: 漢朝建立後以長安為都，蕭何把秦的興樂宮改建為長樂宮，又興建未央宮、武庫和糧倉。, src: [s1, building-han-changan:s1] }
  - { name: 七國之亂（前 154 年）, rel: 促成, why: 漢初在東方封了許多半自治的諸侯王國，王國勢力坐大後多次反叛，最大的一次就是七國之亂。, src: [s1] }
counterparts:
  - { id: event-augustan-principate, note: "相似：新統治者實際上沿用前一個體制的權力機器，卻刻意包裝成與「名聲不好的前任」不同（漢朝說自己寬厚、與暴秦不同；奧古斯都說自己恢復了共和）。不同：漢朝延續的是秦的皇帝集權體制；奧古斯都延續的是共和的名義與官職，實質上建立了君主制。", src: [s1, s2] }
sources:
  - { id: s1, title: "Han dynasty — Wikipedia", url: "https://en.wikipedia.org/wiki/Han_dynasty", accessed: 2026-10-25, tier: 百科 }
  - { id: s2, title: "Denis C. Twitchett, China: Prelude to the Han — Encyclopaedia Britannica", url: "https://www.britannica.com/place/China/Prelude-to-the-Han", accessed: 2026-10-25, tier: 百科 }
  - { id: s3, title: "Chang'an — Wikipedia", url: "https://en.wikipedia.org/wiki/Chang%27an", accessed: 2026-10-24, tier: 百科 }
  - { id: s4, title: "李彔《現代化十六講》之九（現代化有沒有可能在中國誕生），虎嗅 2014", url: "https://www.huxiu.com/article/38364.html", accessed: 2026-10-25, tier: 摘要 }
  - { id: s5, title: "Sameer Bajaj，Nexus（哈拉瑞《連結》）讀書筆記", url: "https://sameerbajaj.com/nexus/", accessed: 2026-10-25, tier: 摘要 }
  - { id: s6, title: "司馬遷《史記．蕭相國世家》原文 — 中國哲學書電子化計劃（ctext.org；本環境連線被擋（proxy 403）未能開啟，不作唯一依據；引句經 s7、s13 轉引核對）", url: "https://ctext.org/shiji/xiao-xiang-guo-shi-jia/zh", accessed: 2026-11-01, tier: 一手 }
  - { id: s7, title: "〈「圖書」一詞是怎來的？古書也有圖嗎？〉，當代中國（中國文化研究院），2024-07-29", url: "https://www.ourchinastory.com/cn/amp/12468", accessed: 2026-11-01, tier: 通論 }
  - { id: s8, title: "Nine Chapter Law — Wikipedia", url: "https://en.wikipedia.org/wiki/Nine_Chapter_Law", accessed: 2026-11-01, tier: 百科 }
  - { id: s9, title: "Xiao He — Wikipedia", url: "https://en.wikipedia.org/wiki/Xiao_He", accessed: 2026-11-01, tier: 百科 }
  - { id: s10, title: "約法三章 — 中文維基百科", url: "https://zh.wikipedia.org/wiki/约法三章", accessed: 2026-11-01, tier: 百科 }
  - { id: s11, title: "賀海仁〈如何理解漢承秦制——反秦承秦　為法立經〉，《甘肅社會科學》2023 年第 1 期 — 愛思想轉載", url: "https://www.aisixiang.com/data/140352.html", accessed: 2026-11-01, tier: 學術 }
  - { id: s12, title: "Qin Shi Huang — Encyclopaedia Britannica", url: "https://www.britannica.com/biography/Qin-Shi-Huang", accessed: 2026-11-01, tier: 百科 }
  - { id: s13, title: "舒嬅〈蕭何與漢代皇家圖書館〉，原載《學習時報》— 中國作家網轉載（引《史記．蕭相國世家》）", url: "https://www.chinawriter.com.cn/n1/2024/0506/c442005-40229569.html", accessed: 2026-11-01, tier: 通論 }
importance: 3
learn:
  histories: [中國史]
  why_care: 漢朝嘴上和「暴秦」劃清界線，實際上接收了秦的政府機構和法律；這套秦開創、漢延續的中央集權體制，成為後來中國王朝的基本架構。[s1][s2][s12]
  story: |
    秦始皇一死，秦朝很快崩潰。劉邦在楚漢相爭中打敗項羽，前 202 年稱帝，以長安為都，國號「漢」來自項羽封給他的漢中。[s1] 早在攻進秦都咸陽時，劉邦和多數部下忙著搶財寶，蕭何卻先趕到丞相府，把秦朝的官方檔案收起來。[s6][s9][s13] 漢朝建立後，蕭何編定漢律；出土竹簡顯示，許多條文都是從秦律來的。[s1] 漢初君臣不想被說成「用一個暴政換掉另一個暴政」，在形象上強調寬厚，實際上卻沿用了秦的政府機構。[s2] 地方上，漢初西部設郡直轄、東部封給諸侯王；經過前 154 年的七國之亂，王國的權力才一步步收回中央。[s1]
  key_terms:
    - { term: 漢承秦制, plain: 漢朝繼承秦朝的皇帝制度、官僚機構和法律，再做調整。, example: 新校長上任說要大改革，結果校規和行政流程大多照用前任的。 }
    - { term: 郡國並行, plain: 一部分地方設郡由中央直接管，一部分封給諸侯王半自治。, example: 有些社團由學務處直接管，有些交給學長姐自己經營。 }
    - { term: 律令, plain: 國家正式公布的法律條文和命令。, example: 學校的校規手冊和公告。 }
    - { term: 七國之亂, plain: 前 154 年七個諸侯王國聯合起兵反抗中央，是漢初最大的王國叛亂。, example: 幾個社團聯合抗議學校收回社辦。 }
  primary_source:
    - text: "何獨先入收秦丞相御史律令圖書藏之。（〔劉邦進咸陽時，〕只有蕭何搶先進去，把秦朝丞相、御史府的法令和圖籍檔案收藏起來。）"
      from: 司馬遷《史記》〈蕭相國世家〉（中文翻譯為本站摘譯）
      src: [s6, s7, s13]
  historiography: |
    **漢朝真的比秦朝寬厚嗎？** 漢代學者賈誼把秦描寫成殘暴的政權。[s1] Denis Twitchett 在《大英百科》中則認為，高祖的政府「不得不採用」名聲不好的前朝的政府機構，可能還有許多做法；他也提醒，後世史家筆下秦朝的嚴刑峻法，可能受到後來政治偏見的影響。[s2] 維基百科整理的出土竹簡研究也顯示，蕭何編的漢律許多條文源自秦律。[s1]
    **繼承了什麼、改了什麼？** 維基百科整理認為，漢朝照搬秦的中央集權行政，但更強調任用賢能與德行。[s1] 《漢書．刑法志》則記載，「三章之法」不足以管住壞人，蕭何於是從秦法中挑選合用的條文，重新制定律令。[s8][s11] 法學者賀海仁把這稱為「秦法悖論」：漢朝在法律與政體上延續秦制，話語上卻以批判秦朝為主；漢朝後來「引經入法」，把儒家經義放進法律，形成儒法共治。[s11]
  misconceptions:
    - 劉邦入咸陽時「約法三章」、宣布廢除秦法，但漢朝建立後的法律其實大量沿用秦律。[s1][s8][s10]
    - 漢初並沒有全部照搬秦的郡縣：東部三分之二是半自治的王國，前 145 年後王國才失去自行任命官員的權力。[s1]
  perspectives:
    - { history: 中國史, text: "從中國史看，漢朝接收了秦的政府機構與法律，再慢慢收回諸侯王國的權力，讓秦開創的中央集權帝國穩定下來。[s1][s2]" }
crosscheck: { date: 2026-11-01, by: 獨立查核 agent（未參與寫作）, result: 通過, notes: "ctext 打不開。蕭何引文經 s7、s13 核對出自〈蕭相國世家〉；補 s11 賀海仁《甘肅社會科學》2023 論文（學術，可開啟），核對《漢書．刑法志》「三章之法不足以禦姦……作律九章」與「漢承秦制」詮釋，並加入 historiography 作為第三種看法。s1、s2、s8、s9、s10 已開啟：漢中得名、13 郡／10 國、前 196、前 154、前 145、張家山秦律淵源、西元 2 年首次普查人數均相符；大英「避免被說成以暴易暴」「不得不採用前朝機構」相符。修正：C7 與 why_care 的「兩千年基本架構」s1、s2 都沒寫，改引大英〈秦始皇〉條「後世各朝的基礎」（s12）。" }
verification: 交叉確認
lens_status: 依公開資料推論，未對照原書
---

## C1 背景

秦朝在前 221 年統一，但秦始皇前 210 年一死，政權幾乎撐不下去；各地起事演變成大規模戰爭，出身平凡的劉邦最後勝出（見「楚漢戰爭」卡）。[s1][s2]

## C2 經過

前 202 年劉邦在垓下擊敗項羽後稱帝（漢高祖，在位前 202–前 195），以長安為都。[s1] 國號「漢」來自項羽當初封給他的漢中。[s1]

## C3 關鍵人物與群體

漢高祖劉邦；蕭何（制定漢律）；高祖死後主導朝政的呂后；漢文帝（前 180–前 157 在位）。[s1][s2]

## C4 制度或機制變化

- **沿用秦的機器**：《大英百科》說高祖的政府「不得不採用」名聲不好的前朝的政府機構，可能還有許多做法，因為一個能讓全國服從的中央政府還在試驗中。[s2] 維基百科說漢朝照搬秦的中央集權行政，但更強調任用賢能與德行。[s1]
- **法律**：蕭何（卒於前 193）編定漢律；張家山與睡虎地出土的竹簡顯示，許多條文源自秦律；漢初的肉刑也沿自秦律，後來才改為較輕的笞刑。[s1]
- **郡與國並存**：漢初西部約三分之一由中央直轄 13 個郡，東部三分之二是 10 個半自治的王國；到前 196 年，除長沙王外，各王都換成劉氏宗室。[s1]

## C5 受益者與受損者

受益：劉氏宗室與功臣。[s1] 受損：異姓諸侯王，以及後來被削權的宗室諸侯王。[s1]

## C6 直接結果

諸侯王多次反叛，最大的是前 154 年的七國之亂；前 145 年朝廷改革王國，把王國的土地分成新的郡由中央直轄，諸侯王失去自行任命官員的權力，只是名義上的封君，保留一部分稅收。[s1]

## C7 長期影響

秦建立的官僚與行政架構成為後來中國各朝的基礎，漢朝的延續讓這套體制穩定下來。[s1][s11][s12] 西元 2 年的全國普查記錄 57,671,400 人、12,366,470 戶，是中國史上第一次全國人口普查。[s1]

## C8 雙軌解讀

### 李彔

李彔在公開講稿中說，自漢代建立帝國以後，中國的王權體制逐步成為當時世界上最發達、最穩固的政權，兩千多年變化不大；在這種體制下，政府不可能不介入經濟 [s4]。

### 哈拉瑞

依讀書筆記，哈拉瑞在《連結》中說，漢朝重新統一後採取比秦寬鬆的做法：皇帝的權力沒有法律限制，但不去微觀管理百姓日常生活，並以儒家的個人道德忠誠取代法家式的監控；漢朝也像羅馬一樣，中央直轄一部分地區，其他交給地方貴族與社群 [s5]。

## C9 今日對照鉤子

「換招牌、不換機器」：新政權為了和前朝劃清界線，在形象上強調寬厚，實際上仍需要前朝的行政機器與法律。[s1][s2] 也可思考：中央與地方分權的妥協（郡國並行）如何在幾十年內一步步收回。[s1]

## C10 不可類比的差異

漢初的「王國」是皇帝分封給宗室的世襲領地，不是現代聯邦制下有憲法保障的州；收回王國權力靠的是皇帝的命令與平叛戰爭。[s1] 「漢朝寬厚、秦朝暴虐」的對比本身也帶有後世史家的立場。[s2]
