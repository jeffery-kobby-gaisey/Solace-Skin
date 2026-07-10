import type { Metadata } from "next";
import { Suspense } from "react";
import { Clock, Phone, ShieldCheck, CalendarCheck } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { BookingForm } from "@/components/BookingForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book an Appointment",
  description:
    "Book your skincare or wellness treatment at Solace Skin in Sowutuom, Accra. Quick, easy online appointment requests.",
};

const perks = [
  { icon: CalendarCheck, title: "Flexible scheduling", text: "Choose a date and time that suits you." },
  { icon: ShieldCheck, title: "Certified therapists", text: "Every treatment in safe, expert hands." },
  { icon: Clock, title: "Fast confirmation", text: "We reply promptly by email or phone." },
];

export default function BookPage() {
  return (
    <>
      <PageHero
        crumb="Book"
        eyebrow="Reserve Your Slot"
        title="Book your appointment"
        subtitle="Tell us what you'd love and when — we'll take care of the rest."
        image="https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=2000&q=80"
      />

      <section className="py-24">
        <div className="container-wide grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          {/* Info column */}
          <div>
            <p className="eyebrow mb-3">Why book with us</p>
            <h2 className="font-serif text-3xl text-ink">
              A seamless booking experience
            </h2>
            <p className="mt-4 text-muted">
              Requesting an appointment takes less than a minute. Prefer to
              talk? Reach us any time.
            </p>

            <ul className="mt-8 space-y-5">
              {perks.map((p) => (
                <li key={p.title} className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sage/12 text-sage-dark">
                    <p.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-serif text-lg text-ink">{p.title}</h3>
                    <p className="text-sm text-muted">{p.text}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-10 rounded-2xl border border-sand/70 bg-white p-6 shadow-soft">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-sage-dark" />
                <div>
                  <p className="text-sm text-muted">Prefer to call?</p>
                  <a
                    href={`tel:${site.phone}`}
                    className="font-serif text-lg text-ink hover:text-sage-dark"
                  >
                    {site.phone} / {site.phone2}
                  </a>
                </div>
              </div>
              <div className="mt-4 border-t border-sand pt-4 text-sm text-muted">
                {site.hours.map((h) => (
                  <div key={h.day} className="flex justify-between py-0.5">
                    <span>{h.day}</span>
                    <span className="text-ink">{h.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Form column */}
          <Suspense
            fallback={
              <div className="rounded-3xl border border-sand/70 bg-white p-9 shadow-soft">
                Loading form…
              </div>
            }
          >
            <BookingForm />
          </Suspense>
        </div>
      </section>
    </>
  );
}
