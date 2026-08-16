import React from 'react';

interface SectionHeadingProps {
  badge?: string;
  hindiTitle?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  hindiTitle,
  title,
  subtitle,
  align = 'center',
  className = '',
}) => {
  const alignmentClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  }[align];

  return (
    <div className={`flex flex-col ${alignmentClasses} max-w-3xl ${align === 'center' ? 'mx-auto' : ''} mb-12 sm:mb-16 ${className}`}>
      {badge && (
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-saffron/10 text-saffron border border-saffron/20 mb-3.5 font-sans">
          {badge}
        </span>
      )}
      
      {hindiTitle && (
        <span className="text-sm sm:text-base font-serif italic text-gold tracking-wide mb-1 opacity-90">
          {hindiTitle}
        </span>
      )}

      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-charcoal tracking-tight leading-[1.15]">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-3.5 text-base sm:text-lg text-muted font-sans font-normal leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      )}

      <div className={`w-16 h-0.5 bg-gradient-to-r from-gold to-saffron mt-6 rounded-full opacity-70 ${align === 'center' ? '' : align === 'right' ? 'ml-auto' : ''}`} />
    </div>
  );
};
