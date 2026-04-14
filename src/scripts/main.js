/**
 * ContábilPro — Main JavaScript v2.0
 * Correções: form selector, FAQ accordion, loading states, a11y
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. Mobile Menu Logic
    // ==========================================
    const menuBtn = document.getElementById('mobile-menu-btn');
    const menuCloseBtn = document.getElementById('mobile-menu-close');
    const overlay = document.getElementById('mobile-menu-overlay');
    const drawer = document.getElementById('mobile-menu-drawer');

    function toggleMenu(isOpen) {
        if (!overlay || !drawer) return;

        if (isOpen) {
            overlay.classList.remove('opacity-0', 'pointer-events-none');
            overlay.classList.add('opacity-100', 'pointer-events-auto');
            drawer.classList.remove('translate-x-full');
            drawer.classList.add('translate-x-0');
            document.body.classList.add('menu-open');
            menuBtn?.setAttribute('aria-expanded', 'true');
            // Trap focus inside drawer
            drawer.querySelector('a, button')?.focus();
        } else {
            overlay.classList.add('opacity-0', 'pointer-events-none');
            overlay.classList.remove('opacity-100', 'pointer-events-auto');
            drawer.classList.add('translate-x-full');
            drawer.classList.remove('translate-x-0');
            document.body.classList.remove('menu-open');
            menuBtn?.setAttribute('aria-expanded', 'false');
            menuBtn?.focus();
        }
    }

    if (menuBtn && menuCloseBtn && overlay) {
        menuBtn.addEventListener('click', () => toggleMenu(true));
        menuCloseBtn.addEventListener('click', () => toggleMenu(false));
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) toggleMenu(false);
        });
        // ESC key closes menu
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !overlay.classList.contains('pointer-events-none')) {
                toggleMenu(false);
            }
        });
    }

    // ==========================================
    // 2. Active Link Highlighting
    // ==========================================
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath === '' && href === 'index.html') || (currentPath === 'index.html' && href === '/')) {
            link.classList.remove('text-slate-600');
            link.classList.add('text-primary', 'font-bold', 'active');
            link.setAttribute('aria-current', 'page');
        }
    });

    // ==========================================
    // 3. FAQ Accordion (servicos.html)
    // ==========================================
    document.querySelectorAll('.faq-item button.faq-toggle').forEach(btn => {
        const content = btn.closest('.faq-item')?.querySelector('.faq-content');
        const icon = btn.querySelector('.material-symbols-outlined');

        if (!content) return;

        btn.addEventListener('click', () => {
            const isOpen = btn.getAttribute('aria-expanded') === 'true';

            // Close all others
            document.querySelectorAll('.faq-item button.faq-toggle').forEach(otherBtn => {
                if (otherBtn !== btn) {
                    const otherContent = otherBtn.closest('.faq-item')?.querySelector('.faq-content');
                    const otherIcon = otherBtn.querySelector('.material-symbols-outlined');
                    otherContent?.classList.add('hidden');
                    otherBtn.setAttribute('aria-expanded', 'false');
                    if (otherIcon) {
                        otherIcon.textContent = 'add';
                        otherIcon.style.fontVariationSettings = "'FILL' 0";
                    }
                }
            });

            // Toggle current
            content.classList.toggle('hidden');
            btn.setAttribute('aria-expanded', String(!isOpen));
            if (icon) {
                icon.textContent = !isOpen ? 'remove' : 'add';
                icon.style.fontVariationSettings = `'FILL' ${!isOpen ? 1 : 0}`;
            }
        });
    });

    // ==========================================
    // 4. Service & Blog Filters
    // ==========================================
    function setupFilter(filterContainerSelector, targetSelector) {
        const container = document.querySelector(filterContainerSelector);
        if (!container) return;

        const buttons = container.querySelectorAll('button');
        const targets = document.querySelectorAll(targetSelector);

        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.textContent.trim().toLowerCase();

                // Update active button
                buttons.forEach(b => {
                    b.classList.remove('bg-primary', 'text-white', 'shadow-md');
                    b.classList.add('bg-surface-container-low', 'text-on-surface');
                });
                btn.classList.add('bg-primary', 'text-white', 'shadow-md');
                btn.classList.remove('bg-surface-container-low', 'text-on-surface');

                // Filter targets
                targets.forEach(target => {
                    if (filter === 'todos' || filter === 'todos') {
                        target.style.display = '';
                    } else {
                        const tags = target.getAttribute('data-tags') || '';
                        const match = tags.toLowerCase().includes(filter);
                        target.style.display = match ? '' : 'none';
                    }
                });
            });
        });
    }

    setupFilter('#servicos-filtros', '.service-card');
    setupFilter('#blog-filtros', '.blog-card');

    // ==========================================
    // 5. Contact Form Handler
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            if (!btn) return;

            const originalText = btn.textContent;

            // Loading state
            btn.classList.add('btn-loading');
            btn.disabled = true;
            btn.setAttribute('aria-busy', 'true');

            try {
                const formData = new FormData(contactForm);
                // ⚠️ Substituir pelo endpoint Formspree real
                const action = contactForm.getAttribute('action') || '/api/contato';

                const response = await fetch(action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    btn.classList.remove('btn-loading');
                    btn.textContent = '✓ Enviado com sucesso!';
                    btn.classList.add('bg-green-600');
                    btn.classList.remove('from-primary', 'to-primary-container');
                    contactForm.reset();
                } else {
                    throw new Error('Erro no servidor');
                }
            } catch (err) {
                // Fallback: simula sucesso para demonstração
                btn.classList.remove('btn-loading');
                btn.textContent = '✓ Solicitação recebida! Entraremos em contato em 24h.';
                btn.classList.add('bg-green-600');
                contactForm.reset();
            }

            setTimeout(() => {
                btn.textContent = originalText;
                btn.disabled = false;
                btn.classList.remove('bg-green-600');
                btn.classList.add('from-primary', 'to-primary-container');
                btn.setAttribute('aria-busy', 'false');
            }, 5000);
        });
    }

    // ==========================================
    // 6. CTA Form (index.html) Handler
    // ==========================================
    const ctaForm = document.getElementById('cta-form');
    if (ctaForm) {
        ctaForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = ctaForm.querySelector('button[type="submit"]');
            if (!btn) return;

            const originalText = btn.textContent;
            btn.classList.add('btn-loading');
            btn.disabled = true;

            // ⚠️ Substituir pelo endpoint real
            const action = ctaForm.getAttribute('action') || '/api/lead';

            try {
                await fetch(action, {
                    method: 'POST',
                    body: new FormData(ctaForm),
                    headers: { 'Accept': 'application/json' }
                });
            } catch (err) {
                // Fallback para demo
            }

            btn.classList.remove('btn-loading');
            btn.textContent = '✓ Recebemos seus dados!';
            btn.classList.add('bg-green-600');
            ctaForm.reset();

            setTimeout(() => {
                btn.textContent = originalText;
                btn.disabled = false;
                btn.classList.remove('bg-green-600');
            }, 4000);
        });
    }

    // ==========================================
    // 7. Newsletter Form Handler
    // ==========================================
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = newsletterForm.querySelector('button[type="submit"]');
            if (!btn) return;

            const originalText = btn.textContent;
            btn.textContent = 'Enviando...';
            btn.disabled = true;

            setTimeout(() => {
                btn.textContent = '✓ Inscrito!';
                newsletterForm.reset();
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.disabled = false;
                }, 3000);
            }, 1000);
        });
    }

    // ==========================================
    // 8. AOS Initialization
    // ==========================================
    if (typeof AOS !== 'undefined') {
        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        AOS.init({
            duration: prefersReducedMotion ? 1 : 800,
            once: true,
            offset: 100,
            disable: prefersReducedMotion ? 'phone' : false
        });
    }

    // ==========================================
    // 9. Smooth Scroll for Anchor Links
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
