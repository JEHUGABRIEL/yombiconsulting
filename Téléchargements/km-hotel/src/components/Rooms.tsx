import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Bed, Bath, Utensils, Wifi, ArrowRight } from 'lucide-react';
import { useContactModal } from '../context/ContactModalContext';
import { DetailModal, type RoomDetail } from './DetailModal';
import { FcfaCurrency } from './FcfaCurrency';

const roomImages = [
  '/images/chambres/710596584_1520479582776221_4608257167843013454_n.jpg',
  '/images/chambres/712603931_1520479722776207_7426362288914991512_n.jpg',
  '/images/chambres/717437893_1305097528411579_7111916903758055840_n.jpeg',
  '/images/chambres/714759259_1520474492776730_8805459494231579584_n.jpg',
  '/images/chambres/711546516_1520474822776697_3397711297697992229_n.jpg',
];

const amenityIcons = [Bed, Bath, Utensils, Wifi];

type RoomCard = {
  name: string;
  price: string;
  size?: string;
  capacity?: string;
  bed?: string;
  desc?: string;
  features?: string[];
};

function buildRoomDetail(room: RoomCard, image: string, index: number): RoomDetail {
  return {
    type: 'room',
    name: room.name,
    price: room.price,
    size: room.size || '28 m²',
    capacity: room.capacity || '1-2 personnes',
    bed: room.bed || 'Lit Queen Size',
    description: room.desc || '',
    features: room.features || [],
    image,
    badge: index === 0 ? 'Premium' : index === 4 ? 'Exclusive' : 'Populaire'
  };
}

export function Rooms() {
  const { t } = useTranslation();
  const { openModal } = useContactModal();
  const [selectedRoom, setSelectedRoom] = useState<RoomDetail | null>(null);

  const allRooms = t('rooms.cards', { returnObjects: true }) as RoomCard[];
  const rooms = allRooms.slice(0, 3);

  return (
    <>
      <section id="rooms" className="bg-[#f9f6f0] py-[100px] max-md:py-[60px]">
        <div className="max-w-[1140px] mx-auto px-5">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-[50px]"
          >
            <h2 className="font-serif text-[45px] max-md:text-[38px] text-[#222222] leading-tight">
              {t('rooms.title')}
            </h2>
          </motion.div>

          {/* Voir Plus Button */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-[30px]">
            <p className="font-sans text-[#666] text-[14px] m-0">
              {t('rooms.subtitle')}
            </p>
            <Link
              to="/chambres"
              className="inline-flex items-center gap-2 font-sans text-[#222] text-[12px] font-medium uppercase tracking-[2px] border border-[#222] px-5 py-3 transition-all duration-300 hover:bg-[#222] hover:text-white group/btn"
            >
              <span>{t('rooms.seeMore')}</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </Link>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px] max-md:gap-5">
            {rooms.map((room, index) => (
              <motion.div
                key={room.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative w-full aspect-[4/5] overflow-hidden cursor-pointer bg-white"
              >
                {/* Image */}
                <img
                  src={roomImages[index]}
                  alt={room.name}
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
                    <FcfaCurrency price={room.price} />
                  </p>
                  <h3 className="font-serif text-white text-[24px] font-normal m-0">
                    {room.name}
                  </h3>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-[1]">
                  {/* Amenity Icons */}
                  <div className="flex gap-[15px] mb-5">
                    {amenityIcons.map((Icon, i) => (
                      <Icon key={i} className="w-[22px] h-[22px] text-white" />
                    ))}
                  </div>

                  {/* DETAILS Button - opens modal */}
                  <button
                    onClick={(e) => { e.stopPropagation(); setSelectedRoom(buildRoomDetail(room, roomImages[index], index)); }}
                    className="font-sans text-white text-[12px] uppercase tracking-[2px] no-underline border-b border-white pb-[2px] hover:text-[#bfa37a] hover:border-[#bfa37a] transition-colors duration-300"
                  >
                    DETAILS
                  </button>

                  {/* BOOKING Button */}
                  <button
                    onClick={(e) => { e.stopPropagation(); openModal(); }}
                    className="mt-4 font-sans text-white text-[11px] uppercase tracking-[2px] px-5 py-2 border border-white/50 hover:bg-white hover:text-[#222] transition-all duration-300"
                  >
                    BOOKING
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <DetailModal item={selectedRoom} onClose={() => setSelectedRoom(null)} />
    </>
  );
}
