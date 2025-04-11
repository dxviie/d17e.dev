# PowerShell script to generate PWA icons for Windows users

# Create icons directory if it doesn't exist
$IconsDir = ".\..\public\icons"
if (-not (Test-Path $IconsDir)) {
    New-Item -ItemType Directory -Force -Path $IconsDir
    Write-Host "Created icons directory: $IconsDir"
}

# Source image path
$SourceImage = ".\..\public\avatar_me_vera_square.png"

if (-not (Test-Path $SourceImage)) {
    Write-Host "Source image not found: $SourceImage" -ForegroundColor Red
    exit 1
}

# Check if ffmpeg is installed
try {
    $null = Get-Command ffmpeg -ErrorAction Stop
    Write-Host "ffmpeg is installed, proceeding with icon generation." -ForegroundColor Green
}
catch {
    Write-Host "ffmpeg is not installed or not in PATH." -ForegroundColor Red
    Write-Host "Please install ffmpeg to use this script." -ForegroundColor Yellow
    Write-Host "You can download it from: https://ffmpeg.org/download.html" -ForegroundColor Yellow
    Write-Host "Or install it via Chocolatey: choco install ffmpeg" -ForegroundColor Yellow
    exit 1
}

# Generate icons of different sizes
$Sizes = @(72, 96, 128, 144, 152, 192, 384, 512)

foreach ($Size in $Sizes) {
    Write-Host "Generating $Size x $Size icon..." -ForegroundColor Cyan
    $OutputPath = "$IconsDir\icon-$($Size)x$($Size).png"
    
    # Use ffmpeg to resize the image
    ffmpeg -i $SourceImage -vf "scale=$Size`:$Size" -y $OutputPath
    
    if (Test-Path $OutputPath) {
        Write-Host "  Created: $OutputPath" -ForegroundColor Green
    } else {
        Write-Host "  Failed to create: $OutputPath" -ForegroundColor Red
    }
}

Write-Host "PWA icons generated successfully!" -ForegroundColor Green