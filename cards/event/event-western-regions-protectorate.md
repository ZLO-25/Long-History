---
id: event-western-regions-protectorate
type: event
name: 西域都護府（前60年）
aliases: [西域都護, 漢朝經營西域, 都護府, 鄭吉, 烏壘城, Protectorate of the Western Regions, Protector General of the Western Regions, 西域都护府]
civilization: [中國（西漢）, 中國（東漢）]
track: china
time:
  start: -60
  end: 107
  precision: disputed
  src: [s1, s2, s3]
summary_line: 大事｜商路｜烏壘（今新疆輪台）｜西域都護府（前60年）
place:
  primary_field: 商路
  secondary_fields: [宮廷／政治中心, 戰場]
  locations:
    - { name_ancient: 烏壘城, name_modern: 新疆輪台縣策大雅一帶（中國）, lat: 41.78, lng: 84.2, precision: schematic, role: 都護治所；座標為輪台縣東部示意點, src: [s2, s3] }
  scale: area
structure_tags: [邊疆防線, 快速擴張, 外部勢力介入]
topics: [絲綢與絲路, 游牧民族與邊疆, 對外擴張]
links: [event-zhang-qian-west, commodity-ferghana-horse, war-han-xiongnu, commodity-silk, event-buddhism-china]
causes:
  - { id: event-zhang-qian-west, rel: 促成, why: 張騫帶回西域各國的情報，漢朝開始派使節、駐兵屯田，一步步把勢力伸進塔里木盆地。, src: [event-zhang-qian-west:s1, s3] }
  - { id: commodity-ferghana-horse, rel: 背景, why: 遠征大宛後，塔里木盆地的綠洲城邦紛紛改投漢朝，為設立都護鋪路。, src: [commodity-ferghana-horse:s1, s3] }
  - { id: war-han-xiongnu, rel: 促成, why: 匈奴被漢軍長期打擊後內部分裂，管西域的日逐王投降漢朝，漢朝才能接管北道、設立都護。, src: [s1, s2] }
effects:
  - { id: commodity-silk, rel: 背景, why: 都護保護塔里木盆地的城邦與交通線，使者與商人往來較安全，絲路貿易因此更穩定。, src: [s3] }
counterparts:
  - { id: building-hadrians-wall, note: "相似：都是帝國在遙遠邊疆設立軍事據點、管理人群往來。不同：西域都護主要監督一群仍有自己國王的綠洲城邦、不向當地收稅；哈德良長城則是羅馬在行省邊緣築的固定防線。", src: [s3] }
sources:
  - { id: s1, title: "Protectorate of the Western Regions — Wikipedia", url: "https://en.wikipedia.org/wiki/Protectorate_of_the_Western_Regions", accessed: 2026-11-02, tier: 百科 }
  - { id: s2, title: "班固《漢書·西域傳上》（中國哲學書電子化計劃）", url: "https://ctext.org/han-shu/xi-yu-zhuan-shang", accessed: 2026-11-02, tier: 一手 }
  - { id: s3, title: "西域都護府 — 維基百科", url: "https://zh.wikipedia.org/wiki/西域都護府", accessed: 2026-11-02, tier: 百科 }
importance: 2
learn:
  histories: [中國史]
  why_care: 新疆塔里木盆地第一次被中原王朝的機構管到，就是從這裡開始；它也是絲路商人能比較安心走路的原因之一。
  story: |
    漢武帝時，張騫出使西域，漢朝開始往西派使節、在輪台、渠犁一帶屯田。[s3] 當時塔里木盆地的幾十個綠洲小國，原本受匈奴控制，匈奴派官員向它們收稅。[s2] 宣帝時，管理西域的匈奴日逐王背叛單于，帶著部眾投降漢朝，負責保護南道的鄭吉前去迎接。[s2] 朝廷乾脆讓鄭吉同時護衛北道，所以叫「都護」，治所設在烏壘城。[s2] 都護不向各國收稅，主要是保護城邦、監督外國、對抗匈奴。[s3] 不過這個機構隨著漢朝與匈奴的強弱忽廢忽設：王莽時西域斷絕，東漢班超在 91 年重新出任都護，107 年又因路途險遠、朝廷難以支援而撤銷。[s1][s3]
  key_terms:
    - { term: 都護, plain: 「全都保護」的意思，是漢朝在西域最高的軍政長官。, example: 像學校派到分校的總教官，同時管好幾個社團的安全。 }
    - { term: 屯田, plain: 軍隊或移民在邊疆種田，自己生產糧食，減少從遠方運糧。, example: 露營時在營地自己煮飯，不用每餐叫外送。 }
  primary_source:
    - { text: 乃因使吉並護北道，故號曰都護。都護之起，自吉置矣。, from: 班固《漢書·西域傳上》, src: s2 }
  historiography: |
    **設立年份是哪一年？** 《漢書·西域傳》記日逐王投降是在神爵三年（前 59 年）；不少現代著作則寫前 60 年，也有說法把這個職位推到前 64 年。[s1][s2][s3]
    **都護府是統治，還是保護？** 有說法強調都護府讓天山以南第一次進入中原政權的勢力範圍；但也有人指出，都護不向當地收稅，各城邦仍有自己的國王，和直接統治的郡縣不同。[s3] 學者也注意到都護的存廢和匈奴的強弱緊密相連，與其說是穩定的領土，不如說是漢匈競爭的前線。[s1][s3]
  misconceptions:
    - 「漢朝從此一直管著西域」：西域都護在王莽時中斷、東漢又多次廢置，前後並不連續。[s1][s3]
crosscheck:
  date: 2026-11-02
  by: 獨立查核 agent（未參與寫作）
  result: 通過
  notes: "核對 s1–s3（英中維基、《漢書·西域傳上》原文）：《漢書》作神爵三年（前59），中文維基作前60，英文維基兼列前64，保留為爭議。改正：匈奴僮僕都尉收稅改引《漢書》；107年罷都護原因改為「險遠難相應赴」（原寫「花費太大」無來源）；大宛之戰因果改引中文維基。"
verification: 爭議
lens_status: 無直接論述
summary_card: true
---

## C1 背景

漢武帝時張騫通西域後，漢朝在輪台、渠犁屯田，供應往來使者。[s3] 塔里木盆地的綠洲城邦原本由匈奴控制，匈奴設有僮僕都尉向它們收稅。[s2][s3]

## C2 經過

宣帝神爵年間，匈奴日逐王背叛單于、率眾降漢，鄭吉迎接有功，受命兼護南北兩道，號稱「都護」，治所烏壘城。[s2] 年份有前 60 年與前 59 年兩說。[s1][s2][s3] 王莽時西域與中原斷絕；東漢 74 年重設、隔年都護被殺；91 年班超出任都護；107 年因各國反叛、路途險遠難以支援而罷除，123 年班勇改設西域長史。[s1][s3]

## C4 制度或機制變化

都護是漢朝在西域最高的軍政職位，負責保護城邦、督察烏孫、康居等外國；和匈奴的做法不同，都護不向當地徵稅。[s3]

## C6 直接結果

匈奴失去對西域的控制，天山以南的城邦與交通線第一次置於中原政權的勢力範圍之下，使者與商旅往來的通道得到保障。[s1][s3]
