import { Card } from "@/components/ui";
import Link from "next/link";

interface Service {
  title: string;
  description: string;
  link: string;
}

interface ServicesGridProps {
  services: Service[];
}

export default function ServicesGrid({ services }: ServicesGridProps) {
  return (
    <section className="bg-card py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-foreground text-center mb-12">
          Nos services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <Link key={service.title} href={service.link}>
              <Card hover>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted text-sm">
                  {service.description}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}