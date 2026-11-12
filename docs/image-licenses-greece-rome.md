# 古希臘專題補圖片：授權查證（2026-11-12）

古希臘專題 18 張卡各配 1 張 Wikimedia Commons 圖；18 張全部找到，沒有「不放」的卡。查法：Commons API 讀 extmetadata（LicenseShortName、Artist、Credit、日期）＋ `prop=revisions` 抓檔案頁原文看授權模板。圖檔網址由 API 回傳（原圖寬 ≤960px 用原檔，更大用 960px 縮圖，主機改 upload.wikimedia.org）。寬高已寫入 `data/image-sizes.json`。

## 判準

- 立體文物（胸像、陶片、抽籤機、遺址）：看**照片**的授權。攝影者自行釋出（Commons 模板 PD-self）或 CC BY／BY-SA／CC0 才收。
- 平面古作品（馬賽克、畫、舊版畫、舊地圖）：忠實翻拍視為公有領域（PD-art／PD-old）。
- 胸像多數是羅馬時代仿製品，圖說都已照實寫明；「傳為某某」的像（阿爾西比亞德斯、梭倫、斯巴達列奧尼達）圖說寫明身分只是傳統叫法。

## 逐張紀錄

| 卡片 | Commons 檔案 | 作者／攝影 | 年代 | 收藏處 | 授權（檔案頁模板） | 寬×高 |
|---|---|---|---|---|---|---|
| person-themistocles | [Themistokles, Herrenbüste.jpg](https://commons.wikimedia.org/wiki/File:Themistokles,_Herrenbüste.jpg) | Pimpinellus（攝影）；雕像為羅馬時代仿製品 | 羅馬時代仿製（原作約前 470 年） | 奧斯提亞博物館（義大利） | CC BY-SA 4.0 | 2878×3072 |
| person-pericles | [Pericles Pio-Clementino Inv269.jpg](https://commons.wikimedia.org/wiki/File:Pericles_Pio-Clementino_Inv269.jpg) | 仿 Kresilas 原作的羅馬時代複製品；Jastrow（攝影） | 羅馬時代仿製（原作約前 430 年） | 梵蒂岡博物館 Pio-Clementino 館 | Public domain（PD-self，攝影者 Jastrow 自行釋出） | 1275×2560 |
| person-socrates | [Socrates Louvre.jpg](https://commons.wikimedia.org/wiki/File:Socrates_Louvre.jpg) | 佚名（羅馬時代仿製品）；Eric Gaba（攝影） | 1 世紀（羅馬時代） | 羅浮宮（法國巴黎） | CC BY-SA 2.5 | 1944×2592 |
| person-alcibiades | [Bust Alcibiades Musei Capitolini MC1160.jpg](https://commons.wikimedia.org/wiki/File:Bust_Alcibiades_Musei_Capitolini_MC1160.jpg) | 佚名（羅馬時代仿製品）；Marie-Lan Nguyen（攝影） | 羅馬時代仿製（原作約前 4 世紀） | 卡比托利歐博物館（羅馬） | Public domain（PD-self，攝影者自行釋出） | 1475×2460 |
| person-aristotle | [Aristotle Altemps Inv8575.jpg](https://commons.wikimedia.org/wiki/File:Aristotle_Altemps_Inv8575.jpg) | 仿呂西波斯青銅原作的羅馬時代複製品；Jastrow（攝影） | 羅馬時代仿製（原作約前 330 年） | 阿爾滕普斯宮（羅馬國立博物館） | Public domain（PD-self，攝影者 Jastrow 自行釋出） | 1700×2275 |
| person-alexander | [Azara herm Louvre Ma436.jpg](https://commons.wikimedia.org/wiki/File:Azara_herm_Louvre_Ma436.jpg) | 仿呂西波斯原作的雅典複製品；Jastrow（攝影） | 1–2 世紀仿製（原作前 4 世紀晚期） | 羅浮宮（法國巴黎） | Public domain（PD-self，攝影者 Jastrow 自行釋出） | 2100×3500 |
| event-greek-polis-colonization | [Greek Colonization Archaic Period.svg](https://commons.wikimedia.org/wiki/File:Greek_Colonization_Archaic_Period.svg) | Dipa1965（製圖） | 2017（現代地圖） | Wikimedia Commons | CC BY-SA 4.0 | 855×485 |
| event-olympic-games | [Ruins of Olympia, Greece, Stadium.jpg](https://commons.wikimedia.org/wiki/File:Ruins_of_Olympia,_Greece,_Stadium.jpg) | wiredtourist.com（攝影） | 2010 | 奧林匹亞考古遺址（希臘） | CC BY 2.0 | 1024×683 |
| social-sparta | [Statue of a hoplite known as Leonidas 480-470 BCE Sparta Acropolis Sanctuary of Athena Chalkioikos 01.jpg](https://commons.wikimedia.org/wiki/File:Statue_of_a_hoplite_known_as_Leonidas_480-470_BCE_Sparta_Acropolis_Sanctuary_of_Athena_Chalkioikos_01.jpg) | 佚名（古代原作）；Mary Harrsch（攝影） | 約前 480–470 年 | 斯巴達考古博物館（希臘） | CC BY-SA 4.0 | 3000×3991 |
| event-solon-reform | [Ignoto, c.d. solone, replica del 90 dc ca da orig. greco del 110 ac. ca, 6143.JPG](https://commons.wikimedia.org/wiki/File:Ignoto,_c.d._solone,_replica_del_90_dc_ca_da_orig._greco_del_110_ac._ca,_6143.JPG) | 佚名（羅馬時代仿製品）；Sailko（攝影） | 約公元 90 年（羅馬時代仿製） | 那不勒斯國家考古博物館（義大利） | CC BY-SA 3.0 | 1300×2124 |
| event-cleisthenes-reform | [AGMA Ostrakon Thémistocle 1.jpg](https://commons.wikimedia.org/wiki/File:AGMA_Ostrakon_Thémistocle_1.jpg) | 佚名（古代原件）；Marsyas（攝影） | 約前 482 年 | 雅典古市集博物館（希臘） | CC BY-SA 2.5 | 800×778 |
| social-athenian-democracy | [Kleroterion, AGMA, 225287.jpg](https://commons.wikimedia.org/wiki/File:Kleroterion,_AGMA,_225287.jpg) | 佚名（古代原件）；Zde（攝影） | 前 4 世紀（古希臘） | 雅典古市集博物館（希臘） | CC BY-SA 4.0 | 5419×3606 |
| event-greek-philosophy-schools | [MANNapoli 124545 plato's academy mosaic.jpg](https://commons.wikimedia.org/wiki/File:MANNapoli_124545_plato's_academy_mosaic.jpg) | 佚名；Jebulon（攝影） | 約前 1 世紀（羅馬時代） | 那不勒斯國家考古博物館（義大利） | CC0（攝影）；原作為公有領域 | 2392×2441 |
| tech-alexandria-library | [Ancientlibraryalex.jpg](https://commons.wikimedia.org/wiki/File:Ancientlibraryalex.jpg) | O. von Corven | 19 世紀 | 佚名出版物翻印（Tolzmann 等，2001） | Public domain（PD-art） | 1072×1090 |
| war-roman-conquest-greece | [Korinth BW 2017-10-10 10-55-28.jpg](https://commons.wikimedia.org/wiki/File:Korinth_BW_2017-10-10_10-55-28.jpg) | Berthold Werner（攝影） | 2017（神殿約前 6 世紀） | 古科林斯遺址（希臘） | CC BY-SA 3.0 | 8179×6032 |
| event-death-of-socrates | [David - The Death of Socrates.jpg](https://commons.wikimedia.org/wiki/File:David_-_The_Death_of_Socrates.jpg) | 雅克-路易・大衛（Jacques-Louis David） | 1787 | 大都會藝術博物館（美國紐約） | Public domain（PD-art） | 3896×2559 |
| event-alexander-campaign | [Map-alexander-empire.png](https://commons.wikimedia.org/wiki/File:Map-alexander-empire.png) | George Willis Botsford | 1913 | 《A History of the Ancient World》（Macmillan） | Public domain | 929×605 |
| building-theatre-dionysus | [Theatre of Dionysus Acropolis Athens Greece.jpg](https://commons.wikimedia.org/wiki/File:Theatre_of_Dionysus_Acropolis_Athens_Greece.jpg) | Jebulon（攝影） | 2015（劇場遺址主要為前 4 世紀至羅馬時代） | 雅典衛城南坡（希臘） | CC0 | 4592×3056 |

授權網址：CC BY-SA 4.0 https://creativecommons.org/licenses/by-sa/4.0 、CC BY-SA 3.0 https://creativecommons.org/licenses/by-sa/3.0 、CC BY-SA 2.5 https://creativecommons.org/licenses/by-sa/2.5 、CC BY 2.0 https://creativecommons.org/licenses/by/2.0 、CC0 https://creativecommons.org/publicdomain/zero/1.0/ ；PD-self 是攝影者自行宣告釋出到公有領域（Commons 模板 PD-self）。

## 授權細節與存疑

- **Socrates Louvre.jpg**：Commons 顯示「Public domain」，但檔案頁原文是攝影者 Eric Gaba（Sting）的 CC BY-SA 2.5 ＋ 古作品 PD-old-100；卡片照「照片的授權」填 CC BY-SA 2.5。
- **Ostrakon（AGMA Ostrakon Thémistocle 1.jpg）**：同樣 extmetadata 顯示 Public domain，原文是 Licensed-PD（古作品 PD-anon-expired）＋攝影者 Marsyas 的 CC BY-SA 2.5；卡片填 CC BY-SA 2.5。
- **柏拉圖學園馬賽克**：檔案頁同時有 PD-old-100（作品）與 Jebulon 的 CC0（照片）。
- **Pericles／Aristotle／Azara 的 Alexander／Alcibiades**：照片由 Jastrow、Marie-Lan Nguyen 以 PD-self 釋出；extmetadata 的 LicenseUrl 為空，是模板的正常現象。Aristotle 檔案頁另有 PD-art-70-3d、PD-old-auto。
- **tech-alexandria-library（Ancientlibraryalex.jpg）略存疑**：標 PD-art，作者 O. von Corven、「19 世紀」，來源是 2001 年書籍的翻印；作者生平與確切年代 Commons 沒寫（Wikidata 屬性猜 1850 年），所以 year 只寫「19 世紀」。同名的另一個檔案（The Great Library of Alexandria, O. Von Corven, 19th century.jpg）被上傳者標成自己的 CC BY-SA 4.0「Own work」，不可信，未採用。圖說已寫明是想像圖。若查核者不放心，這張是最先該拿掉的。
- **event-alexander-campaign**：Botsford 1913 年教科書地圖，PD；地圖是「征服波斯後的疆域」，不是逐年行軍路線，圖說已寫明。
- **war-roman-conquest-greece**：阿波羅神殿是古風時代（約前 6 世紀）建築，不是羅馬征服當時的事件現場，圖說已點出科林斯前 146 年被毀、後來羅馬重建，神殿本身是少數倖存的早期遺跡。
- **event-greek-polis-colonization**：圖檔用 SVG 原檔（855px 寬）。
- **兩個 URL 當下 HEAD 回 429（限速，非網址錯）**：Alcibiades、Kleroterion 的 960px 縮圖；其餘 16 個回 200。
- 圖說中的史實判斷（例如陶片放逐制傳統上歸於克里斯提尼、斯巴達武士像「列奧尼達」名稱無銘文）來自 Commons 檔案說明與一般學界說法，未逐一對照卡片 sources，請查核者視需要複核。


## 驗收決定（2026-11-12）

- `tech-alexandria-library` 的 Ancientlibraryalex.jpg 作者生平與年代查不到，授權依據不足，驗收時**已拿掉、不上線**。
