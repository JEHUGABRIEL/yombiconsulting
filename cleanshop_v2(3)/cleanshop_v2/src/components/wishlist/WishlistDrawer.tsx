import { X, Heart, ShoppingCart } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { PRODUCTS } from '@/data/products';
import type { Product } from '@/types';

interface Props {
  isOpen: boolean;
  wishlist: number[];
  onClose: () => void;
  onToggle: (id: number, e: React.MouseEvent) => void;
  onAddToCart: (p: Product) => void;
  onOpenCart: () => void;
}

export function WishlistDrawer({ isOpen, wishlist, onClose, onToggle, onAddToCart, onOpenCart }: Props) {
  const wishlistProducts = PRODUCTS.filter(p => wishlist.includes(p.id));

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose} className="fixed inset-0 z-[200] bg-slate-900/40 backdrop-blur-sm" />

          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 z-[201] w-full max-w-md bg-white shadow-2xl p-8 flex flex-col"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
                <Heart size={24} className="text-pink-600" fill="currentColor" /> Coups de Cœur
              </h2>
              <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-50 transition-colors">
                <X size={24} />
              </button>
            </div>

            {wishlistProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center flex-grow text-center gap-4">
                <div className="h-20 w-20 rounded-full bg-slate-50 flex items-center justify-center text-slate-200">
                  <Heart size={40} />
                </div>
                <p className="text-lg font-bold text-slate-900">Liste vide</p>
                <p className="text-sm text-slate-500 max-w-[200px]">Enregistrez vos produits favoris pour plus tard.</p>
              </div>
            ) : (
              <div className="flex-grow overflow-y-auto space-y-6 pr-2">
                {wishlistProducts.map(item => (
                  <div key={item.id} className="flex gap-4 p-2 rounded-2xl hover:bg-slate-50 transition-all">
                    <div className={`h-24 w-24 flex-shrink-0 rounded-2xl flex items-center justify-center ${item.darkBg ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-300'}`}>
                      {item.icon}
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-black text-sm">{item.name}</h4>
                        <button onClick={e => onToggle(item.id, e)} className="text-pink-600">
                          <Heart size={16} fill="currentColor" />
                        </button>
                      </div>
                      <p className="text-sm font-black text-emerald-600 mb-4">{item.priceLabel}</p>
                      <button
                        onClick={() => { onAddToCart(item); onClose(); onOpenCart(); }}
                        className="text-xs font-black text-slate-900 flex items-center gap-2 hover:text-emerald-600 transition-colors"
                      >
                        <ShoppingCart size={14} /> Ajouter au panier
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
