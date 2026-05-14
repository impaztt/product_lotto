/**
 * Render the temporary brand mark (blue square + white "L") as a 1024×1024
 * master PNG that @capacitor/assets can fan out into every iOS / Android
 * icon and splash size.
 *
 * Replace this with a real designer-supplied master before launch — this
 * script only ensures the app does not ship with the default Capacitor
 * Ionic logo.
 */
import sharp from 'sharp';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const root = path.dirname(path.dirname(url.fileURLToPath(import.meta.url)));
const resources = path.join(root, 'resources');
await fs.mkdir(resources, { recursive: true });

// 1024×1024 logo: rounded blue square with a centered "L" letter.
// Mirrors the favicon in index.html so the app/web identity match.
const iconSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
  <rect width="1024" height="1024" rx="240" fill="#3182F6"/>
  <text x="512" y="700" font-family="system-ui, -apple-system, sans-serif"
        font-size="560" font-weight="900" text-anchor="middle" fill="white">L</text>
</svg>`;

// Splash master: same brand mark centered on solid blue, 2732×2732 safe area.
const splashSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2732 2732">
  <rect width="2732" height="2732" fill="#3182F6"/>
  <rect x="1116" y="1116" width="500" height="500" rx="120" fill="#1d4ed8"/>
  <text x="1366" y="1466" font-family="system-ui, -apple-system, sans-serif"
        font-size="320" font-weight="900" text-anchor="middle"
        fill="white" alignment-baseline="middle">L</text>
</svg>`;

await sharp(Buffer.from(iconSvg))
    .resize(1024, 1024)
    .png()
    .toFile(path.join(resources, 'icon.png'));

await sharp(Buffer.from(splashSvg))
    .resize(2732, 2732)
    .png()
    .toFile(path.join(resources, 'splash.png'));

await sharp(Buffer.from(splashSvg.replace('#3182F6', '#0f172a').replace('#1d4ed8', '#1e293b')))
    .resize(2732, 2732)
    .png()
    .toFile(path.join(resources, 'splash-dark.png'));

const written = ['icon.png', 'splash.png', 'splash-dark.png'];
for (const f of written) {
    const s = await fs.stat(path.join(resources, f));
    console.log(`  ${(s.size / 1024).toFixed(1).padStart(8)} KB  resources/${f}`);
}
console.log(`Wrote ${written.length} master assets to ${resources}`);
