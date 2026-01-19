import { Stats, Button } from "@/components/ui";

interface Stat {
  value: string;
  label: string;
}

interface ActivitiesPreviewProps {
  title: string;
  description: string;
  stats: Stat[];
  ctaText: string;
  ctaLink: string;
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
          <p className="text-gray-600 max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {stats.map((stat) => (
            <Stats key={stat.label} value={stat.value} label={stat.label} />
          ))}
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