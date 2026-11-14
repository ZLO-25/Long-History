---
id: building-via-appia
type: building
name: 亞壁古道與羅馬道路網
aliases: [亞壁古道, 條條大路通羅馬, Appian Way, Via Appia, 羅馬大道, Roman roads, 阿庇亞大道, 羅馬道路網, Regina Viarum, 亚壁古道]
civilization: [古羅馬]
track: west
time:
  start: -312
  end: -264
  precision: approx
  src: [s1, s3]
summary_line: 建築｜商路｜羅馬至布林迪西｜亞壁古道與羅馬道路網
place:
  primary_field: 商路
  secondary_fields: [戰場]
  locations:
    - { name_ancient: 羅馬, name_modern: 羅馬（義大利）, lat: 41.88997, lng: 12.49125, pleiades_id: "423025", precision: exact, role: 起點 }
    - { name_ancient: 卡普阿, name_modern: 聖瑪麗亞卡普阿韋泰雷（義大利）, lat: 41.08609, lng: 14.2502, pleiades_id: "432754", precision: exact, role: 前 312 年第一段終點 }
    - { name_ancient: 貝內文圖姆, name_modern: 貝內文托（義大利）, lat: 41.13043, lng: 14.78116, pleiades_id: "432721", precision: exact, role: 延伸段，圖拉真大道由此分出 }
    - { name_ancient: 布林迪西姆, name_modern: 布林迪西（義大利）, lat: 40.63866, lng: 17.94291, pleiades_id: "442509", precision: exact, role: 終點港口 }
  scale: line
routes: [road-via-appia, road-via-egnatia, road-via-flaminia, road-via-aurelia, road-via-domitia, road-via-augusta]
structure_tags: [基礎建設網絡, 公共工程支出, 補給線過長, 快速擴張]
topics: [道路與鐵路]
links: [event-twelve-tables, building-roman-aqueducts, commodity-roman-concrete, event-rubicon, social-roman-slavery-spartacus]
causes:
  - { id: war-samnite, rel: 促成, why: 羅馬和薩莫奈人作戰，需要把軍隊和補給快速送到卡普阿，於是修了一條跨越彭甸沼澤的軍用大道。, src: [s1] }
counterparts:
  - { id: building-qin-straight-road, note: "相似：國家為讓軍隊快速移動而修的大道，同時成為長期交通幹線。不同：亞壁古道向南連接新征服的義大利城市；秦直道向北直通對付匈奴的邊疆。", src: [s1, s6] }
  - { id: building-lingqu, note: "相似：為了把兵員與糧食送到新征服地區而修的交通工程。不同：亞壁古道是陸路；靈渠是只有 36.4 公里、連通長江與珠江兩大水系的運河。", src: [s1, s7] }
sources:
  - { id: s1, title: "Appian Way — Wikipedia", url: "https://en.wikipedia.org/wiki/Appian_Way", accessed: 2026-10-24, tier: 百科 }
  - { id: s2, title: "Roman roads — Wikipedia", url: "https://en.wikipedia.org/wiki/Roman_roads", accessed: 2026-10-24, tier: 百科 }
  - { id: s3, title: "Via Appia. Regina Viarum — worldheritagesite.org（UNESCO 2024）", url: "https://www.worldheritagesite.org/list/id/1708", accessed: 2026-10-24, tier: 通論 }
  - { id: s4, title: "de Soto, Pažout, Brughmans et al., Itiner-e: A high-resolution dataset of roads of the Roman Empire — Scientific Data 12:1731 (2025)，巴塞隆納自治大學典藏的開放取用全文", url: "https://ddd.uab.cat/pub/artpub/2025/322405/sciendata_a2025v12n1art1731.pdf", accessed: 2026-11-14, tier: 學術 }
  - { id: s6, title: "Chi Dao and Zhi Dao — the Oldest Express Way（陝西省人民政府英文網，2017-04-27）", url: "https://en.shaanxi.gov.cn/as/hac/ch/201704/t20170427_1595074.html", accessed: 2026-10-25, tier: 通論 }
  - { id: s7, title: "Lingqu — Wikipedia", url: "https://en.wikipedia.org/wiki/Lingqu", accessed: 2026-10-25, tier: 百科 }
  - { id: s8, title: "李維《羅馬史》9.29（Livy, Ab urbe condita），Perseus 英譯", url: "https://fgh.perseids.org/read/latinLit/phi0914/phi001/perseus-eng3/9.29.1-9.29.6", accessed: 2026-11-12, tier: 一手 }
  - { id: s9, title: "阿庇安《羅馬內戰》1.120（Appian, Civil Wars），John Carter 英譯 — Livius.org", url: "https://livius.org/sources/content/appian/appian-spartacus", accessed: 2026-11-12, tier: 一手 }
  - { id: s10, title: "All roads lead to Rome — Wikipedia", url: "https://en.wikipedia.org/wiki/All_roads_lead_to_Rome", accessed: 2026-11-12, tier: 百科 }
importance: 2
learn:
  histories: [希臘羅馬史]
  why_care: 「條條大路通羅馬」現存最早的紀錄是中世紀的，不是古羅馬人留下的；但羅馬人真的把路修成一張網。這條路最早是為打仗而修，後來變成整個義大利的動脈。[s1][s2][s10]
  story: |
    前 312 年，羅馬正和薩莫奈人打仗。監察官阿庇烏斯·克勞狄烏斯下令修一條路，讓軍隊和補給能跨過彭甸沼澤，一路送到南邊的卡普阿。[s1] 李維把這條路和他同年修的水道並列為他的代表工程。[s8] 後來路面鋪上密接的玄武岩石板，中間高、兩側低，水才好排。[s2][s3] 後來路往南延伸到布林迪西港，1 世紀的詩人斯塔提烏斯稱它「長路之后」。[s1][s3] 前 71 年，斯巴達克斯起義失敗。史家阿庇安說，剩下的約 6,000 名俘虜在羅馬和卡普阿之間的整條路上被釘上十字架；他沒有寫路名，後人一般認為就是亞壁古道。[s9][s1] 今天人們愛說「條條大路通羅馬」，但這句話目前找得到的最早紀錄，是 1175 年的中世紀拉丁文。[s10]
  key_terms:
    - { term: 監察官（censor）, plain: 羅馬負責調查公民戶口與財產、也主持公共工程發包的高級官員；亞壁古道由監察官阿庇烏斯下令興建。, example: 像同時管戶政和公共工程發包的官員。 }
    - { term: 十字儀（groma）, plain: 羅馬測量員用來定出直線和直角的工具。, example: 像施工時拉直線用的雷射水平儀的古代版。 }
    - { term: 堤道, plain: 在沼澤或低地上墊高築成的路，讓人車不用涉水。, example: 像在水田中間築的田埂路。 }
    - { term: 金色里程碑（Milliarium Aureum）, plain: 立在羅馬廣場的紀念碑，被當成帝國各條大道的象徵起點；有人把「條條大路通羅馬」和它連在一起。, example: 像臺北市的「公路原點」，好幾條省道的里程都從那裡起算。 }
  primary_source:
    - text: "crucified all the way along the road from Rome to Capua（沿著從羅馬到卡普阿的路被一路釘上十字架）"
      from: 阿庇安《羅馬內戰》1.120（John Carter 英譯，Livius.org；中文為本站摘譯）。阿庇安只說是羅馬和卡普阿之間的路，沒有寫路名
      src: s9
    - text: 李維把前 312 年監察官阿庇烏斯的公共工程記為以他命名的一條路和一條水道，並說他獨自完成這些工程。（轉述大意，不是逐字翻譯）
      from: 李維《羅馬史》9.29（Perseus 英譯）
      src: s8
  historiography: |
    **這條路是為了什麼？** 最初是軍用，讓軍隊和補給快速南下。[s1] 後來也有經濟作用：有研究整理共和時期（前 155 年到西元 2 年）埋藏的錢幣，發現錢幣集中在羅馬周圍和亞壁古道這類幹道沿線，而且距離對錢幣流通的阻礙越來越小；作者認為這和道路擴張有關。[s2]
    **羅馬道路網到底有多大？** 常見的說法是：從羅馬城放射出 29 條軍用大道，整個帝國的道路加起來超過 40 萬公里。[s2] 2025 年的 Itiner-e 資料集把找得到依據的道路一條條畫出來，共約 29.9 萬公里，將近是先前同類資料集（約 18.9 萬公里）的兩倍；但作者自己說，位置「確定」的只有約 2.7%，約 89.8% 是「推測」，約 7.4% 是「假設」。[s4] 兩個數字算法不同，不能直接相減。
  misconceptions:
    - 「羅馬道路全都是石頭鋪的。」整個帝國號稱 40 多萬公里的道路中，石鋪路面約 8 萬公里。[s2]
    - 「有了大路，走陸路就很快。」馬車一天約走 40–50 公里，步行約 20–25 公里；官方驛站換馬接力送信，一天平均也只有約 80 公里。[s2]
  pop_culture:
    - { claim: "常見說法：「條條大路通羅馬」是古羅馬人的諺語。", fact: "目前已知最早的紀錄，是 1175 年法國神學家阿蘭·德·利爾（Alain de Lille）在《箴言書》裡的一句中世紀拉丁文，意思是「千條路永遠把人帶向羅馬」；英文最早見於 1391 年喬叟的作品。它背後的意象是帝國大道都通向羅馬廣場的金色里程碑，但目前找不到古羅馬人自己說這句話的紀錄。[s10]", src: [s10] }
    - { claim: "常見印象：羅馬大路是為了做生意、運貨而修的。", fact: "亞壁古道最初是軍用道路，為了在薩莫奈戰爭中把軍隊和補給送往卡普阿；商業與經濟上的作用是後來才慢慢出現的。[s1][s2]", src: [s1, s2] }
crosscheck:
  date: 2026-11-14
  by: 獨立查核 agent（歷史學者＋教育者，未參與寫作）
  result: 通過
  notes: "1) 重開 s9（Livius.org，John Carter 英譯）：頁面原文是「until there were only 6,000 survivors, who were taken prisoner and crucified all the way along the road from Rome to Capua」，卡片的引文逐字相符（語序是羅馬→卡普阿）。任務單提到的「from Capua to Rome」是另一個通行英譯（Horace White，Loeb）的語序，也合乎查核者所知的希臘原文語序；本輪沒有重開那個譯本，只在搜尋結果看到 Perseids 有該譯本的頁面。兩種譯法意思相同，而且都沒有寫路名，卡片已照實寫成「羅馬和卡普阿之間的整條路，沒有寫路名；說成亞壁古道是後人推定」。補充（查核者所知，未寫進卡片）：當時羅馬到卡普阿還有拉丁大道可走，所以這個推定雖然合理，仍不是史料原文。2) 重開 s10：1175 年 Alain de Lille《Liber Parabolarum》「Mille viae ducunt homines per saecula Romam」、1391 年喬叟《論星盤》、金色里程碑，相符；條目沒有說古羅馬人有沒有講過這句話，所以原「不是古羅馬人說的」改成「找不到古羅馬人說這句話的紀錄」。3) s4：nature.com 的頁面本輪打不開（client error），改開巴塞隆納自治大學典藏的同一篇論文全文並把來源網址換成它：299,171.31 公里、約 400 萬平方公里、約 150 年、DARMC 資料集 188,555 公里（「nearly double」）、確定 2.737%／推測 89.818%／假設 7.445%、主幹道 103,477.9 公里與次要道路 195,693.3 公里，卡片數字全部相符，保留並補上精確數字。4) 重開 s2：「29 條軍用大道」說的是從羅馬城放射出去的幹道，「40 萬公里、其中 80,500 公里石鋪」說的是整個帝國的道路，原卡把兩者連成一句，已拆開；馬車每日 40–50 公里、步行 20–25 公里、驛站接力約 80 公里、共和時期錢幣埋藏研究（前 155–西元 2 年）、奧古斯都前 20 年把道路管理官改為常設、監察官命名、路面中間拱起，相符。改錯：條目沒有寫「大宗貨物仍以水運為主」，這句在三處標了 s2 卻沒有來源支持，已刪（說法本身是學界常識，日後找到來源可以補回）。5) 重開 s1：軍用目的、彭甸沼澤、132 羅馬里（195.4 公里）、全長 540 公里、斯塔提烏斯「regina viarum」、圖拉真大道、2024 年 7 月列入世界遺產，相符；延伸到布林迪西的年份條目自己不一致（正文前 264 年，資訊框與另一處前 244 年），已並列。條目寫六千人「沿亞壁古道」被釘十字架並引阿庇安 1.120，該段有編輯標記，卡片不採它的路名。6) 「路面用玄武岩石板」原句讀起來像前 312 年就鋪好；加「後來」（查核者依李維 10.23、10.47 所知，分段鋪石始於前 290 年代，未重開）。7) 金色里程碑：原解釋說它是「全國道路量距離的起點」，這一點學界有不同看法，改成「象徵起點」；生活例子改成臺北的公路原點。8) 因果：war-samnite →（促成）恰當。9) 未重開：s3、s6、s7、s8（李維 9.29）。限制：WebFetch 全輪 15 次（1 次失敗），摘要工具只回短引文。"
verification: 交叉確認
lens_status: 無直接論述
---

## D1 功能與象徵

亞壁古道最初是軍用道路，讓羅馬能在薩莫奈戰爭期間跨越彭甸沼澤，把軍隊與補給送往卡普阿。[s1] 詩人斯塔提烏斯稱它為「長路之后」（regina viarum）。[s1][s3] 前 71 年，斯巴達克斯起義失敗後約 6,000 名俘虜被釘死在羅馬與卡普阿之間的路旁，道路也成了展示懲罰的舞台。[s9] 阿庇安寫的是「羅馬到卡普阿的整條路」，沒有寫路名；英文維基百科等現代整理把它說成亞壁古道，這是後人的推定，不是史料原文。[s9][s1]（詳見「羅馬奴隸制與斯巴達克斯」卡）

## D2 建造者與資金

前 312 年由監察官阿庇烏斯．克勞狄烏斯．凱庫斯開始興建；公共道路由國家維護，常以興建的監察官命名。[s1][s2] 前 20 年奧古斯都親自接管道路事務，把各條大道的管理官改成常設職位。[s2] 具體造價與資金來源，來源不足。

## D3 技術與材料

測量員以測桿和十字儀（groma）定出直線；先挖溝，再填入碎石、礫石與石灰混凝土等層次，最上層鋪石並做成中間高、兩側低以利排水。[s1][s2] UNESCO 資料描述亞壁古道以密接的玄武岩石板鋪面。[s3] 遇到山丘傾向開鑿通過，並建造隧道、橋梁與跨越沼澤的堤道。[s2]

## D4 規模與數據

- 羅馬到卡普阿約 132 羅馬里（約 195 公里）；全長約 540 公里。英文維基百科說前 264 年延伸到布林迪西港，但同一條目另一處寫前 244 年。[s1]
- 整個帝國的道路網：英文維基百科說，極盛時從羅馬城放射出 29 條軍用大道；整個帝國的道路合計超過 40 萬公里，其中約 8 萬公里是石鋪路面。[s2]
- 2025 年的 Itiner-e 資料集畫出 299,171 公里道路（約 150 年帝國最大範圍），將近是先前資料集（188,555 公里）的兩倍；主幹道約 10.3 萬公里、次要道路約 19.6 萬公里。位置「確定」的只有 2.737%，89.818% 屬「推測」，7.445% 屬「假設」。[s4]

## D5 維護與後世命運

圖拉真修築由貝內文圖姆通往布林迪西、繞開塔倫圖姆的分支「圖拉真大道」。[s1] 許多羅馬道路的路線至今仍是現代道路。[s2] 2024 年以「Via Appia. Regina Viarum」列入世界遺產。[s1][s3]

## D6 雙軌解讀

### 李彔

無直接論述。

### 哈拉瑞

無直接論述：目前查到的公開摘要與書評，沒有哈拉瑞專門談羅馬道路的內容。

## D7 今日對照鉤子

「先為軍事需要修建、後來也帶動經濟往來的基礎建設」；共和時期的錢幣埋藏研究認為，道路擴張讓遠方地區和羅馬連得更緊。[s2]

## D8 不可類比的差異

羅馬時代的陸路速度很慢：馬車每天約 40–50 公里、步行約 20–25 公里；今日的道路網與物流速度不能直接比較。[s2] 道路網的重建也多屬推測。[s4]
