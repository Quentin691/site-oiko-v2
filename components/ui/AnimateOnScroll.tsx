"use client";

import { useInView } from "@/hooks/useInView";

export function AnimateOnScroll({ children }: { children: React.ReactNode }) {
    const { ref, isInView } = useInView();

    return (
        <div
            ref={ref}
            className={isInView ? "animate-fadeIn" : "opacity-0"}
        >
            {children}
        </div>
    );
}
