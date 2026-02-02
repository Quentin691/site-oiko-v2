import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";
import { isValidSession } from "@/lib/session";

interface DeleteData {
  slug: string;
}

export async function POST(request: NextRequest) {
  // Rate limiting admin
  const rateLimit = checkRateLimit(request, "admin");
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Trop de requêtes" },
      { status: 429 }
    );
  }

  try {
    // Vérifier l'authentification via cookie signé
    const session = request.cookies.get("admin-session");
    if (!isValidSession(session?.value)) {
      return NextResponse.json(
        { error: "Non autorisé" },
        { status: 401 }
      );
    }

    const data: DeleteData = await request.json();

    if (!data.slug) {
      return NextResponse.json(
        { error: "Slug de l'article requis" },
        { status: 400 }
      );
    }

    // Récupérer le SHA du fichier (requis par GitHub pour la suppression)
    const getFileResponse = await fetch(
      `https://api.github.com/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/contents/content/blog/${data.slug}.md`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    if (!getFileResponse.ok) {
      return NextResponse.json(
        { error: "Article non trouvé" },
        { status: 404 }
      );
    }

    const fileData = await getFileResponse.json();

    // Supprimer le fichier sur GitHub
    const deleteResponse = await fetch(
      `https://api.github.com/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/contents/content/blog/${data.slug}.md`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          "Content-Type": "application/json",
          Accept: "application/vnd.github.v3+json",
        },
        body: JSON.stringify({
          message: `Suppression article: ${data.slug}`,
          sha: fileData.sha,
          branch: "main",
        }),
      }
    );

    if (!deleteResponse.ok) {
      const errorData = await deleteResponse.json();
      console.error("[Blog API] Erreur GitHub:", errorData);
      return NextResponse.json(
        { error: "Erreur lors de la suppression sur GitHub" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Article supprimé ! Le site se mettra à jour dans ~2 minutes.",
    });
  } catch (error) {
    console.error("[Blog API] Erreur:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
