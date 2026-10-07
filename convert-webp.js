const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const directories = [
  path.join(__dirname, 'public/assets/images'),
  path.join(__dirname, 'public/assets/post')
];

async function convertToWebp() {
  for (const dir of directories) {
    if (!fs.existsSync(dir)) continue;

    const files = fs.readdirSync(dir);
    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        const filePath = path.join(dir, file);
        const webpPath = path.join(dir, path.basename(file, ext) + '.webp');

        if (!fs.existsSync(webpPath)) {
          console.log(`Converting ${file} to webp...`);
          await sharp(filePath)
            .webp({ quality: 80 })
            .toFile(webpPath);
          console.log(`Created ${webpPath}`);
          // Remove old file to save space? Let's leave them for now, 
          // or wait, let's replace them in codebase so we can delete old ones.
        }
      }
    }
  }
}

convertToWebp().then(() => console.log('Done!')).catch(console.error);
