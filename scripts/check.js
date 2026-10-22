const assert = require('node:assert');
const T = require('../src/templates.js');
let n = 0;
function test(name, fn) { fn(); n++; }
test('escapeHtml neutralizes markup', () => {
  assert.strictEqual(T.escapeHtml(`<b>"O'Brien" & <i>x</i></b>`),
    '&lt;b&gt;&quot;O&#39;Brien&quot; &amp; &lt;i&gt;x&lt;/i&gt;&lt;/b&gt;');
});
test('sanitizeUrl keeps safe schemes', () => {
  assert.strictEqual(T.sanitizeUrl('https://a.b/x'), 'https://a.b/x');
  assert.strictEqual(T.sanitizeUrl('mailto:a@b.c'), 'mailto:a@b.c');
  assert.strictEqual(T.sanitizeUrl('tel:+123'), 'tel:+123');
});
test('sanitizeUrl neutralizes unsafe schemes', () => {
  assert.strictEqual(T.sanitizeUrl('javascript:alert(1)'), '#');
  assert.strictEqual(T.sanitizeUrl('data:text/html,<script>'), '#');
});
console.log(`check: ${n} passed`);

const S = require('../src/schema.js');
test('migrate fills v2 fields from a v1 profile', () => {
  const v1 = { name: 'A', email: 'a@b.c', phone: '+1 2', booking: { url: 'u', label: 'l' }, socials: { linkedin: 'x' } };
  const p = S.migrate(v1);
  assert.strictEqual(p.version, 2);
  assert.strictEqual(p.name, 'A');
  assert.strictEqual(p.tagline, '');
  assert.strictEqual(p.socials.instagram, '');
  assert.deepStrictEqual(p.brand, S.DEFAULT_BRAND);
  assert.strictEqual(p.signature.template, 'a');
});
console.log(`check schema: ${n} passed`);

const FIXTURE = S.migrate({ name: `O'Brien & <Co>`, title: 'Dev', email: 'a@b.c',
  phone: '+1 2', website: 'https://x.y', websiteDisplay: 'x.y', location: 'Dhaka',
  booking: { url: 'https://cal.x', label: 'Book' },
  socials: { linkedin: 'https://l', github: 'https://g', x: 'https://t' } });
test('every template renders escaped and safe', () => {
  for (const t of T.MANIFEST) {
    const html = T.render(t.letter, FIXTURE, { assetPrefix: '..' });
    assert.ok(!/<script/i.test(html), t.slug + ' has <script');
    assert.ok(!/undefined/.test(html), t.slug + ' leaked undefined');
    assert.ok(!/\bclass=/.test(html), t.slug + ' used a CSS class');
    assert.ok(!/javascript:/i.test(html), t.slug + ' unsafe url');
    assert.ok(html.includes('&amp;') || html.includes('&lt;'), t.slug + ' not escaped');
  }
});
test('unsafe url is neutralized', () => {
  const p = S.migrate(Object.assign({}, FIXTURE, { website: 'javascript:alert(1)' }));
  assert.ok(!T.render('a', p).includes('javascript:'));
});
test('manifest names follow the convention', () => {
  for (const t of T.MANIFEST) assert.ok(t.slug.startsWith('signature-' + t.letter + '-'), t.slug);
});
console.log(`check templates: ${T.MANIFEST.length} templates passed`);

const fs = require('node:fs');
const path = require('node:path');
const build = require('./build.js');
test('build script writes manifest signatures and profile.js', () => {
  const root = path.resolve(__dirname, '..');
  const profileJs = fs.readFileSync(path.join(root, 'data', 'profile.js'), 'utf8');
  assert.ok(profileJs.includes('window.PROFILE_DATA ='), 'profile.js has global data');
  for (const t of T.MANIFEST) {
    const sigPath = path.join(root, 'signatures', t.slug + '.html');
    assert.ok(fs.existsSync(sigPath), 'missing ' + t.slug + '.html');
    const content = fs.readFileSync(sigPath, 'utf8');
    assert.ok(content.includes('SIGNATURE-START'), t.slug + ' has signature start');
  }
});
console.log('check build: passed');

const root = path.resolve(__dirname, '..');
const indexHtml = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
assert.ok(indexHtml.includes('src/templates.js'), 'index.html loads templates.js');
assert.ok(!indexHtml.includes('const SIGNATURE_DEFINITIONS = ['), 'index.html removed inline template definitions');
console.log('check index: passed');

const profileJson = require('../data/profile.json');
assert.strictEqual(profileJson.version, 2, 'profile.json version is 2');
assert.ok(profileJson.brand && typeof profileJson.brand.accent === 'string', 'profile.json has brand accent');
console.log('check profile.json: passed');

test('serializeProfile/parseProfile round-trip', () => {
  const p = S.migrate({ name: 'Test', email: 'a@b.c' });
  const json = S.serializeProfile(p);
  const p2 = S.parseProfile(json);
  assert.strictEqual(p2.name, 'Test');
  assert.strictEqual(p2.version, 2);
  assert.strictEqual(p2.email, 'a@b.c');
});
test('parseProfile rejects invalid JSON', () => {
  assert.throws(() => S.parseProfile('not-json'), { name: 'SyntaxError' });
});
console.log('check persistence helpers: passed');

test('template renders data URI image src', () => {
  const p = S.migrate({ name: 'Test', email: 'a@b.c', images: { photo: 'data:image/png;base64,AAAA' } });
  const html = T.render('b', p, { assetPrefix: 'assets' });
  assert.ok(html.includes('data:image/png;base64,AAAA'), 'data URI photo rendered');
});
test('template falls back to default image when empty', () => {
  const p = S.migrate({ name: 'Test', email: 'a@b.c', images: { photo: '' } });
  const html = T.render('b', p, { assetPrefix: 'assets' });
  assert.ok(html.includes('assets/images/photo.png'), 'fallback photo used');
});
console.log('check image handling: passed');

// New template-specific assertions
test('photoSrc precedence: explicit data URI wins', () => {
  const p = S.migrate({ name: 'Test', email: 'a@b.c', images: { photo: 'data:image/png;base64,AAAA', remotePhoto: 'https://remote.example/photo.jpg' } });
  const html = T.render('h', p, { assetPrefix: 'assets' });
  assert.ok(html.includes('data:image/png;base64,AAAA'), 'explicit data URI should win over remotePhoto');
});
test('photoSrc precedence: explicit https URL wins', () => {
  const p = S.migrate({ name: 'Test', email: 'a@b.c', images: { photo: 'https://explicit.example/photo.jpg', remotePhoto: 'https://remote.example/photo.jpg' } });
  const html = T.render('h', p, { assetPrefix: 'assets' });
  assert.ok(html.includes('https://explicit.example/photo.jpg'), 'explicit https photo should win');
});
test('photoSrc precedence: remotePhoto used when photo is bundled default', () => {
  const p = S.migrate({ name: 'Test', email: 'a@b.c', images: { photo: 'assets/images/photo.png', remotePhoto: 'https://remote.example/photo.jpg' } });
  const html = T.render('h', p, { assetPrefix: 'assets' });
  assert.ok(html.includes('https://remote.example/photo.jpg'), 'remotePhoto should be used when photo is default bundle');
});
test('K and N output contains white background fill', () => {
  const p = S.migrate(Object.assign({}, FIXTURE));
  const htmlK = T.render('k', p, { assetPrefix: '..' });
  const htmlN = T.render('n', p, { assetPrefix: '..' });
  assert.ok(htmlK.includes('background:#ffffff'), 'K should have white fill');
  assert.ok(htmlN.includes('background:#ffffff'), 'N should have white fill');
});
test('H does not contain white card fill', () => {
  const p = S.migrate(Object.assign({}, FIXTURE));
  const htmlH = T.render('h', p, { assetPrefix: '..' });
  assert.ok(!htmlH.includes('background:#ffffff'), 'H should not have white card fill');
});
test('L output uses serif font stack', () => {
  const p = S.migrate(Object.assign({}, FIXTURE));
  const htmlL = T.render('l', p, { assetPrefix: '..' });
  assert.ok(htmlL.includes('Georgia'), 'L should use Georgia serif');
  assert.ok(htmlL.includes("'Times New Roman'") || htmlL.includes('"Times New Roman"'), 'L should include Times New Roman');
});
test('O has solid background-color alongside linear-gradient', () => {
  const p = S.migrate(Object.assign({}, FIXTURE));
  const htmlO = T.render('o', p, { assetPrefix: '..' });
  assert.ok(htmlO.includes('background-color:#2563eb'), 'O should have solid fallback color');
  assert.ok(htmlO.includes('linear-gradient'), 'O should have gradient');
});
test('H renders name only, no job title', () => {
  const p = S.migrate(Object.assign({}, FIXTURE));
  const htmlH = T.render('h', p, { assetPrefix: '..' });
  // H should have the name
  assert.ok(htmlH.includes(T.escapeHtml(FIXTURE.name)), 'H renders name');
  // H should NOT have the title field rendered (no 12px muted title div)
  // Specifically, it should not contain the title text between name and contact rows
  const nameIdx = htmlH.indexOf(T.escapeHtml(FIXTURE.name));
  const contactIdx = htmlH.indexOf('i-mail');
  const between = htmlH.slice(nameIdx, contactIdx);
  assert.ok(!between.includes(T.escapeHtml(FIXTURE.title)), 'H should not render job title');
});
test('P renders shields-style dual-color badges for contact and tech stack', () => {
  const p = S.migrate(Object.assign({}, FIXTURE));
  const htmlP = T.render('p', p, { assetPrefix: '..' });
  assert.ok(htmlP.includes('email'), 'P should render email label');
  assert.ok(htmlP.includes('Next.js'), 'P should render Next.js stack badge');
  assert.ok(htmlP.includes('TypeScript'), 'P should render TypeScript badge');
  assert.ok(htmlP.includes('PostgreSQL'), 'P should render PostgreSQL badge');
});
test('Q renders npm package format with install command', () => {
  const p = S.migrate(Object.assign({}, FIXTURE));
  const htmlQ = T.render('q', p, { assetPrefix: '..' });
  assert.ok(htmlQ.includes('npm install'), 'Q should render npm install command');
  assert.ok(htmlQ.includes('open to work'), 'Q should render open to work pill');
});
test('R renders Git contributor card with commit heatmap', () => {
  const p = S.migrate(Object.assign({}, FIXTURE));
  const htmlR = T.render('r', p, { assetPrefix: '..' });
  assert.ok(htmlR.includes('#216e39'), 'R should render GitHub dark green commit square');
  assert.ok(htmlR.includes('Book a call'), 'R should render Book a call CTA');
});
test('S renders VS Code IDE editor with developer.ts and line numbers', () => {
  const p = S.migrate(Object.assign({}, FIXTURE));
  const htmlS = T.render('s', p, { assetPrefix: '..' });
  assert.ok(htmlS.includes('developer.ts'), 'S should render developer.ts tab');
  assert.ok(htmlS.includes('export const'), 'S should render export const keyword');
  assert.ok(htmlS.includes('Visual Studio Code'), 'S should include VS Code title');
});
test('T renders macOS terminal prompt with whoami output', () => {
  const p = S.migrate(Object.assign({}, FIXTURE));
  const htmlT = T.render('t', p, { assetPrefix: '..' });
  assert.ok(htmlT.includes('whoami'), 'T should render whoami command');
  assert.ok(htmlT.includes('zsh'), 'T should include zsh title');
  assert.ok(htmlT.includes('#ff5f56'), 'T should render macOS red traffic light');
});
test('U renders QR contact card with QR code and scan instruction', () => {
  const p = S.migrate(Object.assign({}, FIXTURE));
  const htmlU = T.render('u', p, { assetPrefix: '..' });
  assert.ok(htmlU.includes('qrserver.com'), 'U should render QR code API url');
  assert.ok(htmlU.includes('Scan to save my contact'), 'U should render scan caption');
});
test('V renders availability indicator and tech stack list', () => {
  const p = S.migrate(Object.assign({}, FIXTURE));
  const htmlV = T.render('v', p, { assetPrefix: '..' });
  assert.ok(htmlV.includes('Available for new projects'), 'V should render availability text');
  assert.ok(htmlV.includes('React'), 'V should render React in stack');
});
test('W renders split portrait layout with flush photo', () => {
  const p = S.migrate(Object.assign({}, FIXTURE));
  const htmlW = T.render('w', p, { assetPrefix: '..' });
  assert.ok(htmlW.includes('border-top-left-radius:18px'), 'W should have rounded left photo');
  assert.ok(htmlW.includes(T.escapeHtml(FIXTURE.name)), 'W should render name');
});
test('X renders corporate top banner signature', () => {
  const p = S.migrate(Object.assign({}, FIXTURE, { company: 'TechNova Solutions Ltd.', tagline: 'Innovating Tomorrow' }));
  const htmlX = T.render('x', p, { assetPrefix: '..' });
  assert.ok(htmlX.includes('TechNova Solutions Ltd.'), 'X should render company name');
  assert.ok(htmlX.includes('#1e3a5f'), 'X should render corporate navy top banner');
});
test('Y renders watermark initials backdrop', () => {
  const p = S.migrate(Object.assign({}, FIXTURE));
  const htmlY = T.render('y', p, { assetPrefix: '..' });
  assert.ok(htmlY.includes('RJ'), 'Y should render RJ watermark');
});
test('Z renders animated glow name GIF with fallback alt', () => {
  const p = S.migrate(Object.assign({}, FIXTURE));
  const htmlZ = T.render('z', p, { assetPrefix: '..' });
  assert.ok(htmlZ.includes('name-anim.gif'), 'Z should reference name-anim.gif');
  assert.ok(htmlZ.includes(`alt="${T.escapeHtml(FIXTURE.name)}"`), 'Z should have fallback alt text');
});
test('G does not render empty parentheses when pronouns is empty', () => {
  const p = S.migrate(Object.assign({}, FIXTURE, { pronouns: '' }));
  const htmlG = T.render('g', p, { assetPrefix: '..' });
  assert.ok(!htmlG.includes('()'), 'G should not output empty () when pronouns missing');
});
console.log('check new template assertions: passed');

