# Backup current files
Copy-Item -Path ".\index.html" -Destination ".\index-backup-$(Get-Date -Format 'yyyyMMdd-HHmmss').html" -Force
Copy-Item -Path ".\styles.css" -Destination ".\styles-backup-$(Get-Date -Format 'yyyyMMdd-HHmmss').css" -Force

# Replace with new files
if (Test-Path ".\new-index.html") {
    Move-Item -Path ".\new-index.html" -Destination ".\index.html" -Force
    Write-Host "✅ Successfully updated index.html" -ForegroundColor Green
} else {
    Write-Host "❌ new-index.html not found" -ForegroundColor Red
}

if (Test-Path ".\new-styles.css") {
    Move-Item -Path ".\new-styles.css" -Destination ".\styles.css" -Force
    Write-Host "✅ Successfully updated styles.css" -ForegroundColor Green
} else {
    Write-Host "❌ new-styles.css not found" -ForegroundColor Red
}

# Clean up old test files
$filesToRemove = @("debug-game.html", "minimal.html", "new-game.html", "simple-game.html", "test.html")
foreach ($file in $filesToRemove) {
    if (Test-Path $file) {
        Remove-Item $file -Force
        Write-Host "🗑️  Removed $file" -ForegroundColor Yellow
    }
}

Write-Host "\n🎮 The game has been updated! Open index.html in your browser to play." -ForegroundColor Cyan
