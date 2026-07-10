import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  crumb,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  image: string;
  crumb: string;
}) {
  return (
    <section className="relative flex min-h-[52vh] items-end overflow-hidden pb-14 pt-32">
      <div className="absolute inset-0 -z-10">
        <Image
          src={image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-ink/55" />
      </div>

      <div className="container-wide">
        <nav
          aria-label="Breadcrumb"
          className="mb-4 flex items-center gap-1.5 text-xs text-cream/70"
        >
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-white">{crumb}</span>
        </nav>
        {eyebrow && (
          <p className="eyebrow mb-3 text-sage-light">{eyebrow}</p>
        )}
        <h1 className="max-w-3xl font-serif text-4xl font-semibold text-white sm:text-5xl md:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-lg text-cream/90">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
