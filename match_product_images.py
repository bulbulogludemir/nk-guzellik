#!/usr/bin/env python3
"""
Product Image Matcher for NK Guzellik
=====================================

This script intelligently matches product images to products in JSON data.
It handles Turkish characters, size variations, and common naming differences.

Author: Claude Code Assistant
Date: 2025-09-06
"""

import json
import os
import re
from typing import Dict, List, Tuple, Set
from pathlib import Path
from difflib import SequenceMatcher
import unicodedata

class ProductImageMatcher:
    def __init__(self, json_path: str, images_dir: str):
        self.json_path = json_path
        self.images_dir = images_dir
        self.products = []
        self.image_files = []
        self.matches = {}
        self.unmatched_products = []
        self.unmatched_images = []
        
        # Turkish character mapping for normalization
        self.turkish_chars = {
            'ç': 'c', 'Ç': 'C',
            'ğ': 'g', 'Ğ': 'G', 
            'ı': 'i', 'I': 'I',
            'İ': 'I', 'i': 'i',
            'ö': 'o', 'Ö': 'O',
            'ş': 's', 'Ş': 'S',
            'ü': 'u', 'Ü': 'U'
        }
        
        # Common size/unit patterns to normalize
        self.size_patterns = [
            r'-(\d+)-?(ml|gr|g|mg|l)(?=-|$)',
            r'-(\d+)-?(ml|gr|g|mg|l)$',
            r'(\d+)-?(ml|gr|g|mg|l)-?',
        ]
        
    def normalize_text(self, text: str) -> str:
        """Normalize text for comparison by handling Turkish characters and common variations."""
        if not text:
            return ""
            
        # Convert to lowercase
        text = text.lower()
        
        # Replace Turkish characters
        for tr_char, en_char in self.turkish_chars.items():
            text = text.replace(tr_char, en_char)
        
        # Remove Unicode diacritics
        text = unicodedata.normalize('NFD', text)
        text = ''.join(c for c in text if unicodedata.category(c) != 'Mn')
        
        # Normalize spaces and dashes
        text = re.sub(r'[-_\s]+', '-', text)
        
        # Remove trailing dashes
        text = text.strip('-')
        
        return text
    
    def extract_base_name(self, text: str) -> str:
        """Extract base name by removing size information and common suffixes."""
        normalized = self.normalize_text(text)
        
        # Remove size patterns
        for pattern in self.size_patterns:
            normalized = re.sub(pattern, '', normalized, flags=re.IGNORECASE)
        
        # Clean up multiple dashes
        normalized = re.sub(r'-+', '-', normalized)
        normalized = normalized.strip('-')
        
        return normalized
    
    def load_data(self):
        """Load product data and image files."""
        print("Loading product data and image files...")
        
        # Load JSON data
        with open(self.json_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
            self.products = data.get('products', [])
        
        print(f"Loaded {len(self.products)} products from JSON")
        
        # Load image files
        image_extensions = {'.jpg', '.jpeg', '.png', '.webp'}
        for file in os.listdir(self.images_dir):
            if any(file.lower().endswith(ext) for ext in image_extensions):
                if file.endswith('-main.jpg'):  # Only main images
                    self.image_files.append(file)
        
        print(f"Found {len(self.image_files)} main product images")
    
    def calculate_similarity(self, text1: str, text2: str) -> float:
        """Calculate similarity between two texts."""
        return SequenceMatcher(None, text1, text2).ratio()
    
    def find_direct_matches(self) -> Dict[str, str]:
        """Find exact matches between product IDs and image names."""
        direct_matches = {}
        
        for product in self.products:
            product_id = product.get('product_id', '')
            if not product_id:
                continue
                
            # Try exact match with -main.jpg
            expected_filename = f"{product_id}-main.jpg"
            if expected_filename in self.image_files:
                direct_matches[product_id] = expected_filename
        
        return direct_matches
    
    def find_base_name_matches(self, direct_matches: Dict[str, str]) -> Dict[str, str]:
        """Find matches using base names (removing size info)."""
        base_matches = {}
        used_images = set(direct_matches.values())
        matched_products = set(direct_matches.keys())
        
        # Create image base name lookup
        image_base_names = {}
        for image in self.image_files:
            if image in used_images:
                continue
            base_name = self.extract_base_name(image.replace('-main.jpg', ''))
            if base_name not in image_base_names:
                image_base_names[base_name] = []
            image_base_names[base_name].append(image)
        
        # Match products to images by base name
        for product in self.products:
            product_id = product.get('product_id', '')
            if not product_id or product_id in matched_products:
                continue
                
            product_base = self.extract_base_name(product_id)
            
            # Look for exact base name match
            if product_base in image_base_names:
                # If multiple images have same base name, prefer the one without size
                best_image = min(image_base_names[product_base], 
                               key=lambda x: len(x))
                base_matches[product_id] = best_image
                used_images.add(best_image)
        
        return base_matches
    
    def find_fuzzy_matches(self, direct_matches: Dict[str, str], base_matches: Dict[str, str]) -> Dict[str, str]:
        """Find fuzzy matches using similarity scoring."""
        fuzzy_matches = {}
        used_images = set(direct_matches.values()) | set(base_matches.values())
        matched_products = set(direct_matches.keys()) | set(base_matches.keys())
        
        available_images = [img for img in self.image_files if img not in used_images]
        unmatched_products = [p for p in self.products 
                            if p.get('product_id') and p['product_id'] not in matched_products]
        
        # Calculate similarities
        similarities = []
        for product in unmatched_products:
            product_id = product.get('product_id', '')
            product_base = self.extract_base_name(product_id)
            product_name = self.normalize_text(product.get('name', ''))
            
            for image in available_images:
                image_base = self.extract_base_name(image.replace('-main.jpg', ''))
                
                # Calculate multiple similarity scores
                id_similarity = self.calculate_similarity(product_base, image_base)
                name_similarity = self.calculate_similarity(product_name, image_base) if product_name else 0
                
                # Combined score with weights
                combined_score = (id_similarity * 0.7) + (name_similarity * 0.3)
                
                similarities.append({
                    'product_id': product_id,
                    'image': image,
                    'score': combined_score,
                    'id_sim': id_similarity,
                    'name_sim': name_similarity
                })
        
        # Sort by score and match greedily
        similarities.sort(key=lambda x: x['score'], reverse=True)
        
        used_in_fuzzy = set()
        for item in similarities:
            if (item['score'] > 0.6 and 
                item['product_id'] not in fuzzy_matches and 
                item['image'] not in used_in_fuzzy):
                fuzzy_matches[item['product_id']] = item['image']
                used_in_fuzzy.add(item['image'])
        
        return fuzzy_matches
    
    def run_matching(self):
        """Run the complete matching process."""
        print("\n" + "="*60)
        print("🔍 STARTING INTELLIGENT PRODUCT-IMAGE MATCHING")
        print("="*60)
        
        # Load data
        self.load_data()
        
        # Step 1: Direct matches
        print("\n📍 Step 1: Finding direct matches...")
        direct_matches = self.find_direct_matches()
        print(f"Found {len(direct_matches)} direct matches")
        
        # Step 2: Base name matches
        print("\n📍 Step 2: Finding base name matches...")
        base_matches = self.find_base_name_matches(direct_matches)
        print(f"Found {len(base_matches)} base name matches")
        
        # Step 3: Fuzzy matches
        print("\n📍 Step 3: Finding fuzzy matches...")
        fuzzy_matches = self.find_fuzzy_matches(direct_matches, base_matches)
        print(f"Found {len(fuzzy_matches)} fuzzy matches")
        
        # Combine all matches
        self.matches = {**direct_matches, **base_matches, **fuzzy_matches}
        
        # Find unmatched items
        matched_products = set(self.matches.keys())
        used_images = set(self.matches.values())
        
        self.unmatched_products = [
            p for p in self.products 
            if p.get('product_id') and p['product_id'] not in matched_products
        ]
        
        self.unmatched_images = [
            img for img in self.image_files 
            if img not in used_images
        ]
        
        # Print results
        self.print_results(direct_matches, base_matches, fuzzy_matches)
    
    def print_results(self, direct_matches: Dict[str, str], base_matches: Dict[str, str], fuzzy_matches: Dict[str, str]):
        """Print detailed matching results."""
        print("\n" + "="*60)
        print("📊 MATCHING RESULTS SUMMARY")
        print("="*60)
        
        total_products = len(self.products)
        total_images = len(self.image_files)
        total_matches = len(self.matches)
        
        print(f"📦 Total Products: {total_products}")
        print(f"🖼️  Total Images: {total_images}")
        print(f"✅ Total Matches: {total_matches}")
        print(f"❌ Unmatched Products: {len(self.unmatched_products)}")
        print(f"❌ Unmatched Images: {len(self.unmatched_images)}")
        print(f"📈 Match Rate: {(total_matches/total_products)*100:.1f}%")
        
        # Breakdown by match type
        print(f"\n📋 Match Type Breakdown:")
        print(f"   Direct Matches: {len(direct_matches)}")
        print(f"   Base Name Matches: {len(base_matches)}")
        print(f"   Fuzzy Matches: {len(fuzzy_matches)}")
        
        # Show sample matches for each type
        print(f"\n🎯 SAMPLE MATCHES BY TYPE:")
        
        if direct_matches:
            print(f"\n✨ Direct Matches (first 5):")
            for i, (pid, img) in enumerate(list(direct_matches.items())[:5]):
                print(f"   {i+1}. {pid} → {img}")
        
        if base_matches:
            print(f"\n🔍 Base Name Matches (first 5):")
            for i, (pid, img) in enumerate(list(base_matches.items())[:5]):
                print(f"   {i+1}. {pid} → {img}")
        
        if fuzzy_matches:
            print(f"\n🎲 Fuzzy Matches (first 5):")
            for i, (pid, img) in enumerate(list(fuzzy_matches.items())[:5]):
                print(f"   {i+1}. {pid} → {img}")
        
        # Show unmatched items
        if self.unmatched_products:
            print(f"\n❌ UNMATCHED PRODUCTS (first 10):")
            for i, product in enumerate(self.unmatched_products[:10]):
                name = product.get('name', 'N/A')[:40]
                print(f"   {i+1}. {product['product_id']} - {name}...")
        
        if self.unmatched_images:
            print(f"\n❌ UNMATCHED IMAGES (first 10):")
            for i, img in enumerate(self.unmatched_images[:10]):
                print(f"   {i+1}. {img}")
    
    def update_json_data(self):
        """Update the JSON data with matched image paths."""
        print(f"\n📝 Updating JSON data with image paths...")
        
        updated_count = 0
        base_path = "/public/images/products"
        
        for product in self.products:
            product_id = product.get('product_id')
            if product_id in self.matches:
                image_filename = self.matches[product_id]
                new_image_path = f"{base_path}/{image_filename}"
                
                # Update or add image_paths field
                if 'image_paths' not in product:
                    product['image_paths'] = []
                
                # Check if this path already exists
                if new_image_path not in product['image_paths']:
                    # Insert at the beginning as the main image
                    product['image_paths'].insert(0, new_image_path)
                    updated_count += 1
        
        # Save updated JSON
        output_path = self.json_path.replace('.json', '_updated.json')
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump({'products': self.products}, f, ensure_ascii=False, indent=2)
        
        print(f"✅ Updated {updated_count} products with image paths")
        print(f"💾 Saved updated data to: {output_path}")
        
        return output_path
    
    def generate_report(self) -> str:
        """Generate a detailed matching report."""
        report_lines = []
        report_lines.append("# Product Image Matching Report")
        report_lines.append(f"Generated on: {__import__('datetime').datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        report_lines.append("")
        
        # Summary
        report_lines.append("## Summary")
        report_lines.append(f"- Total Products: {len(self.products)}")
        report_lines.append(f"- Total Images: {len(self.image_files)}")
        report_lines.append(f"- Successfully Matched: {len(self.matches)}")
        report_lines.append(f"- Match Rate: {(len(self.matches)/len(self.products))*100:.1f}%")
        report_lines.append("")
        
        # All matches
        report_lines.append("## All Matches")
        for product_id, image in sorted(self.matches.items()):
            report_lines.append(f"- `{product_id}` → `{image}`")
        report_lines.append("")
        
        # Unmatched products
        if self.unmatched_products:
            report_lines.append("## Unmatched Products")
            for product in self.unmatched_products:
                name = product.get('name', 'N/A')
                report_lines.append(f"- `{product['product_id']}` - {name}")
            report_lines.append("")
        
        # Unmatched images
        if self.unmatched_images:
            report_lines.append("## Unmatched Images")
            for image in self.unmatched_images:
                report_lines.append(f"- `{image}`")
        
        report_content = "\n".join(report_lines)
        
        # Save report
        report_path = os.path.join(os.path.dirname(self.json_path), 'matching_report.md')
        with open(report_path, 'w', encoding='utf-8') as f:
            f.write(report_content)
        
        print(f"📄 Generated detailed report: {report_path}")
        return report_path

def main():
    """Main function to run the matching process."""
    # Configuration
    json_path = "/Volumes/SSD/Projects/NKGuzellik/nk-guzellik/src/data/products_data.json"
    images_dir = "/Volumes/SSD/Projects/NKGuzellik/nk-guzellik/public/images/products"
    
    # Verify paths exist
    if not os.path.exists(json_path):
        print(f"❌ Error: JSON file not found at {json_path}")
        return
    
    if not os.path.exists(images_dir):
        print(f"❌ Error: Images directory not found at {images_dir}")
        return
    
    # Run matching
    matcher = ProductImageMatcher(json_path, images_dir)
    matcher.run_matching()
    
    # Update JSON and generate report
    updated_json_path = matcher.update_json_data()
    report_path = matcher.generate_report()
    
    print("\n" + "="*60)
    print("🎉 MATCHING PROCESS COMPLETED!")
    print("="*60)
    print(f"📊 Results Summary:")
    print(f"   - Total matches: {len(matcher.matches)}")
    print(f"   - Match rate: {(len(matcher.matches)/len(matcher.products))*100:.1f}%")
    print(f"   - Updated JSON: {updated_json_path}")
    print(f"   - Detailed report: {report_path}")
    
    return matcher

if __name__ == "__main__":
    matcher = main()