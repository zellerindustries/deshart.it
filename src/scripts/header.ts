/* ==========================================
   MOBILE NAV TOGGLE
========================================== */

const header = document.getElementById('site-header');
const nav = document.querySelector<HTMLElement>('nav');
const menuToggle = document.getElementById('menu-toggle');
const primaryMenu = document.getElementById('primary-menu');
const navMenu = document.getElementById('primary-menu');
const scrollThreshold = 50;

/* --- Scroll handling --- */
const onScroll = (): void => {
    const scrolled = window.scrollY > scrollThreshold;
    if (header) header.classList.toggle('scrolled', scrolled);
    if (nav) nav.classList.toggle('scrolled', scrolled);
};

/* --- Smooth scroll --- */
document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e: MouseEvent) => {
        const target = document.querySelector<HTMLElement>(link.hash);
        if (!target) return;

        e.preventDefault();
        target.setAttribute('tabindex', '-1');
        target.scrollIntoView({ behavior: 'smooth' });
        target.focus({ preventScroll: true });

        if (navMenu?.classList.contains('active')) toggleMenu(false);
    });
});

/* --- Toggle hamburger menu --- */
const toggleMenu = (force?: boolean): void => {
    if (!menuToggle || !primaryMenu || !navMenu) return;

    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    const shouldOpen = typeof force === 'boolean' ? force : !expanded;

    menuToggle.setAttribute('aria-expanded', String(shouldOpen));
    primaryMenu.toggleAttribute('hidden', !shouldOpen);
    navMenu.classList.toggle('active', shouldOpen);
    menuToggle.classList.toggle('open', shouldOpen);

    const method: 'addEventListener' | 'removeEventListener' = shouldOpen
        ? 'addEventListener'
        : 'removeEventListener';

    document[method]('click', outsideClickListener as EventListener);
};

menuToggle?.addEventListener('click', () => toggleMenu());

const outsideClickListener = (e: Event): void => {
    const target = e.target as Node;
    if (!navMenu?.contains(target) && !menuToggle?.contains(target)) {
        toggleMenu(false);
    }
};

/* ==========================================
   HEADER SCROLL EFFECT
========================================== */

const handleHeaderScroll = (): void => {
    if (!header) return;

    if (window.scrollY > scrollThreshold) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
};

// Attach scroll listener with passive option for performance
window.addEventListener('scroll', handleHeaderScroll, { passive: true });
window.addEventListener('scroll', onScroll);

// Run once on init in case the page is already scrolled
handleHeaderScroll();
onScroll();