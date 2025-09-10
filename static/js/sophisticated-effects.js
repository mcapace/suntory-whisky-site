// Sophisticated Effects for T-Brand Studio Level Suntory Website
// Clean, elegant interactions inspired by top luxury brands

class SophisticatedEffects {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupParallaxEffects();
        this.setupElegantInteractions();
        this.setupSmoothScrolling();
        this.setupPerformanceOptimizations();
    }

    // Sophisticated Scroll Animations
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const element = entry.target;
                
                if (entry.isIntersecting) {
                    element.classList.add('animated');
                    
                    // Staggered animations for product cards
                    if (element.classList.contains('animate-scale')) {
                        const siblings = element.parentElement.querySelectorAll('.animate-scale');
                        siblings.forEach((sibling, index) => {
                            setTimeout(() => {
                                sibling.classList.add('animated');
                            }, index * 150);
                        });
                    }
                }
            });
        }, observerOptions);

        // Observe all animated elements
        document.querySelectorAll('.animate-on-scroll, .animate-left, .animate-right, .animate-scale').forEach(el => {
            observer.observe(el);
        });
    }

    // Subtle Parallax Effects
    setupParallaxEffects() {
        const parallaxElements = document.querySelectorAll('.quote-section, .philosophy-section');
        
        if (!parallaxElements.length) return;

        let ticking = false;

        const updateParallax = () => {
            parallaxElements.forEach(section => {
                const img = section.querySelector('img');
                if (!img) return;

                const rect = section.getBoundingClientRect();
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.2; // Subtle parallax

                // Only apply parallax when element is in viewport
                if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
                    img.style.transform = `translate3d(0, ${rate}px, 0)`;
                }
            });
            ticking = false;
        };

        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestTick, { passive: true });
    }

    // Elegant Interactions
    setupElegantInteractions() {
        this.setupProductCardHovers();
        this.setupSmoothTransitions();
    }

    setupProductCardHovers() {
        const productCards = document.querySelectorAll('.product-card');
        
        productCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-4px)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });
    }

    setupSmoothTransitions() {
        // Add smooth transitions to interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .product-card, .shop-button');
        
        interactiveElements.forEach(el => {
            el.style.transition = 'all 0.4s ease-out';
        });
    }

    // Smooth Scrolling
    setupSmoothScrolling() {
        // Enhanced smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Performance Optimizations
    setupPerformanceOptimizations() {
        // Debounce scroll events
        this.debounceScroll();
        
        // Optimize animations for performance
        this.optimizeAnimations();
    }

    debounceScroll() {
        let scrollTimeout;
        
        const debouncedScroll = () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                // Scroll-based effects here
            }, 10);
        };
        
        window.addEventListener('scroll', debouncedScroll, { passive: true });
    }

    optimizeAnimations() {
        // Use transform and opacity for better performance
        const animatedElements = document.querySelectorAll('.animate-on-scroll, .animate-left, .animate-right, .animate-scale');
        animatedElements.forEach(el => {
            el.style.willChange = 'transform, opacity';
        });
    }
}

// Initialize sophisticated effects when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SophisticatedEffects();
});

// Add CSS for sophisticated animations
const sophisticatedStyles = document.createElement('style');
sophisticatedStyles.textContent = `
    /* Sophisticated scroll animations */
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.8s ease-out;
    }

    .animate-on-scroll.animated {
        opacity: 1;
        transform: translateY(0);
    }

    .animate-left {
        opacity: 0;
        transform: translateX(-20px);
        transition: all 0.8s ease-out;
    }

    .animate-left.animated {
        opacity: 1;
        transform: translateX(0);
    }

    .animate-right {
        opacity: 0;
        transform: translateX(20px);
        transition: all 0.8s ease-out;
    }

    .animate-right.animated {
        opacity: 1;
        transform: translateX(0);
    }

    .animate-scale {
        opacity: 0;
        transform: scale(0.95);
        transition: all 0.8s ease-out;
    }

    .animate-scale.animated {
        opacity: 1;
        transform: scale(1);
    }
`;
document.head.appendChild(sophisticatedStyles);
