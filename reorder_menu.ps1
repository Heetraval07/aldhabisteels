$dir = "d:\TRUE LINE\aldhabisteel"
$files = Get-ChildItem $dir -Filter "*.html"

# The new complete L1 block (same for all files)
$newNav = '<ul class="products-mega" id="productsMega" role="menu" aria-label="Products menu">
                        <li class="mega-col-l1" role="none">
                            <ul style="list-style:none;padding:0;margin:0;">
                                <li class="mega-item" role="none" data-l1="0"><a href="fitout-solutions.html" class="mega-parent-link" data-l1="0" role="menuitem">Exotic Bespoken Design</a></li>
                                <li class="mega-item" role="none" data-l1="1" data-has-children><a href="all-customized.html" class="mega-parent-link" data-l1="1" role="menuitem">Craft Engineered Design<svg class="mega-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg></a></li>
                                <li class="mega-item" role="none" data-l1="2" data-has-children><a href="access-utility-panels.html" class="mega-parent-link" data-l1="2" role="menuitem">Access &amp; Utility Service Panels<svg class="mega-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg></a></li>
                                <li class="mega-item" role="none" data-l1="3" data-has-children><a href="drainage-solutions.html" class="mega-parent-link" data-l1="3" role="menuitem">Tailor-Made Drainage Products<svg class="mega-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg></a></li>
                                <li class="mega-item" role="none" data-l1="4" data-has-children><a href="kitchen-solutions.html" class="mega-parent-link" data-l1="4" role="menuitem">Kitchen Catering Solutions<svg class="mega-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg></a></li>
                                <li class="mega-item" role="none" data-l1="5" data-has-children><a href="end-to-end-range.html" class="mega-parent-link" data-l1="5" role="menuitem">End-to-End Range Products<svg class="mega-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg></a></li>
                            </ul>
                        </li>
                        <li class="mega-divider" role="none" aria-hidden="true"></li>
                        <li class="mega-col-l2" role="none">
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
                            <ul class="mega-sub-panel" data-parent="4" role="none">
                                <li class="mega-sub-header" aria-hidden="true">Kitchen Catering Solutions</li>
                                <li role="none"><a href="villa-projects.html" class="mega-child-link" data-l2="0" role="menuitem">Villa Projects</a></li>
                                <li role="none"><a href="industrial-kitchen-works.html" class="mega-child-link" data-l2="1" role="menuitem">Industrial Kitchen Works</a></li>
                                <li role="none"><a href="restaurants-malls-projects.html" class="mega-child-link" data-l2="2" role="menuitem">Restaurants &amp; Malls Projects</a></li>
                            </ul>
                            <ul class="mega-sub-panel" data-parent="5" role="none">
                                <li class="mega-sub-header" aria-hidden="true">End-to-End Range</li>
                                <li role="none"><a href="general-solutions.html" class="mega-child-link" data-l2="0" role="menuitem">General Solutions</a></li>
                            </ul>
                        </li>
                    </ul>'

foreach ($file in $files) {
    $content = [System.IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)

    # Find the mega menu start and end
    $start = $content.IndexOf('<ul class="products-mega" id="productsMega"')
    if ($start -lt 0) { Write-Host "No mega menu: $($file.Name)"; continue }

    # Find closing </ul> that matches - count depth
    $depth = 0
    $i = $start
    $end = -1
    while ($i -lt $content.Length - 3) {
        if ($content.Substring($i, 4) -eq '<ul ') { $depth++ }
        elseif ($content.Substring($i, 3) -eq '<ul') { $depth++ }
        elseif ($content.Substring($i, 5) -eq '</ul>') {
            $depth--
            if ($depth -eq 0) { $end = $i + 5; break }
        }
        $i++
    }

    if ($end -lt 0) { Write-Host "Could not find end: $($file.Name)"; continue }

    $newContent = $content.Substring(0, $start) + $newNav + $content.Substring($end)
    [System.IO.File]::WriteAllText($file.FullName, $newContent, [System.Text.Encoding]::UTF8)
    Write-Host "Updated: $($file.Name)"
}
Write-Host "Done."
