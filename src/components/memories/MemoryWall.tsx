import React, { useState } from 'react';
import { STARTER_MEMORIES } from '../../data/memories';
import type { Memory } from '../../types';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { LeaveMemoryDialog } from './LeaveMemoryDialog';
import { SectionHeading } from '../common/SectionHeading';
import { Plus, Heart, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export const MemoryWall: React.FC = () => {
  const [userMemories, setUserMemories] = useLocalStorage<Memory[]>('ghar_ka_swad_memories', []);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Combine user memories with starter memories (user memories first)
  const allMemories = [...userMemories, ...STARTER_MEMORIES];

  const handleAddMemory = (newMemory: Memory) => {
    setUserMemories(prev => [newMemory, ...prev]);
  };

  return (
    <section id="memories" className="py-20 px-4 sm:px-6 lg:px-8 bg-parchment">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          badge="Community Hearth"
          hindiTitle="यादों का झरोखा"
          title="The Memory Wall"
          subtitle="Vintage postcards from across the world, honoring the unspoken recipes and moments that feel like home."
        />

        {/* Leave Memory Action Callout */}
        <div className="flex justify-center mb-12">
          <button
            onClick={() => setIsDialogOpen(true)}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-charcoal hover:bg-black text-surface font-sans text-sm font-semibold transition-all shadow-warm hover:shadow-warm-lg focus-visible:ring-2 focus-visible:ring-gold active:scale-95"
          >
            <Plus className="w-4 h-4 text-gold" />
            <span>Leave Your Memory</span>
          </button>
        </div>

        {/* Postcard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {allMemories.map((mem, index) => {
            // Subtle vintage tilt
            const rotations = ['rotate-1', '-rotate-1', 'rotate-0.5', '-rotate-0.5', 'rotate-1.5', '-rotate-1.5'];
            const rotClass = rotations[index % rotations.length];

            return (
              <motion.article
                key={mem.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`bg-surface rounded-2xl p-6 sm:p-7 border border-linen shadow-warm flex flex-col justify-between transform ${rotClass} hover:rotate-0 transition-transform duration-300 relative overflow-hidden group`}
                aria-labelledby={`memory-author-${mem.id}`}
              >
                {/* Decorative vintage postage stamp */}
                <div className="absolute top-4 right-4 w-12 h-14 bg-parchment rounded-sm border border-dashed border-linen/90 p-1 flex flex-col items-center justify-between text-center select-none opacity-80 group-hover:opacity-100 transition-opacity">
                  <span className="text-[7px] uppercase font-bold text-saffron tracking-tighter">
                    INDIA POST
                  </span>
                  <Heart className="w-3.5 h-3.5 text-gold fill-gold/30" />
                  <span className="text-[7px] text-muted">₹5.00</span>
                </div>

                <div className="space-y-3 pr-12">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-saffron block font-sans">
                    {mem.relation || 'Cherished Memory'}
                  </span>

                  <blockquote className="text-base sm:text-lg font-serif italic text-charcoal/90 leading-relaxed">
                    "{mem.memoryText}"
                  </blockquote>
                </div>

                <div className="pt-5 border-t border-linen/70 mt-6 flex items-center justify-between gap-2 font-sans text-xs">
                  <div>
                    <span id={`memory-author-${mem.id}`} className="font-bold text-charcoal block">
                      {mem.author}
                    </span>
                    {mem.location && (
                      <span className="text-muted flex items-center gap-1 text-[11px]">
                        <MapPin className="w-2.5 h-2.5 text-saffron" /> {mem.location}
                      </span>
                    )}
                  </div>

                  <span className="text-[11px] font-semibold text-charcoal/75 bg-parchment px-2.5 py-1 rounded-full border border-linen/80">
                    {mem.favoriteDish}
                  </span>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* Memory Submission Modal */}
      <LeaveMemoryDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onAddMemory={handleAddMemory}
      />
    </section>
  );
};
