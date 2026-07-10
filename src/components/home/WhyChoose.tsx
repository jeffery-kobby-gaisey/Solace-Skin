import Image from "next/image";
import { SectionHeading } from "@/components/SectionHeading";
import { Icon } from "@/components/Icon";
import {
  ScrollReveal,
  ScrollRevealGroup,
  ScrollRevealItem,
} from "@/components/ScrollReveal";
import { whyChoose } from "@/lib/content";

export function WhyChoose() {
  return (
    <section className="py-24">
      <div className="container-wide grid items-center gap-14 lg:grid-cols-2">
        <ScrollReveal>
          <div className="relative">
            <div className="overflow-hidden rounded-3xl shadow-soft">
              <Image
                src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=1000&q=80"
                alt="Skincare therapist performing a facial treatment"
                width={1000}
                height={1200}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-4 hidden rounded-2xl bg-white p-5 shadow-soft sm:block">
              <p className="font-serif text-3xl font-semibold text-sage-dark">
                10+ yrs
              </p>
              <p className="text-xs text-muted">of skincare expertise</p>
            </div>
          </div>
        </ScrollReveal>

        <div>
          <SectionHeading
            align="left"
            eyebrow="Why Solace Skin"
            title="A sanctuary built around your skin"
            subtitle="Every detail — from our certified therapists to our modern technology — is designed to deliver visible results in a space made for total relaxation."
          />

          <ScrollRevealGroup className="mt-8 space-y-4">
            {whyChoose.map((item) => (
              <ScrollRevealItem
                key={item.title}
                className="flex items-start gap-4 rounded-2xl border border-transparent p-3 transition hover:border-sand hover:bg-white/60"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sage/12 text-sage-dark">
                  <Icon name={item.icon} className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-serif text-lg text-ink">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">
                    {item.text}
                  </p>
                </div>
              </ScrollRevealItem>
            ))}
          </ScrollRevealGroup>
        </div>
      </div>
    </section>
  );
}
