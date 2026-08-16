import React, { useState } from 'react';
import { REGIONS } from '../../data/regions';
import { DISHES } from '../../data/dishes';
import { REGION_IMAGE_MAP } from '../../data/foodImages';
import { IndiaMapSvg } from './IndiaMapSvg';
import { SectionHeading } from '../common/SectionHeading';
import { FoodImage } from '../common/FoodImage';
import type { RegionalZone } from '../../types';
import { useComfortPlate } from '../../context/ComfortPlateContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Sparkles, Plus, Check } from 'lucide-react';

export const IndiaJourney: React.FC = () => {
  const [selectedZone, setSelectedZone] = useState<RegionalZone>('North');
  const { addDish, isDishSelected } = useComfortPlate();

  const currentRegion = REGIONS.find(r => r.zone === selectedZone) || REGIONS[0];
  const regionalDishes = DISHES.filter(d => currentRegion.stapleDishIds.includes(d.id));
  const regionalImage = REGION_IMAGE_MAP[selectedZone] || REGION_IMAGE_MAP['North'];

  return (
    <section id="india-journey" className="py-20 px-4 sm:px-6 lg:px-8 bg-surface border-y border-linen">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          badge="Regional Cartography"
          hindiTitle="भारत भर में स्वाद का सफर"
          title="Travel India Through Comfort Food"
          subtitle="Explore the distinct micro-climates, spice philosophies, and timeless morning traditions that define every corner of the subcontinent."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Interactive Stylized SVG Map */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center bg-parchment rounded-3xl p-6 border border-linen shadow-warm">
            <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-muted uppercase tracking-widest">
              <Compass className="w-4 h-4 text-saffron" />
              <span>Click a Zone on the Map</span>
            </div>

            <IndiaMapSvg selectedZone={selectedZone} onSelectZone={setSelectedZone} />

            {/* Quick zone button toggles */}
            <div className="flex flex-wrap justify-center gap-1.5 mt-4 pt-4 border-t border-linen w-full">
              {REGIONS.map(r => (
                <button
                  key={r.id}
                  onClick={() => setSelectedZone(r.zone)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    selectedZone === r.zone
                      ? 'bg-charcoal text-surface'
                      : 'bg-surface text-muted hover:text-charcoal border border-linen'
                  }`}
                >
                  {r.zone}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Dynamic Regional Lore & Dishes with Supporting Food Photo */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedZone}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="space-y-6 text-left"
              >
                {/* Region Title & Tagline */}
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-saffron font-sans">
                    {currentRegion.climateVibe}
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-serif font-bold text-charcoal mt-1">
                    {currentRegion.name}
                  </h3>
                  <p className="text-base sm:text-lg font-serif italic text-gold mt-1">
                    "{currentRegion.tagline}"
                  </p>
                </div>

                {/* Side-by-Side: Supporting Regional Food Photograph + Cultural Lore */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                  <div className="sm:col-span-5 rounded-2xl overflow-hidden border border-linen shadow-warm-sm">
                    <FoodImage
                      src={regionalImage.src}
                      alt={regionalImage.alt}
                      aspectRatio="4/3"
                      overlayGradient={true}
                    />
                    <div className="p-2 bg-parchment text-[10px] text-muted text-center font-sans font-medium">
                      {regionalImage.caption}
                    </div>
                  </div>

                  <div className="sm:col-span-7 space-y-3">
                    <p className="text-sm text-muted font-sans leading-relaxed">
                      {currentRegion.description}
                    </p>
                    <div className="p-3 rounded-xl bg-parchment border border-linen/80">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal block mb-0.5 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-saffron" /> The Hospitality Culture
                      </span>
                      <p className="text-xs text-charcoal/80 italic font-serif leading-relaxed">
                        {currentRegion.culturalNote}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Signature Flavor Palette */}
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-muted block mb-2 font-sans">
                    Signature Flavor Palette
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {currentRegion.signatureFlavors.map(flavor => (
                      <span
                        key={flavor}
                        className="px-3 py-1 rounded-full bg-parchment text-charcoal border border-linen text-xs font-medium font-sans"
                      >
                        {flavor}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Regional Comfort Staples */}
                <div className="pt-4 border-t border-linen">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted block mb-3 font-sans">
                    Iconic Regional Staples
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {regionalDishes.map(dish => {
                      const isAdded = isDishSelected(dish.id);
                      return (
                        <div
                          key={dish.id}
                          className="p-3.5 rounded-xl bg-surface border border-linen hover:border-gold/60 transition-all flex items-center justify-between gap-2"
                        >
                          <div>
                            <div className="font-serif font-bold text-charcoal text-base">
                              {dish.name}
                            </div>
                            <div className="text-[11px] text-muted font-sans">
                              {dish.prepTime} • Score {dish.comfortScore}/100
                            </div>
                          </div>
                          <button
                            onClick={() => addDish(dish.id)}
                            className={`p-2 rounded-full transition-all shrink-0 ${
                              isAdded
                                ? 'bg-olive text-white'
                                : 'bg-saffron/10 text-saffron hover:bg-saffron hover:text-white'
                            }`}
                            aria-label={`Add ${dish.name} to plate`}
                          >
                            {isAdded ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
