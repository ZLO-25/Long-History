---
id: finance-nyse
type: finance
name: 紐約證券交易所
aliases: [New York Stock Exchange, NYSE, 纽约证券交易所, 紐約證交所, 纽交所, 梧桐樹協議, 梧桐树协议, Buttonwood Agreement, New York Stock & Exchange Board, 華爾街, 华尔街, Wall Street, Big Board]
civilization: [美國]
track: west
time:
  start: 1792
  end: 1817
  precision: exact
  src: [s1, s2, s3]
summary_line: 金融｜金融中心｜紐約｜紐約證券交易所
place:
  primary_field: 金融中心
  secondary_fields: [城市／都會]
  locations:
    - { name_ancient: 紐約華爾街, name_modern: 紐約曼哈頓（美國）, lat: 40.7069, lng: -74.0111, precision: schematic, role: 1792 年經紀人在華爾街簽梧桐樹協議；1903 年起交易所大樓位於 Broad Street 18 號（座標為今交易所大樓）, src: [s1, s2] }
  scale: point
structure_tags: [金融制度創新, 慢變結構, 投機泡沫與崩盤]
links: [finance-amsterdam-exchange, finance-great-depression, finance-2008-crisis, finance-taiwan-stock-exchange, tech-telegraph]
counterparts:
  - { id: finance-taiwan-stock-exchange, note: "相似：都是把分散的股票、債券買賣集中到一個有規則的市場。不同：紐約證交所從 1792 年 24 名經紀人的民間約定長出來，1817 年才自訂章程；臺灣證交所是 1961 年在政府規劃下以公司組織成立，起因是土地改革發出的公營事業股票需要集中交易。", src: [s1, s3, s6] }
sources:
  - { id: s1, title: "New York Stock Exchange — Wikipedia", url: "https://en.wikipedia.org/wiki/New_York_Stock_Exchange", accessed: 2026-10-25 }
  - { id: s2, title: "Buttonwood Agreement — Wikipedia", url: "https://en.wikipedia.org/wiki/Buttonwood_Agreement", accessed: 2026-10-25 }
  - { id: s3, title: "This Day in History: May 17, 1792 — Mystic Stamp Company", url: "https://info.mysticstamp.com/this-day-in-history-may-17-1792/", accessed: 2026-10-25 }
  - { id: s4, title: "李彔〈全球價值投資與時代〉北京大學演講（2024 年 12 月，喜馬拉雅資本官網 PDF）", url: "https://cdn.prod.website-files.com/5ef3c7300432b40ed865991a/67a4f8e8160103c8a74017a7_%E5%85%A8%E7%90%83%E4%BB%B7%E5%80%BC%E6%8A%95%E8%B5%84%E4%B8%8E%E6%97%B6%E4%BB%A32024%E5%B9%B412%E6%9C%88.pdf", accessed: 2026-10-25 }
  - { id: s5, title: "Sapiens 第 16 章〈資本主義教條〉摘要（LitCharts）", url: "https://www.litcharts.com/lit/sapiens/chapter-16-the-capitalist-creed", accessed: 2026-10-25 }
  - { id: s6, title: "臺灣證券交易所 — 維基百科（中文）", url: "https://zh.wikipedia.org/zh-tw/臺灣證券交易所", accessed: 2026-10-25 }
verification: 爭議
lens_status: 依公開資料推論，未對照原書
---

## F1 是什麼、解決什麼問題

股票是一家公司的「一小份所有權」；公司要錢擴張，可以把股票賣給很多人 [s4]。但買了股票的人，想把它轉賣時要找得到買家。證券交易所就是一個「固定地點＋固定規則」的市場，讓股票和債券能隨時、公開地轉手 [s1][s3]。紐約證券交易所（NYSE）是今天全世界最大的股票交易所之一 [s1][s3]。

## F2 起源與背景

- **1792 年 5 月 17 日**：24 名經紀人在紐約華爾街簽下「梧桐樹協議」（Buttonwood Agreement）[s1][s2][s3]。紐交所把這一天當作創立日 [s2]。
- **是不是真的在樹下簽？說法不一**：有來源寫簽約地點就在梧桐樹下 [s3]；英文維基則說協議以樹命名，是因為經紀人平常在樹下聚會，「不是因為在那裡簽的」，在樹下簽約只是傳說；它寫的簽約地點是華爾街 68 號外 [s2]。
- **背景**：1815 年美英戰爭結束後，除了政府公債，銀行和保險公司的股票也開始在紐約買賣，市場變大 [s3]。
- **1817 年 3 月 8 日**：經紀人派人去費城觀摩後，通過章程，改組為「紐約證券交易委員會」（New York Stock & Exchange Board），並開始租用專門的交易場地 [s1][s3]。本卡 `time.end` 取 1817 年。

## F3 怎麼運作

- 梧桐樹協議的規則很簡單：簽約的經紀人彼此優先交易（不再透過拍賣商），而且向客戶收的佣金不低於 0.25% [s1][s2][s3]。
- 簡單例子：你想賣 100 股，就請一位會員經紀人在交易所裡找買家；成交後經紀人收佣金 [s2][s3]。
- 1817 年的章程另外禁止操縱價格的交易，讓市場更有秩序 [s3]。

## F4 規模與數據

- 1824 年交易量最高達 38 萬股；1886 年 12 月 15 日首次出現單日百萬股（依 Mystic Stamp 整理）[s3]。
- 截至 2024 年 7 月約有 2,223 家掛牌；總市值英文維基頁面上同時寫著 2025 年 12 月約 44.7 兆美元與 2026 年 1 月超過 30 兆美元，兩數字互相矛盾，僅供參考（估計）[s1]。

## F5 改變了什麼

- **改名與遷址**：1863 年改名為「紐約證券交易所」；1903 年遷入 Broad Street 18 號的大樓，沿用至今 [s1][s3]。
- **新技術擴大市場**：1844 年起電報把行情傳出紐約；之後跨大西洋電纜、股票報價機、電話相繼引進 [s3]。
- **崩盤**：1929 年 10 月的股災被認為引發大蕭條 [s1][s3]；1987 年 10 月 19 日「黑色星期一」，道瓊工業指數一天跌 508 點（22.6%）[s1]。
- **公司化**：2006 年成為上市公司 NYSE Group，2007 年與 Euronext 合併，2013 年被洲際交易所（ICE）收購 [s1]。

## F6 雙軌解讀

### 李彔

李彔在 2024 年北大演講中說，資本市場提供的不只是資金，「更重要的是信用體系」，能把普通儲蓄者的小錢集中成巨大的投資力量；他也稱資本市場是現代經濟的「必要前提和基石」[s4]。他沒有專門談紐交所的起源；以紐交所來看，梧桐樹協議正是一群經紀人先建立彼此的信用規則（本卡推論）[s2][s4]。

### 哈拉瑞

依公開摘要，哈拉瑞認為資本主義靠的是對「未來」的信任：人們相信未來會更好，才願意借錢、投資股份公司 [s5]。他也提到荷蘭西印度公司殖民的地方後來成為紐約 [s5]。他沒有直接談紐交所；交易所可以看成讓這種「信任」能被買賣的場所（本卡推論）。

## F7 今日對照鉤子

結構：一群人先自訂規則（最低佣金、只跟會員交易），之後慢慢變成全國甚至全球的公共市場 [s1][s2][s3]。今天很多新市場（例如新的交易平台）也常從「少數成員的私人約定」開始，再走向公開規則與政府監管——這只是結構相似，不代表結果相同。

## F8 不可類比的差異

1792 年的協議只是 24 人之間的約定，沒有政府監管、沒有資訊公開的法律要求 [s2][s3]；美國證券交易委員會（SEC）要到 1934 年才成立（見大蕭條卡）。當時能參與的人極少，和今天數以億計的散戶、電子撮合交易的市場規模完全不同 [s1]。
