import { motion } from 'framer-motion';

export interface GalleryImage {
  src: string;
  alt: string;
  label?: string;
}

export interface ImageGalleryProps {
  images: GalleryImage[];
  title?: string;
  columns?: 2 | 3 | 4;
  aspectRatio?: string;
  className?: string;
}

const columnsMap = {
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
} as const;

const delayStep = 0.1;

export function ImageGallery({
  images,
  title,
  columns = 4,
  aspectRatio = 'aspect-[4/3]',
  className = ''
}: ImageGalleryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className={className}
    >
      {title && (
        <h4 className="text-2xl font-serif text-slate-800 mb-8 text-center">
          {title}
        </h4>
      )}
      <div className={`grid ${columnsMap[columns]} gap-4`}>
        {images.map((img, i) => (
          <motion.div
            key={img.src}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * delayStep }}
            className={`group relative ${aspectRatio} overflow-hidden rounded-sm cursor-pointer`}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {img.label && (
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <span className="text-white text-sm font-medium tracking-wide">
                  {img.label}
                </span>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
