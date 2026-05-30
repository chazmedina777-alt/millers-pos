import re
import os
from PIL import Image, ImageDraw, ImageFont

MENU_FILE = 'src/data/menu.js'
OUTPUT_DIR = 'public'

if not os.path.exists(OUTPUT_DIR):
    os.makedirs(OUTPUT_DIR)

with open(MENU_FILE, 'r', encoding='utf-8') as f:
    content = f.read()

def generate_image(name, category, output_path):
    size = (600, 600)
    
    if category == 'burgers':
        c1, c2 = (139, 0, 0), (255, 69, 0)
        icon = "🍔"
    elif category == 'starters' or category == 'zingers':
        c1, c2 = (205, 133, 63), (244, 164, 96)
        icon = "🍗"
    elif category == 'seafood':
        c1, c2 = (0, 105, 148), (0, 191, 255)
        icon = "🦞"
    elif category == 'salads':
        c1, c2 = (34, 139, 34), (50, 205, 50)
        icon = "🥗"
    elif category == 'house':
        c1, c2 = (139, 69, 19), (160, 82, 45)
        icon = "🍽️"
    elif category == 'desserts':
        c1, c2 = (210, 105, 30), (244, 164, 96)
        icon = "🍰"
    elif category == 'kids':
        c1, c2 = (255, 140, 0), (255, 215, 0)
        icon = "🎈"
    elif category == 'alcoholic':
        c1, c2 = (218, 165, 32), (255, 215, 0)
        icon = "🍻"
    elif category == 'non_alcoholic':
        c1, c2 = (70, 130, 180), (135, 206, 235)
        icon = "🥤"
    else:
        c1, c2 = (105, 105, 105), (169, 169, 169)
        icon = "🍴"

    img = Image.new('RGB', size)
    pixels = img.load()
    w, h = size
    for y in range(h):
        for x in range(w):
            t = (x / w * 0.5 + y / h * 0.5)
            r = int(c1[0] + (c2[0] - c1[0]) * t)
            g = int(c1[1] + (c2[1] - c1[1]) * t)
            b = int(c1[2] + (c2[2] - c1[2]) * t)
            pixels[x, y] = (r, g, b)
            
    draw = ImageDraw.Draw(img)
    
    try:
        icon_font = ImageFont.truetype("C:/Windows/Fonts/seguiemj.ttf", 200)
        # Using simple position for icon
        draw.text((200, 150), icon, font=icon_font, fill=(255, 255, 255))
    except Exception as e:
        print("Font error:", e)
        
    try:
        font = ImageFont.truetype("C:/Windows/Fonts/segoeui.ttf", 40)
    except:
        font = ImageFont.load_default()
        
    words = name.split()
    lines = []
    current_line = []
    for word in words:
        current_line.append(word)
        if len(' '.join(current_line)) > 15:
            if len(current_line) > 1:
                lines.append(' '.join(current_line[:-1]))
                current_line = [word]
            else:
                lines.append(word)
                current_line = []
    if current_line:
        lines.append(' '.join(current_line))
    
    y_text = 420
    for line in lines:
        try:
            bbox = draw.textbbox((0, 0), line, font=font)
            line_w = bbox[2] - bbox[0]
        except:
            line_w = len(line) * 20
        draw.text(((w - line_w) // 2, y_text), line, font=font, fill=(255, 255, 255), stroke_width=3, stroke_fill=(0,0,0))
        y_text += 50
        
    img.save(output_path)

lines = content.split('\n')
count = 0
for i, line in enumerate(lines):
    if '{ id:' in line and 'name:' in line and 'categoryId:' in line:
        id_match = re.search(r"id:\s*'([^']+)'", line)
        name_match = re.search(r"name:\s*(['\"])(.*?)\1", line)
        cat_match = re.search(r"categoryId:\s*'([^']+)'", line)
        
        if id_match and name_match:
            item_id = id_match.group(1)
            item_name = name_match.group(2)
            cat_id = cat_match.group(1) if cat_match else 'default'
            
            image_name = f"item_{item_id}.png"
            output_path = os.path.join(OUTPUT_DIR, image_name)
            
            generate_image(item_name, cat_id, output_path)
            count += 1
            
            if "image:" in line:
                line = re.sub(r"image:\s*(['\"])[^'\"]+\1", f"image: '{image_name}'", line)
            else:
                line = re.sub(r"(name:\s*(['\"])(.*?)\2,)", r"\1 image: '" + image_name + "',", line)
            
            lines[i] = line

with open(MENU_FILE, 'w', encoding='utf-8') as f:
    f.write('\n'.join(lines))

print(f"Successfully generated {count} images and updated menu.js!")
