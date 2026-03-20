# Portfolio statique pour GitHub Pages

Ce projet est maintenant compatible avec GitHub Pages (HTML/CSS/JS uniquement).

## Ce qui remplace le serveur Go

- `index.html` devient le point d'entree du site.
- Le fichier `main.go` n'est plus necessaire pour l'hebergement GitHub Pages.
- Le routeur SPA continue de fonctionner via les ancres (`#maison`, `#cv`, etc.).

## Publier sur GitHub Pages

1. Pousser le projet sur GitHub.
2. Dans `Settings` > `Pages` du depot.
3. Dans `Build and deployment`, choisir:
   - `Source`: `Deploy from a branch`
   - `Branch`: `main` (ou `master`), dossier `/ (root)`
4. Sauvegarder.
5. Attendre 1 a 3 minutes, puis ouvrir l'URL GitHub Pages fournie.

## Important

- Utiliser des chemins relatifs (deja fait dans ce projet).
- Le formulaire contact ne passe plus par un backend: il ouvre maintenant le client mail via `mailto:`.
