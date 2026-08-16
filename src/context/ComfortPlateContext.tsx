import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { DISHES } from '../data/dishes';
import type { Dish } from '../types';

interface ComfortPlateContextType {
  selectedDishIds: string[];
  selectedDishes: Dish[];
  addDish: (dishId: string) => void;
  removeDish: (dishId: string) => void;
  toggleDish: (dishId: string) => void;
  clearPlate: () => void;
  isDishSelected: (dishId: string) => boolean;
  isPlateDrawerOpen: boolean;
  setPlateDrawerOpen: (open: boolean) => void;
  totalComfortScore: number;
}

const ComfortPlateContext = createContext<ComfortPlateContextType | undefined>(undefined);

const STORAGE_KEY = 'ghar_ka_swad_plate';

export const ComfortPlateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedDishIds, setSelectedDishIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : ['rajma-chawal', 'poha']; // Starter 2 favorites
    } catch {
      return ['rajma-chawal', 'poha'];
    }
  });

  const [isPlateDrawerOpen, setPlateDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedDishIds));
    } catch {
      // Ignore localStorage errors
    }
  }, [selectedDishIds]);

  const addDish = (dishId: string) => {
    setSelectedDishIds(prev => (prev.includes(dishId) ? prev : [...prev, dishId]));
  };

  const removeDish = (dishId: string) => {
    setSelectedDishIds(prev => prev.filter(id => id !== dishId));
  };

  const toggleDish = (dishId: string) => {
    setSelectedDishIds(prev =>
      prev.includes(dishId) ? prev.filter(id => id !== dishId) : [...prev, dishId]
    );
  };

  const clearPlate = () => {
    setSelectedDishIds([]);
  };

  const isDishSelected = (dishId: string) => selectedDishIds.includes(dishId);

  const selectedDishes = DISHES.filter(dish => selectedDishIds.includes(dish.id));

  const totalComfortScore = selectedDishes.length > 0
    ? Math.round(selectedDishes.reduce((acc, curr) => acc + curr.comfortScore, 0) / selectedDishes.length)
    : 95;

  return (
    <ComfortPlateContext.Provider
      value={{
        selectedDishIds,
        selectedDishes,
        addDish,
        removeDish,
        toggleDish,
        clearPlate,
        isDishSelected,
        isPlateDrawerOpen,
        setPlateDrawerOpen,
        totalComfortScore,
      }}
    >
      {children}
    </ComfortPlateContext.Provider>
  );
};

export function useComfortPlate() {
  const context = useContext(ComfortPlateContext);
  if (!context) {
    throw new Error('useComfortPlate must be used within a ComfortPlateProvider');
  }
  return context;
}
