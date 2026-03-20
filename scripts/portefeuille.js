// scripts/portefeuille.js

// Sécurité SPA : On vérifie que le script n'a pas déjà été initialisé 
// pour éviter d'ajouter les événements en double quand on navigue entre les pages.
if (!window.portefeuilleModalsInitialized) {
    window.portefeuilleModalsInitialized = true;

    // On utilise la "Délégation d'événements" sur le document.
    // C'est parfait pour le contenu injecté dynamiquement  !
    document.addEventListener('click', function(e) {
        
        // 1. Clic sur le bouton "Voir les détails"
        const btn = e.target.closest('.btn-details');
        if (btn) {
            const targetModalId = btn.getAttribute('data-modal');
            const modal = document.getElementById(targetModalId);
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Bloque le scroll
            }
            return;
        }

        // 2. Clic sur la croix (X) pour fermer
        const closeBtn = e.target.closest('.close-btn');
        if (closeBtn) {
            const modal = closeBtn.closest('.modal-overlay');
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto'; // Réactive le scroll
            }
            return;
        }

        // 3. Clic à l'extérieur de la modale (sur le fond sombre)
        if (e.target.classList.contains('modal-overlay')) {
            e.target.classList.remove('active');
            document.body.style.overflow = 'auto'; // Réactive le scroll
        }
    });
}