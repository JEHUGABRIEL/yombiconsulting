import { ShieldCheck, CheckCircle2, Clock, Star } from 'lucide-react';

const STATS = [
  { num: '100%', label: 'Importations Certifiées', Icon: ShieldCheck },
  { num: '12M',  label: 'Garantie de Sérénité',    Icon: CheckCircle2 },
  { num: '24h',  label: 'SAV Local à Bangui',       Icon: Clock },
  { num: '1K+',  label: 'Clients Satisfaits RCA',   Icon: Star },
];

export function StatsBar() {
  return (
    <section className="bg-slate-950 py-24 px-6 text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#05966933,transparent_60%)]" />
      <div className="mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-16 md:gap-8 items-center text-center">
          {STATS.map(({ num, label, Icon }) => (
            <div key={label}>
              <Icon size={20} className="text-emerald-500 mb-4 inline" />
              <p className="text-5xl font-black tracking-tighter mb-2">{num}</p>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
