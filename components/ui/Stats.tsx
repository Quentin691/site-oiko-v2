import {ReactNode} from "react";

interface StatsProps {
  value: string | number;
  label: string;
  icon?: ReactNode;
  className?: string;
}

export default function Stats({
  value,
  label,
  icon,
  className = "",
}: StatsProps) {
  return (
    <div className={`text-center ${className}`}>
      {icon && <div className="mb-2 flex justify-center">{icon}</div>}
      <div className="text-4xl font-bold text-foreground mb-2">
        {value}
      </div>
      <div className="text-sm text-gray-600">
        {label}
      </div>
    </div>
  );
}