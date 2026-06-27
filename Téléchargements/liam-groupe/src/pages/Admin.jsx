import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, ArrowLeft } from "lucide-react";
import AdminLogin from "../components/admin/AdminLogin";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminDashboard from "../components/admin/AdminDashboard";
import AdminContentManager from "../components/admin/AdminContentManager";

export default function Admin() {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const [section, setSection] = useState("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("liam-admin-authenticated");
    if (stored === "true") setAuthenticated(true);
  }, []);

  if (!authenticated) {
    return <AdminLogin onLogin={() => setAuthenticated(true)} />;
  }

  const handleLogout = () => {
    localStorage.removeItem("liam-admin-authenticated");
    setAuthenticated(false);
  };

  const handleNavigate = (s) => {
    setSection(s);
    setMobileOpen(false);
  };

  const sections = ["dashboard", "domains", "events", "news", "team", "partners", "testimonials", "settings"];

  // Manage section as route param
  const goToSite = () => navigate("/");

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <AdminSidebar
        activeSection={section}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile header */}
        <header className="lg:hidden flex items-center justify-between px-5 py-3 bg-white border-b border-gray-100">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
          >
            <Menu className="w-5 h-5" />
          </button>
          <span className="font-heading font-bold text-lg">
            LIAM<span className="text-brand-500">.</span>
          </span>
          <button
            onClick={goToSite}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-400"
            title="Retour au site"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        </header>

        <main className="flex-1 overflow-y-auto p-6 lg:p-10">
          {section === "dashboard" && <AdminDashboard onNavigate={handleNavigate} />}
          {["domains", "events", "news", "team", "partners", "testimonials"].includes(section) && (
            <AdminContentManager table={section} />
          )}
          {section === "settings" && <SettingsPlaceholder />}
        </main>
      </div>
    </div>
  );
}

function SettingsPlaceholder() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading font-bold text-2xl md:text-3xl text-gray-900">
          Paramètres du site
        </h1>
        <p className="text-gray-500 mt-1">
          Gérez les informations générales du site.
        </p>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-8 text-center">
        <p className="text-gray-400">
          Fonctionnalité à venir — utilisez le fichier <code className="text-brand-600 bg-brand-50 px-2 py-0.5 rounded text-sm">src/data/siteData.js</code> pour modifier les paramètres.
        </p>
      </div>
    </div>
  );
}
