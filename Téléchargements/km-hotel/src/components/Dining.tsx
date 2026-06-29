import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export function Dining() {
  const { t } = useTranslation();
  return (
    <section id="dining" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Pattern/Image subtle overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80")',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-brand-400 font-medium tracking-widest uppercase text-sm mb-3">
              {t('dining.badge')}
            </h2>
            <h3 className="text-4xl font-serif mb-6 leading-tight">
              {t('dining.title')} <br /> {t('dining.titleBr')}
            </h3>

            <div className="space-y-6 text-slate-300 font-light leading-relaxed mb-8">
              <p>{t('dining.p1')}</p>
              <p>{t('dining.p2')}</p>
            </div>

            <div className="flex items-center space-x-8">
              <div>
                <p className="font-serif text-xl text-white mb-1">{t('dining.breakfast')}</p>
                <p className="text-sm text-slate-400">{t('dining.breakfastHours')}</p>
              </div>
              <div>
                <p className="font-serif text-xl text-white mb-1">{t('dining.dinner')}</p>
                <p className="text-sm text-slate-400">{t('dining.dinnerHours')}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-4"
          >
            <img
              src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&q=80"
              alt={t('dining.imgAlt1')}
              className="w-full h-64 object-cover rounded-sm mt-8"
            />
            <img
              src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80"
              alt={t('dining.imgAlt2')}
              className="w-full h-64 object-cover rounded-sm"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
