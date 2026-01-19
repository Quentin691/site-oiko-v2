import { ActivitySection } from "@/components/activites";
import { PageAnchors } from "@/components/layout";
import { ScrollToTop } from "@/components/ui";
import activitiesContent from "@/content/activites.json";

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
