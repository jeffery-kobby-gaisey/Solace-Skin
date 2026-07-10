import type { Metadata } from "next";
import Image from "next/image";
import { Clock, Check, Tag } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/Icon";
import { ScrollReveal } from "@/components/ScrollReveal";
import { services } from "@/lib/services";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore Solace Skin treatments: Manual Facial, Chemical Peel, HydraFacial, Microneedling and Massage. Benefits, duration and pricing.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumb="Services"
        eyebrow="Our Treatments"
        title="Skincare, perfected for you"
        subtitle="Results-driven treatments and deep relaxation — tailored to your skin and delivered by certified professionals."
        image="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=2000&q=80"
      />

      <div className="py-24">
        <div className="container-wide space-y-24">
          {services.map((service, i) => {
            const reversed = i % 2 === 1;
            return (
              <section
                key={service.slug}
                id={service.slug}
                className="scroll-mt-28"
              >
                <div className="grid items-center gap-12 lg:grid-cols-2">
                  <ScrollReveal className={cn(reversed && "lg:order-2")}>
                    <div className="relative overflow-hidden rounded-3xl shadow-soft">
                      <Image
                        src={service.image}
                        alt={service.name}
                        width={1100}
                        height={800}
                        className="aspect-[11/8] w-full object-cover"
                      />
                    </div>
                  </ScrollReveal>

                  <ScrollReveal className={cn(reversed && "lg:order-1")}>
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sage/12 text-sage-dark">
                      <Icon name={service.icon} className="h-6 w-6" />
                    </span>
                    <h2 className="mt-5 font-serif text-3xl text-ink sm:text-4xl">
                      {service.name}
                    </h2>
                    <p className="mt-4 text-base leading-relaxed text-muted">
                      {service.description}
                    </p>

                    <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                      {service.benefits.map((b) => (
                        <li
                          key={b}
                          className="flex items-start gap-2.5 text-sm text-ink"
                        >
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-sage" />
                          {b}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-7 flex flex-wrap items-center gap-5">
                      <span className="inline-flex items-center gap-2 text-sm text-muted">
                        <Clock className="h-4 w-4 text-sage-dark" />
                        {service.duration}
                      </span>
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-sage-dark">
                        <Tag className="h-4 w-4" />
                        {service.price}
                      </span>
                    </div>

                    <div className="mt-8">
                      <Button href={`/book?service=${encodeURIComponent(service.name)}`}>
                        Book Now
                      </Button>
                    </div>
                  </ScrollReveal>
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </>
  );
}
