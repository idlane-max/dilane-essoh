document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.querySelector('.cursor');
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
    }

    const terminalBody = document.querySelector('.terminal-body');
    if (terminalBody) {
        const lines = [
            '$ whoami',
            'dilane-essoh',
            '$ cat focus.txt',
            '[security, networking, linux, cloud, infra]',
            '$ sudo nmap --target cyber',
            'Scanning.. 0.0.0.0/24',
            '[+] Infrastructure & sécurité réseau',
            '$ ls /projects',
            'bastion-ssh | wireguard | packet-tracer | linux-hardening'
        ];

        let lineIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        const typeLoop = () => {
            const currentLine = lines[lineIndex] || '';
            const content = terminalBody.innerHTML.replace(/<br>/g, '\n');
            if (!isDeleting) {
                charIndex++;
                if (charIndex >= currentLine.length + 1) {
                    isDeleting = true;
                    setTimeout(typeLoop, 700);
                    return;
                }
            } else {
                charIndex--;
                if (charIndex <= 0) {
                    isDeleting = false;
                    lineIndex = (lineIndex + 1) % lines.length;
                }
            }

            const visible = currentLine.slice(0, charIndex);
            terminalBody.innerHTML = visible
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/\n/g, '<br>');

            const delay = isDeleting ? 25 : 60;
            setTimeout(typeLoop, delay);
        };

        setTimeout(typeLoop, 350);
    }
});

document.addEventListener('submit', async function(e) {
    if (e.target && e.target.id === 'cyber-contact-form') {
        e.preventDefault();

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
