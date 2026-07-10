import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ScrollReveal";

export function CTA() {
  return (
    <section className="py-24">
      <div className="container-wide">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-3xl px-8 py-16 text-center shadow-soft sm:px-16 sm:py-24">
            <Image
              src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1800&q=80"
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-sage-dark/80" />
            <div className="relative mx-auto max-w-2xl">
              <p className="eyebrow text-sage-light">Ready when you are</p>
              <h2 className="mt-4 font-serif text-4xl text-white sm:text-5xl">
                Begin your journey to radiant skin
              </h2>
              <p className="mt-5 text-lg text-cream/90">
                Book your personalised treatment today and discover the Solace
                Skin difference — where healthy skin meets total relaxation.
              </p>
              <div className="mt-9 flex flex-wrap justify-center gap-4">
                <Button href="/book" size="lg" variant="gold">
                  Book Your Appointment
                </Button>
                <Button href="/contact" size="lg" variant="white">
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
