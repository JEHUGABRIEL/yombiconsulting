import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Car, ConciergeBell, Shirt, Bell, Briefcase, Compass } from 'lucide-react';

const serviceIcons = [
  <Car className="w-[38px] h-[38px]" />,
  <Bell className="w-[38px] h-[38px]" />,
  <Shirt className="w-[38px] h-[38px]" />,
  <ConciergeBell className="w-[38px] h-[38px]" />,
  <Briefcase className="w-[38px] h-[38px]" />,
  <Compass className="w-[38px] h-[38px]" />
];

export function ExtraServices() {
  const { t } = useTranslation();
  const items = t('extraServices.items', { returnObjects: true }) as Array<{ title: string; desc: string }>;

  // Dupliquer pour l'effet de défilement infini
  const duplicatedItems = [...items, ...items, ...items];

  return (
    <section className="bg-[#faf8f6] py-[100px] max-md:py-[60px] w-full overflow-hidden">
      <div className="max-w-[1140px] mx-auto px-5 mb-[50px]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-left"
        >
          <span className="font-sans text-[#bfa37a] text-[12px] font-medium uppercase tracking-[4px] mb-2 block">
            {t('extraServices.badge')}
          </span>
          <h2 className="font-serif text-[#222] text-[45px] max-lg:text-[38px] font-normal m-0">
            {t('extraServices.title')}
          </h2>
          <p className="font-sans text-[#666] text-[15px] leading-[1.7] mt-4 max-w-2xl">
            {t('extraServices.subtitle')}
          </p>
        </motion.div>
      </div>

      {/* Carrousel infini */}
      <div className="group/carousel relative">
        {/* Gradient masks at edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-[#faf8f6] to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-transparent to-[#faf8f6] pointer-events-none" />

        <div
          className="flex gap-[30px] w-max hover:[animation-play-state:paused]"
          style={{
            animation: 'scroll 40s linear infinite',
          }}
        >
          {duplicatedItems.map((service: { title: string; desc: string }, index: number) => (
            <div
              key={index}
              className="bg-white border border-[#f0f0f0] px-10 max-md:px-8 py-[45px] text-left transition-all duration-300 ease-in-out cursor-pointer group/card hover:border-[rgba(191,163,122,0.3)] hover:shadow-lg w-[380px] max-md:w-[320px] shrink-0"
            >
              {/* Icon */}
              <div className="text-[#bfa37a] mb-[25px] inline-block transition-transform duration-300 ease-in-out group-hover/card:-translate-y-1">
                {serviceIcons[index % items.length]}
              </div>

              {/* Title */}
              <h3 className="font-serif text-[#222] text-[22px] font-normal m-0 mb-[15px]">
                {service.title}
              </h3>

              {/* Description */}
              <p className="font-sans text-[#666] text-[14px] leading-[1.6] m-0">
                {service.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Pause indicator on hover */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300">
          <span className="text-[11px] text-[#bfa37a] font-medium uppercase tracking-[2px] bg-white/80 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-sm border border-[#f0e8dc]">
            Pause
          </span>
        </div>
      </div>
    </section>
  );
}
