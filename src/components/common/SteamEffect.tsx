import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface SteamEffectProps {
  className?: string;
}

export const SteamEffect: React.FC<SteamEffectProps> = ({ className = '' }) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return null; // Suppress decorative animation when reduced motion is requested
  }

  return (
    <div className={`pointer-events-none ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 100 120"
        className="w-full h-full opacity-60 overflow-visible"
        fill="none"
      >
        {/* Steam Wisp 1 */}
        <motion.path
          d="M 35 110 Q 25 80 40 50 Q 55 20 40 5"
          stroke="url(#steamGradient1)"
          strokeWidth="3.5"
          strokeLinecap="round"
          initial={{ pathLength: 0.2, opacity: 0, y: 15 }}
          animate={{
            pathLength: [0.3, 0.8, 0.3],
            opacity: [0, 0.65, 0],
            y: [-5, -35, -55],
            x: [0, 4, -4],
          }}
          transition={{
            duration: 3.8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Steam Wisp 2 */}
        <motion.path
          d="M 50 115 Q 65 85 45 55 Q 35 25 55 5"
          stroke="url(#steamGradient2)"
          strokeWidth="4"
          strokeLinecap="round"
          initial={{ pathLength: 0.2, opacity: 0, y: 10 }}
          animate={{
            pathLength: [0.4, 0.9, 0.4],
            opacity: [0, 0.75, 0],
            y: [0, -30, -60],
            x: [0, -5, 5],
          }}
          transition={{
            duration: 4.5,
            delay: 1.2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Steam Wisp 3 */}
        <motion.path
          d="M 65 110 Q 55 75 70 45 Q 80 20 65 5"
          stroke="url(#steamGradient1)"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0.2, opacity: 0, y: 12 }}
          animate={{
            pathLength: [0.3, 0.75, 0.3],
            opacity: [0, 0.55, 0],
            y: [-5, -28, -50],
            x: [0, 3, -3],
          }}
          transition={{
            duration: 4.1,
            delay: 2.3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <defs>
          <linearGradient id="steamGradient1" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#D8A24A" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#C56A2D" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FFFDF9" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="steamGradient2" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#F8F4EE" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#D8A24A" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#FFFDF9" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
