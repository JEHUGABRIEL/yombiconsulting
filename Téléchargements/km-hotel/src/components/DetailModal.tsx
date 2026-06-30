import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, Bed, Square, Star, Check } from 'lucide-react';
import { FcfaCurrency } from './FcfaCurrency';

export interface DishDetail {
  type: 'dish';
  name: string;
  desc: string;
  price: string;
  image: string;
  highlights?: string[];
  ingredients?: string[];
}

export interface RoomDetail {
  type: 'room';
  name: string;
  price: string;
  size: string;
  capacity: string;
  bed: string;
  description: string;
  features: string[];
  image: string;
  badge?: string;
}

type DetailItem = DishDetail | RoomDetail;

interface DetailModalProps {
  item: DetailItem | null;
  onClose: () => void;
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', damping: 28, stiffness: 300 },
  },
  exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.2 } },
};

export function DetailModal({ item, onClose }: DetailModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (item) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [item, handleKeyDown]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-sm shadow-2xl"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-slate-700 hover:bg-white hover:text-slate-900 shadow-md transition-all duration-200"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>

            {item.type === 'dish' ? (
              <DishContent item={item} />
            ) : (
              <RoomContent item={item} />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DishContent({ item }: { item: DishDetail }) {
  return (
    <div>
      {/* Image */}
      <div className="relative h-56 sm:h-72 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute bottom-4 left-6 right-6">
          <span className="inline-block px-3 py-1 bg-brand-600 text-white text-xs font-bold uppercase tracking-wider rounded-sm mb-2">
            Plat Signature
          </span>
          <h3 className="text-2xl sm:text-3xl font-serif text-white">{item.name}</h3>
        </div>
      </div>

      <div className="p-6 sm:p-8">
        {/* Price */}
        <div className="flex items-center justify-between mb-6">
          <FcfaCurrency price={item.price} className="text-xl font-serif text-brand-600" />
          <div className="flex items-center gap-1 text-amber-500">
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
          </div>
        </div>

        {/* Description */}
        <p className="text-slate-600 font-light leading-relaxed mb-6">
          {item.desc}
        </p>

        {/* Highlights */}
        {item.highlights && item.highlights.length > 0 && (
          <div className="border-t border-slate-100 pt-6">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">
              Points forts
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {item.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                  <Check className="w-4 h-4 text-brand-500 mt-0.5 shrink-0" />
                  <span className="font-light">{h}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Ingredients */}
        {item.ingredients && item.ingredients.length > 0 && (
          <div className="border-t border-slate-100 pt-6 mt-6">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">
              Ingrédients
            </h4>
            <div className="flex flex-wrap gap-2">
              {item.ingredients.map((ing, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 bg-slate-100 text-slate-600 text-xs rounded-sm font-medium"
                >
                  {ing}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function RoomContent({ item }: { item: RoomDetail }) {
  return (
    <div>
      {/* Image */}
      <div className="relative h-56 sm:h-72 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute bottom-4 left-6 right-6">
          {item.badge && (
            <span
              className={`inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-sm mb-2 ${
                item.badge === 'Exclusive'
                  ? 'bg-amber-400 text-slate-900'
                  : 'bg-brand-600 text-white'
              }`}
            >
              {item.badge}
            </span>
          )}
          <h3 className="text-2xl sm:text-3xl font-serif text-white">{item.name}</h3>
        </div>
      </div>

      <div className="p-6 sm:p-8">
        {/* Meta info */}
        <div className="flex flex-wrap gap-4 mb-6 text-sm text-slate-500">
          <span className="flex items-center gap-1.5">
            <Square className="w-4 h-4 text-brand-500" />
            {item.size}
          </span>
          <span className="flex items-center gap-1.5">
            <Users className="w-4 h-4 text-brand-500" />
            {item.capacity}
          </span>
          <span className="flex items-center gap-1.5">
            <Bed className="w-4 h-4 text-brand-500" />
            {item.bed}
          </span>
        </div>

        {/* Price */}
        <div className="mb-6">
          <FcfaCurrency price={item.price} className="text-2xl font-serif text-brand-600" />
        </div>

        {/* Description */}
        <p className="text-slate-600 font-light leading-relaxed mb-6">
          {item.description}
        </p>

        {/* Features */}
        <div className="border-t border-slate-100 pt-6">
          <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">
            Équipements & Services
          </h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {item.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-2 shrink-0" />
                <span className="font-light">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
