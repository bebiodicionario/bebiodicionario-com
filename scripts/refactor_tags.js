const fs = require('fs');
const path = require('path');

const DOCS_DIR = path.join(__dirname, '../docs/arquivo');

const TAG_MAP = {
    // Mapping logic: 'Old Tag': 'New Tag'
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
};

const BLOCK_TAGS = [
    'Instagram', 'Texto', 'Humor', 'Uva', 'Uvas', 'Vinho', 'Brasil', 'França', 'Itália', 'Espanha', 'Portugal', 'Alemanha', 'EUA', 'Chile', 'Argentina',
    '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025',
    'Data', 'Sem Categoria', 'Post', 'Posts', 'Sátira', 'Paródia', 'Meme', 'Foto', 'Imagem'
];

const SMART_TAGS = [
    { keywords: ['Sergião', 'Panguão', 'Winesplaining'], tag: 'Personagens' },
    { keywords: ['Pinot Noir', 'Borgonha', 'Côte d\'Or', 'Romanee'], tag: 'Pinot Noir' }, // Borgonha implies Pinot often, but maybe separate? Let's link specific grapes.
    { keywords: ['Riesling', 'Mosel', 'Alsácia', 'Alsace'], tag: 'Riesling' },
    { keywords: ['Chardonnay', 'Chablis'], tag: 'Chardonnay' },
    { keywords: ['Cabernet', 'Bordeaux'], tag: 'Bordeaux' },
    { keywords: ['Natural', 'Natureba', 'Intervenção', 'Laranja', 'Orange Wine'], tag: 'Vinho Natural' },
    { keywords: ['Champagne', 'Espumante', 'Cava', 'Prosecco', 'Pet Nat', 'Pét-Nat'], tag: 'Espumante' },
    { keywords: ['Jerez', 'Sherry', 'Palo Cortado', 'Fino', 'Manzanilla'], tag: 'Jerez' },
    { keywords: ['Jura', 'Vin Jaune', 'Savagnin'], tag: 'Jura' },
    { keywords: ['Rosé', 'Rose'], tag: 'Rosé' },
    { keywords: ['Gamay', 'Beaujolais'], tag: 'Beaujolais' },
    { keywords: ['Nebbiolo', 'Barolo', 'Barbaresco', 'Piemonte'], tag: 'Nebbiolo' },
    { keywords: ['Sangiovese', 'Chianti', 'Toscana'], tag: 'Sangiovese' },
    { keywords: ['Syrah', 'Shiraz', 'Rhône'], tag: 'Syrah' },
    { keywords: ['Chenin Blanc', 'Loire', 'Vouvray'], tag: 'Chenin Blanc' },
    { keywords: ['Cliente', 'Restaurante', 'Serviço'], tag: 'Cliente' }, // Group restaurant service under Cliente usually
];

function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];
    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            if (file.endsWith('.md')) {
                arrayOfFiles.push(path.join(dirPath, "/", file));
            }
        }
    });
    return arrayOfFiles;
}

function refactorFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let hasChanges = false;

    // Extract existing tags
    const tagRegex = /^tags:\s*\n((?:\s+-\s+.*\n?)*)/m;
    const match = content.match(tagRegex);

    let currentTags = [];
    if (match) {
        currentTags = match[1].split('\n')
            .map(t => t.trim().replace(/^-\s+/, '').trim())
            .filter(t => t);
    }

    let newTags = new Set();

    // 1. Map existing tags
    currentTags.forEach(tag => {
        // Check exact map
        if (TAG_MAP[tag]) {
            newTags.add(TAG_MAP[tag]);
        } else if (!BLOCK_TAGS.includes(tag) && !BLOCK_TAGS.some(bt => tag.includes(bt) && bt.length > 4)) {
            // Keep tag if not blocked (naive block check)
            // Also check if tag is in values of TAG_MAP (already correct)
            if (Object.values(TAG_MAP).includes(tag)) {
                newTags.add(tag);
            } else {
                // Maybe keep? Strict reduction requested.
                // Let's drop unknown/unmapped tags effectively to reduce noise, 
                // OR try to keep if it looks specific.
                // User said "Todos os tags devem referenciar no minimo dois posts".
                // Safe Bet: Keep only if specifically mapped or very common?
                // Let's keep distinct ones for now, verify later.
                // For aggressive reduction: Drop everything not in allowlist?
                // Let's keep it but normalize case.
                // newTags.add(tag); // Commented out to be aggressive as requested ("reduzir para 5 a 7 tags importantes")
            }
        }
    });

    // 2. Smart Tagging based on content context
    const textContext = content.toLowerCase();
    SMART_TAGS.forEach(item => {
        // If any keyword matches
        if (item.keywords.some(k => textContext.includes(k.toLowerCase()))) {
            newTags.add(item.tag);
        }
    });

    // 3. Ensure "Vinho Fodas" is tagged for specific IDs if needed (or rely on keywords)

    // 4. Force specific structural tags if detected in frontmatter (visuals)
    if (content.match(/!\[.*\]\(.*\.mp4\)/) || content.match(/<iframe.*youtube|vimeo/)) newTags.add('Vídeos');

    // Convert to Array and Limit to ~5-7
    // Priority: Mapped tags first, then Smart tags.
    let finalTags = Array.from(newTags);

    // Naive sort?
    finalTags.sort();

    if (finalTags.length > 7) {
        finalTags = finalTags.slice(0, 7);
    }

    // Ensure unique
    finalTags = [...new Set(finalTags)];

    if (finalTags.length === 0) {
        // Default tag?
        finalTags.push('Sem Categoria');
    }

    // Formatting output
    const newTagsBlock = "tags:\n" + finalTags.map(t => `  - ${t}`).join('\n') + "\n";

    // Replace
    if (match) {
        const newContent = content.replace(tagRegex, newTagsBlock);
        if (newContent !== content) {
            fs.writeFileSync(filePath, newContent, 'utf8');
            console.log(`Updated ${path.basename(filePath)}: [${finalTags.join(', ')}]`);
        }
    } else {
        // No tags found, maybe add?
        // Not messing with files without tags section for now to be safe.
    }
}

const files = getAllFiles(DOCS_DIR);
files.forEach(refactorFile);
