import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAuthed } from "@/lib/admin";
import { listBookings, listEnquiries, usingSupabase } from "@/lib/store";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

// Always render fresh data.
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!isAuthed()) {
    redirect("/admin/login");
  }

  const [bookings, enquiries] = await Promise.all([
    listBookings(),
    listEnquiries(),
  ]);

  return (
    <AdminDashboard
      bookings={bookings}
      enquiries={enquiries}
      usingSupabase={usingSupabase}
    />
  );
}
