import { ArrowRight, Smartphone } from 'lucide-react';
import { motion } from 'motion/react';
import { PRODUCTS } from '@/data/products';
import type { Product } from '@/types';

interface Props {
  isDarkMode: boolean;
  onProductSelect: (p: Product) => void;
  onWhatsApp: () => void;
}

export function Hero({ isDarkMode, onProductSelect, onWhatsApp }: Props) {
  return (
    <section className={`relative overflow-hidden py-24 px-6 md:py-32 transition-colors duration-500 ${isDarkMode ? 'bg-slate-950' : 'bg-gradient-to-br from-slate-50 via-emerald-50/20 to-orange-50/20'}`}>
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-20 items-center">

        {/* Texte */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col items-start">
          <div className="mb-8 flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-[11px] font-bold text-emerald-700 uppercase tracking-widest">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            N°1 Technologie à Bangui, RCA
          </div>

          <h1 className="mb-8 text-6xl md:text-8xl font-black leading-[0.9] tracking-tight">
            La Tech <span className="text-emerald-600 italic">Elite</span> à votre portée.
          </h1>

          <p className="mb-12 max-w-md text-xl text-slate-500 font-medium leading-relaxed">
            iPhone, Mac, et réseau certifiés. Garantie 12 mois. Livraison Bangui.
          </p>

          <div className="flex flex-wrap gap-6">
            <button
              onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-3 rounded-[2rem] bg-slate-900 px-10 py-6 text-sm font-black text-white shadow-2xl shadow-slate-200 transition-all hover:-translate-y-1 hover:bg-slate-800"
            >
              🛍️ Découvrir le Shop
            </button>
            <button
              onClick={onWhatsApp}
              className="flex items-center gap-3 rounded-[2rem] border-2 border-slate-200 px-10 py-6 text-sm font-black text-slate-900 transition-all hover:bg-slate-50"
            >
              Parler à un expert <ArrowRight size={18} />
            </button>
          </div>
        </motion.div>

        {/* Carte produit hero */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="hidden md:grid grid-cols-2 gap-6"
        >
          <div className="col-span-2 relative overflow-hidden rounded-[3rem] bg-slate-900 p-12 text-white shadow-2xl group cursor-pointer"
            onClick={() => onProductSelect(PRODUCTS[0])}>
            <div className="absolute top-0 right-0 p-12 text-emerald-500 opacity-10 group-hover:opacity-20 transition-opacity">
              <Smartphone size={160} strokeWidth={0.5} />
            </div>
            <p className="mb-3 text-[11px] font-black uppercase tracking-widest text-emerald-500">Disponible</p>
            <h3 className="mb-2 text-4xl font-black">iPhone 15 Pro Max</h3>
            <p className="mb-8 text-lg text-slate-400 font-medium">Titane Naturel · 256GB</p>
            <span className="inline-flex items-center gap-3 rounded-2xl bg-emerald-500/20 px-6 py-3 text-xs font-black text-emerald-300 border border-emerald-500/20">
              Explorer le produit
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
