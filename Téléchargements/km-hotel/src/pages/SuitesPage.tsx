import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Phone, BedDouble, Bath, Utensils, Wifi } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useDataBuilder } from '../hooks/useDataBuilder';
import { DetailModal, type RoomDetail } from '../components/DetailModal';
import { useContactModal } from '../context/ContactModalContext';
import { FcfaCurrency } from '../components/FcfaCurrency';

const FEATURE_COUNTS = [9, 10];

const suiteImages = [
  '/images/salles/716170411_1520481436109369_3501784672869103090_n.jpg',
  '/images/salles/730332558_1555637016227635_6869706089490226393_n.jpeg'
];

const heroSlides = [
  {
    image: '/images/salles/716170411_1520481436109369_3501784672869103090_n.jpg',
    alt: 'Suite Exécutive KM Hotel'
  },
  {
    image: '/images/salles/730332558_1555637016227635_6869706089490226393_n.jpeg',
    alt: 'Suite Présidentielle KM Hotel'
  }
];

const hoverAmenityIcons = [BedDouble, Bath, Utensils, Wifi];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

function buildSuitesData(t: (key: string) => string): RoomDetail[] {
  return [0, 1].map((i) => ({
    type: 'room' as const,
    name: t(`suites.suites.${i}.name`),
    price: t(`suites.suites.${i}.price`),
    size: t(`suites.suites.${i}.size`),
    capacity: t(`suites.suites.${i}.capacity`),
    bed: t(`suites.suites.${i}.bed`),
    description: t(`suites.suites.${i}.description`),
    features: Array.from({ length: FEATURE_COUNTS[i] }, (_, d) =>
      t(`suites.suites.${i}.features.${d}`)
    ),
    image: suiteImages[i],
    badge: t(`suites.suites.${i}.badge`)
  }));
}

export function SuitesPage() {
  const { t } = useTranslation();
  const { openModal } = useContactModal();
  const [current, setCurrent] = useState(0);
  const [selectedSuite, setSelectedSuite] = useState<RoomDetail | null>(null);

  const heroSlidesData = t('suites.hero.slides', { returnObjects: true }) as { badge: string; title: string }[];
  const currentSlide = heroSlidesData?.[current] ?? { badge: '', title: '' };

  const suites = useDataBuilder(buildSuitesData, t);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % heroSlides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div className="min-h-screen bg-white">
      {/* ===== HERO ===== */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
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
            <div className="absolute inset-0 bg-slate-900/60 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-900/30 to-slate-900/80" />
          </div>
        ))}

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <span className="text-brand-300 font-medium tracking-[0.2em] uppercase text-sm md:text-base mb-4 block">
                {currentSlide.badge}
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white font-bold mb-6 leading-tight">
                {currentSlide.title}
              </h1>
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/60"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </section>

      {/* ===== INTRODUCTION ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto">
            <h2 className="text-brand-600 font-medium tracking-widest uppercase text-sm mb-3">
              {t('suites.intro.badge')}
            </h2>
            <h3 className="text-4xl font-serif text-slate-900 mb-6">
              {t('suites.intro.title')}
            </h3>
            <p className="text-slate-600 font-light leading-relaxed">
              {t('suites.intro.text')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== SUITES GRID ===== */}
      <section className="py-[100px] max-md:py-[60px] bg-[#f9f6f0]">
        <div className="max-w-[1140px] mx-auto px-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px] max-md:gap-5">
            {suites.map((suite, index) => (
              <motion.div
                key={suite.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative w-full aspect-[4/5] overflow-hidden cursor-pointer bg-white mx-auto"
                style={suites.length === 1 ? { gridColumn: '2 / 3' } : {}}
              >
                {/* Image */}
                <img
                  src={suite.image}
                  alt={suite.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />

                {/* Booking Tag */}
                <div className="absolute top-0 right-[25px] bg-[#222222] z-[3] px-[8px] pt-[15px] pb-[20px]">
                  <span className="font-sans text-white text-[10px] tracking-[2px] uppercase block leading-none" style={{ writingMode: 'vertical-rl' }}>
                    BOOKING
                  </span>
                </div>

                {/* Bottom Details (price + name on gradient) */}
                <div className="absolute bottom-0 left-0 w-full z-[2] px-[30px] pb-[40px] pt-[40px] box-border"
                  style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.8))' }}
                >
                  <p className="font-sans text-[#bfa37a] text-[12px] font-medium uppercase tracking-[2px] mb-[5px]">
                    <FcfaCurrency price={suite.price} />
                  </p>
                  <h3 className="font-serif text-white text-[24px] font-normal m-0">
                    {suite.name}
                  </h3>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-[1]">
                  {/* Amenity Icons */}
                  <div className="flex gap-[15px] mb-5">
                    {hoverAmenityIcons.map((Icon, i) => (
                      <Icon key={i} className="w-[22px] h-[22px] text-white" />
                    ))}
                  </div>

                  {/* DETAILS Button */}
                  <button
                    onClick={(e) => { e.stopPropagation(); setSelectedSuite(suite); }}
                    className="font-sans text-white text-[12px] uppercase tracking-[2px] no-underline border-b border-white pb-[2px] hover:text-[#bfa37a] hover:border-[#bfa37a] transition-colors duration-300"
                  >
                    {t('suites.detailButton')}
                  </button>

                  {/* BOOKING Button */}
                  <button
                    onClick={(e) => { e.stopPropagation(); openModal(); }}
                    className="mt-4 font-sans text-white text-[11px] uppercase tracking-[2px] px-5 py-2 border border-white/50 hover:bg-white hover:text-[#222] transition-all duration-300"
                  >
                    {t('suites.bookButton')}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'url("/images/chambres/718118971_1000553526056865_5978524769432572536_n.jpeg")',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundAttachment: 'fixed'
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-serif mb-6 leading-tight">
              {t('suites.cta.title')}
            </h2>
            <p className="text-slate-300 font-light text-lg mb-10 max-w-2xl mx-auto">
              {t('suites.cta.text')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={openModal}
                className="px-8 py-4 bg-brand-600 text-white font-medium tracking-wide hover:bg-brand-700 transition-colors"
              >
                {t('suites.cta.button')}
              </button>
              <a
                href="tel:+23675494969"
                className="flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/30 hover:bg-white/20 transition-colors"
              >
                <Phone className="w-4 h-4" />
                +236 75 49 49 69
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <DetailModal item={selectedSuite} onClose={() => setSelectedSuite(null)} />
    </div>
  );
}
