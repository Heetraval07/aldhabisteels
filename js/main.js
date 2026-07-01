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

    // Hero Image Carousel - Smooth Crossfade with Zoom
    if (heroSlides && heroSlides.length > 0) {
        let currentHeroIndex = 0;
        const heroInterval = 8000; // 8 seconds between transitions

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

        // Close menu when clicking on a link (but not dropdown triggers)
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Don't close the nav if this link is a dropdown trigger — let the dropdown handle it
                if (link.classList.contains('nav-dropdown-trigger')) return;
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

    // ---- Company Dropdown ----
    (function initCompanyDropdown() {
        const item     = document.getElementById('companyDropdownItem');
        const trigger  = document.getElementById('companyTrigger');
        const dropdown = document.getElementById('companyDropdown');
        if (!item || !trigger || !dropdown) return;

        const isMobile   = () => window.innerWidth <= 768;
        const CLOSE_DELAY = 220; // ms — time before dropdown hides after cursor leaves
        let closeTimer = null;

        function open() {
            clearTimeout(closeTimer);
            item.classList.add('is-open');
            trigger.setAttribute('aria-expanded', 'true');
        }

        function scheduleClose() {
            clearTimeout(closeTimer);
            closeTimer = setTimeout(() => {
                item.classList.remove('is-open');
                trigger.setAttribute('aria-expanded', 'false');
            }, CLOSE_DELAY);
        }

        function closeNow() {
            clearTimeout(closeTimer);
            item.classList.remove('is-open');
            trigger.setAttribute('aria-expanded', 'false');
        }

        function toggle() {
            item.classList.contains('is-open') ? closeNow() : open();
        }

        // Desktop hover — open on enter, schedule close on leave
        item.addEventListener('mouseenter', () => { if (!isMobile()) open(); });
        item.addEventListener('mouseleave', () => { if (!isMobile()) scheduleClose(); });

        // Re-entering the dropdown (or its bridge) cancels the pending close
        dropdown.addEventListener('mouseenter', () => { if (!isMobile()) clearTimeout(closeTimer); });
        dropdown.addEventListener('mouseleave', () => { if (!isMobile()) scheduleClose(); });

        // Click toggle — works for mobile accordion and desktop fallback
        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            toggle();
        });

        // Clicking a dropdown link — close immediately and close mobile menu too
        dropdown.querySelectorAll('.nav-dropdown-link').forEach(link => {
            link.addEventListener('click', () => {
                closeNow();
                if (isMobile()) {
                    navToggle && navToggle.classList.remove('active');
                    navMenu  && navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });

        // Outside click — desktop only (mobile uses toggle click)
        document.addEventListener('click', (e) => {
            if (!isMobile() && !item.contains(e.target)) closeNow();
        });

        // Keyboard: trigger
        trigger.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') { closeNow(); trigger.focus(); }
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                open();
                const first = dropdown.querySelector('.nav-dropdown-link');
                if (first) first.focus();
            }
        });

        // Keyboard: inside dropdown
        dropdown.addEventListener('keydown', (e) => {
            const links = Array.from(dropdown.querySelectorAll('.nav-dropdown-link'));
            const idx   = links.indexOf(document.activeElement);
            if (e.key === 'ArrowDown') { e.preventDefault(); links[(idx + 1) % links.length]?.focus(); }
            if (e.key === 'ArrowUp')   { e.preventDefault(); links[(idx - 1 + links.length) % links.length]?.focus(); }
            if (e.key === 'Escape')    { closeNow(); trigger.focus(); }
            if (e.key === 'Tab' && !e.shiftKey && idx === links.length - 1) closeNow();
        });

        // Active state tracking on scroll
        const dropLinks = dropdown.querySelectorAll('.nav-dropdown-link');
        function updateDropdownActive() {
            const sections = ['about', 'vision-mission', 'fabrication', 'certificates'];
            const navbarH  = navbar ? navbar.offsetHeight : 80;
            const scrollPos = window.pageYOffset + navbarH + 100;
            let current = '';
            sections.forEach(id => {
                const el = document.getElementById(id);
                if (el && scrollPos >= el.offsetTop && scrollPos < el.offsetTop + el.offsetHeight) {
                    current = id;
                }
            });
            dropLinks.forEach(link => {
                const href = link.getAttribute('href').replace('#', '');
                link.classList.toggle('active', href === current);
            });
            // Also light up the trigger if a sub-page is active
            trigger.classList.toggle('active', current !== '');
        }
        window.addEventListener('scroll', updateDropdownActive, { passive: true });
        updateDropdownActive();
    })();

    // ---- Products Mega-Dropdown (handled by nav-products.js) ----
    // The old Products dropdown has been replaced with a two-level mega-dropdown.
    // Its initialization is in js/nav-products.js which is loaded separately.

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

    // Custom Cursor Effect
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    const cursorDot = document.createElement('div');
    cursorDot.classList.add('custom-cursor-dot');
    document.body.appendChild(cursorDot);

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let dotX = 0;
    let dotY = 0;

    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth cursor animation
    function animateCursor() {
        // Smooth following for outer cursor
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        
        // Instant position for dot
        dotX = mouseX;
        dotY = mouseY;

        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        cursorDot.style.left = dotX + 'px';
        cursorDot.style.top = dotY + 'px';

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Add hover effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .nav-link, .nav-cta, .btn, .service-item, .project-card, input, textarea');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
            cursorDot.classList.add('cursor-hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
            cursorDot.classList.remove('cursor-hover');
        });
    });

    // Hide custom cursor on mouse leave
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorDot.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        cursorDot.style.opacity = '1';
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
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animation for better visual flow
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, index * 60);
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
                    const delay = index * 100;
                    
                    setTimeout(() => {
                        item.style.transition = 'opacity 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, delay);
                    
                    capabilityObserver.unobserve(item);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        });

        capabilityItems.forEach(item => {
            capabilityObserver.observe(item);
        });
    }

    // Animated Counter for Statistics
    function animateCounter(element, target, duration = 1800) {
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
            if (!image) return;
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const moveX = (x - centerX) / 15;
            const moveY = (y - centerY) / 15;
            
            image.style.transform = `scale(1.15) translate(${moveX}px, ${moveY}px)`;
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
            this.style.transition = 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });

        item.addEventListener('mousemove', function(e) {
            if (!image) return;
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const moveX = (x - centerX) / 18;
            const moveY = (y - centerY) / 18;
            
            image.style.transform = `scale(1.15) translate(${moveX}px, ${moveY}px)`;
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

    // Certificate Modal Functionality
    const certificateCards = document.querySelectorAll('.certificate-card');
    const certificateModal = document.getElementById('certificateModal');
    const certificateModalClose = certificateModal ? certificateModal.querySelector('.certificate-modal-close') : null;
    const certificateModalOverlay = certificateModal ? certificateModal.querySelector('.certificate-modal-overlay') : null;
    const certificateModalImage = certificateModal ? document.getElementById('certificateModalImage') : null;

    function openCertificateModal(imageSrc, imageAlt) {
        if (!certificateModal || !certificateModalImage) return;
        
        certificateModalImage.src = imageSrc;
        certificateModalImage.alt = imageAlt || 'Certificate';
        certificateModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeCertificateModal() {
        if (!certificateModal) return;
        
        certificateModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Event listeners for certificate cards
    certificateCards.forEach(card => {
        card.addEventListener('click', function() {
            const imageSrc = this.getAttribute('data-certificate');
            const image = this.querySelector('.certificate-image');
            const imageAlt = image ? image.getAttribute('alt') : 'Certificate';
            
            if (imageSrc) {
                openCertificateModal(imageSrc, imageAlt);
            }
        });
    });

    if (certificateModalClose) {
        certificateModalClose.addEventListener('click', closeCertificateModal);
    }

    if (certificateModalOverlay) {
        certificateModalOverlay.addEventListener('click', closeCertificateModal);
    }

    // Close certificate modal on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && certificateModal && certificateModal.classList.contains('active')) {
            closeCertificateModal();
        }
    });

    // Console welcome message (for development)
    console.log('%cAl Dhabi Steel', 'font-size: 24px; font-weight: bold; color: #C29A5B;');
    console.log('%cPremium Industrial Website | Built 2025-2026', 'font-size: 12px; color: #9CA3AF;');

    // ---- Solutions Showcase ----
    (function initShowcase() {

        /**
         * IMAGE MANIFEST
         * Maps each card's data-category value to its image list.
         * The folder for "Customized Manufacturing" has a typo on disk: "Cutomized Manufacturing"
         * — that is handled transparently here via the folder key.
         * To add new images: just add filenames to the array below.
         * To add a new category: add a new key matching the card's data-category.
         */
        const IMAGES = {
            'General Solutions': [
                'images/Slide-images/General%20Solutions/page_32_img_1.jpeg',
                'images/Slide-images/General%20Solutions/page_32_img_4.jpeg',
                'images/Slide-images/General%20Solutions/page_33_img_1.jpeg',
                'images/Slide-images/General%20Solutions/page_33_img_2.jpeg',
                'images/Slide-images/General%20Solutions/page_33_img_4.jpeg',
                'images/Slide-images/General%20Solutions/page_34_img_1.jpeg',
                'images/Slide-images/General%20Solutions/page_34_img_2.jpeg',
                'images/Slide-images/General%20Solutions/page_34_img_5.jpeg',
                'images/Slide-images/General%20Solutions/page_35_img_2.jpeg',
                'images/Slide-images/General%20Solutions/page_36_img_3.jpeg'
            ],
            'Customized Manufacturing': [
                'images/Slide-images/Cutomized%20Manufacturing/page_38_img_2.jpeg',
                'images/Slide-images/Cutomized%20Manufacturing/page_38_img_4.jpeg',
                'images/Slide-images/Cutomized%20Manufacturing/page_39_img_2.jpeg',
                'images/Slide-images/Cutomized%20Manufacturing/page_39_img_3.jpeg',
                'images/Slide-images/Cutomized%20Manufacturing/page_39_img_5.jpeg',
                'images/Slide-images/Cutomized%20Manufacturing/page_40_img_1.jpeg',
                'images/Slide-images/Cutomized%20Manufacturing/page_40_img_2.jpeg',
                'images/Slide-images/Cutomized%20Manufacturing/page_40_img_3.jpeg',
                'images/Slide-images/Cutomized%20Manufacturing/page_41_img_1.jpeg',
                'images/Slide-images/Cutomized%20Manufacturing/page_41_img_3.jpeg',
                'images/Slide-images/Cutomized%20Manufacturing/page_42_img_1.jpeg',
                'images/Slide-images/Cutomized%20Manufacturing/page_42_img_3.jpeg',
                'images/Slide-images/Cutomized%20Manufacturing/page_42_img_4.jpeg',
                'images/Slide-images/Cutomized%20Manufacturing/page_42_img_6.jpeg',
                'images/Slide-images/Cutomized%20Manufacturing/page_43_img_1.jpeg',
                'images/Slide-images/Cutomized%20Manufacturing/page_43_img_4.jpeg',
                'images/Slide-images/Cutomized%20Manufacturing/page_44_img_1.jpeg'
            ],
            'Drainage Solutions': [
                'images/Slide-images/Drainage%20Solutions/page_46_img_2.jpeg',
                'images/Slide-images/Drainage%20Solutions/page_46_img_3.jpeg',
                'images/Slide-images/Drainage%20Solutions/page_46_img_4.jpeg',
                'images/Slide-images/Drainage%20Solutions/page_46_img_6.jpeg',
                'images/Slide-images/Drainage%20Solutions/page_46_img_7.jpeg',
                'images/Slide-images/Drainage%20Solutions/page_46_img_8.jpeg',
                'images/Slide-images/Drainage%20Solutions/page_47_img_1.jpeg',
                'images/Slide-images/Drainage%20Solutions/page_47_img_3.jpeg',
                'images/Slide-images/Drainage%20Solutions/page_47_img_4.png',
                'images/Slide-images/Drainage%20Solutions/page_47_img_5.jpeg',
                'images/Slide-images/Drainage%20Solutions/page_47_img_6.jpeg',
                'images/Slide-images/Drainage%20Solutions/page_48_img_2.jpeg',
                'images/Slide-images/Drainage%20Solutions/page_48_img_3.jpeg',
                'images/Slide-images/Drainage%20Solutions/page_48_img_4.jpeg',
                'images/Slide-images/Drainage%20Solutions/page_48_img_6.jpeg',
                'images/Slide-images/Drainage%20Solutions/page_48_img_7.jpeg',
                'images/Slide-images/Drainage%20Solutions/page_49_img_1.jpeg',
                'images/Slide-images/Drainage%20Solutions/page_49_img_3.jpeg',
                'images/Slide-images/Drainage%20Solutions/page_49_img_4.jpeg',
                'images/Slide-images/Drainage%20Solutions/page_49_img_5.jpeg',
                'images/Slide-images/Drainage%20Solutions/page_49_img_7.jpeg',
                'images/Slide-images/Drainage%20Solutions/page_49_img_8.jpeg',
                'images/Slide-images/Drainage%20Solutions/page_50_img_3.jpeg',
                'images/Slide-images/Drainage%20Solutions/page_51_img_2.jpeg',
                'images/Slide-images/Drainage%20Solutions/page_51_img_4.jpeg',
                'images/Slide-images/Drainage%20Solutions/page_51_img_5.jpeg',
                'images/Slide-images/Drainage%20Solutions/page_52_img_2.jpeg',
                'images/Slide-images/Drainage%20Solutions/page_52_img_3.jpeg',
                'images/Slide-images/Drainage%20Solutions/page_52_img_4.jpeg',
                'images/Slide-images/Drainage%20Solutions/page_52_img_5.jpeg',
                'images/Slide-images/Drainage%20Solutions/page_52_img_7.jpeg',
                'images/Slide-images/Drainage%20Solutions/page_53_img_1.jpeg',
                'images/Slide-images/Drainage%20Solutions/page_53_img_4.jpeg'
            ],
            'Fitout Solutions': [
                'images/Slide-images/Fitout%20Solutions/page_55_img_3.jpeg',
                'images/Slide-images/Fitout%20Solutions/page_55_img_4.jpeg',
                'images/Slide-images/Fitout%20Solutions/page_56_img_1.jpeg',
                'images/Slide-images/Fitout%20Solutions/page_56_img_2.jpeg',
                'images/Slide-images/Fitout%20Solutions/page_56_img_5.jpeg',
                'images/Slide-images/Fitout%20Solutions/page_57_img_1.jpeg',
                'images/Slide-images/Fitout%20Solutions/page_57_img_4.jpeg',
                'images/Slide-images/Fitout%20Solutions/page_58_img_1.jpeg',
                'images/Slide-images/Fitout%20Solutions/page_58_img_2.jpeg',
                'images/Slide-images/Fitout%20Solutions/page_59_img_1.jpeg',
                'images/Slide-images/Fitout%20Solutions/page_59_img_4.jpeg',
                'images/Slide-images/Fitout%20Solutions/page_60_img_1.jpeg',
                'images/Slide-images/Fitout%20Solutions/page_60_img_4.jpeg',
                'images/Slide-images/Fitout%20Solutions/page_60_img_5.jpeg',
                'images/Slide-images/Fitout%20Solutions/page_61_img_1.jpeg',
                'images/Slide-images/Fitout%20Solutions/page_61_img_3.jpeg',
                'images/Slide-images/Fitout%20Solutions/page_61_img_5.jpeg'
            ],
            'Kitchen Solutions': [
                'images/Slide-images/Kitchen%20Solutions/page_63_img_1.jpeg',
                'images/Slide-images/Kitchen%20Solutions/page_63_img_3.jpeg',
                'images/Slide-images/Kitchen%20Solutions/page_63_img_5.jpeg',
                'images/Slide-images/Kitchen%20Solutions/page_64_img_1.jpeg',
                'images/Slide-images/Kitchen%20Solutions/page_64_img_2.jpeg',
                'images/Slide-images/Kitchen%20Solutions/page_64_img_3.jpeg',
                'images/Slide-images/Kitchen%20Solutions/page_64_img_6.jpeg',
                'images/Slide-images/Kitchen%20Solutions/page_65_img_1.jpeg',
                'images/Slide-images/Kitchen%20Solutions/page_65_img_4.jpeg',
                'images/Slide-images/Kitchen%20Solutions/page_66_img_1.jpeg',
                'images/Slide-images/Kitchen%20Solutions/page_66_img_2.jpeg',
                'images/Slide-images/Kitchen%20Solutions/page_66_img_5.jpeg',
                'images/Slide-images/Kitchen%20Solutions/page_67_img_1.jpeg',
                'images/Slide-images/Kitchen%20Solutions/page_67_img_3.jpeg',
                'images/Slide-images/Kitchen%20Solutions/page_67_img_5.jpeg'
            ]
        };

        // DOM refs
        const panel       = document.getElementById('showcasePanel');
        const titleEl     = document.getElementById('showcaseTitle');
        const track       = document.getElementById('showcaseTrack');
        const thumbsEl    = document.getElementById('showcaseThumbs');
        const counterEl   = document.getElementById('showcaseCounter');
        const prevBtn     = document.getElementById('showcasePrev');
        const nextBtn     = document.getElementById('showcaseNext');
        const closeBtn    = document.getElementById('showcaseClose');
        const cards       = document.querySelectorAll('.portfolio-card[data-category]');

        if (!panel || !track) return;

        let currentIndex    = 0;
        let activeCategory  = null;
        let images          = [];

        // ── Build slides & thumbs ──────────────────────────────────────────
        function buildGallery(category) {
            images = IMAGES[category] || [];
            if (!images.length) return;

            // Clear
            track.innerHTML    = '';
            thumbsEl.innerHTML = '';

            images.forEach((src, i) => {
                // Slide
                const slide = document.createElement('div');
                slide.className = 'showcase-slide';

                const img = document.createElement('img');
                img.alt    = category + ' image ' + (i + 1);
                img.className = 'lazy-pending';

                // Lazy-load: use IntersectionObserver if available, else load immediately
                if ('IntersectionObserver' in window) {
                    img.dataset.lazySrc = src;
                    lazyObserver.observe(img);
                } else {
                    img.src = src;
                    img.classList.replace('lazy-pending', 'lazy-loaded');
                }

                slide.appendChild(img);
                track.appendChild(slide);

                // Thumb
                const thumb = document.createElement('button');
                thumb.className   = 'showcase-thumb' + (i === 0 ? ' is-active' : '');
                thumb.setAttribute('aria-label', 'View image ' + (i + 1));
                thumb.setAttribute('data-index', i);

                const tImg = document.createElement('img');
                tImg.alt = '';
                tImg.loading = 'lazy';
                tImg.src = src; // thumbs are small — load normally
                thumb.appendChild(tImg);

                thumb.addEventListener('click', () => goTo(i));
                thumbsEl.appendChild(thumb);
            });

            // Force load first + second image immediately
            loadSlideImage(0);
            loadSlideImage(1);
        }

        // Load a specific slide's lazy image now
        function loadSlideImage(index) {
            const slides = track.querySelectorAll('.showcase-slide');
            if (!slides[index]) return;
            const img = slides[index].querySelector('img');
            if (img && img.dataset.lazySrc) {
                img.src = img.dataset.lazySrc;
                delete img.dataset.lazySrc;
                img.onload  = () => img.classList.replace('lazy-pending', 'lazy-loaded');
                img.onerror = () => img.classList.replace('lazy-pending', 'lazy-loaded');
                if (lazyObserver) lazyObserver.unobserve(img);
            }
        }

        // Lazy observer for offscreen images
        const lazyObserver = ('IntersectionObserver' in window)
            ? new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.lazySrc) {
                            img.src = img.dataset.lazySrc;
                            delete img.dataset.lazySrc;
                            img.onload  = () => img.classList.replace('lazy-pending', 'lazy-loaded');
                            img.onerror = () => img.classList.replace('lazy-pending', 'lazy-loaded');
                        }
                        lazyObserver.unobserve(img);
                    }
                });
            }, { rootMargin: '200px' })
            : null;

        // ── Navigation ─────────────────────────────────────────────────────
        function goTo(index) {
            const total = images.length;
            currentIndex = Math.max(0, Math.min(index, total - 1));

            // Move track
            track.style.transform = `translateX(-${currentIndex * 100}%)`;

            // Counter
            counterEl.textContent = (currentIndex + 1) + ' / ' + total;

            // Arrows
            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex === total - 1;

            // Thumbs
            const thumbBtns = thumbsEl.querySelectorAll('.showcase-thumb');
            thumbBtns.forEach((t, i) => t.classList.toggle('is-active', i === currentIndex));

            // Scroll active thumb into view
            if (thumbBtns[currentIndex]) {
                thumbBtns[currentIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }

            // Pre-load adjacent slides
            loadSlideImage(currentIndex + 1);
            loadSlideImage(currentIndex - 1);
        }

        prevBtn.addEventListener('click', () => goTo(currentIndex - 1));
        nextBtn.addEventListener('click', () => goTo(currentIndex + 1));

        // ── Open / Close panel ─────────────────────────────────────────────
        function openPanel(category) {
            if (activeCategory === category && panel.classList.contains('is-open')) {
                // Clicking same card again → close
                closePanel();
                return;
            }

            activeCategory = category;

            // Update title
            titleEl.textContent = category;

            // Build gallery
            buildGallery(category);

            // Reset to first image
            currentIndex = 0;
            track.style.transform = 'translateX(0)';
            goTo(0);

            // Show panel
            panel.classList.add('is-open');
            panel.setAttribute('aria-hidden', 'false');

            // Smooth scroll to panel after transition starts
            setTimeout(() => {
                panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 120);
        }

        function closePanel() {
            panel.classList.remove('is-open');
            panel.setAttribute('aria-hidden', 'true');
            activeCategory = null;

            // Remove active state from all cards
            cards.forEach(c => c.classList.remove('is-active'));
        }

        closeBtn.addEventListener('click', closePanel);

        // ── Card click handlers ────────────────────────────────────────────
        cards.forEach(card => {
            card.addEventListener('click', function () {
                const category = this.getAttribute('data-category');

                // Toggle active card highlight
                const isAlreadyActive = this.classList.contains('is-active');
                cards.forEach(c => c.classList.remove('is-active'));
                if (!isAlreadyActive) this.classList.add('is-active');

                openPanel(category);
            });

            // Make cards focusable for accessibility
            if (!card.hasAttribute('tabindex')) card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');

            card.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });

        // ── Touch / swipe on main viewport ────────────────────────────────
        let touchStartX = 0;
        let touchStartY = 0;
        const viewport = panel.querySelector('.showcase-main-viewport');

        viewport.addEventListener('touchstart', e => {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        }, { passive: true });

        viewport.addEventListener('touchend', e => {
            const dx = touchStartX - e.changedTouches[0].clientX;
            const dy = Math.abs(touchStartY - e.changedTouches[0].clientY);
            if (Math.abs(dx) > 40 && Math.abs(dx) > dy) {
                goTo(dx > 0 ? currentIndex + 1 : currentIndex - 1);
            }
        }, { passive: true });

        // ── Keyboard navigation (when panel is open) ──────────────────────
        document.addEventListener('keydown', e => {
            if (!panel.classList.contains('is-open')) return;
            if (e.key === 'ArrowLeft')  goTo(currentIndex - 1);
            if (e.key === 'ArrowRight') goTo(currentIndex + 1);
            if (e.key === 'Escape')     closePanel();
        });

    })();

    // ---- Client Reviews Carousel ----
    (function initClientReviews() {
        const track    = document.getElementById('crTrack');
        const viewport = document.getElementById('crViewport');
        const dotsWrap = document.getElementById('crDots');
        const prevBtn  = document.getElementById('crPrev');
        const nextBtn  = document.getElementById('crNext');
        if (!track || !viewport) return;

        const REVIEWS = [
            { name: 'Ahmed Hassan',      company: 'Aloft Hotels UAE',                  rating: 5, date: 'February 2025',  text: 'Outstanding quality on our commercial kitchen fabrication. Delivered ahead of schedule with zero defects. Professional team from start to finish.' },
            { name: 'Sara Al Mansouri',  company: 'Lulu Hypermarket Group',            rating: 5, date: 'January 2025',   text: 'Complex drainage specs handled flawlessly. Al Dhabi Steel\'s attention to detail is second to none in the UAE market. Highly recommended for any contractor.' },
            { name: 'Rafael Castillo',   company: 'Expo 2020 Peru Pavilion',           rating: 5, date: 'December 2024',  text: 'Worked with them on Expo 2020. The architectural metalwork was spectacular — precision, finish, and timeline all exceeded our expectations.' },
            { name: 'James Worthington', company: 'Lancaster Gate Development, London',rating: 5, date: 'November 2024',  text: 'Excellent bespoke stainless steel work for our London residential project. Premium finish quality and great communication throughout the entire project.' },
            { name: 'Noura Al Dhaheri',  company: 'Silicon Central Mall Dubai',       rating: 5, date: 'October 2024',   text: 'All structural steel work passed inspection on the first attempt. On budget, on time. A reliable and highly skilled fabrication partner.' },
            { name: 'Khalid Al Ameri',   company: 'Khorfakkan Municipality, Sharjah', rating: 5, date: 'September 2024', text: 'Hygiene-grade stainless steel for our slaughterhouse facility — full compliance, no shortcuts. Very professional delivery and post-installation support.' },
            { name: 'Mohammed Al Zaabi', company: 'Abu Dhabi Infrastructure Corp',    rating: 5, date: 'August 2024',    text: 'Top-tier fabrication quality. The team understood our industrial requirements immediately and delivered ahead of the agreed timeline. Truly a cut above.' },
            { name: 'Priya Nair',        company: 'Nujum Al Amerat Mall, Oman',       rating: 5, date: 'July 2024',      text: 'Al Dhabi Steel handled the complete fitout metalwork for our mall. Coordination was seamless, quality immaculate. Will not hesitate to use them again.' },
            { name: 'David Thornton',    company: 'Marine Residences Albany, Bahamas',rating: 5, date: 'June 2024',      text: 'Even for an international project, they delivered on every commitment. The quality of their stainless steel craftsmanship is world-class.' },
        ];

        function esc(s) {
            return String(s)
                .replace(/&/g, '&amp;').replace(/</g, '&lt;')
                .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
        }

        function initials(n) {
            return n.trim().split(/\s+/).slice(0, 2).map(w => w[0].toUpperCase()).join('');
        }

        function stars(n) { return '★'.repeat(n) + '☆'.repeat(5 - n); }

        // Build cards
        REVIEWS.forEach(r => {
            const card = document.createElement('div');
            card.className = 'cr-card';
            card.innerHTML = `
                <span class="cr-card-quote" aria-hidden="true">"</span>
                <div class="cr-card-head">
                    <div class="cr-card-avatar">${initials(r.name)}</div>
                    <div class="cr-card-info">
                        <div class="cr-card-name">${esc(r.name)}</div>
                        ${r.company ? `<div class="cr-card-company">${esc(r.company)}</div>` : ''}
                    </div>
                </div>
                <div class="cr-card-meta">
                    <span class="cr-card-stars" aria-label="${r.rating} out of 5 stars">${stars(r.rating)}</span>
                    ${r.date ? `<span class="cr-card-date">${esc(r.date)}</span>` : ''}
                </div>
                <p class="cr-card-text">${esc(r.text)}</p>`;
            track.appendChild(card);
        });

        const cards = Array.from(track.querySelectorAll('.cr-card'));
        const total = cards.length;
        let current = 0;
        let autoTimer = null;

        function visibleCount() {
            if (window.innerWidth <= 640)  return 1;
            if (window.innerWidth <= 1024) return 2;
            return 3;
        }

        function maxIndex() {
            return Math.max(0, total - visibleCount());
        }

        function setCardWidth() {
            const vis  = visibleCount();
            const gap  = 20; // px — matches 1.25rem at 16px base
            const vpW  = viewport.clientWidth;
            const cardW = (vpW - gap * (vis - 1)) / vis;
            cards.forEach(c => {
                c.style.flex = `0 0 ${cardW}px`;
                c.style.maxWidth = `${cardW}px`;
            });
        }

        function buildDots() {
            dotsWrap.innerHTML = '';
            const pages = maxIndex() + 1;
            for (let i = 0; i < pages; i++) {
                const btn = document.createElement('button');
                btn.className = 'cr-dot' + (i === 0 ? ' active' : '');
                btn.setAttribute('aria-label', `Go to page ${i + 1}`);
                btn.setAttribute('role', 'tab');
                btn.addEventListener('click', () => goTo(i));
                dotsWrap.appendChild(btn);
            }
        }

        function updateDots() {
            const dots = dotsWrap.querySelectorAll('.cr-dot');
            dots.forEach((d, i) => d.classList.toggle('active', i === current));
        }

        function goTo(index) {
            current = Math.max(0, Math.min(index, maxIndex()));
            const gap = 20;
            const cardW = cards[0] ? cards[0].offsetWidth : 0;
            track.style.transform = `translateX(-${current * (cardW + gap)}px)`;
            updateDots();
        }

        function next() { goTo(current >= maxIndex() ? 0 : current + 1); }
        function prev() { goTo(current <= 0 ? maxIndex() : current - 1); }

        function startAuto() {
            stopAuto();
            autoTimer = setInterval(next, 5000);
        }

        function stopAuto() {
            if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
        }

        prevBtn.addEventListener('click', () => { prev(); startAuto(); });
        nextBtn.addEventListener('click', () => { next(); startAuto(); });

        // Pause on hover
        viewport.addEventListener('mouseenter', stopAuto);
        viewport.addEventListener('mouseleave', startAuto);

        // Touch / swipe support
        let touchStartX = 0;
        viewport.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; stopAuto(); }, { passive: true });
        viewport.addEventListener('touchend', e => {
            const diff = touchStartX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 40) { diff > 0 ? next() : prev(); }
            startAuto();
        }, { passive: true });

        // Keyboard navigation
        viewport.setAttribute('tabindex', '0');
        viewport.addEventListener('keydown', e => {
            if (e.key === 'ArrowLeft')  { prev(); startAuto(); }
            if (e.key === 'ArrowRight') { next(); startAuto(); }
        });

        // Resize recalc
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                setCardWidth();
                buildDots();
                goTo(Math.min(current, maxIndex()));
            }, 120);
        });

        // Init
        setCardWidth();
        buildDots();
        goTo(0);
        startAuto();

        // ---- Review Form ----
        const form    = document.getElementById('crForm');
        const picker  = document.getElementById('crStarPicker');
        const rInput  = document.getElementById('crRating');
        if (!form || !picker) return;

        let chosen = 0;
        const starBtns = Array.from(picker.querySelectorAll('.cr-star-btn'));

        function paintStars(hover, sel) {
            starBtns.forEach((b, i) => {
                b.classList.toggle('lit',  i < hover);
                b.classList.toggle('pick', i < sel && !hover);
            });
        }

        starBtns.forEach((btn, i) => {
            btn.addEventListener('mouseenter', () => paintStars(i + 1, chosen));
            btn.addEventListener('mouseleave', () => paintStars(0, chosen));
            btn.addEventListener('click', () => {
                chosen = i + 1;
                rInput.value = chosen;
                picker.classList.remove('cr-err-ring');
                paintStars(0, chosen);
            });
        });

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const nameEl    = document.getElementById('crName');
            const companyEl = document.getElementById('crCompany');
            const textEl    = document.getElementById('crText');
            const name      = nameEl.value.trim();
            const company   = companyEl ? companyEl.value.trim() : '';
            const rating    = parseInt(rInput.value, 10);
            const text      = textEl.value.trim();

            // Validate
            let ok = true;
            [nameEl, textEl].forEach(el => {
                el.classList.remove('cr-err');
                if (!el.value.trim()) { el.classList.add('cr-err'); ok = false; }
            });
            if (rating < 1) { picker.classList.add('cr-err-ring'); ok = false; }
            if (!ok) return;

            // Prepend card to carousel track
            const newReview = { name, company, rating, date: 'Just now', text };
            const card = document.createElement('div');
            card.className = 'cr-card';
            card.innerHTML = `
                <span class="cr-card-quote" aria-hidden="true">"</span>
                <div class="cr-card-head">
                    <div class="cr-card-avatar">${initials(name)}</div>
                    <div class="cr-card-info">
                        <div class="cr-card-name">${esc(name)}</div>
                        ${company ? `<div class="cr-card-company">${esc(company)}</div>` : ''}
                    </div>
                </div>
                <div class="cr-card-meta">
                    <span class="cr-card-stars" aria-label="${rating} out of 5 stars">${stars(rating)}</span>
                    <span class="cr-card-date">Just now</span>
                </div>
                <p class="cr-card-text">${esc(text)}</p>`;
            track.insertBefore(card, track.firstChild);
            cards.unshift(card);

            // Recalc carousel
            setCardWidth();
            buildDots();
            goTo(0);

            // Show success banner
            const banner = document.createElement('div');
            banner.className = 'cr-success';
            banner.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="20" height="20" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12"/>
                </svg>
                Thank you, ${esc(name)}! Your review has been added.`;
            form.replaceWith(banner);
        });
    })();

    // ---- Products Carousel ----
    (function initCarousel() {
        const track     = document.getElementById('carTrack');
        const dotsWrap  = document.getElementById('carDots');
        const prevBtn   = document.getElementById('carPrev');
        const nextBtn   = document.getElementById('carNext');
        if (!track) return;

        const cards     = Array.from(track.querySelectorAll('.car-card'));
        const total     = cards.length;

        // How many cards are visible depends on viewport
        function visibleCount() {
            if (window.innerWidth <= 640)  return 1;
            if (window.innerWidth <= 1024) return 2;
            return 3;
        }

        // Card width + gap in px
        function stepPx() {
            const card = cards[0];
            const style = window.getComputedStyle(track);
            const gap   = parseFloat(style.gap) || 24;
            return card.getBoundingClientRect().width + gap;
        }

        let current = 0; // index of first visible card

        // Build dots (one per page)
        function pageCount() {
            return Math.ceil(total / visibleCount());
        }

        function buildDots() {
            dotsWrap.innerHTML = '';
            const pages = pageCount();
            for (let i = 0; i < pages; i++) {
                const dot = document.createElement('button');
                dot.className = 'car-dot' + (i === 0 ? ' active' : '');
                dot.setAttribute('aria-label', 'Go to page ' + (i + 1));
                dot.addEventListener('click', () => goTo(i * visibleCount()));
                dotsWrap.appendChild(dot);
            }
        }

        function updateDots() {
            const vc    = visibleCount();
            const page  = Math.round(current / vc);
            const dots  = dotsWrap.querySelectorAll('.car-dot');
            dots.forEach((d, i) => d.classList.toggle('active', i === page));
        }

        function updateArrows() {
            prevBtn.disabled = current === 0;
            nextBtn.disabled = current >= total - visibleCount();
        }

        function goTo(index) {
            const vc  = visibleCount();
            const max = Math.max(0, total - vc);
            current   = Math.max(0, Math.min(index, max));
            track.style.transform = `translateX(-${current * stepPx()}px)`;
            updateDots();
            updateArrows();
        }

        prevBtn.addEventListener('click', () => goTo(current - visibleCount()));
        nextBtn.addEventListener('click', () => goTo(current + visibleCount()));

        // Touch / swipe
        let touchX = 0;
        track.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
        track.addEventListener('touchend', e => {
            const diff = touchX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) goTo(diff > 0 ? current + 1 : current - 1);
        }, { passive: true });

        // Keyboard
        document.addEventListener('keydown', e => {
            const sec = document.getElementById('products');
            if (!sec) return;
            const r = sec.getBoundingClientRect();
            if (r.top < window.innerHeight && r.bottom > 0) {
                if (e.key === 'ArrowLeft')  goTo(current - 1);
                if (e.key === 'ArrowRight') goTo(current + 1);
            }
        });

        // Rebuild on resize
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                buildDots();
                goTo(0);
            }, 150);
        });

        buildDots();
        goTo(0);
    })();

})();
