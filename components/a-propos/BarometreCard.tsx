import { Card } from "@/components/ui";

interface BarometreCardProps {
  score: number;
  description: string;
  year: string;
}

export default function BarometreCard({ score, description, year }: BarometreCardProps) {
  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <div className="text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Baromètre de l'expérience salarié
          </h3>

          <div className="inline-flex items-baseline gap-2 mb-4">
            <span className="text-6xl font-bold text-foreground">{score}</span>
            <span className="text-3xl text-gray-600">/ 100</span>
          </div>

          <p className="text-gray-600 mb-2">
            {description}
          </p>
          <p className="text-sm text-gray-500">
            Année {year}
          </p>

          {/* Barre de progression */}
          <div className="mt-6 w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-foreground h-3 rounded-full transition-all duration-500"
              style={{ width: `${score}%` }}
            />
          </div>
        </div>
      </Card>
    </div>
  );
}