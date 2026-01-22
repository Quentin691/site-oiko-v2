import { Section, Stats } from "@/components/ui";

interface Feature {
  title: string;
  content: string;
}

interface Stat {
  number: string;
  label: string;
}

interface ActivitySectionProps {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  features?: Feature[];
  paragraphs?: string[];
  stats?: Stat[];
  background?: "white" | "gray";
}

export default function ActivitySection({
  id,
  title,
  subtitle,
  description,
  features = [],
  paragraphs = [],
  stats = [],
  background = "white",
}: ActivitySectionProps) {
  return (
    <Section id={id} background={background}>
      <div className="max-w-4xl mx-auto">
        {/* En-tête */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xl text-muted mb-4">
              {subtitle}
            </p>
          )}
          {description && (
            <p className="text-muted">
              {description}
            </p>
          )}
        </div>

        {/* Features (avec titre et contenu) */}
        {features.length > 0 && (
          <div className="mb-12 space-y-8">
            {features.map((feature, index) => (
              <div key={index}>
                <h3 className="text-2xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted leading-relaxed whitespace-pre-line">
                  {feature.content}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Paragraphes (simples chaînes de texte) */}
        {paragraphs.length > 0 && (
          <div className="mb-12 space-y-4">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="text-muted leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        )}

        {/* Stats */}
        {stats.length > 0 && (
          <div className="flex justify-center gap-16">
            {stats.map((stat, index) => (
              <Stats key={index} value={stat.number} label={stat.label} />
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
