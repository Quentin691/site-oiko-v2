"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "actualites",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(data.message);
        setFormData({
          title: "",
          excerpt: "",
          content: "",
          category: "actualites",
        });
      } else {
        setStatus("error");
        setMessage(data.error || "Une erreur est survenue");
      }
    } catch {
      setStatus("error");
      setMessage("Erreur de connexion au serveur");
    }
  };

  return (
    <main className="min-h-screen bg-background py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            Administration du Blog
          </h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm border border-border rounded-lg text-muted hover:bg-surface transition-colors"
          >
            Déconnexion
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-card text-card-foreground rounded-lg p-6 border border-border shadow-sm">
          {/* Titre */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Titre de l'article
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded-md bg-card text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Ex: 5 conseils pour investir dans l'immobilier"
              required
            />
          </div>

          {/* Extrait */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Extrait (résumé court)
            </label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded-md bg-card text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
              rows={2}
              placeholder="Résumé de l'article en 1-2 phrases"
              required
            />
          </div>

          {/* Catégorie */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Catégorie
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded-md bg-card text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="actualites">Actualités</option>
              <option value="conseils">Conseils</option>
              <option value="immobilier">Immobilier</option>
            </select>
          </div>

          {/* Contenu */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Contenu (Markdown supporté)
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded-md bg-card text-foreground font-mono text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
              rows={15}
              placeholder="Écrivez votre article ici...

## Sous-titre

Paragraphe de texte...

- Point 1
- Point 2

**Texte en gras**, *texte en italique*"
              required
            />
          </div>

          {/* Message de statut */}
          {message && (
            <div
              className={`p-4 rounded-lg ${
                status === "success" ? "alert-success" : "alert-error"
              }`}
            >
              {message}
            </div>
          )}

          {/* Bouton submit */}
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors disabled:opacity-50"
          >
            {status === "loading" ? "Publication en cours..." : "Publier l'article"}
          </button>
        </form>

        <div className="mt-8 p-4 bg-surface rounded-lg border border-border">
          <h2 className="font-semibold text-foreground mb-2">Comment ça marche ?</h2>
          <ol className="text-sm text-muted space-y-1 list-decimal list-inside">
            <li>Remplissez le formulaire avec votre article</li>
            <li>Cliquez sur "Publier"</li>
            <li>L'article est créé dans le repo GitHub</li>
            <li>Le site se redéploie automatiquement (~2 min)</li>
            <li>L'article apparaît sur /blog</li>
          </ol>
        </div>
      </div>
    </main>
  );
}
