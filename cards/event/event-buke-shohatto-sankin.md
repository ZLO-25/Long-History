---
id: event-buke-shohatto-sankin
type: event
name: 武家諸法度與參勤交代（1615–1635）：幕府怎麼管住大名兩百年
aliases: [武家諸法度, 參勤交代, 参勤交代, 一國一城令, 一国一城令, 禁中並公家諸法度, 元和令, 寛永令, 寬永令, 金地院崇傳, 以心崇伝, 幕藩體制, 德川秀忠, 德川家光, 大名行列, Buke shohatto, Sankin-kōtai, Sankin kotai, Laws for the Military Houses, Alternate attendance, Ikkoku ichijō rei]
civilization: [日本（江戶）]
track: east
time:
  start: 1615
  end: 1635
  precision: exact
  src: [s1, s2, s7]
summary_line: 大事｜宮廷／政治中心｜伏見、江戶｜武家諸法度與參勤交代（1615–1635）：幕府怎麼管住大名兩百年
place:
  primary_field: 宮廷／政治中心
  secondary_fields: [城市／都會]
  locations:
    - { name_ancient: 伏見城, name_modern: "京都市伏見區（日本京都府）", lat: 34.9370, lng: 135.7790, precision: schematic, role: "1615 年 8 月 30 日（慶長 20 年 7 月 7 日）諸大名在此聽崇傳宣讀 13 條武家諸法度", src: [s1, s7] }
    - { name_ancient: 二條城, name_modern: "京都市中京區（日本京都府）", lat: 35.0142, lng: 135.7481, precision: exact, role: "1615 年 9 月（慶長 20 年 7 月 17 日）公布禁中並公家諸法度", src: [s4] }
    - { name_ancient: 江戶城, name_modern: "東京都千代田區皇居（日本）", lat: 35.6852, lng: 139.7528, precision: exact, role: "1635 年寛永令規定大名每年四月參勤江戶；每代將軍交替時在此宣讀法度", src: [s1, s2, s7] }
    - { name_ancient: 廣島城, name_modern: "廣島市中區（日本廣島縣）", lat: 34.4027, lng: 132.4594, precision: exact, role: "福島正則因未經許可修補居城而違反法度，1619 年遭改易（示意：法度被用來處分大名的著名例子）", src: [s1, s5] }
  scale: area
structure_tags: [法律成文化, 制度包裝延續, 邊疆防線, 慢變結構, 擴大稅基]
topics: [統一與中央集權, 法律與憲法, 諸侯爭霸, 身分制度]
links: [war-osaka-sieges, war-sekigahara, event-sakoku, war-shimabara, person-tokugawa-ieyasu, person-date-masamune, person-toyotomi-hideyoshi, social-taiko-kenchi-katanagari, event-sengoku-japan]
causes:
  - { id: war-osaka-sieges, rel: 直接引發, why: 1615 年夏之陣滅掉豐臣家後，幕府在同一年內接連發出一國一城令與武家諸法度，趁著剛打完仗、沒有人敢反對的時候，把管大名的規矩寫成白紙黑字。, src: [s1, s3, s7] }
  - { id: war-sekigahara, rel: 背景, why: 關原之後德川家重新分配全國領地、大名被分成親藩、譜代與外樣，法度就是要把這套新秩序固定下來。, src: [s5, war-sekigahara:s1] }
effects:
  - { id: event-sakoku, rel: 背景, why: 1635 年寛永令除了參勤交代，也禁止建造 500 石以上的大船、明文禁止天主教；同一年幕府給長崎奉行的命令禁止日本船出海，兩套規定一起把大名和海外隔開。, src: [s1, s5, event-sakoku:s2] }
counterparts: 無適當對照：西方軌在 17 世紀沒有一張「中央政權用成文法度加上定期進京，長期管住地方領主」的卡；法國路易十四把貴族留在凡爾賽的做法常被拿來比較，但本站尚無該卡。
sources:
  - { id: s1, title: "武家諸法度 — Wikipedia（日文）", url: "https://ja.wikipedia.org/wiki/武家諸法度", accessed: 2026-11-03, tier: 百科 }
  - { id: s2, title: "参勤交代 — Wikipedia（日文）", url: "https://ja.wikipedia.org/wiki/参勤交代", accessed: 2026-11-03, tier: 百科 }
  - { id: s3, title: "一国一城令 — Wikipedia（日文）", url: "https://ja.wikipedia.org/wiki/一国一城令", accessed: 2026-11-03, tier: 百科 }
  - { id: s4, title: "禁中並公家諸法度 — Wikipedia（日文）", url: "https://ja.wikipedia.org/wiki/禁中並公家諸法度", accessed: 2026-11-03, tier: 百科 }
  - { id: s5, title: "Buke shohatto — Wikipedia（英文）", url: "https://en.wikipedia.org/wiki/Buke_shohatto", accessed: 2026-11-03, tier: 百科 }
  - { id: s6, title: "Excerpts from Laws of Military Households (Buke Shohatto), 1615（David J. Lu 英譯，Japan: A Documentary History, 1997, pp. 206–208）— Asia for Educators, Columbia University", url: "https://afe.easia.columbia.edu/ps/japan/tokugawa_edicts_military.pdf", accessed: 2026-11-03, tier: 一手 }
  - { id: s7, title: "御触書（寛保集成）解說：武家諸法度 — 国立公文書館 デジタル展示「徳川家康—将軍家蔵書からみるその生涯」家康の内政・外交", url: "https://www.archives.go.jp/exhibition/digital/ieyasu/contents3_02/03/", accessed: 2026-11-03, tier: 通論 }
  - { id: s8, title: "武家諸法度（寫本，內閣文庫 請求番号 180-0004，內容年天保 9 年）— 国立公文書館デジタルアーカイブ", url: "https://www.digital.archives.go.jp/file/3142769.html", accessed: 2026-11-03, tier: 一手 }
images:
- url: https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Hidetada.jpg/960px-Hidetada.jpg
  page: https://commons.wikimedia.org/wiki/File:Hidetada.jpg
  title: 德川秀忠像
  creator: 佚名（狩野派畫師）
  year: 17 世紀
  holder: 德川記念財團（東京）
  license: Public domain（公有領域；2026-11-10 已核對 Commons 檔案頁）
  caption: 1615 年武家諸法度以二代將軍秀忠的名義公布；起草與宣讀的是家康身邊的僧人金地院崇傳。
- url: https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Daimyo_Procession_to_Edo_MET_DP-19027-012_crd.jpg/960px-Daimyo_Procession_to_Edo_MET_DP-19027-012_crd.jpg
  page: https://commons.wikimedia.org/wiki/File:Daimyo_Procession_to_Edo_MET_DP-19027-012_crd.jpg
  title: 大名行列圖（Daimyo Procession to Edo）
  creator: 菱川派畫師
  year: 約 1700 年
  holder: 大都會藝術博物館（紐約）
  license: CC0（大都會藝術博物館開放取用；2026-11-10 已核對 Commons 檔案頁）
  caption: 參勤交代的大名行列：加賀藩一次動員約 2,500–3,000 人（估計），是江戶時代最常被描繪的場面之一。
importance: 3
learn:
  histories: [日本史]
  why_care: 日本一百多年的內戰之後，德川幕府靠的不是再打一場仗，而是一張 13 條的法度和一套「每年來江戶報到」的制度，把兩百多個大名管了兩百五十年。
  story: |
    1615 年夏天大坂城陷落、豐臣家滅亡。幾個星期後，家康把全國大名召到伏見城，由僧人崇傳宣讀 13 條規矩，以將軍秀忠的名義公布，這就是武家諸法度：要練文武、不能私自修城、不能私下聯姻、不能窩藏罪犯。[s1][s6][s7] 同一年還發了一國一城令，每個大名只能留一座城，據說幾天內約 400 座城被拆（估計）。[s3] 1635 年家光修訂法度，加上「大名每年四月來江戶參勤」與「禁造 500 石以上大船」。[s1][s2] 從此大名一年在江戶、一年在領地，妻子和繼承人常住江戶；一趟行列動輒數千人，加賀藩約 2,500–3,000 人（估計），費用吃掉藩收入的一到兩成。[s2] 這套制度到 1862 年才放寬、1867 年大政奉還才結束。[s2]
  key_terms:
    - { term: 武家諸法度, plain: 幕府寫給全體大名的基本法，每代將軍換人時都會在江戶城重新宣讀一次。, example: 像學校開學時全校集合聽校長念校規，而且每換一任校長就再念一遍。 }
    - { term: 參勤交代, plain: 大名要定期（多半是隔年）到江戶住一年、再回領地一年，妻子和繼承人則一直留在江戶。, example: 像分公司主管每隔一年要到總公司上班一年，家人還得住在總公司旁邊。 }
    - { term: 改易, plain: 幕府沒收大名的領地、取消他的大名身分，是違反法度最重的處分之一。, example: 福島正則因為沒報備就修廣島城，1619 年就被改易。 }
    - { term: 一國一城令, plain: 每個大名只能保留一座城，其他的城都要拆。, example: 像規定每個社團只能有一間社辦，其他房間都要交回學校。 }
  primary_source:
    - { text: "文武弓馬ノ道、専ラ相嗜ムヘキ事。", from: "《武家諸法度》元和令（1615）第一條；字句依日文維基「武家諸法度」所引轉錄，Lu 英譯本（s6）第一條譯為 The study of literature and the practice of the military arts, including archery and horsemanship, must be cultivated diligently，查核時未對照 s8 寫本影像。", src: s1 }
  historiography: |
    **參勤交代是不是為了讓大名變窮？** 傳統說法認為幕府故意用參勤交代消耗大名的財力與軍力；日文維基整理的近年研究（條目引藤本 2012、武部健一 2015 等）已否定這種「意圖說」，認為財政負擔是結果而不是目的，寛永令條文本身反而要求大名減少隨行人數，因為人太多會變成領地的負擔。[s2]
    **法度到底管得多嚴？** 英文維基指出，法度在 1663、1683、1710 年多次重發，1683 年以後形式幾乎不變；但執行上有彈性：一國一城令有不少例外，前田、池田、伊達等家都以各種名目保留了多座城。[s3][s5]
    **對天皇是壓制還是規範？** 禁中並公家諸法度第一條要天皇「以學問為第一」，常被讀成「把天皇趕出政治」；日文維基指出這一條摘自順德天皇《禁秘抄》，立法目的是以帝王學培養天子，兩種讀法並存。[s4]
  misconceptions:
    - 武家諸法度不是 1615 年寫好就不動：1635 年寛永令才加入參勤交代與大船禁令，之後還改了好幾次。[s1][s5]
    - 參勤交代不是每個大名都「一年一次」：關東大名多半半年一換，妻子與繼承人則是常住江戶、不跟著來回。[s2]
  pop_culture:
    - { claim: "參勤交代是幕府故意設計來讓大名破產的陰謀（時代劇、通俗歷史常見）。", fact: "日文維基整理的研究指出，這個「削弱大名財力說」已被否定；寛永令條文要求大名減少隨行人數，財政負擔被認為是結果而非目的。[s2]", src: [s2] }
    - { claim: "武家諸法度是德川家康親筆寫的。", fact: "法度由僧人金地院崇傳起草（在家康 1611 年要大名簽的 3 條誓紙上加 10 條），1615 年 7 月在伏見城由崇傳宣讀、以將軍秀忠名義公布。[s1][s7]", src: [s1, s7] }
    - { claim: "一國一城令之後每個藩真的只剩一座城。", fact: "日文維基列出許多例外：鳥取池田三城、紀州五城、仙台伊達以「要害」之名保留多處城郭；據所引資料，全國城數從約 3,000 減到約 170（含陣屋約 300），仍不是「一藩一城」。[s3]", src: [s3] }
  perspectives:
    - { history: 日本史, text: 從日本看，這是戰國「下剋上」結束、「幕藩體制」開始的制度起點。 }
    - { history: 世界通史, text: 從世界看，同一時期歐洲各國也在把貴族綁進宮廷，但日本用的是成文法度加上定期進京，形式很不一樣。 }
verification: 交叉確認
crosscheck: { date: 2026-11-03, by: 獨立查核 agent（第 2 期，未參與寫作）, result: 通過, notes: "1) 開 s1 s2 s3 s4 s5 s6 s7：元和令第一條字句、寛永令「毎歳夏四月中」與 500 石船禁、約 400 城／3,000→170、加賀藩 2,500–3,000 人、費用 5–20%／50–75%／岸和田 84%、1862／1867、鳥取・紀州・伊達例外均相符。2) 慶長 20 年 7 月 7 日換算應為 1615-08-30（非 9 月），7 月 17 日＝9 月 9 日，已改。3) historiography 原寫丸山雍成、山本博文，日維條目實引藤本 2012、武部健一 2015，已改。4) Lu 英譯第一條字句依 Columbia PDF 改正。5) 禁中並公家諸法度連署順序改為二條昭實・秀忠・家康。6) 福島正則 1619 年日維未寫年份，依通說保留並註明。7) 4 個座標核對無誤。已修正。" }
lens_status: 無直接論述
---

## C1 背景

關原之戰（1600）後德川家重新分配全國領地，但豐臣秀賴還在大坂，許多外樣大名的忠誠也沒有保證；家康 1611 年已要求大名簽下 3 條誓紙。[s1][s5] 1615 年大坂夏之陣滅掉豐臣家，幕府終於有機會把管大名的規矩寫成成文法。[s1][s3]

## C2 經過

1615 年閏 6 月（8 月）先發一國一城令，以西國大名為重點，要求每個大名只留一座城；據所引資料，數日內約 400 座城被拆（估計）。[s3] 7 月 7 日（8 月 30 日）諸大名齊聚伏見城，崇傳宣讀 13 條武家諸法度；7 月 17 日（9 月 9 日）在二條城公布 17 條禁中並公家諸法度，由關白二條昭實、秀忠、家康依序連署。[s1][s4][s7] 1635 年家光修訂為寛永令，明文規定「大名・小名在江戸交替相定ムル所ナリ。毎歳夏四月中、参勤致スベシ」，並禁止建造 500 石以上的大船。[s1][s2] 之後 1663、1683、1710 年再修訂，加入禁止殉死、放寬末期養子等條文；國立公文書館內閣文庫藏有天保 9 年（1838）的法度寫本，可見它在幕末仍被抄寫流傳。[s1][s5][s8]

## C3 關鍵人物與群體

德川家康是實際的立案者，崇傳負責起草與宣讀，二代將軍秀忠具名；三代將軍家光把參勤交代制度化。[s1][s7] 被管的對象是全國大名，尤其是關原以後才臣服的外樣大名；但處分並不只針對外樣，譜代大名違反也一樣受罰。[s1]

## C4 制度或機制變化

法度把「修城要報備、聯姻要許可、不得窩藏罪犯」這些原本靠個人忠誠維持的關係，變成公開的成文規則，違反者可被減封或改易；福島正則因未經許可修補廣島城，1619 年（元和 5 年）遭改易，是最有名的例子（日文維基記其事但未寫年份；年份依通說）。[s1][s5] 參勤交代讓大名一年在江戶、一年在領地，正室與繼承人常住江戶，大名之間還被禁止私下結盟、立誓。[s2][s5] 對朝廷方面，禁中並公家諸法度是江戶時代唯一從未修訂的法度，確立了幕府對公家與天皇的規範權。[s4]

## C5 受益者與受損者

幕府得到一套不必動武就能處分大名的工具；江戶因為大名與家臣常駐而迅速膨脹成大都市。[s2][s5] 大名則要負擔每年的行列與江戶屋敷：日文維基引用的估計是參勤費用占藩收入 5–20%，連同江戶屋敷約 50–75%，岸和田藩 1776 年的江戶支出甚至占 84%（估計）。[s2]

## C6 直接結果

1615 年以後大名之間再沒有發生過大規模的互相攻伐；幕府以法度為依據，前幾十年內改易了許多大名。[s1][s5] 1635 年的大船禁令與同年給長崎奉行的命令，把大名與海外貿易隔開，成為「鎖國」體制的一部分。[s1][s5]

## C7 長期影響

參勤交代持續兩百多年，直到 1862 年文久改革放寬為三年一次、1867 年大政奉還才消失；它帶動了五街道與宿場的發展，也讓江戶成為全國的政治與消費中心。[s2] 法度本身在 1683 年以後形式幾乎固定，成為幕藩體制的「基本法」。[s5]

## C8 雙軌解讀

### 李彔

無直接論述：查不到李彔公開講稿談武家諸法度或參勤交代。

### 哈拉瑞

無直接論述：查不到哈拉瑞公開講稿談武家諸法度或參勤交代。

## C9 今日對照鉤子

「用成文規則加上定期報到，把地方權力綁進中央」的結構；以及「規則的副作用（財政負擔、首都膨脹）比原本的目的影響更大」的現象。[s2][s5]

## C10 不可類比的差異

大名不是現代的地方政府，而是世襲的軍事領主；參勤交代綁的是人身與家人（妻子常住江戶），不是今天的預算或選票。幕府也沒有常備的全國官僚體系，法度的執行靠的是處分的威嚇而不是日常行政。[s2][s5]
