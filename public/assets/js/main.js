document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Logic (Overlay & Drawer)
    const menuBtn = document.getElementById('mobile-menu-btn');
    const menuCloseBtn = document.getElementById('mobile-menu-close');
    const overlay = document.getElementById('mobile-menu-overlay');
    const drawer = document.getElementById('mobile-menu-drawer');

    function toggleMenu(isOpen) {
        if (isOpen) {
            overlay.classList.remove('opacity-0', 'pointer-events-none');
            overlay.classList.add('opacity-100', 'pointer-events-auto');
            drawer.classList.remove('translate-x-full');
            drawer.classList.add('translate-x-0');
            document.body.classList.add('menu-open'); // Using CSS class for lock
        } else {
            overlay.classList.add('opacity-0', 'pointer-events-none');
            overlay.classList.remove('opacity-100', 'pointer-events-auto');
            drawer.classList.add('translate-x-full');
            drawer.classList.remove('translate-x-0');
            document.body.classList.remove('menu-open'); // Using CSS class for unlock
        }
    }

    if (menuBtn && menuCloseBtn && overlay) {
        menuBtn.addEventListener('click', () => toggleMenu(true));
        menuCloseBtn.addEventListener('click', () => toggleMenu(false));
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) toggleMenu(false);
        });
    }

    // 2. Active Link Highlighting
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath) {
            link.classList.remove('text-slate-600');
            link.classList.add('text-primary', 'font-bold', 'active');
        }
    });

    // 3. Contact Form Feedback (if exists)
    const contactForm = document.querySelector('form');
    if (contactForm && window.location.pathname.includes('contato.html')) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;

            btn.innerText = 'Enviando...';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerText = 'Solicitação Enviada com Sucesso!';
                btn.classList.replace('bg-primary', 'bg-green-600');
                contactForm.reset();

                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.classList.replace('bg-green-600', 'bg-primary');
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }

    // 4. AOS Initialization (Deferred until script load)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100
        });
    }
});