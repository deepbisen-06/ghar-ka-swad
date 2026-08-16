import type { DiscoveryPrompt } from '../types';

export const DISCOVERY_PROMPTS: DiscoveryPrompt[] = [
  {
    id: 'warm',
    label: 'Something warm & soothing',
    sublabel: 'Gentle on the soul, like a warm quilt on a rainy afternoon.',
    icon: 'Sun',
    recommendedDishId: 'khichdi',
    emotionalExcerpt: 'When life feels hurried, a simple bowl of golden moong khichdi topped with melting ghee brings you straight back to grounding stillness.',
    atmosphereHue: '#D8A24A',
  },
  {
    id: 'spicy',
    label: 'Something fiery & bold',
    sublabel: 'Vibrant, punchy spices that awaken every dormant sense.',
    icon: 'Flame',
    recommendedDishId: 'misal-pav',
    emotionalExcerpt: 'Sprouted moth beans in a rich fiery coconut broth, topped with crunch and served with buttered soft pav. Unapologetic passion in every spoonful.',
    atmosphereHue: '#C56A2D',
  },
  {
    id: 'crispy',
    label: 'Something crispy & buttery',
    sublabel: 'Golden sizzle, lacy textures, and that satisfying crunch.',
    icon: 'Sparkles',
    recommendedDishId: 'masala-dosa',
    emotionalExcerpt: 'Lace-thin golden dosa roasted in pure butter, wrapped around spiced potato palya with cool coconut chutney.',
    atmosphereHue: '#D8A24A',
  },
  {
    id: 'nostalgic',
    label: 'Something nostalgic & comforting',
    sublabel: 'The exact scent of Sunday mornings and lazy family lunches.',
    icon: 'Heart',
    recommendedDishId: 'rajma-chawal',
    emotionalExcerpt: 'Plump kidney beans slow-simmered in roasted ginger-garlic gravy ladled over steaming basmati. The eternal king of comfort.',
    atmosphereHue: '#C56A2D',
  },
  {
    id: 'family',
    label: 'Something my family made at dawn',
    sublabel: 'Steaming breakfast before the world woke up.',
    icon: 'Coffee',
    recommendedDishId: 'poha',
    emotionalExcerpt: 'Golden flattened rice tempered with mustard seeds, peanuts, and fresh lime — the aroma that filled our hallways every morning.',
    atmosphereHue: '#6E7A52',
  },
];
