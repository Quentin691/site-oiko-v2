import type { MetadataRoute } from "next";
import { getAdsList } from "@/lib/ubiflow";
import { mapApiToProperties } from "@/lib/mapProperty";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://oiko-gestion.fr";

  // Pages statiques
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/activites`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/a-propos`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/location`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/vente`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/politique-rgpd`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Pages dynamiques (annonces)
  let dynamicPages: MetadataRoute.Sitemap = [];

  try {
    // Récupérer toutes les annonces (sans filtre de type)
    const rawProperties = await getAdsList(1);
    const properties = mapApiToProperties(rawProperties);

    dynamicPages = properties.map((property) => {
      const type = property.transaction.code === "L" ? "location" : "vente";
      return {
        url: `${baseUrl}/${type}/${property.id}`,
        lastModified: property.updatedAt ? new Date(property.updatedAt) : new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.6,
      };
    });
  } catch (error) {
    console.error("[Sitemap] Erreur lors de la récupération des annonces:", error);
  }

  return [...staticPages, ...dynamicPages];
}
