import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Minus, Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const heroSlides = [
  {
    image: '/images/accueil/715330789_1520479792776200_2441928460111710755_n.jpg',
    alt: 'Accueil du KM Hotel'
  },
  {
    image: '/images/salles/730332558_1555637016227635_6869706089490226393_n.jpeg',
    alt: "Hall d'entrée du KM Hotel"
  },
  {
    image: '/images/salles/716170411_1520481436109369_3501784672869103090_n.jpg',
    alt: 'Salle du KM Hotel'
  },
  {
    image: '/images/couloirs/715360530_1520475089443337_6989017037732005367_n.jpg',
    alt: 'Couloir du KM Hotel'
  }
];

const textVariants = {
  enter: { opacity: 0, y: 30 },
  center: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: 'easeIn' } }
};

const badgeVariants = {
  enter: { opacity: 0, y: 15 },
  center: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.1, ease: 'easeOut' } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: 'easeIn' } }
};

const ctaVariants = {
  enter: { opacity: 0, y: 15 },
  center: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: 'easeIn' } }
};

export function Hero() {
  const { t } = useTranslation();
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [room, setRoom] = useState(1);

  const slides = t('hero.slides', { returnObjects: true }) as Array<{
    badge: string;
    title: string;
    titleAccent: string;
    subtitle: string;
  }>;

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % heroSlides.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  const currentSlide = slides?.[current] ?? {
    badge: '',
    title: '',
    titleAccent: ''
  };

  return (
    <section
      className="relative h-screen flex items-center justify-center overflow-hidden group/slider"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Slideshow */}
      {heroSlides.map((slide, index) => (
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
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-900/80" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={`hero-text-${current}`}
            variants={textVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            {/* Badge */}
            <motion.span
              key={`badge-${current}`}
              variants={badgeVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="inline-block text-brand-300/80 font-light tracking-[6px] uppercase text-sm md:text-base mb-6"
            >
              {currentSlide.badge}
            </motion.span>

            {/* Title */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-white font-light mb-4 leading-[1.3] tracking-[6px]">
              {currentSlide.title}
              <br />
              <span className="italic font-light text-brand-200">{currentSlide.titleAccent}</span>
            </h1>

            {/* CTA */}
            <motion.div
              key={`cta-${current}`}
              variants={ctaVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <a
                href="/chambres"
                className="inline-block bg-transparent border border-white text-white font-medium text-[13px] uppercase tracking-[2px] px-7 py-3 transition-all duration-300 ease-in-out hover:bg-white hover:text-black"
              >
                {t('hero.ctaDiscover')}
              </a>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Booking Bar - Bottom (desktop only) */}
      <div className="hidden lg:block absolute bottom-0 left-0 right-0 z-10 pb-8 lg:pb-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-white shadow-2xl rounded-none p-1 flex items-center divide-x divide-slate-100">
            {/* Check In */}
            <div className="flex-1 px-5 py-4">
              <label className="block text-[0.65rem] font-bold uppercase tracking-[0.15em] text-slate-400 mb-1.5">
                Check In
              </label>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-brand-500 shrink-0" />
                <input
                  type="date"
                  className="w-full bg-transparent text-sm text-[#222] font-normal outline-none border-none [color-scheme:light]"
                  defaultValue=""
                  placeholder="Select date"
                />
              </div>
            </div>

            {/* Check Out */}
            <div className="flex-1 px-5 py-4">
              <label className="block text-[0.65rem] font-bold uppercase tracking-[0.15em] text-slate-400 mb-1.5">
                Check Out
              </label>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-brand-500 shrink-0" />
                <input
                  type="date"
                  className="w-full bg-transparent text-sm text-[#222] font-normal outline-none border-none [color-scheme:light]"
                  defaultValue=""
                  placeholder="Select date"
                />
              </div>
            </div>

            {/* Adults */}
            <div className="flex-1 px-5 py-4">
              <label className="block text-[0.65rem] font-bold uppercase tracking-[0.15em] text-slate-400 mb-1.5">
                Adult
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setAdults(Math.max(1, adults - 1))}
                  className="w-7 h-7 flex items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:border-brand-400 hover:text-brand-600 transition-colors"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="text-sm font-semibold text-slate-800 w-5 text-center">
                  {adults}
                </span>
                <button
                  onClick={() => setAdults(Math.min(10, adults + 1))}
                  className="w-7 h-7 flex items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:border-brand-400 hover:text-brand-600 transition-colors"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Children */}
            <div className="flex-1 px-5 py-4">
              <label className="block text-[0.65rem] font-bold uppercase tracking-[0.15em] text-slate-400 mb-1.5">
                Children
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setChildren(Math.max(0, children - 1))}
                  className="w-7 h-7 flex items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:border-brand-400 hover:text-brand-600 transition-colors"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="text-sm font-semibold text-slate-800 w-5 text-center">
                  {children}
                </span>
                <button
                  onClick={() => setChildren(Math.min(10, children + 1))}
                  className="w-7 h-7 flex items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:border-brand-400 hover:text-brand-600 transition-colors"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Room */}
            <div className="flex-1 px-5 py-4">
              <label className="block text-[0.65rem] font-bold uppercase tracking-[0.15em] text-slate-400 mb-1.5">
                Room
              </label>
              <select
                value={room}
                onChange={(e) => setRoom(Number(e.target.value))}
                className="w-full bg-transparent text-sm font-normal text-[#222] outline-none border-none cursor-pointer"
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n} Room{n > 1 ? 's' : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* CTA Button */}
            <div className="px-3 py-4">
              <button
                className="w-auto bg-[#bfa37a] hover:bg-[#ad8f68] text-white font-semibold text-sm uppercase tracking-[1.5px] px-8 py-3 transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <Calendar className="w-4 h-4" />
                Check Now
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
