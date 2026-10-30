import { ComingSoon } from '../components/ComingSoon'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { wedding } from '../config/wedding'

export function Travel({ page = false }: { page?: boolean }) {
  const { hotels, transportation, intro } = wedding.travel
  const hasDetails = hotels.length > 0 || transportation
  return (
    <section className="info-section" aria-labelledby="travel-title">
      <Reveal className="info-section__inner">
        <SectionHeading id="travel-title" level={page ? 'h1' : 'h2'}>
          Travel &amp; Accommodation
        </SectionHeading>
        <p className="body-copy">{intro}</p>

        {hotels.length > 0 && (
          <ul className="entry-list">
            {hotels.map((h) => (
              <li key={h.name}>
                <h3 className="entry-list__title">{h.name}</h3>
                {h.description && <p>{h.description}</p>}
                {h.bookingCode && <p className="entry-list__meta">Booking code: {h.bookingCode}</p>}
                {h.url && (
                  <a className="text-link" href={h.url} target="_blank" rel="noopener noreferrer">
                    Reserve a room
                  </a>
                )}
              </li>
            ))}
          </ul>
        )}
        {transportation && <p className="body-copy">{transportation}</p>}
        {!hasDetails && <ComingSoon />}
      </Reveal>
    </section>
  )
}
