/**
 * Badge - petite pastille "eyebrow" utilisée au-dessus des titres de section.
 * Deux variantes observées sur le site : rose (par défaut) et violet.
 */
export default function Badge({ icon: Icon, children, variant = "rose", withRules = false }) {
  const styles =
    variant === "violet"
      ? "bg-violet-50 text-violet-600"
      : variant === "blue"
      ? "bg-blue-50 text-blue-800"
      : "bg-rose-50 text-rose-700";

  if (withRules) {
    return (
      <div className="flex items-center justify-center gap-3 text-coral-500 font-semibold tracking-[0.2em] text-xs uppercase">
        <span className="h-px w-10 bg-coral-500/50" />
        {children}
        <span className="h-px w-10 bg-coral-500/50" />
      </div>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide uppercase ${styles}`}
    >
      {Icon && <Icon className="w-3.5 h-3.5" strokeWidth={2.5} />}
      {children}
    </span>
  );
}
