/**
 * Photography and brand artwork, in the order it appears on the homepage.
 * Optimized files are generated from /source-images by `npm run images`.
 */

const base = import.meta.env.BASE_URL

export interface SitePhoto {
  /** Original file name supplied by the couple. */
  original: string
  src: string
  webp: string
  webpSmall: string
  width: number
  height: number
  alt: string
}

function photo(stem: string, original: string, width: number, height: number, alt: string): SitePhoto {
  return {
    original,
    src: `${base}images/${stem}.jpg`,
    webp: `${base}images/${stem}.webp`,
    webpSmall: `${base}images/${stem}-720.webp`,
    width,
    height,
    alt,
  }
}

export const photos = {
  /** 1. Opening hero, black and white, AG's engagement ring in focus. */
  hero: photo(
    '01-hero-ring',
    'IMG_1062(2).jpeg',
    1320,
    1961,
    'Black-and-white close-up of Beau and AG leaning in together, AG’s hand resting on Beau’s sweater with her pear-shaped engagement ring in focus.',
  ),
  /** 2. Our Story, in the garden, AG showing her ring. */
  story: photo(
    '02-our-story',
    'IMG_1056(1).jpeg',
    1125,
    1500,
    'Beau and AG smiling at each other in a flowering garden as AG holds up her hand to show her engagement ring.',
  ),
  /** 3. Venue, Rose Spring Farms beneath a pink and purple sunset. */
  venue: photo(
    '03-venue',
    'IMG_1061.jpeg',
    1320,
    1301,
    'Rose Spring Farms, a long building with a metal roof, timber posts and three cupolas, beneath a pink and lavender sunset sky.',
  ),
  /** 5. Closing photograph beneath the garden pergola. */
  closing: photo(
    '05-closing-pergola',
    'IMG_1057.jpeg',
    1040,
    1560,
    'Beau and AG standing together beneath a garden pergola, arm in arm and holding hands, smiling.',
  ),
} as const

/** 4. The BA monogram, lifted from E483CEBF-DE48-4955-AE67-F57BF2B7F855.jpeg. */
export const monogram = {
  src: `${base}images/monogram.png`,
  width: 451,
  height: 436,
  alt: 'Beau & AG monogram',
}
