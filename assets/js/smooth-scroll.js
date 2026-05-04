/**
 * Smooth Scrolling & Animation Controller
 * Enhances UI with smooth scrolling, scroll animations, and scroll-to-top functionality
 */

(function() {
    'use strict';

    const SmoothScroll = {
        config: {
            scrollToTopThreshold: 300,
            animationOffset: 100,
            scrollDuration: 800,
            easing: 'easeInOutCubic'
        },

        scrollToTopBtn: null,

        /**
         * Initialize smooth scrolling features
         */
        init() {
            this.createScrollToTopButton();
            this.setupEventListeners();
            this.setupScrollAnimations();
            this.setupNavbarScroll();
            this.setupSmoothAnchors();
            
            console.log('✅ Smooth Scrolling initialized');
        },

        /**
         * Create scroll-to-top button
         */
        createScrollToTopButton() {
            // Check if button already exists
            if (document.querySelector('.scroll-to-top')) return;

            const btn = document.createElement('button');
            btn.className = 'scroll-to-top';
            btn.innerHTML = '<i class="bi bi-arrow-up"></i>';
            btn.setAttribute('aria-label', 'Scroll to top');
            btn.setAttribute('title', 'Scroll to top');
            
            document.body.appendChild(btn);
            this.scrollToTopBtn = btn;

            // Add click handler
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.scrollToTop();
            });
        },

        /**
         * Setup event listeners
         */
        setupEventListeners() {
            // Throttled scroll handler
            let ticking = false;
            
            window.addEventListener('scroll', () => {
                if (!ticking) {
                    window.requestAnimationFrame(() => {
                        this.handleScroll();
                        ticking = false;
                    });
                    ticking = true;
                }
            }, { passive: true });

            // Handle page load animations
            window.addEventListener('load', () => {
                document.body.classList.add('loaded');
                this.animateElementsOnLoad();
            });
        },

        /**
         * Handle scroll events
         */
        handleScroll() {
            const scrollY = window.scrollY || window.pageYOffset;

            // Toggle scroll-to-top button
            if (this.scrollToTopBtn) {
                if (scrollY > this.config.scrollToTopThreshold) {
                    this.scrollToTopBtn.classList.add('visible');
                } else {
                    this.scrollToTopBtn.classList.remove('visible');
                }
            }

            // Update scroll animations
            this.updateScrollAnimations();

            // Update navbar
            this.updateNavbar(scrollY);
        },

        /**
         * Scroll to top with smooth animation
         */
        scrollToTop() {
            const startPosition = window.scrollY || window.pageYOffset;
            const duration = this.config.scrollDuration;
            const startTime = performance.now();

            const animateScroll = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function (easeInOutCubic)
                const easeProgress = progress < 0.5 
                    ? 4 * progress * progress * progress 
                    : 1 - Math.pow(-2 * progress + 2, 3) / 2;

                window.scrollTo(0, startPosition * (1 - easeProgress));

                if (progress < 1) {
                    requestAnimationFrame(animateScroll);
                }
            };

            requestAnimationFrame(animateScroll);
        },

        /**
         * Setup scroll animations for sections
         */
        setupScrollAnimations() {
            // Add data-animate attribute to elements that should animate
            const sections = document.querySelectorAll('section, .card, .animate-on-scroll');
            
            sections.forEach((section, index) => {
                if (!section.hasAttribute('data-animate')) {
                    section.setAttribute('data-animate', 'fade-up');
                }
                
                // Add stagger delay
                if (!section.hasAttribute('data-delay')) {
                    section.setAttribute('data-delay', (index % 6) * 100);
                }
                
                section.classList.add('animate-hidden');
            });

            // Initial check
            this.updateScrollAnimations();
        },

        /**
         * Update scroll animations based on viewport
         */
        updateScrollAnimations() {
            const elements = document.querySelectorAll('[data-animate]');
            
            elements.forEach(element => {
                const rect = element.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight - this.config.animationOffset 
                    && rect.bottom > 0;

                if (isVisible) {
                    const delay = parseInt(element.getAttribute('data-delay')) || 0;
                    
                    setTimeout(() => {
                        element.classList.add('animate-visible');
                        element.classList.remove('animate-hidden');
                    }, delay);
                }
            });
        },

        /**
         * Setup navbar scroll effect
         */
        setupNavbarScroll() {
            const navbars = document.querySelectorAll('.navbar');
            
            navbars.forEach(navbar => {
                // Add scroll listener specifically for navbar
                window.addEventListener('scroll', () => {
                    if (window.scrollY > 50) {
                        navbar.classList.add('scrolled');
                    } else {
                        navbar.classList.remove('scrolled');
                    }
                }, { passive: true });
            });
        },

        /**
         * Update navbar appearance
         */
        updateNavbar(scrollY) {
            // Additional navbar updates if needed
        },

        /**
         * Setup smooth anchor links
         */
        setupSmoothAnchors() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', (e) => {
                    const targetId = anchor.getAttribute('href');
                    if (targetId === '#') return;
                    
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        e.preventDefault();
                        this.scrollToElement(targetElement);
                    }
                });
            });
        },

        /**
         * Smooth scroll to specific element
         */
        scrollToElement(element, offset = 80) {
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - offset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        },

        /**
         * Animate elements on page load
         */
        animateElementsOnLoad() {
            // Add initial animations to hero content
            const heroElements = document.querySelectorAll('.hero-content h1, .hero-content p, .hero-content .btn');
            
            heroElements.forEach((el, index) => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                
                setTimeout(() => {
                    el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, index * 200);
            });

            // Animate cards with stagger
            const cards = document.querySelectorAll('.card');
            cards.forEach((card, index) => {
                if (!card.classList.contains('animate-visible')) {
                    setTimeout(() => {
                        card.classList.add('animate-fade-in-up');
                    }, index * 100);
                }
            });
        },

        /**
         * Parallax effect for hero section
         */
        setupParallax() {
            const heroSection = document.querySelector('.hero-section');
            if (!heroSection) return;

            window.addEventListener('scroll', () => {
                const scrolled = window.scrollY;
                const rate = scrolled * 0.5;
                
                if (rate < window.innerHeight) {
                    heroSection.style.backgroundPositionY = `${rate}px`;
                }
            }, { passive: true });
        },

        /**
         * Animate numbers counting up
         */
        animateNumber(element, target, duration = 2000) {
            const start = 0;
            const startTime = performance.now();

            const updateNumber = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Ease out quart
                const easeProgress = 1 - Math.pow(1 - progress, 4);
                const current = Math.floor(start + (target - start) * easeProgress);
                
                element.textContent = current.toLocaleString();

                if (progress < 1) {
                    requestAnimationFrame(updateNumber);
                } else {
                    element.textContent = target.toLocaleString();
                }
            };

            requestAnimationFrame(updateNumber);
        },

        /**
         * Setup intersection observer for animations
         */
        setupIntersectionObserver() {
            if (!('IntersectionObserver' in window)) {
                // Fallback for older browsers
                this.setupScrollAnimations();
                return;
            }

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const element = entry.target;
                        const delay = parseInt(element.getAttribute('data-delay')) || 0;
                        
                        setTimeout(() => {
                            element.classList.add('animate-visible');
                            element.classList.remove('animate-hidden');
                            
                            // Check if element has number to animate
                            const numberEl = element.querySelector('.animate-number');
                            if (numberEl && !numberEl.classList.contains('animated')) {
                                numberEl.classList.add('animated');
                                const target = parseInt(numberEl.getAttribute('data-target'));
                                if (target) {
                                    this.animateNumber(numberEl, target);
                                }
                            }
                        }, delay);
                        
                        observer.unobserve(element);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -100px 0px'
            });

            document.querySelectorAll('[data-animate]').forEach(el => {
                observer.observe(el);
            });
        }
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => SmoothScroll.init());
    } else {
        SmoothScroll.init();
    }

    // Expose globally
    window.SmoothScroll = SmoothScroll;

})();

// Add CSS for animation states
const style = document.createElement('style');
style.textContent = `
    .animate-hidden {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1),
                    transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .animate-visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    [data-animate="fade-left"] {
        transform: translateX(-30px);
    }
    
    [data-animate="fade-right"] {
        transform: translateX(30px);
    }
    
    [data-animate="fade-left"].animate-visible,
    [data-animate="fade-right"].animate-visible {
        transform: translateX(0);
    }
    
    [data-animate="scale"] {
        transform: scale(0.9);
    }
    
    [data-animate="scale"].animate-visible {
        transform: scale(1);
    }
    
    /* Page load animation */
    body {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(style);
