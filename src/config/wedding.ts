/**
 * Every public wedding detail lives here.
 *
 * Only add information the couple has confirmed. Anything not yet announced
 * stays `null` (or an empty list) and the site shows "Coming Soon" in its place.
 * Never put private guest information (guest lists, addresses, RSVP answers)
 * in this file. It is published with the site.
 */

export const COMING_SOON = 'Coming Soon'

export interface Registry {
  name: string
  url: string
}

export const wedding = {
  couple: {
    display: 'Beau & AG',
    first: 'Beau',
    second: 'AG',
    familyName: 'The Garretts',
  },

  date: {
    iso: '2027-08-07',
    weekday: 'Saturday',
    long: 'August 7, 2027',
    full: 'Saturday, August 7, 2027',
  },

  venue: {
    name: 'Rose Spring Farms',
    city: 'Travelers Rest',
    state: 'South Carolina',
    stateShort: 'SC',
    // Street address confirmed from the venue's own website and Apple Maps,
    // where the venue is listed as "The Venue at Rose Springs Farm".
    streetAddress: '44 Langley Road',
    postalCode: '29690',
    directionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=The+Venue+at+Rose+Springs+Farm%2C+44+Langley+Rd%2C+Travelers+Rest%2C+SC+29690',
    intro:
      'We cannot wait to gather with our family and friends at Rose Spring Farms to celebrate the beginning of our marriage.',
  },

  // Event details that have not been announced yet.
  ceremonyTime: null as string | null,
  receptionTime: null as string | null,
  dressCode: null as string | null,

  registry: {
    intro:
      'Your presence as we celebrate our marriage is the greatest gift we could ask for. For those who have asked about our registry, more information will be shared soon.',
    registries: [] as Registry[],
  },

  rsvp: {
    // Flip to true and set `url` (or build the private guest flow) once RSVPs open.
    isOpen: false,
    url: null as string | null,
    deadline: null as string | null,
    intro: 'We look forward to celebrating with you. RSVP details will be available soon.',
  },

  contact: {
    phoneDisplay: '(864) 940-2687',
    phoneHref: 'tel:+18649402687',
  },

  tagline: 'Together in love, joined in faith.',

  closing: {
    verse:
      'Because there is one bread, we who are many are one body, for we all partake of the one bread.',
    verseReference: '1 Corinthians 10:17',
  },
} as const

export const venueLocation = `${wedding.venue.city}, ${wedding.venue.state}`
export const venueAddress = `${wedding.venue.streetAddress}, ${wedding.venue.city}, ${wedding.venue.stateShort} ${wedding.venue.postalCode}`
