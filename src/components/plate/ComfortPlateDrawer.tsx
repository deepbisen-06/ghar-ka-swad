import React, { useState } from 'react';
import { useComfortPlate } from '../../context/ComfortPlateContext';
import { useComfortPersona } from '../../hooks/useComfortPersona';
import { ComfortScore } from '../common/ComfortScore';
import { FoodImage } from '../common/FoodImage';
import { FOOD_IMAGES } from '../../data/foodImages';
import { X, Trash2, Share2, Check, Sparkles, Utensils, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ComfortPlateDrawer: React.FC = () => {
  const {
    selectedDishes,
    removeDish,
    clearPlate,
    isPlateDrawerOpen,
    setPlateDrawerOpen,
    totalComfortScore,
  } = useComfortPlate();

  const persona = useComfortPersona();
  const [copiedToast, setCopiedToast] = useState(false);

  const handleShare = async () => {
    const dishNames = selectedDishes.map(d => d.name).join(', ');
    const shareText = `Check out my personalized Indian Comfort Food Plate on Ghar Ka Swad: ${dishNames || 'Rajma Chawal'}! Comfort Score: ${totalComfortScore}/100. Archetype: ${persona.title}.`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Ghar Ka Swad Comfort Plate',
          text: shareText,
          url: window.location.href,
        });
        return;
      } catch {
        // User cancelled or failed; fallback to copy
      }
    }

    // Clipboard Copy Fallback
    try {
      await navigator.clipboard.writeText(shareText);
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 3000);
    } catch {
      alert(shareText);
    }
  };

  return (
    <AnimatePresence>
      {isPlateDrawerOpen && (
        <div
          className="fixed inset-0 z-50 overflow-hidden font-sans"
          role="dialog"
          aria-modal="true"
          aria-labelledby="drawer-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPlateDrawerOpen(false)}
            className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="w-screen max-w-md bg-surface border-l border-linen shadow-warm-lg flex flex-col justify-between"
            >
              {/* Top Header */}
              <div className="p-6 border-b border-linen flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-saffron/10 text-saffron flex items-center justify-center">
                    <Utensils className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 id="drawer-title" className="text-xl font-serif font-bold text-charcoal">
                      Your Comfort Plate
                    </h2>
                    <span className="text-xs text-muted font-sans">
                      {selectedDishes.length} {selectedDishes.length === 1 ? 'Dish' : 'Dishes'} Chosen
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setPlateDrawerOpen(false)}
                  className="p-2 rounded-full text-muted hover:text-charcoal hover:bg-linen/40 transition-colors focus-visible:ring-2 focus-visible:ring-saffron"
                  aria-label="Close plate drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Body */}
              <div className="p-6 overflow-y-auto space-y-6 flex-1 text-left">
                {/* Persona Archetype Banner */}
                <div className="p-4 rounded-2xl bg-parchment border border-linen space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-saffron">
                    <Sparkles className="w-3.5 h-3.5 text-gold" />
                    <span>Your Comfort Archetype</span>
                  </div>
                  <h3 className="text-lg font-serif font-bold text-charcoal">
                    {persona.title}
                  </h3>
                  <p className="text-xs text-muted leading-relaxed font-sans">
                    {persona.description}
                  </p>
                </div>

                {/* Score Summary Box */}
                <div className="p-4 rounded-2xl bg-surface border border-linen/90 shadow-warm-sm flex items-center justify-between">
                  <div>
                    <span className="text-xs uppercase font-bold text-muted tracking-wider block">
                      Thali Comfort Score
                    </span>
                    <span className="text-2xl font-serif font-bold text-saffron">
                      {totalComfortScore} / 100
                    </span>
                  </div>
                  <ComfortScore score={totalComfortScore} size="md" showLabel={false} />
                </div>

                {/* Selected Dishes List */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-muted">
                      Assembled Dishes
                    </h4>
                    {selectedDishes.length > 0 && (
                      <button
                        onClick={clearPlate}
                        className="text-xs text-saffron hover:underline inline-flex items-center gap-1 font-medium"
                      >
                        <Trash2 className="w-3 h-3" /> Clear All
                      </button>
                    )}
                  </div>

                  {selectedDishes.length === 0 ? (
                    <div className="p-8 text-center bg-parchment rounded-2xl border border-dashed border-linen">
                      <Heart className="w-8 h-8 text-saffron/40 mx-auto mb-2" />
                      <p className="font-serif text-base font-semibold text-charcoal">
                        Your thali is currently empty
                      </p>
                      <p className="text-xs text-muted mt-1">
                        Explore our 8 signature traditions and add the dishes that comfort you most.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      {selectedDishes.map(dish => {
                        const img = FOOD_IMAGES[dish.id] || FOOD_IMAGES['rajma-chawal'];
                        return (
                          <div
                            key={dish.id}
                            className="p-2.5 bg-parchment rounded-xl border border-linen flex items-center justify-between gap-3 group"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-linen">
                                <FoodImage
                                  src={img.src}
                                  alt={img.alt}
                                  aspectRatio="square"
                                />
                              </div>
                              <div>
                                <span className="font-serif font-bold text-charcoal text-sm block">
                                  {dish.name}
                                </span>
                                <span className="text-[11px] text-muted">
                                  {dish.regionalZone} India • {dish.prepTime}
                                </span>
                              </div>
                            </div>

                            <button
                              onClick={() => removeDish(dish.id)}
                              className="p-1.5 text-muted/60 hover:text-saffron hover:bg-surface rounded-lg transition-colors"
                              aria-label={`Remove ${dish.name}`}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-6 border-t border-linen bg-surface space-y-3">
                <button
                  onClick={handleShare}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-saffron hover:bg-saffron/90 text-white font-sans text-sm font-semibold transition-all shadow-warm hover:shadow-glow-saffron focus-visible:ring-2 focus-visible:ring-saffron"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share My Comfort Plate</span>
                </button>

                {copiedToast && (
                  <div className="p-2 text-center rounded-lg bg-olive/15 border border-olive/30 text-olive text-xs font-semibold flex items-center justify-center gap-1.5 animate-in fade-in">
                    <Check className="w-3.5 h-3.5" />
                    <span>Plate copied to clipboard!</span>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
