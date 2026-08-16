import React, { useState } from 'react';
import { Dialog } from '../common/Dialog';
import type { Memory } from '../../types';
import { DISHES } from '../../data/dishes';
import { Heart } from 'lucide-react';

interface LeaveMemoryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMemory: (memory: Memory) => void;
}

export const LeaveMemoryDialog: React.FC<LeaveMemoryDialogProps> = ({
  isOpen,
  onClose,
  onAddMemory,
}) => {
  const [author, setAuthor] = useState('');
  const [relation, setRelation] = useState('');
  const [location, setLocation] = useState('');
  const [favoriteDish, setFavoriteDish] = useState(DISHES[1].name);
  const [memoryText, setMemoryText] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim()) {
      setError('Please enter your name or nickname.');
      return;
    }
    if (!memoryText.trim() || memoryText.length < 15) {
      setError('Please write at least a few words about your comfort food memory (min 15 characters).');
      return;
    }

    const newMemory: Memory = {
      id: `mem-${Date.now()}`,
      author: author.trim(),
      relation: relation.trim() || 'A Memory of Home',
      location: location.trim() || 'India',
      favoriteDish,
      memoryText: memoryText.trim(),
      dateAdded: 'Just now',
      isCurated: false,
    };

    onAddMemory(newMemory);
    // Reset form
    setAuthor('');
    setRelation('');
    setLocation('');
    setMemoryText('');
    setError('');
    onClose();
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Leave Your Memory"
      description="Honor a grandmother's secret recipe, a mother's morning hug, or a midnight canteen meal."
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        {error && (
          <div className="p-3 rounded-xl bg-saffron/10 border border-saffron/30 text-saffron text-xs font-semibold">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="author-name" className="block text-xs font-bold uppercase tracking-wider text-charcoal mb-1">
            Your Name / Nickname <span className="text-saffron">*</span>
          </label>
          <input
            id="author-name"
            type="text"
            required
            value={author}
            onChange={e => setAuthor(e.target.value)}
            placeholder="e.g. Simran or Chintu"
            className="w-full px-4 py-2.5 rounded-xl bg-parchment border border-linen focus:border-saffron focus:bg-white text-sm text-charcoal outline-none transition-colors"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="relation-tag" className="block text-xs font-bold uppercase tracking-wider text-charcoal mb-1">
              Occasion / Relation
            </label>
            <input
              id="relation-tag"
              type="text"
              value={relation}
              onChange={e => setRelation(e.target.value)}
              placeholder="e.g. Grandma's Kitchen"
              className="w-full px-4 py-2.5 rounded-xl bg-parchment border border-linen focus:border-saffron focus:bg-white text-sm text-charcoal outline-none transition-colors"
            />
          </div>

          <div>
            <label htmlFor="location-tag" className="block text-xs font-bold uppercase tracking-wider text-charcoal mb-1">
              City / Hometown
            </label>
            <input
              id="location-tag"
              type="text"
              value={location}
              onChange={e => setLocation(e.target.value)}
              placeholder="e.g. Amritsar, Delhi, Pune"
              className="w-full px-4 py-2.5 rounded-xl bg-parchment border border-linen focus:border-saffron focus:bg-white text-sm text-charcoal outline-none transition-colors"
            />
          </div>
        </div>

        <div>
          <label htmlFor="favorite-dish" className="block text-xs font-bold uppercase tracking-wider text-charcoal mb-1">
            Comfort Dish
          </label>
          <select
            id="favorite-dish"
            value={favoriteDish}
            onChange={e => setFavoriteDish(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-parchment border border-linen focus:border-saffron focus:bg-white text-sm text-charcoal outline-none transition-colors"
          >
            {DISHES.map(d => (
              <option key={d.id} value={d.name}>
                {d.name} ({d.regionalZone} India)
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="memory-text" className="block text-xs font-bold uppercase tracking-wider text-charcoal mb-1">
            Your Comfort Memory <span className="text-saffron">*</span>
          </label>
          <textarea
            id="memory-text"
            required
            rows={3}
            value={memoryText}
            onChange={e => setMemoryText(e.target.value)}
            placeholder="Every Sunday morning smelled of roasted cumin and ginger..."
            className="w-full px-4 py-2.5 rounded-xl bg-parchment border border-linen focus:border-saffron focus:bg-white text-sm text-charcoal outline-none transition-colors resize-none"
          />
        </div>

        <div className="pt-3 flex items-center justify-end gap-3 border-t border-linen">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-full text-xs font-semibold text-muted hover:text-charcoal transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-saffron hover:bg-saffron/90 text-white font-sans text-xs font-semibold shadow-warm transition-all"
          >
            <Heart className="w-3.5 h-3.5 fill-white" />
            <span>Post to Memory Wall</span>
          </button>
        </div>
      </form>
    </Dialog>
  );
};
