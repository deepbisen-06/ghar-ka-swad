import React from 'react';
import { InteractivePlateView } from './InteractivePlateView';
import { useComfortPlate } from '../../context/ComfortPlateContext';
import { Heart, Share2, MessageSquareHeart } from 'lucide-react';

export const FinalCTA: React.FC = () => {
  const { setPlateDrawerOpen } = useComfortPlate();

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-surface border-t border-linen text-center relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold/15 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 space-y-8">
        {/* Sacred Quote Lockup */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-saffron/10 text-saffron border border-saffron/20 font-sans text-xs font-semibold uppercase tracking-widest">
          <Heart className="w-3.5 h-3.5 fill-saffron text-saffron" />
          <span>The Soulful Climax</span>
        </div>

        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-charcoal tracking-tight leading-[1.1]">
          Maybe home was never a place. <br />
          <span className="text-saffron italic font-normal">
            Maybe it was always the food waiting for you.
          </span>
        </h2>

        <p className="text-base sm:text-xl text-muted font-sans font-light max-w-2xl mx-auto leading-relaxed">
          Every grain of rice, every mustard seed popped in smoking ghee, and every slow-simmered pot carries the memory of someone who loved you enough to feed you.
        </p>

        {/* Dynamic User Plate Showcase */}
        <div className="py-6">
          <InteractivePlateView />
        </div>

        {/* Climax Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => setPlateDrawerOpen(true)}
            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-saffron hover:bg-saffron/90 text-white font-sans text-base font-semibold transition-all shadow-warm hover:shadow-glow-saffron focus-visible:ring-2 focus-visible:ring-saffron active:scale-98"
          >
            <Share2 className="w-4 h-4" />
            <span>Share My Comfort Story</span>
          </button>

          <a
            href="#memories"
            className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-parchment hover:bg-white text-charcoal border border-linen font-sans text-base font-medium transition-all shadow-warm-sm hover:border-gold focus-visible:ring-2 focus-visible:ring-gold"
          >
            <MessageSquareHeart className="w-4 h-4 text-gold" />
            <span>Read Community Memories</span>
          </a>
        </div>
      </div>
    </section>
  );
};
