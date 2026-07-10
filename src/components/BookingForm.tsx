"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";
import { bookingSchema, type BookingInput } from "@/lib/schemas";
import { serviceNames } from "@/lib/services";
import { Button } from "./ui/Button";
import { cn } from "@/lib/utils";

const fieldBase =
  "h-12 w-full rounded-xl border bg-white px-4 text-sm text-ink outline-none transition placeholder:text-muted/60 focus:ring-2 focus:ring-sage";

export function BookingForm() {
  const params = useSearchParams();
  const preselect = params.get("service") ?? "";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    setError,
  } = useForm<BookingInput>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      service: serviceNames.includes(preselect) ? preselect : "",
    },
  });

  async function onSubmit(values: BookingInput) {
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Request failed");
    } catch {
      setError("root", {
        message: "Sorry, something went wrong. Please try again or call us.",
      });
    }
  }

  if (isSubmitSuccessful && !errors.root) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-3xl border border-sage/30 bg-white p-10 text-center shadow-soft"
      >
        <CheckCircle2 className="mx-auto h-14 w-14 text-sage" />
        <h3 className="mt-5 font-serif text-2xl text-ink">
          Your request is in!
        </h3>
        <p className="mx-auto mt-3 max-w-md text-muted">
          Thank you for booking with Solace Skin. We've sent a confirmation to
          your email and our team will be in touch shortly to finalise your
          appointment.
        </p>
        <div className="mt-7">
          <Button variant="outline" onClick={() => reset()}>
            Book Another Appointment
          </Button>
        </div>
      </motion.div>
    );
  }

  const err = (field: keyof BookingInput) =>
    errors[field] ? "border-blush" : "border-sand";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-3xl border border-sand/70 bg-white p-6 shadow-soft sm:p-9"
      noValidate
    >
      {/* Honeypot */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
        {...register("company")}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full Name" error={errors.fullName?.message}>
          <input
            {...register("fullName")}
            placeholder="Ama Serwaa"
            className={cn(fieldBase, err("fullName"))}
          />
        </Field>

        <Field label="Phone Number" error={errors.phone?.message}>
          <input
            {...register("phone")}
            inputMode="tel"
            placeholder="+233 55 000 0000"
            className={cn(fieldBase, err("phone"))}
          />
        </Field>

        <Field label="Email" error={errors.email?.message}>
          <input
            {...register("email")}
            type="email"
            placeholder="you@email.com"
            className={cn(fieldBase, err("email"))}
          />
        </Field>

        <Field label="Preferred Service" error={errors.service?.message}>
          <select {...register("service")} className={cn(fieldBase, err("service"))}>
            <option value="" disabled>
              Choose a service…
            </option>
            {serviceNames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Preferred Date" error={errors.date?.message}>
          <input
            {...register("date")}
            type="date"
            className={cn(fieldBase, err("date"))}
          />
        </Field>

        <Field label="Preferred Time" error={errors.time?.message}>
          <input
            {...register("time")}
            type="time"
            className={cn(fieldBase, err("time"))}
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Notes (optional)" error={errors.notes?.message}>
          <textarea
            {...register("notes")}
            rows={4}
            placeholder="Anything we should know before your visit?"
            className={cn(
              fieldBase,
              "h-auto resize-none py-3",
              errors.notes ? "border-blush" : "border-sand"
            )}
          />
        </Field>
      </div>

      {errors.root && (
        <p className="mt-4 rounded-xl bg-blush-light px-4 py-3 text-sm text-ink">
          {errors.root.message}
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="mt-7 w-full"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" /> Sending…
          </>
        ) : (
          "Request Appointment"
        )}
      </Button>
      <p className="mt-3 text-center text-xs text-muted">
        We'll confirm availability by email or phone. No payment required to
        request.
      </p>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-rose-600">{error}</span>}
    </label>
  );
}
