import { useEffect } from "react";
import { useBlocker } from "react-router-dom";

/**
 * useUnsavedChanges — Affiche une confirmation quand l'utilisateur quitte
 * une page avec des changements non sauvegardés.
 *
 * Couvre deux cas :
 * 1. Fermeture / rechargement du navigateur (beforeunload)
 * 2. Navigation interne React Router (useBlocker)
 *
 * @param {boolean} isDirty  true si le formulaire a des modifications
 * @returns {object}  { blocker } — utiliser blocker.state / blocker.proceed / blocker.reset
 */
export default function useUnsavedChanges(isDirty) {
  // beforeunload — fermeture d'onglet / refresh
  useEffect(() => {
    if (!isDirty) return;

    const handler = (e) => {
      e.preventDefault();
      e.returnValue = ""; // requis par le navigateur
    };

    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [isDirty]);

  // useBlocker — navigation interne React Router
  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      isDirty && currentLocation.pathname !== nextLocation.pathname
  );

  return { blocker };
}
