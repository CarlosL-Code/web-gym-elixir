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

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('.jpg') || content.includes('.jpeg') || content.includes('background-site.png') || content.includes('.png')) {
    const original = content;
    content = content.replace(/\.jpg/g, '.webp');
    content = content.replace(/\.jpeg/g, '.webp');
    content = content.replace(/background-site\.png/g, 'background-site.webp');
    // For logo we don't replace .png because we didn't convert logo.png, wait, I only converted background-site.png
    if (content !== original) {
      fs.writeFileSync(file, content, 'utf8');
      console.log('Updated', file);
    }
  }
});
