# Mettre le site en ligne avec GitHub Pages — guide simple

Aucune ligne de commande nécessaire. Comptez ~10 minutes. À la fin, votre site
sera en ligne gratuitement sur une adresse du type
`https://VOTRE-COMPTE.github.io/mhimdat/`.

---

## Étape 1 — Créer un compte GitHub
1. Aller sur **github.com** → **Sign up**.
2. Créer le compte (gratuit) et confirmer l'e-mail.

## Étape 2 — Créer le dépôt (le « projet »)
1. En haut à droite, cliquer le **+** → **New repository**.
2. **Repository name** : `mhimdat` (ou ce que vous voulez).
3. Cocher **Public**.
4. Cliquer **Create repository**.

## Étape 3 — Envoyer les fichiers du site
1. Sur la page du dépôt, cliquer **« uploading an existing file »**
   (ou l'onglet **Add file → Upload files**).
2. **Important :** ouvrez le dossier `site/` sur votre ordinateur et
   **glissez-déposez tout ce qu'il contient** — `index.html`, `styles.css`,
   `app.js`, les autres fichiers **et le dossier `assets`**.
   > `index.html` doit se retrouver **à la racine** du dépôt (pas dans un
   > sous-dossier), sinon la page ne s'affichera pas.
3. En bas, cliquer **Commit changes**.

## Étape 4 — Activer GitHub Pages
1. Dans le dépôt, aller dans **Settings** (roue dentée en haut).
2. Menu de gauche → **Pages**.
3. Sous **Source**, choisir **Deploy from a branch**.
4. **Branch** : sélectionner **main** et le dossier **/ (root)** → **Save**.
5. Attendre 1–2 minutes. Rafraîchir la page : GitHub affiche
   **« Your site is live at … »** avec votre adresse. 🎉

## Étape 5 — Renseigner la vraie adresse dans le site (SEO)
Maintenant que vous connaissez l'adresse (ex. `https://moncompte.github.io/mhimdat/`) :
1. Dans le dépôt, ouvrir `index.html` (cliquer dessus puis l'icône **crayon**).
2. Utiliser le remplacement : mettre votre adresse à la place de
   `https://mhimdat-depannage.example.com`.
3. Faire pareil dans `robots.txt` et `sitemap.xml`.
4. **Commit changes**. Le site se met à jour tout seul en ~1 minute.

## Étape 6 — Déclarer le site à Google (pour être trouvé)
1. Aller sur **search.google.com/search-console**, se connecter.
2. Ajouter votre adresse, suivre la vérification.
3. Menu **Sitemaps** → coller `sitemap.xml` → **Envoyer**.
4. (Fortement recommandé) Créer une **fiche Google Business Profile**
   « MHIMDAT Service Dépannage » à Marrakech : c'est le levier n°1 pour
   ressortir sur « dépannage Marrakech ».

---

## Plus tard : un vrai nom de domaine (optionnel)
Si vous achetez `mhimdat.ma` ou similaire :
1. Dans **Settings → Pages → Custom domain**, saisir le domaine.
2. Chez le vendeur du domaine, ajouter les enregistrements DNS indiqués par GitHub.

---

## Si quelque chose ne va pas
- **Page toute blanche / sans style** → `styles.css` n'a pas été envoyé, ou
  `index.html` est dans un sous-dossier. Vérifier qu'il est à la racine.
- **Images cassées** → le dossier `assets` n'a pas été envoyé en entier, ou un
  fichier a été renommé. Ne pas renommer les fichiers d'images.
- **La carte ne s'affiche pas** → normal en aperçu local hors ligne ; en ligne
  elle se charge. Vérifier la connexion internet.
- **Le bouton « Appeler » ne fait rien sur ordinateur** → normal : l'appel
  fonctionne sur téléphone.
