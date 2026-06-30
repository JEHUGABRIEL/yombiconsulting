import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  Calendar,
  Users,
  Monitor,
  Coffee,
  Heart,
  Sparkles,
  Phone,
  Star
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useDataBuilder } from '../hooks/useDataBuilder';
import { ImageGallery } from '../components/ImageGallery';
import { useContactModal } from '../context/ContactModalContext';
import { FcfaCurrency } from '../components/FcfaCurrency';

// ── Static data ──────────────────────────────────────────────

const seminaireRoomImages = [
  {
    src: '/images/salles/715354168_1520479672776212_1918275167157583692_n.jpg',
    alt: 'Salle de conférence principale',
    label: 'Salle plénière'
  },
  {
    src: '/images/salles/717582392_1407562771203582_1894539813968121301_n.jpeg',
    alt: 'Salle de réunion moderne',
    label: 'Salle de réunion'
  },
  {
    src: '/images/salles/715990392_981274781191422_8203452834439879375_n.jpeg',
    alt: 'Grand auditorium',
    label: 'Auditorium'
  },
  {
    src: '/images/salles/730332558_1555637016227635_6869706089490226393_n.jpeg',
    alt: 'Salle de présentation',
    label: 'Espace conférence'
  }
];

const mariageImages = [
  {
    src: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80',
    alt: 'Réception de mariage',
    label: 'Salle de réception'
  },
  {
    src: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80',
    alt: 'Décoration de table élégante',
    label: 'Décoration raffinée'
  },
  {
    src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80',
    alt: 'Cérémonie en extérieur',
    label: 'Espace extérieur'
  },
  {
    src: 'https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&q=80',
    alt: 'Décoration de mariage',
    label: 'Ambiance sur mesure'
  }
];

const heroSlides = [
  {
    image:
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80',
    alt: 'Salle de conférence KM Hotel'
  },
  {
    image:
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80',
    alt: 'Mariage KM Hotel'
  },
  {
    image:
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80',
    alt: 'Événement KM Hotel'
  },
  {
    image:
      'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80',
    alt: 'Réception KM Hotel'
  }
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

const featureIcons = [
  <Users className="w-5 h-5" />,
  <Monitor className="w-5 h-5" />,
  <Monitor className="w-5 h-5" />,
  <Coffee className="w-5 h-5" />,
  <Coffee className="w-5 h-5" />,
  <Coffee className="w-5 h-5" />
];

const highlightIcons = [
  <Users className="w-5 h-5" />,
  <Sparkles className="w-5 h-5" />,
  <Star className="w-5 h-5" />,
  <Calendar className="w-5 h-5" />,
  <Sparkles className="w-5 h-5" />,
  <Heart className="w-5 h-5" />
];

// ── Builder functions ────────────────────────────────────────

function buildSeminarsFeatures(t: (key: string) => string) {
  return [0, 1, 2, 3, 4, 5].map((i) => ({
    icon: featureIcons[i],
    text: t(`evenements.seminaires.features.${i}`)
  }));
}

function buildSeminairesOptions(t: (key: string) => string) {
  return [0, 1, 2].map((i) => ({
    title: t(`evenements.seminaires.options.${i}.title`),
    desc: t(`evenements.seminaires.options.${i}.desc`),
    price: t(`evenements.seminaires.options.${i}.price`)
  }));
}

function buildMariagesHighlights(t: (key: string) => string) {
  return [0, 1, 2, 3, 4, 5].map((i) => ({
    icon: highlightIcons[i],
    text: t(`evenements.mariages.highlights.${i}`)
  }));
}

const sectionIds = ['seminaires', 'mariages'];

// ── Component ────────────────────────────────────────────────

export function EvenementsPage() {
  const { t } = useTranslation();
  const { openModal } = useContactModal();
  const [current, setCurrent] = useState(0);
  const [activeSection, setActiveSection] = useState('');
  const heroSlidesData = t('evenements.hero.slides', { returnObjects: true }) as { badge: string; title: string }[];
  const currentSlide = heroSlidesData?.[current] ?? { badge: '', title: '' };

  const seminairesFeatures = useDataBuilder(buildSeminarsFeatures, t);
  const seminairesOptions = useDataBuilder(buildSeminairesOptions, t);
  const mariagesHighlights = useDataBuilder(buildMariagesHighlights, t);

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

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % heroSlides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

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
            <div className="absolute inset-0 bg-slate-900/55 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-900/20 to-slate-900/80" />
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
              {t('evenements.intro.badge')}
            </h2>
            <h3 className="text-4xl font-serif text-slate-900 mb-6">
              {t('evenements.intro.title')}
            </h3>
            <p className="text-slate-600 font-light leading-relaxed">
              {t('evenements.intro.text')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== ANCHOR NAVIGATION ===== */}
      <div className="sticky top-[72px] z-30 bg-white/95 backdrop-blur-sm border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-1 py-3">
            <a
              href="#seminaires"
              className={`flex items-center gap-2 px-5 py-2.5 text-sm font-medium uppercase tracking-wider rounded-sm transition-all duration-200 ${
                activeSection === 'seminaires'
                  ? 'text-brand-600 bg-brand-50'
                  : 'text-slate-600 hover:text-brand-600 hover:bg-brand-50'
              }`}
            >
              <Monitor className="w-4 h-4" />
              {t('evenements.seminaires.badge')}
            </a>
            <div className="w-px h-5 bg-slate-300" />
            <a
              href="#mariages"
              className={`flex items-center gap-2 px-5 py-2.5 text-sm font-medium uppercase tracking-wider rounded-sm transition-all duration-200 ${
                activeSection === 'mariages'
                  ? 'text-rose-600 bg-rose-50'
                  : 'text-slate-600 hover:text-rose-500 hover:bg-rose-50'
              }`}
            >
              <Heart className="w-4 h-4" />
              {t('evenements.mariages.badge')}
            </a>
          </div>
        </div>
      </div>

      {/* ===== SÉMINAIRES & CONFÉRENCES ===== */}
      <section id="seminaires" className="py-24 bg-slate-50 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-2 text-brand-600 mb-3">
              <Monitor className="w-5 h-5" />
              <span className="font-medium tracking-widest uppercase text-sm">
                {t('evenements.seminaires.badge')}
              </span>
            </div>
            <h3 className="text-4xl font-serif text-slate-900 mb-4">
              {t('evenements.seminaires.title')}
            </h3>
            <p className="text-slate-600 font-light">
              {t('evenements.seminaires.subtitle')}
            </p>
          </motion.div>

          {/* Feature grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-16"
          >
            {seminairesFeatures.map((feat, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center p-4 bg-white rounded-sm border border-slate-100 hover:bg-brand-50 hover:border-brand-200 transition-all duration-300 group"
              >
                <div className="text-brand-500 mb-2 group-hover:scale-110 transition-transform duration-300">
                  {feat.icon}
                </div>
                <span className="text-xs text-slate-600 font-light leading-tight">
                  {feat.text}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Conference room gallery */}
          <ImageGallery
            images={seminaireRoomImages}
            title={t('evenements.seminaires.galleryTitle')}
            columns={4}
            className="mb-16"
          />

          {/* Options cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {seminairesOptions.map((option, index) => (
              <motion.div
                key={option.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white border border-slate-100 rounded-sm p-8 text-center hover:shadow-lg transition-shadow duration-300 group"
              >
                <div className="w-14 h-14 bg-brand-50 text-brand-600 rounded-full flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                  {index === 0 ? <Coffee className="w-6 h-6" /> : index === 1 ? <Calendar className="w-6 h-6" /> : <Star className="w-6 h-6" />}
                </div>
                <h4 className="text-xl font-serif text-slate-900 mb-2">{option.title}</h4>
                <p className="text-sm text-slate-500 font-light mb-4">{option.desc}</p>
                <FcfaCurrency price={option.price} className="text-brand-600 font-serif text-lg" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MARIAGES & RÉCEPTIONS ===== */}
      <section id="mariages" className="py-24 bg-white scroll-mt-24 relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-2 text-rose-500 mb-3">
              <Heart className="w-5 h-5" />
              <span className="font-medium tracking-widest uppercase text-sm text-rose-500">
                {t('evenements.mariages.badge')}
              </span>
            </div>
            <h3 className="text-4xl font-serif text-slate-900 mb-4">
              {t('evenements.mariages.title')}
            </h3>
            <p className="text-slate-600 font-light">
              {t('evenements.mariages.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="aspect-[4/3] overflow-hidden rounded-sm shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80"
                  alt="Mariage KM Hotel"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-slate-600 font-light leading-relaxed mb-8">
                {t('evenements.mariages.text')}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {mariagesHighlights.map((h, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3 bg-rose-50/50 rounded-sm"
                  >
                    <div className="text-rose-400 mt-0.5 shrink-0">
                      {h.icon}
                    </div>
                    <span className="text-sm text-slate-700 font-light">
                      {h.text}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Wedding gallery */}
          <ImageGallery
            images={mariageImages}
            title={t('evenements.mariages.galleryTitle')}
            columns={4}
            className="mt-16"
          />
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80")',
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
              {t('evenements.cta.title')}
            </h2>
            <p className="text-slate-300 font-light text-lg mb-10 max-w-2xl mx-auto">
              {t('evenements.cta.text')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={openModal}
                className="px-8 py-4 bg-brand-600 text-white font-medium tracking-wide hover:bg-brand-700 transition-colors"
              >
                {t('evenements.cta.button')}
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
