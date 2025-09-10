// Advanced Animations and Interactions

document.addEventListener("DOMContentLoaded", () => {
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Special handling for ingredient bars
                if (entry.target.classList.contains('ingredient-item')) {
                    animateIngredientBar(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe elements for animations
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        fadeInObserver.observe(el);
    });

    // Animate ingredient percentage bars
    function animateIngredientBar(item) {
        const bar = item.querySelector('.bar-fill');
        if (bar) {
            const percentage = bar.dataset.percentage;
            setTimeout(() => {
                bar.style.width = percentage + '%';
            }, 200);
        }
    }

    // Enhanced product card interactions
    document.querySelectorAll('.purchase-bottle').forEach(card => {
        const overlay = card.querySelector('.info-overlay');
        const img = card.querySelector('img');
        
        let hoverTimeout;
        
        card.addEventListener('mouseenter', () => {
            if (window.innerWidth > 767) { // Desktop only
                clearTimeout(hoverTimeout);
                overlay.style.opacity = '1';
                overlay.style.transform = 'scale(1.02)';
                img.style.transform = 'scale(1.05)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            if (window.innerWidth > 767) { // Desktop only
                hoverTimeout = setTimeout(() => {
                    overlay.style.opacity = '0';
                    overlay.style.transform = 'scale(1)';
                    img.style.transform = 'scale(1)';
                }, 100);
            }
        });
    });

    // Timeline step sequential animation
    function animateTimelineSteps() {
        const steps = document.querySelectorAll('.timeline-step');
        steps.forEach((step, index) => {
            step.style.animationDelay = `${index * 0.2}s`;
        });
    }

    // Parallax enhancement for hero section
    function enhancedHeroParallax() {
        const hero = document.querySelector('.hero');
        const heroImg = document.querySelector('.hero-img');
        
        if (!hero || !heroImg) return;
        
        window.addEventListener('scroll', () => {
            if (window.innerWidth > 768) {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.3;
                heroImg.style.transform = `translateY(${rate}px)`;
            }
        }, { passive: true });
    }

    // Initialize enhanced parallax
    enhancedHeroParallax();

    // Smooth reveal animation for sections
    function createRevealAnimation() {
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        });

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        sections.forEach(section => {
            revealObserver.observe(section);
        });
    }

    // Initialize section reveals
    createRevealAnimation();

    // Logo header scroll effect - removed to keep logo consistent
    // Logo now maintains consistent appearance at all scroll positions

    // Enhanced timeline step hover effects
    document.querySelectorAll('.timeline-step').forEach(step => {
        const number = step.querySelector('.timeline-number');
        
        step.addEventListener('mouseenter', () => {
            if (window.innerWidth > 768) {
                number.style.transform = 'scale(1.1) rotate(5deg)';
                number.style.boxShadow = '0 8px 25px rgba(217, 147, 63, 0.4)';
            }
        });
        
        step.addEventListener('mouseleave', () => {
            if (window.innerWidth > 768) {
                number.style.transform = 'scale(1) rotate(0deg)';
                number.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.12)';
            }
        });
    });

    // Smooth scrolling with offset for fixed header
    function smoothScrollToSection(target) {
        const headerHeight = 80;
        const targetPosition = target.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }

    // Enhanced purchase button interactions
    document.querySelectorAll('.info-overlay a').forEach(button => {
        button.addEventListener('click', (e) => {
            // Add ripple effect
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .timeline-step {
            transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .timeline-number {
            transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .logo-header {
            transition: all 0.4s ease;
        }
        
        .logo-header img {
            transition: all 0.4s ease;
        }
    `;
    document.head.appendChild(style);

    // Performance optimization: throttle scroll events
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    // Apply throttling to scroll-heavy functions
    const throttledScroll = throttle(() => {
        // Any intensive scroll calculations can go here
    }, 16); // ~60fps

    window.addEventListener('scroll', throttledScroll, { passive: true });

    // Accessibility enhancements
    function enhanceAccessibility() {
        // Add skip link
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--navy);
            color: white;
            padding: 8px;
            text-decoration: none;
            z-index: 1000;
            transition: top 0.3s;
        `;
        
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);

        // Add main content landmark
        const firstSection = document.querySelector('section');
        if (firstSection) {
            firstSection.id = 'main-content';
        }

        // Enhance keyboard navigation
        document.querySelectorAll('.purchase-bottle').forEach(card => {
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            card.setAttribute('aria-label', 'View product details');
        });
    }

    // Initialize accessibility enhancements
    enhanceAccessibility();

    // Initialize timeline animation
    animateTimelineSteps();
});