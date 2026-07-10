export const whyChoose = [
  {
    icon: "BadgeCheck",
    title: "Certified Professionals",
    text: "Every treatment is performed by trained, licensed skincare therapists.",
  },
  {
    icon: "UserRoundCheck",
    title: "Personalized Treatments",
    text: "We assess your skin and tailor each session to your unique goals.",
  },
  {
    icon: "Sparkles",
    title: "Modern Technology",
    text: "Advanced, results-driven skincare devices and premium products.",
  },
  {
    icon: "Leaf",
    title: "Relaxing Environment",
    text: "A calm, serene space designed for total comfort and escape.",
  },
  {
    icon: "ShieldCheck",
    title: "Safe & Hygienic",
    text: "Strict sanitation and single-use protocols on every procedure.",
  },
];

export type GalleryItem = {
  src: string;
  alt: string;
  category: "Spa" | "Treatments" | "Before & After" | "Clients" | "Equipment";
  span?: boolean; // taller tile in the masonry grid
};

export const galleryCategories = [
  "All",
  "Spa",
  "Treatments",
  "Before & After",
  "Clients",
  "Equipment",
] as const;

export const gallery: GalleryItem[] = [
  {
    src: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=80",
    alt: "Serene spa treatment room with candles",
    category: "Spa",
    span: true,
  },
  {
    src: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=900&q=80",
    alt: "Client receiving a manual facial",
    category: "Treatments",
  },
  {
    src: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=900&q=80",
    alt: "Glowing skin after a chemical peel",
    category: "Before & After",
  },
  {
    src: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=900&q=80",
    alt: "Relaxed client in the spa lounge",
    category: "Clients",
    span: true,
  },
  {
    src: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=80",
    alt: "HydraFacial technology device",
    category: "Equipment",
  },
  {
    src: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=900&q=80",
    alt: "Full-body relaxation massage",
    category: "Treatments",
  },
  {
    src: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=900&q=80",
    alt: "Spa reception with soft lighting",
    category: "Spa",
  },
  {
    src: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=900&q=80",
    alt: "Microneedling treatment in progress",
    category: "Treatments",
    span: true,
  },
  {
    src: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=900&q=80",
    alt: "Skincare products and tools",
    category: "Equipment",
  },
  {
    src: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=900&q=80",
    alt: "Happy client with radiant skin",
    category: "Clients",
  },
  {
    src: "https://images.unsplash.com/photo-1620331311520-246422fd82f9?auto=format&fit=crop&w=900&q=80",
    alt: "Before and after facial glow",
    category: "Before & After",
  },
  {
    src: "https://images.unsplash.com/photo-1607006677169-5e3f4a8d8f4e?auto=format&fit=crop&w=900&q=80",
    alt: "Calm spa corridor with plants",
    category: "Spa",
  },
];

export const faqs = [
  {
    q: "How do I book an appointment?",
    a: "Use our online booking form, send a WhatsApp message, or call us directly. You'll receive a confirmation once your slot is reserved.",
  },
  {
    q: "Do I need a consultation first?",
    a: "For advanced treatments like microneedling or chemical peels we include a short skin assessment so we can personalise your care.",
  },
  {
    q: "What should I do before my facial?",
    a: "Come with clean skin where possible and avoid heavy sun exposure or exfoliating products for 48 hours beforehand.",
  },
  {
    q: "Where are you located?",
    a: "We're in Sowutuom, Accra, Ghana. Full directions and a map are on our Contact page.",
  },
];
