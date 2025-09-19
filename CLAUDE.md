# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server on http://localhost:3000
- `npm run build` - Build production application
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality checks

## Project Architecture

This is a Next.js 14 blog application with the following structure:

### Core Architecture
- **Framework**: Next.js 14 with App Router
- **Database**: MongoDB via Mongoose ODM
- **Styling**: Tailwind CSS
- **State Management**: React state with react-toastify for notifications
- **HTTP Client**: Axios for API requests

### Directory Structure
- `app/` - Next.js App Router pages and layouts
  - `admin/` - Admin dashboard pages
  - `blogs/` - Blog detail pages
  - `api/` - API routes (blog CRUD, email)
- `Components/` - Reusable React components
  - `AdminComponents/` - Admin-specific components (Sidebar, BlogTableItem, SubsTableItem)
  - Core components: Header, Footer, BlogList, BlogItem
- `lib/` - Server-side utilities
  - `config/db.js` - MongoDB connection setup
  - `models/BlogModel.js` - Mongoose blog schema
- `Assets/` - Static assets and images
- `public/` - Public static files

### Data Model
Blog posts have the following schema:
- title, description, category, author (required strings)
- image, authorImg (required image URLs)
- date (auto-generated timestamp)

### Key Features
- Public blog listing and reading
- Admin dashboard for blog management
- Email subscription system
- Image upload and management
- Responsive design with Tailwind CSS

### Font Configuration
Uses Outfit Google Font with weights 400, 500, 600, 700 configured in layout.js