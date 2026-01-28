import { Button, AnimatedCounter } from "@/components/ui";

interface Stat {
  value: string;
  label: string;
  numericValue?: number;
  suffix?: string;
}

interface ActivitiesPreviewProps {
  title: string;
  description: string;
  stats: Stat[];
  ctaText: string;
  ctaLink: string;
}

// Fonction pour extraire le nombre et le suffixe d'une valeur
function parseStatValue(value: string): { number: number | null; suffix: string } {
  // Patterns comme "77+", "8 500", "1,2 Md€", "35+"
  const match = value.match(/^([\d\s,\.]+)(.*)$/);
  if (match) {
    const numStr = match[1].replace(/\s/g, "").replace(",", ".");
    const num = parseFloat(numStr);
    if (!isNaN(num)) {
      return { number: num, suffix: match[2] || "" };
    }
  }
  return { number: null, suffix: value };
}

export default function ActivitiesPreview({
  title,
  description,
  stats,
  ctaText,
  ctaLink,
}: ActivitiesPreviewProps) {
  return (
    <section className="bg-card py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            {title}
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {stats.map((stat) => {
            const { number, suffix } = parseStatValue(stat.value);
            return (
              <div key={stat.label} className="text-center">
                <div className="text-4xl font-bold text-foreground mb-2">
                  {number !== null ? (
                    <AnimatedCounter target={number} suffix={suffix} duration={2000} />
                  ) : (
                    stat.value
                  )}
                </div>
                <div className="text-sm text-muted">{stat.label}</div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Button href={ctaLink} variant="primary">
            {ctaText}
          </Button>
        </div>
      </div>
    </section>
  );
}