const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.ts') || file.endsWith('.html')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk(path.join(__dirname, 'src'));
const imageRegex = /['"](\/[a-zA-Z0-9_\-\/]+\.(webp|jpg|jpeg|png)|assets\/[a-zA-Z0-9_\-\/]+\.(webp|jpg|jpeg|png))['"]/g;

let missing = [];
let found = 0;

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  let match;
  while ((match = imageRegex.exec(content)) !== null) {
    const relativeImg = match[1].startsWith('/') ? match[1].slice(1) : match[1];
    const fullPath = path.join(__dirname, 'public', relativeImg);
    if (!fs.existsSync(fullPath)) {
      missing.push({ file: path.relative(__dirname, file), image: match[1], fullPath });
    } else {
      found++;
    }
  }
});

console.log(`Verified ${found} images successfully!`);
if (missing.length > 0) {
  console.log('Missing images:', missing);
} else {
  console.log('Zero missing images!');
}
