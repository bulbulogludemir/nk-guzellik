# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

NK Güzellik (NK Beauty) - A professional beauty salon website built with Next.js 15, showcasing beauty products and services. The site is primarily in Turkish and focuses on professional beauty care products and services.

## Development Commands

```bash
# Development server (default: http://localhost:3000)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Linting
npm run lint
```

## Architecture

### Tech Stack
- **Framework**: Next.js 15.5.2 with App Router
- **React**: 19.1.0
- **TypeScript**: Strict mode enabled
- **Styling**: TailwindCSS with custom design system
- **UI Components**: Radix UI primitives + custom components
- **Animations**: Framer Motion
- **Icons**: Lucide React

### Directory Structure

```
src/
├── app/              # Next.js 15 App Router pages
│   ├── layout.tsx    # Root layout with Header/Footer
│   ├── page.tsx      # Home page
│   ├── products/     # Product listing and detail pages
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── services/     # Services page
│   └── contact/      # Contact page
├── components/
│   ├── ui/           # Reusable UI components (Radix-based)
│   └── layout/       # Header and Footer components
├── data/             # Static data files
│   ├── products.json            # Original product data
│   └── products.enriched.json   # Enhanced product data with images/slugs
└── lib/
    ├── utils.ts      # Utility functions (cn helper)
    └── products.ts   # Product data processing and utilities
```

### Key Patterns

#### Product Data System
Products are loaded from `src/data/products.enriched.json` and processed through `src/lib/products.ts`:

- **Category Mapping**: Original categories are mapped to simplified groups via `categoryGroupMap`
- **Turkish Text Normalization**: `normalizeText()` handles Turkish characters (ğ, ü, ş, ö, ç, ı) for search
- **Product Type**: Each product has `category` (mapped), `originalCategory`, and enriched `tags`
- **Search**: `productSearchIndex` provides normalized text for search functionality
- **Related Products**: `getRelatedProducts()` uses brand, category, and name overlap scoring

#### Component Architecture
- UI components use Radix UI primitives with Tailwind styling
- Design system uses CSS variables defined in `globals.css` with HSL color format
- Path alias: `@/*` maps to `src/*`

#### Next.js Configuration
- Custom webpack config addresses module loading issues in Next.js 15
- Package imports optimized for `lucide-react` and `framer-motion`
- Locale: Turkish (`tr`)

### Styling System

Tailwind extended with custom design tokens:
- Color palette: primary, secondary, accent, muted, destructive, card, popover
- All colors use HSL via CSS variables (e.g., `hsl(var(--primary))`)
- Border radius: lg, md, sm sizes via `--radius` variable
- Typography plugin enabled for prose content

### Important Notes

- **Language**: Content is in Turkish - maintain Turkish text for UI/content
- **Product Data**: Don't modify `src/data/*.json` directly; these are source data files
- **Category System**: When working with products, use the mapped `category` field, but preserve `originalCategory` for reference
- **Image Paths**: Product images are in `/products/` directory with slugified names
- **SEO**: Site metadata configured for Turkish locale with OpenGraph and Twitter cards

## TypeScript Configuration

- Strict mode enabled
- Module resolution: bundler
- JSON imports allowed (`resolveJsonModule: true`)
- ES2017 target for broader compatibility

## Common Tasks

### Adding New Products
1. Add to `src/data/products.enriched.json` following existing schema
2. If adding new categories, update `categoryGroupMap` in `src/lib/products.ts`
3. Ensure product has: name, brand, category, description, slug, summary, tags, image, gallery

### Working with Turkish Text
Use `normalizeText()` from `src/lib/products.ts` for search/comparison operations. It handles Turkish characters and normalizes text for case-insensitive matching.

### Styling Components
- Use Tailwind classes with design system tokens
- For interactive elements, prefer Radix UI primitives
- Animations: use Framer Motion or Tailwind's built-in animations
