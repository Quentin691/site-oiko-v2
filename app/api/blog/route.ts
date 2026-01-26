import { NextRequest, NextResponse } from "next/server";

interface ArticleData {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  password: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: ArticleData = await request.json();

    // Vérification du mot de passe admin
    if (data.password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: "Mot de passe incorrect" },
        { status: 401 }
      );
    }

    // Validation des champs
    if (!data.title || !data.content || !data.excerpt) {
      return NextResponse.json(
        { error: "Titre, extrait et contenu sont requis" },
        { status: 400 }
      );
    }

    // Générer le slug à partir du titre
    const slug = data.title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Supprime les accents
      .replace(/[^a-z0-9]+/g, "-") // Remplace les caractères spéciaux par des tirets
      .replace(/^-+|-+$/g, ""); // Supprime les tirets en début/fin

    // Créer le contenu Markdown
    const date = new Date().toISOString().split("T")[0];
    const markdownContent = `---
title: "${data.title}"
excerpt: "${data.excerpt}"
date: "${date}"
author: "OIKO Gestion"
category: "${data.category || "actualites"}"
---

${data.content}
`;

    // Encoder le contenu en base64 (requis par GitHub API)
    const contentBase64 = Buffer.from(markdownContent).toString("base64");

    // Appel à l'API GitHub pour créer le fichier
    const githubResponse = await fetch(
      `https://api.github.com/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/contents/content/blog/${slug}.md`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          "Content-Type": "application/json",
          Accept: "application/vnd.github.v3+json",
        },
        body: JSON.stringify({
          message: `Nouvel article: ${data.title}`,
          content: contentBase64,
          branch: "main",
        }),
      }
    );

    if (!githubResponse.ok) {
      const errorData = await githubResponse.json();
      console.error("[Blog API] Erreur GitHub:", errorData);
      return NextResponse.json(
        { error: "Erreur lors de la création sur GitHub" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      slug,
      message: "Article créé ! Il sera visible dans ~2 minutes après le redéploiement.",
    });
  } catch (error) {
    console.error("[Blog API] Erreur:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}