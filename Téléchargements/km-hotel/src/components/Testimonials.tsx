import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonialsData = [
  {
    name: 'Christiane M.',
    location: 'Paris, France',
    role: 'Voyage d\'affaires',
    avatar: 'CM',
    rating: 5,
    text: 'Un séjour exceptionnel au KM Hotel. L\'accueil est chaleureux, les chambres sont spacieuses et élégantes. La connexion Wi-Fi est parfaite pour travailler. Le petit-déjeuner buffet est un régal. Je reviendrai sans hésiter lors de mon prochain voyage à Bangui.'
  },
  {
    name: 'Arsène B.',
    location: 'Douala, Cameroun',
    role: 'Séminaire professionnel',
    avatar: 'AB',
    rating: 5,
    text: 'J\'ai organisé un séminaire de deux jours au KM Hotel. Les salles de conférence sont modernes et bien équipées. L\'équipe a été d\'un professionnalisme remarquable. Le restaurant nous a régalés midi et soir. Une adresse incontournable pour les professionnels.'
  },
  {
    name: 'Marie-Claire K.',
    location: 'Bangui, Centrafrique',
    role: 'Dîner en couple',
    avatar: 'MK',
    rating: 5,
    text: 'Mon mari et moi avons fêté notre anniversaire de mariage au restaurant du KM Hotel. Un cadre magnifique, un service attentionné et des plats délicieux. Le Filet de Bœuf au Poivre était divin. Merci à toute l\'équipe pour cette soirée inoubliable.'
  },
  {
    name: 'Sophie L.',
    location: 'Nairobi, Kenya',
    role: 'Touriste',
    avatar: 'SL',
    rating: 4,
    text: 'Le KM Hotel est une belle découverte. La literie est confortable, la climatisation efficace et l\'autonomie électrique est un vrai plus à Bangui. Le bar lounge est cosy et les cocktails sont excellents. Je recommande vivement.'
  },
  {
    name: 'Jean-Pascal T.',
    location: 'Paris, France',
    role: 'Mission humanitaire',
    avatar: 'JT',
    rating: 5,
    text: 'Je séjourne régulièrement au KM Hotel lors de mes missions. La constance dans la qualité du service est remarquable. L\'équipe est aux petits soins, toujours souriante. Le rapport qualité-prix est excellent pour le standing proposé.'
  },
  {
    name: 'Fatima N.',
    location: 'Abidjan, Côte d\'Ivoire',
    role: 'Voyage d\'affaires',
    avatar: 'FN',
    rating: 5,
    text: 'Un hôtel qui mérite amplement sa réputation. Dès l\'arrivée, on se sent accueilli comme un invité de marque. Les chambres sont impeccables, la nourriture est savoureuse et l\'emplacement en centre-ville est idéal pour les déplacements professionnels.'
  }
];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating
              ? 'fill-amber-400 text-amber-400'
              : 'fill-slate-200 text-slate-200'
          }`}
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(0);
  const testimonials = testimonialsData;
  const itemsPerPage = 3;
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);
  const currentItems = testimonials.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <section id="testimonials" className="py-24 bg-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <span className="text-brand-600 font-medium tracking-widest uppercase text-sm mb-3 block">
            {t('testimonials.badge')}
          </span>
          <h2 className="text-4xl font-serif text-slate-900 mb-4">
            {t('testimonials.title')}
          </h2>
          <p className="text-slate-600 font-light">
            {t('testimonials.subtitle')}
          </p>
        </motion.div>

        {/* Testimonials grid */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            >
              {currentItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative bg-white border border-slate-100 rounded-sm p-6 sm:p-8 hover:shadow-lg transition-all duration-500 hover:-translate-y-1"
                >
                  {/* Quote icon */}
                  <div className="absolute top-4 right-4 text-brand-100 group-hover:text-brand-200 transition-colors duration-500">
                    <Quote className="w-8 h-8" />
                  </div>

                  {/* Stars */}
                  <div className="mb-4">
                    <Stars rating={item.rating} />
                  </div>

                  {/* Text */}
                  <p className="text-slate-600 font-light leading-relaxed text-sm mb-6 line-clamp-5">
                    "{item.text}"
                  </p>

                  {/* Avatar & Info */}
                  <div className="flex items-center gap-3.5 pt-4 border-t border-slate-100">
                    <div className="w-11 h-11 rounded-full bg-brand-600 text-white flex items-center justify-center text-sm font-bold shrink-0">
                      {item.avatar}
                    </div>
                    <div className="min-w-0">
                      <strong className="block text-sm text-slate-900 truncate">
                        {item.name}
                      </strong>
                      <span className="text-xs text-slate-500 block truncate">
                        {item.location}
                      </span>
                      <span className="text-[11px] text-brand-600 font-medium uppercase tracking-wider">
                        {item.role}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Navigation arrows */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-10">
              <button
                onClick={prevPage}
                className="w-10 h-10 flex items-center justify-center border border-slate-200 text-slate-500 hover:border-brand-500 hover:text-brand-600 hover:bg-brand-50 transition-all duration-200 rounded-sm"
                aria-label={t('testimonials.ariaPrev')}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Dots */}
              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === currentPage
                        ? 'bg-brand-600 w-6'
                        : 'bg-slate-300 hover:bg-slate-400'
                    }`}
                    aria-label={t('testimonials.ariaDot', { n: i + 1 })}
                  />
                ))}
              </div>

              <button
                onClick={nextPage}
                className="w-10 h-10 flex items-center justify-center border border-slate-200 text-slate-500 hover:border-brand-500 hover:text-brand-600 hover:bg-brand-50 transition-all duration-200 rounded-sm"
                aria-label={t('testimonials.ariaNext')}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Auto-scroll indicator */}
        <div className="mt-6 text-center">
          <span className="text-xs text-slate-400 font-medium">
            {currentPage + 1} / {totalPages}
          </span>
        </div>
      </div>
    </section>
  );
}
