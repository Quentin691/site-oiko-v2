import type { Metadata } from "next";
import {
  Timeline,
  ToolsGrid,
  VideoSection,
  TestimonialsGrid,
  JobsGrid,
} from "@/components/a-propos";
import { PageAnchors } from "@/components/layout";
import { Section, ScrollToTop, AnimateOnScroll } from "@/components/ui";
import aproposContent from "@/content/a-propos.json";

export const metadata: Metadata = {
  title: "À Propos | OIKO",
  description: "Découvrez l'histoire d'OIKO, nos outils, notre équipe et nos métiers. Une expertise immobilière au service des propriétaires et investisseurs depuis notre création.",
  openGraph: {
    title: "À Propos | OIKO",
    description: "L'histoire, les outils et l'équipe OIKO - Experts en gestion immobilière.",
    type: "website",
  },
};

export default function AProposPage() {
  // Extraire les sections par leur id
  const histoireSection = aproposContent.sections.find(s => s.id === "histoire");
  const outilsSection = aproposContent.sections.find(s => s.id === "outils");
  const presentationSection = aproposContent.sections.find(s => s.id === "presentation");
  const temoignagesSection = aproposContent.sections.find(s => s.id === "temoignages");
  const recrutementSection = aproposContent.sections.find(s => s.id === "recrutement");
  const metiersSection = aproposContent.sections.find(s => s.id === "metiers");

  // Définir les ancres dynamiquement
  const anchors = aproposContent.sections.map((section) => ({
    id: section.id,
    label: section.title,
  }));

  return (
    <main>
      <PageAnchors anchors={anchors} />

      {/* Section Histoire */}
      {histoireSection && (
        <AnimateOnScroll>
        <Section id="histoire" background="white">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {histoireSection.title}
            </h1>
            {histoireSection.subtitle && (
              <p className="text-xl text-muted max-w-3xl mx-auto">
                {histoireSection.subtitle}
              </p>
            )}
          </div>
          {histoireSection.timeline && (
            <Timeline events={histoireSection.timeline} />
          )}
        </Section>
        </AnimateOnScroll>
      )}

      {/* Section Outils */}
      {outilsSection && (
        <AnimateOnScroll>
        <Section id="outils" background="gray">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {outilsSection.title}
            </h2>
            {outilsSection.description && (
              <p className="text-muted max-w-2xl mx-auto whitespace-pre-line">
                {outilsSection.description}
              </p>
            )}
          </div>
          {outilsSection.tools && (
            <ToolsGrid tools={outilsSection.tools} />
          )}
        </Section>
        </AnimateOnScroll>
      )}

      {/* Section Présentation */}
      {presentationSection && (
        <AnimateOnScroll>
        <Section id="presentation" background="white">
          <VideoSection
            title={presentationSection.title}
            description={presentationSection.description}
          />
        </Section>
        </AnimateOnScroll>
      )}

      {/* Section Témoignages */}
      {temoignagesSection && temoignagesSection.testimonials && (
        <AnimateOnScroll>
        <Section id="temoignages" background="gray">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {temoignagesSection.title}
            </h2>
          </div>
          <TestimonialsGrid testimonials={temoignagesSection.testimonials} />
        </Section>
        </AnimateOnScroll>
      )}

      {/* Section Métiers */}
      {metiersSection && (
        <AnimateOnScroll>
        <Section id="metiers" background="white">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {metiersSection.title}
            </h2>
          </div>
          {metiersSection.jobs && (
            <JobsGrid jobs={metiersSection.jobs} />
          )}
        </Section>
        </AnimateOnScroll>
      )}

      <ScrollToTop />
    </main>
  );
}