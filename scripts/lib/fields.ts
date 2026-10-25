// 欄位規格：對應 docs/card-fields.md。改規格時兩邊一起改。
export type CardType = 'war' | 'commodity' | 'event' | 'building' | 'tech' | 'finance';
export type Level = 'core' | 'deep' | 'optional';

export interface SectionDef {
  code: string; // A1、B3…
  title: string;
  level: Level;
  role?: 'lens' | 'today_hook' | 'non_analogous';
}

export const TYPE_LABEL: Record<CardType, string> = {
  war: '戰爭',
  commodity: '物資',
  event: '大事',
  building: '建築',
  tech: '技術',
  finance: '金融',
};

export const TYPE_PREFIX: Record<CardType, string> = { war: 'A', commodity: 'B', event: 'C', building: 'D', tech: 'T', finance: 'F' };

export const FIELD_OPTIONS = [
  '戰場', '宮廷／政治中心', '港口／海峽', '商路', '資源產地', '城市／都會',
  '思想場域', '金融中心', '工業／製造區', '其他',
] as const;

export const VERIFICATION = ['AI草稿', '交叉確認', '爭議'] as const;
export const LENS_STATUS = ['依公開資料推論，未對照原書', '無直接論述'] as const;
export const TIME_PRECISION = ['exact', 'approx', 'disputed'] as const;
export const LOC_PRECISION = ['exact', 'schematic', 'disputed', 'unknown'] as const;
export const SCALES = ['point', 'line', 'area'] as const;
export const TRACKS = ['china', 'west', 'other'] as const;

// 「查不到」的標準寫法：段落以這些詞開頭時，可以沒有來源代號
export const UNKNOWN_MARKERS = ['未知', '估計', '示意', '來源不足', '無直接論述', '無適當對照'];

export const SECTIONS: Record<CardType, SectionDef[]> = {
  war: [
    { code: 'A1', title: '交戰方與聯盟結構', level: 'deep' },
    { code: 'A2', title: '起因：結構與導火線', level: 'deep' },
    { code: 'A3', title: '戰場與地理咽喉', level: 'deep' },
    { code: 'A4', title: '兵力與軍事技術', level: 'optional' },
    { code: 'A5', title: '後勤與補給', level: 'deep' },
    { code: 'A6', title: '財政與資源', level: 'deep' },
    { code: 'A7', title: '關鍵轉折', level: 'optional' },
    { code: 'A8', title: '結果', level: 'deep' },
    { code: 'A9', title: '長期影響', level: 'deep' },
    { code: 'A10', title: '雙軌解讀', level: 'deep', role: 'lens' },
    { code: 'A11', title: '今日對照鉤子', level: 'deep', role: 'today_hook' },
    { code: 'A12', title: '不可類比的差異', level: 'deep', role: 'non_analogous' },
  ],
  commodity: [
    { code: 'B1', title: '物資與用途', level: 'deep' },
    { code: 'B2', title: '產地與控制權', level: 'deep' },
    { code: 'B3', title: '生產技術與勞動', level: 'deep' },
    { code: 'B4', title: '運輸路線與咽喉', level: 'deep' },
    { code: 'B5', title: '規模與數量', level: 'optional' },
    { code: 'B6', title: '經濟與財政角色', level: 'deep' },
    { code: 'B7', title: '權力與政治連結', level: 'deep' },
    { code: 'B8', title: '雙軌解讀', level: 'deep', role: 'lens' },
    { code: 'B9', title: '今日對照鉤子', level: 'deep', role: 'today_hook' },
    { code: 'B10', title: '不可類比的差異', level: 'deep', role: 'non_analogous' },
  ],
  event: [
    { code: 'C1', title: '背景', level: 'deep' },
    { code: 'C2', title: '經過', level: 'deep' },
    { code: 'C3', title: '關鍵人物與群體', level: 'optional' },
    { code: 'C4', title: '制度或機制變化', level: 'deep' },
    { code: 'C5', title: '受益者與受損者', level: 'optional' },
    { code: 'C6', title: '直接結果', level: 'deep' },
    { code: 'C7', title: '長期影響', level: 'deep' },
    { code: 'C8', title: '雙軌解讀', level: 'deep', role: 'lens' },
    { code: 'C9', title: '今日對照鉤子', level: 'deep', role: 'today_hook' },
    { code: 'C10', title: '不可類比的差異', level: 'deep', role: 'non_analogous' },
  ],
  building: [
    { code: 'D1', title: '功能與象徵', level: 'deep' },
    { code: 'D2', title: '建造者與資金', level: 'deep' },
    { code: 'D3', title: '技術與材料', level: 'deep' },
    { code: 'D4', title: '規模與數據', level: 'optional' },
    { code: 'D5', title: '維護與後世命運', level: 'deep' },
    { code: 'D6', title: '雙軌解讀', level: 'deep', role: 'lens' },
    { code: 'D7', title: '今日對照鉤子', level: 'deep', role: 'today_hook' },
    { code: 'D8', title: '不可類比的差異', level: 'deep', role: 'non_analogous' },
  ],
  // 第 5 期：技術卡（重大發明與大規模使用的技術），時間軸上另成「技術軌」
  tech: [
    { code: 'T1', title: '是什麼、解決什麼問題', level: 'deep' },
    { code: 'T2', title: '發明與起源', level: 'deep' },
    { code: 'T3', title: '傳播與普及', level: 'deep' },
    { code: 'T4', title: '規模與數據', level: 'optional' },
    { code: 'T5', title: '改變了什麼', level: 'deep' },
    { code: 'T6', title: '雙軌解讀', level: 'deep', role: 'lens' },
    { code: 'T7', title: '今日對照鉤子', level: 'deep', role: 'today_hook' },
    { code: 'T8', title: '不可類比的差異', level: 'deep', role: 'non_analogous' },
  ],
  // 第 5 期：金融卡（貨幣、銀行、交易所、金融危機與制度），時間軸上另成「金融軌」
  finance: [
    { code: 'F1', title: '是什麼、解決什麼問題', level: 'deep' },
    { code: 'F2', title: '起源與背景', level: 'deep' },
    { code: 'F3', title: '怎麼運作', level: 'deep' },
    { code: 'F4', title: '規模與數據', level: 'optional' },
    { code: 'F5', title: '改變了什麼', level: 'deep' },
    { code: 'F6', title: '雙軌解讀', level: 'deep', role: 'lens' },
    { code: 'F7', title: '今日對照鉤子', level: 'deep', role: 'today_hook' },
    { code: 'F8', title: '不可類比的差異', level: 'deep', role: 'non_analogous' },
  ],
};

// 核心欄位（frontmatter），用來算完整度
export const CORE_KEYS = [
  'id', 'type', 'name', 'aliases', 'civilization', 'track', 'time', 'summary_line',
  'place.primary_field', 'place.locations', 'place.scale', 'structure_tags', 'sources',
  'verification', 'lens_status',
] as const;
