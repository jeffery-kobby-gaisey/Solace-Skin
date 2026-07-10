"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { gallery, galleryCategories } from "@/lib/content";
import { cn } from "@/lib/utils";

export function GalleryGrid() {
  const [filter, setFilter] = useState<(typeof galleryCategories)[number]>("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const items = useMemo(
    () =>
      filter === "All"
        ? gallery
        : gallery.filter((g) => g.category === filter),
    [filter]
  );

  const close = useCallback(() => setLightbox(null), []);
  const move = useCallback(
    (delta: number) =>
      setLightbox((i) =>
        i === null ? i : (i + delta + items.length) % items.length
      ),
    [items.length]
  );

  // Keyboard controls for the lightbox.
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") move(1);
      if (e.key === "ArrowLeft") move(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, close, move]);

  return (
    <>
      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-2.5">
        {galleryCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={cn(
              "rounded-full px-5 py-2 text-sm font-medium transition",
              filter === cat
                ? "bg-sage text-white shadow-soft"
                : "border border-sand bg-white text-ink hover:border-sage"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry */}
      <motion.div layout className="mt-12 columns-2 gap-4 md:columns-3 [&>*]:mb-4">
        <AnimatePresence>
          {items.map((item, i) => (
            <motion.button
              layout
              key={item.src}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35 }}
              onClick={() => setLightbox(i)}
              className="group relative block w-full break-inside-avoid overflow-hidden rounded-2xl shadow-soft"
              aria-label={`View ${item.alt}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={800}
                height={item.span ? 1100 : 800}
                sizes="(min-width: 768px) 30vw, 45vw"
                className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-end bg-ink/45 p-4 opacity-0 transition group-hover:opacity-100">
                <span className="flex items-center gap-1.5 text-xs font-medium text-white">
                  <Plus className="h-4 w-4" /> {item.category}
                </span>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label="Image viewer"
            className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/90 p-4 backdrop-blur"
            onClick={close}
          >
            <button
              onClick={close}
              aria-label="Close"
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            >
              <X className="h-6 w-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                move(-1);
              }}
              aria-label="Previous"
              className="absolute left-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <motion.div
              key={lightbox}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative max-h-[85vh] w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={items[lightbox].src}
                alt={items[lightbox].alt}
                width={1400}
                height={1000}
                className="mx-auto max-h-[85vh] w-auto rounded-2xl object-contain"
              />
              <p className="mt-3 text-center text-sm text-cream/80">
                {items[lightbox].alt}
              </p>
            </motion.div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                move(1);
              }}
              aria-label="Next"
              className="absolute right-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
