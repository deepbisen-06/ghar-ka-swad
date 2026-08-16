import React from 'react';
import { useComfortPlate } from '../../context/ComfortPlateContext';
import { motion } from 'framer-motion';
import { Sparkles, Utensils } from 'lucide-react';

export const InteractivePlateView: React.FC = () => {
  const { selectedDishes, totalComfortScore } = useComfortPlate();

  return (
    <div className="relative w-full max-w-md mx-auto aspect-square flex items-center justify-center p-4">
      {/* Plate Outer Brass Base */}
      <div className="relative w-full h-full rounded-full bg-gradient-to-tr from-[#A67026] via-[#D8A24A] to-[#F5D061] p-4 shadow-warm-lg flex items-center justify-center border-4 border-[#FEE180]">
        {/* Inner Surface */}
        <div className="w-full h-full rounded-full bg-[#FFF4D4] border-2 border-[#B38029]/40 flex items-center justify-center relative overflow-hidden p-6">
          {/* Subtle thali concentric rings */}
          <div className="absolute inset-4 rounded-full border border-[#D8A24A]/20 pointer-events-none" />
          <div className="absolute inset-10 rounded-full border border-[#D8A24A]/20 pointer-events-none" />

          {selectedDishes.length === 0 ? (
            <div className="text-center space-y-2 max-w-[200px] z-10">
              <Utensils className="w-8 h-8 text-saffron/60 mx-auto" />
              <p className="font-serif text-lg text-charcoal font-semibold">
                Your Plate is Waiting
              </p>
              <p className="text-[11px] text-muted font-sans">
                Select your favorite comfort foods to assemble your personalized thali.
              </p>
            </div>
          ) : (
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Central Rice / Center Dish */}
              <motion.div
                layout
                className="w-24 h-24 rounded-full bg-surface border-2 border-linen shadow-warm flex flex-col items-center justify-center p-2 text-center z-20"
              >
                <Sparkles className="w-4 h-4 text-gold mb-0.5" />
                <span className="text-[10px] uppercase font-bold text-muted tracking-wider">
                  Comfort
                </span>
                <span className="font-serif text-lg font-bold text-saffron leading-none">
                  {totalComfortScore}
                </span>
              </motion.div>

              {/* Surrounding Selected Katoris / Bowls */}
              {selectedDishes.map((dish, index) => {
                const total = selectedDishes.length;
                const angle = (index * 360) / total - 90;
                const radius = 95; // Radius from center in px
                const rad = (angle * Math.PI) / 180;
                const x = radius * Math.cos(rad);
                const y = radius * Math.sin(rad);

                return (
                  <motion.div
                    key={dish.id}
                    layout
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    style={{
                      transform: `translate(${x}px, ${y}px)`,
                    }}
                    className="absolute w-16 h-16 rounded-full bg-gradient-to-tr from-surface to-parchment border-2 border-gold/70 shadow-warm flex flex-col items-center justify-center p-1 text-center cursor-pointer hover:scale-110 transition-transform z-10"
                    title={dish.name}
                  >
                    <span className="text-[9px] font-serif font-bold text-charcoal leading-tight line-clamp-2 px-0.5">
                      {dish.name.split(' ')[0]}
                    </span>
                    <span className="text-[8px] text-saffron font-bold">
                      {dish.comfortScore}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
