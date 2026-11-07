---
id: event-satsuma-ryukyu
type: event
name: 薩摩入侵琉球：夾在中國與日本之間的王國（1609–1611）
aliases: [薩摩入侵琉球, 琉球侵攻, 琉球入侵, 島津入侵琉球, 琉球征伐, 慶長琉球之役, 掟十五條, 尚寧王, Invasion of Ryukyu, Satsuma invasion of Ryukyu, Shimazu invasion of Ryukyu, Shō Nei]
civilization: [日本（江戶）, 中國（明）]
track: east
time:
  start: 1609
  end: 1611
  precision: exact
  src: [s1, s2]
summary_line: 大事｜港口／海峽｜琉球首里、薩摩｜薩摩入侵琉球：夾在中國與日本之間的王國（1609–1611）
place:
  primary_field: 港口／海峽
  secondary_fields: [宮廷／政治中心, 商路]
  locations:
    - { name_ancient: 山川港（薩摩）, name_modern: "指宿市山川（日本鹿兒島縣）", lat: 31.2040, lng: 130.6360, precision: schematic, role: "1609 年舊曆 2 月底薩摩軍在此集結，3 月 4 日出港（座標為示意）", src: [s1] }
    - { name_ancient: 首里城, name_modern: "那霸市首里（日本沖繩縣）", lat: 26.2170, lng: 127.7195, precision: exact, role: "琉球王府所在；尚寧王 1609 年舊曆 4 月出城投降", src: [s1, s2] }
    - { name_ancient: 駿府城, name_modern: "靜岡市葵區（日本靜岡縣）", lat: 34.9756, lng: 138.3828, precision: exact, role: "1610 年尚寧王在此謁見大御所家康", src: [s1, s2] }
    - { name_ancient: 江戶城, name_modern: "東京都千代田區（日本）", lat: 35.6852, lng: 139.7528, precision: exact, role: "1610 年尚寧王在此謁見將軍秀忠", src: [s1, s2] }
    - { name_ancient: 鹿兒島（薩摩）, name_modern: "鹿兒島市（日本鹿兒島縣）", lat: 31.5966, lng: 130.5571, precision: exact, role: "尚寧王被帶到此向島津氏立誓；琉球貿易由此監督", src: [s2, s4] }
  scale: area
structure_tags: [外部勢力介入, 霸權挑戰, 制度包裝延續, 商路改道]
topics: [對外擴張, 海上貿易, 開港與鎖國, 諸侯爭霸]
links: [event-sakoku, event-toyotomi-unification, war-imjin, person-shimazu-yoshihiro, person-tokugawa-ieyasu, event-takasago-koku-arima, event-mudan-incident, event-wokou-ningbo]
causes:
  - { id: war-imjin, rel: 背景, why: 1591 年秀吉為出兵朝鮮要求琉球分擔軍役，後改為供應兵糧，琉球只交了一半，讓薩摩有了「琉球不盡責」的口實。, src: [s1, s3] }
  - { id: event-toyotomi-unification, rel: 背景, why: 秀吉統一期間與島津氏一起向琉球要求各種援助與服役；德川政權成立後，島津家獲得家康與秀忠的許可出兵。, src: [s1, s3] }
effects:
  - { id: event-sakoku, rel: 背景, why: 薩摩對琉球的管轄後來成為鎖國時代「四口」之一的薩摩口，薩摩因此握有一條不經長崎的對中國貿易管道。, src: [event-sakoku:s1, s1, s3] }
  - { id: event-takasago-koku-arima, rel: 背景, why: 1616 年村山等安出兵臺灣的消息，是尚寧王派通譯通報明朝的；出兵船隊的一部分也曾在琉球整修。, src: [s6] }
  - { id: event-mudan-incident, rel: 背景, why: 琉球同時隸屬中日的曖昧地位，在 1871 年宮古島船難後成為日本出兵臺灣、1879 年廢琉球藩設沖繩縣的背景。, src: [s7] }
counterparts: 無適當對照：西方軌目前沒有「小王國同時向兩個大鄰居稱臣、其中一方刻意向另一方隱瞞」的 17 世紀卡片，不硬湊。
sources:
  - { id: s1, title: "琉球侵攻 — Wikipedia（日文）", url: "https://ja.wikipedia.org/wiki/琉球侵攻", accessed: 2026-11-04, tier: 百科 }
  - { id: s2, title: "Shō Nei — Wikipedia（英文）", url: "https://en.wikipedia.org/wiki/Shō_Nei", accessed: 2026-11-04, tier: 百科 }
  - { id: s3, title: "Invasion of Ryukyu — Wikipedia（英文）", url: "https://en.wikipedia.org/wiki/Invasion_of_Ryukyu", accessed: 2026-11-04, tier: 百科 }
  - { id: s4, title: "Andreas Quast, 140 Years Ago: The “Law of Fifteen Injunctions” and the Written Oath First Published in Western Sources（掟十五條與起請文英譯，1879 年《Japan Daily Herald》首刊）", url: "https://ryukyu-bugei.com/?p=7999", accessed: 2026-11-04, tier: 一手 }
  - { id: s5, title: "Gregory Smits, Visions of Ryukyu: Identity and Ideology in Early-Modern Thought and Politics（University of Hawai‘i Press, 1999；出版社書頁）", url: "https://uhpress.hawaii.edu/title/visions-of-ryukyu-identity-and-ideology-in-early-modern-thought-and-politics/", accessed: 2026-11-04, tier: 學術 }
  - { id: s6, title: "1616 Japanese expedition to Taiwan — Wikipedia（英文）", url: "https://en.wikipedia.org/wiki/1616_Japanese_expedition_to_Taiwan", accessed: 2026-11-04, tier: 百科 }
  - { id: s7, title: "牡丹社事件 — 維基百科（中文）", url: "https://zh.wikipedia.org/wiki/%E7%89%A1%E4%B8%B9%E7%A4%BE%E4%BA%8B%E4%BB%B6", accessed: 2026-10-26, tier: 百科 }
importance: 2
learn:
  histories: [日本史, 中國史]
  why_care: 琉球王國 1609 年被薩摩打敗以後，一邊繼續向中國朝貢，一邊聽命於日本的薩摩；這種「兩邊都要應付」的局面，一直拖到 1870 年代，和臺灣的牡丹社事件接在一起。
  story: |
    1609 年春天，薩摩藩（今鹿兒島）的島津家久派出約 3,000 人、80 多艘船，從山川港出海，目標是琉球王國。[s1] 起因是琉球沒有照薩摩的要求派使者來道謝，也不聽貿易管制；日文維基寫這次出兵事先得到家康與秀忠的許可。[s1] 舊曆 4 月薩摩軍逼近首里城，國王尚寧出城投降，後來被帶到駿府見家康、到江戶見秀忠，1611 年立下誓約後才回到首里。[s1][s2] 琉球仍然是王國，仍向中國朝貢，卻被迫承認「自古是薩摩的附庸」，對外貿易也要經薩摩許可。[s2][s3][s4] 從此琉球夾在中國和日本之間，用學者的話說，是「臣屬於兩個大鄰居，卻不是任何一方的一部分」。[s5]
  key_terms:
    - { term: 朝貢（冊封）, plain: 小國的國王向中國皇帝送禮、接受皇帝封為國王，換來名義上的保護和貿易機會；琉球從 1372 年起就向明朝朝貢。, example: 像小公司向大企業進貢，換取掛名「合作夥伴」的資格和生意機會。 }
    - { term: 薩摩藩, plain: 江戶時代統治今鹿兒島縣一帶的大名領地，領主是島津氏。, example: 像一個擁有自己軍隊和稅收的「地方諸侯」，只名義上聽幕府。 }
    - { term: 掟十五條, plain: 1611 年薩摩對琉球訂的十五條規矩，限制琉球對外貿易，要經薩摩的許可。, example: 像總公司規定分公司的所有對外生意都要蓋總公司的章。 }
  primary_source:
    - { text: "No goods other than those authorized by Satsuma shall be taken to China.（除薩摩許可的貨物外，不得運往中國。）", from: "〈掟十五條〉第 1 條（1611 年 10 月 24 日）；英譯 1879 年首次刊於《Japan Daily Herald》，經 Andreas Quast 整理轉載，中譯為本站摘譯。", src: s4 }
  historiography: |
    **為什麼出兵？** 日文維基的敘述從秀吉時代的軍役與兵糧談起：1591 年秀吉要求琉球分擔朝鮮出兵的軍役，後改為供應兵糧，琉球只交了一半；1602 年琉球漂流民被家康下令送回後，薩摩多次要求琉球派謝恩使道謝，琉球都沒派；1608 年薩摩再派僧人龍雲要求尚寧向家康朝聘，三司官謝名利山不聽並辱罵使者；琉球也一直不理會薩摩的貿易管制要求。[s1] 英文維基則強調這是幕府許可下的「懲罰性」行動，並提到出兵理由之一是琉球沒有為家康送還漂流船員一事道謝。[s3] 日文維基沒有給出薩摩從琉球貿易得到的具體金額，所以「為了搶貿易利益」只是合理推測，不是被量化證明的結論。[s1]
    **「自古是薩摩的附庸」是真的嗎？** 1611 年的誓文要尚寧和三司官承認琉球長期是薩摩的附庸，英文維基稱這是不實的說法，是出兵後才強加的。[s2][s4]
    **到底算屬於誰？** 薩摩對中國隱瞞對琉球的控制，以便透過琉球繼續和明、清往來，因為中國當時拒絕與日本正式往來。[s3] Smits 的書因此把琉球形容為「臣屬於中國與日本兩個大鄰居，卻不是任何一方的一部分」。[s5]
  misconceptions:
    - 「島津義弘率軍征服琉球」→ 日文維基寫大將是樺山久高、副將平田增宗，島津家久在山川港閱兵；義弘的角色見 person-shimazu-yoshihiro 卡。[s1]
    - 「琉球從 1609 年起就成了日本的一部分」→ 琉球王國保有國王與王府，侵攻後仍向清朝朝貢，直到 1879 年才被日本廢除。[s1][s2][s7]
  perspectives:
    - { history: 日本史, text: 從日本看，薩摩藉由琉球取得一條對中國的間接貿易管道，這個「薩摩口」是後來鎖國四口之一（見 event-sakoku 卡）。 }
    - { history: 中國史, text: 從中國看，琉球是自 1372 年起就朝貢的藩屬；薩摩刻意向中國隱瞞自己對琉球的控制，讓冊封與朝貢照常進行。 }
verification: 交叉確認
lens_status: 無直接論述
crosscheck: { date: 2026-11-07, by: 獨立查核 agent（第 3 期，未參與寫作）, result: 通過, notes: "開 s1–s7 逐句核對。1) 3,000 人 80 餘艘、樺山久高／平田增宗、山川集結至啟程鹿兒島各日期、8/28 江戶見秀忠、謝名利山拒簽斬首、與論島以北直轄、1613 代官所、續向清朝貢均與 s1 相符；1611 返首里、1616 收回日本化、附庸說為不實均與 s2 相符。2) 1608 龍雲是要求向家康「朝聘」，謝恩使是 1602 漂流民送還後的要求，已分開改寫；1591 是軍役改兵糧、兵糧交一半，已改。3) 秀吉「賦予薩摩管理琉球」s3 未載，改為與島津一起要求援助。4) 中國視角「最忠實藩屬、明朝未派兵」無來源，已改。5) 掟十五條第 1/6/13 條與 1611-10-24 對照 s4 逐字相符；1616 通譯蔡廛通報明朝、七艘在琉球整修見 s6；s7 為廢琉球藩，已改；Smits 引語見 s5 出版社書頁。"}
---

## C1 背景

琉球王國自 1372 年起向明朝朝貢，是東亞海上貿易的中繼站；明朝則拒絕與日本正式往來。[s3] 1591 年秀吉為出兵朝鮮向琉球要求分擔軍役，後改為供應兵糧，琉球只交了一半，讓薩摩有了責難的口實。[s1] 德川政權成立後，薩摩（島津氏）和琉球之間因貿易管制與謝恩使的問題，關係越來越僵。[s1]

## C2 經過

1602 年漂到日本的琉球船員被家康下令送回後，薩摩多次要求琉球派謝恩使向家康道謝，琉球都沒有派；1608 年 9 月，島津家久再派僧人龍雲要求尚寧王向家康朝聘，三司官謝名利山不聽，還辱罵龍雲。[s1] 1609 年（慶長 14 年，舊曆）2 月 26 日，薩摩軍約 3,000 人、80 餘艘船在山川港集結，大將樺山久高、副將平田增宗，3 月 4 日出港，3 月 7 日到奄美大島，3 月 25 日到沖繩本島北部的運天港；4 月 1 日逼近首里，4 月 4 日尚寧王出城，5 月 15 日尚寧王被帶著啟程前往鹿兒島。[s1] 1610 年尚寧在駿府謁見家康、8 月 28 日在江戶謁見秀忠；1611 年他與三司官簽下起請文，拒簽的謝名利山被斬首，同年尚寧回到首里。[s1][s2] 薩摩在 1611 年訂下掟十五條，第 1 條禁止運薩摩許可以外的貨物到中國，第 6 條要求商人需有薩摩封印的許可才能進出琉球貿易，第 13 條禁止琉球商船前往外國。[s4]

## C3 關鍵人物與群體

琉球國王尚寧、三司官謝名利山；薩摩藩主島津家久（忠恒）、大將樺山久高；幕府的家康與秀忠。[s1][s2] 被捲入的還有琉球的百姓、奄美群島的居民，以及依賴琉球轉口貿易的中國、朝鮮、東南亞商人。[s1][s3]

## C4 制度或機制變化

琉球保留國王與王府，但外交與貿易受薩摩監督：掟十五條限制對外貿易，國王只能在薩摩訂下的框架內施政。[s3][s4] 奄美群島（到與論島）劃歸薩摩直轄，1613 年設代官所，名義上仍屬琉球。[s1] 琉球侵攻後仍向清朝朝貢，薩摩則掌握對清朝貢貿易的實權。[s1]

## C5 受益者與受損者

**受益**：薩摩藩取得琉球貿易的監督權；薩摩得以透過琉球保有一條對中國的間接貿易管道。[s1][s3]
**受損**：琉球王府失去外交與貿易的自主，奄美群島居民被劃入薩摩直轄；拒簽誓約的謝名利山被處死。[s1][s2]

## C6 直接結果

尚寧王 1611 年回國；到 1616 年，薩摩收回部分「日本化」措施，尚寧重新取得名義上的首位。[s2] 琉球一方面繼續與明、清維持冊封朝貢，一方面向薩摩納貢、接受監督，這種局面維持兩百多年。[s1][s2][s5]

## C7 長期影響

1616 年村山等安出兵臺灣時，尚寧王事先派通譯通報明朝，出兵船隊中的七艘後來也在琉球整修（見 event-takasago-koku-arima 卡）。[s6] 薩摩對琉球的管轄成為江戶「鎖國」時代四口之一，薩摩因此握有一條不經長崎的對中國貿易管道（見 event-sakoku 卡）。[s1][s3] 1871 年琉球宮古島船難後，日本以此為由出兵臺灣，1879 年廢琉球藩、設沖繩縣，琉球王國至此結束（見 event-mudan-incident 卡）。[s7]

## C8 雙軌解讀

### 李彔

無直接論述：查不到李彔公開講稿談薩摩入侵琉球。

### 哈拉瑞

無直接論述：查不到哈拉瑞公開摘要談薩摩入侵琉球。

## C9 今日對照鉤子

「小國同時要向兩個大鄰居交代，而且其中一方刻意不讓另一方知道實情」的結構；以及「名義上的主權和實際上的控制可以分開」。[s3][s5]

## C10 不可類比的差異

琉球與薩摩、中國的關係是 17 世紀的朝貢與藩屬體系，不是今天主權國家之間的條約關係，也不能直接拿來類比今天的任何領土或主權爭議；這張卡只描述當時的做法，不討論今天的歸屬。[s5]
