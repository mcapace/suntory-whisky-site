// Premium Effects for State-of-the-Art Suntory Website
// Advanced parallax, scroll animations, and premium interactions

class PremiumEffects {
    constructor() {
        this.init();
    }

    init() {
        this.setupAdvancedParallax();
        this.setupScrollAnimations();
        this.setupPremiumInteractions();
        this.setupSmoothScrolling();
        this.setupPerformanceOptimizations();
    }

    // Advanced Parallax System
    setupAdvancedParallax() {
        const parallaxElements = document.querySelectorAll('.parallax-container');
        
        if (!parallaxElements.length) return;

        let ticking = false;

        const updateParallax = () => {
            parallaxElements.forEach(container => {
                const img = container.querySelector('.banner-img');
                if (!img) return;

                const rect = container.getBoundingClientRect();
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;
                const yPos = rect.top + scrolled + rate;

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
        window.addEventListener('resize', requestTick, { passive: true });
    }

    // Advanced Scroll Animations
    setupScrollAnimations() {
        const observerOptions = {
            threshold: [0, 0.1, 0.5, 1],
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const element = entry.target;
                const ratio = entry.intersectionRatio;

                if (entry.isIntersecting) {
                    element.classList.add('animated');
                    
                    // Staggered animations for multiple elements
                    if (element.classList.contains('animate-scale')) {
                        const siblings = element.parentElement.querySelectorAll('.animate-scale');
                        siblings.forEach((sibling, index) => {
                            setTimeout(() => {
                                sibling.classList.add('animated');
                            }, index * 150);
                        });
                    }

                    // Progressive reveal based on scroll ratio
                    if (ratio > 0.5) {
                        element.style.opacity = Math.min(1, ratio * 2);
                    }
                } else {
                    element.classList.remove('animated');
                    element.style.opacity = '0';
                }
            });
        }, observerOptions);

        // Observe all animated elements
        document.querySelectorAll('.animate-on-scroll, .animate-left, .animate-right, .animate-scale').forEach(el => {
            observer.observe(el);
        });
    }

    // Premium Interactions
    setupPremiumInteractions() {
        this.setupMagneticCursor();
        this.setupAdvancedHoverEffects();
        this.setupSmoothTransitions();
    }

    setupMagneticCursor() {
        const magneticElements = document.querySelectorAll('.purchase-bottle');
        
        magneticElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                const distance = Math.sqrt(x * x + y * y);
                const maxDistance = 100;
                
                if (distance < maxDistance) {
                    const strength = (maxDistance - distance) / maxDistance;
                    const moveX = x * strength * 0.2;
                    const moveY = y * strength * 0.2;
                    
                    element.style.transform = `translate(${moveX}px, ${moveY}px)`;
                }
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = '';
            });
        });
    }

    setupAdvancedHoverEffects() {
        const bottles = document.querySelectorAll('.purchase-bottle img');
        
        bottles.forEach(img => {
            img.addEventListener('mouseenter', () => {
                img.style.filter = 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.3)) brightness(1.1)';
            });
            
            img.addEventListener('mouseleave', () => {
                img.style.filter = 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.1)) brightness(1)';
            });
        });
    }

    setupSmoothTransitions() {
        // Add smooth transitions to all interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .purchase-bottle, .info-overlay');
        
        interactiveElements.forEach(el => {
            el.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });
    }

    // Smooth Scrolling Enhancement
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

        // Scroll progress indicator
        this.createScrollProgress();
    }

    createScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, var(--orange), var(--orange-light));
            z-index: 1000;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
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
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => {
            img.classList.add('lazy');
            imageObserver.observe(img);
        });
    }
}

// Enhanced Parallax for Banner Images
class AdvancedParallax {
    constructor() {
        this.init();
    }

    init() {
        this.setupBannerParallax();
    }

    setupBannerParallax() {
        const banners = document.querySelectorAll('.banner-wrapper');
        
        banners.forEach(banner => {
            const img = banner.querySelector('.banner-img');
            if (!img) return;

            let ticking = false;

            const updateBanner = () => {
                const rect = banner.getBoundingClientRect();
                const scrolled = window.pageYOffset;
                
                // Only apply parallax when banner is in viewport
                if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
                    const speed = 0.5;
                    const yPos = -(scrolled * speed);
                    img.style.transform = `translate3d(0, ${yPos}px, 0)`;
                }
                
                ticking = false;
            };

            const requestTick = () => {
                if (!ticking) {
                    requestAnimationFrame(updateBanner);
                    ticking = true;
                }
            };

            window.addEventListener('scroll', requestTick, { passive: true });
        });
    }
}

// Text Reveal Animations
class TextReveal {
    constructor() {
        this.init();
    }

    init() {
        this.setupTextReveal();
    }

    setupTextReveal() {
        const textElements = document.querySelectorAll('h1, h2, h3, p');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                }
            });
        }, { threshold: 0.1 });

        textElements.forEach(el => {
            el.style.opacity = '0';
            observer.observe(el);
        });
    }
}

// Initialize all premium effects when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PremiumEffects();
    new AdvancedParallax();
    new TextReveal();
});

// Add CSS for enhanced animations
const enhancedStyles = document.createElement('style');
enhancedStyles.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes scaleIn {
        from {
            opacity: 0;
            transform: scale(0.8);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }

    .lazy {
        opacity: 0;
        transition: opacity 0.3s;
    }

    .lazy.loaded {
        opacity: 1;
    }

    /* Enhanced scroll animations */
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    .animate-on-scroll.animated {
        opacity: 1;
        transform: translateY(0);
    }

    .animate-left {
        opacity: 0;
        transform: translateX(-50px);
        transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    .animate-left.animated {
        opacity: 1;
        transform: translateX(0);
    }

    .animate-right {
        opacity: 0;
        transform: translateX(50px);
        transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    .animate-right.animated {
        opacity: 1;
        transform: translateX(0);
    }

    .animate-scale {
        opacity: 0;
        transform: scale(0.8);
        transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    .animate-scale.animated {
        opacity: 1;
        transform: scale(1);
    }
`;
document.head.appendChild(enhancedStyles);
