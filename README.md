
# Portfolio - Dilane ESSOH

Mon Portfolio, construit comme un site statique en HTML/CSS/JavaScript. Le site présente une identité visuelle sombre et technologique, avec une navigation SPA basée sur les hash URL (`#maison`, `#cv`, `#portefeuille`, `#contact`) et des templates chargés dynamiquement.

## Présentation

Ce projet sert de vitrine professionnelle pour :

- présenter mon parcours et mes compétences ;
- mettre en avant mes projets académiques et techniques ;
- fournir mes informations de contact et un formulaire de message ;
- exposer mon portfolio de projets en mode single-page application.

## Stack technique

- HTML5
- CSS3
- JavaScript vanilla
- Aucune dépendance Node.js / npm / bundler
- Aucun framework front-end
- Formspree pour l’envoi des messages du formulaire de contact

## Structure du projet

```text
.
├── index.html                 # Shell principal du site
├── assets/                    # Images, visuels, PDF, icônes
├── scripts/
│   ├── router.js              # Routage hash-based SPA
│   ├── script.js              # Curseur personnalisé et logique du formulaire
│   └── portefeuille.js        # Gestion des modales des projets
├── styles/
│   └── style.css              # Styles globaux et composants visuels
├── templates/
│   ├── home.html              # Accueil
│   ├── cv.html                # CV / parcours
│   ├── portefeuille.html     # Liste des projets
│   ├── contact.html           # Formulaire de contact
│   └── ...                    # Autres templates de la SPA
├── README.md
├── .github/
│   └── copilot-instructions.md
└── .gitignore
```

## Fonctionnement du site

Le site utilise une architecture SPA légère :

- `index.html` contient mon header, mon conteneur principal et mes éléments réutilisés.
- `scripts/router.js` écoute les changements de hash et charge le bon template.
- `templates/*.html` contiennent les sections renderisées dans le conteneur `#app-content`.
- `scripts/script.js` gère mon curseur personnalisé et l’envoi du formulaire de contact.
- `scripts/portefeuille.js` gère l’ouverture/fermeture de mes modales de détails des projets.

## Démarrage local

Comme le projet est entièrement statique, il n’y a pas de build ni de serveur backend à démarrer.

### Option 1 — serveur Python

```bash
cd D:\portefeuille
python -m http.server 8000
```

Puis ouvrir :

```text
http://localhost:8000
```

### Option 2 — ouverture locale

Vous pouvez aussi ouvrir directement `index.html` dans le navigateur, mais l’usage d’un serveur local est préférable pour éviter les écarts de chargement et garder un comportement plus homogène.

## Validation rapide

Aucun test automatisé n’est configuré dans ce dépôt.

La validation se fait principalement visuellement :

- vérifier le chargement de la page d’accueil ;
- vérifier la navigation par liens `#...` ;
- vérifier l’affichage des sections CV, portfolio et contact ;
- vérifier le comportement du formulaire de contact ;
- vérifier que le design visuel reste cohérent avec la charte actuelle.

## Règles de contribution

Les modifications doivent rester cohérentes avec le style existant de mon projet :

- conserver ma navigation SPA par hash ;
- éviter d’introduire un framework ou un bundler sans nécessité ;
- garder mes chemins relatifs valides (`./styles/style.css`, `./templates/...`, `./assets/...`) ;
- respecter les conventions visuelles actuelles de mon portfolio (thème sombre, accents verts, interface cyber).

## Formulaire de contact

Le formulaire de contact est conçu pour envoyer mes messages via Formspree. Il s’attend à un formulaire portant l’ID `cyber-contact-form` et à un élément de statut `#contact-status` pour afficher mes messages de succès ou d’erreur.

## Licence

Ce projet est mon portfolio personnel. Les droits et contenus visuels sont spécifiques à mon usage professionnel.
