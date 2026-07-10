"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=2000&q=80"
          alt="Serene luxury spa treatment room at Solace Skin"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-ink/55" />
      </div>

      <div className="container-wide pt-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-white backdrop-blur">
            <MapPin className="h-3.5 w-3.5" /> {site.location}
          </span>

          <h1 className="mt-6 font-serif text-5xl font-semibold leading-[1.05] text-white sm:text-6xl md:text-7xl">
            Reveal Your <span className="italic text-sage-light">Best Skin</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/90">
            Professional skincare treatments designed to restore your glow,
            confidence, and relaxation.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Button href="/book" size="lg" variant="gold">
              Book Appointment
            </Button>
            <Button href="/services" size="lg" variant="white">
              Explore Services
            </Button>
          </div>

          <div className="mt-10 flex items-center gap-3 text-cream/90">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-gold text-gold" />
              ))}
            </div>
            <p className="text-sm">
              Loved by <strong className="text-white">500+</strong> happy clients
              in Accra
            </p>
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:block">
        <div className="flex h-11 w-7 items-start justify-center rounded-full border-2 border-white/50 p-1.5">
          <span className="h-2 w-1 animate-float rounded-full bg-white/80" />
        </div>
      </div>
    </section>
  );
}
