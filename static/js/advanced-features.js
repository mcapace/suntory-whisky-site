// Advanced Features for House of Suntory Website
// Includes: Scroll animations, 3D effects, AI recommendations, and interactive elements

class AdvancedFeatures {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setup3DEffects();
        this.setupAIRecommendations();
        this.setupInteractiveElements();
        this.setupPerformanceOptimizations();
        this.setupPWAFeatures();
    }

    // Scroll-triggered animations using Intersection Observer
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    
                    // Staggered animation for multiple elements
                    const siblings = entry.target.parentElement.querySelectorAll('.animate-scale');
                    siblings.forEach((sibling, index) => {
                        setTimeout(() => {
                            sibling.classList.add('animated');
                        }, index * 200);
                    });
                }
            });
        }, observerOptions);

        // Observe all animated elements
        document.querySelectorAll('.animate-on-scroll, .animate-left, .animate-right, .animate-scale').forEach(el => {
            observer.observe(el);
        });
    }

    // 3D effects and advanced hover interactions
    setup3DEffects() {
        const bottles = document.querySelectorAll('.purchase-bottle');
        
        bottles.forEach(bottle => {
            const img = bottle.querySelector('img');
            
            // Magnetic cursor effect
            bottle.addEventListener('mousemove', (e) => {
                const rect = bottle.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                const distance = Math.sqrt(x * x + y * y);
                const maxDistance = 100;
                
                if (distance < maxDistance) {
                    const strength = (maxDistance - distance) / maxDistance;
                    const moveX = x * strength * 0.1;
                    const moveY = y * strength * 0.1;
                    
                    img.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05) rotateY(${moveX * 0.1}deg)`;
                }
            });
            
            bottle.addEventListener('mouseleave', () => {
                img.style.transform = '';
            });

            // 3D tilt effect
            bottle.addEventListener('mousemove', (e) => {
                const rect = bottle.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                const deltaX = e.clientX - centerX;
                const deltaY = e.clientY - centerY;
                
                const rotateX = deltaY / 10;
                const rotateY = deltaX / 10;
                
                bottle.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
            });
            
            bottle.addEventListener('mouseleave', () => {
                bottle.style.transform = '';
            });
        });
    }

    // AI-powered recommendation engine
    setupAIRecommendations() {
        // Simulate AI recommendations based on user behavior
        const recommendationEngine = {
            preferences: {
                flavor: 'balanced',
                intensity: 'medium',
                price: 'premium'
            },
            
            analyzeBehavior: () => {
                // Track time spent on each bottle
                const bottles = document.querySelectorAll('.purchase-bottle');
                bottles.forEach((bottle, index) => {
                    let hoverTime = 0;
                    const startTime = Date.now();
                    
                    bottle.addEventListener('mouseenter', () => {
                        startTime = Date.now();
                    });
                    
                    bottle.addEventListener('mouseleave', () => {
                        hoverTime += Date.now() - startTime;
                        this.updateRecommendations(index, hoverTime);
                    });
                });
            },
            
            updateRecommendations: (bottleIndex, hoverTime) => {
                // Simple recommendation logic
                if (hoverTime > 3000) {
                    this.showRecommendation(bottleIndex);
                }
            },
            
            showRecommendation: (bottleIndex) => {
                const bottleNames = ['Yamazaki', 'Hakushu', 'Hibiki', 'Toki'];
                const recommendations = {
                    0: 'You might also enjoy Hakushu for its herbal notes',
                    1: 'Consider Yamazaki for a richer, more complex profile',
                    2: 'Try Toki for a lighter, more accessible option',
                    3: 'Explore Hibiki for a masterful blend experience'
                };
                
                this.displayRecommendationToast(recommendations[bottleIndex]);
            },
            
            displayRecommendationToast: (message) => {
                const toast = document.createElement('div');
                toast.className = 'ai-recommendation-toast';
                toast.textContent = message;
                toast.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: var(--navy);
                    color: white;
                    padding: 15px 20px;
                    border-radius: 10px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                    z-index: 1000;
                    animation: slideInRight 0.5s ease;
                    max-width: 300px;
                `;
                
                document.body.appendChild(toast);
                
                setTimeout(() => {
                    toast.style.animation = 'slideOutRight 0.5s ease';
                    setTimeout(() => toast.remove(), 500);
                }, 4000);
            }
        };
        
        recommendationEngine.analyzeBehavior();
    }

    // Interactive storytelling elements
    setupInteractiveElements() {
        // Add interactive timeline for distillery process
        this.createInteractiveTimeline();
        
        // Add virtual tasting notes
        this.createVirtualTasting();
        
        // Add ingredient breakdown
        this.createIngredientBreakdown();
    }

    createInteractiveTimeline() {
        const timelineData = [
            { step: 'Water Selection', description: 'Pure Japanese water from natural springs', duration: 'Continuous' },
            { step: 'Malting', description: 'Carefully selected barley malted to perfection', duration: '7 days' },
            { step: 'Mashing', description: 'Hot water extracts sugars from malted barley', duration: '8 hours' },
            { step: 'Fermentation', description: 'Yeast converts sugars to alcohol', duration: '3-4 days' },
            { step: 'Distillation', description: 'Double distillation in copper pot stills', duration: '2 days' },
            { step: 'Aging', description: 'Maturation in carefully selected casks', duration: '12+ years' },
            { step: 'Blending', description: 'Master blender creates the final expression', duration: 'Months' }
        ];

        const timelineHTML = `
            <div class="interactive-timeline">
                <h3>Interactive Distillery Process</h3>
                <div class="timeline-container">
                    ${timelineData.map((step, index) => `
                        <div class="timeline-step" data-step="${index}">
                            <div class="timeline-dot"></div>
                            <div class="timeline-content">
                                <h4>${step.step}</h4>
                                <p>${step.description}</p>
                                <span class="duration">${step.duration}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        // Insert timeline after the first section
        const firstSection = document.querySelector('.section-type-1');
        const timelineElement = document.createElement('div');
        timelineElement.innerHTML = timelineHTML;
        timelineElement.className = 'timeline-section animate-on-scroll';
        firstSection.insertAdjacentElement('afterend', timelineElement);

        // Add timeline styles
        this.addTimelineStyles();
    }

    addTimelineStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .interactive-timeline {
                background: var(--tan);
                padding: 5% 10%;
                margin: 5% 0;
            }
            
            .timeline-container {
                position: relative;
                margin-top: 3%;
            }
            
            .timeline-step {
                display: flex;
                align-items: center;
                margin: 2% 0;
                opacity: 0.6;
                transition: all 0.3s ease;
                cursor: pointer;
            }
            
            .timeline-step:hover,
            .timeline-step.active {
                opacity: 1;
                transform: translateX(10px);
            }
            
            .timeline-dot {
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background: var(--orange);
                margin-right: 20px;
                position: relative;
                z-index: 2;
            }
            
            .timeline-content h4 {
                margin: 0 0 5px 0;
                color: var(--navy);
            }
            
            .timeline-content p {
                margin: 0 0 5px 0;
                font-size: 1.2vw;
            }
            
            .duration {
                font-size: 1vw;
                color: var(--orange);
                font-weight: bold;
            }
        `;
        document.head.appendChild(style);
    }

    createVirtualTasting() {
        const tastingNotes = {
            'yamazaki': {
                nose: 'Sweet vanilla, ripe fruit, sandalwood',
                palate: 'Rich, multi-layered, coconut, cranberry',
                finish: 'Long, complex, with subtle spices'
            },
            'hakushu': {
                nose: 'Basil, pine needle, green apple',
                palate: 'Crisp, vibrant, herbal notes',
                finish: 'Subtle smoky finish'
            },
            'hibiki': {
                nose: 'Rose, sandalwood, honey',
                palate: 'Floral, honeyed sweetness, orange peel',
                finish: 'Seamless, refined'
            },
            'toki': {
                nose: 'Citrus, green apple, thyme',
                palate: 'Silky, well-balanced, sweet and spicy',
                finish: 'Crisp, refreshing'
            }
        };

        // Add tasting notes to bottle overlays
        document.querySelectorAll('.purchase-bottle').forEach((bottle, index) => {
            const bottleNames = ['yamazaki', 'hakushu', 'hibiki', 'toki'];
            const notes = tastingNotes[bottleNames[index]];
            
            const tastingHTML = `
                <div class="tasting-notes">
                    <h5>Tasting Notes</h5>
                    <div class="note-section">
                        <strong>Nose:</strong> ${notes.nose}
                    </div>
                    <div class="note-section">
                        <strong>Palate:</strong> ${notes.palate}
                    </div>
                    <div class="note-section">
                        <strong>Finish:</strong> ${notes.finish}
                    </div>
                </div>
            `;
            
            const overlay = bottle.querySelector('.info-overlay');
            overlay.insertAdjacentHTML('beforeend', tastingHTML);
        });
    }

    createIngredientBreakdown() {
        const ingredients = [
            { name: 'Japanese Water', percentage: 60, description: 'Pure spring water from natural sources' },
            { name: 'Malted Barley', percentage: 25, description: 'Carefully selected and malted barley' },
            { name: 'Oak Casks', percentage: 10, description: 'American and European oak for aging' },
            { name: 'Time & Craft', percentage: 5, description: 'Years of patient maturation' }
        ];

        const breakdownHTML = `
            <div class="ingredient-breakdown animate-on-scroll">
                <h3>What Makes Our Whisky</h3>
                <div class="breakdown-container">
                    ${ingredients.map(ingredient => `
                        <div class="ingredient-item">
                            <div class="ingredient-bar">
                                <div class="ingredient-fill" style="width: ${ingredient.percentage}%"></div>
                            </div>
                            <div class="ingredient-info">
                                <span class="ingredient-name">${ingredient.name}</span>
                                <span class="ingredient-percentage">${ingredient.percentage}%</span>
                            </div>
                            <p class="ingredient-description">${ingredient.description}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        const purchaseSection = document.querySelector('.section-type-3');
        const breakdownElement = document.createElement('div');
        breakdownElement.innerHTML = breakdownHTML;
        breakdownElement.className = 'breakdown-section';
        purchaseSection.insertAdjacentElement('afterend', breakdownElement);

        this.addBreakdownStyles();
    }

    addBreakdownStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .breakdown-section {
                background: white;
                padding: 5% 10%;
                margin: 5% 0;
            }
            
            .breakdown-container {
                margin-top: 3%;
            }
            
            .ingredient-item {
                margin: 3% 0;
            }
            
            .ingredient-bar {
                height: 30px;
                background: #f0f0f0;
                border-radius: 15px;
                overflow: hidden;
                margin-bottom: 10px;
            }
            
            .ingredient-fill {
                height: 100%;
                background: linear-gradient(90deg, var(--orange), var(--navy));
                transition: width 2s ease;
                border-radius: 15px;
            }
            
            .ingredient-info {
                display: flex;
                justify-content: space-between;
                margin-bottom: 5px;
            }
            
            .ingredient-name {
                font-weight: bold;
                color: var(--navy);
            }
            
            .ingredient-percentage {
                color: var(--orange);
                font-weight: bold;
            }
            
            .ingredient-description {
                font-size: 1.2vw;
                color: #666;
                margin: 0;
            }
        `;
        document.head.appendChild(style);
    }

    // Performance optimizations
    setupPerformanceOptimizations() {
        // Lazy loading for images
        this.setupLazyLoading();
        
        // Prefetch critical resources
        this.setupPrefetching();
        
        // Optimize animations for performance
        this.optimizeAnimations();
    }

    setupLazyLoading() {
        const images = document.querySelectorAll('img');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => {
            if (img.dataset.src) {
                img.classList.add('lazy');
                imageObserver.observe(img);
            }
        });
    }

    setupPrefetching() {
        // Prefetch next section images
        const nextImages = [
            '/static/images/Image2-Quote-Desktop-PARALLAXV2.png',
            '/static/images/Image3.png',
            '/static/images/Image4-PARALLAX.png'
        ];

        nextImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = src;
            document.head.appendChild(link);
        });
    }

    optimizeAnimations() {
        // Use transform and opacity for better performance
        const animatedElements = document.querySelectorAll('.animate-on-scroll, .animate-left, .animate-right, .animate-scale');
        animatedElements.forEach(el => {
            el.style.willChange = 'transform, opacity';
        });
    }

    // Progressive Web App features
    setupPWAFeatures() {
        // Add service worker for offline functionality
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js');
        }
        
        // Add install prompt
        this.setupInstallPrompt();
        
        // Add offline indicator
        this.setupOfflineIndicator();
    }

    setupInstallPrompt() {
        let deferredPrompt;
        
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            
            const installButton = document.createElement('button');
            installButton.textContent = 'Install App';
            installButton.className = 'install-button';
            installButton.style.cssText = `
                position: fixed;
                bottom: 20px;
                left: 20px;
                background: var(--orange);
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 25px;
                cursor: pointer;
                z-index: 1000;
                box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            `;
            
            installButton.addEventListener('click', () => {
                deferredPrompt.prompt();
                deferredPrompt.userChoice.then((choiceResult) => {
                    if (choiceResult.outcome === 'accepted') {
                        console.log('User accepted the install prompt');
                    }
                    deferredPrompt = null;
                    installButton.remove();
                });
            });
            
            document.body.appendChild(installButton);
        });
    }

    setupOfflineIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'offline-indicator';
        indicator.textContent = 'You are offline';
        indicator.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: #ff6b6b;
            color: white;
            text-align: center;
            padding: 10px;
            z-index: 1000;
            transform: translateY(-100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(indicator);
        
        window.addEventListener('online', () => {
            indicator.style.transform = 'translateY(-100%)';
        });
        
        window.addEventListener('offline', () => {
            indicator.style.transform = 'translateY(0)';
        });
    }
}

// Initialize advanced features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AdvancedFeatures();
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .lazy {
        opacity: 0;
        transition: opacity 0.3s;
    }
    
    .lazy.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(style);
