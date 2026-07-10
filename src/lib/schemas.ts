import { z } from "zod";
import { serviceNames } from "./services";

export const bookingSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name.").max(80),
  phone: z
    .string()
    .min(7, "Enter a valid phone number.")
    .max(20)
    .regex(/^[0-9+()\-\s]+$/, "Enter a valid phone number."),
  email: z.string().email("Enter a valid email address."),
  service: z
    .string()
    .refine((v) => serviceNames.includes(v), "Please choose a service."),
  date: z.string().min(1, "Choose a preferred date."),
  time: z.string().min(1, "Choose a preferred time."),
  notes: z.string().max(600, "Please keep notes under 600 characters.").optional(),
  // Honeypot — must stay empty; bots tend to fill it.
  company: z.string().max(0).optional(),
});

export type BookingInput = z.infer<typeof bookingSchema>;

export const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name.").max(80),
  email: z.string().email("Enter a valid email address."),
  phone: z.string().max(20).optional(),
  message: z.string().min(10, "Tell us a little more (min 10 characters).").max(1000),
  company: z.string().max(0).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const newsletterSchema = z.object({
  email: z.string().email("Enter a valid email address."),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;
