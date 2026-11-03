---
id: war-chinese-civil-war
type: war
name: 國共內戰（1945–1949年）
aliases: [國共內戰, 第二次國共內戰, 三大戰役, 徐蚌會戰, 淮海戰役, 遼瀋戰役, 平津戰役, 渡江戰役, 解放戰爭, 動員戡亂, Chinese Civil War, 國民政府失去中國大陸, 戡亂, Chinese Civil War (1945–1949)]
civilization: [中華民國, 中華人民共和國]
track: china
time:
  start: 1945
  end: 1949
  precision: exact
  src: [s1, s2, s3]
summary_line: 戰爭｜戰場｜東北、華北、徐州、長江｜國共內戰（1945–1949年）
place:
  primary_field: 戰場
  secondary_fields: [宮廷／政治中心]
  locations:
    - { name_ancient: 錦州、瀋陽（遼瀋戰役）, name_modern: 遼寧省錦州至瀋陽一帶（中國）, lat: 41.8057, lng: 123.4315, precision: schematic, role: 1948 年 9–11 月遼瀋戰役，共軍拿下東北（座標為瀋陽示意）, src: [s1, s3] }
    - { name_ancient: 徐州（淮海戰役／徐蚌會戰）, name_modern: 江蘇省徐州市（中國）, lat: 34.2058, lng: 117.2841, precision: schematic, role: 1948 年底至 1949 年 1 月最大規模的會戰, src: [s1, s3] }
    - { name_ancient: 南京, name_modern: 江蘇省南京市（中國）, lat: 32.0603, lng: 118.7969, precision: exact, role: 國民政府首都，1949 年 4 月 23 日被共軍攻占, src: [s1, s3] }
  scale: area
structure_tags: [惡性通膨, 合法性危機, 外部勢力介入, 革命與政權更替, 財政枯竭]
topics: [內戰, 通貨膨脹, 土地制度, 冷戰]
links: [war-sino-japanese-1937, finance-gold-yuan-1948, event-prc-founding, event-taiwan-martial-law, event-taiwan-land-reform, finance-taiwan-1949-currency]
causes:
  - { id: war-sino-japanese-1937, rel: 背景, why: 八年抗戰拖垮國民政府財政與軍隊，共產黨則在敵後擴張到約一百二十萬正規軍，戰後兩黨都有爭天下的實力。, src: [s1, s2] }
effects:
  - { id: event-prc-founding, rel: 直接引發, why: 共軍打贏三大戰役、渡過長江，毛澤東在 1949 年 10 月 1 日宣布成立中華人民共和國。, src: [s1, s2, s3] }
  - { id: event-taiwan-martial-law, rel: 促成, why: 國府內戰失利、1949 年底遷到臺北，把臺灣當成反攻基地，以戒嚴等非常手段控制社會。, src: [s1, s3, event-taiwan-martial-law:s1] }
  - { id: finance-taiwan-1949-currency, rel: 促成, why: 內戰軍費讓臺灣銀行被迫替中央墊款，鈔票越印越多，臺灣物價跟著失控。, src: [finance-taiwan-1949-currency:s1] }
counterparts:
  - { id: war-american-civil-war, note: "相似：同一國家內兩個陣營爭奪誰代表全國，結果決定之後百年的政治走向。不同：南北戰爭以聯邦重新統一收場；國共內戰的輸家退到臺灣，形成兩個政府長期對峙。", src: [s1] }
sources:
  - { id: s1, title: "Chinese Civil War — Wikipedia", url: "https://en.wikipedia.org/wiki/Chinese_Civil_War", accessed: 2026-11-02, tier: 百科 }
  - { id: s2, title: "The Chinese Revolution of 1949 — Office of the Historian, U.S. Department of State", url: "https://history.state.gov/milestones/1945-1952/chinese-rev", accessed: 2026-11-02, tier: 通論 }
  - { id: s3, title: "第二次國共內戰 — 維基百科（中文）", url: "https://zh.wikipedia.org/wiki/%E7%AC%AC%E4%BA%8C%E6%AC%A1%E5%9B%BD%E5%85%B1%E5%86%85%E6%88%98", accessed: 2026-11-02, tier: 百科 }
  - { id: s4, title: "Dean Acheson, statement on United States Relations with China (China White Paper), 5 August 1949 — Internet Modern History Sourcebook, Fordham University", url: "https://sourcebooks.web.fordham.edu/mod/1949-acheson-china.asp", accessed: 2026-11-02, tier: 一手 }
importance: 3
summary_card: true
learn:
  histories: [中國史, 臺灣史]
  why_care: 今天海峽兩岸為什麼有兩個政府、臺灣為什麼有那麼多 1949 年來的「外省」家庭，答案都從這場四年的內戰開始。
  story: |
    1945 年日本投降，蔣介石的國民黨和毛澤東的共產黨在重慶談判，美國也派馬歇爾來調停，想讓雙方組聯合政府，但互不信任，1946 年 6 月內戰全面爆發。[s1][s2] 一開始國軍人數較多，還攻下共產黨的根據地延安；但國府印鈔支應軍費，惡性通膨讓士兵的薪水變成廢紙，貪污與逃兵嚴重。[s1] 共產黨則在東北拿到蘇聯轉交的日軍武器，又靠土地改革吸引無地農民參軍。[s1][s2] 1948 年下半年到 1949 年初，共軍打贏遼瀋、淮海（徐蚌）、平津三大戰役，國軍主力幾乎全失。[s1][s3] 1949 年 4 月共軍渡過長江、攻下南京；10 月 1 日毛澤東宣布成立中華人民共和國；12 月國民政府決定遷到臺北。[s1][s3] 美國國務卿艾奇遜在白皮書中說，國軍「不必被打敗，它們自己瓦解了」。[s4]
  key_terms:
    - { term: 三大戰役, plain: 1948–1949 年遼瀋、淮海（國府稱徐蚌會戰）、平津三場大會戰，決定了內戰勝負。, example: 像籃球決賽打到最後三節，比分一路拉開，勝負就定了。 }
    - { term: 馬歇爾調停, plain: 1945 年底到 1946 年美國派馬歇爾將軍到中國，想讓國共停火、組成聯合政府，最後失敗。, example: 像兩個吵架的同學由老師出面調解，但兩人都不相信對方，調解破局。 }
    - { term: 遷臺, plain: 1949 年 12 月中華民國政府決定把中央政府搬到臺北，大批軍民隨之來臺。, example: 像一家公司總部從大城市搬到一座島上的分公司，繼續營業。 }
  primary_source:
    - { text: "The Nationalist armies did not have to be defeated; they disintegrated.（國民黨的軍隊不必被打敗，它們自己瓦解了。）", from: 美國國務卿艾奇遜為《美國與中國的關係》（中國白皮書）所寫的說明，1949 年 8 月 5 日公布（Fordham 大學 Internet Modern History Sourcebook 收錄節本；中文為本站摘譯）, src: s4 }
  historiography: |
    **國府是自己垮的，還是被誰「弄丟」的？** 美國政府 1949 年的白皮書主張，美國戰後已給國府約 20 億美元援助，內戰結果是中國內部力量決定的，美國無法控制；國府的失敗主要來自本身的腐敗與失去民心。[s4][s2] 但美國國內的批評者指責杜魯門政府「失去了中國」，認為援助不夠、調停時還一度暫停對國府的軍售。[s1][s2]
    **共產黨為什麼贏？** 一種說法強調共產黨的組織、士氣與土地改革贏得農民支持；另一種說法強調外部因素，例如蘇聯在東北把日軍武器交給共軍、阻擋國軍進入。[s1][s2] 中共官方敘事則把勝利歸於人民支持與正確路線，並稱這段為「解放戰爭」。[s3]
  misconceptions:
    - 國共內戰不是 1949 年就「全部結束」：國軍在 1950 年才撤離海南島，金門、馬祖等島嶼之後仍由中華民國控制，雙方也從未簽停戰協定。[s3]
    - 國軍一開始並不弱：1946 年國軍人數與裝備都占優勢，還在 1947 年攻下延安；局勢是在 1948 年才急轉直下。[s1]
crosscheck:
  date: 2026-11-02
  by: 獨立查核 agent（未參與寫作）
  result: 通過
  notes: "開啟 s1–s4 逐句核對（1946/6/26 全面開戰、三大戰役、渡江、南京 4/23、10/1、12/7 遷臺、海南 1950、白皮書引文與約 20 億美元）。修正：刪除前因 finance-gold-yuan-1948（與對方卡互指、且 1948 年事件不宜作 1945 年開始之戰爭的前因；兩卡仍以 links 相連）；蘇聯是拒絕國軍通過蘇軍控制區（來源未提「海路」）；白皮書出處改為 1949/8/5 公布之聲明節本；A9 刪去 s1 未支持的「戒嚴」；人民解放軍改稱年份不寫死。"
verification: 交叉確認
lens_status: 無直接論述
---

## A1 交戰方與聯盟結構

一方是蔣介石領導的國民黨與中華民國國民政府，戰後接收大批日軍裝備，並獲得美國援助；另一方是毛澤東領導的中國共產黨與其軍隊（後稱人民解放軍）。[s1][s2] 美國援助國府，但也派馬歇爾調停；蘇聯名義上承認國府，卻在東北把繳獲的日軍武器交給共軍，並拒絕讓國軍通過蘇軍控制區進入東北。[s1]

## A2 起因：結構與導火線

**結構**：國共兩黨從 1927 年起就是敵人，抗戰期間的合作只是暫時停火；抗戰結束時共產黨已有約 120 萬正規軍與大批民兵，兩黨都想主導戰後中國。[s1][s2] 國府經過八年戰爭財政枯竭，接收時的貪污與通膨又讓民心流失。[s1][s2]

**導火線**：1945 年 8–10 月的重慶談判只簽下「雙十協定」，沒有實際結果；馬歇爾調停下的停火在 1946 年破局，1946 年 6 月國府下令全面進攻，內戰全面爆發。[s1][s3]

## A7 關鍵轉折

- **1946 年 6 月**：停火破局，全面內戰。[s1][s3]
- **1947 年 3 月**：國軍攻下延安，但共軍很快反攻。[s1]
- **1948 年 9–11 月**：遼瀋戰役，共軍攻下錦州、瀋陽，控制東北。[s1][s3]
- **1948 年 11 月–1949 年 1 月**：淮海（徐蚌）與平津戰役，國軍主力損失殆盡，北平和平易手。[s1][s3]
- **1949 年 4 月**：共軍渡過長江，4 月 23 日攻下南京。[s1][s3]

## A8 結果

1949 年 10 月 1 日毛澤東在北京宣布成立中華人民共和國；12 月 7 日國民政府決定遷設臺北，中華民國政府此後實際統治臺灣、澎湖、金門、馬祖等地。[s1][s2][s3] 雙方沒有簽訂停戰或和平條約。[s3]

## A9 長期影響

內戰造成海峽兩岸兩個政府長期對峙，至今未解。[s2][s3] 大批軍民隨政府來臺，國府把臺灣當作反攻基地，並推行土地改革。[s1] 在美國國內，「誰丟了中國」成為政治爭論；韓戰爆發後美國轉而協防臺灣，美國與中華人民共和國二十多年沒有外交關係。[s2]
