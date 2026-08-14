# Deploying to Vercel via GitHub

This project has two parts that Vercel runs differently:

- **Frontend** — Vite + React. Vercel builds it with `npm run build` and serves the `dist/` output as static files.
- **API** — the Express app in `server/index.js`. Vercel can't run long-lived Node servers, so it's imported by `api/index.js` and runs as a **serverless function** at `/api`. A rewrite in `vercel.json` forwards every `/api/*` request to it; a catch-all rewrite serves `index.html` for all other routes (required for `react-router` client-side navigation).

## One-time setup: environment variables

In the **Vercel dashboard → your project → Settings → Environment Variables**, add the same values your local `server/.env` holds (never commit `.env` — it's gitignored):

| Variable | Notes |
| --- | --- |
| `MAIL_TO` | Recipient of contact-form enquiries |
| `MAIL_FROM` | Sender address |
| `SMTP_HOST` | e.g. `smtp.hostinger.com` |
| `SMTP_PORT` | e.g. `465` |
| `SMTP_SECURE` | `true` for port 465, `false` for 587 |
| `SMTP_USER` | SMTP login |
| `SMTP_PASS` | SMTP password (use Vercel's "Encrypt" option) |
| `SMTP_TLS_REJECT_UNAUTHORIZED` | Optional; set to `false` if your provider's cert fails validation |

Without `SMTP_*` vars the API still works but only logs the email to the function's console (dev mode) instead of sending it.

## Deploy steps

1. Push this repo to GitHub (`git remote add origin <url>` if it isn't connected yet, then `git push -u origin main`).
2. Go to [vercel.com/new](https://vercel.com/new) and **Continue with GitHub**.
3. Authorize Vercel to access the repository (or the org it lives in), then click **Import** on the project.
4. Vercel auto-detects Vite — the framework, build command (`npm run build`), and output directory (`dist`) are already set via `vercel.json`. Click **Deploy**.
5. After the first build succeeds, Vercel gives you a `*.vercel.app` URL. Test:
   - Frontend loads at the root
   - A client route (e.g. `/contact`) works on a hard refresh (the SPA rewrite)
   - `GET /api/health` returns `{ "ok": true, ... }` and the contact form sends mail
6. For a custom domain: **Settings → Domains → Add** (e.g. `indexiagroup.com`, `www`).

## After that, it's automatic

Every push to the default branch triggers a production deploy; every PR gets a unique preview URL.

## Notes

- The `server/index.js` static-file middleware (gzip/brotli serving of `dist/`) is harmless on Vercel — real requests never reach it because Vercel serves the static files itself and the function only receives `/api/*`.
- `npm run dev` / `npm run server` still work exactly as before locally.
- First request to `/api/*` after idle can take a couple of seconds (cold start). If you'd rather run the whole Express server as one long-lived process (identical behavior to local), deploy to a Node host like Render, Railway, or Fly.io instead — the `npm run server` script works there as-is.
