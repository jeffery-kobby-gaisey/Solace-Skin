import { promises as fs } from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";

/**
 * Persistence layer with graceful degradation.
 *
 * If Supabase env vars are present we write to Supabase tables.
 * Otherwise records are appended to local JSON files under src/data/
 * so the site is fully functional with zero configuration.
 */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const usingSupabase = Boolean(SUPABASE_URL && SERVICE_KEY);

function supabase() {
  return createClient(SUPABASE_URL as string, SERVICE_KEY as string, {
    auth: { persistSession: false },
  });
}

const DATA_DIR = path.join(process.cwd(), "src", "data");

async function readLocal(file: string): Promise<any[]> {
  try {
    const raw = await fs.readFile(path.join(DATA_DIR, file), "utf8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function writeLocal(file: string, rows: any[]) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(path.join(DATA_DIR, file), JSON.stringify(rows, null, 2));
}

function id() {
  // Timestamp + random suffix — good enough for the fallback store.
  return `${Date.now().toString(36)}-${Math.round(Math.random() * 1e6).toString(36)}`;
}

export type Booking = {
  id: string;
  created_at: string;
  full_name: string;
  phone: string;
  email: string;
  service: string;
  date: string;
  time: string;
  notes?: string;
  status: "pending" | "approved" | "cancelled";
};

export type Enquiry = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
};

export async function createBooking(
  data: Omit<Booking, "id" | "created_at" | "status">
): Promise<Booking> {
  const record: Booking = {
    id: id(),
    created_at: new Date().toISOString(),
    status: "pending",
    ...data,
  };

  if (usingSupabase) {
    const { data: row, error } = await supabase()
      .from("bookings")
      .insert(record)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return row as Booking;
  }

  const rows = await readLocal("bookings.local.json");
  rows.unshift(record);
  await writeLocal("bookings.local.json", rows);
  return record;
}

export async function listBookings(): Promise<Booking[]> {
  if (usingSupabase) {
    const { data, error } = await supabase()
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return (data ?? []) as Booking[];
  }
  return readLocal("bookings.local.json");
}

export async function updateBookingStatus(
  bookingId: string,
  status: Booking["status"]
): Promise<void> {
  if (usingSupabase) {
    const { error } = await supabase()
      .from("bookings")
      .update({ status })
      .eq("id", bookingId);
    if (error) throw new Error(error.message);
    return;
  }
  const rows = await readLocal("bookings.local.json");
  const next = rows.map((r) => (r.id === bookingId ? { ...r, status } : r));
  await writeLocal("bookings.local.json", next);
}

export async function createEnquiry(
  data: Omit<Enquiry, "id" | "created_at">
): Promise<Enquiry> {
  const record: Enquiry = {
    id: id(),
    created_at: new Date().toISOString(),
    ...data,
  };
  if (usingSupabase) {
    const { data: row, error } = await supabase()
      .from("enquiries")
      .insert(record)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return row as Enquiry;
  }
  const rows = await readLocal("enquiries.local.json");
  rows.unshift(record);
  await writeLocal("enquiries.local.json", rows);
  return record;
}

export async function listEnquiries(): Promise<Enquiry[]> {
  if (usingSupabase) {
    const { data, error } = await supabase()
      .from("enquiries")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return (data ?? []) as Enquiry[];
  }
  return readLocal("enquiries.local.json");
}

export async function addSubscriber(email: string): Promise<void> {
  if (usingSupabase) {
    // Ignore duplicates gracefully.
    await supabase().from("subscribers").upsert({ email }, { onConflict: "email" });
    return;
  }
  const rows = await readLocal("subscribers.local.json");
  if (!rows.find((r) => r.email === email)) {
    rows.push({ email, created_at: new Date().toISOString() });
    await writeLocal("subscribers.local.json", rows);
  }
}
