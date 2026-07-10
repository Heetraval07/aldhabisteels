$template = [System.IO.File]::ReadAllText("d:\TRUE LINE\aldhabisteel\kitchen-solutions.html", [System.Text.Encoding]::UTF8)

$pages = @(
    @{
        file = "villa-projects.html"
        title = "Villa Projects"
        metaDesc = "Al Dhabi Steel Villa Projects — bespoke stainless steel kitchen fabrication and fit-out solutions for residential villas across the UAE."
        pageTitle = "Villa Projects | Al Dhabi Steel LLC"
        breadcrumbLabel = "Villa Projects"
        heroTitle = "Villa Projects"
        introTitle = "Bespoke Kitchen Fabrication for Residential Villas"
        introText = "<p>Al Dhabi Steel delivers fully customised stainless steel kitchen solutions for private villa projects across the UAE. From individual kitchen components to complete fit-out packages, we fabricate each unit to the exact dimensions and finish specifications required by the client and their interior design team.</p><p>Our villa kitchen portfolio includes custom-sized preparation tables, sink units, exhaust hood canopies, under-counter cabinets, wine racks, and decorative stainless steel cladding panels. Every piece is hand-finished to the highest standard, ensuring both functional performance and aesthetic excellence in luxury residential settings.</p>"
        galleryTitle = "Villa Projects Gallery"
    },
    @{
        file = "industrial-kitchen-works.html"
        title = "Industrial Kitchen Works"
        metaDesc = "Al Dhabi Steel Industrial Kitchen Works — heavy-duty stainless steel kitchen fabrication for hospitals, factories, institutional catering, and large-scale food production facilities in the UAE."
        pageTitle = "Industrial Kitchen Works | Al Dhabi Steel LLC"
        breadcrumbLabel = "Industrial Kitchen Works"
        heroTitle = "Industrial Kitchen Works"
        introTitle = "Heavy-Duty Kitchen Fabrication for Industrial Environments"
        introText = "<p>Al Dhabi Steel's industrial kitchen division specialises in heavy-duty stainless steel fabrication for large-scale food production, institutional catering, and manufacturing environments. Our solutions are engineered to withstand the rigours of continuous commercial operation while meeting the strictest hygiene and safety standards.</p><p>We supply and install complete industrial kitchen systems including multi-section cooking lines, large-capacity exhaust ventilation, industrial-grade sink and drainage assemblies, heavy-duty storage racking, and cold room cladding. Every installation is coordinated with MEP teams to ensure seamless integration with mechanical, electrical, and plumbing services.</p>"
        galleryTitle = "Industrial Kitchen Works Gallery"
    },
    @{
        file = "restaurants-malls-projects.html"
        title = "Restaurants & Malls Projects"
        metaDesc = "Al Dhabi Steel Restaurants and Malls Projects — custom commercial kitchen fabrication and fit-out solutions for restaurants, food courts, and shopping mall facilities across the UAE."
        pageTitle = "Restaurants & Malls Projects | Al Dhabi Steel LLC"
        breadcrumbLabel = "Restaurants &amp; Malls Projects"
        heroTitle = "Restaurants &amp; Malls Projects"
        introTitle = "Commercial Kitchen Solutions for Restaurants and Malls"
        introText = "<p>Al Dhabi Steel is a trusted partner for restaurant groups, food court operators, and mall developers across the UAE. We design, fabricate, and install complete commercial kitchen environments tailored to the high-throughput demands of hospitality and retail food service.</p><p>Our restaurant and mall kitchen portfolio covers everything from front-of-house service counters and display units to back-of-house cooking lines, exhaust systems, pass-through windows, and refrigeration enclosures. We work closely with interior designers, fit-out contractors, and facility managers to deliver projects on time and within budget, with minimal disruption to ongoing operations.</p>"
        galleryTitle = "Restaurants & Malls Projects Gallery"
    }
)

foreach ($page in $pages) {
    $html = $template

    # Meta description
    $html = $html -replace 'content="Al Dhabi Steel Kitchen Solutions[^"]*"', "content=`"$($page.metaDesc)`""

    # Page title
    $html = $html -replace '<title>Kitchen Solutions \| Al Dhabi Steel LLC</title>', "<title>$($page.pageTitle)</title>"

    # Breadcrumb - replace the whole breadcrumb nav inside hero
    $html = $html -replace '(?s)<nav class="sol-breadcrumb"[^>]*>.*?</nav>', "<nav class=`"sol-breadcrumb`" aria-label=`"Breadcrumb`"><a href=`"index.html`">Home</a><span class=`"sol-breadcrumb-sep`">›</span><a href=`"#`">Products</a><span class=`"sol-breadcrumb-sep`">›</span><a href=`"kitchen-solutions.html`">Kitchen Catering Solutions</a><span class=`"sol-breadcrumb-sep`">›</span><span class=`"sol-breadcrumb-current`">$($page.breadcrumbLabel)</span></nav>"

    # Hero title
    $html = $html -replace '<h1 class="sol-hero-title">Kitchen Catering Solutions</h1>', "<h1 class=`"sol-hero-title`">$($page.heroTitle)</h1>"

    # Intro title
    $html = $html -replace '<h2 class="sol-intro-title">Commercial Kitchen Fabrication at Its Finest</h2>', "<h2 class=`"sol-intro-title`">$($page.introTitle)</h2>"

    # Intro text
    $html = $html -replace '(?s)<div class="sol-intro-text">.*?</div>(\s*</div>\s*</section>\s*<section class="sol-gallery">)', "<div class=`"sol-intro-text`">$($page.introText)</div>`$1"

    # Gallery title
    $html = $html -replace '<h2 class="sol-gallery-title">Image Gallery</h2>', "<h2 class=`"sol-gallery-title`">$($page.galleryTitle)</h2>"

    # Empty gallery grid (no images yet - can be added later)
    $html = $html -replace '(?s)<div class="sol-grid">.*?</div>\s*</section>\s*<section class="sol-cta">', "<div class=`"sol-grid`">`n            <p style=`"text-align:center;color:#888;padding:3rem;grid-column:1/-1`">Images coming soon. Please check back later.</p>`n        </div>`n    </section>`n`n    <section class=`"sol-cta`">"

    [System.IO.File]::WriteAllText("d:\TRUE LINE\aldhabisteel\$($page.file)", $html, [System.Text.Encoding]::UTF8)
    Write-Host "Created: $($page.file)"
}

Write-Host "All 3 pages created."
