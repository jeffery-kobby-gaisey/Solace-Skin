import Link from "next/link";
import Image from "next/image";
import { Instagram, MapPin, Phone, Mail } from "lucide-react";
import { nav, site } from "@/lib/site";
import { services } from "@/lib/services";
import { Newsletter } from "./Newsletter";

/** TikTok logo — lucide-react has no TikTok icon, so we inline it. */
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M16.6 5.82a4.28 4.28 0 0 1-1.05-2.82h-3.2v13.28a2.59 2.59 0 1 1-2.59-2.59c.27 0 .53.04.77.11v-3.28a5.86 5.86 0 0 0-.77-.05 5.83 5.83 0 1 0 5.83 5.83V9.62a7.36 7.36 0 0 0 4.31 1.38V7.8a4.28 4.28 0 0 1-3.3-1.98z" />
    </svg>
  );
}

export function Footer() {
  const year = 2026; // static to keep the build deterministic; update as needed
  return (
    <footer className="mt-24 bg-ink text-cream/80">
      <div className="container-wide grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="inline-flex" aria-label="Solace Skin — home">
            <Image
              src="/logo.jpg"
              alt="Solace Skin"
              width={200}
              height={200}
              className="h-24 w-24 rounded-2xl object-contain"
            />
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/60">
            {site.tagline} A premium skincare & wellness sanctuary in the heart
            of Accra.
          </p>
          <div className="mt-5 flex gap-3">
            <a
              href={site.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Instagram ${site.socials.instagramHandle}`}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-sage"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href={site.socials.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`TikTok ${site.socials.tiktokHandle}`}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-sage"
            >
              <TikTokIcon className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-serif text-lg text-white">Quick Links</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-underline hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/book" className="link-underline hover:text-white">
                Book Appointment
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-serif text-lg text-white">Services</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services#${s.slug}`}
                  className="link-underline hover:text-white"
                >
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-serif text-lg text-white">Get in Touch</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sage-light" />
              <span>
                {site.location}
                <span className="block text-cream/50">{site.locationNote}</span>
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 shrink-0 text-sage-light" />
              <span className="flex flex-wrap gap-x-2">
                <a href={`tel:${site.phone}`} className="hover:text-white">
                  {site.phone}
                </a>
                <span aria-hidden>/</span>
                <a href={`tel:${site.phone2}`} className="hover:text-white">
                  {site.phone2}
                </a>
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 shrink-0 text-sage-light" />
              <a href={`mailto:${site.email}`} className="hover:text-white">
                {site.email}
              </a>
            </li>
          </ul>
          <div className="mt-6">
            <Newsletter variant="footer" />
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-wide flex flex-col items-center justify-between gap-3 py-6 text-xs text-cream/50 sm:flex-row">
          <p>© {year} Solace Skin. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
