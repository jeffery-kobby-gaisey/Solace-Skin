import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { Icon } from "./Icon";
import type { Service } from "@/lib/services";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-sand/70 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-glow">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={service.image}
          alt={service.name}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-sage-dark shadow-soft backdrop-blur">
          <Icon name={service.icon} className="h-5 w-5" />
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-2 flex items-center gap-2 text-xs text-muted">
          <Clock className="h-3.5 w-3.5" /> {service.duration}
        </div>
        <h3 className="font-serif text-xl text-ink">{service.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
          {service.short}
        </p>
        <div className="mt-5 flex items-center justify-between">
          <span className="text-sm font-semibold text-sage-dark">
            {service.price}
          </span>
          <Link
            href={`/services#${service.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-ink link-underline"
          >
            Learn More <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
