# Vibecoder Heaven: Landing Page Template

A modern landing page template optimized for **AI-driven development**. Clone, open Claude Code, describe what you want — get a production-ready landing page.

Built with [Astro](https://astro.build/) + [React](https://react.dev/) + [shadcn/ui](https://ui.shadcn.com/) (Base UI) + [Tailwind CSS v4](https://tailwindcss.com/). Ships as static HTML. Deploys with Docker + nginx + Traefik.

| Desktop | Mobile |
|---------|--------|
| ![Desktop screenshot](fullpage-screenshot.png) | ![Mobile screenshot](fullpage-mobile-screenshot.png) |

## Quick Start

```bash
# Clone the template
git clone https://github.com/agalitsyn/vibecoder-heaven-langing-page.git my-landing
cd my-landing

# Install dependencies
pnpm install

# Open Claude Code and start building
claude
```

Then tell Claude what you want:

> "Create a landing page for a SaaS product called Acme that helps developers deploy faster. Use a dark theme, add a hero with a gradient background, feature grid with 4 items, pricing with 2 tiers, and a newsletter signup form."

Claude has access to shadcn/ui and Astro documentation via MCP servers (pre-configured in `.mcp.json`), so it can browse available components, install new ones, and follow framework best practices automatically.

## Tech Stack

| Layer | Tool | Why |
|-------|------|-----|
| Framework | [Astro 5](https://astro.build/) | Static site generator — zero JS by default, blazing fast |
| UI library | [React 19](https://react.dev/) | Used for interactive components (islands) |
| Components | [shadcn/ui](https://ui.shadcn.com/) | Copy-paste components you own and customize |
| Primitives | [Base UI](https://base-ui.com/) | Headless primitives from the creators of Radix + MUI |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) | CSS-first config, `@theme` blocks in CSS |
| Icons | [Lucide React](https://lucide.dev/) | Beautiful, consistent icon set |
| Serving | nginx (alpine) | Lightweight static file server |
| Routing | [Traefik v3](https://traefik.io/) | Reverse proxy with auto TLS via Let's Encrypt |

## Project Structure

```
src/
├── components/
│   ├── ui/                  # shadcn/ui components (Base UI primitives)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── separator.tsx
│   │   └── sheet.tsx
│   └── landing/             # Landing page sections
│       ├── Navbar.astro     # Sticky nav + mobile menu
│       ├── MobileNav.tsx    # Interactive mobile menu (React island)
│       ├── Hero.astro       # Headline, CTAs, optional image
│       ├── Features.astro   # Icon grid with cards
│       ├── Pricing.astro    # Tier cards with highlight
│       ├── Testimonials.astro
│       ├── CTA.astro        # Call-to-action banner
│       └── Footer.astro     # Multi-column footer
├── layouts/
│   └── BaseLayout.astro     # HTML head, meta, global styles
├── lib/
│   └── utils.ts             # cn() utility for Tailwind classes
├── styles/
│   └── global.css           # Tailwind imports + theme variables
└── pages/
    └── index.astro          # Landing page (compose from sections)
```

## How It Works

Landing sections are **Astro components** (`.astro` files) that accept props for content. They use shadcn/ui React components internally but compile to **pure static HTML** at build time — zero JavaScript shipped.

The only exception is `MobileNav.tsx` which uses `client:visible` to hydrate the Sheet (slide-out menu) on mobile devices.

To build a page, compose sections in `src/pages/index.astro`:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Navbar from '../components/landing/Navbar.astro';
import Hero from '../components/landing/Hero.astro';
import Features from '../components/landing/Features.astro';
import Footer from '../components/landing/Footer.astro';
---
<BaseLayout title="My Product">
  <Navbar logo="Acme" />
  <Hero
    headline="Ship faster with Acme"
    subtext="The deployment platform for modern teams."
    primaryCTA={{ label: "Start Free", href: "/signup" }}
  />
  <Features features={[
    { icon: "🚀", title: "Fast Deploys", description: "Push to deploy in seconds." },
    { icon: "🔒", title: "Secure", description: "SOC 2 compliant out of the box." },
  ]} />
  <Footer />
</BaseLayout>
```

## Available Sections

Each section is optional and composable. Pass different props to customize content:

| Section | Props |
|---------|-------|
| `Navbar` | `logo`, `links[]`, `cta` |
| `Hero` | `headline`, `subtext`, `primaryCTA`, `secondaryCTA`, `image` |
| `Features` | `headline`, `subtext`, `features[]` (icon, title, description) |
| `Pricing` | `headline`, `subtext`, `tiers[]` (name, price, features, cta, highlighted) |
| `Testimonials` | `headline`, `subtext`, `testimonials[]` (quote, author, role, avatar) |
| `CTA` | `headline`, `subtext`, `primaryCTA`, `secondaryCTA` |
| `Footer` | `logo`, `columns[]` (title, links), `copyright` |

## Adding More shadcn/ui Components

Install any component from the shadcn/ui registry:

```bash
pnpm dlx shadcn@latest add dialog
pnpm dlx shadcn@latest add accordion tabs input textarea
```

All components use **Base UI** primitives automatically (configured via `"style": "base-vega"` in `components.json`).

## Customizing the Theme

### Option 1: Edit CSS variables directly

All theme variables are in `src/styles/global.css`. Modify colors, radius, fonts:

```css
:root {
    --radius: 0.625rem;
    --primary: oklch(0.205 0 0);
    --primary-foreground: oklch(0.985 0 0);
    /* ... */
}
```

### Option 2: Use tweakcn (visual editor)

[tweakcn.com](https://tweakcn.com/) is an interactive theme editor for shadcn/ui. It lets you:

- Visually customize colors, typography, border radius, shadows
- Preview changes on real shadcn/ui components in real-time
- Export generated CSS variables

**Workflow:**

1. Open [tweakcn.com](https://tweakcn.com/)
2. Adjust colors, fonts, radius, shadows to your liking
3. Copy the generated CSS variables
4. Paste into `src/styles/global.css`, replacing the `:root` and `.dark` blocks

This is the fastest way to create a unique visual identity without manually tweaking oklch values.

### Option 3: Change the base style

shadcn/ui with Base UI supports multiple visual styles. Edit `components.json`:

```json
{
  "style": "base-vega"
}
```

Available Base UI styles: `base-vega`, `base-nova`, `base-maia`, `base-lyra`, `base-mira`. After changing the style, reinstall components:

```bash
pnpm dlx shadcn@latest add --all --overwrite
```

## MCP Servers

This project includes pre-configured [MCP (Model Context Protocol)](https://modelcontextprotocol.io/) servers in `.mcp.json` that give AI assistants direct access to framework documentation and component registries.

### shadcn/ui MCP

```json
{
  "shadcn": {
    "command": "npx",
    "args": ["shadcn@latest", "mcp"]
  }
}
```

The [official shadcn MCP server](https://ui.shadcn.com/docs/mcp) gives your AI assistant the ability to:

- **Browse components** — list all available components, blocks, and templates from the shadcn/ui registry
- **Search** — find components by name or functionality
- **Install** — add components using natural language (e.g., "add a login form")

When you ask Claude to add a new section or component, it uses this MCP to find the right shadcn/ui component and install it correctly.

### Astro Docs MCP

```json
{
  "astro-docs": {
    "type": "http",
    "url": "https://mcp.docs.astro.build/mcp"
  }
}
```

The [official Astro Docs MCP server](https://docs.astro.build/en/guides/build-with-ai/) provides real-time access to the latest Astro documentation. This ensures Claude follows current best practices for:

- Page routing and layouts
- Component islands and `client:*` directives
- Static site generation config
- Integrations (React, Tailwind, MDX)

### Adding more MCP servers

Edit `.mcp.json` to add additional servers. Some useful ones:

```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"]
    }
  }
}
```

[Context7](https://context7.com/) provides up-to-date documentation for any library (React, Tailwind, etc.).

## Development

```bash
# Start dev server
pnpm dev

# Build static site
pnpm build

# Preview production build
pnpm preview
```

## Docker Deployment

### Build and run locally

```bash
docker build -t my-landing .
docker run --rm -p 8080:80 my-landing
```

Open `http://localhost:8080`.

### Deploy with Traefik (production)

The included `docker-compose.yml` sets up Traefik as a reverse proxy with automatic HTTPS:

1. Edit `docker-compose.yml` — replace `you@example.com` with your email and `example.com` with your domain
2. Deploy:

```bash
docker-compose up -d
```

Traefik automatically obtains and renews Let's Encrypt TLS certificates.

### Multiple landing pages

To deploy multiple landings on the same server, add services to `docker-compose.yml`:

```yaml
services:
  # ... traefik config ...

  landing-product-a:
    image: ghcr.io/you/landing-product-a:latest
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.product-a.rule=Host(`product-a.example.com`)"
      - "traefik.http.routers.product-a.entrypoints=websecure"
      - "traefik.http.routers.product-a.tls.certresolver=letsencrypt"

  landing-product-b:
    image: ghcr.io/you/landing-product-b:latest
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.product-b.rule=Host(`product-b.example.com`)"
      - "traefik.http.routers.product-b.entrypoints=websecure"
      - "traefik.http.routers.product-b.tls.certresolver=letsencrypt"
```

Each landing gets its own domain, its own Docker image, and automatic TLS. Traefik discovers services via Docker labels.

## Creating a New Landing Page

1. Clone this template into a new repo
2. Open Claude Code: `claude`
3. Describe your landing page in natural language
4. Claude will customize sections, theme, and content
5. `pnpm build` to generate static files
6. `docker build` and deploy

## License

MIT
