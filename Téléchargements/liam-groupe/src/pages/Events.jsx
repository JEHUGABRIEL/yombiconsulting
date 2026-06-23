import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import EventCard from "../components/EventCard";
import { events, img } from "../data/siteData";

const filters = [
  { key: "tous", label: "Tous" },
  { key: "a_venir", label: "À venir" },
  { key: "passe", label: "Passés" },
];

export default function Events() {
  const [active, setActive] = useState("tous");
  const filtered = active === "tous" ? events : events.filter((e) => e.status === active);

  return (
    <div className="font-body">
      <Navbar />

      <section className="relative h-[480px]">
        <img
          src={img("evenements-hero", 1920, 700)}
          alt="Concert et spectacle"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-14">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setActive(f.key)}
                className={`px-6 py-2.5 rounded-full font-semibold transition-colors ${
                  active === f.key
                    ? "bg-violet-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {filtered.map((e) => (
              <EventCard key={e.slug} event={e} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
