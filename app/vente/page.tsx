import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Biens à la Vente | OIKO",
  description: "Découvrez les biens immobiliers à la vente proposés par OIKO. Appartements, maisons et locaux commerciaux à Paris et Marseille.",
  openGraph: {
    title: "Biens à la Vente | OIKO",
    description: "Annonces immobilières de biens à vendre à Paris et Marseille.",
    type: "website",
  },
};

export default function VentePage() {
  return (
    <div>
      <h1>Annonces de biens à la vente</h1>
    </div>
  );
}
