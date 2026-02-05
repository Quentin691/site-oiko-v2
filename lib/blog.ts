import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "content/blog");

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  authorId?: string;
  category: string;
  image?: string;
  content?: string;
}

/**
 * Récupère tous les articles de blog
 */
export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);

  const posts = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title,
        excerpt: data.excerpt,
        date: data.date,
        author: data.author,
        authorId: data.authorId,
        category: data.category,
        image: data.image,
      };
    });

  return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

/**
 * Vérifie si le contenu est déjà du HTML (créé avec l'éditeur visuel)
 */
function isHtmlContent(content: string): boolean {
  const trimmed = content.trim();
  return trimmed.startsWith("<") || trimmed.includes("</p>") || trimmed.includes("</h");
}

/**
 * Récupère un article par son slug
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  // Si le contenu est déjà du HTML (éditeur visuel), on le garde tel quel
  // Sinon, on convertit le Markdown en HTML (anciens articles)
  let contentHtml: string;
  if (isHtmlContent(content)) {
    contentHtml = content;
  } else {
    const processedContent = await remark().use(html).process(content);
    contentHtml = processedContent.toString();
  }

  return {
    slug,
    title: data.title,
    excerpt: data.excerpt,
    date: data.date,
    author: data.author,
    authorId: data.authorId,
    category: data.category,
    image: data.image,
    content: contentHtml,
  };
}

/**
 * Récupère tous les slugs pour generateStaticParams
 */
export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  return fs.readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => fileName.replace(/\.md$/, ""));
}

/**
 * Récupère les articles par catégorie
 */
export function getPostsByCategory(category: string): BlogPost[] {
  return getAllPosts().filter((post) => post.category === category);
}

/**
 * Récupère toutes les catégories uniques
 */
export function getAllCategories(): string[] {
  const allPosts = getAllPosts();
  const categories = new Set(allPosts.map((post) => post.category));
  return Array.from(categories);
}