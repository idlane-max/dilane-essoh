// Système de routage SPA
const router = {
    routes: {
        '#maison': './templates/home.html',
        '#cv': './templates/cv.html',
        '#portefeuille': './templates/portefeuille.html',
        '#blog': './templates/blog.html',
        '#contact': './templates/contact.html'
    },

    init() {
        // Désactiver la restauration automatique du défilement par le navigateur
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }
        // Écouter les changements de hash
        window.addEventListener('hashchange', () => this.navigate());
        // Charger la route actuelle au démarrage
        this.navigate();
    },

    async navigate() {
        const hash = window.location.hash || '#maison';
        const contentContainer = document.getElementById('app-content');
        
        // Mettre à jour la classe active sur la nav
        document.querySelectorAll('header nav a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === hash) {
                link.classList.add('active');
            }
        });

        // Charger le contenu de la page
        const templatePath = this.routes[hash];
        if (!templatePath) {
            window.location.hash = '#maison';
            return;
        }

        try {
            const response = await fetch(templatePath);
            const html = await response.text();
            
            // Extraire le contenu du <main> seulement pour les pages HTML complètes.
            // Pour les fragments de template, garder tout le body pour ne rien perdre
            // (ex: modales placées en dehors du premier conteneur).
            let content = html;
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const mainElement = doc.querySelector('main#app-content, main');

            if (mainElement && mainElement.innerHTML) {
                content = mainElement.innerHTML;
            } else if (doc.body && doc.body.innerHTML) {
                content = doc.body.innerHTML;
            }
            
            contentContainer.innerHTML = content;

            // ajouter une animation de transition sur le conteneur à chaque chargement
            contentContainer.classList.remove('fade-in');
            // reflow pour forcer la réinitialisation de l'animation
            void contentContainer.offsetWidth;
            contentContainer.classList.add('fade-in');

            // Forcer le retour en haut de page après le rendu du DOM
            // Scroll immédiat
            window.scrollTo({ top: 0, behavior: 'instant' });
            // Scroll assuré après que le DOM soit complètement calculé
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'instant' });
            }, 25);
            
            // Re-exécuter les scripts si nécessaire
            this.executeScripts(contentContainer);

            // Sécuriser le formulaire si on est sur la page contact
            if (hash === '#contact') {
                this.secureContactForm();
            }
        } catch (error) {
            console.error('Erreur lors du chargement de la page:', error);
            contentContainer.innerHTML = '<p>Erreur lors du chargement de la page</p>';
        }
    },

    executeScripts(container) {
        const scripts = container.querySelectorAll('script');
        scripts.forEach(script => {
            const newScript = document.createElement('script');
            if (script.src) {
                newScript.src = script.src;
            } else {
                newScript.textContent = script.textContent;
            }
            container.appendChild(newScript);
        });
    },

    // Fonction de sécurité pour empêcher l'injection de code (XSS)
    secureContactForm() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        const inputs = form.querySelectorAll('input, textarea');

        inputs.forEach(input => {
            // Nettoyage en temps réel : empêche de taper < ou >
            input.addEventListener('input', (e) => {
                if (/[<>]/.test(e.target.value)) {
                    e.target.value = e.target.value.replace(/[<>]/g, '');
                    
                    // Feedback visuel (bordure rouge temporaire)
                    const originalBorder = input.style.borderColor;
                    input.style.borderColor = '#e74c3c';
                    setTimeout(() => input.style.borderColor = originalBorder, 1000);
                }
            });
        });

        form.addEventListener('submit', (e) => {
            // Vérification finale avant envoi
            inputs.forEach(input => {
                if (/[<>]/.test(input.value) || /javascript:/i.test(input.value)) {
                    e.preventDefault();
                    alert("Pour des raisons de sécurité, le code et les balises HTML ne sont pas autorisés.");
                }
            });
        });
    }
};

// Initialiser le routeur au chargement du DOM
document.addEventListener('DOMContentLoaded', () => {
    router.init();
});
