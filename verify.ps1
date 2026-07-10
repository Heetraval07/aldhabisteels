$c = [System.IO.File]::ReadAllText('d:\TRUE LINE\aldhabisteel\channel-gratings.html')
$total = ([regex]::Matches($c, 'sol-card-title')).Count
$old = ([regex]::Matches($c, 'Specimen')).Count
Write-Host "Total cards: $total"
Write-Host "Old Specimen cards remaining: $old"
