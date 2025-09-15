#!/usr/bin/env python3
"""
Product Duplicate Analysis Script for NK Beauty Database
Analyzes products_data.json for potential duplicates and generates detailed report
"""

import json
import re
from collections import defaultdict, Counter
from difflib import SequenceMatcher
from typing import Dict, List, Tuple, Set
import unicodedata

class ProductDuplicateAnalyzer:
    def __init__(self, json_file_path: str):
        self.json_file_path = json_file_path
        self.products = []
        self.duplicates = defaultdict(list)
        self.recommendations = []

    def load_products(self) -> None:
        """Load products from JSON file"""
        try:
            with open(self.json_file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
                self.products = data.get('products', [])
                print(f"Loaded {len(self.products)} products")
        except Exception as e:
            print(f"Error loading products: {e}")

    def normalize_name(self, name: str) -> str:
        """Normalize product name for comparison"""
        if not name:
            return ""

        # Convert to lowercase and remove accents
        name = unicodedata.normalize('NFD', name.lower())
        name = ''.join(c for c in name if unicodedata.category(c) != 'Mn')

        # Remove special characters and extra spaces
        name = re.sub(r'[^\w\s]', ' ', name)
        name = re.sub(r'\s+', ' ', name)
        name = name.strip()

        return name

    def extract_size_info(self, name: str, size: str) -> Tuple[str, str]:
        """Extract size information from name and size field"""
        # Common size patterns
        size_patterns = [
            r'(\d+)\s*ml',
            r'(\d+)\s*g',
            r'(\d+)\s*kg',
            r'(\d+)\s*oz',
            r'(\d+)\s*pieces?',
            r'(\d+)\s*pcs?',
            r'(\d+)\s*units?'
        ]

        extracted_size = ""
        clean_name = name

        # Check size field first
        if size and size.strip():
            extracted_size = size.strip().lower()

        # Extract from name if not in size field
        for pattern in size_patterns:
            matches = re.findall(pattern, name.lower())
            if matches:
                extracted_size = f"{matches[0]}ml" if 'ml' in pattern else f"{matches[0]}g"
                # Remove size from name for cleaner comparison
                clean_name = re.sub(pattern, '', name, flags=re.IGNORECASE).strip()
                break

        return clean_name, extracted_size

    def calculate_similarity(self, name1: str, name2: str) -> float:
        """Calculate similarity between two normalized names"""
        return SequenceMatcher(None, name1, name2).ratio()

    def group_products_by_brand(self) -> Dict[str, List[dict]]:
        """Group products by brand"""
        brands = defaultdict(list)
        for product in self.products:
            brand = product.get('brand', '').strip()
            if brand:
                brands[brand].append(product)
        return brands

    def find_exact_duplicates(self, products: List[dict]) -> List[Tuple[dict, dict, str]]:
        """Find products with exact name matches"""
        duplicates = []
        normalized_names = {}

        for product in products:
            name = product.get('name', '').strip()
            normalized = self.normalize_name(name)

            if normalized and normalized in normalized_names:
                original = normalized_names[normalized]
                reason = f"Exact name match (normalized): '{name}' vs '{original['name']}'"
                duplicates.append((original, product, reason))
            else:
                if normalized:
                    normalized_names[normalized] = product

        return duplicates

    def find_similar_duplicates(self, products: List[dict], threshold: float = 0.85) -> List[Tuple[dict, dict, str]]:
        """Find products with similar names"""
        duplicates = []

        for i, product1 in enumerate(products):
            name1 = product1.get('name', '').strip()
            if not name1:
                continue

            clean_name1, size1 = self.extract_size_info(name1, product1.get('size', ''))
            normalized1 = self.normalize_name(clean_name1)

            for j, product2 in enumerate(products[i+1:], i+1):
                name2 = product2.get('name', '').strip()
                if not name2:
                    continue

                clean_name2, size2 = self.extract_size_info(name2, product2.get('size', ''))
                normalized2 = self.normalize_name(clean_name2)

                # Skip if already found as exact duplicate
                if normalized1 == normalized2:
                    continue

                similarity = self.calculate_similarity(normalized1, normalized2)

                if similarity >= threshold:
                    # Check if they have different sizes (legitimate variants)
                    if size1 != size2 and size1 and size2:
                        if similarity >= 0.95:  # Very similar names with different sizes
                            reason = f"Similar names with different sizes - likely variants: '{name1}' ({size1}) vs '{name2}' ({size2}) - Similarity: {similarity:.2f}"
                            duplicates.append((product1, product2, reason))
                    else:
                        reason = f"Similar names: '{name1}' vs '{name2}' - Similarity: {similarity:.2f}"
                        duplicates.append((product1, product2, reason))

        return duplicates

    def find_id_duplicates(self, products: List[dict]) -> List[Tuple[dict, dict, str]]:
        """Find products with same product_id but different names"""
        duplicates = []
        product_ids = {}

        for product in products:
            product_id = product.get('product_id', '').strip()
            if product_id:
                if product_id in product_ids:
                    original = product_ids[product_id]
                    if original.get('name', '') != product.get('name', ''):
                        reason = f"Same product_id with different names: '{original.get('name')}' vs '{product.get('name')}'"
                        duplicates.append((original, product, reason))
                else:
                    product_ids[product_id] = product

        return duplicates

    def analyze_brand_duplicates(self, brand: str, products: List[dict]) -> Dict[str, List]:
        """Analyze duplicates for a specific brand"""
        results = {
            'exact': [],
            'similar': [],
            'id_conflicts': [],
            'recommendations': []
        }

        # Find exact duplicates
        exact_dups = self.find_exact_duplicates(products)
        results['exact'] = exact_dups

        # Find similar duplicates
        similar_dups = self.find_similar_duplicates(products)
        results['similar'] = similar_dups

        # Find ID conflicts
        id_dups = self.find_id_duplicates(products)
        results['id_conflicts'] = id_dups

        # Generate recommendations
        for dup_type, dups in [('exact', exact_dups), ('similar', similar_dups), ('id_conflicts', id_dups)]:
            for prod1, prod2, reason in dups:
                recommendation = self.generate_recommendation(prod1, prod2, reason, dup_type)
                results['recommendations'].append(recommendation)

        return results

    def generate_recommendation(self, prod1: dict, prod2: dict, reason: str, dup_type: str) -> Dict:
        """Generate recommendation for handling duplicate"""
        recommendation = {
            'product1': {
                'id': prod1.get('product_id', ''),
                'name': prod1.get('name', ''),
                'size': prod1.get('size', ''),
                'url': prod1.get('url', '')
            },
            'product2': {
                'id': prod2.get('product_id', ''),
                'name': prod2.get('name', ''),
                'size': prod2.get('size', ''),
                'url': prod2.get('url', '')
            },
            'reason': reason,
            'type': dup_type,
            'action': 'REVIEW_NEEDED'
        }

        # Determine recommended action
        if dup_type == 'exact':
            # Check which one has more complete data
            score1 = self.calculate_completeness_score(prod1)
            score2 = self.calculate_completeness_score(prod2)

            if score1 > score2:
                recommendation['action'] = 'REMOVE_PRODUCT2'
                recommendation['reason_detail'] = f"Product 1 has more complete data (score: {score1} vs {score2})"
            elif score2 > score1:
                recommendation['action'] = 'REMOVE_PRODUCT1'
                recommendation['reason_detail'] = f"Product 2 has more complete data (score: {score2} vs {score1})"
            else:
                recommendation['action'] = 'MERGE_OR_REMOVE'
                recommendation['reason_detail'] = "Both products have similar completeness - manual review needed"

        elif dup_type == 'similar':
            # Check if they're different sizes - if so, keep both
            size1 = prod1.get('size', '').strip()
            size2 = prod2.get('size', '').strip()

            if size1 != size2 and size1 and size2:
                recommendation['action'] = 'KEEP_BOTH'
                recommendation['reason_detail'] = "Different sizes - legitimate product variants"
            else:
                recommendation['action'] = 'REVIEW_NEEDED'
                recommendation['reason_detail'] = "Similar names - manual review required"

        elif dup_type == 'id_conflicts':
            recommendation['action'] = 'FIX_ID_CONFLICT'
            recommendation['reason_detail'] = "Same product_id with different products - needs unique IDs"

        return recommendation

    def calculate_completeness_score(self, product: dict) -> int:
        """Calculate how complete a product's data is"""
        score = 0
        fields_to_check = [
            'name', 'description', 'price', 'brand', 'size',
            'ingredients', 'usage_instructions', 'features', 'benefits',
            'images', 'meta_title', 'meta_description'
        ]

        for field in fields_to_check:
            value = product.get(field, '')
            if value:
                if isinstance(value, list):
                    score += len(value)
                elif isinstance(value, str) and value.strip():
                    score += len(value.split()) // 5 + 1  # Rough word count score
                else:
                    score += 1

        return score

    def generate_report(self) -> str:
        """Generate comprehensive duplicate analysis report"""
        brands = self.group_products_by_brand()

        # Target brands to analyze
        target_brands = ['Genosys', 'Theraderm', 'MeLine']

        report = []
        report.append("PRODUCT DUPLICATE ANALYSIS REPORT")
        report.append("=" * 50)
        report.append("")

        total_current = 0
        total_after = 0
        brand_results = {}

        for brand in target_brands:
            brand_products = brands.get(brand, [])
            current_count = len(brand_products)
            total_current += current_count

            if brand_products:
                analysis = self.analyze_brand_duplicates(brand, brand_products)
                brand_results[brand] = analysis

                report.append(f"{brand.upper()} DUPLICATES ({current_count} products):")
                report.append("-" * 40)

                if not any(analysis[key] for key in ['exact', 'similar', 'id_conflicts']):
                    report.append("No duplicates found.")
                    estimated_after = current_count
                else:
                    # Count potential removals
                    removals = 0
                    for rec in analysis['recommendations']:
                        if rec['action'] in ['REMOVE_PRODUCT1', 'REMOVE_PRODUCT2']:
                            removals += 1
                        elif rec['action'] == 'MERGE_OR_REMOVE':
                            removals += 0.5  # Estimate half will be removed

                    estimated_after = max(current_count - int(removals), 0)

                    # Report exact duplicates
                    if analysis['exact']:
                        report.append("\nEXACT DUPLICATES:")
                        for prod1, prod2, reason in analysis['exact']:
                            report.append(f"  • {prod1.get('name', 'N/A')} vs {prod2.get('name', 'N/A')}")
                            report.append(f"    Reason: {reason}")

                    # Report similar duplicates
                    if analysis['similar']:
                        report.append("\nSIMILAR DUPLICATES:")
                        for prod1, prod2, reason in analysis['similar']:
                            report.append(f"  • {prod1.get('name', 'N/A')} vs {prod2.get('name', 'N/A')}")
                            report.append(f"    Reason: {reason}")

                    # Report ID conflicts
                    if analysis['id_conflicts']:
                        report.append("\nID CONFLICTS:")
                        for prod1, prod2, reason in analysis['id_conflicts']:
                            report.append(f"  • {prod1.get('name', 'N/A')} vs {prod2.get('name', 'N/A')}")
                            report.append(f"    Reason: {reason}")

                    # Report recommendations
                    report.append("\nRECOMMENDATIONS:")
                    for rec in analysis['recommendations']:
                        action_map = {
                            'REMOVE_PRODUCT1': '❌ Remove first product',
                            'REMOVE_PRODUCT2': '❌ Remove second product',
                            'MERGE_OR_REMOVE': '🔄 Merge or remove duplicate',
                            'KEEP_BOTH': '✅ Keep both (different variants)',
                            'FIX_ID_CONFLICT': '🔧 Fix ID conflict',
                            'REVIEW_NEEDED': '👁️ Manual review needed'
                        }
                        action_desc = action_map.get(rec['action'], rec['action'])
                        report.append(f"  • {rec['product1']['name']} vs {rec['product2']['name']}")
                        report.append(f"    Action: {action_desc}")
                        if rec.get('reason_detail'):
                            report.append(f"    Detail: {rec['reason_detail']}")

                total_after += estimated_after
                report.append(f"\nEstimated count after cleanup: {estimated_after}")
                report.append("")

        # Summary
        report.append("SUMMARY:")
        report.append("-" * 20)
        for brand in target_brands:
            current = len(brands.get(brand, []))
            # Recalculate estimated after cleanup
            if brand in brand_results:
                removals = sum(1 for rec in brand_results[brand]['recommendations']
                             if rec['action'] in ['REMOVE_PRODUCT1', 'REMOVE_PRODUCT2'])
                partial_removals = sum(0.5 for rec in brand_results[brand]['recommendations']
                                     if rec['action'] == 'MERGE_OR_REMOVE')
                estimated_after = max(current - removals - int(partial_removals), 0)
            else:
                estimated_after = current
            report.append(f"• {brand}: {current} → {estimated_after}")

        report.append(f"\nTotal: {total_current} → ~{total_after}")
        report.append(f"Expected reduction: ~{total_current - total_after} products")

        # Detailed recommendations section
        report.append("\n" + "="*50)
        report.append("DETAILED RECOMMENDATIONS FOR CLEANUP:")
        report.append("="*50)

        for brand in target_brands:
            if brand in brand_results and brand_results[brand]['recommendations']:
                report.append(f"\n{brand.upper()} CLEANUP ACTIONS:")
                report.append("-" * 30)

                for i, rec in enumerate(brand_results[brand]['recommendations'], 1):
                    report.append(f"\n{i}. DUPLICATE PAIR:")
                    report.append(f"   Product A: {rec['product1']['name']} (ID: {rec['product1']['id']})")
                    report.append(f"   Product B: {rec['product2']['name']} (ID: {rec['product2']['id']})")
                    report.append(f"   Issue: {rec['reason']}")
                    report.append(f"   Recommended Action: {rec['action']}")
                    if rec.get('reason_detail'):
                        report.append(f"   Details: {rec['reason_detail']}")

        return "\n".join(report)

    def save_detailed_analysis(self, output_file: str) -> None:
        """Save detailed analysis to JSON for further processing"""
        brands = self.group_products_by_brand()
        target_brands = ['Genosys', 'Theraderm', 'MeLine']

        detailed_analysis = {
            'analysis_timestamp': '2025-09-15',
            'total_products': len(self.products),
            'brands': {}
        }

        for brand in target_brands:
            brand_products = brands.get(brand, [])
            if brand_products:
                analysis = self.analyze_brand_duplicates(brand, brand_products)
                detailed_analysis['brands'][brand] = {
                    'current_count': len(brand_products),
                    'duplicates_found': len(analysis['exact']) + len(analysis['similar']) + len(analysis['id_conflicts']),
                    'recommendations': analysis['recommendations']
                }

        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(detailed_analysis, f, indent=2, ensure_ascii=False)

def main():
    """Main function to run the duplicate analysis"""
    json_file = "/Volumes/SSD/Projects/NKGuzellik/nk-guzellik/src/data/products_data.json"

    print("Starting Product Duplicate Analysis...")
    analyzer = ProductDuplicateAnalyzer(json_file)

    # Load products
    analyzer.load_products()

    if not analyzer.products:
        print("No products loaded. Exiting.")
        return

    # Generate report
    print("Analyzing duplicates...")
    report = analyzer.generate_report()

    # Save report
    report_file = "/Volumes/SSD/Projects/NKGuzellik/nk-guzellik/duplicate_analysis_report.txt"
    with open(report_file, 'w', encoding='utf-8') as f:
        f.write(report)

    # Save detailed analysis
    analysis_file = "/Volumes/SSD/Projects/NKGuzellik/nk-guzellik/duplicate_analysis_detailed.json"
    analyzer.save_detailed_analysis(analysis_file)

    print(f"\nAnalysis complete!")
    print(f"Report saved to: {report_file}")
    print(f"Detailed analysis saved to: {analysis_file}")
    print("\n" + "="*50)
    print(report)

if __name__ == "__main__":
    main()