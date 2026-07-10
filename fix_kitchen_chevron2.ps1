$dir = "d:\TRUE LINE\aldhabisteel"
$files = Get-ChildItem $dir -Filter "*.html"

$chevron = '<svg class="mega-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>'

foreach ($file in $files) {
    $content = [System.IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)

    # Match the multiline version: data-has-children role="menuitem">\n...Kitchen Catering Solutions\n...</a>
    $pattern = '(data-l1="5" data-has-children role="menuitem">)\s*\r?\n\s*(Kitchen Catering Solutions)\s*\r?\n\s*(</a>)'
    if ([regex]::IsMatch($content, $pattern)) {
        $replacement = 'data-l1="5" role="menuitem">Kitchen Catering Solutions' + $chevron + '</a>'
        # Also fix the li attr
        $content = [regex]::Replace($content, $pattern, $replacement)
        [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
        Write-Host "Fixed (multiline): $($file.Name)"
    }
}
Write-Host "Done."
