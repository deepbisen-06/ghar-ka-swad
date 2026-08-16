import React, { useState, useEffect, useRef } from 'react';
import { RAJMA_RECIPE_STEPS } from '../../data/featuredRecipe';
import { ArrowLeft, ArrowRight, X, Sparkles, Clock, Play, Pause, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CookModeProps {
  onExit: () => void;
}

export const CookMode: React.FC<CookModeProps> = ({ onExit }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(300); // 5 mins default interactive timer
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const exitButtonRef = useRef<HTMLButtonElement>(null);

  const step = RAJMA_RECIPE_STEPS[currentStepIndex];
  const isFirst = currentStepIndex === 0;
  const isLast = currentStepIndex === RAJMA_RECIPE_STEPS.length - 1;

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onExit();
      } else if (e.key === 'ArrowRight' && !isLast) {
        setCurrentStepIndex(prev => prev + 1);
      } else if (e.key === 'ArrowLeft' && !isFirst) {
        setCurrentStepIndex(prev => prev - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    exitButtonRef.current?.focus();
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStepIndex, isFirst, isLast, onExit]);

  // Cooking Timer interval
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(s => s - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timerSeconds]);

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#1E1B18] text-[#FFFDF9] flex flex-col justify-between p-6 sm:p-12 overflow-y-auto font-sans animate-in fade-in duration-300"
      role="region"
      aria-label="Full-View Interactive Cook Mode for Rajma Chawal"
    >
      {/* Top Header Bar */}
      <div className="max-w-5xl mx-auto w-full flex items-center justify-between pb-6 border-b border-white/15">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-saffron animate-pulse" />
          <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white">
            COOK MODE • Rajma Chawal
          </span>
        </div>

        {/* Step Progress Pills */}
        <div className="hidden md:flex items-center gap-2">
          {RAJMA_RECIPE_STEPS.map((s, idx) => (
            <button
              key={s.number}
              onClick={() => setCurrentStepIndex(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === currentStepIndex
                  ? 'w-8 bg-gold'
                  : idx < currentStepIndex
                  ? 'w-4 bg-saffron/70'
                  : 'w-4 bg-white/20'
              }`}
              aria-label={`Go to step ${s.number}`}
            />
          ))}
        </div>

        {/* Exit Button */}
        <button
          ref={exitButtonRef}
          onClick={onExit}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-xs uppercase tracking-wider transition-colors focus-visible:ring-2 focus-visible:ring-gold"
          aria-label="Exit Cook Mode (or press Escape)"
        >
          <span>Exit Mode</span>
          <kbd className="hidden sm:inline bg-black/40 px-1.5 py-0.5 rounded text-[10px] text-gold">
            ESC
          </kbd>
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Main Big Instruction Step */}
      <div className="max-w-4xl mx-auto w-full my-auto py-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStepIndex}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* Step Number & Duration */}
            <div className="flex items-center justify-between text-gold font-serif">
              <span className="text-4xl sm:text-5xl font-bold tracking-widest">
                STEP {step.number}
              </span>
              <span className="text-base sm:text-lg flex items-center gap-2 font-sans bg-white/10 px-4 py-1.5 rounded-full text-white">
                <Clock className="w-4 h-4 text-gold" /> {step.duration}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight">
              {step.title}
            </h2>

            {/* Big Instruction Text */}
            <p className="text-xl sm:text-2xl lg:text-3xl text-[#FAF6ED]/90 font-light leading-relaxed">
              {step.instructions}
            </p>

            {/* Sensory Cue Callout */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-4">
              <Sparkles className="w-6 h-6 text-gold shrink-0 mt-1" />
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-gold block mb-1">
                  Sensory Check
                </span>
                <p className="text-base sm:text-lg text-white/90 italic font-serif">
                  "{step.sensoryCue}"
                </p>
              </div>
            </div>

            {/* Grandma's Secret */}
            <div className="p-5 rounded-2xl bg-saffron/15 border border-saffron/30 text-sm sm:text-base text-white/90">
              <span className="font-bold text-gold uppercase tracking-wider text-xs block mb-1">
                👵 Grandma’s Golden Advice
              </span>
              <p>{step.grandmaTip}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Controls Bar & Timer */}
      <div className="max-w-5xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-white/15">
        {/* Kitchen Timer Widget */}
        <div className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-full">
          <span className="font-mono text-lg font-bold text-gold">{formatTimer(timerSeconds)}</span>
          <button
            onClick={() => setIsTimerRunning(!isTimerRunning)}
            className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors"
            aria-label={isTimerRunning ? 'Pause timer' : 'Start timer'}
          >
            {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <button
            onClick={() => {
              setIsTimerRunning(false);
              setTimerSeconds(300);
            }}
            className="p-1.5 rounded-full hover:bg-white/20 text-white/70 hover:text-white transition-colors"
            aria-label="Reset timer to 5 minutes"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Step Navigation Buttons */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCurrentStepIndex(prev => Math.max(0, prev - 1))}
            disabled={isFirst}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm transition-all focus-visible:ring-2 focus-visible:ring-gold ${
              isFirst
                ? 'opacity-30 cursor-not-allowed bg-white/5 text-white/40'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
            aria-label="Previous step"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
            <kbd className="hidden sm:inline bg-black/40 px-1.5 py-0.5 rounded text-[10px] text-white/70">
              ←
            </kbd>
          </button>

          <button
            onClick={() => {
              if (isLast) {
                onExit();
              } else {
                setCurrentStepIndex(prev => prev + 1);
              }
            }}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-saffron hover:bg-saffron/90 text-white font-medium text-sm transition-all shadow-glow-saffron focus-visible:ring-2 focus-visible:ring-gold"
            aria-label={isLast ? 'Complete and exit cook mode' : 'Next step'}
          >
            <span>{isLast ? 'Finish Cooking 🎉' : 'Next Step'}</span>
            {!isLast && (
              <>
                <kbd className="hidden sm:inline bg-black/40 px-1.5 py-0.5 rounded text-[10px] text-white/70">
                  →
                </kbd>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
