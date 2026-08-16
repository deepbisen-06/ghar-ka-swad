import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DISCOVERY_PROMPTS } from '../../data/discovery';
import { DISHES } from '../../data/dishes';
import { FOOD_IMAGES } from '../../data/foodImages';
import { useComfortPlate } from '../../context/ComfortPlateContext';
import { SectionHeading } from '../common/SectionHeading';
import { ComfortScore } from '../common/ComfortScore';
import { FoodImage } from '../common/FoodImage';
import { Sun, Flame, Sparkles, Heart, Coffee, ArrowRight, Plus, Check } from 'lucide-react';

export const ComfortDiscovery: React.FC = () => {
  const [selectedPromptId, setSelectedPromptId] = useState<string>('warm');
  const { addDish, isDishSelected } = useComfortPlate();

  const currentPrompt = DISCOVERY_PROMPTS.find(p => p.id === selectedPromptId) || DISCOVERY_PROMPTS[0];
  const recommendedDish = DISHES.find(d => d.id === currentPrompt.recommendedDishId) || DISHES[0];
  const isAdded = isDishSelected(recommendedDish.id);
  const dishImage = FOOD_IMAGES[recommendedDish.id] || FOOD_IMAGES['rajma-chawal'];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Flame': return <Flame className="w-4 h-4" />;
      case 'Sparkles': return <Sparkles className="w-4 h-4" />;
      case 'Heart': return <Heart className="w-4 h-4" />;
      case 'Coffee': return <Coffee className="w-4 h-4" />;
      default: return <Sun className="w-4 h-4" />;
    }
  };

  return (
    <section id="discover" className="py-20 px-4 sm:px-6 lg:px-8 bg-surface border-y border-linen">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          badge="Interactive Discovery"
          hindiTitle="आपकी पसंदीदा याद क्या है?"
          title="What Feels Like Home to You?"
          subtitle="Select the emotion your soul is craving today, and let us reveal the memory waiting for you."
        />

        {/* Emotion Selector Pill Options */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {DISCOVERY_PROMPTS.map(prompt => {
            const isSelected = prompt.id === selectedPromptId;
            return (
              <button
                key={prompt.id}
                onClick={() => setSelectedPromptId(prompt.id)}
                className={`inline-flex items-center gap-2.5 px-5 py-3 rounded-full text-sm font-sans font-medium transition-all focus-visible:ring-2 focus-visible:ring-saffron active:scale-95 ${
                  isSelected
                    ? 'bg-charcoal text-surface shadow-warm ring-2 ring-gold/50'
                    : 'bg-parchment text-charcoal border border-linen hover:border-gold hover:bg-white'
                }`}
                aria-pressed={isSelected}
              >
                <span className={isSelected ? 'text-gold' : 'text-muted'}>
                  {getIcon(prompt.icon)}
                </span>
                <span>{prompt.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Emotional Reveal Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedPromptId}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="bg-parchment rounded-3xl p-6 sm:p-10 border border-linen shadow-warm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            {/* Left Story Column */}
            <div className="lg:col-span-7 space-y-4 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-xs font-semibold text-saffron border border-linen uppercase tracking-wider">
                <span>Soul Match</span>
                <span className="w-1 h-1 rounded-full bg-gold" />
                <span>{recommendedDish.region}</span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-serif font-bold text-charcoal leading-tight">
                {recommendedDish.name}
              </h3>
              <p className="text-sm font-serif italic text-gold font-medium -mt-2">
                {recommendedDish.hindiName}
              </p>

              <blockquote className="text-base sm:text-lg text-charcoal/90 font-serif italic leading-relaxed pl-4 border-l-2 border-saffron my-4">
                "{currentPrompt.emotionalExcerpt}"
              </blockquote>

              <p className="text-sm text-muted font-sans leading-relaxed">
                {recommendedDish.description}
              </p>

              {/* Flavor Profile Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {recommendedDish.flavorProfile.map(flavor => (
                  <span
                    key={flavor}
                    className="px-3 py-1 rounded-full bg-surface border border-linen text-xs font-medium text-charcoal"
                  >
                    {flavor}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  onClick={() => addDish(recommendedDish.id)}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-sans text-sm font-medium transition-all ${
                    isAdded
                      ? 'bg-olive text-white shadow-warm'
                      : 'bg-saffron hover:bg-saffron/90 text-white shadow-warm hover:shadow-glow-saffron'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Your Plate</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>Add to My Comfort Plate</span>
                    </>
                  )}
                </button>

                <a
                  href={`#dish-${recommendedDish.id}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-charcoal hover:text-saffron transition-colors"
                >
                  <span>Explore this feeling</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Right Supporting Photo & Comfort Score Column */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-surface rounded-2xl border border-linen/80 shadow-warm-sm text-center space-y-4">
              <div className="w-full rounded-xl overflow-hidden border border-linen shadow-sm">
                <FoodImage
                  src={dishImage.src}
                  alt={dishImage.alt}
                  aspectRatio="16/9"
                  overlayGradient={true}
                />
              </div>

              <div className="w-full pt-2 flex items-center justify-between">
                <ComfortScore
                  score={recommendedDish.comfortScore}
                  factors={recommendedDish.comfortFactors}
                  size="md"
                  showBreakdown={true}
                />
                <span className="text-xs text-muted font-sans font-medium">
                  {recommendedDish.prepTime}
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Skip Link */}
        <div className="mt-8 text-center">
          <a
            href="#dishes"
            className="text-xs text-muted hover:text-charcoal font-sans font-medium uppercase tracking-wider transition-colors inline-flex items-center gap-1"
          >
            <span>Skip to all comfort foods</span>
            <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </section>
  );
};
