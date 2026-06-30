import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Phone, Globe } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

type MenuItem = {
  key: string;
  href?: string;
  section?: string;
  dropdown?: { key: string; href: string }[];
};

const menuItems: MenuItem[] = [
  { key: 'nav.home', href: '/' },
  {
    key: 'nav.roomsSuites',
    dropdown: [
      { key: 'nav.roomsSub', href: '/chambres' },
      { key: 'nav.suitesSub', href: '/suites' }
    ]
  },
  {
    key: 'nav.restaurantBar',
    dropdown: [
      { key: 'nav.restaurantSub', href: '/restaurant' },
      { key: 'nav.barSub', href: '/bar' }
    ]
  },
  { key: 'nav.bienEtre', href: '/bien-etre' },
  { key: 'nav.evenements', href: '/evenements' },
  { key: 'nav.contact', section: 'contact' }
];

export function Navbar() {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const DROPDOWN_DELAY = 150;

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleMouseEnter = (name: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setOpenDropdown(name);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, DROPDOWN_DELAY);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentLang = i18n.language?.startsWith('fr') ? 'FR' : 'EN';

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsLangMenuOpen(false);
  };

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
    setIsLangMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <nav
        className={`fixed w-full z-40 top-0 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo - Left */}
            <Link
              to="/"
              className="flex-shrink-0"
            >
              <img
                src={isScrolled ? "/logo/kmh-logo.svg" : "/logo/kmh-logo-white.svg"}
                alt="KM Hotel"
                className="h-12 sm:h-14 w-auto transition-all duration-500"
              />
            </Link>

            {/* Center Menu - Desktop */}
            <div className="hidden lg:flex items-center justify-center gap-1">
              {menuItems.map((item) => {
                const hasDropdown = 'dropdown' in item && item.dropdown;
                const isOpen = openDropdown === item.key;

                if (hasDropdown) {
                  return (
                    <div
                      key={item.key}
                      className="relative"
                      onMouseEnter={() => handleMouseEnter(item.key)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <button
                        className={`flex items-center gap-1 px-3 py-2 text-[13px] font-medium uppercase tracking-[2px] transition-colors ${
                          isScrolled
                            ? 'text-slate-700 hover:text-brand-600'
                            : 'text-white/90 hover:text-white'
                        } ${isOpen ? (isScrolled ? 'text-brand-600' : 'text-white') : ''}`}
                      >
                        {t(item.key)}
                        <ChevronDown
                          className={`w-3 h-3 transition-transform duration-200 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 4 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-full left-1/2 -translate-x-1/2 pt-2"
                          >
                            <div className="w-44 bg-white shadow-lg border border-slate-100 rounded-sm overflow-hidden">
                              {item.dropdown!.map((sub) => (
                                <Link
                                  key={sub.key}
                                  to={sub.href}
                                  onClick={() => setOpenDropdown(null)}
                                  className="block px-5 py-3 text-sm font-medium text-slate-700 hover:text-brand-600 hover:bg-brand-50 transition-colors"
                                >
                                  {t(sub.key)}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                const hasSection = 'section' in item && item.section;

                if (hasSection) {
                  return (
                    <button
                      key={item.key}
                      onClick={() => scrollToSection(item.section!)}
                      className={`px-3 py-2 text-[13px] font-medium uppercase tracking-[2px] transition-colors ${
                        isScrolled
                          ? 'text-slate-700 hover:text-brand-600'
                          : 'text-white/90 hover:text-white'
                      }`}
                    >
                      {t(item.key)}
                    </button>
                  );
                }

                return (
                  <Link
                    key={item.key}
                    to={item.href!}
                    className={`px-3 py-2 text-[13px] font-medium uppercase tracking-[2px] transition-colors ${
                      isScrolled
                        ? 'text-slate-700 hover:text-brand-600'
                        : 'text-white/90 hover:text-white'
                    }`}
                  >
                    {t(item.key)}
                  </Link>
                );
              })}
            </div>

            {/* Right - Cart + Lang + Mobile Toggle */}
            <div className="flex items-center gap-2">
              {/* Language Switcher - Desktop */}
              <div className="relative hidden lg:block">
                <button
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 text-[12px] font-medium uppercase tracking-[1.5px] border transition-colors ${
                    isScrolled
                      ? 'text-slate-600 border-slate-300 hover:border-brand-400 hover:text-brand-600'
                      : 'text-white/80 border-white/30 hover:border-white/60'
                  }`}
                >
                  <Globe className="w-3 h-3" />
                  {currentLang}
                </button>
                <AnimatePresence>
                  {isLangMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.12 }}
                      className="absolute right-0 mt-1 w-28 bg-white shadow-lg border border-slate-100 rounded-sm overflow-hidden z-50"
                    >
                      <button
                        onClick={() => changeLanguage('fr')}
                        className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors hover:bg-brand-50 ${
                          currentLang === 'FR'
                            ? 'text-brand-600 bg-brand-50'
                            : 'text-slate-700'
                        }`}
                      >
                        Français
                      </button>
                      <button
                        onClick={() => changeLanguage('en')}
                        className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors hover:bg-brand-50 ${
                          currentLang === 'EN'
                            ? 'text-brand-600 bg-brand-50'
                            : 'text-slate-700'
                        }`}
                      >
                        English
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Booking Button - Desktop */}
              <a
                href="tel:+23675494969"
                className={`hidden lg:flex items-center gap-1.5 px-4 py-1.5 text-[12px] font-medium uppercase tracking-[1.5px] transition-colors ${
                  isScrolled
                    ? 'text-white bg-[#bfa37a] hover:bg-[#ad8f68]'
                    : 'text-white bg-white/15 hover:bg-white/25 border border-white/30 hover:border-white/60'
                }`}
              >
                <Phone className="w-3 h-3" />
                {t('nav.book')}
              </a>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`lg:hidden p-2 transition-colors ${
                  isScrolled ? 'text-slate-900' : 'text-white'
                }`}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden bg-white absolute top-full left-0 w-full shadow-lg border-t border-slate-100 max-h-[calc(100vh-80px)] overflow-y-auto"
            >
              <div className="px-4 pt-2 pb-6 space-y-1">
                {menuItems.map((item) => {
                  const hasDropdown = 'dropdown' in item && item.dropdown;

                  if (hasDropdown) {
                    return (
                      <div key={item.key} className="px-3 py-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                          {t(item.key)}
                        </span>
                        <div className="space-y-0.5 ml-2">
                          {item.dropdown!.map((sub) => (
                            <Link
                              key={sub.key}
                              to={sub.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="block px-3 py-2.5 text-base font-medium text-slate-800 hover:text-brand-600 hover:bg-slate-50 rounded-sm"
                            >
                              {t(sub.key)}
                            </Link>
                          ))}
                        </div>
                      </div>
                    );
                  }

                  const hasSection = 'section' in item && item.section;

                  if (hasSection) {
                    return (
                      <button
                        key={item.key}
                        onClick={() => { setIsMobileMenuOpen(false); scrollToSection(item.section!); }}
                        className="block w-full text-left px-3 py-3 text-base font-medium text-slate-800 hover:text-brand-600 hover:bg-slate-50"
                      >
                        {t(item.key)}
                      </button>
                    );
                  }

                  return (
                    <Link
                      key={item.key}
                      to={item.href!}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-3 py-3 text-base font-medium text-slate-800 hover:text-brand-600 hover:bg-slate-50"
                    >
                      {t(item.key)}
                    </Link>
                  );
                })}

                <div className="border-t border-slate-100 pt-4 mt-4 px-3 space-y-3">
                  {/* Language Switcher - Mobile */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => { setIsMobileMenuOpen(false); changeLanguage('fr'); }}
                      className={`flex-1 px-4 py-2.5 text-sm font-medium uppercase tracking-wider border transition-colors ${
                        currentLang === 'FR'
                          ? 'bg-brand-600 text-white border-brand-600'
                          : 'text-slate-600 border-slate-200 hover:border-brand-400 hover:text-brand-600'
                      }`}
                    >
                      FR
                    </button>
                    <button
                      onClick={() => { setIsMobileMenuOpen(false); changeLanguage('en'); }}
                      className={`flex-1 px-4 py-2.5 text-sm font-medium uppercase tracking-wider border transition-colors ${
                        currentLang === 'EN'
                          ? 'bg-brand-600 text-white border-brand-600'
                          : 'text-slate-600 border-slate-200 hover:border-brand-400 hover:text-brand-600'
                      }`}
                    >
                      EN
                    </button>
                  </div>
                  <a
                    href="tel:+23675494969"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-[#bfa37a] text-white font-medium hover:bg-[#ad8f68] transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    {t('nav.book')}
                  </a>
                  <a
                    href="tel:+23675494969"
                    className="flex items-center justify-center gap-2 w-full px-5 py-3 border border-brand-600 text-brand-600 font-medium hover:bg-brand-50 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    +236 75 49 49 69
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

    </>
  );
}
