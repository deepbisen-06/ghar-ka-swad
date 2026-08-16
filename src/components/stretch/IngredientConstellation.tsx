import React, { useState } from 'react';
import { INGREDIENTS } from '../../data/ingredients';
import { DISHES } from '../../data/dishes';
import { SectionHeading } from '../common/SectionHeading';
import { Sparkles, Utensils } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const IngredientConstellation: React.FC = () => {
  const [selectedIngredientId, setSelectedIngredientId] = useState<string>('turmeric');

  const currentIngredient = INGREDIENTS.find(i => i.id === selectedIngredientId) || INGREDIENTS[0];
  const connectedDishes = DISHES.filter(d => currentIngredient.connectedDishIds.includes(d.id));

  return (
    <section id="ingredients" className="py-20 px-4 sm:px-6 lg:px-8 bg-surface border-t border-linen">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          badge="Botanical Chemistry"
          hindiTitle="मसालों का जादू"
          title="The Aromatic Constellation"
          subtitle="Discover how India’s sacred aromatics, golden fats, and tempered seeds weave the emotional backbone of comfort."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Deterministic Static SVG Constellation Graph */}
          <div className="lg:col-span-6 bg-parchment rounded-3xl p-6 border border-linen shadow-warm relative flex items-center justify-center aspect-square">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full select-none"
              aria-label="Deterministic SVG Spice Constellation Graph"
              role="img"
            >
              {/* Connecting Background Lines to Center Node */}
              {INGREDIENTS.map(ing => {
                const isSelected = ing.id === selectedIngredientId;
                return (
                  <line
                    key={`line-${ing.id}`}
                    x1="50"
                    y1="50"
                    x2={ing.x}
                    y2={ing.y}
                    stroke={isSelected ? '#C56A2D' : '#E7DFD3'}
                    strokeWidth={isSelected ? '0.8' : '0.4'}
                    strokeDasharray={isSelected ? 'none' : '1, 1'}
                    className="transition-all duration-300"
                  />
                );
              })}

              {/* Central Sacred Hearth Hub */}
              <circle cx="50" cy="50" r="7" fill="#D8A24A" opacity="0.2" />
              <circle cx="50" cy="50" r="5" fill="#FFFDF9" stroke="#D8A24A" strokeWidth="0.8" />
              <text x="50" y="51.5" textAnchor="middle" className="text-[2.2px] font-serif font-bold fill-charcoal">
                HEARTH
              </text>

              {/* Deterministic Ingredient Nodes */}
              {INGREDIENTS.map(ing => {
                const isSelected = ing.id === selectedIngredientId;

                return (
                  <g
                    key={ing.id}
                    className="cursor-pointer group focus:outline-none"
                    onClick={() => setSelectedIngredientId(ing.id)}
                    tabIndex={0}
                    role="button"
                    aria-label={`Select ${ing.name}`}
                    onKeyDown={e => {
                      if (e.key === 'Enter' || e.key === ' ') setSelectedIngredientId(ing.id);
                    }}
                  >
                    {/* Outer Glow */}
                    {isSelected && (
                      <circle
                        cx={ing.x}
                        cy={ing.y}
                        r="6.5"
                        fill="none"
                        stroke="#C56A2D"
                        strokeWidth="0.5"
                        className="animate-pulse"
                      />
                    )}

                    {/* Node Body */}
                    <circle
                      cx={ing.x}
                      cy={ing.y}
                      r={isSelected ? "4.5" : "3.5"}
                      fill={isSelected ? "#C56A2D" : "#FFFDF9"}
                      stroke={isSelected ? "#D8A24A" : "#C56A2D"}
                      strokeWidth="0.8"
                      className="transition-all duration-300 group-hover:scale-125"
                    />

                    {/* Text Label */}
                    <text
                      x={ing.x}
                      y={ing.y + 6}
                      textAnchor="middle"
                      className={`text-[2.8px] font-sans font-bold tracking-tight select-none pointer-events-none ${
                        isSelected ? 'fill-saffron font-extrabold' : 'fill-charcoal/80'
                      }`}
                    >
                      {ing.hindiName}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Right Column: Selected Ingredient Lore & Connected Dishes */}
          <div className="lg:col-span-6 text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedIngredientId}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-parchment text-xs font-semibold text-saffron border border-linen uppercase tracking-wider mb-2">
                    <span>{currentIngredient.category}</span>
                    <span className="w-1 h-1 rounded-full bg-gold" />
                    <span>{currentIngredient.hindiName}</span>
                  </div>

                  <h3 className="text-3xl sm:text-4xl font-serif font-bold text-charcoal">
                    {currentIngredient.name}
                  </h3>
                </div>

                <p className="text-base text-muted font-sans leading-relaxed">
                  {currentIngredient.description}
                </p>

                {/* Emotional Significance */}
                <div className="p-4 rounded-xl bg-parchment border border-linen space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-charcoal flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-gold" /> The Emotional Memory
                  </span>
                  <p className="text-sm font-serif italic text-charcoal/90 leading-relaxed">
                    "{currentIngredient.emotionalNote}"
                  </p>
                </div>

                {/* Culinary Role */}
                <div className="text-xs text-muted font-sans">
                  <span className="font-bold text-charcoal block mb-0.5">Culinary Alchemy:</span>
                  <span>{currentIngredient.culinaryRole}</span>
                </div>

                {/* Connected Dishes Chips */}
                <div className="pt-4 border-t border-linen">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted block mb-3 font-sans">
                    Found in Comfort Traditions
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {connectedDishes.map(dish => (
                      <a
                        key={dish.id}
                        href={`#dish-${dish.id}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface border border-linen hover:border-gold text-xs font-medium text-charcoal transition-colors shadow-warm-sm"
                      >
                        <Utensils className="w-3 h-3 text-saffron" />
                        <span>{dish.name}</span>
                      </a>
                    ))}
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
