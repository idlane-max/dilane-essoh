const router = {
    routes: {
        '#maison': './templates/home.html',
        '#cv': './templates/cv.html',
        '#portefeuille': './templates/portefeuille.html',
        '#blog': './templates/blog.html',
        '#contact': './templates/contact.html'
    },

    init() {
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }
        window.addEventListener('hashchange', () => this.navigate());
        this.navigate();
    },

    async navigate() {
        const hash = window.location.hash || '#maison';
        const contentContainer = document.getElementById('app-content');

        document.querySelectorAll('header nav a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === hash) {
                link.classList.add('active');
            }
        });

        const templatePath = this.routes[hash];
        if (!templatePath) {
            window.location.hash = '#maison';
            return;
        }

        try {
            const response = await fetch(templatePath);
            const html = await response.text();

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
            contentContainer.classList.remove('fade-in');
            void contentContainer.offsetWidth;
            contentContainer.classList.add('fade-in');

            window.scrollTo({ top: 0, behavior: 'instant' });
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'instant' });
            }, 25);

            this.executeScripts(contentContainer);

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

    secureContactForm() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        const inputs = form.querySelectorAll('input, textarea');

        inputs.forEach(input => {
            input.addEventListener('input', (e) => {
                if (/[<>]/.test(e.target.value)) {
                    e.target.value = e.target.value.replace(/[<>]/g, '');
                    const originalBorder = input.style.borderColor;
                    input.style.borderColor = '#e74c3c';
                    setTimeout(() => input.style.borderColor = originalBorder, 1000);
                }
            });
        });

        form.addEventListener('submit', (e) => {
            inputs.forEach(input => {
                if (/[<>]/.test(input.value) || /javascript:/i.test(input.value)) {
                    e.preventDefault();
                    alert('Pour des raisons de sécurité, le code et les balises HTML ne sont pas autorisés.');
                }
            });
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    router.init();
});
