const fs = require('fs');
const path = require('path');

// ── Shared nav HTML ──────────────────────────────────────────────────────────
function navHtml(activeL1 = -1, activeL2 = -1) {
    const l1active = (i) => activeL1 === i ? ' active' : '';
    const l2active = (l1, l2) => (activeL1 === l1 && activeL2 === l2) ? ' active' : '';
    return `    <nav class="navbar scrolled" id="navbar">
        <div class="nav-container">
            <a href="index.html" class="logo">
                <img src="images/logo.png" alt="Al Dhabi Steel LLC logo" class="logo-image">
                <span class="logo-text">AL DHABI STEELS LLC</span>
            </a>
            <ul class="nav-menu" id="navMenu">
                <li><a href="index.html#hero" class="nav-link">Home</a></li>
                <li class="nav-dropdown-item" id="companyDropdownItem">
                    <button class="nav-link nav-dropdown-trigger" id="companyTrigger" aria-haspopup="true" aria-expanded="false">Company
                        <svg class="dropdown-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
                    </button>
                    <ul class="nav-dropdown" id="companyDropdown" role="menu">
                        <li role="none"><a href="index.html#about" class="nav-dropdown-link" role="menuitem">About</a></li>
                        <li role="none"><a href="index.html#vision-mission" class="nav-dropdown-link" role="menuitem">Vision &amp; Mission</a></li>
                        <li role="none"><a href="index.html#fabrication" class="nav-dropdown-link" role="menuitem">Capabilities</a></li>
                        <li role="none"><a href="index.html#certificates" class="nav-dropdown-link" role="menuitem">Certificates</a></li>
                    </ul>
                </li>
                <li><a href="index.html#services" class="nav-link">Services</a></li>
                <li class="nav-dropdown-item" id="productsDropdownItem">
                    <button class="nav-link nav-dropdown-trigger${activeL1 >= 0 ? ' active' : ''}" id="productsTrigger" aria-haspopup="true" aria-expanded="false">
                        Products
                        <svg class="dropdown-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
                    </button>
                    MEGA_PLACEHOLDER
                </li>
                <li><a href="index.html#projects" class="nav-link">Projects</a></li>
                <li><a href="index.html#contact" class="nav-link">Contact</a></li>
            </ul>
            <div class="nav-actions">
                <a href="index.html#contact" class="nav-cta">Get a Quote</a>
                <button class="nav-toggle" id="navToggle" aria-label="Toggle navigation"><span></span><span></span><span></span></button>
            </div>
        </div>
    </nav>`;
}

// ── Shared mega-dropdown HTML ────────────────────────────────────────────────
const megaHtml = `<ul class="products-mega" id="productsMega" role="menu" aria-label="Products menu">
                        <li class="mega-col-l1" role="none">
                            <ul style="list-style:none;padding:0;margin:0;">
                                <li class="mega-item" role="none" data-l1="0" data-has-children>
                                    <a href="end-to-end-range.html" class="mega-parent-link" data-l1="0" role="menuitem">
                                        End-to-End Range Products
                                        <svg class="mega-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                                    </a>
                                </li>
                                <li class="mega-item" role="none" data-l1="1" data-has-children>
                                    <a href="all-customized.html" class="mega-parent-link" data-l1="1" role="menuitem">
                                        Craft Engineered Design
                                        <svg class="mega-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                                    </a>
                                </li>
                                <li class="mega-item" role="none" data-l1="2" data-has-children>
                                    <a href="access-utility-panels.html" class="mega-parent-link" data-l1="2" role="menuitem">
                                        Access &amp; Utility Service Panels
                                        <svg class="mega-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                                    </a>
                                </li>
                                <li class="mega-item" role="none" data-l1="3" data-has-children>
                                    <a href="drainage-solutions.html" class="mega-parent-link" data-l1="3" role="menuitem">
                                        Tailor-Made Drainage Products
                                        <svg class="mega-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                                    </a>
                                </li>
                                <li class="mega-item" role="none" data-l1="4">
                                    <a href="fitout-solutions.html" class="mega-parent-link" data-l1="4" role="menuitem">
                                        Exotic Bespoke Designs
                                    </a>
                                </li>
                                <li class="mega-item" role="none" data-l1="5">
                                    <a href="kitchen-solutions.html" class="mega-parent-link" data-l1="5" role="menuitem">
                                        Kitchen Catering Solutions
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li class="mega-divider" role="none" aria-hidden="true"></li>
                        <li class="mega-col-l2" role="none">

                            <ul class="mega-sub-panel" data-parent="0" role="none">
                                <li class="mega-sub-header" aria-hidden="true">End-to-End Range</li>
                                <li role="none"><a href="general-solutions.html" class="mega-child-link" data-l2="0" role="menuitem">General Solutions</a></li>
                            </ul>
                            <ul class="mega-sub-panel" data-parent="1" role="none">
                                <li class="mega-sub-header" aria-hidden="true">Craft Engineered Design</li>
                                <li role="none"><a href="all-customized.html" class="mega-child-link" data-l2="0" role="menuitem">All Customized</a></li>
                            </ul>
                            <ul class="mega-sub-panel" data-parent="2" role="none">
                                <li class="mega-sub-header" aria-hidden="true">Access &amp; Utility Panels</li>
                                <li role="none"><a href="manhole-covers.html" class="mega-child-link" data-l2="0" role="menuitem">Manhole Covers</a></li>
                                <li role="none"><a href="floor-access-panels.html" class="mega-child-link" data-l2="1" role="menuitem">Floor Access Panels</a></li>
                                <li role="none"><a href="wall-access-panels.html" class="mega-child-link" data-l2="2" role="menuitem">Wall Access Panels</a></li>
                                <li role="none"><a href="roof-access-hatch.html" class="mega-child-link" data-l2="3" role="menuitem">Roof Access Hatch Covers</a></li>
                            </ul>
                            <ul class="mega-sub-panel" data-parent="3" role="none">
                                <li class="mega-sub-header" aria-hidden="true">Drainage Products</li>
                                <li role="none"><a href="channel-gratings.html" class="mega-child-link" data-l2="0" role="menuitem">Channel Gratings</a></li>
                                <li role="none"><a href="slot-linear-drains.html" class="mega-child-link" data-l2="1" role="menuitem">Slot Drains / Linear Drains</a></li>
                                <li role="none"><a href="shower-floor-drains.html" class="mega-child-link" data-l2="2" role="menuitem">Shower / Floor / Balcony Drains</a></li>
                                <li role="none"><a href="cleanouts-rainwater.html" class="mega-child-link" data-l2="3" role="menuitem">Cleanouts / Rainwater Outlets</a></li>
                            </ul>
                        </li>
                    </ul>`;

// ── Shared footer HTML ───────────────────────────────────────────────────────
const footerHtml = `    <footer class="footer">
        <div class="container">
            <div class="footer-main">
                <div class="footer-brand">
                    <img src="images/logo.png" alt="Al Dhabi Steel Logo" class="footer-logo-img">
                    <h3 class="footer-logo">AL DHABI STEELS LLC</h3>
                    <p class="footer-tagline">Leading steel fabrication company in UAE since 1999. Delivering precision engineering and excellence in every project.</p>
                    <div class="footer-certifications">
                        <span class="cert-badge">ISO Certified</span>
                        <span class="cert-badge">25+ Years</span>
                    </div>
                </div>
                <div class="footer-columns">
                    <div class="footer-column">
                        <h4 class="footer-title">Products</h4>
                        <ul class="footer-menu">
                            <li><a href="end-to-end-range.html">End-to-End Range</a></li>
                            <li><a href="all-customized.html">All Customized</a></li>
                            <li><a href="access-utility-panels.html">Access &amp; Utility Panels</a></li>
                            <li><a href="drainage-solutions.html">Drainage Products</a></li>
                            <li><a href="fitout-solutions.html">Exotic Bespoke Designs</a></li>
                            <li><a href="kitchen-solutions.html">Kitchen Catering</a></li>
                        </ul>
                    </div>
                    <div class="footer-column">
                        <h4 class="footer-title">Company</h4>
                        <ul class="footer-menu">
                            <li><a href="index.html#about">About Us</a></li>
                            <li><a href="index.html#projects">Our Projects</a></li>
                            <li><a href="index.html#certificates">Certificates</a></li>
                            <li><a href="index.html#contact">Get Quote</a></li>
                        </ul>
                    </div>
                    <div class="footer-column footer-contact">
                        <h4 class="footer-title">Contact Us</h4>
                        <div class="footer-contact-item">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                            <span>Industrial Area 13<br>Sharjah, UAE</span>
                        </div>
                        <div class="footer-contact-item">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
                            <a href="tel:+971502566872">+971 50 2566 872</a>
                        </div>
                        <div class="footer-contact-item">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                            <a href="mailto:info@aldhabisteels.com">info@aldhabisteels.com</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <div class="footer-bottom-content">
                    <p>&copy; 2025 Al Dhabi Steel LLC. All rights reserved.</p>
                    <div class="footer-bottom-links">
                        <a href="index.html">Privacy Policy</a>
                        <a href="index.html">Terms of Service</a>
                    </div>
                </div>
            </div>
        </div>
    </footer>`;

// ── Shared lightbox + whatsapp HTML ─────────────────────────────────────────
const lightboxHtml = `    <div class="sol-lightbox" id="solLightbox" role="dialog" aria-modal="true" aria-label="Image viewer">
        <div class="sol-lightbox-overlay"></div>
        <div class="sol-lightbox-inner">
            <button class="sol-lb-close" aria-label="Close viewer"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
            <button class="sol-lb-arrow sol-lb-prev" aria-label="Previous image"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg></button>
            <div class="sol-lb-img-wrap"><img src="" alt="" draggable="false"></div>
            <button class="sol-lb-arrow sol-lb-next" aria-label="Next image"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg></button>
            <div class="sol-lb-caption"></div>
            <div class="sol-lb-counter"></div>
        </div>
    </div>
    <a href="https://wa.me/971502566872" target="_blank" rel="noopener noreferrer" class="whatsapp-float" aria-label="Chat with us on WhatsApp">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
    </a>`;

// ── Page builder function ────────────────────────────────────────────────────
function buildPage({
    filename, title, metaDesc,
    heroImg, heroAlt,
    breadcrumbItems,  // [{label, href}] last item is current
    heroTitle,
    introLabel, introTitle, introText,
    galleryLabel, galleryTitle,
    cards,            // [{img, alt, category, title}]
    catSection,       // null | {label, title, desc, cards:[{href,img,imgAlt,title,desc}]}
    activeL1, activeL2
}) {
    const breadcrumb = breadcrumbItems.map((item, i, arr) => {
        if (i === arr.length - 1) return `<span class="sol-breadcrumb-current">${item.label}</span>`;
        return `<a href="${item.href}">${item.label}</a><span class="sol-breadcrumb-sep">›</span>`;
    }).join('\n                ');

    const galleryCards = cards.map(c => `
            <article class="sol-card"
                data-img-src="${c.img}"
                data-title="${c.title}"
                data-category="${c.category}"
                tabindex="0" role="button" aria-label="View: ${c.title}">
                <div class="sol-card-img-wrap">
                    <img src="${c.img}" alt="${c.alt}" loading="lazy">
                    <div class="sol-card-zoom-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg></div>
                </div>
                <div class="sol-card-body">
                    <span class="sol-card-category">${c.category}</span>
                    <h3 class="sol-card-title">${c.title}</h3>
                </div>
            </article>`).join('');

    let catHtml = '';
    if (catSection) {
        const catCards = catSection.cards.map(cc => `
                <a href="${cc.href}" class="prod-cat-card animate-on-scroll">
                    <div class="prod-cat-card-img">
                        <img src="${cc.img}" alt="${cc.imgAlt}" loading="lazy">
                    </div>
                    <div class="prod-cat-card-body">
                        <h3 class="prod-cat-card-title">${cc.title}</h3>
                        <p class="prod-cat-card-desc">${cc.desc}</p>
                        <span class="prod-cat-card-btn">
                            Explore Product
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                        </span>
                    </div>
                </a>`).join('');
        catHtml = `
    <section class="prod-cat-section">
        <div class="prod-cat-header animate-on-scroll">
            <span class="prod-cat-label">${catSection.label}</span>
            <h2 class="prod-cat-title">${catSection.title}</h2>
            <div class="prod-cat-underline"></div>
            ${catSection.desc ? `<p class="prod-cat-desc">${catSection.desc}</p>` : ''}
        </div>
        <div class="prod-cat-grid">
            ${catCards}
        </div>
    </section>`;
    }

    const nav = navHtml(activeL1, activeL2).replace('MEGA_PLACEHOLDER', megaHtml);

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="${metaDesc}">
    <title>${title} | Al Dhabi Steel LLC</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Sora:wght@500;600;700&family=IBM+Plex+Sans:wght@400;500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="css/solution-page.css">
</head>
<body class="sol-page">

${nav}

    <section class="sol-hero">
        <img src="${heroImg}" alt="${heroAlt}" class="sol-hero-bg" loading="eager">
        <div class="sol-hero-overlay"></div>
        <div class="sol-hero-content">
            <nav class="sol-breadcrumb" aria-label="Breadcrumb">
                ${breadcrumb}
            </nav>
            <h1 class="sol-hero-title">${heroTitle}</h1>
            <div class="sol-hero-bar"></div>
        </div>
    </section>

    <section class="sol-intro">
        <div class="sol-intro-inner animate-on-scroll">
            <span class="sol-intro-label">${introLabel}</span>
            <h2 class="sol-intro-title">${introTitle}</h2>
            <div class="sol-intro-underline"></div>
            <div class="sol-intro-text">${introText}</div>
        </div>
    </section>
${catHtml}
    <section class="sol-gallery">
        <div class="sol-gallery-header animate-on-scroll">
            <span class="sol-gallery-label">${galleryLabel}</span>
            <h2 class="sol-gallery-title">${galleryTitle}</h2>
            <div class="sol-gallery-underline"></div>
        </div>
        <div class="sol-grid">
            ${galleryCards}
        </div>
    </section>

    <section class="sol-cta">
        <div class="sol-cta-inner animate-on-scroll">
            <span class="sol-cta-label">Get Started</span>
            <h2 class="sol-cta-title">Need a Custom Metal Fabrication Solution?</h2>
            <p class="sol-cta-subtitle">Contact us today to discuss your project requirements. Our expert team is ready to deliver precision-engineered metalwork tailored to your exact specifications.</p>
            <a href="index.html#contact" class="sol-cta-btn">
                Get in Touch
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
            </a>
        </div>
    </section>

${footerHtml}

${lightboxHtml}

    <script src="js/solution-page.js"></script>
    <script src="js/nav-products.js"></script>
</body>
</html>`;
}

// ── Placeholder gallery cards (8 cards using existing drainage images) ───────
function placeholderCards(category, count = 8, folder = 'Drainage Solutions') {
    const imgs = [
        'page_46_img_2.jpeg','page_46_img_3.jpeg','page_46_img_4.jpeg','page_46_img_6.jpeg',
        'page_47_img_1.jpeg','page_47_img_3.jpeg','page_47_img_5.jpeg','page_47_img_6.jpeg',
        'page_48_img_2.jpeg','page_48_img_3.jpeg','page_48_img_4.jpeg','page_48_img_6.jpeg'
    ];
    return imgs.slice(0, count).map((img, i) => ({
        img: `images/Slide-images/${folder}/${img}`,
        alt: `${category} specimen ${i + 1}`,
        category,
        title: `${category} — Specimen ${i + 1}`
    }));
}

function placeholderCardsCM(category, count = 8) {
    const imgs = [
        'page_38_img_2.jpeg','page_38_img_4.jpeg','page_39_img_2.jpeg','page_39_img_3.jpeg',
        'page_39_img_5.jpeg','page_40_img_1.jpeg','page_40_img_2.jpeg','page_40_img_3.jpeg'
    ];
    return imgs.slice(0, count).map((img, i) => ({
        img: `images/Slide-images/Cutomized Manufacturing/${img}`,
        alt: `${category} specimen ${i + 1}`,
        category,
        title: `${category} — Specimen ${i + 1}`
    }));
}

// ── Product category card placeholder image ──────────────────────────────────
const catPlaceholderImgs = {
    general:    'images/Slide-images/General Solutions/page_33_img_1.jpeg',
    customized: 'images/Slide-images/Cutomized Manufacturing/page_38_img_2.jpeg',
    manhole:    'images/Slide-images/Drainage Solutions/page_46_img_4.jpeg',
    floor:      'images/Slide-images/Drainage Solutions/page_47_img_1.jpeg',
    wall:       'images/Slide-images/Drainage Solutions/page_48_img_3.jpeg',
    roof:       'images/Slide-images/Drainage Solutions/page_49_img_1.jpeg',
    channel:    'images/Slide-images/Drainage Solutions/page_46_img_3.jpeg',
    slot:       'images/Slide-images/Drainage Solutions/page_47_img_3.jpeg',
    shower:     'images/Slide-images/Drainage Solutions/page_46_img_6.jpeg',
    cleanout:   'images/Slide-images/Drainage Solutions/page_49_img_8.jpeg',
};

// ── Page definitions ─────────────────────────────────────────────────────────
const pages = [

// 1. End-to-End Range Products (parent landing page)
{
    filename: 'end-to-end-range.html',
    title: 'End-to-End Range Products',
    metaDesc: 'Al Dhabi Steel End-to-End Range Products — a comprehensive portfolio of precision-fabricated steel solutions covering general architectural metalwork and structural fabrication for every commercial and industrial application.',
    heroImg: 'images/Slide-images/General Solutions/page_33_img_1.jpeg',
    heroAlt: 'End-to-End Range Products hero',
    breadcrumbItems: [{label:'Home',href:'index.html'},{label:'Products',href:'#'},{label:'End-to-End Range Products'}],
    heroTitle: 'End-to-End Range Products',
    introLabel: 'Overview',
    introTitle: 'Complete Steel Solutions, Start to Finish',
    introText: `<p>Al Dhabi Steel's End-to-End Range Products division delivers a comprehensive suite of precision-fabricated metalwork designed to serve every phase of a project — from early design to final installation. Our portfolio spans architectural metalwork, structural fabrications, interior fitout components, and bespoke decorative elements, all manufactured to the highest international standards.</p><p>Whether you need off-the-shelf solutions or project-specific custom fabrications, our end-to-end range ensures that every requirement is met with precision, quality, and speed. We work with steel, stainless steel, aluminium, and copper to produce components that stand the test of time in UAE's demanding climate and construction environment.</p>`,
    galleryLabel: 'Portfolio',
    galleryTitle: 'Image Gallery',
    cards: placeholderCards('End-to-End Range', 8, 'General Solutions'),
    catSection: {
        label: 'Product Categories',
        title: 'Explore Our Range',
        desc: 'Browse the product families within our End-to-End Range, each precision-engineered to meet the demands of modern construction and interior projects.',
        cards: [
            {href:'general-solutions.html', img: catPlaceholderImgs.general, imgAlt:'General Solutions', title:'General Solutions', desc:'Architectural metalwork, decorative structures, partitions, cladding, display cabinets, and bespoke storage units for commercial and residential projects.'}
        ]
    },
    activeL1: 0, activeL2: -1
},

// 2. All Customized
{
    filename: 'all-customized.html',
    title: 'All Customized',
    metaDesc: 'Al Dhabi Steel All Customized — bespoke craft-engineered steel fabrications designed and manufactured to your exact specifications for any project scale or complexity.',
    heroImg: 'images/Slide-images/Cutomized Manufacturing/page_38_img_2.jpeg',
    heroAlt: 'All Customized — craft engineered design',
    breadcrumbItems: [{label:'Home',href:'index.html'},{label:'Products',href:'#'},{label:'Craft Engineered Design',href:'#'},{label:'All Customized'}],
    heroTitle: 'All Customized',
    introLabel: 'Overview',
    introTitle: 'Craft Engineered to Your Exact Vision',
    introText: `<p>Our All Customized division is the pinnacle of bespoke metal fabrication at Al Dhabi Steel. Every piece is engineered from scratch based on client specifications, architectural drawings, and project requirements. We combine advanced CNC cutting, laser profiling, and artisan finishing techniques to deliver metalwork that is truly one-of-a-kind.</p><p>From complex structural assemblies and ornate decorative features to precision-machined industrial components, our skilled fabrication team handles projects of any scale or complexity. We collaborate closely with architects, designers, engineers, and contractors to ensure every custom piece integrates seamlessly into its intended space.</p>`,
    galleryLabel: 'Portfolio',
    galleryTitle: 'Customized Works Gallery',
    cards: placeholderCardsCM('All Customized', 8),
    catSection: null,
    activeL1: 1, activeL2: -1
},

// 3. Access & Utility Service Panels
{
    filename: 'access-utility-panels.html',
    title: 'Access & Utility Service Panels',
    metaDesc: 'Al Dhabi Steel Access & Utility Service Panels — precision-fabricated manhole covers, floor access panels, wall access panels, and roof access hatch covers for commercial and industrial applications.',
    heroImg: 'images/Slide-images/Drainage Solutions/page_50_img_3.jpeg',
    heroAlt: 'Access & Utility Service Panels',
    breadcrumbItems: [{label:'Home',href:'index.html'},{label:'Products',href:'#'},{label:'Access & Utility Service Panels'}],
    heroTitle: 'Access & Utility Service Panels',
    introLabel: 'Overview',
    introTitle: 'Engineered Access Solutions for Every Application',
    introText: `<p>Al Dhabi Steel manufactures a comprehensive range of access and utility service panels engineered for reliability, safety, and longevity. Our product family covers manhole covers, floor access panels, wall access panels, and roof access hatch covers — all fabricated from high-grade stainless steel, mild steel, and aluminium.</p><p>Every access panel is designed to meet the structural and load-bearing requirements of its specific application, from light-duty residential installations to heavy-duty industrial environments. We work with architects, MEP engineers, and project contractors from concept through to on-site installation support, ensuring a seamless fit every time.</p>`,
    galleryLabel: 'Portfolio',
    galleryTitle: 'Image Gallery',
    cards: placeholderCards('Access Panels', 8),
    catSection: {
        label: 'Product Categories',
        title: 'Explore Access Panel Types',
        desc: 'Each product family within our Access & Utility range is engineered for a specific application — from underground infrastructure to architectural wall finishes.',
        cards: [
            {href:'manhole-covers.html', img:catPlaceholderImgs.manhole, imgAlt:'Manhole Covers', title:'Manhole Covers', desc:'Heavy-duty and decorative manhole covers fabricated from stainless steel and mild steel for roads, pavements, and utility infrastructure.'},
            {href:'floor-access-panels.html', img:catPlaceholderImgs.floor, imgAlt:'Floor Access Panels', title:'Floor Access Panels', desc:'Flush-fit floor access panels for concealed service access in commercial floors, industrial facilities, and public spaces.'},
            {href:'wall-access-panels.html', img:catPlaceholderImgs.wall, imgAlt:'Wall Access Panels', title:'Wall Access Panels', desc:'Concealed wall access doors and panels for plumbing, electrical, and mechanical service access in finished interior walls.'},
            {href:'roof-access-hatch.html', img:catPlaceholderImgs.roof, imgAlt:'Roof Access Hatch Covers', title:'Roof Access Hatch Covers', desc:'Weatherproof and insulated roof hatch covers providing safe and convenient rooftop access for maintenance and inspection.'}
        ]
    },
    activeL1: 2, activeL2: -1
},

// 4. Manhole Covers
{
    filename: 'manhole-covers.html',
    title: 'Manhole Covers',
    metaDesc: 'Al Dhabi Steel Manhole Covers — heavy-duty and decorative stainless steel and mild steel manhole covers for roads, pavements, and utility infrastructure across the UAE.',
    heroImg: 'images/Slide-images/Drainage Solutions/page_46_img_4.jpeg',
    heroAlt: 'Manhole Covers',
    breadcrumbItems: [{label:'Home',href:'index.html'},{label:'Products',href:'#'},{label:'Access & Utility Panels',href:'access-utility-panels.html'},{label:'Manhole Covers'}],
    heroTitle: 'Manhole Covers',
    introLabel: 'Overview',
    introTitle: 'Heavy-Duty Manhole Covers, Precisely Fabricated',
    introText: `<p>Al Dhabi Steel's manhole covers are engineered to meet the structural demands of high-traffic areas while maintaining a clean, professional finish. Available in stainless steel, mild steel, and ductile iron, our covers are fabricated to standard and custom sizes to suit any utility infrastructure application.</p><p>Our product range includes recessed covers for tile-in floor finishes, solid-top heavy-duty covers for roads and pavements, anti-slip grating covers, and decorative covers for landscaped environments. All products are load-rated to internationally recognised standards and manufactured with precision for exact dimensional tolerances.</p>`,
    galleryLabel: 'Portfolio',
    galleryTitle: 'Manhole Covers Gallery',
    cards: placeholderCards('Manhole Covers', 8),
    catSection: null,
    activeL1: 2, activeL2: 0
},

// 5. Floor Access Panels
{
    filename: 'floor-access-panels.html',
    title: 'Floor Access Panels',
    metaDesc: 'Al Dhabi Steel Floor Access Panels — flush-fit stainless steel and aluminium floor access panels for concealed service access in commercial, industrial, and institutional facilities.',
    heroImg: 'images/Slide-images/Drainage Solutions/page_47_img_1.jpeg',
    heroAlt: 'Floor Access Panels',
    breadcrumbItems: [{label:'Home',href:'index.html'},{label:'Products',href:'#'},{label:'Access & Utility Panels',href:'access-utility-panels.html'},{label:'Floor Access Panels'}],
    heroTitle: 'Floor Access Panels',
    introLabel: 'Overview',
    introTitle: 'Concealed Floor Access, Engineered Precisely',
    introText: `<p>Our floor access panels provide discreet, flush-fit access to sub-floor utility services including plumbing, electrical conduits, data cables, and mechanical equipment. Fabricated from high-grade stainless steel and aluminium, each panel is designed to sit perfectly flush with the surrounding floor finish — whether tile, stone, or resin.</p><p>Al Dhabi Steel's floor access panels are available in a wide range of standard sizes and can be custom-fabricated to any dimension required. Options include tile-in recessed panels, solid-top panels, anti-slip grating panels, and heavy-duty load-rated panels suitable for vehicle traffic areas.</p>`,
    galleryLabel: 'Portfolio',
    galleryTitle: 'Floor Access Panels Gallery',
    cards: placeholderCards('Floor Access Panels', 8),
    catSection: null,
    activeL1: 2, activeL2: 1
},
];

pages.push(
// 6. Wall Access Panels
{
    filename: 'wall-access-panels.html',
    title: 'Wall Access Panels',
    metaDesc: 'Al Dhabi Steel Wall Access Panels — concealed wall access doors and panels for plumbing, electrical, and mechanical service access in finished interior wall systems.',
    heroImg: 'images/Slide-images/Drainage Solutions/page_48_img_3.jpeg',
    heroAlt: 'Wall Access Panels',
    breadcrumbItems: [{label:'Home',href:'index.html'},{label:'Products',href:'#'},{label:'Access & Utility Panels',href:'access-utility-panels.html'},{label:'Wall Access Panels'}],
    heroTitle: 'Wall Access Panels',
    introLabel: 'Overview',
    introTitle: 'Invisible Wall Access, Flawless Integration',
    introText: `<p>Al Dhabi Steel's wall access panels are designed to provide seamless access to concealed mechanical, electrical, and plumbing services without compromising the aesthetic finish of interior walls. Our panels are fabricated from stainless steel and aluminium with precision engineered frames and flush-fit doors that blend effortlessly into tiled, painted, or cladded wall surfaces.</p><p>Available in hinged and removable door configurations, our wall access panels suit applications in commercial kitchens, hotels, hospitals, office interiors, and luxury residential projects. Custom sizes and bespoke finishes can be fabricated to match specific interior design requirements.</p>`,
    galleryLabel: 'Portfolio',
    galleryTitle: 'Wall Access Panels Gallery',
    cards: placeholderCards('Wall Access Panels', 8),
    catSection: null,
    activeL1: 2, activeL2: 2
},

// 7. Roof Access Hatch Covers
{
    filename: 'roof-access-hatch.html',
    title: 'Roof Access Hatch Covers',
    metaDesc: 'Al Dhabi Steel Roof Access Hatch Covers — weatherproof and insulated rooftop hatch covers providing safe and convenient access for maintenance and inspection in the UAE climate.',
    heroImg: 'images/Slide-images/Drainage Solutions/page_49_img_1.jpeg',
    heroAlt: 'Roof Access Hatch Covers',
    breadcrumbItems: [{label:'Home',href:'index.html'},{label:'Products',href:'#'},{label:'Access & Utility Panels',href:'access-utility-panels.html'},{label:'Roof Access Hatch Covers'}],
    heroTitle: 'Roof Access Hatch Covers',
    introLabel: 'Overview',
    introTitle: 'Weatherproof Roof Hatches for Safe Rooftop Access',
    introText: `<p>Al Dhabi Steel manufactures heavy-duty roof access hatch covers designed to withstand the UAE's extreme climate conditions. Our roof hatches provide safe, reliable access to rooftop areas for maintenance, inspection, and equipment servicing. Fabricated from stainless steel and aluminium with weatherproof seals and durable hinges, our hatches maintain their performance across decades of outdoor exposure.</p><p>Available in single and double-leaf configurations, our roof access hatches can be fitted with gas struts for easy single-handed operation, locking mechanisms for security, and custom sizes to accommodate any rooftop opening. Insulated versions are also available for energy-efficient installations.</p>`,
    galleryLabel: 'Portfolio',
    galleryTitle: 'Roof Access Hatch Covers Gallery',
    cards: placeholderCards('Roof Access Hatch Covers', 8),
    catSection: null,
    activeL1: 2, activeL2: 3
},

// 8. Channel Gratings
{
    filename: 'channel-gratings.html',
    title: 'Channel Gratings',
    metaDesc: 'Al Dhabi Steel Channel Gratings — precision-fabricated stainless steel and mild steel channel grating systems for commercial, industrial, and public drainage applications across the UAE.',
    heroImg: 'images/Slide-images/Drainage Solutions/page_46_img_3.jpeg',
    heroAlt: 'Channel Gratings',
    breadcrumbItems: [{label:'Home',href:'index.html'},{label:'Products',href:'#'},{label:'Tailor-Made Drainage',href:'drainage-solutions.html'},{label:'Channel Gratings'}],
    heroTitle: 'Channel Gratings',
    introLabel: 'Overview',
    introTitle: 'Precision-Fabricated Channel Gratings for Every Drainage Need',
    introText: `<p>Al Dhabi Steel's channel grating systems are engineered for maximum hydraulic performance and long-term durability. Fabricated from AISI 304 and 316 stainless steel as well as hot-dip galvanised mild steel, our channel gratings are designed for installation in commercial kitchens, food processing facilities, hospitals, public pedestrian areas, car parks, and industrial plants.</p><p>Our channel gratings are available in standard and custom widths, with a variety of grating patterns including flat bar, I-bar, wedge wire, and decorative mesh styles. All units are manufactured to precise dimensional tolerances to ensure a perfect fit with our channel drain bodies and third-party drainage systems.</p>`,
    galleryLabel: 'Portfolio',
    galleryTitle: 'Channel Gratings Gallery',
    cards: placeholderCards('Channel Gratings', 8),
    catSection: null,
    activeL1: 3, activeL2: 0
},

// 9. Slot / Linear Drains
{
    filename: 'slot-linear-drains.html',
    title: 'Slot Drains / Linear Drains',
    metaDesc: 'Al Dhabi Steel Slot Drains and Linear Drains — sleek stainless steel linear drainage systems for wet rooms, commercial interiors, balconies, and external paved areas.',
    heroImg: 'images/Slide-images/Drainage Solutions/page_47_img_3.jpeg',
    heroAlt: 'Slot Drains and Linear Drains',
    breadcrumbItems: [{label:'Home',href:'index.html'},{label:'Products',href:'#'},{label:'Tailor-Made Drainage',href:'drainage-solutions.html'},{label:'Slot Drains / Linear Drains'}],
    heroTitle: 'Slot Drains / Linear Drains',
    introLabel: 'Overview',
    introTitle: 'Minimalist Linear Drainage with Maximum Flow',
    introText: `<p>Al Dhabi Steel's slot drain and linear drain range delivers a clean, architectural drainage solution for modern interior and exterior applications. Our linear drains feature a narrow slot opening that conceals the drainage channel while maintaining high-capacity water flow, making them ideal for wet rooms, bathrooms, terraces, balconies, pool surrounds, and commercial lobbies.</p><p>Fabricated from high-grade AISI 304 and 316 stainless steel, our slot drain systems are available in standard and custom lengths, multiple outlet configurations, and a range of top grating finishes including brushed, mirror-polished, and tile-in recessed styles. All units include adjustable height frames for perfect flush installation.</p>`,
    galleryLabel: 'Portfolio',
    galleryTitle: 'Slot & Linear Drains Gallery',
    cards: placeholderCards('Linear Drains', 8),
    catSection: null,
    activeL1: 3, activeL2: 1
},

// 10. Shower / Floor / Balcony Drains
{
    filename: 'shower-floor-drains.html',
    title: 'Shower / Floor / Balcony Drains',
    metaDesc: 'Al Dhabi Steel Shower, Floor, and Balcony Drains — precision-fabricated stainless steel drainage solutions for wet areas, bathrooms, terraces, and balcony applications.',
    heroImg: 'images/Slide-images/Drainage Solutions/page_46_img_6.jpeg',
    heroAlt: 'Shower Floor Balcony Drains',
    breadcrumbItems: [{label:'Home',href:'index.html'},{label:'Products',href:'#'},{label:'Tailor-Made Drainage',href:'drainage-solutions.html'},{label:'Shower / Floor / Balcony Drains'}],
    heroTitle: 'Shower / Floor / Balcony Drains',
    introLabel: 'Overview',
    introTitle: 'Premium Drain Solutions for Every Wet Area',
    introText: `<p>Al Dhabi Steel's shower, floor, and balcony drain range covers every wet-area drainage requirement from compact bathroom point drains to wide-mouth balcony drainage units. Each product is fabricated from corrosion-resistant AISI 304 and 316 stainless steel to ensure long service life in humid and chemically aggressive environments.</p><p>Our product family includes square and round shower floor drains, tile-insert recessed drains, anti-odour trap drains, balcony slot drains with waterproof membranes, and decorative cover plate drains. All units are designed for simple installation with adjustable height bodies and a range of outlet diameters to match any plumbing specification.</p>`,
    galleryLabel: 'Portfolio',
    galleryTitle: 'Shower, Floor & Balcony Drains Gallery',
    cards: placeholderCards('Shower Floor Drains', 8),
    catSection: null,
    activeL1: 3, activeL2: 2
},

// 11. Cleanouts / Rainwater Outlets
{
    filename: 'cleanouts-rainwater.html',
    title: 'Cleanouts / Rainwater Outlets',
    metaDesc: 'Al Dhabi Steel Cleanouts and Rainwater Outlets — stainless steel and mild steel cleanout access points and rainwater outlet systems for commercial and industrial drainage infrastructure.',
    heroImg: 'images/Slide-images/Drainage Solutions/page_49_img_8.jpeg',
    heroAlt: 'Cleanouts and Rainwater Outlets',
    breadcrumbItems: [{label:'Home',href:'index.html'},{label:'Products',href:'#'},{label:'Tailor-Made Drainage',href:'drainage-solutions.html'},{label:'Cleanouts / Rainwater Outlets'}],
    heroTitle: 'Cleanouts / Rainwater Outlets',
    introLabel: 'Overview',
    introTitle: 'Reliable Cleanout and Rainwater Drainage Systems',
    introText: `<p>Al Dhabi Steel manufactures a comprehensive range of cleanout access points and rainwater outlet systems engineered for long-term performance in commercial and industrial drainage infrastructure. Our cleanouts are fabricated to provide easy pipeline access for maintenance and inspection, with screw-top and bolt-down covers available in stainless steel and mild steel.</p><p>Our rainwater outlets are designed for roof drainage systems, featuring large-body outlets with leaf guards, anti-siphon devices, and adjustable clamping flanges for compatibility with all standard waterproofing membrane systems. Available in horizontal and vertical outlet configurations, our products meet international drainage and building code standards.</p>`,
    galleryLabel: 'Portfolio',
    galleryTitle: 'Cleanouts & Rainwater Outlets Gallery',
    cards: placeholderCards('Cleanouts Rainwater', 8),
    catSection: null,
    activeL1: 3, activeL2: 3
}
);

// ── Write all pages ──────────────────────────────────────────────────────────
pages.forEach(pageData => {
    const html = buildPage(pageData);
    fs.writeFileSync(path.join(__dirname, pageData.filename), html, 'utf8');
    console.log('✓ Written:', pageData.filename);
});
console.log('\nAll pages generated successfully.');
