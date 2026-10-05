const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const profilePath = path.join(rootDir, 'data', 'profile.json');
const profileJsPath = path.join(rootDir, 'data', 'profile.js');
const signaturesDir = path.join(rootDir, 'signatures');

// Read profile data
const profile = JSON.parse(fs.readFileSync(profilePath, 'utf8'));

// Sync profile.js
const profileJsContent = `// Auto-generated from profile.json for zero-config file:// and http:// support
window.PROFILE_DATA = ${JSON.stringify(profile, null, 2)};
`;
fs.writeFileSync(profileJsPath, profileJsContent);

// Action bar & styles included in standalone signature files
function getStandaloneHead(title) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} — Email Signature</title>
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 0;
      background: #f1f5f9;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #0f172a;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    .top-bar {
      background: #ffffff;
      border-bottom: 1px solid #e2e8f0;
      padding: 12px 24px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      position: sticky;
      top: 0;
      z-index: 50;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    }
    .top-left {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .back-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 7px 12px;
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      color: #334155;
      text-decoration: none;
      font-size: 13px;
      font-weight: 500;
      transition: all 0.15s ease;
    }
    .back-btn:hover {
      background: #e2e8f0;
      color: #0f172a;
    }
    .sig-title {
      font-size: 15px;
      font-weight: 600;
      color: #0f172a;
    }
    .actions {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .btn {
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 14px;
      font-size: 13px;
      font-weight: 600;
      border-radius: 8px;
      border: 1px solid transparent;
      transition: all 0.15s ease;
      user-select: none;
    }
    .btn-primary {
      background: #2563eb;
      color: #ffffff;
    }
    .btn-primary:hover {
      background: #1d4ed8;
      box-shadow: 0 4px 10px rgba(37, 99, 235, 0.25);
    }
    .btn-secondary {
      background: #ffffff;
      color: #334155;
      border-color: #cbd5e1;
    }
    .btn-secondary:hover {
      background: #f8fafc;
      color: #0f172a;
    }
    .preview-canvas {
      flex: 1;
      padding: 40px 24px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .card-preview {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 32px;
      box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.05);
      max-width: 650px;
      width: 100%;
      overflow-x: auto;
    }
    .bg-dark-preview {
      background: #0f172a !important;
      border-color: #1e293b !important;
    }
    .copy-tip {
      margin-top: 24px;
      font-size: 13px;
      color: #64748b;
      text-align: center;
      max-width: 500px;
      line-height: 1.5;
    }
    .copy-tip strong {
      color: #0f172a;
    }
    /* Toast */
    #toast {
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%) translateY(20px);
      background: #0f172a;
      color: #ffffff;
      padding: 10px 20px;
      border-radius: 8px;
      font-size: 13.5px;
      font-weight: 500;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
      opacity: 0;
      pointer-events: none;
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      z-index: 999;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    #toast.show {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  </style>
</head>
<body>
  <div class="top-bar">
    <div class="top-left">
      <a href="../index.html" class="back-btn">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        Dashboard
      </a>
      <span class="sig-title">${title}</span>
    </div>
    <div class="actions">
      <button class="btn btn-secondary" onclick="copyHtmlCode()">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
        Copy HTML
      </button>
      <button class="btn btn-primary" onclick="copyVisualSignature()">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
        Copy for Gmail / Outlook
      </button>
    </div>
  </div>

  <main class="preview-canvas">
    <div class="card-preview${title.includes('Noir') ? ' bg-dark-preview' : ''}">
      <div id="signature-container">`;
}

function getStandaloneFooter() {
  return `      </div>
    </div>
    <div class="copy-tip">
      Click <strong>Copy for Gmail / Outlook</strong>, then open your email settings (e.g. Gmail &rarr; See all settings &rarr; Signature) and press <strong>Ctrl+V / Cmd+V</strong>.
    </div>
  </main>

  <div id="toast">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
    <span id="toast-text">Signature copied to clipboard!</span>
  </div>

  <script>
    function showToast(msg) {
      const toast = document.getElementById('toast');
      document.getElementById('toast-text').innerText = msg;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2500);
    }

    async function copyVisualSignature() {
      const container = document.getElementById('signature-container');
      try {
        if (navigator.clipboard && window.ClipboardItem) {
          const htmlBlob = new Blob([container.innerHTML], { type: 'text/html' });
          const textBlob = new Blob([container.innerText], { type: 'text/plain' });
          await navigator.clipboard.write([
            new ClipboardItem({
              'text/html': htmlBlob,
              'text/plain': textBlob
            })
          ]);
          showToast('Copied! Paste into Gmail / Outlook / Apple Mail.');
          return;
        }
      } catch (err) {
        console.warn('ClipboardItem fallback:', err);
      }
      const range = document.createRange();
      range.selectNode(container);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      document.execCommand('copy');
      sel.removeAllRanges();
      showToast('Copied! Paste into Gmail / Outlook / Apple Mail.');
    }

    async function copyHtmlCode() {
      const container = document.getElementById('signature-container');
      await navigator.clipboard.writeText(container.innerHTML.trim());
      showToast('Raw HTML code copied to clipboard!');
    }
  </script>
</body>
</html>`;
}

// ==========================================
// TEMPLATE A: Essential (Text Only)
// ==========================================
function renderSignatureA(p) {
  return `<!-- SIGNATURE-START -->
<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,Helvetica,sans-serif; max-width:560px; color:#111827;">
  <tr>
    <td style="border-top:1px solid #e5e7eb; font-size:0; line-height:0; padding-bottom:12px;">&nbsp;</td>
  </tr>
  <tr>
    <td>
      <div style="font-size:16px; font-weight:700; color:#111827; line-height:1.3;">${p.name}</div>
      <div style="font-size:12px; color:#6b7280; line-height:1.4; margin-top:2px;">${p.title}</div>
      <div style="font-size:12.5px; color:#374151; line-height:1.7; margin-top:8px;">
        <a href="mailto:${p.email}" style="color:#374151; text-decoration:none;">${p.email}</a>
        <span style="color:#d1d5db;">&nbsp;&middot;&nbsp;</span>
        <a href="tel:${p.phone.replace(/[^0-9+]/g, '')}" style="color:#374151; text-decoration:none;">${p.phone}</a>
      </div>
      <div style="font-size:12.5px; color:#374151; line-height:1.7;">
        <a href="${p.website}" style="color:#2563eb; text-decoration:none;">${p.websiteDisplay}</a>
        <span style="color:#d1d5db;">&nbsp;&middot;&nbsp;</span>
        <span>${p.location}</span>
      </div>
      <div style="font-size:12px; color:#6b7280; line-height:1.7; margin-top:6px;">
        <a href="${p.socials.linkedin}" style="color:#6b7280; text-decoration:none;">LinkedIn</a>
        <span style="color:#d1d5db;">&nbsp;&middot;&nbsp;</span>
        <a href="${p.socials.github}" style="color:#6b7280; text-decoration:none;">GitHub</a>
        <span style="color:#d1d5db;">&nbsp;&middot;&nbsp;</span>
        <a href="${p.socials.x}" style="color:#6b7280; text-decoration:none;">X</a>
        <span style="color:#d1d5db;">&nbsp;&middot;&nbsp;</span>
        <a href="${p.booking.url}" style="color:#2563eb; text-decoration:none; font-weight:600;">${p.booking.label}</a>
      </div>
    </td>
  </tr>
</table>
<!-- SIGNATURE-END -->`;
}

// ==========================================
// TEMPLATE B: Portrait Minimal
// ==========================================
function renderSignatureB(p, assetPrefix = '../assets') {
  return `<!-- SIGNATURE-START -->
<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,Helvetica,sans-serif; max-width:560px; color:#111827;">
  <tr>
    <td style="border-top:1px solid #e5e7eb; font-size:0; line-height:0; padding-bottom:14px;">&nbsp;</td>
  </tr>
  <tr>
    <td>
      <table cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="vertical-align:middle; padding-right:16px;">
            <img src="${assetPrefix}/images/photo.png" alt="${p.name}" width="80" height="110" style="display:block; width:80px; height:110px; border-radius:10px; border:1px solid #e5e7eb; object-fit:cover;">
          </td>
          <td style="vertical-align:middle; width:1px; background:#e5e7eb; font-size:0; line-height:0;">&nbsp;</td>
          <td style="vertical-align:middle; padding-left:16px;">
            <div style="font-size:16px; font-weight:700; color:#111827; line-height:1.25; letter-spacing:0.2px;">${p.name}</div>
            <div style="font-size:12px; font-weight:500; color:#6b7280; line-height:1.4; margin-top:2px;">${p.title}</div>
            <div style="font-size:12.5px; color:#374151; line-height:1.65; margin-top:8px; white-space:nowrap;">
              <img src="${assetPrefix}/icons/i-mail.png" alt="" width="15" height="15" style="width:15px; height:15px; vertical-align:-2px;">
              <a href="mailto:${p.email}" style="color:#374151; text-decoration:none; vertical-align:middle;">${p.email}</a>
              <span style="color:#d1d5db; vertical-align:middle;">&nbsp;&middot;&nbsp;</span>
              <img src="${assetPrefix}/icons/i-phone.png" alt="" width="15" height="15" style="width:15px; height:15px; vertical-align:-2px;">
              <a href="${p.whatsapp}" style="color:#374151; text-decoration:none; vertical-align:middle;">${p.phone}</a>
            </div>
            <div style="font-size:12.5px; color:#374151; line-height:1.65; white-space:nowrap;">
              <img src="${assetPrefix}/icons/i-globe.png" alt="" width="15" height="15" style="width:15px; height:15px; vertical-align:-2px;">
              <a href="${p.website}" style="color:#2563eb; text-decoration:none; vertical-align:middle;">${p.websiteDisplay}</a>
              <span style="color:#d1d5db; vertical-align:middle;">&nbsp;&middot;&nbsp;</span>
              <img src="${assetPrefix}/icons/i-map-pin.png" alt="" width="15" height="15" style="width:15px; height:15px; vertical-align:-2px;">
              <span style="vertical-align:middle;">${p.location}</span>
            </div>
            <div style="margin-top:8px; line-height:1; white-space:nowrap;">
              <a href="${p.socials.linkedin}" style="text-decoration:none; vertical-align:middle;"><img src="${assetPrefix}/icons/s-linkedin.png" alt="LinkedIn" width="19" height="19" border="0" style="width:19px; height:19px; vertical-align:middle;"></a>
              <span style="font-size:12px; color:#d1d5db; vertical-align:middle;">&nbsp;&nbsp;&nbsp;</span>
              <a href="${p.socials.github}" style="text-decoration:none; vertical-align:middle;"><img src="${assetPrefix}/icons/s-github.png" alt="GitHub" width="19" height="19" border="0" style="width:19px; height:19px; vertical-align:middle;"></a>
              <span style="font-size:12px; color:#d1d5db; vertical-align:middle;">&nbsp;&nbsp;&nbsp;</span>
              <a href="${p.socials.x}" style="text-decoration:none; vertical-align:middle;"><img src="${assetPrefix}/icons/s-x.png" alt="X" width="17" height="17" border="0" style="width:17px; height:17px; vertical-align:middle;"></a>
              <span style="font-size:12px; color:#d1d5db; vertical-align:middle;">&nbsp;&nbsp;&middot;&nbsp;&nbsp;</span>
              <a href="${p.booking.url}" style="font-size:12.5px; font-weight:600; color:#2563eb; text-decoration:none; vertical-align:middle;">${p.booking.label}</a>
            </div>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
<!-- SIGNATURE-END -->`;
}

// ==========================================
// TEMPLATE C: Monogram (Initial Avatar)
// ==========================================
function renderSignatureC(p, assetPrefix = '../assets') {
  return `<!-- SIGNATURE-START -->
<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,Helvetica,sans-serif; max-width:560px; color:#111827;">
  <tr>
    <td style="border-top:1px solid #e5e7eb; font-size:0; line-height:0; padding-bottom:14px;">&nbsp;</td>
  </tr>
  <tr>
    <td>
      <table cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="vertical-align:middle; padding-right:16px;">
            <img src="${assetPrefix}/images/monogram.png" alt="RJ" width="80" height="110" style="display:block; width:80px; height:110px; border-radius:10px; object-fit:cover;">
          </td>
          <td style="vertical-align:middle; width:1px; background:#e5e7eb; font-size:0; line-height:0;">&nbsp;</td>
          <td style="vertical-align:middle; padding-left:16px;">
            <div style="font-size:16px; font-weight:700; color:#111827; line-height:1.25; letter-spacing:0.2px;">${p.name}</div>
            <div style="font-size:12px; font-weight:500; color:#6b7280; line-height:1.4; margin-top:2px;">${p.title}</div>
            <div style="font-size:12.5px; color:#374151; line-height:1.7; margin-top:8px;">
              <a href="mailto:${p.email}" style="color:#374151; text-decoration:none;">${p.email}</a>
              <span style="color:#d1d5db;">&nbsp;&middot;&nbsp;</span>
              <a href="tel:${p.phone.replace(/[^0-9+]/g, '')}" style="color:#374151; text-decoration:none;">${p.phone}</a>
            </div>
            <div style="font-size:12.5px; color:#374151; line-height:1.7;">
              <a href="${p.website}" style="color:#2563eb; text-decoration:none;">${p.websiteDisplay}</a>
              <span style="color:#d1d5db;">&nbsp;&middot;&nbsp;</span>
              <span>${p.location}</span>
            </div>
            <div style="font-size:12px; color:#6b7280; line-height:1.7; margin-top:6px;">
              <a href="${p.socials.linkedin}" style="color:#6b7280; text-decoration:none;">LinkedIn</a>
              <span style="color:#d1d5db;">&nbsp;&middot;&nbsp;</span>
              <a href="${p.socials.github}" style="color:#6b7280; text-decoration:none;">GitHub</a>
              <span style="color:#d1d5db;">&nbsp;&middot;&nbsp;</span>
              <a href="${p.socials.x}" style="color:#6b7280; text-decoration:none;">X</a>
              <span style="color:#d1d5db;">&nbsp;&middot;&nbsp;</span>
              <a href="${p.booking.url}" style="color:#2563eb; text-decoration:none; font-weight:600;">${p.booking.label}</a>
            </div>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
<!-- SIGNATURE-END -->`;
}

// ==========================================
// TEMPLATE D: Noir Card (Dark Minimalist)
// ==========================================
function renderSignatureD(p, assetPrefix = '../assets') {
  return `<!-- SIGNATURE-START -->
<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,Helvetica,sans-serif; max-width:560px; background:#0f1727; border-radius:18px; color:#ffffff;">
  <tr>
    <td style="padding:20px 24px;">
      <table cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="vertical-align:middle; padding-right:16px;">
            <img src="${assetPrefix}/images/photo.png" alt="${p.name}" width="80" height="110" style="display:block; width:80px; height:110px; border-radius:10px; object-fit:cover;">
          </td>
          <td style="vertical-align:middle; width:1px; background:#1f2937; font-size:0; line-height:0;">&nbsp;</td>
          <td style="vertical-align:middle; padding-left:16px;">
            <div style="font-size:16px; font-weight:700; color:#ffffff; line-height:1.25; letter-spacing:0.2px;">${p.name}</div>
            <div style="font-size:12px; font-weight:500; color:#9ca3af; line-height:1.4; margin-top:2px;">${p.title}</div>
            <div style="font-size:12.5px; color:#d1d5db; line-height:1.7; margin-top:8px;">
              <a href="mailto:${p.email}" style="color:#d1d5db; text-decoration:none;">${p.email}</a>
              <span style="color:#4b5563;">&nbsp;&middot;&nbsp;</span>
              <a href="tel:${p.phone.replace(/[^0-9+]/g, '')}" style="color:#d1d5db; text-decoration:none;">${p.phone}</a>
            </div>
            <div style="font-size:12.5px; color:#d1d5db; line-height:1.7;">
              <a href="${p.website}" style="color:#93c5fd; text-decoration:none;">${p.websiteDisplay}</a>
              <span style="color:#4b5563;">&nbsp;&middot;&nbsp;</span>
              <span style="color:#d1d5db;">${p.location}</span>
            </div>
            <div style="font-size:12px; color:#9ca3af; line-height:1.7; margin-top:6px;">
              <a href="${p.socials.linkedin}" style="color:#9ca3af; text-decoration:none;">LinkedIn</a>
              <span style="color:#4b5563;">&nbsp;&middot;&nbsp;</span>
              <a href="${p.socials.github}" style="color:#9ca3af; text-decoration:none;">GitHub</a>
              <span style="color:#4b5563;">&nbsp;&middot;&nbsp;</span>
              <a href="${p.socials.x}" style="color:#9ca3af; text-decoration:none;">X</a>
              <span style="color:#4b5563;">&nbsp;&middot;&nbsp;</span>
              <a href="${p.booking.url}" style="color:#93c5fd; text-decoration:none; font-weight:600;">${p.booking.label}</a>
            </div>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
<!-- SIGNATURE-END -->`;
}

// ==========================================
// TEMPLATE E: Developer Pro / Classic Banner
// ==========================================
function renderSignatureE(p, assetPrefix = '../assets') {
  return `<!-- SIGNATURE-START -->
<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,Helvetica,sans-serif; max-width:580px; vertical-align:-webkit-baseline-middle; color:#0f172a;">
  <tr>
    <td style="padding-bottom:12px;">
      <table cellpadding="0" cellspacing="0" border="0" width="100%">
        <tr>
          <td style="height:4px; width:80px; background:#2563eb; border-radius:2px; font-size:0; line-height:0;">&nbsp;</td>
          <td style="height:4px; width:6px; font-size:0; line-height:0;">&nbsp;</td>
          <td style="height:4px; background:#93c5fd; border-radius:2px; font-size:0; line-height:0;">&nbsp;</td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td>
      <table cellpadding="0" cellspacing="0" border="0">
        <tr>
          <!-- Photo -->
          <td style="vertical-align:middle; padding-right:16px;">
            <img src="${assetPrefix}/images/photo.png" alt="${p.name}" width="88" height="88" style="display:block; width:88px; height:88px; border-radius:14px; border:2px solid #e2e8f0; object-fit:cover;">
          </td>
          <!-- Name & Socials Column -->
          <td style="vertical-align:middle; padding-right:16px;">
            <div style="font-size:17px; font-weight:700; color:#0f172a; line-height:1.2; letter-spacing:-0.2px;">${p.name}</div>
            <div style="font-size:13px; font-weight:600; color:#2563eb; line-height:1.4; margin-top:3px;">${p.title}</div>
            <div style="margin-top:10px; line-height:1; white-space:nowrap;">
              <a href="${p.socials.linkedin}" style="display:inline-block; margin-right:8px; text-decoration:none;"><img src="${assetPrefix}/icons/s-linkedin.png" alt="LinkedIn" width="18" height="18" border="0" style="vertical-align:middle;"></a>
              <a href="${p.socials.github}" style="display:inline-block; margin-right:8px; text-decoration:none;"><img src="${assetPrefix}/icons/s-github.png" alt="GitHub" width="18" height="18" border="0" style="vertical-align:middle;"></a>
              <a href="${p.socials.x}" style="display:inline-block; margin-right:8px; text-decoration:none;"><img src="${assetPrefix}/icons/s-x.png" alt="X" width="16" height="16" border="0" style="vertical-align:middle;"></a>
              <a href="${p.booking.url}" style="font-size:12px; font-weight:600; color:#2563eb; text-decoration:none; vertical-align:middle; margin-left:2px;">${p.booking.label}</a>
            </div>
          </td>
          <!-- Vertical Accent Divider -->
          <td style="vertical-align:middle; width:1px; background:#e2e8f0; font-size:0; line-height:0; padding:0 0;">&nbsp;</td>
          <!-- Contact Details Column -->
          <td style="vertical-align:middle; padding-left:16px;">
            <table cellpadding="0" cellspacing="0" border="0" style="font-size:12.5px; line-height:1.65; color:#475569;">
              <tr>
                <td style="padding:2px 0; white-space:nowrap;">
                  <img src="${assetPrefix}/icons/i-mail.png" alt="" width="14" height="14" style="width:14px; height:14px; vertical-align:-2px; margin-right:6px;">
                  <a href="mailto:${p.email}" style="color:#0f172a; text-decoration:none; font-weight:500;">${p.email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding:2px 0; white-space:nowrap;">
                  <img src="${assetPrefix}/icons/i-phone.png" alt="" width="14" height="14" style="width:14px; height:14px; vertical-align:-2px; margin-right:6px;">
                  <a href="${p.whatsapp}" style="color:#475569; text-decoration:none;">${p.phone}</a>
                </td>
              </tr>
              <tr>
                <td style="padding:2px 0; white-space:nowrap;">
                  <img src="${assetPrefix}/icons/i-globe.png" alt="" width="14" height="14" style="width:14px; height:14px; vertical-align:-2px; margin-right:6px;">
                  <a href="${p.website}" style="color:#2563eb; text-decoration:none;">${p.websiteDisplay}</a>
                </td>
              </tr>
              <tr>
                <td style="padding:2px 0; white-space:nowrap;">
                  <img src="${assetPrefix}/icons/i-map-pin.png" alt="" width="14" height="14" style="width:14px; height:14px; vertical-align:-2px; margin-right:6px;">
                  <span>${p.location}</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
<!-- SIGNATURE-END -->`;
}

// Generate files
const templates = [
  { file: 'signature-a.html', title: 'Signature A — Essential (Text Only)', fn: renderSignatureA },
  { file: 'signature-b.html', title: 'Signature B — Portrait Minimal', fn: renderSignatureB },
  { file: 'signature-c.html', title: 'Signature C — Monogram Avatar', fn: renderSignatureC },
  { file: 'signature-d.html', title: 'Signature D — Noir Dark Card', fn: renderSignatureD },
  { file: 'signature-e.html', title: 'Signature E — Developer Pro Banner', fn: renderSignatureE },
];

templates.forEach(({ file, title, fn }) => {
  const fullContent = `${getStandaloneHead(title)}
${fn(profile, '../assets')}
${getStandaloneFooter()}`;
  fs.writeFileSync(path.join(signaturesDir, file), fullContent);
  console.log(`Generated signatures/${file}`);
});

console.log('Build completed successfully.');
