import { X, ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import type { CartItem } from '@/types';

interface Props {
  isOpen: boolean;
  cart: CartItem[];
  cartTotal: number;
  onClose: () => void;
  onRemove: (id: number) => void;
  onUpdateQuantity: (id: number, delta: number) => void;
  onWhatsApp: () => void;
}

export function CartDrawer({ isOpen, cart, cartTotal, onClose, onRemove, onUpdateQuantity, onWhatsApp }: Props) {
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
              <h2 className="text-2xl font-black tracking-tight">Votre Panier</h2>
              <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-50 transition-colors">
                <X size={24} />
              </button>
            </div>

            {cart.length === 0 ? (
              <EmptyState icon={<ShoppingCart size={40} />} title="Le panier est vide" desc="Ajoutez des produits authentiques pour commencer." />
            ) : (
              <>
                <div className="flex-grow overflow-y-auto space-y-6 pr-2">
                  {cart.map(item => (
                    <CartItemRow key={item.id} item={item} onRemove={onRemove} onUpdateQuantity={onUpdateQuantity} />
                  ))}
                </div>

                <div className="mt-8 pt-8 border-t border-slate-100">
                  <div className="flex justify-between items-center mb-6">
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Total estimé</p>
                    <p className="text-2xl font-black">{cartTotal.toLocaleString()} CFA</p>
                  </div>
                  <button
                    onClick={onWhatsApp}
                    className="w-full rounded-2xl bg-slate-900 py-6 text-sm font-black text-white hover:bg-emerald-600 transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-3"
                  >
                    🚀 Commander sur WhatsApp
                  </button>
                  <p className="mt-4 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Paiement sécurisé à la livraison · Bangui
                  </p>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function CartItemRow({ item, onRemove, onUpdateQuantity }: { item: CartItem; onRemove: (id: number) => void; onUpdateQuantity: (id: number, delta: number) => void }) {
  return (
    <div className="flex gap-4">
      <div className={`h-24 w-24 flex-shrink-0 rounded-2xl flex items-center justify-center ${item.darkBg ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-300'}`}>
        {item.icon}
      </div>
      <div className="flex-grow">
        <div className="flex justify-between items-start mb-1">
          <h4 className="font-black text-sm">{item.name}</h4>
          <button onClick={() => onRemove(item.id)} className="text-slate-400 hover:text-red-500 transition-colors">
            <Trash2 size={16} />
          </button>
        </div>
        <p className="text-sm font-black text-emerald-600 mb-4">{item.priceLabel}</p>
        <div className="flex items-center gap-1 bg-slate-50 rounded-xl p-1 w-fit">
          <button onClick={() => onUpdateQuantity(item.id, -1)} className="p-1.5 hover:bg-white rounded-lg transition-all shadow-sm"><Minus size={14} /></button>
          <span className="w-8 text-center text-xs font-black">{item.quantity}</span>
          <button onClick={() => onUpdateQuantity(item.id, 1)} className="p-1.5 hover:bg-white rounded-lg transition-all shadow-sm"><Plus size={14} /></button>
        </div>
      </div>
    </div>
  );
}

function EmptyState({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="flex flex-col items-center justify-center flex-grow text-center gap-4">
      <div className="h-20 w-20 rounded-full bg-slate-50 flex items-center justify-center text-slate-300">{icon}</div>
      <p className="text-lg font-bold text-slate-900">{title}</p>
      <p className="text-sm text-slate-500 max-w-[200px]">{desc}</p>
    </div>
  );
}
