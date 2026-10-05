# Email Signature Studio

Multi-template email signature system with centralized profile data, live preview dashboard, and 1-click rich-text copying for Gmail, Apple Mail, and Outlook.

---

## 🚀 Quick Start

1. **Open the Showcase Dashboard**:
   Simply open [`index.html`](file:///Users/razikuljoni/Workspace/Others/email-signature/index.html) in any browser, or run:
   ```bash
   npm run serve
   ```
2. **Copy Your Signature**:
   - Click **Copy Signature** on any template.
   - Go to your email client's signature settings (e.g. Gmail &rarr; *See all settings* &rarr; *Signature*).
   - Press <kbd>Ctrl+V</kbd> or <kbd>Cmd+V</kbd> to paste.
   - Save changes.

---

## 📁 Project Structure

```text
email-signature/
├── index.html                   # Showcase & preview dashboard for all signatures
├── data/
│   ├── profile.json             # Single source of truth for personal / contact info
│   └── profile.js               # Auto-synced global data for zero-CORS browser support
├── assets/
│   ├── images/
│   │   ├── photo.png            # Portrait photo
│   │   └── monogram.png         # Monogram initials avatar
│   └── icons/                   # Shared monochrome contact & social icons
│       ├── i-mail.png, i-phone.png, i-globe.png, i-map-pin.png
│       └── s-github.png, s-linkedin.png, s-x.png
├── signatures/                  # Standalone signature pages (open directly)
│   ├── signature-a.html         # Essential (Text-only, zero images, 100% deliverability)
│   ├── signature-b.html         # Portrait Minimal (Photo, divider, monochrome icons)
│   ├── signature-c.html         # Monogram Avatar (Discreet monogram + hairline divider)
│   ├── signature-d.html         # Noir Card (Dark container card with high contrast)
│   └── signature-e.html         # Developer Pro (Dual-color banner + social badge grid)
├── scripts/
│   └── build.js                 # Rebuilds all signatures from data/profile.json
└── package.json
```

---

## ✏️ How to Update Your Information

1. Edit [`data/profile.json`](file:///Users/razikuljoni/Workspace/Others/email-signature/data/profile.json) with your updated contact information, links, or titles:
   ```json
   {
     "name": "MD Razikul Islam Joni",
     "title": "Full-Stack Developer",
     "email": "razikuljoni@gmail.com",
     "phone": "+880 1623-208660",
     "whatsapp": "https://wa.me/8801623208660",
     "website": "https://www.razikuljoni.xyz",
     "websiteDisplay": "razikuljoni.xyz",
     "location": "Dhaka, Bangladesh",
     "booking": {
       "url": "https://cal.com/razikuljoni",
       "label": "Book a call →"
     }
   }
   ```
2. Rebuild all standalone signature files:
   ```bash
   npm run build
   ```
   *(Or run `node scripts/build.js`)*

All standalone pages in `signatures/` and `data/profile.js` will update automatically!

---

## 📋 Client Setup Instructions

### 📧 Gmail
1. In the studio, click **Copy Signature**.
2. Open Gmail and click the gear icon &rarr; **See all settings**.
3. Under the **General** tab, scroll to **Signature**.
4. Click **Create new**, name it, and paste with <kbd>Ctrl+V</kbd> / <kbd>Cmd+V</kbd>.
5. Set default signature for new emails and replies.
6. Scroll down and click **Save Changes**.

### 🍎 Apple Mail (macOS)
1. Click **Copy Signature**.
2. Open Mail &rarr; **Settings** (<kbd>Cmd+,</kbd>) &rarr; **Signatures**.
3. Add a new signature and paste with <kbd>Cmd+V</kbd>.
4. **Important**: Uncheck *"Always match my default message font"* to keep font sizes and styling intact.

### 💼 Outlook
1. Click **Copy Signature**.
2. Go to **Settings** &rarr; **Mail** &rarr; **Compose and reply** &rarr; **Email signature**.
3. Create a new signature, paste into the box, and click **Save**.
