/**
 * AL DHABI STEEL — Products Mega-Dropdown
 * Handles the two-level sideways Products navigation.
 * Included on every page that has the new products mega-dropdown.
 */
(function () {
    'use strict';

    /* ── Detect current page ──────────────────── */
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    /* ── Map: page filename → [l1Index, l2Index or -1] ──
       l1 parent indices:
         0 = End-to-End Range Products
         1 = Craft Engineered Design
         2 = Access & Utility Service Panels
         3 = Tailor-Made Drainage Products
         4 = Exotic Bespoke Designs
         5 = Kitchen Catering Solutions
    */
    const pageMap = {
        'end-to-end-range.html':       [0, -1],
        'general-solutions.html':      [0,  0],
        'all-customized.html':         [1, -1],
        'customized-manufacturing.html': [1, -1],
        'access-utility-panels.html':  [2, -1],
        'manhole-covers.html':         [2,  0],
        'floor-access-panels.html':    [2,  1],
        'wall-access-panels.html':     [2,  2],
        'roof-access-hatch.html':      [2,  3],
        'drainage-solutions.html':     [3, -1],
        'channel-gratings.html':       [3,  0],
        'slot-linear-drains.html':     [3,  1],
        'shower-floor-drains.html':    [3,  2],
        'cleanouts-rainwater.html':    [3,  3],
        'fitout-solutions.html':       [4, -1],
        'kitchen-solutions.html':      [5, -1],
    };

    /* ── DOM references ──────────────────────── */
    const megaPanel   = document.getElementById('productsMega');
    const productsItem = document.getElementById('productsDropdownItem');
    const productsTrigger = document.getElementById('productsTrigger');
    if (!megaPanel || !productsItem || !productsTrigger) return;

    /* ── Mark active links ────────────────────── */
    const activePair = pageMap[currentPage] || [-1, -1];

    // L1 active
    const l1Links = megaPanel.querySelectorAll('.mega-parent-link[data-l1]');
    l1Links.forEach(link => {
        if (parseInt(link.dataset.l1, 10) === activePair[0]) {
            link.classList.add('active');
        }
    });

    // L2 active
    const l2Links = megaPanel.querySelectorAll('.mega-child-link[data-l2]');
    l2Links.forEach(link => {
        const l1 = parseInt(link.closest('.mega-sub-panel')?.dataset.parent || '-1', 10);
        const l2 = parseInt(link.dataset.l2, 10);
        if (l1 === activePair[0] && l2 === activePair[1]) {
            link.classList.add('active');
        }
    });

    // Highlight the Products trigger when on a product page
    if (activePair[0] !== -1) {
        productsTrigger.classList.add('active');
    }

    /* ── Mega-dropdown open / close ──────────── */
    const isMobile = () => window.innerWidth <= 768;
    let closeTimer = null;

    function open() {
        clearTimeout(closeTimer);
        productsItem.classList.add('is-open');
        productsTrigger.setAttribute('aria-expanded', 'true');
    }

    function scheduleClose() {
        clearTimeout(closeTimer);
        closeTimer = setTimeout(() => {
            productsItem.classList.remove('is-open');
            productsTrigger.setAttribute('aria-expanded', 'false');
            resetL2();
        }, 240);
    }

    function closeNow() {
        clearTimeout(closeTimer);
        productsItem.classList.remove('is-open');
        productsTrigger.setAttribute('aria-expanded', 'false');
        resetL2();
    }

    function toggle() {
        productsItem.classList.contains('is-open') ? closeNow() : open();
    }

    // Desktop hover
    productsItem.addEventListener('mouseenter', () => { if (!isMobile()) open(); });
    productsItem.addEventListener('mouseleave', () => { if (!isMobile()) scheduleClose(); });
    megaPanel.addEventListener('mouseenter', () => { if (!isMobile()) clearTimeout(closeTimer); });
    megaPanel.addEventListener('mouseleave', () => { if (!isMobile()) scheduleClose(); });

    // Click / touch toggle
    productsTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        toggle();
    });

    // Outside click closes
    document.addEventListener('click', (e) => {
        if (!isMobile() && !productsItem.contains(e.target)) closeNow();
    });

    // Close on link click (desktop + mobile)
    megaPanel.querySelectorAll('.mega-parent-link:not([data-has-children]), .mega-child-link').forEach(link => {
        link.addEventListener('click', () => {
            closeNow();
            // Close mobile menu too
            const navToggle = document.getElementById('navToggle');
            const navMenu   = document.getElementById('navMenu');
            if (isMobile() && navToggle && navMenu) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    /* ── L2 Flyout logic (desktop hover) ──────── */
    const megaItems    = megaPanel.querySelectorAll('.mega-item[data-l1]');
    let activeItem = null;

    function showL2(item) {
        if (item === activeItem) return;

        // Reset previous
        if (activeItem) {
            activeItem.classList.remove('is-active');
            const prevPanel = megaPanel.querySelector(`.mega-sub-panel[data-parent="${activeItem.dataset.l1}"]`);
            if (prevPanel) prevPanel.classList.remove('is-visible');
        }

        activeItem = item;
        item.classList.add('is-active');

        const panel = megaPanel.querySelector(`.mega-sub-panel[data-parent="${item.dataset.l1}"]`);
        if (panel) {
            panel.classList.add('is-visible');
        }
    }

    function resetL2() {
        if (activeItem) {
            activeItem.classList.remove('is-active');
            const prevPanel = megaPanel.querySelector(`.mega-sub-panel[data-parent="${activeItem.dataset.l1}"]`);
            if (prevPanel) prevPanel.classList.remove('is-visible');
        }
        activeItem = null;
    }

    megaItems.forEach(item => {
        const link = item.querySelector('.mega-parent-link');
        if (!link) return;

        // Desktop: hover reveals L2
        item.addEventListener('mouseenter', () => {
            if (!isMobile() && item.hasAttribute('data-has-children')) {
                showL2(item);
            }
        });

        // Mobile: tap toggles L2 sub-panel inline
        if (item.hasAttribute('data-has-children')) {
            link.addEventListener('click', (e) => {
                if (isMobile()) {
                    e.preventDefault();
                    const panel = megaPanel.querySelector(`.mega-sub-panel[data-parent="${item.dataset.l1}"]`);
                    if (panel) {
                        const isOpen = item.classList.contains('is-active');
                        resetL2();
                        if (!isOpen) showL2(item);
                    }
                }
            });
        }
    });

    /* ── Keyboard navigation ─────────────────── */
    productsTrigger.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') { closeNow(); productsTrigger.focus(); }
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            open();
            const first = megaPanel.querySelector('.mega-parent-link');
            if (first) first.focus();
        }
    });

    megaPanel.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') { closeNow(); productsTrigger.focus(); }
        const allLinks = Array.from(megaPanel.querySelectorAll('.mega-parent-link, .mega-child-link:not([style*="display: none"])'));
        const idx = allLinks.indexOf(document.activeElement);
        if (e.key === 'ArrowDown') { e.preventDefault(); allLinks[(idx + 1) % allLinks.length]?.focus(); }
        if (e.key === 'ArrowUp')   { e.preventDefault(); allLinks[(idx - 1 + allLinks.length) % allLinks.length]?.focus(); }
        if (e.key === 'ArrowRight') {
            e.preventDefault();
            const item = document.activeElement.closest('.mega-item[data-has-children]');
            if (item) {
                showL2(item);
                const panel = megaPanel.querySelector(`.mega-sub-panel[data-parent="${item.dataset.l1}"]`);
                panel?.querySelector('.mega-child-link')?.focus();
            }
        }
    });

})();
