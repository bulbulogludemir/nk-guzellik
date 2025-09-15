#!/usr/bin/env python3
import json
import os
import re
from datetime import datetime

def normalize_name(name):
    """Normalize product name for comparison"""
    name = name.lower()
    # Remove special characters and extra spaces
    name = re.sub(r'[^\w\s]', ' ', name)
    name = re.sub(r'\s+', ' ', name).strip()
    # Remove genosys prefix if present
    name = re.sub(r'^genosys\s+', '', name)
    return name

def find_matching_product(product_name, product_list):
    """Find matching product by normalized name"""
    normalized_target = normalize_name(product_name)

    for product in product_list:
        normalized_current = normalize_name(product['name'])
        if normalized_target == normalized_current:
            return product

    # Try partial matching
    for product in product_list:
        normalized_current = normalize_name(product['name'])
        if normalized_target in normalized_current or normalized_current in normalized_target:
            return product

    return None

def get_image_path(product_id):
    """Get image path if exists"""
    image_dir = '/Volumes/SSD/Projects/NKGuzellik/nk-guzellik/public/images/products/'

    # Try different naming patterns for the downloaded images
    patterns = [
        f'genosys-{product_id}-main.jpg',
        f'genosys-{product_id.replace("-", "-")}-main.jpg',
        f'genosys-{product_id.replace("-", "³")}-main.jpg',
        f'{product_id}-main.jpg',
    ]

    for pattern in patterns:
        if os.path.exists(os.path.join(image_dir, pattern)):
            return f'/images/products/{pattern}'

    return None

def merge_product_data(current_product, new_product):
    """Merge current product with new data, keeping the best of both"""
    merged = current_product.copy()

    # Update with new structured data where it's better
    if new_product.get('url') and new_product['url'] != 'product-id':
        merged['url'] = new_product['url']

    if new_product.get('product_id') and len(new_product['product_id']) > 5:
        merged['product_id'] = new_product['product_id']

    # Keep longer, more detailed description
    if new_product.get('description') and len(new_product['description']) > len(current_product.get('description', '')):
        merged['description'] = new_product['description']

    # Update category if new one is more specific
    if new_product.get('category'):
        merged['category'] = new_product['category']

    # Update size if available
    if new_product.get('size'):
        merged['size'] = new_product['size']

    # Merge ingredients
    if new_product.get('ingredients'):
        current_ingredients = set(merged.get('ingredients', []))
        new_ingredients = set(new_product['ingredients'])
        merged['ingredients'] = list(current_ingredients.union(new_ingredients))

    # Merge features
    if new_product.get('features'):
        current_features = set(merged.get('features', []))
        new_features = set(new_product['features'])
        merged['features'] = list(current_features.union(new_features))

    # Merge benefits
    if new_product.get('benefits'):
        current_benefits = set(merged.get('benefits', []))
        new_benefits = set(new_product['benefits'])
        merged['benefits'] = list(current_benefits.union(new_benefits))

    # Update metadata if new data is available
    if new_product.get('meta_title'):
        merged['meta_title'] = new_product['meta_title']

    if new_product.get('meta_description'):
        merged['meta_description'] = new_product['meta_description']

    # Update scraped date
    merged['scraped_at'] = new_product.get('scraped_at', datetime.now().strftime('%Y-%m-%d'))

    # Try to find and update image paths
    image_path = get_image_path(merged['product_id'])
    if image_path:
        merged['image_paths'] = [image_path]
        merged['images'] = [image_path]

    return merged

def main():
    # Load current data
    with open('/Volumes/SSD/Projects/NKGuzellik/nk-guzellik/src/data/products_data.json', 'r', encoding='utf-8') as f:
        current_data = json.load(f)

    # Load new Genosys data
    with open('/Volumes/SSD/Projects/NKGuzellik/nk-guzellik/src/data/genosys_products_new.json', 'r', encoding='utf-8') as f:
        new_genosys = json.load(f)

    print(f"Starting merge...")
    print(f"Current total products: {len(current_data['products'])}")

    # Separate current products by brand
    current_genosys = [p for p in current_data['products'] if p.get('brand') == 'Genosys']
    other_products = [p for p in current_data['products'] if p.get('brand') != 'Genosys']

    print(f"Current Genosys products: {len(current_genosys)}")
    print(f"New Genosys products from website: {len(new_genosys)}")
    print(f"Other brand products: {len(other_products)}")

    # Merge products
    merged_genosys = []
    processed_new = set()

    # 1. Update existing products with new data
    for current_product in current_genosys:
        matching_new = find_matching_product(current_product['name'], new_genosys)

        if matching_new:
            print(f"Updating: {current_product['name']} -> {matching_new['name']}")
            merged_product = merge_product_data(current_product, matching_new)
            merged_genosys.append(merged_product)
            processed_new.add(matching_new['name'])
        else:
            # Keep existing product as-is (might be from different source)
            print(f"Keeping existing: {current_product['name']}")
            # Still try to update image if available
            image_path = get_image_path(current_product['product_id'])
            if image_path:
                current_product['image_paths'] = [image_path]
                current_product['images'] = [image_path]
            merged_genosys.append(current_product)

    # 2. Add new products that weren't matched
    for new_product in new_genosys:
        if new_product['name'] not in processed_new:
            print(f"Adding new: {new_product['name']}")
            # Try to find image for new product
            image_path = get_image_path(new_product['product_id'])
            if image_path:
                new_product['image_paths'] = [image_path]
                new_product['images'] = [image_path]
            merged_genosys.append(new_product)

    # 3. Combine all products
    final_products = other_products + merged_genosys

    # Create final data structure
    final_data = {
        'products': final_products
    }

    print(f"\\nMerge complete!")
    print(f"Final total products: {len(final_products)}")
    print(f"Final Genosys products: {len(merged_genosys)}")

    # Create backup of current data
    backup_file = '/Volumes/SSD/Projects/NKGuzellik/nk-guzellik/src/data/products_data_backup.json'
    with open(backup_file, 'w', encoding='utf-8') as f:
        json.dump(current_data, f, ensure_ascii=False, indent=2)
    print(f"Backup created: {backup_file}")

    # Save merged data
    with open('/Volumes/SSD/Projects/NKGuzellik/nk-guzellik/src/data/products_data.json', 'w', encoding='utf-8') as f:
        json.dump(final_data, f, ensure_ascii=False, indent=2)

    print("Merge completed successfully!")

    # Generate summary report
    print("\\n=== MERGE SUMMARY ===")
    genosys_with_images = len([p for p in merged_genosys if p.get('images') or p.get('image_paths')])
    print(f"Genosys products with images: {genosys_with_images}/{len(merged_genosys)}")

    categories = {}
    for product in merged_genosys:
        cat = product.get('category', 'Unknown')
        categories[cat] = categories.get(cat, 0) + 1

    print("Categories:")
    for cat, count in sorted(categories.items()):
        print(f"  {cat}: {count}")

if __name__ == '__main__':
    main()