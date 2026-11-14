# CHIPS

**Centralized Hardware Inventory for Prototype Systems**

CHIPS is a full-stack inventory and borrowing platform for university electronics labs. Students browse a shared component catalog, reserve and borrow parts, and track due dates. Administrators manage inventory, approve account and borrow requests, and oversee users — all scoped to their own university.

![Next.js](https://img.shields.io/badge/Next.js-16-000?logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-149ECA?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)
![Drizzle ORM](https://img.shields.io/badge/Drizzle_ORM-0.45-C5F74F?logo=drizzle)
![License](https://img.shields.io/badge/License-MIT-green)

---

## Features

### Authentication & onboarding
- Credentials-based authentication with **NextAuth v5** (JWT sessions).
- **Email OTP verification** on sign-up — 6-digit code, 10-minute expiry, HMAC-signed and validated with a timing-safe comparison.
- **Create or join a university**: creating one makes you the `OWNER`; joining adds you as a `USER` pending admin approval.
- Passwords hashed with **bcrypt**.
- IP-based rate limiting on auth actions with **Upstash Ratelimit** (5 requests/minute).

### Student portal
- Browse the component catalog with pagination.
- Component detail pages with availability, ratings, and related components.
- Shopping cart and borrow requests with due dates.
- "My Borrowed Components" view.
- Profile editing, including university card image.

### Admin portal
- Dashboard with inventory and user metrics.
- Full component CRUD, including cover image uploads to **ImageKit**.
- Prefilled edit form for every component.
- Approve/reject account requests and change user roles.
- Approve/reject borrow requests and mark components as returned.
- All queries are scoped to the admin's `universitySlug`.

### Notifications
- Transactional email over SMTP with **Nodemailer** (OTP, welcome, status changes).
- **Upstash QStash** workflow for scheduled engagement emails, with signed callback verification.

---

## Tech stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 16 (App Router, Server Actions, `proxy.ts`) |
| UI | React 19, Tailwind CSS v4, shadcn/ui, Radix / Base UI, Motion, Lottie |
| Language | TypeScript 5 |
| Auth | NextAuth v5 (credentials provider) |
| Database | Neon Postgres + Drizzle ORM |
| Cache / rate limit | Upstash Redis + `@upstash/ratelimit` |
| Background jobs | Upstash QStash Workflow |
| Media | ImageKit |
| Email | Nodemailer + SMTP |
| Forms | Zod + React Hook Form |

---

## Project structure

```
app/
  (root)/              Public landing page, privacy, terms
  (auth)/              Sign-in and sign-up
  home/                Student portal (catalog, cart, borrow, profile)
  admin/               Admin portal (dashboard, users, components, requests)
  api/
    auth/              NextAuth handlers + ImageKit upload auth
    workflows/         QStash workflow endpoints
components/
  admin/               Admin dashboard, tables, forms
  auth/                Auth form, OTP input, image upload
  root/                Student-facing UI
  ui/                  shadcn/ui primitives
database/
  index.ts             Neon + Drizzle client
  schema.ts            Tables, enums, relations
  redis.ts             Upstash Redis client
  seed.ts              Idempotent component seed script
lib/
  actions/             Server actions (auth, components, users, OTP)
  admin/actions/       Admin-only actions (component CRUD)
  email/               SMTP transport and email templates
  validations.ts        Zod schemas
  config.ts            Environment configuration
constants/             Navigation, form fields, sample components
drizzle/               Generated SQL migrations and metadata
instrumentation.ts     Node server startup hooks
next.config.ts         Image remote patterns, build options
proxy.ts               Auth proxy (Next.js 16 middleware)
```

---

## Getting started

### Prerequisites

- **Node.js >= 20.9** (Node 22+ recommended)
- A **Neon Postgres** database (the app uses the Neon serverless HTTP driver)
- An **Upstash Redis** database
- An **SMTP account** (e.g. Gmail app password)
- An **ImageKit** account (for admin image uploads)
- Optional: an **Upstash QStash** account for background email workflows

### 1. Clone and install

```bash
git clone https://github.com/AdrishikharChowdhury/chips.git
cd chips
npm install
```

### 2. Configure environment variables

Create `.env.local` in the project root:

```bash
# Database
DATABASE_URL=postgresql://user:password@host/db?sslmode=require

# NextAuth + OTP signing
AUTH_SECRET=generate-a-long-random-string

# ImageKit (component and university card uploads)
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_id
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=public_xxx
IMAGEKIT_PRIVATE_KEY=private_xxx

# SMTP (OTP and notification emails)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=you@example.com
SMTP_PASS=your-app-password
SMTP_FROM_EMAIL=noreply@example.com

# Upstash Redis (rate limiting)
UPSTASH_REDIS_REST_URL=https://xxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=xxx

# Upstash QStash (background workflows)
QSTASH_URL=https://qstash-us-east-1.upstash.io
QSTASH_TOKEN=xxx
QSTASH_CURRENT_SIGNING_KEY=xxx
QSTASH_NEXT_SIGNING_KEY=xxx
QSTASH_WORKFLOW_URL=https://your-deployed-domain.com
```

> `AUTH_SECRET` is used both by NextAuth and to sign OTP HMACs.
> `QSTASH_WORKFLOW_URL` must point at the deployed app; QStash calls back to `/api/workflows`.

### 3. Set up the database

```bash
npm run db:push       # push the Drizzle schema (prototyping)
# or
npm run db:generate   # generate SQL migrations
npx drizzle-kit migrate
```

### 4. (Optional) Seed sample components

The seed script inserts the sample hardware catalog for one university. A university must already exist — create one by signing up with "Create University".

```bash
npm run db:seed                          # seeds the first university
npm run db:seed -- st-thomas-college     # seeds a specific university slug
```

The script is idempotent: it skips components whose title already exists for that university.

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Available scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm start` | Run the production server |
| `npm run lint` | Run ESLint |
| `npm run db:push` | Push the Drizzle schema directly to the database |
| `npm run db:generate` | Generate SQL migration files |
| `npm run db:studio` | Open Drizzle Studio |
| `npm run db:seed` | Seed sample components |

---

## Routes

### Public

| Route | Description |
| --- | --- |
| `/` | Landing page |
| `/sign-in`, `/sign-up` | Authentication |
| `/privacy`, `/terms` | Legal pages |

### Student (`USER`)

| Route | Description |
| --- | --- |
| `/home` | Latest components |
| `/home/components` | Paginated catalog |
| `/home/components/[id]` | Component details |
| `/home/components/borrow` | Borrowed components |
| `/home/cart` | Cart |
| `/home/my-profile` | Profile and university card |

### Admin (`ADMIN` / `OWNER`)

| Route | Description |
| --- | --- |
| `/admin` | Dashboard |
| `/admin/users` | Users and roles |
| `/admin/account-requests` | Pending sign-ups |
| `/admin/components` | Component inventory |
| `/admin/components/new` | Create a component |
| `/admin/components/[id]` | Edit a component |
| `/admin/component-requests` | Borrow request queue |

### API

| Route | Description |
| --- | --- |
| `/api/auth/[...nextauth]` | NextAuth handlers |
| `/api/auth/imagekit` | ImageKit upload authentication |
| `/api/workflows` | QStash sign-up drip workflow |
| `/api/workflows/send-email` | Signed transactional email endpoint |

---

## Data model

| Table | Purpose |
| --- | --- |
| `universities` | University/tenant, unique slug, logo, owner role |
| `users` | Accounts, hashed passwords, role (`USER`/`ADMIN`/`OWNER`), status (`PENDING`/`APPROVED`/`REJECTED`), university membership |
| `components` | Inventory item, cover URL, total/available copies, university slug |
| `borrow_records` | Borrow requests and loans with due/return dates and status (`PENDING`/`BORROWED`/`RETURNED`) |
| `cart_items` | Per-user cart entries |

Statuses are enforced with Postgres enums. Inventory and borrow records are tagged with `university_slug`, and admin queries are scoped to the signed-in admin's university.

---

## How borrowing works

1. A verified student adds components to their cart or opens a component and requests a borrow with a due date.
2. Creating a borrow request reserves stock immediately (`availableCopies` is decremented).
3. An admin approves (`BORROWED`) or rejects a pending request.
4. When an item is returned, the borrowed quantity is added back to `availableCopies`.

Only users with `APPROVED` status can borrow. Joined members start as `PENDING` until an admin approves their account request.

---

## Deployment

The app deploys to any Node.js host; Vercel is the simplest option.

1. Import the repository into Vercel (or your platform).
2. Add all environment variables from `.env.local` to the deployment environment.
3. Point `DATABASE_URL` at your production Neon branch.
4. Apply the schema with `npm run db:push` or `npx drizzle-kit migrate`.
5. Set `QSTASH_WORKFLOW_URL` to the deployed URL and configure QStash signing keys.
6. Add any new external image hosts to `images.remotePatterns` in `next.config.ts`.

---

## Troubleshooting

**`NeonDbError: Error connecting to database: TypeError: fetch failed`**
Node's automatic address-family selection ("happy eyeballs") can time out when IPv6 is unavailable. `instrumentation.ts` disables it for the Next.js server via `net.setDefaultAutoSelectFamily(false)`. Standalone scripts (including `database/seed.ts`) apply the same workaround, or can be run with `NODE_OPTIONS=--no-network-family-autoselection`.

**OTP emails are not delivered**
Verify `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, and `SMTP_PASS`. Gmail requires an app password, not your account password.

**Rate limit redirects**
Auth actions are limited to 5 requests per minute per IP. Wait a minute or adjust `lib/ratelimit.ts`.

**Images fail to load**
Remote hosts must be allow-listed in `next.config.ts`. Uploaded admin covers use ImageKit; seeded covers point at external hosts.

---

## Development notes

- Route `params` and `searchParams` are Promises in Next.js 16 — always `await` them in server components.
- Server actions live in `lib/actions` and `lib/admin/actions`; write mutations there rather than in client components.
- `drizzle.config.ts` loads `.env.local`, so all database commands work without exporting variables.
- The shared `AuthForm` powers both sign-in and sign-up, including the password visibility toggle and OTP step.

---

## License

[MIT](LICENSE) © 2026 Adrishikhar Chowdhury
