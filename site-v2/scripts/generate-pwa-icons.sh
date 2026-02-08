#!/bin/bash

# Create icons directory if it doesn't exist
mkdir -p public/icons

# Generate different sized icons from the source image
# Assuming ffmpeg is installed
SOURCE_IMAGE="public/me_rstr_cmy_square_edge.jpg"

if [ ! -f "$SOURCE_IMAGE" ]; then
  echo "Source image not found: $SOURCE_IMAGE"
  exit 1
fi

# Generate icons of different sizes
SIZES=(72 96 128 144 152 192 384 512)

for SIZE in "${SIZES[@]}"; do
  echo "Generating $SIZE x $SIZE icon..."
  ffmpeg -i "$SOURCE_IMAGE" -vf "scale=${SIZE}:${SIZE}" "public/icons/icon-${SIZE}x${SIZE}.png"
done

echo "PWA icons generated successfully!"