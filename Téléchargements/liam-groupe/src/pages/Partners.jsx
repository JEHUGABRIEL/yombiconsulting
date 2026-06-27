import { Handshake } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SectionHeading from "../components/SectionHeading";
import PartnerCard from "../components/PartnerCard";
import { usePartners } from "../hooks/useSiteData";
import { img } from "../data/siteData";

export default function Partners() {
  const { data: partners = [] } = usePartners();

  return (
    <div className="font-body">
      <Navbar />

      <section className="relative h-[480px]">
        <img
          src={img("partenaires-hero", 1920, 700)}
          alt="Poignée de main partenariat"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            icon={Handshake}
            eyebrow="Alliés stratégiques"
            title="Ils nous font confiance"
            description="De l'institution internationale à l'entreprise locale, chaque partenaire apporte une pierre essentielle à notre édifice."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {partners.map((p) => (
              <PartnerCard key={p.name} partner={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 text-brand-500 font-semibold tracking-[0.2em] text-xs uppercase mb-4">
            <span className="h-px w-10 bg-brand-500/40" />
            Rejoignez-nous
            <span className="h-px w-10 bg-brand-500/40" />
          </div>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mb-4">
            Devenez partenaire de LIAM Groupe
          </h2>
          <p className="text-white/60 leading-relaxed mb-9">
            Vous souhaitez soutenir nos actions en Centrafrique ? Rejoignez
            notre réseau de partenaires et participez activement au
            développement du pays.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#"
              className="px-7 py-3 rounded-full bg-brand-500 hover:bg-brand-600 text-white font-semibold transition-colors"
            >
              Postuler au partenariat
            </a>
            <Link
              to="/contact"
              className="px-7 py-3 rounded-full border border-white/30 text-white font-semibold hover:bg-white/10 transition-colors"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
