---
id: event-vietnam-1945
type: event
name: 日本進駐、1945 年大饑荒與八月革命（1940–1945年）
aliases: [八月革命, August Revolution, 越南八月革命, 1945 年越南大饑荒, 乙酉饑荒, Nạn đói Ất Dậu, Vietnamese famine of 1945, 日軍進駐印度支那, Japanese invasion of French Indochina, 明號作戰, 三九政變, 1945 年 3 月 9 日政變, 越南帝國, Empire of Vietnam, 陳仲金, 保大退位, 越南獨立宣言, 巴亭廣場, 越南民主共和國成立, 越盟成立, 北坡, 九二國慶]
civilization: [越南（法屬）, 日本（近現代）, 法國]
track: east
time:
  start: 1940
  end: 1945
  precision: exact
  src: [s1, s2, s4, s5]
summary_line: 大事｜宮廷／政治中心｜越南河內、順化與北部平原｜日本進駐、1945 年大饑荒與八月革命（1940–1945年）
place:
  primary_field: 宮廷／政治中心
  secondary_fields: [資源產地, 戰場]
  locations:
    - { name_ancient: 諒山, name_modern: 諒山（越南）, lat: 21.853, lng: 106.761, precision: schematic, role: 1940 年 9 月 22–26 日日軍與法軍在越南北部交戰的地區（座標為市中心）, src: [s1] }
    - { name_ancient: 北坡, name_modern: 北坡（越南北部）, lat: 22.98, lng: 106.05, precision: schematic, role: 1941 年 5 月印度支那共產黨在此開會、成立越盟（座標示意）, src: [s4] }
    - { name_ancient: 紅河三角洲, name_modern: 紅河三角洲（越南北部）, lat: 20.6, lng: 106.2, precision: schematic, role: 1944–1945 年大饑荒最嚴重的北部平原（座標示意）, src: [s3] }
    - { name_ancient: 順化, name_modern: 順化（越南）, lat: 16.4637, lng: 107.5909, precision: schematic, role: 阮朝首都；1945 年 8 月 30 日保大帝在此把玉璽和寶劍交給越盟代表（座標為市中心）, src: [s4] }
    - { name_ancient: 河內巴亭廣場, name_modern: 巴亭廣場（越南河內）, lat: 21.0368, lng: 105.8347, precision: exact, role: 1945 年 9 月 2 日胡志明在此宣讀獨立宣言, src: [s5, s6] }
  scale: area
structure_tags: [外部勢力介入, 革命與政權更替, 合法性危機, 臨界點]
topics: [殖民統治, 世界大戰, 革命, 糧食與農業]
links: [event-french-indochina, event-vietnam-anticolonial, social-french-indochina-economy, war-first-indochina, event-decolonization, war-world-war-two, event-nguyen-dynasty-vietnam-name]
causes:
  - { id: event-vietnam-anticolonial, rel: 背景, why: 1930 年成立的共產黨被法國鎮壓後在 1935 年重建，1941 年由胡志明組成越盟，等到日本投降的空檔就發動起義。, src: [s4, event-vietnam-anticolonial:s9] }
  - { id: war-world-war-two, rel: 直接引發, why: 法國在 1940 年被德國打敗，日本趁機進駐印度支那；1945 年 8 月 15 日日本投降，留下權力真空，越盟立刻起義。, src: [s1, s2, s4] }
effects:
  - { id: war-first-indochina, rel: 直接引發, why: 胡志明 9 月 2 日宣布獨立，但法國想恢復殖民統治，談判破裂後 1946 年爆發第一次印度支那戰爭。, src: [s5, war-first-indochina:s1] }
counterparts: "無適當對照：西方軌目前沒有「殖民宗主國被打敗、第三國占領、殖民地趁投降空檔奪權」的卡片；同一波亞洲去殖民見 event-decolonization（印尼也在 1945 年 8 月宣布獨立），屬於同軌而非跨軌對照。"
sources:
  - { id: s1, title: "Japanese invasion of French Indochina（日軍進駐法屬印度支那）— Wikipedia", url: "https://en.wikipedia.org/wiki/Japanese_invasion_of_French_Indochina", accessed: 2026-11-09, tier: 百科 }
  - { id: s2, title: "Japanese coup d'état in French Indochina（1945 年日軍政變）— Wikipedia", url: "https://en.wikipedia.org/wiki/Japanese_coup_d%27%C3%A9tat_in_French_Indochina", accessed: 2026-11-09, tier: 百科 }
  - { id: s3, title: "Vietnamese famine of 1944–45（1944–45 年越南大饑荒）— Wikipedia", url: "https://en.wikipedia.org/wiki/Vietnamese_famine_of_1945", accessed: 2026-11-09, tier: 百科 }
  - { id: s4, title: "August Revolution（八月革命）— Wikipedia", url: "https://en.wikipedia.org/wiki/August_Revolution", accessed: 2026-11-09, tier: 百科 }
  - { id: s5, title: "Proclamation of Independence of the Democratic Republic of Vietnam（越南民主共和國獨立宣言）— Wikipedia", url: "https://en.wikipedia.org/wiki/Proclamation_of_Independence_of_the_Democratic_Republic_of_Vietnam", accessed: 2026-11-09, tier: 百科 }
  - { id: s6, title: "Ho Chi Minh, Declaration of Independence, Democratic Republic of Vietnam（1945 年 9 月 2 日，英譯本，出自 Ho Chi Minh, Selected Works Vol. 3）— History Matters（喬治梅森大學）", url: "https://historymatters.gmu.edu/d/5139/", accessed: 2026-11-09, tier: 一手 }
  - { id: s7, title: "Japanese occupation of French Indochina（日本占領法屬印度支那）— Wikipedia", url: "https://en.wikipedia.org/wiki/Japanese_occupation_of_French_Indochina", accessed: 2026-11-09, tier: 百科 }
  - { id: s8, title: "Public holidays in Vietnam（越南國定假日）— Wikipedia", url: "https://en.wikipedia.org/wiki/Public_holidays_in_Vietnam", accessed: 2026-11-09, tier: 百科 }
importance: 3
summary_card: false
learn:
  histories: [越南史, 日本史, 東南亞史, 世界通史]
  why_care: 越南的國慶日是 9 月 2 日，就是 1945 年胡志明宣布獨立的那一天；而在那之前幾個月，越南北部剛剛餓死了數十萬到兩百萬人。[s8][s3]
  story: |
    1940 年法國被德國打敗，日本趁機派兵進入越南北部，切斷中國從這裡運進武器的路線；法國殖民政府留了下來，但要在日本的監督下做事。[s1] 1941 年 5 月，胡志明在越南北部的北坡成立「越盟」，準備等待時機；同年 7 月，日軍又進駐越南南部。[s4][s1][s7] 1945 年 3 月 9 日，日軍發動政變，推翻法國殖民政府，3 月 11 日讓保大皇帝宣布「獨立」，成立由日本控制的越南帝國。[s2] 從 1944 年 10 月起，北部爆發大饑荒：日、法軍隊強徵糧食，日軍逼農民改種黃麻，盟軍轟炸又切斷運米的道路，估計有 40 萬到 200 萬人餓死。[s3] 8 月 15 日日本投降，越盟立刻起義，19 日控制河內，25 日保大宣布退位。[s4] 9 月 2 日，胡志明在河內巴亭廣場宣讀獨立宣言，成立越南民主共和國。[s5][s6]
  key_terms:
    - { term: 權力真空, plain: 原本掌權的人突然垮台、新的統治者還沒到，沒有人真正在管事的空檔。, example: 老師突然請假、代課老師還沒來的那節課，誰先站上講台，誰就可能掌控全班。 }
    - { term: 越盟, plain: 越南獨立同盟會，1941 年胡志明成立、以共產黨為核心的抗日抗法聯合組織。, example: 一個以某個社團為核心、號召各班同學加入的聯合陣線。 }
    - { term: 強徵, plain: 政府或軍隊用命令和武力，硬把人民的糧食、物資收走。, example: 不管你家夠不夠吃，規定每戶都要交出幾袋米。 }
  primary_source:
    - { text: "from the end of last year to the beginning of this year ... more than two million of our fellow-citizens died from starvation（從去年年底到今年年初……我們有兩百多萬同胞餓死）", from: 胡志明〈越南民主共和國獨立宣言〉，1945 年 9 月 2 日（英譯本，中文為本站摘譯；兩百萬是宣言的說法，史家估計從 40 萬到 200 萬不等）, src: s6 }
    - { text: "All men are created equal.（人人生而平等。）", from: 胡志明〈越南民主共和國獨立宣言〉開頭引用美國〈獨立宣言〉，1945 年 9 月 2 日（英譯本）, src: s6 }
  historiography: |
    **大饑荒到底死了多少人？** 確切數字沒有人知道，至今仍有爭議：胡志明的獨立宣言說兩百多萬，越盟估計光是紅河三角洲就有 100 萬到 200 萬人餓死，現在一般的估計則是 40 萬到 200 萬。[s6][s3] 越南北部政府把饑荒歸咎於法國和日本兩方。[s3]
    **饑荒是誰造成的？** 原因不只一個。[s3] 日、法兩國軍隊強徵農民的糧食，日軍逼農民改種黃麻、不種稻米。[s3] 盟軍飛機經常轟炸道路、倉庫和運輸設施，讓南方的米很難運到北方，北部又遇到旱災和水災。[s3] 也有人認為，日本占領是讓其他因素一起發生的根本原因。[s3]
    **八月革命是「全民起義」還是「趁虛而入」？** 一種說法強調越盟動員了各種社會群體，起義在日本投降後立刻展開。[s4] 也有說法指出，日本投降後留下權力真空，日本扶植的越南帝國又沒有能維持秩序的軍隊，越盟才能很快奪權。[s2][s4]
  misconceptions:
    - 越南不是 1945 年才被日本「殖民」：1940–1945 年日軍進駐，但法國殖民政府大多仍在，直到 1945 年 3 月 9 日政變才被日本推翻。[s1][s2]
    - 日本投降後，接收越南的不只越盟：北緯 16 度以北，是盧漢率領約 20 萬名中華民國軍隊進入接受日軍投降。[s2]
  perspectives:
    - { history: 越南史, text: "從越南看，這是八十多年殖民統治結束、獨立建國的時刻，也是一場慘烈饑荒的記憶。[s3][s5]" }
    - { history: 日本史, text: "從日本看，進駐印度支那原本是為了切斷中國運進武器和燃料的路線，1941 年進駐南部則是為了往東南亞擴張做準備；1945 年 3 月政變後，日本成了越南的實際統治者。[s1][s2]" }
crosscheck: { date: 2026-11-09, by: 獨立查核 agent（未參與寫作）, result: 通過, notes: "以 WebFetch 實際開啟 s1–s6 與 historymatters 宣言英譯，另開 event-vietnam-anticolonial 的 s7 安沛起義、s8 義靜蘇維埃、s9 越南共產黨，war-first-indochina:s1，event-decolonization:s1。核對：1940 年 9 月 22–26 日交戰、諒山、切斷武器與燃料路線；3 月 9 日政變、3 月 11 日保大宣布獨立、陳仲金領導政府；饑荒 1944 年 10 月到 1945 年底、40 萬到 200 萬、強徵、黃麻、盟軍轟炸、旱災水災；北坡 1941 年 5 月、8 月 15 日起義、19 日河內、25 日退位、30 日順化交玉璽寶劍；盧漢 20 萬軍、北緯 16 度；兩句引文逐字相符。修改：1941 年 7 月進駐南部與共同防衛議定書在 s1 標 citation needed，加 s7 支持並寫明 7 月 29 日；國慶日加 s8；美軍改盟軍；陳仲金總理改為領導政府；北坡改越南北部；C1 改為安沛起義後國民黨逃到中國、共產黨幾乎被消滅 1935 年重建（原引 s8 不支持）；史學段刪去來源沒有的「宣言是政治文件」與「官方說法」，改成來源的說法；C7 刪去「歷史教育中最重要的文件」；C9 補朝鮮南北分占；C10 改寫日本想回來的錯誤說法；日本史視角刪去美國更警覺。" }
verification: 交叉確認
lens_status: 無直接論述
---

## C1 背景

1940 年法國被德國打敗，維琪政府繼續管理法國的海外殖民地。[s1] 日本正在和中國打仗，想切斷中國透過法屬印度支那運進武器和燃料的路線。[s1] 越南人在這之前已經反抗法國很久：1930 年安沛起義失敗後，越南國民黨剩下的人逃到中國；共產黨也在 1930 年代初的鎮壓中幾乎被消滅，到 1935 年才重建。[event-vietnam-anticolonial:s7][event-vietnam-anticolonial:s9]

## C2 經過

- **1940 年 9 月 22–26 日**：日軍進入越南北部，和法軍短暫交戰；法國的軍隊和行政機關保留下來，但要配合日本。[s1]
- **1941 年 5 月**：印度支那共產黨在北坡開會，胡志明成立越南獨立同盟會（越盟）。[s4]
- **1941 年 7 月**：日軍進駐越南南部；7 月 29 日維琪法國與日本簽訂共同防衛的議定書。[s1][s7]
- **1944 年 10 月起**：北部爆發大饑荒，一直延續到 1945 年底。[s3]
- **1945 年 3 月 9 日**：日軍發動政變，推翻法國殖民政府；3 月 11 日保大帝宣布「獨立」，成立由日本扶植、陳仲金領導政府的越南帝國。[s2]
- **1945 年 8 月 15 日**：日本向盟軍投降，越盟立刻發動全面起義。[s4]
- **1945 年 8 月 19 日**：越盟控制河內。[s4]
- **1945 年 8 月 25 日**：保大帝下詔退位，30 日在順化把玉璽和寶劍交給越盟代表。[s4]
- **1945 年 9 月 2 日**：胡志明在河內巴亭廣場宣讀獨立宣言，成立越南民主共和國。[s5][s6]

## C3 關鍵人物與群體

- **胡志明與越盟**：由印度支那共產黨領導、反對帝國主義的聯合陣線，動員各種社會群體，1945 年 8 月領導起義。[s4]
- **保大帝**：阮朝最後一位皇帝，3 月被日本扶上「獨立」越南帝國的位子，8 月宣布退位。[s2][s4]
- **陳仲金**：領導日本扶植的越南帝國政府，和日本合作。[s2]
- **北部農民**：大饑荒的主要受害者，糧食被強徵、田地被逼改種經濟作物。[s3]

## C4 制度或機制變化

統治越南的權力在五年內換了三次手：先是「法國管、日本監督」，1945 年 3 月變成「日本扶植的越南帝國」，8、9 月再變成越盟領導的越南民主共和國。[s1][s2][s4][s5] 阮朝在保大退位後結束，越南民主共和國以共和國的形式成立。[s4][s5]

## C5 受益者與受損者

**受益者**：越盟在日本投降的空檔中搶先奪得政權，成為之後抗法戰爭的領導者。[s4]

**受損者**：北部農民在大饑荒中死亡數十萬到兩百萬人。[s3] 法國殖民政府在 3 月政變中被推翻，失去了對越南的實際控制。[s2]

## C6 直接結果

越南民主共和國成立。[s5] 但盧漢率領約 20 萬名中華民國軍隊進入北緯 16 度以北接受日軍投降，法國也想恢復殖民統治。[s2][war-first-indochina:s1] 新政府和法國的談判失敗，1946 年 12 月第一次印度支那戰爭全面爆發。[war-first-indochina:s1]

## C7 長期影響

9 月 2 日成為越南的國慶日，獨立宣言也被看作今天越南社會主義共和國的建國基礎。[s8][s5] 饑荒期間，越盟帶領農民去搶日本和法國的米倉，因此從游擊隊壯大成群眾運動；獨立宣言也把饑荒列為法國和日本的罪狀。[s3][s6]

## C8 雙軌解讀

### 李彔

無直接論述。

### 哈拉瑞

無直接論述。

## C9 今日對照鉤子

和臺灣對照：1945 年 8 月日本投降後，臺灣、朝鮮、越南都面臨「日本離開後誰來管」的問題，但三地走上很不同的路：臺灣由中華民國接管，朝鮮被美國和蘇聯分成南北兩半，越南則是越盟搶先宣布成立越南民主共和國。[s4][event-decolonization:s1]

## C10 不可類比的差異

越南是法國的殖民地、只是被日本「進駐」，不是日本的殖民地；1945 年越南人面對的是日本剛投降、中華民國軍隊進駐北部、法國又想回來的局面，和只有一個殖民者的地方不同。[s1][s2][war-first-indochina:s1]
