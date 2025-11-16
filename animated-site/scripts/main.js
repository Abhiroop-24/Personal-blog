// ========================================
// Particle Animation for Welcome Overlay
// ========================================
function initParticles() {
    const canvas = document.getElementById('particlesCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrameId;

    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.color = `hsla(${Math.random() * 60 + 180}, 70%, 60%, ${Math.random() * 0.5 + 0.3})`;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width || this.x < 0) {
                this.speedX = -this.speedX;
            }
            if (this.y > canvas.height || this.y < 0) {
                this.speedY = -this.speedY;
            }
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }
    }

    // Create particles
    function createParticles() {
        const particleCount = window.innerWidth < 768 ? 30 : 50;
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
            
            // Draw connections
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.strokeStyle = `rgba(0, 198, 255, ${1 - distance / 100})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        
        animationFrameId = requestAnimationFrame(animate);
    }

    createParticles();
    animate();

    // Stop animation when overlay is removed
    setTimeout(() => {
        cancelAnimationFrame(animationFrameId);
    }, 5000);
}

// ========================================
// Welcome Overlay Handler
// ========================================
function handleWelcomeOverlay() {
    const overlay = document.getElementById('welcomeOverlay');
    const mainContent = document.getElementById('mainContent');
    
    if (overlay && mainContent) {
        // Initialize typing effect
        const title = document.getElementById('typingTitle');
        const subtitle = document.getElementById('typingSubtitle');
        
        // Remove welcome overlay after animation
        setTimeout(() => {
            overlay.style.transition = 'opacity 1s ease-out';
            overlay.style.opacity = '0';
            
            setTimeout(() => {
                overlay.remove();
            }, 1000);
        }, 4000);
    }
}

// ========================================
// Navbar Scroll Effect
// ========================================
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navLinkItems = document.querySelectorAll('.nav-link');
    
    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
        
        // Close menu when clicking nav links
        navLinkItems.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        });
    }
}

// ========================================
// Smooth Scroll for Anchor Links
// ========================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// Scroll Animation Observer
// ========================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe sections
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });
}

// ========================================
// Back to Top Button
// ========================================
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ========================================
// Contact Form Handler
// ========================================
function initContactForm() {
    const form = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = {
                name: form.name.value,
                email: form.email.value,
                message: form.message.value
            };
            
            // Show loading state
            formStatus.textContent = 'Sending...';
            formStatus.style.background = 'rgba(0, 198, 255, 0.1)';
            formStatus.style.color = 'var(--primary-color)';
            
            try {
                // Simulate form submission (replace with actual API endpoint)
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Success state
                formStatus.textContent = 'Thank you for your message! I\'ll get back to you soon.';
                formStatus.style.background = 'rgba(76, 175, 80, 0.1)';
                formStatus.style.color = '#4caf50';
                form.reset();
                
                // Clear status after 5 seconds
                setTimeout(() => {
                    formStatus.textContent = '';
                    formStatus.style.background = 'transparent';
                }, 5000);
                
            } catch (error) {
                // Error state
                formStatus.textContent = 'Oops! Something went wrong. Please try again.';
                formStatus.style.background = 'rgba(244, 67, 54, 0.1)';
                formStatus.style.color = '#f44336';
            }
        });
    }
}

// ========================================
// Ripple Effect on Buttons
// ========================================
function initRippleEffect() {
    document.querySelectorAll('.ripple-effect').forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                left: ${x}px;
                top: ${y}px;
                width: 0;
                height: 0;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.5);
                transform: translate(-50%, -50%);
                animation: ripple 0.6s ease-out;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Add ripple animation to stylesheet dynamically
    if (!document.querySelector('#ripple-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-style';
        style.textContent = `
            @keyframes ripple {
                to {
                    width: 300px;
                    height: 300px;
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// ========================================
// Parallax Effect on Scroll
// ========================================
function initParallax() {
    const parallaxElements = document.querySelectorAll('.floating-shapes .shape');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach((element, index) => {
            const speed = (index + 1) * 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// ========================================
// Add Hover Effects to Cards
// ========================================
function initCardEffects() {
    document.querySelectorAll('.card-hover-effect').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ========================================
// Lazy Loading Images
// ========================================
function initLazyLoading() {
    const images = document.querySelectorAll('img[src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease';
                
                img.onload = () => {
                    img.style.opacity = '1';
                };
                
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ========================================
// Add Typing Effect to Text
// ========================================
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ========================================
// Performance Optimization
// ========================================
function debounce(func, wait = 20) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// ========================================
// Initialize All Functions
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize particles animation
    initParticles();
    
    // Handle welcome overlay
    handleWelcomeOverlay();
    
    // Initialize navbar
    initNavbar();
    
    // Initialize smooth scroll
    initSmoothScroll();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize back to top button
    initBackToTop();
    
    // Initialize contact form
    initContactForm();
    
    // Initialize ripple effects
    initRippleEffect();
    
    // Initialize parallax
    initParallax();
    
    // Initialize card effects
    initCardEffects();
    
    // Initialize lazy loading
    initLazyLoading();
    
    // Add loading complete class
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// ========================================
// Handle Page Visibility Change
// ========================================
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when page is hidden
        document.body.classList.add('paused');
    } else {
        // Resume animations when page is visible
        document.body.classList.remove('paused');
    }
});

// ========================================
// Console Easter Egg
// ========================================
console.log('%c🎨 Welcome to my portfolio! %c', 
    'color: #00c6ff; font-size: 20px; font-weight: bold;',
    'color: #fff; font-size: 14px;'
);
console.log('%cInterested in the code? Check out the repository!', 
    'color: #0072ff; font-size: 14px;'
);
