# Landing Page Template Design

## Goal

Create a reusable template for building 5-10 modern landing pages. Each landing is deployed as a static site served by nginx, routed via Traefik with automatic TLS.

## Tech Stack

| Layer | Tool | Notes |
|-------|------|-------|
| Framework | Astro 5.x | Static site generator, zero JS by default |
| UI components | React 19 + shadcn/ui | Base UI primitives (not Radix) |
| Styling | Tailwind CSS v4 | CSS-first config (`@theme` blocks) |
| Icons | Lucide React | |
| Animations | Framer Motion | Optional, per-page |
| Package manager | pnpm | |
| Build output | Static HTML/CSS/JS | `output: 'static'` |
| Serving | nginx (alpine) | |
| Routing | Traefik v3 | Auto-discovery via Docker labels |

## Project Structure

```
landing-template/
├── public/                     # Static assets (favicon, images, fonts)
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── ui/                 # shadcn/ui components (Base UI)
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   └── ...
│   │   └── landing/            # Landing-specific compound components
│   │       ├── Hero.astro
│   │       ├── Features.astro
│   │       ├── Pricing.astro
│   │       ├── Testimonials.astro
│   │       ├── CTA.astro
│   │       ├── Footer.astro
│   │       └── Navbar.astro
│   ├── layouts/
│   │   └── BaseLayout.astro    # HTML head, fonts, meta, analytics slot
│   ├── lib/
│   │   └── utils.ts            # shadcn cn() utility
│   ├── styles/
│   │   └── globals.css         # Tailwind imports + theme variables
│   └── pages/
│       └── index.astro         # Landing page (compose from components)
├── astro.config.mjs
├── components.json             # shadcn/ui config (Base UI)
├── tsconfig.json
├── package.json
├── Dockerfile                  # Multi-stage: build -> nginx
├── nginx.conf                  # Optimized static serving config
└── docker-compose.yml          # Per-site compose with traefik labels
```

## Architecture Decisions

### Astro for static generation

Astro renders everything to HTML at build time. Ships zero JavaScript unless explicitly opted in with `client:*` directives. Landing page sections are `.astro` files that use React/shadcn components but compile to pure HTML.

### shadcn/ui with Base UI primitives

Base UI is a single package (vs Radix's many `@radix-ui/*` packages), built by the creators of Radix + Material UI + Floating UI. shadcn/ui provides identical API regardless of primitive library. Selected via `npx shadcn create` -> Base UI option.

### Landing components as .astro files

Sections (Hero, Features, Pricing, etc.) are Astro components that accept props for content. They use shadcn/ui React components internally but render to static HTML. Only components needing interactivity (mobile menu, forms) use `client:visible` for selective hydration.

### Template repo workflow

Each landing = clone of this template repo into a new repo. Customize content in `src/pages/index.astro`, theme in `src/styles/globals.css`, images in `public/`.

## Page Composition

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Navbar from '../components/landing/Navbar.astro';
import Hero from '../components/landing/Hero.astro';
import Features from '../components/landing/Features.astro';
import CTA from '../components/landing/CTA.astro';
import Footer from '../components/landing/Footer.astro';
---
<BaseLayout title="Product A">
  <Navbar />
  <Hero
    headline="Ship faster with Product A"
    subtext="The modern way to build landing pages"
    primaryCTA={{ label: "Get Started", href: "#pricing" }}
  />
  <Features features={[...]} />
  <CTA />
  <Footer />
</BaseLayout>
```

## Pre-installed shadcn/ui Components

Button, Card, Badge, Separator, Sheet (for mobile nav).

## Pre-built Landing Sections

- **Navbar.astro** - Responsive nav with mobile menu (Sheet, `client:visible`)
- **Hero.astro** - Headline, subtext, CTA buttons, optional hero image
- **Features.astro** - Icon grid with Card components
- **Pricing.astro** - Pricing cards with tiers
- **Testimonials.astro** - Quote cards
- **CTA.astro** - Call-to-action banner
- **Footer.astro** - Links, copyright

## Docker Setup

### Dockerfile (multi-stage)

```dockerfile
FROM node:22-alpine AS builder
RUN corepack enable
WORKDIR /app
COPY pnpm-lock.yaml package.json ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
```

### nginx.conf

Optimized for static serving: gzip, caching headers for assets, SPA fallback disabled (true static pages), security headers.

## Traefik + Docker Compose

One master `docker-compose.yml` on the server:

```yaml
services:
  traefik:
    image: traefik:v3.3
    command:
      - "--providers.docker=true"
      - "--entrypoints.web.address=:80"
      - "--entrypoints.websecure.address=:443"
      - "--certificatesresolvers.letsencrypt.acme.email=you@example.com"
      - "--certificatesresolvers.letsencrypt.acme.storage=/letsencrypt/acme.json"
      - "--certificatesresolvers.letsencrypt.acme.httpchallenge.entrypoint=web"
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - letsencrypt:/letsencrypt

  landing-product-a:
    image: ghcr.io/you/landing-product-a:latest
    labels:
      - "traefik.http.routers.product-a.rule=Host(`product-a.example.com`)"
      - "traefik.http.routers.product-a.tls.certresolver=letsencrypt"

volumes:
  letsencrypt:
```

Each new landing = add a service block with domain. Traefik auto-discovers, handles TLS.

## Workflow: New Landing Page

1. Clone template repo into new repo
2. Edit `src/pages/index.astro` — compose sections
3. Customize theme in `src/styles/globals.css`
4. Add images to `public/`
5. `pnpm build` -> static files in `dist/`
6. `docker build` -> nginx image
7. Add service to `docker-compose.yml` with traefik labels
8. `docker-compose up -d`
