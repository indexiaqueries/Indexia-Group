# Indexia Group Website

React, TypeScript, Vite, and Tailwind CSS site for a diversified Indian business group spanning finance, finserve, securities, overseas export, agro bio fertilizers, warehousing, advertising, foundation, careers, news, research, security tips, and contact enquiries.

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Build**: Vite 6 with code splitting and lazy-loaded routes
- **Styling**: Tailwind CSS 4
- **i18n**: i18next with 22 language variants
- **Routing**: React Router v7
- **Backend**: Express.js with MongoDB (contact form, job applications, admin)
- **Deployment**: Vercel (frontend + serverless API)

## Features

- 18 public routes with full SEO metadata (title, description, OG, Twitter, JSON-LD)
- 22 locales with complete translations (en, ar, de, el, es, fr, he, hi, id, it, ja, ko, nl, pl, pt, ru, sv, th, tr, uk, vi, zh)
- Company spotlight pages for 8 businesses with hero images, stats, and bullet points
- Contact page with 5 office locations and enquiry form (sends email via SMTP)
- News, global research, and security tips pages
- Careers page with job listings and resume upload
- Foundation gallery with athlete training videos
- Admin dashboard (behind auth)
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
├── pages/              # Page components (lazy-loaded)
├── routes/             # React Router configuration
├── styles/             # CSS modules (animations, cards, scroll, accessibility)
├── App.tsx             # Root component
└── main.tsx            # Entry point
server/
├── index.js            # Express server (API routes, email, file uploads)
├── db.js               # MongoDB connection
├── models/             # Mongoose models (Application, JobOpening, NewsArticle)
├── routes/             # Admin and news API routes
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
npm run dev          # Start dev server (Vite)
npm run build        # Production build + compression
npm run lint         # ESLint check
npm run preview      # Preview production build
npm run server       # Start Express backend
```

## Environment Variables

Copy `.env.example` to `.env.local` and configure:

| Variable | Purpose |
|---|---|
| `MONGODB_URI` | MongoDB connection string |
| `ADMIN_TOKEN` | Admin dashboard auth token |
| `SMTP_HOST` | SMTP server host |
| `SMTP_PORT` | SMTP server port |
| `SMTP_USER` | SMTP username |
| `SMTP_PASS` | SMTP password |
| `MAIL_TO` | Contact form recipient |
| `MAIL_FROM` | Sender email address |

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
