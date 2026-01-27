"use client";

import { useState, useEffect } from "react";

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  content?: string;
}

type Mode = "create" | "edit" | "list";

export default function AdminPage() {
  const [mode, setMode] = useState<Mode>("list");
  const [articles, setArticles] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [formData, setFormData] = useState({
    slug: "",
    title: "",
    excerpt: "",
    content: "",
    category: "actualites",
    date: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  // Charger les articles
  const loadArticles = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/blog/articles");
      const data = await response.json();
      setArticles(data.posts || []);
    } catch {
      console.error("Erreur chargement articles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  // Réinitialiser le formulaire
  const resetForm = () => {
    setFormData({
      slug: "",
      title: "",
      excerpt: "",
      content: "",
      category: "actualites",
      date: "",
    });
    setStatus("idle");
    setMessage("");
  };

  // Connexion admin
  const handleLogin = () => {
    if (!password.trim()) {
      setMessage("Veuillez entrer le mot de passe");
      setStatus("error");
      return;
    }
    setIsAuthenticated(true);
    setMessage("");
    setStatus("idle");
  };

  // Déconnexion admin
  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword("");
    setMode("list");
    resetForm();
  };

  // Créer un article
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(data.message);
        resetForm();
        setMode("list");
        // Recharger après un délai (le fichier met du temps à apparaître)
        setTimeout(loadArticles, 2000);
      } else {
        setStatus("error");
        setMessage(data.error || "Une erreur est survenue");
        if (response.status === 401) {
          setIsAuthenticated(false);
        }
      }
    } catch {
      setStatus("error");
      setMessage("Erreur de connexion au serveur");
    }
  };

  // Modifier un article
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/blog/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(data.message);
        setMode("list");
        setTimeout(loadArticles, 2000);
      } else {
        setStatus("error");
        setMessage(data.error || "Une erreur est survenue");
        if (response.status === 401) {
          setIsAuthenticated(false);
        }
      }
    } catch {
      setStatus("error");
      setMessage("Erreur de connexion au serveur");
    }
  };

  // Supprimer un article
  const handleDelete = async (slug: string) => {
    if (!password) {
      setMessage("Entrez le mot de passe admin d'abord");
      setStatus("error");
      return;
    }

    if (!confirm(`Voulez-vous vraiment supprimer l'article "${slug}" ?`)) {
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/blog/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(data.message);
        setTimeout(loadArticles, 2000);
      } else {
        setStatus("error");
        setMessage(data.error || "Une erreur est survenue");
        if (response.status === 401) {
          setIsAuthenticated(false);
        }
      }
    } catch {
      setStatus("error");
      setMessage("Erreur de connexion au serveur");
    }
  };

  // Charger un article pour modification
  const handleEdit = async (article: BlogPost) => {
    // Récupérer le contenu complet de l'article
    try {
      const response = await fetch(`/api/blog/articles?slug=${article.slug}`);
      const data = await response.json();

      setFormData({
        slug: article.slug,
        title: article.title,
        excerpt: article.excerpt,
        content: data.content || "",
        category: article.category,
        date: article.date,
      });
      setMode("edit");
      setStatus("idle");
      setMessage("");
    } catch {
      setMessage("Erreur lors du chargement de l'article");
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            Administration du Blog
          </h1>
          {mode !== "list" && (
            <button
              onClick={() => { setMode("list"); resetForm(); }}
              className="px-4 py-2 text-muted hover:text-foreground"
            >
              ← Retour à la liste
            </button>
          )}
        </div>

        {/* Formulaire de connexion OU bouton déconnexion */}
        {!isAuthenticated ? (
          <div className="mb-6 p-6 bg-surface rounded-lg border border-border">
            <h2 className="text-xl font-semibold text-foreground mb-4">Connexion</h2>
            <div className="flex gap-4 items-end">
              <div className="flex-1 max-w-xs">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Mot de passe admin
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                  placeholder="Entrez le mot de passe"
                />
              </div>
              <button
                onClick={handleLogin}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
              >
                Connexion
              </button>
            </div>
          </div>
        ) : (
          <div className="mb-6 flex justify-end">
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
            >
              Déconnexion
            </button>
          </div>
        )}

        {/* Message de statut */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              status === "success"
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
            }`}
          >
            {message}
          </div>
        )}

        {/* Interface admin (visible uniquement si connecté) */}
        {isAuthenticated && (
          <>
        {/* MODE: Liste des articles */}
        {mode === "list" && (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-foreground">
                Articles existants ({articles.length})
              </h2>
              <button
                onClick={() => { setMode("create"); resetForm(); }}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
              >
                + Nouvel article
              </button>
            </div>

            {loading ? (
              <p className="text-muted">Chargement...</p>
            ) : articles.length === 0 ? (
              <p className="text-muted">Aucun article pour le moment.</p>
            ) : (
              <div className="space-y-4">
                {articles.map((article) => (
                  <div
                    key={article.slug}
                    className="p-4 bg-surface rounded-lg border border-border flex justify-between items-start"
                  >
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground">{article.title}</h3>
                      <p className="text-sm text-muted mt-1">{article.excerpt}</p>
                      <div className="flex gap-4 mt-2 text-xs text-muted">
                        <span>📅 {article.date}</span>
                        <span>📁 {article.category}</span>
                        <span>🔗 {article.slug}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleEdit(article)}
                        className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200"
                      >
                        Modifier
                      </button>
                      <button
                        onClick={() => handleDelete(article.slug)}
                        className="px-3 py-1 text-sm bg-red-100 text-red-800 rounded hover:bg-red-200 dark:bg-red-900 dark:text-red-200"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* MODE: Créer / Modifier un article */}
        {(mode === "create" || mode === "edit") && (
          <form onSubmit={mode === "create" ? handleCreate : handleUpdate} className="space-y-6">
            <h2 className="text-xl font-semibold text-foreground">
              {mode === "create" ? "Nouvel article" : `Modifier: ${formData.title}`}
            </h2>

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
                placeholder="Écrivez votre article ici..."
                required
              />
            </div>

            {/* Bouton submit */}
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors disabled:opacity-50"
            >
              {status === "loading"
                ? "En cours..."
                : mode === "create"
                ? "Publier l'article"
                : "Enregistrer les modifications"}
            </button>
          </form>
        )}
          </>
        )}
      </div>
    </main>
  );
}