# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server on http://localhost:3000
- `npm run build` - Build production application
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality checks

## Project Architecture

This is a Next.js 15 blog application called MATH&TEX for sharing LaTeX PDF documents with university students.

### Core Architecture
- **Framework**: Next.js 15 with App Router (upgraded from 14)
- **Database**: MongoDB via Mongoose ODM with PDF storage as Buffer data
- **Styling**: Tailwind CSS with neo-brutalism design system
- **State Management**: React state with react-toastify for notifications
- **HTTP Client**: Axios for API requests
- **PDF Handling**: Native iframe display with MongoDB storage

### Data Model (BlogModel.js)
Blog posts store PDF documents directly in MongoDB:
- `title`, `description`, `category`, `author` (required strings)
- `pdfData` (Buffer) - PDF file stored in MongoDB
- `pdfFileName`, `pdfMimeType` (PDF metadata)
- `authorImg` (image URL for author profile)
- `date` (auto-generated timestamp)

### API Architecture
- `/api/blog` - CRUD operations for blog posts with PDF upload handling
- `/api/pdf/[id]` - Serves PDF files directly from MongoDB Buffer data
- `/api/email` - Email subscription system

### Design System
Neo-brutalism style with:
- **Colors**: Yellow (#facc15), Cyan (#22d3ee), Pink (#f472b6), Black borders
- **Typography**: Outfit font, bold/uppercase text, thick borders, harsh shadows
- **Components**: Transform rotations, chunky shadows, bright contrasting colors

### Key Features
- PDF upload and MongoDB storage (no file system dependencies)
- Neo-brutalism UI with MATH&TEX branding
- Category filtering (Math/Info)
- Admin dashboard for content management
- Iframe PDF viewer with full-screen option
- Responsive design optimized for Vercel deployment

### Configuration Notes
- `next.config.js`: `images.unoptimized = true` and `outputFileTracing = false` for Vercel compatibility
- Environment: Requires `MONGODB_URI` for database connection
- Deployment: Optimized for Vercel with serverless functions