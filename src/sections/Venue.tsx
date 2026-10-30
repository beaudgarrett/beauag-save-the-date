import { FramedTitle } from '../components/FramedTitle'
import { Reveal } from '../components/Reveal'
import { photos } from '../config/images'
import { COMING_SOON, venueAddress, venueLocation, wedding } from '../config/wedding'

export function Venue({ page = false }: { page?: boolean }) {
  return (
    <section className="venue" aria-labelledby="venue-title">
      <div className="venue__band">
        <Reveal>
          <FramedTitle
            className="venue__framed"
            photo={photos.venue}
            sizes="(min-width: 960px) 600px, 80vw"
            title="The Venue"
            titleId="venue-title"
            level={page ? 'h1' : 'h2'}
            titleAt={0.35}
            priority={page}
          />
        </Reveal>
      </div>

      <Reveal className="venue__details">
        <h3 className="display display--sub">{wedding.venue.name}</h3>
        <p className="venue__location">{venueLocation}</p>
        <p className="body-copy venue__intro">{wedding.venue.intro}</p>

        <dl className="details-list">
          <div>
            <dt>Date</dt>
            <dd>
              <time dateTime={wedding.date.iso}>{wedding.date.full}</time>
            </dd>
          </div>
          <div>
            <dt>Ceremony</dt>
            <dd>{wedding.ceremonyTime ?? COMING_SOON}</dd>
          </div>
          <div>
            <dt>Reception</dt>
            <dd>{wedding.receptionTime ?? COMING_SOON}</dd>
          </div>
          <div>
            <dt>Dress Code</dt>
            <dd>{wedding.dressCode ?? COMING_SOON}</dd>
          </div>
        </dl>

        <div className="venue__address">
          <p className="label">Address</p>
          <a className="text-link" href={wedding.venue.directionsUrl} target="_blank" rel="noopener noreferrer">
            {venueAddress}
            <span className="visually-hidden"> (opens directions in a new tab)</span>
          </a>
        </div>
        <a className="button button--outline" href={wedding.venue.directionsUrl} target="_blank" rel="noopener noreferrer">
          Get Directions
          <span className="visually-hidden"> (opens in a new tab)</span>
        </a>
      </Reveal>
    </section>
  )
}
