import type { Metadata } from "next";
import Image from "next/image";
import { Target, Eye, HeartHandshake, Sparkles } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { CTA } from "@/components/home/CTA";
import {
  ScrollReveal,
  ScrollRevealGroup,
  ScrollRevealItem,
} from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet Solace Skin — a premium skincare & wellness spa in Sowutuom, Accra. Our story, mission, vision and client-first philosophy.",
};

const pillars = [
  {
    icon: Target,
    title: "Our Mission",
    text: "To help every client feel confident in their skin through safe, effective and personalised skincare — delivered with warmth and expertise.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    text: "To be Accra's most trusted destination for results-driven skincare and genuine relaxation, setting the standard for luxury wellness in Ghana.",
  },
  {
    icon: HeartHandshake,
    title: "Client-First Philosophy",
    text: "You are at the centre of everything we do. We listen, assess and tailor each treatment so your goals — and your comfort — always come first.",
  },
];

const values = [
  { title: "Experienced Therapists", text: "A team of certified skincare professionals with years of hands-on expertise." },
  { title: "Modern Equipment", text: "Advanced, well-maintained skincare technology for safe, visible results." },
  { title: "Premium Products", text: "Carefully selected, skin-loving formulations suited to every skin type." },
  { title: "Serene Environment", text: "A calm, private sanctuary designed to help you truly switch off." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumb="About"
        eyebrow="Our Story"
        title="Rooted in care, defined by results"
        subtitle="A skincare sanctuary in the heart of Sowutuom, Accra."
        image="https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=2000&q=80"
      />

      {/* Story */}
      <section className="py-24">
        <div className="container-wide grid items-center gap-14 lg:grid-cols-2">
          <ScrollReveal>
            <div className="relative">
              <div className="overflow-hidden rounded-3xl shadow-soft">
                <Image
                  src="https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1000&q=80"
                  alt="The calm interior of the Solace Skin spa"
                  width={1000}
                  height={1150}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -left-4 -top-4 -z-10 h-40 w-40 rounded-3xl bg-blush/40" />
            </div>
          </ScrollReveal>

          <div>
            <SectionHeading
              align="left"
              eyebrow="Who We Are"
              title="Where healthy skin meets total relaxation"
            />
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted">
              <p>
                Solace Skin was born from a simple belief: that great skincare
                should feel as good as it looks. We created a space in Sowutuom,
                Accra where science-backed treatments and true relaxation live
                side by side.
              </p>
              <p>
                From your first consultation, our certified therapists take the
                time to understand your skin and your goals. Every facial, peel
                and massage is thoughtfully personalised — never one-size-fits-all.
              </p>
              <p>
                Today, hundreds of clients across Accra trust us to help them
                reveal their best skin. We'd be honoured to welcome you next.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Vision / Philosophy */}
      <section className="bg-beige/50 py-24">
        <div className="container-wide">
          <SectionHeading
            eyebrow="What Drives Us"
            title="Our mission, vision & philosophy"
          />
          <ScrollRevealGroup className="mt-14 grid gap-7 md:grid-cols-3">
            {pillars.map((p) => (
              <ScrollRevealItem
                key={p.title}
                className="rounded-3xl border border-sand/70 bg-white p-8 shadow-soft"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sage/12 text-sage-dark">
                  <p.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-6 font-serif text-2xl text-ink">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {p.text}
                </p>
              </ScrollRevealItem>
            ))}
          </ScrollRevealGroup>
        </div>
      </section>

      {/* Values */}
      <section className="py-24">
        <div className="container-wide">
          <SectionHeading
            eyebrow="The Solace Standard"
            title="What sets us apart"
          />
          <ScrollRevealGroup className="mt-14 grid gap-6 sm:grid-cols-2">
            {values.map((v) => (
              <ScrollRevealItem
                key={v.title}
                className="flex items-start gap-4 rounded-2xl border border-sand/60 bg-white/60 p-6"
              >
                <Sparkles className="mt-1 h-5 w-5 shrink-0 text-gold" />
                <div>
                  <h3 className="font-serif text-lg text-ink">{v.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{v.text}</p>
                </div>
              </ScrollRevealItem>
            ))}
          </ScrollRevealGroup>
        </div>
      </section>

      <CTA />
    </>
  );
}
