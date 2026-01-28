"use client";

import { useEffect, useState } from "react";
import { useInView } from "@/hooks/useInView";

interface AnimatedCounterProps {
  target: number;
  duration?: number; // durée en ms
  suffix?: string; // ex: "+", "m²", etc.
  prefix?: string; // ex: "€", etc.
}

export function AnimatedCounter({
  target,
  duration = 2000,
  suffix = "",
  prefix = "",
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const { ref, isInView } = useInView();
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);

      const startTime = Date.now();
      const startValue = 0;

      const animate = () => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / duration, 1);

        // Easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(startValue + (target - startValue) * easeOut);

        setCount(currentValue);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isInView, hasAnimated, target, duration]);

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString("fr-FR")}{suffix}
    </span>
  );
}
