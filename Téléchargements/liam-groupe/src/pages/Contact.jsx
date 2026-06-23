import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { FacebookIcon, InstagramIcon, XIcon, YoutubeIcon } from "../components/SocialIcons";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SectionHeading from "../components/SectionHeading";
import { siteInfo, img } from "../data/siteData";

export default function Contact() {
  const info = siteInfo.contactPage;

  return (
    <div className="font-body">
      <Navbar />

      <section className="relative h-[480px]">
        <img
          src={img("contact-hero", 1920, 700)}
          alt="Bureaux LIAM Groupe"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </section>

      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeading icon={MapPin} eyebrow="Nos coordonnées" title="Restons en contact" align="left" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <p className="text-gray-500 leading-relaxed mb-8 -mt-4 max-w-md">
                Notre équipe est basée à Bangui et disponible pour échanger
                sur vos projets, vos idées de partenariat ou toute question
                sur nos programmes.
              </p>
              <div className="space-y-7">
                <ContactItem icon={MapPin} label="Adresse" lines={info.address} />
                <ContactItem icon={Phone} label="Téléphone" lines={info.phones} />
                <ContactItem icon={Mail} label="Email" lines={info.emails} />
                <ContactItem icon={Clock} label="Horaires" lines={info.hours} />
              </div>

              <div className="mt-10 bg-violet-50/60 rounded-2xl p-7">
                <h3 className="font-heading font-bold mb-1">Suivez-nous</h3>
                <p className="text-gray-500 mb-5">
                  Restez informés de nos actualités et événements.
                </p>
                <div className="flex items-center gap-3">
                  {[FacebookIcon, InstagramIcon, XIcon, YoutubeIcon].map((Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      aria-label="social"
                      className="w-10 h-10 rounded-lg border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="bg-white border border-gray-100 shadow-card rounded-2xl p-8 space-y-5 h-fit"
            >
              <h3 className="font-heading font-bold text-lg">Envoyez-nous un message</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Prénom" placeholder="Votre prénom" />
                <Field label="Nom" placeholder="Votre nom" />
              </div>
              <Field label="Email" placeholder="votre@email.com" type="email" />
              <div>
                <label className="block text-sm font-medium mb-2">Sujet</label>
                <select className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-violet-400 text-gray-600">
                  <option>Choisir un sujet</option>
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
                  maxLength={500}
                  placeholder="Votre message…"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-violet-400 resize-none"
                />
                <p className="text-gray-400 text-xs mt-1.5">Maximum 500 caractères</p>
              </div>
              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-violet-500 hover:bg-violet-600 text-white font-semibold inline-flex items-center justify-center gap-2 transition-colors"
              >
                Envoyer le message <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-2xl overflow-hidden border border-gray-100 h-[420px]">
            <iframe
              title="Localisation Bangui"
              className="w-full h-full"
              loading="lazy"
              src="https://www.openstreetmap.org/export/embed.html?bbox=18.50%2C4.30%2C18.65%2C4.42&layer=mapnik&marker=4.3614%2C18.5550"
            />
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
      <span className="w-11 h-11 rounded-full bg-violet-50 text-violet-600 flex items-center justify-center shrink-0">
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
