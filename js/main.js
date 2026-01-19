/**
 * AL DHABI STEEL - Premium Industrial Website
 * Vanilla JavaScript - 2025-2026 Standards
 * Smooth scrolling, animations, counters, and interactivity
 */

(function() {
    'use strict';

    // DOM Elements
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    const statNumbers = document.querySelectorAll('.stat-number');
    const contactForm = document.getElementById('contactForm');
    const heroSlides = document.querySelectorAll('.hero-slide');
    
    // Navigation Scroll Effect
    let lastScroll = 0;
    const scrollThreshold = 50;

    function handleNavbarScroll() {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        
        if (currentScroll > scrollThreshold) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    }

    window.addEventListener('scroll', handleNavbarScroll, { passive: true });
    handleNavbarScroll(); // Initial check

    // Hero Image Carousel - Smooth Crossfade
    if (heroSlides && heroSlides.length > 0) {
        let currentHeroIndex = 0;
        const heroInterval = 18000; // 18 seconds between transitions

        // Ensure only one slide is active on load
        heroSlides.forEach((slide, index) => {
            if (index === 0) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });

        // Preload next image for smooth transitions
        function preloadNextImage(index) {
            const nextIndex = (index + 1) % heroSlides.length;
            const nextSlide = heroSlides[nextIndex];
            if (nextSlide && nextSlide.src) {
                const img = new Image();
                img.src = nextSlide.src;
            }
        }

        // Start carousel with infinite loop
        if (heroSlides.length > 1 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            // Preload all images for smooth transitions
            heroSlides.forEach((slide, index) => {
                if (index > 0) {
                    preloadNextImage(index - 1);
                }
            });

            setInterval(() => {
                const nextIndex = (currentHeroIndex + 1) % heroSlides.length;
                heroSlides[currentHeroIndex].classList.remove('active');
                heroSlides[nextIndex].classList.add('active');
                currentHeroIndex = nextIndex;
                // Preload the next image after current one
                preloadNextImage(nextIndex);
            }, heroInterval);
        }
    }

    // Mobile Navigation Toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') && 
                !navMenu.contains(e.target) && 
                !navToggle.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Smooth Scrolling for Navigation Links with improved offset
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const navbarHeight = navbar ? navbar.offsetHeight : 80;
                    const offsetTop = targetElement.offsetTop - navbarHeight;
                    window.scrollTo({
                        top: Math.max(0, offsetTop),
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Smooth Scroll for Hero CTAs
    const heroLinks = document.querySelectorAll('#hero .btn');
    heroLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const navbarHeight = navbar ? navbar.offsetHeight : 80;
                    const offsetTop = targetElement.offsetTop - navbarHeight;
                    window.scrollTo({
                        top: Math.max(0, offsetTop),
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Intersection Observer for Scroll Animations - Enhanced with Staggering
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animation for better visual flow
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, index * 50);
                animationObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all animate-on-scroll elements (excluding hero which animates on load)
    animateElements.forEach(element => {
        if (element && !element.closest('.hero-content')) {
            animationObserver.observe(element);
        }
    });

    // Enhanced Staggered Animation for Fabrication Capabilities
    const capabilityItems = document.querySelectorAll('.capability-item');
    if (capabilityItems.length > 0) {
        capabilityItems.forEach(item => {
            item.classList.remove('animate-on-scroll');
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
        });

        const capabilityObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const item = entry.target;
                    const index = Array.from(capabilityItems).indexOf(item);
                    const delay = index * 80;
                    
                    setTimeout(() => {
                        item.style.transition = 'opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, delay);
                    
                    capabilityObserver.unobserve(item);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -60px 0px'
        });

        capabilityItems.forEach(item => {
            capabilityObserver.observe(item);
        });
    }

    // Animated Counter for Statistics
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const startTime = performance.now();

        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(start + (target - start) * easeOutQuart);
            
            element.textContent = current.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toLocaleString();
            }
        };

        requestAnimationFrame(updateCounter);
    }

    // Intersection Observer for Counter Animation
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'), 10);
                const hasAnimated = entry.target.hasAttribute('data-animated');
                
                if (!hasAnimated && target) {
                    entry.target.setAttribute('data-animated', 'true');
                    animateCounter(entry.target, target);
                }
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '0px'
    });

    // Observe all stat numbers
    statNumbers.forEach(stat => {
        if (stat) {
            counterObserver.observe(stat);
        }
    });


    // Contact Form Handling
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                message: formData.get('message')
            };

            // Basic validation
            if (!data.name || !data.email || !data.message) {
                showFormMessage('Please fill in all required fields.', 'error');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                showFormMessage('Please enter a valid email address.', 'error');
                return;
            }

            // Simulate form submission (replace with actual API call)
            showFormMessage('Sending message...', 'info');
            
            // In production, replace this with actual form submission
            setTimeout(() => {
                showFormMessage('Thank you! Your message has been sent. We will contact you soon.', 'success');
                contactForm.reset();
            }, 1500);
        });
    }

    // Show form message
    function showFormMessage(message, type = 'info') {
        // Remove existing message if any
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create message element
        const messageEl = document.createElement('div');
        messageEl.className = `form-message form-message-${type}`;
        messageEl.textContent = message;
        
        // Add styles dynamically
        messageEl.style.cssText = `
            padding: 1rem 1.5rem;
            margin-top: 1rem;
            border-radius: 0.5rem;
            font-size: 0.875rem;
            font-weight: 500;
            text-align: center;
            animation: fadeIn 0.3s ease-out;
            ${type === 'error' ? 'background-color: rgba(194, 154, 91, 0.15); color: #EDEDED; border: 1px solid rgba(194, 154, 91, 0.3);' : ''}
            ${type === 'success' ? 'background-color: rgba(194, 154, 91, 0.15); color: #EDEDED; border: 1px solid rgba(194, 154, 91, 0.3);' : ''}
            ${type === 'info' ? 'background-color: rgba(156, 163, 175, 0.15); color: #EDEDED; border: 1px solid rgba(156, 163, 175, 0.3);' : ''}
        `;

        // Insert message
        const submitButton = contactForm.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.parentNode.insertBefore(messageEl, submitButton);
        } else {
            contactForm.appendChild(messageEl);
        }

        // Auto-remove success/info messages after 5 seconds
        if (type === 'success' || type === 'info') {
            setTimeout(() => {
                if (messageEl.parentNode) {
                    messageEl.style.animation = 'fadeOut 0.3s ease-out';
                    setTimeout(() => messageEl.remove(), 300);
                }
            }, 5000);
        }
    }

    // Active Navigation Link Highlighting with improved scroll detection
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navbarHeight = navbar ? navbar.offsetHeight : 80;
        const scrollPos = window.pageYOffset + navbarHeight + 100;

        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                currentSection = sectionId;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (currentSection && link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });

        // Handle scroll to top
        if (window.pageYOffset < navbarHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            const homeLink = document.querySelector('.nav-link[href="#hero"]');
            if (homeLink) homeLink.classList.add('active');
        }
    }

    // Throttle scroll handler for better performance
    let scrollTicking = false;
    function onScrollUpdate() {
        if (!scrollTicking) {
            window.requestAnimationFrame(() => {
                updateActiveNavLink();
                scrollTicking = false;
            });
            scrollTicking = true;
        }
    }

    window.addEventListener('scroll', onScrollUpdate, { passive: true });

    // Enhanced Project Cards with Parallax Effect
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        const image = card.querySelector('.project-image img');
        
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });

        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const moveX = (x - centerX) / 20;
            const moveY = (y - centerY) / 20;
            
            if (image) {
                image.style.transform = `scale(1.1) translate(${moveX}px, ${moveY}px)`;
            }
        });

        card.addEventListener('mouseleave', function() {
            if (image) {
                image.style.transform = 'scale(1) translate(0, 0)';
            }
        });
    });

    // Enhanced Service Cards with Smooth Interactions
    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach((item, index) => {
        const image = item.querySelector('.service-image img');
        
        item.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });

        item.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const moveX = (x - centerX) / 25;
            const moveY = (y - centerY) / 25;
            
            if (image) {
                image.style.transform = `scale(1.12) translate(${moveX}px, ${moveY}px)`;
            }
        });

        item.addEventListener('mouseleave', function() {
            if (image) {
                image.style.transform = 'scale(1) translate(0, 0)';
            }
        });
    });

    // Lazy Loading for Images (if needed for future optimization)
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src || img.src;
        });
    } else {
        // Fallback for browsers that don't support native lazy loading
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Performance: Debounce resize handler
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Recalculate any size-dependent features if needed
            handleNavbarScroll();
        }, 250);
    }, { passive: true });

    // Keyboard Navigation Enhancement
    document.addEventListener('keydown', (e) => {
        // ESC key closes mobile menu
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Smooth Page Load with FOUC Prevention
    document.documentElement.style.opacity = '0';
    window.addEventListener('DOMContentLoaded', () => {
        document.documentElement.style.transition = 'opacity 0.5s ease-out';
        document.documentElement.style.opacity = '1';
    });

    // Parallax Effect for Hero Section (Subtle)
    let lastScrollY = 0;
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrollY = window.pageYOffset;
            if (scrollY < window.innerHeight) {
                const parallaxValue = scrollY * 0.3;
                hero.style.transform = `translateY(${parallaxValue}px)`;
            }
            lastScrollY = scrollY;
        }, { passive: true });
    }

    // Smooth Scroll Progress Indicator (Optional Enhancement)
    const createScrollProgress = () => {
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, var(--color-accent), var(--color-accent-hover));
            z-index: 10000;
            transition: width 0.1s ease-out;
            pointer-events: none;
        `;
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', () => {
            const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (window.pageYOffset / windowHeight) * 100;
            progressBar.style.width = `${scrolled}%`;
        }, { passive: true });
    };
    
    // Uncomment to enable scroll progress bar
    // createScrollProgress();

    // Video Modal Functionality
    const videoCard = document.getElementById('videoCard');
    const videoModal = document.getElementById('videoModal');
    const videoModalClose = videoModal ? videoModal.querySelector('.video-modal-close') : null;
    const videoModalOverlay = videoModal ? videoModal.querySelector('.video-modal-overlay') : null;
    const videoIframe = videoModal ? videoModal.querySelector('.video-iframe') : null;
    const videoPlayButton = document.querySelector('.video-play-button');

    function extractVideoId(url) {
        if (!url) return null;
        
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    }

    function getYouTubeThumbnail(videoId) {
        if (!videoId) return '';
        return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    }

    function getYouTubeEmbedUrl(videoId) {
        if (!videoId) return '';
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    }

    function openVideoModal() {
        if (!videoModal || !videoCard || !videoIframe) return;
        
        const videoId = videoCard.getAttribute('data-video-id')?.trim();
        const videoUrl = videoCard.getAttribute('data-video-url')?.trim();
        
        let finalVideoId = null;
        if (videoId) {
            finalVideoId = videoId;
        } else if (videoUrl) {
            finalVideoId = extractVideoId(videoUrl);
        }
        
        if (!finalVideoId) {
            console.warn('No valid YouTube video ID found. Please set data-video-id or data-video-url attribute.');
            return;
        }
        
        videoIframe.src = getYouTubeEmbedUrl(finalVideoId);
        videoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeVideoModal() {
        if (!videoModal || !videoIframe) return;
        
        videoModal.classList.remove('active');
        videoIframe.src = '';
        document.body.style.overflow = '';
    }

    // Initialize video thumbnail if video ID is provided
    if (videoCard) {
        const videoId = videoCard.getAttribute('data-video-id')?.trim();
        const videoUrl = videoCard.getAttribute('data-video-url')?.trim();
        const thumbnail = videoCard.querySelector('.video-thumbnail');
        
        let finalVideoId = null;
        if (videoId) {
            finalVideoId = videoId;
        } else if (videoUrl) {
            finalVideoId = extractVideoId(videoUrl);
        }
        
        if (finalVideoId && thumbnail) {
            thumbnail.src = getYouTubeThumbnail(finalVideoId);
            thumbnail.alt = 'Al Dhabi Steel company video';
        }
    }

    // Event listeners for video card - open in new tab
    if (videoCard) {
        videoCard.addEventListener('click', () => {
            const videoUrl = videoCard.getAttribute('data-video-url')?.trim();
            if (videoUrl) {
                window.open(videoUrl, '_blank', 'noopener,noreferrer');
            }
        });
    }

    if (videoModalClose) {
        videoModalClose.addEventListener('click', closeVideoModal);
    }

    if (videoModalOverlay) {
        videoModalOverlay.addEventListener('click', closeVideoModal);
    }

    // Close modal on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && videoModal && videoModal.classList.contains('active')) {
            closeVideoModal();
        }
    });

    // Console welcome message (for development)
    console.log('%cAl Dhabi Steel', 'font-size: 24px; font-weight: bold; color: #C29A5B;');
    console.log('%cPremium Industrial Website | Built 2025-2026', 'font-size: 12px; color: #9CA3AF;');

})();
