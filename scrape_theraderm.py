#!/usr/bin/env python3
"""
Theraderm Product Scraper for NK Beauty
Scrapes all Theraderm products from NureDerm website
"""

import requests
from bs4 import BeautifulSoup
import json
import os
import time
import re
from urllib.parse import urljoin, urlparse
from PIL import Image
import io

class TheradermpScraper:
    def __init__(self):
        self.base_url = "https://nurederm.com"
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        })
        self.products = []

        # Create directories
        os.makedirs('theraderm_images', exist_ok=True)
        os.makedirs('theraderm_data', exist_ok=True)

    def get_all_product_urls(self):
        """Get all product URLs from the main category page"""
        print("Fetching main category page...")

        url = f"{self.base_url}/urunler/theraderm/all"
        response = self.session.get(url)

        if response.status_code != 200:
            print(f"Failed to fetch main page: {response.status_code}")
            return []

        soup = BeautifulSoup(response.content, 'html.parser')
        product_urls = []

        # Look for product links
        product_links = soup.find_all('a', href=re.compile(r'/urun/'))

        for link in product_links:
            href = link.get('href')
            if href and '/urun/' in href:
                full_url = urljoin(self.base_url, href)
                if full_url not in product_urls:
                    product_urls.append(full_url)

        print(f"Found {len(product_urls)} product URLs")
        return product_urls

    def clean_text(self, text):
        """Clean and normalize text"""
        if not text:
            return ""
        return re.sub(r'\s+', ' ', text.strip())

    def download_image(self, img_url, product_name):
        """Download and save product image"""
        try:
            if not img_url:
                return None

            # Make URL absolute
            img_url = urljoin(self.base_url, img_url)

            print(f"Downloading image for {product_name}...")
            response = self.session.get(img_url, stream=True)

            if response.status_code == 200:
                # Create safe filename
                safe_name = re.sub(r'[^\w\-_\.]', '_', product_name.lower())
                filename = f"theraderm_images/{safe_name}.jpg"

                # Save image
                with open(filename, 'wb') as f:
                    for chunk in response.iter_content(chunk_size=8192):
                        f.write(chunk)

                # Convert to JPG if needed
                try:
                    with Image.open(filename) as img:
                        if img.format != 'JPEG':
                            rgb_img = img.convert('RGB')
                            rgb_img.save(filename, 'JPEG', quality=95)
                except Exception as e:
                    print(f"Error converting image for {product_name}: {e}")

                print(f"✓ Downloaded: {filename}")
                return filename
            else:
                print(f"Failed to download image for {product_name}: {response.status_code}")
                return None

        except Exception as e:
            print(f"Error downloading image for {product_name}: {e}")
            return None

    def scrape_product_details(self, product_url):
        """Scrape detailed information from individual product page"""
        try:
            print(f"Scraping: {product_url}")
            response = self.session.get(product_url)

            if response.status_code != 200:
                print(f"Failed to fetch {product_url}: {response.status_code}")
                return None

            soup = BeautifulSoup(response.content, 'html.parser')

            # Extract product information
            product = {
                'url': product_url,
                'name': '',
                'description': '',
                'ingredients': '',
                'usage': '',
                'features': [],
                'size': '',
                'price': '',
                'images': [],
                'specifications': {}
            }

            # Product name
            name_selectors = ['h1', '.product-title', '.product-name', 'title']
            for selector in name_selectors:
                name_elem = soup.select_one(selector)
                if name_elem:
                    product['name'] = self.clean_text(name_elem.get_text())
                    break

            # Description
            desc_selectors = [
                '.product-description',
                '.description',
                '.product-detail',
                '.content',
                '[class*="description"]',
                '[class*="detail"]'
            ]

            for selector in desc_selectors:
                desc_elem = soup.select_one(selector)
                if desc_elem:
                    product['description'] = self.clean_text(desc_elem.get_text())
                    break

            # Look for ingredients
            ingredients_keywords = ['ingredients', 'içerik', 'kompozisyon', 'formula']
            for keyword in ingredients_keywords:
                elem = soup.find(text=re.compile(keyword, re.IGNORECASE))
                if elem:
                    parent = elem.parent if elem.parent else elem
                    next_elem = parent.find_next_sibling() or parent.find_next()
                    if next_elem:
                        product['ingredients'] = self.clean_text(next_elem.get_text())
                        break

            # Look for usage instructions
            usage_keywords = ['kullanım', 'usage', 'directions', 'application', 'how to use']
            for keyword in usage_keywords:
                elem = soup.find(text=re.compile(keyword, re.IGNORECASE))
                if elem:
                    parent = elem.parent if elem.parent else elem
                    next_elem = parent.find_next_sibling() or parent.find_next()
                    if next_elem:
                        product['usage'] = self.clean_text(next_elem.get_text())
                        break

            # Extract all images
            img_elements = soup.find_all('img')
            for img in img_elements:
                src = img.get('src') or img.get('data-src')
                if src and any(ext in src.lower() for ext in ['.jpg', '.jpeg', '.png', '.webp']):
                    # Skip logos and icons
                    if not any(skip in src.lower() for skip in ['logo', 'icon', 'favicon']):
                        product['images'].append(src)

            # Extract size/volume from name or content
            size_pattern = r'(\d+)\s*(ml|g|oz|gram)'
            size_match = re.search(size_pattern, product['name'], re.IGNORECASE)
            if size_match:
                product['size'] = f"{size_match.group(1)} {size_match.group(2).lower()}"

            # Look for price
            price_selectors = ['.price', '.product-price', '[class*="price"]']
            for selector in price_selectors:
                price_elem = soup.select_one(selector)
                if price_elem:
                    price_text = self.clean_text(price_elem.get_text())
                    if '₺' in price_text or 'TL' in price_text:
                        product['price'] = price_text
                        break

            # Extract features from lists or bullet points
            feature_lists = soup.find_all(['ul', 'ol'])
            for ul in feature_lists:
                items = ul.find_all('li')
                if items:
                    features = [self.clean_text(li.get_text()) for li in items if self.clean_text(li.get_text())]
                    if features:
                        product['features'].extend(features)

            # Download images
            downloaded_images = []
            for img_url in product['images'][:3]:  # Download first 3 images
                downloaded_path = self.download_image(img_url, product['name'])
                if downloaded_path:
                    downloaded_images.append(downloaded_path)

            product['downloaded_images'] = downloaded_images

            return product

        except Exception as e:
            print(f"Error scraping {product_url}: {e}")
            return None

    def run(self):
        """Main scraping process"""
        print("🚀 Starting Theraderm Product Scraping...")

        # Get all product URLs
        product_urls = self.get_all_product_urls()

        if not product_urls:
            print("❌ No product URLs found!")
            return

        print(f"📦 Found {len(product_urls)} products to scrape")

        # Scrape each product
        for i, url in enumerate(product_urls, 1):
            print(f"\n[{i}/{len(product_urls)}] Processing product...")

            product_data = self.scrape_product_details(url)
            if product_data:
                self.products.append(product_data)
                print(f"✓ Successfully scraped: {product_data['name']}")
            else:
                print(f"❌ Failed to scrape: {url}")

            # Be respectful to the server
            time.sleep(1)

        # Save all data
        self.save_data()

        print(f"\n🎉 Scraping completed!")
        print(f"📊 Successfully scraped {len(self.products)} products")
        print(f"💾 Data saved to theraderm_data/theraderm_products.json")

        return self.products

    def save_data(self):
        """Save scraped data to JSON file"""
        output_file = 'theraderm_data/theraderm_products.json'

        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(self.products, f, ensure_ascii=False, indent=2)

        print(f"💾 Saved {len(self.products)} products to {output_file}")

        # Also save a summary
        summary = {
            'total_products': len(self.products),
            'products_with_images': sum(1 for p in self.products if p.get('downloaded_images')),
            'products_with_descriptions': sum(1 for p in self.products if p.get('description')),
            'products_with_ingredients': sum(1 for p in self.products if p.get('ingredients')),
            'product_names': [p['name'] for p in self.products if p.get('name')]
        }

        with open('theraderm_data/theraderm_summary.json', 'w', encoding='utf-8') as f:
            json.dump(summary, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    scraper = TheradermpScraper()
    products = scraper.run()