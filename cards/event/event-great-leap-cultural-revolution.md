---
id: event-great-leap-cultural-revolution
type: event
name: 大躍進與文化大革命（1958–1976年）
aliases: [大躍進, 大跃进, 文化大革命, 文革, 人民公社, 大饑荒, 三年大饑荒, 紅衛兵, 上山下鄉, 四人幫, 毛澤東去世, 毛澤東去世與鄧小平掌權, Great Leap Forward, Cultural Revolution, Great Chinese Famine, Red Guards, Gang of Four, people's communes]
civilization: [中華人民共和國]
track: china
time:
  start: 1958
  end: 1976
  precision: exact
  src: [s1, s2]
summary_line: 大事｜宮廷／政治中心｜北京與中國各地｜大躍進與文化大革命（1958–1976年）
place:
  primary_field: 宮廷／政治中心
  secondary_fields: [資源產地]
  locations:
    - { name_ancient: 北京, name_modern: 北京（中國）, lat: 39.9042, lng: 116.4074, precision: schematic, role: 中共中央所在地，兩場運動的發動地, src: [s1, s2] }
    - { name_ancient: 廬山, name_modern: 廬山（中國江西省）, lat: 29.5667, lng: 115.9833, precision: schematic, role: 1959 年廬山會議，彭德懷批評大躍進遭撤職, src: [s1] }
  scale: area
structure_tags: [宗教／意識形態動員, 強人繞過制度, 精英內鬥]
topics: [糧食與農業, 言論與思想管制]
links: [event-reform-and-opening, event-sino-soviet-split, event-prc-founding, event-nixon-china]
causes:
  - { id: event-prc-founding, rel: 背景, why: 中共建政後推行農業集體化，到 1958 年禁止私人耕作、把農戶編進人民公社，大躍進才有辦法全面動員。, src: [s1] }
effects:
  - { id: event-reform-and-opening, rel: 促成, why: 文革的動亂打亂生產、學校停課；1976 年毛澤東去世、四人幫被捕後，鄧小平在 1978 年底主導轉向改革開放。, src: [s2, event-reform-and-opening:s1] }
  - { id: event-sino-soviet-split, rel: 促成, why: 有學者認為毛澤東因大躍進失敗擔心權威動搖，對蘇聯更強硬，加深中蘇裂痕。, src: [event-sino-soviet-split:s1], disputed: true }
counterparts: 無適當對照：西方軌目前沒有「領導人以群眾運動推動激進經濟計畫並造成大饑荒」的卡片，不硬湊。
sources:
  - { id: s1, title: "Great Leap Forward — Wikipedia", url: "https://en.wikipedia.org/wiki/Great_Leap_Forward", accessed: 2026-11-02, tier: 百科 }
  - { id: s2, title: "Cultural Revolution — Wikipedia", url: "https://en.wikipedia.org/wiki/Cultural_Revolution", accessed: 2026-11-02, tier: 百科 }
  - { id: s3, title: "中共十一屆六中全會，Resolution on Certain Questions in the History of Our Party Since the Founding of the People's Republic of China（〈關於建國以來黨的若干歷史問題的決議〉，1981-06-27，英譯本）— Marxists Internet Archive", url: "https://www.marxists.org/subject/china/documents/cpc/history/01.htm", accessed: 2026-11-02, tier: 一手 }
importance: 3
summary_card: true
learn:
  histories: [中國史, 世界通史]
  why_care: 這兩場運動造成千萬人死於饑荒、無數人受迫害；中國後來的改革開放，就是在這些傷痕上起步的。
  story: |
    1958 年，毛澤東發動「大躍進」，想讓中國快速趕上工業國。[s1] 農民被編進人民公社，許多人被調去用土高爐煉鋼，1958 年雖然達到 1,070 萬噸目標，卻有超過 300 萬噸不能用。[s1] 官員為了達標虛報收成，政府照虛報的數字徵糧，農民連口糧都被拿走，造成大饑荒，學者估計死亡人數從 1,500 萬到 5,500 萬不等。[s1] 1959 年彭德懷在廬山會議批評，被撤職。[s1] 1966 年毛澤東又發動「文化大革命」，紅衛兵批鬥老師與幹部，國家主席劉少奇被囚禁，1969 年因得不到治療而死；學校停課、大學停止招考，超過一千萬城市青年被送到農村。[s2] 1976 年 9 月毛澤東去世，10 月「四人幫」被捕；1981 年中共決議承認文革造成建國以來最嚴重的挫折。[s2][s3]
  key_terms:
    - { term: 人民公社, plain: 大躍進時把好幾個村子合併，土地、勞力和吃飯都由公社統一管理。, example: 全村不再各自煮飯，大家到公共食堂吃大鍋飯。 }
    - { term: 浮誇風, plain: 官員為了表現，把產量灌水往上報。, example: 小組報告把只做一半的進度寫成「已完成」，結果下一步全部出錯。 }
    - { term: 紅衛兵, plain: 文革初期響應毛澤東號召、四處批鬥他人的學生組織。, example: 學生不上課，跑去揪鬥老師、砸寺廟。 }
  primary_source:
    - { text: "responsible for the most severe setback and the heaviest losses suffered by the Party, the state and the people（使黨、國家和人民遭到建國以來最嚴重的挫折和損失）", from: 中共〈關於建國以來黨的若干歷史問題的決議〉，1981 年 6 月 27 日（英文引自官方英譯本；中文為決議原文用語，查核者未逐字對照中文原件）, src: s3 }
  historiography: |
    **大饑荒是天災還是人禍？** 楊繼繩等學者認為主因是政策：徵糧過多、糧食出口、勞力被調去煉鋼，當時天氣並不特別異常；也有學者給天災較大的比重，爭論並未完全結束。[s1]
    **死了多少人？** 大饑荒的估計從 1,500 萬到 5,500 萬，楊繼繩估計約 3,600 萬，馮客（Dikötter）估計至少 4,500 萬。[s1] 文革死亡人數的估計從數十萬到數百萬，常被引用的 2,000 萬已被學者否定；國家保密讓統計更困難。[s2]
    **官方怎麼評價？** 1981 年中共的決議把文革定為重大挫折，對大躍進則稱為「左」的錯誤，但仍肯定毛澤東整體的歷史地位。[s3]
  misconceptions:
    - 大躍進和文革不是同一件事：大躍進是 1958–1962 年的經濟運動，文革是 1966–1976 年的政治運動，中間隔了幾年調整期。[s1][s2]
    - 文革並沒有在 1969 年就結束：官方說法和多數研究都以 1976 年毛澤東去世、四人幫被捕為終點。[s2][s3]
crosscheck:
  date: 2026-11-02
  by: 獨立查核 agent（未參與寫作）
  result: 通過
  notes: "核對 s1–s3：1,070 萬噸與 300 萬噸、饑荒 1,500–5,500 萬及楊繼繩／馮客估計、廬山會議、七千人大會、五一六通知、劉少奇 1969、四人幫 10 月 6 日、超過千萬知青、2,000 萬說法被否定、1981 決議英文引文與「左」的錯誤均相符。劉少奇死因改依 s2；改革開放因果改寫為 s2 支持的機制。中文引文未對照中文原件；中蘇交惡因果仍 disputed（s1 中楊繼繩認為交惡與饑荒無關）。"
verification: 交叉確認
lens_status: 無直接論述
---

## C1 背景

中共建政後推行計畫經濟與農業集體化；到 1958 年私人耕作被禁止，農戶被編入國營的人民公社。[s1]

## C2 經過

- **1958–1962 年 大躍進**：全民煉鋼、虛報產量、照虛報數字徵糧，引發大饑荒。[s1] 1959 年廬山會議，彭德懷批評政策遭撤職，隨後展開反右傾運動。[s1] 1962 年七千人大會後，毛澤東把日常工作交給劉少奇、鄧小平等人。[s1]
- **1966–1976 年 文化大革命**：1966 年 5 月 16 日政治局發出〈五一六通知〉；紅衛兵興起，1967 年造反派奪權、派系武鬥，後由軍隊恢復秩序。[s2] 1969 年劉少奇死於囚禁中；1971 年林彪墜機身亡。[s2]
- **1976–1978 年**：9 月 9 日毛澤東去世，10 月 6 日四人幫被捕；華國鋒接班，1978 年 12 月三中全會後鄧小平主導改革開放。[s2]

## C4 制度或機制變化

毛澤東以群眾運動繞過黨和政府的正常程序，國家主席、地方政府都可以被「奪權」；學校停課、高考取消。[s2]

## C6 直接結果

大躍進引發數千萬人死亡的饑荒；文革期間數千萬人受迫害，大量古蹟、寺廟與文物被破壞，上千萬城市青年被下放農村。[s1][s2]

## C7 長期影響

毛澤東死後，新領導層以 1981 年決議否定文革，並在 1978 年底轉向改革開放。[s2][s3]
