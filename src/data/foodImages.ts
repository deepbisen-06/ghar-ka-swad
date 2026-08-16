export interface FoodImageMeta {
  dishId: string;
  src: string;
  alt: string;
  caption?: string;
  region: string;
}

export const FOOD_IMAGES: Record<string, FoodImageMeta> = {
  hero: {
    dishId: 'hero',
    src: '/images/food/hero_thali.jpg',
    alt: 'Authentic Indian brass thali with steaming bowls of home-style rajma, dal tadka with ghee, basmati rice, sirka onions, and crispy papad in warm natural light',
    caption: 'The Traditional Indian Comfort Thali',
    region: 'Pan-India',
  },
  'poha': {
    dishId: 'poha',
    src: '/images/food/dish_poha.jpg',
    alt: 'Golden Maharashtrian Kanda Batata Poha topped with crunchy roasted peanuts, fresh coriander, and a juicy lemon wedge in a rustic ceramic bowl',
    caption: 'Kanda Batata Poha',
    region: 'West India',
  },
  'rajma-chawal': {
    dishId: 'rajma-chawal',
    src: '/images/food/dish_rajma_chawal.jpg',
    alt: 'Piping hot Punjabi Rajma Chawal with thick spiced tomato ginger gravy and melting desi ghee over aged basmati rice in a rustic bowl',
    caption: 'Dhaba-Style Rajma Chawal',
    region: 'North India',
  },
  'khichdi': {
    dishId: 'khichdi',
    src: '/images/food/dish_khichdi.jpg',
    alt: 'Comforting yellow Moong Dal Ghee Khichdi tempered with cumin seeds and pure desi ghee, served with roasted papad and curd',
    caption: 'Moong Dal Ghee Khichdi',
    region: 'West & Pan-India',
  },
  'misal-pav': {
    dishId: 'misal-pav',
    src: '/images/food/dish_misal_pav.jpg',
    alt: 'Fiery Kolhapuri Misal Pav with red tarri kat gravy, sprouted moth beans, crunchy farsan, and soft buttered ladi pav',
    caption: 'Kolhapuri Misal Pav',
    region: 'West India',
  },
  'dal-tadka': {
    dishId: 'dal-tadka',
    src: '/images/food/dish_dal_tadka.jpg',
    alt: 'Golden Toor Dal Tadka with smoking desi ghee tempering, browned garlic cloves, crackling cumin, and whole dried red chili in a brass handi',
    caption: 'Dhaba Style Dal Tadka',
    region: 'North India',
  },
  'idli-sambhar': {
    dishId: 'idli-sambhar',
    src: '/images/food/dish_idli_sambhar.jpg',
    alt: 'Cloud-soft steamed white Idlis submerged in a bowl of aromatic drumstick Sambhar with fresh coconut chutney on a green banana leaf',
    caption: 'Steaming Idli & Filter Coffee Sambhar',
    region: 'South India',
  },
  'kadhi-chawal': {
    dishId: 'kadhi-chawal',
    src: '/images/food/dish_kadhi_chawal.jpg',
    alt: 'Golden Amritsari Kadhi Pakora with crispy fenugreek fritters in spiced yogurt gravy poured over fluffy white basmati rice',
    caption: 'Amritsari Kadhi Pakora',
    region: 'North India',
  },
  'masala-dosa': {
    dishId: 'masala-dosa',
    src: '/images/food/dish_masala_dosa.jpg',
    alt: 'Crisp golden-brown Butter Masala Dosa folded over spiced turmeric potato filling, served with red chili garlic chutney and coconut chutney',
    caption: 'MTR Butter Masala Dosa',
    region: 'South India',
  },
};

export const REGION_IMAGE_MAP: Record<string, FoodImageMeta> = {
  North: FOOD_IMAGES['rajma-chawal'],
  West: FOOD_IMAGES['misal-pav'],
  South: FOOD_IMAGES['masala-dosa'],
  East: FOOD_IMAGES['dal-tadka'],
  Northeast: FOOD_IMAGES['khichdi'],
};
