const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

export default async (request) => {
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
  if (request.method !== "POST") return Response.json({ error: "Méthode non autorisée." }, { status: 405, headers: cors });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return Response.json({ error: "IA non configurée. Ajoutez GEMINI_API_KEY dans les variables d’environnement Netlify." }, { status: 503, headers: cors });

  let body;
  try { body = await request.json(); } catch { return Response.json({ error: "Requête JSON invalide." }, { status: 400, headers: cors }); }
  const message = String(body.message || "").trim().slice(0, 8000);
  if (!message) return Response.json({ error: "Message vide." }, { status: 400, headers: cors });

  const context = String(body.context || "").slice(0, 12000);
  const history = Array.isArray(body.history) ? body.history.slice(-12).map(item => ({
    role: item?.role === "model" ? "model" : "user",
    parts: [{ text: String(item?.text || "").slice(0, 3000) }]
  })).filter(item => item.parts[0].text.trim()) : [];
  const system = `Tu es JARVIS, assistant personnel francophone, concret, fiable et organisé. Tu aides l’utilisateur dans toute sa vie quotidienne et professionnelle : organisation personnelle, objectifs, habitudes, décisions, apprentissage, projets, créativité, business et Lumina Product Studio. Tu peux brainstormer avec lui, challenger ses idées avec honnêteté, transformer ses objectifs en étapes, tenir compte de l’historique récent transmis, utiliser les informations de mémoire locale présentes dans le contexte, rédiger des contenus, des posts Instagram/TikTok/LinkedIn/Facebook, des scripts vidéo, des emails et des plans éditoriaux adaptés à chaque plateforme. Pour les demandes de publications, crée un brouillon prêt à vérifier ; ne prétends jamais l’avoir publié ou programmé sans confirmation réelle d’un outil connecté.\n\nCONTEXTE LUMINA À RESPECTER : Lumina Product Studio vend un service de création publicitaire assistée par IA pour les professionnels qui vendent des produits. Offre Essentials : jusqu'à 2 visuels + titre, description et arguments de vente. Offre Campaign : jusqu'à 2 visuels + courte vidéo publicitaire + textes. Offre Monthly : accompagnement récurrent, détails encore à finaliser. Les tarifs ne sont pas validés : ne les invente jamais. L'identité visuelle : ivoire crème #F6F1E8, noir doux #242321, vert sauge #A9B9A5, beige chaud #D8C7B2. Style naturel, professionnel, crédible, réaliste, non ostentatoire, sans aspect artificiellement luxueux. Préserver l'apparence réelle du produit. Limiter le nombre de générations et le travail manuel.\n\nRÈGLES : Réponds en français, clairement et avec des étapes actionnables. N'affirme jamais avoir envoyé un message, publié un contenu, créé un rappel système ou exécuté une action externe si ce n'est pas confirmé par un outil. Tu peux préparer des brouillons et des plans, mais précise ce que l’utilisateur doit valider. Si on te demande un post pour les réseaux, adapte le ton à la plateforme, fournis le texte final et une idée de visuel, et rappelle que le texte seul n’est pas une publication publiée. Si une intégration officielle de publication n’est pas disponible, explique l’étape concrète suivante. Ne demande pas de données secrètes. Si l'utilisateur demande de réaliser une action que tu ne peux pas exécuter, explique la limite et donne l'étape concrète suivante. Contexte de l'utilisateur et données saisies dans JARVIS : ${context || "Aucun contexte supplémentaire."}`;

  const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: system }] },
        contents: [...history, { role: "user", parts: [{ text: message }] }],
        generationConfig: { temperature: 0.65, maxOutputTokens: 1200 }
      })
    });
    const result = await response.json();
    if (!response.ok) {
      const msg = result?.error?.message || `Erreur du fournisseur IA (${response.status}).`;
      return Response.json({ error: msg }, { status: 502, headers: cors });
    }
    const answer = (result.candidates || []).flatMap(c => c.content?.parts || []).map(p => p.text || "").join("\n").trim();
    if (!answer) return Response.json({ error: "Le modèle n’a pas retourné de réponse. Réessayez." }, { status: 502, headers: cors });
    return Response.json({ answer, model }, { headers: { ...cors, "Cache-Control": "no-store" } });
  } catch {
    return Response.json({ error: "Impossible de joindre le service IA. Vérifiez la configuration et réessayez." }, { status: 502, headers: cors });
  }
};
