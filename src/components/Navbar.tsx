"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { nav } from "@/lib/site";
import { Button } from "./ui/Button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-cream/85 shadow-soft backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <nav
        className="container-wide flex h-20 items-center justify-between"
        aria-label="Main navigation"
      >
        <Link href="/" className="flex items-center" aria-label="Solace Skin — home">
          <Image
            src="/logo.jpg"
            alt="Solace Skin"
            width={160}
            height={160}
            priority
            className="h-14 w-14 object-contain sm:h-16 sm:w-16"
          />
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "link-underline text-sm font-medium transition-colors",
                    active ? "text-sage-dark" : "text-ink/80 hover:text-ink"
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden md:block">
          <Button href="/book" size="sm">
            Book Appointment
          </Button>
        </div>

        <button
          className="flex h-11 w-11 items-center justify-center rounded-full text-ink hover:bg-ink/5 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-sand/60 bg-cream/95 backdrop-blur-md md:hidden"
          >
            <ul className="container-wide flex flex-col gap-1 py-4">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block rounded-xl px-4 py-3 text-base font-medium text-ink hover:bg-sage/10"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="mt-2 px-1">
                <Button href="/book" className="w-full">
                  Book Appointment
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
