import { X, ShieldCheck, CheckCircle2, Star } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import type { Review } from '@/types';

interface Props {
  isOpen: boolean;
  pendingReviews: Review[];
  onClose: () => void;
  onApprove: (review: Review) => void;
  onReject: (id: string) => void;
}

export function AdminDashboard({ isOpen, pendingReviews, onClose, onApprove, onReject }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose} className="fixed inset-0 z-[600] bg-slate-950/90 backdrop-blur-xl" />

          <motion.div
            initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
            className="fixed inset-4 md:inset-12 lg:inset-20 z-[601] bg-white rounded-[3rem] shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-slate-950 text-white p-8 md:p-12 flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-black tracking-tight flex items-center gap-4">
                  <ShieldCheck size={32} className="text-emerald-500" /> Dashboard Modération
                </h2>
                <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-2">
                  Gérez les avis et la réputation de Clean.
                </p>
              </div>
              <button onClick={onClose} className="h-14 w-14 rounded-2xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all">
                <X size={24} />
              </button>
            </div>

            {/* Contenu */}
            <div className="flex-grow overflow-y-auto p-8 md:p-12">
              {pendingReviews.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center gap-6">
                  <div className="h-24 w-24 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
                    <CheckCircle2 size={48} />
                  </div>
                  <h3 className="text-2xl font-black">Tout est propre !</h3>
                  <p className="text-slate-500 font-medium max-w-sm text-center">Aucun avis en attente de modération.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {pendingReviews.map(rev => (
                    <ReviewCard key={rev.id} review={rev} onApprove={onApprove} onReject={onReject} />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function ReviewCard({ review, onApprove, onReject }: { review: Review; onApprove: (r: Review) => void; onReject: (id: string) => void }) {
  return (
    <motion.div layout className="bg-slate-50 border border-slate-100 rounded-3xl p-8 flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="h-10 w-10 rounded-full bg-slate-900 flex items-center justify-center text-white font-black text-xs">
          {review.user.charAt(0).toUpperCase()}
        </div>
        <div className="flex text-amber-400">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={14} fill={i < review.rating ? 'currentColor' : 'none'} />
          ))}
        </div>
      </div>
      <h4 className="font-black text-lg mb-1">{review.user}</h4>
      <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-6">
        Produit ID: {review.product_id}
      </p>
      <p className="text-slate-500 font-medium italic mb-8 flex-grow">"{review.comment}"</p>
      <div className="flex gap-4">
        <button onClick={() => onApprove(review)}
          className="flex-grow py-4 bg-emerald-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-500 transition-all">
          Approuver
        </button>
        <button onClick={() => onReject(review.id)}
          className="flex-grow py-4 bg-slate-200 text-slate-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all">
          Rejeter
        </button>
      </div>
    </motion.div>
  );
}
