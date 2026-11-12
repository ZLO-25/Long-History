# 古希臘專題（dive-ancient-greece）

規劃書：[dive-greece-rome-plan.md](dive-greece-rome-plan.md)。專題檔：`data/dives/ancient-greece.yaml`（validate 規定檔名＝id 去掉 `dive-`，所以不是 greece.yaml；勢力圖放 `data/dives/ancient-greece/power-bc431.yaml`，`power_maps` 的 file 寫 `ancient-greece/power-bc431.geojson`）。

## 底圖 code 對照表（`npm run basemap -- AEGEAN` → `data/ne/aegean.geojson`，233 KB，100 個區域）

勢力圖 yaml 寫 `basemap: aegean`。來源 Natural Earth 10m admin-1（希臘、土耳其）與 50m admin-0（其餘整國），公有領域；座標 2 位小數。

**希臘 14 區（GR-）**：Natural Earth 10m 的希臘只分到「大區」這一層，一區很大，要區分城邦請用 `lat_lt`／`lng_lt` 等切線。

| code | 名稱（Natural Earth） | 大致範圍（經度，緯度） | 古代對應 |
|---|---|---|---|
| GR-C | Dytiki Makedonia 西馬其頓 | 20.7–22.2E，39.8–40.9N | 上馬其頓、埃萊米亞 |
| GR-D | Ipeiros 伊庇魯斯 | 20.0–21.4E，39.0–40.3N | 伊庇魯斯 |
| GR-B | Kentriki Makedonia 中馬其頓 | 21.7–24.1E，39.9–41.4N | 馬其頓核心、卡爾基底基半島 |
| GR-A | Anatoliki Makedonia kai Thraki 東馬其頓與色雷斯 | 23.6–26.6E，40.4–41.8N | 色雷斯沿岸、薩索斯 |
| GR-69 | Ayion Oros 阿索斯山 | 24.0–24.4E，40.1–40.5N | 卡爾基底基半島東端 |
| GR-E | Thessalia 色薩利 | 21.1–24.1E，39.0–40.2N | 色薩利 |
| GR-H | Stereá Elláda 中希臘（含優卑亞島） | 21.4–24.7E，38.0–39.2N | 底比斯（彼奧提亞）、福基斯、優卑亞、埃托利亞東部 |
| GR-A1 | Attiki 阿提卡 | 22.9–24.1E，35.8–38.3N | 雅典（範圍含薩拉米斯、埃伊納、基西拉等島） |
| GR-J | Peloponnisos 伯羅奔尼撒 | 21.6–23.4E，36.4–38.2N | 斯巴達、科林斯、阿爾戈斯、阿卡迪亞（艾利斯在 GR-G） |
| GR-G | Dytiki Ellada 西希臘 | 20.7–22.4E，37.4–39.1N | 艾利斯（奧林匹亞）、亞該亞、埃托利亞、阿卡納尼亞 |
| GR-M | Kriti 克里特 | 23.5–26.3E，34.8–35.7N | 克里特 |
| GR-L | Notio Aigaio 南愛琴海 | 24.3–28.2E，35.4–38.0N | 基克拉澤斯群島（提洛）、多德卡尼斯（羅德島、科斯） |
| GR-K | Voreio Aigaio 北愛琴海 | 25.0–27.1E，37.5–40.0N | 萊斯博斯、希俄斯、薩摩斯（愛奧尼亞諸島） |
| GR-F | Ionioi Nisoi 愛奧尼亞群島 | 19.6–21.0E，37.6–39.8N | 科孚（科基拉）、萊夫卡斯、塞法洛尼亞 |

**整國（admin-0）**：AL 阿爾巴尼亞（伊利里亞南部）、MK 北馬其頓（派奧尼亞、上馬其頓北部）、BG 保加利亞（色雷斯北部）、CY 賽普勒斯共和國（南部）、CY-N 北賽普勒斯（北部；整座島＝CY＋CY-N）。

**土耳其 81 省（TR-＋兩位數省碼）**：全收。愛奧尼亞海岸與西部：TR-35 Izmir（以弗所附近、福凱亞）、TR-09 Aydin（米利都、邁安德河谷）、TR-48 Mugla（哈利卡那索斯、卡里亞）、TR-45 Manisa（薩第斯、呂底亞）、TR-10 Balikesir（特洛阿德、密西亞）、TR-17 Çanakkale（達達尼爾海峽、特洛伊）、TR-20 Denizli、TR-64 Usak、TR-43 Kütahya、TR-03 Afyonkarahisar（弗里吉亞）、TR-07 Antalya、TR-32 Isparta、TR-15 Burdur（潘菲利亞、皮西迪亞）、TR-16 Bursa、TR-11 Bilecik、TR-77 Yalova、TR-41 Kocaeli、TR-54 Sakarya、TR-34 Istanbul（拜占庭）、TR-59 Tekirdag、TR-39 Kirklareli、TR-22 Edirne（東色雷斯）。其餘為安納托利亞中東部：TR-06 Ankara、TR-26 Eskisehir、TR-42 Konya、TR-70 Karaman、TR-33 Mersin、TR-01 Adana、TR-31 Hatay、TR-51 Nigde、TR-50 Nevsehir、TR-38 Kayseri、TR-68 Aksaray、TR-71 Kinkkale、TR-40 Kirsehir、TR-66 Yozgat、TR-19 Çorum、TR-05 Amasya、TR-60 Tokat、TR-58 Sivas、TR-55 Samsun、TR-57 Sinop、TR-37 Kastamonu、TR-74 Bartın、TR-78 Karabük、TR-67 Zinguldak、TR-81 Düzce、TR-14 Bolu、TR-18 Çankiri、TR-52 Ordu、TR-28 Giresun、TR-61 Trabzon、TR-53 Rize、TR-08 Artvin、TR-29 Gümüshane、TR-69 Bayburt、TR-24 Erzincan、TR-25 Erzurum、TR-36 Kars、TR-75 Ardahan、TR-76 Iğdir、TR-04 Agri、TR-65 Van、TR-30 Hakkari、TR-73 Sirnak、TR-47 Mardin、TR-63 Sanliurfa、TR-79 Kilis、TR-27 Gaziantep、TR-80 Osmaniye、TR-46 K. Maras、TR-02 Adiyaman、TR-44 Malatya、TR-23 Elazig、TR-62 Tunceli、TR-12 Bingöl、TR-49 Mus、TR-13 Bitlis、TR-21 Diyarbakir、TR-72 Batman、TR-56 Siirt。

古代對應只是方便找區域的粗略說明，不是史料結論；寫勢力圖時每張圖的切線與理由補在下一節。

## 勢力圖切線與理由

（待補：前 431、前 338、前 323、前 275 四張圖寫好後，把用到的切線與理由寫在這裡。）

## 西元前年份的勢力圖檢查（2026-11-12）

見 [dives.md](dives.md) 第三節「西元前年份」。這次修了 `scripts/build-power.ts`（只認 `power-<數字>.yaml`，漏掉 `power-bc431.yaml`）與 `scripts/qa/dive.cjs`（用 `前431` 對年份膠囊、時間軸紅線、地圖圖例做比對）。
