import Image from "next/image";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ScrollReveal";
import { gallery } from "@/lib/content";

export function GalleryPreview() {
  const preview = gallery.slice(0, 6);
  return (
    <section className="bg-beige/50 py-24">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Our Space"
          title="A glimpse of the experience"
          subtitle="From serene treatment rooms to visible before-and-after results — step inside Solace Skin."
        />

        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3">
          {preview.map((item, i) => (
            <ScrollReveal
              key={item.src}
              delay={i * 0.05}
              className={i === 0 ? "col-span-2 row-span-2 md:col-span-1 md:row-span-2" : ""}
            >
              <div className="group relative h-full min-h-[180px] overflow-hidden rounded-2xl shadow-soft">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 768px) 30vw, 45vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-ink/0 transition group-hover:bg-ink/20" />
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="mt-12 text-center">
          <Button href="/gallery" variant="outline" size="lg">
            Explore Full Gallery
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
}
