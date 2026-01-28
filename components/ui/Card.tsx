import {ReactNode} from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({
  children,
  className = "",
  hover = false,
}: CardProps) {
  const hoverStyles = hover
    ? "hover:shadow-lg hover:scale-105 cursor-pointer group"
    : "";

  return (
    <div
      className={`bg-card text-card-foreground rounded-lg border border-border p-6 shadow-sm transition-all duration-200 ${hoverStyles} ${className}`}
    >
      {children}
    </div>
  );
}