import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  Wifi,
  Tv,
  Snowflake,
  Bath,
  Coffee,
  Users,
  Bed,
  Square,
  ChevronDown,
  Shield,
  Zap,
  Droplets,
  Phone,
  Eye,
  Home
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useDataBuilder } from '../hooks/useDataBuilder';
import { DetailModal, type RoomDetail } from '../components/DetailModal';
import { useContactModal } from '../context/ContactModalContext';

const ROOM_COUNT = 2;
const FEATURE_COUNTS = [8, 9]; // features per room

const roomImages = [
  'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80'
];

const heroSlides = [
  {
    image:
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80',
    alt: 'Chambre luxueuse KM Hotel'
  },
  {
    image:
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80',
    alt: 'Chambre Confort KM Hotel'
  },
  {
    image:
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80',
    alt: 'Chambre Deluxe KM Hotel'
  }
];

const amenityIcons = [
  <Zap className="w-5 h-5" />,
  <Droplets className="w-5 h-5" />,
  <Wifi className="w-5 h-5" />,
  <Tv className="w-5 h-5" />,
  <Snowflake className="w-5 h-5" />,
  <Shield className="w-5 h-5" />,
  <Coffee className="w-5 h-5" />,
  <Bath className="w-5 h-5" />
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

const sectionIds = Array.from({ length: ROOM_COUNT }, (_, i) => `room-${i}`);

function buildRoomsData(t: (key: string) => string): RoomDetail[] {
  return [0, 1].map((i) => ({
    type: 'room' as const,
    name: t(`chambres.rooms.${i}.name`),
    price: t(`chambres.rooms.${i}.price`),
    size: t(`chambres.rooms.${i}.size`),
    capacity: t(`chambres.rooms.${i}.capacity`),
    bed: t(`chambres.rooms.${i}.bed`),
    description: t(`chambres.rooms.${i}.description`),
    features: Array.from({ length: FEATURE_COUNTS[i] }, (_, d) =>
      t(`chambres.rooms.${i}.features.${d}`)
    ),
    image: roomImages[i],
    badge: t(`chambres.rooms.${i}.badge`)
  }));
}

function buildAmenities(t: (key: string) => string) {
  return [0, 1, 2, 3, 4, 5, 6, 7].map((i) => ({
    icon: amenityIcons[i],
    label: t(`chambres.amenities.${i}.label`)
  }));
}

function RoomDetailButton({ room, label }: { room: RoomDetail; label: string }) {
  const [selectedRoom, setSelectedRoom] = useState<RoomDetail | null>(null);

  return (
    <>
      <button
        onClick={() => setSelectedRoom(room)}
        className="flex items-center gap-1.5 px-5 py-3 border border-brand-600 text-brand-600 font-medium text-sm uppercase tracking-wider hover:bg-brand-50 transition-colors"
      >
        <Eye className="w-4 h-4" />
        {label}
      </button>
      <DetailModal item={selectedRoom} onClose={() => setSelectedRoom(null)} />
    </>
  );
}

export function ChambresPage() {
  const { t } = useTranslation();
  const { openModal } = useContactModal();
  const [current, setCurrent] = useState(0);
  const [activeSection, setActiveSection] = useState('');

  const rooms = useDataBuilder(buildRoomsData, t);
  const amenities = useDataBuilder(buildAmenities, t);

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
        {/* Background Slides */}
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
              {t('chambres.hero.badge')}
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white font-bold mb-6 leading-tight">
              {t('chambres.hero.title')}
            </h1>
            <p className="text-lg md:text-xl text-slate-200 max-w-2xl mx-auto font-light">
              {t('chambres.hero.subtitle')}
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

      {/* ===== INTRODUCTION ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto">
            <h2 className="text-brand-600 font-medium tracking-widest uppercase text-sm mb-3">
              {t('chambres.intro.badge')}
            </h2>
            <h3 className="text-4xl font-serif text-slate-900 mb-6">
              {t('chambres.intro.title')}
            </h3>
            <p className="text-slate-600 font-light leading-relaxed">
              {t('chambres.intro.text')}
            </p>
          </motion.div>

          {/* Amenities bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4"
          >
            {amenities.map((amenity, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center p-4 bg-slate-50 rounded-sm border border-slate-100 hover:bg-brand-50 hover:border-brand-200 transition-all duration-300 group"
              >
                <div className="text-brand-500 mb-2 group-hover:scale-110 transition-transform duration-300">
                  {amenity.icon}
                </div>
                <span className="text-xs text-slate-600 font-medium leading-tight">
                  {amenity.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== ANCHOR NAVIGATION ===== */}
      <div className="sticky top-[72px] z-30 bg-white/95 backdrop-blur-sm border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-1 py-3">
            {rooms.map((room, i) => {
              const id = `room-${i}`;
              return (
                <a
                  key={room.name}
                  href={`#${id}`}
                  className={`flex items-center gap-2 px-5 py-2.5 text-sm font-medium uppercase tracking-wider rounded-sm transition-all duration-200 ${
                    activeSection === id
                      ? 'text-brand-600 bg-brand-50'
                      : 'text-slate-600 hover:text-brand-600 hover:bg-brand-50'
                  }`}
                >
                  <Home className="w-4 h-4" />
                  {room.name}
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* ===== ROOMS GRID ===== */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {rooms.map((room, index) => (
              <motion.div
                id={`room-${index}`}
                key={room.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className={`scroll-mt-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:direction-rtl' : ''
                }`}
              >
                {/* Image */}
                <div
                  className={`relative ${
                    index % 2 === 1 ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="aspect-[4/3] overflow-hidden rounded-sm shadow-xl">
                    <img
                      src={room.image}
                      alt={room.name}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/10" />
                  </div>

                  {/* Badge */}
                  <span className="absolute top-4 left-4 px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-sm bg-brand-600 text-white">
                    {room.badge}
                  </span>
                </div>

                {/* Content */}
                <div
                  className={`${
                    index % 2 === 1 ? 'lg:order-1 lg:text-right' : 'lg:order-2'
                  }`}
                >
                  <h3 className="text-3xl md:text-4xl font-serif text-slate-900 mb-2">
                    {room.name}
                  </h3>

                  <div className="flex flex-wrap gap-4 mt-4 mb-6 text-sm text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <Square className="w-4 h-4 text-brand-500" />
                      {room.size}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-brand-500" />
                      {room.capacity}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Bed className="w-4 h-4 text-brand-500" />
                      {room.bed}
                    </span>
                  </div>

                  <p
                    className={`text-slate-600 font-light leading-relaxed mb-6 ${
                      index % 2 === 1 ? 'lg:ml-auto' : ''
                    }`}
                  >
                    {room.description}
                  </p>

                  <ul
                    className={`space-y-2.5 mb-8 ${
                      index % 2 === 1 ? 'lg:flex lg:flex-col lg:items-end' : ''
                    }`}
                  >
                    {room.features.slice(0, 6).map((feature) => (
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
                      {room.price}
                    </span>
                    <div className="flex items-center gap-2">
                      <RoomDetailButton room={room} label={t('chambres.detailButton')} />
                      <button
                        onClick={openModal}
                        className="px-6 py-3 bg-brand-600 text-white font-medium text-sm uppercase tracking-wider hover:bg-brand-700 transition-colors"
                      >
                        {t('chambres.bookButton')}
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
              {t('chambres.cta.title')}
            </h2>
            <p className="text-slate-300 font-light text-lg mb-10 max-w-2xl mx-auto">
              {t('chambres.cta.text')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={openModal}
                className="px-8 py-4 bg-brand-600 text-white font-medium tracking-wide hover:bg-brand-700 transition-colors"
              >
                {t('chambres.cta.button')}
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
