#!/bin/bash

# Download script for found Genosys product images
set -e

IMAGES_DIR="/Volumes/SSD/Projects/NKGuzellik/nk-guzellik/public/images/products"
JSON_FILE="/Volumes/SSD/Projects/NKGuzellik/nk-guzellik/found_genosys_images.json"
USER_AGENT="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"

# Function to log messages
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

# Function to download and convert image
download_and_convert() {
    local product_id="$1"
    local image_url="$2"
    local output_file="$IMAGES_DIR/${product_id}-main.jpg"
    local temp_file="/tmp/genosys_temp_$$"

    log "Downloading: $product_id"
    log "URL: $image_url"
    log "Output: $output_file"

    # Download
    if curl -s -L -A "$USER_AGENT" \
        --max-time 30 \
        --retry 3 \
        --retry-delay 2 \
        "$image_url" -o "$temp_file"; then

        # Validate file
        if file "$temp_file" | grep -q -E "(JPEG|PNG|WebP)"; then
            local dimensions=$(identify "$temp_file" 2>/dev/null | cut -d' ' -f3 || echo "unknown")
            log "Image dimensions: $dimensions"

            # Convert to JPG if needed
            if [[ "$image_url" =~ \.png$ ]] || [[ $(file "$temp_file") =~ PNG ]]; then
                convert "$temp_file" -quality 90 "$output_file"
                log "✅ Converted PNG to JPG: $output_file"
            elif [[ $(file "$temp_file") =~ WebP ]]; then
                convert "$temp_file" -quality 90 "$output_file"
                log "✅ Converted WebP to JPG: $output_file"
            else
                cp "$temp_file" "$output_file"
                log "✅ Downloaded JPG: $output_file"
            fi

            rm -f "$temp_file"
            return 0
        else
            log "❌ Invalid image format"
            rm -f "$temp_file"
            return 1
        fi
    else
        log "❌ Download failed"
        rm -f "$temp_file"
        return 1
    fi
}

# Check if JSON file exists
if [[ ! -f "$JSON_FILE" ]]; then
    log "❌ JSON file not found: $JSON_FILE"
    log "Please run the find_genosys_images.py script first"
    exit 1
fi

# Check for required tools
command -v jq >/dev/null 2>&1 || { log "❌ jq is required but not installed. Install with: brew install jq"; exit 1; }
command -v identify >/dev/null 2>&1 || { log "❌ ImageMagick identify is required but not installed"; exit 1; }
command -v convert >/dev/null 2>&1 || { log "❌ ImageMagick convert is required but not installed"; exit 1; }

# Create images directory if it doesn't exist
mkdir -p "$IMAGES_DIR"

log "Starting download of images from JSON file..."

# Parse JSON and download images
successful_downloads=0
failed_downloads=0

# Get all product IDs from JSON
product_ids=$(jq -r 'keys[]' "$JSON_FILE")

while IFS= read -r product_id; do
    log "=== Processing: $product_id ==="

    # Skip if file already exists
    output_file="$IMAGES_DIR/${product_id}-main.jpg"
    if [[ -f "$output_file" ]]; then
        log "⚠️  Already exists: $output_file"
        continue
    fi

    # Get the first (best) image URL for this product
    image_url=$(jq -r ".\"$product_id\"[0]" "$JSON_FILE")

    if [[ "$image_url" != "null" && -n "$image_url" ]]; then
        if download_and_convert "$product_id" "$image_url"; then
            ((successful_downloads++))
        else
            ((failed_downloads++))
        fi
    else
        log "❌ No image URL found for: $product_id"
        ((failed_downloads++))
    fi

    # Rate limiting
    sleep 1
    log ""
done <<< "$product_ids"

# Summary
log "=== DOWNLOAD SUMMARY ==="
log "Successful downloads: $successful_downloads"
log "Failed downloads: $failed_downloads"

if [[ $successful_downloads -gt 0 ]]; then
    log "✅ Downloaded $successful_downloads product images successfully!"
fi

log "Download process completed!"