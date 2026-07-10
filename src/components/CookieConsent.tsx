"use client";

import { useEffect, useState } from "react";
import { Cookie, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "./ui/Button";

const KEY = "solace-cookie-consent";

export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setShow(true);
    } catch {
      /* localStorage unavailable — do nothing */
    }
  }, []);

  function decide(value: "accepted" | "declined") {
    try {
      localStorage.setItem(KEY, value);
    } catch {}
    setShow(false);
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          role="dialog"
          aria-label="Cookie consent"
          className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-md rounded-2xl border border-sand bg-white/95 p-5 shadow-soft backdrop-blur-md sm:inset-x-auto sm:left-6"
        >
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sage/15 text-sage-dark">
              <Cookie className="h-5 w-5" />
            </span>
            <div className="flex-1">
              <p className="text-sm leading-relaxed text-ink">
                We use cookies to enhance your browsing experience and analyse
                our traffic. See our{" "}
                <a href="/privacy" className="link-underline text-sage-dark">
                  Privacy Policy
                </a>
                .
              </p>
              <div className="mt-4 flex gap-2">
                <Button size="sm" onClick={() => decide("accepted")}>
                  Accept
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => decide("declined")}
                >
                  Decline
                </Button>
              </div>
            </div>
            <button
              onClick={() => decide("declined")}
              aria-label="Dismiss"
              className="text-muted hover:text-ink"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
