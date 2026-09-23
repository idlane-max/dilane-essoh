/* Initialise le terminal uniquement quand le composant existe. */
document.addEventListener('DOMContentLoaded', () => {
    const terminal = document.querySelector('.terminal-body');
    if (!terminal || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

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
    let characterIndex = 0;
    let deleting = false;

    function render() {
        const line = lines[lineIndex];
        terminal.textContent = line.slice(0, characterIndex);

        if (!deleting) {
            characterIndex += 1;
            if (characterIndex > line.length) {
                deleting = true;
                setTimeout(render, 850);
                return;
            }
        } else {
            characterIndex -= 1;
            if (characterIndex < 0) {
                characterIndex = 0;
                deleting = false;
                lineIndex = (lineIndex + 1) % lines.length;
            }
        }

        setTimeout(render, deleting ? 24 : 55);
    }

    render();
});
