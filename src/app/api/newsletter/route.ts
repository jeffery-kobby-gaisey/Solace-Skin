import { NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/schemas";
import { addSubscriber } from "@/lib/store";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = newsletterSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Enter a valid email." }, { status: 422 });
  }

  try {
    await addSubscriber(parsed.data.email);
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error("Subscribe failed:", err);
    return NextResponse.json({ error: "Could not subscribe." }, { status: 500 });
  }
}
