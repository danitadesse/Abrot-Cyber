# Abrot Cyber

A dark-first marketing site for a fictional Ethiopian cybersecurity
consultancy, with a free browser-side security toolkit, a light/dark
theme toggle and full-width layout. "Abrot" means fortress.

Fictional portfolio project by Daniel Tadesse. All companies, people, stats and
case studies are invented for demonstration.

## Stack

- Next.js 14 (App Router) + TypeScript
- Prisma + SQLite (contact form submissions only)
- No other runtime dependencies; no auth, no admin dashboard

## Quick start

Run from inside the project folder:

    npm install
    cp .env.example .env
    npx prisma db push
    npm run dev

Then open http://localhost:3000

The .env file needs a single line (already provided by .env.example):

    DATABASE_URL="file:./dev.db"

## What is inside

- Marketing pages: home (hero, stats, service and case-study previews),
  services (6 practice areas), case studies, about (team), contact.
- Security toolkit (all client-side except the breach checker):
  - Password strength meter: entropy estimate, checklist, offline crack time
  - Hash generator: SHA-1/256/384/512 via the browser Web Crypto API
  - Breach exposure checker: k-anonymity style, sends only the first 5 hex
    characters of a SHA-256 hash to a simulated breach dataset
  - Port exposure scanner: simulated common-port scan (no packets are sent)
  - HTTP security headers analyzer: score out of 100 with recommendations
  - Password generator: crypto.getRandomValues, length slider, entropy estimate
  - Cyber risk self-assessment: 8-question scored quiz with tailored advice
- Contact form with server-side validation, a honeypot anti-spam field and an
  in-memory rate limit (5 submissions per 15 minutes per IP).

## Where the data goes

The contact API writes one row to the SQLite ContactRequest table. The breach
checker reads a fixed in-memory list. Nothing else stores or transmits data.

## Design notes

- Dark-first slate theme (#0b1220) with an electric blue accent (#3b82f6),
  plus a light mode toggle (persisted in localStorage, no flash on load).
- Sticky header and footer; the footer always sits at the bottom of the page.
- Pure CSS + inline SVG throughout; no icon or animation packages.

## Portfolio context

This is project 4 of 5 fictional businesses:

1. Debre Logistics - freight management platform
2. BirrPay - payments dashboard with 2FA
3. Kaffa Origins - Ethiopian coffee e-commerce
4. Abrot Cyber - this project
