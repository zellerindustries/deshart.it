/* ==========================================
   SCROLL ANIMATIONS
========================================== */

const scrollElements = document.querySelectorAll<HTMLElement>(".scroll-animation");

const observerOptions: IntersectionObserverInit = { threshold: 0.2 };

const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("appear");
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

scrollElements.forEach(el => scrollObserver.observe(el));

// Force appear on load for elements already in viewport
const forceAppearOnLoad = (): void => {
    scrollElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8 && !el.classList.contains("appear")) {
            el.classList.add("appear");
            scrollObserver.unobserve(el);
        }
    });
};

forceAppearOnLoad();

// Debounced resize to improve performance
let resizeTimeout: number | undefined;
window.addEventListener("resize", () => {
    if (resizeTimeout) clearTimeout(resizeTimeout);
    resizeTimeout = window.setTimeout(forceAppearOnLoad, 150);
});