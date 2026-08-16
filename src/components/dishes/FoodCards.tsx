import React, { useState } from 'react';
import { DISHES } from '../../data/dishes';
import { FoodCardItem } from './FoodCardItem';
import { SectionHeading } from '../common/SectionHeading';
import type { RegionalZone } from '../../types';

export const FoodCards: React.FC = () => {
  const [selectedZone, setSelectedZone] = useState<RegionalZone | 'All'>('All');

  const zones: Array<RegionalZone | 'All'> = ['All', 'North', 'West', 'South', 'East'];

  const filteredDishes = selectedZone === 'All'
    ? DISHES
    : DISHES.filter(dish => dish.regionalZone === selectedZone);

  return (
    <section id="dishes" className="py-20 px-4 sm:px-6 lg:px-8 bg-parchment">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          badge="Signature Heritage"
          hindiTitle="स्वाद जो कभी नहीं भूलते"
          title="Eight Comfort Food Traditions"
          subtitle="Each dish represents generations of patient seasoning, morning rituals, and the unmistakable warmth of home."
        />

        {/* Regional Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {zones.map(zone => (
            <button
              key={zone}
              onClick={() => setSelectedZone(zone)}
              className={`px-5 py-2 rounded-full text-xs font-sans font-semibold tracking-wider uppercase transition-all focus-visible:ring-2 focus-visible:ring-saffron active:scale-95 ${
                selectedZone === zone
                  ? 'bg-saffron text-white shadow-warm'
                  : 'bg-surface text-charcoal border border-linen hover:border-gold'
              }`}
              aria-pressed={selectedZone === zone}
            >
              {zone === 'All' ? 'All Traditions' : `${zone} India`}
            </button>
          ))}
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredDishes.map(dish => (
            <FoodCardItem key={dish.id} dish={dish} />
          ))}
        </div>
      </div>
    </section>
  );
};
