import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/admin";
import { updateBookingStatus, type Booking } from "@/lib/store";

export const runtime = "nodejs";

export async function PATCH(request: Request) {
  if (!isAuthed()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, status } = await request.json().catch(() => ({}));
  const allowed: Booking["status"][] = ["pending", "approved", "cancelled"];

  if (!id || !allowed.includes(status)) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  try {
    await updateBookingStatus(id, status);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Update booking failed:", err);
    return NextResponse.json({ error: "Update failed." }, { status: 500 });
  }
}
