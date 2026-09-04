# Indexia Group Website

React, TypeScript, Vite, and Tailwind CSS site for a diversified Indian business group spanning finance, finserve, securities, overseas export, agro bio fertilizers, warehousing, advertising, foundation, careers, news, research, security tips, and contact enquiries.

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Build**: Vite 8 with code splitting and lazy-loaded routes
- **Styling**: Tailwind CSS 4
- **i18n**: i18next with 22 language variants
- **Routing**: React Router v7
- **Backend**: Express.js with MongoDB (contact form, job applications, admin)
- **Deployment**: Vercel (frontend + serverless API)

## Features

- 18 public routes with full SEO metadata (title, description, OG, Twitter, JSON-LD)
- 22 locales with complete translations (en, ar, de, el, es, fr, he, hi, id, it, ja, ko, nl, pl, pt, ru, sv, th, tr, uk, vi, zh)
- Company spotlight pages for 8 businesses with hero images, stats, and bullet points
- Register-of-companies index strip (catalogue edge) across the home and company pages
- Disciplined design tokens: teal for actions, yellow for the Indexia mark, navy glass surfaces
- Contact page with 5 office locations and enquiry form; submissions are stored in MongoDB and managed from the admin dashboard
- News, global research, and security tips pages
- Careers page with job listings and resume upload
- Foundation gallery with athlete training videos
- Admin dashboard (behind auth) for job applications, enquiries, and openings
- Brochure PDF generation for warehouse and advertising
- Brotli + gzip compression
- Speculation Rules API for instant navigation prerendering
- Responsive images with srcset and quality variants
- FAQPage JSON-LD structured data for rich search snippets
- Scroll-triggered reveal animations (fade-up, scale, fade variants)
- Glassmorphism FAQ cards with smooth expand/collapse transitions
- Click-triggered Group Companies dropdown (no hover)
- Dynamic foundation gallery (auto-imports media from folder)
- Globe zoom-out animation on homepage
- Kenburns background animation on hero (with instant image load)

## Project Structure

```
src/
├── assets/             # Bundled images (company, contact, careers, heroes, logos)
├── assets-responsive/  # Responsive image variants
├── components/         # Reusable UI components
├── data/               # Static data, image registries, company info
├── hooks/              # Custom React hooks (useInView, useCountUp, etc.)
├── i18n/               # i18next setup and 22 locale JSON files
├── layout/             # Main layout wrapper
├── lib/                # Utility functions (color, theme, responsiveVariants)
├── pages/              # Page components (lazy-loaded; admin dashboard in pages/admin/)
├── routes/             # React Router configuration (lazy-loaded pages)
├── styles/             # CSS modules (animations, cards, scroll, accessibility)
└── main.tsx            # Entry point
server/
├── index.js            # Express server (API routes, file uploads, static serving)
├── db.js               # MongoDB connection
├── middleware/         # Shared auth guard (requireAdmin)
├── models/             # Mongoose models (Application, Enquiry, JobOpening, NewsArticle)
├── routes/             # Admin, openings, and news API routes
└── services/           # News fetcher and scheduler
api/
└── index.js            # Vercel serverless entry point
public/
├── brochures/          # Generated PDF brochures
├── fonts/              # Self-hosted Fraunces font files
├── images/             # Static images (heroes, security, research, news)
├── favicon.svg         # Browser tab icon
├── llms.txt            # AI-agent readable site summary
├── robots.txt          # Crawler rules
├── sitemap.xml         # 18 public routes
└── og-image.png        # Social share image
```

## Commands

```bash
npm install
npm run dev          # Start Vite + Express in parallel (hot reload)
npm run dev:server   # Start the Express backend only
npm run build        # Production build + compression
npm run lint         # ESLint check
npm run preview      # Preview production build
```

## Environment Variables

Copy `.env.example` to `.env.local` and configure:

| Variable | Purpose |
|---|---|
| `MONGODB_URI` | MongoDB connection string (required for contact form, job applications, openings, news) |
| `ADMIN_TOKEN` | Admin dashboard auth token |
| `NEWSDATA_API_KEY` | NewsData.io key for the scheduled news fetcher |
| `PORT` | Express backend port (default 3001) |
| `VITE_API_URL` | Optional API base URL when frontend and backend are on different origins |

Contact enquiries and job applications are stored in MongoDB only — the team
reviews them in the admin dashboard (`/admin`).

## Performance

- Lazy-loaded i18n locale files (only English loads initially)
- Manual chunk splitting (react, lucide, router, i18n, cobe)
- Self-hosted Fraunces font with `font-display: optional`
- Non-blocking CSS via Vite plugin
- LCP image preloaded with responsive srcset
- `content-visibility: auto` on below-fold sections
- Brotli + gzip dual compression
- Speculation Rules for prerendering likely-next pages
- IntersectionObserver-based scroll reveal animations

## SEO

- Unique title, description, keywords, and canonical URL per page
- Open Graph and Twitter Card metadata
- JSON-LD structured data (Organization, WebSite, WebPage, BreadcrumbList, FAQPage, Company pages)
- `robots.txt` blocks admin, apply, and brochure pages
- `sitemap.xml` with 18 public routes
- `llms.txt` for AI-agent readability
- Hreflang alternates for 22 locales in `index.html`
