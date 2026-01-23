import type { Metadata } from "next";
import Section from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Mentions Légales | OIKO",
  description: "Mentions légales du site OIKO Gestion.",
};

export default function MentionsLegalesPage() {
  return (
    <main>
      <Section title="Mentions Légales" className="bg-background">
        <div className="prose prose-lg max-w-none dark:prose-invert">
          <h2>1. Éditeur du site</h2>
          <ul>
            <li><strong>Raison sociale :</strong> OIKO Gestion</li>
            <li><strong>Forme juridique :</strong> [SAS/SARL/etc.]</li>
            <li><strong>Capital social :</strong> [Montant] €</li>
            <li><strong>Siège social :</strong> [Adresse complète]</li>
            <li><strong>SIRET :</strong> [Numéro SIRET]</li>
            <li><strong>RCS :</strong> [Ville + Numéro RCS]</li>
            <li><strong>Téléphone :</strong> [Numéro de téléphone]</li>
            <li><strong>Email :</strong> contact@oiko-gestion.fr</li>
          </ul>

          <h2>2. Directeur de la publication</h2>
          <p>[Nom du directeur], en qualité de [fonction].</p>

          <h2>3. Hébergeur</h2>
          <ul>
            <li><strong>Raison sociale :</strong> Vercel Inc.</li>
            <li><strong>Adresse :</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, USA</li>
            <li><strong>Site web :</strong>{" "}
              <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                vercel.com
              </a>
            </li>
          </ul>

          <h2>4. Activité réglementée</h2>
          <p>OIKO Gestion exerce une activité de gestion immobilière soumise à la loi Hoguet :</p>
          <ul>
            <li><strong>Carte professionnelle :</strong> Carte G n° [Numéro] délivrée par la CCI de [Ville]</li>
            <li><strong>Garantie financière :</strong> [Nom de l'organisme] - [Montant] €</li>
            <li><strong>Assurance RCP :</strong> [Nom de l'assureur] - Contrat n° [Numéro]</li>
          </ul>

          <h2>5. Propriété intellectuelle</h2>
          <p>
            L'ensemble du contenu du site est protégé par les lois relatives à la propriété intellectuelle.
            Toute reproduction non autorisée est interdite.
          </p>

          <h2>6. Crédits</h2>
          <ul>
            <li><strong>Conception et développement :</strong> [Nom du développeur/agence]</li>
          </ul>
        </div>
      </Section>
    </main>
  );
}