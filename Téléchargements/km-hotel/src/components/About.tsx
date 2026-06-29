import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Trans } from 'react-i18next';

export function About() {
  const { t } = useTranslation();
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] overflow-hidden rounded-sm">
              <img
                src="https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80"
                alt={t('about.imgAlt1')}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-2/3 aspect-square border-8 border-white overflow-hidden rounded-sm hidden md:block shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1551882547-ff40c0d13c05?auto=format&fit=crop&q=80"
                alt={t('about.imgAlt2')}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:pl-8"
          >
            <h2 className="text-brand-600 font-medium tracking-widest uppercase text-sm mb-3">
              {t('about.badge')}
            </h2>
            <h3 className="text-4xl font-serif text-slate-900 mb-6 leading-tight">
              {t('about.title')}
            </h3>

            <div className="space-y-6 text-slate-600 font-light leading-relaxed">
              <p>
                <Trans i18nKey="about.p1" />
              </p>
              <p>{t('about.p2')}</p>
              <p>{t('about.p3')}</p>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-8 border-t border-slate-100 pt-8">
              <div>
                <p className="text-4xl font-serif text-brand-600 mb-2">31</p>
                <p className="text-sm text-slate-500 uppercase tracking-wider">
                  {t('about.statRooms')}
                </p>
              </div>
              <div>
                <p className="text-4xl font-serif text-brand-600 mb-2">3★</p>
                <p className="text-sm text-slate-500 uppercase tracking-wider">
                  {t('about.statStars')}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
