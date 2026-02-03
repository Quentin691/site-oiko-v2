import { render, screen } from "@testing-library/react";
import Card from "@/components/ui/Card";

describe("Card", () => {
  describe("Rendu de base", () => {
    it("affiche le contenu enfant", () => {
      render(<Card>Contenu de la carte</Card>);
      expect(screen.getByText("Contenu de la carte")).toBeInTheDocument();
    });

    it("applique les styles de base", () => {
      render(<Card>Test</Card>);
      // Le texte est directement dans la Card div
      const card = screen.getByText("Test");
      expect(card).toHaveClass("bg-card", "rounded-lg", "border", "p-6", "shadow-sm");
    });
  });

  describe("Effet hover", () => {
    it("n'applique pas les styles hover par défaut", () => {
      render(<Card>Sans hover</Card>);
      const card = screen.getByText("Sans hover");
      expect(card).not.toHaveClass("hover:shadow-lg");
      expect(card).not.toHaveClass("hover:scale-105");
      expect(card).not.toHaveClass("cursor-pointer");
    });

    it("applique les styles hover quand hover=true", () => {
      render(<Card hover>Avec hover</Card>);
      const card = screen.getByText("Avec hover");
      expect(card).toHaveClass("hover:shadow-lg", "hover:scale-105", "cursor-pointer", "group");
    });
  });

  describe("Custom className", () => {
    it("merge les className personnalisées", () => {
      render(<Card className="ma-classe-custom">Test</Card>);
      const card = screen.getByText("Test");
      expect(card).toHaveClass("ma-classe-custom");
    });

    it("conserve les styles de base avec une className personnalisée", () => {
      render(<Card className="extra">Test</Card>);
      const card = screen.getByText("Test");
      expect(card).toHaveClass("bg-card", "extra");
    });
  });

  describe("Contenu complexe", () => {
    it("rend des enfants complexes correctement", () => {
      render(
        <Card>
          <h2>Titre</h2>
          <p>Description</p>
          <button>Action</button>
        </Card>
      );
      expect(screen.getByText("Titre")).toBeInTheDocument();
      expect(screen.getByText("Description")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Action" })).toBeInTheDocument();
    });
  });
});
