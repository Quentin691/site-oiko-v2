import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import BlogCard from "@/components/blog/BlogCard";
import { getAllPosts, getAllCategories } from "@/lib/blog";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog | OIKO Gestion",
  description: "Conseils immobiliers, actualités du marché et guides pratiques.",
  openGraph: {
    title: "Blog | OIKO Gestion",
    description: "Conseils immobiliers, actualités du marché et guides pratiques.",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();

  const categoryLabels: Record<string, string> = {
    conseils: "Conseils",
    actualites: "Actualités",
    immobilier: "Immobilier",
  };

  return (
    <main>
      <Section className="bg-background">
        {/* En-tête */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Blog
          </h1>
          <p className="text-lg text-muted">
            Conseils immobiliers et actualités du marché
          </p>
        </div>
        {/* Filtres par catégorie */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Link href="/blog" className="px-4 py-2 bg-primary text-white rounded-full text-sm">
            Tous
          </Link>
          {categories.map((category) => (
            <Link
              key={category}
              href={`/blog/categorie/${category}`}
              className="px-4 py-2 bg-surface text-muted rounded-full text-sm hover:bg-primary hover:text-white transition-colors"
            >
              {categoryLabels[category] || category}
            </Link>
          ))}
        </div>

        {/* Grille d'articles */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted text-lg">Aucun article pour le moment.</p>
          </div>
        )}
      </Section>
    </main>
  );
}