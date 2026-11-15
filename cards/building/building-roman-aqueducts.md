---
id: building-roman-aqueducts
type: building
name: 羅馬水道（含加爾橋）
aliases: [羅馬水道橋, 加爾橋, Roman aqueduct, Pont du Gard, 嘉德水道橋, Aqua Appia, 尼姆水道, 罗马水道, 加尔桥]
civilization: [古羅馬]
track: west
time:
  start: -312
  end: 60
  precision: approx
  src: [s1, s2]
summary_line: 建築｜城市／都會｜羅馬與尼姆｜羅馬水道（含加爾橋）
place:
  primary_field: 城市／都會
  secondary_fields: [工業／製造區]
  locations:
    - { name_ancient: 加爾橋, name_modern: 韋爾-蓬迪加爾（法國）, lat: 43.94725, lng: 4.535291, pleiades_id: "149496", precision: exact, role: 尼姆水道跨越加爾東河的三層橋 }
    - { name_ancient: 內毛蘇斯, name_modern: 尼姆（法國）, lat: 43.84311, lng: 4.354169, pleiades_id: "148142", precision: exact, role: 水道供水的城市 }
    - { name_ancient: 阿庇亞水道, name_modern: 羅馬（義大利）, lat: 41.88898, lng: 12.50443, pleiades_id: "423562", precision: exact, role: 前 312 年羅馬第一條水道 }
    - { name_ancient: 克勞狄亞水道, name_modern: 羅馬（義大利）, lat: 41.86615, lng: 12.53965, pleiades_id: "423563", precision: exact, role: 帝國時期的大水道之一 }
  scale: line
structure_tags: [基礎建設網絡, 公共工程支出, 技術代差, 單一港口依賴]
topics: [運河與水利, 古代建築]
links: [building-via-appia, commodity-roman-concrete, building-colosseum]
causes:
  - { id: commodity-roman-concrete, rel: 背景, why: 第一條水道（前 312 年）比混凝土普及（約前 150 年起）還早；後來的水道渠道才常用石、磚和混凝土來蓋，所以只算背景。, src: [s1, "commodity-roman-concrete:s1"] }
counterparts:
  - { id: building-dujiangyan, note: "相似：國家投入的大型水利工程，靠重力與精確的地形判斷運作，長期持續維護。不同：羅馬水道把水送進城市；都江堰不築壩，把岷江分流灌溉整個成都平原，至今仍在使用。", src: [s1, s5] }
sources:
  - { id: s1, title: "Roman aqueduct — Wikipedia", url: "https://en.wikipedia.org/wiki/Roman_aqueduct", accessed: 2026-10-24, tier: 百科 }
  - { id: s2, title: "Pont du Gard — Wikipedia", url: "https://en.wikipedia.org/wiki/Pont_du_Gard", accessed: 2026-10-24, tier: 百科 }
  - { id: s3, title: "Pont du Gard (Roman Aqueduct) — UNESCO World Heritage Centre", url: "https://whc.unesco.org/en/list/344", accessed: 2026-10-24, tier: 通論 }
  - { id: s5, title: "Dujiangyan — Wikipedia", url: "https://en.wikipedia.org/wiki/Dujiangyan", accessed: 2026-10-25, tier: 百科 }
  - { id: s6, title: "弗朗提努斯《論羅馬城的供水》（Frontinus, De aquaeductu）1.1、1.5、1.16，Bennett 英譯（Loeb 1925，公有領域）— ToposText", url: "https://topostext.org/work/686", accessed: 2026-11-12, tier: 一手 }
  - { id: s7, title: "李維《羅馬史》9.29（Livy, Ab urbe condita），Perseus 英譯", url: "https://fgh.perseids.org/read/latinLit/phi0914/phi001/perseus-eng3/9.29.1-9.29.6", accessed: 2026-11-12, tier: 一手 }
  - { id: s8, title: "Lead pipes did contaminate water supplies, but not enough to cause severe poisoning — Chemistry World（報導 Delile 等人研究）", url: "https://www.chemistryworld.com/research/lead-piping-unlikely-to-have-poisoned-romans/7279.article", accessed: 2026-11-12, tier: 通論 }
  - { id: s9, title: "Frontinus — WaterHistory.org（引 Bennett 譯「idle Pyramids」一句）", url: "https://waterhistory.org/histories/frontinus", accessed: 2026-11-12, tier: 通論 }
importance: 2
learn:
  histories: [希臘羅馬史]
  why_care: 羅馬人把水從幾十公里外送進城，靠的不是幫浦而是一點點坡度；而且第一手報告告訴我們，水道大部分是埋在地下、你根本看不到的。[s1][s6]
  story: |
    前 312 年，羅馬的監察官阿庇烏斯·克勞狄烏斯同時修了一條路和一條水道，這是羅馬的第一條水道。[s1][s7] 水完全靠地勢一路往下流，不用幫浦。[s1] 很多人以為水道就是高高的拱橋，但弗朗提努斯記錄：這條阿庇亞水道長 11,190 羅馬步（約 16.5 公里），其中 11,130 步在地下，只有約六十步在地面上。[s6] 只有遇到山谷才需要橋，例如法國的加爾橋，三層拱高約 48.8 公尺。[s2][s3] 水進城後，先供應公共噴泉和浴場，最後才是付費的私人用戶。[s1] 西元 97 年，弗朗提努斯被任命為水道長官，寫下《論羅馬城的供水》。[s1][s6] 他很自豪地說，拿這些水道去比埃及金字塔和希臘那些有名卻沒用的工程吧。[s6][s9] 到 3 世紀，羅馬城有 11 條國家出資的水道。[s1]
  key_terms:
    - { term: 監察官（censor）, plain: 羅馬負責調查公民戶口與財產、也主持公共工程發包的高級官員。, example: 像同時管戶政和公共工程發包的官員。 }
    - { term: 羅馬步（passus）, plain: 羅馬人量距離的單位，左右腳各跨一次算一步，約 1.48 公尺；一千步是一羅馬里。, example: "11,190 步大約是 16.5 公里。" }
    - { term: 重力輸水, plain: 不用幫浦，只靠水道一路微微向下的坡度讓水流動。, example: 像把水管斜放，水自己會從高處流到低處。 }
    - { term: 水道橋（拱橋）, plain: 遇到山谷時，把水道架在一排拱上跨過去；它只是整條水道的一小部分。, example: 像高速公路大部分在地面，遇到河才架橋。 }
    - { term: 虹吸管, plain: 遇到深谷時，水道用管子先往下再往上，靠壓力把水送過山谷。, example: 像 U 形的管子，兩端水位差不多時水能自己過去。 }
    - { term: 水道長官, plain: 皇帝任命、負責檢修水道、管理供水與防止偷水的官員，弗朗提努斯就當過。, example: 像今天的自來水公司總經理，但是由皇帝直接派任。 }
    - { term: 鈣化沉積, plain: 水裡的礦物在管壁上結成硬殼，會讓水道變窄，要定期清除。, example: 像水壺裡的水垢。 }
  primary_source:
    - text: "compare, if you will, the idle Pyramids or the useless, though famous, works of the Greeks!（你不妨拿閒置的金字塔，或希臘人那些有名卻沒用的工程來比比看！）"
      from: 弗朗提努斯《論羅馬城的供水》1.16（Bennett 英譯；ToposText 與 WaterHistory.org 兩處引文核對；中文為本站摘譯）
      src: s6
    - text: 弗朗提努斯記阿庇亞水道的長度：從水源到三門（Porta Trigemina）旁的鹽場共 11,190 步，其中 11,130 步在地下；地面上約六十步靠墩台，靠近卡佩納門的地方用拱。（轉述大意，不是逐字翻譯）
      from: 弗朗提努斯《論羅馬城的供水》1.5（Bennett 英譯，ToposText）
      src: s6
  historiography: |
    **每天到底送來多少水？** 古人沒有留下「每天幾立方公尺」的紀錄，數字是現代學者拿弗朗提努斯的管徑資料換算的：高的估到每天約 100 萬立方公尺，保守的估 52 萬到 63.5 萬立方公尺，相差近一倍，只能當估計。[s1]
    **鉛管有沒有害死羅馬人？** 1980 年代，學者尼里亞古（Jerome Nriagu）主張鉛中毒是羅馬衰落的重要推力（2014 年的報導說這是「三十年前」的事），但其他學者不接受它是唯一原因。[s8] 2014 年德利爾（Hugo Delile）的團隊比對台伯河河床沉積物和五段古水管的鉛同位素，認為鉛管讓水裡的鉛最多增加到約一百倍（和當地泉水相比），卻不太可能造成重大健康風險。[s8][s1]
  misconceptions:
    - 「羅馬水道都是高高的拱橋。」第一條水道全長 11,190 步，11,130 步在地下；到 3 世紀，羅馬城 11 條水道的渠道合計約 780–800 公里，架在地面上的只有約 47 公里。[s6][s1]
    - 「水是人人免費用的。」水先供應公共噴泉和浴場，最後才是付費的私人用戶；只有少數人因國家榮譽獲得免費用水。[s1]
  pop_culture:
    - { claim: "常見說法：羅馬人喝鉛水管的水慢慢中毒，帝國因此滅亡。", fact: "2014 年的研究認為鉛管確實讓水中鉛含量升高（最多約為當地泉水的百倍），但不太可能構成重大健康風險；「鉛中毒拖垮羅馬」的說法，其他學者也不接受它是唯一原因。[s8][s1]", src: [s8, s1] }
    - { claim: "常見畫面：羅馬水道就是一排排高大的拱橋。", fact: "弗朗提努斯記錄第一條水道 11,190 步中有 11,130 步在地下；拱橋只在跨越山谷時出現，加爾橋是著名的例子。[s6][s2]", src: [s6, s2] }
crosscheck:
  date: 2026-11-14
  by: 獨立查核 agent（歷史學者＋教育者，未參與寫作）
  result: 通過
  notes: "1) 重開 s6（ToposText，Bennett 1925 英譯）：1.5 阿庇亞水道全長 11,190 步、地下 11,130 步、地面約 60 步靠墩台，近卡佩納門處用拱，數字相符；原卡「只有六十步架在墩台上」漏了拱，已改。弗朗提努斯稱建造者為「Appius Claudius Crassus」（後來才有「盲者」Caecus 的外號），卡片用通行的名字，不改。1.16「idle Pyramids」一句逐字相符；1.1 涅爾瓦任命他為水道長官，相符。2) 補「羅馬步」的解釋（複步約 1.48 公尺，11,190 步約 16.5 公里；這是查核者的換算，不是史料數字）。3) 重開 s1：前 312 年監察官阿庇烏斯·克勞狄烏斯·凱庫斯、3 世紀 11 條水道、渠道合計 780–800 公里且只有約 47 公里在地面上（已補，正好支持「不是都是拱橋」）、每日供水高估 100 萬立方公尺而保守估 52 萬–63.5 萬（都是現代學者依弗朗提努斯推估，已寫明）、用水順序（公共噴泉→公共浴場→付費私人用戶，少數富人獲免費用水作為榮譽）、「expensive yet necessary luxury」、537 年東哥德人切斷水道與賈尼科洛磨坊、鉛含量約為當地泉水的 100 倍但不太可能真正有害，都相符。D2「共和時期資金來自國家」原文是監察官／市政官負責，已照原文改寫。4) 重開 s8（Chemistry World）：最多兩個數量級、不太可能構成重大健康風險、「三十年前」Nriagu、其他學者不接受是唯一原因、台伯河河床沉積物加五段古水管，相符；報導沒寫期刊與年份，也沒說百倍是和什麼比，基準（當地泉水）改引 s1。原「約三十年前」是照抄 2014 年的報導，改成「1980 年代」。5) Delile 等人論文（PNAS 2014）本輪沒有開原文，只在搜尋結果看到題名與 HAL、PMC 的存檔；卡片仍只引報導與維基。6) 因果：水道 ← 混凝土原本就是「背景」，但第一條水道比混凝土普及還早，why 已改寫清楚。7) 未重開：s2（Pont du Gard：48.8 公尺、約 40–60 年、50 公里、坡度 1/3000、主拱 24.52 公尺、每日約 4 萬立方公尺、6 世紀停用，與查核者所知的條目內容一致）、s3、s5、s7（李維 9.29，與查核者所知原文 viam munivit et aquam in urbem duxit 一致）、s9。限制：WebFetch 全輪 15 次（1 次失敗），摘要工具只回短引文。"
verification: 交叉確認
lens_status: 無直接論述
---

## D1 功能與象徵

水道把遠方水源靠重力引入城市，供應公共噴泉、公共浴場，最後才是付費的私人用戶；有些富人獲得免費用水作為國家榮譽。[s1] 對各地城市來說，水道是展現城市地位的「昂貴卻必要的奢侈」。[s1]

## D2 建造者與資金

羅馬第一條水道「阿庇亞水道」由監察官阿庇烏斯．克勞狄烏斯．凱庫斯在前 312 年下令興建（與亞壁古道同一人、同一年）。[s1] 共和時期水道由監察官（沒有監察官時由市政官）負責，帝國時期改由皇帝負責，奧古斯都設了水道長官；行省的水道常由地方菁英監造、出資。[s1] 李維把前 312 年阿庇烏斯的公共工程記為一條路與一條水道。[s7]

## D3 技術與材料

完全依靠重力：渠道多半埋在地下、保持微小坡度，以石、磚、混凝土或鉛管建造；遇到山谷則用虹吸管或橋。[s1] 弗朗提努斯記錄第一條水道長 11,190 羅馬步（約 16.5 公里），其中 11,130 步在地下，因此拱橋只是少數路段。[s6] 尼姆水道全線平均坡度約 1/3000（每公里約 33 公分）。[s2] 加爾橋以精準切割的石灰岩塊靠摩擦與重力疊合、不用灰漿；底層主拱特別加寬（24.52 公尺），橋墩前方有導流設計以應付河水暴漲。[s2][s3]

## D4 規模與數據

- 到 3 世紀，羅馬城有 11 條國家出資的水道，渠道總長約 780–800 公里，其中約 47 公里架在地面上；現代學者依弗朗提努斯的數字推估，每日供水約 52 萬–100 萬立方公尺。[s1]
- 加爾橋約完成於西元 40–60 年，三層拱，高約 48.8 公尺；所屬水道全長約 50 公里（直線距離僅約 20 公里），每日估計輸水約 4 萬立方公尺。[s2][s3]

## D5 維護與後世命運

維護包括檢修孔、巡查受保護的沿線地帶、清除碎屑與鈣化沉積；西元 97 年出任水道長官的弗朗提努斯寫下《論羅馬城的供水》，記錄供水問題與弊端。[s1][s6] 537 年哥德人圍攻羅馬時切斷水道，連賈尼科洛山上的水力磨坊也停擺。[s1] 加爾橋約在 6 世紀停用，但因被當作收費橋而大致保存下來，1985 年列入世界遺產。[s2][s3]

## D6 雙軌解讀

### 李彔

無直接論述。

### 哈拉瑞

無直接論述：目前查到的公開摘要與書評，沒有哈拉瑞專門談羅馬水道的內容。

## D7 今日對照鉤子

「城市的生活品質依賴少數幾條長距離供水線，一旦被切斷就立刻癱瘓」（537 年圍城）；以及「公共、商業、私人用水的優先順序」如何分配的治理問題。[s1]

## D8 不可類比的差異

羅馬水道是持續流動、沒有大型水庫調節的系統，也沒有今日的淨水與計量技術；供水量只是根據古代數字的推估。[s1]
