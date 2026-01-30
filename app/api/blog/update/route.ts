import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";

interface UpdateData {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  image?: string;
  author?: string;
}

const AUTHORS: Record<string, string> = {
  oiko: "OIKO Gestion",
  quentin: "Quentin",
};

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
    // Vérifier l'authentification via cookie
    const session = request.cookies.get("admin-session");
    if (!session || session.value !== "authenticated") {
      return NextResponse.json(
        { error: "Non autorisé" },
        { status: 401 }
      );
    }

    const data: UpdateData = await request.json();

    if (!data.slug?.trim() || !data.title?.trim() || !data.content?.trim() || !data.excerpt?.trim()) {
      return NextResponse.json(
        { error: "Tous les champs sont requis (titre, extrait, contenu)" },
        { status: 400 }
      );
    }

    // Récupérer le SHA du fichier existant
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

    // Créer le nouveau contenu Markdown
    const authorId = data.author || "oiko";
    const authorName = AUTHORS[authorId] || "OIKO Gestion";
    const imageField = data.image ? `\nimage: "${data.image}"` : "";
    const markdownContent = `---
title: "${data.title}"
excerpt: "${data.excerpt}"
date: "${data.date}"
author: "${authorName}"
authorId: "${authorId}"${imageField}
category: "${data.category || "actualites"}"
---

${data.content}
`;

    // Encoder le contenu en base64
    const contentBase64 = Buffer.from(markdownContent).toString("base64");

    // Mettre à jour le fichier sur GitHub
    const updateResponse = await fetch(
      `https://api.github.com/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/contents/content/blog/${data.slug}.md`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          "Content-Type": "application/json",
          Accept: "application/vnd.github.v3+json",
        },
        body: JSON.stringify({
          message: `Modification article: ${data.title}`,
          content: contentBase64,
          sha: fileData.sha,
          branch: "main",
        }),
      }
    );

    if (!updateResponse.ok) {
      const errorData = await updateResponse.json();
      console.error("[Blog API] Erreur GitHub:", errorData);
      return NextResponse.json(
        { error: "Erreur lors de la modification sur GitHub" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Article modifié ! Le site se mettra à jour dans ~2 minutes.",
    });
  } catch (error) {
    console.error("[Blog API] Erreur:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
