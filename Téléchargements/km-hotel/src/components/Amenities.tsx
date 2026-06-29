import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Wifi, Zap, Droplets, Coffee, UtensilsCrossed, Users } from 'lucide-react';

const serviceIcons = [
  <Zap className="w-8 h-8" />,
  <Droplets className="w-8 h-8" />,
  <Wifi className="w-8 h-8" />,
  <UtensilsCrossed className="w-8 h-8" />,
  <Coffee className="w-8 h-8" />,
  <Users className="w-8 h-8" />
];

export function Amenities() {
  const { t } = useTranslation();
  const items = t('amenities.items', { returnObjects: true }) as Array<{ title: string; desc: string }>;

  return (
    <section id="services" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-brand-600 font-medium tracking-widest uppercase text-sm mb-3">
            {t('amenities.badge')}
          </h2>
          <h3 className="text-4xl font-serif text-slate-900 mb-6">
            {t('amenities.title')}
          </h3>
          <p className="text-slate-600 font-light">
            {t('amenities.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((service: { title: string; desc: string }, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-sm shadow-sm hover:shadow-md transition-shadow border border-slate-100"
            >
              <div className="text-brand-500 mb-6 bg-brand-50 w-16 h-16 flex items-center justify-center rounded-full">
                {serviceIcons[index]}
              </div>
              <h4 className="text-xl font-serif text-slate-900 mb-3">
                {service.title}
              </h4>
              <p className="text-slate-600 font-light text-sm leading-relaxed">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
