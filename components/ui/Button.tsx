import Link from "next/link";
import { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger" | "info";
type ButtonSize = "sm" | "md" | "lg" | "icon";

interface ButtonProps {
  href?: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  title?: string;
  target?: string;
  rel?: string;
}

const getVariantStyles = (variant: ButtonVariant) => {
  switch (variant) {
    case "primary":
      return "bg-primary hover:bg-primary-dark text-gray-900";
    case "secondary":
      return "bg-card text-foreground border border-border hover:bg-hover-bg";
    case "outline":
      return "bg-transparent text-foreground border border-foreground hover:bg-foreground hover:text-background";
    case "ghost":
      return "bg-transparent text-muted hover:text-foreground hover:bg-hover-bg";
    case "danger":
      return "bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900 dark:text-red-200 dark:hover:bg-red-800";
    case "info":
      return "bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800";
    default:
      return "bg-primary hover:bg-primary-dark text-gray-900";
  }
};

const getSizeStyles = (size: ButtonSize) => {
  switch (size) {
    case "sm":
      return "px-3 py-1 text-sm";
    case "md":
      return "px-6 py-3";
    case "lg":
      return "px-8 py-4 text-lg";
    case "icon":
      return "p-2";
    default:
      return "px-6 py-3";
  }
};

export default function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  onClick,
  type = "button",
  disabled = false,
  className = "",
  title,
  target,
  rel,
}: ButtonProps) {
  const baseStyles = "rounded font-medium transition-all duration-200";
  const variantStyles = getVariantStyles(variant);
  const sizeStyles = getSizeStyles(size);
  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed" : "";
  const combinedStyles = `${baseStyles} ${sizeStyles} ${variantStyles} ${disabledStyles} ${className}`;

  // Si href est fourni, rendre un Link
  if (href) {
    return (
      <Link
        href={href}
        className={combinedStyles}
        title={title}
        target={target}
        rel={rel}
      >
        {children}
      </Link>
    );
  }

  // Sinon, rendre un bouton
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedStyles}
      title={title}
    >
      {children}
    </button>
  );
}
