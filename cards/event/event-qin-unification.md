---
id: event-qin-unification
type: event
name: 秦統一
aliases: [秦统一, 秦滅六國, 秦始皇, 始皇帝, Qin unification, Qin's wars of unification, Qin Shi Huang, 書同文車同軌]
civilization: [中國（秦）]
track: china
time:
  start: -230
  end: -221
  precision: exact
  src: [s1, s2]
summary_line: 大事｜宮廷／政治中心｜咸陽｜秦統一
place:
  primary_field: 宮廷／政治中心
  secondary_fields: [戰場]
  locations:
    - { name_ancient: 咸陽, name_modern: 咸陽（中國陝西）, lat: 34.3299, lng: 108.7088, precision: schematic, role: 秦帝國首都（座標為今咸陽市政府）, src: [s4] }
  scale: area
structure_tags: [快速擴張, 標準化量產, 基礎建設網絡, 邊疆防線, 思想異見與審判]
topics: [鑄幣, 統一與中央集權, 諸侯爭霸]
links: [event-shang-yang-reform, event-zhang-qian-west, event-alexander-campaign, event-augustan-principate, war-changping, event-burning-books, event-chen-sheng-wu-guang, building-qin-straight-road, building-terracotta-army]
causes:
  - { id: event-shang-yang-reform, rel: 促成, why: 商鞅變法讓秦國能動員全國人力種田和打仗，國力強盛，成為秦滅六國的基礎。, src: [s1, event-shang-yang-reform:s7] }
  - { id: war-changping, rel: 促成, why: 長平之戰後趙國兵源沒能恢復，東方最強的對手倒下，秦國之後得以逐一消滅六國。, src: [war-changping:s1] }
effects:
  - { id: event-han-inherits-qin, rel: 促成, why: 秦建立的皇帝、郡縣與官僚制度，被漢朝接收沿用並穩定下來，成為後來中國各朝的基礎。, src: [s1, event-han-inherits-qin:s2] }
  - { id: event-burning-books, rel: 背景, why: 統一後秦以法家為官方學說、想統一思想，李斯才建議燒掉六國史書和民間私藏的《詩》《書》。, src: [event-burning-books:s1, event-burning-books:s2] }
  - { id: building-qin-han-great-wall, rel: 促成, why: 統一後秦始皇拆掉各國之間的內牆，派蒙恬北擊匈奴，把北方舊有的防線連起來，成為長城的一部分。, src: [s1, s3] }
counterparts:
  - { id: event-alexander-campaign, note: "相似：十年左右的連續征戰，把原本分立的多個國家併成一個大帝國。不同：亞歷山大死後帝國立刻被部將瓜分；秦朝本身只存在 15 年，但它的郡縣、文字與度量衡被漢朝接收，延續了兩千年。", src: [s1, s3] }
  - { id: event-augustan-principate, note: "相似：結束長期戰亂的統治者建立新的最高稱號（始皇帝；元首），並重新設計全國的行政。不同：奧古斯都保留共和的名義；秦始皇明白宣告廢除分封、自稱皇帝。", src: [s1, s2] }
sources:
  - { id: s1, title: "Qin's wars of unification — Wikipedia", url: "https://en.wikipedia.org/wiki/Qin%27s_wars_of_unification", accessed: 2026-10-24, tier: 百科 }
  - { id: s2, title: "Qin Shi Huang — Encyclopaedia Britannica", url: "https://www.britannica.com/biography/Qin-Shi-Huang", accessed: 2026-10-24, tier: 百科 }
  - { id: s3, title: "Qin Shi Huang — Wikipedia", url: "https://en.wikipedia.org/wiki/Qin_Shi_Huang", accessed: 2026-10-24, tier: 百科 }
  - { id: s4, title: "Xianyang — Wikipedia", url: "https://en.wikipedia.org/wiki/Xianyang", accessed: 2026-10-24, tier: 百科 }
  - { id: s5, title: "李彔：現代化十六講（之五、六）— 虎嗅網", url: "https://www.huxiu.com/article/38101.html", accessed: 2026-10-24, tier: 摘要 }
  - { id: s6, title: "Sapiens 帝國篇章摘要（LitCharts）", url: "https://www.litcharts.com/lit/sapiens/chapter-11-imperial-visions", accessed: 2026-10-24, tier: 摘要 }
  - { id: s7, title: "Sameer Bajaj，Nexus（哈拉瑞《連結》）讀書筆記", url: "https://sameerbajaj.com/nexus/", accessed: 2026-10-25, tier: 摘要 }
  - { id: s8, title: "司馬遷《史記．秦始皇本紀》原文 — 中國哲學書電子化計劃（ctext.org；本環境連線被擋（proxy 403）未能開啟，不作唯一依據；引句經 s9、s10、s12 核對）", url: "https://ctext.org/shiji/qin-shi-huang-ben-ji/zh", accessed: 2026-11-01, tier: 一手 }
  - { id: s9, title: "辛德勇〈辛德勇讀《史記》｜秦始皇是一天批閱一百二十斤公牘麼？〉，澎湃新聞 2026-06-23", url: "https://www.thepaper.cn/newsDetail_forward_33299797", accessed: 2026-11-01, tier: 通論 }
  - { id: s10, title: "司馬遷《史記．秦始皇本紀》議帝號段落（原文、拼音、英譯對照）— UC San Diego 中文教學網頁（D. K. Jordan）", url: "https://pages.ucsd.edu/%7Edkjordan/chin/Symaa/Symaa11.html", accessed: 2026-11-01, tier: 一手 }
  - { id: s11, title: "Names of China — Wikipedia（China 一詞的詞源諸說）", url: "https://en.wikipedia.org/wiki/Names_of_China", accessed: 2026-11-01, tier: 百科 }
  - { id: s12, title: "Sima Qian, The Legalist Policies of the Qin（楊憲益、戴乃迭英譯《史記》選段，收於 Andrea & Overfield, The Human Record）— Columbia University 課程講義 PDF", url: "https://ccnmtl.columbia.edu/services/dropoff/china_civ_temp/week04/pdfs/select1.pdf", accessed: 2026-11-01, tier: 一手 }
importance: 3
learn:
  histories: [中國史]
  why_care: 這是中國第一次由一位「皇帝」和中央派任的官員治理一個大帝國；秦朝雖然很快滅亡，它的制度卻成為後來各朝的基礎。[s1][s3]
  story: |
    嬴政在前 247 年（一說前 246 年）當上秦王。[s2][s3] 前 230 年起，秦國出兵，依序滅了韓、趙、魏、楚、燕、齊，前 221 年統一天下。[s1] 秦國不只靠打仗，也派人收買別國大臣，例如收買趙國的郭開，讓趙王除掉名將李牧。[s1] 統一後，嬴政自稱「始皇帝」，希望後代依序稱二世、三世，一直傳到萬世。[s10] 他廢除分封，把全國分成三十六郡，由中央派官治理；又統一度量衡、車軸寬度、錢幣和文字。[s3][s9] 但他前 210 年死於出巡途中，秦朝也在前 206 年滅亡，只維持了十五年。[s1][s3]
  key_terms:
    - { term: 郡縣制, plain: 中央把全國分成郡、縣，派官員去治理；官員由中央任免，不能世襲。, example: 連鎖店的店長由總公司派任、隨時可以調動，不是店長的兒子接班。 }
    - { term: 分封制, plain: 君主把土地封給親戚和功臣，讓他們世代自己治理。, example: 加盟店老闆自己當家，總公司很難管到店裡的事。 }
    - { term: 始皇帝, plain: 嬴政統一後新創的最高稱號，意思是「第一個皇帝」，後代依序稱二世、三世。, example: 新社團的創社社長，被大家叫作「第一代社長」。 }
    - { term: 統一度量衡, plain: 全國使用同一套長度、容量和重量的單位。, example: 全國會考用同一套評分標準，不會每間學校各用一把尺。 }
  primary_source:
    - text: "一法度衡石丈尺，車同軌，書同文字。（統一衡石〔重量〕、丈尺〔長度〕的標準，車子用同樣的軸距，書寫用同一套文字。）"
      from: 司馬遷《史記》〈秦始皇本紀〉（中文翻譯為本站摘譯）
      src: [s8, s9, s12]
    - text: "朕為始皇帝。後世以計數，二世三世至于萬世，傳之無窮。（我是始皇帝，後代按數字排下去，二世、三世，一直到萬世，永遠傳下去。）"
      from: 司馬遷《史記》〈秦始皇本紀〉（中文翻譯為本站摘譯）
      src: [s8, s10]
  historiography: |
    **暴君還是奠基者？** 漢代以後的儒家史家多半譴責秦始皇；漢初的賈誼在〈過秦論〉中認為秦是亡於自身的失誤，因為「守住天下」和「奪取天下」根本是兩回事。[s3] 20 世紀的評價出現翻轉：馬非百 1941 年的傳記稱秦始皇是「中國史上的大英雄之一」；1949 年後的馬克思主義史學則用階級鬥爭來解釋秦的滅亡。[s3]
    **影響有多長？** 漢學家魯惟一（Michael Loewe）認為，秦始皇的統治開啟了一個到 1911 年才結束的時代。[s3] 維基百科整理的研究也指出，秦建立的中央集權帝國成為後來中國各朝的基礎，漢朝繼承並鞏固了許多秦朝的設計。[s1]
  misconceptions:
    - 「統一」不是談判合併，而是十年戰爭逐一消滅六國；而且戰爭的兵力與死傷數字（例如水淹大梁死者超過十萬人）多半缺乏可靠出處，只能當估計。[s1]
    - 秦朝只存在約十五年，延續下去的是制度，不是王朝。[s1][s3]
  perspectives:
    - { history: 中國史, text: "從中國史看，秦統一結束了戰國分立，建立以皇帝和郡縣為核心的中央集權帝國，成為後來各朝的基礎。[s1][s3]" }
crosscheck: { date: 2026-11-01, by: 獨立查核 agent（未參與寫作）, result: 通過, notes: "s10 UCSD《史記》對照頁可開啟，「朕為始皇帝……傳之無窮」逐字相符；「一法度衡石丈尺，車同軌，書同文字」經 s9 辛德勇文（標明出自〈秦始皇本紀〉）核對，另補 s12 楊憲益英譯選段（Columbia 講義 PDF）。s1–s4 已開啟核對滅六國年份、郭開、王翦 60 萬等。修正：嬴政即位並列前 247（英文維基）／前 246（大英）；story 中「始皇帝」改只引 s10（s1 無此句）；C7 刪除 s1 沒有的「奠定約兩千年疆域」，改為大英「後世各朝的基礎」與魯惟一「到 1911 年」之說；China 詞源補 s11，並列秦、荊、夜郎諸說。保留：水淹大梁 10 萬等數字仍只有 s1。" }
verification: 交叉確認
lens_status: 依公開資料推論，未對照原書
---

## C1 背景

商鞅變法後的秦國國力強盛。嬴政即位為秦王的年份，英文維基百科作前 247 年（依古曆換算），《大英百科》作前 246 年（13 歲即位），兩說並列。[s2][s3] 前 230 年起出兵滅其他六國。[s1]

## C2 經過

依序滅韓（前 230）、趙（前 228）、魏（前 225）、楚（前 223）、燕（前 222）、齊（前 221）。[s1] 前 221 年嬴政稱「始皇帝」，建立秦朝。[s1][s2]

## C3 關鍵人物與群體

秦王嬴政（秦始皇）；李斯與尉繚協助擬定「遠交近攻」的戰略；將領王翦、王賁、李信、蒙恬。[s1][s3] 秦國也派人收買他國大臣，例如收買趙國的郭開去陷害名將李牧、收買齊國丞相后勝讓齊國不救他國。[s1] 燕太子丹派荊軻行刺秦王失敗，秦以此為出兵理由。[s1]

## C4 制度或機制變化

以中央集權取代分封，全國初分 36 郡（後增至 40），下設縣、鄉；官員原則上依能力任命而非世襲。[s1][s3] 統一度量衡、車軸寬度、貨幣（半兩錢）與文字（小篆），修建道路與運河，並把北方各國舊長城連接起來。[s3] 前 213 年起下令焚書（醫藥、農業等書除外）。[s3]

## C5 受益者與受損者

受益：秦王室與中央官僚。[s1][s3] 受損：六國王室與貴族；戰爭中的士兵與平民，例如水淹大梁據說死者超過 10 萬人（多項數字缺乏可靠出處，屬估計）。[s1]

## C6 直接結果

前 221 年統一後繼續向外用兵：前 215 年蒙恬率 30 多萬人北擊匈奴，修築的防線成為長城的一部分（見「秦漢長城」卡）。[s1] 兵力數字方面，前 224 年李信率約 20 萬攻楚大敗，之後王翦率 60 萬才滅楚；資訊框所列雙方總兵力（120 萬對 150 萬）沒有可靠出處。[s1]

## C7 長期影響

始皇前 210 年死於出巡途中；前 206 年秦亡，劉邦後來建立漢朝。[s1][s3] 秦建立的官僚與行政架構，成為後來中國各朝的基礎；漢學家魯惟一認為秦始皇的統治開啟了一個到 1911 年才結束的時代。[s1][s2][s3] 英文「China」一詞的來源，最常見的說法是源自「秦」（Qin），但詞源仍有爭議，另有源自楚國（荊）、西南的夜郎等說法。[s11]

## C8 雙軌解讀

### 李彔

李彔在公開講稿中說，秦、漢開啟了中央集權的「高端政權」，形成跨區域的大帝國，發展水平略低於同期的羅馬，但在東方居於領先 [s5]。

### 哈拉瑞

依公開摘要，哈拉瑞把秦始皇建立的帝國當作「以普世統一為願景」的例子 [s6]；依讀書筆記，他在《連結》中也把秦帝國稱為近代以前最有野心的極權實驗，後來漢朝改用儒家的道德忠誠取代法家式的監控，但仍是專制 [s7]。

## C9 今日對照鉤子

與同時代的西方對照：亞歷山大的帝國在他死後分裂，而秦以統一的行政單位與標準（文字、度量衡）建立能被後世延續的制度骨架。[s1][s3]

## C10 不可類比的差異

秦朝僅存在約 15 年，「延續的是制度而非王朝」。[s1] 統一戰爭的兵力與傷亡數字多半缺乏可靠出處，不宜拿來與其他戰爭精確比較。[s1] 「統一」在當時是以戰爭消滅其他國家，不同於現代經由協商的國家整合。[s1][s2]
