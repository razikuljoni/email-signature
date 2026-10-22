# Email Signature Studio

Multi-template professional email signature system with centralized profile data, live preview studio, and 1-click rich-text copying for Gmail, Apple Mail, and Outlook.

Zero runtime dependencies &bull; 100% offline &bull; HTML 4.01 Strict email compatibility

---

## 🚀 Quick Start

1. **Open the Studio Dashboard**:
   Simply open [`index.html`](index.html) in your browser, or spin up the local preview:
   ```bash
   npm run serve
   # or
   npm run preview
   ```

2. **Copy & Paste into Email Client**:
   - Click **Copy Signature** on any template. The button transitions to green (`Copied! ✓`).
   - Go to your email client's signature settings (e.g. Gmail &rarr; *See all settings* &rarr; *Signature*).
   - Press <kbd>Ctrl+V</kbd> or <kbd>Cmd+V</kbd> to paste.
   - Save changes.

---

## ⚡ Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| <kbd>Cmd</kbd> + <kbd>K</kbd> / <kbd>Ctrl</kbd> + <kbd>K</kbd> | Focus instant template search |
| <kbd>Cmd</kbd> + <kbd>E</kbd> / <kbd>Ctrl</kbd> + <kbd>E</kbd> | Open Slide-Over Profile Editor Drawer |
| <kbd>Esc</kbd> | Close any open drawer or modal |

---

## 🎨 Signature Template Directory

All 25 templates are rendered in both the studio dashboard and standalone HTML files inside `signatures/`:

| Letter | Template Name | Tags | Best Suited For | Standalone File |
|:---:|---|---|---|---|
| **A** | **Essential Text-Only** | `minimal` | Strict enterprise mail servers, plain-text defaults | [`signatures/signature-a-essential-text-only.html`](signatures/signature-a-essential-text-only.html) |
| **B** | **Portrait Minimal** | `photo`, `minimal` | Founders, designers, client-facing roles | [`signatures/signature-b-portrait-minimal.html`](signatures/signature-b-portrait-minimal.html) |
| **C** | **Monogram Avatar** | `minimal` | Engineers & developers wanting a minimal visual anchor | [`signatures/signature-c-monogram-avatar.html`](signatures/signature-c-monogram-avatar.html) |
| **D** | **Noir Dark Card** | `dark`, `photo` | Dark-mode enthusiasts & design-forward tech brands | [`signatures/signature-d-noir-dark-card.html`](signatures/signature-d-noir-dark-card.html) |
| **E** | **Developer Pro Banner** | `photo`, `dev` | Engineering leaders & technical advocates | [`signatures/signature-e-developer-pro-banner.html`](signatures/signature-e-developer-pro-banner.html) |
| **F** | **Executive Bordered Card** | `photo`, `minimal` | Executive leaders & enterprise consultants | [`signatures/signature-f-executive-bordered-card.html`](signatures/signature-f-executive-bordered-card.html) |
| **G** | **Gradient Badge Stack** | `photo` | Product managers, startup founders & tech evangelists | [`signatures/signature-g-gradient-badge-stack.html`](signatures/signature-g-gradient-badge-stack.html) |
| **H** | **Contact Rail** | `photo`, `minimal` | Minimalists who want a photo without clutter | [`signatures/signature-h-contact-rail.html`](signatures/signature-h-contact-rail.html) |
| **I** | **Pill Badges** | `photo` | Creative professionals & community builders | [`signatures/signature-i-pill-badges.html`](signatures/signature-i-pill-badges.html) |
| **J** | **Labeled Columns** | `minimal` | Data-driven professionals & enterprise teams | [`signatures/signature-j-labeled-columns.html`](signatures/signature-j-labeled-columns.html) |
| **K** | **Bordered Contact Grid** | `photo`, `minimal` | Account managers & client-facing consultants | [`signatures/signature-k-bordered-contact-grid.html`](signatures/signature-k-bordered-contact-grid.html) |
| **L** | **Centered Serif Classic** | `minimal` | Writers, editors & academic professionals | [`signatures/signature-l-centered-serif-classic.html`](signatures/signature-l-centered-serif-classic.html) |
| **M** | **Split Dark Panel** | `photo`, `dark` | Design directors & brand-conscious leaders | [`signatures/signature-m-split-dark-panel.html`](signatures/signature-m-split-dark-panel.html) |
| **N** | **Card + CTA** | `photo` | Sales professionals & business development leads | [`signatures/signature-n-card-cta.html`](signatures/signature-n-card-cta.html) |
| **O** | **Accent Rail** | `minimal` | Engineers & technical writers who prefer structure | [`signatures/signature-o-accent-rail.html`](signatures/signature-o-accent-rail.html) |
| **P** | **Developer Shields Badges** | `dev`, `photo` | Full-stack engineers, open-source maintainers & tech leads | [`signatures/signature-p-dev-badges.html`](signatures/signature-p-dev-badges.html) |
| **Q** | **NPM Package Card** | `dev`, `minimal` | JavaScript / TypeScript developers & package authors | [`signatures/signature-q-npm-package.html`](signatures/signature-q-npm-package.html) |
| **R** | **Git Contributor Card** | `dev`, `photo` | GitHub power users, open-source contributors & freelancers | [`signatures/signature-r-git-contributor.html`](signatures/signature-r-git-contributor.html) |
| **S** | **VS Code Editor Card** | `dev`, `dark` | TypeScript developers, frontend engineers & software architects | [`signatures/signature-s-code-editor.html`](signatures/signature-s-code-editor.html) |
| **T** | **macOS Terminal Prompt** | `dev`, `dark` | Backend engineers, DevOps, Linux enthusiasts & CLI power users | [`signatures/signature-t-terminal-prompt.html`](signatures/signature-t-terminal-prompt.html) |
| **U** | **QR Contact Card** | `photo`, `minimal` | In-person networkers, founders & conference attendees | [`signatures/signature-u-qr-contact-card.html`](signatures/signature-u-qr-contact-card.html) |
| **V** | **Availability & Stack Rail** | `dev`, `photo` | Freelancers, contract engineers & agency developers | [`signatures/signature-v-availability-stack.html`](signatures/signature-v-availability-stack.html) |
| **W** | **Split Portrait Card** | `photo` | Client-facing leaders, speakers & design directors | [`signatures/signature-w-split-portrait-card.html`](signatures/signature-w-split-portrait-card.html) |
| **X** | **Accent Divider Minimal** | `photo`, `minimal` | Engineers & designers who appreciate clean typography | [`signatures/signature-x-accent-divider-minimal.html`](signatures/signature-x-accent-divider-minimal.html) |
| **Y** | **Monogram Watermark Card** | `minimal` | Developers, architects & technical writers | [`signatures/signature-y-monogram-watermark.html`](signatures/signature-y-monogram-watermark.html) |

---

## 📁 Project Architecture

```text
email-signature/
├── index.html                   # Showcase & preview dashboard for all 25 signatures
├── data/
│   ├── profile.json             # Single source of truth for personal / contact info (Schema v2)
│   └── profile.js               # Auto-synced global data for zero-CORS browser support
├── assets/
│   ├── images/
│   │   ├── photo.png            # Retina-optimized portrait avatar (~86KB)
│   │   └── monogram.png         # Monogram initials avatar (~2KB)
│   └── icons/                   # Monochrome contact & social icons (RGBA)
│       ├── i-mail.png, i-phone.png, i-globe.png, i-map-pin.png, i-whatsapp.png
│       └── s-github.png, s-linkedin.png, s-x.png, s-instagram.png, s-youtube.png
├── signatures/                  # Standalone signature pages with simulator toggles
│   └── signature-[a-y]-*.html   # 25 standalone HTML signature files
├── scripts/
│   ├── build.js                 # Rebuilds standalone signatures and data/profile.js
│   └── check.js                 # Automated test suite (security, escaping, schema)
├── src/
│   ├── schema.js                # Schema definition, migration, and serialization
│   └── templates.js             # Signature template engine & standalone generator
├── .github/
│   └── workflows/
│       ├── ci.yml               # Automated CI test runner on pushes & pull requests
│       └── deploy-pages.yml     # Automated GitHub Pages deployment pipeline
└── package.json
```

---

## 🛠️ Development & Automation Scripts

```bash
# Run automated test suite (XSS escaping, URL sanitization, schema migration)
npm test

# Regenerate data/profile.js and all 25 signatures/ files
npm run build

# Run tests and verify build integrity
npm run validate

# Start local static development server
npm run serve
```

---

## ✏️ Customization

### Option A: Via Live Studio Drawer (Recommended)
1. Open `index.html` in your browser.
2. Press <kbd>Cmd</kbd>+<kbd>E</kbd> or click **Edit Profile**.
3. Edit fields across the **General**, **Contact**, **Socials**, and **Brand & Images** tabs.
4. All signature previews update live in real-time. Changes persist in your browser's `localStorage`.
5. Use **Export** to download a clean snapshot of `profile.json`.

### Option B: Via `profile.json` (for CI / automated builds)
Edit `data/profile.json` directly and rebuild:
```bash
npm run build
```

---

## 📋 Email Client Setup

### 📧 Gmail
1. In the studio, click **Copy Signature**.
2. Open Gmail and click the gear icon &rarr; **See all settings** &rarr; **General** &rarr; **Signature**.
3. Click **+ Create new**, name it, and paste with <kbd>Ctrl+V</kbd> / <kbd>Cmd+V</kbd>.
4. Set default signature for new emails and replies, then click **Save Changes**.

### 🍎 Apple Mail (macOS)
1. Click **Copy Signature**.
2. Open Mail &rarr; **Settings** (<kbd>Cmd+,</kbd>) &rarr; **Signatures**.
3. Select account, click **+**, and paste into preview box with <kbd>Cmd+V</kbd>.
4. **Important**: Uncheck *"Always match my default message font"* to keep custom formatting and sizes intact.

### 💼 Outlook (Web & Desktop)
1. Click **Copy Signature**.
2. Go to **Settings** &rarr; **Mail** &rarr; **Compose and reply** &rarr; **Email signature**.
3. Create a new signature, paste into the box, and click **Save**.

---

## 📄 License
MIT &copy; [MD Razikul Islam Joni](https://github.com/razikuljoni)
