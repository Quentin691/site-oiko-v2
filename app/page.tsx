import type { Metadata } from "next";

import {
  Hero,
  ServicesGrid,
  HighlightsSection,
  ActivitiesPreview,
} from "@/components/accueil";
import { ScrollToTop,Banner,AnimateOnScroll } from "@/components/ui";
import homeContent from "@/content/accueil.json";

export const metadata: Metadata = {
  title: "OIKO | Property, Asset & Project Management",
  description: "OIKO accompagne les propriétaires et investisseurs dans la gestion, la valorisation et la transaction de leurs actifs immobiliers à Paris et Marseille.",
  openGraph: {
    title: "OIKO | Property, Asset & Project Management",
    description: "OIKO accompagne les propriétaires et investisseurs dans la gestion, la valorisation et la transaction de leurs actifs immobiliers.",
    type: "website",
    images: [{ url: "/logo.png", width: 200, height: 80, alt: "OIKO Gestion" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "OIKO | Property, Asset & Project Management",
    description: "OIKO accompagne les propriétaires et investisseurs dans la gestion de leurs actifs immobiliers.",
    images: ["/logo.png"],
  },
};

export default function HomePage() {
  // Préparer les services avec les liens
  const servicesWithLinks = homeContent.services.map((service) => ({
    title: service.title,
    description: service.description,
    link: `/activites#${service.id}`,
  }));

  // Préparer les stats globales à partir des activités
  const globalStats = [
    { value: "77+", label: "Professionnels" },
    { value: "8 500", label: "Lots gérés" },
    { value: "1,2 Md€", label: "Actifs sous gestion" },
    { value: "35+", label: "Opérations" },
  ];

  return (
    <main>
      <Banner videoSrc="/Film-Oiko.mp4" />
      <Hero
        title={homeContent.hero.title}
        subtitle={homeContent.hero.description}
        ctaText="Découvrir nos activités"
        ctaLink="/activites"
      />
      <AnimateOnScroll>
        <ServicesGrid services={servicesWithLinks} />
      </AnimateOnScroll>

      <AnimateOnScroll>
        <HighlightsSection highlights={homeContent.highlights} />
      </AnimateOnScroll>

      <AnimateOnScroll>
        <ActivitiesPreview
          title={homeContent.activitiesPreview.title}
          description="OIKO GESTION accompagne ses clients sur l'ensemble du cycle immobilier."
          stats={globalStats}
          ctaText="Voir toutes nos activités"
          ctaLink="/activites"
        />
      </AnimateOnScroll>

      <ScrollToTop />
    </main>
  );
}