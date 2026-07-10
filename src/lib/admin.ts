import { cookies } from "next/headers";
import { createHash } from "crypto";

/**
 * Minimal shared-passcode auth for the /admin dashboard.
 * The session cookie stores a salted hash of the passcode, never the
 * passcode itself. Swap for Supabase Auth / NextAuth for multi-user setups.
 */

export const ADMIN_COOKIE = "solace_admin";
const SALT = "solace-skin-admin-v1";

function token(passcode: string) {
  return createHash("sha256").update(`${SALT}:${passcode}`).digest("hex");
}

export function expectedToken() {
  const passcode = process.env.ADMIN_PASSCODE || "change-me-please";
  return token(passcode);
}

export function verifyPasscode(input: string) {
  const passcode = process.env.ADMIN_PASSCODE || "change-me-please";
  return input === passcode;
}

export function isAuthed() {
  const cookie = cookies().get(ADMIN_COOKIE)?.value;
  return Boolean(cookie && cookie === expectedToken());
}
