import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { routeFor } from '../config/routes'
import { wedding } from '../config/wedding'
import { Link } from '../lib/router'

const form = wedding.addressForm

/** The full page: the Google Form, embedded, with a plain link as a fallback. */
export function AddressForm() {
  return (
    <section className="info-section" aria-labelledby="address-title">
      <Reveal className="info-section__inner">
        <SectionHeading id="address-title" level="h1">
          Send Us Your Address
        </SectionHeading>
        <p className="body-copy">{form.intro}</p>
      </Reveal>
      {form.embedUrl && (
        <div className="address-form">
          <iframe
            src={form.embedUrl}
            title="Mailing address form"
            className="address-form__frame"
            loading="lazy"
          >
            Loading…
          </iframe>
        </div>
      )}
      {form.url && (
        <p className="fine-print address-form__fallback">
          Trouble viewing the form?{' '}
          <a className="text-link" href={form.url} target="_blank" rel="noopener noreferrer">
            Open it in a new tab
            <span className="visually-hidden"> (opens in a new tab)</span>
          </a>
          .
        </p>
      )}
    </section>
  )
}

/** Homepage invitation to send an address. */
export function AddressPrompt() {
  if (!form.url) return null
  return (
    <section className="info-section info-section--butter" aria-labelledby="address-prompt-title">
      <Reveal className="info-section__inner">
        <SectionHeading id="address-prompt-title">Send Us Your Address</SectionHeading>
        <p className="body-copy">{form.prompt}</p>
        <Link to={routeFor('address').path} className="button address-prompt__button">
          Share Your Address
        </Link>
      </Reveal>
    </section>
  )
}
