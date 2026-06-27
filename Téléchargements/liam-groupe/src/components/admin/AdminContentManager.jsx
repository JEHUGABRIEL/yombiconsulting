import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase.js";
import AdminImageUpload from "./AdminImageUpload";
import AdminGalleryUpload from "./AdminGalleryUpload";
import {
  Plus, Pencil, Trash2, Search, ArrowUpDown,
  X, Save, Loader2, Image as ImageIcon,
  ExternalLink,
} from "lucide-react";

// ─── Field definitions per table ────────────────────────────────────────────
const TABLES = {
  domains: {
    name: "Domaines",
    labelKey: "name",
    orderField: "order_index",
    fields: [
      { key: "slug", label: "Slug", type: "text", required: true, placeholder: "mon-domaine" },
      { key: "name", label: "Nom", type: "text", required: true },
      { key: "category", label: "Catégorie", type: "text" },
      { key: "icon", label: "Icône", type: "text", placeholder: "heart, briefcase, etc." },
      { key: "short_description", label: "Description courte", type: "textarea" },
      { key: "hero_image", label: "Image hero", type: "image" },
      { key: "objectives", label: "Objectifs (JSON)", type: "json" },
      { key: "programs", label: "Programmes (JSON)", type: "json" },
      { key: "stats", label: "Statistiques (JSON)", type: "json" },
      { key: "gallery", label: "Galerie", type: "gallery" },
    ],
  },
  events: {
    name: "Événements",
    labelKey: "title",
    orderField: "order_index",
    fields: [
      { key: "slug", label: "Slug", type: "text", required: true },
      { key: "title", label: "Titre", type: "text", required: true },
      { key: "description", label: "Description", type: "textarea" },
      { key: "date", label: "Date", type: "text", placeholder: "15 Août 2026" },
      { key: "location", label: "Lieu", type: "text" },
      { key: "image", label: "Image", type: "image" },
      { key: "gallery", label: "Galerie", type: "gallery" },
      { key: "status", label: "Statut", type: "select", options: ["a_venir", "passe"] },
      { key: "category", label: "Catégorie", type: "text" },
    ],
  },
  news: {
    name: "Actualités",
    labelKey: "title",
    orderField: "order_index",
    fields: [
      { key: "slug", label: "Slug", type: "text", required: true },
      { key: "title", label: "Titre", type: "text", required: true },
      { key: "excerpt", label: "Extrait", type: "textarea" },
      { key: "image", label: "Image", type: "image" },
      { key: "gallery", label: "Galerie", type: "gallery" },
      { key: "date", label: "Date", type: "text", placeholder: "12 Juin 2026" },
      { key: "tag", label: "Tag", type: "text", placeholder: "ACTUALITÉ" },
    ],
  },
  team: {
    name: "Équipe",
    labelKey: "name",
    orderField: "order_index",
    fields: [
      { key: "name", label: "Nom", type: "text", required: true },
      { key: "role", label: "Rôle", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "image", label: "Photo", type: "image" },
    ],
  },
  partners: {
    name: "Partenaires",
    labelKey: "name",
    orderField: "order_index",
    fields: [
      { key: "name", label: "Nom", type: "text", required: true },
      { key: "subtitle", label: "Sous-titre", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "logo", label: "Logo", type: "image" },
      { key: "initial", label: "Initiale", type: "text", placeholder: "F" },
      { key: "color", label: "Couleur", type: "text", placeholder: "#8A0015" },
      { key: "category", label: "Catégorie", type: "text" },
      { key: "collaboration", label: "Collaboration", type: "textarea" },
      { key: "website", label: "Site web", type: "url" },
    ],
  },
  testimonials: {
    name: "Témoignages",
    labelKey: "name",
    orderField: "order_index",
    fields: [
      { key: "name", label: "Nom", type: "text", required: true },
      { key: "role", label: "Rôle", type: "text" },
      { key: "quote", label: "Citation", type: "textarea", required: true },
      { key: "image", label: "Photo", type: "image" },
    ],
  },
};

// ─── Column display config ─────────────────────────────────────────────────
const TABLE_COLS = {
  domains: ["slug", "name", "category"],
  events: ["title", "date", "status", "category", "gallery"],
  news: ["title", "date", "tag", "gallery"],
  team: ["name", "role"],
  partners: ["name", "category"],
  testimonials: ["name", "role"],
};

// ─── Component ──────────────────────────────────────────────────────────────
export default function AdminContentManager({ table }) {
  const config = TABLES[table];
  const columns = TABLE_COLS[table] || [];
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortDir, setSortDir] = useState("asc");
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [formDirty, setFormDirty] = useState(false);
  const [confirmClose, setConfirmClose] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .order("order_index", { ascending: true });
    if (!error) setRows(data || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, [table]);

  // Reset form values when editing changes
  useEffect(() => {
    if (editing) {
      const vals = {};
      const isNew = editing === "new";
      for (const f of config.fields) {
        if (f.type === "gallery") {
          vals[f.key] = isNew ? [] : (Array.isArray(editing[f.key]) ? [...editing[f.key]] : []);
        } else if (isNew) {
          vals[f.key] = "";
        } else {
          vals[f.key] = editing[f.key] ?? "";
        }
      }
      setFormValues(vals);
      setFormDirty(false);
    }
  }, [editing]);

  const updateFormValue = (key, value) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
    setFormDirty(true);
  };

  // Filter & sort
  const filtered = rows
    .filter((r) => {
      if (!search) return true;
      const val = config.labelKey ? r[config.labelKey] : "";
      return String(val || "").toLowerCase().includes(search.toLowerCase());
    })
    .sort((a, b) => {
      const va = a[config.orderField] ?? 0;
      const vb = b[config.orderField] ?? 0;
      return sortDir === "asc" ? va - vb : vb - va;
    });

  // ── Save ──
  const handleSave = async () => {
    setSaving(true);
    const payload = { ...formValues };
    // Parse JSON fields (string -> array/object)
    for (const f of config.fields) {
      if (f.type === "json" && typeof payload[f.key] === "string") {
        try { payload[f.key] = JSON.parse(payload[f.key]); } catch { payload[f.key] = []; }
      }
    }
    // Gallery fields are already arrays (handled by AdminGalleryUpload)
    for (const f of config.fields) {
      if (f.type === "gallery" && !Array.isArray(payload[f.key])) {
        payload[f.key] = [];
      }
    }
    if (editing === "new") {
      payload.order_index = rows.length;
    }

    const { error } = editing === "new"
      ? await supabase.from(table).insert(payload)
      : await supabase.from(table).update(payload).eq("id", editing.id);

    setSaving(false);
    if (!error) {
      setEditing(null);
      setFormDirty(false);
      load();
    } else {
      alert("Erreur : " + error.message);
    }
  };

  // ── Delete ──
  const handleDelete = async (id) => {
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (!error) {
      setDeleting(null);
      load();
    }
  };

  // ── Render field input ──
  const renderField = (field) => {
    const val = formValues[field.key] ?? "";
    const baseClass = "w-full border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-brand-400 transition-colors text-sm";

    // Single image upload
    if (field.type === "image") {
      return <AdminImageUpload value={val} onChange={(url) => updateFormValue(field.key, url)} />;
    }

    // Gallery — multiple images upload
    if (field.type === "gallery") {
      const galleryVal = Array.isArray(val) ? val : [];
      return (
        <AdminGalleryUpload
          value={galleryVal}
          onChange={(urls) => updateFormValue(field.key, urls)}
        />
      );
    }

    const displayVal =
      field.type === "json"
        ? typeof val === "string" ? val : JSON.stringify(val, null, 2)
        : val;

    if (field.type === "textarea") {
      return (
        <textarea
          value={displayVal}
          onChange={(e) => updateFormValue(field.key, e.target.value)}
          className={`${baseClass} resize-y min-h-[80px]`}
          placeholder={field.placeholder || ""}
          rows={3}
        />
      );
    }
    if (field.type === "select") {
      return (
        <select value={displayVal} onChange={(e) => updateFormValue(field.key, e.target.value)} className={baseClass}>
          {field.options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      );
    }
    if (field.type === "json") {
      return (
        <textarea
          value={displayVal}
          onChange={(e) => updateFormValue(field.key, e.target.value)}
          className={`${baseClass} font-mono text-xs resize-y min-h-[80px]`}
          rows={4}
        />
      );
    }
    return (
      <input
        type={field.type || "text"}
        className={baseClass}
        value={displayVal}
        onChange={(e) => updateFormValue(field.key, e.target.value)}
        placeholder={field.placeholder || ""}
        required={field.required}
      />
    );
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-heading font-bold text-2xl md:text-3xl text-gray-900">
            {config.name}
          </h1>
          <p className="text-gray-500 text-sm mt-0.5">{rows.length} élément{rows.length !== 1 ? "s" : ""}</p>
        </div>
        <button
          onClick={() => setEditing("new")}
          className="px-5 py-2.5 rounded-full bg-brand-500 hover:bg-brand-600 text-white font-semibold text-sm inline-flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Ajouter
        </button>
      </div>

      {/* Search + Sort */}
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:border-brand-400 transition-colors text-sm"
          />
        </div>
        <button
          onClick={() => setSortDir((d) => (d === "asc" ? "desc" : "asc"))}
          className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors inline-flex items-center gap-1.5"
        >
          <ArrowUpDown className="w-4 h-4" />
          Ordre {sortDir === "asc" ? "↑" : "↓"}
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 text-brand-500 animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="font-semibold text-gray-500">Aucun élément</p>
          <p className="text-sm mt-1">Ajoutez un élément pour commencer.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                {columns.map((col) => (
                  <th key={col} className="text-left px-5 py-3.5 font-semibold text-gray-600 whitespace-nowrap">
                    {config.fields.find((f) => f.key === col)?.label || col}
                  </th>
                ))}
                <th className="text-right px-5 py-3.5 font-semibold text-gray-600 w-24">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row) => (
                <tr key={row.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  {columns.map((col) => (
                    <td key={col} className="px-5 py-3.5 text-gray-700 max-w-[250px] truncate">
                      {renderCell(row, col)}
                    </td>
                  ))}
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => setEditing(row)}
                        className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-brand-600 transition-colors"
                        title="Modifier"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleting(row)}
                        className="p-2 rounded-lg hover:bg-red-50 text-gray-500 hover:text-red-600 transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Edit Modal ── */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-10 pb-10 px-4 overflow-y-auto">
          <div className="fixed inset-0 bg-black/50" onClick={() => {
            if (formDirty) { setConfirmClose(true); return; }
            setEditing(null);
            setFormDirty(false);
          }} />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
              <h2 className="font-heading font-bold text-lg">
                {editing === "new" ? "Nouveau " + config.name.slice(0, -1) : "Modifier"}
              </h2>
              <button onClick={() => {
                if (formDirty) { setConfirmClose(true); return; }
                setEditing(null);
                setFormDirty(false);
              }} className="p-2 rounded-lg hover:bg-gray-100 text-gray-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => { e.preventDefault(); handleSave(); }}
              className="p-6 space-y-4"
            >
              {config.fields.map((field) => (
                <div key={field.key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {field.label}
                    {field.required && <span className="text-red-400 ml-0.5">*</span>}
                  </label>
                  {renderField(field)}
                </div>
              ))}

              <div className="sticky bottom-0 bg-white pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    if (formDirty) { setConfirmClose(true); return; }
                    setEditing(null);
                    setFormDirty(false);
                  }}
                  className="px-5 py-2.5 rounded-full border border-gray-200 text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2.5 rounded-full bg-brand-500 hover:bg-brand-600 disabled:opacity-60 text-white text-sm font-semibold inline-flex items-center gap-2 transition-colors"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de confirmation independant — changements non sauvegardes */}
      {confirmClose && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
          <div className="fixed inset-0 bg-black/50" onClick={() => setConfirmClose(false)} />
          <div className="relative bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm text-center">
            <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-amber-50 flex items-center justify-center">
              <Save className="w-6 h-6 text-amber-500" />
            </div>
            <h3 className="font-heading font-bold text-lg mb-2">Changements non sauvegardes</h3>
            <p className="text-gray-500 text-sm mb-6">
              Vous avez des modifications non enregistrees. Voulez-vous vraiment quitter sans sauvegarder ?
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setConfirmClose(false)}
                className="px-5 py-2.5 rounded-full border border-gray-200 text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Rester
              </button>
              <button
                onClick={() => { setConfirmClose(false); setEditing(null); setFormDirty(false); }}
                className="px-5 py-2.5 rounded-full bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold transition-colors"
              >
                Quitter sans sauvegarder
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete Confirmation ── */}
      {deleting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="fixed inset-0 bg-black/50" onClick={() => setDeleting(null)} />
          <div className="relative bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm text-center">
            <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-red-50 flex items-center justify-center">
              <Trash2 className="w-6 h-6 text-red-500" />
            </div>
            <h3 className="font-heading font-bold text-lg mb-2">Confirmer la suppression</h3>
            <p className="text-gray-500 text-sm mb-6">
              Êtes-vous sûr de vouloir supprimer{" "}
              <strong>{deleting[config.labelKey]}</strong> ? Cette action est
              irréversible.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setDeleting(null)}
                className="px-5 py-2.5 rounded-full border border-gray-200 text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={() => handleDelete(deleting.id)}
                className="px-5 py-2.5 rounded-full bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-colors"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function renderCell(row, col) {
  const val = row[col];
  if (!val) return <span className="text-gray-300">—</span>;
  if (col === "image" || col === "logo" || col === "hero_image") {
    return (
      <a href={val} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-brand-600 hover:underline">
        <ImageIcon className="w-4 h-4 shrink-0" />
        <span className="truncate max-w-[160px]">Voir</span>
        <ExternalLink className="w-3 h-3" />
      </a>
    );
  }
  if (col === "gallery") {
    const count = Array.isArray(val) ? val.length : 0;
    if (count === 0) return <span className="text-gray-300">—</span>;
    return (
      <span className="inline-flex items-center gap-1.5 text-brand-600">
        <ImageIcon className="w-4 h-4" />
        <span>{count} image{count > 1 ? "s" : ""}</span>
      </span>
    );
  }
  if (col === "status") {
    const isUpcoming = val === "a_venir";
    return (
      <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${
        isUpcoming ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"
      }`}>
        {isUpcoming ? "À venir" : "Passé"}
      </span>
    );
  }
  return String(val);
}
