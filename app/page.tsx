import {
  Hero,
  ServicesGrid,
  HighlightsSection,
  ActivitiesPreview,
} from "@/components/accueil";
import { ScrollToTop } from "@/components/ui";
import homeContent from "@/content/accueil.json";

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
      <Hero
        title={homeContent.hero.title}
        subtitle={homeContent.hero.description}
        ctaText="Découvrir nos activités"
        ctaLink="/activites"
      />

      <ServicesGrid services={servicesWithLinks} />

      <HighlightsSection highlights={homeContent.highlights} />

      <ActivitiesPreview
        title={homeContent.activitiesPreview.title}
        description="OIKO GESTION accompagne ses clients sur l'ensemble du cycle immobilier."
        stats={globalStats}
        ctaText="Voir toutes nos activités"
        ctaLink="/activites"
      />

      <ScrollToTop />
    </main>
  );
}