Get-ChildItem -Path "." -Filter "*.html" -Recurse | ForEach-Object {
    $file = $_.FullName
    $content = Get-Content $file -Raw -Encoding UTF8
    $updated = $content -replace "AL DHABI STEEL LLC", "AL DHABI STEELS LLC" -replace "Al Dhabi Steel LLC", "Al Dhabi Steels LLC"
    if ($updated -ne $content) {
        Set-Content $file $updated -NoNewline -Encoding UTF8
        Write-Host "Updated: $($_.Name)"
    }
}
Write-Host "Done."
