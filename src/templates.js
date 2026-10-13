(function () {
  function escapeHtml(v) {
    return String(v == null ? '' : v)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function sanitizeUrl(v) {
    const s = String(v == null ? '' : v).trim();
    return /^(https?:|mailto:|tel:)/i.test(s) ? s : '#';
  }
  const API = { escapeHtml, sanitizeUrl };
  if (typeof module !== 'undefined' && module.exports) module.exports = API;
  if (typeof window !== 'undefined') window.SignatureTemplates = API;
})();
