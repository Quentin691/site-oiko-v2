import { mapApiToProperty, mapApiToProperties } from "@/lib/mapProperty";

// Données brutes simulant l'API Ubiflow
const mockRawProperty = {
  id: 12345,
  title: "Bel appartement lumineux",
  description: "Description complète du bien",
  reference: "REF-001",
  transaction: {
    code: "L",
    price: 1200,
    reference: "TR-001",
  },
  productType: {
    code: "APT",
    description: "Appartement",
  },
  data: [
    { code: "ville", value: "Paris" },
    { code: "code_postal", value: "75011" },
    { code: "adresse2", value: "10 rue de la Paix" },
    { code: "surface_habitable", value: 65 },
    { code: "nb_pieces_logement", value: 3 },
    { code: "nombre_de_chambres", value: 2 },
    { code: "nb_salles_de_bain", value: 1 },
    { code: "email_a_afficher", value: "contact@example.com" },
  ],
  mediaSupports: {
    pictures: [
      { url: "https://example.com/photo1.jpg" },
      { url: "https://example.com/photo2.jpg" },
    ],
  },
  createdAt: "2024-01-15T10:00:00Z",
  updatedAt: "2024-01-16T14:30:00Z",
};

describe("mapApiToProperty", () => {
  describe("Champs de base", () => {
    it("extrait l'ID correctement", () => {
      const property = mapApiToProperty(mockRawProperty);
      expect(property.id).toBe("12345");
    });

    it("extrait le titre", () => {
      const property = mapApiToProperty(mockRawProperty);
      expect(property.title).toBe("Bel appartement lumineux");
    });

    it("extrait la description", () => {
      const property = mapApiToProperty(mockRawProperty);
      expect(property.description).toBe("Description complète du bien");
    });

    it("extrait la transaction", () => {
      const property = mapApiToProperty(mockRawProperty);
      expect(property.transaction.code).toBe("L");
      expect(property.transaction.price).toBe(1200);
    });

    it("extrait le prix depuis la transaction", () => {
      const property = mapApiToProperty(mockRawProperty);
      expect(property.price).toBe(1200);
    });

    it("extrait les dates", () => {
      const property = mapApiToProperty(mockRawProperty);
      expect(property.createdAt).toBe("2024-01-15T10:00:00Z");
      expect(property.updatedAt).toBe("2024-01-16T14:30:00Z");
    });
  });

  describe("Extraction des données (data array)", () => {
    it("extrait la ville", () => {
      const property = mapApiToProperty(mockRawProperty);
      expect(property.city).toBe("Paris");
    });

    it("extrait le code postal", () => {
      const property = mapApiToProperty(mockRawProperty);
      expect(property.postalCode).toBe("75011");
    });

    it("extrait l'adresse", () => {
      const property = mapApiToProperty(mockRawProperty);
      expect(property.address).toBe("10 rue de la Paix");
    });

    it("extrait la surface", () => {
      const property = mapApiToProperty(mockRawProperty);
      expect(property.surface).toBe(65);
    });

    it("extrait le nombre de pièces", () => {
      const property = mapApiToProperty(mockRawProperty);
      expect(property.rooms).toBe(3);
    });

    it("extrait le nombre de chambres", () => {
      const property = mapApiToProperty(mockRawProperty);
      expect(property.bedrooms).toBe(2);
    });

    it("extrait le nombre de salles de bain", () => {
      const property = mapApiToProperty(mockRawProperty);
      expect(property.bathrooms).toBe(1);
    });

    it("extrait l'email de contact", () => {
      const property = mapApiToProperty(mockRawProperty);
      expect(property.contactEmail).toBe("contact@example.com");
    });
  });

  describe("Extraction des images", () => {
    it("extrait les URLs des images", () => {
      const property = mapApiToProperty(mockRawProperty);
      expect(property.images).toHaveLength(2);
      expect(property.images[0]).toBe("https://example.com/photo1.jpg");
    });

    it("gère un bien sans images", () => {
      const rawWithoutImages = { ...mockRawProperty, mediaSupports: {} };
      const property = mapApiToProperty(rawWithoutImages);
      expect(property.images).toEqual([]);
    });

    it("filtre les images avec URL null ou undefined", () => {
      const rawWithBadImages = {
        ...mockRawProperty,
        mediaSupports: {
          pictures: [
            { url: "https://example.com/photo1.jpg" },
            { url: null },
            { url: undefined },
            {},
          ],
        },
      };
      const property = mapApiToProperty(rawWithBadImages);
      expect(property.images).toHaveLength(1);
    });
  });

  describe("Cas limites et valeurs par défaut", () => {
    it("utilise la référence comme titre si pas de titre", () => {
      const rawWithoutTitle = { ...mockRawProperty, title: null };
      const property = mapApiToProperty(rawWithoutTitle);
      expect(property.title).toBe("REF-001");
    });

    it("utilise 'Sans titre' si ni titre ni référence", () => {
      const rawWithoutTitleOrRef = {
        ...mockRawProperty,
        title: null,
        reference: null,
      };
      const property = mapApiToProperty(rawWithoutTitleOrRef);
      expect(property.title).toBe("Sans titre");
    });

    it("gère un objet data vide", () => {
      const rawWithoutData = { ...mockRawProperty, data: [] };
      const property = mapApiToProperty(rawWithoutData);
      expect(property.city).toBe("");
      expect(property.surface).toBe(0);
      expect(property.rooms).toBe(0);
    });

    it("gère un objet data null/undefined", () => {
      const rawWithNullData = { ...mockRawProperty, data: null };
      const property = mapApiToProperty(rawWithNullData);
      expect(property.city).toBe("");
    });

    it("gère un prix manquant", () => {
      const rawWithoutPrice = {
        ...mockRawProperty,
        transaction: { code: "L", reference: "" },
      };
      const property = mapApiToProperty(rawWithoutPrice);
      expect(property.price).toBe(0);
    });

    it("convertit l'ID en string", () => {
      const rawWithNumericId = { ...mockRawProperty, id: 99999 };
      const property = mapApiToProperty(rawWithNumericId);
      expect(typeof property.id).toBe("string");
      expect(property.id).toBe("99999");
    });

    it("gère un ID manquant", () => {
      const rawWithoutId = { ...mockRawProperty, id: undefined };
      const property = mapApiToProperty(rawWithoutId);
      expect(property.id).toBe("");
    });
  });

  describe("Insensibilité à la casse des codes", () => {
    it("trouve les données indépendamment de la casse", () => {
      const rawWithUppercaseCodes = {
        ...mockRawProperty,
        data: [
          { code: "VILLE", value: "Lyon" },
          { code: "Surface_Habitable", value: 80 },
        ],
      };
      const property = mapApiToProperty(rawWithUppercaseCodes);
      expect(property.city).toBe("Lyon");
      expect(property.surface).toBe(80);
    });
  });
});

describe("mapApiToProperties", () => {
  it("transforme un tableau de biens bruts", () => {
    const rawList = [mockRawProperty, { ...mockRawProperty, id: 67890 }];
    const properties = mapApiToProperties(rawList);
    expect(properties).toHaveLength(2);
    expect(properties[0].id).toBe("12345");
    expect(properties[1].id).toBe("67890");
  });

  it("retourne un tableau vide si l'entrée est vide", () => {
    const properties = mapApiToProperties([]);
    expect(properties).toEqual([]);
  });

  it("retourne un tableau vide si l'entrée n'est pas un tableau", () => {
    const properties = mapApiToProperties(null as any);
    expect(properties).toEqual([]);
  });

  it("retourne un tableau vide si l'entrée est undefined", () => {
    const properties = mapApiToProperties(undefined as any);
    expect(properties).toEqual([]);
  });
});
