# Comprehensive script to fix all fedrusglobal.com references across all HTML files

Write-Host "🚀 Starting comprehensive link update for all HTML files..."
Write-Host ""

# Get all HTML files
$htmlFiles = Get-ChildItem -Filter "*.html"

foreach ($file in $htmlFiles) {
    Write-Host "📝 Processing: $($file.Name)..."
    
    # Read file content
    $content = Get-Content $file.FullName -Raw
    
    # 1. UPDATE NAVIGATION LINKS
    Write-Host "  ├─ Updating navigation links..."
    $content = $content -replace 'href="https://www\.fedrusglobal\.com/"', 'href="./index.html"'
    $content = $content -replace 'href="https://www\.fedrusglobal\.com/about-us"', 'href="./about-us.html"'
    $content = $content -replace 'href="https://www\.fedrusglobal\.com/about-us#([^"]*)"', 'href="./about-us.html#$1"'
    $content = $content -replace 'href="https://www\.fedrusglobal\.com/automotive-solutions/"', 'href="./automotive-solutions.html"'
    $content = $content -replace 'href="https://www\.fedrusglobal\.com/automotive-solutions"', 'href="./automotive-solutions.html"'
    $content = $content -replace 'href="https://www\.fedrusglobal\.com/it-services/"', 'href="./it-services.html"'
    $content = $content -replace 'href="https://www\.fedrusglobal\.com/it-services"', 'href="./it-services.html"'
    $content = $content -replace 'href="https://www\.fedrusglobal\.com/staff-augmentation/"', 'href="./staff-augmentation.html"'
    $content = $content -replace 'href="https://www\.fedrusglobal\.com/staff-augmentation"', 'href="./staff-augmentation.html"'
    $content = $content -replace 'href="https://www\.fedrusglobal\.com/careers/"', 'href="./careers.html"'
    $content = $content -replace 'href="https://www\.fedrusglobal\.com/careers"', 'href="./careers.html"'
    $content = $content -replace 'href="https://www\.fedrusglobal\.com/blogs/"', 'href="./blogs.html"'
    $content = $content -replace 'href="https://www\.fedrusglobal\.com/blogs"', 'href="./blogs.html"'
    $content = $content -replace 'href="https://www\.fedrusglobal\.com/contact-us/"', 'href="./contact-us.html"'
    $content = $content -replace 'href="https://www\.fedrusglobal\.com/contact-us"', 'href="./contact-us.html"'
    
    # 2. UPDATE FAVICON AND ICON REFERENCES
    Write-Host "  ├─ Updating favicon references..."
    $content = $content -replace 'href="https://www\.fedrusglobal\.com/wp-content/uploads/2023/12/Logo-1\.png"', 'href="./assets/images/Logo-1.png"'
    $content = $content -replace 'href="https://www\.fedrusglobal\.com/favicon\.ico"', 'href="./assets/images/favicon.png"'
    
    # 3. UPDATE META TAGS
    Write-Host "  ├─ Updating meta tags..."
    $content = $content -replace '<link rel="canonical" href="https://www\.fedrusglobal\.com/[^"]*"', '<link rel="canonical" href="./' + $file.Name + '"'
    $content = $content -replace '<link rel="shortlink" href="https://www\.fedrusglobal\.com/[^"]*"', '<link rel="shortlink" href="./' + $file.Name + '"'
    
    # 4. UPDATE WORDPRESS SPECIFIC LINKS
    Write-Host "  ├─ Updating WordPress links..."
    $content = $content -replace 'https://www\.fedrusglobal\.com/feed/', '#'
    $content = $content -replace 'https://www\.fedrusglobal\.com/comments/feed/', '#'
    
    # 5. UPDATE BLOG FEED LINKS
    $content = $content -replace 'href="https://www\.fedrusglobal\.com/feed/"', 'href="#"'
    
    # 6. UPDATE SKIP NAVIGATION LINKS
    $content = $content -replace 'href="https://www\.fedrusglobal\.com/#content"', 'href="#content"'
    
    # Write updated content back to file
    Set-Content -Path $file.FullName -Value $content -Encoding UTF8
    
    Write-Host "  └─ ✅ $($file.Name) updated successfully!"
    Write-Host ""
}

Write-Host "🎉 All HTML files processed successfully!"
Write-Host ""

# Count remaining references
Write-Host "📊 Checking remaining references..."
$remainingCount = 0
foreach ($file in $htmlFiles) {
    $count = (Select-String -Path $file.FullName -Pattern "https://www\.fedrusglobal\.com" | Measure-Object).Count
    $remainingCount += $count
    Write-Host "  $($file.Name): $count references"
}
Write-Host ""
Write-Host "Total remaining references: $remainingCount" 