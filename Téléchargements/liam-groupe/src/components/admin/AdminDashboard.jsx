import { useDomains, useEvents, useNews, useTeam, usePartners, useTestimonials } from "../../hooks/useSiteData";
import { LayoutGrid, CalendarDays, Newspaper, Users, Handshake, MessageSquareQuote, ArrowUpRight } from "lucide-react";

const statCards = [
  { label: "Domaines", hook: useDomains, icon: LayoutGrid, color: "bg-blue-50 text-blue-600", section: "domains" },
  { label: "Événements", hook: useEvents, icon: CalendarDays, color: "bg-amber-50 text-amber-600", section: "events" },
  { label: "Actualités", hook: useNews, icon: Newspaper, color: "bg-green-50 text-green-600", section: "news" },
  { label: "Membres équipe", hook: useTeam, icon: Users, color: "bg-purple-50 text-purple-600", section: "team" },
  { label: "Partenaires", hook: usePartners, icon: Handshake, color: "bg-rose-50 text-rose-600", section: "partners" },
  { label: "Témoignages", hook: useTestimonials, icon: MessageSquareQuote, color: "bg-teal-50 text-teal-600", section: "testimonials" },
];

export default function AdminDashboard({ onNavigate }) {
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading font-bold text-2xl md:text-3xl text-gray-900">
          Tableau de bord
        </h1>
        <p className="text-gray-500 mt-1">
          Aperçu général des contenus du site LIAM Groupe.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {statCards.map((card) => (
          <StatCard key={card.label} {...card} onNavigate={onNavigate} />
        ))}
      </div>

      <div className="mt-10 bg-brand-50/40 rounded-2xl p-7">
        <h2 className="font-heading font-bold text-lg mb-2">
          Gestion des contenus
        </h2>
        <p className="text-gray-500 mb-5">
          Utilisez la navigation latérale pour gérer chaque type de contenu.
        </p>
        <div className="flex flex-wrap gap-3">
          {["Domaines", "Événements", "Actualités", "Équipe", "Partenaires", "Témoignages"].map(
            (name, i) => {
              const slugs = ["domains", "events", "news", "team", "partners", "testimonials"];
              return (
                <button
                  key={name}
                  onClick={() => onNavigate(slugs[i])}
                  className="px-4 py-2 rounded-full bg-white border border-gray-200 text-sm font-medium hover:border-brand-300 hover:text-brand-600 transition-colors"
                >
                  {name}
                </button>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, hook: useHook, icon: Icon, color, onNavigate, section }) {
  const { data = [] } = useHook();
  const count = Array.isArray(data) ? data.length : 0;

  return (
    <button
      onClick={() => onNavigate(section)}
      className="bg-white rounded-2xl border border-gray-100 shadow-card p-6 text-left hover:shadow-lg hover:-translate-y-0.5 transition-all group"
    >
      <div className="flex items-center justify-between mb-4">
        <span className={`w-11 h-11 rounded-xl ${color} flex items-center justify-center`}>
          <Icon className="w-5 h-5" />
        </span>
        <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-brand-500 transition-colors" />
      </div>
      <p className="font-heading font-bold text-3xl text-gray-900">{count}</p>
      <p className="text-gray-500 text-sm mt-1">{label}</p>
    </button>
  );
}
