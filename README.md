# SCAMTRACE

> **AI-Powered Scam Detection, Brand Impersonation Defense & Incident Intelligence**  
> *Developed for the HacXLerate 2026 Hackathon*

---

## 1. Project Description

Digital fraud, social engineering, and brand impersonation are expanding at unprecedented rates. Scammers frequently deploy deceptive social media profiles, distribute counterfeit mobile apps, mimic reputable corporate logos with subtle alterations, and circulate fraudulent bank KYC SMS alerts to steal funds and credentials.

**SCAMTRACE** is an explainable, multi-modal security platform engineered to help everyday users and security analysts detect, verify, and remediate digital threats. Rather than operating as an opaque "black-box" AI, SCAMTRACE provides:
- **Instant forensic scanning** of suspicious messages, URLs, phone numbers, and screenshots.
- **Automated logo authenticity verification** that retrieves verified reference assets directly from official registries and compares them side-by-side.
- **Social media and mobile app impersonation checkers** that evaluate handle lookalikes, publisher credentials, and store origins.
- **Scam Story Mode & Scam DNA** that breaks down manipulation techniques in plain English and clusters related incident reports.
- **Damage Control Navigator** offering personalized triage steps for victims.
- **Security Operations Workspace** for review, corroboration, and audit tracking.

---

## 2. Key Features

- **Multi-Modal Instant Content Scanner (`/`, `/check`)**: Analyzes text messages, URLs, phone numbers, and uploaded image screenshots using deterministic rule engines, URL tokenizers, and Tesseract.js OCR.
- **AI Logo Authenticity Checker (`/logo-check`)**: Uploads suspicious logos or app icons, dynamically discovers verified brand assets from Wikidata and official domains, and computes multi-factor visual differences (perceptual dHash, color histograms, OCR text changes).
- **Social Media Impersonation Checker (`/social-check`)**: Detects counterfeit accounts across X (Twitter), Instagram, LinkedIn, and Facebook by evaluating handle lookalikes, verified status, and follower discrepancies.
- **Fake & Impersonation Mobile App Detector (`/app-check`)**: Assesses counterfeit apps, unknown APK packages, unauthorized publishers, and dangerous permission requests.
- **Brand Intelligence & Monitoring (`/brand-monitor`)**: Maintains verified brand profiles (SBI, Tata Digital, Paytm, HDFC, Amazon, etc.) and analyzes potential brand threats.
- **Scam Story Mode & Scam DNA**: Deconstructs persuasion tactics (urgency, banking coercion, fake rewards) and correlates shared threat indicators across incidents.
- **Damage Control Navigator (`/damage-control`)**: Provides prioritized recovery actions tailored to what the user did (e.g. clicked link, entered credentials, shared OTP, transferred money, installed APK) with Indian Cybercrime Helpline (1930 / cybercrime.gov.in) guidance.
- **Community Threat Intelligence (`/community`, `/reports/:id`)**: Browse verified community scam reports with privacy redaction and incident timelines.
- **Security Operations Admin Portal (`/admin/login`, `/admin/dashboard`, `/admin/reports`)**: Secure role-guarded analyst workspace for reviewing pending reports, recording case notes, and corroborating evidence.

---

## 3. Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, Vite 8, React Router v7, Lucide React, Google OAuth |
| **Backend** | Node.js 18+, Express 5, Prisma 7 client with raw SQL queries via `pg` adapter |
| **Security & Auth** | Helmet, Dynamic CORS, Cookie-parser, JWT, Bcrypt |
| **Database** | Neon Serverless PostgreSQL (Cloud-hosted with connection pooling via PgBouncer) |
| **Computer Vision & AI** | NVIDIA NIM API (Llama 3.2 Vision / Kimi K3), Tesseract.js OCR, Sharp (dHash & geometry), Cloudinary |
| **External Data** | Wikidata Corporate Knowledge Graph, Wikimedia Commons, Official Domain Favicons |

---

## 4. Installation and Setup

### Prerequisites
- **Node.js** ≥ 18.0.0
- **npm** ≥ 9.0.0
- **Git**
- A **Neon PostgreSQL** database connection string (or local PostgreSQL)

### 1. Clone the Repository
```bash
git clone https://github.com/balajisudarshan/scamtrace_hackathon.git
cd scamtrace_hackathon
```

### 2. Configure Backend Environment
Navigate to `backend/` and set up your `.env`:
```bash
cd backend
cp .env.example .env
```

Ensure `backend/.env` contains your connection credentials:
```env
PORT=8000
NODE_ENV=development
DATABASE_URL='postgresql://<user>:<password>@<neon-pooler-host>/neondb?sslmode=require&channel_binding=require'
JWT_SECRET='your-jwt-secret-key'
GOOGLE_CLIENT_ID='your-google-client-id'

# Optional Integrations
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NVIDIA_API_KEY=your_nvidia_api_key
NVIDIA_MODEL=meta/llama-3.2-11b-vision-instruct
```

> **Note:** Always use the pooled Neon connection string (`-pooler` in the host) to ensure compatibility with serverless connection pooling.

### 3. Install Dependencies & Set Up Database
```bash
# In backend/
npm install

# Create all 8 database tables and custom ENUM types
node prisma/create_tables.js

# Seed sample threat indicators, reports, and test accounts
node prisma/seed.js
```

### 4. Configure Frontend Environment
In a separate terminal, navigate to `frontend/`:
```bash
cd frontend
npm install
```

Verify that `frontend/.env` is configured for local development:
```env
VITE_API_URL=http://localhost:8000
```

---

## 5. Usage

### Starting the Local Development Servers

Open two terminals:

**Terminal 1 — Backend:**
```bash
cd backend
npm run dev
# Backend starts at: http://localhost:8000
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
# Frontend starts at: http://localhost:5173
```

Open your browser and navigate to **`http://localhost:5173`**.

### How to Use the Key Features

1. **Instant Scam Scan**: On the Home page (`/`), paste an unsolicited SMS, phishing URL, or phone number, or upload a screenshot. Click **Scan Content** to see immediate risk scoring and forensic breakdown.
2. **Check a Logo**: Go to **Check a Logo** (`/logo-check`), upload a suspicious brand image or app icon, and type the claimed brand name (e.g. *Nike*, *SBI*, *Tata Digital*). Click **Find Original & Compare** to inspect visual similarity and detected modifications.
3. **Check a Social Account**: Go to **Social Check** (`/social-check`), enter the social handle, select the platform (X, Instagram, LinkedIn, etc.), and specify the claimed brand to evaluate impersonation risks.
4. **Check a Mobile App**: Go to **App Check** (`/app-check`), enter the app name, publisher, and APK download link to detect unofficial distribution and suspicious permissions.
5. **Report an Incident**: Go to **Report Scam** (`/report`), fill in incident details, review the public privacy redaction preview, and submit it into the intelligence queue.
6. **Damage Control**: Go to **Damage Control** (`/damage-control`), select the actions that took place (e.g. *Entered Credentials*, *Transferred Money*), and follow the prioritized remediation checklist.
7. **Admin Portal**: Go to `/admin/login` and log in using the pre-seeded demo administrator credentials:
   - **Email**: `admin@scamtrace.dev`
   - **Password**: `admin123`  
   *(Or Analyst credentials: `analyst@scamtrace.dev` / `analyst123`)*

---

## 6. Limitations

- **Authoritative Registry Coverage**: Brand logo discovery queries official knowledge graphs (Wikidata, Wikimedia Commons, official domains). Niche regional entities lacking public registry data are transparently labeled as `UNABLE_TO_VERIFY` rather than guessed.
- **Social Media API Restrictions**: Mainstream social networks (Meta, X) enforce strict unauthenticated API rate limits and scraping restrictions. The platform assesses profile handles, screenshot forensics, and known verified registries rather than private platform metadata.
- **Free-Tier Cold Starts**: When connected to cloud deployments on free-tier hosting (e.g. Render), the server may spin down after inactivity. The first API request can take 15–30 seconds while waking up.

---

## 7. Detailed Documentation

For full architectural diagrams, database entity-relationship models, complete REST API endpoint specifications, detection algorithms, and verified test results, please refer to the technical document:

📄 **[SCAMTRACE_Project_Documentation.pdf](./SCAMTRACE_Project_Documentation.pdf)**
