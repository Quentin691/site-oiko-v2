import type { Property, PropertyRaw, PropertyData } from "@/types/property";

/**
 * Extrait une valeur du tableau data par son code
 */
function getDataValue(
  data: PropertyData[],
  code: string
): boolean | number | string | undefined {
  if (!Array.isArray(data)) return undefined;
  const item = data.find((d) => d && d.code && d.code.toLowerCase() === code.toLowerCase());
  return item?.value;
}

/**
 * Transforme une annonce brute de l'API en Property utilisable
 */
export function mapApiToProperty(raw: any): Property {
  const data = raw.data || [];

  return {
    id: raw.id?.toString() || "",
    title: raw.title || raw.reference || "Sans titre",
    description: raw.description || "",
    transaction: raw.transaction || { code: "L", price: 0, reference: "" },
    productType: raw.productType || { code: "", description: "" },
    data: data,
    medias: raw.mediaSupports?.pictures || [],
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt,

    // Champs extraits avec les codes Ubiflow
    price: raw.transaction?.price || 0,
    city: String(getDataValue(data, "ville") || ""),
    postalCode: String(getDataValue(data, "code_postal") || ""),
    address: String(getDataValue(data, "adresse2") || ""),
    surface: Number(getDataValue(data, "surface_habitable") || 0),
    rooms: Number(getDataValue(data, "nb_pieces_logement") || 0),
    bedrooms: Number(getDataValue(data, "nombre_de_chambres")) || undefined,
    bathrooms: Number(getDataValue(data, "nb_salles_de_bain")) || undefined,
    images: (raw.mediaSupports?.pictures || []).map((p: any) => p?.url).filter(Boolean),
  };
}

/**
 * Transforme un tableau d'annonces brutes en Property[]
 */
export function mapApiToProperties(rawList: any[]): Property[] {
  if (!Array.isArray(rawList)) return [];
  return rawList.map(mapApiToProperty);
}
