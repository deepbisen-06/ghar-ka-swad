import { useMemo } from 'react';
import { useComfortPlate } from '../context/ComfortPlateContext';
import type { ComfortPersona } from '../types';

export function useComfortPersona(): ComfortPersona {
  const { selectedDishIds, selectedDishes } = useComfortPlate();

  return useMemo(() => {
    if (selectedDishIds.length === 0) {
      return {
        title: 'The Open-Hearted Nomad',
        tagline: 'Seeking comfort across every corner of the motherland.',
        description: 'Your palate is curious, gentle, and ready to embrace whichever comfort warmth is served with love.',
        dominantFlavor: 'Warmth & Possibility',
        recommendedRitual: 'Start with a piping hot glass of ginger masala chai and a brass thali of steaming khichdi.',
      };
    }

    if (selectedDishIds.includes('misal-pav')) {
      return {
        title: 'The Fiery Street Romantic',
        tagline: 'You find home in bustling monsoon lanes and unapologetic spice.',
        description: 'You believe comfort shouldn’t just soothe; it should awaken your senses with crackling heat, crunchy textures, and buttery toasted pav.',
        dominantFlavor: 'Fiery Kat, Mustard & Coconut',
        recommendedRitual: 'Dip extra buttered ladi pav into bubbling red rassa on a rainy Sunday afternoon.',
      };
    }

    if (selectedDishIds.includes('khichdi') && selectedDishIds.length <= 2) {
      return {
        title: 'The Soulful Healer',
        tagline: 'Simplicity is your sanctuary. A quiet bowl of dal is your medicine.',
        description: 'You honor the quiet magic of golden turmeric, roasted cumin bloomed in pure desi ghee, and meals that feel like a gentle protective embrace.',
        dominantFlavor: 'Melting Desi Ghee & Golden Turmeric',
        recommendedRitual: 'Eat moong dal khichdi with grandma’s mango pickle and crushed roasted papad.',
      };
    }

    if (selectedDishIds.includes('idli-sambhar') || selectedDishIds.includes('masala-dosa')) {
      return {
        title: 'The Dawn Morning Mystic',
        tagline: 'Temple bells, fragrant curry leaf steam, and the calm of early morning.',
        description: 'You cherish the patience of slow overnight fermentation, cloud-soft textures, and the vibrant freshness of coconut and tamarind broths.',
        dominantFlavor: 'Curry Leaves Bloomed in Sesame Oil',
        recommendedRitual: 'Savor steaming idlis submerged in hot drumstick sambhar with fresh filter coffee.',
      };
    }

    // Default rich nostalgia
    return {
      title: 'The Nostalgic Sunday Soul',
      tagline: 'Every meal is a memory of grandmother’s laughter and slow-simmered pots.',
      description: 'You understand that real food takes time. You love rich gravies, aromatic roasted whole spices, and the comforting clatter of steel spoons against brass thalis.',
      dominantFlavor: 'Slow-Simmered Tomato Ginger & Garam Masala',
      recommendedRitual: 'Ladle hot rajma over aged basmati rice with sliced sirka pyaaz and a dollop of ghee.',
    };
  }, [selectedDishIds, selectedDishes]);
}
