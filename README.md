# The Core 2.0 — Gym Website & Management System

A lightweight full-stack starter for The Core 2.0's website and gym management tools.

**Stack**
- `client/` — React + Vite (public site, member registration, admin dashboard, check-in)
- `server/` — Node + Express + SQLite (`better-sqlite3`) — a single-file database, no external services required

This stack was chosen for simplicity: no cloud database to provision, no monthly hosting cost for the database itself, and it runs anywhere Node runs (a $5/month VPS, Railway, Render, Fly.io, or even a Raspberry Pi at the gym).

---

## 1. Setup

### Server
```bash
cd server
cp .env.example .env     # edit ADMIN_EMAIL / ADMIN_PASSWORD / JWT_SECRET
npm install
npm run seed              # creates the first admin login
npm run dev                # starts on http://localhost:4000
```

### Client
In a second terminal:
```bash
cd client
npm install
npm run dev                # starts on http://localhost:5173
```

Open http://localhost:5173 — the Vite dev server proxies `/api` calls to the Express server automatically (see `vite.config.js`).

Log in to `/login` with the admin email/password from your `.env` file, then visit `/admin`.

---

## 2. What's included

- **Public site** (`/`) — hero, benefits, facilities, memberships (WhatsApp enquiry links), and a working **trial booking form** that saves to the database.
- **Member registration** (`/join`) — 5-step form. Creates a "Pending" member with a generated Member ID (e.g. `TC2-AB12C`). Staff activate the membership from the admin dashboard.
- **Staff login** (`/login`) — JWT-based auth.
- **Admin dashboard** (`/admin`) — overview stats, leads table (status pipeline), trial requests, members table with an "Activate" action that sets start/expiry dates automatically based on the chosen plan.
- **Check-in station** (`/check-in`) — staff enter a Member ID (typed for now — a camera QR scanner can be dropped in later with a library like `html5-qrcode` without changing the backend) and see a pass/fail result based on membership status and expiry date.

## 3. What's intentionally left simple (next steps)

- **QR code scanning** — currently manual ID entry. Add `html5-qrcode` on the client; the `/api/checkin` endpoint already accepts any scanned string.
- **WhatsApp expiry reminders** — the DB has an `expiring soon` query (`GET /api/members/reports/expiring?days=7`) ready to wire into a "Send Reminder" button, or into Twilio's WhatsApp API for automatic sending.
- **Roles** — currently a single `admin` role. Add a `staff` role in the `users` table and check `req.user.role` in routes if you want restricted staff accounts.
- **Image uploads / gallery management** — not included; the simplest lightweight option is Cloudinary's free tier rather than self-hosting file storage.
- **Digital member card / QR generation** — generate a QR of the `member_code` client-side with a library like `qrcode.react` on a member-facing card page.

## 4. Deploying

- **Server**: any Node host (Railway, Render, Fly.io, a basic VPS). SQLite file lives on disk — for platforms with ephemeral filesystems (like some serverless hosts), use a host with a persistent volume, or swap `better-sqlite3` for hosted Postgres later — the SQL is simple enough to port.
- **Client**: `npm run build` in `client/` produces static files deployable to Vercel, Netlify, or any static host. Point it at your deployed server's URL (update the API base or use environment-based proxy config).

## 5. Editable business config

WhatsApp number, address, and phone currently live directly in `client/src/pages/Home.jsx` and `.env`. For easier editing, consider moving them into a single `client/src/config.js` file as the site grows.
