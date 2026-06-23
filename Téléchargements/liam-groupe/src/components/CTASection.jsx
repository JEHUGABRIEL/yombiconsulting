import { Link } from "react-router-dom";
import { HeartHandshake, ArrowUpRight } from "lucide-react";

/**
 * CTASection — section claire "AGISSEZ / Soutenez {Domaine}" présente en bas
 * de chaque page de domaine, avec deux boutons d'action.
 */
export function ActCTA({ title }) {
  return (
    <section className="bg-violet-50/40 py-20 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <div className="flex items-center justify-center gap-3 text-coral-500 font-semibold tracking-[0.2em] text-xs uppercase mb-4">
          <span className="h-px w-10 bg-coral-500/40" />
          Agissez
          <span className="h-px w-10 bg-coral-500/40" />
        </div>
        <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">{title}</h2>
        <p className="text-gray-500 mb-8 leading-relaxed">
          Vous souhaitez contribuer au développement de ce programme ?
          <br />
          Contactez-nous pour en discuter.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/contact"
            className="px-7 py-3 rounded-full bg-violet-500 hover:bg-violet-600 text-white font-semibold transition-colors"
          >
            Nous contacter
          </Link>
          <Link
            to="/evenements"
            className="px-7 py-3 rounded-full border border-gray-300 hover:border-gray-400 font-semibold transition-colors"
          >
            Voir nos événements
          </Link>
        </div>
      </div>
    </section>
  );
}

/**
 * JoinCTA — grand bandeau sombre "Rejoignez l'aventure humaine et solidaire"
 * présent sur la page d'accueil, juste avant le formulaire de contact.
 */
export function JoinCTA() {
  return (
    <section className="relative bg-ink py-24 px-6 overflow-hidden">
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(245,50,61,0.25), transparent 60%), radial-gradient(circle at 70% 70%, rgba(156,5,250,0.2), transparent 55%)",
        }}
      />
      <div className="relative max-w-3xl mx-auto text-center">
        <h2 className="font-heading font-extrabold text-4xl md:text-5xl text-white leading-tight">
          Rejoignez l'aventure
          <br />
          <span className="text-coral-500">humaine et solidaire</span>
        </h2>
        <p className="text-white/60 mt-6 mb-9 leading-relaxed max-w-xl mx-auto">
          Devenez partenaire ou sponsor de LIAM Groupe et associez votre image
          à des actions concrètes qui changent des vies en République
          Centrafricaine.
        </p>
        <Link
          to="/partenaires"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-coral-500 hover:bg-coral-600 text-white font-semibold transition-colors"
        >
          <HeartHandshake className="w-5 h-5" />
          Devenir partenaire
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
