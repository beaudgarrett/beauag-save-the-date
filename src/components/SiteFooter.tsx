import { wedding } from '../config/wedding'
import { Link } from '../lib/router'
import { Monogram } from './Monogram'

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <Link to="/" className="site-footer__brand" aria-label="Beau & AG, home">
        <Monogram decorative className="site-footer__monogram" />
      </Link>
      <p className="site-footer__names">{wedding.couple.display}</p>
      <p className="site-footer__line">
        <time dateTime={wedding.date.iso}>{wedding.date.long}</time>
      </p>
      <p className="site-footer__line">
        {wedding.venue.name} · {wedding.venue.city}, {wedding.venue.stateShort}
      </p>
      <p className="site-footer__tagline">{wedding.tagline}</p>
    </footer>
  )
}
