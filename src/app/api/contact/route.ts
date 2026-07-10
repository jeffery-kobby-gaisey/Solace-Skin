import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/schemas";
import { createEnquiry } from "@/lib/store";
import { sendEnquiryEmail } from "@/lib/email";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten() },
      { status: 422 }
    );
  }

  if (parsed.data.company) {
    return NextResponse.json({ ok: true });
  }

  const { name, email, phone, message } = parsed.data;

  try {
    const enquiry = await createEnquiry({ name, email, phone, message });
    try {
      await sendEnquiryEmail(enquiry);
    } catch (err) {
      console.error("Enquiry email failed:", err);
    }
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error("Enquiry failed:", err);
    return NextResponse.json(
      { error: "Could not send your message. Please try again." },
      { status: 500 }
    );
  }
}
