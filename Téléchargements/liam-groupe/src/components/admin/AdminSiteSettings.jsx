import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase.js";
import {
  Save, Loader2, Plus, Trash2,
  ImageIcon, X, RotateCcw,
} from "lucide-react";

// ─── Default values ────────────────────────────────────────────────────────
const DEFAULTS = {
  siteInfo: {
    name: "LIAM",
    fullName: "LIAM Groupe",
    tagline: "Construisons ensemble la Centrafrique de demain",
    description: "",
    address: [""],
    phones: [""],
    emails: [""],
    hours: [""],
    contactPage: {
      address: [""],
      phones: [""],
      emails: [""],
      hours: [""],
    },
  },
  navLinks: [],
  footerLinks: { liamGroupe: [], domaines: [], agir: [] },
  homeHeroImages: [],
  homeStats: [],
  aboutStats: [],
};

const SETTING_LABELS = {
  siteInfo: "Informations générales",
  navLinks: "Navigation",
  footerLinks: "Pied de page",
  homeHeroImages: "Images hero (Accueil)",
  homeStats: "Statistiques (Accueil)",
  aboutStats: "Statistiques (À propos)",
};

const SETTING_ICONS = {
  siteInfo: "🏠",
  navLinks: "🧭",
  footerLinks: "📄",
  homeHeroImages: "🖼️",
  homeStats: "📊",
  aboutStats: "📈",
};

// ─── Utility to safely parse JSONB value ───────────────────────────────────
function safeParse(value, fallback) {
  if (value === null || value === undefined) return fallback;
  if (typeof value === "object") return value;
  try {
    const parsed = JSON.parse(value);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

// ─── Component ──────────────────────────────────────────────────────────────
export default function AdminSiteSettings() {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("siteInfo");
  const [dirty, setDirty] = useState({});
  const [toast, setToast] = useState(null);

  const keys = Object.keys(SETTING_LABELS);

  useEffect(() => {
    loadSettings();
  }, []);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const loadSettings = async () => {
    setLoading(true);
    const result = {};
    for (const key of keys) {
      const { data, error } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", key)
        .single();
      result[key] = error ? DEFAULTS[key] : safeParse(data?.value, DEFAULTS[key]);
    }
    setSettings(result);
    setLoading(false);
  };

  const updateValue = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setDirty((prev) => ({ ...prev, [key]: true }));
  };

  const saveSetting = async (key) => {
    setSaving(true);
    const value = settings[key];
    const { error } = await supabase
      .from("site_settings")
      .upsert({ key, value }, { onConflict: "key" });
    setSaving(false);
    if (error) {
      showToast(`Erreur : ${error.message}`, "error");
    } else {
      setDirty((prev) => ({ ...prev, [key]: false }));
      showToast(`« ${SETTING_LABELS[key]} » enregistré ✅`);
    }
  };

  const saveAll = async () => {
    setSaving(true);
    for (const key of keys) {
      const { error } = await supabase
        .from("site_settings")
        .upsert({ key, value: settings[key] }, { onConflict: "key" });
      if (error) {
        showToast(`Erreur sur ${key} : ${error.message}`, "error");
        setSaving(false);
        return;
      }
    }
    setDirty({});
    setSaving(false);
    showToast("Tous les paramètres enregistrés ✅");
  };

  // ── Render helpers ──

  const renderText = (key, field, label, opts = {}) => (
    <div key={field}>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {opts.multiline ? (
        <textarea
          value={settings[key]?.[field] ?? ""}
          onChange={(e) => updateValue(key, { ...settings[key], [field]: e.target.value })}
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-brand-400 transition-colors text-sm resize-y min-h-[80px]"
          rows={opts.rows || 3}
        />
      ) : (
        <input
          type="text"
          value={settings[key]?.[field] ?? ""}
          onChange={(e) => updateValue(key, { ...settings[key], [field]: e.target.value })}
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-brand-400 transition-colors text-sm"
        />
      )}
    </div>
  );

  const renderArrayField = (key, arrayKey, label, itemLabel, itemPlaceholder = "") => {
    const arr = settings[key]?.[arrayKey] ?? [];
    return (
      <div key={arrayKey}>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
        <div className="space-y-2">
          {arr.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                type="text"
                value={item}
                onChange={(e) => {
                  const next = [...arr];
                  next[i] = e.target.value;
                  updateValue(key, { ...settings[key], [arrayKey]: next });
                }}
                placeholder={itemPlaceholder}
                className="flex-1 border border-gray-200 rounded-xl px-4 py-2 outline-none focus:border-brand-400 transition-colors text-sm"
              />
              <button
                onClick={() => {
                  const next = arr.filter((_, j) => j !== i);
                  updateValue(key, { ...settings[key], [arrayKey]: next });
                }}
                className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={() => {
            const next = [...arr, ""];
            updateValue(key, { ...settings[key], [arrayKey]: next });
          }}
          className="mt-2 text-sm text-brand-600 hover:text-brand-700 font-medium inline-flex items-center gap-1"
        >
          <Plus className="w-3.5 h-3.5" /> Ajouter
        </button>
      </div>
    );
  };

  // ── Tab editors ──

  const renderSiteInfo = () => {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {renderText("siteInfo", "name", "Nom court")}
          {renderText("siteInfo", "fullName", "Nom complet")}
        </div>
        {renderText("siteInfo", "tagline", "Slogan")}
        {renderText("siteInfo", "description", "Description", { multiline: true, rows: 3 })}

        <div className="border-t border-gray-100 pt-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Adresse</h4>
          {renderArrayField("siteInfo", "address", "", "Adresse", "Avenue des Martyrs...")}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {renderArrayField("siteInfo", "phones", "Téléphones", "Téléphone", "+236 00 00 00 00")}
          {renderArrayField("siteInfo", "emails", "Emails", "Email", "contact@liamgroupe.org")}
        </div>

        {renderArrayField("siteInfo", "hours", "Horaires", "Horaire", "Lundi — Vendredi : 8h00 — 17h00")}

        <div className="border-t border-gray-100 pt-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Page Contact — Informations spécifiques</h4>
          {renderContactPageFields()}
        </div>
      </div>
    );
  };

  const renderContactPageFields = () => {
    const value = settings.siteInfo?.contactPage ?? DEFAULTS.siteInfo.contactPage;
    const updateNested = (field, newVal) => {
      updateValue("siteInfo", {
        ...settings.siteInfo,
        contactPage: { ...value, [field]: newVal },
      });
    };
    const renderNestedArray = (field, label, placeholder) => {
      const arr = value[field] ?? [];
      return (
        <div className="mb-3">
          <label className="block text-xs font-medium text-gray-500 mb-1.5">{label}</label>
          <div className="space-y-2">
            {arr.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => {
                    const next = [...arr];
                    next[i] = e.target.value;
                    updateNested(field, next);
                  }}
                  placeholder={placeholder}
                  className="flex-1 border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-brand-400 transition-colors text-sm"
                />
                <button
                  onClick={() => updateNested(field, arr.filter((_, j) => j !== i))}
                  className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={() => updateNested(field, [...arr, ""])}
            className="mt-1.5 text-xs text-brand-600 hover:text-brand-700 font-medium inline-flex items-center gap-1"
          >
            <Plus className="w-3 h-3" /> Ajouter
          </button>
        </div>
      );
    };
    return (
      <div className="pl-4 border-l-2 border-brand-100 space-y-2">
        {renderNestedArray("address", "Adresse", "Secteur 3, Bangui")}
        {renderNestedArray("phones", "Téléphones", "+236 00 00 00 00")}
        {renderNestedArray("emails", "Emails", "contact@liamgroupe.cf")}
        {renderNestedArray("hours", "Horaires", "Lundi — Vendredi : 8h00 — 17h00")}
      </div>
    );
  };

  const renderNavLinks = () => {
    const links = settings.navLinks ?? [];
    return (
      <div className="space-y-3">
        <p className="text-sm text-gray-500">Liens de navigation affichés dans le menu principal.</p>
        {links.map((link, i) => (
          <div key={i} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-gray-400 uppercase">Lien #{i + 1}</span>
              <button
                onClick={() => updateValue("navLinks", links.filter((_, j) => j !== i))}
                className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Label</label>
                <input
                  type="text"
                  value={link.label}
                  onChange={(e) => {
                    const next = [...links];
                    next[i] = { ...next[i], label: e.target.value };
                    updateValue("navLinks", next);
                  }}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-brand-400 transition-colors text-sm"
                  placeholder="Accueil"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Lien (to)</label>
                <input
                  type="text"
                  value={link.to}
                  onChange={(e) => {
                    const next = [...links];
                    next[i] = { ...next[i], to: e.target.value };
                    updateValue("navLinks", next);
                  }}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-brand-400 transition-colors text-sm"
                  placeholder="/"
                />
              </div>
              <div className="flex items-end pb-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={!!link.dropdown}
                    onChange={(e) => {
                      const next = [...links];
                      next[i] = { ...next[i], dropdown: e.target.checked };
                      updateValue("navLinks", next);
                    }}
                    className="w-4 h-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500"
                  />
                  <span className="text-xs font-medium text-gray-500">Dropdown</span>
                </label>
              </div>
            </div>
          </div>
        ))}
        <button
          onClick={() => updateValue("navLinks", [...links, { label: "", to: "/", dropdown: false }])}
          className="px-4 py-2 rounded-full border border-dashed border-gray-300 text-sm text-gray-500 hover:border-brand-400 hover:text-brand-600 transition-colors inline-flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Ajouter un lien
        </button>
      </div>
    );
  };

  const renderFooterLinks = () => {
    const data = settings.footerLinks ?? DEFAULTS.footerLinks;
    const sections = [
      { key: "liamGroupe", label: "LIAM Groupe" },
      { key: "domaines", label: "Domaines" },
      { key: "agir", label: "Agir" },
    ];

    const updateSection = (sectionKey, items) => {
      updateValue("footerLinks", { ...data, [sectionKey]: items });
    };

    return (
      <div className="space-y-6">
        <p className="text-sm text-gray-500">Colonnes de navigation dans le pied de page.</p>
        {sections.map(({ key: sectionKey, label }) => {
          const items = data[sectionKey] ?? [];
          return (
            <div key={sectionKey}>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">{label}</h4>
              <div className="space-y-2">
                {items.map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={item.label}
                      onChange={(e) => {
                        const next = [...items];
                        next[i] = { ...next[i], label: e.target.value };
                        updateSection(sectionKey, next);
                      }}
                      placeholder="Label"
                      className="flex-1 border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-brand-400 transition-colors text-sm"
                    />
                    <input
                      type="text"
                      value={item.to}
                      onChange={(e) => {
                        const next = [...items];
                        next[i] = { ...next[i], to: e.target.value };
                        updateSection(sectionKey, next);
                      }}
                      placeholder="/lien"
                      className="flex-1 border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-brand-400 transition-colors text-sm"
                    />
                    <button
                      onClick={() => updateSection(sectionKey, items.filter((_, j) => j !== i))}
                      className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={() => updateSection(sectionKey, [...items, { label: "", to: "/" }])}
                className="mt-2 text-sm text-brand-600 hover:text-brand-700 font-medium inline-flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Ajouter un lien
              </button>
            </div>
          );
        })}
      </div>
    );
  };

  const renderHeroImages = () => {
    const images = settings.homeHeroImages ?? [];
    return (
      <div className="space-y-3">
        <p className="text-sm text-gray-500">Images du carousel hero de la page d'accueil (URLs Cloudinary).</p>
        {images.map((url, i) => (
          <div key={i} className="bg-gray-50 rounded-xl p-3 border border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold text-gray-400">#{i + 1}</span>
              <button
                onClick={() => updateValue("homeHeroImages", images.filter((_, j) => j !== i))}
                className="ml-auto p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-16 h-10 rounded-lg bg-gray-200 flex items-center justify-center overflow-hidden shrink-0">
                {url ? (
                  <img src={url} alt="" className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon className="w-5 h-5 text-gray-400" />
                )}
              </div>
              <input
                type="text"
                value={url}
                onChange={(e) => {
                  const next = [...images];
                  next[i] = e.target.value;
                  updateValue("homeHeroImages", next);
                }}
                placeholder="https://res.cloudinary.com/..."
                className="flex-1 border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-brand-400 transition-colors text-sm font-mono text-xs"
              />
            </div>
          </div>
        ))}
        <button
          onClick={() => updateValue("homeHeroImages", [...images, ""])}
          className="px-4 py-2 rounded-full border border-dashed border-gray-300 text-sm text-gray-500 hover:border-brand-400 hover:text-brand-600 transition-colors inline-flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Ajouter une image
        </button>
      </div>
    );
  };

  const renderStats = (key, label) => {
    const stats = settings[key] ?? [];
    return (
      <div className="space-y-3">
        <p className="text-sm text-gray-500">Paires « valeur / label » affichées dans la section {label}.</p>
        {stats.map((stat, i) => (
          <div key={i} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-gray-400 uppercase">Stat #{i + 1}</span>
              <button
                onClick={() => updateValue(key, stats.filter((_, j) => j !== i))}
                className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Valeur</label>
                <input
                  type="text"
                  value={stat.value}
                  onChange={(e) => {
                    const next = [...stats];
                    next[i] = { ...next[i], value: e.target.value };
                    updateValue(key, next);
                  }}
                  placeholder="5000+"
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-brand-400 transition-colors text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Label</label>
                <input
                  type="text"
                  value={stat.label}
                  onChange={(e) => {
                    const next = [...stats];
                    next[i] = { ...next[i], label: e.target.value };
                    updateValue(key, next);
                  }}
                  placeholder="Bénéficiaires"
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-brand-400 transition-colors text-sm"
                />
              </div>
            </div>
          </div>
        ))}
        <button
          onClick={() => updateValue(key, [...stats, { value: "", label: "" }])}
          className="px-4 py-2 rounded-full border border-dashed border-gray-300 text-sm text-gray-500 hover:border-brand-400 hover:text-brand-600 transition-colors inline-flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Ajouter une statistique
        </button>
      </div>
    );
  };

  const renderEditor = () => {
    switch (activeTab) {
      case "siteInfo": return renderSiteInfo();
      case "navLinks": return renderNavLinks();
      case "footerLinks": return renderFooterLinks();
      case "homeHeroImages": return renderHeroImages();
      case "homeStats": return renderStats("homeStats", "Accueil");
      case "aboutStats": return renderStats("aboutStats", "À propos");
      default: return null;
    }
  };

  // ── Main render ──

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 text-brand-500 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-heading font-bold text-2xl md:text-3xl text-gray-900">
            Paramètres du site
          </h1>
          <p className="text-gray-500 text-sm mt-0.5">
            Gérez les informations générales, la navigation et les contenus statiques.
          </p>
        </div>
        <button
          onClick={saveAll}
          disabled={saving || Object.keys(dirty).length === 0}
          className="px-5 py-2.5 rounded-full bg-brand-500 hover:bg-brand-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm inline-flex items-center gap-2 transition-colors"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Tout enregistrer
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {keys.map((key) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === key
                ? "bg-brand-500 text-white shadow-sm"
                : `bg-white border border-gray-200 text-gray-600 hover:border-brand-300 hover:text-brand-600 ${
                    dirty[key] ? "ring-2 ring-amber-300" : ""
                  }`
            }`}
          >
            <span className="mr-1.5">{SETTING_ICONS[key]}</span>
            {SETTING_LABELS[key]}
            {dirty[key] && <span className="ml-1.5 w-2 h-2 bg-amber-400 rounded-full inline-block" />}
          </button>
        ))}
      </div>

      {/* Editor card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-card">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-heading font-bold text-lg">
            {SETTING_LABELS[activeTab]}
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                updateValue(activeTab, JSON.parse(JSON.stringify(DEFAULTS[activeTab])));
                showToast(`« ${SETTING_LABELS[activeTab]} » réinitialisé`);
              }}
              className="px-3 py-2 rounded-full border border-gray-200 text-gray-500 hover:text-red-600 hover:border-red-200 hover:bg-red-50 text-xs font-medium inline-flex items-center gap-1.5 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Réinitialiser
            </button>
            <button
              onClick={() => saveSetting(activeTab)}
              disabled={saving || !dirty[activeTab]}
              className="px-4 py-2 rounded-full bg-brand-500 hover:bg-brand-600 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium inline-flex items-center gap-1.5 transition-colors"
            >
              {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
              Enregistrer
            </button>
          </div>
        </div>
        <div className="p-6">
          {renderEditor()}
        </div>
      </div>

      {/* Toast notification */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl shadow-xl text-sm font-medium transition-all animate-fade-up ${
            toast.type === "error"
              ? "bg-red-500 text-white"
              : "bg-green-600 text-white"
          }`}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}
