---
id: finance-voc
type: finance
name: 荷蘭東印度公司（VOC，1602–1799）
aliases: [荷蘭東印度公司, VOC, 聯合東印度公司, Dutch East India Company, Vereenigde Oostindische Compagnie, 十七紳士, Heeren XVII, 巴達維亞, Batavia, 科恩, Jan Pieterszoon Coen, 班達群島屠殺, Banda Islands, 出島, Dejima, VOC 特許狀, 荷兰东印度公司]
civilization: [荷蘭]
track: west
time:
  start: 1602
  end: 1799
  precision: exact
  src: [s1, s3]
summary_line: 金融｜金融中心｜阿姆斯特丹—巴達維亞｜荷蘭東印度公司（VOC，1602–1799）
place:
  primary_field: 金融中心
  secondary_fields: [港口／海峽, 商路, 資源產地]
  locations:
    - { name_ancient: 阿姆斯特丹, name_modern: 阿姆斯特丹（荷蘭）, lat: 52.3731, lng: 4.8926, precision: schematic, role: 六個分部中最大的一個，十七紳士中佔 8 席；股票在這裡轉手, src: [s1] }
    - { name_ancient: 巴達維亞（原雅加達／Jayakarta）, name_modern: 雅加達（印尼）, lat: -6.1352, lng: 106.8133, precision: schematic, role: 1619 年科恩攻下後設為亞洲總部, src: [s1] }
    - { name_ancient: 班達群島, name_modern: 班達奈拉（印尼）, lat: -4.5250, lng: 129.8960, precision: schematic, role: 1609–1621 年為壟斷肉豆蔻而征服、屠殺當地居民, src: [s4] }
    - { name_ancient: 出島, name_modern: 長崎（日本）, lat: 32.7437, lng: 129.8732, precision: exact, role: 1641 年起兩百多年間歐洲人與日本貿易的唯一據點, src: [s1] }
    - { name_ancient: 小琉球（Lamey）, name_modern: 屏東縣琉球鄉（臺灣）, lat: 22.3405, lng: 120.3707, precision: schematic, role: 1636 年 VOC 討伐，約 300 名躲進山洞的居民被煙燻窒息而死，三百多人被擄為奴；1645 年最後的居民也被遷走, src: [s1, s6] }
    - { name_ancient: 好望角補給站, name_modern: 開普敦（南非）, lat: -33.9249, lng: 18.4241, precision: schematic, role: 1652 年設立的補給站，後來成為殖民地, src: [s1] }
    - { name_ancient: 加勒, name_modern: 加勒（斯里蘭卡）, lat: 6.0329, lng: 80.2168, precision: schematic, role: 1640 年攻下，之後取得錫蘭肉桂壟斷, src: [s1] }
  scale: area
structure_tags: [金融制度創新, 關鍵原料壟斷, 快速擴張, 長期衰退]
topics: [股票與公司, 東印度公司, 香料貿易, 海上貿易, 殖民統治, 奴隸制]
links: [finance-amsterdam-exchange, event-dutch-formosa, finance-amsterdam-decline, finance-amsterdam-wisselbank, finance-tulip-mania, event-sakoku, war-eighty-years, event-atlantic-slave-trade]
effects:
  - { id: finance-amsterdam-exchange, rel: 促成, why: VOC 的資本不退還，股東想拿回錢只能把股份賣給別人，於是需要一個固定買賣股份的市場，阿姆斯特丹交易所就這樣發展起來。, src: [s1, finance-amsterdam-exchange:s1] }
  - { id: event-dutch-formosa, rel: 背景, why: VOC 的特許狀准許它在亞洲建堡壘、養軍隊、和當地統治者訂約，它才能在大員設商館、統治臺灣西南部。, src: [s3, event-dutch-formosa:s1] }
  - { id: finance-amsterdam-decline, rel: 促成, why: 第四次英荷戰爭讓 VOC 船隊損失一半、淨資產歸零，公司 1799 年解散，荷蘭作為亞洲貿易與金融強權的地位跟著下滑。, src: [s1, finance-amsterdam-decline:s3] }
counterparts:
  - { id: event-dutch-formosa, note: "相似：大員商館就是 VOC 在亞洲眾多據點之一，同樣靠特許狀的權力建城堡、收稅、和原住民結盟或開戰。不同：本卡講的是整家公司怎麼集資、怎麼在兩百年間擴張又衰落；大員卡講的是這套權力落在臺灣當地時，漢人移民與西拉雅等原住民怎麼被捲進來。", src: [s1, s3] }
sources:
  - { id: s1, title: "Dutch East India Company — Wikipedia", url: "https://en.wikipedia.org/wiki/Dutch_East_India_Company", accessed: 2026-11-07, tier: 百科 }
  - { id: s2, title: "Oscar Gelderblom, Abe de Jong, Joost Jonker, The Formative Years of the Modern Corporation: The Dutch East India Company VOC, 1602–1623 — The Journal of Economic History 73(4), 2013: 1050–1076（EconPapers 摘要頁）", url: "https://econpapers.repec.org/RePEc:cup:jechis:v:73:y:2013:i:04:p:1050-1076_00", accessed: 2026-11-07, tier: 學術 }
  - { id: s3, title: "荷蘭東印度公司特許狀（1602 年 3 月 20 日），Peter Reynders 英譯、Rupert Gerritsen 編（2009）— Dutch Australian Cultural Centre", url: "https://dutchaustralianculturalcentre.com.au/wp-content/uploads/2023/09/VOC-Charter.pdf", accessed: 2026-11-07, tier: 一手 }
  - { id: s4, title: "Dutch conquest of the Banda Islands — Wikipedia", url: "https://en.wikipedia.org/wiki/Dutch_conquest_of_the_Banda_Islands", accessed: 2026-11-07, tier: 百科 }
  - { id: s5, title: "Sapiens 第 16 章〈The Capitalist Creed〉摘要（LitCharts）", url: "https://www.litcharts.com/lit/sapiens/chapter-16-the-capitalist-creed", accessed: 2026-11-07, tier: 摘要 }
  - { id: s6, title: "Lamey Island massacre — Wikipedia", url: "https://en.wikipedia.org/wiki/Lamey_Island_massacre", accessed: 2026-11-07, tier: 百科 }
importance: 3
learn:
  histories: [世界通史, 錢的歷史, 歐洲史, 臺灣史]
  why_care: 這是最早向大眾賣股票的公司之一，卻也擁有軍隊、可以開戰和殖民；「公司」和「國家」的界線在它身上幾乎消失，臺灣也曾被它統治 38 年。
  story: |
    1602 年 3 月，荷蘭議會把幾家互相競爭的亞洲貿易公司合併成「聯合東印度公司」（VOC），給它 21 年的亞洲貿易獨占權。[s1] 任何人都能買股份，最低 3,000 荷蘭盾，共有 1,143 人認購。[s1] 特許狀還准許它和亞洲的君主訂約、蓋堡壘、養軍隊。[s3] 1619 年，總督科恩攻下雅加達，改名巴達維亞當總部；1621 年他為了壟斷肉豆蔻，帶兵征服班達群島，約 1 萬 5 千名居民最後只剩約 1 千人。[s1][s4] 近兩百年後，公司在戰爭中損失慘重、淨資產歸零，1799 年底解散，領地和債務都交給國家。[s1]
  key_terms:
    - { term: 特許公司, plain: 國家發執照給一家公司，讓它獨家經營某個地區的生意，有時還給它軍事和外交的權力。, example: 像政府只准一家公司經營某條航線，還讓它自己帶保全、跟外國簽合約。 }
    - { term: 永久資本, plain: 股東投進去的錢在公司存在期間都不拿回來，想退出只能把股份賣給別人。, example: 合開飲料店的錢不能隨時抽走，想退出就把你的股份轉賣給其他同學。 }
    - { term: 有限責任, plain: 公司虧損時，股東最多只賠掉自己投入的錢，不用拿家產去還公司的債。, example: 你出 1,000 元合資，就算店倒了欠一大筆錢，你最多也只損失那 1,000 元。 }
    - { term: 十七紳士（Heeren XVII）, plain: VOC 的最高董事會，共 17 席，由六個城市分部推派，阿姆斯特丹佔 8 席。, example: 像學生會由各班代表組成，人數最多的班代表席次也最多。 }
  primary_source:
    - { text: "After ten years anyone may depart the Company and take his capital with him.（十年之後，任何人都可以退出公司，把他的資本帶走。）", from: 荷蘭東印度公司特許狀（1602 年 3 月 20 日），Reynders 英譯（2009）；中文為本站摘譯, src: s3 }
    - { text: "authorised to enter into commitments and enter into contracts with princes and rulers（獲授權與君主和統治者訂立承諾與契約）", from: 同上，談好望角以東、麥哲倫海峽以外地區的條款；中文為本站摘譯, src: s3 }
  historiography: |
    **它是「現代公司」的起點嗎？** 一種常見看法認為，VOC 和英國東印度公司有法人地位、永久資本和有限責任，是制度上的突破；VOC 常被稱為最早的股份公司之一，有時還被看作第一家跨國公司。[s1][s2] 經濟史學者 Gelderblom、de Jong 與 Jonker 2013 年檢查 VOC 前二十年的經營與財務後認為，它的公司形式不是事先設計好的，而是一路「零碎修補設計缺陷」而來；董事的有限責任也不在原始設計裡，是為了解決資金瓶頸才慢慢出現的。[s2] 特許狀原本寫的是「十年之後可以退出、帶走資本」，和後來「資本永久不退」的做法並不一樣。[s1][s3]
    **貿易成就還是暴力殖民？** 荷蘭常把 VOC 當成「黃金時代」的驕傲；2006 年荷蘭總理巴克內德（Balkenende）稱讚「VOC 精神」（VOC-mentaliteit），就引發爭議。[s1] 批評者強調它的獲利靠壟斷與暴力：班達群島的征服常被稱為「班達屠殺」，近年也有學者（例如 Meuwese、Averbuch、Dhont）直接稱為「種族滅絕」；要用哪個詞，本身也是史家討論的問題。[s4]
  hindsight: |
    事後看，VOC 好像是一家「註定成功兩百年」的公司；但 1602 年的認購者手上的特許狀寫的是十年後可以退出、帶走資本，他們買的其實是一場以十年為期的冒險。[s3] 後來的公司形式是一邊經營、一邊修補出來的，當時沒有人知道它會變成什麼樣子。[s2] 1730 年後公司盈餘下降，股利卻照樣維持高檔，被稱為「沒有利潤的成長」；身在其中的股東看到的是穩定配息，事後才看出公司在吃老本，1780 年後的戰爭一來，淨資產就歸零。[s1]
    倖存者偏差：我們記得「第一家股份公司」和平均每年約 18% 的股利，比較少記得代價：1602–1795 年約一百萬人從荷蘭出發，只有約 34 萬人回來；班達群島的居民、開普殖民地上萬名被奴役者，也都是這門生意的成本。[s1][s4] 本卡不構成投資建議。
  misconceptions:
    - VOC 不是荷蘭政府，而是一家私人股東出資的公司；但它的開戰、訂約、鑄幣、建立殖民地權力是國家透過特許狀給的。[s1][s3]
    - VOC 雖然常被稱為「第一家股份公司」，但英國東印度公司 1600 年就成立了；學者通常說 VOC 是「最早的之一」。[s1][s2]
  perspectives:
    - { history: 錢的歷史, text: 從錢的歷史看，VOC 讓「把股份賣給陌生人、讓股份在市場上轉手」變成常態，是股票市場的源頭之一。 }
    - { history: 臺灣史, text: 從臺灣看，1624–1662 年統治大員的就是這家公司；1636 年它出兵小琉球，約 300 人在山洞中被燻死、三百多人被擄為奴，到 1645 年島上原住民已全被遷走。 }
    - { history: 世界通史, text: 從印尼班達群島、斯里蘭卡和南非的角度看，VOC 帶來的是征服、壟斷和奴役。 }
crosscheck: { date: 2026-11-07, by: 獨立查核（另一次呼叫，未參與寫作）, result: 通過, notes: "WebFetch 核對 s1 VOC 維基、s3 特許狀 PDF、s4 班達群島維基、新增 s6 Lamey Island massacre 維基。確認：6,440,200 與表格加總 6,424,588 兩數並存；1,143 人、最低 3,000 盾、勒梅爾 85,000、39 名日耳曼人、301 名南尼德蘭；平均約 18% 股利、1669 年 40%；員工 2.5 萬＋1.1 萬、1669 年 5 萬人／150 艘商船／1 萬士兵；4,785 艘船；約百萬人出發、34 萬回來；1740 巴達維亞屠殺 5,000–1 萬多人；開普被奴役者 16,839（1795）；第四次英荷戰爭船隊減半、損失 4,300 萬盾；1619-05-30；1640 加勒、1658 可倫坡、1641 出島；特許狀兩段引文逐字相符，此英譯本沒有條號，日期 1602-03-20。修正：2006 年總理補上巴克內德；小琉球改為 1636 年約 300 人在山洞被燻死、323 人被擄、1645 年最後 13 人被遷走（新增 s6；event-dutch-formosa 卡未提小琉球，無衝突）；班達兵力並列內文 19 艘／1,655 人與資訊框 45 艘／1,905 人；「征服與屠殺」說法在 s4 找不到出處，改為 s4 所列 Meuwese、Averbuch、Dhont 用「種族滅絕」；18% 註明是平均數。員工數、巴達維亞屠殺、開普人數、英荷戰爭損失仍只有維基一個來源。哈拉瑞小節未重開 LitCharts 第 16 章，內容與查核者所知原書相符。s2 EconPapers 摘要頁未開。" }
verification: 交叉確認
lens_status: 依公開資料推論，未對照原書
---

## F1 是什麼、解決什麼問題

到亞洲買香料的船一去要好幾年，風險極大；荷蘭原本有好幾家「先驅公司」互相競爭、互相削價。[s1] 1602 年荷蘭議會把它們合併成一家，讓所有人的錢集中在同一家公司、由同一個董事會指揮，並給它亞洲貿易的獨占權。[s1] 這家公司同時也是一個「準國家」：特許狀讓它可以在亞洲和君主訂約、蓋堡壘、任命總督、維持軍隊。[s1][s3]

## F2 起源與背景

- **1602 年 3 月 20 日**：荷蘭聯省議會頒發特許狀，給予 21 年的獨占權，範圍是好望角以東、麥哲倫海峽以西。[s1][s3]
- **組織**：阿姆斯特丹、台夫特、鹿特丹、恩克赫伊曾、米德爾堡、霍倫六個分部；最高董事會「十七紳士」中，阿姆斯特丹佔 8 席。[s1]
- **募股**：任何公民都可以認購，最低 3,000 荷蘭盾；最大的認購者勒梅爾出了 85,000 盾；共 1,143 名認購者，其中 39 名日耳曼人、301 名來自南尼德蘭。[s1]

## F3 怎麼運作

- **股份轉手**：股份可以在次級市場買賣，其中一個市場後來發展成阿姆斯特丹證券交易所；股東的責任以投入的資本為限。[s1]
- **特許權力**：可以開戰、關押與處決犯人、和外國訂約、鑄造錢幣、建立殖民地。[s1][s3]
- **亞洲據點**：1619 年 5 月 30 日科恩攻下雅加達，建立總部巴達維亞；1640 年攻下錫蘭的加勒、1658 年攻下可倫坡，取得肉桂壟斷；1641 年起在長崎出島，兩百多年間是歐洲人和日本貿易的唯一據點；1652 年在好望角設補給站。[s1]
- **壟斷靠武力**：1621 年科恩帶 19 艘船、1,655 名荷蘭士兵和 286 名日本傭兵征服班達群島（同一維基條目的資訊框另寫 45 艘船、1,905 名歐洲士兵，數字不一），強迫當地只能把肉豆蔻和肉豆蔻皮賣給荷蘭人。[s4] 征服後，荷蘭人從東印度群島、印度和中國輸入奴隸，交給荷蘭種植園主（perkenier）經營肉豆蔻園。[s4]

## F4 規模與數據

- 首次募股的資本，維基百科一處寫 6,440,200 盾，各分部表格加總卻是 6,424,588 盾，來源本身不一致（估計）。[s1]
- 1602–1796 年共派出 4,785 艘船、近百萬名歐洲人前往亞洲，運送超過 250 萬噸貨物與奴隸（估計）。[s1]
- 鼎盛時在亞洲有約 2.5 萬名員工，另有約 1.1 萬人在航途中；1669 年據稱約有 5 萬名員工、150 多艘商船和 1 萬名士兵的私人軍隊（估計）。[s1]
- 近兩百年間平均股利約為原始資本的 18%（這是常被引用的平均數，各年差很多）；1669 年曾發出 40% 的股利。[s1]
- 代價：1602–1795 年約一百萬名水手與工匠從荷蘭出發，只有約 34 萬人回來。[s1] 班達群島原本約 1 萬 5 千人，估計只剩約 1 千人；另一種估計認為單是倫托爾島就只有 4,500–5,000 人，數字取決於算的是哪個範圍。[s4] 1740 年巴達維亞屠殺，學者估計有約 5,000 到 1 萬多名華人遇害；開普殖民地的被奴役人口從 1652 年的 0 增加到 1795 年的 16,839 人。[s1]

## F5 改變了什麼

VOC 讓「大眾出資、股份可轉手、資本長期留在公司」成為一種可行的組織方式，股份的次級市場也帶動了阿姆斯特丹交易所的發展。[s1][s2] 但它在亞洲的獲利建立在壟斷與暴力上，從班達群島到臺灣的小琉球（1636 年討伐，約 300 人在山洞中被燻死），許多地方的原住民付出了慘痛代價。[s1][s4][s6] 1730 年後盈餘下滑、股利卻維持高檔；1780 年第四次英荷戰爭爆發，英國的攻擊讓船隊減半、損失高達 4,300 萬盾，淨資產歸零。[s1] 1796 年董事會被解散、改由委員會管理，特許狀在 1799 年 12 月 31 日到期，公司收歸國有，領地與債務由巴達維亞共和國接手。[s1]

## F6 雙軌解讀

### 李彔

無直接論述。

### 哈拉瑞

依 LitCharts 摘要，《人類大歷史》第 16 章〈資本主義教條〉把 VOC 當成股份公司的例子：這家公司僱用軍隊、蓋堡壘，等於只為了把印尼的貨物賣到歐洲，就殖民了印尼。[s5] 書中也認為，荷蘭能在 1568 年起義後八十年內建立超越西班牙的帝國，靠的是信用：準時還債的名聲，以及保護私有財產、不讓國王任意奪取的法律，讓商人而不是國王推動帝國擴張。[s5]

## F7 今日對照鉤子

結構：一家公司向很多陌生人募資，股東可以在市場上買賣股份，公司本身則長期存在、由董事會經營；今天的上市公司仍是這個結構。[s1][s2] 另一個結構是：公司表面上的高股利，未必代表本業真的賺錢，VOC 晚期就是盈餘下降、股利照發。[s1] 這裡只描述結構，不預測。

## F8 不可類比的差異

VOC 有國家給的獨占權，還能開戰、處決犯人、鑄幣、建立殖民地；今天的上市公司沒有這些權力，也不能用軍隊壟斷原料。[s1][s3] 當時的股東、董事和監督制度也和今天完全不同：學者指出，連董事有限責任這類規則都是邊做邊修出來的，不能把今天的公司治理概念直接套回 17 世紀。[s2]
