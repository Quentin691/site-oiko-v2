import type { Metadata } from "next";
import {
  ContactForm,
  AddressCard,
  ContactInfo,
} from "@/components/contact";
import { Section, ScrollToTop, AnimateOnScroll } from "@/components/ui";
import contactContent from "@/content/contact.json";

export const metadata: Metadata = {
  title: "Contact | OIKO",
  description: "Contactez OIKO pour vos projets immobiliers. Nos bureaux à Paris et Marseille sont à votre disposition pour répondre à vos demandes.",
  openGraph: {
    title: "Contact | OIKO",
    description: "Contactez nos équipes à Paris et Marseille pour vos projets immobiliers.",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <main>
      {/* Hero section */}
      <AnimateOnScroll>
      <Section background="white">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {contactContent.hero.title}
          </h1>
          <p className="text-xl text-muted">
            {contactContent.hero.subtitle}
          </p>
        </div>

        {/* Contact info */}
        <div className="max-w-4xl mx-auto mb-16">
          <ContactInfo
            email={contactContent.contact.email.value}
            phone={contactContent.contact.phone.value}
          />
        </div>

        {/* Formulaire */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
            Envoyez-nous un message
          </h2>
          <ContactForm subjects={["Demande d'information", "Demande de devis", "Réclamation", "Autre"]} />
        </div>
      </Section>
      </AnimateOnScroll>

      {/* Nos bureaux */}
      <AnimateOnScroll>
      <Section background="white">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            {contactContent.addresses.title}
          </h2>
          <p className="text-muted">
            {contactContent.addresses.company}
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {contactContent.addresses.offices.map((office, index) => (
            <AddressCard key={index} address={office} />
          ))}
        </div>
      </Section>
      </AnimateOnScroll>

      <ScrollToTop />
    </main>
  );
}