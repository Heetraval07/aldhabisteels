$srcFile = "d:\TRUE LINE\aldhabisteel\general-solutions.html"
$dstFile = "d:\TRUE LINE\aldhabisteel\fitout-solutions.html"

$src = [System.IO.File]::ReadAllText($srcFile, [System.Text.Encoding]::UTF8)
$dst = [System.IO.File]::ReadAllText($dstFile, [System.Text.Encoding]::UTF8)

# Find sol-grid start index in source
$gridStart = $src.IndexOf('<div class="sol-grid">')
$gridEnd = $src.IndexOf('</div>', $gridStart)

# Find the last </div> that closes the sol-grid (before sol-cta section)
$ctaMarker = '<section class="sol-cta">'
$ctaIdx = $src.IndexOf($ctaMarker)
# The </div> just before </section> before sol-cta
$sectionClose = $src.LastIndexOf('</section>', $ctaIdx)
$gridEndTag = $src.LastIndexOf('</div>', $sectionClose) + '</div>'.Length

$extractedGrid = $src.Substring($gridStart, $gridEndTag - $gridStart)

Write-Host "Extracted grid length: $($extractedGrid.Length) chars"

# Now replace in destination - find and replace the sol-grid block
$dstGridStart = $dst.IndexOf('<div class="sol-grid">')
$dstCtaMarker = '<section class="sol-cta">'
$dstCtaIdx = $dst.IndexOf($dstCtaMarker)
$dstSectionClose = $dst.LastIndexOf('</section>', $dstCtaIdx)
$dstGridEndTag = $dst.LastIndexOf('</div>', $dstSectionClose) + '</div>'.Length

$newDst = $dst.Substring(0, $dstGridStart) + $extractedGrid + $dst.Substring($dstGridEndTag)

if ($newDst -eq $dst) {
    Write-Host "ERROR: Content unchanged."
} else {
    [System.IO.File]::WriteAllText($dstFile, $newDst, [System.Text.Encoding]::UTF8)
    Write-Host "Done. fitout-solutions.html gallery replaced with General Solutions images."
}
