document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.querySelector('.cursor');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
});

// Gestion de la soumission du formulaire de contact (Compatible SPA)
document.addEventListener('submit', async function(e) {
    // On vérifie si c'est bien notre formulaire de contact qui est soumis
    if (e.target && e.target.id === 'cyber-contact-form') {
        e.preventDefault(); // Empêche le rechargement de la page

        const form = e.target;
        const status = form.querySelector('#contact-status');
        const submitBtn = form.querySelector('.btn-submit');
        const endpoint = form.getAttribute('action') || '';

        if (!endpoint || endpoint.includes('REPLACE_WITH_YOUR_FORM_ID')) {
            if (status) {
                status.textContent = 'Configurez d abord votre endpoint Formspree dans le formulaire contact.';
                status.classList.remove('success');
                status.classList.add('error');
            }
            return;
        }

        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Envoi en cours...';
        }

        if (status) {
            status.textContent = '';
            status.classList.remove('success', 'error');
        }

        try {
            const formData = new FormData(form);
            const response = await fetch(endpoint, {
                method: 'POST',
                body: formData,
                headers: {
                    Accept: 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Echec de l envoi');
            }

            form.reset();
            if (status) {
                status.textContent = 'Message envoye avec succes. Merci, je vous repondrai rapidement.';
                status.classList.remove('error');
                status.classList.add('success');
            }
        } catch (error) {
            if (status) {
                status.textContent = 'Erreur lors de l envoi. Merci de reessayer ou de me contacter par email.';
                status.classList.remove('success');
                status.classList.add('error');
            }
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Envoyer';
            }
        }
    }
});