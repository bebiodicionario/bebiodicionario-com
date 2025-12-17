import os
import re

DOCS_DIR = os.path.join(os.path.dirname(__file__), '../docs/arquivo')

TAG_MAP = {
    'Tirinha': 'Quadrinhos',
    'Tirinhas': 'Quadrinhos',
    'Comics': 'Quadrinhos',
    'Quadrinho': 'Quadrinhos',
    'Vinho Natural': 'Vinho Natural',
    'Vinhos Naturais': 'Vinho Natural',
    'Natural Wine': 'Vinho Natural',
    'Vinho Branco': 'Branco',
    'White Wine': 'Branco',
    'Vinho Tinto': 'Tinto',
    'Red Wine': 'Tinto',
    'Mapa': 'Mapas',
    'Map': 'Mapas',
    'Vídeo': 'Vídeos',
    'Video': 'Vídeos',
    'Videos': 'Vídeos',
    'Ilustração': 'Ilustração',
    'Illustration': 'Ilustração',
    'Vinho Fodas': 'Vinho Fodas',
    'ART-ficial': 'ART-ficial',
    'Art-ficial': 'ART-ficial',
    'AI': 'ART-ficial',
    'Sergião': 'Personagens',
    'Panguão': 'Personagens',
    'Winesplaining': 'Personagens',
    'Biodinâmica': 'Biodinâmica',
    'Biodynamic': 'Biodinâmica',
    'Borgonha': 'Borgonha',
    'Burgundy': 'Borgonha',
    'Riesling': 'Riesling',
    'Pinot Noir': 'Pinot Noir',
    'Champagne': 'Champagne',
    'Espumante': 'Espumante',
    'Sparkling': 'Espumante',
    'Rosé': 'Rosé',
    'Rose': 'Rosé',
    'Jerez': 'Jerez',
    'Sherry': 'Jerez',
    'Jura': 'Jura',
    'Sommelier': 'Sommelier',
    'Somm': 'Sommelier',
    'Influenciadores': 'Influenciadores',
    'Influencer': 'Influenciadores',
    'Crítica': 'Crítica',
    'Review': 'Crítica',
    'Restaurante': 'Restaurantes',
    'Restaurantes': 'Restaurantes',
    'Cliente': 'Cliente',
    'Clientes': 'Cliente',
    'Design': 'Design',
    'Rótulo': 'Design',
    'Label': 'Design',
    'História': 'História',
    'History': 'História',
    'Enologia': 'Enologia',
    'Viticultura': 'Viticultura',
    'Preço': 'Mercado',
    'Mercado': 'Mercado',
    'Marketing': 'Marketing',
    'Política': 'Política',
    'Gastronomia': 'Gastronomia',
    'Comida': 'Gastronomia',
    'Harmonização': 'Harmonização',
    'Pairing': 'Harmonização',
    'Glossário': 'Vocabulário',
    'Vocabulário': 'Vocabulário',
    'Termos': 'Vocabulário',
    'Defeitos': 'Defeitos',
    'Faults': 'Defeitos',
}

BLOCK_TAGS = [
    'Instagram', 'Texto', 'Humor', 'Uva', 'Uvas', 'Vinho', 'Brasil', 'França', 'Itália', 'Espanha', 'Portugal', 'Alemanha', 'EUA', 'Chile', 'Argentina',
    '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025',
    'Data', 'Sem Categoria', 'Post', 'Posts', 'Sátira', 'Paródia', 'Meme', 'Foto', 'Imagem'
]

SMART_TAGS = [
    {'keywords': ['Sergião', 'Panguão', 'Winesplaining'], 'tag': 'Personagens'},
    {'keywords': ['Pinot Noir', 'Borgonha', 'Côte d\'Or', 'Romanee'], 'tag': 'Pinot Noir'},
    {'keywords': ['Riesling', 'Mosel', 'Alsácia', 'Alsace'], 'tag': 'Riesling'},
    {'keywords': ['Chardonnay', 'Chablis'], 'tag': 'Chardonnay'},
    {'keywords': ['Cabernet', 'Bordeaux'], 'tag': 'Bordeaux'},
    {'keywords': ['Natural', 'Natureba', 'Intervenção', 'Laranja', 'Orange Wine'], 'tag': 'Vinho Natural'},
    {'keywords': ['Champagne', 'Espumante', 'Cava', 'Prosecco', 'Pet Nat', 'Pét-Nat'], 'tag': 'Espumante'},
    {'keywords': ['Jerez', 'Sherry', 'Palo Cortado', 'Fino', 'Manzanilla'], 'tag': 'Jerez'},
    {'keywords': ['Jura', 'Vin Jaune', 'Savagnin'], 'tag': 'Jura'},
    {'keywords': ['Rosé', 'Rose'], 'tag': 'Rosé'},
    {'keywords': ['Gamay', 'Beaujolais'], 'tag': 'Beaujolais'},
    {'keywords': ['Nebbiolo', 'Barolo', 'Barbaresco', 'Piemonte'], 'tag': 'Nebbiolo'},
    {'keywords': ['Sangiovese', 'Chianti', 'Toscana'], 'tag': 'Sangiovese'},
    {'keywords': ['Syrah', 'Shiraz', 'Rhône'], 'tag': 'Syrah'},
    {'keywords': ['Chenin Blanc', 'Loire', 'Vouvray'], 'tag': 'Chenin Blanc'},
    {'keywords': ['Cliente', 'Restaurante', 'Serviço'], 'tag': 'Cliente'},
]

def get_all_files(dir_path):
    files_list = []
    for root, dirs, files in os.walk(dir_path):
        for file in files:
            if file.endswith('.md'):
                files_list.append(os.path.join(root, file))
    return files_list

def refactor_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Regex to find tags block
    tag_regex = r"^tags:\s*\n((?:^\s+-\s+.*\n?)*)"
    match = re.search(tag_regex, content, re.MULTILINE)

    current_tags = []
    if match:
        raw_tags = match.group(1).split('\n')
        for t in raw_tags:
            t = t.strip()
            if t.startswith('-'):
                t = t.lstrip('-').strip()
            if t:
                current_tags.append(t)
    
    new_tags = set()

    # 1. Map existing
    for tag in current_tags:
        if tag in TAG_MAP:
            new_tags.add(TAG_MAP[tag])
        else:
            # Check blocked
            is_blocked = False
            if tag in BLOCK_TAGS:
                is_blocked = True
            else:
                for bt in BLOCK_TAGS:
                    if bt in tag and len(bt) > 4: # loose check
                        is_blocked = True
                        break
            
            if not is_blocked:
                # Only keep if it is a "good" tag (value in TAG_MAP) or looks valid
                if tag in TAG_MAP.values():
                    new_tags.add(tag)
                # Else drop to reduce cardinality as requested
    
    # 2. Smart Tagging
    text_context = content.lower()
    for item in SMART_TAGS:
        for keyword in item['keywords']:
            if keyword.lower() in text_context:
                new_tags.add(item['tag'])
                break # Add tag once per group
        
    # 3. Visuals check
    if re.search(r'!\[.*\]\(.*\.mp4\)', content) or re.search(r'<iframe.*youtube|vimeo', content):
        new_tags.add('Vídeos')

    # Convert to list and limit
    final_tags = sorted(list(new_tags))
    
    if len(final_tags) > 7:
        final_tags = final_tags[:7]
    
    if not final_tags:
        final_tags.append('Sem Categoria')

    # Reconstruct block
    new_tags_block = "tags:\n" + "\n".join([f"  - {t}" for t in final_tags]) + "\n"
    
    if match:
        new_content = content.replace(match.group(0), new_tags_block)
        if new_content != content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated {os.path.basename(file_path)}")

files = get_all_files(DOCS_DIR)
for f in files:
    refactor_file(f)
