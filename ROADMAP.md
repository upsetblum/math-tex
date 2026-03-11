# MATH&TEX — Session Log & Roadmap

## What Was Built This Session

### 1. PDF → LaTeX Converter (`/convert`)

Full-screen split-panel page powered by Claude AI.

**Flow:**
1. User uploads a PDF
2. `POST /api/convert` — uploads the PDF to Anthropic Files API, streams LaTeX back token by token
3. Left panel shows the original PDF; right panel streams the generated `.tex` source live
4. On stream complete → `POST /api/compile` auto-compiles the LaTeX via [YtoTech](https://latex.ytotech.com)
5. Done state: left = `.tex` source, right = compiled PDF iframe side by side

**Files created:**
- `app/convert/page.jsx` — full-screen split layout, streaming, auto-compile
- `app/api/convert/route.js` — Anthropic Files API + SSE streaming
- `app/api/compile/route.js` — proxies LaTeX to YtoTech, returns PDF binary

**Nav bar actions in done state:** COPY · ↓ .tex · PUBLISH · RESET

---

### 2. Admin Authentication

Password-protected admin area with stateless HMAC tokens.

**Files created:**
- `middleware.ts` — guards all `/admin/*` routes, redirects to `/admin/login` if token missing/expired
- `app/api/admin/login/route.js` — issues `expiry.hmac_sha256` cookie valid 8 hours
- `app/api/admin/logout/route.js` — clears cookie
- `app/admin/login/page.jsx` — login form
- `Components/AdminComponents/LogoutButton.jsx` — logout button used in admin layout

**Env vars required:**
```
ADMIN_PASSWORD=...
TOKEN_SECRET=...   # at least 32 random characters
```

---

### 3. UI & Content

- About page: replaced placeholder image with `/public/about-blog.webp`
- Landing page: updated convert feature callout to accurately describe streaming + side-by-side compile preview
- `CLAUDE.md`: rewritten with full architecture docs, env vars, API route table, auth flow

---

### Known Issue — LaTeX Compile Preview

The compile step (`/api/compile`) is currently failing.
**Root cause:** the YtoTech API response format needs verification — the route may need to handle the response differently (binary vs base64 JSON) depending on the YtoTech API version.
**To debug:** check `console.error` output in the server terminal after clicking RETRY.

---

## Step 1 — MongoDB → Prisma + Vercel Postgres/Blob Migration ✅ COMPLETE

### What Changed

The MongoDB/Mongoose stack was replaced with Prisma ORM (Vercel Postgres) and Vercel Blob for PDF storage.

#### Why

- Vercel Postgres + Prisma gives typed queries, migrations, and a web UI
- Vercel Blob removes the 16 MB MongoDB document size limit for PDFs
- Prisma schema is the single source of truth — no more scattered Mongoose models

#### Files Created

| File | Purpose |
|---|---|
| `prisma/schema.prisma` | Blog + Email models (cuid IDs, no pdfData buffer) |
| `prisma.config.ts` | Prisma 7 datasource config (reads `DATABASE_URL` from env) |
| `lib/prisma.js` | Prisma client singleton with dev hot-reload guard |

#### Files Rewritten

| File | Change |
|---|---|
| `app/api/blog/route.js` | Prisma queries; `@vercel/blob` `put()` for PDF upload |
| `app/api/pdf/[id]/route.js` | `Response.redirect(blog.pdfUrl, 302)` — no more buffer streaming |
| `app/api/email/route.js` | Prisma queries |

#### Files Deleted

- `lib/config/db.js` — Mongoose `ConnectDB()` helper
- `lib/models/BlogModel.js` — Mongoose Blog schema with `pdfData` Buffer
- `lib/models/EmailModel.js` — Mongoose Email schema

#### Frontend `_id` → `id` Updates

| File | Change |
|---|---|
| `Components/BlogList.jsx` | `item._id` → `item.id` (line 46) |
| `app/admin/blogList/page.jsx` | `item._id` → `item.id` (line 53) |
| `app/blogs/[id]/page.jsx` | `data._id` → `data.id` (3 occurrences) |

#### Schema

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
}

model Blog {
  id          String   @id @default(cuid())
  title       String
  description String
  category    String
  author      String
  authorImg   String   @default("/about-blog.webp")
  pdfUrl      String   // Vercel Blob URL
  pdfFileName String
  date        DateTime @default(now())
}

model Email {
  id    String   @id @default(cuid())
  email String   @unique
  date  DateTime @default(now())
}
```

#### New Environment Variables

```env
DATABASE_URL=postgresql://user:pass@host:5432/dbname   # Vercel Postgres
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_...               # Vercel Blob
```

> **Note (Prisma 7):** The `url` field was removed from `datasource db` in Prisma 7. Connection URL is now passed via `prisma.config.ts` (`defineConfig`) and as `datasourceUrl` in the `PrismaClient` constructor.

#### Running the Initial Migration

```bash
npx prisma migrate dev --name init
npx prisma generate
```

---

## Step 1b — Publish to Blog from /convert ✅ COMPLETE

### What Was Added

After a PDF is converted to LaTeX on `/convert`, users can publish it directly to the blog with a single click.

#### Flow

1. Conversion finishes → **PUBLISH** button appears in the nav bar (pink, neo-brutalist style)
2. User clicks PUBLISH → modal opens
3. Inside the modal, an **AUTO-GENERATE WITH CLAUDE** button calls `POST /api/generate-metadata`
   - Claude reads the first ~3000 chars of the generated LaTeX
   - Returns `{ title, description }` in French
4. Title + description are pre-filled in editable inputs; user can also type manually
5. User selects category and enters author name
6. Clicking **PUBLISH** → `POST /api/blog` with the original PDF file + metadata
   - PDF is uploaded to Vercel Blob
   - Blog row is created in Postgres
7. Success state shows "Published!" with a link to the blog home

#### New File

| File | Purpose |
|---|---|
| `app/api/generate-metadata/route.js` | Calls Claude to return `{ title, description }` JSON from LaTeX source |

#### Modified File

| File | Change |
|---|---|
| `app/convert/page.jsx` | Added `PublishModal` component + PUBLISH button in done-state nav bar |

---

## Step 2 — Deploy to Vercel

### Prerequisites

- GitHub repo: `github.com/upsetblum/math-tex` ✓ (already pushed)
- Vercel account linked to GitHub

### Steps

1. **Import project** at [vercel.com/new](https://vercel.com/new) → select `math-tex`

2. **Add Vercel Postgres**
   - Vercel dashboard → Storage → Create → Postgres
   - Link to project → copy `DATABASE_URL` to env vars

3. **Add Vercel Blob**
   - Vercel dashboard → Storage → Create → Blob
   - Link to project → copy `BLOB_READ_WRITE_TOKEN` to env vars

4. **Set all env vars** in Vercel project settings:

```
DATABASE_URL=
BLOB_READ_WRITE_TOKEN=
ADMIN_PASSWORD=
TOKEN_SECRET=
ANTHROPIC_API_KEY=
```

5. **Run initial migration** (one time, from local with prod URL):

```bash
DATABASE_URL="<prod connection string>" npx prisma migrate deploy
```

6. **Deploy** — push to `main` triggers auto-deploy

### Post-deploy checklist

- [ ] `/admin/login` works with production password
- [ ] Upload a test PDF via `/admin/addBlog`
- [ ] PDF appears on home page and opens correctly
- [ ] `/convert` page streams LaTeX and shows compiled PDF
- [ ] PUBLISH button on `/convert` creates a blog post and stores PDF in Vercel Blob
- [ ] Newsletter subscription saves to Postgres

---

## Order of Operations

```
1. npx prisma init + schema                              ✅
2. Rewrite lib/ (remove Mongoose, add Prisma singleton)  ✅
3. Rewrite API routes (blog, pdf, email)                 ✅
4. Add /api/generate-metadata + publish modal            ✅
5. Test locally with real Vercel Postgres + Blob URLs
6. Push to GitHub
7. Import to Vercel, add Storage (Postgres + Blob), set env vars
8. npx prisma migrate deploy (against prod DB)
9. Deploy
10. Upload the 3 PDFs via admin panel
```
