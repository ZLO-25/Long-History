---
id: event-warlord-era
type: event
name: 北洋軍閥割據（1916–1928年）
aliases: [北洋軍閥, 軍閥割據, 北洋政府, 軍閥混戰, 北伐, 張作霖, 段祺瑞, 吳佩孚, 東北易幟, 直奉戰爭, Warlord Era, Beiyang government, 直皖戰爭, 皖系, 直系, 奉系, Beiyang warlords, Zhili clique, Fengtian clique, Anhui clique, 军阀割据]
civilization: [中華民國]
track: china
time:
  start: 1916
  end: 1928
  precision: exact
  src: [s1, s3]
summary_line: 大事｜宮廷／政治中心｜北京、奉天、廣州｜北洋軍閥割據（1916–1928年）
place:
  primary_field: 宮廷／政治中心
  secondary_fields: [戰場]
  locations:
    - { name_ancient: 北京, name_modern: 北京（中國）, lat: 39.90, lng: 116.40, precision: schematic, role: 北洋政府所在地，各派軍閥輪流控制, src: [s1] }
    - { name_ancient: 奉天, name_modern: 瀋陽（中國遼寧）, lat: 41.80, lng: 123.43, precision: schematic, role: 奉系張作霖的根據地，1928 年 12 月張學良在此宣布易幟, src: [s1, s3] }
    - { name_ancient: 廣州, name_modern: 廣州（中國廣東）, lat: 23.13, lng: 113.26, precision: schematic, role: 孫中山的南方政府與國民黨根據地（示意）, src: [s1] }
  scale: area
structure_tags: [合法性危機, 精英內鬥, 強人繞過制度, 雇傭兵與蠻族化軍隊, 貨幣貶值]
topics: [內戰, 稅收]
links: [event-xinhai-revolution, war-taiping, event-may-fourth, war-mukden-incident, war-chinese-civil-war]
causes:
  - { id: event-xinhai-revolution, rel: 背景, why: 革命結束帝制卻沒有建立穩定的民主，袁世凱稱帝失敗後在 1916 年病逝，各地軍事強人各據一方，中國陷入軍閥混戰。, src: [s1, event-xinhai-revolution:s1, event-xinhai-revolution:s2] }
  - { id: war-taiping, rel: 背景, why: 清廷為平定太平天國，讓地方自行募兵；有學者認為這些私人化的軍隊後來演變成軍閥部隊，也有學者懷疑兩者背景不同、不能直線相連。, src: [war-taiping:s1, s1], disputed: true }
effects:
  - { id: event-may-fourth, rel: 背景, why: 北京的北洋政府向日本靠攏，1918 年中日軍事協定曝光、巴黎和會又失利，學生把矛頭指向被認為親日的官員。, src: [event-may-fourth:s1] }
counterparts: 無適當對照：西方軌沒有「中央政府名義上存在、實際由各地軍事強人瓜分」並延續十多年的對應卡；拉丁美洲獨立後的考迪羅有點像，但背景是脫離殖民母國。
sources:
  - { id: s1, title: "Warlord Era — Wikipedia", url: "https://en.wikipedia.org/wiki/Warlord_Era", accessed: 2026-11-02, tier: 百科 }
  - { id: s2, title: "Edward A. McCord, Warlords against Warlordism: The Politics of Anti-Militarism in Early Twentieth-Century China, Modern Asian Studies 30(4), 1996, pp. 795–827（摘要）", url: "https://www.cambridge.org/core/journals/modern-asian-studies/article/warlords-against-warlordism-the-politics-of-antimilitarism-in-early-twentiethcentury-china/9D29DB88A62E12124BD3D420959E9CC8", accessed: 2026-11-02, tier: 學術 }
  - { id: s3, title: "東北易幟 — 維基百科（中文）", url: "https://zh.wikipedia.org/wiki/東北易幟", accessed: 2026-11-02, tier: 百科 }
importance: 2
learn:
  histories: [中國史]
  why_care: 民國成立後不到五年，國家就被一群各自帶兵的將軍瓜分；誰有槍，誰就能決定北京由誰執政。
  story: |
    1916 年 6 月，想當皇帝失敗的袁世凱病逝，他手下的北洋軍將領各自帶兵、占據地盤，形成皖系（段祺瑞）、直系（馮國璋、曹錕、吳佩孚）、奉系（張作霖）等派系。[s1] 1917 年張勳甚至短暫擁立清朝皇帝復辟。[s1] 北京的政府換來換去，背後是各派軍隊打來打去：1920 年直皖戰爭，1922、1924 年兩次直奉戰爭；1924 年馮玉祥倒戈占領北京。[s1] 軍閥靠重稅、鴉片、借款、搜刮和亂印鈔票養兵，張作霖在 1922–1928 年把田賦提高了 12%。[s1] 南方的孫中山先依靠地方軍閥，後來成立黃埔軍校建立自己的軍隊；1926 年蔣介石率國民革命軍北伐。[s1] 1928 年張作霖被日本人炸死，同年 12 月 29 日他的兒子張學良宣布東北易幟，國民政府宣告全國統一。[s1][s3]
  key_terms:
    - { term: 軍閥, plain: 擁有私人軍隊、控制一塊地盤，自己收稅、自己決定政策的軍事強人。, example: 社團沒有指導老師，誰的人馬多誰就當老大，社費也由他收。 }
    - { term: 北伐, plain: 1926–1928 年國民革命軍從廣州出發，北上打倒北洋軍閥的戰爭。, example: 南部的隊伍一路往北挑戰各地的地頭蛇。 }
    - { term: 東北易幟, plain: 1928 年 12 月張學良把東北的旗子換成國民政府的青天白日滿地紅旗，表示服從南京。, example: 一個分社把招牌換成總社的名字，宣布以後聽總社的。 }
  primary_source:
    - { text: "a country without a system; anarchy and treason prevail everywhere（一個沒有體制的國家，到處都是無政府與背叛）", from: 吳佩孚在馮玉祥倒戈占領北京後的感嘆（1924 年；轉引自英文維基百科「Warlord Era」條，中文為本站摘譯）, src: s1 }
  historiography: |
    **「軍閥」這個詞本身就是評價。** 「軍閥」一詞是陳獨秀在 1918 年 12 月從日文「軍閥」借來的，帶有譴責意味；維基整理的看法把軍閥割據看成權力從文官轉到軍人手中，而不只是「沒有政府」。[s1]
    **反軍閥成了民族主義的主題。** 麥科德（Edward McCord）指出，多數課本對這段內戰只是草草帶過；他研究的是「反軍閥主義」怎麼成為現代中國民族主義的一個決定性主題；文章標題〈反對軍閥主義的軍閥〉也點出其中的矛盾。[s2]
  misconceptions:
    - 軍閥時代不是完全沒有中央政府：北京一直有政府，各國承認的就是占有北京的那個政府，只是由不同派系的軍閥輪流控制。[s1]
    - 1928 年的統一並不穩固：東北易幟後張學良仍握有自己的軍隊與地盤，日本也曾橫加干涉、讓易幟一再拖延。[s3]
crosscheck:
  date: 2026-11-02
  by: 獨立查核 agent（未參與寫作）
  result: 通過
  notes: "核對英文維基軍閥時代條（袁死 6 月 6 日、各派系、張勳復辟、直皖與直奉戰爭、吳佩孚語、財源與田賦 12%、陳獨秀 1918 年借用「軍閥」一詞、北京政府的國際承認）、McCord 論文摘要、中文維基東北易幟、英文維基太平天國（Michael 說團練演變為軍閥私軍，Lary 存疑）。改：北伐「從廣州出發」s1 未寫，刪去；派系來源、士兵組成、國際承認改為 s1 原意；麥科德摘要只說課本「草草帶過」；「名義上統一」s3 未寫，改為張學良仍握實權、日本干涉；太平天國因果補本卡 s1，保留 disputed。吳佩孚語是英文維基轉引英譯，from 已註明，原中文出處未找到。"
verification: 交叉確認
lens_status: 無直接論述
summary_card: true
---

## C1 背景

辛亥革命後袁世凱掌握北洋軍；1916 年 6 月 6 日袁世凱去世，留下權力真空，由各地軍事強人填補。[s1] 這些派系來自北洋軍，也有其他地方勢力。[s1]

## C2 經過

1917 年張勳短暫擁清帝復辟，被段祺瑞的部隊擊敗。[s1] 1920 年直系與奉系聯手在直皖戰爭中打敗段祺瑞；1922、1924 年兩次直奉戰爭，1924 年馮玉祥倒戈、占領北京、囚禁曹錕。[s1] 1926–1928 年蔣介石率國民革命軍北伐。[s1] 1928 年張作霖被日本人炸死，12 月 29 日張學良改懸青天白日滿地紅旗、通電服從南京國民政府。[s1][s3]

## C6 直接結果

許多士兵本來就是土匪，其餘多是從鄉村徵來的，常常劫掠、施暴；軍閥靠重稅（包括釐金）、鴉片、借款、搜刮與印鈔養兵，造成通貨膨脹；農民組織自衛會社自保。[s1] 東北易幟後國民政府宣告全國統一，北洋政府時期結束。[s3]
