# School Homework Helper — Live Deployment Guide

**Domain:** www.schoolhomeworkhelper.com  
**Project:** Next.js 15 (App Router) + Supabase + OpenAI  
**Date:** June 2026

---

## Important: Read This First

This website is built with **Next.js 15**, which requires **Node.js hosting**. It cannot run on standard PHP-only shared hosting without Node.js support.

Most Bluehost **shared cPanel** plans are PHP-focused. Before deploying on Bluehost directly, check your cPanel for:

- **Setup Node.js App** or **Node.js Selector**, OR
- **SSH access** with Node.js installed, OR
- A **VPS / Cloud** plan

**Recommended approach:** Deploy on **Vercel** (free tier works well for Next.js) and point your Bluehost domain DNS to Vercel. You keep your domain at Bluehost; Vercel hosts the app.

---

## What You Need Before Going Live

### 1. Accounts & services

| Item | Purpose |
|------|---------|
| GitHub account | Store code for deployment |
| Vercel account (recommended) | Host Next.js app |
| Bluehost cPanel | Manage domain DNS |
| Supabase project | Auth + database |
| OpenAI API key | AI tools |
| Google Cloud Console | Google Sign-In OAuth |
| Google AdSense (optional) | Ads |

### 2. Environment variables (production)

Set these in your hosting dashboard (Vercel → Settings → Environment Variables). **Never commit real keys to GitHub.**

| Variable | Example / notes |
|----------|-----------------|
| `OPENAI_API_KEY` | Your OpenAI secret key |
| `OPENAI_MODEL` | `gpt-4o-mini` (optional) |
| `NEXT_PUBLIC_SITE_URL` | `https://www.schoolhomeworkhelper.com` |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxxxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only; keep secret |
| `NEXT_PUBLIC_ADSENSE_CLIENT_ID` | Optional — `ca-pub-...` |
| `NEXT_PUBLIC_ADSENSE_SLOT` | Optional |
| `NEXT_PUBLIC_ADSENSE_SLOT_HORIZONTAL` | Optional |
| `NEXT_PUBLIC_ADSENSE_SLOT_IN_ARTICLE` | Optional |

### 3. Supabase setup

1. Log in to [supabase.com](https://supabase.com) → your project.
2. Open **SQL Editor** and run `supabase/schema.sql` from this project.
3. Enable **Google OAuth**: Authentication → Providers → Google → Enable.
4. Set **Site URL** (Authentication → URL Configuration) — this is required and must be a full URL with `https://`:
   - Production: `https://www.schoolhomeworkhelper.com`
   - Do **not** use `schoolhomeworkhelper.com` without `https://` (causes "site url is improperly formatted").
5. Add **Redirect URLs** on the same page:
   - `https://www.schoolhomeworkhelper.com/**`
   - `https://schoolhomeworkhelper.com/**`
   - `http://localhost:3000/**` (for local dev)
6. Copy **Project URL**, **anon key**, and **service_role key** for env vars.

### 4. Google OAuth (Sign-In)

1. Go to [Google Cloud Console](https://console.cloud.google.com).
2. Create OAuth 2.0 credentials (Web application).
3. **Authorized JavaScript origins:**
   - `https://www.schoolhomeworkhelper.com`
   - `https://schoolhomeworkhelper.com`
4. **Authorized redirect URIs:** (from Supabase → Auth → Google provider)
   - Usually: `https://YOUR_PROJECT.supabase.co/auth/v1/callback`
5. Paste Client ID and Secret into Supabase Google provider settings.

---

## Option A — Recommended: Deploy on Vercel + Bluehost Domain

### Step 1: Push code to GitHub

1. Create a new repository on GitHub (e.g. `school-homework-helper`).
2. Open terminal in your project folder:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/school-homework-helper.git
git push -u origin main
```

**Security:** Ensure `.env.local` is in `.gitignore` and never pushed.

### Step 2: Import project on Vercel

1. Go to [vercel.com](https://vercel.com) → Sign up / Log in (use GitHub).
2. Click **Add New → Project**.
3. Import your GitHub repository.
4. Framework: **Next.js** (auto-detected).
5. **Environment Variables:** Add all variables from the table above.
   - Set `NEXT_PUBLIC_SITE_URL` to `https://www.schoolhomeworkhelper.com`
6. Click **Deploy**.
7. Wait for build to finish. You get a temporary URL like `your-app.vercel.app`.

### Step 3: Add custom domain in Vercel

1. Vercel project → **Settings → Domains**.
2. Add:
   - `schoolhomeworkhelper.com`
   - `www.schoolhomeworkhelper.com`
3. Vercel shows DNS records to configure.

### Step 4: Configure DNS in Bluehost cPanel

1. Log in to **Bluehost** → **cPanel**.
2. Open **Domains** → **Zone Editor** (or **DNS Zone Editor**).
3. Select `schoolhomeworkhelper.com`.
4. Add or update records:

| Type | Host | Value | TTL |
|------|------|-------|-----|
| A | `@` | `76.76.21.21` | 14400 |
| CNAME | `www` | `f84052e74f8e3260.vercel-dns-017.com` | 14400 |

**Important:** Copy the exact `www` CNAME from **Vercel → Project → Settings → Domains** (it is unique per project). If Vercel shows a different value later, use that one.

5. **Remove** conflicting records:
   - Delete any **A** record for `@` pointing to Bluehost (e.g. `162.214.80.103`) — this causes **403 Forbidden** on `schoolhomeworkhelper.com`.
   - Delete old `www` CNAME values like `cname.vercel-dns.com` if they differ from Vercel’s current recommendation.
6. Save changes.

### Step 5: Wait for DNS & SSL

- DNS propagation: 15 minutes to 48 hours (often under 1 hour).
- Vercel automatically provisions **HTTPS (SSL)**.
- In Vercel Domains, set **www** as primary or redirect apex → www (your choice).

### Step 6: Verify live site

Checklist:

- [ ] Homepage loads at `https://www.schoolhomeworkhelper.com`
- [ ] Logo, navigation, and footer display correctly
- [ ] Cookie banner appears; Accept/Reject works
- [ ] All 6 AI tools respond (after sign-in if guest limit reached)
- [ ] Google Sign-In works on `/signin`
- [ ] Privacy, Terms, and Cookie pages load
- [ ] Mobile layout looks correct on phone

### Step 7: Post-deploy updates

Whenever you change code:

1. Commit and push to GitHub `main` branch.
2. Vercel auto-redeploys (if connected).
3. Or manually trigger **Redeploy** in Vercel dashboard.

---

## Option B — Deploy on Bluehost (Node.js required)

Use this only if your Bluehost plan includes **Node.js App** setup or SSH with persistent Node.

### Step 1: Confirm Node.js support

In cPanel, look for **Setup Node.js App** or contact Bluehost support to confirm Node 18+ is available.

### Step 2: Upload project

**Via SSH (recommended):**

```bash
ssh your-user@your-server
cd ~
git clone https://github.com/YOUR_USERNAME/school-homework-helper.git
cd school-homework-helper
```

**Via File Manager:** Upload ZIP, extract in `home/youruser/`.

### Step 3: Install & build

```bash
npm install
npm run build
```

Create `.env` or set env vars in cPanel Node app panel (same variables as Vercel list).

### Step 4: Configure Node.js app in cPanel

1. **Setup Node.js App** → Create Application.
2. Node version: 18 or 20.
3. Application root: your project folder.
4. Application URL: your domain or subdomain.
5. Application startup file: configure to run `npm start` (runs `next start`).
6. Set all environment variables in the panel.
7. Start the application.

### Step 5: Point domain

If app runs on a subdomain first, later map `www.schoolhomeworkhelper.com` to the Node app per Bluehost docs.

**Note:** Shared hosting often cannot run Next.js reliably. Vercel is strongly recommended.

---

## Bluehost + Vercel: How It Works Together

| Component | Where it lives |
|-----------|----------------|
| Domain registration | Bluehost |
| DNS records | Bluehost cPanel Zone Editor |
| Website hosting (Next.js) | Vercel |
| Database & Auth | Supabase |
| AI API | OpenAI |

You do **not** need to upload PHP files from the `php/` folder if you deploy the Next.js app.

---

## Troubleshooting

### Site shows Bluehost default page

- DNS not updated yet, or old A record still points to Bluehost server IP.
- Wait and clear DNS cache; verify A/CNAME in Zone Editor.

### Google Sign-In fails on live site

- Add production URLs in Supabase redirect allow list.
- Add origins in Google OAuth console.
- Ensure `NEXT_PUBLIC_SITE_URL` matches your live URL exactly.

### AI tools return errors

- Check `OPENAI_API_KEY` is set in Vercel/hosting env.
- Check OpenAI billing/credits.
- View Vercel **Functions** logs for API route errors.

### Ads not showing

- AdSense must approve your site first.
- User must click **Accept** on cookie banner (ads load only after consent).
- Verify `NEXT_PUBLIC_ADSENSE_CLIENT_ID` starts with `ca-pub-`.

### Build fails on Vercel

- Run `npm run build` locally first.
- Fix TypeScript/lint errors.
- Ensure all env vars are set in Vercel before deploy.

---

## Quick Reference — Commands

| Task | Command |
|------|---------|
| Local development | `pnpm dev` |
| Production build (test) | `pnpm run build` |
| Run production locally | `pnpm start` |
| Lint | `pnpm run lint` |

---

## Support Contacts

- **Website email:** hello@schoolhomeworkhelper.com
- **Vercel docs:** https://vercel.com/docs
- **Supabase docs:** https://supabase.com/docs
- **Bluehost support:** Via Bluehost chat / help center

---

*End of deployment guide — School Homework Helper*
