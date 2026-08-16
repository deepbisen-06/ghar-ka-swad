import React from 'react';
import { HeroArtComposition } from './HeroArtComposition';
import { useComfortPlate } from '../../context/ComfortPlateContext';
import { Sparkles, ArrowRight, Heart, Utensils } from 'lucide-react';

export const Hero: React.FC = () => {
  const { setPlateDrawerOpen } = useComfortPlate();

  return (
    <section
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-parchment"
      aria-labelledby="hero-heading"
    >
      {/* Background subtle editorial paper grain */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#C56A2D_1px,transparent_1px)] [background-size:32px_32px]" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        {/* Left Column: Emotional Narrative Lockup */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Heritage Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-saffron/10 text-saffron border border-saffron/20 font-sans text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>DEV Frontend Challenge • Comfort Food Edition</span>
          </div>

          {/* Main Headline */}
          <h1
            id="hero-heading"
            className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-charcoal tracking-tight leading-[1.08] mb-6"
          >
            Some meals don’t just feed you. <br />
            <span className="text-saffron italic font-normal">They bring you home.</span>
          </h1>

          {/* Subtitle / Storytelling Copy */}
          <p className="text-lg sm:text-xl text-muted font-sans font-light leading-relaxed max-w-2xl mb-8">
            Across India, comfort has a thousand flavors. Discover the dishes, memories, and little rituals that turn a simple steel plate into an eternal sanctuary.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
            <a
              href="#dishes"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-saffron hover:bg-saffron/90 text-white font-sans text-base font-semibold transition-all shadow-warm hover:shadow-glow-saffron focus-visible:ring-2 focus-visible:ring-saffron active:scale-98 group"
            >
              <span>Explore Comfort Foods</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <button
              onClick={() => setPlateDrawerOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-surface hover:bg-white text-charcoal border border-linen font-sans text-base font-medium transition-all shadow-warm-sm hover:border-gold focus-visible:ring-2 focus-visible:ring-gold active:scale-98"
            >
              <Utensils className="w-4 h-4 text-gold" />
              <span>Build My Comfort Plate</span>
            </button>
          </div>

          {/* Emotional Trust Pillars */}
          <div className="pt-6 border-t border-linen/80 w-full grid grid-cols-3 gap-4 sm:gap-6 text-charcoal font-sans">
            <div>
              <div className="font-serif text-2xl sm:text-3xl font-bold text-charcoal">8</div>
              <div className="text-xs text-muted font-medium mt-0.5">Iconic Comfort Traditions</div>
            </div>
            <div>
              <div className="font-serif text-2xl sm:text-3xl font-bold text-saffron">5</div>
              <div className="text-xs text-muted font-medium mt-0.5">Culinary Regional Zones</div>
            </div>
            <div>
              <div className="font-serif text-2xl sm:text-3xl font-bold text-gold flex items-center gap-1">
                <span>99%</span>
                <Heart className="w-4 h-4 text-saffron fill-saffron" />
              </div>
              <div className="text-xs text-muted font-medium mt-0.5">Grandma’s Pure Love</div>
            </div>
          </div>
        </div>

        {/* Right Column: Art-Directed Thali Composition */}
        <div className="lg:col-span-5 flex items-center justify-center relative">
          <HeroArtComposition />
        </div>
      </div>
    </section>
  );
};
