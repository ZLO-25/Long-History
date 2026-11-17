# 大航海時代專題補圖片：授權查證（2026-11-17）

大航海時代專題 20 張卡，**20 張都找到圖**（人物卡 7 張：麥哲倫、哥倫布、拉斯・卡薩斯、鄭和、利瑪竇、鄭芝龍、鄭成功；事件／戰爭／技術卡 13 張）。查法：Commons API 讀 extmetadata（LicenseShortName、Artist、日期、Credit）＋ `action=raw` 抓檔案頁原文看授權模板；每個圖檔網址都實際下載過、回 200。原圖寬 ≤960px 用原檔，更大用 960px 縮圖（主機 upload.wikimedia.org）。寬高（原圖）已寫入 `data/image-sizes.json`。結果暫存在 `data/pending-images.yaml`，由規劃者用 `npx tsx scripts/images-pending.ts restore <id>` 放回卡片。

## 判準

- 平面古作品（肖像畫、古地圖、書籍插圖）：忠實翻拍視為公有領域（PD-art／PD-old）。作者年代最晚到 17 世紀末，全部早於 1923 年。
- 立體文物（星盤）：看照片授權，只有 1 張（攝影者自行授權 CC BY-SA 4.0）。
- 人物沒有確定生前寫實像的（麥哲倫、哥倫布、鄭芝龍、鄭成功），圖說都寫明是後世畫或傳說，不當作寫實肖像。
- 避開現代想像畫、現代雕像與紀念碑照片。

## 逐張紀錄

| 卡片 | Commons 檔案 | 作者 | 年代 | 收藏處 | 授權（Commons 顯示；檔案頁模板） | 寬×高 | 為什麼選它 |
|---|---|---|---|---|---|---|---|
| event-portugal-africa-coast | [Henricus Martellus - Map of the world - 1489 - Yale archive.jpg](https://commons.wikimedia.org/wiki/File:Henricus_Martellus_-_Map_of_the_world_-_1489_-_Yale_archive.jpg) | 亨利庫斯・馬泰魯斯（Henricus Martellus） | 約 1489 年 | 耶魯大學圖書館（美國） | Public domain；模板 PD-old-70-1923（作者 15 世紀，已過著作權期限） | 11332×6532 | 作者與年代明確的當時地圖，畫出非洲整個海岸線，最貼近「葡萄牙探索非洲海岸」的主題。 |
| tech-sail-navigation | [Astrolabe de marin, France, 1603.jpg](https://commons.wikimedia.org/wiki/File:Astrolabe_de_marin,_France,_1603.jpg) | 佚名（1603 年法國製造）；Pierre5018（攝影） | 1603 年 | 加拿大歷史博物館（藏品編號 CMC 989.56.1） | CC BY-SA 4.0（照片）；器物為公有領域；模板 self|cc-by-sa-4.0（攝影者自行授權 CC BY-SA 4.0）；器物 1603 年製，已過著作權 | 3046×3186 | 航海星盤的實物照片，正是導覽文提到的核心工具；照片授權乾淨。注意：器物是 1603 年的，比大航海初期晚約一個世紀，圖說已照實寫。 |
| event-treaty-tordesillas | [Cantino planisphere (1502).jpg](https://commons.wikimedia.org/wiki/File:Cantino_planisphere_(1502).jpg) | 佚名葡萄牙製圖師 | 1502 年 | 埃斯滕塞大學圖書館（義大利摩德納） | Public domain；模板 PD-Scan（掃描複製平面作品；原作 1502 年，已過著作權期限） | 10643×4998 | 最接近條約時代的地圖，圖上就畫了托德西利亞斯線（Commons 檔案頁寫為 Public domain，作者佚名葡萄牙人）。原圖 10643×4998，網站用 960px 縮圖；細節看不清楚是縮圖的限制。 |
| event-magellan-circumnavigation | [Ortelius - Maris Pacifici 1589.jpg](https://commons.wikimedia.org/wiki/File:Ortelius_-_Maris_Pacifici_1589.jpg) | 亞伯拉罕・奧特里烏斯（Abraham Ortelius） | 1589 年 | Helmink 古地圖商（Commons 標示的來源） | Public domain；模板 PD-Art（平面古地圖的忠實翻拍） | 4001×2771 | 麥哲倫船隊環球後約 70 年的地圖，畫了麥哲倫海峽與維多利亞號；作者年代明確，不是現代想像畫。 |
| person-magellan | [Ferdinand Magellan.jpg](https://commons.wikimedia.org/wiki/File:Ferdinand_Magellan.jpg) | 佚名 | 約 1550–1625 年 | 水手博物館（美國維吉尼亞州） | Public domain；模板 PD-Art（平面油畫的忠實翻拍） | 562×693 | Commons 上相對有出處（水手博物館藏）的後世畫像；麥哲倫沒有確定的生前肖像，圖說已寫明是後世畫。另有 Retrato de Hernando de Magallanes（1848 年左右）更晚，不採用。 |
| event-columbian-exchange | [Healer (ticitl) tending to people suffering from smallpox in 1520 in Book 12 of the Florentine Codex, 1577.jpg](https://commons.wikimedia.org/wiki/File:Healer_(ticitl)_tending_to_people_suffering_from_smallpox_in_1520_in_Book_12_of_the_Florentine_Codex,_1577.jpg) | 佚名阿茲特克畫師（為方濟會修士薩哈貢編纂） | 約 1577 年 | 佛羅倫斯勞倫齊亞納圖書館（義大利） | Public domain；模板 PD-old-70（作者 16 世紀） | 2000×1451 | 當時的原住民畫師親眼所見的紀錄，比現代資訊圖更貼近史料；避開 BRI Columbian Exchange（2024 年 CC BY-SA 資訊地圖，也可用但是現代製作）。 |
| person-columbus | [Ridolfo del Ghirlandaio - Ritratto di Cristoforo Colombo (1520).jpg](https://commons.wikimedia.org/wiki/File:Ridolfo_del_Ghirlandaio_-_Ritratto_di_Cristoforo_Colombo_(1520).jpg) | 里多爾福・吉蘭達伊奧（Ridolfo del Ghirlandaio） | 約 1520 年 | （檔案頁未載） | Public domain；模板 PD-Art（作者 1483–1561，已過著作權期限） | 915×1077 | 年代最早的哥倫布畫像之一；哥倫布沒有留下生前確定的畫像，圖說已寫明。檔案頁沒有收藏處，故 holder 留空。 |
| person-las-casas | [Fray Bartolomé de las Casas.jpg](https://commons.wikimedia.org/wiki/File:Fray_Bartolomé_de_las_Casas.jpg) | 佚名畫家 | 16 世紀 | （檔案頁未載） | Public domain；模板 PD-Art（平面古畫翻拍；16 世紀作者不詳） | 1280×1733 | Commons 上標明 16 世紀的畫像（約 1550 年前後），可能與他生前相近；檔案頁沒寫收藏處，holder 留空。Commons 的年代欄是估計，圖說未寫成寫實畫像。 |
| event-manila-1571 | [Manila Map 1671 laborevangelicam03coli 0843.jpg](https://commons.wikimedia.org/wiki/File:Manila_Map_1671_laborevangelicam03coli_0843.jpg) | 取自 Colín《Labor evangélica》（1671 年版） | 1671 年 | （檔案頁未載） | Public domain；模板 PD-old-70-expired（1671 年出版品） | 2922×2865 | 卡片年代 1571 沒有當時的馬尼拉圖；這是最早、最清楚的一張，圖說已寫明晚了一百年。檔案頁沒寫收藏處，來源為 archive.org 的書掃描。 |
| war-banda-1621 | [AMH-4721-NA Map of Fort Nassau on Banda Neira.jpg](https://commons.wikimedia.org/wiki/File:AMH-4721-NA_Map_of_Fort_Nassau_on_Banda_Neira.jpg) | 佚名荷蘭繪者 | 約 1651 年 | 荷蘭國家檔案館（Nationaal Archief） | Public domain；模板 PD-Art-100（作者年代久遠） | 2400×1898 | 班達群島當時荷蘭人自己畫的堡壘圖，出自「共同遺產地圖集」（Atlas of Mutual Heritage）。比 1621 年晚約 30 年，圖說已寫明。 |
| person-zheng-he | [Mao Kun map - Ceylon, Africa.png](https://commons.wikimedia.org/wiki/File:Mao_Kun_map_-_Ceylon,_Africa.png) | 茅元儀編《武備志》收錄（原圖為明初航海圖） | 1621 年（原圖約 15 世紀） | （檔案頁未載） | Public domain；模板 PD-old-100（原書 1621 年刊） | 497×665 | 鄭和沒有留下可信的當世肖像（現有像都是現代雕像或想像畫）；選當時的航海圖更真實。這是一頁圖的掃描截圖，圖像為黑白，解析度不高。 |
| event-malacca-1511 | [Malaca (manuel godinho de eredia 1604).jpg](https://commons.wikimedia.org/wiki/File:Malaca_(manuel_godinho_de_eredia_1604).jpg) | 曼努埃爾・戈迪紐・德・埃雷迪亞（Manuel Godinho de Erédia） | 1604 年 | （檔案頁未載） | Public domain；模板 PD-old-100（作者 1604 年） | 439×640 | 出自攻佔馬六甲 100 年內、住在當地的葡萄牙人之手，最貼近事件；避開 19 世紀想像畫《Capture of Malacca》及 2022 年的現代畫（Domingos Rebelo，CC0）。 |
| event-macau-1557 | [Macau in Livro das Plantas de Todas as Fortalezas.jpg](https://commons.wikimedia.org/wiki/File:Macau_in_Livro_das_Plantas_de_Todas_as_Fortalezas.jpg) | 安東尼奧・博卡羅（António Bocarro） | 1635 年 | （檔案頁未載） | Public domain；模板 PD-old-100（作者 1635 年） | 6038×4166 | 當時葡萄牙官方圖冊裡的澳門，比 1557 晚約八十年，圖說已寫明。 |
| event-longqing-kaihai | [Selden map.jpg](https://commons.wikimedia.org/wiki/File:Selden_map.jpg) | 佚名（中國商人製圖） | 約 1620–1659 年 | 牛津大學博德利圖書館（英國） | Public domain；模板 PD-old-70-1923（作者不詳，早於 1923 年） | 1353×2199 | 最能反映隆慶開海後民間海上貿易的當時地圖；比 1567 晚約半世紀，圖說已寫明。Commons 檔案本身是側放的。 |
| person-matteo-ricci | [利玛窦像，游文辉绘.jpg](https://commons.wikimedia.org/wiki/File:利玛窦像，游文辉绘.jpg) | 游文輝（修士 Emmanuel Pereira） | 約 1610 年 | 耶穌會教堂（羅馬 Il Gesù） | Public domain；模板 PD-old-70（作者 17 世紀初） | 2183×2814 | 寫實度最高的利瑪竇像：作者就是同時代、在北京的人，年代明確。年齡部分有誤（Commons 備註），圖說未提。 |
| event-dutch-penghu-1622 | [AMH-5187-NA Map of the Pescadores and the west coast of Formosa.jpg](https://commons.wikimedia.org/wiki/File:AMH-5187-NA_Map_of_the_Pescadores_and_the_west_coast_of_Formosa.jpg) | 海因德里克・阿里恩森・洛茨曼（Heyndrick Ariensen Lootsman） | 約 1624–1625 年 | 荷蘭國家檔案館（Nationaal Archief） | Public domain；模板 PD-Art-100（作者 17 世紀） | 2400×1875 | 事件後兩三年的荷蘭測量師地圖，直接畫出澎湖與台灣西岸；出自共同遺產地圖集。 |
| event-hamada-yahei-1628 | [Capture of Nuyts by the Japanese in 1629.jpg](https://commons.wikimedia.org/wiki/File:Capture_of_Nuyts_by_the_Japanese_in_1629.jpg) | 森島（17 世紀日本書籍插圖） | 17 世紀 | （檔案頁未載） | Public domain；模板 PD-Art（作者 17 世紀） | 1480×965 | 事件當世日本方面的圖像紀錄，作者年代明確；Commons 標題寫 1629，卡片事件年為 1628，圖說沒寫年份以免混淆。 |
| event-guo-huaiyi-1652 | [Map of Roads and Cultivated Fields in the Saccam Area, 1644.jpg](https://commons.wikimedia.org/wiki/File:Map_of_Roads_and_Cultivated_Fields_in_the_Saccam_Area,_1644.jpg) | 佚名荷蘭繪者 | 1644 年 | 荷蘭國家檔案館（VEL 1126） | Public domain；模板 PD-Art（17 世紀荷蘭地圖） | 1000×717 | 1652 年事件的發生地、事件前 8 年的荷蘭地圖；注意 Commons「date」欄寫的是 2006 上傳日，年代以標題與館藏為準。 |
| person-zheng-zhilong | [Portrait of Zheng Zhilong.jpg](https://commons.wikimedia.org/wiki/File:Portrait_of_Zheng_Zhilong.jpg) | 江日昇《台灣外記》插圖 | 1699 年（書成年代） | （檔案頁未載） | Public domain；模板 PD-Art（作者 1699 年，已過著作權期限） | 300×548 | 找不到生前像；這張出自 1699 年的書，圖說已寫明是後世畫。圖小（300×548）。 |
| person-koxinga | [The Portrait of Koxinga.jpg](https://commons.wikimedia.org/wiki/File:The_Portrait_of_Koxinga.jpg) | 佚名 | 17 世紀中葉 | 國立臺灣博物館 | Public domain；模板 PD-Art；作者標記為 Anonymous（Commons 模板） | 537×900 | 最早、最有名的鄭成功像，Commons 檔案頁說明為傳說在他生前所畫，圖說用「傳說」。 |

授權網址：CC BY-SA 4.0 https://creativecommons.org/licenses/by-sa/4.0 。其餘皆為公有領域（PD-art／PD-old 系列）。

## 沒放圖的卡

無，20 張都有圖。

## 授權細節與存疑

- **tech-sail-navigation 星盤**：這張是 2019 年攝影者 Pierre5018 的 CC BY-SA 4.0 照片（檔案頁 `{{self|cc-by-sa-4.0}}`）；星盤本身是 1603 年器物，卡片 license 填「CC BY-SA 4.0（照片）；器物為公有領域」。器物年代比大航海初期晚約一個世紀，圖說已寫明。
- **event-treaty-tordesillas 坎提諾圖**：檔案頁模板只有 PD-Scan（沒寫年代類模板），Commons 顯示為 Public domain，原作 1502 年無疑問；原圖超大（10643×4998），網站只用 960px 縮圖，細節看不清楚。
- **person-magellan／person-columbus／person-las-casas**：都是後世畫或作者年代只是估計；Commons 的年代欄不一定準（例如拉斯・卡薩斯那張「16 世紀」是估計，哥倫布那張檔案頁沒寫收藏處）。
- **event-manila-1571、event-macau-1557、event-hamada-yahei-1628**：年代比事件晚（約 100 年、80 年），或是事後所繪，圖說已寫明。檔案頁未載收藏處的，holder 欄留空（不亂填）。
- **event-guo-huaiyi-1652**：Commons 的 date 欄顯示 2006（上傳日），圖的年代 1644 取自檔案標題與館藏編號（Nationaal Archief VEL 1126）；請查核者可再對一次館藏。
- **person-zheng-he**：圖是黑白、解析度偏低（497×665）的書頁掃描；鄭和沒有可信的當世肖像，所以不放像。
- **event-longqing-kaihai 塞爾登地圖**：Commons 檔案本身是側放的，圖說已提醒。
- Commons 檔名含 Unicode 與逗號、括號者（利瑪竇像、Florentine Codex 等），url 已經過百分號編碼，page 保持原檔名。
