import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useContactModal } from '../context/ContactModalContext';

export function ContactModal() {
  const { t } = useTranslation();
  const { isOpen, closeModal } = useContactModal();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="contact-modal-overlay"
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={closeModal}
          />

          {/* Modal */}
          <motion.div
            key="contact-modal"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative w-full max-w-lg bg-white shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-xl font-serif text-slate-900">
                  {t('contact.formTitle')}
                </h3>
                <p className="text-sm text-slate-500 font-light mt-0.5">
                  {t('contact.subtitle')}
                </p>
              </div>
              <button
                onClick={closeModal}
                className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all rounded-sm"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form
              className="px-6 py-6 space-y-4"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">
                    {t('contact.formName')}
                  </label>
                  <input
                    type="text"
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                    placeholder={t('contact.formPlaceholderName')}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">
                    {t('contact.formContact')}
                  </label>
                  <input
                    type="text"
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                    placeholder={t('contact.formPlaceholderContact')}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">
                    {t('contact.formArrival')}
                  </label>
                  <input
                    type="date"
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all text-slate-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">
                    {t('contact.formDeparture')}
                  </label>
                  <input
                    type="date"
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all text-slate-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  {t('contact.formMessage')}
                </label>
                <textarea
                  rows={3}
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all resize-none"
                  placeholder={t('contact.formPlaceholder')}
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  type="submit"
                  className="w-full sm:flex-1 bg-brand-600 text-white font-medium py-3 rounded-sm hover:bg-brand-700 transition-colors text-sm uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  {t('contact.formSubmit')}
                </button>
                <a
                  href="tel:+23675494969"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 border border-brand-600 text-brand-600 rounded-sm hover:bg-brand-50 transition-colors text-sm font-medium"
                >
                  <Phone className="w-4 h-4" />
                  +236 75 49 49 69
                </a>
              </div>

              <p className="text-[11px] text-center text-slate-400 pt-1">
                {t('contact.formHint')}
              </p>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
