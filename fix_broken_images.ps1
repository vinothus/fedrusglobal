# Script to fix broken image links and remaining fedrusglobal.com references

Write-Host "🖼️ Fixing broken image links and remaining references..."
Write-Host ""

# Get all HTML files
$htmlFiles = Get-ChildItem -Filter "*.html"

foreach ($file in $htmlFiles) {
    Write-Host "📝 Processing: $($file.Name)..."
    
    # Read file content
    $content = Get-Content $file.FullName -Raw
    
    # 1. FIX BROKEN IMAGE SRCSET ATTRIBUTES
    Write-Host "  ├─ Fixing image srcset attributes..."
    
    # Fix specific blog images
    $content = $content -replace 'srcset="https://www\.fedrusglobal\.com/wp-content/uploads/2025/03/The-Future-of-EVs-in-India\.png [^"]*"', 'src="./assets/images/The-Future-of-EVs-in-India.png"'
    $content = $content -replace 'srcset="https://www\.fedrusglobal\.com/wp-content/uploads/2025/03/A-Guide-to-Vehicle-HVAC-Performance-Testing_-Ensuring-Comfort-in-Any-Weather\.png [^"]*"', 'src="./assets/images/A-Guide-to-Vehicle-HVAC-Performance-Testing_-Ensuring-Comfort-in-Any-Weather.png"'
    $content = $content -replace 'srcset="https://www\.fedrusglobal\.com/wp-content/uploads/2025/03/How-AI-is-Shaping-the-Future-of-IT-At-Fedrus\.png [^"]*"', 'src="./assets/images/How-AI-is-Shaping-the-Future-of-IT-At-Fedrus.png"'
    
    # Fix automotive solution images
    $content = $content -replace 'srcset="https://www\.fedrusglobal\.com/wp-content/uploads/2025/02/Brake\.png [^"]*"', 'src="./assets/images/Brake.png"'
    $content = $content -replace 'srcset="https://www\.fedrusglobal\.com/wp-content/uploads/2025/02/Water-Wading\.png [^"]*"', 'src="./assets/images/Water-Wading.png"'
    $content = $content -replace 'srcset="https://www\.fedrusglobal\.com/wp-content/uploads/2025/02/thermal\.png [^"]*"', 'src="./assets/images/thermal.png"'
    $content = $content -replace 'srcset="https://www\.fedrusglobal\.com/wp-content/uploads/2025/02/clutch\.png [^"]*"', 'src="./assets/images/clutch.png"'
    $content = $content -replace 'srcset="https://www\.fedrusglobal\.com/wp-content/uploads/2025/02/High-Altitude\.png [^"]*"', 'src="./assets/images/High-Altitude.png"'
    
    # Fix numbered images (11-1-1.png, 12.png, etc.)
    $content = $content -replace 'srcset="https://www\.fedrusglobal\.com/wp-content/uploads/2025/02/11-1-1\.png [^"]*"', 'src="./assets/images/11-1-1.png"'
    $content = $content -replace 'srcset="https://www\.fedrusglobal\.com/wp-content/uploads/2025/02/12\.png [^"]*"', 'src="./assets/images/12.png"'
    $content = $content -replace 'srcset="https://www\.fedrusglobal\.com/wp-content/uploads/2025/02/13\.png [^"]*"', 'src="./assets/images/13.png"'
    $content = $content -replace 'srcset="https://www\.fedrusglobal\.com/wp-content/uploads/2025/02/14\.png [^"]*"', 'src="./assets/images/14.png"'
    $content = $content -replace 'srcset="https://www\.fedrusglobal\.com/wp-content/uploads/2025/02/16\.png [^"]*"', 'src="./assets/images/16.png"'
    
    # Fix about us images
    $content = $content -replace 'srcset="https://www\.fedrusglobal\.com/wp-content/uploads/2025/02/Map-1024x330\.png [^"]*"', 'src="./assets/images/Map-1024x330.png"'
    $content = $content -replace 'srcset="https://www\.fedrusglobal\.com/wp-content/uploads/2025/03/Group-2-1024x330\.png [^"]*"', 'src="./assets/images/Group-2-1024x330.png"'
    
    # Generic fix for any remaining srcset with external URLs
    $content = $content -replace 'srcset="https://www\.fedrusglobal\.com/wp-content/uploads/[^"]*"', 'src="./assets/images/"'
    
    # 2. FIX REMAINING NAVIGATION LINKS
    Write-Host "  ├─ Fixing remaining navigation links..."
    $content = $content -replace 'href="https://www\.fedrusglobal\.com/careers/"', 'href="./careers.html"'
    $content = $content -replace 'href="https://www\.fedrusglobal\.com/blogs/"', 'href="./blogs.html"'
    $content = $content -replace 'href="https://www\.fedrusglobal\.com/__trashed/"', 'href="./blogs.html"'
    
    # 3. COMMENT OUT NON-FUNCTIONAL REFERENCES
    Write-Host "  ├─ Commenting out non-functional references..."
    
    # Comment out WordPress API endpoints (won't work offline)
    $content = $content -replace 'href="https://www\.fedrusglobal\.com/wp-json/[^"]*"', '<!-- href="https://www.fedrusglobal.com/wp-json/..." (offline) -->'
    $content = $content -replace 'href="https://www\.fedrusglobal\.com/xmlrpc\.php[^"]*"', '<!-- href="https://www.fedrusglobal.com/xmlrpc.php" (offline) -->'
    
    # Comment out oEmbed URLs (for social sharing)
    $content = $content -replace 'href="https://www\.fedrusglobal\.com/wp-json/oembed/[^"]*"', '<!-- href="https://www.fedrusglobal.com/wp-json/oembed/..." (offline) -->'
    
    # Comment out RSS feeds
    $content = $content -replace 'href="https://www\.fedrusglobal\.com/careers/feed/"', '<!-- href="https://www.fedrusglobal.com/careers/feed/" (offline) -->'
    
    # 4. REMOVE BROKEN JAVASCRIPT REFERENCES
    Write-Host "  ├─ Updating JavaScript configurations..."
    $content = $content -replace '"concatemoji":"https://www\.fedrusglobal\.com/wp-includes/js/[^"]*"', '"concatemoji":"./assets/js/"'
    
    # Write updated content back to file
    Set-Content -Path $file.FullName -Value $content -Encoding UTF8
    
    Write-Host "  └─ ✅ $($file.Name) updated successfully!"
    Write-Host ""
}

Write-Host "🎉 All broken image links and references fixed!"
Write-Host ""
Write-Host "📊 Summary of fixes:"
Write-Host "  ✅ Image srcset → Local assets"
Write-Host "  ✅ Remaining navigation → Local HTML files"
Write-Host "  ✅ WordPress API endpoints → Commented out"
Write-Host "  ✅ oEmbed URLs → Commented out"
Write-Host "  ✅ RSS feeds → Commented out"
Write-Host "  ✅ JavaScript references → Local assets" 