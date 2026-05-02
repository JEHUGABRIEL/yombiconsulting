import { useState } from 'react';
import { X, ChevronRight, ShoppingCart, Star } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import type { Product, Review, ReviewFormData } from '@/types';

interface Props {
  product: Product | null;
  isDarkMode: boolean;
  reviews: Record<number, Review[]>;
  reviewSubmitting: boolean;
  onClose: () => void;
  onAddToCart: (p: Product) => void;
  onWhatsApp: (msg: string) => void;
  onSubmitReview: (productId: number, form: ReviewFormData) => Promise<boolean>;
}

export function ProductModal({
  product, isDarkMode, reviews, reviewSubmitting,
  onClose, onAddToCart, onWhatsApp, onSubmitReview,
}: Props) {
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [form, setForm] = useState<ReviewFormData>({ user: '', rating: 5, comment: '' });

  const handleSubmitReview = async () => {
    if (!product) return;
    const ok = await onSubmitReview(product.id, form);
    if (ok) setForm({ user: '', rating: 5, comment: '' });
  };

  return (
    <AnimatePresence>
      {product && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[300] bg-slate-900/60 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className={`fixed inset-4 md:inset-10 lg:inset-20 z-[301] rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row transition-colors duration-500
              ${isDarkMode ? 'bg-slate-900' : 'bg-white'}`}
          >
            {/* Fermer */}
            <button
              onClick={onClose}
              className={`absolute top-6 right-6 z-10 p-4 rounded-2xl backdrop-blur shadow-lg transition-all
                ${isDarkMode ? 'bg-slate-800/80 text-white hover:bg-red-500' : 'bg-white/80 text-slate-950 hover:bg-slate-950 hover:text-white'}`}
            >
              <X size={24} />
            </button>

            {/* Colonne gauche — visuel */}
            <div className={`relative w-full md:w-1/2 flex flex-col items-center justify-center p-12 transition-colors duration-500
              ${product.darkBg || isDarkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
              <div className="absolute top-12 left-12">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">{product.brand}</p>
              </div>

              <motion.div
                key={galleryIndex}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="scale-[2.5] md:scale-[4] drop-shadow-2xl mb-20 text-indigo-500"
              >
                {galleryIndex === 0
                  ? product.icon
                  : <div className="text-4xl flex items-center justify-center h-12 w-12">{product.images[galleryIndex]}</div>}
              </motion.div>

              {/* Galerie miniatures */}
              <div className="flex gap-4 mt-auto">
                <GalleryThumb active={galleryIndex === 0} onClick={() => setGalleryIndex(0)}>
                  <div className="scale-50">{product.icon}</div>
                </GalleryThumb>
                {product.images.map((img, idx) => (
                  <GalleryThumb key={idx} active={galleryIndex === idx + 1} onClick={() => setGalleryIndex(idx + 1)}>
                    {img}
                  </GalleryThumb>
                ))}
              </div>
            </div>

            {/* Colonne droite — détails */}
            <div className={`w-full md:w-1/2 p-8 md:p-16 overflow-y-auto transition-colors duration-500
              ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`}>

              {/* Breadcrumb */}
              <div className="mb-8 flex items-center gap-2 text-[8px] font-black uppercase tracking-widest opacity-60">
                <span>Accueil</span>
                <ChevronRight size={10} />
                <span className="text-emerald-500">{product.name}</span>
              </div>

              {/* Titre & prix */}
              <div className="mb-8">
                {product.badge && (
                  <span className="inline-block mb-4 rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-emerald-700">
                    {product.badge}
                  </span>
                )}
                <h2 className="text-4xl font-black mb-4 tracking-tight leading-none">{product.name}</h2>
                <p className="text-2xl font-black text-emerald-600 mb-6">{product.priceLabel}</p>
                <p className="text-slate-500 text-lg leading-relaxed font-medium">{product.desc}</p>
              </div>

              {/* Specs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                {product.specs.map((spec, i) => (
                  <div key={i} className={`flex items-center gap-4 p-4 rounded-2xl ${isDarkMode ? 'bg-slate-800' : 'bg-slate-50'}`}>
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl shadow-sm ${isDarkMode ? 'bg-slate-900 text-emerald-500' : 'bg-white text-slate-900'}`}>
                      {spec.icon}
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">{spec.label}</p>
                      <p className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{spec.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Avis */}
              <ReviewSection
                productId={product.id}
                isDarkMode={isDarkMode}
                reviews={reviews[product.id] ?? []}
                form={form}
                submitting={reviewSubmitting}
                onFormChange={setForm}
                onSubmit={handleSubmitReview}
              />

              {/* Actions sticky */}
              <div className={`sticky bottom-0 border-t pt-8 flex gap-4 transition-colors duration-500 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
                <button
                  onClick={() => { onAddToCart(product); onClose(); }}
                  className={`flex-grow rounded-2xl py-6 text-sm font-black text-white hover:opacity-90 transition-all flex items-center justify-center gap-3
                    ${isDarkMode ? 'bg-emerald-600' : 'bg-slate-900'}`}
                >
                  <ShoppingCart size={18} /> Ajouter au Panier
                </button>
                <button
                  onClick={() => onWhatsApp(`Bonjour, je voudrais commander le ${product.name}.`)}
                  className={`flex-grow rounded-2xl border-2 py-6 text-sm font-black transition-all flex items-center justify-center gap-2
                    ${isDarkMode ? 'border-slate-800 bg-slate-800 text-white hover:bg-slate-700' : 'border-slate-200 text-slate-900 hover:bg-slate-50'}`}
                >
                  Commander Directement
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ── Sub-components ────────────────────────────────────────────

function GalleryThumb({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`h-16 w-16 rounded-2xl border-2 flex items-center justify-center text-xl transition-all
        ${active ? 'border-emerald-500 bg-white ring-4 ring-emerald-500/10' : 'border-transparent bg-slate-200/20'}`}
    >
      {children}
    </button>
  );
}

interface ReviewSectionProps {
  productId: number;
  isDarkMode: boolean;
  reviews: Review[];
  form: ReviewFormData;
  submitting: boolean;
  onFormChange: (f: ReviewFormData) => void;
  onSubmit: () => void;
}

function ReviewSection({ isDarkMode, reviews, form, submitting, onFormChange, onSubmit }: ReviewSectionProps) {
  return (
    <div className="space-y-4 mb-12">
      <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
        Avis Clients <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
      </h3>

      {/* Formulaire */}
      <div className={`p-6 rounded-2xl border mb-8 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-100'}`}>
        <h4 className="text-xs font-black mb-4 uppercase tracking-tight text-slate-400">Laisser un avis</h4>
        <div className="space-y-4">
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map(star => (
              <button key={star} onClick={() => onFormChange({ ...form, rating: star })} className={form.rating >= star ? 'text-amber-400' : 'text-slate-300'}>
                <Star size={18} fill={form.rating >= star ? 'currentColor' : 'none'} />
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Votre nom"
            value={form.user}
            onChange={e => onFormChange({ ...form, user: e.target.value })}
            className={`w-full rounded-xl px-4 py-2 text-sm font-medium outline-none ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-white border border-slate-100'}`}
          />
          <textarea
            placeholder="Votre commentaire..."
            value={form.comment}
            onChange={e => onFormChange({ ...form, comment: e.target.value })}
            rows={3}
            className={`w-full rounded-xl px-4 py-2 text-sm font-medium outline-none resize-none ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-white border border-slate-100'}`}
          />
          <button
            onClick={onSubmit}
            disabled={submitting}
            className={`w-full py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all disabled:opacity-50
              ${isDarkMode ? 'bg-emerald-600 text-white hover:bg-emerald-500' : 'bg-slate-900 text-white hover:bg-slate-800'}`}
          >
            {submitting ? 'Envoi...' : "Publier l'avis"}
          </button>
        </div>
      </div>

      {/* Liste avis */}
      {reviews.length === 0 ? (
        <p className="text-xs text-slate-400 font-bold">Zéro avis pour le moment — soyez le premier !</p>
      ) : (
        <div className="space-y-6">
          {reviews.map(rev => (
            <div key={rev.id} className={`border-l-2 pl-6 py-1 ${isDarkMode ? 'border-slate-800' : 'border-slate-100'}`}>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} fill={i < rev.rating ? 'currentColor' : 'none'} strokeWidth={i < rev.rating ? 0 : 2} />
                  ))}
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  {rev.user} — {rev.date}
                </span>
              </div>
              <p className="text-sm font-medium italic text-slate-400">"{rev.comment}"</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
