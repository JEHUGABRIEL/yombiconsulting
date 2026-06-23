import { useParams, Navigate } from "react-router-dom";
import { Target, Layers, Image as ImageIcon } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SectionHeading from "../components/SectionHeading";
import StatsBand from "../components/StatsBand";
import { ActCTA } from "../components/CTASection";
import { DomainIcon } from "../components/DomainIcon";
import { domains } from "../data/siteData";

export default function Domain() {
  const { slug } = useParams();
  const domain = domains.find((d) => d.slug === slug);

  if (!domain) return <Navigate to="/domaines" replace />;

  return (
    <div className="font-body">
      <Navbar />

      {/* HERO */}
      <section className="relative h-[560px]">
        <img
          src={domain.heroImage}
          alt={domain.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </section>

      {/* OBJECTIFS */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionHeading icon={Target} eyebrow="Objectifs" title="Nos ambitions pour ce domaine" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {domain.objectives.map((o, i) => (
              <div
                key={o}
                className="flex gap-4 items-start border border-gray-100 rounded-2xl p-6 shadow-card"
              >
                <span className="w-9 h-9 rounded-full bg-rose-50 text-coral-500 font-heading font-bold flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                <p className="text-gray-600 leading-relaxed pt-1">{o}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAMMES */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <SectionHeading icon={Layers} eyebrow="Programmes" title="Nos actions concrètes" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {domain.programs.map((p) => (
              <div key={p.title} className="bg-white rounded-2xl border border-gray-100 shadow-card p-7">
                <span className="w-12 h-12 rounded-full bg-violet-50 text-violet-600 flex items-center justify-center mb-5">
                  <DomainIcon icon={domain.icon} className="w-6 h-6" />
                </span>
                <h3 className="font-heading font-bold text-lg mb-2">{p.title}</h3>
                <p className="text-gray-500 leading-relaxed">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <StatsBand stats={domain.stats} tone="coral" />

      {/* GALERIE */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeading icon={ImageIcon} eyebrow="Galerie" title="En images" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {domain.gallery.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`${domain.name} ${i + 1}`}
                className="rounded-2xl object-cover w-full h-[380px]"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </section>

      <ActCTA title={`Soutenez ${domain.name}`} />

      <Footer />
    </div>
  );
}
