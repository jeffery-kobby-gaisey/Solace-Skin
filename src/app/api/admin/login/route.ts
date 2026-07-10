import { NextResponse } from "next/server";
import { ADMIN_COOKIE, expectedToken, verifyPasscode } from "@/lib/admin";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const { passcode } = await request.json().catch(() => ({ passcode: "" }));

  if (!verifyPasscode(String(passcode ?? ""))) {
    return NextResponse.json({ error: "Incorrect passcode." }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, expectedToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
  });
  return res;
}
