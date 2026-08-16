import React, { useState } from 'react';
import { RAJMA_RECIPE_STEPS } from '../../data/featuredRecipe';
import { FOOD_IMAGES } from '../../data/foodImages';
import { CookMode } from './CookMode';
import { SectionHeading } from '../common/SectionHeading';
import { FoodImage } from '../common/FoodImage';
import { ChefHat, Clock, Sparkles, Flame, ArrowRight, Heart } from 'lucide-react';

export const RecipeExperience: React.FC = () => {
  const [isCookModeActive, setIsCookModeActive] = useState(false);
  const rajmaImage = FOOD_IMAGES['rajma-chawal'];

  return (
    <section id="recipe" className="py-20 px-4 sm:px-6 lg:px-8 bg-parchment">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          badge="Featured Heirloom Recipe"
          hindiTitle="धीमी आंच और पुराना तड़का"
          title="The Sunday Rajma Chawal Ritual"
          subtitle="A five-act culinary love letter. Learn how patient soaking, caramelized onions, and slow simmering create the ultimate bowl of comfort."
        />

        {/* Large Rajma Chawal Hero Visual & Story Banner */}
        <div className="bg-surface rounded-3xl overflow-hidden border border-linen shadow-warm mb-12 grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
          {/* Left Column: Large Editorial Food Photo */}
          <div className="lg:col-span-6 relative min-h-[320px] lg:min-h-[420px]">
            <FoodImage
              src={rajmaImage.src}
              alt={rajmaImage.alt}
              aspectRatio="16/9"
              className="w-full h-full object-cover"
              overlayGradient={true}
            />
            <div className="absolute bottom-4 left-4 z-10 bg-charcoal/70 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 font-sans">
              <Heart className="w-3.5 h-3.5 text-saffron fill-saffron" />
              <span>Sunday Family Tradition</span>
            </div>
          </div>

          {/* Right Column: Recipe Lore & Cook Mode Launch */}
          <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between text-left space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-saffron/10 text-xs font-semibold text-saffron uppercase tracking-wider font-sans">
                <ChefHat className="w-3.5 h-3.5" />
                <span>Heirloom Preparation • 50 mins</span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-serif font-bold text-charcoal leading-tight">
                Dhaba-Style Slow Simmer
              </h3>

              <p className="text-sm sm:text-base text-muted font-sans leading-relaxed">
                "Every Punjabi Sunday smells of roasted cumin and ginger. The whistle of the cooker was our alarm for family lunch. One bite of rich red gravy over steaming basmati, and all the week's fatigue melts away."
              </p>
            </div>

            <div className="pt-4 border-t border-linen flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="text-xs text-muted font-sans">
                <span className="font-bold text-charcoal block">Key Secret:</span>
                <span>Brown onions slowly for 10 minutes</span>
              </div>

              <button
                onClick={() => setIsCookModeActive(true)}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-saffron hover:bg-saffron/90 text-white font-sans text-sm font-semibold transition-all shadow-warm hover:shadow-glow-saffron shrink-0 active:scale-95"
                aria-label="Start Cook Mode for Rajma Chawal"
              >
                <Flame className="w-4 h-4 text-gold" />
                <span>Launch Cook Mode</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 5-Step Visual Timeline */}
        <div className="space-y-6">
          {RAJMA_RECIPE_STEPS.map((step) => (
            <div
              key={step.number}
              className="bg-surface rounded-2xl p-6 sm:p-8 border border-linen hover:border-gold/60 transition-all shadow-warm grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
            >
              {/* Step Badge & Duration */}
              <div className="lg:col-span-3 flex lg:flex-col items-center lg:items-start justify-between gap-2 border-b lg:border-b-0 lg:border-r border-linen/70 pb-3 lg:pb-0 lg:pr-6">
                <span className="font-serif text-3xl sm:text-4xl font-bold text-saffron">
                  {step.number}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted bg-parchment px-3 py-1 rounded-full border border-linen">
                  <Clock className="w-3.5 h-3.5 text-gold" />
                  <span>{step.duration}</span>
                </span>
              </div>

              {/* Step Content */}
              <div className="lg:col-span-9 space-y-3 text-left">
                <h4 className="text-2xl font-serif font-bold text-charcoal">
                  {step.title}
                </h4>
                <p className="text-sm sm:text-base text-charcoal/85 font-sans leading-relaxed">
                  {step.instructions}
                </p>

                {/* Grandmother Tip Box */}
                <div className="p-3.5 rounded-xl bg-parchment border border-linen/70 text-xs text-muted font-sans flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-charcoal">Grandma’s Secret: </span>
                    <span>{step.grandmaTip}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full-View Cook Mode Modal Overlay */}
      {isCookModeActive && <CookMode onExit={() => setIsCookModeActive(false)} />}
    </section>
  );
};
