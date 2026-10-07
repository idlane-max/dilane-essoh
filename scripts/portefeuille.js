// scripts/portefeuille.js

// Sécurité SPA : On vérifie que le script n'a pas déjà été initialisé 
// pour éviter d'ajouter les événements en double quand on navigue entre les pages.
if (!window.portefeuilleModalsInitialized) {
    window.portefeuilleModalsInitialized = true;
    const filterTimers = new WeakMap();
    const filterFrames = new WeakMap();
    let activeModal = null;
    let lastFocusedElement = null;
    let previousBodyOverflow = '';

    function addProjectOverview(modal, projectCard) {
        if (!projectCard || modal.querySelector('.modal-overview')) return;

        const overview = document.createElement('section');
        overview.className = 'modal-overview';
        overview.setAttribute('aria-label', 'Présentation du projet');

        const summary = document.createElement('div');
        summary.className = 'modal-overview-section modal-summary';
        const summaryTitle = document.createElement('h3');
        summaryTitle.textContent = 'Présentation';
        const summaryText = document.createElement('p');
        summaryText.textContent = projectCard.querySelector('.project-description')?.textContent.trim() || '';
        summary.append(summaryTitle, summaryText);
        overview.append(summary);

        const technologies = projectCard.querySelector('.tech-stack')?.textContent
            .split('|')
            .map(technology => technology.trim())
            .filter(Boolean) || [];

        if (technologies.length) {
            const technologySection = document.createElement('div');
            technologySection.className = 'modal-overview-section modal-technologies';
            const technologyTitle = document.createElement('h3');
            technologyTitle.textContent = 'Technologies';
            const technologyList = document.createElement('ul');
            technologyList.className = 'technology-tags';

            technologies.forEach(technology => {
                const tag = document.createElement('li');
                tag.textContent = technology;
                technologyList.append(tag);
            });

            technologySection.append(technologyTitle, technologyList);
            overview.append(technologySection);
        }

        const projectLinks = Array.from(projectCard.querySelectorAll('.project-links-container a'));
        if (projectLinks.length) {
            const linksSection = document.createElement('div');
            linksSection.className = 'modal-overview-section modal-project-links';
            const linksTitle = document.createElement('h3');
            linksTitle.textContent = 'Liens du projet';
            const linksList = document.createElement('div');
            linksList.className = 'project-links-container';

            projectLinks.forEach(link => {
                const projectLink = link.cloneNode(true);
                if (projectLink.target === '_blank') {
                    projectLink.rel = 'noopener noreferrer';
                }
                linksList.append(projectLink);
            });

            linksSection.append(linksTitle, linksList);
            overview.append(linksSection);
        }

        modal.querySelector('.modal-body')?.before(overview);
    }

    function closeModal(modal) {
        if (!modal) return;

        modal.classList.remove('active');
        document.body.style.overflow = previousBodyOverflow;
        if (lastFocusedElement?.isConnected) {
            lastFocusedElement.focus();
        }
        activeModal = null;
        lastFocusedElement = null;
    }

    // On utilise la "Délégation d'événements" sur le document.
    // C'est parfait pour le contenu injecté dynamiquement  !
    document.addEventListener('click', function(e) {
        const filterButton = e.target.closest('.project-filter');
        if (filterButton) {
            const filters = filterButton.closest('.project-filters');
            const portfolio = filterButton.closest('.portfolio-container');
            const selectedCategory = filterButton.dataset.filter;
            const cards = Array.from(portfolio.querySelectorAll('.project-card'));
            const matchingProjects = cards.filter(card =>
                selectedCategory === 'all' || card.dataset.category === selectedCategory
            );

            console.log(
                '[Portfolio] Catégorie sélectionnée:',
                selectedCategory,
                '| Projets trouvés:',
                matchingProjects.map(card => card.querySelector('h3')?.textContent.trim())
            );

            filters.querySelectorAll('.project-filter').forEach(button => {
                const isActive = button === filterButton;
                button.classList.toggle('active', isActive);
                button.setAttribute('aria-pressed', String(isActive));
            });

            cards.forEach(card => {
                clearTimeout(filterTimers.get(card));
                cancelAnimationFrame(filterFrames.get(card));

                const shouldShow = matchingProjects.includes(card);
                card.classList.add('has-been-filtered');

                if (shouldShow) {
                    if (card.hidden) {
                        card.hidden = false;
                        card.classList.add('is-filtering-in');
                        filterFrames.set(card, requestAnimationFrame(() => {
                            card.classList.remove('is-filtering-in');
                        }));
                    } else {
                        card.classList.remove('is-filtering-out');
                    }
                } else if (!card.hidden) {
                    card.classList.add('is-filtering-out');
                    filterTimers.set(card, setTimeout(() => {
                        card.hidden = true;
                        card.classList.remove('is-filtering-out');
                    }, 220));
                }
            });
            return;
        }
        
        // 1. Clic sur le bouton "Voir les détails"
        const btn = e.target.closest('.btn-details');
        if (btn) {
            const targetModalId = btn.getAttribute('data-modal');
            const modal = document.getElementById(targetModalId);
            if (modal) {
                const title = modal.querySelector('.modal-title');
                if (title) {
                    title.id = `${modal.id}-title`;
                    modal.querySelector('.modal-content')?.setAttribute('aria-labelledby', title.id);
                }
                modal.querySelector('.modal-content')?.setAttribute('role', 'dialog');
                modal.querySelector('.modal-content')?.setAttribute('aria-modal', 'true');
                addProjectOverview(modal, btn.closest('.project-card'));

                previousBodyOverflow = document.body.style.overflow;
                lastFocusedElement = btn;
                activeModal = modal;
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Bloque le scroll
                modal.querySelector('.close-btn')?.focus();
            }
            return;
        }

        // 2. Clic sur la croix (X) pour fermer
        const closeBtn = e.target.closest('.close-btn');
        if (closeBtn) {
            const modal = closeBtn.closest('.modal-overlay');
            closeModal(modal);
            return;
        }

        // 3. Clic à l'extérieur de la modale (sur le fond sombre)
        if (e.target.classList.contains('modal-overlay')) {
            closeModal(e.target);
        }
    });

    document.addEventListener('keydown', function(e) {
        if (!activeModal?.classList.contains('active')) return;

        if (e.key === 'Escape') {
            closeModal(activeModal);
            return;
        }

        if (e.key === 'Tab') {
            const focusableElements = Array.from(activeModal.querySelectorAll(
                'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
            ));
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (!firstElement) {
                e.preventDefault();
            } else if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    });
}