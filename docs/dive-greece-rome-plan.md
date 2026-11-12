# 古希臘＋古羅馬深入專題：規劃書（2026-11-12）

使用者需求（ZL，2026-11-12）：「專題我想加入羅馬、古羅馬、希臘、古希臘等相關資料。」
五個收斂問題 ZL 全部照建議：兩個專題（先希臘、後羅馬）／希臘前 800–前 146、羅馬前 509–476（拜占庭只放一張尾聲卡）／重點＝制度、戰爭與擴張、思想與文化（神話只點到）／中等份量（每專題 12–15 張新卡含 5–6 位人物、2 單元、1 篇故事）／呈現＝勢力圖＋今日影子＋希臘羅馬對照表。

規劃角色：歷史學者（選材與史料）、教育者（108 課綱、國高中生讀得懂）、UI/UX（專題頁的新區塊）。

```
前800      前500     前323   前146  前27        476        1453
  │ 城邦興起 │ 古典希臘 │ 希臘化 │ 羅馬共和 │ 羅馬帝國  │（拜占庭：尾聲卡）
  └──── dive-ancient-greece ───┘
              └──────── dive-ancient-rome（前509–476）──┘
                         ▲
              亞歷山大／希臘化／羅馬征服希臘＝兩個專題的接點
```

## 〇、共同規則（所有撰寫者、實作者都要照做）

1. **先讀**：`docs/dives.md`（專題模板）、`docs/card-fields.md`（卡片欄位，人物卡見 5e 節）、`docs/learn-units.md`、`docs/storylines.md`、`docs/stories.md`、`docs/topics.md`、`docs/causes.md`。範例：`cards/person/person-cao-cao.md`、`cards/person/person-napoleon.md`、`cards/event/event-estates-general-1789.md`、`cards/war/war-greco-persian.md`、`data/dives/three-kingdoms.yaml`、`data/units/unit-three-kingdoms-1.yaml`、`docs/dive-three-kingdoms.md`。
2. **讀者是臺灣國高中生**：臺灣慣用譯名（伯里克里斯、亞里斯多德、凱撒、屋大維／奧古斯都、迦太基、漢尼拔…），aliases 放其他譯名與英文。白話、短句，術語第一次出現就解釋（執政官、元老院、保民官、公民大會、陶片放逐、城邦、重裝步兵…）。內容優先對上 108 課綱（國中社會：古典文明、民主與共和的起源；高中歷史：古代文化遺產、希臘羅馬與基督教傳統）。
3. **每句史實都要有來源**（`[sN]`），來源至少一筆學術／通論＋能找到就附一手史料英譯（希羅多德、修昔底德、普魯塔克、亞里斯多德《雅典政制》、波利比烏斯、李維、蘇埃托尼烏斯、塔西佗；Lexundria、Perseus、LacusCurtius、Gutenberg、MIT Classics）。沒對照到原典就在 `from` 註明轉引。數字（兵力、人口、死亡）有爭議就並列說法。
4. **不寫成英雄傳**：人物卡 P5「從另一邊看他」、P6「評價怎麼變」必填；制度卡要寫「誰被排除」（女性、奴隸、外邦人、被征服者）。
5. **思想家欄（李彔、哈拉瑞）只留直接論述**：沒有可查證的直接論述就不寫該欄，不推論。
6. **神話只點到**：ZL 另有「眾神星圖」專案；這裡只在需要時一句帶過（例如奧運祭宙斯）。
7. **戲劇 vs 史實**（`learn.pop_culture`）：有流行說法就寫（例如《300 壯士》、「馬拉松信使跑完倒地而死」、「尼祿拉琴看羅馬燒」、「凱撒遺言 Et tu, Brute」、「角鬥士拇指朝下」）；每條＝常見說法 → 史料怎麼說，附來源。
8. **因果**：事件卡要寫 causes／effects（rel 強度照 `docs/causes.md`，寧弱勿強）；人物卡不寫 causes／effects，用 links＋relations。
9. **選擇題**：正確答案平均分布在 ABCD、不要「正確選項最長」；explain 不寫「選項 1」這種位置。
10. **環境**：容器內 curl 連不到 wikipedia；請用 WebFetch／web-fetch。Wikimedia Commons 可用 curl（要帶 User-Agent，例如 `-A "history-river-bot/1.0"`）。打不開的網址不要寫進來源。
11. **不要啟動 dev server、不要 git commit／push**；只跑 `npm run validate`（可多人同時跑）。只動自己被指派的檔案；要動共用檔（`data/topics.yaml`、`data/storylines.yaml`、`data/labels/names-en.yaml` 等）時，用「追加在檔尾／在指定區塊追加」的小改動並在回報中列出。
12. **效能原則（ZL）**：先載入第一眼看到的畫面，細節延後；做法能簡單就簡單，不要層層疊加。專題的新資料只隨專題頁載入，不能加重首頁（`public/home.json`）與 `index.json`。

## 一、古希臘專題 `dive-ancient-greece`

- 檔案：`data/dives/greece.yaml`；`range: { start: -800, end: -146 }`；`histories: [希臘羅馬史]`；`visual: power`。
- 標題：古希臘：從城邦到亞歷山大
- 大問題：幾百個吵個不停的小城邦，怎麼發明了「人民自己管自己」？打贏波斯之後，為什麼又自己打垮自己，最後被北邊的馬其頓和西邊的羅馬收走？
- 軌道：政治與制度（event, social）／戰爭（war）／錢、技術與建築（finance, commodity, tech, building）／人物（person）。

### 1. 沿用的既有卡（13 張）
`finance-lydian-coinage`、`building-theatre-dionysus`、`commodity-laurion-silver`、`event-cleisthenes-reform`、`war-greco-persian`、`event-delian-league`、`finance-athens-trapezitai`、`building-acropolis`、`war-peloponnesian`、`event-death-of-socrates`、`event-macedon-rise`、`event-alexander-campaign`、`event-hellenistic-kingdoms`。

其中 4 張還不是學習卡，要**升級**（補 `learn`：why_care、story、key_terms、pop_culture…，補學術／一手來源；不刪既有內容）：`event-cleisthenes-reform`、`event-death-of-socrates`、`event-alexander-campaign`、`building-theatre-dionysus`。

### 2. 新卡 14 張

| id | 類型 | 年代 | 題目 | 一定要講到 |
|---|---|---|---|---|
| `event-greek-polis-colonization` | event | 前 800–前 500 | 城邦興起與海外殖民 | 什麼是城邦（polis）；山多地少→出海建新城（西西里、黑海、馬賽）；向腓尼基人學字母；重裝步兵方陣與「公民＝戰士」 |
| `event-olympic-games` | event | 前 776 起 | 古代奧運：吵架的城邦一起做的事 | 傳統起始年前 776 的來源性質；休戰（ekecheiria）到底是什麼（保護往返者，不是全面停戰）；只有自由希臘男性能參賽；393 年前後停辦說法的爭議；1896 現代奧運 |
| `social-sparta` | social | 前 650–前 371 | 斯巴達：把整座城變成軍營 | 希洛人（helots）＝被征服的農奴；agoge 教育；兩王＋長老會＋監察官；斯巴達女性地位相對高；史料多半是外人寫的（「斯巴達幻象」）；前 371 留克特拉戰敗 |
| `event-solon-reform` | event | 前 594 | 梭倫改革：取消債務奴隸 | 還不起債就變奴隸的危機；解負令（seisachtheia）；依財產分四等；不是民主但開了路；之後的僭主庇西特拉圖 |
| `social-athenian-democracy` | social | 前 461–前 322 | 雅典民主怎麼運作，又是誰不算數 | 公民大會、五百人議事會、抽籤、陪審法庭與津貼、陶片放逐；直接民主 vs 今天的代議民主；女性、奴隸、外邦人被排除（人數估計並列）；伯里克里斯公民權法（前 451） |
| `event-greek-philosophy-schools` | event | 前 387–前 322 | 柏拉圖學園與亞里斯多德：把問問題變成一門學問 | 蘇格拉底→柏拉圖→亞里斯多德三代；學園（Academy）與呂刻昂；他們對民主的批評；對後世（伊斯蘭世界、中世紀大學）的影響只寫有來源的 |
| `tech-alexandria-library` | tech | 前 300–前 200 | 亞歷山卓：圖書館與希臘化科學 | 托勒密王朝辦 Mouseion；歐幾里得《幾何原本》、埃拉托斯特尼量地球周長、阿基米德（在敘拉古）；「圖書館被一把火燒掉」的說法 vs 史料（逐漸衰落） |
| `war-roman-conquest-greece` | war | 前 200–前 146 | 羅馬收走希臘：從「解放者」到征服者 | 前 197 狗頭山、前 196 弗拉米尼努斯宣布希臘人「自由」、前 168 皮德納、前 146 科林斯被毀；軍團 vs 方陣；「被征服的希臘征服了征服者」（賀拉斯）；是羅馬專題的接點 |
| `person-themistocles` | person | 約前 524–約前 459 | 地米斯托克利 | 銀礦→海軍的決定（決策題素材）；薩拉米斯；後來被陶片放逐、投靠波斯 |
| `person-pericles` | person | 約前 495–前 429 | 伯里克里斯 | 陪審津貼、衛城工程、用盟邦的錢；葬禮演說（修昔底德轉述）；戰略與瘟疫；阿斯帕西亞；另一邊：盟邦、斯巴達、批評他的雅典人 |
| `person-socrates` | person | 約前 470–前 399 | 蘇格拉底 | 沒留下著作（靠柏拉圖、色諾芬、亞里斯多芬）；問答法；審判與罪名；和阿爾西比亞德斯、三十僭主的關係是他被告的背景 |
| `person-alcibiades` | person | 約前 450–前 404 | 阿爾西比亞德斯 | 伯里克里斯的被監護人、蘇格拉底的學生；西西里遠征；雅典→斯巴達→波斯→雅典，換邊三次；「聰明但沒人敢信」 |
| `person-aristotle` | person | 前 384–前 322 | 亞里斯多德 | 柏拉圖的學生、亞歷山大的老師；呂刻昂；《政治學》把政體分類；「自然奴隸」的主張要照實寫 |
| `person-alexander` | person | 前 356–前 323 | 亞歷山大 | 人生軌跡（佩拉→伊蘇斯→埃及→高加米拉→印度河→巴比倫）；另一邊：底比斯被毀、波斯人、提爾與加薩的屠城、殺克雷圖斯；「大帝」的評價怎麼變 |

人物 relations（寫一邊即可）：伯里克里斯—阿爾西比亞德斯（親屬／監護）；蘇格拉底—阿爾西比亞德斯（師友）；亞里斯多德—亞歷山大（師友）；地米斯托克利—伯里克里斯（沒有直接關係就不硬寫）；蘇格拉底—亞里斯多德（沒有直接關係；透過柏拉圖，不寫 relation，在內文交代）。

### 3. 勢力圖 4 張（`data/dives/greece/power-<年>.yaml`）

| 年 | 題目 | 底圖 |
|---|---|---|
| 前 431 | 伯羅奔尼撒戰爭前夕：雅典帝國（提洛同盟）vs 伯羅奔尼撒同盟、中立城邦、波斯 | 新底圖 `AEGEAN`：希臘各大區＋土耳其西部各省（愛奧尼亞海岸）＋阿爾巴尼亞、北馬其頓、保加利亞、賽普勒斯整國 |
| 前 338 | 喀羅尼亞之後：馬其頓與科林斯同盟、斯巴達（沒加入）、波斯 | `AEGEAN` |
| 前 323 | 亞歷山大去世時的帝國 | `WORLD`（今日國界＋切線） |
| 前 275 | 希臘化三大王國：安提柯（馬其頓）、塞琉古、托勒密，另標孔雀王朝、羅馬、迦太基當背景 | `WORLD` |

- 年份是負數：先確認 `scripts/build-power.ts`、`Dive.tsx`、年份膠囊、檔名對負數都正常（檔名建議 `power-bc431.yaml`／`.geojson`，`year: -431`）。畫面上年份一律用 `fmtYear` 顯示成「前 431」。
- 顏色四張一致：雅典＝藍、斯巴達＝紅、波斯＝土黃、馬其頓＝紫。每張 `sources` 至少 2 筆，`note` 寫明示意性質與切線理由；切線表寫進 `docs/dive-greece.md`。
- `power_ui`: title「希臘世界勢力圖」、caveat 要說明：城邦很小、同盟成員零散，以今日行政區近似只能看大勢。

### 4. 故事線、故事、單元

- 新故事線 `story-ancient-greece`「從城邦到亞歷山大：人民自己管自己的實驗」，stops：`event-greek-polis-colonization` → `event-solon-reform` → `event-cleisthenes-reform` → `war-greco-persian` → `event-delian-league` → `social-athenian-democracy` → `war-peloponnesian` → `event-death-of-socrates` → `event-macedon-rise` → `event-alexander-campaign` → `event-hellenistic-kingdoms` → `war-roman-conquest-greece`。既有 `story-greece`（錢的角度）保留，一起列在專題。
- 故事文字 `data/stories/story-ancient-greece.md`：照 `docs/stories.md`（每段標 `[卡片id:sN]`、每節 ★ 重點、recall 3–5 題、不寫卡片沒有的史實），目標 15–20 分鐘。**卡片查核通過後才寫**。
- 單元（照 `docs/learn-units.md` 與呂世浩讀史方法：決策題先掩卷自思、回顧加「回到自己」）：
  - `unit-greece-1`「人民自己管自己？雅典民主怎麼長出來」：城邦 → 梭倫 → 克里斯提尼 → 波希戰爭（決策：銀礦的錢要平分還是造船？）→ 雅典民主怎麼運作／誰不算數。
  - `unit-greece-2`「贏了之後：從雅典帝國到亞歷山大」：提洛同盟變帝國 → 伯羅奔尼撒戰爭（決策：西西里要不要去？）→ 蘇格拉底之死 → 馬其頓 → 亞歷山大 → 希臘化與羅馬。
  - 既有 `unit-athens-sparta` 一起列入專題 `units`。

### 5. 新畫面：「今日影子」（教育者＋UI/UX）

國高中生最常問「學這個要幹嘛」。專題頁加一區「今日影子：今天哪裡還看得到」，資料寫在專題 yaml：

```yaml
legacy:
  title: 今日影子            # 選填
  items:
    - { then: 雅典公民用抽籤輪流當官、當陪審員, now: 今天臺灣的國民法官也是從一般人裡抽籤選出, tag: 制度, card: social-athenian-democracy, src: [L1] }
  sources:
    - { id: L1, title: …, url: …, accessed: 2026-11-12, tier: 官方 }
```

- 每條＝「那時候」→「今天」，一張可點的卡、至少一筆來源（`now` 的說法也要有來源）；`tag` 用來分組（制度／語言文字／運動與藝術／科學／建築）。
- 希臘預定 8–10 條：民主（抽籤、投票、「民主」這個字）、陶片放逐（ostracize）、奧運與馬拉松、字母（alphabet＝α＋β）、劇場與悲喜劇、學院（academy）、幾何與「歐幾里得」、柱式建築（最高法院、博物館）、政治學用語（politics 來自 polis）、醫師誓詞（有可靠來源才放）。
- 畫面：放在專題頁「照順序讀」之後；桌機兩欄卡片式（左「那時候」右「今天」中間箭頭），手機上下排；每條可點開卡片；來源收在「出處」小字。純靜態、不需要新套件。學習模式專題頁也要顯示。
- `npm run validate`：`card` 存在、`src` 都在 sources、每條都有 then／now。文件補進 `docs/dives.md` 新增一節。
- 資料只放在專題檔（隨專題頁載入），不要進 `home.json`／`index.json` 核心。

### 6. 圖片

人物卡 6 張＋重點新卡各 1 張 Wikimedia Commons 圖（胸像、陶片、遺址照片）；**逐張用 Commons API 查授權**（只收 PD／CC0／CC BY／CC BY-SA，寫明作者、年代、收藏處、授權、連結）；寬高補進 `data/image-sizes.json`；紀錄寫 `docs/image-licenses-greece-rome.md`。查不到授權就不放。

### 7. 查核與驗收

```
Sonnet 撰寫（4 位：程式／事件卡 A／事件卡 B／人物卡）
   └► Fable 獨立查核 2 位（沒參與寫作；逐句對來源、可上網；直接改＋寫查核紀錄）
        └► Sonnet：勢力圖、單元、故事、圖片
             └► Fable 查核單元與故事（只對照卡片）＋主執行緒驗收
                  └► validate／typecheck／build／dive.cjs／story-read.cjs → 推 main
```

驗收門檻：`npm run validate` 無 error；`npm run typecheck` 過；`npm run build` 過；`node scripts/qa/dive.cjs` 對 `dive-ancient-greece` 通過；專題 27 張卡全部可進學習模式；截圖放 `docs/screenshots/dive/greece-*`；報告 `docs/dive-greece.md`。

## 二、古羅馬專題 `dive-ancient-rome`（希臘上線後做）

- `data/dives/rome.yaml`；`range: { start: -509, end: 476 }`；標題：古羅馬：一座城怎麼變成地中海，又怎麼守不住
- 大問題：羅馬人趕走國王、發誓不再讓一個人說了算，為什麼五百年後還是出現了皇帝？一個管了整個地中海的帝國，又是怎麼一步步守不住的？
- 沿用既有約 30 張（`event-conflict-of-orders`、`event-twelve-tables`、`war-samnite`、三次布匿戰爭、`event-roman-grain-dole`、`event-rubicon`、`event-second-triumvirate`、`war-actium`、`event-augustan-principate`、`event-pax-romana`、`war-teutoburg`、`war-jerusalem-70`、`event-constitutio-antoniniana`、`event-crisis-third-century`、`event-christian-empire`、`war-adrianople`、`event-fall-western-rome`、`war-vandal-north-africa`、建築與商品卡、`war-roman-conquest-greece`…）；還不是學習卡的一併升級。
- 新卡 14 張（暫定，開工前再盤點一次）：
  - 事件／社會 8：`event-roman-republic-founding`（前 509，執政官、元老院、保民官、公民大會的白話解釋）、`event-gracchi-reforms`（格拉古兄弟土地改革）、`event-marian-reforms-sulla`（軍隊變成將軍的：馬略與蘇拉）、`social-roman-slavery-spartacus`（奴隸制與斯巴達克斯）、`social-roman-law`（羅馬法：從十二表法到「無罪推定」的源頭，只寫有來源的）、`event-pompeii-79`（龐貝：一座被火山封存的城市與日常生活）、`event-early-christianity`（從受迫害的小教派到帝國宗教之前）、`event-diocletian-tetrarchy`（戴克里先四帝共治與帝國分東西）；尾聲卡 `event-byzantine-afterlife`（東羅馬到 1453，一張帶過）另計。
  - 人物 6：漢尼拔、提比略·格拉古、凱撒、克麗奧佩脫拉、奧古斯都、君士坦丁。
- 勢力圖 5 張（`WORLD`／`EU` 底圖＋切線）：前 264（第一次布匿戰爭前）、前 146（迦太基與科林斯被毀）、前 44（凱撒遇刺）、117（圖拉真時最大疆域）、395（東西分治）。
- 故事線 `story-ancient-rome`（共和→帝國→分裂，接既有 `story-rome-empire`）、故事文字、`unit-rome-1`（共和怎麼運作、怎麼壞掉）、`unit-rome-2`（帝國怎麼治理、怎麼守不住；既有 `unit-rome-fall` 一起列入）。
- 今日影子：共和（republic、senate）、法律用語、曆法（七月 July、八月 August、儒略曆）、拉丁字母與羅馬數字、道路與水道、混凝土與圓頂、基督教、「麵包與馬戲」。
- **希臘 vs 羅馬對照表**（新資料 `data/dives/compare/greece-rome.yaml`，兩個專題頁都顯示）：政治（直接民主／共和混合政體）、公民權（封閉／逐步開放到 212 年）、軍隊（公民方陣／職業軍團）、宗教、對待被征服者、留給今天的東西；每格一句話＋可點的卡＋來源。
