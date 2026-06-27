import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  LayoutGrid,
  CalendarDays,
  Newspaper,
  Users,
  Handshake,
  MessageSquareQuote,
  Settings,
  LogOut,
  X,
} from "lucide-react";

const menu = [
  { label: "Tableau de bord", section: "dashboard", icon: LayoutDashboard },
  { label: "Domaines", section: "domains", icon: LayoutGrid },
  { label: "Événements", section: "events", icon: CalendarDays },
  { label: "Actualités", section: "news", icon: Newspaper },
  { label: "Équipe", section: "team", icon: Users },
  { label: "Partenaires", section: "partners", icon: Handshake },
  { label: "Témoignages", section: "testimonials", icon: MessageSquareQuote },
  { label: "Paramètres", section: "settings", icon: Settings },
];

export default function AdminSidebar({ activeSection, onNavigate, onLogout, mobileOpen, onCloseMobile }) {
  const linkClass = (section) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
      activeSection === section
        ? "bg-brand-500/10 text-brand-500 font-semibold"
        : "text-white/60 hover:text-white hover:bg-white/5"
    }`;

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 h-screen bg-[#130025] shrink-0">
        <div className="p-6 border-b border-white/10">
          <h2 className="font-heading font-bold text-xl text-white">
            LIAM<span className="text-brand-500">.</span>
          </h2>
          <p className="text-white/40 text-sm mt-0.5">Administration</p>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {menu.map((item) => (
            <button
              key={item.section}
              onClick={() => onNavigate(item.section)}
              className={`w-full ${linkClass(item.section)}`}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={onLogout}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-white/40 hover:text-white hover:bg-white/5 transition-all w-full"
          >
            <LogOut className="w-5 h-5" />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={onCloseMobile} />
          <aside className="relative w-72 h-full bg-[#130025] flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="font-heading font-bold text-xl text-white">
                LIAM<span className="text-brand-500">.</span>
              </h2>
              <button onClick={onCloseMobile} className="text-white/60 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto p-4 space-y-1">
              {menu.map((item) => (
                <button
                  key={item.section}
                  onClick={() => {
                    onNavigate(item.section);
                    onCloseMobile();
                  }}
                  className={`w-full ${linkClass(item.section)}`}
                >
                  <item.icon className="w-5 h-5 shrink-0" />
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="p-4 border-t border-white/10">
              <button
                onClick={onLogout}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-white/40 hover:text-white hover:bg-white/5 transition-all w-full"
              >
                <LogOut className="w-5 h-5" />
                Déconnexion
              </button>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
