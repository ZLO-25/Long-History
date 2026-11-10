# 重要卡片補圖片：48 張卡的授權查證（2026-11-10）

ZL 要在重要卡片補上圖片。挑卡原則：108 課綱重點、各學習單元的核心卡、時間軸上的大轉折；每張只放 1 張最能說明事件的圖。日本戰國專題的 21 張已另外完成（見 `docs/image-licenses-sengoku.md`）。

## 結果總覽

```
48 張卡、48 個圖檔
 ├─ 臺灣史 12  ├─ 中國史 12  ├─ 世界史 21  └─ 東南亞（占婆、吳哥）3
授權
 ├─ 公有領域  36
 ├─ CC0       5
 └─ CC BY／BY-SA（要署名，卡片已寫作者） 7
```

## 怎麼查的

1. 用 Commons API（`generator=search`＋`imageinfo`＋`extmetadata`）找候選，再用 `prop=revisions` 抓**檔案頁原文**，看授權模板（PD-old-100、PD-Taiwan、PD-China、PD-Japan-oldphoto、cc-zero、cc-by-4.0…）。
2. 只收公有領域、CC0、CC BY、CC BY-SA；作者、年代、收藏處照檔案頁寫，檔案頁寫錯的另外改寫：康熙臺灣輿圖被 Commons 標成「16 世紀」、作者寫成上傳者，卡片改為「康熙年間（約 1699–1704）、國立臺灣博物館藏」，這是依一般通行的說法，**沒有另外開收藏機構網頁核對**，之後可再確認。
3. 圖檔網址一律用 API 回傳的路徑：原圖寬 ≤960px 用原檔，更大用 960px 縮圖；`thumb.wikimedia.org` 主機改成 `upload.wikimedia.org`（同一路徑、雲端代理只放行後者）。
4. 逐一用 HEAD 下載確認（Commons 對同一 IP 限速很兇，分三輪、每次間隔 20–45 秒）。推上時 33／48 已確認回 200，其餘回 429（限速，不是網址錯）；這些路徑都是 API 直接回傳的，不是自己推算。

## 刻意避開的

- **七七事變卡（war-sino-japanese-1937）不放**：候選照片來源是一個轉貼網頁，拍攝者與首次發表不明，PD-Taiwan 的理由站不住，寧缺勿濫。
- **皇民化、土地改革、加工出口區、茶與樟腦**：Commons 找不到年代與授權都清楚的照片，先不放；之後可以從國家文化記憶庫（CC BY）找。
- **赤壁之戰**：Commons 上「赤壁圖」多半畫的是蘇軾〈赤壁賦〉的夜遊，不是戰爭本身，放了會誤導，先不放。

## 圖說的原則

- 後世想像畫一定寫明「這是幾百年後畫的」（秦始皇像、張騫壁畫、薩拉米斯海戰、哥倫布登陸、華盛頓渡河、拿破崙越過阿爾卑斯山）。
- 照片寫「攝影者不詳」而不猜；說明不確定的（牡丹社合照人物）寫「Commons 說明標為…」。
- 秦漢長城卡用的是慕田峪（明長城）照片，圖說直接點出「今天看到的磚石長城大多是明朝修的」。

## 臺灣史

| 卡片 | 圖 | Commons 檔案 | 授權（模板） |
|---|---|---|---|
| event-dutch-formosa | 熱蘭遮城鳥瞰圖 | [Zeelandia from Dutch.jpg](https://commons.wikimedia.org/wiki/File:Zeelandia_from_Dutch.jpg) | Public domain （PD-Art／PD-old-auto-1923） |
| event-koxinga-taiwan | 鄭成功像 | [Portrait of Zheng Chenggong.jpg](https://commons.wikimedia.org/wiki/File:Portrait_of_Zheng_Chenggong.jpg) | Public domain （PD-Art／PD-old-100／PD-China） |
| event-qing-taiwan-frontier | 康熙臺灣輿圖（局部） | [康熙臺灣輿圖.jpg](https://commons.wikimedia.org/wiki/File:康熙臺灣輿圖.jpg) | Public domain （PD-art／PD-China） |
| social-siraya-deer | 《皇清職貢圖》中的臺灣平埔族人 | [Siraya people.jpg](https://commons.wikimedia.org/wiki/File:Siraya_people.jpg) | Public domain （PD-old-100） |
| event-mudan-incident | 1874 年西鄉從道與恆春半島部落領袖合影 | [Soldiers of the Japanese expedition in Taiwan.jpg](https://commons.wikimedia.org/wiki/File:Soldiers_of_the_Japanese_expedition_in_Taiwan.jpg) | Public domain （PD-old-100） |
| event-1895-cession | 馬關條約簽約圖 | [Scene of signing Treaty of Shimonoseki pictorial.jpg](https://commons.wikimedia.org/wiki/File:Scene_of_signing_Treaty_of_Shimonoseki_pictorial.jpg) | Public domain （PD-Japan） |
| event-wushe-incident | 莫那・魯道與賽德克族頭目 | [Mona Rudao and Seediq tribal leaders.jpg](https://commons.wikimedia.org/wiki/File:Mona_Rudao_and_Seediq_tribal_leaders.jpg) | Public domain （PD-Japan-oldphoto） |
| event-taiwan-cultural-association | 臺灣文化協會第一屆理事會合影 | [文化協會第一屆理事會.jpg](https://commons.wikimedia.org/wiki/File:文化協會第一屆理事會.jpg) | Public domain （PD-Taiwan／PD-US-1923） |
| event-228-incident | 1947 年 2 月 28 日的臺北街頭 | [228 incident of Taiwan.jpg](https://commons.wikimedia.org/wiki/File:228_incident_of_Taiwan.jpg) | Public domain （PD-Taiwan） |
| event-taiwan-martial-law | 臺灣省戒嚴令布告 | [Martial law order taiwan may 1949.jpg](https://commons.wikimedia.org/wiki/File:Martial_law_order_taiwan_may_1949.jpg) | Public domain （PD-ROC-exempt） |
| building-ten-major-projects | 西部幹線鐵路電氣化通車典禮 | [臺灣西部幹線鐵路電氣化通車典禮與EMU100型電聯車.jpg](https://commons.wikimedia.org/wiki/File:臺灣西部幹線鐵路電氣化通車典禮與EMU100型電聯車.jpg) | CC BY 3.0  |
| event-hsinchu-park-tsmc | 新竹科學園區管理局 | [Hsinchu Science and Industrial Park Administration 20101017.jpg](https://commons.wikimedia.org/wiki/File:Hsinchu_Science_and_Industrial_Park_Administration_20101017.jpg) | CC BY-SA 4.0  |

## 中國史

| 卡片 | 圖 | Commons 檔案 | 授權（模板） |
|---|---|---|---|
| event-confucius | 先師孔子行教像（拓本） | [Confucius Tang Dynasty, black print.jpg](https://commons.wikimedia.org/wiki/File:Confucius_Tang_Dynasty,_black_print.jpg) | Public domain （PD-Art／PD-old-100） |
| event-qin-unification | 秦始皇像 | [QinShiHuang18thCentury.jpg](https://commons.wikimedia.org/wiki/File:QinShiHuang18thCentury.jpg) | Public domain （PD-Art） |
| building-terracotta-army | 秦始皇陵兵馬俑一號坑 | [Qin Terracotta Army, Pit 1 01.jpg](https://commons.wikimedia.org/wiki/File:Qin_Terracotta_Army,_Pit_1_01.jpg) | CC0  |
| building-qin-han-great-wall | 慕田峪長城 | [Great Wall of China July 2006.JPG](https://commons.wikimedia.org/wiki/File:Great_Wall_of_China_July_2006.JPG) | CC0  |
| event-zhang-qian-west | 敦煌莫高窟第 323 窟壁畫：張騫出使西域 | [Zhang Qian.jpg](https://commons.wikimedia.org/wiki/File:Zhang_Qian.jpg) | Public domain （PD-Art／PD-1996） |
| war-an-lushan | 明皇幸蜀圖 | [Li Zhao Dao Tang Ming Huang to Shu.jpg](https://commons.wikimedia.org/wiki/File:Li_Zhao_Dao_Tang_Ming_Huang_to_Shu.jpg) | Public domain （PD-Art／PD-old-100-expired） |
| event-wang-anshi-reform | 王安石像 | [歷代聖賢名人像-29-宋丞相王荆公安石.jpg](https://commons.wikimedia.org/wiki/File:歷代聖賢名人像-29-宋丞相王荆公安石.jpg) | Public domain （PD-Art／PD-old-100） |
| event-zheng-he-voyages | 鄭和航海圖（局部）：滿剌加 | [Mao Kun map - Malacca.png](https://commons.wikimedia.org/wiki/File:Mao_Kun_map_-_Malacca.png) | Public domain （PD-old-100） |
| war-opium-war | 復仇女神號擊毀中國戰船 | [Destroying Chinese war junks, by E. Duncan (1843).jpg](https://commons.wikimedia.org/wiki/File:Destroying_Chinese_war_junks,_by_E._Duncan_(1843).jpg) | Public domain （PD-Art／PD-old-100-1923） |
| event-xinhai-revolution | 武昌起義後的湖北軍政府 | [Hubei Military Government.jpg](https://commons.wikimedia.org/wiki/File:Hubei_Military_Government.jpg) | Public domain （PD-China／PD-anon-1923） |
| event-may-fourth | 1919 年 5 月 4 日北京學生遊行 | [Chinese protestors march against the Treaty of Versailles (May 4, 1919).jpg](https://commons.wikimedia.org/wiki/File:Chinese_protestors_march_against_the_Treaty_of_Versailles_(May_4,_1919).jpg) | Public domain （PD-China） |
| event-prc-founding | 毛澤東宣布中華人民共和國成立 | [Mao Proclaiming New China.JPG](https://commons.wikimedia.org/wiki/File:Mao_Proclaiming_New_China.JPG) | Public domain （PD-China） |

## 世界史

| 卡片 | 圖 | Commons 檔案 | 授權（模板） |
|---|---|---|---|
| tech-cuneiform | 古巴比倫楔形文字泥板 | [Cuneiform Akkadian clay tablet 1.jpg](https://commons.wikimedia.org/wiki/File:Cuneiform_Akkadian_clay_tablet_1.jpg) | Public domain （PD-old） |
| building-acropolis | 雅典衛城與帕德嫩神廟 | [Acropolis Parthenon Athens Greece.jpg](https://commons.wikimedia.org/wiki/File:Acropolis_Parthenon_Athens_Greece.jpg) | CC0  |
| war-greco-persian | 薩拉米斯海戰 | [Kaulbach, Wilhelm von - Die Seeschlacht bei Salamis - 1868.JPG](https://commons.wikimedia.org/wiki/File:Kaulbach,_Wilhelm_von_-_Die_Seeschlacht_bei_Salamis_-_1868.JPG) | Public domain （PD-Art／PD-old-auto-expired） |
| building-colosseum | 羅馬競技場 | [Colosseum of Rome, Italy.jpg](https://commons.wikimedia.org/wiki/File:Colosseum_of_Rome,_Italy.jpg) | CC0  |
| event-charlemagne-coronation | 查理曼加冕 | [Raphael - Coronation of Charlemagne.jpg](https://commons.wikimedia.org/wiki/File:Raphael_-_Coronation_of_Charlemagne.jpg) | Public domain （PD-Art／PD-old-auto-expired） |
| event-black-death | 圖爾奈的黑死病死者下葬 | [Doutielt1.jpg](https://commons.wikimedia.org/wiki/File:Doutielt1.jpg) | Public domain （PD-art／PD-old-100） |
| event-magna-carta | 1215 年《大憲章》原件 | [Magna Carta (British Library Cotton MS Augustus II.106).jpg](https://commons.wikimedia.org/wiki/File:Magna_Carta_(British_Library_Cotton_MS_Augustus_II.106).jpg) | Public domain （PD-art／PD-old-100-1923） |
| event-vasco-da-gama | 達伽馬像 | [Gregório Lopes - Vasco da Gama (ca 1524).jpg](https://commons.wikimedia.org/wiki/File:Gregório_Lopes_-_Vasco_da_Gama_(ca_1524).jpg) | Public domain （PD-old-100） |
| tech-printing-press | 古騰堡聖經內頁 | [Bodleian Library Gutenberg Bible Vol2 563.jpg](https://commons.wikimedia.org/wiki/File:Bodleian_Library_Gutenberg_Bible_Vol2_563.jpg) | CC BY 4.0  |
| event-reformation | 馬丁・路德像 | [Lucas Cranach d.Ä. - Martin Luther, 1528 (Veste Coburg).jpg](https://commons.wikimedia.org/wiki/File:Lucas_Cranach_d.Ä._-_Martin_Luther,_1528_(Veste_Coburg).jpg) | Public domain （PD-Art／PD-old-100-expired） |
| event-columbus-aztec | 哥倫布登陸 | [Landing of Columbus (2).jpg](https://commons.wikimedia.org/wiki/File:Landing_of_Columbus_(2).jpg) | Public domain （PD-old-100-1923／PD-USGov-Congress-AOC） |
| event-atlantic-slave-trade | 布魯克斯號奴隸船平面圖 | [Brookes slave ship, British Library.jpg](https://commons.wikimedia.org/wiki/File:Brookes_slave_ship,_British_Library.jpg) | Public domain （PD-old-100-1923） |
| event-declaration-of-independence | 獨立宣言 | [Declaration of Independence (1819), by John Trumbull.jpg](https://commons.wikimedia.org/wiki/File:Declaration_of_Independence_(1819),_by_John_Trumbull.jpg) | Public domain （PD-Art-two／PD-old-100-expired／PD-USGov-Congress-AOC） |
| war-american-revolution | 華盛頓橫渡德拉瓦河 | [Washington Crossing the Delaware MET DP215410.jpg](https://commons.wikimedia.org/wiki/File:Washington_Crossing_the_Delaware_MET_DP215410.jpg) | CC0  |
| event-storming-bastille | 攻占巴士底監獄 | [Prise de la Bastille.jpg](https://commons.wikimedia.org/wiki/File:Prise_de_la_Bastille.jpg) | Public domain （PD-Art／PD-old-100-1923） |
| person-napoleon | 拿破崙越過阿爾卑斯山 | [David - Napoleon crossing the Alps - Malmaison1.jpg](https://commons.wikimedia.org/wiki/File:David_-_Napoleon_crossing_the_Alps_-_Malmaison1.jpg) | Public domain （PD-Art／PD-old-100-expired） |
| tech-steam-engine | 博爾頓與瓦特蒸汽機 | [Boulton & Watt steam engine, Sydney Powerhouse Museum, 2014 (15240699214).jpg](https://commons.wikimedia.org/wiki/File:Boulton_&_Watt_steam_engine,_Sydney_Powerhouse_Museum,_2014_(15240699214).jpg) | CC BY 2.0  |
| event-black-ships | 培里第二次來航繪卷（局部） | [The Mission of Commodore Perry to Japan in 1854 (BM 2013,3002.1).jpg](https://commons.wikimedia.org/wiki/File:The_Mission_of_Commodore_Perry_to_Japan_in_1854_(BM_2013,3002.1).jpg) | Public domain （PD-scan） |
| event-meiji-restoration | 岩倉使節團主要成員 | [Iwakura mission.jpg](https://commons.wikimedia.org/wiki/File:Iwakura_mission.jpg) | Public domain （PD-old-auto-expired／PD-Japan-oldphoto） |
| war-world-war-two | 進入死亡之顎：諾曼第登陸 | [Into the Jaws of Death 23-0455M edit.jpg](https://commons.wikimedia.org/wiki/File:Into_the_Jaws_of_Death_23-0455M_edit.jpg) | Public domain （PD-scan／PD-USCG／PD-old-auto） |
| tech-space-race | 艾德林與美國國旗 | [Buzz Aldrin and the U.S. flag on the Moon - GPN-2001-000012.jpg](https://commons.wikimedia.org/wiki/File:Buzz_Aldrin_and_the_U.S._flag_on_the_Moon_-_GPN-2001-000012.jpg) | Public domain （PD-USGov-NASA） |

## 東南亞

| 卡片 | 圖 | Commons 檔案 | 授權（模板） |
|---|---|---|---|
| building-angkor-wat | 吳哥窟中央塔群 | [20171126 Angkor Wat 4712 DxO.jpg](https://commons.wikimedia.org/wiki/File:20171126_Angkor_Wat_4712_DxO.jpg) | CC BY-SA 4.0  |
| building-my-son | 美山聖地遺址 | [My Son Sanctuary Vietnam 04.jpg](https://commons.wikimedia.org/wiki/File:My_Son_Sanctuary_Vietnam_04.jpg) | CC BY 4.0  |
| war-cham-khmer-1177 | 巴戎寺浮雕：行軍中的高棉軍隊 | [Angkor Thom Bayon relief of the Battle of Tonlé Sap.jpg](https://commons.wikimedia.org/wiki/File:Angkor_Thom_Bayon_relief_of_the_Battle_of_Tonlé_Sap.jpg) | CC BY-SA 4.0  |
