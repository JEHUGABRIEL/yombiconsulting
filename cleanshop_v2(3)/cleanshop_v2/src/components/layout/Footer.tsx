import { Facebook, Instagram } from 'lucide-react';

interface Props {
  isDarkMode: boolean;
}

export function Footer({ isDarkMode }: Props) {
  return (
    <footer className={`transition-colors duration-500 border-t px-6 py-20
      ${isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-100 text-slate-900'}`}>
      <div className="mx-auto max-w-7xl">

        {/* Top */}
        <div className="flex flex-col md:flex-row justify-between gap-16 mb-20">
          <div className="max-w-xs">
            <a href="#accueil" className="block mb-8">
              <img
                src="/logo.png"
                alt="Clean Shop"
                className={`h-10 w-auto object-contain ${isDarkMode ? 'invert' : ''}`}
              />
            </a>
            <p className={`text-sm font-medium leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Le leader de la technologie authentique en RCA. Situé au cœur de Bangui, nous importons le meilleur de l'innovation pour vous.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 sm:gap-24">
            <FooterCol title="Shop" links={[
              { label: 'iPhone',       href: '#products' },
              { label: 'MacBook',      href: '#products' },
              { label: 'Accessoires',  href: '#products' },
              { label: 'Services',     href: '#services' },
            ]} isDarkMode={isDarkMode} />

            <FooterCol title="Infos" links={[
              { label: 'Garantie',        href: '#garantie' },
              { label: 'SAV',             href: '#contact'  },
              { label: 'Livraison',       href: '#contact'  },
              { label: 'Mentions légales',href: '#'         },
            ]} isDarkMode={isDarkMode} />

            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Suivez-nous</h4>
              <div className="flex gap-4">
                {[
                  { Icon: Facebook,  href: 'https://www.facebook.com/' },
                  { Icon: Instagram, href: 'https://www.instagram.com/' },
                ].map(({ Icon, href }) => (
                  <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                    className={`h-10 w-10 rounded-xl flex items-center justify-center transition-all
                      ${isDarkMode
                        ? 'bg-slate-900 text-slate-500 hover:bg-emerald-600 hover:text-white'
                        : 'bg-slate-50 text-slate-400 hover:bg-emerald-600 hover:text-white'}`}>
                    <Icon size={18} />
                  </a>
                ))}
              </div>

              <div className="space-y-2">
                <a href="tel:+23672280727" className={`block text-sm font-bold transition-colors ${isDarkMode ? 'text-slate-400 hover:text-emerald-400' : 'text-slate-500 hover:text-emerald-600'}`}>
                  +236 72 28 07 27
                </a>
                <a href="mailto:contact@cleancomputer.fr" className={`block text-sm font-bold transition-colors ${isDarkMode ? 'text-slate-400 hover:text-emerald-400' : 'text-slate-500 hover:text-emerald-600'}`}>
                  contact@cleancomputer.fr
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className={`flex flex-col md:flex-row items-center justify-between gap-6 pt-12 border-t
          ${isDarkMode ? 'border-slate-800' : 'border-slate-100'}`}>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            © 2026 Clean. Shop — Bangui, République Centrafricaine.
          </p>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-slate-400">
            {['Mentions légales', 'Livraison', 'Confidentialité'].map(link => (
              <a key={link} href="#" className={`transition-colors ${isDarkMode ? 'hover:text-white' : 'hover:text-slate-900'}`}>
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links, isDarkMode }: { title: string; links: { label: string; href: string }[]; isDarkMode: boolean }) {
  return (
    <div className="space-y-6">
      <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-600">{title}</h4>
      <ul className="space-y-4 text-xs font-bold">
        {links.map(({ label, href }) => (
          <li key={label}>
            <a href={href} className={`transition-colors ${isDarkMode ? 'text-slate-400 hover:text-emerald-400' : 'text-slate-500 hover:text-emerald-600'}`}>
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
