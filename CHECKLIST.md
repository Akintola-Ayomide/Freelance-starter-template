# 📋 New Client Project Checklist

Follow this checklist whenever you start a new client engagement using this starter repo.

---

## ⚡ 1. Initial Setup (Under 5 Minutes)

- [ ] Clone repo or use GitHub "Use this template" / `npx degit <repo> client-project`
- [ ] Run the project initialization script:
  ```bash
  pnpm init:project
  ```
  _(Answer the interactive prompts or pass CLI flags)_
- [ ] Review the generated `.env` file and adjust settings as required.
- [ ] Verify local database is running:
  ```bash
  pnpm db:up
  pnpm db:migrate
  pnpm dev
  ```
- [ ] Test the baseline flow locally at `http://localhost:3000`:
  - Sign up a new user
  - Check terminal for the verification email link and verify
  - Sign in and access `/dashboard`
  - Update profile name in `/settings`
  - Sign out

---

## 🎨 2. Rebranding & Design Tokens

- [ ] Open `src/app/globals.css`
  - Update `--brand` HSL color to client's primary brand color
  - Update `--brand-foreground` for legible contrast
  - Adjust `--radius-*` tokens (rounded corners style)
  - Configure fonts in `src/app/layout.tsx` if client specifies custom typography
- [ ] Replace `public/og-image.png` with a 1200x630px branded Open Graph banner.
- [ ] Replace favicon / app icons in `src/app/` if needed.
- [ ] Update `src/config/site.ts` with custom social links, support hours, and navigation menus.

---

## 🗄️ 3. Production Database Setup

Choose one of the recommended managed PostgreSQL providers:

- **Neon** (Recommended for serverless branch workflows):
  1. Create a project at [neon.tech](https://neon.tech)
  2. Copy the pooled connection string
  3. Ensure `?sslmode=require` is present
- **Supabase**:
  1. Create a project at [supabase.com](https://supabase.com)
  2. Copy the connection string (port 6543 pooled or 5432 direct)
- [ ] Add `DATABASE_URL` to production environment variables.
- [ ] Run production migrations during deploy or manually via `pnpm prisma migrate deploy`.

---

## 📧 4. Transactional Email Setup (Resend)

- [ ] Create an account or project at [resend.com](https://resend.com)
- [ ] Add and verify the client's custom sending domain (SPF, DKIM, DMARC records).
- [ ] Generate an API key with sending permissions.
- [ ] Set `RESEND_API_KEY` in production env.
- [ ] Set `EMAIL_FROM="Brand Name <notifications@clientdomain.com>"`.
- [ ] Test email delivery using the preview tool:
  ```bash
  pnpm email:dev
  ```

---

## 🔑 5. Authentication & OAuth Configuration

- [ ] Generate a production `BETTER_AUTH_SECRET`:
  ```bash
  openssl rand -base64 32
  ```
- [ ] Set `BETTER_AUTH_URL` to the client's canonical URL (e.g., `https://app.clientdomain.com`).
- [ ] **Google OAuth (Optional)**:
  - Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
  - Configure OAuth Consent Screen (add client domain)
  - Create OAuth 2.0 Client ID for Web application
  - Add Authorized redirect URI:
    `https://app.clientdomain.com/api/auth/callback/google`
  - Add `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` to environment variables.
  - Test login with Google.

---

## 🚀 6. Production Deployment (Vercel)

- [ ] Import project repository into [Vercel](https://vercel.com)
- [ ] Configure Environment Variables:
  - `DATABASE_URL`
  - `BETTER_AUTH_SECRET`
  - `BETTER_AUTH_URL`
  - `NEXT_PUBLIC_APP_URL`
  - `RESEND_API_KEY`
  - `EMAIL_FROM`
  - `GOOGLE_CLIENT_ID` (if using OAuth)
  - `GOOGLE_CLIENT_SECRET` (if using OAuth)
- [ ] Verify Build Command: `pnpm build` (Prisma client generates automatically via `postinstall`).
- [ ] Run health check after deployment:
      `curl -i https://app.clientdomain.com/api/health`
      _(Should return HTTP 200 with `{"status":"ok"}`)_

---

## 🛡️ 7. Security & Compliance Baseline

- [ ] Check security headers using [securityheaders.com](https://securityheaders.com).
- [ ] Ensure rate limiter is configured or upgraded to Upstash Redis for multi-region serverless.
- [ ] Verify sensitive routes are guarded (`/dashboard`, `/settings`, `/api/health`).
- [ ] Run automated tests before delivery:
  ```bash
  pnpm typecheck
  pnpm lint
  pnpm test
  ```
- [ ] Confirm no secrets or local `.env` files are tracked in git history.
