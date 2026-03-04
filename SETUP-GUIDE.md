# BeautyShare Pro — Setup & Deployment Guide

This guide walks you through getting the BeautyShare Pro platform running on your own infrastructure. You'll need accounts on three services (all have generous free tiers) and about 30 minutes.

---

## Step 1: GitHub (Your Code Repository)

GitHub stores your code and connects to Vercel for automatic deployments.

1. Go to [github.com](https://github.com) and create an account (or sign in)
2. Click the green **"New"** button to create a new repository
3. Name it `beautyshare-pro` (make it **Private**)
4. Don't initialize with README (you already have code)
5. After creating, you'll see instructions. Use the "push an existing repository" commands:

```bash
cd beautyshare-pro
git init
git add .
git commit -m "Initial BeautyShare Pro platform"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/beautyshare-pro.git
git push -u origin main
```

---

## Step 2: Supabase (Your Database & Authentication)

Supabase is your database, user authentication, and file storage — all in one.

1. Go to [supabase.com](https://supabase.com) and create an account
2. Click **"New Project"**
3. Name: `beautyshare-pro`
4. Set a strong **database password** (save this somewhere safe!)
5. Region: Choose **US East** (closest to most of your customers)
6. Click **"Create new project"** and wait ~2 minutes

### Get Your API Keys
Once the project is ready:
1. Go to **Settings → API** in the left sidebar
2. Copy these two values:
   - **Project URL** → This is your `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → This is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → This is your `SUPABASE_SERVICE_ROLE_KEY` (keep this secret!)

### Set Up the Database
1. Go to **SQL Editor** in the left sidebar
2. Click **"New query"**
3. Open the file `supabase/schema.sql` from your project
4. Copy the entire contents and paste it into the SQL editor
5. Click **"Run"** — this creates all your tables, security policies, and indexes

---

## Step 3: Vercel (Your Hosting)

Vercel hosts your app and deploys it automatically whenever you push code.

1. Go to [vercel.com](https://vercel.com) and sign up with your GitHub account
2. Click **"Add New → Project"**
3. Find and select your `beautyshare-pro` repository
4. Before deploying, add your environment variables:
   - Click **"Environment Variables"**
   - Add each variable from your `.env.local.example` file with your real values:

| Variable | Where to Find It |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Settings → API → anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Settings → API → service_role key |
| `NEXT_PUBLIC_APP_URL` | Your Vercel domain (e.g., `https://beautyshare-pro.vercel.app`) |

5. Click **"Deploy"** — Vercel will build and deploy your app in ~2 minutes
6. You'll get a URL like `https://beautyshare-pro.vercel.app` — that's your live app!

### Custom Domain (Optional)
1. In Vercel, go to your project → **Settings → Domains**
2. Add your domain (e.g., `app.beautysharepro.com`)
3. Follow the DNS instructions Vercel provides
4. Update `NEXT_PUBLIC_APP_URL` to your custom domain

---

## Step 4: Stripe (Payments) — Set Up Later

Stripe handles your subscription billing ($149/month + $99 setup fee). This will be integrated in the next build phase.

1. Go to [stripe.com](https://stripe.com) and create an account
2. Get your API keys from **Developers → API Keys**:
   - **Publishable key** → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - **Secret key** → `STRIPE_SECRET_KEY`
3. Create your subscription products in Stripe:
   - Product: "BeautyShare Pro — Launch Plan" at $149/month
   - One-time: "Setup Fee" at $99

---

## Running Locally for Development

To run the app on your own computer:

```bash
# Install dependencies
npm install

# Create your env file
cp .env.local.example .env.local
# Then edit .env.local with your real Supabase keys

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your app.

---

## Project Structure

```
beautyshare-pro/
├── src/
│   ├── app/                    # Pages (Next.js App Router)
│   │   ├── page.tsx            # Landing page
│   │   ├── login/              # Login page
│   │   ├── signup/             # Signup page
│   │   ├── admin/              # Admin command center
│   │   ├── dashboard/          # Subscriber dashboard
│   │   └── calculators/        # Pricing calculators
│   │       ├── launch/         # Launch Cost Calculator
│   │       ├── profit/         # Profit Calculator
│   │       └── retail-price/   # Retail Price Calculator
│   ├── components/
│   │   ├── layout/             # Sidebar, DashboardLayout
│   │   └── ui/                 # Reusable UI components
│   ├── lib/
│   │   ├── supabase/           # Supabase client config
│   │   ├── types.ts            # TypeScript type definitions
│   │   └── utils.ts            # Utility functions
│   └── middleware.ts           # Auth route protection
├── supabase/
│   └── schema.sql              # Complete database schema
├── .env.local.example          # Environment variable template
└── SETUP-GUIDE.md              # This file
```

---

## What's Built So Far (MVP Phase 1)

- Landing page with pricing
- Login / Signup pages (ready for Supabase Auth)
- Admin Command Center dashboard with KPIs, order table, churn risk alerts
- Subscriber Dashboard with revenue, orders, top products
- Launch Calculator (startup cost estimator)
- Profit Calculator (per-order profit breakdown with margin health)
- Retail Price Calculator (optimal pricing with product presets)
- Full database schema (12 tables with RLS security policies)
- Sidebar navigation (admin and subscriber views)
- Brand-matched UI (warm brown/cream palette from your Lovable prototype)

## What's Coming Next

- Real Supabase Auth integration (email/password + Google)
- Stripe billing integration ($149/month + $99 setup)
- Shopify OAuth store connection
- Real order sync from connected Shopify stores
- Admin order management with bulk tracking upload
- Inventory management with low-stock alerts
- CRM for admin (subscriber health) and members (customer management)
- Klaviyo email/SMS integration
- AI Marketing Copilot
