import { filterProperties, extractCities, FilterParams } from "@/lib/filterProperties";
import type { Property } from "@/types/property";

// Données de test
const mockProperties: Property[] = [
  {
    id: "1",
    title: "Appartement Paris",
    description: "",
    transaction: { code: "L", price: 1500, reference: "" },
    productType: { code: "APT", description: "Appartement" },
    data: [],
    medias: [],
    price: 1500,
    city: "Paris",
    postalCode: "75001",
    address: "",
    surface: 50,
    rooms: 2,
    images: [],
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    title: "Maison Marseille",
    description: "",
    transaction: { code: "V", price: 350000, reference: "" },
    productType: { code: "MAI", description: "Maison" },
    data: [],
    medias: [],
    price: 350000,
    city: "Marseille",
    postalCode: "13001",
    address: "",
    surface: 120,
    rooms: 5,
    images: [],
    createdAt: "2024-01-10T10:00:00Z",
  },
  {
    id: "3",
    title: "Studio Paris",
    description: "",
    transaction: { code: "L", price: 800, reference: "" },
    productType: { code: "APT", description: "Appartement" },
    data: [],
    medias: [],
    price: 800,
    city: "Paris",
    postalCode: "75011",
    address: "",
    surface: 25,
    rooms: 1,
    images: [],
    createdAt: "2024-01-20T10:00:00Z",
  },
  {
    id: "4",
    title: "Grande maison Lyon",
    description: "",
    transaction: { code: "V", price: 500000, reference: "" },
    productType: { code: "MAI", description: "Maison" },
    data: [],
    medias: [],
    price: 500000,
    city: "Lyon",
    postalCode: "69001",
    address: "",
    surface: 200,
    rooms: 7,
    images: [],
    createdAt: "2024-01-05T10:00:00Z",
  },
];

describe("filterProperties", () => {
  describe("Filtrage par ville", () => {
    it("filtre les biens par ville", () => {
      const result = filterProperties(mockProperties, { city: "Paris" });
      expect(result).toHaveLength(2);
      expect(result.every((p) => p.city === "Paris")).toBe(true);
    });

    it("retourne tous les biens si aucune ville spécifiée", () => {
      const result = filterProperties(mockProperties, {});
      expect(result).toHaveLength(4);
    });
  });

  describe("Filtrage par prix", () => {
    it("filtre par prix minimum", () => {
      const result = filterProperties(mockProperties, { priceMin: "1000" });
      expect(result).toHaveLength(3);
      expect(result.every((p) => p.price >= 1000)).toBe(true);
    });

    it("filtre par prix maximum", () => {
      const result = filterProperties(mockProperties, { priceMax: "2000" });
      expect(result).toHaveLength(2);
      expect(result.every((p) => p.price <= 2000)).toBe(true);
    });

    it("filtre par plage de prix", () => {
      const result = filterProperties(mockProperties, {
        priceMin: "1000",
        priceMax: "400000",
      });
      expect(result).toHaveLength(2);
    });
  });

  describe("Filtrage par surface", () => {
    it("filtre par surface minimum", () => {
      const result = filterProperties(mockProperties, { surfaceMin: "100" });
      expect(result).toHaveLength(2);
      expect(result.every((p) => p.surface >= 100)).toBe(true);
    });

    it("filtre par surface maximum", () => {
      const result = filterProperties(mockProperties, { surfaceMax: "50" });
      expect(result).toHaveLength(2);
      expect(result.every((p) => p.surface <= 50)).toBe(true);
    });
  });

  describe("Filtrage par nombre de pièces", () => {
    it("filtre par nombre exact de pièces", () => {
      const result = filterProperties(mockProperties, { rooms: "2" });
      expect(result).toHaveLength(1);
      expect(result[0].rooms).toBe(2);
    });

    it("filtre 5 pièces et plus", () => {
      const result = filterProperties(mockProperties, { rooms: "5" });
      expect(result).toHaveLength(2);
      expect(result.every((p) => p.rooms >= 5)).toBe(true);
    });
  });

  describe("Tri", () => {
    it("trie par prix croissant", () => {
      const result = filterProperties(mockProperties, { sort: "price_asc" });
      expect(result[0].price).toBe(800);
      expect(result[result.length - 1].price).toBe(500000);
    });

    it("trie par prix décroissant", () => {
      const result = filterProperties(mockProperties, { sort: "price_desc" });
      expect(result[0].price).toBe(500000);
      expect(result[result.length - 1].price).toBe(800);
    });

    it("trie par surface croissante", () => {
      const result = filterProperties(mockProperties, { sort: "surface_asc" });
      expect(result[0].surface).toBe(25);
      expect(result[result.length - 1].surface).toBe(200);
    });

    it("trie par surface décroissante", () => {
      const result = filterProperties(mockProperties, { sort: "surface_desc" });
      expect(result[0].surface).toBe(200);
      expect(result[result.length - 1].surface).toBe(25);
    });

    it("trie par date décroissante (plus récent en premier)", () => {
      const result = filterProperties(mockProperties, { sort: "date_desc" });
      expect(result[0].id).toBe("3"); // 2024-01-20
      expect(result[result.length - 1].id).toBe("4"); // 2024-01-05
    });
  });

  describe("Combinaison de filtres", () => {
    it("combine ville et prix", () => {
      const result = filterProperties(mockProperties, {
        city: "Paris",
        priceMax: "1000",
      });
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe("Studio Paris");
    });

    it("combine plusieurs filtres avec tri", () => {
      const result = filterProperties(mockProperties, {
        surfaceMin: "50",
        sort: "price_asc",
      });
      expect(result).toHaveLength(3);
      expect(result[0].price).toBe(1500);
    });
  });

  describe("Cas limites", () => {
    it("retourne un tableau vide si la liste est vide", () => {
      const result = filterProperties([], { city: "Paris" });
      expect(result).toEqual([]);
    });

    it("retourne un tableau vide si aucun bien ne correspond", () => {
      const result = filterProperties(mockProperties, { priceMax: "100" });
      expect(result).toEqual([]);
    });

    it("gère les filtres vides (chaîne vide)", () => {
      const result = filterProperties(mockProperties, {
        city: "",
        priceMin: "",
        priceMax: "",
      });
      expect(result).toHaveLength(4);
    });
  });
});

describe("extractCities", () => {
  it("extrait les villes uniques", () => {
    const cities = extractCities(mockProperties);
    expect(cities).toHaveLength(3);
    expect(cities).toContain("Paris");
    expect(cities).toContain("Marseille");
    expect(cities).toContain("Lyon");
  });

  it("trie les villes par ordre alphabétique", () => {
    const cities = extractCities(mockProperties);
    expect(cities).toEqual(["Lyon", "Marseille", "Paris"]);
  });

  it("retourne un tableau vide si pas de propriétés", () => {
    const cities = extractCities([]);
    expect(cities).toEqual([]);
  });

  it("gère les doublons correctement", () => {
    const propertiesWithDuplicates = [
      ...mockProperties,
      { ...mockProperties[0], id: "5" }, // Autre bien à Paris
    ];
    const cities = extractCities(propertiesWithDuplicates);
    expect(cities).toHaveLength(3); // Toujours 3 villes uniques
  });
});
