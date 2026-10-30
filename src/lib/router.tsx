import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type AnchorHTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from 'react'
import { routes, type RouteDef } from '../config/routes'

/**
 * A deliberately tiny history router. Every page also exists as a real
 * index.html in the build output, so refreshing or sharing any URL works on
 * GitHub Pages without hash URLs or 404 redirects.
 */

const BASE = import.meta.env.BASE_URL // always ends with "/"

export function hrefFor(path: string): string {
  return BASE + path.replace(/^\//, '')
}

function normalize(pathname: string): string {
  let p = pathname
  const baseNoSlash = BASE.replace(/\/$/, '')
  if (baseNoSlash && p.startsWith(baseNoSlash)) p = p.slice(baseNoSlash.length)
  p = p.replace(/index\.html$/, '')
  if (!p.startsWith('/')) p = '/' + p
  if (!p.endsWith('/')) p += '/'
  return p
}

function match(pathname: string): RouteDef | null {
  const p = normalize(pathname)
  return routes.find((r) => r.path === p) ?? null
}

interface RouterState {
  route: RouteDef | null
  navigate: (path: string) => void
}

const RouterContext = createContext<RouterState>({ route: null, navigate: () => {} })

export function RouterProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<RouteDef | null>(() => match(window.location.pathname))

  useEffect(() => {
    const onPop = () => setRoute(match(window.location.pathname))
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const navigate = useCallback((path: string) => {
    const next = match(hrefFor(path))
    if (next && next.path === normalize(window.location.pathname)) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    window.history.pushState(null, '', hrefFor(path))
    setRoute(next)
    window.scrollTo(0, 0)
    // Move focus to the new page's content for keyboard and screen reader users.
    requestAnimationFrame(() => document.getElementById('main')?.focus({ preventScroll: true }))
  }, [])

  useEffect(() => {
    document.title = route?.title ?? 'Page not found · Beau & AG'
  }, [route])

  return <RouterContext.Provider value={{ route, navigate }}>{children}</RouterContext.Provider>
}

export function useRouter() {
  return useContext(RouterContext)
}

interface LinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  to: string
}

export function Link({ to, onClick, children, ...rest }: LinkProps) {
  const { route, navigate } = useRouter()
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e)
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    e.preventDefault()
    navigate(to)
  }
  const current = route?.path === to ? 'page' : undefined
  return (
    <a href={hrefFor(to)} onClick={handle} aria-current={current} {...rest}>
      {children}
    </a>
  )
}
