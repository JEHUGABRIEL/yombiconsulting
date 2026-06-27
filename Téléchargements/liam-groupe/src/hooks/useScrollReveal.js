import { useEffect, useRef } from "react";

/**
 * useScrollReveal — Applique des animations au scroll via Intersection Observer.
 * Anime l'élément observé ainsi que tous ses enfants portant la classe `.reveal`.
 *
 * @param {Object} options
 * @param {string}  options.animation  Classe CSS d'animation (défaut: "animate-fade-up")
 * @param {number}  options.threshold  Ratio de visibilité requis (défaut: 0.1)
 * @param {string}  options.rootMargin Marge autour du viewport (défaut: "0px 0px -40px 0px")
 * @param {boolean} options.once       Ne jouer qu'une seule fois (défaut: true)
 * @returns {React.RefObject}           Ref à attacher à l'élément
 */
export default function useScrollReveal({
  animation = "animate-fade-up",
  threshold = 0.1,
  rootMargin = "0px 0px -40px 0px",
  once = true,
} = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Anime l'élément racine
          el.classList.add(animation);
          // Anime aussi tous les enfants .reveal (nécessaire pour stagger-children)
          el.querySelectorAll(".reveal").forEach((child) => {
            child.classList.add(animation);
          });
          if (once) observer.unobserve(el);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [animation, threshold, rootMargin, once]);

  return ref;
}
