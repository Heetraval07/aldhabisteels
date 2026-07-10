# Build Kitchen Gallery Pages Script

function Create-Card {
    param($imgPath, $title, $category)
    
    return @"
            <article class="sol-card" data-img-src="$imgPath" data-title="$title" data-category="$category" tabindex="0" role="button" aria-label="View: $title">
                <div class="sol-card-img-wrap">
                    <img src="$imgPath" alt="$title" loading="lazy">
                    <div class="sol-card-zoom-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg></div>
                </div>
                <div class="sol-card-body">
                    <span class="sol-card-category">$category</span>
                    <h3 class="sol-card-title">$title</h3>
                </div>
            </article>
"@
}

# Villa Projects
Write-Host "Building Villa Projects gallery..."
$villaImages = Get-ChildItem "images\Slide-images\Kitchen Solutions\Villa\*.jpeg", "images\Slide-images\Kitchen Solutions\Villa\*.jpg" | Sort-Object Name
$villaCards = ""
foreach ($img in $villaImages) {
    $title = $img.BaseName
    $path = "images/Slide-images/Kitchen Solutions/Villa/" + $img.Name
    $villaCards += Create-Card -imgPath $path -title $title -category "Villa Projects"
}

# Industrial Kitchen Works
Write-Host "Building Industrial Kitchen Works gallery..."
$industrialImages = Get-ChildItem "images\Slide-images\Kitchen Solutions\Industrial\*.jpeg", "images\Slide-images\Kitchen Solutions\Industrial\*.jpg", "images\Slide-images\Kitchen Solutions\Industrial\*.png" | Sort-Object Name
$industrialCards = ""
foreach ($img in $industrialImages) {
    $title = $img.BaseName
    $path = "images/Slide-images/Kitchen Solutions/Industrial/" + $img.Name
    $industrialCards += Create-Card -imgPath $path -title $title -category "Industrial Kitchen Works"
}

# Restaurants & Malls Projects
Write-Host "Building Restaurants & Malls Projects gallery..."
$restaurantImages = Get-ChildItem "images\Slide-images\Kitchen Solutions\Restaurant\*.jpeg", "images\Slide-images\Kitchen Solutions\Restaurant\*.jpg", "images\Slide-images\Kitchen Solutions\Restaurant\*.png" | Sort-Object Name
$restaurantCards = ""
foreach ($img in $restaurantImages) {
    $title = $img.BaseName
    $path = "images/Slide-images/Kitchen Solutions/Restaurant/" + $img.Name
    $restaurantCards += Create-Card -imgPath $path -title $title -category "Restaurants & Malls Projects"
}

# Update Villa Projects HTML
Write-Host "Updating villa-projects.html..."
$villaHtml = Get-Content "villa-projects.html" -Raw
$villaHtml = $villaHtml -replace '<p style="text-align:center;color:#888;padding:3rem;grid-column:1/-1">Images coming soon.</p>', $villaCards
$villaHtml | Set-Content "villa-projects.html" -NoNewline

# Update Industrial Kitchen Works HTML
Write-Host "Updating industrial-kitchen-works.html..."
$industrialHtml = Get-Content "industrial-kitchen-works.html" -Raw
$industrialHtml = $industrialHtml -replace '<p style="text-align:center;color:#888;padding:3rem;grid-column:1/-1">Images coming soon.</p>', $industrialCards
$industrialHtml | Set-Content "industrial-kitchen-works.html" -NoNewline

# Update Restaurants & Malls Projects HTML
Write-Host "Updating restaurants-malls-projects.html..."
$restaurantHtml = Get-Content "restaurants-malls-projects.html" -Raw
$restaurantHtml = $restaurantHtml -replace '<p style="text-align:center;color:#888;padding:3rem;grid-column:1/-1">Images coming soon.</p>', $restaurantCards
$restaurantHtml | Set-Content "restaurants-malls-projects.html" -NoNewline

Write-Host "Done! All kitchen gallery pages updated."
