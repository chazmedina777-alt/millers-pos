import os
import re
import urllib.request
from bs4 import BeautifulSoup
import difflib

OUTPUT_DIR = 'public'
MENU_FILE = 'src/data/menu.js'

print("Parsing menu.html...")
html = open('menu.html', encoding='utf-8').read()
soup = BeautifulSoup(html, 'html.parser')

images = []
for img in soup.find_all('img'):
    src = img.get('src', '')
    alt = img.get('alt', '').strip()
    if 'logo' not in src.lower() and alt and src.startswith('http'):
        alt_clean = alt.replace('®', '').strip().lower()
        images.append((alt_clean, src))

# Make unique based on alt
unique_images = {}
for alt, src in images:
    if alt not in unique_images:
        unique_images[alt] = src

# Download the images
downloaded_images = {}
for i, (alt, src) in enumerate(unique_images.items()):
    ext = src.split('.')[-1]
    if len(ext) > 4 or '?' in ext: ext = 'jpg'
    filename = f"real_img_{i}.{ext}"
    filepath = os.path.join(OUTPUT_DIR, filename)
    try:
        req = urllib.request.Request(src, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36'})
        with urllib.request.urlopen(req) as response, open(filepath, 'wb') as out_file:
            out_file.write(response.read())
        downloaded_images[alt] = filename
        print(f"Downloaded: {alt} -> {filename}")
    except Exception as e:
        print(f"Failed to download {alt}: {e}")

# Cleanup old item_*.png mockups
print("Cleaning up old mockups...")
count_deleted = 0
for f in os.listdir(OUTPUT_DIR):
    if f.startswith('item_') and f.endswith('.png'):
        os.remove(os.path.join(OUTPUT_DIR, f))
        count_deleted += 1
print(f"Deleted {count_deleted} mockups.")

# Dictionary of AI generated images we can use as fallbacks
fallback_images = {
    'classic cheeseburger': 'burger_img_1779983070354.png',
    'bacon cheeseburger': 'burger_img_1779983070354.png',
    'kid burger': 'kid_burger_img_1779983412593.png',
    'steak': 'steak_img_1779983135075.png',
    'ribeye': 'steak_img_1779983135075.png',
    'sirloin': 'steak_img_1779983135075.png',
    'traditional wings': 'wings_img_1779983088830.png',
    'mozzarella sticks': 'mozz_sticks_img_1779983326474.png',
    'buffalo chicken dip': 'buffalo_dip_img_1779983355225.png',
    'english pub fish': 'fish_chips_img_1779983368666.png',
    'margarita': 'margarita_img_1779983440984.png',
    'corona': 'corona_img_1779983426883.png',
    'wine': 'wine_img_1779983462417.png',
    'ribs': 'ribs_img_1779983387702.png',
    'shrimp': 'shrimp_img_1779983311922.png',
    'spinach & artichoke dip': 'spinach_dip_img_1779983339779.png',
}

# Read menu.js
with open(MENU_FILE, 'r', encoding='utf-8') as f:
    content = f.read()

lines = content.split('\n')
for i, line in enumerate(lines):
    if '{ id:' in line and 'name:' in line and 'categoryId:' in line:
        name_match = re.search(r"name:\s*(['\"])(.*?)\1", line)
        if name_match:
            item_name = name_match.group(2).replace('®', '').strip().lower()
            
            # Fuzzy match
            best_match = None
            best_ratio = 0
            for alt, filename in downloaded_images.items():
                # Direct substring match gets a boost
                if item_name in alt or alt in item_name:
                    ratio = 0.8
                else:
                    ratio = difflib.SequenceMatcher(None, item_name, alt).ratio()
                
                if ratio > best_ratio:
                    best_ratio = ratio
                    best_match = filename
            
            # If we found a good match
            if best_ratio > 0.45:
                line = re.sub(r"image:\s*(['\"])[^'\"]+\1", f"image: '{best_match}'", line)
                print(f"Mapped '{item_name}' to {best_match} (Score: {best_ratio:.2f})")
            else:
                # Check fallbacks
                fallback_used = None
                for k, v in fallback_images.items():
                    if k in item_name:
                        fallback_used = v
                        break
                
                if fallback_used:
                    line = re.sub(r"image:\s*(['\"])[^'\"]+\1", f"image: '{fallback_used}'", line)
                    print(f"Fallback '{item_name}' to {fallback_used}")
                else:
                    # Blank image
                    line = re.sub(r"image:\s*(['\"])[^'\"]+\1", "image: ''", line)
                    print(f"Blanked '{item_name}'")
            
            lines[i] = line

with open(MENU_FILE, 'w', encoding='utf-8') as f:
    f.write('\n'.join(lines))

print("Menu fully updated!")
