/**
 * Copy the web source files that the app ships into www/ for Capacitor.
 *
 * The repository root is the canonical web source (so Firebase Hosting keeps
 * deploying from it). Capacitor expects a clean build directory; we mirror
 * only the assets the runtime needs.
 */
import { promises as fs } from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const root = path.dirname(path.dirname(url.fileURLToPath(import.meta.url)));
const out = path.join(root, 'www');

const FILES = [
    'index.html',
    'main.js',
    'style.css',
    'firebase-config.js',
    'supabase-config.js',
    'scripts/lotto-rules.js',
    'scripts/lotto-tabs.js',
    'scripts/app-init.js',
];

async function rmrf(p) {
    await fs.rm(p, { recursive: true, force: true });
}

async function copyFile(rel) {
    const src = path.join(root, rel);
    const dst = path.join(out, rel);
    await fs.mkdir(path.dirname(dst), { recursive: true });
    await fs.copyFile(src, dst);
}

await rmrf(out);
await fs.mkdir(out, { recursive: true });
for (const f of FILES) await copyFile(f);

const sizes = await Promise.all(FILES.map(async (f) => {
    const s = await fs.stat(path.join(out, f));
    return { file: f, bytes: s.size };
}));
const total = sizes.reduce((a, b) => a + b.bytes, 0);
console.log(`Copied ${FILES.length} files into ${out}`);
for (const { file, bytes } of sizes) {
    console.log(`  ${(bytes / 1024).toFixed(1).padStart(8)} KB  ${file}`);
}
console.log(`  ${'-'.repeat(8)}`);
console.log(`  ${(total / 1024).toFixed(1).padStart(8)} KB  total`);
