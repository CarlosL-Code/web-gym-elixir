const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      const ext = path.extname(file).toLowerCase();
      if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        results.push(file);
      }
    }
  });
  return results;
}

async function convertAll() {
  const publicDir = path.join(__dirname, 'public');
  const files = walk(publicDir);

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    const webpPath = file.slice(0, -ext.length) + '.webp';

    if (!fs.existsSync(webpPath)) {
      console.log(`Converting ${path.relative(__dirname, file)} -> ${path.relative(__dirname, webpPath)}`);
      try {
        await sharp(file)
          .webp({ quality: 80 })
          .toFile(webpPath);
      } catch (err) {
        console.error(`Error converting ${file}:`, err);
      }
    }
  }
}

convertAll().then(() => console.log('All public images converted to webp successfully!')).catch(console.error);
