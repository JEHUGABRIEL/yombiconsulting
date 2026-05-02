import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck, LogOut, Star, CheckCircle2, X,
  AlertTriangle, Loader2, Mail, Lock, Eye, EyeOff,
  UserPlus, LogIn, ArrowLeft, RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import toast, { Toaster } from 'react-hot-toast';
import { supabase } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';
import type { Review } from '@/types';

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────

type AuthView = 'login' | 'register' | 'forgot';

// ─────────────────────────────────────────────────────────────
// Page Admin — /admin
// ─────────────────────────────────────────────────────────────

export function AdminPage() {
  const navigate = useNavigate();

  const [user,    setUser]    = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pending, setPending] = useState<Review[]>([]);
  const [approved,setApproved]= useState<Review[]>([]);
  const [tab,     setTab]     = useState<'pending' | 'approved'>('pending');

  // ── Auth ──────────────────────────────────────────────────
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) checkAdmin(session.user.id);
      else setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
      if (session?.user) checkAdmin(session.user.id);
      else { setIsAdmin(false); setLoading(false); }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAdmin = async (uid: string) => {
    const { data } = await supabase.from('admins').select('id').eq('id', uid).single();
    setIsAdmin(!!data);
    setLoading(false);
    if (data) fetchAll();
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setIsAdmin(false);
    setPending([]);
    setApproved([]);
  };

  // ── Data ──────────────────────────────────────────────────
  const fetchAll = async () => {
    const [p, a] = await Promise.all([
      supabase.from('reviews').select('*').eq('status', 'pending').order('created_at', { ascending: false }),
      supabase.from('reviews').select('*').eq('status', 'approved').order('created_at', { ascending: false }),
    ]);
    if (p.data) setPending(p.data as Review[]);
    if (a.data) setApproved(a.data as Review[]);
  };

  useEffect(() => {
    if (!isAdmin) return;
    const ch = supabase
      .channel('admin-reviews')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'reviews' }, fetchAll)
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, [isAdmin]);

  const approve = async (rev: Review) => {
    const { error } = await supabase.from('reviews').update({ status: 'approved' }).eq('id', rev.id);
    if (error) { toast.error("Erreur lors de l'approbation."); return; }
    toast.success('Avis approuvé !');
    fetchAll();
  };

  const reject = async (id: string) => {
    const { error } = await supabase.from('reviews').delete().eq('id', id);
    if (error) { toast.error('Erreur lors de la suppression.'); return; }
    toast.success('Avis supprimé.');
    setPending(prev => prev.filter(r => r.id !== id));
  };

  // ── Render selon état ─────────────────────────────────────

  if (loading)           return <FullScreenLoader />;
  if (!user)             return <AuthScreen />;
  if (!isAdmin)          return <UnauthorizedScreen email={user.email!} onLogout={logout} />;

  const list = tab === 'pending' ? pending : approved;

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      <Toaster position="top-right" toastOptions={{ style: { fontWeight: 700, fontSize: '13px' } }} />

      {/* Header */}
      <header className="border-b border-slate-800 px-6 md:px-8 py-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img src="/logo.png" alt="Clean." className="h-8 w-8 object-contain invert" />
          <div>
            <h1 className="text-lg font-black tracking-tight flex items-center gap-2">
              <ShieldCheck size={18} className="text-emerald-500" />
              Dashboard Admin
            </h1>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
              Modération des avis
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-6">
          {/* Stats */}
          <div className="hidden md:flex gap-6">
            <Stat label="En attente" value={pending.length}  color="text-amber-400" />
            <Stat label="Approuvés"  value={approved.length} color="text-emerald-400" />
          </div>

          {/* Refresh */}
          <button
            onClick={fetchAll}
            className="h-9 w-9 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
            title="Actualiser"
          >
            <RefreshCw size={15} />
          </button>

          <div className="hidden sm:flex items-center gap-2 bg-slate-900 rounded-2xl px-4 py-2 border border-slate-800">
            <div className="h-6 w-6 rounded-full bg-emerald-600 flex items-center justify-center text-white text-[10px] font-black">
              {user.email?.charAt(0).toUpperCase()}
            </div>
            <span className="text-xs font-bold text-slate-300 max-w-[140px] truncate">{user.email}</span>
          </div>

          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-1 px-3 py-2 rounded-xl bg-slate-800 text-slate-400 text-xs font-bold hover:bg-slate-700 hover:text-white transition-all"
          >
            <ArrowLeft size={14} /> Accueil
          </button>

          <button
            onClick={logout}
            className="flex items-center gap-1 px-3 py-2 rounded-xl bg-red-500/10 text-red-400 text-xs font-bold hover:bg-red-500/20 transition-all"
          >
            <LogOut size={14} />
            <span className="hidden sm:inline">Déconnexion</span>
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="px-6 md:px-8 py-5 border-b border-slate-800 flex gap-3">
        <TabButton active={tab === 'pending'}  onClick={() => setTab('pending')}  label="En attente" count={pending.length}  color="amber" />
        <TabButton active={tab === 'approved'} onClick={() => setTab('approved')} label="Approuvés"  count={approved.length} color="emerald" />
      </div>

      {/* Contenu */}
      <main className="p-6 md:p-8">
        <AnimatePresence mode="wait">
          {list.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-32 gap-6 text-center"
            >
              <div className="h-24 w-24 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                <CheckCircle2 size={48} />
              </div>
              <h3 className="text-2xl font-black">
                {tab === 'pending' ? 'Aucun avis en attente !' : 'Aucun avis approuvé.'}
              </h3>
              <p className="text-slate-500 font-medium">
                {tab === 'pending'
                  ? 'Tous les avis ont été modérés. Revenez plus tard.'
                  : 'Approuvez des avis depuis l\'onglet "En attente".'}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {list.map(rev => (
                  <ReviewCard
                    key={rev.id}
                    review={rev}
                    isPending={tab === 'pending'}
                    onApprove={approve}
                    onReject={reject}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Écran d'authentification (login + register + forgot)
// ─────────────────────────────────────────────────────────────

function AuthScreen() {
  const [view,         setView]         = useState<AuthView>('login');
  const [email,        setEmail]        = useState('');
  const [password,     setPassword]     = useState('');
  const [confirmPass,  setConfirmPass]  = useState('');
  const [showPass,     setShowPass]     = useState(false);
  const [showConfirm,  setShowConfirm]  = useState(false);
  const [loading,      setLoading]      = useState(false);
  const [resetSent,    setResetSent]    = useState(false);

  const reset = () => {
    setEmail(''); setPassword(''); setConfirmPass('');
    setShowPass(false); setShowConfirm(false); setResetSent(false);
  };

  const switchView = (v: AuthView) => { reset(); setView(v); };

  // ── Login ─────────────────────────────────────────────────
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { toast.error('Remplissez tous les champs.'); return; }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      if (error.message.includes('Invalid login')) toast.error('Email ou mot de passe incorrect.');
      else toast.error(error.message);
    }
  };

  // ── Register ──────────────────────────────────────────────
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !confirmPass) { toast.error('Remplissez tous les champs.'); return; }
    if (password.length < 8) { toast.error('Le mot de passe doit contenir au moins 8 caractères.'); return; }
    if (password !== confirmPass) { toast.error('Les mots de passe ne correspondent pas.'); return; }

    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/admin` },
    });
    setLoading(false);

    if (error) { toast.error(error.message); return; }

    toast.success(
      '✅ Compte créé ! Vérifiez votre email pour confirmer, puis demandez à un admin de vous accorder l\'accès.',
      { duration: 8000 }
    );
    switchView('login');
  };

  // ── Forgot password ───────────────────────────────────────
  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) { toast.error('Entrez votre adresse email.'); return; }
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/admin`,
    });
    setLoading(false);
    if (error) { toast.error(error.message); return; }
    setResetSent(true);
  };

  // ── Google OAuth ──────────────────────────────────────────
  const handleGoogle = () =>
    supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/admin` },
    });

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <Toaster position="top-right" toastOptions={{ style: { fontWeight: 700, fontSize: '13px' } }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo + titre */}
        <div className="text-center mb-8">
          <img src="/logo.png" alt="Clean." className="h-14 w-14 object-contain invert mx-auto mb-6" />
          <h1 className="text-3xl font-black text-white">
            {view === 'login'    ? 'Connexion Admin'    :
             view === 'register' ? 'Créer un compte'    :
                                   'Mot de passe oublié'}
          </h1>
          <p className="text-slate-500 font-medium mt-2 text-sm">
            {view === 'login'    ? 'Accédez au tableau de bord de modération.'  :
             view === 'register' ? 'Créez votre compte administrateur.'         :
                                   'Recevez un lien de réinitialisation.'}
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 md:p-10">

          {/* ── TABS login / register ── */}
          {view !== 'forgot' && (
            <div className="flex mb-8 bg-slate-800/60 rounded-2xl p-1">
              {(['login', 'register'] as const).map(v => (
                <button
                  key={v}
                  onClick={() => switchView(v)}
                  className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all
                    ${view === v ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  {v === 'login' ? '🔐 Connexion' : '✨ Inscription'}
                </button>
              ))}
            </div>
          )}

          {/* ── FORMULAIRE ── */}
          <AnimatePresence mode="wait">

            {/* LOGIN */}
            {view === 'login' && (
              <motion.form
                key="login"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={handleLogin}
                className="space-y-4"
              >
                <InputField
                  label="Email"
                  type="email"
                  value={email}
                  onChange={setEmail}
                  placeholder="admin@cleanshop.com"
                  icon={<Mail size={16} />}
                />
                <PasswordField
                  label="Mot de passe"
                  value={password}
                  onChange={setPassword}
                  show={showPass}
                  onToggle={() => setShowPass(v => !v)}
                  placeholder="Votre mot de passe"
                />

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => switchView('forgot')}
                    className="text-[11px] font-bold text-slate-500 hover:text-emerald-400 transition-colors"
                  >
                    Mot de passe oublié ?
                  </button>
                </div>

                <SubmitButton loading={loading} icon={<LogIn size={18} />} label="Se connecter" />

                <Divider />
                <GoogleButton onClick={handleGoogle} />
              </motion.form>
            )}

            {/* REGISTER */}
            {view === 'register' && (
              <motion.form
                key="register"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleRegister}
                className="space-y-4"
              >
                <InputField
                  label="Email"
                  type="email"
                  value={email}
                  onChange={setEmail}
                  placeholder="admin@cleanshop.com"
                  icon={<Mail size={16} />}
                />
                <PasswordField
                  label="Mot de passe"
                  value={password}
                  onChange={setPassword}
                  show={showPass}
                  onToggle={() => setShowPass(v => !v)}
                  placeholder="Min. 8 caractères"
                />
                <PasswordField
                  label="Confirmer le mot de passe"
                  value={confirmPass}
                  onChange={setConfirmPass}
                  show={showConfirm}
                  onToggle={() => setShowConfirm(v => !v)}
                  placeholder="Répétez le mot de passe"
                />

                {/* Règles mot de passe */}
                <div className="grid grid-cols-2 gap-2 py-2">
                  {[
                    { ok: password.length >= 8,  label: '8 caractères min.' },
                    { ok: /[A-Z]/.test(password), label: '1 majuscule' },
                    { ok: /[0-9]/.test(password), label: '1 chiffre' },
                    { ok: password === confirmPass && !!confirmPass, label: 'Mots de passe identiques' },
                  ].map(({ ok, label }) => (
                    <div key={label} className={`flex items-center gap-1.5 text-[10px] font-bold ${ok ? 'text-emerald-400' : 'text-slate-600'}`}>
                      <div className={`h-1.5 w-1.5 rounded-full ${ok ? 'bg-emerald-500' : 'bg-slate-700'}`} />
                      {label}
                    </div>
                  ))}
                </div>

                <SubmitButton loading={loading} icon={<UserPlus size={18} />} label="Créer le compte" />

                <p className="text-[10px] text-slate-600 text-center font-bold leading-relaxed">
                  Après inscription, un administrateur devra vous accorder l'accès manuellement dans Supabase.
                </p>

                <Divider />
                <GoogleButton onClick={handleGoogle} />
              </motion.form>
            )}

            {/* FORGOT */}
            {view === 'forgot' && (
              <motion.div
                key="forgot"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                {resetSent ? (
                  <div className="text-center py-6">
                    <div className="h-16 w-16 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 mx-auto mb-4">
                      <CheckCircle2 size={32} />
                    </div>
                    <h3 className="text-lg font-black text-white mb-2">Email envoyé !</h3>
                    <p className="text-slate-400 text-sm font-medium mb-6">
                      Vérifiez votre boîte mail et cliquez sur le lien pour réinitialiser votre mot de passe.
                    </p>
                    <button
                      onClick={() => switchView('login')}
                      className="text-emerald-400 font-black text-sm hover:text-emerald-300 transition-colors"
                    >
                      ← Retour à la connexion
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleForgot} className="space-y-4">
                    <InputField
                      label="Votre email"
                      type="email"
                      value={email}
                      onChange={setEmail}
                      placeholder="admin@cleanshop.com"
                      icon={<Mail size={16} />}
                    />
                    <SubmitButton loading={loading} icon={<Mail size={18} />} label="Envoyer le lien" />
                    <button
                      type="button"
                      onClick={() => switchView('login')}
                      className="w-full flex items-center justify-center gap-2 py-3 text-slate-500 text-xs font-black hover:text-slate-300 transition-colors"
                    >
                      <ArrowLeft size={14} /> Retour à la connexion
                    </button>
                  </form>
                )}
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        <p className="text-center text-[10px] text-slate-600 font-bold uppercase tracking-widest mt-6">
          Clean Shop — Espace réservé aux administrateurs
        </p>
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Composants réutilisables
// ─────────────────────────────────────────────────────────────

function InputField({ label, type, value, onChange, placeholder, icon }: {
  label: string; type: string; value: string;
  onChange: (v: string) => void; placeholder: string; icon: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">{label}</label>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600">{icon}</span>
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          required
          className="w-full bg-slate-800 border border-slate-700 text-white rounded-2xl py-4 pl-11 pr-4 text-sm font-medium outline-none
            focus:border-emerald-500 focus:bg-slate-800/80 transition-all placeholder:text-slate-600"
        />
      </div>
    </div>
  );
}

function PasswordField({ label, value, onChange, show, onToggle, placeholder }: {
  label: string; value: string; onChange: (v: string) => void;
  show: boolean; onToggle: () => void; placeholder: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">{label}</label>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"><Lock size={16} /></span>
        <input
          type={show ? 'text' : 'password'}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          required
          className="w-full bg-slate-800 border border-slate-700 text-white rounded-2xl py-4 pl-11 pr-12 text-sm font-medium outline-none
            focus:border-emerald-500 focus:bg-slate-800/80 transition-all placeholder:text-slate-600"
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
        >
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
    </div>
  );
}

function SubmitButton({ loading, icon, label }: { loading: boolean; icon: React.ReactNode; label: string }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-emerald-600 text-white font-black text-sm
        hover:bg-emerald-500 transition-all shadow-2xl shadow-emerald-500/20 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
    >
      {loading ? <Loader2 size={18} className="animate-spin" /> : icon}
      {loading ? 'Chargement...' : label}
    </button>
  );
}

function Divider() {
  return (
    <div className="flex items-center gap-4 py-2">
      <div className="flex-1 h-px bg-slate-800" />
      <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">ou</span>
      <div className="flex-1 h-px bg-slate-800" />
    </div>
  );
}

function GoogleButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl border border-slate-700 bg-slate-800/50
        text-slate-300 font-black text-sm hover:bg-slate-800 hover:border-slate-600 transition-all"
    >
      {/* Google SVG icon */}
      <svg width="18" height="18" viewBox="0 0 48 48" fill="none">
        <path d="M44.5 20H24v8.5h11.8C34.7 33.9 29.9 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z" fill="#FFC107"/>
        <path d="M6.3 14.7l7 5.1C15.1 16.1 19.2 13 24 13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 16.3 2 9.7 7.4 6.3 14.7z" fill="#FF3D00"/>
        <path d="M24 46c5.8 0 10.7-1.9 14.6-5.2l-6.7-5.7C29.8 36.8 27 38 24 38c-5.8 0-10.7-3.9-12.4-9.2l-7 5.4C8 40.8 15.4 46 24 46z" fill="#4CAF50"/>
        <path d="M44.5 20H24v8.5h11.8c-1 3-3.5 5.5-6.8 7.1l6.7 5.7c4-3.7 6.3-9.1 6.3-15.3 0-1.3-.2-2.7-.5-4z" fill="#1976D2"/>
      </svg>
      Continuer avec Google
    </button>
  );
}

// ─────────────────────────────────────────────────────────────
// Autres états
// ─────────────────────────────────────────────────────────────

function FullScreenLoader() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 size={40} className="text-emerald-500 animate-spin" />
        <p className="text-slate-500 text-sm font-bold">Vérification en cours...</p>
      </div>
    </div>
  );
}

function UnauthorizedScreen({ email, onLogout }: { email: string; onLogout: () => void }) {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <Toaster position="top-right" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-slate-900 border border-red-500/20 rounded-[2.5rem] p-12 text-center"
      >
        <div className="h-20 w-20 rounded-full bg-red-500/10 flex items-center justify-center text-red-400 mx-auto mb-8">
          <AlertTriangle size={40} />
        </div>
        <h1 className="text-3xl font-black text-white mb-3">Accès refusé</h1>
        <p className="text-slate-400 font-medium mb-2">
          Le compte <span className="text-white font-bold break-all">{email}</span> n'est pas autorisé.
        </p>
        <p className="text-slate-600 text-sm font-medium mb-3">
          Un administrateur doit vous ajouter manuellement via Supabase.
        </p>
        <div className={`bg-slate-800 rounded-2xl p-4 mb-8 text-left`}>
          <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500 mb-2">Commande SQL à exécuter :</p>
          <code className="text-xs text-slate-300 font-mono break-all">
            insert into public.admins (id, email)<br />
            values ('VOTRE-UUID', '{email}');
          </code>
        </div>
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-slate-800 text-white font-black text-sm hover:bg-slate-700 transition-all"
        >
          <LogOut size={18} /> Se déconnecter
        </button>
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Dashboard sub-components
// ─────────────────────────────────────────────────────────────

function Stat({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="text-center">
      <p className={`text-2xl font-black ${color}`}>{value}</p>
      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{label}</p>
    </div>
  );
}

function TabButton({ active, onClick, label, count, color }: {
  active: boolean; onClick: () => void; label: string; count: number; color: 'amber' | 'emerald';
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-5 py-3 rounded-2xl border text-xs font-black transition-all
        ${active
          ? color === 'amber'
            ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
            : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
          : 'border-slate-800 text-slate-500 hover:text-slate-300'}`}
    >
      {label}
      <span className={`px-2 py-0.5 rounded-full text-[10px] font-black
        ${active
          ? color === 'amber' ? 'bg-amber-500 text-white' : 'bg-emerald-500 text-white'
          : 'bg-slate-800 text-slate-500'}`}>
        {count}
      </span>
    </button>
  );
}

function ReviewCard({ review, isPending, onApprove, onReject }: {
  review: Review; isPending: boolean;
  onApprove: (r: Review) => void;
  onReject: (id: string) => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col hover:border-slate-700 transition-all"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-emerald-600/20 border border-emerald-600/30 flex items-center justify-center text-emerald-400 font-black text-sm">
            {review.user.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-black text-white text-sm">{review.user}</p>
            <p className="text-[10px] text-slate-500 font-bold">{review.date}</p>
          </div>
        </div>
        <div className="flex text-amber-400">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={13} fill={i < review.rating ? 'currentColor' : 'none'} />
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-lg">
          Produit #{review.product_id}
        </span>
      </div>

      <p className="text-slate-400 text-sm font-medium italic mb-6 flex-grow leading-relaxed">
        "{review.comment}"
      </p>

      {isPending ? (
        <div className="flex gap-3">
          <button
            onClick={() => onApprove(review)}
            className="flex-grow py-3 bg-emerald-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-500 transition-all flex items-center justify-center gap-1.5"
          >
            <CheckCircle2 size={13} /> Approuver
          </button>
          <button
            onClick={() => onReject(review.id)}
            className="flex-grow py-3 bg-slate-800 text-slate-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-1.5"
          >
            <X size={13} /> Rejeter
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-[10px] font-black text-emerald-500 uppercase tracking-widest">
            <CheckCircle2 size={13} /> Approuvé
          </span>
          <button
            onClick={() => onReject(review.id)}
            className="p-2 rounded-xl bg-slate-800 text-slate-500 hover:bg-red-500 hover:text-white transition-all"
            title="Supprimer"
          >
            <X size={13} />
          </button>
        </div>
      )}
    </motion.div>
  );
}
