import { ReactNode } from "react";

interface FormFieldProps {
  label: string;
  name: string;
  type?: "text" | "email" | "tel" | "textarea" | "select" | "checkbox";
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  options?: string[];
  rows?: number;
  children?: ReactNode;
}

export default function FormField({
  label,
  name,
  type = "text",
  placeholder,
  required = false,
  disabled = false,
  options = [],
  rows = 4,
  children,
}: FormFieldProps) {
  const baseInputStyles = "w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-200 disabled:cursor-not-allowed bg-card text-foreground dark:disabled:bg-gray-700";

  if (type === "textarea") {
    return (
      <div className="mb-4">
        <label htmlFor={name} className="block text-sm font-medium text-foreground mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <textarea
          id={name}
          name={name}
          rows={rows}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={baseInputStyles}
        />
      </div>
    );
  }

  if (type === "select") {
    return (
      <div className="mb-4">
        <label htmlFor={name} className="block text-sm font-medium text-foreground mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <select
          id={name}
          name={name}
          required={required}
          disabled={disabled}
          className={baseInputStyles}
        >
          <option value="">Sélectionner...</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (type === "checkbox") {
    return (
      <div className="mb-4 flex items-start gap-3">
        <input
          type="checkbox"
          id={name}
          name={name}
          required={required}
          disabled={disabled}
          className="mt-1 w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary disabled:cursor-not-allowed"
        />
        <label htmlFor={name} className="text-sm text-muted">
          {children || label} {required && <span className="text-red-500">*</span>}
        </label>
      </div>
    );
  }

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-foreground mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={baseInputStyles}
      />
    </div>
  );
}