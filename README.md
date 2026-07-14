# MHIMDAT Service Dépannage — Site web

Site statique (HTML / CSS / JS pur, **zéro dépendance**) pour MHIMDAT Service Dépannage à Marrakech.
Optimisé SEO pour **« dépannage Marrakech »** et mots-clés associés (remorquage, assistance routière, dépanneuse…).

## Contenu du dossier `site/`

```
site/
├── index.html            ← la page (tout le contenu + SEO + données structurées)
├── styles.css            ← design (préfixe .mh- pour tout, aucun conflit)
├── app.js                ← animations légères (fonctionne aussi sans JS)
├── robots.txt            ← autorise l'indexation Google
├── sitemap.xml           ← plan du site pour Google
├── site.webmanifest      ← icône / installation mobile
└── assets/
    ├── images/           ← photos de la flotte (WebP + JPEG de secours)
    └── logo/             ← logos MHIMDAT
```

Le dossier `site/` est **la racine du site**. C'est lui qu'on publie.

## Avant la mise en ligne — à personnaliser (5 minutes)

Ouvrir `index.html` et remplacer, avec « Rechercher / Remplacer » :

1. **L'adresse du site** — remplacer toutes les occurrences de
   `https://mhimdat-depannage.example.com` par votre vraie adresse (voir déploiement ci-dessous).
   Faire pareil dans `robots.txt` et `sitemap.xml`.
2. **Instagram** — remplacer `https://www.instagram.com/mhimdat.depannage` par le vrai compte.
3. **Facebook** — remplacer `https://www.facebook.com/mhimdat.depannage` par la vraie page.
4. **WhatsApp** — le numéro utilisé est `212660504643` (indicatif Maroc +212 sans le 0).
   Le changer partout si vous voulez un autre numéro pour WhatsApp.

> Le TikTok et les 6 numéros de téléphone sont **déjà** ceux fournis. Rien à changer.

## Mise en ligne sur GitHub Pages (gratuit)

Voir le guide pas-à-pas simple : **[DEPLOY-GITHUB.md](DEPLOY-GITHUB.md)**.

## Aperçu en local

Double-cliquer `index.html` suffit pour un aperçu. Pour tester la carte et le
partage correctement, servir le dossier :

```bash
# depuis le dossier site/
python -m http.server 8000
# puis ouvrir http://localhost:8000
```

## Vérifié automatiquement

- ✅ Rapide et sobre sur mobile (image du hero limitée, bouton d'appel toujours accessible)
- ✅ Barre d'appel collante en bas sur mobile
- ✅ Fonctionne **même sans JavaScript**
- ✅ Respecte « animations réduites » (accessibilité)
- ✅ Aucun débordement horizontal, toutes les images ont un texte alternatif
- ✅ SEO : titre + description ciblés Marrakech, 1 seul `<h1>`, données structurées LocalBusiness + FAQ
