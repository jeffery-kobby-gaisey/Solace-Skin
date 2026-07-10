import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { Button } from "@/components/ui/Button";
import {
  ScrollRevealGroup,
  ScrollRevealItem,
  ScrollReveal,
} from "@/components/ScrollReveal";
import { services } from "@/lib/services";

export function FeaturedServices() {
  return (
    <section className="bg-beige/50 py-24">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Our Treatments"
          title="Featured Services"
          subtitle="Results-driven skincare and deep relaxation, personalised to you and delivered by certified professionals."
        />

        <ScrollRevealGroup className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ScrollRevealItem key={service.slug}>
              <ServiceCard service={service} />
            </ScrollRevealItem>
          ))}
        </ScrollRevealGroup>

        <ScrollReveal className="mt-12 text-center">
          <Button href="/services" variant="outline" size="lg">
            View All Services
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
}
