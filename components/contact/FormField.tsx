import { ReactNode } from "react";

interface FormFieldProps {
  label: string;
  name: string;
  type?: "text" | "email" | "tel" | "textarea" | "select" | "checkbox";
  placeholder?: string;
  required?: boolean;
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
  options = [],
  rows = 4,
  children,
}: FormFieldProps) {
  const baseInputStyles = "w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-foreground focus:border-transparent";

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
          className="mt-1 w-4 h-4 text-foreground border-gray-300 rounded focus:ring-foreground"
        />
        <label htmlFor={name} className="text-sm text-gray-700">
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
        className={baseInputStyles}
      />
    </div>
  );
}