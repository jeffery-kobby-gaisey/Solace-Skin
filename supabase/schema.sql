-- ─────────────────────────────────────────────────────────────
-- Solace Skin — Supabase schema
-- Run this in the Supabase SQL editor to enable the database layer.
-- Once these tables exist and env vars are set, the app writes here
-- automatically instead of the local JSON fallback store.
-- ─────────────────────────────────────────────────────────────

create extension if not exists "pgcrypto";

-- Bookings ------------------------------------------------------
create table if not exists public.bookings (
  id          text primary key,
  created_at  timestamptz not null default now(),
  full_name   text not null,
  phone       text not null,
  email       text not null,
  service     text not null,
  date        text not null,
  time        text not null,
  notes       text,
  status      text not null default 'pending'
              check (status in ('pending', 'approved', 'cancelled'))
);

-- Enquiries (contact form) --------------------------------------
create table if not exists public.enquiries (
  id          text primary key,
  created_at  timestamptz not null default now(),
  name        text not null,
  email       text not null,
  phone       text,
  message     text not null
);

-- Newsletter subscribers ----------------------------------------
create table if not exists public.subscribers (
  email       text primary key,
  created_at  timestamptz not null default now()
);

-- Indexes for the admin dashboard ordering ----------------------
create index if not exists bookings_created_at_idx on public.bookings (created_at desc);
create index if not exists enquiries_created_at_idx on public.enquiries (created_at desc);

-- Row Level Security --------------------------------------------
-- The app uses the SERVICE ROLE key on the server for reads/writes,
-- which bypasses RLS. We still enable RLS and add NO public policies
-- so the anon key cannot read customer data from the browser.
alter table public.bookings   enable row level security;
alter table public.enquiries  enable row level security;
alter table public.subscribers enable row level security;
