const fs = require('fs');
const path = require('path');

const DOCS_DIR = path.join(__dirname, '../docs/arquivo');
const OUTPUT_FILE = path.join(__dirname, '../static/posts-metadata.json');

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
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

function parsePost(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Parse Frontmatter
  const idMatch = content.match(/^id:\s*(.*)$/m);
  const titleMatch = content.match(/^title:\s*["']?(.*?)["']?$/m);
  
  if (!idMatch) return null; // Skip if no ID

  const id = idMatch[1].trim();
  const title = titleMatch ? titleMatch[1].trim() : '';

  // Extract Number from ID (e.g. BOD123 -> 123)
  const numberMatch = id.match(/BOD(\d+)/);
  if (!numberMatch) return null; 
  const number = parseInt(numberMatch[1], 10);

  // Filter 1-73
  if (number <= 73) return null;

  // Extract Image
  // Match first image markdown: ![alt](url)
  const imageMatch = content.match(/!\[.*?\]\((.*?)\)/);
  const image = imageMatch ? imageMatch[1].trim() : null;

  // Extract Legend
  // Match content between ## Legenda and the next ## Header or end of file
  const legendMatch = content.match(/## Legenda([\s\S]*?)(##|\n$)/);
  let legend = legendMatch ? legendMatch[1].trim() : null;

  // Clean up legend (remove excessive newlines)
  if (legend) {
    legend = legend.replace(/^\s+|\s+$/g, '');
  }

  // Construct Path for linking
  // Rel path from docs/arquivo -> construct url
  // Assuming standard docusaurus path generation: /docs/arquivo/subdir/filename(without .md)
  // Or simply using the id if docusaurus config allows, but let's map file path.
  // path.relative returns e.g. "2018/BOD082.md"
  const relPath = path.relative(DOCS_DIR, filePath);
  const slug = relPath.replace(/\.md$/, ''); // "2018/BOD082"
  const url = `/docs/arquivo/${slug}`;

  return {
    id,
    number,
    title,
    image,
    legend,
    url
  };
}

const files = getAllFiles(DOCS_DIR);
const posts = [];

files.forEach(file => {
  const post = parsePost(file);
  if (post && post.image && post.legend) {
    posts.push(post);
  }
});

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(posts, null, 2));
console.log(`Generated metadata for ${posts.length} posts.`);
