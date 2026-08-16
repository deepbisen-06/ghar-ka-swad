import React from 'react';
import { motion } from 'framer-motion';
import { SteamEffect } from '../common/SteamEffect';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { FOOD_IMAGES } from '../../data/foodImages';
import { Sparkles, Heart } from 'lucide-react';

export const HeroArtComposition: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const heroImage = FOOD_IMAGES.hero;

  return (
    <div className="relative w-full max-w-lg mx-auto aspect-square flex items-center justify-center">
      {/* Ambient Warm Golden Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-gold/30 via-saffron/20 to-transparent rounded-full filter blur-3xl opacity-75 transform -translate-y-4" />

      {/* Steam rising from central bowl */}
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-56 h-56 z-20 pointer-events-none">
        <SteamEffect />
      </div>

      {/* Main Indian Brass Thali Composition (Hero Photo framed in Traditional Brass Ring) */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.93 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full h-full p-4 rounded-full bg-gradient-to-tr from-[#784E17] via-[#D8A24A] to-[#F5D061] shadow-2xl border-4 border-[#FEE180]/80 flex items-center justify-center group"
      >
        {/* Inner Brass Rim Bevel */}
        <div className="w-full h-full rounded-full p-2 bg-[#FFF4D4] border-2 border-[#A67026]/40 flex items-center justify-center overflow-hidden relative shadow-inner">
          {/* Main Hero Food Photograph */}
          <img
            src={heroImage.src}
            alt={heroImage.alt}
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-1000 ease-out select-none"
          />

          {/* Warm Vignette Ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-t from-charcoal/30 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Floating Heritage Badge on Bottom Left */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="absolute -bottom-2 -left-2 sm:bottom-4 sm:left-2 bg-surface/95 backdrop-blur-md rounded-2xl p-3 sm:p-3.5 shadow-warm-lg border border-linen flex items-center gap-3 z-30 pointer-events-none"
        >
          <div className="w-9 h-9 rounded-full bg-saffron/10 text-saffron flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 text-gold" />
          </div>
          <div className="text-left font-sans">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted block">
              Heritage Thali
            </span>
            <span className="text-xs sm:text-sm font-serif font-bold text-charcoal flex items-center gap-1">
              Pure Desi Ghee & Rajma
            </span>
          </div>
        </motion.div>

        {/* Floating Comfort Score Badge on Top Right */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="absolute -top-2 -right-2 sm:top-4 sm:right-2 bg-surface/95 backdrop-blur-md rounded-2xl px-3.5 py-2.5 shadow-warm-lg border border-linen flex items-center gap-2 z-30 pointer-events-none"
        >
          <Heart className="w-4 h-4 text-saffron fill-saffron" />
          <div className="text-left font-sans">
            <span className="text-[9px] font-bold uppercase tracking-wider text-muted block leading-tight">
              Comfort Level
            </span>
            <span className="text-xs font-serif font-bold text-saffron leading-tight">
              100% Home
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating Golden Spice Motes */}
      {!prefersReducedMotion && (
        <>
          <motion.div
            className="absolute top-10 left-4 w-3.5 h-3.5 rounded-full bg-gold/75 blur-[0.5px] z-20 pointer-events-none"
            animate={{
              y: [-10, 10, -10],
              x: [-5, 5, -5],
              opacity: [0.4, 0.85, 0.4],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-12 right-2 w-4 h-4 rounded-full bg-saffron/65 blur-[0.5px] z-20 pointer-events-none"
            animate={{
              y: [12, -8, 12],
              x: [6, -6, 6],
              opacity: [0.3, 0.75, 0.3],
            }}
            transition={{ duration: 6, delay: 1, repeat: Infinity, ease: 'easeInOut' }}
          />
        </>
      )}
    </div>
  );
};
