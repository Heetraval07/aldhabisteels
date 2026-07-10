$basePath = "images/Slide-images/Drainage Solutions/Channel Gratings"

# All 28 images - shuffled so similar names are spread out
$images = @(
    "Amul Trap.jpeg",
    "Angle Frame with Ladder Type Grating.jpeg",
    "Amul Trap 1.jpeg",
    "Channel Grating.jpeg",
    "Angle Frame with Non Slip Grating.jpeg",
    "Amul Trap 2.jpg",
    "Channel with Heel Guard.jpeg",
    "Angle Frame with Slotted Top.jpeg",
    "Industrial Floor Drain.jpeg",
    "Angle Frame with Non Slip Grating 1.jpeg",
    "Channel with slot Grating.jpeg",
    "Heel Guard Grating.jpeg",
    "Angle Frame with Slotted Top 1.jpeg",
    "Channel with Heel Guard 1.jpeg",
    "Slotted Channel.jpeg",
    "Channel Grating 1.jpeg",
    "Heavy Duty Grating.jpeg",
    "Channel with Heel Guard 2.jpeg",
    "SS Ladder Type Grating with Frame.jpeg",
    "Channel with Non Slip Grating.jpg",
    "Industrial Floor Grating.jpeg",
    "Channel with slot Grating 2.jpeg",
    "SS Channel with Soltted Tray.jpeg",
    "Ladder Type Grating.jpg",
    "Industrial Gratings.jpeg",
    "SS Channel with Soltted Tray 1.jpg",
    "Channel with Slotted Top.jpeg",
    "SS Ladder Type Grating - Copy.jpeg"
)

# Clean title: remove trailing numbers, " - Copy", etc.
function Clean-Title($filename) {
    $name = [System.IO.Path]::GetFileNameWithoutExtension($filename)
    # Remove " - Copy"
    $name = $name -replace '\s*-\s*Copy\s*$', ''
    # Remove trailing " 1", " 2", " 3" etc.
    $name = $name -replace '\s+\d+$', ''
    return $name.Trim()
}

$zoom = '<div class="sol-card-zoom-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg></div>'

$gridHtml = "        <div class=`"sol-grid`">`n"
foreach ($img in $images) {
    $title = Clean-Title $img
    $src = "$basePath/$img"
    $gridHtml += "            <article class=`"sol-card`" data-img-src=`"$src`" data-title=`"$title`" data-category=`"Channel Gratings`" tabindex=`"0`" role=`"button`" aria-label=`"View: $title`">`n"
    $gridHtml += "                <div class=`"sol-card-img-wrap`">`n"
    $gridHtml += "                    <img src=`"$src`" alt=`"$title`" loading=`"lazy`">`n"
    $gridHtml += "                    $zoom`n"
    $gridHtml += "                </div>`n"
    $gridHtml += "                <div class=`"sol-card-body`">`n"
    $gridHtml += "                    <span class=`"sol-card-category`">Channel Gratings</span>`n"
    $gridHtml += "                    <h3 class=`"sol-card-title`">$title</h3>`n"
    $gridHtml += "                </div>`n"
    $gridHtml += "            </article>`n"
}
$gridHtml += "        </div>"

$file = "d:\TRUE LINE\aldhabisteel\channel-gratings.html"
$content = [System.IO.File]::ReadAllText($file, [System.Text.Encoding]::UTF8)

$pattern = '(?s)(<section class="sol-gallery">.*?<div class="sol-gallery-underline"></div>\s*</div>\s*)(<div class="sol-grid">.*?</div>)(\s*</section>)'
$replacement = '$1' + $gridHtml + '$3'

$newContent = [regex]::Replace($content, $pattern, $replacement)

if ($newContent -eq $content) {
    Write-Host "ERROR: Pattern did not match."
} else {
    [System.IO.File]::WriteAllText($file, $newContent, [System.Text.Encoding]::UTF8)
    Write-Host "Done. 28 cards updated with clean titles."
}
