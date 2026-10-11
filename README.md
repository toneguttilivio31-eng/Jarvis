# JARVIS 1.2 — Interface animée et assistant personnel

Interface web progressive (PWA), pensée mobile/iPhone, avec interface sombre lisible, noyau central animé en CSS (orbites, halo, pulsation et barres de signal), transitions d’écran et états visuels distincts pendant l’écoute, la réflexion et la réponse vocale. Comprend aussi navigation mobile, conversation IA via Netlify, dictée et synthèse vocales selon le navigateur, missions avec échéances, notes rapides avec recherche, espace Lumina Product Studio, export/import de sauvegarde et fonction Netlify pour connecter Gemini.

## Déployer sur Netlify depuis GitHub

Le dépôt doit contenir `index.html` à la racine et conserver `netlify/functions/chat.mjs`.

- Build command : laisser vide
- Publish directory : `.`
- Functions directory : `netlify/functions`

Le fichier `netlify.toml` contient déjà ces paramètres. Connectez le dépôt dans Netlify puis déclenchez le déploiement.

## Connecter l'IA

Dans Netlify : **Site configuration → Environment variables** (le nom exact du menu peut varier) → ajouter `GEMINI_API_KEY` avec une clé API Gemini valide. Ne jamais placer la clé dans GitHub ou dans `app.js`. Redéployer le site après avoir ajouté la variable.

La clé API Gemini et l'abonnement Google AI Pro sont deux offres différentes ; vérifiez les limites et les éventuels coûts dans Google AI Studio avant utilisation.

La fonction utilise `gemini-2.5-flash` via l'API Gemini. Si ce modèle n'est pas disponible pour votre clé ou votre région, adaptez le nom du modèle à un modèle disponible dans la documentation Gemini.

## Installer sur iPhone

1. Ouvrez l'URL HTTPS de Netlify dans Safari.
2. Touchez Partager → **Sur l’écran d’accueil**.
3. Confirmez l'ajout.

## Ce qui fonctionne / limites

- L'interface, navigation, missions, conversations locales, sauvegarde et préférences sont côté navigateur.
- Le mode IA distant fonctionne uniquement une fois le site déployé et `GEMINI_API_KEY` configurée avec un accès API valide.
- La reconnaissance vocale dépend de Safari/iOS et peut ne pas être prise en charge ; la dictée iOS au clavier reste une alternative.
- Les données sont enregistrées localement dans ce navigateur et ne se synchronisent pas entre appareils.
- Aucune publication sur les réseaux, messagerie externe, accès à des comptes ou contrôle global de l'iPhone n'est connecté automatiquement.
- Les notifications et tâches en arrière-plan ne sont pas garanties sur iOS.

## Sécurité et vie privée

Les messages envoyés au modèle IA distant sont transmis à l'API Gemini via la fonction Netlify. Ne saisissez pas d'informations sensibles. La clé API est lue côté serveur depuis l'environnement Netlify.

## Fonctionnalités de la version 1.2

- Refonte de l’interface : hiérarchie visuelle plus nette, navigation latérale et barre mobile, panneau central animé et états système visuels.
- Animations CSS réelles : orbites en rotation, halo et noyau pulsants, barres de signal animées, transitions de vues et animations spécifiques à l’écoute / réflexion / parole.
- Le réglage « Animation réduite » désactive les animations principales.

## Fonctionnalités conservées de la version 1.1

- Missions avec priorité et échéance facultative.
- Notifications de missions à échéance lorsque le site est ouvert et que le navigateur les autorise. iOS peut limiter ce comportement en arrière-plan.
- Notes rapides avec recherche et suppression.
- Commandes locales dans le chat : `ajoute une mission : …`, `liste mes missions`, `termine [nom de mission]`, `ouvre mes notes`.
- Bouton de test de connexion à la fonction IA dans Paramètres.
- Les missions, notes et conversations restent stockées localement sur cet appareil ; exportez une sauvegarde pour les transférer.
