# Nexcent

A modern landing page built with React 19, TanStack Start, HeroUI, Tailwind CSS v4, and Framer Motion.

## Tech Stack

| Category | Library |
|---|---|
| Framework | [TanStack Start](https://tanstack.com/start) + React 19 |
| Routing | [TanStack Router](https://tanstack.com/router) (file-based) |
| UI Components | [HeroUI](https://heroui.com) v3 |
| Styling | [Tailwind CSS](https://tailwindcss.com) v4 |
| Animations | [Motion](https://motion.dev) v12 |
| Icons | [Lucide React](https://lucide.dev) |
| Carousel | [Swiper](https://swiperjs.com) v12 |
| Validation | [Zod](https://zod.dev) v4 |
| Build Tool | [Vite](https://vite.dev) v8 |
| Deployment | [Netlify](https://netlify.com) |

## Project Structure

```
src/
├── components/
│   ├── atoms/          # Base typography & reusable primitives
│   │   ├── Heading1.tsx
│   │   ├── Heading2.tsx
│   │   ├── Heading3.tsx
│   │   ├── Writing.tsx
│   │   └── ClientLogos.tsx
│   ├── layout/
│   │   └── RootLayout.tsx
│   └── organisms/      # Full page sections
│       ├── Navbar.tsx
│       ├── Banner.tsx
│       ├── Clients.tsx
│       ├── EcoSystem.tsx
│       ├── Achievement.tsx
│       ├── Stats.tsx
│       ├── FooterPromo.tsx
│       ├── Testimonial.tsx
│       ├── Blog.tsx
│       ├── CTA.tsx
│       └── Footer.tsx
├── routes/
│   ├── __root.tsx
│   ├── _landingPage.tsx
│   └── _landingPage/
│       └── index.tsx   # Landing page composition
└── styles.css          # Tailwind theme & global styles
```

## Page Sections

The landing page renders sections in this order:

1. **Navbar** — Sticky navigation with mobile drawer
2. **Banner** — Hero carousel
3. **Clients** — Client logo strip
4. **EcoSystem** — Product ecosystem overview
5. **Achievement** — Key highlights
6. **Stats** — Statistics counters
7. **FooterPromo** — Mid-page promotional block
8. **Testimonial** — Customer testimonials
9. **Blog** — Latest posts
10. **CTA** — Call to action
11. **Footer** — Site footer with links and newsletter

## Getting Started

```bash
npm install
npm run dev
```

The dev server starts at [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server on port 3000 |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run test` | Run tests with Vitest |
| `npm run lint` | Lint with ESLint |
| `npm run format` | Format with Prettier + ESLint fix |
| `npm run check` | Check formatting with Prettier |

## Theme

Design tokens are defined in `src/styles.css` under `@theme`:

| Token | Value | Usage |
|---|---|---|
| `brand` | `#4caf4f` | Primary green |
| `brand-dark` | `#388e3c` | Hover states |
| `neutral-800` | `#263238` | Footer background |
| `neutral-900` | `#18191f` | Darkest surface |
| `ink` | `#18191f` | Body text |
| `ink-soft` | `#717171` | Secondary text |
| `surface` | `#ffffff` | White background |
| `surface-soft` | `#f5f7fa` | Light grey background |

## Deployment

The project is configured for [Netlify](https://netlify.com) via the `@netlify/vite-plugin-tanstack-start` plugin and a `netlify.toml` config file.

1. Push the repo to GitHub
2. Import at [app.netlify.com/start](https://app.netlify.com/start)
3. Netlify auto-detects the build settings
4. Trigger the first deploy
