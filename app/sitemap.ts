import type { MetadataRoute } from "next";
import { getAllAds } from "@/lib/ubiflow";
import { mapApiToProperties } from "@/lib/mapProperty";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://site-oiko-v2-tklh.vercel.app";

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
      url: `${baseUrl}/a-propos-de-nous`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contactez-nous`,
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
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/mentions-legales`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Pages dynamiques (annonces)
  let dynamicPages: MetadataRoute.Sitemap = [];

  try {
    // Récupérer toutes les annonces (toutes les pages, sans filtre de type)
    const rawProperties = await getAllAds();
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
