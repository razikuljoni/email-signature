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
  function sanitizeImageSrc(v) {
    const s = String(v == null ? '' : v).trim();
    if (!s) return '';
    if (/^(https?:|data:image\/|assets\/|v?\.?\.?\/)/i.test(s)) return s;
    return '#';
  }

  function photoSrc(p, assetPrefix) {
    const img = p.images && p.images.photo || '';
    if (/^(data:image\/|https?:)/i.test(img)) return sanitizeImageSrc(img);
    const remote = p.images && p.images.remotePhoto || '';
    if (remote) return sanitizeImageSrc(remote);
    return sanitizeImageSrc(`${assetPrefix}/images/photo.png`);
  }

  const MANIFEST = [
    {
      id: 'sig-a', letter: 'a', slug: 'signature-a-essential-text-only', name: 'Essential Text-Only',
      desc: 'Zero images, indestructible formatting. Works in 100% of email clients and firewalls.',
      tags: ['minimal'], bestFor: 'Strict enterprise mail servers / plain text defaults',
      settings: { fields: ['name', 'title', 'email', 'phone', 'website', 'location', 'booking', 'socials'], layouts: ['stacked'], supportsDark: false }
    },
    {
      id: 'sig-b', letter: 'b', slug: 'signature-b-portrait-minimal', name: 'Portrait Minimal',
      desc: 'Professional portrait photo with clean divider and monochrome icons.',
      tags: ['photo', 'minimal'], bestFor: 'Founders, designers, client-facing roles',
      settings: { fields: ['photo', 'name', 'title', 'email', 'phone', 'whatsapp', 'website', 'location', 'booking', 'socials'], layouts: ['horizontal'], supportsDark: false }
    },
    {
      id: 'sig-c', letter: 'c', slug: 'signature-c-monogram-avatar', name: 'Monogram Avatar',
      desc: 'Discreet monogram initials avatar + hairline divider.',
      tags: ['minimal'], bestFor: 'Engineers & developers preferring a minimal visual anchor',
      settings: { fields: ['monogram', 'name', 'title', 'email', 'phone', 'website', 'location', 'booking', 'socials'], layouts: ['horizontal'], supportsDark: false }
    },
    {
      id: 'sig-d', letter: 'd', slug: 'signature-d-noir-dark-card', name: 'Noir Dark Card',
      desc: 'Dark container card with high contrast styling for dark-mode clients.',
      tags: ['dark', 'photo'], bestFor: 'Dark-mode enthusiasts & design-forward tech brands',
      settings: { fields: ['photo', 'name', 'title', 'email', 'phone', 'website', 'location', 'booking', 'socials'], layouts: ['horizontal'], supportsDark: true }
    },
    {
      id: 'sig-e', letter: 'e', slug: 'signature-e-developer-pro-banner', name: 'Developer Pro Banner',
      desc: 'Dual-color accent bar, photo avatar, and social badge grid.',
      tags: ['photo', 'dev'], bestFor: 'Engineering leaders & technical advocates',
      settings: { fields: ['photo', 'name', 'title', 'email', 'phone', 'whatsapp', 'website', 'location', 'booking', 'socials'], layouts: ['horizontal'], supportsDark: false }
    },
    {
      id: 'sig-f', letter: 'f', slug: 'signature-f-executive-bordered-card', name: 'Executive Bordered Card',
      desc: 'Clean bordered container card with soft rounded corners, photo avatar, and vertical dividers.',
      tags: ['photo', 'minimal'], bestFor: 'Executive leaders & enterprise consultants',
      settings: { fields: ['photo', 'name', 'title', 'email', 'phone', 'whatsapp', 'website', 'location', 'booking', 'socials'], layouts: ['horizontal'], supportsDark: false }
    },
    {
      id: 'sig-g', letter: 'g', slug: 'signature-g-gradient-badge-stack', name: 'Gradient Badge Stack',
      desc: 'Modern vertical gradient accent pill with structured two-column info and badges.',
      tags: ['photo'], bestFor: 'Product managers, startup founders & tech evangelists',
      settings: { fields: ['photo', 'name', 'title', 'email', 'phone', 'whatsapp', 'website', 'location', 'booking', 'socials'], layouts: ['horizontal'], supportsDark: false }
    },
    {
      id: 'sig-h', letter: 'h', slug: 'signature-h-contact-rail', name: 'Contact Rail',
      desc: 'Clean horizontal contact rail with circular photo and icon-separated values.',
      tags: ['photo', 'minimal'], bestFor: 'Minimalists who want a photo without clutter',
      settings: { fields: ['photo', 'name', 'email', 'phone', 'website', 'location', 'socials'], layouts: ['horizontal'], supportsDark: false }
    },
    {
      id: 'sig-i', letter: 'i', slug: 'signature-i-pill-badges', name: 'Pill Badges',
      desc: 'Rounded pill chips for each contact detail with circular photo and social icons.',
      tags: ['photo'], bestFor: 'Creative professionals & community builders',
      settings: { fields: ['photo', 'name', 'title', 'email', 'phone', 'website', 'location', 'booking', 'socials'], layouts: ['horizontal'], supportsDark: false }
    },
    {
      id: 'sig-j', letter: 'j', slug: 'signature-j-labeled-columns', name: 'Labeled Columns',
      desc: 'Four-column grid with uppercase micro-labels above contact values, accent underline.',
      tags: ['minimal'], bestFor: 'Data-driven professionals & enterprise teams',
      settings: { fields: ['name', 'title', 'email', 'phone', 'website', 'location', 'socials'], layouts: ['horizontal'], supportsDark: false }
    },
    {
      id: 'sig-k', letter: 'k', slug: 'signature-k-bordered-contact-grid', name: 'Bordered Contact Grid',
      desc: 'White bordered card with rounded-square photo and 2×2 icon contact grid.',
      tags: ['photo', 'minimal'], bestFor: 'Account managers & client-facing consultants',
      settings: { fields: ['photo', 'name', 'title', 'email', 'phone', 'website', 'location', 'booking', 'socials'], layouts: ['horizontal'], supportsDark: true }
    },
    {
      id: 'sig-l', letter: 'l', slug: 'signature-l-centered-serif-classic', name: 'Centered Serif Classic',
      desc: 'Centered serif typography with letterspaced title and dot-separated contact lines.',
      tags: ['minimal'], bestFor: 'Writers, editors & academic professionals',
      settings: { fields: ['name', 'title', 'email', 'phone', 'website', 'location', 'socials'], layouts: ['centered'], supportsDark: false }
    },
    {
      id: 'sig-m', letter: 'm', slug: 'signature-m-split-dark-panel', name: 'Split Dark Panel',
      desc: 'Two-column card with navy photo pane and white contact pane, bold heading.',
      tags: ['photo', 'dark'], bestFor: 'Design directors & brand-conscious leaders',
      settings: { fields: ['photo', 'name', 'title', 'email', 'phone', 'website', 'location', 'booking', 'socials'], layouts: ['horizontal'], supportsDark: true }
    },
    {
      id: 'sig-n', letter: 'n', slug: 'signature-n-card-cta', name: 'Card + CTA',
      desc: 'White bordered card with circular photo, icon contact lines, and dark pill CTA button.',
      tags: ['photo'], bestFor: 'Sales professionals & business development leads',
      settings: { fields: ['photo', 'name', 'title', 'email', 'phone', 'website', 'location', 'booking', 'socials'], layouts: ['horizontal'], supportsDark: true }
    },
    {
      id: 'sig-o', letter: 'o', slug: 'signature-o-accent-rail', name: 'Accent Rail',
      desc: 'Vertical gradient accent rail with icon contact rows and clean text socials.',
      tags: ['minimal'], bestFor: 'Engineers & technical writers who prefer structure',
      settings: { fields: ['name', 'title', 'email', 'phone', 'website', 'location', 'socials'], layouts: ['horizontal'], supportsDark: false }
    },
    {
      id: 'sig-p', letter: 'p', slug: 'signature-p-dev-badges', name: 'Developer Shields Badges',
      desc: 'Shields.io style color-coded badges for contact endpoints and tech stack, with circular avatar.',
      tags: ['dev', 'photo'], bestFor: 'Full-stack engineers, open-source maintainers & tech leads',
      settings: { fields: ['photo', 'name', 'title', 'email', 'phone', 'whatsapp', 'website', 'booking', 'socials'], layouts: ['horizontal'], supportsDark: false }
    },
    {
      id: 'sig-q', letter: 'q', slug: 'signature-q-npm-package', name: 'NPM Package Card',
      desc: 'Modern npm registry card with install command banner, package version, and status chips.',
      tags: ['dev', 'minimal'], bestFor: 'JavaScript / TypeScript developers, package authors & full-stack engineers',
      settings: { fields: ['name', 'title', 'email', 'website', 'location', 'booking', 'socials'], layouts: ['stacked'], supportsDark: false }
    },
    {
      id: 'sig-r', letter: 'r', slug: 'signature-r-git-contributor', name: 'Git Contributor Card',
      desc: 'Clean bordered card with developer photo, GitHub handle, Book a call CTA button, and active commit activity graph.',
      tags: ['dev', 'photo'], bestFor: 'GitHub power users, open-source contributors & full-stack freelancers',
      settings: { fields: ['photo', 'name', 'title', 'email', 'website', 'location', 'booking', 'socials'], layouts: ['horizontal'], supportsDark: false }
    },
    {
      id: 'sig-s', letter: 's', slug: 'signature-s-code-editor', name: 'VS Code Editor Card',
      desc: 'Visual Studio Code IDE window mock with developer.ts file tab and syntax-highlighted export object.',
      tags: ['dev', 'dark'], bestFor: 'TypeScript developers, frontend engineers & software architects',
      settings: { fields: ['name', 'title', 'email', 'website', 'booking', 'socials'], layouts: ['stacked'], supportsDark: true }
    },
    {
      id: 'sig-t', letter: 't', slug: 'signature-t-terminal-prompt', name: 'macOS Terminal Prompt',
      desc: 'macOS Terminal window with traffic lights, zsh prompt, whoami output, and system spec styled links.',
      tags: ['dev', 'dark'], bestFor: 'Backend engineers, DevOps, Linux enthusiasts & terminal power users',
      settings: { fields: ['name', 'title', 'email', 'phone', 'website', 'location', 'booking', 'socials'], layouts: ['stacked'], supportsDark: true }
    }
  ];

  function renderSignatureA(p, opts = {}) {
    return `<!-- SIGNATURE-START -->
<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,Helvetica,sans-serif; max-width:560px; color:#111827;">
  <tr>
    <td style="border-top:1px solid #e5e7eb; font-size:0; line-height:0; padding-bottom:12px;">&nbsp;</td>
  </tr>
  <tr>
    <td>
      <div style="font-size:16px; font-weight:700; color:#111827; line-height:1.3;">${escapeHtml(p.name)}</div>
      <div style="font-size:12px; color:#6b7280; line-height:1.4; margin-top:2px;">${escapeHtml(p.title)}</div>
      <div style="font-size:12.5px; color:#374151; line-height:1.7; margin-top:8px;">
        <a href="${sanitizeUrl(`mailto:${p.email}`)}" style="color:#374151; text-decoration:none;">${escapeHtml(p.email)}</a>
        <span style="color:#d1d5db;">&nbsp;&middot;&nbsp;</span>
        <a href="${sanitizeUrl(`tel:${String(p.phone||'').replace(/[^0-9+]/g, '')}`)}" style="color:#374151; text-decoration:none;">${escapeHtml(p.phone)}</a>
      </div>
      <div style="font-size:12.5px; color:#374151; line-height:1.7;">
        <a href="${sanitizeUrl(p.website)}" style="color:#2563eb; text-decoration:none;">${escapeHtml(p.websiteDisplay || p.website)}</a>
        <span style="color:#d1d5db;">&nbsp;&middot;&nbsp;</span>
        <span>${escapeHtml(p.location)}</span>
      </div>
      <div style="font-size:12px; color:#6b7280; line-height:1.7; margin-top:6px;">
        <a href="${sanitizeUrl(p.socials && p.socials.linkedin)}" style="color:#6b7280; text-decoration:none;">LinkedIn</a>
        <span style="color:#d1d5db;">&nbsp;&middot;&nbsp;</span>
        <a href="${sanitizeUrl(p.socials && p.socials.github)}" style="color:#6b7280; text-decoration:none;">GitHub</a>
        <span style="color:#d1d5db;">&nbsp;&middot;&nbsp;</span>
        <a href="${sanitizeUrl(p.socials && p.socials.x)}" style="color:#6b7280; text-decoration:none;">X</a>
        <span style="color:#d1d5db;">&nbsp;&middot;&nbsp;</span>
        <a href="${sanitizeUrl(p.booking && p.booking.url)}" style="color:#2563eb; text-decoration:none; font-weight:600;">${escapeHtml(p.booking && p.booking.label || 'Book a call →')}</a>
      </div>
    </td>
  </tr>
</table>
<!-- SIGNATURE-END -->`;
  }

  function renderSignatureB(p, opts = {}) {
    const assetPrefix = opts.assetPrefix || '../assets';
    const photo = sanitizeImageSrc(p.images && p.images.photo || `${assetPrefix}/images/photo.png`);
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
            <img src="${photo}" alt="${escapeHtml(p.name)}" width="80" height="110" style="display:block; width:80px; height:110px; border-radius:10px; border:1px solid #e5e7eb; object-fit:cover;">
          </td>
          <td style="vertical-align:middle; width:1px; background:#e5e7eb; font-size:0; line-height:0;">&nbsp;</td>
          <td style="vertical-align:middle; padding-left:16px;">
            <div style="font-size:16px; font-weight:700; color:#111827; line-height:1.25; letter-spacing:0.2px;">${escapeHtml(p.name)}</div>
            <div style="font-size:12px; font-weight:500; color:#6b7280; line-height:1.4; margin-top:2px;">${escapeHtml(p.title)}</div>
            <div style="font-size:12.5px; color:#374151; line-height:1.65; margin-top:8px; white-space:nowrap;">
              <img src="${sanitizeImageSrc(`${assetPrefix}/icons/i-mail.png`)}" alt="" width="15" height="15" style="width:15px; height:15px; vertical-align:-2px;">
              <a href="${sanitizeUrl(`mailto:${p.email}`)}" style="color:#374151; text-decoration:none; vertical-align:middle;">${escapeHtml(p.email)}</a>
              <span style="color:#d1d5db; vertical-align:middle;">&nbsp;&middot;&nbsp;</span>
              <img src="${sanitizeImageSrc(`${assetPrefix}/icons/i-phone.png`)}" alt="" width="15" height="15" style="width:15px; height:15px; vertical-align:-2px;">
              <a href="${sanitizeUrl(p.whatsapp || `tel:${String(p.phone||'').replace(/[^0-9+]/g, '')}`)}" style="color:#374151; text-decoration:none; vertical-align:middle;">${escapeHtml(p.phone)}</a>
            </div>
            <div style="font-size:12.5px; color:#374151; line-height:1.65; white-space:nowrap;">
              <img src="${sanitizeImageSrc(`${assetPrefix}/icons/i-globe.png`)}" alt="" width="15" height="15" style="width:15px; height:15px; vertical-align:-2px;">
              <a href="${sanitizeUrl(p.website)}" style="color:#2563eb; text-decoration:none; vertical-align:middle;">${escapeHtml(p.websiteDisplay || p.website)}</a>
              <span style="color:#d1d5db; vertical-align:middle;">&nbsp;&middot;&nbsp;</span>
              <img src="${sanitizeImageSrc(`${assetPrefix}/icons/i-map-pin.png`)}" alt="" width="15" height="15" style="width:15px; height:15px; vertical-align:-2px;">
              <span style="vertical-align:middle;">${escapeHtml(p.location)}</span>
            </div>
            <div style="margin-top:8px; line-height:1; white-space:nowrap;">
              <a href="${sanitizeUrl(p.socials && p.socials.linkedin)}" style="text-decoration:none; vertical-align:middle;"><img src="${sanitizeImageSrc(`${assetPrefix}/icons/s-linkedin.png`)}" alt="LinkedIn" width="19" height="19" border="0" style="width:19px; height:19px; vertical-align:middle;"></a>
              <span style="font-size:12px; color:#d1d5db; vertical-align:middle;">&nbsp;&nbsp;&nbsp;</span>
              <a href="${sanitizeUrl(p.socials && p.socials.github)}" style="text-decoration:none; vertical-align:middle;"><img src="${sanitizeImageSrc(`${assetPrefix}/icons/s-github.png`)}" alt="GitHub" width="19" height="19" border="0" style="width:19px; height:19px; vertical-align:middle;"></a>
              <span style="font-size:12px; color:#d1d5db; vertical-align:middle;">&nbsp;&nbsp;&nbsp;</span>
              <a href="${sanitizeUrl(p.socials && p.socials.x)}" style="text-decoration:none; vertical-align:middle;"><img src="${sanitizeImageSrc(`${assetPrefix}/icons/s-x.png`)}" alt="X" width="17" height="17" border="0" style="width:17px; height:17px; vertical-align:middle;"></a>
              <span style="font-size:12px; color:#d1d5db; vertical-align:middle;">&nbsp;&nbsp;&middot;&nbsp;&nbsp;</span>
              <a href="${sanitizeUrl(p.booking && p.booking.url)}" style="font-size:12.5px; font-weight:600; color:#2563eb; text-decoration:none; vertical-align:middle;">${escapeHtml(p.booking && p.booking.label || 'Book a call →')}</a>
            </div>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
<!-- SIGNATURE-END -->`;
  }

  function renderSignatureC(p, opts = {}) {
    const assetPrefix = opts.assetPrefix || '../assets';
    const monogram = sanitizeImageSrc(p.images && p.images.monogram || `${assetPrefix}/images/monogram.png`);
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
            <img src="${monogram}" alt="RJ" width="80" height="110" style="display:block; width:80px; height:110px; border-radius:10px; object-fit:cover;">
          </td>
          <td style="vertical-align:middle; width:1px; background:#e5e7eb; font-size:0; line-height:0;">&nbsp;</td>
          <td style="vertical-align:middle; padding-left:16px;">
            <div style="font-size:16px; font-weight:700; color:#111827; line-height:1.25; letter-spacing:0.2px;">${escapeHtml(p.name)}</div>
            <div style="font-size:12px; font-weight:500; color:#6b7280; line-height:1.4; margin-top:2px;">${escapeHtml(p.title)}</div>
            <div style="font-size:12.5px; color:#374151; line-height:1.7; margin-top:8px;">
              <a href="${sanitizeUrl(`mailto:${p.email}`)}" style="color:#374151; text-decoration:none;">${escapeHtml(p.email)}</a>
              <span style="color:#d1d5db;">&nbsp;&middot;&nbsp;</span>
              <a href="${sanitizeUrl(`tel:${String(p.phone||'').replace(/[^0-9+]/g, '')}`)}" style="color:#374151; text-decoration:none;">${escapeHtml(p.phone)}</a>
            </div>
            <div style="font-size:12.5px; color:#374151; line-height:1.7;">
              <a href="${sanitizeUrl(p.website)}" style="color:#2563eb; text-decoration:none;">${escapeHtml(p.websiteDisplay || p.website)}</a>
              <span style="color:#d1d5db;">&nbsp;&middot;&nbsp;</span>
              <span>${escapeHtml(p.location)}</span>
            </div>
            <div style="font-size:12px; color:#6b7280; line-height:1.7; margin-top:6px;">
              <a href="${sanitizeUrl(p.socials && p.socials.linkedin)}" style="color:#6b7280; text-decoration:none;">LinkedIn</a>
              <span style="color:#d1d5db;">&nbsp;&middot;&nbsp;</span>
              <a href="${sanitizeUrl(p.socials && p.socials.github)}" style="color:#6b7280; text-decoration:none;">GitHub</a>
              <span style="color:#d1d5db;">&nbsp;&middot;&nbsp;</span>
              <a href="${sanitizeUrl(p.socials && p.socials.x)}" style="color:#6b7280; text-decoration:none;">X</a>
              <span style="color:#d1d5db;">&nbsp;&middot;&nbsp;</span>
              <a href="${sanitizeUrl(p.booking && p.booking.url)}" style="color:#2563eb; text-decoration:none; font-weight:600;">${escapeHtml(p.booking && p.booking.label || 'Book a call →')}</a>
            </div>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
<!-- SIGNATURE-END -->`;
  }

  function renderSignatureD(p, opts = {}) {
    const assetPrefix = opts.assetPrefix || '../assets';
    const photo = sanitizeImageSrc(p.images && p.images.photo || `${assetPrefix}/images/photo.png`);
    return `<!-- SIGNATURE-START -->
<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,Helvetica,sans-serif; max-width:560px; background:#0f1727; border-radius:18px; color:#ffffff;">
  <tr>
    <td style="padding:20px 24px;">
      <table cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="vertical-align:middle; padding-right:16px;">
            <img src="${photo}" alt="${escapeHtml(p.name)}" width="80" height="110" style="display:block; width:80px; height:110px; border-radius:10px; object-fit:cover;">
          </td>
          <td style="vertical-align:middle; width:1px; background:#1f2937; font-size:0; line-height:0;">&nbsp;</td>
          <td style="vertical-align:middle; padding-left:16px;">
            <div style="font-size:16px; font-weight:700; color:#ffffff; line-height:1.25; letter-spacing:0.2px;">${escapeHtml(p.name)}</div>
            <div style="font-size:12px; font-weight:500; color:#9ca3af; line-height:1.4; margin-top:2px;">${escapeHtml(p.title)}</div>
            <div style="font-size:12.5px; color:#d1d5db; line-height:1.7; margin-top:8px;">
              <a href="${sanitizeUrl(`mailto:${p.email}`)}" style="color:#d1d5db; text-decoration:none;">${escapeHtml(p.email)}</a>
              <span style="color:#4b5563;">&nbsp;&middot;&nbsp;</span>
              <a href="${sanitizeUrl(`tel:${String(p.phone||'').replace(/[^0-9+]/g, '')}`)}" style="color:#d1d5db; text-decoration:none;">${escapeHtml(p.phone)}</a>
            </div>
            <div style="font-size:12.5px; color:#d1d5db; line-height:1.7;">
              <a href="${sanitizeUrl(p.website)}" style="color:#93c5fd; text-decoration:none;">${escapeHtml(p.websiteDisplay || p.website)}</a>
              <span style="color:#4b5563;">&nbsp;&middot;&nbsp;</span>
              <span style="color:#d1d5db;">${escapeHtml(p.location)}</span>
            </div>
            <div style="font-size:12px; color:#9ca3af; line-height:1.7; margin-top:6px;">
              <a href="${sanitizeUrl(p.socials && p.socials.linkedin)}" style="color:#9ca3af; text-decoration:none;">LinkedIn</a>
              <span style="color:#4b5563;">&nbsp;&middot;&nbsp;</span>
              <a href="${sanitizeUrl(p.socials && p.socials.github)}" style="color:#9ca3af; text-decoration:none;">GitHub</a>
              <span style="color:#4b5563;">&nbsp;&middot;&nbsp;</span>
              <a href="${sanitizeUrl(p.socials && p.socials.x)}" style="color:#9ca3af; text-decoration:none;">X</a>
              <span style="color:#4b5563;">&nbsp;&middot;&nbsp;</span>
              <a href="${sanitizeUrl(p.booking && p.booking.url)}" style="color:#93c5fd; text-decoration:none; font-weight:600;">${escapeHtml(p.booking && p.booking.label || 'Book a call →')}</a>
            </div>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
<!-- SIGNATURE-END -->`;
  }

  function renderSignatureE(p, opts = {}) {
    const assetPrefix = opts.assetPrefix || '../assets';
    const photo = sanitizeImageSrc(p.images && p.images.photo || `${assetPrefix}/images/photo.png`);
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
            <img src="${photo}" alt="${escapeHtml(p.name)}" width="88" height="88" style="display:block; width:88px; height:88px; border-radius:14px; border:2px solid #e2e8f0; object-fit:cover;">
          </td>
          <!-- Name & Socials Column -->
          <td style="vertical-align:middle; padding-right:16px;">
            <div style="font-size:17px; font-weight:700; color:#0f172a; line-height:1.2; letter-spacing:-0.2px;">${escapeHtml(p.name)}</div>
            <div style="font-size:13px; font-weight:600; color:#2563eb; line-height:1.4; margin-top:3px;">${escapeHtml(p.title)}</div>
            <div style="margin-top:10px; line-height:1; white-space:nowrap;">
              <a href="${sanitizeUrl(p.socials && p.socials.linkedin)}" style="display:inline-block; margin-right:8px; text-decoration:none;"><img src="${sanitizeImageSrc(`${assetPrefix}/icons/s-linkedin.png`)}" alt="LinkedIn" width="18" height="18" border="0" style="vertical-align:middle;"></a>
              <a href="${sanitizeUrl(p.socials && p.socials.github)}" style="display:inline-block; margin-right:8px; text-decoration:none;"><img src="${sanitizeImageSrc(`${assetPrefix}/icons/s-github.png`)}" alt="GitHub" width="18" height="18" border="0" style="vertical-align:middle;"></a>
              <a href="${sanitizeUrl(p.socials && p.socials.x)}" style="display:inline-block; margin-right:8px; text-decoration:none;"><img src="${sanitizeImageSrc(`${assetPrefix}/icons/s-x.png`)}" alt="X" width="16" height="16" border="0" style="vertical-align:middle;"></a>
              <a href="${sanitizeUrl(p.booking && p.booking.url)}" style="font-size:12px; font-weight:600; color:#2563eb; text-decoration:none; vertical-align:middle; margin-left:2px;">${escapeHtml(p.booking && p.booking.label || 'Book a call →')}</a>
            </div>
          </td>
          <!-- Vertical Accent Divider -->
          <td style="vertical-align:middle; width:1px; background:#e2e8f0; font-size:0; line-height:0; padding:0 0;">&nbsp;</td>
          <!-- Contact Details Column -->
          <td style="vertical-align:middle; padding-left:16px;">
            <table cellpadding="0" cellspacing="0" border="0" style="font-size:12.5px; line-height:1.65; color:#475569;">
              <tr>
                <td style="padding:2px 0; white-space:nowrap;">
                  <img src="${sanitizeImageSrc(`${assetPrefix}/icons/i-mail.png`)}" alt="" width="14" height="14" style="width:14px; height:14px; vertical-align:-2px; margin-right:6px;">
                  <a href="${sanitizeUrl(`mailto:${p.email}`)}" style="color:#0f172a; text-decoration:none; font-weight:500;">${escapeHtml(p.email)}</a>
                </td>
              </tr>
              <tr>
                <td style="padding:2px 0; white-space:nowrap;">
                  <img src="${sanitizeImageSrc(`${assetPrefix}/icons/i-phone.png`)}" alt="" width="14" height="14" style="width:14px; height:14px; vertical-align:-2px; margin-right:6px;">
                  <a href="${sanitizeUrl(p.whatsapp || `tel:${String(p.phone||'').replace(/[^0-9+]/g, '')}`)}" style="color:#475569; text-decoration:none;">${escapeHtml(p.phone)}</a>
                </td>
              </tr>
              <tr>
                <td style="padding:2px 0; white-space:nowrap;">
                  <img src="${sanitizeImageSrc(`${assetPrefix}/icons/i-globe.png`)}" alt="" width="14" height="14" style="width:14px; height:14px; vertical-align:-2px; margin-right:6px;">
                  <a href="${sanitizeUrl(p.website)}" style="color:#2563eb; text-decoration:none;">${escapeHtml(p.websiteDisplay || p.website)}</a>
                </td>
              </tr>
              <tr>
                <td style="padding:2px 0; white-space:nowrap;">
                  <img src="${sanitizeImageSrc(`${assetPrefix}/icons/i-map-pin.png`)}" alt="" width="14" height="14" style="width:14px; height:14px; vertical-align:-2px; margin-right:6px;">
                  <span>${escapeHtml(p.location)}</span>
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

  function renderSignatureF(p, opts = {}) {
    const assetPrefix = opts.assetPrefix || '../assets';
    const photo = sanitizeImageSrc(p.images && p.images.photo || `${assetPrefix}/images/photo.png`);
    return `<!-- SIGNATURE-START -->
<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,Helvetica,sans-serif; max-width:580px; background:#ffffff; border:1px solid #e2e8f0; border-radius:12px; color:#0f172a;">
  <tr>
    <td style="padding:20px 24px;">
      <table cellpadding="0" cellspacing="0" border="0">
        <tr>
          <!-- Photo Avatar -->
          <td style="vertical-align:middle; padding-right:18px;">
            <img src="${photo}" alt="${escapeHtml(p.name)}" width="82" height="108" style="display:block; width:82px; height:108px; border-radius:10px; border:1px solid #cbd5e1; object-fit:cover;">
          </td>
          <!-- Vertical Divider -->
          <td style="vertical-align:middle; width:1px; background:#e2e8f0; font-size:0; line-height:0;">&nbsp;</td>
          <!-- Details Column -->
          <td style="vertical-align:middle; padding-left:18px;">
            <div style="font-size:16.5px; font-weight:700; color:#0f172a; line-height:1.25; letter-spacing:0.1px;">${escapeHtml(p.name)}</div>
            <div style="font-size:12.5px; font-weight:600; color:#2563eb; line-height:1.4; margin-top:2px;">${escapeHtml(p.title)}</div>
            <div style="font-size:12px; color:#475569; line-height:1.65; margin-top:8px;">
              <a href="${sanitizeUrl(`mailto:${p.email}`)}" style="color:#0f172a; text-decoration:none; font-weight:500;">${escapeHtml(p.email)}</a>
              <span style="color:#cbd5e1;">&nbsp;&middot;&nbsp;</span>
              <a href="${sanitizeUrl(`tel:${String(p.phone||'').replace(/[^0-9+]/g, '')}`)}" style="color:#475569; text-decoration:none;">${escapeHtml(p.phone)}</a>
            </div>
            <div style="font-size:12px; color:#475569; line-height:1.65;">
              <a href="${sanitizeUrl(p.website)}" style="color:#2563eb; text-decoration:none;">${escapeHtml(p.websiteDisplay || p.website)}</a>
              <span style="color:#cbd5e1;">&nbsp;&middot;&nbsp;</span>
              <span>${escapeHtml(p.location)}</span>
            </div>
            <div style="margin-top:8px; line-height:1; white-space:nowrap;">
              <a href="${sanitizeUrl(p.socials && p.socials.linkedin)}" style="text-decoration:none; vertical-align:middle;"><img src="${sanitizeImageSrc(`${assetPrefix}/icons/s-linkedin.png`)}" alt="LinkedIn" width="18" height="18" border="0" style="vertical-align:middle;"></a>
              <span style="font-size:12px; color:#cbd5e1; vertical-align:middle;">&nbsp;&nbsp;</span>
              <a href="${sanitizeUrl(p.socials && p.socials.github)}" style="text-decoration:none; vertical-align:middle;"><img src="${sanitizeImageSrc(`${assetPrefix}/icons/s-github.png`)}" alt="GitHub" width="18" height="18" border="0" style="vertical-align:middle;"></a>
              <span style="font-size:12px; color:#cbd5e1; vertical-align:middle;">&nbsp;&nbsp;</span>
              <a href="${sanitizeUrl(p.socials && p.socials.x)}" style="text-decoration:none; vertical-align:middle;"><img src="${sanitizeImageSrc(`${assetPrefix}/icons/s-x.png`)}" alt="X" width="16" height="16" border="0" style="vertical-align:middle;"></a>
              <span style="font-size:12px; color:#cbd5e1; vertical-align:middle;">&nbsp;&nbsp;&middot;&nbsp;&nbsp;</span>
              <a href="${sanitizeUrl(p.booking && p.booking.url)}" style="font-size:12px; font-weight:600; color:#2563eb; text-decoration:none; vertical-align:middle;">${escapeHtml(p.booking && p.booking.label || 'Book a call →')}</a>
            </div>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
<!-- SIGNATURE-END -->`;
  }

  function renderSignatureG(p, opts = {}) {
    const assetPrefix = opts.assetPrefix || '../assets';
    const photo = sanitizeImageSrc(p.images && p.images.photo || `${assetPrefix}/images/photo.png`);
    return `<!-- SIGNATURE-START -->
<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,Helvetica,sans-serif; max-width:580px; color:#0f172a;">
  <tr>
    <td style="padding-bottom:10px;">
      <table cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="background:#2563eb; color:#ffffff; font-size:10.5px; font-weight:700; text-transform:uppercase; letter-spacing:0.8px; padding:3px 8px; border-radius:4px;">Verified Pro</td>
          <td style="padding-left:8px; font-size:11px; color:#64748b;">Digital Signature Suite</td>
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
            <img src="${photo}" alt="${escapeHtml(p.name)}" width="84" height="84" style="display:block; width:84px; height:84px; border-radius:50%; border:2px solid #2563eb; object-fit:cover;">
          </td>
          <!-- Content Stack -->
          <td style="vertical-align:middle;">
            <div style="font-size:17px; font-weight:700; color:#0f172a; line-height:1.2;">${escapeHtml(p.name)} <span style="font-weight:400; font-size:13px; color:#64748b;">(${escapeHtml(p.pronouns)})</span></div>
            <div style="font-size:12.5px; font-weight:600; color:#2563eb; line-height:1.4; margin-top:2px;">${escapeHtml(p.title)}</div>
            <div style="font-size:12px; color:#334155; line-height:1.65; margin-top:6px;">
              <a href="${sanitizeUrl(`mailto:${p.email}`)}" style="color:#0f172a; text-decoration:none; font-weight:500;">${escapeHtml(p.email)}</a>
              <span style="color:#cbd5e1;">&nbsp;&middot;&nbsp;</span>
              <a href="${sanitizeUrl(p.website)}" style="color:#2563eb; text-decoration:none;">${escapeHtml(p.websiteDisplay || p.website)}</a>
              <span style="color:#cbd5e1;">&nbsp;&middot;&nbsp;</span>
              <span>${escapeHtml(p.location)}</span>
            </div>
            <div style="margin-top:8px; line-height:1; white-space:nowrap;">
              <a href="${sanitizeUrl(p.socials && p.socials.linkedin)}" style="text-decoration:none; vertical-align:middle;"><img src="${sanitizeImageSrc(`${assetPrefix}/icons/s-linkedin.png`)}" alt="LinkedIn" width="17" height="17" border="0" style="vertical-align:middle;"></a>
              <span style="font-size:12px; color:#cbd5e1; vertical-align:middle;">&nbsp;&nbsp;</span>
              <a href="${sanitizeUrl(p.socials && p.socials.github)}" style="text-decoration:none; vertical-align:middle;"><img src="${sanitizeImageSrc(`${assetPrefix}/icons/s-github.png`)}" alt="GitHub" width="17" height="17" border="0" style="vertical-align:middle;"></a>
              <span style="font-size:12px; color:#cbd5e1; vertical-align:middle;">&nbsp;&nbsp;</span>
              <a href="${sanitizeUrl(p.socials && p.socials.x)}" style="text-decoration:none; vertical-align:middle;"><img src="${sanitizeImageSrc(`${assetPrefix}/icons/s-x.png`)}" alt="X" width="15" height="15" border="0" style="vertical-align:middle;"></a>
              <span style="font-size:12px; color:#cbd5e1; vertical-align:middle;">&nbsp;&nbsp;&middot;&nbsp;&nbsp;</span>
              <a href="${sanitizeUrl(p.booking && p.booking.url)}" style="font-size:12px; font-weight:600; color:#2563eb; text-decoration:none; vertical-align:middle;">${escapeHtml(p.booking && p.booking.label || 'Book a call →')}</a>
            </div>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
<!-- SIGNATURE-END -->`;
  }

  function renderSignatureH(p, opts = {}) {
    const assetPrefix = opts.assetPrefix || '../assets';
    const photo = photoSrc(p, assetPrefix);
    return `<!-- SIGNATURE-START -->
<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,Helvetica,sans-serif; width:560px; max-width:560px; color:#111827;">
  <tr>
    <td style="border-top:1px solid #e5e7eb; font-size:0; line-height:0; padding-bottom:12px;">&nbsp;</td>
  </tr>
  <tr>
    <td>
      <table cellpadding="0" cellspacing="0" border="0" width="100%">
        <tr>
          <td style="vertical-align:middle;">
            <div style="font-size:22px; font-weight:800; color:#111827; line-height:1.2;">${escapeHtml(p.name)}</div>
          </td>
          <td style="vertical-align:middle; text-align:right;">
            <img src="${photo}" alt="${escapeHtml(p.name)}" width="56" height="56" style="display:inline-block; width:56px; height:56px; border-radius:50%; object-fit:cover;">
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td style="border-top:1px solid #e5e7eb; font-size:0; line-height:0; padding-top:10px;">&nbsp;</td>
  </tr>
  <tr>
    <td>
      <table cellpadding="0" cellspacing="0" border="0" style="font-size:12.5px; color:#374151; line-height:1.6;">
        <tr>
          <td style="padding-right:8px; vertical-align:middle;">
            <img src="${sanitizeImageSrc(`${assetPrefix}/icons/i-mail.png`)}" alt="" width="14" height="14" style="width:14px; height:14px; vertical-align:-2px;">
            <a href="${sanitizeUrl(`mailto:${p.email}`)}" style="color:#374151; text-decoration:none;">${escapeHtml(p.email)}</a>
          </td>
          <td style="padding:0 8px; border-left:1px solid #e5e7eb; vertical-align:middle;">
            <img src="${sanitizeImageSrc(`${assetPrefix}/icons/i-phone.png`)}" alt="" width="14" height="14" style="width:14px; height:14px; vertical-align:-2px;">
            <a href="${sanitizeUrl(`tel:${String(p.phone||'').replace(/[^0-9+]/g, '')}`)}" style="color:#374151; text-decoration:none;">${escapeHtml(p.phone)}</a>
          </td>
          <td style="padding:0 8px; border-left:1px solid #e5e7eb; vertical-align:middle;">
            <img src="${sanitizeImageSrc(`${assetPrefix}/icons/i-globe.png`)}" alt="" width="14" height="14" style="width:14px; height:14px; vertical-align:-2px;">
            <a href="${sanitizeUrl(p.website)}" style="color:#2563eb; text-decoration:none;">${escapeHtml(p.websiteDisplay || p.website)}</a>
          </td>
          <td style="padding-left:8px; border-left:1px solid #e5e7eb; vertical-align:middle;">
            <img src="${sanitizeImageSrc(`${assetPrefix}/icons/i-map-pin.png`)}" alt="" width="14" height="14" style="width:14px; height:14px; vertical-align:-2px;">
            <span>${escapeHtml(p.location)}</span>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td style="padding-top:8px;">
      <div style="font-size:12px; color:#6b7280; line-height:1.7;">
        <a href="${sanitizeUrl(p.socials && p.socials.linkedin)}" style="color:#6b7280; text-decoration:none;">LinkedIn</a>
        <span style="color:#d1d5db;">&nbsp;&middot;&nbsp;</span>
        <a href="${sanitizeUrl(p.socials && p.socials.github)}" style="color:#6b7280; text-decoration:none;">GitHub</a>
        <span style="color:#d1d5db;">&nbsp;&middot;&nbsp;</span>
        <a href="${sanitizeUrl(p.socials && p.socials.x)}" style="color:#6b7280; text-decoration:none;">X</a>
      </div>
    </td>
  </tr>
</table>
<!-- SIGNATURE-END -->`;
  }

  function renderSignatureI(p, opts = {}) {
    const assetPrefix = opts.assetPrefix || '../assets';
    const photo = photoSrc(p, assetPrefix);
    return `<!-- SIGNATURE-START -->
<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,Helvetica,sans-serif; width:560px; max-width:560px; color:#111827;">
  <tr>
    <td>
      <table cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="vertical-align:middle; padding-right:16px;">
            <img src="${photo}" alt="${escapeHtml(p.name)}" width="72" height="72" style="display:block; width:72px; height:72px; border-radius:50%; object-fit:cover;">
          </td>
          <td style="vertical-align:middle;">
            <div style="font-size:17px; font-weight:700; color:#111827; line-height:1.25;">${escapeHtml(p.name)}</div>
            <div style="font-size:12px; font-weight:500; color:#6b7280; line-height:1.4; margin-top:2px;">${escapeHtml(p.title)}</div>
            <div style="margin-top:10px; line-height:2;">
              <span style="display:inline-block; background:#f1f5f9; border-radius:20px; padding:3px 10px; font-size:12px; color:#334155; margin-right:6px; margin-bottom:4px;">
                <img src="${sanitizeImageSrc(`${assetPrefix}/icons/i-mail.png`)}" alt="" width="13" height="13" style="width:13px; height:13px; vertical-align:-2px; margin-right:4px;">
                <a href="${sanitizeUrl(`mailto:${p.email}`)}" style="color:#334155; text-decoration:none;">${escapeHtml(p.email)}</a>
              </span>
              <span style="display:inline-block; background:#f1f5f9; border-radius:20px; padding:3px 10px; font-size:12px; color:#334155; margin-right:6px; margin-bottom:4px;">
                <img src="${sanitizeImageSrc(`${assetPrefix}/icons/i-phone.png`)}" alt="" width="13" height="13" style="width:13px; height:13px; vertical-align:-2px; margin-right:4px;">
                <a href="${sanitizeUrl(`tel:${String(p.phone||'').replace(/[^0-9+]/g, '')}`)}" style="color:#334155; text-decoration:none;">${escapeHtml(p.phone)}</a>
              </span>
              <span style="display:inline-block; background:#f1f5f9; border-radius:20px; padding:3px 10px; font-size:12px; color:#334155; margin-right:6px; margin-bottom:4px;">
                <img src="${sanitizeImageSrc(`${assetPrefix}/icons/i-globe.png`)}" alt="" width="13" height="13" style="width:13px; height:13px; vertical-align:-2px; margin-right:4px;">
                <a href="${sanitizeUrl(p.website)}" style="color:#2563eb; text-decoration:none;">${escapeHtml(p.websiteDisplay || p.website)}</a>
              </span>
              <span style="display:inline-block; background:#f1f5f9; border-radius:20px; padding:3px 10px; font-size:12px; color:#334155; margin-bottom:4px;">
                <img src="${sanitizeImageSrc(`${assetPrefix}/icons/i-map-pin.png`)}" alt="" width="13" height="13" style="width:13px; height:13px; vertical-align:-2px; margin-right:4px;">
                <span>${escapeHtml(p.location)}</span>
              </span>
            </div>
            <div style="margin-top:6px; line-height:1;">
              <a href="${sanitizeUrl(p.socials && p.socials.linkedin)}" style="text-decoration:none; vertical-align:middle;"><img src="${sanitizeImageSrc(`${assetPrefix}/icons/s-linkedin.png`)}" alt="LinkedIn" width="18" height="18" border="0" style="vertical-align:middle;"></a>
              <span style="font-size:12px; color:#d1d5db; vertical-align:middle;">&nbsp;&nbsp;</span>
              <a href="${sanitizeUrl(p.socials && p.socials.github)}" style="text-decoration:none; vertical-align:middle;"><img src="${sanitizeImageSrc(`${assetPrefix}/icons/s-github.png`)}" alt="GitHub" width="18" height="18" border="0" style="vertical-align:middle;"></a>
              <span style="font-size:12px; color:#d1d5db; vertical-align:middle;">&nbsp;&nbsp;</span>
              <a href="${sanitizeUrl(p.socials && p.socials.x)}" style="text-decoration:none; vertical-align:middle;"><img src="${sanitizeImageSrc(`${assetPrefix}/icons/s-x.png`)}" alt="X" width="16" height="16" border="0" style="vertical-align:middle;"></a>
              <span style="font-size:12px; color:#d1d5db; vertical-align:middle;">&nbsp;&nbsp;&middot;&nbsp;&nbsp;</span>
              <a href="${sanitizeUrl(p.booking && p.booking.url)}" style="font-size:12.5px; font-weight:600; color:#2563eb; text-decoration:none; vertical-align:middle;">${escapeHtml(p.booking && p.booking.label || 'Book a call →')}</a>
            </div>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
<!-- SIGNATURE-END -->`;
  }

  function renderSignatureJ(p, opts = {}) {
    return `<!-- SIGNATURE-START -->
<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,Helvetica,sans-serif; width:560px; max-width:560px; color:#111827;">
  <tr>
    <td>
      <div style="font-size:18px; font-weight:700; color:#111827; line-height:1.3;">${escapeHtml(p.name)}</div>
      <div style="display:inline-block; width:32px; height:3px; background:#2563eb; border-radius:2px; margin-top:6px;"></div>
      <div style="font-size:12px; font-weight:500; color:#6b7280; line-height:1.4; margin-top:6px;">${escapeHtml(p.title)}</div>
    </td>
  </tr>
  <tr>
    <td style="padding-top:14px;">
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="font-size:12px; color:#374151;">
        <tr>
          <td style="vertical-align:top; padding-right:16px; width:25%;">
            <div style="font-size:9px; font-weight:700; text-transform:uppercase; letter-spacing:1.2px; color:#9ca3af; line-height:1; padding-bottom:4px;">EMAIL</div>
            <a href="${sanitizeUrl(`mailto:${p.email}`)}" style="color:#374151; text-decoration:none; line-height:1.6;">${escapeHtml(p.email)}</a>
          </td>
          <td style="vertical-align:top; padding-right:16px; width:25%;">
            <div style="font-size:9px; font-weight:700; text-transform:uppercase; letter-spacing:1.2px; color:#9ca3af; line-height:1; padding-bottom:4px;">PHONE</div>
            <a href="${sanitizeUrl(`tel:${String(p.phone||'').replace(/[^0-9+]/g, '')}`)}" style="color:#374151; text-decoration:none; line-height:1.6;">${escapeHtml(p.phone)}</a>
          </td>
          <td style="vertical-align:top; padding-right:16px; width:25%;">
            <div style="font-size:9px; font-weight:700; text-transform:uppercase; letter-spacing:1.2px; color:#9ca3af; line-height:1; padding-bottom:4px;">WEB</div>
            <a href="${sanitizeUrl(p.website)}" style="color:#2563eb; text-decoration:none; line-height:1.6;">${escapeHtml(p.websiteDisplay || p.website)}</a>
          </td>
          <td style="vertical-align:top; width:25%;">
            <div style="font-size:9px; font-weight:700; text-transform:uppercase; letter-spacing:1.2px; color:#9ca3af; line-height:1; padding-bottom:4px;">LOCATION</div>
            <span style="line-height:1.6;">${escapeHtml(p.location)}</span>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td style="border-top:1px solid #e5e7eb; padding-top:8px; margin-top:10px;">
      <div style="font-size:12px; color:#6b7280; line-height:1.7; padding-top:4px;">
        <a href="${sanitizeUrl(p.socials && p.socials.linkedin)}" style="color:#6b7280; text-decoration:none;">LinkedIn</a>
        <span style="color:#d1d5db;">&nbsp;&middot;&nbsp;</span>
        <a href="${sanitizeUrl(p.socials && p.socials.github)}" style="color:#6b7280; text-decoration:none;">GitHub</a>
        <span style="color:#d1d5db;">&nbsp;&middot;&nbsp;</span>
        <a href="${sanitizeUrl(p.socials && p.socials.x)}" style="color:#6b7280; text-decoration:none;">X</a>
      </div>
    </td>
  </tr>
</table>
<!-- SIGNATURE-END -->`;
  }

  function renderSignatureK(p, opts = {}) {
    const assetPrefix = opts.assetPrefix || '../assets';
    const photo = photoSrc(p, assetPrefix);
    return `<!-- SIGNATURE-START -->
<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,Helvetica,sans-serif; width:560px; max-width:560px; background:#ffffff; border:1px solid #e2e8f0; border-radius:14px; color:#111827;">
  <tr>
    <td style="padding:20px 24px;">
      <table cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="vertical-align:middle; padding-right:18px;">
            <img src="${photo}" alt="${escapeHtml(p.name)}" width="68" height="68" style="display:block; width:68px; height:68px; border-radius:12px; object-fit:cover;">
          </td>
          <td style="vertical-align:middle;">
            <div style="font-size:16px; font-weight:700; color:#111827; line-height:1.25;">${escapeHtml(p.name)}</div>
            <div style="font-size:12px; font-weight:500; color:#6b7280; line-height:1.4; margin-top:2px;">${escapeHtml(p.title)}</div>
          </td>
        </tr>
      </table>
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top:14px; font-size:12.5px; color:#374151;">
        <tr>
          <td style="padding:6px 12px 6px 0; vertical-align:middle; width:50%;">
            <img src="${sanitizeImageSrc(`${assetPrefix}/icons/i-mail.png`)}" alt="" width="14" height="14" style="width:14px; height:14px; vertical-align:-2px; margin-right:6px;">
            <a href="${sanitizeUrl(`mailto:${p.email}`)}" style="color:#374151; text-decoration:none;">${escapeHtml(p.email)}</a>
          </td>
          <td style="padding:6px 0 6px 12px; vertical-align:middle; width:50%;">
            <img src="${sanitizeImageSrc(`${assetPrefix}/icons/i-phone.png`)}" alt="" width="14" height="14" style="width:14px; height:14px; vertical-align:-2px; margin-right:6px;">
            <a href="${sanitizeUrl(`tel:${String(p.phone||'').replace(/[^0-9+]/g, '')}`)}" style="color:#374151; text-decoration:none;">${escapeHtml(p.phone)}</a>
          </td>
        </tr>
        <tr>
          <td style="padding:6px 12px 6px 0; vertical-align:middle; width:50%;">
            <img src="${sanitizeImageSrc(`${assetPrefix}/icons/i-globe.png`)}" alt="" width="14" height="14" style="width:14px; height:14px; vertical-align:-2px; margin-right:6px;">
            <a href="${sanitizeUrl(p.website)}" style="color:#2563eb; text-decoration:none;">${escapeHtml(p.websiteDisplay || p.website)}</a>
          </td>
          <td style="padding:6px 0 6px 12px; vertical-align:middle; width:50%;">
            <img src="${sanitizeImageSrc(`${assetPrefix}/icons/i-map-pin.png`)}" alt="" width="14" height="14" style="width:14px; height:14px; vertical-align:-2px; margin-right:6px;">
            <span>${escapeHtml(p.location)}</span>
          </td>
        </tr>
      </table>
      <div style="margin-top:12px; line-height:1;">
        <a href="${sanitizeUrl(p.socials && p.socials.linkedin)}" style="text-decoration:none; vertical-align:middle;"><img src="${sanitizeImageSrc(`${assetPrefix}/icons/s-linkedin.png`)}" alt="LinkedIn" width="18" height="18" border="0" style="vertical-align:middle;"></a>
        <span style="font-size:12px; color:#d1d5db; vertical-align:middle;">&nbsp;&nbsp;</span>
        <a href="${sanitizeUrl(p.socials && p.socials.github)}" style="text-decoration:none; vertical-align:middle;"><img src="${sanitizeImageSrc(`${assetPrefix}/icons/s-github.png`)}" alt="GitHub" width="18" height="18" border="0" style="vertical-align:middle;"></a>
        <span style="font-size:12px; color:#d1d5db; vertical-align:middle;">&nbsp;&nbsp;</span>
        <a href="${sanitizeUrl(p.socials && p.socials.x)}" style="text-decoration:none; vertical-align:middle;"><img src="${sanitizeImageSrc(`${assetPrefix}/icons/s-x.png`)}" alt="X" width="16" height="16" border="0" style="vertical-align:middle;"></a>
        <span style="font-size:12px; color:#d1d5db; vertical-align:middle;">&nbsp;&nbsp;&middot;&nbsp;&nbsp;</span>
        <a href="${sanitizeUrl(p.booking && p.booking.url)}" style="font-size:12.5px; font-weight:600; color:#2563eb; text-decoration:none; vertical-align:middle;">${escapeHtml(p.booking && p.booking.label || 'Book a call →')}</a>
      </div>
    </td>
  </tr>
</table>
<!-- SIGNATURE-END -->`;
  }

  function renderSignatureL(p) {
    return `<!-- SIGNATURE-START -->
<table cellpadding="0" cellspacing="0" border="0" style="font-family:Georgia,'Times New Roman',serif; max-width:560px; color:#111827; text-align:center;" align="center">
  <tr>
    <td style="text-align:center;">
      <div style="font-size:20px; font-weight:700; color:#111827; line-height:1.3; font-family:Georgia,'Times New Roman',serif;">${escapeHtml(p.name)}</div>
      <div style="font-size:11px; font-weight:600; text-transform:uppercase; letter-spacing:2px; color:#6b7280; line-height:1.4; margin-top:4px;">${escapeHtml(p.title)}</div>
      <div style="display:inline-block; width:32px; height:2px; background:#2563eb; border-radius:1px; margin-top:10px;"></div>
    </td>
  </tr>
  <tr>
    <td style="padding-top:12px; text-align:center; font-size:12.5px; color:#374151; line-height:1.7;">
      <a href="${sanitizeUrl(`mailto:${p.email}`)}" style="color:#374151; text-decoration:none;">${escapeHtml(p.email)}</a>
      <span style="color:#d1d5db;">&nbsp;&middot;&nbsp;</span>
      <a href="${sanitizeUrl(`tel:${String(p.phone||'').replace(/[^0-9+]/g, '')}`)}" style="color:#374151; text-decoration:none;">${escapeHtml(p.phone)}</a>
    </td>
  </tr>
  <tr>
    <td style="text-align:center; font-size:12.5px; color:#374151; line-height:1.7;">
      <a href="${sanitizeUrl(p.website)}" style="color:#2563eb; text-decoration:none;">${escapeHtml(p.websiteDisplay || p.website)}</a>
      <span style="color:#d1d5db;">&nbsp;&middot;&nbsp;</span>
      <span>${escapeHtml(p.location)}</span>
    </td>
  </tr>
  <tr>
    <td style="padding-top:8px; text-align:center;">
      <div style="font-size:12px; color:#6b7280; line-height:1.7;">
        <a href="${sanitizeUrl(p.socials && p.socials.linkedin)}" style="color:#6b7280; text-decoration:none;">LinkedIn</a>
        <span style="color:#d1d5db;">&nbsp;&middot;&nbsp;</span>
        <a href="${sanitizeUrl(p.socials && p.socials.github)}" style="color:#6b7280; text-decoration:none;">GitHub</a>
        <span style="color:#d1d5db;">&nbsp;&middot;&nbsp;</span>
        <a href="${sanitizeUrl(p.socials && p.socials.x)}" style="color:#6b7280; text-decoration:none;">X</a>
      </div>
    </td>
  </tr>
</table>
<!-- SIGNATURE-END -->`;
  }

  function renderSignatureM(p, opts = {}) {
    const assetPrefix = opts.assetPrefix || '../assets';
    const photo = photoSrc(p, assetPrefix);
    const heading = escapeHtml(p.tagline || 'Get in touch');
    return `<!-- SIGNATURE-START -->
<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,Helvetica,sans-serif; width:580px; max-width:580px; border-radius:14px; overflow:hidden;">
  <tr>
    <td style="background:#0f1727; padding:24px 20px; vertical-align:middle; text-align:center; width:180px;">
      <img src="${photo}" alt="${escapeHtml(p.name)}" width="72" height="72" style="display:block; width:72px; height:72px; border-radius:50%; object-fit:cover; margin:0 auto; border:2px solid #1e293b;">
      <div style="font-size:15px; font-weight:700; color:#ffffff; line-height:1.3; margin-top:10px;">${escapeHtml(p.name)}</div>
      <div style="font-size:11px; color:#94a3b8; line-height:1.4; margin-top:2px;">${escapeHtml(p.title)}</div>
    </td>
    <td style="background:#ffffff; padding:20px 24px; vertical-align:top; color:#111827;">
      <div style="font-size:14px; font-weight:700; color:#111827; line-height:1.3; margin-bottom:12px;">${heading}</div>
      <table cellpadding="0" cellspacing="0" border="0" style="font-size:12.5px; color:#374151; line-height:1.65;">
        <tr>
          <td style="padding:3px 0;">
            <img src="${sanitizeImageSrc(`${assetPrefix}/icons/i-mail.png`)}" alt="" width="14" height="14" style="width:14px; height:14px; vertical-align:-2px; margin-right:6px;">
            <a href="${sanitizeUrl(`mailto:${p.email}`)}" style="color:#374151; text-decoration:none;">${escapeHtml(p.email)}</a>
          </td>
        </tr>
        <tr>
          <td style="padding:3px 0;">
            <img src="${sanitizeImageSrc(`${assetPrefix}/icons/i-phone.png`)}" alt="" width="14" height="14" style="width:14px; height:14px; vertical-align:-2px; margin-right:6px;">
            <a href="${sanitizeUrl(`tel:${String(p.phone||'').replace(/[^0-9+]/g, '')}`)}" style="color:#374151; text-decoration:none;">${escapeHtml(p.phone)}</a>
          </td>
        </tr>
        <tr>
          <td style="padding:3px 0;">
            <img src="${sanitizeImageSrc(`${assetPrefix}/icons/i-globe.png`)}" alt="" width="14" height="14" style="width:14px; height:14px; vertical-align:-2px; margin-right:6px;">
            <a href="${sanitizeUrl(p.website)}" style="color:#2563eb; text-decoration:none;">${escapeHtml(p.websiteDisplay || p.website)}</a>
          </td>
        </tr>
        <tr>
          <td style="padding:3px 0;">
            <img src="${sanitizeImageSrc(`${assetPrefix}/icons/i-map-pin.png`)}" alt="" width="14" height="14" style="width:14px; height:14px; vertical-align:-2px; margin-right:6px;">
            <span>${escapeHtml(p.location)}</span>
          </td>
        </tr>
      </table>
      <div style="margin-top:10px; line-height:1;">
        <a href="${sanitizeUrl(p.socials && p.socials.linkedin)}" style="text-decoration:none; vertical-align:middle;"><img src="${sanitizeImageSrc(`${assetPrefix}/icons/s-linkedin.png`)}" alt="LinkedIn" width="17" height="17" border="0" style="vertical-align:middle;"></a>
        <span style="font-size:12px; color:#d1d5db; vertical-align:middle;">&nbsp;&nbsp;</span>
        <a href="${sanitizeUrl(p.socials && p.socials.github)}" style="text-decoration:none; vertical-align:middle;"><img src="${sanitizeImageSrc(`${assetPrefix}/icons/s-github.png`)}" alt="GitHub" width="17" height="17" border="0" style="vertical-align:middle;"></a>
        <span style="font-size:12px; color:#d1d5db; vertical-align:middle;">&nbsp;&nbsp;</span>
        <a href="${sanitizeUrl(p.socials && p.socials.x)}" style="text-decoration:none; vertical-align:middle;"><img src="${sanitizeImageSrc(`${assetPrefix}/icons/s-x.png`)}" alt="X" width="15" height="15" border="0" style="vertical-align:middle;"></a>
        <span style="font-size:12px; color:#d1d5db; vertical-align:middle;">&nbsp;&nbsp;&middot;&nbsp;&nbsp;</span>
        <a href="${sanitizeUrl(p.booking && p.booking.url)}" style="font-size:12px; font-weight:600; color:#2563eb; text-decoration:none; vertical-align:middle;">${escapeHtml(p.booking && p.booking.label || 'Book a call →')}</a>
      </div>
    </td>
  </tr>
</table>
<!-- SIGNATURE-END -->`;
  }

  function renderSignatureN(p, opts = {}) {
    const assetPrefix = opts.assetPrefix || '../assets';
    const photo = photoSrc(p, assetPrefix);
    return `<!-- SIGNATURE-START -->
<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,Helvetica,sans-serif; width:560px; max-width:560px; background:#ffffff; border:1px solid #e2e8f0; border-radius:14px; color:#111827;">
  <tr>
    <td style="padding:20px 24px;">
      <table cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="vertical-align:middle; padding-right:16px;">
            <img src="${photo}" alt="${escapeHtml(p.name)}" width="64" height="64" style="display:block; width:64px; height:64px; border-radius:50%; object-fit:cover;">
          </td>
          <td style="vertical-align:middle;">
            <div style="font-size:16px; font-weight:700; color:#111827; line-height:1.25;">${escapeHtml(p.name)}</div>
            <div style="font-size:12px; font-weight:500; color:#6b7280; line-height:1.4; margin-top:2px;">${escapeHtml(p.title)}</div>
          </td>
        </tr>
      </table>
      <table cellpadding="0" cellspacing="0" border="0" style="margin-top:14px; font-size:12.5px; color:#374151; line-height:1.65;">
        <tr>
          <td style="padding:2px 0;">
            <img src="${sanitizeImageSrc(`${assetPrefix}/icons/i-mail.png`)}" alt="" width="14" height="14" style="width:14px; height:14px; vertical-align:-2px; margin-right:6px;">
            <a href="${sanitizeUrl(`mailto:${p.email}`)}" style="color:#374151; text-decoration:none;">${escapeHtml(p.email)}</a>
            <span style="color:#d1d5db;">&nbsp;&middot;&nbsp;</span>
            <img src="${sanitizeImageSrc(`${assetPrefix}/icons/i-phone.png`)}" alt="" width="14" height="14" style="width:14px; height:14px; vertical-align:-2px; margin-right:6px;">
            <a href="${sanitizeUrl(`tel:${String(p.phone||'').replace(/[^0-9+]/g, '')}`)}" style="color:#374151; text-decoration:none;">${escapeHtml(p.phone)}</a>
          </td>
        </tr>
        <tr>
          <td style="padding:2px 0;">
            <img src="${sanitizeImageSrc(`${assetPrefix}/icons/i-globe.png`)}" alt="" width="14" height="14" style="width:14px; height:14px; vertical-align:-2px; margin-right:6px;">
            <a href="${sanitizeUrl(p.website)}" style="color:#2563eb; text-decoration:none;">${escapeHtml(p.websiteDisplay || p.website)}</a>
            <span style="color:#d1d5db;">&nbsp;&middot;&nbsp;</span>
            <img src="${sanitizeImageSrc(`${assetPrefix}/icons/i-map-pin.png`)}" alt="" width="14" height="14" style="width:14px; height:14px; vertical-align:-2px; margin-right:6px;">
            <span>${escapeHtml(p.location)}</span>
          </td>
        </tr>
      </table>
      <div style="margin-top:12px; line-height:1;">
        <a href="${sanitizeUrl(p.socials && p.socials.linkedin)}" style="text-decoration:none; vertical-align:middle;"><img src="${sanitizeImageSrc(`${assetPrefix}/icons/s-linkedin.png`)}" alt="LinkedIn" width="18" height="18" border="0" style="vertical-align:middle;"></a>
        <span style="font-size:12px; color:#d1d5db; vertical-align:middle;">&nbsp;&nbsp;</span>
        <a href="${sanitizeUrl(p.socials && p.socials.github)}" style="text-decoration:none; vertical-align:middle;"><img src="${sanitizeImageSrc(`${assetPrefix}/icons/s-github.png`)}" alt="GitHub" width="18" height="18" border="0" style="vertical-align:middle;"></a>
        <span style="font-size:12px; color:#d1d5db; vertical-align:middle;">&nbsp;&nbsp;</span>
        <a href="${sanitizeUrl(p.socials && p.socials.x)}" style="text-decoration:none; vertical-align:middle;"><img src="${sanitizeImageSrc(`${assetPrefix}/icons/s-x.png`)}" alt="X" width="16" height="16" border="0" style="vertical-align:middle;"></a>
      </div>
      <div style="margin-top:14px; text-align:right;">
        <a href="${sanitizeUrl(p.booking && p.booking.url)}" style="display:inline-block; background:#111827; color:#ffffff; font-size:12px; font-weight:600; padding:8px 18px; border-radius:20px; text-decoration:none;">${escapeHtml(p.booking && p.booking.label || 'Book a call →')}</a>
      </div>
    </td>
  </tr>
</table>
<!-- SIGNATURE-END -->`;
  }

  function renderSignatureO(p, opts = {}) {
    const assetPrefix = opts.assetPrefix || '../assets';
    return `<!-- SIGNATURE-START -->
<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,Helvetica,sans-serif; width:560px; max-width:560px; color:#111827;">
  <tr>
    <td style="width:4px; background-color:#2563eb; background-image:linear-gradient(180deg,#3b82f6,#7c3aed); border-radius:2px; font-size:0; line-height:0;" width="4">&nbsp;</td>
    <td style="padding-left:16px;">
      <div style="font-size:17px; font-weight:700; color:#111827; line-height:1.25;">${escapeHtml(p.name)}</div>
      <div style="font-size:12px; font-weight:500; color:#6b7280; line-height:1.4; margin-top:2px;">${escapeHtml(p.title)}</div>
      <div style="border-top:1px solid #e5e7eb; margin-top:10px; padding-top:10px;">
        <table cellpadding="0" cellspacing="0" border="0" style="font-size:12.5px; color:#374151; line-height:1.65;">
          <tr>
            <td style="padding:2px 0;">
              <img src="${sanitizeImageSrc(`${assetPrefix}/icons/i-mail.png`)}" alt="" width="14" height="14" style="width:14px; height:14px; vertical-align:-2px; margin-right:6px;">
              <a href="${sanitizeUrl(`mailto:${p.email}`)}" style="color:#374151; text-decoration:none;">${escapeHtml(p.email)}</a>
            </td>
          </tr>
          <tr>
            <td style="padding:2px 0;">
              <img src="${sanitizeImageSrc(`${assetPrefix}/icons/i-phone.png`)}" alt="" width="14" height="14" style="width:14px; height:14px; vertical-align:-2px; margin-right:6px;">
              <a href="${sanitizeUrl(`tel:${String(p.phone||'').replace(/[^0-9+]/g, '')}`)}" style="color:#374151; text-decoration:none;">${escapeHtml(p.phone)}</a>
            </td>
          </tr>
          <tr>
            <td style="padding:2px 0;">
              <img src="${sanitizeImageSrc(`${assetPrefix}/icons/i-globe.png`)}" alt="" width="14" height="14" style="width:14px; height:14px; vertical-align:-2px; margin-right:6px;">
              <a href="${sanitizeUrl(p.website)}" style="color:#2563eb; text-decoration:none;">${escapeHtml(p.websiteDisplay || p.website)}</a>
            </td>
          </tr>
          <tr>
            <td style="padding:2px 0;">
              <img src="${sanitizeImageSrc(`${assetPrefix}/icons/i-map-pin.png`)}" alt="" width="14" height="14" style="width:14px; height:14px; vertical-align:-2px; margin-right:6px;">
              <span>${escapeHtml(p.location)}</span>
            </td>
          </tr>
        </table>
      </div>
      <div style="font-size:12px; color:#6b7280; line-height:1.7; margin-top:8px;">
        <a href="${sanitizeUrl(p.socials && p.socials.linkedin)}" style="color:#6b7280; text-decoration:none;">LinkedIn</a>
        <span style="color:#d1d5db;">&nbsp;&middot;&nbsp;</span>
        <a href="${sanitizeUrl(p.socials && p.socials.github)}" style="color:#6b7280; text-decoration:none;">GitHub</a>
        <span style="color:#d1d5db;">&nbsp;&middot;&nbsp;</span>
        <a href="${sanitizeUrl(p.socials && p.socials.x)}" style="color:#6b7280; text-decoration:none;">X</a>
      </div>
    </td>
  </tr>
</table>
<!-- SIGNATURE-END -->`;
  }

  function renderSignatureP(p, opts = {}) {
    const assetPrefix = opts.assetPrefix || '../assets';
    const photo = photoSrc(p, assetPrefix);
    const email = escapeHtml(p.email || '');
    const phone = escapeHtml(p.phone || '');
    const web = escapeHtml(p.websiteDisplay || (p.website ? p.website.replace(/^https?:\/\/(www\.)?/, '') : ''));
    const cleanPhone = String(p.phone || '').replace(/[^0-9+]/g, '');
    const waUrl = sanitizeUrl(p.whatsapp || (cleanPhone ? `https://wa.me/${cleanPhone.replace(/^\+/, '')}` : '#'));

    return `<!-- SIGNATURE-START -->
<table cellpadding="0" cellspacing="0" border="0" style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif; max-width:580px; color:#111827;">
  <tr>
    <td style="padding-bottom:12px;">
      <table cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="vertical-align:middle; padding-right:16px;">
            <img src="${photo}" alt="${escapeHtml(p.name)}" width="64" height="64" style="display:block; width:64px; height:64px; border-radius:50%; object-fit:cover;">
          </td>
          <td style="vertical-align:middle;">
            <div style="font-size:18px; font-weight:700; color:#111827; line-height:1.2; letter-spacing:-0.2px;">${escapeHtml(p.name)}</div>
            <div style="font-size:13px; font-weight:400; color:#6b7280; line-height:1.4; margin-top:3px;">${escapeHtml(p.title)}</div>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td style="padding-bottom:6px;">
      <table cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td>
            <a href="${sanitizeUrl(`mailto:${p.email}`)}" style="text-decoration:none; display:inline-block; margin-right:6px; margin-bottom:6px;">
              <table cellpadding="0" cellspacing="0" border="0" style="border-radius:4px; overflow:hidden; font-size:11px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif; line-height:1;">
                <tr>
                  <td style="background:#4b5563; color:#ffffff; padding:4px 8px; font-weight:500;">email</td>
                  <td style="background:#e11d48; color:#ffffff; padding:4px 9px; font-weight:700;">${email}</td>
                </tr>
              </table>
            </a>
            <a href="${waUrl}" style="text-decoration:none; display:inline-block; margin-right:6px; margin-bottom:6px;">
              <table cellpadding="0" cellspacing="0" border="0" style="border-radius:4px; overflow:hidden; font-size:11px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif; line-height:1;">
                <tr>
                  <td style="background:#4b5563; color:#ffffff; padding:4px 8px; font-weight:500;">whatsapp</td>
                  <td style="background:#10b981; color:#ffffff; padding:4px 9px; font-weight:700;">${phone}</td>
                </tr>
              </table>
            </a>
            <a href="${sanitizeUrl(p.website)}" style="text-decoration:none; display:inline-block; margin-bottom:6px;">
              <table cellpadding="0" cellspacing="0" border="0" style="border-radius:4px; overflow:hidden; font-size:11px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif; line-height:1;">
                <tr>
                  <td style="background:#4b5563; color:#ffffff; padding:4px 8px; font-weight:500;">web</td>
                  <td style="background:#2563eb; color:#ffffff; padding:4px 9px; font-weight:700;">${web}</td>
                </tr>
              </table>
            </a>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td style="padding-bottom:10px;">
      <table cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td>
            <span style="display:inline-block; margin-right:6px; margin-bottom:6px;">
              <table cellpadding="0" cellspacing="0" border="0" style="border-radius:4px; overflow:hidden; font-size:11px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif; line-height:1;">
                <tr>
                  <td style="background:#4b5563; color:#ffffff; padding:4px 8px; font-weight:500;">stack</td>
                  <td style="background:#000000; color:#ffffff; padding:4px 9px; font-weight:700;">Next.js</td>
                </tr>
              </table>
            </span>
            <span style="display:inline-block; margin-right:6px; margin-bottom:6px;">
              <table cellpadding="0" cellspacing="0" border="0" style="border-radius:4px; overflow:hidden; font-size:11px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif; line-height:1;">
                <tr>
                  <td style="background:#4b5563; color:#ffffff; padding:4px 8px; font-weight:500;">stack</td>
                  <td style="background:#3178c6; color:#ffffff; padding:4px 9px; font-weight:700;">TypeScript</td>
                </tr>
              </table>
            </span>
            <span style="display:inline-block; margin-right:6px; margin-bottom:6px;">
              <table cellpadding="0" cellspacing="0" border="0" style="border-radius:4px; overflow:hidden; font-size:11px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif; line-height:1;">
                <tr>
                  <td style="background:#4b5563; color:#ffffff; padding:4px 8px; font-weight:500;">stack</td>
                  <td style="background:#16a34a; color:#ffffff; padding:4px 9px; font-weight:700;">Node.js</td>
                </tr>
              </table>
            </span>
            <span style="display:inline-block; margin-bottom:6px;">
              <table cellpadding="0" cellspacing="0" border="0" style="border-radius:4px; overflow:hidden; font-size:11px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif; line-height:1;">
                <tr>
                  <td style="background:#4b5563; color:#ffffff; padding:4px 8px; font-weight:500;">db</td>
                  <td style="background:#336791; color:#ffffff; padding:4px 9px; font-weight:700;">PostgreSQL</td>
                </tr>
              </table>
            </span>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td style="font-size:12.5px; color:#6b7280; line-height:1.5;">
      <a href="${sanitizeUrl(p.socials && p.socials.linkedin)}" style="color:#4b5563; text-decoration:none; font-weight:500;">LinkedIn</a>
      <span style="color:#d1d5db;">&nbsp;&nbsp;&middot;&nbsp;&nbsp;</span>
      <a href="${sanitizeUrl(p.socials && p.socials.github)}" style="color:#4b5563; text-decoration:none; font-weight:500;">GitHub</a>
      <span style="color:#d1d5db;">&nbsp;&middot;&nbsp;&nbsp;</span>
      <a href="${sanitizeUrl(p.socials && p.socials.x)}" style="color:#4b5563; text-decoration:none; font-weight:500;">X</a>
      <span style="color:#d1d5db;">&nbsp;&nbsp;&middot;&nbsp;&nbsp;</span>
      <a href="${sanitizeUrl(p.booking && p.booking.url)}" style="color:#2563eb; text-decoration:none; font-weight:600;">${escapeHtml(p.booking && p.booking.label || 'Book a call →')}</a>
    </td>
  </tr>
</table>
<!-- SIGNATURE-END -->`;
  }

  function renderSignatureQ(p, opts = {}) {
    const handle = (p.socials && p.socials.github ? p.socials.github.split('/').filter(Boolean).pop() : '') || 'razikuljoni';
    const email = escapeHtml(p.email || '');
    const web = escapeHtml(p.websiteDisplay || (p.website ? p.website.replace(/^https?:\/\/(www\.)?/, '') : ''));
    const loc = escapeHtml(p.location || 'Dhaka, Bangladesh');

    return `<!-- SIGNATURE-START -->
<table cellpadding="0" cellspacing="0" border="0" style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif; max-width:580px; color:#1e293b;">
  <tr>
    <td style="padding-bottom:6px;">
      <span style="display:inline-block; background:#cb3837; color:#ffffff; font-family:'Courier New',Consolas,Monaco,monospace; font-size:11px; font-weight:700; padding:2.5px 7px; border-radius:4px; vertical-align:middle; line-height:1;">npm</span>
      <span style="display:inline-block; color:#64748b; font-family:'Courier New',Consolas,Monaco,monospace; font-size:12px; margin-left:6px; vertical-align:middle;">package</span>
    </td>
  </tr>
  <tr>
    <td style="line-height:1.2;">
      <span style="font-family:'Courier New',Consolas,Monaco,monospace; font-size:23px; font-weight:700; color:#0f172a; letter-spacing:-0.4px;">${escapeHtml(handle)}</span>
      <span style="font-family:'Courier New',Consolas,Monaco,monospace; font-size:13px; color:#64748b; margin-left:8px; font-weight:400;">v2.0.0</span>
    </td>
  </tr>
  <tr>
    <td style="font-size:13px; color:#334155; line-height:1.45; padding-top:4px; padding-bottom:8px;">
      ${escapeHtml(p.title)} &mdash; builds realtime SaaS dashboards with Next.js &amp; Node.js
    </td>
  </tr>
  <tr>
    <td>
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#0f172a; border-radius:6px; margin-bottom:10px;">
        <tr>
          <td style="padding:9px 14px; font-family:'Courier New',Consolas,Monaco,monospace; font-size:13px; line-height:1.4; color:#e2e8f0;">
            <span style="color:#38bdf8; font-weight:700;">$</span>&nbsp;&nbsp;<span style="color:#f8fafc; font-weight:600;">npm install ${escapeHtml(handle)}</span>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td style="font-size:12.5px; color:#64748b; line-height:1.5; padding-bottom:10px;">
      <a href="${sanitizeUrl(`mailto:${p.email}`)}" style="color:#64748b; text-decoration:none;">${email}</a>
      <span style="color:#cbd5e1;">&nbsp;&nbsp;&middot;&nbsp;&nbsp;</span>
      <a href="${sanitizeUrl(p.website)}" style="color:#64748b; text-decoration:none;">${web}</a>
      <span style="color:#cbd5e1;">&nbsp;&nbsp;&middot;&nbsp;&nbsp;</span>
      <span>${loc}</span>
    </td>
  </tr>
  <tr>
    <td>
      <table cellpadding="0" cellspacing="0" border="0" style="font-family:'Courier New',Consolas,Monaco,monospace;">
        <tr>
          <td>
            <span style="display:inline-block; background:#16a34a; color:#ffffff; font-size:11px; font-weight:700; padding:3px 9px; border-radius:4px; margin-right:6px;">open to work &#10003;</span>
            <span style="display:inline-block; background:#2563eb; color:#ffffff; font-size:11px; font-weight:600; padding:3px 9px; border-radius:4px; margin-right:6px;">stack: next.js &middot; ts &middot; node</span>
            <span style="display:inline-block; background:#64748b; color:#ffffff; font-size:11px; font-weight:600; padding:3px 9px; border-radius:4px;">based: dhaka, bd</span>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
<!-- SIGNATURE-END -->`;
  }

  function renderSignatureR(p, opts = {}) {
    const assetPrefix = opts.assetPrefix || '../assets';
    const photo = photoSrc(p, assetPrefix);
    const handle = (p.socials && p.socials.github ? p.socials.github.split('/').filter(Boolean).pop() : '') || 'razikuljoni';
    const email = escapeHtml(p.email || '');
    const web = escapeHtml(p.websiteDisplay || (p.website ? p.website.replace(/^https?:\/\/(www\.)?/, '') : ''));
    const loc = escapeHtml(p.location || 'Dhaka, Bangladesh');

    const heatmapRows = [
      ['#ebedf0','#ebedf0','#ebedf0','#ebedf0','#216e39','#9be9a8','#ebedf0','#ebedf0','#216e39','#30a14e','#9be9a8','#ebedf0','#ebedf0','#216e39','#30a14e','#ebedf0','#ebedf0','#9be9a8','#9be9a8','#ebedf0','#30a14e','#ebedf0','#216e39','#30a14e','#30a14e'],
      ['#ebedf0','#ebedf0','#ebedf0','#ebedf0','#ebedf0','#ebedf0','#ebedf0','#9be9a8','#ebedf0','#30a14e','#9be9a8','#30a14e','#ebedf0','#30a14e','#30a14e','#ebedf0','#216e39','#30a14e','#30a14e','#216e39','#30a14e','#ebedf0','#216e39','#ebedf0','#30a14e'],
      ['#ebedf0','#9be9a8','#ebedf0','#216e39','#ebedf0','#ebedf0','#9be9a8','#ebedf0','#216e39','#ebedf0','#30a14e','#30a14e','#ebedf0','#ebedf0','#ebedf0','#216e39','#ebedf0','#ebedf0','#30a14e','#ebedf0','#9be9a8','#ebedf0','#ebedf0','#30a14e','#ebedf0'],
      ['#ebedf0','#ebedf0','#ebedf0','#ebedf0','#ebedf0','#ebedf0','#ebedf0','#ebedf0','#ebedf0','#ebedf0','#ebedf0','#ebedf0','#ebedf0','#ebedf0','#ebedf0','#ebedf0','#ebedf0','#ebedf0','#ebedf0','#ebedf0','#ebedf0','#9be9a8','#ebedf0','#ebedf0','#ebedf0']
    ];

    const heatmapHtml = heatmapRows.map(row => {
      const cells = row.map(color => `<td width="8" height="8" style="width:8px; height:8px; min-width:8px; background:${color}; border-radius:2px; font-size:0; line-height:0;">&nbsp;</td>`).join('');
      return `<tr>${cells}</tr>`;
    }).join('');

    return `<!-- SIGNATURE-START -->
<table cellpadding="0" cellspacing="0" border="0" style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif; max-width:580px; background:#ffffff; border:1px solid #e2e8f0; border-radius:14px; color:#0f172a;">
  <tr>
    <td style="padding:22px 24px;">
      <table cellpadding="0" cellspacing="0" border="0" width="100%">
        <tr>
          <td style="vertical-align:top;">
            <table cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="vertical-align:top; padding-right:14px;">
                  <img src="${photo}" alt="${escapeHtml(p.name)}" width="56" height="56" style="display:block; width:56px; height:56px; border-radius:50%; object-fit:cover;">
                </td>
                <td style="vertical-align:top;">
                  <div>
                    <span style="font-size:16.5px; font-weight:700; color:#0f172a; line-height:1.2;">${escapeHtml(p.name)}</span>
                    <span style="color:#64748b; font-size:13px; font-weight:400; margin-left:6px;">@${escapeHtml(handle)}</span>
                  </div>
                  <div style="font-size:12.5px; color:#475569; line-height:1.4; margin-top:2px;">
                    ${escapeHtml(p.title)} &middot; ${loc}
                  </div>
                  <div style="font-size:12.5px; color:#2563eb; line-height:1.5; margin-top:4px;">
                    <a href="${sanitizeUrl(`mailto:${p.email}`)}" style="color:#2563eb; text-decoration:none;">${email}</a>
                    <span style="color:#cbd5e1;">&nbsp;&nbsp;&middot;&nbsp;&nbsp;</span>
                    <a href="${sanitizeUrl(p.website)}" style="color:#2563eb; text-decoration:none;">${web}</a>
                  </div>
                </td>
              </tr>
            </table>
          </td>
          <td style="vertical-align:top; text-align:right;">
            <a href="${sanitizeUrl(p.booking && p.booking.url)}" style="background:#15803d; color:#ffffff; font-size:13px; font-weight:600; text-decoration:none; padding:8px 16px; border-radius:8px; display:inline-block; white-space:nowrap;">Book a call</a>
          </td>
        </tr>
      </table>
      <div style="margin-top:16px; padding-left:70px;">
        <table cellpadding="0" cellspacing="2" border="0">
          ${heatmapHtml}
        </table>
      </div>
    </td>
  </tr>
</table>
<!-- SIGNATURE-END -->`;
  }

  function renderSignatureS(p, opts = {}) {
    const handle = (p.socials && p.socials.github ? p.socials.github.split('/').filter(Boolean).pop() : '') || 'razikuljoni';
    const email = escapeHtml(p.email || '');
    const web = escapeHtml(p.websiteDisplay || (p.website ? p.website.replace(/^https?:\/\/(www\.)?/, '') : ''));

    return `<!-- SIGNATURE-START -->
<table cellpadding="0" cellspacing="0" border="0" style="background:#18181b; border-radius:12px; max-width:580px; width:100%; overflow:hidden; font-family:'JetBrains Mono',Consolas,Monaco,monospace; color:#e2e8f0;">
  <tr>
    <td style="background:#131316; border-bottom:1px solid #27272a; padding:8px 16px;">
      <table cellpadding="0" cellspacing="0" border="0" width="100%">
        <tr>
          <td>
            <span style="display:inline-block; width:7px; height:7px; background:#3b82f6; border-radius:50%; vertical-align:middle; margin-right:7px;"></span>
            <span style="color:#f4f4f5; font-size:12px; font-weight:600; vertical-align:middle;">developer.ts</span>
          </td>
          <td style="text-align:center; color:#71717a; font-size:11px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
            ${escapeHtml(handle)} &mdash; Visual Studio Code
          </td>
          <td style="width:40px;">&nbsp;</td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td style="padding:14px 18px;">
      <table cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="color:#52525b; width:22px; padding-right:16px; text-align:right; font-size:12.5px; line-height:1.65; vertical-align:top; user-select:none;">
            1<br>2<br>3<br>4<br>5<br>6<br>7<br>8
          </td>
          <td style="font-size:12.5px; line-height:1.65; color:#e2e8f0; vertical-align:top; white-space:nowrap;">
            <span style="color:#c084fc;">export const</span> <span style="color:#60a5fa;">developer</span> <span style="color:#e2e8f0;">=</span> <span style="color:#fbbf24;">{</span><br>
            &nbsp;&nbsp;<span style="color:#38bdf8;">name</span><span style="color:#e2e8f0;">:</span> <span style="color:#fdba74;">&quot;${escapeHtml(p.name)}&quot;</span><span style="color:#e2e8f0;">,</span><br>
            &nbsp;&nbsp;<span style="color:#38bdf8;">role</span><span style="color:#e2e8f0;">:</span> <span style="color:#fdba74;">&quot;${escapeHtml(p.title)}&quot;</span><span style="color:#e2e8f0;">,</span><br>
            &nbsp;&nbsp;<span style="color:#38bdf8;">stack</span><span style="color:#e2e8f0;">:</span> <span style="color:#e2e8f0;">[</span><span style="color:#fdba74;">&quot;Next.js&quot;</span><span style="color:#e2e8f0;">,</span> <span style="color:#fdba74;">&quot;TypeScript&quot;</span><span style="color:#e2e8f0;">,</span> <span style="color:#fdba74;">&quot;Node.js&quot;</span><span style="color:#e2e8f0;">],</span><br>
            &nbsp;&nbsp;<span style="color:#38bdf8;">email</span><span style="color:#e2e8f0;">:</span> <a href="${sanitizeUrl(`mailto:${p.email}`)}" style="color:#fdba74; text-decoration:none;"><span style="color:#fdba74;">&quot;${email}&quot;</span></a><span style="color:#e2e8f0;">,</span><br>
            &nbsp;&nbsp;<span style="color:#38bdf8;">web</span><span style="color:#e2e8f0;">:</span> <a href="${sanitizeUrl(p.website)}" style="color:#fdba74; text-decoration:none;"><span style="color:#fdba74;">&quot;${web}&quot;</span></a><span style="color:#e2e8f0;">,</span><br>
            &nbsp;&nbsp;<span style="color:#38bdf8;">openToWork</span><span style="color:#e2e8f0;">:</span> <span style="color:#38bdf8;">true</span><span style="color:#e2e8f0;">,</span><br>
            <span style="color:#fbbf24;">}</span><span style="color:#e2e8f0;">;</span>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
<!-- SIGNATURE-END -->`;
  }

  function renderSignatureT(p, opts = {}) {
    const handle = (p.socials && p.socials.github ? p.socials.github.split('/').filter(Boolean).pop() : '') || 'razikuljoni';
    const email = escapeHtml(p.email || '');
    const phone = escapeHtml(p.phone || '');
    const web = escapeHtml(p.websiteDisplay || (p.website ? p.website.replace(/^https?:\/\/(www\.)?/, '') : ''));
    const loc = escapeHtml(p.location || 'Dhaka, Bangladesh');

    return `<!-- SIGNATURE-START -->
<table cellpadding="0" cellspacing="0" border="0" style="background:#0c1017; border-radius:12px; border:1px solid #1e293b; max-width:580px; width:100%; overflow:hidden; font-family:'JetBrains Mono',Consolas,Monaco,monospace; color:#f8fafc;">
  <tr>
    <td style="padding:10px 14px; background:#080b11; border-bottom:1px solid #1e293b;">
      <table cellpadding="0" cellspacing="0" border="0" width="100%">
        <tr>
          <td style="width:60px;">
            <span style="display:inline-block; width:10px; height:10px; background:#ff5f56; border-radius:50%; margin-right:6px; vertical-align:middle;"></span>
            <span style="display:inline-block; width:10px; height:10px; background:#ffbd2e; border-radius:50%; margin-right:6px; vertical-align:middle;"></span>
            <span style="display:inline-block; width:10px; height:10px; background:#27c93f; border-radius:50%; vertical-align:middle;"></span>
          </td>
          <td style="text-align:center; color:#64748b; font-size:11.5px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
            ${escapeHtml(handle)} &mdash; zsh
          </td>
          <td style="width:60px;">&nbsp;</td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td style="padding:16px 20px;">
      <div style="font-size:13px; line-height:1.4;">
        <span style="color:#22c55e; font-weight:700;">$</span>&nbsp;&nbsp;<span style="color:#f8fafc; font-weight:600;">whoami</span>
      </div>
      <div style="font-size:16px; font-weight:700; color:#f8fafc; margin-top:8px; line-height:1.2;">
        ${escapeHtml(p.name)}
      </div>
      <div style="font-size:12.5px; color:#94a3b8; line-height:1.4; margin-top:2px;">
        ${escapeHtml(p.title)}
      </div>
      <div style="font-size:12.5px; line-height:1.8; margin-top:12px; color:#f8fafc;">
        <div><span style="color:#38bdf8;">email</span>&nbsp;&nbsp;: <a href="${sanitizeUrl(`mailto:${p.email}`)}" style="color:#f8fafc; text-decoration:none;">${email}</a></div>
        <div><span style="color:#38bdf8;">phone</span>&nbsp;&nbsp;: <a href="${sanitizeUrl(p.whatsapp || `tel:${String(p.phone||'').replace(/[^0-9+]/g, '')}`)}" style="color:#f8fafc; text-decoration:none;">${phone}</a></div>
        <div><span style="color:#38bdf8;">web</span>&nbsp;&nbsp;&nbsp;&nbsp;: <a href="${sanitizeUrl(p.website)}" style="color:#f8fafc; text-decoration:none;">${web}</a></div>
        <div><span style="color:#38bdf8;">based</span>&nbsp;&nbsp;: <span style="color:#f8fafc;">${loc}</span></div>
      </div>
      <div style="font-size:12.5px; line-height:1.6; margin-top:12px; color:#f8fafc;">
        <span style="color:#38bdf8;">links</span>: <span style="color:#fbbf24;">[</span> <a href="${sanitizeUrl(p.socials && p.socials.linkedin)}" style="color:#fbbf24; text-decoration:none;">linkedin</a> <span style="color:#64748b;">&middot;</span> <a href="${sanitizeUrl(p.socials && p.socials.github)}" style="color:#fbbf24; text-decoration:none;">github</a> <span style="color:#64748b;">&middot;</span> <a href="${sanitizeUrl(p.socials && p.socials.x)}" style="color:#fbbf24; text-decoration:none;">x</a> <span style="color:#64748b;">&middot;</span> <a href="${sanitizeUrl(p.booking && p.booking.url)}" style="color:#fbbf24; text-decoration:none;">book-a-call</a> <span style="color:#fbbf24;">]</span>
      </div>
    </td>
  </tr>
</table>
<!-- SIGNATURE-END -->`;
  }

  function render(letter, p, opts) {
    const l = String(letter || 'a').toLowerCase();
    if (l === 'b') return renderSignatureB(p, opts);
    if (l === 'c') return renderSignatureC(p, opts);
    if (l === 'd') return renderSignatureD(p, opts);
    if (l === 'e') return renderSignatureE(p, opts);
    if (l === 'f') return renderSignatureF(p, opts);
    if (l === 'g') return renderSignatureG(p, opts);
    if (l === 'h') return renderSignatureH(p, opts);
    if (l === 'i') return renderSignatureI(p, opts);
    if (l === 'j') return renderSignatureJ(p, opts);
    if (l === 'k') return renderSignatureK(p, opts);
    if (l === 'l') return renderSignatureL(p, opts);
    if (l === 'm') return renderSignatureM(p, opts);
    if (l === 'n') return renderSignatureN(p, opts);
    if (l === 'o') return renderSignatureO(p, opts);
    if (l === 'p') return renderSignatureP(p, opts);
    if (l === 'q') return renderSignatureQ(p, opts);
    if (l === 'r') return renderSignatureR(p, opts);
    if (l === 's') return renderSignatureS(p, opts);
    if (l === 't') return renderSignatureT(p, opts);
    return renderSignatureA(p, opts);
  }

  function getStandaloneHead(title) {
    const isDark = title.includes('Noir') || title.includes('Split Dark') || title.includes('VS Code') || title.includes('Terminal');
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)} — Email Signature</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #080c16;
      --card-bg: rgba(15, 23, 42, 0.72);
      --card-border: rgba(255, 255, 255, 0.08);
      --accent: #4f46e5;
      --accent-hover: #4338ca;
      --accent-glow: rgba(79, 70, 229, 0.28);
      --success: #10b981;
      --text: #f8fafc;
      --text-muted: #94a3b8;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: var(--bg);
      background-image: 
        radial-gradient(circle at 15% 10%, rgba(79, 70, 229, 0.15) 0, transparent 40%),
        radial-gradient(circle at 85% 80%, rgba(6, 182, 212, 0.1) 0, transparent 40%);
      background-attachment: fixed;
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      color: var(--text);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    .top-bar {
      background: rgba(8, 12, 22, 0.82);
      backdrop-filter: blur(18px);
      -webkit-backdrop-filter: blur(18px);
      border-bottom: 1px solid var(--card-border);
      padding: 14px 24px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      position: sticky;
      top: 0;
      z-index: 50;
    }
    .top-left { display: flex; align-items: center; gap: 14px; }
    .back-btn {
      display: inline-flex; align-items: center; gap: 6px; padding: 7px 12px;
      background: rgba(255, 255, 255, 0.05); border: 1px solid var(--card-border); border-radius: 8px; color: var(--text-muted);
      text-decoration: none; font-size: 13px; font-weight: 600; transition: all 0.15s ease;
    }
    .back-btn:hover { background: rgba(255, 255, 255, 0.1); color: #ffffff; }
    .sig-title { font-size: 16px; font-weight: 700; color: #ffffff; letter-spacing: -0.2px; }
    .actions { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
    .sim-toggle {
      display: flex; align-items: center; gap: 2px; background: rgba(0, 0, 0, 0.35);
      border: 1px solid var(--card-border); border-radius: 18px; padding: 3px;
    }
    .sim-btn {
      padding: 4px 10px; font-size: 11.5px; font-weight: 600; border-radius: 14px;
      border: none; background: transparent; color: var(--text-muted); cursor: pointer; transition: all 0.15s ease;
    }
    .sim-btn.active { background: var(--accent); color: #ffffff; }
    .btn {
      cursor: pointer; display: inline-flex; align-items: center; gap: 6px; padding: 8px 14px;
      font-size: 13px; font-weight: 600; border-radius: 8px; border: 1px solid transparent; transition: all 0.18s ease; user-select: none;
    }
    .btn-primary { background: var(--accent); color: #ffffff; box-shadow: 0 4px 14px var(--accent-glow); }
    .btn-primary:hover { background: var(--accent-hover); transform: translateY(-1px); }
    .btn-secondary { background: rgba(255, 255, 255, 0.05); color: #ffffff; border-color: var(--card-border); }
    .btn-secondary:hover { background: rgba(255, 255, 255, 0.1); }
    .btn-success { background: var(--success) !important; color: #ffffff !important; border-color: var(--success) !important; }
    .preview-canvas { flex: 1; padding: 48px 24px; display: flex; flex-direction: column; align-items: center; justify-content: center; }
    .card-preview {
      background: #ffffff; border: 1px solid var(--card-border); border-radius: 16px; padding: 32px;
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.35); max-width: 680px; width: 100%; overflow-x: auto;
      transition: background 0.2s ease, border-color 0.2s ease;
    }
    .bg-dark-preview { background: #0f172a !important; border-color: #1e293b !important; color: #f8fafc; }
    .copy-tip {
      margin-top: 24px; font-size: 13px; color: var(--text-muted); text-align: center; max-width: 520px; line-height: 1.6;
      background: var(--card-bg); padding: 12px 20px; border-radius: 12px; border: 1px solid var(--card-border);
    }
    .copy-tip strong { color: #ffffff; }
    @media (max-width: 600px) {
      .card-preview { padding: 18px !important; }
      .actions { width: 100%; justify-content: flex-start; }
    }
    #toast {
      position: fixed; bottom: 28px; left: 50%; transform: translateX(-50%) translateY(30px);
      background: #1e293b; color: #ffffff; padding: 12px 22px; border-radius: 10px; font-size: 13.5px; font-weight: 600;
      box-shadow: 0 16px 36px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.12); opacity: 0; pointer-events: none;
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1); z-index: 999; display: flex; align-items: center; gap: 8px;
    }
    #toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }
  </style>
</head>
<body>
  <div class="top-bar">
    <div class="top-left">
      <a href="../index.html" class="back-btn">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="m15 18-6-6 6-6"/></svg>
        Studio
      </a>
      <span class="sig-title">${escapeHtml(title)}</span>
    </div>
    <div class="actions">
      <div class="sim-toggle">
        <button class="sim-btn${isDark ? '' : ' active'}" id="sim-light-btn" onclick="setTheme('light')">Light</button>
        <button class="sim-btn${isDark ? ' active' : ''}" id="sim-dark-btn" onclick="setTheme('dark')">Dark</button>
      </div>
      <button class="btn btn-secondary" id="btn-html" onclick="copyHtmlCode()">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
        <span>Copy HTML</span>
      </button>
      <button class="btn btn-primary" id="btn-copy" onclick="copyVisualSignature()">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
        <span>Copy Signature</span>
      </button>
    </div>
  </div>

  <main class="preview-canvas">
    <div class="card-preview${isDark ? ' bg-dark-preview' : ''}" id="preview-wrapper">
      <div id="signature-container">`;
  }

  function getStandaloneFooter() {
    return `      </div>
    </div>
    <div class="copy-tip">
      Click <strong>Copy Signature</strong>, then paste (<kbd>Ctrl+V</kbd> / <kbd>Cmd+V</kbd>) into Gmail, Apple Mail, or Outlook settings.
    </div>
  </main>

  <div id="toast">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
    <span id="toast-text">Signature copied to clipboard!</span>
  </div>

  <script>
    function showToast(msg) {
      const toast = document.getElementById('toast');
      document.getElementById('toast-text').innerText = msg;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2600);
    }

    function setTheme(mode) {
      document.getElementById('sim-light-btn').classList.toggle('active', mode === 'light');
      document.getElementById('sim-dark-btn').classList.toggle('active', mode === 'dark');
      const w = document.getElementById('preview-wrapper');
      w.classList.toggle('bg-dark-preview', mode === 'dark');
    }

    function flashSuccess(btnId, text) {
      const btn = document.getElementById(btnId);
      if (!btn) return;
      const oldHtml = btn.innerHTML;
      btn.classList.add('btn-success');
      btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> <span>' + text + '</span>';
      setTimeout(() => {
        btn.classList.remove('btn-success');
        btn.innerHTML = oldHtml;
      }, 2000);
    }

    async function copyVisualSignature() {
      const container = document.getElementById('signature-container');
      try {
        if (navigator.clipboard && window.ClipboardItem) {
          const htmlBlob = new Blob([container.innerHTML], { type: 'text/html' });
          const textBlob = new Blob([container.innerText], { type: 'text/plain' });
          await navigator.clipboard.write([
            new ClipboardItem({ 'text/html': htmlBlob, 'text/plain': textBlob })
          ]);
          flashSuccess('btn-copy', 'Copied! ✓');
          showToast('Copied! Paste into Gmail / Apple Mail / Outlook.');
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
      flashSuccess('btn-copy', 'Copied! ✓');
      showToast('Copied! Paste into Gmail / Apple Mail / Outlook.');
    }

    async function copyHtmlCode() {
      const container = document.getElementById('signature-container');
      await navigator.clipboard.writeText(container.innerHTML.trim());
      flashSuccess('btn-html', 'HTML Copied! ✓');
      showToast('Raw HTML code copied to clipboard!');
    }
  </script>
</body>
</html>`;
  }

  function renderStandalone(letter, p, opts) {
    const item = MANIFEST.find(m => m.letter === letter) || MANIFEST[0];
    return `${getStandaloneHead(item.name)}
${render(letter, p, opts)}
${getStandaloneFooter()}`;
  }

  const API = { escapeHtml, sanitizeUrl, sanitizeImageSrc, MANIFEST, render, renderStandalone };
  if (typeof module !== 'undefined' && module.exports) module.exports = API;
  if (typeof window !== 'undefined') window.SignatureTemplates = API;
})();
