/**
 * AL DHABI STEEL — Solution Pages
 * Shared JS for all 5 solution pages
 * Handles: navbar scroll, scroll animations, lightbox, mobile menu
 */
(function () {
    'use strict';

    /* ── Navbar scroll state ──────────────────── */
    const navbar = document.getElementById('navbar');
    if (navbar) {
        // Always scrolled on inner pages (already styled via CSS),
        // but keep the class in sync for any JS that checks it
        navbar.classList.add('scrolled');
    }

    /* ── Mobile nav toggle ─────────────────────── */
    const navToggle = document.getElementById('navToggle');
    const navMenu   = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        navMenu.querySelectorAll('.nav-link, .nav-dropdown-link').forEach(link => {
            link.addEventListener('click', () => {
                // Don't close the nav if this link is a dropdown trigger
                if (link.classList.contains('nav-dropdown-trigger')) return;
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

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

    /* ── Company dropdown ─────────────────────── */
    (function initDropdown() {
        const item     = document.getElementById('companyDropdownItem');
        const trigger  = document.getElementById('companyTrigger');
        const dropdown = document.getElementById('companyDropdown');
        if (!item || !trigger || !dropdown) return;

        const isMobile = () => window.innerWidth <= 768;
        let closeTimer = null;

        const open = () => {
            clearTimeout(closeTimer);
            item.classList.add('is-open');
            trigger.setAttribute('aria-expanded', 'true');
        };

        const scheduleClose = () => {
            clearTimeout(closeTimer);
            closeTimer = setTimeout(() => {
                item.classList.remove('is-open');
                trigger.setAttribute('aria-expanded', 'false');
            }, 220);
        };

        const closeNow = () => {
            clearTimeout(closeTimer);
            item.classList.remove('is-open');
            trigger.setAttribute('aria-expanded', 'false');
        };

        item.addEventListener('mouseenter', () => { if (!isMobile()) open(); });
        item.addEventListener('mouseleave', () => { if (!isMobile()) scheduleClose(); });
        dropdown.addEventListener('mouseenter', () => { if (!isMobile()) clearTimeout(closeTimer); });
        dropdown.addEventListener('mouseleave', () => { if (!isMobile()) scheduleClose(); });
        trigger.addEventListener('click', (e) => { e.stopPropagation(); item.classList.contains('is-open') ? closeNow() : open(); });
        dropdown.querySelectorAll('.nav-dropdown-link').forEach(l => l.addEventListener('click', closeNow));
        document.addEventListener('click', (e) => { if (!isMobile() && !item.contains(e.target)) closeNow(); });
        trigger.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') { closeNow(); trigger.focus(); }
            if (e.key === 'ArrowDown') { e.preventDefault(); open(); dropdown.querySelector('.nav-dropdown-link')?.focus(); }
        });
        dropdown.addEventListener('keydown', (e) => {
            const links = Array.from(dropdown.querySelectorAll('.nav-dropdown-link'));
            const idx = links.indexOf(document.activeElement);
            if (e.key === 'ArrowDown') { e.preventDefault(); links[(idx + 1) % links.length]?.focus(); }
            if (e.key === 'ArrowUp')   { e.preventDefault(); links[(idx - 1 + links.length) % links.length]?.focus(); }
            if (e.key === 'Escape')    { closeNow(); trigger.focus(); }
        });
    })();

    /* ── Products mega-dropdown handled by nav-products.js ── */

    /* ── Scroll animations ────────────────────── */
    const animObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('animated'), i * 60);
                animObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.animate-on-scroll').forEach(el => animObserver.observe(el));

    /* Gallery cards stagger */
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                const cards = Array.from(document.querySelectorAll('.sol-card'));
                const idx = cards.indexOf(card);
                setTimeout(() => card.classList.add('animated'), (idx % 4) * 80);
                cardObserver.unobserve(card);
            }
        });
    }, { threshold: 0.05, rootMargin: '0px 0px -30px 0px' });

    document.querySelectorAll('.sol-card').forEach(el => cardObserver.observe(el));

    /* ── Hero bg Ken-Burns effect after load ───── */
    const heroBg = document.querySelector('.sol-hero-bg');
    if (heroBg) {
        if (heroBg.complete) {
            heroBg.classList.add('loaded');
        } else {
            heroBg.addEventListener('load', () => heroBg.classList.add('loaded'));
        }
    }

    /* ── Custom cursor ───────────────────────── */
    if (!window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
        const cursor    = document.createElement('div');
        const cursorDot = document.createElement('div');
        cursor.className    = 'custom-cursor';
        cursorDot.className = 'custom-cursor-dot';
        document.body.appendChild(cursor);
        document.body.appendChild(cursorDot);

        let mx = 0, my = 0, cx = 0, cy = 0;
        document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

        (function animCursor() {
            cx += (mx - cx) * 0.15;
            cy += (my - cy) * 0.15;
            cursor.style.left    = cx + 'px';
            cursor.style.top     = cy + 'px';
            cursorDot.style.left = mx + 'px';
            cursorDot.style.top  = my + 'px';
            requestAnimationFrame(animCursor);
        })();

        document.querySelectorAll('a, button, .sol-card, input, textarea').forEach(el => {
            el.addEventListener('mouseenter', () => { cursor.classList.add('cursor-hover'); cursorDot.classList.add('cursor-hover'); });
            el.addEventListener('mouseleave', () => { cursor.classList.remove('cursor-hover'); cursorDot.classList.remove('cursor-hover'); });
        });
    }

    /* ── Lightbox ─────────────────────────────── */
    (function initLightbox() {
        const lb         = document.getElementById('solLightbox');
        const overlay    = lb && lb.querySelector('.sol-lightbox-overlay');
        const closeBtn   = lb && lb.querySelector('.sol-lb-close');
        const prevBtn    = lb && lb.querySelector('.sol-lb-prev');
        const nextBtn    = lb && lb.querySelector('.sol-lb-next');
        const imgEl      = lb && lb.querySelector('.sol-lb-img-wrap img');
        const counterEl  = lb && lb.querySelector('.sol-lb-counter');
        const captionEl  = lb && lb.querySelector('.sol-lb-caption');
        if (!lb || !imgEl) return;

        const cards  = Array.from(document.querySelectorAll('.sol-card'));
        let current  = 0;
        let zoomed   = false;

        function open(index) {
            current = index;
            render();
            lb.classList.add('is-open');
            document.body.style.overflow = 'hidden';
            imgEl.classList.remove('zoomed');
            zoomed = false;
        }

        function close() {
            lb.classList.remove('is-open');
            document.body.style.overflow = '';
            imgEl.src = '';
            imgEl.classList.remove('zoomed');
            zoomed = false;
        }

        function render() {
            const card  = cards[current];
            const src   = card.dataset.imgSrc;
            const title = card.dataset.title || '';
            const cat   = card.dataset.category || '';

            imgEl.src = src;
            imgEl.alt = title;
            if (counterEl)  counterEl.textContent = (current + 1) + ' / ' + cards.length;
            if (captionEl)  captionEl.textContent  = title + (cat ? ' — ' + cat : '');
            if (prevBtn)    prevBtn.disabled = current === 0;
            if (nextBtn)    nextBtn.disabled = current === cards.length - 1;
            imgEl.classList.remove('zoomed');
            zoomed = false;
        }

        function prev() { if (current > 0) { current--; render(); } }
        function next() { if (current < cards.length - 1) { current++; render(); } }

        /* Open on card click */
        cards.forEach((card, i) => {
            card.addEventListener('click', () => open(i));
        });

        /* Controls */
        if (overlay) overlay.addEventListener('click', close);
        if (closeBtn) closeBtn.addEventListener('click', close);
        if (prevBtn)  prevBtn.addEventListener('click', prev);
        if (nextBtn)  nextBtn.addEventListener('click', next);

        /* Click anywhere outside the image to close */
        lb.addEventListener('click', (e) => {
            if (!e.target.closest('.sol-lb-img-wrap') &&
                !e.target.closest('.sol-lb-close') &&
                !e.target.closest('.sol-lb-arrow')) {
                close();
            }
        });

        /* Zoom toggle on image click */
        imgEl.addEventListener('click', (e) => {
            e.stopPropagation();
            zoomed = !zoomed;
            imgEl.classList.toggle('zoomed', zoomed);
        });

        /* Keyboard */
        document.addEventListener('keydown', (e) => {
            if (!lb.classList.contains('is-open')) return;
            if (e.key === 'ArrowLeft')  { e.preventDefault(); prev(); }
            if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
            if (e.key === 'Escape')     close();
            if (e.key === '+' || e.key === '=') { zoomed = true;  imgEl.classList.add('zoomed'); }
            if (e.key === '-')                   { zoomed = false; imgEl.classList.remove('zoomed'); }
        });

        /* Touch swipe */
        let ts = 0;
        lb.addEventListener('touchstart', e => { ts = e.touches[0].clientX; }, { passive: true });
        lb.addEventListener('touchend', e => {
            const dx = ts - e.changedTouches[0].clientX;
            if (Math.abs(dx) > 45) { dx > 0 ? next() : prev(); }
        }, { passive: true });
    })();

    /* ── Scroll progress bar ─────────────────── */
    const bar = document.createElement('div');
    bar.style.cssText = 'position:fixed;top:0;left:0;width:0%;height:3px;background:linear-gradient(90deg,var(--color-accent),var(--color-accent-hover));z-index:10001;pointer-events:none;transition:width 0.1s ease-out;';
    document.body.appendChild(bar);
    window.addEventListener('scroll', () => {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = (h > 0 ? (window.pageYOffset / h * 100) : 0) + '%';
    }, { passive: true });

})();
