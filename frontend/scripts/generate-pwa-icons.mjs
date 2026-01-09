import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const projectRoot = path.resolve(process.cwd());
const inputSvg = path.join(projectRoot, 'public', 'vite.svg');
const outputDir = path.join(projectRoot, 'public', 'icons');

await fs.mkdir(outputDir, { recursive: true });

const sizes = [192, 512];
for (const size of sizes) {
  const outPath = path.join(outputDir, `icon-${size}.png`);
  await sharp(inputSvg)
    .resize(size, size, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toFile(outPath);
  console.log(`Generated ${outPath}`);
}
