# Indexia Group Website

React, TypeScript, Vite, and Tailwind CSS site for a diversified Indian business group spanning finance, finserve, securities, overseas export, agro bio fertilizers, warehousing, advertising, foundation, careers, news, research, security tips, and contact enquiries.

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Build**: Vite 8 with code splitting and lazy-loaded routes
- **Styling**: Tailwind CSS 4
- **i18n**: i18next with 22 language variants
- **Routing**: React Router v7
- **Backend**: Express.js with MongoDB (contact form, job applications, admin)

## Features

- All public routes carry SEO metadata (title, description, OG, Twitter, JSON-LD)
- 22 locales with complete translations (en, ar, de, el, es, fr, he, hi, id, it, ja, ko, nl, pl, pt, ru, sv, th, tr, uk, vi, zh); language switches client-side via localStorage — the same URL serves all locales, so there are no separate localized URLs to index
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
├── data/               # Static seed data (default job openings)
├── middleware/         # Shared auth guard (requireAdmin)
├── models/             # Mongoose models (Application, Enquiry, JobOpening, NewsArticle)
├── routes/             # Admin, openings, and news API routes
└── services/           # News fetcher & scheduler, opening seeding
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
| `SESSION_SECRET` | Secret signing the admin session cookie (required for `/admin`). Generate with `node -e "console.log(require('crypto').randomBytes(48).toString('base64url'))"` |
| `ADMIN_SETUP_TOKEN` | Optional extra protection for the one-time admin setup endpoint; sent as the `x-admin-setup-token` header |
| `NEWSDATA_API_KEY` | NewsData.io key for the scheduled news fetcher |
| `PORT` | Express backend port (default 3001) |
| `CORS_ORIGINS` | Comma-separated origins allowed to call the API cross-origin (defaults to the production site + local dev) |
| `COOKIE_SAMESITE` | Session cookie SameSite policy; production defaults to `none` for the split deployment, override with `lax` for same-origin hosting |
| `VITE_API_URL` | Optional API base URL when frontend and backend are on different origins. Production builds fall back to the Render API URL, so only set it to override |

## Admin Authentication

The admin dashboard (`/admin`) uses server-side sessions with an HTTP-only
cookie (`admin.sid`), backed by MongoDB — never a token in localStorage.

**One-time setup (create the admin account):** with the backend running,
send the initial password from an API client such as Postman — there is no
registration page in the app:

```http
POST http://localhost:3001/api/admin/register
Content-Type: application/json
x-admin-setup-token: <value of ADMIN_SETUP_TOKEN, if configured>

{ "password": "YourInitialAdminPassword" }
```

- Password rules: at least 10 characters, at least one letter and one number.
- Responds `201 {"ok":true,...}` on success; `409 {"ok":false,"error":"Admin already configured."}` once an admin exists. The endpoint can never overwrite or add accounts.
- Only a bcrypt hash (cost 12) is stored — never the plaintext password.

**Logging in:** visit `/admin/login` and enter the password. The backend
creates a session and sets the HTTP-only cookie; the password is never stored
in the browser. With the frontend on indexiagroup.com and the API on Render,
the session cookie is issued `SameSite=None; Secure` automatically.

**Deployment note:** the static frontend (Hostinger) and the API (Render) are
different origins, so the frontend must be built with the API URL baked in —
`src/lib/api.ts` falls back to `https://indexia-group-website.onrender.com`
in production. The backend's `SESSION_SECRET`, `MONGODB_URI`, and
`COOKIE_SAMESITE` settings live on the Render service. Protected admin APIs (applications, openings, enquiries,
holidays, resume downloads) all require a valid session via the
`requireAdmin` middleware and return `401` otherwise.

**Other auth endpoints:** `POST /api/admin/logout` destroys the session,
and `GET /api/admin/me` reports whether the current browser is authenticated.
Login and registration are rate-limited (10 attempts / 10 minutes).

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
- Custom URL previews: social unfurlers (WhatsApp, X, LinkedIn, Facebook…) are served per-route Open Graph/Twitter tags via `server/middleware/urlPreviews.js`, so every shared link shows its own title, description, and image
- `sitemap.xml` with the 16 indexable public routes
- `llms.txt` for AI-agent readability
