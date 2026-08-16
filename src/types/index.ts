export type RegionalZone = 'North' | 'West' | 'South' | 'East' | 'Northeast';

export interface ComfortFactors {
  nostalgia: number;     // 0-100
  warmth: number;        // 0-100
  familiarity: number;   // 0-100
  familyFactor: number;  // 0-100
}

export interface Dish {
  id: string;
  name: string;
  hindiName: string;
  region: string;
  regionalZone: RegionalZone;
  tagline: string;
  description: string;
  story: string;
  prepTime: string;
  comfortScore: number;
  comfortFactors: ComfortFactors;
  flavorProfile: string[];
  keyIngredients: string[];
  servingRitual: string;
  iconType: 'thali' | 'bowl' | 'plate' | 'skillet';
  accentColor: string;
}

export interface Region {
  id: string;
  name: string;
  zone: RegionalZone;
  tagline: string;
  description: string;
  culturalNote: string;
  signatureFlavors: string[];
  stapleDishIds: string[];
  climateVibe: string;
  mapCoordinates: { x: number; y: number };
}

export interface Ingredient {
  id: string;
  name: string;
  hindiName: string;
  category: 'Aromatic' | 'Grain' | 'Fat' | 'Spice' | 'Herb';
  description: string;
  emotionalNote: string;
  culinaryRole: string;
  x: number; // Precomputed SVG layout X percentage (0-100)
  y: number; // Precomputed SVG layout Y percentage (0-100)
  connectedDishIds: string[];
}

export interface Memory {
  id: string;
  author: string;
  relation?: string;
  location?: string;
  memoryText: string;
  favoriteDish: string;
  dateAdded: string;
  isCurated?: boolean;
}

export interface DiscoveryPrompt {
  id: string;
  label: string;
  sublabel: string;
  icon: string;
  recommendedDishId: string;
  emotionalExcerpt: string;
  atmosphereHue: string;
}

export interface RecipeStep {
  number: string;
  title: string;
  duration: string;
  instructions: string;
  sensoryCue: string;
  grandmaTip: string;
}

export interface FamilyRecipe {
  id: string;
  dishName: string;
  whoMakesIt: string;
  secretIngredient: string;
  memory: string;
  createdAt: string;
}

export interface ComfortPersona {
  title: string;
  tagline: string;
  description: string;
  dominantFlavor: string;
  recommendedRitual: string;
}
