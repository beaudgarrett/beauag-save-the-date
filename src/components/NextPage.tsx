import { routeFor, type RouteId } from '../config/routes'
import { Link } from '../lib/router'

/** Quiet "continue" link at the foot of an inner page. */
export function NextPage({ to }: { to: RouteId }) {
  const r = routeFor(to)
  return (
    <nav className="next-page" aria-label="Continue">
      <p className="eyebrow">Continue</p>
      <Link to={r.path} className="next-page__link">
        {to === 'home' ? 'Return Home' : r.label}
        <span aria-hidden="true"> →</span>
      </Link>
    </nav>
  )
}
