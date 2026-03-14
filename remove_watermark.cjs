const { Jimp } = require('jimp');
const fs = require('fs');

const images = [
  'image_des soins/Chirurgie Dentaire.jpg',
  'image_des soins/Esthétique Dentaire.jpg',
  'image_des soins/Parodontologie.jpg',
  'image_des soins/Prothèses.jpg',
  'image_des soins/Soins Conservateurs.jpg'
];

const CROP_BOTTOM = 45; // pixels to remove from bottom (Gemini watermark)

(async () => {
  for (const file of images) {
    const buf = fs.readFileSync(file);
    const img = await Jimp.fromBuffer(buf);
    const newHeight = img.bitmap.height - CROP_BOTTOM;
    img.crop({ x: 0, y: 0, w: img.bitmap.width, h: newHeight });
    const output = await img.getBuffer('image/jpeg', { quality: 95 });
    fs.writeFileSync(file, output);
    console.log(`✓ ${file} → ${img.bitmap.width}x${newHeight}`);
  }
})();
