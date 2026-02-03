import type { PropertyRaw } from "@/types/property";

// Cache du token côté serveur
// Le token est stocké en mémoire sur le serveur, jamais exposé au client

let cachedToken: string | null = null;
let tokenExpiry: number | null = null;

// === CONFIGURATION DU CACHE ===
// Durées optimisées pour l'immobilier (données peu fréquemment mises à jour)
const CACHE_DURATIONS = {
  LIST: 15 * 60 * 1000,       // 15 minutes pour les listes
  DETAIL: 30 * 60 * 1000,     // 30 minutes pour les détails d'annonce
  SITEMAP: 60 * 60 * 1000,    // 1 heure pour le sitemap
  TOKEN_MARGIN: 5 * 60 * 1000, // Marge de renouvellement token
};

// Cache des annonces par type (L = location, V = vente)
const adsCache: Record<string, { data: PropertyRaw[]; expiry: number }> = {};

// Cache par page pour pagination serveur
const pageCache: Record<string, { data: PropertyRaw[]; total: number; expiry: number }> = {};

// Cache pour les annonces individuelles
const adDetailCache: Record<string, { data: unknown; expiry: number }> = {};

// Statistiques du cache (pour monitoring)
export const cacheStats = {
  hits: 0,
  misses: 0,
  lastReset: Date.now(),
};

// Marge de sécurité : on renouvelle le token 5 minutes avant expiration
const EXPIRY_MARGIN = CACHE_DURATIONS.TOKEN_MARGIN;

/**
 * Récupère un token valide (depuis le cache ou en demande un nouveau)
 */
export async function getUbiflowToken(): Promise<string> {
  // Si on a un token en cache et qu'il est encore valide
  if (cachedToken && tokenExpiry && Date.now() < tokenExpiry - EXPIRY_MARGIN) {
    console.log("[Ubiflow] Token récupéré depuis le cache");
    return cachedToken;
  }

  // Sinon, on demande un nouveau token
  console.log("[Ubiflow] Demande d'un nouveau token...");

  const response = await fetch("https://auth.ubiflow.net/api/login_check", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: process.env.UBIFLOW_USERNAME,
      password: process.env.UBIFLOW_PASSWORD,
    }),
  });

  if (!response.ok) {
    throw new Error("Échec de l'authentification Ubiflow");
  }

  const data = await response.json();

  // Stocker le token en cache
  cachedToken = data.token;

  // Le token expire dans 1h, on stocke l'heure d'expiration
  // (1h = 3600 secondes = 3600000 millisecondes)
  tokenExpiry = Date.now() + 60 * 60 * 1000;

  console.log("[Ubiflow] Nouveau token obtenu et mis en cache");

  return cachedToken as string;
}

/**
 * Récupère la liste des annonces depuis l'API Ubiflow
 * @param page - Numéro de page (pagination)
 * @param adType - Type de transaction : "L" (location) ou "V" (vente)
 */
export async function getAdsList(
  page: number = 1,
  options?: {
    adType?: "L" | "V",
    getCount?: boolean
  }
): Promise<PropertyRaw[]> {
  const { adType = "L", getCount = false } = options || {};
  const token = await getUbiflowToken();
  const prodId = process.env.UBIFLOW_PROD_ID;

  if (!prodId) {
    throw new Error("UBIFLOW_PROD_ID non configuré dans .env.local");
  }

  // Construction de l'URL avec filtres optionnels
  let url = `https://api-classifieds.ubiflow.net/api/ads?advertiser.code=${prodId}&page=${page}`;

  // Ajouter le filtre par type de transaction si spécifié
  if (adType) {
    url += `&transaction.code=${adType}`;
  }

  console.log(`[Ubiflow] Récupération des annonces (page ${page}, type: ${adType || "tous"})...`);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-AUTH-TOKEN": `Bearer ${token}`,
    },
    // Cache Next.js de 15 minutes
    next: { revalidate: 900 },
  });

  if (!response.ok) {
    // Si 404, c'est qu'on a dépassé le nombre de pages disponibles
    if (response.status === 404) {
      console.log(`[Ubiflow] Page ${page} non trouvée (fin des résultats)`);
      return [];
    }
    const errorText = await response.text();
    console.error("[Ubiflow] Erreur:", errorText);
    throw new Error(`Échec de la récupération des annonces: ${response.status}`);
  }

  const data = await response.json();
  console.log(`[Ubiflow] ${data.length} annonces récupérées (page ${page})`);
  return data;
}

/**
 * Récupère TOUTES les annonces (toutes les pages) depuis l'API Ubiflow
 * Utilise le format Hydra pour connaître le nombre total d'items
 * @param adType - Type de transaction : "L" (location), "V" (vente), ou undefined pour tous
 */
export async function getAllAds(adType?: "L" | "V"): Promise<PropertyRaw[]> {
  const cacheKey = adType || "all";

  // Vérifier si on a des données en cache et si elles sont encore valides
  if (adsCache[cacheKey] && Date.now() < adsCache[cacheKey].expiry) {
    cacheStats.hits++;
    console.log(`[Ubiflow] Cache HIT - Annonces (type: ${cacheKey}, count: ${adsCache[cacheKey].data.length})`);
    return adsCache[cacheKey].data;
  }
  cacheStats.misses++;

  const token = await getUbiflowToken();
  const prodId = process.env.UBIFLOW_PROD_ID;

  if (!prodId) {
    throw new Error("UBIFLOW_PROD_ID non configuré dans .env.local");
  }

  const allAds: PropertyRaw[] = [];
  let page = 1;
  let totalExpected = 0;
  let hasMorePages = true;

  console.log(`[Ubiflow] Récupération de toutes les annonces (type: ${adType || "tous"})...`);

  while (hasMorePages) {
    // Construire l'URL
    let url = `https://api-classifieds.ubiflow.net/api/ads?advertiser.code=${prodId}&page=${page}`;
    if (adType) {
      url += `&transaction.code=${adType}`;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/ld+json", // Format Hydra pour avoir le total
        "X-AUTH-TOKEN": `Bearer ${token}`,
      },
      // Cache Next.js de 15 minutes (données immobilières peu volatiles)
      next: { revalidate: 900 },
    });

    if (!response.ok) {
      if (response.status === 404) {
        console.log(`[Ubiflow] Page ${page} non trouvée (fin des résultats)`);
        hasMorePages = false;
        continue;
      }
      throw new Error(`Échec récupération page ${page}: ${response.status}`);
    }

    const result = await response.json();

    // Format Hydra: { "hydra:member": [...], "hydra:totalItems": number }
    const ads = result["hydra:member"] || result;

    // Récupérer le total attendu (seulement à la première page)
    if (page === 1 && result["hydra:totalItems"]) {
      totalExpected = result["hydra:totalItems"];
      console.log(`[Ubiflow] Total attendu: ${totalExpected} annonces`);
    }

    if (!Array.isArray(ads) || ads.length === 0) {
      hasMorePages = false;
    } else {
      allAds.push(...ads);
      console.log(`[Ubiflow] Page ${page}: ${ads.length} annonces (total récupéré: ${allAds.length}/${totalExpected || "?"})`);
      page++;

      // Sécurité: si on a récupéré tous les items attendus, on arrête
      if (totalExpected > 0 && allAds.length >= totalExpected) {
        hasMorePages = false;
      }
    }
  }

  // Vérification: ne pas cacher si on n'a pas tout récupéré
  if (totalExpected > 0 && allAds.length < totalExpected) {
    console.warn(`[Ubiflow] Attention: seulement ${allAds.length}/${totalExpected} annonces récupérées (pas de mise en cache)`);
    return allAds;
  }

  // Mettre en cache les résultats
  adsCache[cacheKey] = {
    data: allAds,
    expiry: Date.now() + CACHE_DURATIONS.LIST,
  };

  console.log(`[Ubiflow] Total récupéré: ${allAds.length} annonces (mis en cache)`);
  return allAds;
}

/**
 * Récupère une page d'annonces avec le total (pour pagination serveur)
 * Les résultats sont mis en cache par page
 */
export async function getAdsPage(
  page: number = 1,
  adType: "L" | "V"
): Promise<{ data: PropertyRaw[]; total: number }> {
  const cacheKey = `${adType}-page-${page}`;

  // Vérifier le cache
  if (pageCache[cacheKey] && Date.now() < pageCache[cacheKey].expiry) {
    cacheStats.hits++;
    console.log(`[Ubiflow] Cache HIT - Page ${page} (${adType})`);
    return { data: pageCache[cacheKey].data, total: pageCache[cacheKey].total };
  }
  cacheStats.misses++;

  const token = await getUbiflowToken();
  const prodId = process.env.UBIFLOW_PROD_ID;

  if (!prodId) {
    throw new Error("UBIFLOW_PROD_ID non configuré dans .env.local");
  }

  // Pour obtenir le total, on fait une requête avec Accept: application/ld+json
  const url = `https://api-classifieds.ubiflow.net/api/ads?advertiser.code=${prodId}&transaction.code=${adType}&page=${page}`;

  console.log(`[Ubiflow] Récupération page ${page} (type: ${adType})...`);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/ld+json",
      "X-AUTH-TOKEN": `Bearer ${token}`,
    },
    // Cache Next.js de 15 minutes
    next: { revalidate: 900 },
  });

  if (!response.ok) {
    if (response.status === 404) {
      return { data: [], total: 0 };
    }
    throw new Error(`Échec de la récupération des annonces: ${response.status}`);
  }

  const result = await response.json();

  // Format Hydra: { "hydra:member": [...], "hydra:totalItems": number }
  const data = result["hydra:member"] || result;
  const total = result["hydra:totalItems"] || data.length;

  console.log(`[Ubiflow] Cache MISS - Page ${page}: ${data.length} annonces (total: ${total})`);

  // Mettre en cache
  pageCache[cacheKey] = {
    data,
    total,
    expiry: Date.now() + CACHE_DURATIONS.LIST,
  };

  return { data, total };
}

/**
 * Récupère toutes les annonces pour le sitemap (avec cache long)
 * Utilise revalidate au lieu de no-store pour permettre la génération statique
 */
export async function getAdsForSitemap(): Promise<PropertyRaw[]> {
  const token = await getUbiflowToken();
  const prodId = process.env.UBIFLOW_PROD_ID;

  if (!prodId) {
    throw new Error("UBIFLOW_PROD_ID non configuré dans .env.local");
  }

  const allAds: PropertyRaw[] = [];
  let page = 1;
  let hasMorePages = true;

  while (hasMorePages) {
    const url = `https://api-classifieds.ubiflow.net/api/ads?advertiser.code=${prodId}&page=${page}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/ld+json",
        "X-AUTH-TOKEN": `Bearer ${token}`,
      },
      // Cache de 1 heure pour le sitemap
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      if (response.status === 404) {
        hasMorePages = false;
        continue;
      }
      throw new Error(`Échec récupération sitemap page ${page}: ${response.status}`);
    }

    const result = await response.json();
    const ads = result["hydra:member"] || result;

    if (!Array.isArray(ads) || ads.length === 0) {
      hasMorePages = false;
    } else {
      allAds.push(...ads);
      page++;
    }
  }

  return allAds;
}

/**
 * Récupère une annonce par son ID depuis l'API Ubiflow
 * Cache en mémoire de 30 minutes + cache Next.js
 */
export async function getAdById(id: string): Promise<unknown> {
  // Vérifier le cache en mémoire
  if (adDetailCache[id] && Date.now() < adDetailCache[id].expiry) {
    cacheStats.hits++;
    console.log(`[Ubiflow] Cache HIT - Annonce ${id}`);
    return adDetailCache[id].data;
  }
  cacheStats.misses++;

  const token = await getUbiflowToken();
  const url = `https://api-classifieds.ubiflow.net/api/ads/${id}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-AUTH-TOKEN": `Bearer ${token}`,
    },
    // Cache Next.js de 30 minutes
    next: { revalidate: 1800 },
  });

  if (!response.ok) {
    if (response.status === 404) return null;
    throw new Error(`Échec récupération annonce: ${response.status}`);
  }

  const data = await response.json();

  // Mettre en cache en mémoire
  adDetailCache[id] = {
    data,
    expiry: Date.now() + CACHE_DURATIONS.DETAIL,
  };

  console.log(`[Ubiflow] Cache MISS - Annonce ${id}`);
  return data;
}

/**
 * Invalide tout le cache (à appeler depuis l'admin)
 */
export function invalidateCache(): void {
  // Vider tous les caches
  Object.keys(adsCache).forEach((key) => delete adsCache[key]);
  Object.keys(pageCache).forEach((key) => delete pageCache[key]);
  Object.keys(adDetailCache).forEach((key) => delete adDetailCache[key]);

  // Reset des stats
  cacheStats.hits = 0;
  cacheStats.misses = 0;
  cacheStats.lastReset = Date.now();

  console.log("[Ubiflow] Cache invalidé");
}

/**
 * Retourne les statistiques du cache
 */
export function getCacheStats(): {
  hits: number;
  misses: number;
  hitRate: string;
  lastReset: string;
  entriesCount: { ads: number; pages: number; details: number };
} {
  const total = cacheStats.hits + cacheStats.misses;
  const hitRate = total > 0 ? ((cacheStats.hits / total) * 100).toFixed(1) + "%" : "N/A";

  return {
    hits: cacheStats.hits,
    misses: cacheStats.misses,
    hitRate,
    lastReset: new Date(cacheStats.lastReset).toISOString(),
    entriesCount: {
      ads: Object.keys(adsCache).length,
      pages: Object.keys(pageCache).length,
      details: Object.keys(adDetailCache).length,
    },
  };
}