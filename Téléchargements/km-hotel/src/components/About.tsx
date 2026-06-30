import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { motion } from 'framer-motion';
import { Calendar, Star } from 'lucide-react';

const aboutSlides = [
  {
    src: '/images/accueil/715360332_1520481719442674_7442289924839588376_n.jpg',
    altKey: 'about.imgAlt1'
  },
  {
    src: '/images/vue generale/711368992_1520475199443326_5136543548879226338_n.jpg',
    altKey: 'about.imgAlt1'
  },
  {
    src: '/images/salles/715501064_1520480982776081_4982796264975860234_n.jpg',
    altKey: 'about.imgAlt1'
  },
  {
    src: '/images/Piscine/715790289_1520474689443377_7403351497039086571_n.jpg',
    altKey: 'about.imgAlt2'
  }
];

export function About() {
  const { t } = useTranslation();
  const [aboutCurrent, setAboutCurrent] = useState(0);

  const aboutNext = useCallback(() => {
    setAboutCurrent((prev) => (prev + 1) % aboutSlides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(aboutNext, 5000);
    return () => clearInterval(timer);
  }, [aboutNext]);
  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              'radial-gradient(circle at 25px 25px, #000 1px, transparent 0)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Main image - Carousel */}
            <div className="aspect-[4/5] overflow-hidden rounded-sm shadow-xl relative group">
              {aboutSlides.map((slide, index) => (
                <img
                  key={slide.src}
                  src={slide.src}
                  alt={t(slide.altKey)}
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out group-hover:scale-105"
                  style={{ opacity: index === aboutCurrent ? 1 : 0 }}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Slide Dots */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
                {aboutSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setAboutCurrent(index)}
                    className={`transition-all duration-300 ${
                      index === aboutCurrent
                        ? 'w-5 h-1.5 bg-white'
                        : 'w-1.5 h-1.5 bg-white/50 hover:bg-white/70'
                    }`}
                    aria-label={`Slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Offset image */}
            <div className="absolute -bottom-8 -right-8 w-2/3 aspect-square border-8 border-white overflow-hidden rounded-sm hidden md:block shadow-xl">
              <img
                src="/images/accueil/714955422_1539365217603523_2794173171042398636_n.jpeg"
                alt={t('about.imgAlt2')}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Stars badge on image - top right */}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-sm shadow-sm hidden md:flex items-center gap-1.5 z-10">
              {[1, 2, 3].map((i) => (
                <Star
                  key={i}
                  className="w-3.5 h-3.5 fill-current text-brand-500"
                />
              ))}
              <span className="text-[10px] font-semibold text-slate-700 uppercase tracking-wider ml-0.5">
                {t('about.statStars')}
              </span>
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
            <span className="text-brand-600 font-medium tracking-widest uppercase text-sm mb-3 block">
              {t('about.badge')}
            </span>
            <h3 className="text-4xl font-serif text-slate-900 mb-6 leading-tight">
              {t('about.title')}
            </h3>

            <div className="space-y-5 text-slate-600 font-light leading-relaxed">
              <p>
                <Trans i18nKey="about.p1" />
              </p>
              <p>{t('about.p2')}</p>
              <p>{t('about.p3')}</p>
            </div>

            {/* Timeline milestone */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8 flex items-start gap-4 p-4 bg-brand-50/50 border-l-2 border-brand-500 rounded-sm"
            >
              <Calendar className="w-5 h-5 text-brand-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-slate-900">5 Juin 2026</p>
                <p className="text-xs text-slate-500 font-light">
                  {t('about.p2')}
                </p>
              </div>
            </motion.div>


          </motion.div>
        </div>
      </div>
    </section>
  );
}
