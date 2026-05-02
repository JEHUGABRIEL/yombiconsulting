import { Heart, ShoppingCart, Bell } from 'lucide-react';
import { motion } from 'motion/react';
import type { Product } from '@/types';

interface Props {
  product: Product;
  isDarkMode: boolean;
  isInWishlist: boolean;
  onSelect: (p: Product) => void;
  onAddToCart: (p: Product) => void;
  onToggleWishlist: (id: number, e: React.MouseEvent) => void;
  onNotifyStock: () => void;
}

const BADGE_STYLES = {
  hot:      'bg-orange-500 text-white',
  new:      'bg-indigo-600 text-white',
  verified: 'bg-emerald-600 text-white',
};

export function ProductCard({
  product, isDarkMode, isInWishlist,
  onSelect, onAddToCart, onToggleWishlist, onNotifyStock,
}: Props) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="flex-shrink-0 w-[85%] md:w-[45%] lg:w-[30%] snap-center"
    >
      <div
        onClick={() => onSelect(product)}
        className={`relative flex flex-col rounded-[3rem] p-10 h-full border-2 transition-all duration-500 overflow-hidden cursor-pointer
          ${isDarkMode
            ? 'bg-slate-950 border-slate-800 hover:border-emerald-500 shadow-2xl shadow-emerald-500/5'
            : 'bg-white border-slate-100/50 hover:shadow-[0_40px_80px_rgba(0,0,0,0.08)]'}`}
      >
        {/* Glow subtil */}
        <div className={`absolute top-0 right-0 h-32 w-32 blur-[100px] opacity-10 ${product.darkBg ? 'bg-white' : 'bg-emerald-500'}`} />

        {/* En-tête : badge + wishlist */}
        <div className="flex justify-between items-start mb-12 relative z-10">
          <div>
            {product.badge && product.badgeType && (
              <span className={`inline-block mb-3 rounded-full px-4 py-1.5 text-[8px] font-black uppercase tracking-widest ${BADGE_STYLES[product.badgeType]}`}>
                {product.badge}
              </span>
            )}
            {product.onSale && (
              <span className="block text-[8px] font-black uppercase tracking-widest text-red-500 mt-1">Offre Spéciale</span>
            )}
          </div>
          <button
            onClick={e => onToggleWishlist(product.id, e)}
            aria-label="Ajouter aux favoris"
            className={`h-12 w-12 rounded-2xl flex items-center justify-center transition-all
              ${isInWishlist ? 'bg-pink-50 text-pink-600' : isDarkMode ? 'bg-slate-800 text-slate-500 hover:text-white' : 'bg-slate-50 text-slate-400 hover:text-slate-900'}`}
          >
            <Heart size={20} fill={isInWishlist ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Icône produit */}
        <div className="flex-grow flex flex-col items-center justify-center mb-12">
          <div className={`scale-[2.5] md:scale-[3] drop-shadow-2xl ${isDarkMode ? 'text-indigo-400' : 'text-slate-900'}`}>
            {product.icon}
          </div>
        </div>

        {/* Infos + CTA */}
        <div className="relative z-10">
          <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 mb-3 block">{product.brand}</span>
          <h4 className={`text-2xl font-black tracking-tighter mb-4 leading-none ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            {product.name}
          </h4>
          <div className={`flex items-center justify-between pt-6 border-t ${isDarkMode ? 'border-slate-800' : 'border-slate-100'}`}>
            <span className="text-emerald-500 font-black text-xl">{product.priceLabel}</span>
            <button
              onClick={e => {
                e.stopPropagation();
                product.inStock ? onAddToCart(product) : onNotifyStock();
              }}
              aria-label={product.inStock ? 'Ajouter au panier' : 'Être alerté'}
              className={`h-14 w-14 rounded-2xl flex items-center justify-center transition-all
                ${product.inStock
                  ? isDarkMode ? 'bg-emerald-600 text-white hover:bg-emerald-500' : 'bg-slate-950 text-white hover:bg-emerald-600'
                  : 'bg-slate-100 text-slate-400 cursor-default'}`}
            >
              {product.inStock ? <ShoppingCart size={20} /> : <Bell size={20} />}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
