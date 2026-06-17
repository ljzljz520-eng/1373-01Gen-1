import type { Floor, Exhibit } from '@/types/museum';

const baseUrl = 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image';

const imgPrompt = (subject: string) =>
  `${encodeURIComponent(subject)}, museum exhibit photography, soft lighting, neutral background, high detail, professional`;

const img = (prompt: string) =>
  `${baseUrl}?prompt=${imgPrompt(prompt)}&image_size=square_hd`;

export const allExhibits: Exhibit[] = [
  {
    id: 'ex-001',
    name: '青铜方鼎',
    era: '商代 约公元前1600年',
    zone: '青铜器馆区',
    background: '鼎为古代礼器之首，象征王权与等级制度。',
    description:
      '此鼎通高82厘米，重约50公斤。器身饰有饕餮纹，四足粗壮，是商代晚期青铜铸造工艺的代表作。鼎内壁铸有铭文37字，记载了商王祭祀之事。',
    imageUrl: img('ancient Chinese bronze ding vessel with taotie pattern'),
    hallId: 'hall-1-1',
    relatedExhibitIds: ['ex-002', 'ex-003', 'ex-004'],
  },
  {
    id: 'ex-002',
    name: '青铜爵',
    era: '西周 约公元前1046年',
    zone: '青铜器馆区',
    background: '爵为古代饮酒器，也是礼制的重要载体。',
    description:
      '此爵流尾长22厘米，三足鼎立。器形端庄，饰有云雷纹。据考证为西周贵族宴饮所用，是研究西周礼制的重要实物资料。',
    imageUrl: img('ancient Chinese bronze jue wine vessel'),
    hallId: 'hall-1-1',
    relatedExhibitIds: ['ex-001', 'ex-003', 'ex-005'],
  },
  {
    id: 'ex-003',
    name: '青铜编钟',
    era: '战国 约公元前475年',
    zone: '青铜器馆区',
    background: '编钟是古代大型乐器，象征礼乐文明。',
    description:
      '此套编钟共13件，大小依次递减。钟身饰有错金铭文，记载音律名称。经测试，每钟可发双音，音域达三个八度，是战国音乐史的重要发现。',
    imageUrl: img('ancient Chinese bronze bianzhong bells set'),
    hallId: 'hall-1-1',
    relatedExhibitIds: ['ex-001', 'ex-002', 'ex-006'],
  },
  {
    id: 'ex-004',
    name: '三彩骆驼俑',
    era: '唐代 公元618-907年',
    zone: '陶瓷馆区',
    background: '唐三彩是唐代陶瓷工艺的杰出代表。',
    description:
      '此俑通高78厘米，骆驼昂首挺立，背上载有乐舞俑。黄、绿、白三色釉彩交融，呈现出盛唐气象。反映了唐代丝绸之路的繁荣景象。',
    imageUrl: img('Tang dynasty sancai glazed camel figurine'),
    hallId: 'hall-1-2',
    relatedExhibitIds: ['ex-001', 'ex-005', 'ex-007'],
  },
  {
    id: 'ex-005',
    name: '青花瓷瓶',
    era: '明代 永乐年间',
    zone: '陶瓷馆区',
    background: '青花瓷是中国陶瓷最具代表性的品种。',
    description:
      '此瓶通高42厘米，通体绘缠枝莲纹，青花发色浓艳。底书"永乐年制"四字篆书款。釉色温润如玉，是明代官窑精品。',
    imageUrl: img('Ming dynasty blue and white porcelain vase'),
    hallId: 'hall-1-2',
    relatedExhibitIds: ['ex-002', 'ex-004', 'ex-008'],
  },
  {
    id: 'ex-006',
    name: '汝窑天青釉洗',
    era: '北宋 约公元1100年',
    zone: '陶瓷馆区',
    background: '汝窑为宋代五大名窑之首，存世极少。',
    description:
      '此洗口径13厘米，釉色如雨过天青，釉面开细冰裂纹。底有五个细小支钉痕，是典型的汝窑烧造工艺。目前存世汝窑器不足百件。',
    imageUrl: img('Northern Song Ru ware celadon brush washer'),
    hallId: 'hall-1-2',
    relatedExhibitIds: ['ex-003', 'ex-007', 'ex-009'],
  },
  {
    id: 'ex-007',
    name: '仕女图',
    era: '唐代 周昉',
    zone: '书画馆区',
    background: '唐代人物画达到了中国绘画史的高峰。',
    description:
      '此作为绢本设色，纵46厘米，横180厘米。描绘唐代贵族妇女的生活场景。人物丰肌秀骨，衣纹劲简，色彩柔丽，是周昉"周家样"的典型风格。',
    imageUrl: img('Tang dynasty Chinese court lady painting by Zhou Fang'),
    hallId: 'hall-2-1',
    relatedExhibitIds: ['ex-004', 'ex-008', 'ex-010'],
  },
  {
    id: 'ex-008',
    name: '富春山居图（残卷）',
    era: '元代 黄公望',
    zone: '书画馆区',
    background: '此画被誉为"画中之兰亭"，是中国山水画的巅峰之作。',
    description:
      '此卷为纸本水墨，纵33厘米，横636厘米。描绘富春江两岸的秀美景色。笔墨简远逸迈，意境深邃。此为《剩山图》卷，另一段藏于台北故宫。',
    imageUrl: img('Dwelling in Fuchun Mountains landscape by Huang Gongwang'),
    hallId: 'hall-2-1',
    relatedExhibitIds: ['ex-005', 'ex-007', 'ex-011'],
  },
  {
    id: 'ex-009',
    name: '兰亭序拓本',
    era: '唐代 冯承素摹本',
    zone: '书画馆区',
    background: '王羲之《兰亭序》被誉为"天下第一行书"。',
    description:
      '此为唐摹"神龙本"，因卷首有唐中宗"神龙"年号小印得名。摹写精妙，用笔、墨色都表现出王羲之原作的神韵。是研究东晋书法的重要资料。',
    imageUrl: img('Preface to Lanting Pavilion calligraphy by Wang Xizhi'),
    hallId: 'hall-2-1',
    relatedExhibitIds: ['ex-006', 'ex-010', 'ex-012'],
  },
  {
    id: 'ex-010',
    name: '金缕玉衣',
    era: '西汉 约公元前200年',
    zone: '玉器馆区',
    background: '金缕玉衣是汉代皇帝和高级贵族的殓服。',
    description:
      '此衣长180厘米，由2498块玉片组成，用金丝编缀而成。玉片打磨精致，金丝重量约1100克。是目前发现的保存最完整的金缕玉衣之一。',
    imageUrl: img('Western Han dynasty jade burial suit with gold thread'),
    hallId: 'hall-2-2',
    relatedExhibitIds: ['ex-007', 'ex-011', 'ex-013'],
  },
  {
    id: 'ex-011',
    name: '白玉双龙佩',
    era: '战国 约公元前300年',
    zone: '玉器馆区',
    background: '玉佩是古代贵族身份等级的象征。',
    description:
      '此佩长12厘米，白玉质地，温润细腻。透雕双龙相对，造型优美流畅。工艺精湛，是战国玉雕艺术的杰出代表。',
    imageUrl: img('Warring States period jade double dragon pendant'),
    hallId: 'hall-2-2',
    relatedExhibitIds: ['ex-008', 'ex-010', 'ex-014'],
  },
  {
    id: 'ex-012',
    name: '翠玉白菜',
    era: '清代 约公元1880年',
    zone: '玉器馆区',
    background: '此为慈禧太后的陪葬品，以翠玉巧雕而成。',
    description:
      '此品高18.7厘米，原为紫禁城永和宫的陈设品。翠玉自然的绿色被巧雕成菜叶，白色部分雕为菜帮。菜叶上还雕有螽斯和蝗虫，寓意多子多福。',
    imageUrl: img('Qing dynasty jadeite cabbage sculpture'),
    hallId: 'hall-2-2',
    relatedExhibitIds: ['ex-009', 'ex-011', 'ex-015'],
  },
  {
    id: 'ex-013',
    name: '素纱襌衣',
    era: '西汉 约公元前180年',
    zone: '纺织品馆区',
    background: '此衣代表了汉代丝织工艺的最高水平。',
    description:
      '此衣为马王堆汉墓出土，衣长128厘米，袖长190厘米，重量仅49克。轻薄如蝉翼，可见汉代缫丝、织造技术之高超。是研究汉代纺织史的重要实物。',
    imageUrl: img('Western Han dynasty plain silk gauze robe'),
    hallId: 'hall-3-1',
    relatedExhibitIds: ['ex-010', 'ex-014', 'ex-016'],
  },
  {
    id: 'ex-014',
    name: '缂丝佛像',
    era: '宋代 约公元1200年',
    zone: '纺织品馆区',
    background: '缂丝是中国传统丝织工艺中最精美的品种。',
    description:
      '此幅纵68厘米，横48厘米。以通经断纬的缂丝工艺织成，佛像面容慈祥，衣纹流畅。配色丰富自然，堪称宋代缂丝精品。',
    imageUrl: img('Song dynasty kesi silk tapestry Buddha image'),
    hallId: 'hall-3-1',
    relatedExhibitIds: ['ex-011', 'ex-013', 'ex-017'],
  },
  {
    id: 'ex-015',
    name: '明代皇帝龙袍',
    era: '明代 万历年间',
    zone: '纺织品馆区',
    background: '龙袍是古代皇帝的专用服饰，象征皇权至高无上。',
    description:
      '此袍身长135厘米，两袖通长234厘米。黄色缎地，织金妆彩。前胸后背及两肩饰正龙各一，行龙五，间饰十二章纹。织造工艺精湛，是明代宫廷服饰的典型代表。',
    imageUrl: img('Ming dynasty emperor dragon robe golden embroidery'),
    hallId: 'hall-3-1',
    relatedExhibitIds: ['ex-012', 'ex-016', 'ex-018'],
  },
  {
    id: 'ex-016',
    name: '漆耳杯',
    era: '战国 约公元前250年',
    zone: '漆器馆区',
    background: '中国漆器工艺源远流长，战国已达很高水平。',
    description:
      '此杯为木胎，内外髹黑漆，朱彩绘云气纹、鸟纹。杯呈椭圆形，两侧有耳。造型轻巧，纹饰流畅。出土时杯内尚存酒迹。',
    imageUrl: img('Warring States lacquered ear cup with red cloud pattern'),
    hallId: 'hall-3-2',
    relatedExhibitIds: ['ex-013', 'ex-015', 'ex-017'],
  },
  {
    id: 'ex-017',
    name: '雕漆插屏',
    era: '清代 乾隆年间',
    zone: '漆器馆区',
    background: '雕漆是在器物胎骨上髹漆数十层后再雕刻纹样。',
    description:
      '此屏高62厘米，木胎，髹红漆百余层。正面雕山水楼阁，层次丰富，刀法圆润。背面髹黑漆，有"大清乾隆年制"款。是清代雕漆的代表作。',
    imageUrl: img('Qing dynasty carved red lacquer screen landscape'),
    hallId: 'hall-3-2',
    relatedExhibitIds: ['ex-014', 'ex-016', 'ex-018'],
  },
  {
    id: 'ex-018',
    name: '螺钿镶嵌盒',
    era: '元代 约公元1300年',
    zone: '漆器馆区',
    background: '螺钿镶嵌是将贝壳薄片嵌入漆器表面的装饰工艺。',
    description:
      '此盒长32厘米，木胎黑漆。用夜光螺、鲍鱼贝等镶嵌成仕女游园图。人物神态生动，色彩绚丽。在光线下贝壳折射出彩虹般的光泽，精美绝伦。',
    imageUrl: img('Yuan dynasty mother of pearl inlaid lacquer box'),
    hallId: 'hall-3-2',
    relatedExhibitIds: ['ex-015', 'ex-017', 'ex-001'],
  },
  {
    id: 'ex-019',
    name: '彩绘陶俑',
    era: '西汉 约公元前150年',
    zone: '陶器馆区',
    background: '陶俑是研究古代社会生活的重要实物资料。',
    description:
      '此俑高58厘米，为西汉早期墓葬出土。身着三重深衣，色彩尚存。人物面容端庄，身姿挺拔。是研究汉代服饰制度的重要资料。',
    imageUrl: img('Western Han dynasty painted pottery figure'),
    hallId: 'hall-b1-1',
    relatedExhibitIds: ['ex-020', 'ex-004', 'ex-010'],
  },
  {
    id: 'ex-020',
    name: '仰韶文化彩陶盆',
    era: '新石器时代 约公元前5000年',
    zone: '陶器馆区',
    background: '彩陶是中国史前艺术的杰出代表。',
    description:
      '此盆口径38厘米，为仰韶文化庙底沟类型。陶质细腻，橙红色地，用黑彩绘几何纹、鱼纹。图案简洁明快，是研究中国史前文化的重要实物。',
    imageUrl: img('Yangshao culture painted pottery basin fish pattern'),
    hallId: 'hall-b1-1',
    relatedExhibitIds: ['ex-019', 'ex-006', 'ex-016'],
  },
  {
    id: 'ex-021',
    name: '古钱币窖藏',
    era: '宋代 约公元1100年',
    zone: '钱币馆区',
    background: '中国钱币文化源远流长，形成独特的东方钱币体系。',
    description:
      '此窖藏出土铜钱共3万余枚，计200余斤。上起汉代五铢，下至北宋大观通宝，横跨千年。其中不乏稀见版别，对研究中国钱币史具有重要价值。',
    imageUrl: img('ancient Chinese copper coins cash hoard'),
    hallId: 'hall-b1-2',
    relatedExhibitIds: ['ex-001', 'ex-010', 'ex-015'],
  },
  {
    id: 'ex-022',
    name: '乾隆通宝母钱',
    era: '清代 乾隆年间',
    zone: '钱币馆区',
    background: '母钱是翻铸流通钱的样板，存世极少。',
    description:
      '此钱为铜质，直径28厘米。字口深峻，地章平整。背满文"宝泉"，是户部宝泉局铸钱的样板。母钱铸造量远少于流通钱，是古钱币收藏中的珍品。',
    imageUrl: img('Qing dynasty Qianlong Tongbao mother coin'),
    hallId: 'hall-b1-2',
    relatedExhibitIds: ['ex-021', 'ex-012', 'ex-009'],
  },
];

const getExhibitsByHall = (hallId: string): Exhibit[] =>
  allExhibits.filter((e) => e.hallId === hallId);

export const floors: Floor[] = [
  {
    id: 'floor-1',
    name: '第一层',
    number: 1,
    description: '常设展厅：青铜器与陶瓷艺术',
    halls: [
      {
        id: 'hall-1-1',
        name: '青铜艺术展厅',
        roomNumber: '101室',
        description: '展示商周至汉代青铜器精品，包括礼器、乐器、兵器等。',
        floorId: 'floor-1',
        exhibitCount: 3,
        exhibits: getExhibitsByHall('hall-1-1'),
      },
      {
        id: 'hall-1-2',
        name: '陶瓷艺术展厅',
        roomNumber: '102室',
        description: '从原始青瓷到明清官窑，一览中国陶瓷发展史。',
        floorId: 'floor-1',
        exhibitCount: 3,
        exhibits: getExhibitsByHall('hall-1-2'),
      },
    ],
  },
  {
    id: 'floor-2',
    name: '第二层',
    number: 2,
    description: '专题展厅：书画艺术与玉器珍品',
    halls: [
      {
        id: 'hall-2-1',
        name: '书画艺术展厅',
        roomNumber: '201室',
        description: '历代名家书画真迹，展现中国书画艺术的博大精深。',
        floorId: 'floor-2',
        exhibitCount: 3,
        exhibits: getExhibitsByHall('hall-2-1'),
      },
      {
        id: 'hall-2-2',
        name: '玉器珍品展厅',
        roomNumber: '202室',
        description: '从新石器时代到清代，呈现中国玉文化的灿烂辉煌。',
        floorId: 'floor-2',
        exhibitCount: 3,
        exhibits: getExhibitsByHall('hall-2-2'),
      },
    ],
  },
  {
    id: 'floor-3',
    name: '第三层',
    number: 3,
    description: '专题展厅：纺织品与漆木家具',
    halls: [
      {
        id: 'hall-3-1',
        name: '纺织品展厅',
        roomNumber: '301室',
        description: '展示历代丝绸、刺绣、服饰等纺织品精品。',
        floorId: 'floor-3',
        exhibitCount: 3,
        exhibits: getExhibitsByHall('hall-3-1'),
      },
      {
        id: 'hall-3-2',
        name: '漆器工艺展厅',
        roomNumber: '302室',
        description: '从战国到清代，呈现中国漆器工艺的独特魅力。',
        floorId: 'floor-3',
        exhibitCount: 3,
        exhibits: getExhibitsByHall('hall-3-2'),
      },
    ],
  },
  {
    id: 'floor-b1',
    name: '地下一层',
    number: -1,
    description: '临时展厅：陶器与古钱币',
    halls: [
      {
        id: 'hall-b1-1',
        name: '陶器艺术展厅',
        roomNumber: 'B101室',
        description: '展示从新石器时代到汉代的陶器精品。',
        floorId: 'floor-b1',
        exhibitCount: 2,
        exhibits: getExhibitsByHall('hall-b1-1'),
      },
      {
        id: 'hall-b1-2',
        name: '古钱币展厅',
        roomNumber: 'B102室',
        description: '中国历代钱币展览，呈现三千年来钱币发展脉络。',
        floorId: 'floor-b1',
        exhibitCount: 2,
        exhibits: getExhibitsByHall('hall-b1-2'),
      },
    ],
  },
];

export const getExhibitById = (id: string): Exhibit | undefined =>
  allExhibits.find((e) => e.id === id);

export const getExhibitsByIds = (ids: string[]): Exhibit[] =>
  ids.map((id) => getExhibitById(id)).filter((e): e is Exhibit => e !== undefined);

export const getFloorById = (id: string): Floor | undefined =>
  floors.find((f) => f.id === id);

export const getHallById = (
  floorId: string,
  hallId: string
): Floor['halls'][0] | undefined => {
  const floor = getFloorById(floorId);
  return floor?.halls.find((h) => h.id === hallId);
};
