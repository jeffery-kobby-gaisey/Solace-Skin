import { NextResponse } from "next/server";
import { bookingSchema } from "@/lib/schemas";
import { createBooking } from "@/lib/store";
import { sendBookingEmails } from "@/lib/email";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = bookingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten() },
      { status: 422 }
    );
  }

  // Honeypot: silently accept but ignore likely bots.
  if (parsed.data.company) {
    return NextResponse.json({ ok: true });
  }

  const { fullName, phone, email, service, date, time, notes } = parsed.data;

  try {
    const booking = await createBooking({
      full_name: fullName,
      phone,
      email,
      service,
      date,
      time,
      notes,
    });

    // Send emails but never fail the request if email is unavailable.
    try {
      await sendBookingEmails(booking);
    } catch (err) {
      console.error("Booking email failed:", err);
    }

    return NextResponse.json({ ok: true, id: booking.id }, { status: 201 });
  } catch (err) {
    console.error("Booking failed:", err);
    return NextResponse.json(
      { error: "Could not save your booking. Please try again." },
      { status: 500 }
    );
  }
}
