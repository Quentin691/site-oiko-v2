import { Card } from "@/components/ui";

interface TestimonialsGridProps {
  testimonials: string[];
}

export default function TestimonialsGrid({ testimonials }: TestimonialsGridProps) {
  if (testimonials.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {testimonials.map((testimonial, index) => (
        <Card key={index}>
          <div className="p-2">
            {/* Icône citation */}
            <svg
              className="w-8 h-8 text-muted mb-3"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <p className="text-muted italic leading-relaxed">
              "{testimonial}"
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
}