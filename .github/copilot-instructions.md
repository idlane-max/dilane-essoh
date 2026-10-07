# Copilot instructions for this repository

## Project overview

This repository is a small static portfolio site for Dilane ESSOH. It is intentionally lightweight and does not use a framework, bundler, or package manager.

- Entry point: `index.html`
- Router: `scripts/router.js`
- Client-side behaviors: `scripts/script.js`
- Portfolio-specific logic: `scripts/portefeuille.js`
- Templates loaded by the SPA: `templates/*.html`
- Styling: `styles/style.css`
- Media/assets: `assets/`

The app is a hash-based single-page experience: navigation changes `window.location.hash`, and `router.js` fetches the matching template and injects its main content into `#app-content`.

## Build, test, and lint commands

No build pipeline, test runner, or lint configuration is present in this repo.

- No `package.json`, `Makefile`, `pytest`, `Cargo.toml`, `go.mod`, or similar project manifest was found.
- There is no automated test suite to run.
- For local validation, serve the folder with a static web server and open it in a browser.

Typical commands:

```bash
cd D:\portefeuille
python -m http.server 8000
```

Then open `http://localhost:8000` in a browser.

For a quick smoke test of routing, confirm the main sections still render after changing hash values such as:

- `#maison`
- `#cv`
- `#portefeuille`
- `#contact`

## Architecture and data flow

- `index.html` defines the shared shell: fixed contact bar, social sidebar, header nav, and the `#app-content` container.
- `scripts/router.js` owns page navigation and template loading.
- `templates/*.html` hold the page sections used by the router. The router reads the HTML, extracts the main content, and injects it into the app shell.
- `scripts/script.js` handles the custom cursor and the contact form submission flow.
- The contact form posts to Formspree and expects a `#cyber-contact-form` element with `#contact-status` for user feedback.
- `styles/style.css` contains the visual system and all layout styling; keep new styles consistent with the existing dark cyber aesthetic.

## Key conventions specific to this repo

- Use vanilla JavaScript and DOM APIs; avoid introducing a framework or build tooling unless the project is intentionally expanded.
- Navigation is hash-based. If you add a new page, update `scripts/router.js` and create the corresponding template under `templates/`.
- Keep asset and template paths relative to the repo root (`./styles/style.css`, `./templates/...`, `./assets/...`).
- The router is designed to fetch and render an HTML fragment. Keep the content inside a single `<main>` or `<body>` structure that can be safely inserted into `#app-content`.
- The contact form intentionally sanitizes user input by stripping `<` and `>` characters before submission; avoid bypassing that behavior when modifying the form logic.
- The site is static and browser-first. Prefer changes that work without a build step and without requiring backend services.

## Editing guidance

- Prefer surgical edits in the existing files rather than introducing new frameworks or abstractions.
- Preserve the current SPA behavior and the dark themed design language.
- When changing routes or page names, keep the hash values aligned between the navigation links and the router config.
- If you add new scripts or template content, ensure they still work when loaded asynchronously by the router and after `DOMContentLoaded`.

## Useful validation checklist

Before finishing a change, verify:

1. The page still loads from a static server.
2. The main navigation links still update the rendered content.
3. The contact form still submits without page reload and status messages still display correctly.
4. CSS and layout remain visually consistent with the existing portfolio design.
