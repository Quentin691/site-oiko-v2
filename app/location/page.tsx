import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Biens à la Location | OIKO",
  description: "Trouvez votre bien immobilier à louer avec OIKO. Appartements et locaux disponibles à la location à Paris et Marseille.",
  openGraph: {
    title: "Biens à la Location | OIKO",
    description: "Annonces immobilières de biens à louer à Paris et Marseille.",
    type: "website",
  },
};

export default function LocationPage() {
  return (
    <div>
      <h1>Annonces de biens à la location</h1>
    </div>
  );
}
