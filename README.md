# 🚀 Freelancer Starter Repo

> A production-ready, highly opinionated Next.js starter repository designed for freelancers and agencies to clone, rebrand in under 5 minutes, and ship client projects with confidence.

[![CI](https://github.com/your-org/freelancer-starter/actions/workflows/ci.yml/badge.svg)](https://github.com/your-org/freelancer-starter/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Next.js 15](https://img.shields.io/badge/Next.js-15.1-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8)](https://tailwindcss.com/)
[![Better Auth](https://img.shields.io/badge/Better_Auth-1.7-purple)](https://better-auth.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5.22-2d3748)](https://prisma.io/)

---

## ⚡ Quick Start (3 Commands)

Get up and running locally in seconds:

```bash
# 1. Install dependencies and copy environment variables
pnpm install && cp .env.example .env

# 2. Boot up local Postgres container & apply migrations
pnpm db:up && pnpm db:migrate

# 3. Start local development server
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the app!

---

## 📦 What's Included

- **Framework**: Next.js 15 (App Router), React 19, TypeScript strict mode
- **Styling & UI**: Tailwind CSS with CSS variable design tokens (`--brand`), accessible Radix primitives, dark mode via `.dark` class
- **Database & ORM**: PostgreSQL with Prisma ORM, hot-reload singleton client, seeding, migration scripts
- **Self-Hosted Auth**: [Better Auth](https://better-auth.com) with Prisma adapter:
  - Email & password registration with password hashing
  - Email verification workflow
  - Expiring, single-use password resets
  - Database-backed sessions (30-day lifetime, cookie cache)
  - Admin plugin with `USER` and `ADMIN` role management
  - Optional Google OAuth (activated only when credentials are provided)
  - Edge middleware & server helper protection (`requireAuth`, `requireRole`)
  - In-memory rate limiting on auth endpoints
- **Transactional Emails**: Resend integration + React Email templates (Verify Email, Password Reset, Welcome) with local console fallback
- **Validation**: Strict Zod schemas shared between client forms (React Hook Form) and server actions (`safeAction()` wrapper)
- **Environment**: Strict boot-time env validation via `@t3-oss/env-nextjs` and Zod (fails fast if missing)
- **Quality & DX**: ESLint (Next config), Prettier with Tailwind sorting, Husky pre-commit hooks, Commitlint (Conventional Commits), Vitest, Playwright
- **Operations & Deploy**: GitHub Actions CI with Postgres service container, multi-stage production `Dockerfile`, and Vercel-ready zero-config defaults

---

## 🔄 Reusability: Rebrand for a New Client in 5 Minutes

You can start a new client project in two ways:

### Option A: Use as a GitHub Template or `npx degit`

```bash
# Clone clean without starter git history
npx degit your-username/freelancer-starter my-new-client-project
cd my-new-client-project
pnpm install
```

### Option B: Run the Rebrander Script

Run the automated interactive initialization script:

```bash
pnpm init:project
```

Or pass flags non-interactively:

```bash
pnpm init:project \
  --name "Acme Corp Portal" \
  --slug "acme-portal" \
  --desc "Customer portal for Acme Corp" \
  --url "https://portal.acme.com" \
  --email "support@acme.com" \
  --remote "git@github.com:acme/portal.git" \
  --cleanup \
  --yes
```

**What the script does automatically:**

1. Updates `package.json` package name and metadata
2. Configures `src/config/site.ts` (app name, support email, URLs)
3. Updates `README.md` title
4. Generates a cryptographically strong 32-byte `BETTER_AUTH_SECRET` and creates a clean `.env`
5. Clears the starter git history, initializes a fresh git repository on `main`, and creates an initial commit
6. Optionally pushes to your new client git remote
7. Optionally deletes itself (`--cleanup`)

See [CHECKLIST.md](./CHECKLIST.md) for the complete client launch guide.

---

## ⚙️ Environment Variables

Copy `.env.example` to `.env`. All variables are validated at startup via `src/env.ts`.

| Variable               | Required | Description                               | Example                                                            |
| :--------------------- | :------: | :---------------------------------------- | :----------------------------------------------------------------- |
| `DATABASE_URL`         | **Yes**  | PostgreSQL connection URL                 | `postgresql://postgres:postgres@localhost:5432/freelancer_starter` |
| `BETTER_AUTH_SECRET`   | **Yes**  | 32+ character auth encryption secret      | Generated via `openssl rand -base64 32`                            |
| `BETTER_AUTH_URL`      | **Yes**  | Canonical app URL for auth redirects      | `http://localhost:3000` or `https://client.com`                    |
| `NEXT_PUBLIC_APP_URL`  | **Yes**  | Public frontend URL                       | `http://localhost:3000`                                            |
| `RESEND_API_KEY`       |   _No_   | Resend API key (logs to console if empty) | `re_123456789...`                                                  |
| `EMAIL_FROM`           |   _No_   | Sending sender address for emails         | `Company <noreply@domain.com>`                                     |
| `GOOGLE_CLIENT_ID`     |   _No_   | Google OAuth Client ID                    | `xxx.apps.googleusercontent.com`                                   |
| `GOOGLE_CLIENT_SECRET` |   _No_   | Google OAuth Client Secret                | `GOCSPX-xxxxxx`                                                    |
| `SEED_ADMIN_EMAIL`     |   _No_   | Email for seeded admin user               | `admin@example.com`                                                |
| `SEED_DEMO_EMAIL`      |   _No_   | Email for seeded demo user                | `demo@example.com`                                                 |

---

## 📁 Project Structure

```
├── .github/
│   ├── workflows/ci.yml           # GitHub Actions CI pipeline
│   ├── ISSUE_TEMPLATE/            # Bug report & feature request templates
│   └── pull_request_template.md   # Standardized PR template
├── docker-compose.yml             # Local PostgreSQL container definition
├── Dockerfile                     # Multi-stage production container
├── emails/                        # React Email template preview components
├── prisma/
│   ├── schema.prisma              # Database schema (Better Auth + App models)
│   └── seed.ts                    # Admin & demo seed script
├── public/                        # Static assets (favicons, og images)
├── scripts/
│   └── init-project.mjs           # Interactive client rebrander script
├── src/
│   ├── app/
│   │   ├── (auth)/                # Auth route group
│   │   │   ├── sign-in/
│   │   │   ├── sign-up/
│   │   │   ├── forgot-password/
│   │   │   ├── reset-password/
│   │   │   └── verify-email/
│   │   ├── (protected)/           # Authenticated route group
│   │   │   ├── dashboard/         # Protected dashboard page
│   │   │   └── settings/          # Profile & password management
│   │   ├── api/
│   │   │   ├── auth/[...all]/     # Better Auth REST handler
│   │   │   └── health/            # Health check endpoint
│   │   ├── layout.tsx             # Root layout with dark mode script
│   │   ├── page.tsx               # Minimalist customizable landing page
│   │   ├── loading.tsx            # Global route loading state
│   │   ├── error.tsx              # Error boundary
│   │   ├── not-found.tsx          # 404 page
│   │   ├── robots.ts              # SEO robots generator
│   │   └── sitemap.ts             # SEO sitemap generator
│   ├── components/
│   │   ├── auth/                  # Auth forms (sign-in, sign-up, etc.)
│   │   ├── ui/                    # Button, Input, Card, Alert, FormField, Label
│   │   └── theme-toggle.tsx       # Dark/light mode switcher
│   ├── config/
│   │   └── site.ts                # Single source of truth for site config
│   ├── lib/
│   │   ├── auth.ts                # Server-side Better Auth instance
│   │   ├── auth-client.ts         # Client-side Better Auth React hooks
│   │   ├── auth-helpers.ts        # requireAuth(), requireRole(), getSession()
│   │   ├── db.ts                  # Hot-reload safe Prisma singleton
│   │   ├── email/                 # sendEmail() wrapper & rendered templates
│   │   ├── rate-limit.ts          # In-memory auth endpoint rate limiter
│   │   ├── safe-action.ts         # safeAction() Zod-validated server actions
│   │   └── validations/           # Shared Zod schemas (auth, settings)
│   ├── env.ts                     # Boot-time environment validation
│   └── middleware.ts              # Route protection middleware
├── CHECKLIST.md                   # Step-by-step checklist for new client projects
├── package.json
└── tailwind.config.ts
```

---

## 🔐 Auth Architecture & Flow

This starter uses **Better Auth**, which self-hosts the entire authentication lifecycle on your own PostgreSQL database.

1. **Sign Up**:
   - User submits credentials validated via `signUpSchema` (Zod).
   - Better Auth hashes password and creates records in `user` and `account` tables.
   - Verification token generated and emailed via `sendVerificationEmail()`.
2. **Email Verification**:
   - User clicks link leading to `/verify-email?token=...`.
   - Token is verified and `emailVerified` set to `true`.
   - Welcome email dispatched.
3. **Session Management**:
   - Sessions are database-backed (`session` table) with a 30-day expiration.
   - Cookie caching is enabled for high performance.
4. **Route Protection**:
   - `src/middleware.ts` inspects the session cookie on edge (zero database lookups for static checks).
   - Server components call `await requireAuth()` or `await requireRole("admin")` from `src/lib/auth-helpers.ts` for verified database access.
5. **Rate Limiting**:
   - Built-in in-memory rate limiter protects `/sign-in` and `/sign-up`.
   - Note: For serverless multi-region deployments, swap to Upstash Redis (`@upstash/ratelimit`).

---

## 🛠️ How-To Guides

### How to Add a New Page

1. Create a folder in `src/app/my-page/page.tsx`.
2. If it requires authentication, put it under `src/app/(protected)/my-page/page.tsx` or call `await requireAuth()` at the top of your Server Component:
   ```tsx
   import { requireAuth } from "@/lib/auth-helpers";

   export default async function MyPage() {
     const user = await requireAuth();
     return <div>Hello {user.name}</div>;
   }
   ```

### How to Add a New Database Model

1. Open `prisma/schema.prisma` and add your model under `APP MODELS`:
   ```prisma
   model Project {
     id        String   @id @default(cuid())
     name      String
     userId    String
     user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
     createdAt DateTime @default(now())
   }
   ```
2. Create and apply the migration:
   ```bash
   pnpm db:migrate
   ```

### How to Create a Validated Server Action

Use the built-in `safeAction()` helper:

```tsx
"use server";

import { z } from "zod";
import { safeAction } from "@/lib/safe-action";
import { db } from "@/lib/db";
import { requireAuth } from "@/lib/auth-helpers";

const createProjectSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
});

export const createProject = safeAction(createProjectSchema, async (data) => {
  const user = await requireAuth();
  const project = await db.project.create({
    data: { name: data.name, userId: user.id },
  });
  return project;
});
```

### How to Add a New Transactional Email Template

1. Create a template renderer in `src/lib/email/templates/invoice.ts`.
2. Create a React Email preview in `emails/invoice.tsx`.
3. Preview visually in browser:
   ```bash
   pnpm email:dev
   ```

---

## 🧪 Testing

```bash
# Run unit tests (Zod schemas, helpers)
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run Playwright end-to-end smoke tests
pnpm test:e2e
```

---

## 🚢 Deployment

### Deploying to Vercel

1. Push your repository to GitHub.
2. Import project in [Vercel](https://vercel.com).
3. Set environment variables (`DATABASE_URL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `NEXT_PUBLIC_APP_URL`).
4. Vercel automatically runs `pnpm build` (which runs `prisma generate` via `postinstall`).

### Deploying with Docker

```bash
docker build -t client-app .
docker run -p 3000:3000 --env-file .env client-app
```

---

## 📄 License

MIT © [Freelancer Starter](LICENSE)
