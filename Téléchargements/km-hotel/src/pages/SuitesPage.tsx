import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Bed,
  Square,
  ChevronDown,
  Phone,
  Eye,
  Home
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useDataBuilder } from '../hooks/useDataBuilder';
import { DetailModal, type RoomDetail } from '../components/DetailModal';
import { useContactModal } from '../context/ContactModalContext';

const SUITE_COUNT = 2;
const FEATURE_COUNTS = [9, 10]; // features per suite

const suiteImages = [
  'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80'
];

const heroSlides = [
  {
    image:
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80',
    alt: 'Suite Exécutive KM Hotel'
  },
  {
    image:
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80',
    alt: 'Suite Présidentielle KM Hotel'
  }
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

const sectionIds = Array.from({ length: SUITE_COUNT }, (_, i) => `suite-${i}`);

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

function SuiteDetailButton({ suite, label }: { suite: RoomDetail; label: string }) {
  const [selectedSuite, setSelectedSuite] = useState<RoomDetail | null>(null);

  return (
    <>
      <button
        onClick={() => setSelectedSuite(suite)}
        className="flex items-center gap-1.5 px-5 py-3 border border-brand-600 text-brand-600 font-medium text-sm uppercase tracking-wider hover:bg-brand-50 transition-colors"
      >
        <Eye className="w-4 h-4" />
        {label}
      </button>
      <DetailModal item={selectedSuite} onClose={() => setSelectedSuite(null)} />
    </>
  );
}

export function SuitesPage() {
  const { t } = useTranslation();
  const { openModal } = useContactModal();
  const [current, setCurrent] = useState(0);
  const [activeSection, setActiveSection] = useState('');

  const suites = useDataBuilder(buildSuitesData, t);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % heroSlides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          const topmost = visible.reduce((best, curr) =>
            curr.boundingClientRect.top < best.boundingClientRect.top ? curr : best
          );
          setActiveSection(topmost.target.id);
        }
      },
      { threshold: 0.2, rootMargin: '-72px 0px -10% 0px' }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
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
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <span className="text-brand-300 font-medium tracking-[0.2em] uppercase text-sm md:text-base mb-4 block">
              {t('suites.hero.badge')}
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white font-bold mb-6 leading-tight">
              {t('suites.hero.title')}
            </h1>
            <p className="text-lg md:text-xl text-slate-200 max-w-2xl mx-auto font-light">
              {t('suites.hero.subtitle')}
            </p>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/60"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </section>

      {/* ===== ANCHOR NAVIGATION ===== */}
      <div className="sticky top-[72px] z-30 bg-white/95 backdrop-blur-sm border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-1 py-3">
            {suites.map((suite, i) => {
              const id = `suite-${i}`;
              return (
                <a
                  key={suite.name}
                  href={`#${id}`}
                  className={`flex items-center gap-2 px-5 py-2.5 text-sm font-medium uppercase tracking-wider rounded-sm transition-all duration-200 ${
                    activeSection === id
                      ? 'text-brand-600 bg-brand-50'
                      : 'text-slate-600 hover:text-brand-600 hover:bg-brand-50'
                  }`}
                >
                  <Home className="w-4 h-4" />
                  {suite.name}
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* ===== SUITES GRID ===== */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto mb-16">
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

          <div className="space-y-24">
            {suites.map((suite, index) => (
              <motion.div
                id={`suite-${index}`}
                key={suite.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className={`scroll-mt-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:direction-rtl' : ''
                }`}
              >
                <div
                  className={`relative ${
                    index % 2 === 1 ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="aspect-[4/3] overflow-hidden rounded-sm shadow-xl">
                    <img
                      src={suite.image}
                      alt={suite.name}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/10" />
                  </div>

                  <span
                    className={`absolute top-4 left-4 px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-sm ${
                      index === 1
                        ? 'bg-amber-400 text-slate-900'
                        : 'bg-brand-600 text-white'
                    }`}
                  >
                    {suite.badge}
                  </span>
                </div>

                <div
                  className={`${
                    index % 2 === 1 ? 'lg:order-1 lg:text-right' : 'lg:order-2'
                  }`}
                >
                  <h3 className="text-3xl md:text-4xl font-serif text-slate-900 mb-2">
                    {suite.name}
                  </h3>

                  <div className="flex flex-wrap gap-4 mt-4 mb-6 text-sm text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <Square className="w-4 h-4 text-brand-500" />
                      {suite.size}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-brand-500" />
                      {suite.capacity}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Bed className="w-4 h-4 text-brand-500" />
                      {suite.bed}
                    </span>
                  </div>

                  <p
                    className={`text-slate-600 font-light leading-relaxed mb-6 ${
                      index % 2 === 1 ? 'lg:ml-auto' : ''
                    }`}
                  >
                    {suite.description}
                  </p>

                  <ul
                    className={`space-y-2.5 mb-8 ${
                      index % 2 === 1 ? 'lg:flex lg:flex-col lg:items-end' : ''
                    }`}
                  >
                    {suite.features.slice(0, 6).map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-3 text-sm text-slate-700"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0" />
                        <span className="font-light">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-2xl font-serif text-brand-600">
                      {suite.price}
                    </span>
                    <div className="flex items-center gap-2">
                      <SuiteDetailButton suite={suite} label={t('suites.detailButton')} />
                      <button
                        onClick={openModal}
                        className="px-6 py-3 bg-brand-600 text-white font-medium text-sm uppercase tracking-wider hover:bg-brand-700 transition-colors"
                      >
                        {t('suites.bookButton')}
                      </button>
                    </div>
                  </div>
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
              'url("https://images.unsplash.com/photo-1563911302283-d2bc129e7570?auto=format&fit=crop&q=80")',
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
    </div>
  );
}
