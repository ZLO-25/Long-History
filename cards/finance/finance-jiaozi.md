---
id: finance-jiaozi
type: finance
name: 交子
aliases: [官交子, 私交子, 交子务, 益州交子務, Jiaozi, jiaozi paper money, Song dynasty paper money, 錢引, 钱引, 張詠, 张咏, 世界最早紙幣]
civilization: [中國（北宋）]
track: china
time:
  start: 1024
  end: 1107
  precision: disputed
  src: [s1, s2]
summary_line: 金融｜金融中心｜成都｜交子
place:
  primary_field: 金融中心
  secondary_fields: [商路, 宮廷／政治中心]
  locations:
    - { name_ancient: 益州（成都）, name_modern: 成都（中國四川）, lat: 30.657, lng: 104.066, precision: schematic, role: 私交子出現地與益州交子務所在（座標為今成都市區）, src: [s1, s2] }
  scale: point
structure_tags: [金融制度創新, 貨幣貶值, 慢變結構]
links: [event-wang-anshi-reform, tech-paper, tech-movable-type, finance-bank-of-england, finance-shanxi-piaohao]
counterparts:
  - { id: finance-bank-of-england, note: "相似：都是政府財政吃緊時出現的紙上信用，一張紙能代表金屬貨幣（交子代表鐵錢，英格蘭銀行券可兌換金幣），也都先由民間開始、再和國家財政綁在一起。不同：官交子由朝廷的交子務直接發行，發多少由朝廷決定，後來為了籌錢增發而貶值；英格蘭銀行由私人股東出資借錢給政府，利息由國會通過的稅收支付，紙鈔起初可兌換金幣。", src: [s1, s2, s6, s7] }
sources:
  - { id: s1, title: "Jiaozi (currency) — Wikipedia", url: "https://en.wikipedia.org/wiki/Jiaozi_(currency)", accessed: 2026-10-25 }
  - { id: s2, title: "交子 — 維基百科（中文）", url: "https://zh.wikipedia.org/zh-tw/交子", accessed: 2026-10-25 }
  - { id: s3, title: "Provincial China 期刊論文（UTS ePress，僅依搜尋摘要引用）", url: "https://epress.lib.uts.edu.au/journals/index.php/provincial_china/article/view/2844/pdf", accessed: 2026-10-25 }
  - { id: s4, title: "李彔《現代化十六講》之九（現代化有沒有可能在中國誕生），虎嗅 2014", url: "https://www.huxiu.com/article/38364.html", accessed: 2026-10-25 }
  - { id: s5, title: "Sapiens 第 10 章〈金錢的味道〉摘要（LitCharts）", url: "https://www.litcharts.com/lit/sapiens/chapter-10-the-scent-of-money", accessed: 2026-10-25 }
  - { id: s6, title: "Bank of England — Wikipedia", url: "https://en.wikipedia.org/wiki/Bank_of_England", accessed: 2026-10-25 }
  - { id: s7, title: "Bank of England note issues — Wikipedia", url: "https://en.wikipedia.org/wiki/Bank_of_England_note_issues", accessed: 2026-10-25 }
verification: 爭議
lens_status: 依公開資料推論，未對照原書
---

## F1 是什麼、解決什麼問題

交子是北宋四川出現的紙做的「錢票」，一般認為是世界上最早的紙幣 [s1]。四川當時用的是鐵錢，又重又不值錢，做生意要搬一大堆，非常不方便 [s1][s2]。有了交子，商人只要帶一張紙，就能代表一大筆鐵錢 [s1][s2]。

## F2 起源與背景

- **私交子**：宋真宗時（997–1022），四川商人開始發行交子 [s2]。關於年份說法不一：有學術論文說約 1005 年成都知府把發行權限定給 16 家大商號 [s3]；中文維基則寫約 1008–1016 年，知益州張詠讓 16 戶富商聯合發行、互相擔保 [s2]。
- **危機**：1020 年（天禧四年）有商號付不出錢、民眾擠兌，知州寇瑊下令關閉交子鋪 [s2]。
- **官交子**：1023 年（天聖元年）朝廷設立益州交子務，1024 年正式發行官方交子 [s1][s2]。本卡 `time.start` 取 1024 年。

## F3 怎麼運作

- 交子分「界」發行，到期要以舊換新；一界多長，來源有兩年、三年的不同說法 [s1][s2]。
- 第一界官交子發行約 125.6 萬貫，朝廷準備約 36 萬貫鐵錢作為兌換的準備金 [s2]；英文維基則寫成發行上限 1,255,340 緡、準備為其五分之一 [s1]。
- 簡單例子：商人把鐵錢存進交子鋪拿到交子，到別處再把交子換回鐵錢；私交子時代兌換時每貫收 30 文手續費 [s1]。

## F4 規模與數據

- 首界官交子約 125.6 萬貫（估計，見上）[s1][s2]。
- 後來流通量增到約 378 萬緡，再增到約 414 萬緡（估計）[s1]。

## F5 改變了什麼

紙幣讓大額交易不再受金屬錢重量限制 [s1][s2]。但朝廷很快把它當成籌錢工具：1070 年代起發行量擴大，紹聖（1094）、元符（1098）年間再增發，交子開始貶值 [s2]。1105 年（英文維基）或 1107 年（大觀元年，中文維基）交子被改名為「錢引」，舊交子不再兌換 [s1][s2]；本卡 `time.end` 取 1107 年。之後四川的紙幣一路延續到 1256 年改為會子 [s1][s2]。

## F6 雙軌解讀

### 李彔

無直接論述：查到的李彔公開講稿沒有談交子或紙幣。他指出中國四大發明中有三項出現在宋代 [s4]，但也說中國歷史上「每到財政出現問題的時候，商業階層就成為政府的提款機」，商業活動總是為國家政權服務 [s4]。交子由商人發明、後來被朝廷接手並為了籌錢大量增發而貶值，可以拿來對照這個說法（此為本卡推論）[s2]。

### 哈拉瑞

無直接論述：查到的摘要沒有提到交子。依 LitCharts 摘要，哈拉瑞認為金錢是讓陌生人能大規模合作的互相信任系統，什麼東西都能當錢，只要大家同意它有價值，他稱之為「純粹心理上的革命」[s5]。交子本身只是一張紙，它能代表大筆鐵錢，正是這種信任的例子；1020 年私交子擠兌，則是信任崩潰的樣子（此為本卡推論）[s2][s5]。

## F7 今日對照鉤子

結構：一張紙之所以值錢，是因為大家相信發行者能兌現 [s1][s2]。私人發行者一出問題就會擠兌（1020 年）[s2]，改由國家發行後，最大的風險變成「發行者自己印太多」[s2]。

## F8 不可類比的差異

交子只在四川等地區流通，背後是鐵錢準備與有效期限的「界」制度，不是全國統一、無期限的現代法定貨幣 [s1][s2]。宋代也沒有獨立的中央銀行，發行量直接由朝廷財政需要決定 [s2]。
