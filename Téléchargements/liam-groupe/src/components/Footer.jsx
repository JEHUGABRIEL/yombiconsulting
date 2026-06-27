import { Link } from "react-router-dom";
import { Send } from "lucide-react";
import { FacebookIcon, InstagramIcon, XIcon, YoutubeIcon } from "./SocialIcons";
import { useSiteInfo, useFooterLinks } from "../hooks/useSiteData";

export default function Footer() {
  const { data: siteInfo = {} } = useSiteInfo();
  const { data: footerLinks = {} } = useFooterLinks();
  const fLinks = { liamGroupe: [], domaines: [], agir: [], ...footerLinks };

  return (
    <footer className="bg-ink text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr_1fr_1fr] gap-12">
          <div>
            <Link to="/" className="font-heading font-extrabold text-2xl">
              {siteInfo.name}
              <span className="text-brand-500">.</span>
            </Link>
            <p className="mt-4 text-white/60 leading-relaxed max-w-sm">
              {siteInfo.description}
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-6 flex max-w-sm rounded-full overflow-hidden bg-white/10 border border-white/15"
            >
              <input
                type="email"
                placeholder="Votre email pour la newsletter"
                className="flex-1 bg-transparent px-5 py-3 text-sm placeholder:text-white/40 outline-none"
              />
              <button
                type="submit"
                aria-label="S'inscrire"
                className="px-4 bg-brand-500 hover:bg-brand-600 transition-colors flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-10">
              <h4 className="font-heading font-bold mb-4">Contact</h4>
              <ul className="space-y-3 text-white/60">
                <li>
                  <Link to="/contact" className="hover:text-white transition-colors">
                    Nous contacter
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h4 className="font-heading font-bold mb-4">LIAM Groupe</h4>
            <ul className="space-y-3 text-white/60">
              {fLinks.liamGroupe.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold mb-4">Domaines</h4>
            <ul className="space-y-3 text-white/60">
              {fLinks.domaines.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold mb-4">Agir</h4>
            <ul className="space-y-3 text-white/60">
              {fLinks.agir.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-sm text-center sm:text-left">
            © 2026 LIAM Groupe. Tous droits réservés — Bangui, République Centrafricaine
          </p>
          <div className="flex items-center gap-4">
            {[FacebookIcon, InstagramIcon, XIcon, YoutubeIcon].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="social"
                className="w-9 h-9 rounded-lg border border-white/15 flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
          <a href="#" className="text-white/50 text-sm hover:text-white transition-colors">
            Politique de confidentialité
          </a>
        </div>
      </div>
    </footer>
  );
}
