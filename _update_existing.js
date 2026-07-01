const fs = require('fs');
const path = require('path');

const megaNavBlock = `                <!-- Products Mega-Dropdown -->
                <li class="nav-dropdown-item" id="productsDropdownItem">
                    <button class="nav-link nav-dropdown-trigger" id="productsTrigger" aria-haspopup="true" aria-expanded="false">
                        Products
                        <svg class="dropdown-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
                    </button>
                    <ul class="products-mega" id="productsMega" role="menu" aria-label="Products menu">
                        <li class="mega-col-l1" role="none">
                            <ul style="list-style:none;padding:0;margin:0;">
                                <li class="mega-item" role="none" data-l1="0" data-has-children><a href="end-to-end-range.html" class="mega-parent-link" data-l1="0" role="menuitem">End-to-End Range Products<svg class="mega-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg></a></li>
                                <li class="mega-item" role="none" data-l1="1" data-has-children><a href="all-customized.html" class="mega-parent-link" data-l1="1" role="menuitem">Craft Engineered Design<svg class="mega-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg></a></li>
                                <li class="mega-item" role="none" data-l1="2" data-has-children><a href="access-utility-panels.html" class="mega-parent-link" data-l1="2" role="menuitem">Access &amp; Utility Service Panels<svg class="mega-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg></a></li>
                                <li class="mega-item" role="none" data-l1="3" data-has-children><a href="drainage-solutions.html" class="mega-parent-link" data-l1="3" role="menuitem">Tailor-Made Drainage Products<svg class="mega-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg></a></li>
                                <li class="mega-item" role="none" data-l1="4"><a href="fitout-solutions.html" class="mega-parent-link" data-l1="4" role="menuitem">Exotic Bespoke Designs</a></li>
                                <li class="mega-item" role="none" data-l1="5"><a href="kitchen-solutions.html" class="mega-parent-link" data-l1="5" role="menuitem">Kitchen Catering Solutions</a></li>
                            </ul>
                        </li>
                        <li class="mega-divider" role="none" aria-hidden="true"></li>

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
                    </ul>
                </li>`;

// Files to update and their old products dropdown patterns
const files = [
    'general-solutions.html',
    'customized-manufacturing.html',
    'drainage-solutions.html',
    'fitout-solutions.html',
    'kitchen-solutions.html'
];

// Regex to match the old Products dropdown li block
const oldPattern = /<!-- Products Dropdown -->\s*<li class="nav-dropdown-item" id="productsDropdownItem">[\s\S]*?<\/ul>\s*<\/li>/;

files.forEach(file => {
    const filepath = path.join(__dirname, file);
    let html = fs.readFileSync(filepath, 'utf8');

    // Replace old products dropdown
    const newHtml = html.replace(oldPattern, megaNavBlock);

    if (newHtml === html) {
        console.warn('⚠ No match in:', file, '— trying alternate pattern');
        // Try alternate: no comment
        const altPattern = /<li class="nav-dropdown-item" id="productsDropdownItem">\s*<button[^>]*id="productsTrigger"[\s\S]*?<\/ul>\s*<\/li>/;
        const altHtml = html.replace(altPattern, megaNavBlock);
        if (altHtml === html) {
            console.error('✗ Could not replace in:', file);
        } else {
            fs.writeFileSync(filepath, altHtml, 'utf8');
            console.log('✓ Updated (alt):', file);
        }
        return;
    }

    fs.writeFileSync(filepath, newHtml, 'utf8');
    console.log('✓ Updated:', file);
});

// Also add nav-products.js script tag to all updated files
files.forEach(file => {
    const filepath = path.join(__dirname, file);
    let html = fs.readFileSync(filepath, 'utf8');

    // Add nav-products.js before </body> if not already there
    if (!html.includes('nav-products.js')) {
        html = html.replace(
            '<script src="js/solution-page.js"></script>',
            '<script src="js/solution-page.js"></script>\n    <script src="js/nav-products.js"></script>'
        );
        fs.writeFileSync(filepath, html, 'utf8');
        console.log('✓ Added nav-products.js to:', file);
    }
});

console.log('\nAll existing pages updated.');
