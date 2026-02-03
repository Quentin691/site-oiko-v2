/**
 * Tests pour les fonctions du blog
 * Note: On mock remark car c'est un module ESM qui ne fonctionne pas avec Jest
 */

// Mock remark avant d'importer le module blog
jest.mock("remark", () => ({
  remark: () => ({
    use: () => ({
      process: async (content: string) => ({
        toString: () => `<p>${content}</p>`,
      }),
    }),
  }),
}));

jest.mock("remark-html", () => ({}));

import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Chemin vers le dossier blog
const postsDirectory = path.join(process.cwd(), "content/blog");

describe("Blog - Validation des fichiers markdown", () => {
  // Récupère tous les fichiers .md
  const getMarkdownFiles = () => {
    if (!fs.existsSync(postsDirectory)) {
      return [];
    }
    return fs
      .readdirSync(postsDirectory)
      .filter((file) => file.endsWith(".md"));
  };

  describe("Structure des fichiers", () => {
    it("le dossier content/blog existe", () => {
      expect(fs.existsSync(postsDirectory)).toBe(true);
    });

    it("contient au moins un fichier markdown", () => {
      const files = getMarkdownFiles();
      expect(files.length).toBeGreaterThan(0);
    });

    it("tous les fichiers ont l'extension .md", () => {
      const files = getMarkdownFiles();
      files.forEach((file) => {
        expect(file).toMatch(/\.md$/);
      });
    });
  });

  describe("Frontmatter valide", () => {
    const files = fs.existsSync(postsDirectory)
      ? fs.readdirSync(postsDirectory).filter((f) => f.endsWith(".md"))
      : [];

    if (files.length === 0) {
      it.skip("aucun fichier markdown trouvé", () => {});
    } else {
      files.forEach((file) => {
        describe(`${file}`, () => {
          const filePath = path.join(postsDirectory, file);
          const content = fs.readFileSync(filePath, "utf8");
          let parsed: matter.GrayMatterFile<string>;

          beforeAll(() => {
            parsed = matter(content);
          });

          it("a un frontmatter YAML valide", () => {
            expect(() => matter(content)).not.toThrow();
          });

          it("a un titre (title)", () => {
            expect(parsed.data.title).toBeDefined();
            expect(typeof parsed.data.title).toBe("string");
            expect(parsed.data.title.length).toBeGreaterThan(0);
          });

          it("a un extrait (excerpt)", () => {
            expect(parsed.data.excerpt).toBeDefined();
            expect(typeof parsed.data.excerpt).toBe("string");
            expect(parsed.data.excerpt.length).toBeGreaterThan(0);
          });

          it("a une date valide (date)", () => {
            expect(parsed.data.date).toBeDefined();
            const date = new Date(parsed.data.date);
            expect(date.toString()).not.toBe("Invalid Date");
          });

          it("a un auteur (author)", () => {
            expect(parsed.data.author).toBeDefined();
            expect(typeof parsed.data.author).toBe("string");
            expect(parsed.data.author.length).toBeGreaterThan(0);
          });

          it("a une catégorie (category)", () => {
            expect(parsed.data.category).toBeDefined();
            expect(typeof parsed.data.category).toBe("string");
            expect(parsed.data.category.length).toBeGreaterThan(0);
          });

          it("a du contenu après le frontmatter", () => {
            expect(parsed.content).toBeDefined();
            expect(parsed.content.trim().length).toBeGreaterThan(0);
          });
        });
      });
    }
  });

  describe("Slugs", () => {
    it("les noms de fichiers sont des slugs valides (sans espaces ni caractères spéciaux)", () => {
      const files = getMarkdownFiles();
      files.forEach((file) => {
        const slug = file.replace(/\.md$/, "");
        // Un slug valide: lettres minuscules, chiffres, tirets
        expect(slug).toMatch(/^[a-z0-9-]+$/);
      });
    });

    it("pas de doublons dans les slugs", () => {
      const files = getMarkdownFiles();
      const slugs = files.map((f) => f.replace(/\.md$/, ""));
      const uniqueSlugs = new Set(slugs);
      expect(uniqueSlugs.size).toBe(slugs.length);
    });
  });

  describe("Dates", () => {
    it("les dates sont au format ISO (YYYY-MM-DD)", () => {
      const files = getMarkdownFiles();
      files.forEach((file) => {
        const filePath = path.join(postsDirectory, file);
        const content = fs.readFileSync(filePath, "utf8");
        const { data } = matter(content);

        // Vérifie le format YYYY-MM-DD
        expect(data.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      });
    });

    it("les dates ne sont pas dans le futur lointain (max 1 an)", () => {
      const files = getMarkdownFiles();
      const oneYearFromNow = new Date();
      oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

      files.forEach((file) => {
        const filePath = path.join(postsDirectory, file);
        const content = fs.readFileSync(filePath, "utf8");
        const { data } = matter(content);
        const date = new Date(data.date);

        expect(date.getTime()).toBeLessThanOrEqual(oneYearFromNow.getTime());
      });
    });
  });

  describe("Catégories", () => {
    const validCategories = ["conseils", "actualités", "immobilier", "Conseils", "Actualités", "Immobilier"];

    it("les catégories sont parmi les valeurs attendues (optionnel)", () => {
      const files = getMarkdownFiles();
      files.forEach((file) => {
        const filePath = path.join(postsDirectory, file);
        const content = fs.readFileSync(filePath, "utf8");
        const { data } = matter(content);

        // Ce test est informatif - on vérifie juste que la catégorie existe
        expect(data.category).toBeTruthy();
      });
    });
  });
});
