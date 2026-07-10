$dir = "d:\TRUE LINE\aldhabisteel"
$files = Get-ChildItem $dir -Filter "*.html"

$svgPhone = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>'

foreach ($file in $files) {
    $content = [System.IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)
    
    # Check if new number already present
    if ($content.Contains('+971 6 5440136')) {
        Write-Host "Already has new number: $($file.Name)"
        continue
    }
    
    # Pretty-printed pattern: the </a> and </div> are on separate lines
    # Look for the line with the phone anchor and the next line with </div>
    if ($content.Contains('<a href="tel:+971502566872">+971 50 2566 872</a>')) {
        # Use regex with multiline to match the anchor line + following </div>
        $pattern = '(<a href="tel:\+971502566872">\+971 50 2566 872</a>\s*\r?\n(\s*)</div>)'
        $replacement = '$1' + "`n" + '$2<div class="footer-contact-item">' + "`n" + '$2    ' + $svgPhone + "`n" + '$2    <a href="tel:+97165440136">+971 6 5440136</a>' + "`n" + '$2</div>'
        $newContent = [regex]::Replace($content, $pattern, $replacement)
        if ($newContent -ne $content) {
            [System.IO.File]::WriteAllText($file.FullName, $newContent, [System.Text.Encoding]::UTF8)
            Write-Host "Updated (pretty): $($file.Name)"
        } else {
            Write-Host "No match: $($file.Name)"
        }
    }
}
Write-Host "Done."
