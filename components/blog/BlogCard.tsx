import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/lib/blog";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const categoryLabels: Record<string, string> = {
    conseils: "Conseils",
    actualites: "Actualités",
    immobilier: "Immobilier",
  };

  return (
    <article className="bg-surface rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <Link href={`/blog/${post.slug}`}>
        <div className="relative aspect-video bg-background">
          {post.image ? (
            <Image src={post.image} alt={post.title} fill className="object-cover" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl">📝</span>
            </div>
          )}
        </div>
      </Link>

      <div className="p-6">
        <div className="flex items-center gap-4 mb-3 text-sm">
          <span className="px-2 py-1 bg-primary/10 text-primary rounded-full">
            {categoryLabels[post.category] || post.category}
          </span>
          <span className="text-muted">{formatDate(post.date)}</span>
        </div>

        <h2 className="text-xl font-semibold text-foreground mb-2 line-clamp-2">
          <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
            {post.title}
          </Link>
        </h2>

        <p className="text-muted text-sm line-clamp-3 mb-4">{post.excerpt}</p>

        <Link href={`/blog/${post.slug}`} className="text-primary font-medium text-sm hover:underline">
          Lire la suite →
        </Link>
      </div>
    </article>
  );
}