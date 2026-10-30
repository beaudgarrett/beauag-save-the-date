import { ComingSoon } from '../components/ComingSoon'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { wedding } from '../config/wedding'

export function RegistrySection({ page = false }: { page?: boolean }) {
  const { intro, registries } = wedding.registry
  return (
    <section className="info-section info-section--tinted" aria-labelledby="registry-title">
      <Reveal className="info-section__inner">
        <SectionHeading id="registry-title" level={page ? 'h1' : 'h2'}>
          Registry
        </SectionHeading>
        <p className="body-copy">{intro}</p>
        {registries.length > 0 ? (
          <ul className="registry-links">
            {registries.map((r) => (
              <li key={r.url}>
                <a className="button button--outline" href={r.url} target="_blank" rel="noopener noreferrer">
                  {r.name}
                  <span className="visually-hidden"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <ComingSoon />
        )}
      </Reveal>
    </section>
  )
}
