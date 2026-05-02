import { Bell, Filter } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { BRANDS, CATEGORIES, PRICE_MIN, PRICE_MAX } from '@/data/products';

interface Props {
  category: string;
  brands: string[];
  priceRange: [number, number];
  hasActiveFilters: boolean;
  onCategoryChange: (c: string) => void;
  onToggleBrand: (b: string) => void;
  onPriceChange: (r: [number, number]) => void;
  onReset: () => void;
  onNotifyStock: () => void;
}

export function ProductFilters({
  category, brands, priceRange, hasActiveFilters,
  onCategoryChange, onToggleBrand, onPriceChange, onReset, onNotifyStock,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <section className="bg-white py-12 px-6 border-b border-slate-50">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-6">

          {/* Catégories */}
          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className={`px-8 py-4 rounded-[1.5rem] text-xs font-black transition-all
                  ${category === cat
                    ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-200 scale-105'
                    : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              onClick={() => setOpen(o => !o)}
              className={`flex items-center gap-2 px-6 py-4 rounded-[1.5rem] border text-xs font-black transition-all
                ${open || hasActiveFilters
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                  : 'border-slate-100 bg-white text-slate-600'}`}
            >
              <Filter size={16} /> Filtres{hasActiveFilters ? ' ●' : ''}
            </button>
            <button
              onClick={onNotifyStock}
              className="flex items-center gap-2 px-6 py-4 rounded-[1.5rem] bg-slate-900 text-white text-xs font-black hover:bg-slate-800 transition-all"
            >
              <Bell size={16} /> Alerte Stock
            </button>
          </div>
        </div>

        {/* Panneau filtres avancés */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-12 p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                {/* Marques */}
                <div className="space-y-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Par Marques</p>
                  <div className="flex flex-wrap gap-2">
                    {BRANDS.map(brand => (
                      <button
                        key={brand}
                        onClick={() => onToggleBrand(brand)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all
                          ${brands.includes(brand)
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'bg-white text-slate-500 border-slate-100 hover:border-emerald-200'}`}
                      >
                        {brand}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Prix */}
                <div className="space-y-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Gamme de Prix (CFA)</p>
                  <div className="flex items-center gap-4">
                    <input
                      type="number"
                      value={priceRange[0]}
                      min={PRICE_MIN}
                      max={priceRange[1]}
                      onChange={e => onPriceChange([Number(e.target.value), priceRange[1]])}
                      className="w-full rounded-xl bg-white border border-slate-100 p-3 text-xs font-bold outline-none"
                    />
                    <span className="text-slate-300">—</span>
                    <input
                      type="number"
                      value={priceRange[1]}
                      min={priceRange[0]}
                      max={PRICE_MAX}
                      onChange={e => onPriceChange([priceRange[0], Number(e.target.value)])}
                      className="w-full rounded-xl bg-white border border-slate-100 p-3 text-xs font-bold outline-none"
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-end justify-end gap-4">
                  <button
                    onClick={() => { onReset(); setOpen(false); }}
                    className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-red-500 transition-colors"
                  >
                    Tout Effacer
                  </button>
                  <button
                    onClick={() => setOpen(false)}
                    className="px-8 py-3 rounded-xl bg-slate-900 font-black text-white text-[10px] uppercase tracking-widest"
                  >
                    Appliquer
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// useState import manquant — ajouté ici pour éviter un import circulaire
import { useState } from 'react';
