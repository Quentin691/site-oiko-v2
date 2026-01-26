"use client";

import { useState } from "react";

export default function AdminPage() {
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "actualites",
    password: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

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
        // Réinitialiser le formulaire
        setFormData({
          title: "",
          excerpt: "",
          content: "",
          category: "actualites",
          password: formData.password, // Garder le mot de passe
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
        <h1 className="text-3xl font-bold text-foreground mb-8">
          Administration du Blog
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Mot de passe */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Mot de passe admin
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded-lg bg-surface text-foreground"
              required
            />
          </div>

          {/* Titre */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Titre de l'article
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded-lg bg-surface text-foreground"
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
              className="w-full px-4 py-2 border border-border rounded-lg bg-surface text-foreground"
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
              className="w-full px-4 py-2 border border-border rounded-lg bg-surface text-foreground"
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
              className="w-full px-4 py-2 border border-border rounded-lg bg-surface text-foreground font-mono text-sm"
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
                status === "success"
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
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