# Project Guidelines

## Language

- Always write README.md, CLAUDE.md, and all documentation files in English
- Code comments in English

## Tech Stack

- **Framework:** Astro 5.x (static site generator)
- **UI:** React 19 + shadcn/ui with Base UI primitives (`"style": "base-vega"` in components.json)
- **Styling:** Tailwind CSS v4 (CSS-first config in `src/styles/global.css`)
- **Icons:** Lucide React
- **Package manager:** pnpm

## Architecture

- Landing sections are `.astro` files in `src/components/landing/`
- They use shadcn/ui React components but compile to static HTML (zero JS)
- Only components needing interactivity use `client:visible` or `client:load`
- For static links styled as buttons, use `buttonVariants()` utility with `<a>` tags — do not use the React `<Button>` component
- Base UI uses `render` prop instead of Radix's `asChild`

## Commands

- `pnpm dev` — start dev server
- `pnpm build` — build static site to `dist/`
- `pnpm preview` — preview production build
- `pnpm dlx shadcn@latest add <component>` — install shadcn/ui component

## File Conventions

- Astro components: PascalCase `.astro` files
- React components: PascalCase `.tsx` files
- shadcn/ui components: lowercase in `src/components/ui/`
- Path alias: `@/*` maps to `./src/*`
