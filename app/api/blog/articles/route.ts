import { NextRequest, NextResponse } from "next/server";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    // Si un slug est fourni, retourner l'article complet avec son contenu
    if (slug) {
      const post = await getPostBySlug(slug);
      if (!post) {
        return NextResponse.json({ error: "Article non trouvé" }, { status: 404 });
      }
      return NextResponse.json(post);
    }

    // Sinon retourner la liste de tous les articles
    const posts = getAllPosts();
    return NextResponse.json({ posts });
  } catch (error) {
    console.error("[Blog API] Erreur:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des articles" },
      { status: 500 }
    );
  }
}