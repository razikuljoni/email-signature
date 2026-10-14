(function () {
  const SCHEMA_VERSION = 2;
  const DEFAULT_BRAND = {
    accent: '#2B4BF2',
    font: 'helvetica',
    avatarShape: 'rounded',
    avatarSize: 88,
    layout: 'horizontal',
    mode: 'light'
  };

  const DEFAULT_PROFILE = {
    version: SCHEMA_VERSION,
    name: '',
    title: '',
    pronouns: '',
    tagline: '',
    email: '',
    phone: '',
    whatsapp: '',
    website: '',
    websiteDisplay: '',
    location: '',
    booking: { url: '', label: 'Book a call →' },
    socials: { linkedin: '', github: '', x: '', instagram: '', youtube: '' },
    images: { photo: 'assets/images/photo.png', monogram: 'assets/images/monogram.png', logo: '' },
    brand: DEFAULT_BRAND,
    signature: { template: 'a', perTemplate: {} }
  };

  function migrate(input) {
    if (!input || typeof input !== 'object') return JSON.parse(JSON.stringify(DEFAULT_PROFILE));
    const merged = JSON.parse(JSON.stringify(DEFAULT_PROFILE));
    
    // shallow copy top level scalar/objects
    for (const k of Object.keys(input)) {
      if (k === 'booking' && input.booking) {
        merged.booking = Object.assign({}, merged.booking, input.booking);
      } else if (k === 'socials' && input.socials) {
        merged.socials = Object.assign({}, merged.socials, input.socials);
      } else if (k === 'images' && input.images) {
        merged.images = Object.assign({}, merged.images, input.images);
      } else if (k === 'brand' && input.brand) {
        merged.brand = Object.assign({}, merged.brand, input.brand);
      } else if (k === 'signature' && input.signature) {
        merged.signature = Object.assign({}, merged.signature, input.signature);
      } else {
        merged[k] = input[k];
      }
    }
    merged.version = SCHEMA_VERSION;
    return merged;
  }

  function serializeProfile(p) {
    return JSON.stringify(migrate(p), null, 2);
  }

  function parseProfile(text) {
    const obj = JSON.parse(text);
    return migrate(obj);
  }

  const API = { SCHEMA_VERSION, DEFAULT_BRAND, DEFAULT_PROFILE, migrate, serializeProfile, parseProfile };
  if (typeof module !== 'undefined' && module.exports) module.exports = API;
  if (typeof window !== 'undefined') window.SignatureSchema = API;
})();
