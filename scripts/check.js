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
