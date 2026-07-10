import type { Metadata } from "next";
import { MapPin, Phone, Mail, MessageCircle, Clock, Instagram, Music2 } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { SectionHeading } from "@/components/SectionHeading";
import { faqs } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Solace Skin in Sowutuom, Accra. Call, email, WhatsApp or visit us. Find our address, map and opening hours.",
};

export default function ContactPage() {
  const whatsapp = `https://wa.me/${site.whatsapp}`;

  const details = [
    { icon: MapPin, label: "Visit Us", value: site.location, note: site.locationNote, href: undefined },
    { icon: Phone, label: "Call Us", value: `${site.phone} / ${site.phone2}`, href: `tel:${site.phone}` },
    { icon: Mail, label: "Email Us", value: site.email, href: `mailto:${site.email}` },
    { icon: MessageCircle, label: "WhatsApp", value: "Chat with us", href: whatsapp },
    { icon: Instagram, label: "Instagram", value: site.socials.instagramHandle, href: site.socials.instagram },
    { icon: Music2, label: "TikTok", value: site.socials.tiktokHandle, href: site.socials.tiktok },
  ];

  return (
    <>
      <PageHero
        crumb="Contact"
        eyebrow="Say Hello"
        title="We'd love to hear from you"
        subtitle="Questions, bookings or a warm hello — reach out however suits you best."
        image="https://images.unsplash.com/photo-1607006677169-5e3f4a8d8f4e?auto=format&fit=crop&w=2000&q=80"
      />

      <section className="py-24">
        <div className="container-wide">
          {/* Contact detail cards */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {details.map((d) => {
              const Wrapper: any = d.href ? "a" : "div";
              return (
                <Wrapper
                  key={d.label}
                  {...(d.href ? { href: d.href, target: d.href.startsWith("http") ? "_blank" : undefined, rel: "noopener noreferrer" } : {})}
                  className="group rounded-3xl border border-sand/70 bg-white p-7 text-center shadow-soft transition hover:-translate-y-1 hover:shadow-glow"
                >
                  <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-sage/12 text-sage-dark transition group-hover:bg-sage group-hover:text-white">
                    <d.icon className="h-6 w-6" />
                  </span>
                  <p className="mt-5 text-xs uppercase tracking-wider text-muted">
                    {d.label}
                  </p>
                  <p className="mt-1 font-serif text-lg text-ink">{d.value}</p>
                  {d.note ? (
                    <p className="mt-1 text-xs text-muted">{d.note}</p>
                  ) : null}
                </Wrapper>
              );
            })}
          </div>

          {/* Form + map */}
          <div className="mt-14 grid gap-10 lg:grid-cols-2">
            <div>
              <SectionHeading
                align="left"
                eyebrow="Send a Message"
                title="Drop us a line"
              />
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="overflow-hidden rounded-3xl border border-sand/70 shadow-soft">
                <iframe
                  title="Map to Solace Skin, Sowutuom, Accra"
                  src={site.mapEmbed}
                  className="h-[340px] w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>

              <div className="rounded-3xl border border-sand/70 bg-white p-7 shadow-soft">
                <div className="flex items-center gap-2 text-sage-dark">
                  <Clock className="h-5 w-5" />
                  <h3 className="font-serif text-xl text-ink">Opening Hours</h3>
                </div>
                <ul className="mt-4 divide-y divide-sand text-sm">
                  {site.hours.map((h) => (
                    <li key={h.day} className="flex justify-between py-2.5">
                      <span className="text-muted">{h.day}</span>
                      <span className="font-medium text-ink">{h.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-beige/50 py-24">
        <div className="container-wide">
          <SectionHeading eyebrow="Good to Know" title="Frequently asked questions" />
          <div className="mx-auto mt-12 max-w-3xl space-y-4">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-2xl border border-sand/70 bg-white p-6 shadow-soft"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between font-serif text-lg text-ink">
                  {f.q}
                  <span className="ml-4 text-sage-dark transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
