import React, { useState } from 'react';
import { DISHES } from '../../data/dishes';
import { FOOD_IMAGES } from '../../data/foodImages';
import type { Dish } from '../../types';
import { ComfortScore } from '../common/ComfortScore';
import { FoodImage } from '../common/FoodImage';
import { useComfortPlate } from '../../context/ComfortPlateContext';
import { Dices, Plus, Check, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const SurpriseMeOracle: React.FC = () => {
  const [surpriseDish, setSurpriseDish] = useState<Dish | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const { addDish, isDishSelected } = useComfortPlate();

  const handleRoll = () => {
    setIsRolling(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * DISHES.length);
      setSurpriseDish(DISHES[randomIndex]);
      setIsRolling(false);
    }, 400);
  };

  const isAdded = surpriseDish ? isDishSelected(surpriseDish.id) : false;
  const surpriseImage = surpriseDish ? (FOOD_IMAGES[surpriseDish.id] || FOOD_IMAGES['rajma-chawal']) : null;

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-surface border-y border-linen text-center">
      <div className="max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-gold font-sans block">
          Comfort Oracle
        </span>
        <h3 className="text-3xl font-serif font-bold text-charcoal">
          Can’t Decide What to Crave?
        </h3>
        <p className="text-sm text-muted font-sans max-w-xl mx-auto">
          Let fate and grandmother's kitchen decide which regional warmth belongs on your plate today.
        </p>

        <button
          onClick={handleRoll}
          disabled={isRolling}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-saffron hover:bg-saffron/90 text-white font-sans text-sm font-semibold transition-all shadow-warm active:scale-95 disabled:opacity-50"
        >
          <Dices className={`w-4 h-4 ${isRolling ? 'animate-spin' : ''}`} />
          <span>{isRolling ? 'Consulting the Hearth...' : 'Surprise Me'}</span>
        </button>

        <AnimatePresence>
          {surpriseDish && surpriseImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="mt-8 p-6 bg-parchment rounded-2xl border border-linen shadow-warm text-left grid grid-cols-1 sm:grid-cols-12 gap-6 items-center"
            >
              {/* Food Image Thumbnail */}
              <div className="sm:col-span-4 rounded-xl overflow-hidden border border-linen shadow-sm">
                <FoodImage
                  src={surpriseImage.src}
                  alt={surpriseImage.alt}
                  aspectRatio="4/3"
                  overlayGradient={true}
                />
              </div>

              {/* Dish Story & Actions */}
              <div className="sm:col-span-8 space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-saffron">
                  {surpriseDish.region}
                </div>
                <h4 className="text-2xl font-serif font-bold text-charcoal">
                  {surpriseDish.name}
                </h4>
                <p className="text-xs text-muted italic font-serif">
                  "{surpriseDish.story}"
                </p>
                <div className="pt-2 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => addDish(surpriseDish.id)}
                      className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold font-sans transition-all ${
                        isAdded
                          ? 'bg-olive text-white'
                          : 'bg-saffron text-white hover:bg-saffron/90'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>On Your Plate</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add to Plate</span>
                        </>
                      )}
                    </button>

                    <a
                      href={`#dish-${surpriseDish.id}`}
                      className="text-xs font-semibold text-charcoal hover:text-saffron transition-colors inline-flex items-center gap-1"
                    >
                      <span>View Tradition</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>

                  <ComfortScore
                    score={surpriseDish.comfortScore}
                    factors={surpriseDish.comfortFactors}
                    size="sm"
                    showLabel={false}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
