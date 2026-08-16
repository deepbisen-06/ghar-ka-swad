import React from 'react';
import { Heart, Sparkles, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-charcoal text-surface pt-16 pb-12 border-t border-linen/20 font-sans relative overflow-hidden">
      {/* Decorative subtle ambient pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#D8A24A_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b border-surface/10">
          {/* Brand & Editorial Manifesto */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-saffron" />
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                GHAR KA SWAD
              </span>
            </div>
            <p className="text-sm text-surface/70 leading-relaxed font-light">
              An interactive digital tribute to the mothers, grandmothers, roadside dhabas, and monsoon kitchens that turn simple grains into eternal comfort.
            </p>
            <p className="font-serif italic text-gold text-sm">
              "Some meals don't just feed you. They bring you home."
            </p>
          </div>

          {/* Cultural Chapters */}
          <div className="space-y-3">
            <h3 className="font-serif text-lg font-semibold text-white tracking-wide">
              Culinary Journey
            </h3>
            <ul className="space-y-2 text-sm text-surface/70">
              <li>
                <a href="#discover" className="hover:text-gold transition-colors">
                  Comfort Discovery Questionnaire
                </a>
              </li>
              <li>
                <a href="#dishes" className="hover:text-gold transition-colors">
                  Eight Signature Comfort Foods
                </a>
              </li>
              <li>
                <a href="#india-journey" className="hover:text-gold transition-colors">
                  Regional Food Map of India
                </a>
              </li>
              <li>
                <a href="#recipe" className="hover:text-gold transition-colors">
                  Rajma Chawal Cook Mode
                </a>
              </li>
              <li>
                <a href="#memories" className="hover:text-gold transition-colors">
                  The Community Memory Wall
                </a>
              </li>
            </ul>
          </div>

          {/* Accessibility & Credits */}
          <div className="space-y-3">
            <h3 className="font-serif text-lg font-semibold text-white tracking-wide">
              Craft & Accessibility
            </h3>
            <p className="text-xs text-surface/70 leading-relaxed">
              Designed with strict adherence to WCAG AA accessibility standards. Features full keyboard traversal, screen-reader semantics, and automatic adaptation to reduced-motion preferences.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-gold/90 font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>DEV Community Frontend Challenge</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-surface/60">
          <p className="flex items-center gap-1.5">
            Crafted with <Heart className="w-3.5 h-3.5 text-saffron fill-saffron" /> and pure desi ghee for comfort lovers everywhere.
          </p>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface/10 hover:bg-surface/20 text-surface transition-colors focus-visible:ring-2 focus-visible:ring-gold"
            aria-label="Scroll back to top of page"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
