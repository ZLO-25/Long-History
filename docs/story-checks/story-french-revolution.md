# 查核紀錄：story-french-revolution

查核者未參與寫作。逐段對照 9 張站卡（war-american-revolution、finance-french-royal-debt、event-estates-general-1789、event-storming-bastille、event-declaration-rights-of-man、event-execution-louis-xvi、event-reign-of-terror、event-brumaire-coup、event-napoleonic-code）與故事另外引用的 event-haitian-revolution，含 frontmatter（causes／effects／sources／learn／misconceptions）與內文。改後 `npx tsx scripts/check-stories.ts story-french-revolution`：4,015 字、0 錯誤、0 警告。

## 修改（共 8 處）

| # | 位置 | 原句摘要 | 改成 | 依據 |
|---|---|---|---|---|
| 1 | 第 1 節 | 「財政大臣內克」 | 「財政總監內克」 | 全篇職稱統一。war-american-revolution A6 寫「財政大臣」，finance-french-royal-debt 與 event-estates-general-1789 都寫「財政總監」；故事第 2 節又寫「財政總監卡隆」，同一個職位兩種叫法會讓學生以為是兩個官。 |
| 2 | 第 2 節 | 「1787 年，新任財政總監卡隆」 | 刪去「新任」 | finance-french-royal-debt 只有 learn.story 寫「新任」，F3 寫「財政總監卡隆在 1787 年 2 月召集」，卡片沒有記載卡隆哪一年上任，「新任」無從核對（見下方卡片疑點）。 |
| 3 | 第 6 節 | 「新選出的國民公會廢除君主制」 | 「新選出的議會「國民公會」廢除君主制」 | 「國民公會」第一次出現，和前面的「國民議會」只差一個字；依 event-execution-louis-xvi key_terms「1792 年 9 月選出的新議會」加一個詞說明，沒有加粗（粗體已滿 8 個）。 |
| 4 | 第 6 節 | 「再以 424 票對 287 票否決全民公投」 | 「再否決全民公投」 | 同段已有 721、361 兩個撐起「多一票」的數字，再加一組票數太密；而且 event-execution-louis-xvi C2 註明法文維基記為 423 對 286，兩來源不一致，不寫較穩。 |
| 5 | 第 7 節（寫手自標疑點） | 「被當成嫌疑犯逮捕的至少有 30 萬人，約 1.7 萬人被正式處決，而且大部分不在巴黎。」 | 「據估計，……其中巴黎只占一小部分。」 | event-reign-of-terror C5 原話就是「約 1.7 萬名被正式處決的人（巴黎只占一小部分）」[s1]，不必由 16,594／2,639 自行推算；misconceptions 註明 1.7 萬是 Greer 的估計、「至少 30 萬」與「數十萬」兩說並存，所以補上「據估計」。 |
| 6 | 第 8 節 | 「當夜，剩下的議員解散督政府。……結果拿破崙自己當上第一執政：新憲法名義上有三位執政…」 | 「……結果在 12 月通過的新憲法裡，拿破崙自己當上第一執政：名義上有三位執政…」 | event-brumaire-coup C2：11 月 11 日凌晨只任命拿破崙、西哀士、杜科為「臨時執政」，12 月新憲法通過後他才是第一執政 [s1][s3]；misconceptions 也強調「先當三位執政之一、再當第一執政」。原句容易讀成當夜就當上。 |
| 7 | remember 第 2 條 | 「對武力解散的恐懼逼出攻佔巴士底，「主權在國民」又逼出「國王還能不能留」」 | 「……促成攻佔巴士底，「主權在國民」又留下「國王還能不能留」的問題」 | event-estates-general-1789 → event-storming-bastille 的 rel 是「促成」；event-declaration-rights-of-man → event-execution-louis-xvi 的 rel 是「背景」，不宜寫成「逼出」。（第一個「逼出國民議會」保留：屬同一張卡內的經過。） |
| 8 | remember 第 3 條 | 「不得人心的督政府找將軍幫忙，被拿破崙用軍隊接手」 | 「不得人心的督政府裡有人找將軍幫忙，結果被拿破崙用軍隊接手」 | event-brumaire-coup causes 的 why 是「部分督政官轉而找將軍幫忙」[s1][s3]，不是整個督政府。 |

## 寫手自標疑點的查核結果

- **Sieyès 譯名不一致**：event-estates-general-1789 全卡寫「西耶斯」，event-brumaire-coup 全卡寫「西哀士」；兩張卡的 aliases 都列了同一個拉丁拼法「Sieyès」，但**沒有任何一張卡明寫「寫小冊子的教士」和「1799 年的督政官」是同一個人**。故事統一用「西耶斯」（第 3 節與第 8 節），第 8 節只寫「督政官西耶斯」，沒有寫「就是當年那位」「同一位」之類的句子，沒有另外加上卡片沒有的連結；不過同名出現兩次，讀者自然會當成同一人。這個認定只靠兩卡共同的 alias 支持。建議主編：把兩張卡的譯名統一，並在其中一張卡補一句有出處的說明；在那之前故事維持現狀即可。
- **「大部分不在巴黎」**：已改用卡片原話（見修改 5），不再是推算。
- **「革命結束了」行內引文**：出自 event-brumaire-coup historiography 與 C2，標在 [s4]，故事出處正確，也保留了「有史家提醒，法文這個字同時有完成和結束兩個意思」這層語氣。它不是 `learn.primary_source` 裡的引文，而是卡片內文裡轉引的公告短句；規則允許用「內文裡已有的引文」，但規定用 `>` 引文段落。這裡只有五個字、而且重點在後半句的史家提醒，我判斷留在行內較好讀，沒有改；是否要改成 `>` 段落請主編決定（不影響通過）。

## 查過沒問題，但值得主編留意

- **第 1 節第 3 段**是全篇預告（攻佔監獄、處決國王、恐怖統治、皇帝、法典），出處只掛 `war-american-revolution:s9`，這個來源只支持「打仗欠下的債」；其餘各項在後面各節都有出處。程式要求每段至少一個出處，這樣標可以接受。
- **戰債 → 財政危機**：保留了「被許多史家看成原因之一，但不是唯一的原因」；15 億里弗保留了「有人估計」「只有一個來源」。
- **內克報告**：保留「宣稱」與「沒有把特別帳算進去」，沒有直接說他做假帳（卡片 historiography 兩說並列）。
- **王后亂花錢**、**巴士底只關 7 人／為了火藥**、**第三等級代表不是窮人**、**人權宣言沒有處理奴隸制**、**處死只多一票**、**條文不是拿破崙親手寫的**、**99.9% 值得懷疑**：都與各卡 misconceptions 一致。
- **恐怖統治的成因**：第 7 節末段寫出「史家到現在看法不一」；但結尾摘要與 remember 第 3 條用的是 causes 的 why（「內外戰爭一起壓上來，國民公會轉向…」，rel「促成」），語氣比 historiography 肯定一些。兩者都是卡片原話，未改。
- **第 5 節末段**（主權在國民 → 國王還有什麼理由留在王位）用問句呈現，內容是 event-execution-louis-xvi causes 的 why（rel「背景」），沒有寫成「導致」。
- **1794 年殖民地廢奴**引的是 `event-haitian-revolution:s1`（非本線站卡），該卡 learn.story 與內文都有記載，出處正確。
- **「什一稅」「吉倫特派」** 卡片沒有白話解釋，故事也就沒解釋；要補得先補卡片。
- **「話說得很滿」**（第 4 節）是敘述者的評語，後面緊接卡片的事實（許多負擔要贖買），沒有新史實，保留。
- 粗體 8 個（免稅特權、三級會議、第三等級、國民議會、公安委員會、督政府、第一執政、民法），剛好到上限。
- remember 四條都是因果；think 三題都是開放題，第 2、3 題連回讀者自己。

## 卡片本身的疑點（未改卡片）

- **譯名**：Sieyès 在 event-estates-general-1789 是「西耶斯」、在 event-brumaire-coup 是「西哀士」（見上）。
- **職稱**：內克在 war-american-revolution 是「財政大臣」，在 finance-french-royal-debt、event-estates-general-1789、event-storming-bastille 是「財政總監」。
- **finance-french-royal-debt learn.story 的「1787 年新任財政總監卡隆」**：卡片其他地方沒有卡隆的上任年份，「新任」沒有出處可核；建議卡片查證後改寫或刪去。
- **finance-french-royal-debt**：報告銷量「約 20 萬份」F3 掛 [s1][s2]、F4 掛 [s2]，且只有單一來源；故事沒有用這個數字。
- **event-execution-louis-xvi**：否決公投的票數英文維基 424:287、法文維基 423:286，卡片並列；故事已不寫票數。
- **event-reign-of-terror**：逮捕人數「至少 30 萬」（英文維基）與「數十萬」（WHE）並存；正式處決「16,594 件判決」與「約 1.7 萬人」是兩種算法。
- **event-storming-bastille**：攻擊者死亡人數兩來源不一（98／82＋15），卡片與故事都只說「近百人」。

結果：通過
