"use client";

import { useState, useEffect } from "react";
import { useInView } from "@/hooks/useInView";

interface AnimateOnScrollProps {
    children: React.ReactNode;
}

export function AnimateOnScroll({ children }: AnimateOnScrollProps) {
    const { ref, isInView } = useInView();
    const [shouldAnimate, setShouldAnimate] = useState(false);

    useEffect(() => {
        // Une fois visible, on déclenche l'animation et on ne revient jamais en arrière
        if (isInView && !shouldAnimate) {
            setShouldAnimate(true);
        }
    }, [isInView, shouldAnimate]);

    return (
        <div
            ref={ref}
            className={shouldAnimate ? "animate-fadeIn" : "opacity-0"}
        >
            {children}
        </div>
    );
}
