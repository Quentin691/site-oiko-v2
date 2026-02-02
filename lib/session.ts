import { createHmac, pbkdf2Sync } from "crypto";

// Clé secrète pour signer les cookies (à définir dans .env.local)
const SESSION_SECRET = process.env.SESSION_SECRET || "fallback-secret-change-me";

/**
 * Signe une valeur avec HMAC-SHA256
 */
export function signValue(value: string): string {
  const signature = createHmac("sha256", SESSION_SECRET)
    .update(value)
    .digest("hex")
    .slice(0, 16); // On garde 16 caractères pour un cookie plus court
  return `${value}.${signature}`;
}

/**
 * Vérifie et extrait la valeur d'un cookie signé
 * Retourne null si la signature est invalide
 */
export function verifySignedValue(signedValue: string): string | null {
  const parts = signedValue.split(".");
  if (parts.length !== 2) return null;

  const [value, providedSignature] = parts;
  const expectedSignature = createHmac("sha256", SESSION_SECRET)
    .update(value)
    .digest("hex")
    .slice(0, 16);

  // Comparaison constante pour éviter les timing attacks
  if (providedSignature.length !== expectedSignature.length) return null;

  let match = true;
  for (let i = 0; i < providedSignature.length; i++) {
    if (providedSignature[i] !== expectedSignature[i]) match = false;
  }

  return match ? value : null;
}

/**
 * Vérifie si une session est valide
 */
export function isValidSession(cookieValue: string | undefined): boolean {
  if (!cookieValue) return false;
  const value = verifySignedValue(cookieValue);
  return value === "authenticated";
}

/**
 * Hash un mot de passe avec PBKDF2
 * Le salt est inclus dans le hash pour la vérification
 */
export function hashPassword(password: string, salt?: string): string {
  const usedSalt = salt || SESSION_SECRET.slice(0, 16);
  const hash = pbkdf2Sync(password, usedSalt, 10000, 32, "sha256").toString("hex");
  return `${usedSalt}:${hash}`;
}

/**
 * Vérifie un mot de passe contre un hash stocké
 */
export function verifyPassword(password: string, storedHash: string): boolean {
  const parts = storedHash.split(":");
  if (parts.length !== 2) return false;

  const [salt, hash] = parts;
  const computedHash = pbkdf2Sync(password, salt, 10000, 32, "sha256").toString("hex");

  // Comparaison constante pour éviter les timing attacks
  if (hash.length !== computedHash.length) return false;

  let match = true;
  for (let i = 0; i < hash.length; i++) {
    if (hash[i] !== computedHash[i]) match = false;
  }

  return match;
}
