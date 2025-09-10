// Enhanced Suntory Website JavaScript

document.addEventListener("DOMContentLoaded", () => {
    
    // Mobile header image cropping (keep original functionality)
    const container = document.querySelector(".hero-bg");
    const img = container?.querySelector("img");
    const cropTopPercent = 0.15; // 15% crop top

    function adjustContainerAndCrop() {
        if (!img) return;
        
        // ignore if desktop
        if (window.innerWidth > 767) {
            if (container) {
                container.style.height = '';
            }
            img.style.position = '';
            img.style.top = '';
            return;
        }
        
        //get dimensions and aspect ratio, then calculate respective width and height 
        const naturalWidth = img.naturalWidth;
        const naturalHeight = img.naturalHeight;
        if (!naturalWidth || !naturalHeight) return;

        const aspectRatio = naturalHeight / naturalWidth;
        const containerWidth = container.clientWidth;
        const containerHeight = (1 - cropTopPercent) * containerWidth * aspectRatio;

        //assign correct height and positioning
        if (container) {
            container.style.height = `${containerHeight}px`;
        }
        img.style.position = "relative";
        img.style.top = `-${cropTopPercent * 100}%`;
    }

    if (img) {
        if (img.complete) {
            adjustContainerAndCrop();
        } else {
            img.addEventListener("load", adjustContainerAndCrop);
        }
        //for screen size changes
        window.addEventListener("resize", adjustContainerAndCrop);
    }

    // Enhanced Parallax Effect
    (function() {
        const BREAKPOINT = 768; // desktop when parallax active
        const MOTION_INTENSITY = 0.8; // 0-1, lower = subtler movement
        const containers = Array.from(document.querySelectorAll('.parallax-container'));
        if (!containers.length) return;

        let ticking = false;

        function clamp(v, a, b) { 
            return Math.max(a, Math.min(b, v)); 
        }

        function updateOne(container) {
            if (window.innerWidth < BREAKPOINT) return; // disabled on mobile

            const img = container.querySelector('.banner-img');
            if (!img) return;

            const crect = container.getBoundingClientRect();
            const viewportCenter = window.innerHeight / 2;
            const elementCenter = crect.top + crect.height / 2;

            // normalized distance [-1,1] (container center relative to viewport center)
            const denom = (window.innerHeight / 2) + (crect.height / 2);
            let relative = (viewportCenter - elementCenter) / denom;
            relative = clamp(relative, -1, 1);

            const imgRect = img.getBoundingClientRect();
            const imgHeight = imgRect.height;
            const containerHeight = crect.height;
            const maxTranslate = Math.max(0, (imgHeight - containerHeight) / 2);

            // reduce amplitude with MOTION_INTENSITY so the effect is more subtle
            const translate = relative * maxTranslate * MOTION_INTENSITY; // px

            // preserve horizontal centering (translateX(-50%)) and shift vertically
            img.style.transform = `translate(-50%, calc(-50% + ${translate}px))`;
        }

        function updateAll() {
            containers.forEach(updateOne);
            ticking = false;
        }

        function onScrollOrResize() {
            if (!ticking) {
                window.requestAnimationFrame(updateAll);
                ticking = true;
            }
        }

        // run after images load (some images may already be loaded)
        window.addEventListener('load', onScrollOrResize, { passive: true });
        window.addEventListener('resize', onScrollOrResize, { passive: true });
        window.addEventListener('scroll', onScrollOrResize, { passive: true });

        // initial run
        onScrollOrResize();
    })();

    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Enhanced scroll-to-top functionality
    let scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, var(--orange), var(--whisky-gold));
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    
    document.body.appendChild(scrollToTopBtn);

    // Show/hide scroll to top button
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Enhanced loading animation
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        // Trigger timeline animations with stagger
        const timelineSteps = document.querySelectorAll('.timeline-step');
        timelineSteps.forEach((step, index) => {
            setTimeout(() => {
                step.classList.add('animate');
            }, index * 150);
        });
    });

    // Performance optimization for scroll events
    let lastScrollY = window.scrollY;
    let scrollDirection = 'down';

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
        lastScrollY = currentScrollY;
        
        // Add scroll direction class to body for CSS animations
        document.body.classList.toggle('scrolling-down', scrollDirection === 'down');
        document.body.classList.toggle('scrolling-up', scrollDirection === 'up');
    }, { passive: true });

    // Preload critical images
    const criticalImages = [
        '/static/images/Header.png',
        '/static/images/Image1.png',
        '/static/images/Image2-Quote-Desktop-PARALLAXV2.png'
    ];

    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
});