import type { PropertyRaw } from "@/types/property";

// Cache du token côté serveur
// Le token est stocké en mémoire sur le serveur, jamais exposé au client

let cachedToken: string | null = null;
let tokenExpiry: number | null = null;

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
  adType?: "L" | "V"
): Promise<PropertyRaw[]> {
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
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("[Ubiflow] Erreur:", errorText);
    throw new Error(`Échec de la récupération des annonces: ${response.status}`);
  }

  const data = await response.json();
  console.log(`[Ubiflow] ${data.length} annonces récupérées`);
  return data;
}
