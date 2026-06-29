import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Phone, MapPin, Clock } from 'lucide-react';

export function Contact() {
  const { t } = useTranslation();
  return (
    <section id="contact" className="py-24 bg-brand-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-brand-600 font-medium tracking-widest uppercase text-sm mb-3">
              {t('contact.badge')}
            </h2>
            <h3 className="text-4xl font-serif text-slate-900 mb-6">
              {t('contact.title')}
            </h3>
            <p className="text-slate-600 font-light mb-10">
              {t('contact.subtitle')}
            </p>

            <div className="space-y-8">
              <div className="flex items-start">
                <div className="bg-white p-3 rounded-full shadow-sm mr-4 text-brand-600">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif text-lg text-slate-900 mb-1">{t('contact.phone')}</h4>
                  <p className="text-slate-600 font-light">{t('contact.phoneLabel')}</p>
                  <a
                    href="tel:+23675494969"
                    className="text-xl font-medium text-brand-600 hover:text-brand-700 transition-colors"
                  >
                    +236 75 49 49 69
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-white p-3 rounded-full shadow-sm mr-4 text-brand-600">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif text-lg text-slate-900 mb-1">{t('contact.address')}</h4>
                  <p className="text-slate-600 font-light">
                    {t('contact.addressLine1')}<br />
                    {t('contact.addressLine2')}<br />
                    {t('contact.addressLine3')}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-white p-3 rounded-full shadow-sm mr-4 text-brand-600">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif text-lg text-slate-900 mb-1">{t('contact.reception')}</h4>
                  <p className="text-slate-600 font-light">
                    {t('contact.receptionLine1')}<br />
                    {t('contact.receptionLine2')}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form (Visual only for demo) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white p-8 md:p-10 rounded-sm shadow-xl border border-slate-100"
          >
            <h4 className="text-2xl font-serif text-slate-900 mb-6">{t('contact.formTitle')}</h4>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {t('contact.formName')}
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-slate-200 rounded-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                    placeholder={t('contact.formPlaceholderName')}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {t('contact.formContact')}
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-slate-200 rounded-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                    placeholder={t('contact.formPlaceholderContact')}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {t('contact.formArrival')}
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 border border-slate-200 rounded-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all text-slate-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {t('contact.formDeparture')}
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 border border-slate-200 rounded-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all text-slate-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  {t('contact.formMessage')}
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 border border-slate-200 rounded-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all resize-none"
                  placeholder={t('contact.formPlaceholder')}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-brand-600 text-white font-medium py-4 rounded-sm hover:bg-brand-700 transition-colors uppercase tracking-wider text-sm"
              >
                {t('contact.formSubmit')}
              </button>
              <p className="text-xs text-center text-slate-500 mt-4">
                {t('contact.formHint')}
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
