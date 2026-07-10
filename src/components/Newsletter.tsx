"use client";

import { useState } from "react";
import { Send, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function Newsletter({ variant = "footer" }: { variant?: "footer" | "section" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  const dark = variant === "footer";

  if (status === "done") {
    return (
      <p
        className={cn(
          "flex items-center gap-2 text-sm",
          dark ? "text-sage-light" : "text-sage-dark"
        )}
      >
        <Check className="h-4 w-4" /> You're on the list — thank you!
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit}>
      {variant === "footer" && (
        <p className="mb-2 text-sm font-medium text-white">Newsletter</p>
      )}
      <div className="flex gap-2">
        <label className="sr-only" htmlFor={`nl-${variant}`}>
          Email address
        </label>
        <input
          id={`nl-${variant}`}
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          className={cn(
            "h-11 w-full rounded-full px-4 text-sm outline-none transition focus:ring-2 focus:ring-sage",
            dark
              ? "bg-white/10 text-white placeholder:text-cream/40"
              : "border border-sand bg-white text-ink placeholder:text-muted/60"
          )}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          aria-label="Subscribe"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sage text-white transition hover:bg-sage-dark disabled:opacity-60"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
      {status === "error" && (
        <p className="mt-2 text-xs text-blush">Something went wrong. Try again.</p>
      )}
    </form>
  );
}
