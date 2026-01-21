import { Button } from "@/components/ui";
interface HeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}

export default function Hero({ title, subtitle, ctaText, ctaLink }: HeroProps) {
  return (
    <section className="bg-background py-12 sm:py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4 sm:mb-6">
          {title}
        </h1>
        <p className="text-base sm:text-xl text-muted mb-6 sm:mb-8 max-w-2xl mx-auto">
          {subtitle}
        </p>
        <Button href={ctaLink} variant="primary">
          {ctaText}
        </Button>
      </div>
    </section>
  );
}