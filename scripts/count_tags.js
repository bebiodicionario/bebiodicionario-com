const fs = require('fs');
const path = require('path');

const DOCS_DIR = path.join(__dirname, '../docs/arquivo');

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

const files = getAllFiles(DOCS_DIR);
const tagCounts = {};
const fileTags = {};

files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    // Match tags section. Assumes standard yaml format
    // tags:
    //   - Tag1
    //   - Tag2
    const match = content.match(/^tags:\s*\n((?:\s+-\s+.*\n?)*)/m);
    if (match) {
        const rawTags = match[1];
        const tags = rawTags.split('\n')
            .map(line => line.trim().replace(/^-\s+/, '').trim())
            .filter(t => t.length > 0);

        fileTags[file] = tags;
        tags.forEach(t => {
            tagCounts[t] = (tagCounts[t] || 0) + 1;
        });
    }
});

// Sort by count
const sortedTags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]);

console.log(JSON.stringify(sortedTags, null, 2));
console.log(`Total unique tags: ${sortedTags.length}`);
