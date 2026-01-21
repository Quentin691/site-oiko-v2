import type { Metadata } from "next";
import { ActivitySection } from "@/components/activites";
import { PageAnchors } from "@/components/layout";
import { ScrollToTop } from "@/components/ui";
import activitiesContent from "@/content/activites.json";

export const metadata: Metadata = {
  title: "Nos Activités | OIKO",
  description: "Découvrez les activités d'OIKO : Property Management, Asset Management, Project Management et Transaction. Gestion immobilière complète à Paris et Marseille.",
  openGraph: {
    title: "Nos Activités | OIKO",
    description: "Property Management, Asset Management, Project Management et Transaction immobilière.",
    type: "website",
  },
};

export default function ActivitiesPage() {
  // Définir les ancres pour PageAnchors
  const anchors = activitiesContent.sections.map((section) => ({
    id: section.id,
    label: section.title,
  }));

  return (
    <main>
      <PageAnchors anchors={anchors} />

      {activitiesContent.sections.map((section) => (
        <ActivitySection
          key={section.id}
          id={section.id}
          title={section.title}
          subtitle={section.subtitle}
          description={section.description}
          features={section.features}
          paragraphs={section.paragraphs}
          stats={section.stats}
        />
      ))}

      <ScrollToTop />
    </main>
  );
}
