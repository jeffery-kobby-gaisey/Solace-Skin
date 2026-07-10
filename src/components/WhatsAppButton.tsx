"use client";

import { site } from "@/lib/site";

/** Floating WhatsApp contact button (bottom-right). */
export function WhatsAppButton() {
  const href = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
    "Hi Solace Skin! I'd like to ask about your treatments."
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-white shadow-soft transition hover:-translate-y-0.5 hover:shadow-glow"
    >
      <svg
        viewBox="0 0 32 32"
        className="h-6 w-6 fill-current"
        aria-hidden
      >
        <path d="M16.003 3C9.383 3 4 8.383 4 15c0 2.09.55 4.13 1.594 5.93L4 29l8.28-1.55A11.9 11.9 0 0016 27c6.617 0 12-5.383 12-12S22.62 3 16.003 3zm0 21.82c-1.77 0-3.5-.47-5.01-1.36l-.36-.21-4.91.92.93-4.79-.23-.37A9.79 9.79 0 016.18 15c0-5.42 4.41-9.82 9.83-9.82 5.42 0 9.82 4.4 9.82 9.82s-4.4 9.82-9.83 9.82zm5.4-7.35c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.75-.71 2-1.4.25-.69.25-1.28.17-1.4-.07-.13-.27-.2-.57-.35z" />
      </svg>
      <span className="hidden text-sm font-medium sm:inline">WhatsApp</span>
    </a>
  );
}
