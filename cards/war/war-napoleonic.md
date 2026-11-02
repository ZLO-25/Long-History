---
id: war-napoleonic
type: war
name: 法國大革命戰爭與拿破崙戰爭（1792–1815年）
aliases: [拿破崙戰爭, 拿破仑战争, 法國革命戰爭, 反法同盟, 拿破崙稱帝, 拿破崙, 滑鐵盧, 特拉法加海戰, 奧斯特里茨戰役, 大陸封鎖, 拿破崙法典, Napoleonic Wars, French Revolutionary Wars, Coalition Wars, Napoleon Bonaparte, Waterloo]
civilization: [法國, 英國, 俄羅斯, 奧地利與哈布斯堡, 西班牙]
track: west
time:
  start: 1792
  end: 1815
  precision: exact
  src: [s1, s2]
summary_line: 戰爭｜戰場｜巴黎、奧斯特里茨、滑鐵盧｜法國大革命戰爭與拿破崙戰爭（1792–1815年）
place:
  primary_field: 戰場
  secondary_fields: [宮廷／政治中心, 港口／海峽]
  locations:
    - { name_ancient: 巴黎, name_modern: 巴黎（法國）, lat: 48.8566, lng: 2.3522, precision: schematic, role: 1792 年對奧宣戰、1799 年霧月政變、1804 年拿破崙稱帝, src: [s1, s2] }
    - { name_ancient: 奧斯特里茨, name_modern: 斯拉夫科夫（捷克）, lat: 49.15, lng: 16.87, precision: schematic, role: 1805 年 12 月 2 日拿破崙擊敗奧俄聯軍, src: [s1] }
    - { name_ancient: 滑鐵盧, name_modern: 滑鐵盧（比利時）, lat: 50.68, lng: 4.41, precision: schematic, role: 1815 年 6 月拿破崙最後戰敗, src: [s1] }
  scale: area
structure_tags: [霸權挑戰, 全面戰爭, 戰爭融資, 經濟施壓與制裁, 法律成文化]
topics: [對外擴張, 軍事同盟, 法律與憲法, 國債與公債]
links: [event-french-revolution, finance-london-rise, event-latin-american-independence, event-haitian-revolution, event-holy-roman-empire]
causes:
  - { id: event-french-revolution, rel: 直接引發, why: 革命後的法國在 1792 年對奧宣戰，戰爭不斷又讓軍人拿破崙在 1799 年政變掌權、1804 年稱帝。, src: [s1, s2, event-french-revolution:s1] }
effects:
  - { id: finance-london-rise, rel: 促成, why: 英法打了二十多年仗，英國靠借款、補助盟友與新開徵的所得稅撐住，國債與金融市場在戰爭中被迫擴大。, src: [s1, finance-london-rise:s2] }
  - { id: event-latin-american-independence, rel: 促成, why: 拿破崙 1808 年把西班牙國王換成自己的哥哥，西屬美洲失去合法的統治者，各地成立自治政府，最後走向獨立。, src: [s1, event-latin-american-independence:s1] }
counterparts: 無適當對照：中國軌沒有「一個革命政權把新法典隨軍隊推廣到整片大陸、引來七次多國聯盟圍攻」的戰爭。
sources:
  - { id: s1, title: "Napoleonic Wars — Wikipedia", url: "https://en.wikipedia.org/wiki/Napoleonic_Wars", accessed: 2026-11-02, tier: 百科 }
  - { id: s2, title: "French Revolutionary Wars — Wikipedia", url: "https://en.wikipedia.org/wiki/French_Revolutionary_Wars", accessed: 2026-11-02, tier: 百科 }
  - { id: s3, title: "Thierry Lentz, Le Code civil (21 mars 1804) : naissance, principes et postérité — Fondation Napoléon（napoleon.org）", url: "https://www.napoleon.org/enseignants/documents/le-code-civil-21-mars-1804-naissance-principes-et-posterite", accessed: 2026-11-02, tier: 學術 }
importance: 3
learn:
  histories: [歐洲史, 世界通史]
  why_care: 二十多年的戰爭讓一位將軍當上皇帝、橫掃歐洲，他留下的民法典到今天還影響許多國家的法律。
  story: |
    1792 年，剛推翻舊制度的法國對奧地利宣戰，歐洲各國組成「反法同盟」圍攻法國。[s2] 法國靠大規模徵兵撐住，1793 年下令徵召 30 萬人；原本沒沒無聞的將領拿破崙，1796 年率軍征戰義大利。[s2] 1799 年他發動「霧月政變」掌權，1804 年 12 月 2 日自己加冕為皇帝。[s1] 1805 年英國在特拉法加海戰打垮法西艦隊，拿破崙卻在奧斯特里茨陸戰大勝。[s1] 他打不過英國海軍，就用「大陸封鎖」禁止歐洲和英國做生意。[s1] 1812 年他帶約 45 萬人遠征俄羅斯，能作戰回來的大約只剩六分之一。[s1] 1814 年他退位被流放，隔年逃回巴黎，又在滑鐵盧徹底戰敗。[s1] 但 1804 年頒布的民法典留了下來。[s3]
  key_terms:
    - { term: 反法同盟, plain: 英國、奧地利、俄羅斯、普魯士等國為了對抗法國而一再組成的聯盟，前後共七次。, example: 班上幾個小團體平常不合，但為了打敗最強的那隊，暫時聯手。 }
    - { term: 大陸封鎖, plain: 1806 年拿破崙下令，被法國控制的歐洲地區不准和英國做生意。, example: 打不贏對方，就叫全班都不准跟他買東西。 }
    - { term: 拿破崙法典, plain: 1804 年頒布的《法國民法典》，共 2,281 條，規定法律之前人人平等、保障財產權。, example: 把原本各地不同的班規，統一成一本全校通用的校規。 }
  primary_source:
    - { text: "resterait une des vraies gloires de son règne（〔他的法典〕將是他統治中真正的榮耀之一）", from: 拿破崙在聖赫勒拿島流放時的回顧（轉引自 Thierry Lentz，Fondation Napoléon；中文為本站摘譯）, src: s3 }
  historiography: |
    **這場戰爭從哪一年算起？** 學者看法不一：有人從 1799 年霧月政變算，有人從 1803 年英國宣戰算，也有人從 1804 年拿破崙加冕算；英國史家常把 1792–1815 年合稱「法國大戰爭」。[s1]
    **拿破崙留下什麼？** 一種看法強調他把法律之前人人平等、世俗國家等原則寫成法典，影響許多地方的民法。[s1][s3] 另一種看法提醒這部法典的平等只是「權利平等」，不處理社會不平等，而且把已婚女性放在丈夫權威之下。[s3]
  misconceptions:
    - 拿破崙不是一路打勝仗：他打不過英國海軍，1812 年遠征俄羅斯的大軍幾乎全軍覆沒。[s1]
    - 拿破崙法典的「平等」不包括男女平等：已婚女性在法律上要服從丈夫。[s3]
crosscheck:
  date: 2026-11-02
  by: 獨立查核 agent（未參與寫作）
  result: 通過
  notes: "核對英文維基拿破崙戰爭、法國革命戰爭兩條（宣戰日、30 萬徵兵、45 萬人與六分之一、國債 6.79 億英鎊、起算年爭議）及 Lentz 法典一文（2,281 條、聖赫勒拿語、已婚女性受夫權）。改：拿破崙「在義大利打出名號」改為來源支持的寫法；刪去 s2 未寫的「革命政府想把戰爭打到國外」；啟蒙因果原寫隨軍推廣，Lentz 文未提，改為法典延續《人權宣言》精神並補啟蒙卡 s3；中西對照刪去有誤導之嫌的清朝敘述（乾隆末年仍有廓爾喀之役）。"
verification: 交叉確認
lens_status: 無直接論述
summary_card: true
---

## A2 起因：結構與導火線

**結構**：法國大革命推翻舊制度，歐洲君主國擔心革命擴散，考慮出兵干涉。[s2]

**導火線**：1792 年 4 月 20 日，法國立法議會投票對奧地利宣戰；1799 年 11 月 9 日（霧月 18 日）拿破崙政變掌權，1804 年 12 月 2 日加冕為皇帝，英國隨即組成第三次反法同盟。[s1][s2]

## A8 結果

1813 年萊比錫戰役後聯軍攻入法國，1814 年拿破崙退位、被流放到厄爾巴島；1815 年他重返法國約一百天，在滑鐵盧被第七次反法同盟擊敗，流放到聖赫勒拿島。[s1] 維也納會議重劃歐洲疆界，此後到 1853 年克里米亞戰爭前，大國之間沒有再爆發大戰。[s1] 雙方軍人死亡估計都在百萬以上，數字依來源不同。[s1]

## A9 長期影響

民法典影響許多地區的民法；民族主義與自由主義在歐洲擴散。[s1][s3] 拿破崙在西班牙的作為動搖了西屬美洲，葡萄牙王室逃到巴西，拉丁美洲獨立運動由此展開。[s1] 英國成為首要的海上與經濟強國；它的國債到 1814 年達 6.79 億英鎊，超過國內生產毛額的兩倍。[s1]
