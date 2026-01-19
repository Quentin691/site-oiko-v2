import { Section, Card, Stats } from "@/components/ui";


interface Feature {
  text: string;
}

interface Paragraph {
  title?: string;
  content: string;
}

interface Stat {
  value: string;
  label: string;
}

interface ActivitySectionProps {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features?: Feature[];
  paragraphs?: Paragraph[];
  stats?: Stat[];
}

export default function ActivitySection({
  id,
  title,
  subtitle,
  description,
  features = [],
  paragraphs = [],
  stats = [],
}: ActivitySectionProps) {
  return (
    <Section id={id} background="white">
      <div className="max-w-4xl mx-auto">
        {/* En-tête */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            {title}
          </h2>
          <p className="text-xl text-gray-600 mb-4">
            {subtitle}
          </p>
          <p className="text-gray-700">
            {description}
          </p>
        </div>

        {/* Features */}
        {features.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-foreground mb-6">
              Caractéristiques
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-foreground shrink-0 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-700">{feature.text}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Paragraphes */}
        {paragraphs.length > 0 && (
          <div className="mb-12 space-y-6">
            {paragraphs.map((paragraph, index) => (
              <div key={index}>
                {paragraph.title && (
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {paragraph.title}
                  </h3>
                )}
                <p className="text-gray-700 leading-relaxed">
                  {paragraph.content}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Stats */}
        {stats.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Stats key={index} value={stat.value} label={stat.label} />
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}