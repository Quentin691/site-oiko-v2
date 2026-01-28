import type { PropertyRaw } from "@/types/property";

// Cache du token côté serveur
// Le token est stocké en mémoire sur le serveur, jamais exposé au client

let cachedToken: string | null = null;
let tokenExpiry: number | null = null;

// Cache des annonces par type (L = location, V = vente)
const adsCache: Record<string, { data: PropertyRaw[]; expiry: number }> = {};
const ADS_CACHE_DURATION = 5 * 60 * 1000; // 5 minutes en millisecondes

// Cache par page pour pagination serveur
const pageCache: Record<string, { data: PropertyRaw[]; total: number; expiry: number }> = {};

// Marge de sécurité : on renouvelle le token 5 minutes avant expiration
const EXPIRY_MARGIN = 5 * 60 * 1000; // 5 minutes en millisecondes

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

  let headersData: Record<string, string> = {
    "Content-Type": "application/json",
    "X-AUTH-TOKEN": `Bearer ${token}`,
  };

  if (getCount) {
    headersData = {
      ...headersData, 
      'Acccept':'application/ld+json'};
  }

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-AUTH-TOKEN": `Bearer ${token}`,
    },
    // Cache pendant 5 minutes
    next: { revalidate: 300 },
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
  console.log(`[Ubiflow] ${data.length} annonces récupérées`);
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
    console.log(`[Ubiflow] Annonces récupérées depuis le cache (type: ${cacheKey}, count: ${adsCache[cacheKey].data.length})`);
    return adsCache[cacheKey].data;
  }

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
      cache: "no-store", // Pas de cache Next.js pour avoir des données fraîches
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
    expiry: Date.now() + ADS_CACHE_DURATION,
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
  adType: "L" | "V",
  itemsPerPage: number = 24
): Promise<{ data: PropertyRaw[]; total: number }> {
  const cacheKey = `${adType}-page-${page}`;

  // Vérifier le cache
  if (pageCache[cacheKey] && Date.now() < pageCache[cacheKey].expiry) {
    console.log(`[Ubiflow] Page ${page} (${adType}) récupérée depuis le cache`);
    return { data: pageCache[cacheKey].data, total: pageCache[cacheKey].total };
  }

  const token = await getUbiflowToken();
  const prodId = process.env.UBIFLOW_PROD_ID;

  if (!prodId) {
    throw new Error("UBIFLOW_PROD_ID non configuré dans .env.local");
  }

  // L'API Ubiflow retourne 30 items par page par défaut
  // On doit calculer quelle page API correspond à notre page
  const API_ITEMS_PER_PAGE = 30;

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
    next: { revalidate: 300 },
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

  console.log(`[Ubiflow] Page ${page}: ${data.length} annonces (total: ${total})`);

  // Mettre en cache
  pageCache[cacheKey] = {
    data,
    total,
    expiry: Date.now() + ADS_CACHE_DURATION,
  };

  return { data, total };
}

/**
 * Récupère une annonce par son ID depuis l'API Ubiflow
 */
export async function getAdById(id: string): Promise<unknown> {
  const token = await getUbiflowToken();
  const url = `https://api-classifieds.ubiflow.net/api/ads/${id}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-AUTH-TOKEN": `Bearer ${token}`,
    },
    // Cache pendant 5 minutes
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    if (response.status === 404) return null;
    throw new Error(`Échec récupération annonce: ${response.status}`);
  }

  return response.json();
}