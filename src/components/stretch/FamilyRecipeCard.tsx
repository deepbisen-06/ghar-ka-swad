import React, { useState } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import type { FamilyRecipe } from '../../types';
import { SectionHeading } from '../common/SectionHeading';
import { Printer, Heart, Sparkles, ChefHat } from 'lucide-react';

export const FamilyRecipeCard: React.FC = () => {
  const [recipes, setRecipes] = useLocalStorage<FamilyRecipe[]>('ghar_ka_swad_family_recipes', [
    {
      id: 'default-heirloom',
      dishName: "Dadi's Sunday Rajma",
      whoMakesIt: 'Dadi (Grandmother)',
      secretIngredient: 'A pinch of roasted kasuri methi rubbed between warm palms',
      memory: 'The whistle of the pressure cooker at 1 PM meant all cousins had to stop playing cricket and wash hands for lunch.',
      createdAt: 'Heritage',
    },
  ]);

  const [dishName, setDishName] = useState('');
  const [whoMakesIt, setWhoMakesIt] = useState('');
  const [secretIngredient, setSecretIngredient] = useState('');
  const [memory, setMemory] = useState('');

  const currentRecipe = recipes[0];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dishName.trim() || !whoMakesIt.trim()) return;

    const newRecipe: FamilyRecipe = {
      id: `recipe-${Date.now()}`,
      dishName: dishName.trim(),
      whoMakesIt: whoMakesIt.trim(),
      secretIngredient: secretIngredient.trim() || 'A generous spoonful of love and desi ghee',
      memory: memory.trim() || 'Passed down with love across generations.',
      createdAt: new Date().toLocaleDateString(),
    };

    setRecipes([newRecipe, ...recipes]);
    setDishName('');
    setWhoMakesIt('');
    setSecretIngredient('');
    setMemory('');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-parchment border-t border-linen">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          badge="Heirloom Archive"
          hindiTitle="घर की रसोई की विरासत"
          title="Create a Family Recipe Card"
          subtitle="Immortalize the secret dish your mother or grandmother makes that no restaurant on earth can replicate."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Generator Form */}
          <div className="lg:col-span-6 bg-surface rounded-3xl p-6 sm:p-8 border border-linen shadow-warm text-left no-print">
            <h3 className="text-2xl font-serif font-bold text-charcoal mb-4 flex items-center gap-2">
              <ChefHat className="w-5 h-5 text-saffron" />
              <span>Recipe Details</span>
            </h3>

            <form onSubmit={handleSave} className="space-y-4 font-sans text-xs">
              <div>
                <label className="block font-bold uppercase tracking-wider text-charcoal mb-1">
                  Dish Name <span className="text-saffron">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={dishName}
                  onChange={e => setDishName(e.target.value)}
                  placeholder="e.g. Maa’s Kadhi Pakora"
                  className="w-full px-4 py-2.5 rounded-xl bg-parchment border border-linen focus:border-saffron text-sm text-charcoal outline-none"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-charcoal mb-1">
                  Who Makes It? <span className="text-saffron">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={whoMakesIt}
                  onChange={e => setWhoMakesIt(e.target.value)}
                  placeholder="e.g. Mom, Nani, Baba"
                  className="w-full px-4 py-2.5 rounded-xl bg-parchment border border-linen focus:border-saffron text-sm text-charcoal outline-none"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-charcoal mb-1">
                  Secret Ingredient / Ritual
                </label>
                <input
                  type="text"
                  value={secretIngredient}
                  onChange={e => setSecretIngredient(e.target.value)}
                  placeholder="e.g. Pounding garlic with whole black peppercorns"
                  className="w-full px-4 py-2.5 rounded-xl bg-parchment border border-linen focus:border-saffron text-sm text-charcoal outline-none"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-charcoal mb-1">
                  One Cherished Memory
                </label>
                <textarea
                  rows={3}
                  value={memory}
                  onChange={e => setMemory(e.target.value)}
                  placeholder="The kitchen would always smell like..."
                  className="w-full px-4 py-2.5 rounded-xl bg-parchment border border-linen focus:border-saffron text-sm text-charcoal outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-full bg-saffron hover:bg-saffron/90 text-white font-semibold text-sm transition-all shadow-warm"
              >
                Update Heirloom Card
              </button>
            </form>
          </div>

          {/* Right Column: Printable Vintage Card Preview */}
          <div className="lg:col-span-6 space-y-4">
            <div
              id="printable-recipe-card"
              className="recipe-card-printable bg-[#FFFDF9] rounded-3xl p-8 border-2 border-[#E7DFD3] shadow-warm-lg relative overflow-hidden text-left font-serif"
            >
              {/* Card Header */}
              <div className="border-b-2 border-charcoal/20 pb-4 mb-6 flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-saffron block">
                    HEIRLOOM RECIPE ARCHIVE
                  </span>
                  <h4 className="text-3xl font-bold text-charcoal">
                    {currentRecipe.dishName}
                  </h4>
                </div>
                <div className="w-10 h-10 rounded-full border border-charcoal/30 flex items-center justify-center text-gold">
                  <Sparkles className="w-5 h-5" />
                </div>
              </div>

              {/* Cook Lore */}
              <div className="space-y-4 text-charcoal/90 text-base">
                <div>
                  <span className="text-xs font-sans font-bold uppercase tracking-wider text-muted block mb-0.5">
                    Master Cook:
                  </span>
                  <span className="text-lg font-bold text-charcoal">
                    {currentRecipe.whoMakesIt}
                  </span>
                </div>

                <div>
                  <span className="text-xs font-sans font-bold uppercase tracking-wider text-muted block mb-0.5">
                    Secret Ingredient:
                  </span>
                  <p className="italic text-saffron font-medium">
                    "{currentRecipe.secretIngredient}"
                  </p>
                </div>

                <div>
                  <span className="text-xs font-sans font-bold uppercase tracking-wider text-muted block mb-0.5">
                    The Family Memory:
                  </span>
                  <p className="italic leading-relaxed text-sm text-charcoal/80">
                    "{currentRecipe.memory}"
                  </p>
                </div>
              </div>

              {/* Card Footer Stamp */}
              <div className="pt-6 mt-6 border-t border-charcoal/10 flex items-center justify-between text-xs text-muted font-sans">
                <span>Ghar Ka Swad Heirloom Collection</span>
                <span className="flex items-center gap-1 text-saffron">
                  <Heart className="w-3.5 h-3.5 fill-saffron" /> Preserved Forever
                </span>
              </div>
            </div>

            {/* Print Trigger */}
            <div className="flex justify-end no-print">
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-charcoal hover:bg-black text-surface font-sans text-xs font-semibold shadow-warm transition-all"
              >
                <Printer className="w-4 h-4 text-gold" />
                <span>Print Recipe Card</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
