import { useState } from 'react';
import { MapPin, Mail, Phone, ArrowRight, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';
import type { ContactFormData, ContactFormErrors } from '@/types';

interface Props {
  isDarkMode: boolean;
  onWhatsApp: () => void;
}

function validate(form: ContactFormData): ContactFormErrors {
  const errors: ContactFormErrors = {};
  if (!form.name.trim())    errors.name    = 'Le nom est requis';
  if (!form.email.trim())   errors.email   = "L'email est requis";
  else if (!/\S+@\S+\.\S+/.test(form.email)) errors.email = 'Email invalide';
  if (!form.message.trim()) errors.message = 'Le message est requis';
  return errors;
}

const EMPTY_FORM: ContactFormData = { name: '', email: '', message: '' };

export function ContactSection({ isDarkMode, onWhatsApp }: Props) {
  const [form,       setForm]       = useState<ContactFormData>(EMPTY_FORM);
  const [errors,     setErrors]     = useState<ContactFormErrors>({});
  const [sending,    setSending]    = useState(false);
  const [submitted,  setSubmitted]  = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setSending(true);

    // 💡 Brancher ici sur EmailJS, Resend, ou une Supabase Edge Function
    await new Promise(r => setTimeout(r, 1200));

    setSending(false);
    setSubmitted(true);
    setForm(EMPTY_FORM);
    toast.success('Message envoyé ! Nous vous répondrons bientôt.');
    setTimeout(() => setSubmitted(false), 5000);
  };

  const inputClass = (field: keyof ContactFormData) =>
    `w-full rounded-2xl py-4 px-6 text-sm font-bold outline-none transition-all border
     ${errors[field] ? 'border-red-400' : 'border-transparent'}
     ${isDarkMode ? 'bg-slate-900 focus:border-emerald-500 text-white' : 'bg-white focus:border-emerald-300 text-slate-900'}`;

  return (
    <section id="contact" className={`py-32 px-6 transition-colors duration-500 ${isDarkMode ? 'bg-slate-900' : 'bg-white'}`}>
      <div className="mx-auto max-w-7xl">

        {/* Titre */}
        <div className="mb-20 text-center">
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-600 mb-6">Parlons Tech</h2>
          <h3 className="text-5xl md:text-7xl font-black tracking-tighter mb-8">
            Nous sommes à <span className="text-emerald-600 italic">Bangui</span>.
          </h3>
          <p className="max-w-xl mx-auto text-slate-500 font-medium">
            La boutique N°1 en RCA. Venez nous rendre visite ou contactez-nous directement.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Formulaire */}
          <div className={`lg:col-span-1 rounded-[3rem] p-12 transition-colors duration-500 ${isDarkMode ? 'bg-slate-950 border border-slate-800' : 'bg-slate-50'}`}>
            <h4 className="text-2xl font-black mb-8">Envoyez un message</h4>

            {submitted && (
              <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-sm font-bold text-emerald-700 flex items-center gap-2">
                <CheckCircle2 size={18} /> Message envoyé avec succès !
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              {(['name', 'email'] as const).map(field => (
                <div key={field}>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-2">
                    {field === 'name' ? 'Nom Complet' : 'Email'}
                  </label>
                  <input
                    type={field === 'email' ? 'email' : 'text'}
                    value={form[field]}
                    onChange={e => setForm(p => ({ ...p, [field]: e.target.value }))}
                    placeholder={field === 'name' ? 'Jean Dupont' : 'jean@bangui.cf'}
                    className={inputClass(field)}
                  />
                  {errors[field] && <p className="text-[9px] font-black text-red-500 mt-2 ml-2 uppercase tracking-widest">{errors[field]}</p>}
                </div>
              ))}

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-2">Message</label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                  placeholder="Comment pouvons-nous vous aider ?"
                  className={`${inputClass('message')} resize-none`}
                />
                {errors.message && <p className="text-[9px] font-black text-red-500 mt-2 ml-2 uppercase tracking-widest">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full rounded-2xl bg-slate-950 py-5 text-sm font-black text-white hover:bg-emerald-600 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {sending ? 'Envoi en cours...' : 'Envoyer mon message'}
              </button>
            </form>
          </div>

          {/* Carte localisation */}
          <div className={`lg:col-span-1 relative h-full rounded-[3rem] p-12 overflow-hidden group transition-colors duration-500 ${isDarkMode ? 'bg-slate-950 border border-slate-800' : 'bg-slate-50'}`}>
            <div className="relative z-10 h-full flex flex-col">
              <div className="mb-auto">
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl shadow-lg mb-6 ${isDarkMode ? 'bg-slate-800 text-white' : 'bg-white text-slate-900'}`}>
                  <MapPin size={24} />
                </div>
                <h4 className="text-2xl font-black mb-4">Notre Siège</h4>
                <p className="text-slate-500 font-medium leading-relaxed">
                  Centre ville, derrière arrêt taxi KM5,<br />rue Colalu, Bangui, RCA.<br />BP 25000
                </p>
              </div>

              <div className={`mt-8 flex items-center gap-4 p-6 rounded-3xl border w-full ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-xl shadow-slate-200/50'}`}>
                <div className="h-12 w-12 rounded-full bg-slate-900 flex-shrink-0 flex items-center justify-center text-white font-black text-xs italic">C.</div>
                <div className="flex-grow">
                  <p className={`text-xs font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Clean Shop Bangui</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">KM5 Central Market</p>
                </div>
                <a href="https://maps.google.com/?q=Bangui+RCA" target="_blank" rel="noopener noreferrer"
                  className={`h-10 w-10 flex items-center justify-center rounded-xl transition-all ${isDarkMode ? 'bg-slate-800 text-emerald-400 hover:bg-emerald-600 hover:text-white' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white'}`}>
                  <ArrowRight size={18} />
                </a>
              </div>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />
          </div>

          {/* Coordonnées */}
          <div className="flex flex-col gap-8">
            <div className="p-10 rounded-[3rem] bg-slate-950 text-white flex flex-col justify-between group flex-1">
              <div>
                <div className="h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-emerald-500 mb-8 flex group-hover:scale-110 transition-transform">
                  <Mail size={24} />
                </div>
                <h4 className="text-xl font-black mb-2">Email Direct</h4>
                <a href="mailto:contact@cleancomputer.fr" className="text-slate-400 font-medium hover:text-white transition-colors">
                  contact@cleancomputer.fr
                </a>
              </div>
              <div className="mt-12 flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Toujours ouvert</span>
              </div>
            </div>

            <div className="p-10 rounded-[3rem] bg-emerald-600 text-white flex flex-col justify-between group flex-1 shadow-2xl shadow-emerald-200">
              <div>
                <div className="h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-white mb-8 flex group-hover:scale-110 transition-transform">
                  <Phone size={24} />
                </div>
                <h4 className="text-xl font-black mb-2">Service Client</h4>
                <a href="tel:+23672280727" className="text-emerald-100 font-medium hover:text-white transition-colors">+236 72 28 07 27</a>
              </div>
              <button
                onClick={onWhatsApp}
                className="mt-12 w-full py-5 bg-white text-emerald-600 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all"
              >
                WhatsApp Rapide
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
