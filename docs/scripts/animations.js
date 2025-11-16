// Utility function for debouncing
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Animation and Mobile Navigation initialization
document.addEventListener('DOMContentLoaded', function() {
    // Animation on scroll (AOS) initialization with bi-directional animations
    AOS.init({
        duration: 1000,
        once: false,
        mirror: true,
        offset: 50,
        anchorPlacement: 'top-bottom',
        easing: 'ease-out-cubic',
        disable: false,
        startEvent: 'DOMContentLoaded'
    });
    
    // Force AOS refresh after a small delay to ensure proper initialization
    setTimeout(() => {
        AOS.refresh();
    }, 100);

    // Mobile Navigation
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const isExpanded = navLinks.classList.contains('active');
            navToggle.setAttribute('aria-expanded', isExpanded);
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });

        // Close mobile menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }    // Add window resize handler for smooth animations
    const handleResize = debounce(() => {
        AOS.refresh();
    }, 250);

    window.addEventListener('resize', handleResize);
});
