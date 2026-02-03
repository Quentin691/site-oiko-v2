import { render, screen } from "@testing-library/react";
import Alert from "@/components/ui/Alert";

describe("Alert", () => {
  describe("Rendu de base", () => {
    it("affiche le contenu", () => {
      render(<Alert variant="info">Message d&apos;information</Alert>);
      expect(screen.getByText("Message d'information")).toBeInTheDocument();
    });

    it("applique les styles de base", () => {
      render(<Alert variant="info">Test</Alert>);
      const alert = screen.getByRole("status");
      expect(alert).toHaveClass("px-4", "py-3", "rounded", "border");
    });
  });

  describe("Variants", () => {
    it("applique le style success", () => {
      render(<Alert variant="success">Succès</Alert>);
      const alert = screen.getByRole("status");
      expect(alert).toHaveClass("bg-green-100", "border-green-400", "text-green-700");
    });

    it("applique le style error", () => {
      render(<Alert variant="error">Erreur</Alert>);
      const alert = screen.getByRole("alert");
      expect(alert).toHaveClass("bg-red-100", "border-red-400", "text-red-700");
    });

    it("applique le style warning", () => {
      render(<Alert variant="warning">Attention</Alert>);
      const alert = screen.getByRole("status");
      expect(alert).toHaveClass("bg-yellow-100", "border-yellow-400", "text-yellow-700");
    });

    it("applique le style info", () => {
      render(<Alert variant="info">Information</Alert>);
      const alert = screen.getByRole("status");
      expect(alert).toHaveClass("bg-blue-100", "border-blue-400", "text-blue-700");
    });
  });

  describe("Accessibilité", () => {
    it("utilise role='alert' et aria-live='assertive' pour les erreurs", () => {
      render(<Alert variant="error">Erreur critique</Alert>);
      const alert = screen.getByRole("alert");
      expect(alert).toHaveAttribute("aria-live", "assertive");
    });

    it("utilise role='status' et aria-live='polite' pour success", () => {
      render(<Alert variant="success">Succès</Alert>);
      const alert = screen.getByRole("status");
      expect(alert).toHaveAttribute("aria-live", "polite");
    });

    it("utilise role='status' et aria-live='polite' pour warning", () => {
      render(<Alert variant="warning">Attention</Alert>);
      const alert = screen.getByRole("status");
      expect(alert).toHaveAttribute("aria-live", "polite");
    });

    it("utilise role='status' et aria-live='polite' pour info", () => {
      render(<Alert variant="info">Info</Alert>);
      const alert = screen.getByRole("status");
      expect(alert).toHaveAttribute("aria-live", "polite");
    });
  });

  describe("Custom className", () => {
    it("merge les className personnalisées", () => {
      render(<Alert variant="info" className="ma-classe">Test</Alert>);
      const alert = screen.getByRole("status");
      expect(alert).toHaveClass("ma-classe");
    });
  });
});
