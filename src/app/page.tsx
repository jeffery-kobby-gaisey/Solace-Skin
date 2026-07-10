import { Hero } from "@/components/home/Hero";
import { WhyChoose } from "@/components/home/WhyChoose";
import { FeaturedServices } from "@/components/home/FeaturedServices";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { CTA } from "@/components/home/CTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhyChoose />
      <FeaturedServices />
      <GalleryPreview />
      <CTA />
    </>
  );
}
