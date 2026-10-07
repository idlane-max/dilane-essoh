# Conventions du projet

Ce dépôt est un portfolio statique en JavaScript vanilla, sans framework ni outil de build. Les conventions suivantes sont conçues pour garder le projet cohérent, maintenable et compatible avec son fonctionnement SPA.

## 1. Architecture générale

### Site statique sans build

Le projet ne doit pas dépendre d’un système de compilation, de bundling, de transpilation ou de gestion de dépendances front-end.

- Pas de `package.json` requis
- Pas de framework JS (React, Vue, Angular, etc.)
- Pas de préprocesseurs CSS
- Pas de pipeline de build CI pour le front

### SPA par hash

La navigation se fait via le hash de l’URL :

- `#maison`
- `#cv`
- `#portefeuille`
- `#contact`

La logique de routage est centralisée dans `scripts/router.js`. Toute nouvelle vue doit être ajoutée à la fois :

1. dans le tableau `routes` du routeur ;
2. dans le menu de navigation HTML ;
3. dans le template correspondant dans `templates/`.

### Contenu injecté dynamiquement

Les vues ne sont pas chargées comme des pages distinctes. Elles sont récupérées dans `templates/` puis injectées dans le conteneur principal :

```html
<main id="app-content"></main>
```

Les templates doivent rester compatibles avec cette logique :

- soit contenir un `<main>` unique ;
- soit contenir un contenu HTML exploitable directement dans le body ;
- éviter de dépendre d’une structure HTML complète qui casserait l’injection dans le conteneur.

## 2. Conventions de développement

### JavaScript

- Utiliser JavaScript vanilla standard.
- Éviter les bibliothèques externes pour les interactions simples.
- Préférer les APIs DOM natives plutôt que des abstractions lourdes.
- Rester compatible avec le comportement SPA déjà en place.

### CSS

- Les styles globaux et les composants visuels sont centralisés dans `styles/style.css`.
- Le style visuel actuel est orienté cyber / sombre / technologique.
- Ne pas casser l’esthétique globale lors d’un ajout de composant.
- Les animations et effets visuels doivent rester légers et réactifs.

### Assets et chemins

- Utiliser des chemins relatifs valides : `./assets/...`, `./styles/...`, `./templates/...`.
- Les fichiers statiques doivent rester dans leurs dossiers respectifs.
- Les nouveaux visuels, captures ou PDF doivent être ajoutés dans `assets/`.

## 3. Règles liées aux écrans et navigation

### Ajout d’une nouvelle section

Quand une nouvelle section est ajoutée au site, vérifier dans les trois points suivants :

- le hash de navigation dans `scripts/router.js` ;
- le lien du menu principal dans `index.html` ;
- le template à charger dans `templates/`.

### Comportement attendu des pages

Les pages chargées doivent :

- s’intégrer dans le layout global sans réécrire la structure de la page ;
- conserver le comportement de défilement propre du site ;
- fonctionner lorsque le contenu est injecté dynamiquement par le routeur.

## 4. Conventions spécifiques au formulaire de contact

Le formulaire de contact est un élément critique du site et suit une logique spécifique.

### Règles actuelles

- L’ID du formulaire doit rester `cyber-contact-form`.
- Le status visuel doit utiliser `#contact-status`.
- Les messages doivent rester compatibles avec l’UX actuelle du site.
- Le formulaire est soumis via Formspree et doit conserver l’attribut `action` attendu.

### Sécurité côté client

Le code actuel supprime les caractères `<` et `>` lors de la saisie de certains champs pour limiter les injections HTML. Les modifications futures sur le formulaire doivent respecter cette logique et éviter de contourner les filtres déjà présents.

## 5. Modales et composants interactifs

`scripts/portefeuille.js` gère les modales de détails dans la section portfolio.

### Règles pour les modales

- Ne pas dupliquer les écouteurs d’événements sur une même page.
- Vérifier la présence de garde-fous pour empêcher les doublons d’initialisation.
- Les modales doivent fermer proprement et réactiver le scroll du body.
- Le comportement ne doit pas dépendre d’un framework.

## 6. Conventions de documentation

- Les changements importants doivent rester cohérents avec le README du projet.
- Les nouvelles fonctionnalités doivent être expliquées en fonction du comportement réel du site, pas selon un modèle générique.
- Les docs doivent refléter le projet actuel : portfolio statique en JS vanilla dans un contexte universitaire / professionnel.

## 7. Checklist avant un changement

Avant de finaliser une modification, vérifier :

- le site charge toujours à partir d’un serveur statique ;
- la navigation hash fonctionne encore ;
- les templates injectés gardent une structure exploitable ;
- les liens CSS et JS restent valides ;
- le design et la cohérence visuelle restent conservés ;
- le formulaire de contact continue de fonctionner sans rechargement de page.

## 8. Intention finale du projet

Le dépôt doit rester un portfolio personnel élégant, technique et facile à maintenir, sans sur-ingénierie. Toute modification doit donc prioriser la simplicité, la lisibilité du code et la cohérence visuelle avec la version existante du site.
