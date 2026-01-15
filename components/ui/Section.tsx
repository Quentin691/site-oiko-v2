import {ReactNode} from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  background?: "white" | "gray";
  id?: string;
}

export default function Section({
  children,
  className = "",
  background = "white",
  id,
}: SectionProps) {
  const bgColor = background === "white" ? "bg-card" : "bg-background";

  return (
    <section
      id={id}
      className={`py-16 px-6 ${bgColor} ${className}`}
    >
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </section>
  );
}