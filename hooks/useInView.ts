import { useState, useEffect, useRef } from "react";

export function useInView() {
    // État : est-ce que l'élément est visible ?
    const [isInView, setIsInView] = useState(false);

    // Référence vers l'élément HTML qu'on surveille
    const ref = useRef(null);

    // Effet : créer l'observateur
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // Quand l'élément devient visible ou invisible, on met à jour isInView
                setIsInView(entry.isIntersecting);
            },
            { threshold: 0.1 } // Se déclenche quand 10% de l'élément est visible
        );

        // On observe l'élément
        if (ref.current) {
            observer.observe(ref.current);
        }

        // Nettoyage quand le composant disparaît
        return () => observer.disconnect();
    }, []);

    // On retourne la ref et l'état
    return { ref, isInView };
}
