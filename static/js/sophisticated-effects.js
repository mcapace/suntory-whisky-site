// Premium Interactive Features for Suntory Website
// Smooth animations, bottle hover effects, timeline progression, and parallax

class PremiumInteractions {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupBottleHoverEffects();
        this.setupTimelineProgression();
        this.setupParallaxEffects();
        this.setupTextFadeIns();
        this.setupSmoothTransitions();
        this.setupPerformanceOptimizations();
    }

    // Smooth Scroll Animations for Section Reveals
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
                    
                    // Staggered animations for timeline steps
                    if (element.classList.contains('timeline-step')) {
                        const siblings = element.parentElement.querySelectorAll('.timeline-step');
                        siblings.forEach((sibling, index) => {
                            setTimeout(() => {
                                sibling.classList.add('animated');
                            }, index * 200);
                        });
                    }
                    
                    // Staggered animations for product cards
                    if (element.classList.contains('product-card')) {
                        const siblings = element.parentElement.querySelectorAll('.product-card');
                        siblings.forEach((sibling, index) => {
                            setTimeout(() => {
                                sibling.classList.add('animated');
                            }, index * 150);
                        });
                    }
                    
                    // Staggered animations for ingredient items
                    if (element.classList.contains('ingredient-item')) {
                        const siblings = element.parentElement.querySelectorAll('.ingredient-item');
                        siblings.forEach((sibling, index) => {
                            setTimeout(() => {
                                sibling.classList.add('animated');
                            }, index * 100);
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

    // Bottle Hover Effects (Subtle Lift, Not Rotation)
    setupBottleHoverEffects() {
        const bottles = document.querySelectorAll('.product-img');
        
        bottles.forEach(bottle => {
            bottle.addEventListener('mouseenter', () => {
                bottle.style.transform = 'scale(1.02) translateY(-2px)';
                bottle.style.transition = 'transform 0.3s ease-out';
            });
            
            bottle.addEventListener('mouseleave', () => {
                bottle.style.transform = 'scale(1) translateY(0)';
            });
        });
    }

    // Timeline Step Progression on Scroll
    setupTimelineProgression() {
        const timelineSteps = document.querySelectorAll('.timeline-step');
        
        if (!timelineSteps.length) return;

        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const step = entry.target;
                    const number = step.querySelector('.timeline-number');
                    
                    // Animate the number
                    number.style.transform = 'scale(1.1)';
                    number.style.transition = 'transform 0.3s ease-out';
                    
                    setTimeout(() => {
                        number.style.transform = 'scale(1)';
                    }, 300);
                }
            });
        }, { threshold: 0.5 });

        timelineSteps.forEach(step => {
            timelineObserver.observe(step);
        });
    }

    // Image Parallax (Keeping All Original Photos)
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

    // Text Fade-ins for Quotes and Descriptions
    setupTextFadeIns() {
        const textElements = document.querySelectorAll('.quote-text, .philosophy-content p, .content-text p');
        
        const textObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.3 });

        textElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            textObserver.observe(el);
        });
    }

    // Smooth Transitions Between Sections
    setupSmoothTransitions() {
        // Add smooth transitions to interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .product-card, .shop-button, .timeline-step, .ingredient-item');
        
        interactiveElements.forEach(el => {
            el.style.transition = 'all 0.4s ease-out';
        });
    }

    // Performance Optimizations
    setupPerformanceOptimizations() {
        // Debounce scroll events
        this.debounceScroll();
        
        // Optimize animations for performance
        this.optimizeAnimations();
        
        // Lazy load images
        this.setupLazyLoading();
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

    setupLazyLoading() {
        const images = document.querySelectorAll('img');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.style.opacity = '0';
                    img.style.transition = 'opacity 0.5s ease-out';
                    
                    img.onload = () => {
                        img.style.opacity = '1';
                    };
                    
                    observer.unobserve(img);
                }
            });
        }, { threshold: 0.1 });

        images.forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Initialize premium interactions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PremiumInteractions();
});

// Add CSS for premium animations
const premiumStyles = document.createElement('style');
premiumStyles.textContent = `
    /* Premium scroll animations */
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

    /* Smooth transitions for all interactive elements */
    a, button, .product-card, .shop-button, .timeline-step, .ingredient-item {
        transition: all 0.4s ease-out;
    }

    /* Enhanced hover effects */
    .product-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    }

    .timeline-step:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    }

    .ingredient-item:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    }

    /* Smooth image loading */
    img {
        transition: opacity 0.5s ease-out;
    }
`;
document.head.appendChild(premiumStyles);