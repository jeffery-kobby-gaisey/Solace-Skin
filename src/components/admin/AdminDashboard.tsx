"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  LogOut,
  CalendarClock,
  Mail,
  Check,
  X,
  Clock,
  Phone,
  RefreshCw,
} from "lucide-react";
import type { Booking, Enquiry } from "@/lib/store";
import { formatDate, cn } from "@/lib/utils";

const statusStyles: Record<Booking["status"], string> = {
  pending: "bg-gold/15 text-gold",
  approved: "bg-sage/15 text-sage-dark",
  cancelled: "bg-rose-100 text-rose-600",
};

export function AdminDashboard({
  bookings: initialBookings,
  enquiries,
  usingSupabase,
}: {
  bookings: Booking[];
  enquiries: Enquiry[];
  usingSupabase: boolean;
}) {
  const router = useRouter();
  const [bookings, setBookings] = useState(initialBookings);
  const [tab, setTab] = useState<"bookings" | "enquiries">("bookings");
  const [busy, setBusy] = useState<string | null>(null);

  async function setStatus(id: string, status: Booking["status"]) {
    setBusy(id);
    try {
      const res = await fetch("/api/admin/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        setBookings((prev) =>
          prev.map((b) => (b.id === id ? { ...b, status } : b))
        );
      }
    } finally {
      setBusy(null);
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  const pending = bookings.filter((b) => b.status === "pending").length;
  const approved = bookings.filter((b) => b.status === "approved").length;

  const stats = [
    { label: "Total Bookings", value: bookings.length, icon: CalendarClock },
    { label: "Pending", value: pending, icon: Clock },
    { label: "Approved", value: approved, icon: Check },
    { label: "Enquiries", value: enquiries.length, icon: Mail },
  ];

  return (
    <div className="min-h-screen bg-beige/40 pb-24 pt-28">
      <div className="container-wide">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl text-ink">Dashboard</h1>
            <p className="text-sm text-muted">
              {usingSupabase
                ? "Connected to Supabase"
                : "Local fallback store (no database configured)"}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => router.refresh()}
              className="flex h-11 items-center gap-2 rounded-full border border-sand bg-white px-4 text-sm hover:border-sage"
            >
              <RefreshCw className="h-4 w-4" /> Refresh
            </button>
            <button
              onClick={logout}
              className="flex h-11 items-center gap-2 rounded-full bg-ink px-4 text-sm text-white hover:bg-ink/90"
            >
              <LogOut className="h-4 w-4" /> Log out
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-sand/70 bg-white p-5 shadow-soft"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted">{s.label}</span>
                <s.icon className="h-5 w-5 text-sage-dark" />
              </div>
              <p className="mt-2 font-serif text-3xl text-ink">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="mt-10 flex gap-2">
          {(["bookings", "enquiries"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "rounded-full px-5 py-2 text-sm font-medium capitalize transition",
                tab === t
                  ? "bg-sage text-white"
                  : "border border-sand bg-white text-ink hover:border-sage"
              )}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Bookings */}
        {tab === "bookings" && (
          <div className="mt-6 overflow-hidden rounded-2xl border border-sand/70 bg-white shadow-soft">
            {bookings.length === 0 ? (
              <Empty label="No bookings yet." />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-sand bg-beige/40 text-xs uppercase tracking-wider text-muted">
                    <tr>
                      <th className="px-5 py-3">Client</th>
                      <th className="px-5 py-3">Service</th>
                      <th className="px-5 py-3">When</th>
                      <th className="px-5 py-3">Status</th>
                      <th className="px-5 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-sand/70">
                    {bookings.map((b) => (
                      <tr key={b.id} className="align-top">
                        <td className="px-5 py-4">
                          <p className="font-medium text-ink">{b.full_name}</p>
                          <p className="text-xs text-muted">{b.email}</p>
                          <p className="flex items-center gap-1 text-xs text-muted">
                            <Phone className="h-3 w-3" /> {b.phone}
                          </p>
                          {b.notes && (
                            <p className="mt-1 max-w-xs text-xs italic text-muted">
                              “{b.notes}”
                            </p>
                          )}
                        </td>
                        <td className="px-5 py-4 text-ink">{b.service}</td>
                        <td className="px-5 py-4 text-ink">
                          {b.date}
                          <span className="block text-xs text-muted">{b.time}</span>
                        </td>
                        <td className="px-5 py-4">
                          <span
                            className={cn(
                              "inline-block rounded-full px-3 py-1 text-xs font-medium capitalize",
                              statusStyles[b.status]
                            )}
                          >
                            {b.status}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex justify-end gap-2">
                            <button
                              disabled={busy === b.id || b.status === "approved"}
                              onClick={() => setStatus(b.id, "approved")}
                              className="flex h-8 items-center gap-1 rounded-full bg-sage/15 px-3 text-xs font-medium text-sage-dark transition hover:bg-sage hover:text-white disabled:opacity-40"
                            >
                              <Check className="h-3.5 w-3.5" /> Approve
                            </button>
                            <button
                              disabled={busy === b.id || b.status === "cancelled"}
                              onClick={() => setStatus(b.id, "cancelled")}
                              className="flex h-8 items-center gap-1 rounded-full bg-rose-100 px-3 text-xs font-medium text-rose-600 transition hover:bg-rose-500 hover:text-white disabled:opacity-40"
                            >
                              <X className="h-3.5 w-3.5" /> Cancel
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Enquiries */}
        {tab === "enquiries" && (
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {enquiries.length === 0 ? (
              <div className="rounded-2xl border border-sand/70 bg-white md:col-span-2">
                <Empty label="No enquiries yet." />
              </div>
            ) : (
              enquiries.map((e) => (
                <div
                  key={e.id}
                  className="rounded-2xl border border-sand/70 bg-white p-5 shadow-soft"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-ink">{e.name}</p>
                    <span className="text-xs text-muted">
                      {formatDate(e.created_at)}
                    </span>
                  </div>
                  <p className="text-xs text-muted">{e.email}</p>
                  {e.phone && <p className="text-xs text-muted">{e.phone}</p>}
                  <p className="mt-3 text-sm text-ink">{e.message}</p>
                  <a
                    href={`mailto:${e.email}`}
                    className="mt-3 inline-block text-xs font-medium text-sage-dark link-underline"
                  >
                    Reply by email →
                  </a>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function Empty({ label }: { label: string }) {
  return <p className="px-5 py-16 text-center text-sm text-muted">{label}</p>;
}
