import React, { useState } from 'react';
import type { Dish } from '../../types';
import { ComfortScore } from '../common/ComfortScore';
import { FoodImage } from '../common/FoodImage';
import { FOOD_IMAGES } from '../../data/foodImages';
import { useComfortPlate } from '../../context/ComfortPlateContext';
import { Plus, Check, ChevronDown, ChevronUp, Clock, MapPin, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FoodCardItemProps {
  dish: Dish;
}

export const FoodCardItem: React.FC<FoodCardItemProps> = ({ dish }) => {
  const { isDishSelected, toggleDish } = useComfortPlate();
  const [isExpanded, setIsExpanded] = useState(false);
  const isSelected = isDishSelected(dish.id);

  const imageMeta = FOOD_IMAGES[dish.id] || FOOD_IMAGES['rajma-chawal'];

  return (
    <article
      id={`dish-${dish.id}`}
      className={`group relative bg-surface rounded-2xl p-5 border transition-all duration-300 flex flex-col justify-between ${
        isSelected
          ? 'border-saffron shadow-warm-lg ring-1 ring-saffron/40'
          : 'border-linen hover:border-gold/60 shadow-warm hover:shadow-warm-lg'
      }`}
      aria-labelledby={`dish-title-${dish.id}`}
    >
      <div>
        {/* Dedicated Food Photograph Area */}
        <div className="relative rounded-xl overflow-hidden mb-4 border border-linen/70">
          <FoodImage
            src={imageMeta.src}
            alt={imageMeta.alt}
            aspectRatio="4/3"
            overlayGradient={true}
          />

          {/* Regional Tag Floating Overlay */}
          <div className="absolute top-2.5 left-2.5 z-10">
            <span className="inline-flex items-center gap-1 text-[10px] font-sans font-semibold uppercase tracking-wider text-charcoal bg-surface/95 backdrop-blur-sm px-2.5 py-0.5 rounded-full border border-linen shadow-sm">
              <MapPin className="w-2.5 h-2.5 text-saffron" />
              <span>{dish.regionalZone} India</span>
            </span>
          </div>

          {/* Comfort Score Floating Overlay */}
          <div className="absolute top-2.5 right-2.5 z-10 bg-surface/95 backdrop-blur-sm rounded-full p-0.5 shadow-sm border border-linen">
            <ComfortScore
              score={dish.comfortScore}
              factors={dish.comfortFactors}
              size="sm"
              showLabel={false}
            />
          </div>
        </div>

        {/* Dish Title & Hindi Subtitle */}
        <h3
          id={`dish-title-${dish.id}`}
          className="text-2xl font-serif font-bold text-charcoal group-hover:text-saffron transition-colors leading-tight"
        >
          {dish.name}
        </h3>
        <p className="text-xs font-serif italic text-gold font-medium mb-2.5">
          {dish.hindiName}
        </p>

        {/* Short Tagline */}
        <p className="text-xs text-muted font-sans line-clamp-2 mb-3.5 leading-relaxed">
          {dish.tagline}
        </p>

        {/* Flavor Profile Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {dish.flavorProfile.slice(0, 3).map(flavor => (
            <span
              key={flavor}
              className="text-[11px] px-2 py-0.5 rounded-md bg-parchment text-charcoal/80 font-sans border border-linen/60"
            >
              {flavor}
            </span>
          ))}
        </div>
      </div>

      {/* Inline Expandable Section (Story & Ritual) */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden pt-4 pb-2 border-t border-linen text-left space-y-3 font-sans"
          >
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-saffron block mb-1 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-gold" /> Emotional Memory
              </span>
              <p className="text-xs text-charcoal/90 italic font-serif leading-relaxed pl-2.5 border-l-2 border-gold">
                "{dish.story}"
              </p>
            </div>

            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted block mb-1">
                Key Aromatics
              </span>
              <p className="text-xs text-muted leading-relaxed">
                {dish.keyIngredients.join(', ')}
              </p>
            </div>

            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted block mb-1">
                Serving Ritual
              </span>
              <p className="text-xs text-charcoal/80">
                {dish.servingRitual}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Actions Bar */}
      <div className="pt-3.5 border-t border-linen/60 flex items-center justify-between gap-2 mt-auto">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="inline-flex items-center gap-1 text-xs font-sans font-medium text-muted hover:text-charcoal transition-colors py-1 focus-visible:ring-2 focus-visible:ring-gold rounded"
          aria-expanded={isExpanded}
        >
          <span>{isExpanded ? 'Less' : 'Story & Ritual'}</span>
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        <div className="flex items-center gap-2">
          <span className="text-[11px] text-muted flex items-center gap-1 hidden sm:flex">
            <Clock className="w-3 h-3" /> {dish.prepTime}
          </span>

          <button
            onClick={() => toggleDish(dish.id)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-sans font-medium transition-all ${
              isSelected
                ? 'bg-olive text-white shadow-warm'
                : 'bg-saffron/10 text-saffron hover:bg-saffron hover:text-white border border-saffron/30'
            }`}
            aria-label={isSelected ? `Remove ${dish.name} from plate` : `Add ${dish.name} to comfort plate`}
          >
            {isSelected ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>On Plate</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
