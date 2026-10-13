const fs = require('fs');
const path = require('path');
const T = require('../src/templates.js');
const S = require('../src/schema.js');

const rootDir = path.resolve(__dirname, '..');
const profilePath = path.join(rootDir, 'data', 'profile.json');
const profileJsPath = path.join(rootDir, 'data', 'profile.js');
const signaturesDir = path.join(rootDir, 'signatures');

// Read profile data and migrate to v2
let rawProfile = {};
try {
  rawProfile = JSON.parse(fs.readFileSync(profilePath, 'utf8'));
} catch (e) {
  console.warn('Could not read profile.json, using defaults.');
}
const profile = S.migrate(rawProfile);

// Sync profile.js
const profileJsContent = `// Auto-generated from profile.json for zero-config file:// and http:// support
window.PROFILE_DATA = ${JSON.stringify(profile, null, 2)};
`;
fs.writeFileSync(profileJsPath, profileJsContent);
console.log('Generated data/profile.js');

// Ensure signatures dir exists
if (!fs.existsSync(signaturesDir)) {
  fs.mkdirSync(signaturesDir, { recursive: true });
}

// Generate standalone signature files using slug naming convention
T.MANIFEST.forEach((t) => {
  const filename = `${t.slug}.html`;
  const fullContent = T.renderStandalone(t.letter, profile, { assetPrefix: '../assets' });
  fs.writeFileSync(path.join(signaturesDir, filename), fullContent);
  console.log(`Generated signatures/${filename}`);
});

console.log('Build completed successfully.');
