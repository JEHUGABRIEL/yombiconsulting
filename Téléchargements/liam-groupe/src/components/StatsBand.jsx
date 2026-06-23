/**
 * StatsBand — bandeau violet très sombre avec statistiques chiffrées.
 * Utilisé sur la page d'accueil et sur chaque page de domaine.
 */
export default function StatsBand({ title, description, stats, tone = "violet" }) {
  const numberColor = tone === "coral" ? "text-coral-400" : "text-violet-500";
  return (
    <section className="bg-ink py-16 px-6">
      <div className="max-w-5xl mx-auto text-center">
        {title && (
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mb-4">
            {title}
          </h2>
        )}
        {description && (
          <p className="text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
            {description}
          </p>
        )}
        <div
          className={`grid gap-8 ${
            stats.length === 4 ? "grid-cols-2 md:grid-cols-4" : "grid-cols-1 md:grid-cols-3"
          } ${!title ? "pt-0" : ""}`}
        >
          {stats.map((s) => (
            <div key={s.label}>
              <p className={`font-heading font-extrabold text-4xl md:text-5xl ${numberColor}`}>
                {s.value}
              </p>
              <p className="text-white/60 mt-2">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
