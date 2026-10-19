# Aman Pratap Singh — Portfolio

Personal portfolio for a Python / backend engineer (Django, FastAPI, Kafka, PostgreSQL), built with **React 19 + Vite**.

## Features
- Smooth scroll reveal, scroll progress bar, active-section nav
- Count-up stats, swipeable / keyboard-navigable featured-work carousel
- Expandable experience cards, filterable skills grid, copy-to-clipboard email
- Respects `prefers-reduced-motion`; no UI libraries — ~78 KB gzipped total

## Develop
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs to dist/
```

## Edit content
All text (roles, stats, skills, links) lives in [`src/data.js`](src/data.js). Set `linkedin` / `github` there to show those links in the Contact section.

## Deploy
Every push to `main` builds and deploys to GitHub Pages via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).
