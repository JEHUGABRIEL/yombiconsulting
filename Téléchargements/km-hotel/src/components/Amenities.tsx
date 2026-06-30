import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Wifi, Zap, Droplets, Coffee, UtensilsCrossed, Users } from 'lucide-react';

const serviceIcons = [
  <Zap className="w-[38px] h-[38px]" />,
  <Droplets className="w-[38px] h-[38px]" />,
  <Wifi className="w-[38px] h-[38px]" />,
  <UtensilsCrossed className="w-[38px] h-[38px]" />,
  <Coffee className="w-[38px] h-[38px]" />,
  <Users className="w-[38px] h-[38px]" />
];

export function Amenities() {
  const { t } = useTranslation();
  const items = t('amenities.items', { returnObjects: true }) as Array<{ title: string; desc: string }>;

  return (
    <section id="services" className="bg-white py-[100px] max-md:py-[60px] w-full">
      <div className="max-w-[1140px] mx-auto px-5">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-left mb-[50px]"
        >
          <span className="font-sans text-[#bfa37a] text-[12px] font-medium uppercase tracking-[4px] mb-2 block">
            {t('amenities.badge')}
          </span>
          <h2 className="font-serif text-[#222] text-[45px] max-lg:text-[38px] font-normal m-0">
            {t('amenities.title')}
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px] max-md:gap-5">
          {items.map((service: { title: string; desc: string }, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white border border-[#f0f0f0] px-10 max-md:px-8 py-[45px] text-left transition-all duration-300 ease-in-out cursor-pointer group hover:bg-[#fcfaf7] hover:border-[rgba(191,163,122,0.3)]"
            >
              {/* Icon */}
              <div className="text-[#bfa37a] mb-[25px] inline-block transition-transform duration-300 ease-in-out group-hover:-translate-y-1">
                {serviceIcons[index]}
              </div>

              {/* Title */}
              <h3 className="font-serif text-[#222] text-[22px] font-normal m-0 mb-[15px]">
                {service.title}
              </h3>

              {/* Description */}
              <p className="font-sans text-[#666] text-[14px] leading-[1.6] m-0">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
