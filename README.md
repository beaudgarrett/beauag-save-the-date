# Beau & AG — Wedding Website

Saturday, August 7, 2027 · Rose Spring Farms · Travelers Rest, South Carolina

A static React + TypeScript + Vite site, published free on GitHub Pages at
**https://beaudgarrett.github.io/beauag-save-the-date/**

## Updating wedding details

Everything guests see lives in `src/config/`:

| File | What it holds |
| --- | --- |
| `wedding.ts` | Date, venue, address/directions, ceremony & reception times, dress code, travel, registry, RSVP, contact, closing verse |
| `story.ts` | Our Story copy (home intro and full page) |
| `faqs.ts` | Frequently asked questions |
| `images.ts` | Photo paths and alt text |
| `routes.ts` | Pages and their browser titles |

Anything still `null` or an empty list shows **Coming Soon**. For example:

- **Event times / dress code:** set `ceremonyTime`, `receptionTime`, `dressCode`.
- **Hotels:** add entries to `travel.hotels` (`name`, `description`, `url`, `bookingCode`).
- **Registry:** add `{ name, url }` entries to `registry.registries`.
- **RSVP:** set `rsvp.isOpen = true`, `rsvp.url` and `rsvp.deadline`.

Never put guest lists, addresses or RSVP answers in this repository. It is public.

## Photographs

The couple's originals are in `source-images/` with their original file names.
`npm run images` regenerates the optimized files in `public/images/`, plus the
monogram cut-out, favicons and the social-sharing image.

| Order | Original | Used in |
| --- | --- | --- |
| 1 | `IMG_1062(2).jpeg` | Homepage hero (black & white, ring) |
| 2 | `IMG_1056(1).jpeg` | Our Story |
| 3 | `IMG_1061.jpeg` | The Venue |
| 4 | `E483CEBF-DE48-4955-AE67-F57BF2B7F855.jpeg` | BA monogram (header, footer, favicon) |
| 5 | `IMG_1057.jpeg` | Closing photograph ("The Garretts") |

To use higher-resolution originals, replace the files in `source-images/`
(same names) and run `npm run images` (requires Python 3 with Pillow and NumPy).

## Development

```bash
npm install
npm run dev       # local preview with hot reload
npm run build     # production build in dist/
npm run preview   # serve the production build
```

## Deployment

`.github/workflows/deploy.yml` builds and publishes the site on every push to
the repository's default branch. One-time setup: **Settings → Pages → Build and
deployment → Source: GitHub Actions**.

Every page is written as its own `index.html` (`scripts/postbuild.mjs`), so
direct links such as `/rsvp/` work when shared or refreshed.

Using a custom domain later? Build with `BASE_PATH=/` (edit the workflow's
build step) and update the absolute URLs in `index.html` and
`scripts/postbuild.mjs`.

## Design notes

- Palette: cream `#F6F0E5`, brown `#49392E`, jade `#427763`.
- Type: Marcellus (wide engraved capitals), Karla (reading text), Cormorant Garamond italic (romantic accents), all self-hosted.
- The jade vines (`src/components/Vines.tsx`) are generated SVG. They grow in on the first visit of a session and stay in the upper corners. Visitors who prefer reduced motion see them already in place.
