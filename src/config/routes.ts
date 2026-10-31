/**
 * Site pages. `scripts/postbuild.mjs` reads this list (by regex) to write a
 * real index.html for every path, so direct links and refreshes work on
 * GitHub Pages.
 */

export type RouteId = 'home' | 'story' | 'venue' | 'registry' | 'faqs' | 'rsvp'

export interface RouteDef {
  id: RouteId
  path: string
  label: string
  title: string
}

export const routes: RouteDef[] = [
  { id: 'home', path: '/', label: 'Home', title: 'Beau & AG · August 7, 2027' },
  { id: 'story', path: '/our-story/', label: 'Our Story', title: 'Our Story · Beau & AG' },
  { id: 'venue', path: '/venue/', label: 'Venue', title: 'The Venue · Beau & AG' },
  { id: 'registry', path: '/registry/', label: 'Registry', title: 'Registry · Beau & AG' },
  { id: 'faqs', path: '/faqs/', label: 'FAQs', title: 'Frequently Asked Questions · Beau & AG' },
  { id: 'rsvp', path: '/rsvp/', label: 'RSVP', title: 'RSVP · Beau & AG' },
]

export function routeFor(id: RouteId): RouteDef {
  return routes.find((r) => r.id === id)!
}
