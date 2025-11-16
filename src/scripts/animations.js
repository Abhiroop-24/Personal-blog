document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('[data-animate]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, {
        threshold: 0.2, // Trigger when 20% of the element is visible
    });

    animatedElements.forEach((el) => observer.observe(el));

    window.addEventListener('scroll', debounce(handleScroll));
    handleScroll(); // Trigger on page load

    // Pro-level JS animations using Intersection Observer for reveal effects

    const revealElements = document.querySelectorAll('[data-animate]');
    const revealObserver = new window.IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Parallax effect for hero background
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const offset = window.scrollY * 0.3;
            hero.style.backgroundPosition = `center ${offset}px`;
        });
    }
});
