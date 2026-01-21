export default function JsonLd() {
    const organizationData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "OIKO",
        "description": "OIKO accompagne les propriétaires et investisseurs dans la gestion, la valorisation et la transaction de leurs actifs immobiliers à Paris et Marseille.",
        "url": "https://oiko.fr",
        "logo": "https://oiko.fr/logo.png",
        "address": [
            {
                "@type": "PostalAddress",
                "streetAddress": "128 rue la Boétie",
                "addressLocality": "Paris",
                "postalCode": "75008",
                "addressCountry": "FR"
            },
            {
                "@type": "PostalAddress",
                "streetAddress": "42 rue Paradis",
                "addressLocality": "Marseille",
                "postalCode": "13001",
                "addressCountry": "FR"
            }
        ],
        "sameAs": [
            "https://www.linkedin.com/company/oiko-gestion"
        ],
        "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer service",
            "availableLanguage": "French"
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
        />
    );
}
