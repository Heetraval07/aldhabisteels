$dir = "d:\TRUE LINE\aldhabisteel"
$files = Get-ChildItem $dir -Filter "*.html"

foreach ($file in $files) {
    $content = [System.IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)
    $changed = $false

    # Remove inline nav li for Services (index.html style - double space)
    if ($content.Contains('<li><a href="#services"  class="nav-link">Services</a></li>')) {
        $content = $content.Replace('<li><a href="#services"  class="nav-link">Services</a></li>', '')
        $changed = $true
    }

    # Remove single-space variant (other pages)
    if ($content.Contains('<li><a href="index.html#services" class="nav-link">Services</a></li>')) {
        $content = $content.Replace('<li><a href="index.html#services" class="nav-link">Services</a></li>', '')
        $changed = $true
    }

    if ($changed) {
        [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
        Write-Host "Updated: $($file.Name)"
    } else {
        Write-Host "No match: $($file.Name)"
    }
}
Write-Host "Done."
