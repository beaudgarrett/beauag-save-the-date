import { SiteFooter } from './components/SiteFooter'
import { SiteHeader } from './components/SiteHeader'
import type { RouteId } from './config/routes'
import { useRouter } from './lib/router'
import { HomePage } from './pages/HomePage'
import { FaqPage, RegistryPage, RsvpPage, TravelPage, VenuePage } from './pages/InnerPages'
import { NotFoundPage } from './pages/NotFoundPage'
import { StoryPage } from './pages/StoryPage'

const PAGES: Record<RouteId, () => React.JSX.Element> = {
  home: HomePage,
  story: StoryPage,
  venue: VenuePage,
  travel: TravelPage,
  registry: RegistryPage,
  faqs: FaqPage,
  rsvp: RsvpPage,
}

export function App() {
  const { route } = useRouter()
  const Page = route ? PAGES[route.id] : NotFoundPage
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" tabIndex={-1} key={route?.id ?? 'not-found'} className={`page page--${route?.id ?? 'not-found'}`}>
        <Page />
      </main>
      <SiteFooter />
    </>
  )
}
