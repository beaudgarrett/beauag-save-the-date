import { FramedTitle } from '../components/FramedTitle'
import { photos } from '../config/images'
import { wedding, venueLocation } from '../config/wedding'

/** Opening announcement: names laid across the black-and-white ring photograph. */
export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <FramedTitle
        className="hero__framed"
        photo={photos.hero}
        sizes="(min-width: 960px) 460px, 58vw"
        title={
          <>
            Beau <span className="amp">&amp;</span> AG
          </>
        }
        titleId="hero-title"
        level="h1"
        titleAt={0.47}
        priority
      />
      <div className="hero__details">
        <p className="hero__date">
          <time dateTime={wedding.date.iso}>{wedding.date.long}</time>
        </p>
        <p className="hero__venue">{wedding.venue.name}</p>
        <p className="hero__place">{venueLocation}</p>
      </div>
    </section>
  )
}
