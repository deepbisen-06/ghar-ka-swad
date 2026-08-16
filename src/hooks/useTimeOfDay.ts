import { useState, useEffect } from 'react';

export interface TimeGreeting {
  period: 'morning' | 'afternoon' | 'evening' | 'night';
  greeting: string;
  subtext: string;
  suggestedDishId: string;
}

export function useTimeOfDay(): TimeGreeting {
  const [timeGreeting, setTimeGreeting] = useState<TimeGreeting>(() => computeGreeting());

  function computeGreeting(): TimeGreeting {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      return {
        period: 'morning',
        greeting: 'Good morning. Something warm?',
        subtext: 'Fresh steam, mustard temperings, and the golden glow of dawn.',
        suggestedDishId: 'poha',
      };
    } else if (hour >= 12 && hour < 17) {
      return {
        period: 'afternoon',
        greeting: 'Lunch tastes better when it feels familiar.',
        subtext: 'A comforting ladle of rajma or slow-cooked dal with aged basmati.',
        suggestedDishId: 'rajma-chawal',
      };
    } else if (hour >= 17 && hour < 22) {
      return {
        period: 'evening',
        greeting: 'Long day? Come home to something comforting.',
        subtext: 'A soothing bowl of moong dal khichdi drenched in fragrant ghee.',
        suggestedDishId: 'khichdi',
      };
    } else {
      return {
        period: 'night',
        greeting: 'Some cravings belong to midnight.',
        subtext: 'Crisp buttered pav dipped in fiery misal or hot spiced tea.',
        suggestedDishId: 'misal-pav',
      };
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeGreeting(computeGreeting());
    }, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  return timeGreeting;
}
