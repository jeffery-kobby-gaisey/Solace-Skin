/** Central place for brand + contact info. Reads public env with sane defaults. */
export const site = {
  name: "Solace Skin",
  tagline: "Where Healthy Skin Meets Total Relaxation.",
  description:
    "Solace Skin is a premium skincare & wellness spa in Sowutuom, Accra. Facials, chemical peels, HydraFacial, microneedling and massage delivered by certified professionals.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  location: "Fani Medical Service, Sowutuom – Accra",
  locationNote: "Can be found on Uber, Yango & Bolt",
  address: {
    street: "Fani Medical Service, Sowutuom",
    city: "Accra",
    region: "Greater Accra",
    country: "Ghana",
  },
  email: process.env.NEXT_PUBLIC_BUSINESS_EMAIL || "solaceskin.gh@gmail.com",
  phone: process.env.NEXT_PUBLIC_BUSINESS_PHONE || "0593921370",
  phone2: "0541430112",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "233593921370",
  hours: [
    { day: "Monday – Friday", time: "9:00 AM – 7:00 PM" },
    { day: "Saturday", time: "9:00 AM – 6:00 PM" },
    { day: "Sunday", time: "11:00 AM – 4:00 PM" },
  ],
  socials: {
    instagram: "https://instagram.com/solaceskin_gh",
    instagramHandle: "@solaceskin_gh",
    tiktok: "https://tiktok.com/@solacesking",
    tiktokHandle: "@solacesking",
  },
  // Google Maps embed for Fani Medical Service, Sowutuom, Accra (place search — no API key required).
  mapEmbed:
    "https://www.google.com/maps?q=Fani+Medical+Service,+Sowutuom,+Accra,+Ghana&output=embed",
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
] as const;
