import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { useReducedMotion } from './hooks/useReducedMotion';
import { ComfortPlateProvider } from './context/ComfortPlateContext';

// Common Components
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';

// Narrative Spine (Phase 1)
import { Hero } from './components/hero/Hero';
import { ComfortDiscovery } from './components/discovery/ComfortDiscovery';
import { FoodCards } from './components/dishes/FoodCards';
import { IndiaJourney } from './components/journey/IndiaJourney';
import { RecipeExperience } from './components/recipe/RecipeExperience';
import { FinalCTA } from './components/plate/FinalCTA';
import { ComfortPlateDrawer } from './components/plate/ComfortPlateDrawer';

// Supporting & Stretch (Phase 2 & 3)
import { MemoryWall } from './components/memories/MemoryWall';
import { IngredientConstellation } from './components/stretch/IngredientConstellation';
import { FamilyRecipeCard } from './components/stretch/FamilyRecipeCard';
import { SurpriseMeOracle } from './components/stretch/SurpriseMeOracle';

export const App: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  // Lenis Smooth Scroll Lifecycle
  useEffect(() => {
    if (prefersReducedMotion) {
      return; // Fully disable smooth scroll-jacking on reduced motion
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const animId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animId);
      lenis.destroy();
    };
  }, [prefersReducedMotion]);

  return (
    <ComfortPlateProvider>
      <div className="min-h-screen bg-parchment text-charcoal font-sans flex flex-col selection:bg-saffron selection:text-white">
        {/* Navigation */}
        <Navbar />

        {/* Core Narrative & Editorial Flow */}
        <main className="flex-grow">
          {/* 1. Hero Section (First 3 Seconds) */}
          <Hero />

          {/* 2. Comfort Discovery Questionnaire */}
          <ComfortDiscovery />

          {/* 3. Eight Signature Comfort Food Traditions */}
          <FoodCards />

          {/* 4. Surprise Me Interactive Oracle */}
          <SurpriseMeOracle />

          {/* 5. Regional India Journey & Storytelling Map */}
          <IndiaJourney />

          {/* 6. Featured Recipe & Full-View Cook Mode */}
          <RecipeExperience />

          {/* 7. Botanical Ingredient Constellation */}
          <IngredientConstellation />

          {/* 8. Community Memory Wall */}
          <MemoryWall />

          {/* 9. Heirloom Family Recipe Card Generator */}
          <FamilyRecipeCard />

          {/* 10. Climax & Assembled Comfort Plate */}
          <FinalCTA />
        </main>

        {/* Global Slide-Over Plate Drawer */}
        <ComfortPlateDrawer />

        {/* Footer Colophon */}
        <Footer />
      </div>
    </ComfortPlateProvider>
  );
};

export default App;
