import { CalendarDays, MapPin } from "lucide-react";

/**
 * EventCard a deux variantes fidèles aux captures :
 * - compact (aperçu page d'accueil) : pas de pill catégorie sur l'image,
 *   une pastille catégorie texte après la description, pas de bouton.
 * - complète (page Événements) : pill catégorie blanche sur l'image,
 *   bouton "S'inscrire" pour les événements à venir.
 */
export default function EventCard({ event, compact = false }) {
  const isUpcoming = event.status === "a_venir";
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden flex flex-col h-full">
      <div className="relative h-56">
        <img src={event.image} alt={event.title} className="w-full h-full object-cover" loading="lazy" />
        <span
          className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${
            isUpcoming ? "bg-coral-500 text-white" : "bg-ink/80 text-white"
          }`}
        >
          {isUpcoming ? "À venir" : "Passé"}
        </span>
        {!compact && (
          <span className="absolute bottom-4 left-4 px-3 py-1 rounded-full text-xs font-semibold bg-white/95 text-gray-700">
            {event.category}
          </span>
        )}
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3 flex-wrap">
          <span className="flex items-center gap-1.5">
            <CalendarDays className="w-4 h-4" /> {event.date}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4" /> {event.location}
          </span>
        </div>
        <h3 className="font-heading font-bold text-lg leading-snug">{event.title}</h3>
        <p className="text-gray-500 mt-2 leading-relaxed flex-1">{event.description}</p>
        {compact ? (
          <span className="mt-4 inline-block w-fit px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700">
            {event.category}
          </span>
        ) : isUpcoming ? (
          <button className="mt-5 w-full py-3 rounded-full border border-violet-200 text-violet-600 font-semibold hover:bg-violet-50 transition-colors">
            S'inscrire →
          </button>
        ) : null}
      </div>
    </div>
  );
}
