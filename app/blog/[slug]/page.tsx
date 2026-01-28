import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Section from "@/components/ui/Section";
import ShareButtons from "@/components/blog/ShareButtons";
import { getPostBySlug, getAllPostSlugs } from "@/lib/blog";

const DEFAULT_BLOG_IMAGE = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=450&fit=crop";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: "Article non trouvé | OIKO" };
  }

  return {
    title: `${post.title} | Blog OIKO`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      images: post.image ? [post.image] : [],
    },
  };
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <main>
      <Section className="bg-background">
        <article className="max-w-3xl mx-auto">
          {/* Fil d'Ariane */}
          <nav className="mb-6 text-sm">
            <Link href="/" className="text-muted hover:text-primary">Accueil</Link>
            <span className="mx-2 text-muted">/</span>
            <Link href="/blog" className="text-muted hover:text-primary">Blog</Link>
            <span className="mx-2 text-muted">/</span>
            <span className="text-foreground">{post.title}</span>
          </nav>

          {/* En-tête */}
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-muted">
              <span>Par {post.author}</span>
              <span>•</span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </div>
          </header>

          {/* Image principale */}
          <div className="relative aspect-video mb-8 rounded-lg overflow-hidden">
            <Image
              src={post.image || DEFAULT_BLOG_IMAGE}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
              priority
            />
          </div>

          {/* Contenu */}
          <div
            className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-foreground prose-p:text-muted prose-a:text-primary"
            dangerouslySetInnerHTML={{ __html: post.content || "" }}
          />

          {/* Partage */}
          <div className="mt-8 pt-8 border-t border-border">
            <p className="text-sm text-muted mb-4">Partager cet article :</p>
            <ShareButtons title={post.title} slug={post.slug} />
          </div>

          {/* Retour */}
          <div className="mt-8">
            <Link href="/blog" className="text-primary hover:underline">
              ← Retour au blog
            </Link>
          </div>
        </article>
      </Section>
    </main>
  );
}