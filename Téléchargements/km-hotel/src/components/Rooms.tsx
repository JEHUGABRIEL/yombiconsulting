import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export function Rooms() {
  const { t } = useTranslation();
  return (
    <section id="rooms" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="max-w-2xl">
            <h2 className="text-brand-600 font-medium tracking-widest uppercase text-sm mb-3">
              {t('rooms.badge')}
            </h2>
            <h3 className="text-4xl font-serif text-slate-900 mb-4">
              {t('rooms.title')}
            </h3>
            <p className="text-slate-600 font-light">
              {t('rooms.subtitle')}
            </p>
          </div>
          <a
            href="#contact"
            className="mt-6 md:mt-0 hidden md:inline-block border-b border-brand-600 text-brand-600 hover:text-brand-800 hover:border-brand-800 pb-1 transition-colors uppercase tracking-wider text-sm font-medium"
          >
            {t('rooms.cta')}
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Room Type 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group cursor-pointer"
          >
            <div className="relative aspect-[4/3] overflow-hidden mb-6">
              <img
                src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80"
                alt={t('rooms.card1.imgAlt')}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
            </div>
            <h4 className="text-2xl font-serif text-slate-900 mb-2">
              {t('rooms.card1.name')}
            </h4>
            <p className="text-slate-500 font-light mb-4">
              {t('rooms.card1.desc')}
            </p>
          </motion.div>

          {/* Room Type 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group cursor-pointer"
          >
            <div className="relative aspect-[4/3] overflow-hidden mb-6">
              <img
                src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80"
                alt={t('rooms.card2.imgAlt')}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
            </div>
            <h4 className="text-2xl font-serif text-slate-900 mb-2">
              {t('rooms.card2.name')}
            </h4>
            <p className="text-slate-500 font-light mb-4">
              {t('rooms.card2.desc')}
            </p>
          </motion.div>
        </div>

        <div className="mt-8 text-center md:hidden">
          <a
            href="#contact"
            className="inline-block border border-brand-600 text-brand-600 px-6 py-3 uppercase tracking-wider text-sm font-medium w-full"
          >
            {t('rooms.cta')}
          </a>
        </div>
      </div>
    </section>
  );
}
