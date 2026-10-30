import { Link } from '../lib/router'

export function NotFoundPage() {
  return (
    <section className="info-section not-found" aria-labelledby="nf-title">
      <div className="info-section__inner">
        <h1 id="nf-title" className="display">
          Page Not Found
        </h1>
        <p className="body-copy">This page doesn’t exist, but our celebration certainly does.</p>
        <Link to="/" className="button">
          Return Home
        </Link>
      </div>
    </section>
  )
}
