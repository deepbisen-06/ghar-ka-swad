import React, { useState } from 'react';
import type { ComfortFactors } from '../../types';
import { Heart, Sparkles, Sun, Users, Info } from 'lucide-react';

interface ComfortScoreProps {
  score: number;
  factors?: ComfortFactors;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  showBreakdown?: boolean;
  className?: string;
}

export const ComfortScore: React.FC<ComfortScoreProps> = ({
  score,
  factors,
  size = 'md',
  showLabel = true,
  showBreakdown = true,
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const sizeClasses = {
    sm: { svg: 'w-10 h-10', text: 'text-xs font-bold', title: 'text-xs' },
    md: { svg: 'w-14 h-14', text: 'text-sm font-bold', title: 'text-sm font-medium' },
    lg: { svg: 'w-20 h-20', text: 'text-lg font-bold', title: 'text-base font-medium' },
  }[size];

  return (
    <div
      className={`relative inline-flex items-center gap-3 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      tabIndex={factors && showBreakdown ? 0 : undefined}
      role={factors && showBreakdown ? 'button' : undefined}
      aria-label={`Comfort Score: ${score} out of 100`}
    >
      {/* SVG Radial Meter */}
      <div className={`relative ${sizeClasses.svg} flex items-center justify-center shrink-0`}>
        <svg className="w-full h-full -rotate-90" viewBox="0 0 48 48">
          {/* Background Track */}
          <circle
            cx="24"
            cy="24"
            r={radius}
            className="stroke-linen"
            strokeWidth="3.5"
            fill="transparent"
          />
          {/* Progress Arc */}
          <circle
            cx="24"
            cy="24"
            r={radius}
            className="stroke-gold transition-all duration-1000 ease-out"
            strokeWidth="3.5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        {/* Center Score Number */}
        <span className={`absolute ${sizeClasses.text} text-charcoal font-sans`}>
          {score}
        </span>
      </div>

      {showLabel && (
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-wider text-muted font-sans font-semibold">
            Comfort Index
          </span>
          <span className={`${sizeClasses.title} text-charcoal font-serif flex items-center gap-1`}>
            {score >= 95 ? 'Pure Bliss' : 'Deep Comfort'}
            {factors && showBreakdown && (
              <Info className="w-3.5 h-3.5 text-gold inline opacity-70" />
            )}
          </span>
        </div>
      )}

      {/* Popover Breakdown */}
      {factors && showBreakdown && isHovered && (
        <div className="absolute bottom-full left-0 mb-3 w-64 bg-surface rounded-xl p-3.5 shadow-warm-lg border border-linen z-30 font-sans text-xs animate-in fade-in zoom-in-95 duration-150 pointer-events-none">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-linen">
            <span className="font-serif text-sm font-semibold text-charcoal flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              Our Playful Comfort Score
            </span>
            <span className="font-bold text-saffron">{score}/100</span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-muted flex items-center gap-1.5">
                <Heart className="w-3 h-3 text-saffron" /> Nostalgia
              </span>
              <span className="font-semibold text-charcoal">{factors.nostalgia}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted flex items-center gap-1.5">
                <Sun className="w-3 h-3 text-gold" /> Warmth
              </span>
              <span className="font-semibold text-charcoal">{factors.warmth}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-olive" /> Familiarity
              </span>
              <span className="font-semibold text-charcoal">{factors.familiarity}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted flex items-center gap-1.5">
                <Users className="w-3 h-3 text-saffron" /> Family Factor
              </span>
              <span className="font-semibold text-charcoal">{factors.familyFactor}%</span>
            </div>
          </div>
          <p className="text-[10px] text-muted/80 italic mt-2.5 pt-2 border-t border-linen/60">
            *Measured in memories, grandmother smiles, and hot ghee drops.
          </p>
        </div>
      )}
    </div>
  );
};
