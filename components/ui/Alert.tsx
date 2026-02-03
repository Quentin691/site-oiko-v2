import { ReactNode } from "react";

type AlertVariant = "success" | "error" | "warning" | "info";

interface AlertProps {
  children: ReactNode;
  variant: AlertVariant;
  className?: string;
}

const getVariantStyles = (variant: AlertVariant) => {
  switch (variant) {
    case "success":
      return "bg-green-100 border-green-400 text-green-700 dark:bg-green-900 dark:border-green-700 dark:text-green-200";
    case "error":
      return "bg-red-100 border-red-400 text-red-700 dark:bg-red-900 dark:border-red-700 dark:text-red-200";
    case "warning":
      return "bg-yellow-100 border-yellow-400 text-yellow-700 dark:bg-yellow-900 dark:border-yellow-700 dark:text-yellow-200";
    case "info":
      return "bg-blue-100 border-blue-400 text-blue-700 dark:bg-blue-900 dark:border-blue-700 dark:text-blue-200";
    default:
      return "bg-gray-100 border-gray-400 text-gray-700";
  }
};

export default function Alert({ children, variant, className = "" }: AlertProps) {
  const variantStyles = getVariantStyles(variant);

  return (
    <div
      className={`px-4 py-3 rounded border ${variantStyles} ${className}`}
      role={variant === "error" ? "alert" : "status"}
      aria-live={variant === "error" ? "assertive" : "polite"}
    >
      {children}
    </div>
  );
}
