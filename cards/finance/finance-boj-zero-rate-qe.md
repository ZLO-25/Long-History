---
id: finance-boj-zero-rate-qe
type: finance
name: 日銀零利率與量化寬鬆（1999–2006）
aliases: [零利率政策, 量化寬鬆, ゼロ金利政策, 量的緩和政策, ZIRP, zero interest rate policy, quantitative easing, QE, 日本銀行量化寬鬆, 通貨緊縮, 通縮, deflation, 速水優, 福井俊彥, 活期存款餘額目標, current account balance target, 零利率, 日银量化宽松]
civilization: [日本（近現代）]
track: east
time:
  start: 1999
  end: 2006
  precision: exact
  src: [s1, s2, s4]
summary_line: 金融｜金融中心｜東京｜日銀零利率與量化寬鬆（1999–2006）
place:
  primary_field: 金融中心
  locations:
    - { name_ancient: 日本銀行總行（日本橋）, name_modern: 東京都中央區日本橋本石町（日本）, lat: 35.6866, lng: 139.7716, precision: schematic, role: 日本銀行貨幣政策會議所在地（座標示意）, src: [s1, s2] }
  scale: point
structure_tags: [金融制度創新, 長期衰退, 慢變結構]
topics: [中央銀行, 泡沫與金融危機, 國債與公債]
links: [finance-japan-banking-crisis-1997, finance-japan-lost-decade, finance-japan-bubble, finance-2008-crisis, finance-abenomics, finance-japan-2024-negative-rate-end]
causes:
  - { id: finance-japan-banking-crisis-1997, rel: 直接引發, why: 銀行接連倒閉、經濟惡化與物價下跌，日本銀行在 1999 年 2 月決定讓短期利率盡可能走低。, src: [s1] }
  - { id: finance-japan-lost-decade, rel: 背景, why: 泡沫破後長期停滯與通縮，讓傳統降息工具一路用到利率接近零。, src: [s3, s5] }
effects:
  - { id: finance-abenomics, rel: 背景, why: 2001–2006 年的量化寬鬆是日本第一次以「資金量」為目標的實驗，後來更大規模的寬鬆是在這個經驗上展開（細節見該卡）。, src: [s4, s5] }
counterparts:
  - { id: finance-2008-crisis, note: "相似：利率降到零後，央行都改用大量供應資金的方式。不同：日本是在長期通縮中先試，美、英等國是在 2008 年危機後跟進，規模與速度不同。", src: [s5] }
sources:
  - { id: s1, title: "Bank of Japan, Announcement of the Monetary Policy Meeting Decisions, 1999-02-12（零利率政策開始）", url: "https://www.boj.or.jp/en/mopo/mpmdeci/mpr_1999/k990212c.htm", accessed: 2026-11-07, tier: 一手 }
  - { id: s2, title: "Bank of Japan, Statements on Monetary Policy 1999（全年政策聲明列表，2–12 月多次標示「Zero interest rate policy maintained」）", url: "https://www.boj.or.jp/en/mopo/mpmdeci/state_1999/index.htm", accessed: 2026-11-07, tier: 一手 }
  - { id: s3, title: "Takatoshi Ito and Frederic S. Mishkin, Two Decades of Japanese Monetary Policy and the Deflation Problem, NBER Working Paper No. 10878, 2004（NBER 摘要頁）", url: "https://www.nber.org/papers/w10878", accessed: 2026-11-07, tier: 學術 }
  - { id: s4, title: "Bank of Japan, New Procedures for Money Market Operations and Monetary Easing, 2001-03-19", url: "https://www.boj.or.jp/en/mopo/mpmdeci/mpr_2001/k010319a.htm", accessed: 2026-11-07, tier: 一手 }
  - { id: s5, title: "Quantitative easing — Wikipedia", url: "https://en.wikipedia.org/wiki/Quantitative_easing", accessed: 2026-11-07, tier: 百科 }
  - { id: s6, title: "Lost Decades — Wikipedia", url: "https://en.wikipedia.org/wiki/Lost_Decades", accessed: 2026-11-07, tier: 百科 }
importance: 2
learn:
  histories: [日本史, 錢的歷史]
  why_care: 利率降到零之後，央行還能做什麼？日本是第一個被迫回答這個問題的大國，後來美國、英國和歐元區在 2008 年危機後也用了類似的政策。[s5]
  story: |
    1990 年代泡沫破掉後，日本經濟一直起不來，物價甚至開始往下掉。[s6] 1997–1998 年銀行接連倒閉，1999 年 2 月 12 日，日本銀行宣布讓短期利率「盡可能走低」，先降到 0.15% 左右，這就是零利率政策。[s1] 2000 年 8 月，日本銀行認為景氣好轉而升息，結束零利率；但物價仍在下跌，學者伊藤隆敏與 Mishkin 認為這是嚴重失誤。[s3][s5] 2001 年 3 月 19 日，日本銀行改變做法：不再只看利率，而是以「銀行存在央行的錢」約 5 兆日圓為目標，大量供應資金，並承諾要做到消費者物價穩定地不再下跌。[s4] 這個目標在四年內從 5 兆提高到 35 兆日圓，2006 年 3 月才逐步退場。[s5]
  key_terms:
    - { term: 零利率政策, plain: 央行把銀行之間借錢的短期利率壓到幾乎是零，讓借錢變得非常便宜。, example: 原本借 100 萬一年要付 5 萬利息，現在幾乎不用付。 }
    - { term: 量化寬鬆, plain: 利率已經是零時，央行改用「放多少錢出去」當目標，大量向銀行買公債、把錢灌進銀行體系。, example: 水龍頭已經開到最大，乾脆再拿水桶直接倒水。 }
    - { term: 通貨緊縮, plain: 物價持續下跌；大家延後消費、企業減薪減投資，經濟更冷。, example: 大家都等下個月更便宜才買手機，店家賣不出去只好裁員。 }
  primary_source:
    - { text: "The Bank will encourage the uncollateralized overnight call rate to move as low as possible.（本行將促使無擔保隔夜拆款利率盡可能走低。）", from: 日本銀行貨幣政策會議決定，1999 年 2 月 12 日（中文為本站中譯）, src: s1 }
  historiography: |
    **日本銀行做得太少、太慢？** 伊藤隆敏與 Mishkin（2004）批評日本銀行 1998–2003 年的政策，特別是 2000 年 8 月在物價仍下跌時結束零利率。[s3] 克魯曼等人則用「流動性陷阱」來解釋：利率再低，大家還是不想借錢花錢。[s6]
    **問題根本不在央行？** 辜朝明主張「資產負債表衰退」：企業忙著還債而不借錢，央行放再多錢也沒用，應該靠政府支出；林文夫與 Prescott 則認為主因是生產力成長變慢。[s6] 這些解釋各自強調不同原因，至今沒有共識。[s6]
  misconceptions:
    - 量化寬鬆不是「印鈔票直接發給民眾」：日本銀行是以金融機構存在央行的活期存款餘額為目標，透過向銀行買資產來供應資金。[s4]
    - 日本的零利率在 2000 年 8 月曾經中斷過，2001 年 3 月才改採量化寬鬆，不是一路連續。[s3][s4]
  hindsight: |
    事後看，「早點大膽寬鬆、不要太早升息」似乎是明擺著的答案。[s3] 但 1999–2001 年的決策者手上沒有前例：零利率之後怎麼做、量化寬鬆會不會有副作用，全世界都沒有經驗，他們要在不確定中嘗試。[s3][s5] 另外，「日本靠量化寬鬆走出通縮」或「量化寬鬆完全沒用」這兩種簡單說法都有問題：經濟回升同時受到銀行壞帳清理、出口等多種因素影響，很難只歸功或歸罪給一種政策。[s5][s6] 本卡不構成投資建議。
verification: 交叉確認
lens_status: 無直接論述
crosscheck: { date: 2026-11-07, by: 獨立查核 agent（未參與寫作）, result: 通過, notes: "1) 重新打開日銀 2001-03-19 決定（s4）：操作目標改為日銀活期存款餘額、約 5 兆日圓、持續到全國 CPI（不含生鮮）年增率穩定在零以上，皆相符。2) 打開 NBER w10878 摘要頁（s3，只看摘要未讀全文）：確認批評 1998–2003 年政策、明言 2000 年 8 月在通縮中升息是嚴重錯誤、強調管理預期。3) 打開 Quantitative easing 條目（s5）：2001-03-19 採行、四年內從 5 兆提高到 35 兆日圓、2006 年 3 月退場、美英歐元區後來採類似政策，皆相符；該條目未提 2000 年 8 月升息，所以該句主要靠 s3。4) 打開 Lost Decades 條目（s6）：1991–2003 年均 1.14%、克魯曼流動性陷阱、辜朝明資產負債表衰退、林文夫與 Prescott 生產力說相符。5) 修改：why_care 的「參考了日本」改為「用了類似政策」（來源只說類似，沒說參考）；F5 前瞻指引「成為各國常用工具」查無來源，改寫為 2001 年承諾本身與伊藤／Mishkin 的預期管理論點；四筆沿用來源改為本次重開並更新日期。6) s1、s2（1999 年聲明，作者今日已開）本次未重開，0.15% 與引文字句依作者核對。座標（日銀本店）誤差 <1 km。" }
---

## F1 是什麼、解決什麼問題

1999 年起，日本銀行先把短期利率壓到接近零（零利率政策），2001–2006 年又改以「資金量」為目標大量供應資金（量化寬鬆）。[s1][s4][s5] 它要解決的是：利率已經不能再降時，央行還能怎麼對抗經濟衰退與物價下跌。[s1][s4]

## F2 起源與背景

泡沫破後，日本經濟 1991–2003 年平均每年只成長約 1.14%，物價開始下跌。[s6] 1999 年 2 月 12 日的決定書寫道：經濟惡化的速度主要因公共投資而趨緩，但物價持續往下，復甦還看不到明確跡象；長期利率上升、日圓對美元升值、股價疲弱。[s1] 日本銀行因此判斷要盡最大力量支撐經濟，避免通縮壓力加劇。[s1]

## F3 怎麼運作

- **1999 年 2 月：零利率**。日本銀行先把無擔保隔夜拆款利率引導到約 0.15%，再依市場情況讓它盡可能走低，並供應更多資金、多用公債附買回操作。[s1] 1999 年 2 月到 12 月的政策聲明多次標示「維持零利率政策」。[s2]
- **2000 年 8 月：提早升息**。日本銀行結束零利率，後來被學者批評。[s3][s5]
- **2001 年 3 月：量化寬鬆**。操作目標從利率改成金融機構在日本銀行的活期存款餘額，先定約 5 兆日圓，並承諾持續到消費者物價穩定地不再下跌。[s4]
- **2006 年 3 月：退場**。活期存款目標在四年內提高到 35 兆日圓，2006 年 3 月結束量化寬鬆。[s5]

## F4 規模與數據

- 1999 年 2 月：拆款利率目標先約 0.15%，之後盡可能走低。[s1]
- 2001 年 3 月：活期存款餘額目標約 5 兆日圓；之後提高到 35 兆日圓。[s4][s5]
- 1991–2003 年 GDP 年均成長約 1.14%。[s6]

## F5 改變了什麼

日本成為第一個長期把利率壓在零、再改用資金量目標的主要經濟體；2008 年金融危機後，美國、英國與歐元區在利率接近零時也採用了類似日本的政策。[s3][s5] 2001 年的決定把「做到消費者物價穩定地不再下跌才停止」這個承諾直接寫進政策[s4]；伊藤隆敏與 Mishkin 也認為，管理大家對未來的預期是預防和走出通縮的關鍵。[s3]

## F6 雙軌解讀

### 李彔

無直接論述：查不到李彔公開談日本零利率與量化寬鬆。

### 哈拉瑞

無直接論述：查不到哈拉瑞公開談日本零利率與量化寬鬆。

## F7 今日對照鉤子

結構：當利率已經接近零、經濟又疲弱時，央行會從「調價格（利率）」改成「調數量（放多少錢）」，並用對未來的承諾來影響大家的預期；何時退場、會不會太早升息，往往是最大的爭論點。[s3][s4][s5] 這裡只描述結構，不預測。

## F8 不可類比的差異

日本 1999–2006 年是在長期通縮、銀行壞帳尚未清完的特殊條件下實驗，當時全世界沒有前例；今天各國央行已有多次量化寬鬆經驗，金融體系與通膨環境也不同，不能把日本當年的效果直接套用。[s3][s5]
