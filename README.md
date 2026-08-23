# Fatimah Noman — Portfolio

A premium, agent-themed personal portfolio built with Next.js 15, Tailwind CSS v4, and Framer Motion.

## Features

- **Boot-screen preloader** — terminal-style initialization animation on first load
- **Interactive Agent Network** — canvas background in the hero with connected nodes, traveling data packets, and cursor-reactive links
- **Bento-grid stats dashboard** — animated counters, commit activity bars, live status tile
- **Side-slide section reveals** — directional blur-fade entrances across all sections
- **Numbered agency-style headers** — editorial layout for every section
- **Project showcase** — featured project spotlight, category filters with counts, staggered zigzag grid, 3D tilt + spotlight cards, terminal modal for CLI/agent projects
- **Hackathon highlights** — auto-rotating achievement cards
- **Certificates gallery** — verified badge, full lightbox viewer
- **AI-style chatbot** — keyword-driven assistant answering portfolio questions
- **Contact form** — powered by EmailJS
- **Polish layer** — custom cursor, scroll progress bar, scroll-spy navbar, marquee ribbons, reduced-motion support

## Tech Stack

| Layer | Tools |
|---|---|
| Framework | Next.js 15 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion, Canvas API |
| Forms | EmailJS |
| Icons | Heroicons, React Icons |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment / Config

Email credentials live in `src/app/config/emailjs.ts`. Update the service/template/public-key values with your own EmailJS account before deploying the contact form.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | Run ESLint |

## Deployment

Deploys out of the box to [Vercel](https://vercel.com). Push to your Git provider, import the repo, and ship.

## Contact

- Email: fatimahnoman452@gmail.com
- GitHub: [Fatimahnoman](https://github.com/Fatimahnoman)
