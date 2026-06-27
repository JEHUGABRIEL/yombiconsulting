import { Target, Compass, Flag } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SectionHeading from "../components/SectionHeading";
import TeamCard from "../components/TeamCard";
import { useAboutStats, useTeam } from "../hooks/useSiteData";
import { img } from "../data/siteData";

export default function About() {
  const { data: aboutStats = [] } = useAboutStats();
  const { data: team = [] } = useTeam();

  return (
    <div className="font-body">
      <Navbar />

      {/* HERO */}
      <section className="relative h-[480px]">
        <img
          src={img("apropos-hero", 1920, 700)}
          alt="Jeunes en formation"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </section>

      {/* MISSION */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            icon={Target}
            eyebrow="Notre raison d'être"
            title="Innovation · Ambition · Mission"
            align="left"
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-gray-500 leading-relaxed mb-5">
                Fondée en 2015 à Bangui, LIAM Groupe est une organisation non
                gouvernementale centrafricaine qui œuvre pour le développement
                durable des communautés à travers l'innovation sociale, le
                sport, l'entrepreneuriat féminin et la culture.
              </p>
              <p className="text-gray-500 leading-relaxed mb-8">
                Notre nom incarne trois valeurs fondamentales :{" "}
                <strong className="text-ink">Innovation</strong> dans nos
                approches, <strong className="text-ink">Ambition</strong> dans
                nos objectifs, et <strong className="text-ink">Mission</strong>{" "}
                dans notre engagement sans faille pour la jeunesse et les
                femmes centrafricaines.
              </p>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <span className="w-11 h-11 rounded-full bg-brand-50 text-brand-500 flex items-center justify-center shrink-0">
                    <Target className="w-5 h-5" />
                  </span>
                  <div>
                    <h3 className="font-heading font-bold mb-1">Notre vision</h3>
                    <p className="text-gray-500 leading-relaxed">
                      Une Centrafrique où chaque femme et chaque jeune dispose
                      des outils pour s'épanouir et contribuer activement au
                      développement national.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="w-11 h-11 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
                    <Compass className="w-5 h-5" />
                  </span>
                  <div>
                    <h3 className="font-heading font-bold mb-1">Notre mission</h3>
                    <p className="text-gray-500 leading-relaxed">
                      Mobiliser, former et accompagner les femmes et les
                      jeunes centrafricains à travers des programmes concrets
                      dans six domaines d'intervention complémentaires.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <img
                src={img("apropos-1", 600, 700)}
                alt="Jeunes en atelier"
                className="rounded-2xl object-cover w-full h-[340px] mt-8"
                loading="lazy"
              />
              <img
                src={img("apropos-2", 600, 700)}
                alt="Femmes en réunion"
                className="rounded-2xl object-cover w-full h-[340px]"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* STATS clair */}
      <section className="bg-brand-50/60 py-14 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {aboutStats.map((s) => (
            <div key={s.label}>
              <p className="font-heading font-extrabold text-4xl md:text-5xl text-brand-600">
                {s.value}
              </p>
              <p className="text-gray-500 mt-2">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* EQUIPE */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            icon={Flag}
            eyebrow="Notre équipe"
            title="Les visages de LIAM Groupe"
            description="Une équipe passionnée et déterminée qui met son expertise au service de la communauté centrafricaine."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {team.map((m) => (
              <TeamCard key={m.name} member={m} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
