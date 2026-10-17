# Changelog

All notable changes to the Email Signature Studio project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
