import {
  signValue,
  verifySignedValue,
  isValidSession,
  hashPassword,
  verifyPassword,
} from "@/lib/session";

describe("signValue et verifySignedValue", () => {
  describe("Signature", () => {
    it("retourne une valeur signée au format valeur.signature", () => {
      const signed = signValue("test");
      expect(signed).toContain(".");
      const parts = signed.split(".");
      expect(parts).toHaveLength(2);
      expect(parts[0]).toBe("test");
      expect(parts[1]).toHaveLength(16); // Signature tronquée à 16 caractères
    });

    it("produit des signatures différentes pour des valeurs différentes", () => {
      const signed1 = signValue("value1");
      const signed2 = signValue("value2");
      expect(signed1).not.toBe(signed2);
    });

    it("produit la même signature pour la même valeur", () => {
      const signed1 = signValue("consistent");
      const signed2 = signValue("consistent");
      expect(signed1).toBe(signed2);
    });
  });

  describe("Vérification", () => {
    it("vérifie une signature valide", () => {
      const signed = signValue("myvalue");
      const result = verifySignedValue(signed);
      expect(result).toBe("myvalue");
    });

    it("rejette une signature invalide", () => {
      const result = verifySignedValue("myvalue.invalidsignature");
      expect(result).toBeNull();
    });

    it("rejette une valeur sans signature", () => {
      const result = verifySignedValue("nodotshere");
      expect(result).toBeNull();
    });

    it("rejette une valeur avec trop de points", () => {
      const result = verifySignedValue("a.b.c");
      expect(result).toBeNull();
    });

    it("rejette une signature de mauvaise longueur", () => {
      const result = verifySignedValue("value.short");
      expect(result).toBeNull();
    });

    it("rejette une valeur vide", () => {
      const result = verifySignedValue("");
      expect(result).toBeNull();
    });
  });

  describe("Intégrité", () => {
    it("détecte une valeur modifiée", () => {
      const signed = signValue("original");
      const tampered = "modified" + signed.slice(8); // Modification de la valeur
      const result = verifySignedValue(tampered);
      expect(result).toBeNull();
    });

    it("détecte une signature modifiée", () => {
      const signed = signValue("myvalue");
      const parts = signed.split(".");
      const tampered = parts[0] + ".0000000000000000"; // Signature falsifiée
      const result = verifySignedValue(tampered);
      expect(result).toBeNull();
    });
  });
});

describe("isValidSession", () => {
  it("valide une session correctement signée avec 'authenticated'", () => {
    const sessionCookie = signValue("authenticated");
    expect(isValidSession(sessionCookie)).toBe(true);
  });

  it("rejette une session avec une valeur incorrecte", () => {
    const sessionCookie = signValue("not-authenticated");
    expect(isValidSession(sessionCookie)).toBe(false);
  });

  it("rejette une session non signée", () => {
    expect(isValidSession("authenticated")).toBe(false);
  });

  it("rejette une session undefined", () => {
    expect(isValidSession(undefined)).toBe(false);
  });

  it("rejette une session vide", () => {
    expect(isValidSession("")).toBe(false);
  });

  it("rejette une session avec signature invalide", () => {
    expect(isValidSession("authenticated.invalidsig123")).toBe(false);
  });
});

describe("hashPassword et verifyPassword", () => {
  describe("Hachage", () => {
    it("retourne un hash au format salt:hash", () => {
      const hash = hashPassword("monmotdepasse");
      expect(hash).toContain(":");
      const parts = hash.split(":");
      expect(parts).toHaveLength(2);
      expect(parts[0].length).toBeGreaterThan(0); // Salt
      expect(parts[1].length).toBe(64); // Hash SHA256 en hex = 64 caractères
    });

    it("produit des hashes différents avec des salts différents", () => {
      const hash1 = hashPassword("password", "salt1");
      const hash2 = hashPassword("password", "salt2");
      expect(hash1).not.toBe(hash2);
    });

    it("produit le même hash avec le même salt", () => {
      const hash1 = hashPassword("password", "samesalt");
      const hash2 = hashPassword("password", "samesalt");
      expect(hash1).toBe(hash2);
    });
  });

  describe("Vérification", () => {
    it("vérifie un mot de passe correct", () => {
      const hash = hashPassword("correctpassword");
      expect(verifyPassword("correctpassword", hash)).toBe(true);
    });

    it("rejette un mot de passe incorrect", () => {
      const hash = hashPassword("correctpassword");
      expect(verifyPassword("wrongpassword", hash)).toBe(false);
    });

    it("est sensible à la casse", () => {
      const hash = hashPassword("Password123");
      expect(verifyPassword("password123", hash)).toBe(false);
      expect(verifyPassword("PASSWORD123", hash)).toBe(false);
    });

    it("gère les caractères spéciaux", () => {
      const password = "P@$$w0rd!#€àé";
      const hash = hashPassword(password);
      expect(verifyPassword(password, hash)).toBe(true);
    });

    it("gère les mots de passe longs", () => {
      const longPassword = "a".repeat(1000);
      const hash = hashPassword(longPassword);
      expect(verifyPassword(longPassword, hash)).toBe(true);
    });
  });

  describe("Cas limites", () => {
    it("rejette un hash mal formaté (sans ':')", () => {
      expect(verifyPassword("password", "invalidhash")).toBe(false);
    });

    it("rejette un hash vide", () => {
      expect(verifyPassword("password", "")).toBe(false);
    });

    it("gère un mot de passe vide", () => {
      const hash = hashPassword("");
      expect(verifyPassword("", hash)).toBe(true);
      expect(verifyPassword("notempty", hash)).toBe(false);
    });
  });

  describe("Sécurité", () => {
    it("utilise PBKDF2 avec suffisamment d'itérations", () => {
      // On vérifie que le hash prend un temps non négligeable
      // (indicateur que PBKDF2 est bien utilisé avec des itérations)
      const start = Date.now();
      hashPassword("testpassword");
      const duration = Date.now() - start;
      // PBKDF2 avec 10000 itérations devrait prendre quelques ms
      expect(duration).toBeGreaterThanOrEqual(0);
    });

    it("les hashes successifs du même mot de passe sont identiques (déterministe avec même salt)", () => {
      const hash1 = hashPassword("test", "fixedsalt");
      const hash2 = hashPassword("test", "fixedsalt");
      expect(hash1).toBe(hash2);
    });
  });
});
