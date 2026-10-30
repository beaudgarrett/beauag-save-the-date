import { ComingSoon } from '../components/ComingSoon'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { wedding } from '../config/wedding'

/**
 * RSVP is not open yet. When it opens, set `wedding.rsvp.isOpen` and either a
 * `url` to an external RSVP service or build the private guest-lookup flow
 * (guest lookup, attendance, plus-one requests) behind that flag. Guest data
 * must never be committed to this public repository.
 */
export function Rsvp({ page = false }: { page?: boolean }) {
  const { isOpen, url, deadline, intro } = wedding.rsvp
  return (
    <section className="info-section info-section--rsvp" aria-labelledby="rsvp-title">
      <Reveal className="info-section__inner">
        <SectionHeading id="rsvp-title" level={page ? 'h1' : 'h2'}>
          RSVP
        </SectionHeading>
        <p className="body-copy">{intro}</p>
        {isOpen && url ? (
          <>
            {deadline && <p className="body-copy">Kindly reply by {deadline}.</p>}
            <a className="button" href={url}>
              Respond
            </a>
          </>
        ) : (
          <>
            <ComingSoon />
            <p className="fine-print">RSVPs are not open yet. Please check back for updates.</p>
          </>
        )}
      </Reveal>
    </section>
  )
}
