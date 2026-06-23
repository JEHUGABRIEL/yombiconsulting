import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  LayoutGrid,
  HeartHandshake,
  MessageSquare,
  Mail,
  MapPin,
  Phone,
  Clock,
  Send,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SectionHeading from "../components/SectionHeading";
import DomainCard from "../components/DomainCard";
import EventCard from "../components/EventCard";
import StatsBand from "../components/StatsBand";
import TestimonialCarousel from "../components/TestimonialCarousel";
import { JoinCTA } from "../components/CTASection";
import { domains, events, homeStats, partners, siteInfo, homeHeroImages } from "../data/siteData";

export default function Home() {
  const upcomingAndRecent = events.slice(0, 3);
  const [heroIdx, setHeroIdx] = useState(0);

  const nextHero = useCallback(() => {
    setHeroIdx((prev) => (prev + 1) % homeHeroImages.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextHero, 7000);
    return () => clearInterval(timer);
  }, [nextHero]);

  return (
    <div className="font-body">
      <Navbar />

      {/* HERO — Carousel */}
      <section className="relative h-[820px] min-h-[640px] flex items-center justify-center text-center px-6 overflow-hidden">
        {homeHeroImages.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Communauté centrafricaine ${i + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              i === heroIdx ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

        {/* Carousel dots */}
        <div className="absolute bottom-28 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {homeHeroImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setHeroIdx(i)}
              aria-label={`Image ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === heroIdx ? "w-8 bg-coral-500" : "w-2 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>

        <div className="relative max-w-4xl">
          <div className="flex items-center justify-center gap-3 text-coral-500 font-semibold tracking-[0.25em] text-xs uppercase mb-6">
            <span className="h-px w-10 bg-coral-500/60" />
            Innovation · Ambition · Mission
            <span className="h-px w-10 bg-coral-500/60" />
          </div>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl text-white leading-tight">
            Construisons ensemble
            <br />
            <span className="text-coral-500">la Centrafrique de demain</span>
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto mt-6 leading-relaxed">
            LIAM Groupe mobilise les femmes et les jeunes centrafricains à
            travers le sport, l'entrepreneuriat, la gastronomie solidaire et la
            formation pour un impact durable au cœur de Bangui.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-9">
            <Link
              to="/partenaires"
              className="px-7 py-3.5 rounded-full bg-coral-500 hover:bg-coral-600 text-white font-semibold transition-colors"
            >
              Devenir partenaire
            </Link>
            <Link
              to="/evenements"
              className="px-7 py-3.5 rounded-full border border-white/40 text-white font-semibold hover:bg-white/10 transition-colors inline-flex items-center gap-2"
            >
              Voir nos événements <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
        <ChevronDown className="absolute bottom-8 text-white/70 w-6 h-6 animate-bounce" />
      </section>

      {/* DOMAINES */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            icon={LayoutGrid}
            eyebrow="Nos actions"
            variant="violet"
            title="Nos 6 domaines d'intervention"
            description="Des programmes concrets pour répondre aux besoins des communautés centrafricaines, avec un focus sur l'autonomisation des femmes et des jeunes."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {domains.map((d) => (
              <DomainCard key={d.slug} domain={d} />
            ))}
          </div>
        </div>
      </section>

      {/* EVENEMENTS */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
            <div>
              <p className="text-coral-500 italic font-medium mb-2">
                Prochainement &amp; récemment
              </p>
              <h2 className="font-heading font-bold text-3xl md:text-4xl">Nos événements</h2>
            </div>
            <Link
              to="/evenements"
              className="text-violet-600 font-semibold inline-flex items-center gap-1.5 hover:gap-2.5 transition-all"
            >
              Voir tous les événements <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {upcomingAndRecent.map((e) => (
              <EventCard key={e.slug} event={e} compact />
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <StatsBand
        title="LIAM Groupe en chiffres"
        description="Depuis notre création, nous œuvrons chaque jour pour un impact concret et mesurable au sein des communautés centrafricaines."
        stats={homeStats}
        tone="violet"
      />        {/* CONFIANCE / PARTENAIRES */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            icon={HeartHandshake}
            eyebrow="Confiance"
            title="Ils nous font confiance"
            description="Des partenaires engagés qui soutiennent notre mission pour une Centrafrique plus forte et plus solidaire."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {partners.map((p, i) => (
              <div
                key={p.name + i}
                className="border border-gray-100 rounded-2xl p-7 flex flex-col items-center text-center hover:shadow-card transition-shadow"
              >
                {p.logo ? (
                  <div className="w-20 h-20 flex items-center justify-center mb-4">
                    <img
                      src={p.logo}
                      alt={p.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                ) : (
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center text-white font-heading font-bold text-2xl mb-4"
                    style={{ backgroundColor: p.color }}
                  >
                    {p.initial}
                  </div>
                )}
                <h3 className="font-heading font-bold">{p.name}</h3>
                <p className="text-gray-500 text-sm mt-1.5 leading-relaxed">{p.subtitle}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link
              to="/partenaires"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-violet-500 hover:bg-violet-600 text-white font-semibold transition-colors"
            >
              Découvrir tous nos partenaires <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* TEMOIGNAGES */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            icon={MessageSquare}
            eyebrow="Témoignages"
            variant="blue"
            title="Ce qu'ils disent de nous"
            description="Les retours de nos partenaires, bénéficiaires et collaborateurs qui font vivre notre mission au quotidien."
          />
          <TestimonialCarousel />
        </div>
      </section>

      <JoinCTA />

      {/* CONTACT */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            icon={Mail}
            eyebrow="Contact"
            variant="violet"
            title="Parlons de votre projet"
            description="Une idée, une proposition de partenariat, ou simplement envie d'en savoir plus ? Écrivez-nous, on vous répond rapidement."
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-7">
              <ContactItem icon={MapPin} label="Adresse" lines={siteInfo.address} />
              <ContactItem icon={Phone} label="Téléphone" lines={siteInfo.phones} />
              <ContactItem icon={Mail} label="Email" lines={siteInfo.emails} />
              <ContactItem icon={Clock} label="Heures d'ouverture" lines={siteInfo.hours} />
            </div>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="bg-white border border-gray-100 shadow-card rounded-2xl p-8 space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Nom complet" placeholder="Votre nom" />
                <Field label="Email" placeholder="votre@email.com" type="email" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Sujet</label>
                <select className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-violet-400 text-gray-600">
                  <option>Sélectionnez un sujet</option>
                  <option>Partenariat</option>
                  <option>Bénévolat</option>
                  <option>Presse</option>
                  <option>Autre</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  rows={5}
                  placeholder="Dites-nous tout…"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-violet-400 resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-violet-500 hover:bg-violet-600 text-white font-semibold inline-flex items-center justify-center gap-2 transition-colors"
              >
                <Send className="w-4 h-4" /> Envoyer le message
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function ContactItem({ icon: Icon, label, lines }) {
  return (
    <div className="flex gap-4">
      <span className="w-11 h-11 rounded-full bg-rose-50 text-coral-500 flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5" />
      </span>
      <div>
        <p className="font-heading font-bold">{label}</p>
        {lines.map((l) => (
          <p key={l} className="text-gray-500">
            {l}
          </p>
        ))}
      </div>
    </div>
  );
}

function Field({ label, placeholder, type = "text" }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-violet-400"
      />
    </div>
  );
}
