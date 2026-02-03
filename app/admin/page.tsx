"use client";

import { useState, useEffect } from "react";
import Button from "@/components/ui/Button";

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  content?: string;
  image?: string;
  author?: string;
}

interface Author {
  id: string;
  name: string;
  role: string;
}

const AUTHORS: Author[] = [
  { id: "oiko", name: "OIKO Gestion", role: "Equipe OIKO" },
  { id: "quentin", name: "Quentin", role: "Gerant" },
];

type Mode = "create" | "edit" | "list";

export default function AdminPage() {
  const [mode, setMode] = useState<Mode>("list");
  const [articles, setArticles] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    slug: "",
    title: "",
    excerpt: "",
    content: "",
    category: "actualites",
    date: "",
    image: "",
    author: "oiko",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  // Déconnexion
  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      window.location.href = "/admin/login";
    } catch {
      console.error("Erreur lors de la déconnexion");
    }
  };

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
      image: "",
      author: "oiko",
    });
    setStatus("idle");
    setMessage("");
  };

  // Créer un article
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      setStatus("error");
      setMessage("Le titre est obligatoire");
      return;
    }
    if (!formData.excerpt.trim()) {
      setStatus("error");
      setMessage("L'extrait est obligatoire");
      return;
    }
    if (!formData.content.trim()) {
      setStatus("error");
      setMessage("Le contenu de l'article est obligatoire");
      return;
    }

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
        setFormData({
          slug: "",
          title: "",
          excerpt: "",
          content: "",
          category: "actualites",
          date: "",
          image: "",
          author: "oiko",
        });
        setMode("list");
        setStatus("success");
        setMessage(data.message || "Article cree avec succes !");
        setTimeout(loadArticles, 2000);
      } else {
        setStatus("error");
        setMessage(data.error || "Une erreur est survenue");
      }
    } catch {
      setStatus("error");
      setMessage("Erreur de connexion au serveur");
    }
  };

  // Modifier un article
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      setStatus("error");
      setMessage("Le titre est obligatoire");
      return;
    }
    if (!formData.excerpt.trim()) {
      setStatus("error");
      setMessage("L'extrait est obligatoire");
      return;
    }
    if (!formData.content.trim()) {
      setStatus("error");
      setMessage("Le contenu de l'article est obligatoire");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/blog/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(data.message || "Article modifie avec succes !");
        setMode("list");
        setTimeout(loadArticles, 2000);
      } else {
        setStatus("error");
        setMessage(data.error || "Une erreur est survenue");
      }
    } catch {
      setStatus("error");
      setMessage("Erreur de connexion au serveur");
    }
  };

  // Supprimer un article
  const handleDelete = async (slug: string) => {
    if (!confirm(`Voulez-vous vraiment supprimer l'article "${slug}" ?`)) {
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/blog/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(data.message || "Article supprime avec succes !");
        setTimeout(loadArticles, 2000);
      } else {
        setStatus("error");
        setMessage(data.error || "Une erreur est survenue");
      }
    } catch {
      setStatus("error");
      setMessage("Erreur de connexion au serveur");
    }
  };

  // Charger un article pour modification
  const handleEdit = async (article: BlogPost) => {
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
        image: data.image || "",
        author: data.author || "oiko",
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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Administration du Blog
          </h1>
          <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
            {mode !== "list" && (
              <button
                onClick={() => { setMode("list"); resetForm(); }}
                className="px-3 py-1 sm:px-4 sm:py-2 text-sm text-muted hover:text-foreground"
              >
                ← Retour
              </button>
            )}
            <button
              onClick={handleLogout}
              className="px-3 py-1 sm:px-4 sm:py-2 text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
            >
              Déconnexion
            </button>
          </div>
        </div>

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

        {/* MODE: Liste des articles */}
        {mode === "list" && (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-foreground">
                Articles existants ({articles.length})
              </h2>
              <Button
                onClick={() => { setMode("create"); resetForm(); }}
                variant="primary"
                className="px-4! py-2!"
              >
                + Nouvel article
              </Button>
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
                    className="p-4 bg-surface rounded-lg border border-border"
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-foreground truncate">{article.title}</h3>
                        <p className="text-sm text-muted mt-1 line-clamp-2">{article.excerpt}</p>
                        <div className="flex flex-wrap gap-2 sm:gap-4 mt-2 text-xs text-muted">
                          <span>{article.date}</span>
                          <span>{article.category}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 shrink-0">
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
                Titre de l&apos;article
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
                Extrait (resume court)
              </label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-lg bg-surface text-foreground"
                rows={2}
                placeholder="Resume de l'article en 1-2 phrases"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Catégorie */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Categorie
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-surface text-foreground"
                >
                  <option value="actualites">Actualites</option>
                  <option value="conseils">Conseils</option>
                  <option value="immobilier">Immobilier</option>
                </select>
              </div>

              {/* Auteur */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Auteur
                </label>
                <select
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-surface text-foreground"
                >
                  {AUTHORS.map((author) => (
                    <option key={author.id} value={author.id}>
                      {author.name} ({author.role})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Image a la une (URL)
              </label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-lg bg-surface text-foreground"
                placeholder="https://images.unsplash.com/photo-..."
              />
              <p className="text-xs text-muted mt-1">
                Laissez vide pour utiliser l&apos;image par defaut. Utilisez Unsplash pour des images gratuites.
              </p>
            </div>

            {/* Contenu */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Contenu (Markdown supporte)
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-lg bg-surface text-foreground font-mono text-sm"
                rows={15}
                placeholder="Ecrivez votre article ici..."
                required
              />
            </div>

            {/* Bouton submit */}
            <Button
              type="submit"
              disabled={status === "loading"}
              variant="primary"
              className="w-full"
            >
              {status === "loading"
                ? "En cours..."
                : mode === "create"
                ? "Publier l'article"
                : "Enregistrer les modifications"}
            </Button>
          </form>
        )}
      </div>
    </main>
  );
}
