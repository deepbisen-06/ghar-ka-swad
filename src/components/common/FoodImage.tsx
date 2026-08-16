import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Utensils } from 'lucide-react';

interface FoodImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: 'square' | '4/3' | '16/9' | '3/2';
  eager?: boolean;
  priority?: boolean;
  overlayGradient?: boolean;
}

export const FoodImage: React.FC<FoodImageProps> = ({
  src,
  alt,
  className = '',
  aspectRatio = '4/3',
  eager = false,
  overlayGradient = false,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const aspectClasses = {
    square: 'aspect-square',
    '4/3': 'aspect-[4/3]',
    '16/9': 'aspect-[16/9]',
    '3/2': 'aspect-[3/2]',
  }[aspectRatio];

  return (
    <div
      className={`relative overflow-hidden bg-parchment/60 ${aspectClasses} ${className}`}
    >
      {/* Loading Skeleton */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-linen/50 animate-pulse flex items-center justify-center">
          <Utensils className="w-6 h-6 text-muted/30 animate-bounce" />
        </div>
      )}

      {/* Fallback state on network/path failure */}
      {hasError ? (
        <div className="absolute inset-0 bg-parchment flex flex-col items-center justify-center p-4 text-center border border-linen">
          <Utensils className="w-8 h-8 text-saffron/40 mb-2" />
          <span className="text-xs font-serif text-charcoal/70">
            A Taste of Home
          </span>
        </div>
      ) : (
        <motion.img
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{
            opacity: isLoaded ? 1 : 0,
            scale: isLoaded ? 1 : 1.04,
          }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out select-none"
        />
      )}

      {/* Subtle vignette/editorial gradient overlay */}
      {overlayGradient && (
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent pointer-events-none" />
      )}
    </div>
  );
};
