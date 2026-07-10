$files = Get-ChildItem "d:\TRUE LINE\aldhabisteel" -Filter "*.html"
foreach ($f in $files) {
    $c = [System.IO.File]::ReadAllText($f.FullName)
    $count = ([regex]::Matches($c, '5440136')).Count
    Write-Host "$($f.Name): $count"
}
