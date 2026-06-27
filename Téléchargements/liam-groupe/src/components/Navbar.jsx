import { useEffect, useState, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ChevronDown, Globe, Menu, X } from "lucide-react";
import { useNavLinks, useDomains, useSiteInfo } from "../hooks/useSiteData";

/**
 * Navbar — reproduit le comportement observé sur les captures :
 * - Sur les pages avec un hero plein écran, la nav démarre transparente
 *   (texte blanc, bouton CTA corail) puis devient blanche (texte sombre,
 *   bouton CTA violet) dès que la page est scrollée.
 */
export default function Navbar({ transparentOnTop = true }) {
  const [scrolled, setScrolled] = useState(() =>
    transparentOnTop ? typeof window !== "undefined" && window.scrollY > 40 : true
  );
  const [domainsOpen, setDomainsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const closeTimer = useRef(null);
  const [prevPath, setPrevPath] = useState(location.pathname);
  const { data: navLinks = [] } = useNavLinks();
  const { data: domains = [] } = useDomains();
  const { data: siteInfo = {} } = useSiteInfo();

  useEffect(() => {
    if (!transparentOnTop) return;
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [transparentOnTop]);

  if (prevPath !== location.pathname) {
    setPrevPath(location.pathname);
    if (mobileOpen) setMobileOpen(false);
    if (domainsOpen) setDomainsOpen(false);
  }

  const isTransparent = !scrolled;

  const openDomains = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setDomainsOpen(true);
  };
  const scheduleCloseDomains = () => {
    closeTimer.current = setTimeout(() => setDomainsOpen(false), 150);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isTransparent ? "bg-transparent" : "bg-white shadow-sm"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-10 h-[88px] flex items-center justify-between">
        <Link to="/" className="font-heading font-extrabold text-2xl tracking-tight">
          <span className={isTransparent ? "text-white" : "text-ink"}>{siteInfo.name}</span>
          <span className="text-brand-500">.</span>
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) =>
            link.dropdown ? (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={openDomains}
                onMouseLeave={scheduleCloseDomains}
              >
                <button
                  className={`flex items-center gap-1 font-medium transition-colors ${
                    isTransparent
                      ? "text-white/90 hover:text-white"
                      : "text-gray-700 hover:text-ink"
                  }`}
                >
                  {link.label}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${domainsOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {domainsOpen && (
                  <div className="absolute top-full left-0 mt-3 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-3 overflow-hidden">
                    {domains.map((d) => (
                      <Link
                        key={d.slug}
                        to={`/domaines/${d.slug}`}
                        className="block px-5 py-2.5 text-gray-700 hover:bg-brand-50 hover:text-brand-600 transition-colors"
                      >
                        {d.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                key={link.label}
                to={link.to}
                className={({ isActive }) =>
                  `font-medium transition-colors ${
                    isTransparent
                      ? isActive
                        ? "text-white"
                        : "text-white/90 hover:text-white"
                      : isActive
                      ? "text-brand-600"
                      : "text-gray-700 hover:text-ink"
                  }`
                }
              >
                {link.label}
              </NavLink>
            )
          )}
        </div>

        <div className="hidden lg:flex items-center gap-5">
          <button
            className={`flex items-center gap-1.5 font-medium ${
              isTransparent ? "text-white/90" : "text-gray-700"
            }`}
          >
            <span>EN</span>
            <Globe className="w-4 h-4" />
          </button>
          <Link
            to="/partenaires"
            className={`px-6 py-2.5 rounded-full font-semibold transition-colors ${
              isTransparent
                ? "bg-brand-500 hover:bg-brand-600 text-white"
                : "bg-brand-500 hover:bg-brand-600 text-white"
            }`}
          >
            Devenir partenaire
          </Link>
        </div>

        <button
          className={`lg:hidden ${isTransparent ? "text-white" : "text-ink"}`}
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Menu"
        >
          {mobileOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-6 py-4 max-h-[80vh] overflow-y-auto">
          {navLinks.map((link) =>
            link.dropdown ? (
              <div key={link.label} className="py-2">
                <button
                  className="flex items-center justify-between w-full font-medium text-gray-800 py-2"
                  onClick={() => setDomainsOpen((o) => !o)}
                >
                  {link.label}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${domainsOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {domainsOpen && (
                  <div className="pl-4 flex flex-col gap-1">
                    {domains.map((d) => (
                      <Link
                        key={d.slug}
                        to={`/domaines/${d.slug}`}
                        className="py-2 text-gray-600"
                      >
                        {d.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link key={link.label} to={link.to} className="block py-2 font-medium text-gray-800">
                {link.label}
              </Link>
            )
          )}
          <Link
            to="/partenaires"
            className="mt-3 block text-center px-6 py-2.5 rounded-full font-semibold bg-brand-500 text-white"
          >
            Devenir partenaire
          </Link>
        </div>
      )}
    </header>
  );
}
