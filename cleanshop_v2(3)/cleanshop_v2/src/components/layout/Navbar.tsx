import { useState } from 'react';
import { Search, Menu, X, Heart, ShoppingCart, Zap } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

interface Props {
  cartCount: number;
  wishlistCount: number;
  searchQuery: string;
  isDarkMode: boolean;
  onSearchChange: (q: string) => void;
  onCartOpen: () => void;
  onWishlistOpen: () => void;
  onToggleDarkMode: () => void;
}

const NAV_LINKS = [
  { label: 'Accueil',   href: '#accueil'   },
  { label: 'Boutique',  href: '#products'  },
  { label: 'Services',  href: '#services'  },
  { label: 'Garantie',  href: '#garantie'  },
  { label: 'Contact',   href: '#contact'   },
];

const MOBILE_LINKS = [
  { label: 'Accueil',      href: '#accueil'   },
  { label: 'Boutique',     href: '#products'  },
  { label: 'iPhone',       href: '#products'  },
  { label: 'MacBook',      href: '#products'  },
  { label: 'Services',     href: '#services'  },
  { label: 'Garantie',     href: '#garantie'  },
  { label: 'Contact',      href: '#contact'   },
];

export function Navbar({
  cartCount, wishlistCount, searchQuery, isDarkMode,
  onSearchChange, onCartOpen, onWishlistOpen, onToggleDarkMode,
}: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className={`sticky top-0 z-[100] border-b transition-colors duration-500
      ${isDarkMode ? 'border-slate-800 bg-slate-950/90' : 'border-slate-100 bg-white/90'} backdrop-blur-md`}>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 gap-4">

        {/* Logo */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <a href="#accueil" className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="Clean Shop"
              className={`h-8 w-auto object-contain transition-all ${isDarkMode ? 'invert' : ''}`}
            />
          </a>
          <button
            onClick={onToggleDarkMode}
            aria-label="Basculer le mode sombre"
            className={`p-2 rounded-xl transition-all ${isDarkMode ? 'bg-slate-800 text-amber-400' : 'bg-slate-50 text-slate-500'}`}
          >
            <Zap size={18} fill={isDarkMode ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Barre de recherche desktop */}
        <div className="hidden md:flex flex-grow max-w-md relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="iPhone, MacBook, accessoires..."
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            className={`w-full rounded-2xl py-3 pl-12 pr-4 text-sm font-medium outline-none transition-all shadow-sm
              ${isDarkMode
                ? 'bg-slate-900 border border-slate-800 focus:border-emerald-500 text-white'
                : 'bg-slate-50 border border-slate-100 focus:bg-white focus:border-emerald-300 text-slate-900'}`}
          />
        </div>

        {/* Liens desktop */}
        <ul className="hidden lg:flex items-center gap-6 flex-shrink-0">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                className={`text-[11px] font-bold uppercase tracking-widest transition-colors
                  ${isDarkMode ? 'text-slate-400 hover:text-emerald-400' : 'text-slate-500 hover:text-emerald-600'}`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={onWishlistOpen}
            aria-label="Liste de souhaits"
            className={`relative hidden sm:flex h-11 w-11 items-center justify-center rounded-2xl transition-all
              ${isDarkMode ? 'bg-slate-800 text-slate-300 hover:text-pink-400' : 'bg-slate-50 text-slate-900 hover:bg-pink-50 hover:text-pink-600'}`}
          >
            <Heart size={20} fill={wishlistCount > 0 ? 'currentColor' : 'none'} className={wishlistCount > 0 ? 'text-pink-500' : ''} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-pink-600 text-[10px] font-black text-white">
                {wishlistCount}
              </span>
            )}
          </button>

          <button
            onClick={onCartOpen}
            aria-label="Panier"
            className={`relative flex h-11 w-11 items-center justify-center rounded-2xl transition-all
              ${isDarkMode ? 'bg-slate-800 text-slate-300 hover:text-emerald-400' : 'bg-slate-50 text-slate-900 hover:bg-emerald-50 hover:text-emerald-600'}`}
          >
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-black text-white">
                {cartCount}
              </span>
            )}
          </button>

          <button
            className={`lg:hidden ${isDarkMode ? 'text-slate-300' : 'text-slate-900'}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`lg:hidden absolute top-20 left-0 right-0 border-b shadow-xl z-50
              ${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-100'}`}
          >
            <div className="p-6">
              {/* Recherche mobile */}
              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={e => onSearchChange(e.target.value)}
                  className={`w-full rounded-2xl py-4 pl-12 pr-4 text-sm font-medium outline-none
                    ${isDarkMode ? 'bg-slate-900 border border-slate-800 text-white' : 'bg-slate-50 border border-slate-100 text-slate-900'}`}
                />
              </div>

              {/* Liens mobile */}
              <ul className="flex flex-col">
                {MOBILE_LINKS.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block text-lg font-black py-3 border-b transition-colors
                        ${isDarkMode ? 'text-white border-slate-800 hover:text-emerald-400' : 'text-slate-900 border-slate-50 hover:text-emerald-600'}`}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
