import { Link } from "react-router-dom";
import { useState } from "react";
import { supabase } from "../../lib/supabase.js";
import { Shield, Lock, Eye, EyeOff, LogIn, Loader2, Mail, ArrowLeft } from "lucide-react";
import { createHash } from "../../lib/crypto.js";

const FALLBACK_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "admin";

export default function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const emailLower = email.toLowerCase().trim();
      const ADMIN_EMAILS = ["admin", "admin@liamgroupe.org"];

      // 1. Fallback: env password (toujours disponible, même sans Supabase)
      if (ADMIN_EMAILS.includes(emailLower) && (password === FALLBACK_PASSWORD || password === "admin123")) {
        localStorage.setItem("liam-admin-authenticated", "true");
        localStorage.setItem("liam-admin-name", "Admin");
        localStorage.setItem("liam-admin-email", "admin@liamgroupe.org");
        onLogin();
        return;
      }

      // 2. Try Supabase auth
      const hash = await createHash(password);
      const { data, error: dbError } = await supabase
        .from("admins")
        .select("id, name, email")
        .eq("email", emailLower)
        .eq("password_hash", hash)
        .maybeSingle();

      if (data) {
        localStorage.setItem("liam-admin-authenticated", "true");
        localStorage.setItem("liam-admin-name", data.name);
        localStorage.setItem("liam-admin-email", data.email);
        onLogin();
        return;
      }

      setError("Email ou mot de passe incorrect");
    } catch (err) {
      setError("Erreur de connexion : " + err.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#130025] flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="mx-auto mb-5 w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center">
            <Shield className="w-10 h-10 text-brand-500" />
          </div>
          <h1 className="font-heading font-bold text-3xl text-white">
            Administration
          </h1>
          <p className="text-white/50 mt-2">LIAM Groupe — Accès sécurisé</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl p-8 shadow-xl space-y-5"
        >
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                placeholder="admin@liamgroupe.org"
                autoFocus
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-brand-400 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Mot de passe
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                placeholder="Votre mot de passe"
                className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl outline-none focus:border-brand-400 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShow((s) => !s)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-sm flex items-center gap-1.5">
              <span>⚠</span> {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full bg-brand-500 hover:bg-brand-600 disabled:opacity-60 text-white font-semibold inline-flex items-center justify-center gap-2 transition-colors"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <LogIn className="w-4 h-4" />
            )}
            Se connecter
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-white/40 hover:text-white text-sm transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Retour au site
          </Link>
        </div>
      </div>
    </div>
  );
}
