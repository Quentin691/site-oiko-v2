import { Card } from "@/components/ui";

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

interface TimelineProps {
  events: TimelineEvent[];
}

export default function Timeline({ events }: TimelineProps) {
  return (
    <div className="relative">
      {/* Ligne verticale centrale */}
      <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gray-300"></div>

      <div className="space-y-12">
        {events.map((event, index) => {
          const isEven = index % 2 === 0;

          return (
            <div key={event.year} className="relative">
              {/* Desktop: alternance gauche/droite */}
              <div className={`md:flex md:items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className="md:w-5/12"></div>

                {/* Point central */}
                <div className="hidden md:flex items-center justify-center md:w-2/12">
                  <div className="w-4 h-4 rounded-full bg-foreground border-4 border-background shadow"></div>
                </div>

                {/* Contenu */}
                <div className="md:w-5/12">
                  <Card>
                    <div className="flex items-baseline gap-4 mb-3">
                      <span className="text-3xl font-bold text-foreground">{event.year}</span>
                      <h3 className="text-xl font-semibold text-foreground">{event.title}</h3>
                    </div>
                    <p className="text-gray-600">{event.description}</p>
                  </Card>
                </div>
              </div>

              {/* Mobile: liste simple */}
              <div className="md:hidden">
                <Card>
                  <div className="flex items-baseline gap-4 mb-3">
                    <span className="text-2xl font-bold text-foreground">{event.year}</span>
                    <h3 className="text-lg font-semibold text-foreground">{event.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm">{event.description}</p>
                </Card>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}