#!/usr/bin/env python3
"""
Scan local asset directories and prepare INSERT statements for the catalog tables.
Usage: python3 populate_catalogs.py --assets-dir /home/server/cheeky/cheeky_people/public/loot-assets/custom
"""

import os
import json
import argparse
from pathlib import Path


def scan_directory(directory, gender):
    """Scan a directory and return asset info."""
    assets = []
    if not os.path.exists(directory):
        return assets
    
    for root, dirs, files in os.walk(directory):
        category = os.path.basename(root)
        for filename in files:
            if filename.endswith('.vrm'):
                filepath = os.path.join(root, filename)
                slug = Path(filename).stem
                size_bytes = os.path.getsize(filepath)
                
                assets.append({
                    'category': category,
                    'gender': gender,
                    'slug': slug,
                    'filename': filename,
                    'size_bytes': size_bytes,
                    'mime_type': 'model/vrm',
                    'tags': [category, gender, 'avatar', 'quest']
                })
    
    return assets


def generate_insert_statements(assets, table_name):
    """Generate SQL INSERT statements."""
    for asset in assets:
        tags = ','.join(f"'{t}'" for t in asset['tags'])
        print(f"INSERT INTO {table_name} (category, gender, slug, filename, mime_type, size_bytes, tags) VALUES " +
              f"('{asset['category']}', '{asset['gender']}', '{asset['slug']}', '{asset['filename']}', " +
              f"'{asset['mime_type']}', {asset['size_bytes']}, ARRAY[{tags}]);")


def main():
    parser = argparse.ArgumentParser(description='Populate asset catalogs from local files')
    parser.add_argument('--assets-dir', required=True, help='Path to custom assets directory')
    args = parser.parse_args()
    
    assets_dir = args.assets_dir
    
    # Scan male and female assets
    male_dir = os.path.join(assets_dir, 'male')
    female_dir = os.path.join(assets_dir, 'female')
    
    print(f"📦 Scanning assets from: {assets_dir}\n")
    
    male_assets = []
    if os.path.exists(male_dir):
        male_assets = scan_directory(male_dir, 'male')
        print(f"Found {len(male_assets)} male assets")
    
    female_assets = []
    if os.path.exists(female_dir):
        female_assets = scan_directory(female_dir, 'female')
        print(f"Found {len(female_assets)} female assets")
    
    total = len(male_assets) + len(female_assets)
    print(f"\nTotal assets to catalog: {total}\n")
    
    # Generate INSERT statements
    print("-- ========================================")
    print("-- ASSET CATALOG IMPORT SCRIPT")
    print(f"-- Generated: {Path(__file__).stem}")
    print(f"-- Total: {total} assets")
    print("-- ========================================\n")
    
    print("BEGIN;")
    print()
    
    print("-- === ASSET CATALOG ===")
    generate_insert_statements(male_assets + female_assets, 'asset_catalog')
    print()
    
    print("COMMIT;")


if __name__ == '__main__':
    main()
