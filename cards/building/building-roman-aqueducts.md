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
    - { name_ancient: 克勞狄亞水道, name_modern: 羅馬（義大利）, lat: 41.86615, lng: 12.53965, pleiades_id: "423563", precision: exact, role: 羅馬四大水道之一 }
  scale: line
structure_tags: [基礎建設網絡, 公共工程支出, 技術代差, 單一港口依賴]
topics: [運河與水利, 古代建築]
links: [building-via-appia, commodity-roman-concrete, building-colosseum]
causes:
  - { id: commodity-roman-concrete, rel: 背景, why: 水道的渠道可以用石、磚或混凝土建造，水下與防水的工程需要混凝土這種材料技術。, src: [s1] }
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
learn:
  histories: [希臘羅馬史]
  why_care: 羅馬人把水從幾十公里外送進城，靠的不是幫浦而是一點點坡度；而且第一手報告告訴我們，水道大部分是埋在地下、你根本看不到的。[s1][s6]
  story: |
    前 312 年，羅馬的監察官阿庇烏斯·克勞狄烏斯同時修了一條路和一條水道，這是羅馬的第一條水道。[s1][s7] 水完全靠地勢一路往下流，不用幫浦。[s1] 很多人以為水道就是高高的拱橋，但弗朗提努斯記錄：這條阿庇亞水道約 11,190 羅馬步長，其中 11,130 步在地下，只有六十步架在墩台上。[s6] 只有遇到山谷才需要橋，例如法國的加爾橋，三層拱高約 48.8 公尺。[s2][s3] 水進城後，先供應公共噴泉和浴場，最後才是付費的私人用戶。[s1] 西元 97 年，弗朗提努斯被任命為水道長官，寫下《論羅馬城的供水》。[s1][s6] 他很自豪地說，拿這些水道去比埃及金字塔和希臘那些有名卻沒用的工程吧。[s6] 到 3 世紀，羅馬城有 11 條國家出資的水道。[s1]
  key_terms:
    - { term: 重力輸水, plain: 不用幫浦，只靠水道一路微微向下的坡度讓水流動。, example: 像把水管斜放，水自己會從高處流到低處。 }
    - { term: 水道橋（拱橋）, plain: 遇到山谷時，把水道架在一排拱上跨過去；它只是整條水道的一小部分。, example: 像高速公路大部分在地面，遇到河才架橋。 }
    - { term: 虹吸管, plain: 遇到深谷時，水道用管子先往下再往上，靠壓力把水送過山谷。, example: 像 U 形的管子，兩端水位差不多時水能自己過去。 }
    - { term: 水道長官, plain: 皇帝任命、負責檢修水道、管理供水與防止偷水的官員，弗朗提努斯就當過。, example: 像今天的自來水公司總經理，但是由皇帝直接派任。 }
    - { term: 鈣化沉積, plain: 水裡的礦物在管壁上結成硬殼，會讓水道變窄，要定期清除。, example: 像水壺裡的水垢。 }
  primary_source:
    - text: "compare, if you will, the idle Pyramids or the useless, though famous, works of the Greeks!（你不妨拿閒置的金字塔，或希臘人那些有名卻沒用的工程來比比看！）"
      from: 弗朗提努斯《論羅馬城的供水》1.16（Bennett 英譯；ToposText 與 WaterHistory.org 兩處引文核對；中文為本站摘譯）
      src: s6
    - text: 弗朗提努斯記阿庇亞水道的長度：約 11,190 步，其中 11,130 步在地下，其餘靠墩台，近城門處有拱。（轉述大意，不是逐字翻譯）
      from: 弗朗提努斯《論羅馬城的供水》1.5（Bennett 英譯，ToposText）
      src: s6
  historiography: |
    **每天到底送來多少水？** 依弗朗提努斯的數字推估，羅馬城每日供水約 52 萬到 100 萬立方公尺，兩端相差近一倍，所以這類數字只能當估計。[s1]
    **鉛管有沒有害死羅馬人？** 鉛中毒是羅馬衰亡主因的說法，約三十年前由學者 Nriagu 提出，但其他學者不認為它是單一原因；2014 年 Delile 等人用鉛同位素比對台伯河沉積物與古水管，認為水管使水中的鉛增加到最多約百倍，卻不太可能造成重大健康風險。[s8]
  misconceptions:
    - 「羅馬水道都是高高的拱橋。」第一條水道全長約 11,190 步，11,130 步在地下；拱橋只出現在需要跨谷的少數路段。[s6][s1]
    - 「水是人人免費用的。」水先供應公共噴泉和浴場，最後才是付費的私人用戶；只有少數人因國家榮譽獲得免費用水。[s1]
  pop_culture:
    - { claim: "常見說法：羅馬人喝鉛水管的水慢慢中毒，帝國因此滅亡。", fact: "研究認為鉛管確實讓水中鉛含量升高（最多約百倍），但研究者認為不太可能構成重大健康風險；鉛中毒導致衰亡之說也被其他學者認為不是單一原因。[s8]", src: [s8] }
    - { claim: "常見畫面：羅馬水道就是一排排高大的拱橋。", fact: "弗朗提努斯記錄第一條水道 11,190 步中有 11,130 步在地下；拱橋只在跨越山谷時出現，加爾橋是著名的例子。[s6][s2]", src: [s6, s2] }
verification: 交叉確認
lens_status: 無直接論述
---

## D1 功能與象徵

水道把遠方水源靠重力引入城市，供應公共噴泉、公共浴場，最後才是付費的私人用戶；有些富人獲得免費用水作為國家榮譽。[s1] 對各地城市來說，水道是展現城市地位的「昂貴卻必要的奢侈」。[s1]

## D2 建造者與資金

羅馬第一條水道「阿庇亞水道」由監察官阿庇烏斯．克勞狄烏斯．凱庫斯在前 312 年下令興建（與亞壁古道同一人、同一年）。[s1] 資金在共和時期來自國家、帝國時期由皇帝負擔，行省則常由地方菁英出資。[s1] 李維把前 312 年阿庇烏斯的公共工程記為一條路與一條水道。[s7]

## D3 技術與材料

完全依靠重力：渠道多半埋在地下、保持微小坡度，以石、磚、混凝土或鉛管建造；遇到山谷則用虹吸管或橋。[s1] 弗朗提努斯記錄第一條水道約 11,190 羅馬步，其中 11,130 步在地下，因此拱橋只是少數路段。[s6] 尼姆水道全線平均坡度約 1/3000（每公里約 33 公分）。[s2] 加爾橋以精準切割的石灰岩塊靠摩擦與重力疊合、不用灰漿；底層主拱特別加寬（24.52 公尺），橋墩前方有導流設計以應付河水暴漲。[s2][s3]

## D4 規模與數據

- 到 3 世紀，羅馬城有 11 條國家出資的水道，總長約 780–800 公里；依弗朗提努斯的數字推估，每日供水約 52 萬–100 萬立方公尺。[s1]
- 加爾橋約完成於西元 40–60 年，三層拱，高約 48.8 公尺；所屬水道全長約 50 公里（直線距離僅約 20 公里），每日估計輸水約 4 萬立方公尺。[s2][s3]

## D5 維護與後世命運

維護包括檢修孔、巡查受保護的沿線地帶、清除碎屑與鈣化沉積；西元 97 年出任水道長官的弗朗提努斯寫下《論水道》，記錄供水問題與弊端。[s1] 537 年哥德人圍攻羅馬時切斷水道，連賈尼科洛山上的水力磨坊也停擺。[s1] 加爾橋約在 6 世紀停用，但因被當作收費橋而大致保存下來，1985 年列入世界遺產。[s2][s3]

## D6 雙軌解讀

### 李彔

無直接論述。

### 哈拉瑞

無直接論述：目前查到的公開摘要與書評，沒有哈拉瑞專門談羅馬水道的內容。

## D7 今日對照鉤子

「城市的生活品質依賴少數幾條長距離供水線，一旦被切斷就立刻癱瘓」（537 年圍城）；以及「公共、商業、私人用水的優先順序」如何分配的治理問題。[s1]

## D8 不可類比的差異

羅馬水道是持續流動、沒有大型水庫調節的系統，也沒有今日的淨水與計量技術；供水量只是根據古代數字的推估。[s1]
