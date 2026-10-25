---
id: commodity-manila-galleon
type: commodity
name: 馬尼拉大帆船：白銀換絲綢的太平洋航線（1565–1815）
aliases: [馬尼拉大帆船, 大帆船貿易, 中國之船, 阿卡普爾科, 馬尼拉, 生理人, 八連, Parián, Manila galleon, Nao de China, Acapulco galleon, Sangley]
civilization: [東南亞（菲律賓）, 伊比利半島（西班牙）, 拉丁美洲（墨西哥）, 中國（明）]
track: east
time:
  start: 1565
  end: 1815
  precision: exact
  src: [s1, s2]
summary_line: 物資｜商路｜馬尼拉—阿卡普爾科｜馬尼拉大帆船：白銀換絲綢的太平洋航線（1565–1815）
place:
  primary_field: 商路
  secondary_fields: [港口／海峽]
  locations:
    - { name_ancient: 馬尼拉, name_modern: 馬尼拉（菲律賓）, lat: 14.5896, lng: 120.9747, precision: exact, role: 1571 年起為西班牙在亞洲的據點與大帆船起點, src: [s1, s4] }
    - { name_ancient: 阿卡普爾科, name_modern: 阿卡普爾科（墨西哥）, lat: 16.8531, lng: -99.8237, precision: exact, role: 美洲端港口, src: [s1, s2] }
    - { name_ancient: 月港（漳州）, name_modern: 福建省漳州市海澄（中國）, lat: 24.38, lng: 117.83, precision: schematic, role: 運貨到馬尼拉的福建港口之一, src: [s1] }
  scale: line
structure_tags: [商路改道, 關鍵原料壟斷, 單一港口依賴, 外部勢力介入]
links: [finance-ming-baochao, commodity-silver-flow, commodity-silk, event-spanish-north-taiwan]
counterparts:
  - { id: commodity-silk, note: "相似：都是中國絲綢往外流、換回別人的貴重物品。不同：漢代絲路走陸路、經過許多中間商；大帆船是 16 世紀起橫跨太平洋的直接海路，換回的是美洲白銀。", src: [s1, s2] }
sources:
  - { id: s1, title: "Manila galleon — Wikipedia", url: "https://en.wikipedia.org/wiki/Manila_galleon", accessed: 2026-10-25, tier: 百科 }
  - { id: s2, title: "Mark Cartwright, Manila Galleon — World History Encyclopedia，2021-10-29", url: "https://www.worldhistory.org/Manila_Galleon/", accessed: 2026-10-25, tier: 通論 }
  - { id: s3, title: "Guillermo Ruiz-Stovel, Chinese Merchants, Silver Galleons, and Ethnic Violence in Spanish Manila, 1603–1686 — México y la Cuenca del Pacífico 12(36)", url: "https://mexicoylacuencadelpacifico.cucsh.udg.mx/index.php/mc/article/view/330", accessed: 2026-10-25, tier: 學術 }
  - { id: s4, title: "Why historians call Manila the world's first global city — seasia.co，2026-06-28（介紹 Flynn 與 Giráldez 1995 年論文）", url: "https://seasia.co/2026/06/28/why-historians-call-manila-the-worlds-first-global-city", accessed: 2026-10-25, tier: 摘要 }
  - { id: s5, title: "Silver and the Ming Dynasty — Modern World History: New Perspectives（ASCCC OERI 開放教材，LibreTexts）", url: "https://human.libretexts.org/Bookshelves/History/World_History/Modern_World_History%3A_New_Perspectives_(OERI)/02%3A_Global_Interactions_-_1450-1650/2.06%3A_Silver_and_the_Ming_Dynasty", accessed: 2026-10-25, tier: 通論 }
  - { id: s6, title: "Kevin H. O'Rourke & Jeffrey G. Williamson, When Did Globalization Begin? — NBER Working Paper 7632，2000", url: "https://www.nber.org/papers/w7632", accessed: 2026-10-25, tier: 學術 }
importance: 3
learn:
  histories: [東南亞史, 中國史, 世界通史, 錢的歷史]
  why_care: 墨西哥挖出來的銀子，經過太平洋到馬尼拉，再流進福建商人的口袋；這條航線讓地球上的大洲第一次天天在做生意。
  story: |
    1565 年，西班牙航海家烏達內塔找到從菲律賓回美洲的航路，從此大帆船橫越太平洋往返長達 250 年。[s1][s2] 1571 年西班牙把馬尼拉當作亞洲據點。[s4] 從美洲阿卡普爾科出發的船載滿白銀，從馬尼拉回程的船則載著福建商人運來的絲綢和瓷器。[s1][s2] 為什麼要千里迢迢送銀子？因為明朝改用白銀後，銀子在中國比在別處值錢得多。[s4][s5] 航程極其凶險，回美洲要四到八個月，一趟常死幾十到一百多人。[s2] 馬尼拉的華人（西班牙人叫他們「生理人」）人數眾多，卻被隔離居住，還多次遭到屠殺。[s3]
  key_terms:
    - { term: 大帆船, plain: 16–18 世紀西班牙的大型遠洋帆船，可以載很多貨物和武裝。, example: 那個時代的「貨櫃輪＋軍艦」。 }
    - { term: 轉口港, plain: 貨物在這裡卸下、交易，再轉運到別的地方，本身不一定生產這些貨。, example: 新加坡、香港今天也還扮演這種角色。 }
    - { term: 生理人（Sangley）, plain: 西班牙人對在菲律賓經商、做工的福建華人的稱呼。, example: 就像今天說「臺商」，指一群在外地做生意的人。 }
  primary_source:
    - { text: "The voyage from the Philippine Islands to America may be called the longest and most dreadful of any in the world.（從菲律賓到美洲的航程，可以說是世界上最漫長、最可怕的。）", from: 義大利旅行家傑梅利．卡雷里（Gemelli Careri）1696–1697 年搭乘大帆船橫渡太平洋的遊記（轉引自 World History Encyclopedia；中文為本站摘譯）, src: s2 }
  historiography: |
    **全球化從 1571 年開始嗎？** 經濟史學者弗林（Dennis Flynn）與吉拉德茲（Arturo Giráldez）1995 年主張，1571 年馬尼拉建城後，世界各大洲第一次「持續不斷」地互相交換貨物，全球貿易就此誕生；他們也認為中國對西方的影響遠大於歐洲對亞洲。[s4] 另一派經濟史學者歐羅克（O'Rourke）與威廉森（Williamson）用價格資料檢驗，認為真正的全球市場整合要到 19 世紀才出現。[s6]
    **到底運了多少銀？** 數字差距很大：開放教材寫每年約 128 公噸橫越太平洋，World History Encyclopedia 寫每趟最多 300 萬比索，並引用一個保守估計說整個 17 世紀合計從墨西哥運到馬尼拉的白銀約 55 公噸（這是整個世紀的總數，不是每年；而且明顯偏低，只是一種說法）。[s2][s5] 走私沒有登記，是數字難算的主因之一（本卡推論）。
  misconceptions:
    - 大帆船不是每年很多艘：1593 年後官方規定每年最多兩艘，常常只有一艘。[s1][s2]
    - 菲律賓本身不是絲綢和瓷器的產地：貨物多由福建商人從泉州、月港等地運來，馬尼拉是轉口港。[s1][s3]
  perspectives:
    - { history: 東南亞史, text: 從東南亞看，馬尼拉因此成為多民族的國際都市，但當地華人也承受隔離與屠殺。 }
    - { history: 中國史, text: 從中國看，福建商人靠這條航線把絲綢瓷器換成白銀，撐起明朝的白銀經濟。 }
    - { history: 世界通史, text: 從世界看，這是太平洋第一次被固定的商業航線連起來。 }
verification: 交叉確認
lens_status: 無直接論述
---

## B1 物資與用途

往東（馬尼拉→阿卡普爾科）主要是中國絲綢、瓷器，以及香料、印度棉布等亞洲商品；往西（阿卡普爾科→馬尼拉）主要是美洲白銀。[s1][s2]

## B2 產地與控制權

航線由西班牙王室管制；白銀來自墨西哥與祕魯（玻利維亞）的礦場，絲綢瓷器則由福建商人運到馬尼拉。[s1][s2][s5]

## B3 生產技術與勞動

大帆船船員 16 世紀約 100 人、18 世紀可達 250 人；許多船在菲律賓建造，船員中也有華人與菲律賓人。[s2]

## B4 運輸路線與咽喉

1565 年烏達內塔找到利用北太平洋西風帶回美洲的航線；回美洲航程約 4–8 個月，往菲律賓約 3–4 個月。[s1][s2] 貨物到阿卡普爾科後，再用騾隊經陸路運到墨西哥城和韋拉克魯斯。[s1]

## B5 規模與數量

- 1593 年後規定每年最多兩艘出航。[s1]
- 每趟回程最多約 300 萬比索白銀；整體運量各家估計差距很大（見「史家怎麼吵」）。[s2][s5]
- 250 年間只有 4 艘被敵人俘獲，至少 30 艘沉沒；一趟常有 50–150 人死亡。[s2]

## B6 經濟與財政角色

明朝改以白銀繳稅，使白銀在中國的價值約是歐洲的兩倍，美洲白銀因此大量流向亞洲。[s4][s5]

## B7 權力與政治連結

馬尼拉的華人被限制住在城外的「八連」（Parián），1603、1639、1686 年發生起事與屠殺，估計共有 4 萬多名華人遇害（估計）。[s3]

## B8 雙軌解讀

### 李彔

無直接論述：查不到李彔公開講稿談馬尼拉大帆船。

### 哈拉瑞

無直接論述：查不到哈拉瑞公開摘要談馬尼拉大帆船。

## B9 今日對照鉤子

「一條遠洋航線把兩個大洲的經濟綁在一起，一端需要貨、一端需要錢」的結構，以及「轉口港因貿易致富，但也因族群問題爆發衝突」。[s3][s4]

## B10 不可類比的差異

大帆船是王室壟斷、每年一兩艘的貿易，運量和今天的貨櫃航運差好幾個數量級；當時也沒有國際法保障移民，不能把它直接比作今天的自由貿易。[s1][s2][s3]
