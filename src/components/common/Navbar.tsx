import React, { useState, useEffect } from 'react';
import { useComfortPlate } from '../../context/ComfortPlateContext';
import { useTimeOfDay } from '../../hooks/useTimeOfDay';
import { Utensils, Menu, X, Sparkles, Sun, Moon } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { selectedDishIds, setPlateDrawerOpen } = useComfortPlate();
  const timeInfo = useTimeOfDay();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Discover', href: '#discover' },
    { label: 'Comfort Foods', href: '#dishes' },
    { label: 'India Journey', href: '#india-journey' },
    { label: 'Featured Recipe', href: '#recipe' },
    { label: 'Memories', href: '#memories' },
  ];

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  const getTimeIcon = () => {
    if (timeInfo.period === 'morning') return <Sun className="w-3.5 h-3.5 text-gold" />;
    if (timeInfo.period === 'afternoon') return <Sun className="w-3.5 h-3.5 text-saffron" />;
    if (timeInfo.period === 'evening') return <Sparkles className="w-3.5 h-3.5 text-gold" />;
    return <Moon className="w-3.5 h-3.5 text-saffron" />;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-surface/90 backdrop-blur-md border-b border-linen shadow-warm py-3'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#"
          className="group flex flex-col focus-visible:ring-2 focus-visible:ring-saffron rounded-lg p-1 -m-1"
          aria-label="Ghar Ka Swad — Back to top"
        >
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-saffron group-hover:scale-125 transition-transform" />
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-charcoal group-hover:text-saffron transition-colors">
              GHAR KA SWAD
            </span>
          </div>
          <span className="text-[10px] tracking-widest text-gold font-serif italic pl-4.5 -mt-1 font-medium">
            घर का स्वाद • A Taste of Home
          </span>
        </a>

        {/* Center Time of Day Greeting Pill (Desktop) */}
        <div className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-parchment border border-linen text-xs font-sans text-charcoal shadow-warm-sm">
          {getTimeIcon()}
          <span className="font-medium text-charcoal">{timeInfo.greeting}</span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 font-sans text-sm font-medium text-charcoal/85">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-saffron transition-colors py-1 focus-visible:ring-2 focus-visible:ring-saffron rounded"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Plate Action CTA */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setPlateDrawerOpen(true)}
            className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full bg-saffron hover:bg-saffron/90 text-white font-sans text-xs sm:text-sm font-medium transition-all shadow-warm hover:shadow-glow-saffron focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-saffron active:scale-95"
            aria-label={`Open My Comfort Plate, ${selectedDishIds.length} dishes selected`}
          >
            <Utensils className="w-4 h-4" />
            <span>My Plate</span>
            <span className="inline-flex items-center justify-center w-5 h-5 text-[11px] font-bold bg-white text-saffron rounded-full ml-0.5">
              {selectedDishIds.length}
            </span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-charcoal hover:bg-linen/40 transition-colors focus-visible:ring-2 focus-visible:ring-saffron"
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-surface border-b border-linen shadow-warm-lg px-4 pt-3 pb-6 animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-2 p-3 mb-3 bg-parchment rounded-xl border border-linen text-xs">
            {getTimeIcon()}
            <span className="font-medium text-charcoal">{timeInfo.greeting}</span>
          </div>

          <nav className="flex flex-col space-y-2">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className="px-3 py-2.5 rounded-lg text-base font-serif font-medium text-charcoal hover:bg-parchment hover:text-saffron transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
