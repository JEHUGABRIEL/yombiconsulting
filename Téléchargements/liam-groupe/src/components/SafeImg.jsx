import { useState } from "react";
import { ImageOff } from "lucide-react";

/**
 * SafeImg — Affiche une image Cloudinary avec un fallback élégant
 * en cas d'erreur de chargement (image inexistante sur Cloudinary).
 */
export default function SafeImg({ src, alt, className = "", icon: Icon, ...props }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 text-gray-400 ${className}`}
        aria-label={alt || "Image non disponible"}
      >
        <div className="flex flex-col items-center gap-1.5">
          {Icon ? <Icon className="w-5 h-5" /> : <ImageOff className="w-5 h-5" />}
          {alt && <span className="text-[0.6rem] font-medium text-gray-300 text-center px-1 leading-tight">{alt}</span>}
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
      {...props}
    />
  );
}
