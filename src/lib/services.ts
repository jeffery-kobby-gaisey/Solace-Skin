export type Service = {
  slug: string;
  name: string;
  icon: string; // lucide-react icon name
  short: string;
  description: string;
  benefits: string[];
  duration: string;
  price: string;
  image: string;
};

export const services: Service[] = [
  {
    slug: "manual-facial",
    name: "Manual Facial",
    icon: "Sparkles",
    short: "Deep cleansing facial to refresh and nourish the skin.",
    description:
      "A soothing, hands-on facial that deeply cleanses, exfoliates and hydrates. We tailor products to your skin type to unclog pores, calm irritation and restore a natural, healthy glow.",
    benefits: [
      "Deep pore cleansing & extraction",
      "Gentle exfoliation for smoother texture",
      "Balances oil and hydration",
      "Immediate radiance and softness",
    ],
    duration: "60 minutes",
    price: "from GH₵350",
    image:
      "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "chemical-peel",
    name: "Chemical Peel",
    icon: "Droplets",
    short:
      "Professional exfoliation treatment that improves skin tone and texture.",
    description:
      "A professional-grade exfoliation using carefully selected acids to resurface the skin. Reduces dullness, hyperpigmentation and uneven texture, revealing brighter, more even-toned skin.",
    benefits: [
      "Fades dark spots & hyperpigmentation",
      "Smooths rough, uneven texture",
      "Reduces the look of fine lines",
      "Brightens a dull complexion",
    ],
    duration: "45 minutes",
    price: "from GH₵450",
    image:
      "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "hydrafacial",
    name: "HydraFacial",
    icon: "Waves",
    short:
      "Hydrating facial using advanced technology to cleanse, extract and moisturize.",
    description:
      "Our signature HydraFacial uses patented vortex technology to cleanse, extract and infuse the skin with intense hydration and antioxidants — all in one relaxing, no-downtime treatment.",
    benefits: [
      "Instant, deep hydration",
      "Painless extraction of impurities",
      "Antioxidant & peptide infusion",
      "Plump, dewy, camera-ready glow",
    ],
    duration: "50 minutes",
    price: "from GH₵600",
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "microneedling",
    name: "Microneedling",
    icon: "Zap",
    short:
      "Collagen-inducing treatment that reduces acne scars, fine lines and improves texture.",
    description:
      "A collagen-induction therapy that creates controlled micro-channels to stimulate your skin's natural repair. Over a course of sessions it visibly softens scars, refines pores and firms the skin.",
    benefits: [
      "Reduces acne scars & fine lines",
      "Stimulates natural collagen",
      "Refines enlarged pores",
      "Firmer, more resilient skin",
    ],
    duration: "75 minutes",
    price: "from GH₵700",
    image:
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "massage",
    name: "Massage",
    icon: "Flower2",
    short:
      "Relaxing full-body massage designed to relieve stress and muscle tension.",
    description:
      "Unwind with a restorative full-body massage. Using warm oils and expert technique, our therapists release muscle tension, improve circulation and melt away the stress of the day.",
    benefits: [
      "Relieves muscle tension & knots",
      "Improves circulation",
      "Reduces stress & anxiety",
      "Deep, restorative relaxation",
    ],
    duration: "60 – 90 minutes",
    price: "from GH₵400",
    image:
      "https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=1200&q=80",
  },
];

export const serviceNames = services.map((s) => s.name);

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
