---
id: event-french-indochina
type: event
name: 法國殖民越南與中法戰爭（1858–1945年）
aliases: [第二次西貢條約, 霍道生條約, 安鄴, 加尼耶, Francis Garnier, 李威利, Henri Rivière, 紙橋之役, 何罕條約, 宣光之圍, 法屬印度支那, 法屬越南, 中法戰爭, Sino-French War, French Indochina, 中法新約, 天津條約 1885, 交趾支那, 安南, 東京, Tonkin, Cochinchina, 黑旗軍, 劉永福, 孤拔, 鎮南關, 馮子材, 滬尾之役, 順化條約, 巴德諾條約, 潘佩珠, 東遊運動, 胡志明, 越南共產黨]
civilization: [越南（法屬）, 法國, 中國（清）]
track: east
time:
  start: 1858
  end: 1945
  precision: exact
  src: [s1, s2]
summary_line: 大事｜宮廷／政治中心｜越南全境與中越邊境｜法國殖民越南與中法戰爭（1858–1945年）
place:
  primary_field: 宮廷／政治中心
  secondary_fields: [戰場, 港口／海峽]
  locations:
    - { name_ancient: 土倫, name_modern: 峴港（越南）, lat: 16.0544, lng: 108.2022, precision: schematic, role: 1858 年法國與西班牙聯軍首先攻擊的港口（座標為市中心）, src: [s1, s3] }
    - { name_ancient: 嘉定（西貢）, name_modern: 胡志明市（越南）, lat: 10.7769, lng: 106.7009, precision: schematic, role: 1859 年被法軍攻下，後來成為交趾支那殖民地首府（座標為市中心）, src: [s3] }
    - { name_ancient: 河內, name_modern: 河內（越南）, lat: 21.0278, lng: 105.8342, precision: schematic, role: 1880 年代法軍奪取北圻（東京）的要地，後為法屬印度支那首府（座標為市中心）, src: [s1, s2] }
    - { name_ancient: 鎮南關, name_modern: 友誼關（中國廣西憑祥）, lat: 22.11, lng: 106.76, precision: schematic, role: 1885 年 3 月清軍馮子材在此擊敗法軍（座標示意）, src: [s2] }
    - { name_ancient: 滬尾, name_modern: 新北市淡水區（臺灣）, lat: 25.17, lng: 121.44, precision: schematic, role: 1884 年 10 月法軍登陸失敗的戰場（座標示意）, src: [s2] }
  scale: area
structure_tags: [外部勢力介入, 技術代差, 合法性危機, 宗教／意識形態動員]
topics: [殖民統治, 朝貢與冊封, 對外擴張, 文字與書寫]
links: [event-nguyen-dynasty-vietnam-name, event-vietnam-anticolonial, social-french-indochina-economy, event-vietnam-1945, war-first-indochina, war-opium-war, event-self-strengthening, tech-vietnam-scripts, building-hoi-an]
causes:
  - { id: event-nguyen-dynasty-vietnam-name, rel: 直接引發, why: 阮朝後來的皇帝禁止天主教、處死傳教士，法國以保護傳教士為理由，1858 年出兵峴港，開始一步步把越南變成殖民地。, src: [s1, s3] }
  - { id: war-opium-war, rel: 背景, why: 鴉片戰爭讓歐洲列強看到清朝打不過近代海軍；19 世紀中葉英法在東亞擴張，法國也想在中國南方找自己的據點與通往雲南的商路。, src: [s1, s2] }
effects:
  - { id: event-vietnam-anticolonial, rel: 直接引發, why: 1885 年 7 月法軍進駐順化，大臣尊室說帶咸宜帝出逃，發出〈勤王詔〉號召起兵，越南人四十多年的反法運動由此開始。, src: [s10, event-vietnam-anticolonial:s1] }
  - { id: social-french-indochina-economy, rel: 直接引發, why: 法屬印度支那成立後，法國用重稅、稻米出口、橡膠園與礦場來支付殖民政府和大型工程。, src: [s1, social-french-indochina-economy:s1] }
  - { id: war-first-indochina, rel: 背景, why: 二戰後，越南想擺脫法國殖民統治。1945 年胡志明宣布獨立，法國卻想恢復殖民，雙方談判破裂，1946 年爆發第一次印度支那戰爭。, src: [s1, war-first-indochina:s1] }
counterparts: "無適當對照：西方軌目前沒有「歐洲國家征服一個東亞朝貢國」的卡片；亞洲軌的鴉片戰爭與牡丹社事件是同一波列強東來的不同面向，不是跨軌對照。"
sources:
  - { id: s1, title: "French Indochina（法屬印度支那）— Wikipedia", url: "https://en.wikipedia.org/wiki/French_Indochina", accessed: 2026-11-07, tier: 百科 }
  - { id: s2, title: "Sino-French War（中法戰爭）— Wikipedia", url: "https://en.wikipedia.org/wiki/Sino-French_War", accessed: 2026-11-07, tier: 百科 }
  - { id: s3, title: "Cochinchina campaign（交趾支那戰役）— Wikipedia", url: "https://en.wikipedia.org/wiki/Cochinchina_campaign", accessed: 2026-11-07, tier: 百科 }
  - { id: s4, title: "〈中法會訂越南條約十款〉（中法新約，1885 年 6 月 9 日）— 維基文庫", url: "https://zh.m.wikisource.org/wiki/%E4%B8%AD%E6%B3%95%E6%9C%83%E8%A8%82%E8%B6%8A%E5%8D%97%E6%A2%9D%E7%B4%84%E5%8D%81%E6%AC%BE", accessed: 2026-11-07, tier: 一手 }
  - { id: s5, title: "Treaty of Tientsin (1885)（中法新約）— Wikipedia", url: "https://en.wikipedia.org/wiki/Treaty_of_Tientsin_(1885)", accessed: 2026-11-07, tier: 百科 }
  - { id: s6, title: "Vietnam — Effects of French colonial rule — Encyclopaedia Britannica", url: "https://www.britannica.com/place/Vietnam/Effects-of-French-colonial-rule", accessed: 2026-11-07, tier: 百科 }
  - { id: s8, title: "Treaty of Saigon (1874)（第二次西貢條約）— Wikipedia", url: "https://en.wikipedia.org/wiki/Treaty_of_Saigon_(1874)", accessed: 2026-11-09, tier: 百科 }
  - { id: s9, title: "Black Flag Army（黑旗軍）— Wikipedia", url: "https://en.wikipedia.org/wiki/Black_Flag_Army", accessed: 2026-11-09, tier: 百科 }
  - { id: s10, title: "Treaty of Huế (1884)（第二次順化條約）— Wikipedia", url: "https://en.wikipedia.org/wiki/Treaty_of_Hu%E1%BA%BF_(1884)", accessed: 2026-11-09, tier: 百科 }
  - { id: s7, title: "Fujian-Taiwan Province（福建臺灣省）— Wikipedia", url: "https://en.wikipedia.org/wiki/Fujian-Taiwan_Province", accessed: 2026-11-07, tier: 百科 }
importance: 3
summary_card: true
learn:
  histories: [越南史, 中國史, 臺灣史, 歐洲史]
  why_care: 越南人改用拉丁字母、清朝失去越南這個藩屬、臺灣在戰後建省，都和這場殖民與戰爭有關。[s1][s2][s7]
  story: |
    阮朝的皇帝禁止天主教，處死傳教士。[s1] 1858 年，法國以此為理由，聯合西班牙攻打峴港，隔年攻下西貢。[s3] 1862 年起阮朝被迫割讓南部各省，法國把南部建成殖民地「交趾支那」。[s3] 1880 年代法國北上奪取河內一帶，清朝以宗主國身分出兵，1884 年爆發中法戰爭。[s2] 法國艦隊攻擊福州馬尾、封鎖臺灣北部港口，在基隆、淡水登陸，滬尾一戰被清軍擊退；1885 年清軍又在鎮南關打敗法軍。[s2] 但清朝最後仍在 1885 年簽〈中法新約〉，承認法國對越南的保護，越南對中國上千年的朝貢關係就此結束。[s4][s5] 1887 年，法國把越南、柬埔寨合組成「法屬印度支那」。[s1]
  key_terms:
    - { term: 保護國, plain: 名義上還有自己的國王，外交、軍事和重要政務卻由外國控制的國家。, example: 社團還是有社長，但社費和活動都要外校的人簽名才算數。 }
    - { term: 印度支那, plain: 歐洲人對中南半島的稱呼，意思是「在印度和中國之間」；法屬印度支那包括今天的越南、寮國、柬埔寨。, example: 像用「兩棟大樓中間那一區」來稱呼一個地方。 }
  primary_source:
    - { text: "凡有法國與越南自立之條約、章程，或已定者，或續立者，現時並日後均聽辦理。", from: 〈中法會訂越南條約十款〉（中法新約）第二款，光緒十一年四月二十七日（1885 年 6 月 9 日）於天津簽訂, src: s4 }
  historiography: |
    **中法戰爭誰贏了？** 中國的說法常強調清軍在鎮南關、滬尾打了勝仗，有學者也認為陸上戰事是法國失敗、中國勝利；另有史家認為，用近代的標準看清朝確實輸了：法國艦隊在福州（馬江）幾乎消滅福建水師，又封鎖臺灣北部，最後清朝仍承認法國控制越南。[s2]
    **殖民帶來了什麼？** 支持殖民的人說，法國帶來了鐵路、醫療、教育和通訊的進步；批評者指出，稻田大增卻造出一批地主和大量無地佃農，礦場與橡膠園缺乏保護，越南人還要負擔重稅和強制勞動，民族主義與共產主義運動也在這個時期出現。[s1][s6]
  misconceptions:
    - 法國不是一次就占領越南：從 1858 年攻峴港到 1884 年把北部和中部變成保護國，前後花了二十多年。[s3][s5]
    - 中法戰爭不只在越南打：法軍也攻擊福州、基隆和淡水，並封鎖臺灣。[s2]
  perspectives:
    - { history: 越南史, text: "從越南看，這是失去主權的開始，也是越南人用新文字、新思想尋找救國之路的時代。[s1][s6]" }
    - { history: 中國史, text: "從中國看，這是清朝失去南方藩屬的戰爭，福建水師在馬江幾乎全滅。[s2]" }
    - { history: 臺灣史, text: "從臺灣看，法軍攻打基隆、滬尾後，清朝更重視臺灣防務，戰後由劉銘傳主持，把臺灣從福建的一個府升為行省（1887 年正式設省）。[s2][s7]" }
crosscheck: { date: 2026-11-07, by: 獨立查核 agent（未參與寫作）, result: 通過, notes: "開啟 s1、s2、s3、s5；s4 原網址失效，改為維基文庫〈中法會訂越南條約十款〉，逐字核對第二款，原卡「或已經定者」改正為「或已定者」；s6 大英百科原網址失效，改為 Effects of French colonial rule 頁。新加 s7（福建臺灣省）支持臺灣建省（1887 年正式設省）。修正：1867 年交趾支那殖民地實為 1864 年成立；順化條約改引 s5；刪去來源不支持的「不敗而敗」「十年後朝鮮脫離」「在香港成立」；殖民影響依大英百科改寫；1919 廢科舉改引技術卡 s7。2026-11-09 新增段落另由獨立查核 agent 開啟 s8、s9、s10、s1、s2、s6 及 event-vietnam-anticolonial:s1/s7、tech-vietnam-scripts:s7、event-vietnam-1945:s4、social-french-indochina-economy:s1、war-first-indochina 相關來源核對：1873-12-21 安鄴死、1874-03-15 霍道生條約條款、1883-05-19 李威利死、何罕條約 1883-08-25、巴德諾條約 1884-06-06 第一條英譯、宣光之圍均相符；修正「安鄴攻占河內」改為在北部作戰（s9 未述攻占）、「法國決定大舉出兵」改為「急派援軍」（依 s2）、黑旗軍組成依 s9 改寫、宣光之圍補起訖日期，C6 勤王句、C7 與兩條新 effects 經核對有來源支持，結果通過。" }
verification: 交叉確認
lens_status: 無直接論述
---

## C1 背景

19 世紀中葉，英法等歐洲國家在東亞擴張，法國想在中國南方取得據點與通往雲南的商路。[s1][s2] 阮朝的明命、嗣德等皇帝禁止天主教，處死傳教士與教徒，給了法國出兵的理由。[s1][s3][event-nguyen-dynasty-vietnam-name:s2]

## C2 經過

- **1858–1862 年**：法西聯軍攻峴港、西貢；1862 年西貢條約，阮朝割讓南部東三省。[s3]
- **1867 年**：法國再取南部西三省，交趾支那殖民地（1864 年成立）擴大到整個南部。[s3]
- **1873 年 12 月**：法國軍官安鄴（加尼耶）帶兵在北部（東京）作戰，21 日在河內城外被劉永福的黑旗軍殺死；黑旗軍主要由 1865 年從廣西越境的壯族人和太平天國舊部組成。[s9][s8]
- **1874 年 3 月 15 日**：第二次西貢條約（霍道生條約），阮朝承認 1867 年被法國占領的南部西三省歸法國，並開放紅河與河內、海防、歸仁通商；法國軍隊撤出北部。[s8]
- **1883 年 5 月 19 日**：法國海軍軍官李威利在紙橋之役被黑旗軍伏擊身亡，法國國內大怒，急忙增派援軍到北部。[s9][s2]
- **1883–1884 年**：法國奪取北圻；1883 年 8 月 25 日先逼阮朝簽下嚴苛的何罕條約，1884 年 6 月 6 日改訂巴德諾條約（第二次順化條約），第一條寫明「安南承認並接受法國的保護」，安南、東京成為法國保護國。[s10][s2][s5]
- **1884–1885 年**：中法戰爭，戰場包括北越、福州與臺灣北部；黑旗軍和清朝的雲南軍從 1884 年 11 月起一起圍攻宣光的法國外籍兵團，1885 年 3 月 3 日才被法軍解圍。[s2][s9]
- **1885 年 6 月 9 日**：〈中法新約〉，清朝承認法國與越南訂立的條約。[s4][s5]
- **1887 年**：成立法屬印度支那聯邦。[s1]

## C6 直接結果

越南被分成交趾支那（殖民地）、安南與東京（保護國）三部分統治，阮朝皇帝只剩名義。[s1] 1885 年 7 月法軍進駐順化，主戰大臣尊室說帶著咸宜帝出逃，發動勤王運動。[event-vietnam-anticolonial:s1] 清朝等於放棄了對越南的宗主權，以中國為中心的東亞朝貢秩序開始瓦解。[s5][s2] 臺灣方面，清朝在戰後把臺灣從福建的一個府升為行省，1887 年正式設省。[s7]

## C7 長期影響

國語字在這個時期推廣開來，1919 年科舉被廢除，漢字在越南逐漸退出日常書寫。[s1][tech-vietnam-scripts:s7] 殖民經濟讓稻米出口大增，也造出大批無地佃農（見〈法國殖民下的越南人〉）。[s6][social-french-indochina-economy:s1] 法國統治催生了越南的民族運動：從勤王運動、潘佩珠的東遊運動，到 1930 年的安沛起義與共產黨成立（見〈越南人的反法運動〉）。[s6][s1][event-vietnam-anticolonial:s7] 1940–1945 年日本進駐印度支那，1945 年大饑荒、八月革命後胡志明宣布獨立，法國想重返，引爆第一次印度支那戰爭（見〈日本進駐、1945 年大饑荒與八月革命〉）。[s1][event-vietnam-1945:s4]
