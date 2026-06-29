import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    image:
      'https://images.unsplash.com/photo-1542314831-c6a4d14d4c57?auto=format&fit=crop&q=80',
    alt: 'Façade du KM Hotel'
  },
  {
    image:
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80',
    alt: 'Hall d\'entrée luxueux'
  },
  {
    image:
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80',
    alt: 'Intérieur élégant du KM Hotel'
  },
  {
    image:
      'https://images.unsplash.com/photo-1551882547-ff40c0d13c05?auto=format&fit=crop&q=80',
    alt: 'Vue aérienne de l\'établissement'
  }
];

export function Hero() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden group/slider"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.image}
          className="absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out"
          style={{
            backgroundImage: `url("${slide.image}")`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            opacity: index === current ? 1 : 0
          }}
        >
          <div className="absolute inset-0 bg-slate-900/50 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-transparent to-slate-900/80" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-20">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <span className="text-brand-300 font-medium tracking-[0.2em] uppercase text-sm md:text-base mb-4 block">
            Nouvelle pépite de l'hôtellerie à Bangui
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white font-bold mb-6 leading-tight">
            L'Élégance & Le Confort <br className="hidden md:block" />
            <span className="italic font-light text-brand-100">
              au cœur de la capitale
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-200 mb-10 max-w-2xl mx-auto font-light">
            Découvrez un boutique hôtel 3 étoiles au design raffiné, offrant un
            accueil chaleureux et des services de standing international.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/contact"
              className="px-8 py-4 bg-brand-600 text-white font-medium tracking-wide hover:bg-brand-700 transition-colors w-full sm:w-auto text-center"
            >
              Réserver votre séjour
            </a>
            <a
              href="/#about"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-medium tracking-wide border border-white/30 hover:bg-white/20 transition-colors w-full sm:w-auto text-center"
            >
              Découvrir l'hôtel
            </a>
          </div>
        </motion.div>
      </div>

      {/* Arrow Navigation */}
      <button
        onClick={prev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/25 transition-all duration-300 opacity-0 hover:opacity-100 focus:opacity-100 group-hover/slider:opacity-100"
        aria-label="Image précédente"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/25 transition-all duration-300 opacity-0 hover:opacity-100 focus:opacity-100"
        aria-label="Image suivante"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-20 md:bottom-24 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`rounded-full transition-all duration-500 ${
              index === current
                ? 'w-8 h-2.5 bg-white'
                : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Aller à l'image ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/60"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ChevronDown className="w-8 h-8" />
      </motion.div>
    </section>
  );
}
