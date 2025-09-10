// Minimalist Luxury Effects for Suntory Website
// Clean, elegant interactions inspired by top luxury brands

class MinimalistEffects {
    constructor() {
        this.init();
    }

    init() {
        this.setupSubtleParallax();
        this.setupElegantScrollAnimations();
        this.setupMinimalistInteractions();
        this.setupSmoothScrolling();
    }

    // Subtle Parallax Effects
    setupSubtleParallax() {
        const parallaxElements = document.querySelectorAll('.parallax-container');
        
        if (!parallaxElements.length) return;

        let ticking = false;

        const updateParallax = () => {
            parallaxElements.forEach(container => {
                const img = container.querySelector('.banner-img');
                if (!img) return;

                const rect = container.getBoundingClientRect();
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.3; // Subtle parallax

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

    // Elegant Scroll Animations
    setupElegantScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const element = entry.target;
                
                if (entry.isIntersecting) {
                    element.classList.add('animated');
                    
                    // Staggered animations for bottle cards
                    if (element.classList.contains('animate-scale')) {
                        const siblings = element.parentElement.querySelectorAll('.animate-scale');
                        siblings.forEach((sibling, index) => {
                            setTimeout(() => {
                                sibling.classList.add('animated');
                            }, index * 200);
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

    // Minimalist Interactions
    setupMinimalistInteractions() {
        this.setupSubtleHoverEffects();
        this.setupElegantTransitions();
    }

    setupSubtleHoverEffects() {
        const bottles = document.querySelectorAll('.purchase-bottle');
        
        bottles.forEach(bottle => {
            bottle.addEventListener('mouseenter', () => {
                bottle.style.transform = 'translateY(-4px)';
            });
            
            bottle.addEventListener('mouseleave', () => {
                bottle.style.transform = 'translateY(0)';
            });
        });
    }

    setupElegantTransitions() {
        // Add smooth transitions to interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .purchase-bottle, .info-overlay');
        
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
}

// Initialize minimalist effects when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MinimalistEffects();
});

// Add CSS for minimalist animations
const minimalistStyles = document.createElement('style');
minimalistStyles.textContent = `
    /* Minimalist scroll animations */
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
        transform: translateX(-30px);
        transition: all 0.8s ease-out;
    }

    .animate-left.animated {
        opacity: 1;
        transform: translateX(0);
    }

    .animate-right {
        opacity: 0;
        transform: translateX(30px);
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
document.head.appendChild(minimalistStyles);
