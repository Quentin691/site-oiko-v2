import { render, screen, fireEvent } from "@testing-library/react";
import Button from "@/components/ui/Button";

describe("Button", () => {
  describe("Rendu de base", () => {
    it("affiche le texte du bouton", () => {
      render(<Button>Cliquer</Button>);
      expect(screen.getByText("Cliquer")).toBeInTheDocument();
    });

    it("rend un élément button quand href n'est pas fourni", () => {
      render(<Button>Test</Button>);
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("rend un lien quand href est fourni", () => {
      render(<Button href="/test">Lien</Button>);
      expect(screen.getByRole("link")).toBeInTheDocument();
      expect(screen.getByRole("link")).toHaveAttribute("href", "/test");
    });
  });

  describe("Variants", () => {
    it("applique le style primary par défaut", () => {
      render(<Button>Primary</Button>);
      expect(screen.getByRole("button")).toHaveClass("bg-primary");
    });

    it("applique le style secondary", () => {
      render(<Button variant="secondary">Secondary</Button>);
      expect(screen.getByRole("button")).toHaveClass("bg-card");
    });

    it("applique le style outline", () => {
      render(<Button variant="outline">Outline</Button>);
      expect(screen.getByRole("button")).toHaveClass("bg-transparent", "border-foreground");
    });

    it("applique le style ghost", () => {
      render(<Button variant="ghost">Ghost</Button>);
      expect(screen.getByRole("button")).toHaveClass("bg-transparent", "text-muted");
    });

    it("applique le style danger", () => {
      render(<Button variant="danger">Danger</Button>);
      expect(screen.getByRole("button")).toHaveClass("bg-red-100");
    });

    it("applique le style info", () => {
      render(<Button variant="info">Info</Button>);
      expect(screen.getByRole("button")).toHaveClass("bg-blue-100");
    });
  });

  describe("Sizes", () => {
    it("applique la taille md par défaut", () => {
      render(<Button>Medium</Button>);
      expect(screen.getByRole("button")).toHaveClass("px-6", "py-3");
    });

    it("applique la taille sm", () => {
      render(<Button size="sm">Small</Button>);
      expect(screen.getByRole("button")).toHaveClass("px-3", "py-1", "text-sm");
    });

    it("applique la taille lg", () => {
      render(<Button size="lg">Large</Button>);
      expect(screen.getByRole("button")).toHaveClass("px-8", "py-4", "text-lg");
    });

    it("applique la taille icon", () => {
      render(<Button size="icon">Icon</Button>);
      expect(screen.getByRole("button")).toHaveClass("p-2");
    });
  });

  describe("État disabled", () => {
    it("ajoute les styles disabled quand disabled=true", () => {
      render(<Button disabled>Disabled</Button>);
      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
      expect(button).toHaveClass("opacity-50", "cursor-not-allowed");
    });

    it("n'ajoute pas les styles disabled quand disabled=false", () => {
      render(<Button>Enabled</Button>);
      const button = screen.getByRole("button");
      expect(button).not.toBeDisabled();
      expect(button).not.toHaveClass("opacity-50");
    });
  });

  describe("Interactions", () => {
    it("appelle onClick quand cliqué", () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Click me</Button>);
      fireEvent.click(screen.getByRole("button"));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("n'appelle pas onClick quand disabled", () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick} disabled>Click me</Button>);
      fireEvent.click(screen.getByRole("button"));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe("Attributs", () => {
    it("applique le type par défaut", () => {
      render(<Button>Button</Button>);
      expect(screen.getByRole("button")).toHaveAttribute("type", "button");
    });

    it("applique le type submit", () => {
      render(<Button type="submit">Submit</Button>);
      expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
    });

    it("applique le title", () => {
      render(<Button title="Mon titre">Avec titre</Button>);
      expect(screen.getByRole("button")).toHaveAttribute("title", "Mon titre");
    });

    it("merge les className personnalisées", () => {
      render(<Button className="ma-classe">Custom</Button>);
      expect(screen.getByRole("button")).toHaveClass("ma-classe");
    });

    it("applique target et rel sur les liens", () => {
      render(
        <Button href="/external" target="_blank" rel="noopener noreferrer">
          External
        </Button>
      );
      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });
  });
});
