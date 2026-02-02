import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  href?: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
}

const getVariantStyles = (variant: "primary" | "secondary" | "outline") => {
  switch (variant) {
    case "primary":
      return "bg-primary hover:bg-primary-dark text-gray-900";
    case "secondary":
      return "bg-card text-foreground border border-border hover:bg-hover-bg";
    case "outline":
      return "bg-transparent text-foreground border border-foreground hover:bg-foreground hover:text-background";
    default:
      return "bg-primary hover:bg-primary-dark text-gray-900";
  }
};

export default function Button({
  href,
  children,
  variant = "primary",
  onClick,
  type = "button",
  disabled = false,
  className = "",
}: ButtonProps) {
  const baseStyles = "px-6 py-3 rounded font-medium transition-all duration-200";
  const variantStyles = getVariantStyles(variant);
  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed" : "";
  const combinedStyles = `${baseStyles} ${variantStyles} ${disabledStyles} ${className}`;

  // Si href est fourni, rendre un Link
  if (href) {
    return (
      <Link href={href} className={combinedStyles}>
        {children}
      </Link>
    );
  }

  // Sinon, rendre un bouton
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={combinedStyles}>
      {children}
    </button>
  );
}
