import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import BlogCard from "@/components/blog/BlogCard";
import { getPostsByCategory, getAllCategories } from "@/lib/blog";
import Link from "next/link";

interface PageProps {
  params: Promise<{ category: string }>;
}

const categoryLabels: Record<string, string> = {
  conseils: "Conseils",
  actualites: "Actualités",
  immobilier: "Immobilier",
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const label = categoryLabels[category] || category;
  return {
    title: `${label} | Blog OIKO`,
    description: `Articles dans la catégorie ${label}.`,
  };
}

export async function generateStaticParams() {
  return getAllCategories().map((category) => ({ category }));
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const posts = getPostsByCategory(category);
  const allCategories = getAllCategories();

  if (!allCategories.includes(category)) {
    notFound();
  }

  const label = categoryLabels[category] || category;

  return (
    <main>
      <Section
        title={`Catégorie : ${label}`}
        subtitle={`${posts.length} article(s)`}
        className="bg-background"
      >
        {/* Filtres */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Link href="/blog" className="px-4 py-2 bg-surface text-muted rounded-full text-sm hover:bg-primary hover:text-white transition-colors">
            Tous
          </Link>
          {allCategories.map((cat) => (
            <Link
              key={cat}
              href={`/blog/categorie/${cat}`}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                cat === category
                  ? "bg-primary text-white"
                  : "bg-surface text-muted hover:bg-primary hover:text-white"
              }`}
            >
              {categoryLabels[cat] || cat}
            </Link>
          ))}
        </div>

        {/* Grille */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted">Aucun article dans cette catégorie.</p>
            <Link href="/blog" className="text-primary hover:underline mt-4 inline-block">
              ← Retour au blog
            </Link>
          </div>
        )}
      </Section>
    </main>
  );
}