import os

root_dir = r"C:\Users\User\Downloads\ai pip\scout full website"
base_path = "/scout-website"

def fix_html_file(filepath):
    # Calculate depth relative to root
    rel_path = os.path.relpath(filepath, root_dir)
    depth = rel_path.count(os.sep)
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Prefix absolute href and src
    # Use lookbehind for href=" and src=" to be precise
    content = content.replace('href="/', f'href="{base_path}/')
    content = content.replace('src="/', f'src="{base_path}/')
    
    # 2. Fix script imports if in subdirectory
    if depth > 0:
        # If in subfolder, change ./js/ to ../js/
        # This assumes all subfolders are 1 level deep
        content = content.replace("import { initStructure } from './js/structure_manager.js';", 
                                  "import { initStructure } from '../js/structure_manager.js';")
        content = content.replace('import { initStructure } from "./js/structure_manager.js";',
                                  'import { initStructure } from "../js/structure_manager.js";')

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

for root, dirs, files in os.walk(root_dir):
    for name in files:
        if name.endswith(".html"):
            fix_html_file(os.path.join(root, name))

print("Done fixing HTML paths.")
