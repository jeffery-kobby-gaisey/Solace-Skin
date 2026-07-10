"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";
import { contactSchema, type ContactInput } from "@/lib/schemas";
import { Button } from "./ui/Button";
import { cn } from "@/lib/utils";

const fieldBase =
  "w-full rounded-xl border bg-white px-4 text-sm text-ink outline-none transition placeholder:text-muted/60 focus:ring-2 focus:ring-sage";

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    setError,
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  async function onSubmit(values: ContactInput) {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error();
    } catch {
      setError("root", {
        message: "Something went wrong. Please try again or WhatsApp us.",
      });
    }
  }

  if (isSubmitSuccessful && !errors.root) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex h-full flex-col items-center justify-center rounded-3xl border border-sage/30 bg-white p-10 text-center shadow-soft"
      >
        <CheckCircle2 className="h-14 w-14 text-sage" />
        <h3 className="mt-5 font-serif text-2xl text-ink">Message sent!</h3>
        <p className="mt-3 max-w-sm text-muted">
          Thank you for reaching out. We'll get back to you as soon as we can.
        </p>
        <Button variant="outline" className="mt-6" onClick={() => reset()}>
          Send Another
        </Button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-3xl border border-sand/70 bg-white p-6 shadow-soft sm:p-9"
      noValidate
    >
      <input type="text" tabIndex={-1} className="hidden" aria-hidden {...register("company")} />

      <div className="space-y-5">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-ink">Name</span>
          <input
            {...register("name")}
            placeholder="Your name"
            className={cn(fieldBase, "h-12", errors.name ? "border-blush" : "border-sand")}
          />
          {errors.name && <span className="mt-1 block text-xs text-rose-600">{errors.name.message}</span>}
        </label>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-ink">Email</span>
            <input
              {...register("email")}
              type="email"
              placeholder="you@email.com"
              className={cn(fieldBase, "h-12", errors.email ? "border-blush" : "border-sand")}
            />
            {errors.email && <span className="mt-1 block text-xs text-rose-600">{errors.email.message}</span>}
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-ink">Phone (optional)</span>
            <input
              {...register("phone")}
              inputMode="tel"
              placeholder="+233 …"
              className={cn(fieldBase, "h-12", "border-sand")}
            />
          </label>
        </div>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-ink">Message</span>
          <textarea
            {...register("message")}
            rows={5}
            placeholder="How can we help?"
            className={cn(fieldBase, "resize-none py-3", errors.message ? "border-blush" : "border-sand")}
          />
          {errors.message && <span className="mt-1 block text-xs text-rose-600">{errors.message.message}</span>}
        </label>
      </div>

      {errors.root && (
        <p className="mt-4 rounded-xl bg-blush-light px-4 py-3 text-sm text-ink">
          {errors.root.message}
        </p>
      )}

      <Button type="submit" size="lg" disabled={isSubmitting} className="mt-6 w-full">
        {isSubmitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" /> Sending…
          </>
        ) : (
          "Send Message"
        )}
      </Button>
    </form>
  );
}
