$dir = "d:\TRUE LINE\aldhabisteel"
$files = Get-ChildItem $dir -Filter "*.html"

# The sub-panel to add for Kitchen Catering (data-parent="5")
$newSubPanel = @'
                            <ul class="mega-sub-panel" data-parent="5" role="none">
                                <li class="mega-sub-header" aria-hidden="true">Kitchen Catering Solutions</li>
                                <li role="none"><a href="villa-projects.html" class="mega-child-link" data-l2="0" role="menuitem">Villa Projects</a></li>
                                <li role="none"><a href="industrial-kitchen-works.html" class="mega-child-link" data-l2="1" role="menuitem">Industrial Kitchen Works</a></li>
                                <li role="none"><a href="restaurants-malls-projects.html" class="mega-child-link" data-l2="2" role="menuitem">Restaurants &amp; Malls Projects</a></li>
                            </ul>
'@

foreach ($file in $files) {
    $content = [System.IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)
    $changed = $false

    # 1. Add data-has-children to Kitchen Catering li (both inline and multiline variants)
    if ($content -match 'data-l1="5"(?! data-has-children)') {
        $content = $content -replace 'data-l1="5"(?! data-has-children)', 'data-l1="5" data-has-children'
        $changed = $true
    }

    # 2. Add the sub-panel before the closing </li> of mega-col-l2 if not already present
    if (-not $content.Contains('data-parent="5"')) {
        # Find the closing tag of mega-col-l2 section
        $marker = '</ul>' + "`n" + '                        </li>' + "`n" + '                    </ul>' + "`n" + '                </li>'
        $replacement = '</ul>' + "`n" + $newSubPanel + '                        </li>' + "`n" + '                    </ul>' + "`n" + '                </li>'
        if ($content.Contains($marker)) {
            $content = $content.Replace($marker, $replacement)
            $changed = $true
        } else {
            # Try alternate closing (some files may differ slightly)
            $marker2 = "</ul>`r`n                        </li>`r`n                    </ul>`r`n                </li>"
            $replacement2 = "</ul>`r`n" + $newSubPanel + "                        </li>`r`n                    </ul>`r`n                </li>"
            if ($content.Contains($marker2)) {
                $content = $content.Replace($marker2, $replacement2)
                $changed = $true
            }
        }
    }

    if ($changed) {
        [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
        Write-Host "Updated: $($file.Name)"
    } else {
        Write-Host "Skipped (no match or already done): $($file.Name)"
    }
}
Write-Host "Nav update done."
