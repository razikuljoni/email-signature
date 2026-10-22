# Changelog

All notable changes to the Email Signature Studio project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.2.0] - 2026-10-22

### Added
- **5 New Signature Styles (Templates U through Y)**:
  - **Template U (`signature-u-qr-contact-card`)**: QR Contact Card — Bordered card with portrait avatar, contact details, socials, and scannable QR code linking to contact/website.
  - **Template V (`signature-v-availability-stack`)**: Availability & Stack Rail — Left-rail layout with green project availability indicator (`● Available for new projects`), tech stack tags, and contact rows.
  - **Template W (`signature-w-split-portrait-card`)**: Split Portrait Card — Bordered card featuring flush full-height portrait photo on the left pane and 2×2 contact details grid on the right pane.
  - **Template X (`signature-x-accent-divider-minimal`)**: Accent Divider Minimal — Two-tone accent typography on name, vertical divider line, and clean contact & social icons.
  - **Template Y (`signature-y-monogram-watermark`)**: Monogram Watermark Card — Large, subtle `RJ` initials watermark backdrop on the right pane with structured contact details on the left.
- **Suite Expansion**: Rebuilt and validated all 25 standalone HTML signatures. Total collection is now 25 production-ready signatures.

---

## [2.1.0] - 2026-10-22

### Added
- **5 New Developer Signature Templates**:
  - **Template P (`signature-p-dev-badges`)**: Developer Shields Badges — Shields.io style dual-color pill badges for contact endpoints and tech stack (`email`, `whatsapp`, `web`, `Next.js`, `TypeScript`, `Node.js`, `PostgreSQL`), circular avatar, and clean social links.
  - **Template Q (`signature-q-npm-package`)**: NPM Package Card — Authentic npm package registry layout featuring `$ npm install <pkg>` terminal block, package version tag, status pills (`open to work ✓`, `stack: next.js · ts · node`, `based: dhaka, bd`).
  - **Template R (`signature-r-git-contributor`)**: Git Contributor Card — Clean white bordered card with circular developer avatar, `@handle`, `Book a call` CTA button, and responsive 4-row GitHub commit contribution heatmap grid.
  - **Template S (`signature-s-code-editor`)**: VS Code Editor Card — Dark Visual Studio Code window mock with `developer.ts` tab, line numbers 1–8, and syntax-highlighted export object.
  - **Template T (`signature-t-terminal-prompt`)**: macOS Terminal Prompt — Dark terminal window with macOS red/yellow/green traffic lights, `$ whoami` zsh prompt, formatted system spec keys, and array link bracket footer.
- **Dedicated Developer Filter**: Added quick category filter button `Developer` in the dashboard with live dynamic count.
- **Test Suite Enhancements**: Added 5 new automated unit tests validating rendering integrity, badge markers, syntax highlighting, and commit heatmap cells in `scripts/check.js`.

---

## [2.0.0] - 2026-10-17

### Added
- **Modern Glassmorphic Studio Dashboard**: Sleek dark UI/UX (`#080c16`) with ambient radial mesh glow, sticky top navigation bar, and responsive layout.
- **Instant Template Search (`⌘K`)**: Live search across all 15 signature templates by letter, title, description, tags, and recommended roles.
- **Slide-Over Profile Editor Drawer (`⌘E`)**: 4 organized tabs (General, Contact, Socials, Brand & Images) with real-time live preview sync and `localStorage` persistence.
- **Dual Email Simulator**: Client background theme switch (Light / Dark) and viewport width switch (Desktop 600px vs Mobile 375px bounded container).
- **Email Composer Mockup Modal**: Full email client preview window simulating recipient header and authentic email body context.
- **Standalone Signature UI Overhaul**: Rebuilt all 15 standalone HTML files in `signatures/` with matching modern dark glassmorphism and client simulator toggle.
- **Missing Icon Assets**: Added monochrome icons for WhatsApp (`i-whatsapp.png`), Instagram (`s-instagram.png`), and YouTube (`s-youtube.png`).
- **CI/CD Automation Pipeline**: Added `.github/workflows/ci.yml` running automated tests (`npm test`) and build verification on push and pull requests to `master` and `dev`.
- **Package Scripts**: Added `npm test` and `npm run validate` to `package.json`.

### Changed
- **Asset Optimization**: Reduced default avatar `photo.png` from 1.6MB down to 86KB (94.6% size reduction) at crisp 2x Retina resolution.
- **Monogram Avatar**: Replaced duplicated photo copy with a clean initials avatar badge (`monogram.png`, ~1.8KB).
- **GitHub Pages Workflow**: Added automated `npm test` validation step prior to build and deployment.
- **Documentation**: Overhauled `README.md` with complete template directory table, keyboard shortcuts, and client setup instructions.

---

## [1.1.0] - 2026-10-16

### Added
- Eight new signature templates (Templates H through O):
  - `signature-h-contact-rail.html`
  - `signature-i-pill-badges.html`
  - `signature-j-labeled-columns.html`
  - `signature-k-bordered-contact-grid.html`
  - `signature-l-centered-serif-classic.html`
  - `signature-m-split-dark-panel.html`
  - `signature-n-card-cta.html`
  - `signature-o-accent-rail.html`
- Template manifests, slug conventions, and automated build generation.

---

## [1.0.0] - 2026-10-06

### Initial Release
- Centralized `profile.json` source of truth.
- Core signature templates (Templates A through G).
- 1-click rich text clipboard copying for Gmail, Apple Mail, and Outlook.
- Automated `build.js` generation of `data/profile.js` and standalone HTML pages.
