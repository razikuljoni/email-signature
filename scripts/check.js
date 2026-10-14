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
