---
id: war-seven-states-rebellion
type: war
name: 七國之亂（前154年）
aliases: [七國之亂, 七国之乱, 吳楚七國之亂, 吴楚七国之乱, 吳王劉濞, 劉濞, 晁錯, 鼂錯, 削藩, 削藩策, 周亞夫, 清君側, Rebellion of the Seven States, Revolt of the Seven States, Liu Pi, Chao Cuo, Zhou Yafu]
aliases_main: [吳楚七國之亂, 削藩, Rebellion of the Seven States]
civilization: [中國（西漢）]
track: china
time:
  start: -154
  end: -154
  precision: exact
  src: [s1, s2]
summary_line: 戰爭｜戰場｜梁國睢陽（今河南商丘）一帶｜七國之亂（前154年）
place:
  primary_field: 戰場
  secondary_fields: [宮廷／政治中心]
  locations:
    - { name_ancient: 睢陽（梁國都城）, name_modern: 商丘（中國河南）, lat: 34.41, lng: 115.65, precision: schematic, role: "梁王堅守、拖住吳楚主力的城市", src: [s1, s2] }
    - { name_ancient: 廣陵（吳國都城）, name_modern: 揚州（中國江蘇）, lat: 32.39, lng: 119.42, precision: schematic, role: "吳王劉濞起兵之地（示意）", src: [s2] }
  scale: area
structure_tags: [附庸反叛, 補給線過長, 精英內鬥]
topics: [內戰, 統一與中央集權, 鑄幣]
links: [event-han-inherits-qin, war-chu-han, commodity-wuzhu-coin, commodity-salt-iron, war-han-xiongnu]
causes:
  - { id: event-han-inherits-qin, rel: 促成, why: "漢初在東方封了許多半自治的諸侯王國，王國勢力坐大；朝廷削減王國土地時，最大的一次反叛就是七國之亂。", src: [s1, s3, "event-han-inherits-qin:s1"] }
  - { id: war-chu-han, rel: 背景, why: "劉邦打敗項羽、建立漢朝後，把大片土地封給劉氏親屬當諸侯王，想靠宗室鞏固統治，留下強大的東方王國。", src: [s1] }
effects:
  - { id: commodity-wuzhu-coin, rel: 背景, why: "亂前諸侯經朝廷允許可自行鑄錢，吳國靠銅與鹽致富而能起兵；亂後王國權力一步步縮小，到武帝時鑄幣權也收歸中央。", src: [s1, "commodity-wuzhu-coin:s1"], disputed: true }
counterparts: "無適當對照：西方軌目前沒有「中央削減宗室諸侯封地、引發聯合叛亂並在數月內平定」的對應卡片，不硬湊。"
sources:
  - { id: s1, title: "Rebellion of the Seven States — Wikipedia", url: "https://en.wikipedia.org/wiki/Rebellion_of_the_Seven_States", accessed: 2026-11-02, tier: 百科 }
  - { id: s2, title: "七国之乱 — 維基百科", url: "https://zh.wikipedia.org/wiki/%E4%B8%83%E5%9B%BD%E4%B9%8B%E4%B9%B1", accessed: 2026-11-02, tier: 百科 }
  - { id: s3, title: "北京大學 edX 課程（PekingX 02132750x）講義〈秦始皇及其遺產〉第 3 部分（含「漢初王國問題」「削藩與七國之亂」）", url: "https://courses.edx.org/asset-v1:PekingX+02132750x+2015T1+type@asset+block/3%E7%A7%A6%E5%A7%8B%E7%9A%87%E5%8F%8A%E5%85%B6%E9%81%97%E4%BA%A7-3.pdf", accessed: 2026-11-02, tier: 學術 }
  - { id: s4, title: "誅鼂錯 — 漢典（zdic.net）", url: "https://www.zdic.net/hant/誅鼂錯", accessed: 2026-11-02, tier: 百科 }
importance: 2
summary_card: true
learn:
  histories: [中國史]
  why_care: 「清君側」這個藉口後來被中國歷史上的叛軍一用再用；它最早的著名例子，就是漢朝皇帝的親戚聯手造反的這場內戰。
  story: |
    劉邦建立漢朝後，把東方大片土地封給劉家親戚當諸侯王。[s1] 幾十年後，這些王國越來越強，其中吳國有銅有鹽，吳王劉濞富可敵國。[s1][s2] 漢景帝的大臣晁錯主張削減諸侯的封地，他認為：「削之亦反，不削亦反」，早削禍小，晚削禍大。[s3] 前 154 年，朝廷真的削了楚、趙、膠西、吳等國的土地，吳王便聯合七國，以「誅晁錯，清君側」為口號起兵。[s1][s2] 景帝在朝臣壓力下殺了晁錯，叛軍卻沒有退兵。[s2] 大將周亞夫不和叛軍正面硬拚，讓梁國死守睢陽拖住吳楚主力，再派輕騎截斷他們的糧道。叛軍斷糧潰散，三個月就被平定。[s1][s2]
  key_terms:
    - { term: 削藩, plain: 中央政府削減諸侯王的封地和權力。, example: 像學校收回各社團自己管的社辦和經費。 }
    - { term: 清君側, plain: 叛軍說自己不是反皇帝，只是要清除皇帝身邊的「壞人」。, example: 像說「我不是要反班長，只是要把班長身邊亂出主意的人換掉」。 }
    - { term: 郡國並行, plain: 漢初西部設郡由中央直轄、東部封給諸侯王的雙軌制度。, example: 一半直營店、一半加盟店的連鎖店。 }
  primary_source:
    - { text: "削之亦反，不削亦反。削之，其反亟，禍小；不削之，其反遲，禍大！", from: "晁錯〈削藩策〉（引自北京大學 edX 課程講義，簡體轉繁體）", src: s3 }
  historiography: |
    **晁錯削藩是對還是錯？** 司馬遷在《史記》的評語中批評晁錯「刻削諸侯」而且「不以漸」，太急太猛，才逼反了諸侯。[s2] 但晁錯自己的看法是：諸侯遲早會反，早削禍小、晚削禍大。[s3] 維基百科的評估則指出，叛軍如果成功，漢朝很可能變成鬆散的諸國聯盟。[s1]
    **郡國並行是什麼性質？** 北京大學課程講義引述陳蘇鎮的看法，認為漢初郡國並行的本質可能是「東西異制」：允許或默許東方王國不用漢法、從俗而治。[s3]
  misconceptions:
    - 殺了晁錯並沒有換來和平：吳王真正的目的不在晁錯，叛軍照樣進攻，最後是靠周亞夫用兵才平定。[s2]
crosscheck:
  date: 2026-11-02
  by: 獨立查核 agent（未參與寫作）
  result: 通過
  notes: "核對 s1、s2、s3：下棋改為 s1 的六博，「傳統史家」改為 s2 所引司馬遷評語，s3 講義未寫的「雙軌制度總爆發」刪去並註明「東西異制」引自陳蘇鎮，晁錯引文出處刪去講義未標的《史記》《漢書》。s4 漢典因抓取額度用盡未開啟；吳都廣陵座標為示意（s2 未寫）；五銖錢後果屬推論，維持 disputed。"
verification: 交叉確認
lens_status: 無直接論述
---

## A1 交戰方與聯盟結構

叛方是吳、楚、趙、膠東、膠西、濟南、菑川七個諸侯王國，以吳王劉濞為首。[s2] 朝廷方面是漢景帝，主將周亞夫、竇嬰；景帝的弟弟梁王劉武守住都城睢陽，成為抵擋叛軍的關鍵。[s1][s2]

## A2 起因：結構與導火線

**結構**：劉邦把大量土地封給劉氏親屬當諸侯王，漢初形成西部設郡、東部封國的「郡國並行」。[s1][s3] 文帝時諸侯經允許可以自己鑄錢；吳國有豐富的銅和鹽，百姓不必繳稅，財力雄厚。[s1][s2] 吳國的太子劉賢還曾在玩六博棋時起爭執，被當時的太子（後來的景帝）打死，雙方早有嫌隙。[s1]

**導火線**：御史大夫晁錯上〈削藩策〉，景帝採納，以諸侯過去的罪過為由，削減楚、趙、膠西、吳等國的封地，吳王於是聯合各國，以誅殺晁錯為名起兵。[s1][s2][s3][s4]

## A8 結果

叛亂約三個月就被平定：叛軍斷糧潰散，吳王劉濞出逃後被殺，楚王自殺。[s1] 戰後景帝規定諸侯王不得治理封國，王國的行政與官員任免歸中央，「王國與郡幾同」。[s2]

## A9 長期影響

在景帝、武帝兩代，諸侯王的權力與封地被一步步縮小，中央皇權大為加強。[s1][s2] 若叛軍得勝，漢朝可能會變成一個鬆散的諸國聯盟。[s1]
