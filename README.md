# JARVIS — Assistant personnel & Lumina Product Studio

Version 0.4 — application web progressive (PWA), interface française, espace personnel, gestion locale, voix selon la prise en charge du navigateur, Studio de campagne Lumina, studio de publications sociales, brouillons enregistrés, import/export JSON, routine de démarrage et relais IA optionnel côté serveur Netlify.

## Version 0.5 — améliorations concrètes

- L’historique récent de conversation est envoyé au modèle IA, ce qui permet des échanges suivis plutôt qu’une requête isolée à chaque message.
- Mémoire personnelle locale : enregistrer, consulter et supprimer des notes depuis les réglages ou par commande (« souviens-toi que… », « affiche ma mémoire », « oublie… »).
- Le résumé de contexte envoyé au modèle inclut les notes mémorisées ainsi que les données saisies dans JARVIS.
- Le code continue de protéger la clé API côté serveur Netlify ; ne jamais placer la clé dans le dépôt.

Ces améliorations ne rendent pas les intégrations externes actives par elles-mêmes. La mémoire est locale à ce navigateur/appareil et peut être perdue si ses données sont effacées.

## Fonctionnalités réellement incluses
- Tableau de bord : prospects, missions, commandes et chiffre d'affaires enregistré.
- Gestion locale des prospects Lumina, étapes commerciales et notes.
- Suivi des commandes, statuts et montants saisis par l'utilisateur.
- Missions avec priorités, filtres et validation.
- Assistant local à commandes prédéfinies : synthèse Lumina, missions, création de missions et prospects, proposition d'organisation quotidienne.
- Studio de campagne : génère localement un brief créatif et un brouillon de texte à partir des champs saisis. Il ne crée pas les images et les textes restent à vérifier.
- Studio Réseaux : brouillons pour Instagram, TikTok, LinkedIn et Facebook, sauvegarde locale, copie et suppression. Les commandes du type « crée un post Instagram sur… » sont reconnues par l’assistant local.
- Routine de démarrage : ajoute des missions proposées à partir des données actuelles, sans envoyer de messages.
- Export et import JSON avec confirmation avant remplacement des données.
- Synthèse vocale si disponible et dictée vocale lorsque Safari/iOS la prend en charge.
- Manifest PWA et cache hors ligne de l'interface.
- Relais IA général optionnel via une fonction serveur Netlify + Gemini API.

## Ce qui nécessite encore une activation externe
1. L'IA générale a besoin d'une clé Gemini API configurée côté serveur Netlify. L'abonnement Google AI Pro ne signifie pas automatiquement que l'API est incluse. Les conditions/quota gratuits peuvent changer et ne sont pas garantis.
2. La publication en ligne doit être faite dans un compte Netlify ou via un dépôt GitHub. Ce projet n'est pas automatiquement publié par le téléchargement du ZIP.
3. Les données sont stockées localement sur cet appareil. Pas de compte utilisateur ni synchronisation cloud dans cette version.
4. Le module Réseaux prépare et conserve des brouillons, mais ne publie pas directement. Pour programmer et analyser des posts, connectez vos comptes sociaux à Metricool, puis utilisez l’intégration Metricool disponible dans ChatGPT. La connexion de l’application web JARVIS à Metricool via API/OAuth nécessiterait une intégration serveur séparée.
5. Les notifications iOS en arrière-plan, l’envoi automatique de SMS/e-mails, la publication directe depuis la PWA, l’accès aux fichiers privés et le contrôle général d’iOS ne sont pas inclus : un site web ne peut pas contourner les permissions d’iOS et des services tiers.
6. La reconnaissance vocale dépend de Safari/iOS et peut ne pas être disponible. Le clavier iPhone peut offrir sa propre dictée.

## Confidentialité
- N'ajoutez aucune clé API dans `index.html`, `app.js` ou un dépôt public.
- Si le relais IA est activé, le message envoyé et un résumé des données de tâches/prospects/commandes transmis dans le contexte sont envoyés au fournisseur IA pour produire la réponse. N'incluez pas de mots de passe ou de données sensibles.
- Les données saisies dans les formulaires sont locales par défaut. Exportez régulièrement une sauvegarde JSON.

## Déployer via Netlify
1. Décompressez le ZIP en conservant toute l'arborescence, notamment `netlify.toml` et `netlify/functions/chat.mjs`.
2. Dans Netlify, créez un site depuis un dépôt GitHub ou déployez le dossier en conservant la structure. Pour les fonctions serveur, privilégiez un déploiement depuis Git.
3. Dans les variables d'environnement Netlify, ajoutez `GEMINI_API_KEY` avec une clé obtenue auprès de Google AI Studio, si vous avez accès à un quota approprié.
4. Facultatif : ajoutez `GEMINI_MODEL` avec un nom de modèle accessible à votre compte. La valeur par défaut est `gemini-2.5-flash`; remplacez-la si nécessaire.
5. Redéployez le site et testez une demande générale dans l'onglet Assistant. Ne mettez jamais la clé dans les fichiers front-end.

## Installer sur iPhone
1. Ouvrez l'URL HTTPS publiée dans Safari.
2. Touchez Partager → Sur l'écran d'accueil.
3. Activez « Ouvrir comme app web » si cette option apparaît, puis Ajouter.

## Commandes de test
- `point Lumina`
- `missions`
- `ajoute une mission : préparer le prochain post`
- `ajoute un prospect : Boutique Martin`
- `organise ma journée`
- `crée un post Instagram sur notre service de visuels produits`
- `crée un post LinkedIn sur les avantages de visuels produits professionnels`
- Pour les demandes générales, configurez le relais IA Netlify et essayez : `Prépare un plan de prospection de 5 jours pour Lumina`.

## Fichiers
- `index.html` : structure et vues
- `styles.css` : interface responsive
- `app.js` : stockage local, commandes, voix, Studio de campagne, import/export
- `manifest.json` : métadonnées PWA
- `sw.js` : cache hors ligne
- `icon.svg` : icône
- `netlify.toml` : configuration Netlify
- `netlify/functions/chat.mjs` : relais serveur Gemini
