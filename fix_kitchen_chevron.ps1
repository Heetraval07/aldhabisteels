$dir = "d:\TRUE LINE\aldhabisteel"
$files = Get-ChildItem $dir -Filter "*.html"

$chevron = '<svg class="mega-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>'

$oldLink = 'href="kitchen-solutions.html" class="mega-parent-link" data-l1="5" data-has-children role="menuitem">Kitchen Catering Solutions</a>'
$newLink = 'href="kitchen-solutions.html" class="mega-parent-link" data-l1="5" role="menuitem">Kitchen Catering Solutions' + $chevron + '</a>'

# Also fix the li - remove duplicate data-has-children from the anchor (keep only on li)
$oldLi = 'data-l1="5" data-has-children><a href="kitchen-solutions.html" class="mega-parent-link" data-l1="5" data-has-children role="menuitem">Kitchen Catering Solutions</a>'
$newLi = 'data-l1="5" data-has-children><a href="kitchen-solutions.html" class="mega-parent-link" data-l1="5" role="menuitem">Kitchen Catering Solutions' + $chevron + '</a>'

foreach ($file in $files) {
    $content = [System.IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)
    $changed = $false

    if ($content.Contains($oldLi)) {
        $content = $content.Replace($oldLi, $newLi)
        $changed = $true
    } elseif ($content.Contains($oldLink)) {
        $content = $content.Replace($oldLink, $newLink)
        $changed = $true
    }

    if ($changed) {
        [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
        Write-Host "Fixed: $($file.Name)"
    } else {
        Write-Host "No match: $($file.Name)"
    }
}
Write-Host "Done."
