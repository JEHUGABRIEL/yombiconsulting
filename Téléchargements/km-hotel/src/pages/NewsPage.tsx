import { motion } from 'framer-motion';
import { Newspaper } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function NewsPage() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-lg"
      >
        <div className="w-20 h-20 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Newspaper className="w-9 h-9 text-brand-600" />
        </div>
        <h1 className="text-3xl md:text-4xl font-serif text-slate-900 mb-4">
          {t('news.title')}
        </h1>
        <p className="text-slate-500 mb-8 leading-relaxed">
          {t('news.text')}
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-brand-600 text-white font-medium hover:bg-brand-700 transition-colors"
        >
          {t('news.cta')}
        </Link>
      </motion.div>
    </div>
  );
}
