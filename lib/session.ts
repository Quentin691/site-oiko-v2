import { createHmac } from "crypto";

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
