// scripts/portefeuille.js
if (!window.portefeuilleModalsInitialized) {
    window.portefeuilleModalsInitialized = true;

    function setModalAccessibility() {
        document.querySelectorAll('.modal-overlay').forEach(modal => {
            modal.setAttribute('role', 'dialog');
            modal.setAttribute('aria-modal', 'true');
            modal.setAttribute('aria-hidden', 'true');
            modal.setAttribute('tabindex', '-1');

            const closeBtn = modal.querySelector('.close-btn');
            if (closeBtn) {
                closeBtn.setAttribute('type', 'button');
                closeBtn.setAttribute('aria-label', 'Fermer la modale');
            }
        });
    }

    setModalAccessibility();

    document.addEventListener('click', function (e) {
        const btn = e.target.closest('.btn-details');
        if (btn) {
            const targetModalId = btn.getAttribute('data-modal');
            const modal = document.getElementById(targetModalId);
            if (modal) {
                modal.classList.add('active');
                modal.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden';

                const closeBtn = modal.querySelector('.close-btn');
                if (closeBtn) {
                    setTimeout(() => closeBtn.focus(), 50);
                }
            }
            return;
        }

        const closeBtn = e.target.closest('.close-btn');
        if (closeBtn) {
            const modal = closeBtn.closest('.modal-overlay');
            if (modal) {
                modal.classList.remove('active');
                modal.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
                const trigger = document.querySelector('[data-modal-open="' + modal.id + '"]');
                if (trigger) trigger.focus();
            }
            return;
        }

        if (e.target.classList.contains('modal-overlay')) {
            const modal = e.target.closest('.modal-overlay');
            if (modal) {
                modal.classList.remove('active');
                modal.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
            }
        }
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal-overlay.active');
            if (activeModal) {
                activeModal.classList.remove('active');
                activeModal.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
            }
        }
    });
}
