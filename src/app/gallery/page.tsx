import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { GalleryGrid } from "@/components/GalleryGrid";
import { CTA } from "@/components/home/CTA";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Browse the Solace Skin gallery — our spa, treatments, before & after results, happy clients and equipment.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        crumb="Gallery"
        eyebrow="Our Space"
        title="A look inside Solace Skin"
        subtitle="Explore our serene spa, treatments in action, and the visible results our clients love."
        image="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=2000&q=80"
      />
      <section className="py-24">
        <div className="container-wide">
          <GalleryGrid />
        </div>
      </section>
      <CTA />
    </>
  );
}
