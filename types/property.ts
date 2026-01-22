/**
 * Caractéristique d'un bien (équipement, quantité, etc.)
 */
export interface PropertyData {
  code: string;
  description: string;
  familyDescription?: string;
  value: boolean | number | string;
  unit?: string | null;
  public?: boolean;
}

/**
 * Transaction (location ou vente)
 */
export interface PropertyTransaction {
  code: "L" | "V"; // L = Location, V = Vente
  price: number; // Loyer mensuel ou prix de vente
  reference: string; // Référence de l'annonce
}

/**
 * Type de bien
 */
export interface PropertyType {
  code: string;
  description: string; // "Appartement", "Maison", etc.
}

/**
 * Media (photo)
 */
export interface PropertyMedia {
  url: string;
  title?: string;
}

/**
 * Annonce immobilière (données brutes de l'API)
 */
export interface PropertyRaw {
  id: string;
  title: string;
  description: string;
  transaction: PropertyTransaction;
  productType: PropertyType;
  data: PropertyData[];
  medias: PropertyMedia[];
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Annonce immobilière (avec champs extraits pour faciliter l'utilisation)
 */
export interface Property extends PropertyRaw {
  // Champs extraits/calculés
  price: number;
  city: string;
  postalCode: string;
  address: string;
  surface: number;
  rooms: number;
  bedrooms?: number;
  bathrooms?: number;
  images: string[];
}

/**
 * Réponse de l'API Ubiflow (format Hydra)
 */
export interface UbiflowApiResponse {
  "hydra:member": PropertyRaw[];
  "hydra:totalItems": number;
}
