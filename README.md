# Solace Skin ✦

A premium, fully-responsive website for **Solace Skin** — a skincare & wellness spa in Sowutuom, Accra, Ghana.

> _Where Healthy Skin Meets Total Relaxation._

Built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, **React Hook Form + Zod**, with optional **Supabase** (database) and **Resend** (email) integrations.

---

## ✨ Highlights

- **6 pages** — Home, About, Services, Gallery, Book, Contact (+ Privacy & Terms)
- **Secure admin dashboard** at `/admin` — view/approve/cancel bookings & read enquiries
- **Online booking** with validation, email confirmation, and database storage
- **Gallery** with category filters, masonry layout & keyboard-accessible lightbox
- **Testimonials carousel**, newsletter signup, WhatsApp button, Google Maps embed
- Sticky nav, scroll animations, back-to-top, cookie consent banner
- **SEO**: metadata, Open Graph (dynamically generated), JSON-LD `DaySpa` schema, `sitemap.xml`, `robots.txt`, PWA manifest
- **Accessible** (skip link, focus rings, reduced-motion support, semantic HTML)
- **Graceful degradation** — runs with **zero configuration**; add keys later to switch on Supabase/Resend

---

## 🚀 Getting started

> **Prerequisite:** [Node.js](https://nodejs.org) 18.18+ (or 20+). It was **not** installed on the machine this was scaffolded on — install it first, then:

```bash
cd solace-skin
npm install
cp .env.example .env.local   # optional — the site runs without it
npm run dev
```

Open **http://localhost:3000**.

That's it. With no env file, bookings and enquiries are saved to `src/data/*.local.json` and confirmation emails are printed to your terminal.

---

## 🔐 Environment variables

Copy `.env.example` → `.env.local`. **Everything is optional.**

| Variable | Purpose | If omitted |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for SEO/OG | `http://localhost:3000` |
| `NEXT_PUBLIC_BUSINESS_EMAIL` / `_PHONE` / `NEXT_PUBLIC_WHATSAPP_NUMBER` | Contact details shown on site | Placeholders |
| `NEXT_PUBLIC_SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` | Database storage | Local JSON fallback |
| `RESEND_API_KEY` + `RESEND_FROM` | Sends real emails | Logs to console |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Image hosting | Uses Unsplash placeholders |
| `ADMIN_PASSCODE` | Passcode for `/admin` | `change-me-please` |

---

## 🗄️ Enabling Supabase (optional)

1. Create a project at [supabase.com](https://supabase.com).
2. In the SQL editor, run [`supabase/schema.sql`](./supabase/schema.sql).
3. Add `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` to `.env.local`.

The app detects the keys and writes to Supabase automatically — no code changes.

## 📧 Enabling email (optional)

1. Get an API key from [resend.com](https://resend.com) and verify your sending domain.
2. Set `RESEND_API_KEY` and `RESEND_FROM` in `.env.local`.

Booking confirmations (to the client + business) and contact enquiries then send for real.

---

## 🛠️ Admin dashboard

- Visit **`/admin`** → you'll be sent to `/admin/login`.
- Enter the `ADMIN_PASSCODE` (default `change-me-please` — **change it!**).
- View booking/enquiry stats, approve or cancel bookings, and read messages.

> Auth is a simple shared-passcode gate storing a salted hash in an httpOnly cookie — perfect for a small team. For multiple staff accounts, swap `src/lib/admin.ts` for [Supabase Auth](https://supabase.com/docs/guides/auth) or NextAuth.

---

## 📁 Project structure

```
src/
├─ app/
│  ├─ (pages)/            home, about, services, gallery, book, contact, privacy, terms
│  ├─ admin/              dashboard + login
│  ├─ api/                bookings, contact, newsletter, admin/*
│  ├─ layout.tsx          fonts, SEO metadata, JSON-LD, global chrome
│  ├─ opengraph-image.tsx dynamically generated OG image
│  ├─ sitemap.ts · robots.ts · manifest.ts · icon.svg
│  └─ globals.css
├─ components/            navbar, footer, home sections, forms, gallery, ui/
├─ lib/                   site config, services & content data, zod schemas,
│                         store (db/fallback), email (resend/fallback), admin auth
└─ data/                  local fallback JSON store (gitignored)
supabase/schema.sql
```

---

## 🎨 Customising

- **Brand colours** — `tailwind.config.ts` (`cream`, `beige`, `sage`, `blush`, `gold`, `ink`).
- **Services / testimonials / gallery / FAQs** — edit the data files in `src/lib/`.
- **Business info & hours** — `src/lib/site.ts`.
- **Images** — currently Unsplash URLs; replace with your own (or Cloudinary). Add new hostnames to `next.config.mjs` → `images.remotePatterns`.
- **Map** — `site.mapEmbed` in `src/lib/site.ts` (uses the keyless Google Maps embed; swap for the Embed API if you have a key).

---

## ☁️ Deploy to Vercel

1. Push this folder to a Git repo.
2. Import it at [vercel.com/new](https://vercel.com/new).
3. Add your env vars in the Vercel dashboard.
4. Deploy. 🎉

> **Note:** the local JSON fallback store is **not writable on Vercel's serverless filesystem** — configure **Supabase** before deploying to production so bookings persist.

---

## 📜 Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Lint with ESLint |

---

Made with care for Solace Skin · Sowutuom, Accra, Ghana.
