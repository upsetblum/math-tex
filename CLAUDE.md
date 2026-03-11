# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server on http://localhost:3000
- `npm run build` - Build production application
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality checks

## Environment Variables

```
MONGODB_URI=           # MongoDB connection string
ADMIN_PASSWORD=        # Admin login password
TOKEN_SECRET=          # Secret for HMAC token signing
ANTHROPIC_API_KEY=     # Claude API key (for /convert feature)
```

## Project Architecture

Next.js 15 App Router blog called **MATH&TEX** — shares LaTeX PDF documents with university students.

### Data Layer

- **Database**: MongoDB via Mongoose (`lib/config/db.js` exports `ConnectDB()`, called at top of every API route)
- **Models**: `lib/models/BlogModel.js` (blog posts + PDF binary), `lib/models/EmailModel.js` (newsletter subscribers)
- **PDF storage**: PDF files stored as `Buffer` in MongoDB's `pdfData` field — no filesystem used

### API Routes

| Route | Purpose |
|---|---|
| `GET/POST/DELETE /api/blog` | Blog CRUD; POST accepts `multipart/form-data` with `pdfFile` |
| `GET/HEAD /api/pdf/[id]` | Streams PDF buffer from MongoDB to iframe |
| `GET/POST/DELETE /api/email` | Newsletter subscription management |
| `POST /api/admin/login` | Issues HMAC-signed time-limited token as `admin_token` cookie |
| `POST /api/admin/logout` | Clears cookie |
| `POST /api/convert` | Uploads PDF to Anthropic Files API, streams back LaTeX source via SSE |
| `POST /api/compile` | Proxies LaTeX source to `latex.ytotech.com`, returns compiled PDF binary |

### Auth Flow

`middleware.ts` guards all `/admin/*` routes (except `/admin/login`). Token format: `${expiry}.${hmac_sha256}`, verified with Web Crypto API. Cookie name: `admin_token`, 8-hour TTL.

### /convert Page Flow

1. User uploads PDF → `POST /api/convert` uploads to Anthropic Files API (beta: `files-api-2025-04-14`)
2. Claude (`claude-opus-4-6`) streams LaTeX back — displayed in real-time in a dark split-panel
3. On stream complete → `POST /api/compile` sends LaTeX to YtoTech, returns compiled PDF
4. Done state: left panel = LaTeX source, right panel = compiled PDF iframe

### Design System

Neo-brutalism: yellow (`#facc15`) / cyan (`#22d3ee`) / pink (`#f472b6`) accent colors, thick black borders (`border-4 border-black`), harsh box shadows (`shadow-[8px_8px_0px_0px_#000]`), Outfit font, uppercase bold text.

### Configuration Notes

- `next.config.js`: `images.unoptimized = true`, `outputFileTracing = false` — required for Vercel
- `middleware.ts` uses the deprecated `middleware` convention (Next.js warns to rename to `proxy`) — do not rename without testing
