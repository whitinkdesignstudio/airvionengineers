const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const srcDir = path.join(repoRoot, 'images', 'product card');
const destDir = path.join(repoRoot, 'client', 'public', 'images', 'product card');

if (!fs.existsSync(srcDir)) {
  console.error('Source directory not found:', srcDir);
  process.exit(1);
}

fs.mkdirSync(destDir, { recursive: true });

const files = fs.readdirSync(srcDir);
let copied = 0;
for (const f of files) {
  const s = path.join(srcDir, f);
  const d = path.join(destDir, f);
  try {
    fs.copyFileSync(s, d);
    console.log('Copied', f);
    copied++;
  } catch (err) {
    console.error('Failed to copy', f, err.message);
  }
}

console.log(`Done. Copied ${copied} files to ${destDir}`);
process.exit(0);
