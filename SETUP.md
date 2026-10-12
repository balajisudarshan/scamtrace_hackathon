# ScamTrace — Backend Setup Guide

> **Prerequisites:** Node.js ≥ 18, npm ≥ 9. No local Postgres needed — we use Neon (cloud).

---

## 1. Clone & Install

```bash
git clone <repo-url>
cd scamtrace_hackathon/backend
npm install
```

---

## 2. Configure Environment Variables

Copy the example file and fill in your credentials:

```bash
cp .env.example .env
```

Edit `.env` with the values shared by the project owner (Balaji). The file looks like this:

```env
DATABASE_URL='postgresql://<user>:<pass>@<pooler-host>/neondb?sslmode=require&channel_binding=require'
PORT=8000
NODE_ENV=development
JWT_SECRET='...'
GOOGLE_CLIENT_ID='....apps.googleusercontent.com'
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
NVIDIA_API_KEY=nvapi-...
NVIDIA_MODEL=moonshotai/kimi-k3
```

> **⚠️ Database URL:** Always use the **pooled** Neon connection string (contains `-pooler` in the hostname). The unpooled URL (port 5432) is blocked by Neon on the free tier.

---

## 3. Set Up the Database (First Time Only)

The project uses **raw SQL** via `pg` (not Prisma migrations), since we connect through Neon's pooler which doesn't support migration commands.

### Step A — Create all tables

```bash
node prisma/create_tables.js
```

You should see:
```
🔧 Creating ScamTrace tables via pooled connection...
✅ All tables created successfully!
📊 ScamTrace tables in DB: [ 'AuditEvent', 'CaseNote', 'Indicator', 'MatchEvidence', 'Report', 'ReportIndicator', 'ReviewDecision', 'TrendSnapshot' ]
```

### Step B — Seed demo data

```bash
node prisma/seed.js
```

This inserts:
- **3 test users** (analyst, admin, public)
- **59 scam indicators** (domains, phrases, tactics — from HuggingFace SMS phishing + Hinglish datasets)
- **10 sample reports** with risk scoring
- **5 Scam DNA pairs** (matched cross-report evidence)
- **17 trend snapshots** for ScamPulse charts

> ℹ️ Safe to re-run — all inserts use `ON CONFLICT DO NOTHING`.

---

## 4. Run the Server

```bash
npm run dev          # development (nodemon auto-restarts on file changes)
npm start            # production (plain node)
```

Server starts at: **http://localhost:8000**

Health check:
```bash
curl http://localhost:8000/api/health
# → {"success":true,"message":"ScamTrace API is running","version":"1.0.0"}
```

---

## 5. API Routes Overview

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | `/api/auth/register` | Public | Create account |
| POST | `/api/auth/login` | Public | Login → JWT cookie |
| POST | `/api/auth/google` | Public | Google OAuth |
| GET | `/api/auth/me` | JWT | Current user info |
| POST | `/api/check/analyze` | Public | Analyze suspicious URL/text/image |
| GET | `/api/reports` | Public | List published community reports |
| POST | `/api/reports` | Public | Submit a new scam report |
| GET | `/api/reports/:id` | Public | Single report detail |
| GET | `/api/reports/:id/story` | Public | AI-generated narrative (Story Mode) |
| GET | `/api/reports/:id/dna` | Public | Scam DNA — similar reports cluster |
| GET | `/api/trends/indicators` | Public | ScamPulse — top threat indicators |
| GET | `/api/trends/snapshots` | Public | Time-series chart data |
| GET | `/api/trends/summary` | Public | Risk level breakdown stats |
| GET | `/api/admin/queue` | ANALYST | Reports pending review |
| PATCH | `/api/admin/reports/:id/review` | ANALYST | Approve/reject/publish a report |
| POST | `/api/admin/reports/:id/notes` | ANALYST | Add case note |
| GET | `/api/admin/audit` | ANALYST | Full audit log |
| POST | `/api/brand/scan` | Public | Brand impersonation scan |
| GET | `/api/brand/threats` | Public | Known brand threat list |

---

## 6. Test Accounts (Seeded)

| Role | Email | Password | Access |
|------|-------|----------|--------|
| **ANALYST** | `analyst@scamtrace.dev` | `analyst123` | Full analyst portal (`/api/admin`) |
| **ADMIN** | `admin@scamtrace.dev` | `admin123` | All permissions |
| **PUBLIC** | `user@scamtrace.dev` | `user123` | Standard user |

---

## 7. Project Structure

```
backend/
├── prisma/
│   ├── schema.prisma          # Prisma client generation only (not used for migrations)
│   ├── create_tables.js       # Raw SQL — creates all tables + ENUMs
│   └── seed.js                # Seeds demo data into the DB
│
├── src/
│   ├── app.js                 # Express app + all routes wired
│   ├── server.js              # HTTP server entry point
│   │
│   ├── lib/
│   │   ├── prisma.js          # Prisma client (pg adapter, pooled connection)
│   │   ├── brandDetect.js     # Brand impersonation detection engine
│   │   ├── aiVision.js        # NVIDIA API + Cloudinary + Tesseract OCR
│   │   ├── ruleEngine.js      # Deterministic scam-scoring rules
│   │   └── similarityMatcher.js # Scam DNA cross-report similarity
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.js # JWT verify, optionalAuth, requireAnalyst
│   │   └── error.middleware.js
│   │
│   └── modules/
│       ├── auth/              # register, login, google OAuth, /me
│       ├── check/             # POST /analyze — core detection endpoint
│       ├── report/            # Community reports CRUD + story + DNA
│       ├── admin/             # Analyst portal: queue, review, notes, audit
│       ├── trends/            # ScamPulse: indicators, snapshots, summary
│       └── brand/             # Brand monitoring: scan + threats
│
├── .env                       # Your secrets (never commit this)
├── .env.example               # Template to share with teammates
└── package.json
```

---

## 8. Key Technical Notes

### Why raw SQL instead of Prisma Migrate?

Neon's free tier uses a **connection pooler (PgBouncer)** that doesn't support the long-lived transactions Prisma migrations require. We use `prisma.$queryRawUnsafe()` for all DB queries and manage schema with our own `create_tables.js`.

### BigInt Gotcha

PostgreSQL `COUNT(*)` returns `BigInt` in Node.js. All queries that aggregate counts use `::int` casts in SQL to avoid JSON serialization errors. Example:
```sql
SELECT COUNT(*)::int AS total FROM "Report"
```

### CORS

Backend allows `localhost:5173` and `localhost:5174` by default (Vite default ports). You can override with `CORS_ORIGIN` env var.

### Auth Flow

- Login sets a `token` **HttpOnly cookie** + returns token in JSON body.
- Frontend sends `credentials: 'include'` in fetch, or sets `Authorization: Bearer <token>` header.
- Both are accepted by the auth middleware.

---

## 9. Common Commands Cheatsheet

```bash
# Install deps
npm install

# Create tables (first time)
node prisma/create_tables.js

# Seed demo data
node prisma/seed.js

# Start dev server
npm run dev

# Start prod server
npm start
```

---

## 10. Running Both Frontend + Backend

Open **two terminals**:

**Terminal 1 — Backend:**
```bash
cd scamtrace_hackathon/backend
npm run dev
# → http://localhost:8000
```

**Terminal 2 — Frontend:**
```bash
cd scamtrace_hackathon/frontend
npm install
npm run dev
# → http://localhost:5173
```

Then open **http://localhost:5173** in your browser.
